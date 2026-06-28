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

// ── Google Sheets announcements ──────────────────────────────────────────────
// 1. In your Google Sheet: File → Share → Publish to web
//    → choose "Comma-separated values (.csv)" → Publish
// 2. Paste the published CSV URL below (replace YOUR_SHEET_ID).
// 3. Sheet columns — row 1 is a header row (ignored). Each data row is one paragraph:
//    A: Date display  (e.g. "Jun 22, 2026")
//    B: Date ISO      (e.g. "2026-06-22")   ← used for <time datetime="">
//    C: Paragraph     (one paragraph of the post body)
//
//    Rows sharing the same ISO date are grouped into a single post, in order.
//    To add a new post: add rows with the new date. Changes appear on next page load.

const SHEET_CSV_URL =
  "https://docs.google.com/spreadsheets/d/e/2PACX-1vTuDuQVjrWmX2oV1JMd7wsDuy-vIPJhI3PJrYOCifvnsBL1Bmf1Lzjx3KznhLSay_c1TQzENDcGBdNC/pub?output=csv";

// Fallback shown when the sheet can't be reached (or hasn't been configured yet)
export const announcementPosts = [
  {
    paragraphs: [
      "Seed: 423583208701001218",
      "We took everyone's requests into consideration and picked one with a spawn we think will have a lot of potential, biome diversity, beautiful scenery, and lots to explore. If you feel like looking around on chunkbase or single player to get the vibe or scout areas, feel free.",
      "Red = spawn",
      "Yellow = shopping district",
      "Orange = starter home area",
      "For starter homes: There will be no pre-building homes on the server but, of course, feel free to plan in your own creative world. Building a home in the starter home area near spawn is optional but would be a fun way to start while we explore and find where we each want to settle. The homes should be 16x16 with wiggle room for yards, roof overhangs, etc. (added the fun challenge of size limits)",
      "For Spawn: If people want to work together in a creative server to build a tree or small spawn structure, feel free to collaborate. I will add that structure and only that structure before launch.",
      "PS: Dont forget to vote if you want to participate in the fun end to season 01 (new and old members invited. the games will be awesome) PSS: Also don't forget about payments due June 15 (info above)",
      "THE SERVER WILL BE OPENING SUNDAY JULY 5 time TBD. I'm sure there will be a good number of us on the server once it goes live and feel free to stream if you want. With that, here is the timetable leading up to opening",
      "June 25: Modpack released & Prep/test server open (this is a creative world with a random seed that gives you a chance to set your keybinds, try out mods like voice chat, and goofing around)",
      "July 2 - If you want to take a shot at a spawn build, the server will be open until this day. (info above) Reach out to blu if you have questions.",
      "July 5 - OPENING DAY!!! More the merrier when we open up the server, if you have thoughts on what time of day we should flip the switch throw it in chat. Streaming is, of course, welcome. When it comes to installing, setting up, or troubleshooting mods, Rob is happy to help via DM or VC.",
    ],
    date: "Jun 22, 2026",
    datetime: "2026-06-22",
  },
];

function parseSheetCSV(text) {
  // Split into raw lines but respect quoted newlines (multi-line cells)
  // Google Sheets wraps multi-line cell values in "..." with \n inside
  const rows = [];
  let current = "";
  let inQuotes = false;
  for (let i = 0; i < text.length; i++) {
    const ch = text[i];
    if (ch === '"') {
      if (inQuotes && text[i + 1] === '"') { current += '"'; i++; }
      else { inQuotes = !inQuotes; current += ch; }
    } else if (ch === "\n" && !inQuotes) {
      rows.push(current);
      current = "";
    } else {
      current += ch;
    }
  }
  if (current) rows.push(current);

  // Parse each row into columns
  function splitRow(line) {
    const cols = [];
    let field = "";
    let inQ = false;
    for (let i = 0; i < line.length; i++) {
      const ch = line[i];
      if (ch === '"') {
        if (inQ && line[i + 1] === '"') { field += '"'; i++; }
        else { inQ = !inQ; }
      } else if (ch === "," && !inQ) {
        cols.push(field);
        field = "";
      } else {
        field += ch;
      }
    }
    cols.push(field);
    return cols;
  }

  const dataRows = rows.slice(1); // skip header row
  const posts = [];

  for (const row of dataRows) {
    const cols = splitRow(row);
    const datetime  = (cols[0] || "").trim();           // A: ISO date e.g. 2026-06-22
    const title     = (cols[1] || "").trim();           // B: title
    const body      = (cols[2] || "").trim();           // C: full body (may have \n inside)
    const published = (cols[3] || "").trim().toUpperCase(); // D: TRUE/FALSE

    if (published !== "TRUE") continue;
    if (!title && !body) continue;

    // Format date for display e.g. "Jun 22, 2026"
    let dateDisplay = datetime;
    if (datetime) {
      const d = new Date(datetime + "T12:00:00");
      if (!isNaN(d)) {
        dateDisplay = d.toLocaleDateString("en-US", { month: "short", day: "numeric", year: "numeric" });
      }
    }

    // Split multi-paragraph body on newlines, filter blanks
    const paragraphs = body
      .split(/\n+/)
      .map((p) => p.trim())
      .filter(Boolean);

    posts.push({ date: dateDisplay, datetime, title, paragraphs });
  }

  return posts.reverse(); // newest first
}

export async function fetchAnnouncements() {
  if (SHEET_CSV_URL.includes("YOUR_SHEET_ID") || !SHEET_CSV_URL) {
    return announcementPosts; // not configured yet — use fallback
  }
  try {
    const res = await fetch(SHEET_CSV_URL);
    if (!res.ok) throw new Error(`HTTP ${res.status}`);
    const posts = parseSheetCSV(await res.text());
    return posts.length ? posts : announcementPosts;
  } catch (err) {
    console.warn("[Misfits] Could not load announcements from sheet:", err);
    return announcementPosts;
  }
}

export const sections = {
  home: {
    blocks: [
      {
        heading: "ABOUT",
        variant: "quote-rainbow",
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
        variant: "quote-rainbow",
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
          "You can find the current mod pack in the #getting-started-on-smp channel.",
        ],
      },
      {
        heading: "MODS IN THE PACK",
        paragraphs: [
          "Armor Poser — Crouch and click for advanced armor stand features",
          "Audio Player — Load and hear custom sounds/music on discs, horns, and heads",
          "Camerapture — Lets you take photos, put them in albums, or hang them. (you can also import photos)",
          "Client Sort — adds buttons to easily sort or move items in your inventory",
          "Continuity — gets rid of the outlines on each piece of glass",
          "Controlling — Lets you search in the keybind menu",
          "Extreme Sound Muffler — Change the volume of LITERALLY everything (ie: enderman falling but not enderman getting angry)",
          "Freecam",
          "Gamma — Lets you make things super bright",
          "Peek — Show shulker box names on cover. See everything in a shulker or bundle when you hover over it",
          "Scribble — Advanced features for writing in books such as color, copy, format",
          "Status — Let everyone know if you are streaming, or rather not be disturbed",
          "Trade Cycle — Replaces the need to break and replace workstations with a small refresh button instead",
          "Universal Graves — When you die your stuff is safely waiting for you",
          "Waystones — Transport between waystones",
          "Zoomify",
        ],
      },
      {
        heading: "FUN/USEFUL MODS THAT ARE TESTED",
        paragraphs: [
          "3D Skins — Make player skins more 3D",
          "Better Clouds — For those who dont use shaders, gives clouds more translucent and layered look",
          "Big Sign Writer — You choose the font for signs",
          "Flashback — Record gameplay",
          "Inventory Profiles Next — Advanced inventory sorting / auto stack refill",
          "Litematica — Make and use building guides. If you use this you cant use ___ feature",
          "Roughly Enough Items — Shows a list of all items in the game to the right of your inventory",
          "Simple Fog Control — Add more mood and depth to non-shader gameplay",
          "Skin Shuffle — Change skins without leaving the game",
          "Tweakaroo — Free cam, auto clicker, hide beacon beams, and a lot more",
          "Voxy/Bobby — Lets you see further (which is great!) but requires more stress on your computer. If you have a lot of RAM, use Bobby. If you have a good graphics card, use Voxy.",
          "*You can add ANY other client side mod.",
        ],
      },
      {
        heading: "OTHER FEATURES ON THE SERVER",
        paragraphs: [
          "Glass & Ender chests always drop — No silk touch needed",
          "Universal Dying — Can dye all wool, terracotta, concrete powder",
          "Locate a villagers workstation",
          "Change your chat name color",
          "Change the model of wearable or handheld items",
        ],
      },
    ],
  },
  rules: {
    blocks: [
      {
        heading: "RULES",
        paragraphs: [
          "No griefing (I feel like we are all adult enough to know the difference between goofing/pranking and being an asshole)",
          "Rated R server (but respectfully so. No obscene builds)",
          "NO X-RAYING",
          "PVP on but again, no griefing. Make sure the person is cool with pranks / pvp.",
          "DRAGON FIGHT — The first dragon fight will be a group event once the people who want to participate are ready. Dragon fight will be sometime between 2-4 months of July 5. Once the first person says they are ready we will schedule the fight for 3 weeks out.",
          "World Border will be set to 3,500 blocks in every direction until 26.3 drops over the fall. (If that border is too small, we can increase it)",
          "Pranks are welcome but like PVP, know your audience and be willing to help clean up a prank if it needs it. Lets have fun!",
          "Farms and traders are only for public use if the person who made it lets people use it (but dont forget, we will be starting with a shopping district this year). The only exception to this is if/when someone builds an enderman XP farm.",
          "Only TNT duping is allowed. No sand, concrete, or any other item.",
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
