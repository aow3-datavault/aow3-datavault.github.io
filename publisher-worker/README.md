# AOW3 Community Publisher

1. Install Wrangler: `npm install --global wrangler`.
2. Authenticate: `wrangler login`.
3. Set the GitHub OAuth App Client ID: `wrangler secret put GITHUB_CLIENT_ID`.
4. Deploy: `wrangler deploy`.
5. Copy the deployed Worker URL to `scripts/publisher-config.js` as `AOW.publisherApiUrl`.
6. Deploy the static site after updating the configuration file.

The Worker accepts requests only from `https://aow3-datavault.github.io` and writes publications to `data/published-content.json` on the `main` branch.
