"use strict";

const TEMPLATES = {
  client: {
    name: "Client template (bootstrapper)",
    file: "Client Config.json",
    text: `{
    "fallback_language": "en",
    "fallback_languageVO": "en", // only en and zh are supported from U39 onwards
    "fallback_graphicsDriver": "dx11", // change it depending on your install requirements
    "fallback_windowMode": -1, // -1 borderless window
    "fallback_cluster": "public",
    "language": "en",
    "server_host": "127.0.0.1", // change it if needed
    "http_port": 80,
    "https_port": 443,
    "secure_connections": false,
    "autologin": false, // if true, the game will automatically log in with the credentials below (email and hashed password)
    "autologin_email": "",
    "autologin_password": "",
    "high_damage_numbers_patch": false,
    "simulacrum_blacklisted": true,
    "simulacrum_whitelisted": true,
    "pause_always_stops_time": false,
    "disable_firewall_prompt": true,
    "ee_log_in_console": false,
    "skip_mission_start_timer": false,
    "disable_profanity_filter": false,
    "logout_on_request_failure": false,
    "fov_override": 90.0,
    "forced_profile_dir": "",
    "auto_start_scripts": [ // you can find those sample scripts in OpenWF/Scripts
        "samples/Chat Commands.pluto"
    ],
    "alternative_loading": false,
    "save_all_metadata": false,
    "write_all_metadata_reads_to_console": false,
    "write_all_metadata_reads_to_ee_log": false,
    "write_patched_metadata_reads_to_console": false,
    "write_patched_metadata_reads_to_ee_log": false,
    "client_http_logging": true,
    "client_http_port": 6155,
    "disable_overlay": false,
    "overlay_compatibility_mode": false,
    "keep_console_open": false
}
`,
  },
  server: {
    name: "Server template (SpaceNinjaServer)",
    file: "config.json",
    text: `{
  "database": {
    "engine": "MongoDB 7.0",
    "dbPath": "./database"
  },
  "logger": {
    "files": true,
    "fileLevel": "trace",
    "consoleLevel": "debug",
    "format": "%timestamp% [%level%] %message%"
  },
  "myAddress": "localhost",
  "bindAddress": "0.0.0.0",
  "httpPort": 80,
  "httpsPort": 443,
  "httpsCertFile": "static/cert/cert.pem",
  "httpsKeyFile": "static/cert/key.pem",
  "ircExecutable": null, // change this to the path of your IRC server executable if you want to run it from here
  "ircAddress": "%THIS_MACHINE%",
  "hubExecutable": null, // change this to the path of your Hub server executable if you want to run it from here
  "hubServers": [
    {
      "address": "%THIS_MACHINE%:6952",
      "regions": ["ASIA", "OCEANIA", "EUROPE", "RUSSIA", "NORTH_AMERICA", "SOUTH_AMERICA"],
      "dtlsUnsupported": true
    }
  ],
  "noHubDiscrimination": false, // if true, all hub servers will be treated as one, no matter the language, region, or platform
  "nrsAddresses": [],
  "dtls": null,
  "administratorNames": [ // gives you access to admin related features in WebUI
    "Player1", // change this to your actual username
    "Player2",
    "Player3",
    "Player4"
  ],
  "autoCreateAccount": true,
  "skipTutorial": false,
  "fallbackBuildLabel": "2013.01.04.10.41/",
  "fullyStockedVendors": false,
  "skipClanKeyCrafting": false,
  "webui": {
    "enabled": true,
    "adminOnly": false,
    "nonAdminPermissions": {
      "*": true,
      "addCredits": true,
      "addPlatinum": true,
      "addRegalAya": true,
      "addEndo": true,
      "addDirac": true,
      "import": true,
      "export": true,
      "toggleCheat": {
        "*": true,
        "skipAllDialogue": true
      }
    },
    "defaultLanguage": "en"
  },
  "unfaithfulBugFixes": {
    "ignore1999LastRegionPlayed": false,
    "fixXtraCheeseTimer": false,
    "useAnniversaryTagForOldGoals": true,
    "giveBreedingGroundsRewardsAtSum": true
  },
  "worldState": {
    "creditBoostMultiplier": 0,
    "affinityBoostMultiplier": 0,
    "resourceBoostMultiplier": 0,
    "resourceBoostAffectsAllPickups": false,
    "tennoLiveRelay": false,
    "baroTennoConRelay": false,
    "baroAlwaysAvailable": false,
    "baroFullyStocked": false,
    "baroRelayOverride": 0,
    "evilBaroStage": 0,
    "varziaFullyStocked": false,
    "vanguardVaultRelics": false,
    "wolfHunt": null,
    "orphixVenom": false,
    "longShadow": false,
    "hallowedFlame": false,
    "anniversary": null,
    "hallowedNightmares": false,
    "hallowedNightmaresRewardsOverride": 0,
    "naberusNightsOverride": null,
    "proxyRebellion": false,
    "proxyRebellionRewardsOverride": 0,
    "voidCorruption2025Week1": false,
    "voidCorruption2025Week2": false,
    "voidCorruption2025Week3": false,
    "voidCorruption2025Week4": false,
    "dagathAlerts2026Week1": false,
    "dagathAlerts2026Week2": false,
    "dagathAlerts2026Week3": false,
    "dagathAlerts2026Week4": false,
    "starDaysAlerts2026Week1": false,
    "starDaysAlerts2026Week2": false,
    "starDaysAlerts2026Week3": false,
    "starDaysAlerts2026Week4": false,
    "qtccAlerts": false,
    "destiny2TributeAlert": false,
    "galleonOfGhouls": 0,
    "ghoulEmergenceOverride": null,
    "plagueStarOverride": null,
    "starDaysOverride": null,
    "saintPatrickOverride": null,
    "prideOverride": null,
    "xmasOverride": null,
    "lunarNewYear": null,
    "dogDaysOverride": null,
    "dogDaysRewardsOverride": null,
    "operationAtramentum": false,
    "operationAtramentumProgressOverride": 0,
    "bellyOfTheBeast": false,
    "bellyOfTheBeastProgressOverride": 0,
    "eightClaw": false,
    "eightClawProgressOverride": 0,
    "thermiaFracturesOverride": null,
    "thermiaFracturesProgressOverride": 0,
    "invasionGrineerCount": 1,
    "invasionCorpusCount": 1,
    "invasionOutbreakCount": 2,
    "invasionGoal": 30000,
    "invasionSimulatedHours": 36,
    "invasionSpreadHours": 2,
    "invasionRestHoursOverride": null,
    "constructionPctPerDay": 0.75,
    "constructionPctPerWin": 1,
    "constructionEventMissions": 30,
    "constructionEventDays": 4,
    "relayEventMercuryOverride": "",
    "relayEventEarthOverride": "",
    "relayEventSaturnOverride": "",
    "relayEventPlutoOverride": "",
    "eidolonOverride": "",
    "vallisOverride": "",
    "duviriOverride": "",
    "nightwaveOverride": "",
    "nightwaveEpisode": 1,
    "allTheFissures": "",
    "classicAlerts": null,
    "varziaOverride": "",
    "circuitGameModes": null,
    "darvoStockMultiplier": 1,
    "communitySynthesisTarget": 0,
    "communitySynthesisProgress": 0,
    "snowdayShowdown": false,
    "breedingGrounds": false
  },
  "serversideQualityOfLife": {
    "tutorialGivesStanceMods": null,
    "twentythreeHourMasteryRankCooldown": true,
    "doubleDailySynthesisEndoReward": true,
    "tylRegorDropsTwoEquinoxParts": true,
    "railjackExtraResourceBundlesReward": true,
    "railjackSteelEssencesReward": true
  },
  "inventoryDefaults": {},
  "tunables": {
    "useLoginToken": false,
    "prohibitSkipMissionStartTimer": false,
    "prohibitDisableProfanityFilter": false,
    "prohibitFovOverride": false,
    "prohibitFreecam": false,
    "prohibitTeleport": false,
    "prohibitScripts": false,
    "motd": null
  },
  "dev": {
    "keepVendorsExpired": false
  }
}
`,
  },
};

function stripComments(text) {
  let out = "", inStr = false;
  for (let i = 0; i < text.length; i++) {
    const c = text[i], n = text[i + 1];
    if (inStr) {
      out += c;
      if (c === "\\") { out += n ?? ""; i++; }
      else if (c === '"') inStr = false;
    } else if (c === '"') { inStr = true; out += c; }
    else if (c === "/" && n === "/") { while (i < text.length && text[i] !== "\n") { out += " "; i++; } out += text[i] ?? ""; }
    else if (c === "/" && n === "*") { out += "  "; i += 2; while (i < text.length && !(text[i] === "*" && text[i + 1] === "/")) { out += text[i] === "\n" ? "\n" : " "; i++; } out += "  "; i++; }
    else out += c;
  }
  return out;
}

function distance(a, b) {
  const d = Array.from({ length: a.length + 1 }, (_, i) => [i]);
  for (let j = 1; j <= b.length; j++) d[0][j] = j;
  for (let i = 1; i <= a.length; i++) for (let j = 1; j <= b.length; j++) {
    d[i][j] = Math.min(d[i - 1][j] + 1, d[i][j - 1] + 1, d[i - 1][j - 1] + (a[i - 1] === b[j - 1] ? 0 : 1));
    if (i > 1 && j > 1 && a[i - 1] === b[j - 2] && a[i - 2] === b[j - 1]) d[i][j] = Math.min(d[i][j], d[i - 2][j - 2] + 1);
  }
  return d[a.length][b.length];
}

const kindOf = (v) => (v === null ? "null" : Array.isArray(v) ? "list" : typeof v === "object" ? "object" : typeof v === "string" ? "text" : typeof v === "boolean" ? "true/false" : "number");

function checkConfig(text, kind) {
  const results = [];
  const clean = stripComments(text.replace(/^﻿/, ""));
  let data;
  try {
    data = JSON.parse(clean);
  } catch (e) {
    let pos = +(e.message.match(/position (\d+)/) || [])[1];
    const lc = e.message.match(/line (\d+) column (\d+)/);
    let line, col;
    if (lc) { line = +lc[1]; col = +lc[2]; }
    else if (!isNaN(pos)) { const before = clean.slice(0, pos).split("\n"); line = before.length; col = before[before.length - 1].length + 1; }
    const hint = /escape/i.test(e.message) ? " Backslashes in paths must be doubled (<code>C:\\\\Users</code>), or use forward slashes (<code>C:/Users</code>)."
      : /,\s*[}\]]/.test(clean.slice(Math.max(0, pos - 40), pos + 2)) ? " There is probably a comma after the last entry." : "";
    results.push({ sev: "error", msg: `This file is not valid JSON${line ? ` (line ${line}, column ${col})` : ""}: ${e.message.replace(/^JSON\.parse: |\s*in JSON at.*$/g, "")}.${hint}` });
    return results;
  }
  if (!data || typeof data !== "object" || Array.isArray(data)) return [{ sev: "error", msg: "The file must contain a single { … } object." }];
  const tpl = JSON.parse(stripComments(TEMPLATES[kind].text));
  const walk = (val, ref, path) => {
    for (const k of Object.keys(val)) {
      const p = path ? path + "." + k : k;
      if (!(k in ref)) {
        if (Object.keys(ref).includes("*")) continue;
        const close = Object.keys(ref).filter((r) => r !== "*").map((r) => [r, distance(r.toLowerCase(), k.toLowerCase())]).sort((x, y) => x[1] - y[1]).find(([, d]) => d <= 2)?.[0];
        results.push({ sev: "warning", msg: `<code>${esc(p)}</code> is not a known setting${close ? `. Did you mean <code>${esc(close)}</code>?` : ". It will most likely be ignored."}` });
        continue;
      }
      const a = kindOf(val[k]), b = kindOf(ref[k]);
      if (a !== b && a !== "null" && b !== "null") results.push({ sev: "warning", msg: `<code>${esc(p)}</code> should be ${b === "list" || b === "object" ? "a " + b : b}, but it is ${a === "list" || a === "object" ? "a " + a : a}.` });
      else if (b === "object" && a === "object") walk(val[k], ref[k], p);
    }
  };
  walk(data, tpl, "");
  if (kind === "client" && typeof data.server_host === "string" && !data.server_host.trim()) results.push({ sev: "error", msg: "<code>server_host</code> is empty. Use <code>127.0.0.1</code> for a server on your computer." });
  if (kind === "client" && data.http_port !== undefined && Number(data.http_port) !== 80) results.push({ sev: "info", msg: "<code>http_port</code> is not 80. It must match <code>httpPort</code> in the server's config.json." });
  if (kind === "server" && data.httpPort !== undefined && Number(data.httpPort) !== 80) results.push({ sev: "info", msg: "<code>httpPort</code> is not 80. It must match <code>http_port</code> in each client's Client Config.json." });
  return results;
}

function detectKind(name, text) {
  if (/client/i.test(name)) return "client";
  const keys = [...stripComments(text).matchAll(/["']?([A-Za-z_][\w*]*)["']?\s*:/g)].map((m) => m[1]);
  const known = (k) => new Set(stripComments(TEMPLATES[k].text).match(/"[^"]+"(?=\s*:)/g).map((x) => x.slice(1, -1)));
  const c = keys.filter((x) => known("client").has(x)).length, sv = keys.filter((x) => known("server").has(x)).length;
  if (c === sv) return /^config\b/i.test(name) ? "server" : null;
  return c > sv ? "client" : "server";
}

function configChecker(el) {
  const input = Object.assign(document.createElement("input"), { type: "file", accept: ".json,application/json,text/plain", hidden: true });
  const zone = document.createElement("div");
  zone.className = "dropzone";
  zone.tabIndex = 0;
  zone.innerHTML = `<strong>Drop your <code>Client Config.json</code> or <code>config.json</code> here</strong>`;
  const out = document.createElement("div");
  out.className = "check-out";
  const run = async (file) => {
    if (!file) return;
    const text = await file.text();
    const kind = detectKind(file.name, text);
    const res = checkConfig(text, kind || "client").filter((r) => kind || r.sev === "error");
    const what = kind ? TEMPLATES[kind].file + (kind === "client" ? " (bootstrapper)" : " (SpaceNinjaServer)") : "unknown config type";
    const counts = (s) => res.filter((r) => r.sev === s).length;
    const e = counts("error"), w = counts("warning");
    const head = e ? `${e} error${e > 1 ? "s" : ""} found` : w ? `Valid JSON, ${w} warning${w > 1 ? "s" : ""}` : "Looks good";
    out.innerHTML = `<div class="check-head ${e ? "error" : w ? "warning" : "ok"}">${esc(file.name)}: ${head}<span class="detected">Detected as ${esc(what)}</span></div>` +
      res.map((r) => `<div class="check-row ${r.sev}"><span class="sev">${{ error: "Error", warning: "Warning", info: "Note" }[r.sev]}</span><span>${r.msg}</span></div>`).join("");
  };
  zone.onclick = () => input.click();
  zone.onkeydown = (e) => { if (e.key === "Enter" || e.key === " ") { e.preventDefault(); input.click(); } };
  input.onchange = () => { run(input.files[0]); input.value = ""; };
  zone.ondragover = (e) => { e.preventDefault(); zone.classList.add("over"); };
  zone.ondragleave = () => zone.classList.remove("over");
  zone.ondrop = (e) => { e.preventDefault(); zone.classList.remove("over"); run(e.dataTransfer.files[0]); };
  el.append(zone, input, out);
}

function templateBlock(el, kind) {
  const t = TEMPLATES[kind];
  el.innerHTML = `<details class="tpl"><summary>Show ${esc(t.file)}</summary><pre><code></code></pre></details>
    <div class="tpl-actions"><button type="button" class="copy" data-a="copy">Copy</button><button type="button" class="copy" data-a="dl">Download ${esc(t.file)}</button></div>`;
  el.querySelector("pre code").textContent = t.text;
  el.querySelector('[data-a="copy"]').onclick = async (e) => {
    try { await navigator.clipboard.writeText(t.text); e.target.textContent = "Copied"; } catch { e.target.textContent = "Select it manually"; }
    setTimeout(() => (e.target.textContent = "Copy"), 1400);
  };
  el.querySelector('[data-a="dl"]').onclick = () => {
    const url = URL.createObjectURL(new Blob([t.text], { type: "application/json" }));
    Object.assign(document.createElement("a"), { href: url, download: t.file }).click();
    setTimeout(() => URL.revokeObjectURL(url), 2000);
  };
}