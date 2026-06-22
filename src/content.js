export const siteConfig = {
  title: "Misfits SMP",
  homeSection: "home",
  logo: "images/misfits-logo.png",
  background: "images/background-2.webp",
  sidebarPattern: "images/pattern-2.png",
};

export const navItems = [
  { id: "about", label: "ABOUT", icon: "images/combat.svg", ariaLabel: "About Misfits SMP" },
  { id: "announcements", label: "ANNOUNCEMENTS", icon: "images/misc.svg", ariaLabel: "Server announcements" },
  { id: "mods", label: "MODS", icon: "images/movement.svg", ariaLabel: "Server mods" },
  { id: "rules", label: "RULES", icon: "images/settings.svg", ariaLabel: "Server rules" },
  { id: "discord", label: "DISCORD", icon: "images/player.svg", ariaLabel: "Join our Discord" },
];

const aboutQuote =
  "\"We're all a little weird. And when we find someone whose weirdness is compatible with ours, we join up with them and fall into mutually satisfying weirdness and call it MISFITS SMP.\" — Dr. Seuss";

export const announcementPosts = [
  {
    paragraphs: [
      "The time has come to pick our launch date!! The options are July 3rd, 4th, or 5th at 5:00 PM. You can pick more than one option. Please choose the emoji that corresponds with your choice.",
      "So What's Next?",
      "Sometime between June 21 - 25, the official modpack will be posted, along with instructions on how to install, how to access the creative test world server, and how to change any setting you want. That creative server will be up until Misfits Season 2 opens. More info such as server rules and list of special addons (like glass always dropping even without silk touch) will also be released to look through.",
      "Super excited to finally put a date on the server opening and hope we can find a time that works for most people!",
      "— Rob, Jenn, Blu",
    ],
    date: "Jun 21, 2026",
    datetime: "2026-06-21",
  },
  {
    text: "Season 1 launches soon. Whitelist applications are open — hop in Discord to claim your spot before the world goes live.",
    date: "Jun 20, 2026",
    datetime: "2026-06-20",
  },
  {
    text: "BIG NEWS — We have chosen a seed! After searching hundreds of seeds and narrowing them down, we have chosen the one. The world has biome diversity, beautiful scenery, and lots to explore.",
    date: "Jun 14, 2026",
    datetime: "2026-06-14",
  },
  {
    text: "Seed: 423583208701001218 — Expect cherry groves, dramatic mountains, warm plains, and hidden valleys. Map markers are color-coded: Red = spawn, Yellow = shopping district, Orange = starter homes.",
    date: "Jun 14, 2026",
    datetime: "2026-06-14",
  },
  {
    text: "Starter plot sign-ups open Monday. Orange-zone plots are first-come, first-served — pick your hillside, lakefront, or cherry grove spot before they're gone.",
    date: "Jun 10, 2026",
    datetime: "2026-06-10",
  },
  {
    text: "Modpack v1.0 is live in Discord. Fabric 1.21.x install guide pinned in #modpack — grab it before launch day so you're ready to hop in.",
    date: "Jun 3, 2026",
    datetime: "2026-06-03",
  },
  {
    text: "Discord server is officially open. Introduce yourself in #general, grab roles in #welcome, and meet the other misfits before the world goes live.",
    date: "May 28, 2026",
    datetime: "2026-05-28",
  },
];

export const sections = {
  home: {
    blocks: [
      {
        heading: "ABOUT",
        paragraphs: [aboutQuote],
      },
      {
        heading: "ANNOUNCEMENTS",
        posts: announcementPosts,
      },
    ],
  },
  about: {
    blocks: [
      {
        heading: "ABOUT",
        paragraphs: [aboutQuote],
      },
    ],
  },
  announcements: {
    blocks: [
      {
        heading: "ANNOUNCEMENTS",
        posts: announcementPosts,
      },
    ],
  },
  mods: {
    blocks: [
      {
        heading: "MODS",
        paragraphs: [
          "Misfits SMP runs a curated Fabric modpack focused on quality-of-life, exploration, and cozy building — nothing that breaks vanilla feel.",
        ],
      },
      {
        heading: "FEATURED MODS",
        paragraphs: [
          "Lithium & Starlight — server performance optimizations for smooth tick rates even during big community events.",
          "Simple Voice Chat — proximity voice so you can yell across the valley or whisper in the mines.",
          "Emotecraft — express yourself with emotes at spawn, during raids, or while AFK in your treehouse.",
          "Xaero's Minimap & World Map — share waypoints with friends and never lose the shopping district again.",
          "Supplementaries & Amendments — decorative blocks and small vanilla+ additions for builders.",
        ],
      },
      {
        heading: "INSTALL",
        paragraphs: [
          "Download the modpack from our Discord #modpack channel. Drop it into your Fabric loader profile (Minecraft 1.21.x). Full install guide pinned in Discord.",
        ],
      },
    ],
  },
  rules: {
    blocks: [
      {
        heading: "RULES",
        paragraphs: [
          "Welcome to the Misfits SMP! :whatthecluck:",
          "We're excited to have you here and look forward to causing chaos together! Before we get to the fun stuff, please look over our rules below:",
          "1) Don't be an asshole",
          "2) No harassment, sexism, racism, homophobia, transphobia, hate speech etc. (includes any other -isms or derogatory stuff). This is a pro-LGBTQ+ server.",
          "3) No malicious content (basically don't be that guy that gives someone a virus or other weird tech stuff)",
          "4) Be mindful of heavy/potentially triggering topics",
          "5) If you have any questions or concerns, please reach out to one of the mods!",
        ],
      },
    ],
  },
  discord: {
    blocks: [
      {
        heading: "DISCORD",
        paragraphs: [
          "The server heartbeat lives on Discord — whitelist apps, voice hangouts, build showcases, and patch notes all start here.",
        ],
      },
      {
        heading: "JOIN US",
        paragraphs: [
          "Invite link: discord.gg/misfitssmp (placeholder — swap this in content.js when your real invite is ready).",
          "After you join, read #welcome and react to get the Member role. Post your Minecraft username in #whitelist to apply.",
        ],
      },
      {
        heading: "CHANNELS",
        paragraphs: [
          "#announcements — seed news, restarts, and event schedules.",
          "#general — memes, lore, and late-night mining coordination.",
          "#builds — screenshots, shader flexing, and group build sign-ups.",
          "#support — modpack help, bug reports, and \"where is my horse\" emergencies.",
        ],
      },
    ],
  },
};
