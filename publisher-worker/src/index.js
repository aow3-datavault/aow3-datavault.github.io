const contentPath = "data/published-content.json";
const contentTypes = new Set(["wiki", "news", "lore", "video"]);

const corsHeaders = (request, env) => {
  const origin = request.headers.get("Origin");
  return {
    "Access-Control-Allow-Origin": origin === env.ALLOWED_ORIGIN ? origin : env.ALLOWED_ORIGIN,
    "Access-Control-Allow-Headers": "Content-Type",
    "Access-Control-Allow-Methods": "POST, OPTIONS",
    "Access-Control-Max-Age": "86400",
    "Vary": "Origin"
  };
};

const json = (request, env, body, status = 200) => new Response(JSON.stringify(body), {
  status,
  headers: { "Content-Type": "application/json; charset=utf-8", ...corsHeaders(request, env) }
});

const decodeBase64 = (value) => new TextDecoder().decode(Uint8Array.from(atob(value.replace(/\n/g, "")), (character) => character.charCodeAt(0)));
const encodeBase64 = (value) => {
  const bytes = new TextEncoder().encode(value);
  let binary = "";
  bytes.forEach((byte) => { binary += String.fromCharCode(byte); });
  return btoa(binary);
};

const github = (path, options = {}) => fetch(`https://api.github.com${path}`, {
  ...options,
  headers: {
    "Accept": "application/vnd.github+json",
    "User-Agent": "AOW3-Community-Publisher",
    "X-GitHub-Api-Version": "2022-11-28",
    ...options.headers
  }
});

const githubToken = (token) => ({ "Authorization": `Bearer ${token}` });

const githubFailure = async (request, env, response, error) => {
  const data = await response.json().catch(() => ({}));
  const sso = response.headers.get("X-GitHub-SSO");
  const detail = String(sso || data.message || "GitHub API request failed").slice(0, 300);
  console.log(`${error}: ${response.status} ${detail}`);
  return json(request, env, { error, github_status: response.status, detail }, 502);
};

const getRequestBody = async (request, env) => {
  try {
    return await request.json();
  } catch {
    return null;
  }
};

const requestDeviceCode = async (request, env) => {
  const response = await fetch("https://github.com/login/device/code", {
    method: "POST",
    headers: { "Accept": "application/json", "Content-Type": "application/x-www-form-urlencoded" },
    body: new URLSearchParams({ client_id: env.GITHUB_CLIENT_ID, scope: "public_repo" })
  });
  const data = await response.json();
  return json(request, env, data, response.ok ? 200 : 502);
};

const requestAccessToken = async (request, env) => {
  const body = await getRequestBody(request, env);
  if (!body?.device_code) return json(request, env, { error: "device_code_required" }, 400);
  const response = await fetch("https://github.com/login/oauth/access_token", {
    method: "POST",
    headers: { "Accept": "application/json", "Content-Type": "application/x-www-form-urlencoded" },
    body: new URLSearchParams({ client_id: env.GITHUB_CLIENT_ID, device_code: body.device_code, grant_type: "urn:ietf:params:oauth:grant-type:device_code" })
  });
  const data = await response.json();
  return json(request, env, data, response.ok ? 200 : 502);
};

const publish = async (request, env) => {
  const body = await getRequestBody(request, env);
  if (!body?.token || !contentTypes.has(body.type) || !body.item?.id || body.item.typeKey !== body.type) return json(request, env, { error: "invalid_publication" }, 400);
  const repository = await github(`/repos/${env.GITHUB_REPOSITORY}`, { headers: githubToken(body.token) });
  if (!repository.ok) return githubFailure(request, env, repository, "repository_access_denied");
  const source = await github(`/repos/${env.GITHUB_REPOSITORY}/contents/${contentPath}`, { headers: githubToken(body.token) });
  if (!source.ok) return githubFailure(request, env, source, "publication_store_unavailable");
  const stored = await source.json();
  let content;
  try {
    content = JSON.parse(decodeBase64(stored.content));
  } catch {
    return json(request, env, { error: "publication_store_invalid" }, 502);
  }
  contentTypes.forEach((type) => { if (!Array.isArray(content[type])) content[type] = []; });
  const items = content[body.type];
  const index = items.findIndex((item) => item.id === body.item.id);
  if (index === -1) items.unshift(body.item);
  else items[index] = body.item;
  const title = String(body.item.title || "material").replace(/[\r\n]/g, " ").slice(0, 72);
  const update = await github(`/repos/${env.GITHUB_REPOSITORY}/contents/${contentPath}`, {
    method: "PUT",
    headers: { ...githubToken(body.token), "Content-Type": "application/json" },
    body: JSON.stringify({
      message: `content: publish ${body.type} ${title}`,
      content: encodeBase64(JSON.stringify(content, null, 2)),
      sha: stored.sha,
      branch: "main"
    })
  });
  if (!update.ok) return githubFailure(request, env, update, "publication_commit_failed");
  return json(request, env, { ok: true, commit: (await update.json()).commit.html_url });
};

export default {
  async fetch(request, env) {
    if (request.method === "OPTIONS") return new Response(null, { status: 204, headers: corsHeaders(request, env) });
    if (request.headers.get("Origin") !== env.ALLOWED_ORIGIN) return new Response("Forbidden", { status: 403 });
    const path = new URL(request.url).pathname;
    if (request.method === "POST" && path === "/auth/device") return requestDeviceCode(request, env);
    if (request.method === "POST" && path === "/auth/token") return requestAccessToken(request, env);
    if (request.method === "POST" && path === "/publish") return publish(request, env);
    return json(request, env, { error: "not_found" }, 404);
  }
};
