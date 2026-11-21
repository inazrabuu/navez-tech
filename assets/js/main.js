// navez.tech site script — progressive enhancement only.
// Pages work without JS except embeds and the search palette.
import Alpine from "alpinejs";
import * as CookieConsent from "vanilla-cookieconsent";
import params from "@params";

const t = params.i18n;

/* ------------------------------------------------------------------
   Mega menu (<details>): close on Escape, outside click, or when
   another menu opens.
------------------------------------------------------------------- */
function initMegaMenus() {
  const menus = [...document.querySelectorAll("[data-mega-menu]")];
  if (!menus.length) return;
  document.addEventListener("click", (e) => {
    menus.forEach((m) => {
      if (m.open && !m.contains(e.target)) m.open = false;
    });
  });
  document.addEventListener("keydown", (e) => {
    if (e.key !== "Escape") return;
    menus.forEach((m) => {
      if (m.open) {
        m.open = false;
        m.querySelector("summary")?.focus();
      }
    });
  });
  menus.forEach((m) =>
    m.addEventListener("focusout", (e) => {
      if (m.open && e.relatedTarget && !m.contains(e.relatedTarget)) m.open = false;
    }),
  );
}

/* ------------------------------------------------------------------
   Mobile drawer (<dialog>). Trigger is a link to the footer nav when
   JS is unavailable.
------------------------------------------------------------------- */
function initDrawers() {
  document.querySelectorAll("[data-drawer-open]").forEach((trigger) => {
    const dialog = document.getElementById(trigger.dataset.drawerOpen);
    if (!dialog) return;
    trigger.addEventListener("click", (e) => {
      e.preventDefault();
      dialog.showModal();
      trigger.setAttribute("aria-expanded", "true");
    });
    dialog.addEventListener("close", () => trigger.setAttribute("aria-expanded", "false"));
    dialog.querySelectorAll("[data-drawer-close]").forEach((b) => b.addEventListener("click", () => dialog.close()));
    // Close when clicking the backdrop.
    dialog.addEventListener("click", (e) => {
      if (e.target === dialog) dialog.close();
    });
    // Close if the viewport grows past the drawer breakpoint.
    window.matchMedia("(min-width: 1024px)").addEventListener("change", (mq) => {
      if (mq.matches && dialog.open) dialog.close();
    });
  });
}

/* ------------------------------------------------------------------
   Command palette (Pagefind). Opens with Ctrl/⌘K or [data-palette-open].
------------------------------------------------------------------- */
let pagefind;
async function loadPagefind() {
  if (pagefind !== undefined) return pagefind;
  try {
    const url = "/pagefind/pagefind.js";
    pagefind = await import(/* @vite-ignore */ url);
    await pagefind.options({ excerptLength: 18 });
    pagefind.init();
  } catch {
    pagefind = null; // index not built (e.g. `hugo server`)
  }
  return pagefind;
}

Alpine.data("palette", () => ({
  query: "",
  results: [],
  active: -1,
  loading: false,
  message: "",
  filters: {},
  reset() {
    this.query = "";
    this.results = [];
    this.active = -1;
    this.message = "";
    this.filters = {};
  },
  async search() {
    const q = this.query.trim();
    this.active = -1;
    if (!q) {
      this.results = [];
      this.message = "";
      return;
    }
    this.loading = true;
    const pf = await loadPagefind();
    if (!pf) {
      this.loading = false;
      this.results = [];
      this.message = t.searchUnavailable;
      return;
    }
    const res = await pf.debouncedSearch(q, { filters: this.filters }, 120);
    if (res === null) return; // superseded by a newer query
    const data = await Promise.all(res.results.slice(0, 8).map((r) => r.data()));
    this.results = data.map((d) => ({ url: d.url, title: d.meta.title, excerpt: d.excerpt }));
    this.loading = false;
    this.message = this.results.length ? "" : t.searchNoResults;
    if (this.results.length) this.active = 0;
  },
  move(step) {
    if (!this.results.length) return;
    this.active = (this.active + step + this.results.length) % this.results.length;
    document.getElementById(`palette-opt-${this.active}`)?.scrollIntoView({ block: "nearest" });
  },
  go() {
    const r = this.results[this.active];
    if (r) window.location.href = r.url;
  },
}));

function initPalette() {
  const dialog = document.getElementById("palette");
  if (!dialog) return;
  const input = dialog.querySelector("input");
  const open = (filters, query = "") => {
    if (dialog.open) return;
    dialog.showModal();
    const data = Alpine.$data(dialog);
    data.filters = filters || {};
    if (query) {
      data.query = query;
      data.search();
    }
    input.focus();
    loadPagefind();
  };
  document.querySelectorAll("[data-palette-open]").forEach((el) =>
    el.addEventListener("click", (e) => {
      e.preventDefault();
      const filter = el.dataset.paletteFilter;
      open(filter ? { section: filter } : {});
    }),
  );
  // Inline search forms (e.g. /insights/) hand their query to the palette.
  document.querySelectorAll("[data-palette-form]").forEach((form) =>
    form.addEventListener("submit", (e) => {
      e.preventDefault();
      const q = new FormData(form).get("q") || "";
      const filter = form.dataset.paletteForm;
      open(filter ? { section: filter } : {}, String(q));
    }),
  );
  document.addEventListener("keydown", (e) => {
    if ((e.metaKey || e.ctrlKey) && e.key.toLowerCase() === "k") {
      e.preventDefault();
      dialog.open ? dialog.close() : open();
    }
  });
  dialog.addEventListener("click", (e) => {
    if (e.target === dialog) dialog.close();
  });
  // Show the platform-appropriate shortcut hint.
  if (/Mac|iPhone|iPad/.test(navigator.platform || navigator.userAgent)) {
    document.querySelectorAll("[data-shortcut-hint]").forEach((k) => (k.textContent = "⌘K"));
  }
}

/* ------------------------------------------------------------------
   Tabs (book-a-call). Markup works without JS as stacked panels.
------------------------------------------------------------------- */
Alpine.data("tabs", (initial = 0) => ({
  active: initial,
  select(i) {
    this.active = i;
  },
  onKey(e) {
    const tabs = [...this.$root.querySelectorAll('[role="tab"]')];
    const i = tabs.indexOf(e.target);
    let next = null;
    if (e.key === "ArrowRight") next = (i + 1) % tabs.length;
    if (e.key === "ArrowLeft") next = (i - 1 + tabs.length) % tabs.length;
    if (e.key === "Home") next = 0;
    if (e.key === "End") next = tabs.length - 1;
    if (next === null) return;
    e.preventDefault();
    this.active = next;
    tabs[next].focus();
  },
}));

/* ------------------------------------------------------------------
   List filter (use cases): items carry data-service / data-industry.
------------------------------------------------------------------- */
Alpine.data("filterList", () => ({
  service: "",
  industry: "",
  matches(el) {
    return (!this.service || el.dataset.service === this.service) && (!this.industry || el.dataset.industry === this.industry);
  },
  get count() {
    return [...this.$root.querySelectorAll("[data-service]")].filter((el) => this.matches(el)).length;
  },
}));

/* ------------------------------------------------------------------
   HubSpot embeds (forms + meetings) — only on pages that include
   [data-hubspot-form] / [data-hubspot-meetings]; loaded lazily.
------------------------------------------------------------------- */
function loadScript(src) {
  return new Promise((resolve, reject) => {
    const s = document.createElement("script");
    s.src = src;
    s.async = true;
    s.onload = resolve;
    s.onerror = reject;
    document.head.appendChild(s);
  });
}

function whenVisible(el, cb) {
  if (!("IntersectionObserver" in window)) return cb();
  const io = new IntersectionObserver((entries) => {
    if (entries.some((en) => en.isIntersecting)) {
      io.disconnect();
      cb();
    }
  }, { rootMargin: "200px" });
  io.observe(el);
}

// HubSpot hosts per data region: na1 has no suffix ("js.hsforms.net"), others do ("js-na2.hsforms.net").
const hsHost = (service, region) => `js${region && region !== "na1" ? `-${region}` : ""}.${service}`;

function initHubSpot() {
  // New form embed: an .hs-form-frame placeholder + the portal's embed script, which renders into it.
  document.querySelectorAll("[data-hubspot-form]").forEach((el) => {
    const { portalId, formId, region } = el.dataset;
    if (!portalId || !formId) return;
    whenVisible(el, async () => {
      const frame = document.createElement("div");
      frame.className = "hs-form-frame";
      Object.assign(frame.dataset, { region, formId, portalId });
      el.appendChild(frame);
      try {
        await loadScript(`https://${hsHost("hsforms.net", region)}/forms/embed/${portalId}.js`);
        el.querySelector("[data-fallback]")?.setAttribute("hidden", "");
      } catch {
        frame.remove(); // keep the fallback visible
      }
    });
  });
  document.querySelectorAll("[data-hubspot-meetings]").forEach((el) => {
    const src = el.dataset.src;
    if (!src) return;
    whenVisible(el, async () => {
      el.querySelector("[data-fallback]")?.setAttribute("hidden", "");
      const box = document.createElement("div");
      box.className = "meetings-iframe-container";
      box.dataset.src = src;
      el.appendChild(box);
      try {
        await loadScript("https://static.hsappstatic.net/MeetingsEmbed/ex/MeetingsEmbedCode.js");
      } catch {
        el.querySelector("[data-fallback]")?.removeAttribute("hidden");
      }
    });
  });
}

/* ------------------------------------------------------------------
   Consent (UU PDP). HubSpot tracking loads only after analytics consent.
------------------------------------------------------------------- */
function loadHubSpotTracking() {
  const id = params.hubspotPortalId;
  if (!id || document.getElementById("hs-script-loader")) return;
  const s = document.createElement("script");
  s.id = "hs-script-loader";
  s.async = true;
  s.defer = true;
  s.src = `https://${hsHost("hs-scripts.com", params.hubspotRegion)}/${id}.js`;
  document.head.appendChild(s);
}

function initConsent() {
  CookieConsent.run({
    guiOptions: {
      consentModal: { layout: "box", position: "bottom left" },
      preferencesModal: { layout: "box" },
    },
    categories: {
      necessary: { enabled: true, readOnly: true },
      analytics: {},
    },
    onConsent: () => {
      if (CookieConsent.acceptedCategory("analytics")) loadHubSpotTracking();
    },
    onChange: () => {
      if (CookieConsent.acceptedCategory("analytics")) loadHubSpotTracking();
      else window.location.reload(); // unload trackers on withdrawal
    },
    language: {
      default: "en",
      translations: {
        en: {
          consentModal: {
            title: t.consentTitle,
            description: `${t.consentDescription} <a href="${params.privacyUrl}">${t.consentPrivacyLink}</a>`,
            acceptAllBtn: t.consentAcceptAll,
            acceptNecessaryBtn: t.consentRejectAll,
            showPreferencesBtn: t.consentManage,
          },
          preferencesModal: {
            title: t.consentPrefsTitle,
            acceptAllBtn: t.consentAcceptAll,
            acceptNecessaryBtn: t.consentRejectAll,
            savePreferencesBtn: t.consentSave,
            closeIconLabel: t.close,
            sections: [
              { title: t.consentNecessaryTitle, description: t.consentNecessaryDescription, linkedCategory: "necessary" },
              { title: t.consentAnalyticsTitle, description: t.consentAnalyticsDescription, linkedCategory: "analytics" },
            ],
          },
        },
      },
    },
  });
  document.querySelectorAll("[data-consent-settings]").forEach((b) => {
    b.hidden = false;
    b.addEventListener("click", () => CookieConsent.showPreferences());
  });
}

/* ------------------------------------------------------------------ */
window.Alpine = Alpine;
Alpine.start();
initMegaMenus();
initDrawers();
initPalette();
initHubSpot();
initConsent();
