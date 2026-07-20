window.AOW = window.AOW || {};

const socialChannels = {
  ru: [
    { title: "ВКонтакте", label: "vk.com/aow3rts", url: "https://vk.com/aow3rts", image: "source materials/logos/vk-communication-internet-network-chat-interaction_128x128.webp", className: "social-vk" },
    { title: "Telegram", label: "t.me/aow3ru", url: "https://t.me/aow3ru", image: "source materials/logos/telegram-communication-chat-interaction-network-connection_128x128.webp", className: "social-tg" },
    { title: "YouTube", label: "@aow3rtsru", url: "https://www.youtube.com/@aow3rtsru", image: "source materials/logos/youtube-player-multimedia-video-communication-interaction_128x128.webp", className: "social-yt" },
    { title: "WhatsApp", label: "Канал сообщества", url: "https://whatsapp.com/channel/0029Vaf2lCU1XquTrf5OmB15", image: "source materials/logos/whatsapp-communication-message-interaction-network_128x128.webp", className: "social-wa" },
    { title: "RuTube", label: "rutube.ru/channel/42069629", url: "https://rutube.ru/channel/42069629/", image: "source materials/logos/Icon_RUTUBE_dark_color.svg", className: "social-rt" }
  ],
  en: [
    { title: "Facebook", label: "facebook.com/aow3rts", url: "https://www.facebook.com/aow3rts", image: "source materials/logos/facebook-network-communication-internet-interaction_128x128.webp" },
    { title: "Discord", label: "discord.gg/artofwar3", url: "https://discord.gg/artofwar3", image: "source materials/logos/discord-communication-interaction-message-network_128x128.webp" },
    { title: "WhatsApp", label: "Community channel", url: "https://www.whatsapp.com/channel/0029VaZwc6S42DcY3tPcu33h", image: "source materials/logos/whatsapp-communication-message-interaction-network_128x128.webp", className: "social-wa" },
    { title: "YouTube", label: "@AOW3RTS", url: "https://www.youtube.com/@AOW3RTS", image: "source materials/logos/youtube-player-multimedia-video-communication-interaction_128x128.webp", className: "social-yt" },
    { title: "Twitch", label: "twitch.tv/aow3rts", url: "https://www.twitch.tv/aow3rts", image: "source materials/logos/twitch-network-communication-interaction-connection_128x128.webp" },
    { title: "Instagram", label: "@aow3rts", url: "https://www.instagram.com/aow3rts/", image: "source materials/logos/instagram-social-media-network-communication-interaction-connection_128x128.webp" },
    { title: "X", label: "@Art_of_War_3", url: "https://x.com/Art_of_War_3", image: "source materials/logos/x_logo_PNG17-2881190257.webp" },
    { title: "Reddit", label: "r/ArtOfWar3", url: "https://www.reddit.com/r/ArtOfWar3/", image: "source materials/logos/reddit-social-media-communication-network-internet-connection_128x128.webp" }
  ]
};

const socialGrid = document.querySelector("#social-channels");
if (socialGrid) {
  (socialChannels[AOW.language] || socialChannels.ru).forEach((channel) => {
    const link = document.createElement("a");
    link.className = `social-card${channel.className ? ` ${channel.className}` : ""}`;
    link.href = channel.url;
    link.target = "_blank";
    link.rel = "noreferrer";
    const icon = document.createElement("span");
    icon.className = "social-icon";
    const image = document.createElement("img");
    image.src = channel.image;
    image.alt = "";
    icon.append(image);
    const title = document.createElement("strong");
    title.textContent = channel.title;
    const label = document.createElement("small");
    label.textContent = channel.label;
    link.append(icon, title, label);
    socialGrid.append(link);
  });
}

const partners = [
  { title: "SONETA AOW3", url: "https://www.youtube.com/@SONETAAOW3/featured", image: "https://yt3.googleusercontent.com/d-otRDP5WtsvGhme9r4M0wQ2DJolQMOMv7SHvXhxlF0YV9YkwM9Uwb6SAHDlf1p_Gj2rUfDAhA=s900-c-k-c0x00ffffff-no-rj", language: "other" },
  { title: "HAR art of war 3", url: "https://www.youtube.com/c/HARartofwar3", image: "https://yt3.googleusercontent.com/uP-Jeutjnj3CjbvMbDJgk3SBbQcV6i3j6_vAOi1Qs2GXxqXvh6zAAL6Br6Zh81gyBindRWqjd2w=s900-c-k-c0x00ffffff-no-rj", language: "other" },
  { title: "Rip Amor", url: "https://www.youtube.com/user/TheUchay19/videos", image: "https://yt3.googleusercontent.com/ytc/AIdro_lHaH7O7lP8L18Q8GJRyG-w4lW-WI_F9tNrS5JqHXgQQrY=s900-c-k-c0x00ffffff-no-rj", language: "other" },
  { title: "IPANG JR", url: "https://youtube.com/channel/UCPRk49ahBR9enGs8rW9sXxg", image: "https://yt3.googleusercontent.com/voE6BH1hSA2PcI02Y5pEwaTORN4cLaU2oxD10YVweUsGkFgDwd86cA2nYaYuGh1IoTkGxMbH=s900-c-k-c0x00ffffff-no-rj", language: "other" },
  { title: "GENNADIY Art of War 3", url: "https://www.youtube.com/@gennadiyartofwar3851", image: "https://yt3.googleusercontent.com/ZL_sKawdyw1vrd1HxMe4S6_Zn4AgKSWvYV4RYfa21fRThsNJKGFs6vU0dTHub_UansL2XaN8Ww=s900-c-k-c0x00ffffff-no-rj", language: "ru" },
  { title: "MOLOT imba?", url: "https://youtube.com/@molotimba6531", image: "https://yt3.googleusercontent.com/mWb9WkRuDsAdbzjsgI1ZaEdUCm6GiK5Inm98K_Yp02oQ5qf7VzEh86Ha-_X3rrax-XG4bl3NDhU=s900-c-k-c0x00ffffff-no-rj", language: "ru" },
  { title: "STeeL GRiP - Play Studio", url: "https://www.youtube.com/@STeeLGRiPSG/videos", image: "https://yt3.googleusercontent.com/ytc/AIdro_li48xdGNQLtoeSU5fHUFeVDUtQmoM42ddS--ZpVu6qbQ=s900-c-k-c0x00ffffff-no-rj", language: "other" },
  { title: "Masterskoy AOW3", url: "https://www.youtube.com/@masterskoy", image: "https://yt3.googleusercontent.com/C-yfuYK5-OkLDK9go8bT96PiiDVVrmftL6-0ZSrif-JUcwjJSDnR6BPjQPjeD07tbESvOlOr=s900-c-k-c0x00ffffff-no-rj", language: "other" },
  { title: "Kinezul Art of War 3", url: "https://www.youtube.com/@Kinezul", image: "https://yt3.googleusercontent.com/DiGyzQdYa58sOEb-b4-e_UIt6lhpa3eGi_6Ep9zGuM7uPhHTOMvKKEktBct7-euTnMjcttCbCg=s900-c-k-c0x00ffffff-no-rj", language: "other" },
  { title: "Be Friends Art of War 3", url: "https://www.youtube.com/@befriendsaow3/videos", image: "https://yt3.googleusercontent.com/SBe8M_WF6w9b2BNz3L_-gS-0PYNXviurltYZ6F_0BjlXUx4ZHJMKOLvbWUbhPuMAG_u7fv3S=s900-c-k-c0x00ffffff-no-rj", language: "other" },
  { title: "Cocoton", url: "https://www.youtube.com/@Cocotonaow", image: "https://yt3.googleusercontent.com/kzO_SPJZ0MqYyPildUsJwtkmJdZrkY-nwcECFSbjt0eEgVKmRcIOhoqCbC8IIbEcdZBPV2gkQQ=s900-c-k-c0x00ffffff-no-rj", language: "other" },
  { title: "E N E R G Y AOW3", url: "https://www.youtube.com/@Energy_gamingYT", image: "https://yt3.googleusercontent.com/8Ujf9ooeDj5L3BJUvrYPyPNJOrW_0k50uvB9fznGquVGwj9K6HVH1bCPDFDSblxjUWHfUtMj=s900-c-k-c0x00ffffff-no-rj", language: "other" },
  { title: "Nightsoul", url: "https://youtube.com/@nightsoul55", image: "https://yt3.googleusercontent.com/A5QIl-28b_buGVq-MudhC91DZpLRMb0W5njSdAwh51uctUm984tOTFRdh9Nq1DJHfmhJOxlt=s900-c-k-c0x00ffffff-no-rj", language: "other" },
  { title: "VHF.Thunder-Clan", url: "https://www.youtube.com/channel/UCY3Jh0RygXicQ-w0q8cl_0A", image: "https://yt3.googleusercontent.com/C2kAqydlo-BJbDL7lpg1W-UYv6r-bq11kTWFLmHmtkMen0Ui94I-KFdE9YbxGQxarSBZKBjBkg=s900-c-k-c0x00ffffff-no-rj", language: "other" },
  { title: "GANGSTA Art of War 3", url: "https://www.youtube.com/@GANGSTA_ART_OF_WAR_3", image: "https://yt3.googleusercontent.com/WmnjaF00zRbDfwRSBEtMRzqxNR_slH3-FKrY9NF9bQxsMIFpQArNopTApB3QHJkl4yify_fnRg=s900-c-k-c0x00ffffff-no-rj", language: "ru" },
  { title: "Aow3.JAGUAR_IR", url: "https://www.youtube.com/@Aow3.JAGUAR_IR/videos", image: "https://yt3.googleusercontent.com/KPUouLUnHqZKZpkWQT3af6zS--WOGwr-aal6m2HJTECQptKfv3vrhmwSXOCJ1Oo6p3gUrreT=s900-c-k-c0x00ffffff-no-rj", language: "other" },
  { title: "Hero Dominator", url: "https://space.bilibili.com/332728670", image: "source materials/images/partners/hero-dominator.jpg", language: "other" }
];

const partnerChannels = document.querySelector("#partner-channels");
if (partnerChannels) {
  const preferredLanguage = AOW.language === "ru" ? "ru" : "other";
  partners.slice().sort((left, right) => Number(right.language === preferredLanguage) - Number(left.language === preferredLanguage)).forEach((partner) => {
    const link = document.createElement("a");
    link.className = "partner-card";
    link.href = partner.url;
    link.target = "_blank";
    link.rel = "noreferrer";
    const image = document.createElement("img");
    image.className = "partner-avatar";
    image.src = partner.image;
    image.alt = "";
    image.loading = "lazy";
    const title = document.createElement("strong");
    title.textContent = partner.title;
    link.append(image, title);
    partnerChannels.append(link);
  });
}

const artworkFiles = [
  "Union_stores_standart.jpg",
  "promo_wolverine_final.jpg",
  "Promo_salamander_final.jpg",
  "Promo_psion_final.jpg",
  "Promo_beholder_polishing.jpg",
  "Promo_atlant_polishing_alt_m.jpg",
  "Inapp_atlant_vs_bizon_16x9.jpg",
  "event_workshop_standart.jpg",
  "event_UFO_standart.jpg",
  "event_NY25_standart.jpg",
  "event_memeBD_standart.jpg",
  "event_joker_2024.jpg",
  "event_cybertour_standart.jpg",
  "event_blackfriday_standart_notext.jpg",
  "event_9year_standart.jpg",
  "Energy_flags_BD26_standart.jpg",
  "Conf_rise_standart.jpg",
  "caribbean_standart.jpg",
  "black_friday_25_standart.jpg",
  "Beholder_x_Wasp_stores_standart.jpg"
];

const artCarousel = document.querySelector("#art-carousel");
if (artCarousel) {
  artworkFiles.forEach((file) => {
    const card = document.createElement("figure");
    card.className = "media-card";
    const image = document.createElement("img");
    image.src = `source materials/images/art/${file}`;
    image.alt = file.replace(/[_-]+/g, " ").replace(/\.[^.]+$/, "");
    image.loading = "lazy";
    card.append(image);
    artCarousel.append(card);
  });
}
