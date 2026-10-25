"use strict";
const UPSTREAM = "https://raw.githubusercontent.com/spaceninjaserver/about.openwf.io/main/";
const UPSTREAM_FILES = "https://github.com/spaceninjaserver/about.openwf.io/raw/main/";
const GUIDES = [
  ["Getting started", [["client-setup.html", "Client Setup"], ["server-setup.html", "Server Setup"]]],
  ["Extras", [["importing.html", "Importing"], ["chat-hubs.html", "Chat & Hubs"], ["multiplayer.html", "Multiplayer"], ["port-forwarding.html", "Port Forwarding"]]],
  ["Advanced", [["metadata-patching.html", "Metadata Patching"], ["dockerized-setup.html", "Dockerized Setup"], ["hardening-security.html", "Hardening Security"]]],
  ["Reference", [["manual.html", "Bootstrapper Manual"], ["templates.html", "Templates & Checker"]]],
];
const DISCORD = "https://discord.gg/PNNZ3asUuY";
const BUILDER = "https://battlearmorambassador.github.io/builder/";
const $ = (s, el = document) => el.querySelector(s);
const esc = (s) => String(s).replace(/[&<>"]/g, (c) => ({ "&": "&amp;", "<": "&lt;", ">": "&gt;", '"': "&quot;" }[c]));
function header() {
  const here = location.pathname.split("/").pop() || "index.html";
  const current = here === "version.html" ? "versions.html" : here;
  const inGuides = GUIDES.some(([, pages]) => pages.some(([href]) => href === current));
  const link = (href, name) => `<a href="${href}"${href === current ? ' class="on"' : ""}>${esc(name)}</a>`;
  const bar = document.createElement("header");
  bar.className = "bar";
  bar.innerHTML = `<a class="brand" href="index.html">OpenWF Guide</a>
    <nav class="nav">
      ${link("versions.html", "Versions")}
      <div class="drop">
        <button type="button" class="drop-btn${inGuides ? " on" : ""}" aria-haspopup="true" aria-expanded="false">Guides <span class="caret">▾</span></button>
        <div class="drop-menu">${GUIDES.map(([group, pages]) => `<div class="drop-grp">${esc(group)}</div>${pages.map(([href, name]) => link(href, name)).join("")}`).join("")}</div>
      </div>
      ${link("faq.html", "FAQ")}
      ${link("contribute.html", "Contribute")}
      <a href="${DISCORD}" target="_blank" rel="noopener">Discord</a>
    </nav>
    <div class="bar-right"><a class="bar-btn" href="${BUILDER}">Metadata Patch Builder</a></div>`;
  document.body.prepend(bar);
  const drop = $(".drop", bar), btn = $(".drop-btn", bar);
  btn.onclick = (e) => {
    e.stopPropagation();
    btn.setAttribute("aria-expanded", String(drop.classList.toggle("open")));
  };
  document.addEventListener("click", () => { drop.classList.remove("open"); btn.setAttribute("aria-expanded", "false"); });
  document.addEventListener("keydown", (e) => { if (e.key === "Escape") drop.classList.remove("open"); });
}

const STEPS = [
  { name: "Client Setup", pages: ["client-setup.html"], need: "Mandatory" },
  { name: "Server Setup", pages: ["server-setup.html"], need: "Mandatory" },
  { name: "Extras", pages: ["importing.html", "chat-hubs.html", "multiplayer.html", "port-forwarding.html"], need: "Optional" },
];
function progress() {
  const here = location.pathname.split("/").pop() || "index.html";
  const at = STEPS.findIndex((s) => s.pages.includes(here));
  const main = $("main");
  if (at < 0 || !main) return;
  const bar = document.createElement("nav");
  bar.className = "steps";
  bar.setAttribute("aria-label", "Progress");
  bar.innerHTML = STEPS.map((s, i) => `<a class="step${i < at ? " done" : ""}${i === at ? " here" : ""}" href="${s.pages[0]}">
      <span class="dot">${i < at ? "✓" : i + 1}</span>
      <span class="step-txt"><span class="step-name">${esc(s.name)}</span><span class="step-tag ${s.need.toLowerCase()}">${i === at ? "You're here · " : ""}${s.need}</span></span>
    </a>`).join('<span class="step-line"></span>');
  main.prepend(bar);
}
const LOCAL_PAGES = {
  "client-setup": "client-setup.html", "web-server-setup": "server-setup.html", "nrs-setup": "multiplayer.html",
  "chat-server-setup": "chat-hubs.html", "hub-server-setup": "chat-hubs.html", "import": "importing.html",
  "port-forwarding": "port-forwarding.html", "faq": "faq.html", "versions": "versions.html", "bootstrapper-manual": "manual.html",
  "dockerized-server-setup": "dockerized-setup.html", "hardening-security": "hardening-security.html", "metadata-patching": "metadata-patching.html",
};
function loadUpstream(file, el, title, adjust) {
  el.innerHTML = '<p class="status"><span class="spinner"></span>Loading…</p>';
  return fetch(UPSTREAM + file).then((r) => {
    if (!r.ok) throw new Error(r.status);
    return r.text();
  }).then((html) => {
    html = html.replace(/<\?php[\s\S]*?\?>/g, "").replace(/<\?=[\s\S]*?\?>/g, "").replace(/\s*\u2014\s*/g, ": ").replace(/\u2013/g, "-");
    const doc = new DOMParser().parseFromString(html, "text/html");
    for (const x of doc.querySelectorAll("script, style, link, nav")) x.remove();
    for (const x of doc.querySelectorAll("[class], [style]")) { x.removeAttribute("class"); x.removeAttribute("style"); }
    for (const a of doc.querySelectorAll("a[href]")) {
      const href = a.getAttribute("href");
      if (/^(https?:|#|mailto:)/.test(href)) { a.target = "_blank"; a.rel = "noopener"; continue; }
      const name = href.replace(/^\//, "").replace(/\.(php|html)$/, "").split("#")[0];
      if (LOCAL_PAGES[name]) { a.setAttribute("href", LOCAL_PAGES[name]); a.removeAttribute("target"); }
      else a.setAttribute("href", "https://openwf.io/" + href.replace(/^\//, ""));
    }
    if (adjust) adjust(doc);
    el.innerHTML = (title ? `<h1>${esc(title)}</h1>` : "") +
      `<p class="sub">Loaded live from <a href="https://github.com/spaceninjaserver/about.openwf.io/blob/main/${esc(file)}" target="_blank" rel="noopener">about.openwf.io</a>.</p>` + doc.body.innerHTML;
  }).catch((e) => (el.innerHTML = `<p class="status">Could not load this page (${esc(e.message)}).</p>`));
}

function copyButtons(root = document) {
  for (const code of root.querySelectorAll(".cmd code")) {
    if (code.nextElementSibling?.classList.contains("copy")) continue;
    const b = document.createElement("button");
    b.className = "copy";
    b.type = "button";
    b.textContent = "Copy";
    b.onclick = async () => {
      try { await navigator.clipboard.writeText(code.textContent); b.textContent = "Copied"; } catch { b.textContent = "Select it manually"; }
      setTimeout(() => (b.textContent = "Copy"), 1400);
    };
    code.after(b);
  }
}

const tipIcon = '<svg viewBox="0 0 16 16" width="15" height="15" aria-hidden="true"><path fill="currentColor" d="M8 1.2 15.3 14H.7L8 1.2Zm0 4.1c-.5 0-.8.4-.8.8l.2 3.9c0 .3.3.6.6.6s.6-.3.6-.6l.2-3.9c0-.4-.3-.8-.8-.8Zm0 6.1a.9.9 0 1 0 0 1.8.9.9 0 0 0 0-1.8Z"/></svg>';
const strip = (s = "") => s.replace(/<!--[\s\S]*?-->/g, "").replace(/<\?[\s\S]*?\?>/g, "").replace(/<[^>]+>/g, "").replace(/&nbsp;/g, " ").replace(/&lt;/g, "<").replace(/&gt;/g, ">").replace(/&amp;/g, "&").trim();
const cmpVersion = (a, b) => {
  const x = a.split(".").map(Number), y = b.split(".").map(Number);
  for (let i = 0; i < Math.max(x.length, y.length); i++) if ((x[i] || 0) !== (y[i] || 0)) return (x[i] || 0) - (y[i] || 0);
  return 0;
};

const versionKey = (v) => (v.match(/\d+(?:\.\d+)+/) || ["0"])[0];

function notesHtml(td = "") {
  const links = [];
  const text = td.replace(/<!--[\s\S]*?-->/g, "").replace(/<a\s[^>]*href="([^"]+)"[^>]*>([\s\S]*?)<\/a>/g, (_, href, label) => {
    links.push(`<a href="${esc(/^https?:/.test(href) ? href : UPSTREAM_FILES + encodeURI(href))}" target="_blank" rel="noopener">${esc(strip(label))}</a>`);
    return `\u0000${links.length - 1}\u0000`;
  });
  return esc(strip(text)).replace(/\u0000(\d+)\u0000/g, (_, i) => links[+i]);
}

let versionsPromise = null;
function loadVersions() {
  if (!versionsPromise) versionsPromise = fetch(UPSTREAM + "versions.php").then((r) => {
    if (!r.ok) throw new Error("versions.php: " + r.status);
    return r.text();
  }).then(parseVersions);
  return versionsPromise;
}
function parseVersions(php) {
  const steam = [];
  for (const m of php.matchAll(/<tr id="(\d{10,})">([\s\S]*?)<\/tr>/g)) {
    const tds = [...m[2].matchAll(/<td>([\s\S]*?)<\/td>/g)].map((x) => x[1]);
    if (!/Steam/i.test(strip(tds[4]))) continue;
    steam.push({
      manifest: m[1],
      build: strip(tds[0]),
      version: strip(tds[1]).replace(/^\D+/, ""),
      title: strip(tds[2]),
      notes: strip(tds[3]),
    });
  }
  const patches = new Map();
  const groups = [
    ...[...php.matchAll(/foreach\s*\(\[([\s\S]*?)\]\s*as\s*\$buildVersion\s*=>\s*\$gameVersion\):\s*\?>\s*<tr id="<\?=\$gameVersion;\?>"([^>]*)>/g)]
      .map((m) => [m[2], [...m[1].matchAll(/"([^"]+)"(?:\s*\/\*[^*]*\*\/)?\s*=>\s*"([^"]+)"/g)].map((x) => x[2])]),
    ...[...php.matchAll(/<tr id="(\d+(?:\.\d+)+)"([^>]*data-base-manifest[^>]*)>/g)].map((m) => [m[2], [m[1]]]),
  ];
  for (const [attrs, list] of groups) {
    const attr = (n) => (attrs.match(new RegExp(n + '="([^"]*)"')) || [])[1];
    const base = attr("data-base-manifest");
    if (!base) continue;
    const versions = [...new Set([...(patches.get(base)?.versions || []), ...list])].sort(cmpVersion);
    const magnet = (attr("data-magnet") || "").replace(/&amp;/g, "&");
    const name = magnet ? new URLSearchParams(magnet.slice(magnet.indexOf("?"))).get("dn") : null;
    patches.set(base, {
      versions,
      mega: attr("data-mega"),
      magnet,
      torrent: name ? UPSTREAM_FILES + "supplementals/torrents/patches/" + encodeURIComponent(name) + ".torrent" : null,
    });
  }
  const users = [];
  for (const m of php.matchAll(/<tr id="(\d+(?:\.\d+)+)"([^>]*)>([\s\S]*?)<\/tr>/g)) {
    if (/data-base-manifest/.test(m[2])) continue;
    const tds = [...m[3].matchAll(/<td>([\s\S]*?)<\/td>/g)].map((x) => x[1]);
    if (!/User/i.test(strip(tds[4]))) continue;
    const attr = (n) => ((m[2].match(new RegExp(n + '="([^"]*)"')) || [])[1] || "").replace(/&amp;/g, "&");
    const magnet = attr("data-magnet");
    const name = magnet ? new URLSearchParams(magnet.slice(magnet.indexOf("?"))).get("dn") : null;
    users.push({
      id: m[1],
      build: strip(tds[0]),
      version: strip(tds[1]).replace(/^\D+/, ""),
      title: strip(tds[2]),
      notes: notesHtml(tds[3]),
      langs: attr("data-langs").split(",").filter(Boolean),
      drivers: attr("data-drivers").split(",").filter(Boolean),
      catLabels: attr("data-cat-labels"),
      magnet,
      torrent: name ? UPSTREAM_FILES + "supplementals/torrents/" + encodeURIComponent(name) + ".torrent" : null,
    });
  }
  const sorted = [...steam, ...users].map((s) => s.version).concat(...[...patches.values()].map((p) => p.versions)).filter((v) => /^\d+(\.\d+)+$/.test(v)).sort(cmpVersion);
  return { steam, users, patches, lowest: sorted[0], highest: sorted[sorted.length - 1] };
}
header();
document.addEventListener("DOMContentLoaded", () => {
  for (const el of document.querySelectorAll(".icon:empty")) el.innerHTML = tipIcon;
  progress();
  copyButtons();
});