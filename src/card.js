/* ============================================================================
   AURORA GLASS BANNER CARD — Home Assistant Lovelace Card
   ========================================================================== */
(function () {
  var VERSION = __VERSION__;
  var PROPS = [
    "@property --b1 { syntax: '<color>'; inherits: true; initial-value: #7C5CFF; }",
    "@property --b2 { syntax: '<color>'; inherits: true; initial-value: #3B82F6; }",
    "@property --b3 { syntax: '<color>'; inherits: true; initial-value: #22D3EE; }",
    "@property --a1 { syntax: '<color>'; inherits: true; initial-value: #7C5CFF; }",
    "@property --a2 { syntax: '<color>'; inherits: true; initial-value: #D946EF; }",
    "@property --win { syntax: '<color>'; inherits: true; initial-value: #FFD27A; }"
  ].join("\n");

  var CSS = [
    ":host {",
    "  display: block;",
    "  container-type: inline-size;",
    "  --ease: cubic-bezier(.16, 1, .3, 1);",
    "  --spring: cubic-bezier(.34, 1.56, .64, 1);",
    "  --font-display: 'Sora', 'Manrope', system-ui, sans-serif;",
    "  --font-ui: 'Manrope', system-ui, -apple-system, 'Segoe UI', sans-serif;",
    "  --b1: #7C5CFF; --b2: #3B82F6; --b3: #22D3EE; --a1: #7C5CFF; --a2: #D946EF; --win: #FFD27A;",
    "  transition: --b1 1.6s ease, --b2 1.6s ease, --b3 1.6s ease, --a1 1.6s ease, --a2 1.6s ease, --win 1.6s ease;",
    "  color-scheme: dark;",
    "  --bg: #070A16;",
    "  --surface: rgba(255,255,255,.06);",
    "  --surface-2: rgba(255,255,255,.11);",
    "  --surface-solid: #12172D;",
    "  --border: rgba(255,255,255,.12);",
    "  --hi: rgba(255,255,255,.16);",
    "  --text: #F5F7FF; --dim: #A3AED0; --faint: #6B7599;",
    "  --acc-text: color-mix(in srgb, var(--b1) 55%, #fff);",
    "  --shadow: 0 24px 60px -26px rgba(0,0,0,.75);",
    "  font-family: var(--font-ui);",
    "  color: var(--text);",
    "}",
    ":host([data-theme='light']) {",
    "  color-scheme: light;",
    "  --bg: #EDF0FA;",
    "  --surface: rgba(255,255,255,.72);",
    "  --surface-2: rgba(20,25,60,.08);",
    "  --surface-solid: #FFFFFF;",
    "  --border: rgba(20,25,60,.10);",
    "  --hi: rgba(255,255,255,.95);",
    "  --text: #141838; --dim: #55608A; --faint: #8E97B8;",
    "  --acc-text: color-mix(in srgb, var(--a1) 85%, #000);",
    "  --shadow: 0 24px 50px -28px rgba(30,40,90,.32);",
    "}",
    "* { box-sizing: border-box; }",
    "[hidden] { display: none !important; }",
    "button { font: inherit; color: inherit; }",
    ".hero {",
    "  position: relative;",
    "  overflow: hidden;",
    "  min-height: 136px;",
    "  display: flex;",
    "  border-radius: var(--ha-card-border-radius, 28px);",
    "  background: linear-gradient(135deg, color-mix(in srgb, var(--b1) 14%, var(--surface)), color-mix(in srgb, var(--b2) 8%, var(--surface)));",
    "  border: 1px solid var(--border);",
    "  box-shadow: var(--shadow), inset 0 1px 0 var(--hi);",
    "  backdrop-filter: blur(14px) saturate(1.3);",
    "  -webkit-backdrop-filter: blur(14px) saturate(1.3);",
    "  color: var(--text);",
    "}",
    ".flash-ov {",
    "  position: absolute; inset: 0; z-index: 4; pointer-events: none;",
    "  background: rgba(214,228,255, calc(var(--flash, 0) * .28));",
    "}",
    ".hero-art {",
    "  position: absolute; right: 0; bottom: 0; height: 100%; aspect-ratio: 640 / 260; z-index: 0;",
    "  -webkit-mask-image: linear-gradient(90deg, transparent 0%, rgba(0,0,0,.7) 20%, #000 40%);",
    "  mask-image: linear-gradient(90deg, transparent 0%, rgba(0,0,0,.7) 20%, #000 40%);",
    "}",
    ".hero-art img {",
    "  position: absolute; inset: 0; width: 100%; height: 100%; display: block;",
    "  opacity: 0; transition: opacity 1.1s ease; -webkit-user-drag: none; user-select: none;",
    "}",
    ".hero-art img.show { opacity: 1; }",
    ".wglow {",
    "  position: absolute; border-radius: 2px; background: var(--win);",
    "  box-shadow: 0 0 9px 2px var(--win); opacity: 0; transition: opacity .6s ease; pointer-events: none;",
    "}",
    ".wglow.on { opacity: 1; }",
    ".fx-hero { position: absolute; inset: 0; width: 100%; height: 100%; z-index: 1; pointer-events: none; }",
    ".hero-body {",
    "  position: relative; z-index: 2; padding: 14px 18px;",
    "  display: flex; flex-direction: column; justify-content: flex-end; gap: 2px; width: 100%;",
    "}",
    ".hero-tag {",
    "  position: absolute; z-index: 3; right: 16px; top: 14px;",
    "  display: inline-flex; align-items: center; gap: 6px; padding: 6px 12px;",
    "  border-radius: 99px; font-size: .74rem; font-weight: 700; color: #fff;",
    "  background: rgba(8,10,30,.45); backdrop-filter: blur(8px); -webkit-backdrop-filter: blur(8px);",
    "  border: 1px solid rgba(255,255,255,.18); cursor: pointer;",
    "  transition: transform .35s var(--spring), background .2s;",
    "}",
    ".hero-tag:hover { transform: translateY(-2px); background: rgba(8,10,30,.62); }",
    ".hero-tag ha-icon { --mdc-icon-size: 1rem; display: inline-flex; }",
    ".eyebrow {",
    "  margin: 0; font-size: .68rem; font-weight: 800; letter-spacing: .14em;",
    "  text-transform: uppercase; color: var(--faint);",
    "}",
    ".greet {",
    "  margin: 1px 0 0; font-family: var(--font-display); font-weight: 600;",
    "  font-size: clamp(.95rem, 1.5vw, 1.15rem); letter-spacing: -.02em; color: var(--text);",
    "}",
    ".clock {",
    "  font-family: var(--font-display); font-weight: 800; line-height: 1; letter-spacing: -.05em;",
    "  font-variant-numeric: tabular-nums; font-size: clamp(2rem, 4.5vw, 3rem);",
    "  margin: 1px 0 4px;",
    "  background: linear-gradient(110deg, var(--text) 10%, var(--acc-text) 55%, var(--a2) 100%);",
    "  -webkit-background-clip: text; background-clip: text; color: transparent; -webkit-text-fill-color: transparent;",
    "  filter: drop-shadow(0 6px 24px color-mix(in srgb, var(--a1) 35%, transparent));",
    "}",
    ".clock .colon { animation: blink 1s steps(1) infinite; }",
    ".clock .ampm { font-size: .32em; letter-spacing: .02em; margin-left: .18em; vertical-align: baseline; }",
    "@keyframes blink { 50% { opacity: .25; } }",
    ".hero-chips { display: flex; flex-wrap: wrap; gap: 6px; margin-top: 2px; }",
    ".chip {",
    "  display: inline-flex; align-items: center; gap: 6px; padding: 5px 10px 5px 8px;",
    "  border-radius: 99px; font-size: .75rem; font-weight: 600; color: var(--dim);",
    "  background: color-mix(in srgb, var(--bg) 45%, transparent);",
    "  border: 1px solid var(--border); backdrop-filter: blur(8px); -webkit-backdrop-filter: blur(8px);",
    "  transition: transform .3s var(--spring), border-color .2s, background .2s;",
    "}",
    ".chip.clickable { cursor: pointer; }",
    ".chip.clickable:hover { transform: translateY(-1px); border-color: color-mix(in srgb, var(--acc-text) 55%, var(--border)); background: color-mix(in srgb, var(--bg) 62%, transparent); }",
    ".chip.clickable:active { transform: scale(.97); }",
    ".chip.unavail { opacity: .6; }",
    ".chip .c-ico { display: inline-flex; align-items: center; justify-content: center; color: var(--acc-text); }",
    ".chip .c-ico ha-icon { --mdc-icon-size: 1.12rem; display: flex; width: 1.12rem; height: 1.12rem; }",
    ".chip b { color: var(--text); font-weight: 700; }",
    ".chip.active { border-color: color-mix(in srgb, var(--a1) 55%, var(--border)); }",
    /* Compact world/effect picker popover */
    ".pop {",
    "  position: absolute; z-index: 10; right: 14px; top: 52px;",
    "  width: min(320px, calc(100% - 28px)); max-height: calc(100% - 64px); overflow: auto;",
    "  padding: 12px; border-radius: 20px;",
    "  background: color-mix(in srgb, var(--surface-solid) 94%, transparent);",
    "  border: 1px solid var(--border); box-shadow: var(--shadow), inset 0 1px 0 var(--hi);",
    "  backdrop-filter: blur(18px) saturate(1.4); -webkit-backdrop-filter: blur(18px) saturate(1.4);",
    "  scrollbar-width: thin;",
    "}",
    ".pop-sec { font-size: .7rem; font-weight: 800; letter-spacing: .1em; text-transform: uppercase; color: var(--faint); margin: 4px 2px 8px; }",
    ".pop-grid { display: grid; grid-template-columns: repeat(2, minmax(0, 1fr)); gap: 6px; margin-bottom: 10px; }",
    ".pop-btn {",
    "  display: flex; align-items: center; gap: 6px; padding: 7px 10px; border-radius: 12px;",
    "  border: 1px solid var(--border); background: var(--surface); color: var(--dim);",
    "  font-size: .78rem; font-weight: 600; cursor: pointer; text-align: left;",
    "  transition: border-color .2s, color .2s, background .2s;",
    "}",
    ".pop-btn:hover { color: var(--text); border-color: var(--acc-text); }",
    ".pop-btn.sel { color: var(--text); background: color-mix(in srgb, var(--a1) 22%, var(--surface)); border-color: var(--a1); }",
    ".pop-btn ha-icon { --mdc-icon-size: 1rem; flex: none; color: var(--acc-text); }",
    ".pop-btn span { overflow: hidden; text-overflow: ellipsis; white-space: nowrap; }",
    "@container (max-width: 560px) {",
    "  .hero-art { height: auto; width: 100%; -webkit-mask-image: linear-gradient(180deg, rgba(0,0,0,.2) 0%, rgba(0,0,0,.85) 65%); mask-image: linear-gradient(180deg, rgba(0,0,0,.2) 0%, rgba(0,0,0,.85) 65%); }",
    "  .hero-tag { top: 10px; right: 12px; padding: 4px 10px; font-size: .7rem; }",
    "  .pop { top: 44px; right: 12px; }",
    "}"
  ].join("\n");

  var WORLD_ALIASES = {
    house: "casetta", home: "casetta", cottage: "casetta",
    city: "citta", mountain: "montagna", mountains: "montagna",
    sea: "mare", lighthouse: "mare", forest: "foresta",
    space: "spazio", japan: "giappone", christmas: "natale", ocean: "oceano"
  };

  var FX_ALIASES = {
    rain: "pioggia", storm: "temporale", thunderstorm: "temporale",
    snow: "neve", fog: "nebbia", leaves: "foglie", petals: "petali",
    fireflies: "lucciole", stars: "stelle", fireworks: "fuochi",
    bubbles: "bolle", confetti: "coriandoli"
  };

  var WEATHER_FX = {
    rainy: "pioggia", pouring: "pioggia",
    lightning: "temporale", "lightning-rainy": "temporale",
    snowy: "neve", "snowy-rainy": "neve", hail: "neve",
    fog: "nebbia"
  };

  var WEATHER_ICONS = {
    sunny: "mdi:weather-sunny",
    "clear-night": "mdi:weather-night",
    cloudy: "mdi:weather-cloudy",
    partlycloudy: "mdi:weather-partly-cloudy",
    rainy: "mdi:weather-rainy",
    pouring: "mdi:weather-pouring",
    snowy: "mdi:weather-snowy",
    "snowy-rainy": "mdi:weather-snowy-rainy",
    fog: "mdi:weather-fog",
    lightning: "mdi:weather-lightning",
    "lightning-rainy": "mdi:weather-lightning-rainy",
    windy: "mdi:weather-windy",
    hail: "mdi:weather-hail"
  };

  var DC_ICONS = {
    temperature: "mdi:thermometer",
    humidity: "mdi:water-percent",
    power: "mdi:flash",
    energy: "mdi:lightning-bolt",
    battery: "mdi:battery",
    illuminance: "mdi:brightness-6",
    pressure: "mdi:gauge",
    motion: "mdi:motion-sensor",
    door: "mdi:door",
    window: "mdi:window-closed-variant",
    garage_door: "mdi:garage",
    lock: "mdi:lock",
    occupancy: "mdi:home-account",
    presence: "mdi:account-check",
    smoke: "mdi:smoke-detector",
    moisture: "mdi:water-alert",
    carbon_dioxide: "mdi:molecule-co2",
    pm25: "mdi:air-filter"
  };

  var DOMAIN_ICONS = {
    light: "mdi:lightbulb",
    switch: "mdi:toggle-switch",
    fan: "mdi:fan",
    climate: "mdi:thermostat",
    lock: "mdi:lock",
    cover: "mdi:window-shutter",
    person: "mdi:account",
    alarm_control_panel: "mdi:shield-home",
    media_player: "mdi:cast",
    vacuum: "mdi:robot-vacuum",
    weather: "mdi:weather-partly-cloudy"
  };

  function bootGlobals() {
    if (!document.getElementById("aurora-banner-props")) {
      var st = document.createElement("style");
      st.id = "aurora-banner-props";
      st.textContent = PROPS;
      document.head.appendChild(st);
    }
    if (!document.getElementById("aurora-banner-fonts")) {
      var l = document.createElement("link");
      l.id = "aurora-banner-fonts";
      l.rel = "stylesheet";
      l.href = "https://fonts.googleapis.com/css2?family=Manrope:wght@400;500;600;700;800&family=Sora:wght@500;600;700;800&display=swap";
      document.head.appendChild(l);
    }
  }

  function normWorld(w) {
    if (!w) return "casetta";
    var k = String(w).toLowerCase().trim();
    k = WORLD_ALIASES[k] || k;
    return window.AMB && window.AMB.W[k] ? k : "casetta";
  }

  function normFx(f) {
    if (!f || f === "none") return "none";
    if (f === "auto") return "auto";
    var k = String(f).toLowerCase().trim();
    k = FX_ALIASES[k] || k;
    return window.FX && window.FX.E[k] ? k : "none";
  }

  function pad(n) { return (n < 10 ? "0" : "") + n; }

  function pickIcon(cfg, st) {
    if (cfg.icon) return cfg.icon;
    if (!st) return "mdi:help-circle-outline";
    var dom = st.entity_id.split(".")[0];
    if (dom === "weather" && WEATHER_ICONS[st.state]) return WEATHER_ICONS[st.state];
    if (st.attributes && st.attributes.icon) return st.attributes.icon;
    var dc = st.attributes && st.attributes.device_class;
    if (dc === "door" && st.state === "on") return "mdi:door-open";
    if (dc === "window" && st.state === "on") return "mdi:window-open-variant";
    if (dc === "lock" && st.state === "unlocked") return "mdi:lock-open-variant";
    if (dc && DC_ICONS[dc]) return DC_ICONS[dc];
    if (dom === "lock" && st.state === "unlocked") return "mdi:lock-open-variant";
    return DOMAIN_ICONS[dom] || "mdi:eye";
  }

  function isActiveState(st) {
    if (!st) return false;
    var s = st.state;
    return s === "on" || s === "open" || s === "unlocked" || s === "home" || s === "playing" || s === "heating" || s === "cooling";
  }

  function formatValue(cfg, st, T, hass) {
    if (cfg.value !== undefined) return String(cfg.value);
    if (!st) return T("Non disponibile");
    if (st.state === "unavailable") return T("Non disponibile");
    if (st.state === "unknown") return T("Sconosciuto");

    var raw = cfg.attribute && st.attributes ? st.attributes[cfg.attribute] : st.state;
    if (raw === undefined || raw === null) return T("Non disponibile");

    var num = typeof raw === "number" ? raw : (typeof raw === "string" && /^-?\d+(\.\d+)?$/.test(raw.trim()) ? parseFloat(raw) : NaN);
    var unit = cfg.unit !== undefined ? cfg.unit : (cfg.attribute ? (cfg.attribute === "temperature" || cfg.attribute === "current_temperature" ? (st.attributes.temperature_unit || "°C") : "") : (st.attributes && st.attributes.unit_of_measurement) || "");

    if (!isNaN(num)) {
      var opts = cfg.precision !== undefined ? { minimumFractionDigits: cfg.precision, maximumFractionDigits: cfg.precision } : { maximumFractionDigits: 1 };
      var txt = num.toLocaleString(T.loc, opts);
      return unit ? txt + " " + unit : txt;
    }

    if (hass && typeof hass.formatEntityState === "function" && !cfg.attribute) {
      return hass.formatEntityState(st);
    }

    var dc = st.attributes && st.attributes.device_class;
    var s = String(raw);
    if (s === "on") return (dc === "door" || dc === "window" || dc === "opening" || dc === "garage_door") ? T("Aperto") : T("Acceso");
    if (s === "off") return (dc === "door" || dc === "window" || dc === "opening" || dc === "garage_door") ? T("Chiuso") : T("Spento");
    if (s === "open") return T("Aperto");
    if (s === "closed") return T("Chiuso");
    if (s === "locked") return T("Bloccato");
    if (s === "unlocked") return T("Sbloccato");
    if (s === "home") return T("In casa");
    if (s === "not_home") return T("Fuori casa");
    return s;
  }

  class AuroraGlassBannerCard extends HTMLElement {
    constructor() {
      super();
      this._root = this.attachShadow({ mode: "open" });
      this._config = {};
      this._hass = null;
      this._built = false;
      this._clockTimer = 0;
      this._fx = null;
      this._ro = null;
      this._artKey = "";
      this._artTok = 0;
      this._hour = 12;
      this._world = "casetta";
      this._fxKind = "none";
      this._popOpen = false;
      this._onDocClick = this._handleDocClick.bind(this);
    }

    setConfig(config) {
      this._config = Object.assign({
        world: "casetta",
        effect: "auto",
        theme: "auto",
        language: "auto",
        show_date: true,
        show_clock: true,
        show_world_tag: true,
        hour_24: true,
        badges: []
      }, config || {});

      this._world = normWorld(this._config.world);
      this._fxKind = normFx(this._config.effect);
      if (this._built) {
        this._applyAll();
      } else {
        this._build();
      }
    }

    set hass(h) {
      this._hass = h;
      if (!this._built) this._build();
      this._syncHass();
    }

    get hass() { return this._hass; }

    getCardSize() { return 3; }

    getLayoutOptions() {
      return { grid_columns: 12, grid_min_columns: 6, grid_rows: 3, grid_min_rows: 2 };
    }

    static getStubConfig() {
      return {
        world: "casetta",
        effect: "auto",
        show_date: true,
        show_clock: true,
        show_world_tag: true,
        badges: []
      };
    }

    static getConfigElement() {
      return document.createElement("aurora-glass-banner-card-editor");
    }

    connectedCallback() {
      if (!this._built) this._build();
      this._startTimers();
      document.addEventListener("click", this._onDocClick);
    }

    disconnectedCallback() {
      this._stopTimers();
      document.removeEventListener("click", this._onDocClick);
    }

    _T() {
      var lang = this._config.language;
      if ((!lang || lang === "auto") && this._hass) {
        lang = (this._hass.locale && this._hass.locale.language) || this._hass.language || "auto";
      }
      return window.AuroraI18n.make(lang);
    }

    _build() {
      bootGlobals();
      this._root.innerHTML = "";
      var style = document.createElement("style");
      style.textContent = CSS;
      this._root.appendChild(style);

      var card = document.createElement("article");
      card.className = "hero";
      card.innerHTML = [
        '<div class="hero-art" aria-hidden="true">',
        '  <img id="art-a" alt="" draggable="false">',
        '  <img id="art-b" alt="" draggable="false">',
        '  <div id="win-layer"></div>',
        '</div>',
        '<canvas class="fx-hero" id="fx-hero" aria-hidden="true"></canvas>',
        '<div class="flash-ov" aria-hidden="true"></div>',
        '<button class="hero-tag" id="hero-tag" type="button"><ha-icon icon="mdi:earth"></ha-icon><span id="hero-tag-text"></span><ha-icon icon="mdi:chevron-down"></ha-icon></button>',
        '<div class="pop" id="pop" hidden></div>',
        '<div class="hero-body">',
        '  <p class="eyebrow" id="date-text"></p>',
        '  <h1 class="greet" id="greet"></h1>',
        '  <div class="clock" id="clock" aria-live="off"></div>',
        '  <div class="hero-chips" id="chips"></div>',
        '</div>'
      ].join("");

      this._root.appendChild(card);
      this._els = {
        hero: card,
        artA: card.querySelector("#art-a"),
        artB: card.querySelector("#art-b"),
        winLayer: card.querySelector("#win-layer"),
        fxCanvas: card.querySelector("#fx-hero"),
        tag: card.querySelector("#hero-tag"),
        tagText: card.querySelector("#hero-tag-text"),
        pop: card.querySelector("#pop"),
        date: card.querySelector("#date-text"),
        greet: card.querySelector("#greet"),
        clock: card.querySelector("#clock"),
        chips: card.querySelector("#chips")
      };
      this._artFront = this._els.artA;
      this._artBack = this._els.artB;

      var self = this;
      this._fx = new window.FX.Fx(this._els.fxCanvas, {
        k: 1,
        alpha: 1,
        onFlash: function (a) { self.style.setProperty("--flash", a.toFixed(3)); }
      });

      this._els.tag.addEventListener("click", function (e) {
        e.stopPropagation();
        self._togglePop();
      });

      if (typeof ResizeObserver !== "undefined") {
        this._ro = new ResizeObserver(function () {
          if (self._fx) self._fx.resize();
        });
        this._ro.observe(card);
      }

      this._built = true;
      this._applyAll();
      if (this.isConnected) this._startTimers();
    }

    _startTimers() {
      this._stopTimers();
      var self = this;
      this._tick();
      this._clockTimer = setInterval(function () { self._tick(); }, 5000);
      if (this._fx && this._resolvedFx() !== "none") this._fx.start();
    }

    _stopTimers() {
      if (this._clockTimer) { clearInterval(this._clockTimer); this._clockTimer = 0; }
      if (this._fx) this._fx.stop();
      if (this._ro) { this._ro.disconnect(); }
    }

    _applyAll() {
      this._applyTheme();
      this._applyWorld();
      this._tick();
      this._applyFx();
      this._renderBadges();
      this._els.tag.hidden = this._config.show_world_tag === false;
      this._els.date.hidden = this._config.show_date === false;
      this._els.clock.hidden = this._config.show_clock === false;
    }

    _applyTheme() {
      var t = this._config.theme || "auto";
      if (t === "auto") {
        var dark = this._hass && this._hass.themes && this._hass.themes.darkMode !== undefined
          ? this._hass.themes.darkMode
          : !(window.matchMedia && window.matchMedia("(prefers-color-scheme: light)").matches);
        t = dark ? "dark" : "light";
      }
      this.setAttribute("data-theme", t);
    }

    _applyWorld() {
      var T = this._T();
      var w = window.AMB.W[this._world];
      this._els.tagText.textContent = T(w.name);
      this._buildWindows();
      this._setArt(true);
      if (this._popOpen) this._renderPop();
    }

    _buildWindows() {
      var layer = this._els.winLayer;
      layer.innerHTML = "";
      var wins = (window.AMB.W[this._world].windows || []);
      var isNight = this._hour < 6.5 || this._hour >= 18.5;
      wins.forEach(function (w) {
        var d = document.createElement("div");
        d.className = "wglow" + (isNight ? " on" : "");
        d.style.left = (w.x / 640 * 100) + "%";
        d.style.top = (w.y / 260 * 100) + "%";
        d.style.width = (w.w / 640 * 100) + "%";
        d.style.height = (w.h / 260 * 100) + "%";
        layer.appendChild(d);
      });
    }

    _setArt(force) {
      var h = Math.round(this._hour * 4) / 4;
      var key = this._world + "|" + h;
      if (key === this._artKey && !force) return;
      this._artKey = key;
      var tok = ++this._artTok;
      var back = this._artBack;
      var self = this;
      back.onload = function () {
        if (tok !== self._artTok) return;
        back.classList.add("show");
        self._artFront.classList.remove("show");
        self._artBack = self._artFront;
        self._artFront = back;
      };
      back.src = window.AMB.dataURL(this._world, h);
    }

    _tick() {
      var d = new Date();
      var h = d.getHours() + d.getMinutes() / 60;
      this._hour = h;
      var K = window.AMB.palette(h);
      var self = this;
      ["b1", "b2", "b3", "a1", "a2"].forEach(function (k) { self.style.setProperty("--" + k, K[k]); });
      this.style.setProperty("--win", K.win);

      var T = this._T();
      if (this._config.show_date !== false) {
        var ds = d.toLocaleDateString(T.loc, { weekday: "long", day: "numeric", month: "long" }).replace(",", "");
        this._els.date.textContent = ds.charAt(0).toUpperCase() + ds.slice(1);
      }

      if (this._config.show_clock !== false) {
        var hh = d.getHours(), mm = d.getMinutes();
        if (this._config.hour_24 === false) {
          var ap = hh >= 12 ? "PM" : "AM";
          var h12 = hh % 12 || 12;
          this._els.clock.innerHTML = h12 + '<span class="colon">:</span>' + pad(mm) + '<span class="ampm">' + ap + "</span>";
        } else {
          this._els.clock.innerHTML = pad(hh) + '<span class="colon">:</span>' + pad(mm);
        }
      }

      var userName = this._config.name;
      if (!userName && this._hass && this._hass.user && this._hass.user.name) {
        userName = this._hass.user.name.split(" ")[0];
      }
      var gr = this._config.greeting;
      if (!gr) {
        gr = (h >= 22 || h < 5) ? T("Buonanotte") : h < 12 ? T("Buongiorno") : h < 18 ? T("Buon pomeriggio") : T("Buonasera");
      }
      this._els.greet.textContent = userName ? gr + ", " + userName : gr;

      var isNight = h < 6.5 || h >= 18.5;
      var glows = this._els.winLayer.querySelectorAll(".wglow");
      for (var i = 0; i < glows.length; i++) glows[i].classList.toggle("on", isNight);

      this._setArt(false);
    }

    _resolvedFx() {
      if (this._fxKind === "auto") {
        var we = this._config.weather_entity;
        var st = we && this._hass && this._hass.states && this._hass.states[we];
        return (st && WEATHER_FX[st.state]) || "none";
      }
      return this._fxKind;
    }

    _applyFx() {
      if (!this._fx) return;
      var target = this._resolvedFx();
      if (this._fx.kind !== target) {
        this._fx.set(target);
      }
      if (this._popOpen) this._renderPop();
    }

    _syncHass() {
      this._applyTheme();
      this._tick();
      if (this._fxKind === "auto") this._applyFx();
      this._renderBadges();
    }

    _renderBadges() {
      var container = this._els.chips;
      var badges = Array.isArray(this._config.badges) ? this._config.badges : [];
      container.innerHTML = "";
      container.hidden = badges.length === 0;
      if (!badges.length) return;

      var T = this._T();
      var self = this;

      badges.forEach(function (raw) {
        var cfg = typeof raw === "string" ? { entity: raw } : Object.assign({}, raw);
        var st = cfg.entity && self._hass && self._hass.states ? self._hass.states[cfg.entity] : null;
        var chip = document.createElement("span");
        var unavail = !!(cfg.entity && (!st || st.state === "unavailable" || st.state === "unknown"));
        var active = isActiveState(st);
        var tap = cfg.tap_action || (cfg.entity ? { action: "more-info" } : { action: "none" });
        var clickable = tap && tap.action && tap.action !== "none";

        chip.className = "chip" + (clickable ? " clickable" : "") + (unavail ? " unavail" : "") + (active ? " active" : "");
        if (clickable) {
          chip.setAttribute("role", "button");
          chip.setAttribute("tabindex", "0");
        }

        if (cfg.show_icon !== false) {
          var icoWrap = document.createElement("span");
          icoWrap.className = "c-ico";
          if (cfg.color) icoWrap.style.color = cfg.color;
          var haIcon = document.createElement("ha-icon");
          haIcon.setAttribute("icon", pickIcon(cfg, st));
          icoWrap.appendChild(haIcon);
          chip.appendChild(icoWrap);
        }

        var showName = cfg.show_name !== false;
        var label = cfg.name !== undefined ? cfg.name : (showName && st && st.attributes && st.attributes.friendly_name) || (showName && !st && cfg.entity ? cfg.entity : "");
        if (showName && label) {
          var lbl = document.createElement("span");
          lbl.textContent = label;
          chip.appendChild(lbl);
        }

        if (cfg.show_state !== false) {
          var val = document.createElement("b");
          val.textContent = formatValue(cfg, st, T, self._hass);
          chip.appendChild(val);
        }

        if (clickable) {
          var fire = function (e) {
            e.stopPropagation();
            self._handleTap(tap, cfg.entity);
          };
          chip.addEventListener("click", fire);
          chip.addEventListener("keydown", function (e) {
            if (e.key === "Enter" || e.key === " ") { e.preventDefault(); fire(e); }
          });
        }

        container.appendChild(chip);
      });
    }

    _handleTap(tap, entityId) {
      var action = tap.action || "more-info";
      if (action === "more-info" && (tap.entity || entityId)) {
        this.dispatchEvent(new CustomEvent("hass-more-info", {
          bubbles: true,
          composed: true,
          detail: { entityId: tap.entity || entityId }
        }));
      } else if (action === "toggle" && (tap.entity || entityId) && this._hass) {
        var eid = tap.entity || entityId;
        this._hass.callService("homeassistant", "toggle", { entity_id: eid });
      } else if (action === "navigate" && tap.navigation_path) {
        history.pushState(null, "", tap.navigation_path);
        window.dispatchEvent(new CustomEvent("location-changed"));
      } else if (action === "url" && tap.url_path) {
        window.open(tap.url_path, tap.new_tab === false ? "_self" : "_blank");
      } else if ((action === "call-service" || action === "perform-action") && (tap.service || tap.perform_action) && this._hass) {
        var parts = (tap.service || tap.perform_action).split(".");
        if (parts.length === 2) {
          this._hass.callService(parts[0], parts[1], tap.service_data || tap.data || {});
        }
      }
    }

    _togglePop() {
      this._popOpen = !this._popOpen;
      this._els.pop.hidden = !this._popOpen;
      if (this._popOpen) this._renderPop();
    }

    _handleDocClick(e) {
      if (!this._popOpen) return;
      var path = e.composedPath ? e.composedPath() : [];
      if (path.indexOf(this._els.pop) < 0 && path.indexOf(this._els.tag) < 0) {
        this._popOpen = false;
        this._els.pop.hidden = true;
      }
    }

    _renderPop() {
      var T = this._T();
      var pop = this._els.pop;
      pop.innerHTML = "";
      var self = this;

      var wSec = document.createElement("div");
      wSec.className = "pop-sec";
      wSec.textContent = T("Mondo");
      pop.appendChild(wSec);

      var wGrid = document.createElement("div");
      wGrid.className = "pop-grid";
      Object.keys(window.AMB.W).forEach(function (id) {
        var w = window.AMB.W[id];
        var b = document.createElement("button");
        b.type = "button";
        b.className = "pop-btn" + (self._world === id ? " sel" : "");
        b.innerHTML = '<ha-icon icon="' + w.icon.replace("mdi-", "mdi:") + '"></ha-icon><span>' + T(w.name) + "</span>";
        b.addEventListener("click", function (e) {
          e.stopPropagation();
          self._world = id;
          self._applyWorld();
        });
        wGrid.appendChild(b);
      });
      pop.appendChild(wGrid);

      var fSec = document.createElement("div");
      fSec.className = "pop-sec";
      fSec.textContent = T("Effetto");
      pop.appendChild(fSec);

      var fGrid = document.createElement("div");
      fGrid.className = "pop-grid";
      var fxList = [{ id: "none", name: "Nessuno", icon: "mdi-cancel" }];
      if (this._config.weather_entity) fxList.unshift({ id: "auto", name: "Auto (meteo)", icon: "mdi-weather-partly-cloudy" });
      Object.keys(window.FX.E).forEach(function (id) {
        fxList.push({ id: id, name: window.FX.E[id].name, icon: window.FX.E[id].icon });
      });
      fxList.forEach(function (item) {
        var b = document.createElement("button");
        b.type = "button";
        b.className = "pop-btn" + (self._fxKind === item.id ? " sel" : "");
        b.innerHTML = '<ha-icon icon="' + item.icon.replace("mdi-", "mdi:") + '"></ha-icon><span>' + T(item.name) + "</span>";
        b.addEventListener("click", function (e) {
          e.stopPropagation();
          self._fxKind = item.id;
          self._applyFx();
        });
        fGrid.appendChild(b);
      });
      pop.appendChild(fGrid);
    }
  }

  /* --------------------------------------------------------------------------
     Visual Config Editor
     -------------------------------------------------------------------------- */
  function esc(v) {
    return String(v === undefined || v === null ? "" : v)
      .replace(/&/g, "&amp;").replace(/"/g, "&quot;").replace(/</g, "&lt;").replace(/>/g, "&gt;");
  }

  class AuroraGlassBannerCardEditor extends HTMLElement {
    constructor() {
      super();
      this._root = this.attachShadow({ mode: "open" });
      this._config = {};
      this._hass = null;
    }

    setConfig(config) {
      this._config = Object.assign({}, config || {});
      this._render();
    }

    set hass(h) {
      var hadHass = !!this._hass;
      this._hass = h;
      if (!hadHass && h) this._render();
    }

    _emit(patch) {
      this._config = Object.assign({}, this._config, patch);
      this.dispatchEvent(new CustomEvent("config-changed", {
        bubbles: true,
        composed: true,
        detail: { config: this._config }
      }));
    }

    _badgesList() {
      var raw = Array.isArray(this._config.badges) ? this._config.badges : [];
      return raw.map(function (b) {
        return typeof b === "string" ? { entity: b } : Object.assign({}, b);
      });
    }

    _updateBadges(list) {
      var cleaned = list.map(function (b) {
        var out = {};
        if (b.entity) out.entity = b.entity;
        if (b.name) out.name = b.name;
        if (b.attribute) out.attribute = b.attribute;
        if (b.icon) out.icon = b.icon;
        if (b.show_name === false) out.show_name = false;
        if (b.tap_action && b.tap_action.action && b.tap_action.action !== "more-info") {
          out.tap_action = b.tap_action;
        }
        return out;
      });
      this._emit({ badges: cleaned });
      this._render();
    }

    _render() {
      var c = this._config;
      var entityIds = this._hass && this._hass.states ? Object.keys(this._hass.states).sort() : [];
      var weatherIds = entityIds.filter(function (id) { return id.indexOf("weather.") === 0; });
      var allList = entityIds.map(function (id) { return '<option value="' + esc(id) + '">'; }).join("");
      var weatherList = weatherIds.map(function (id) { return '<option value="' + esc(id) + '">'; }).join("");

      var worlds = Object.keys(window.AMB.W).map(function (id) {
        return '<option value="' + id + '"' + (normWorld(c.world) === id ? " selected" : "") + ">" + esc(window.AMB.W[id].name) + " (" + id + ")</option>";
      }).join("");
      var fxs = ['<option value="auto"' + ((c.effect || "auto") === "auto" ? " selected" : "") + ">Auto (from weather_entity)</option>",
      '<option value="none"' + (c.effect === "none" ? " selected" : "") + ">None</option>"
      ].concat(Object.keys(window.FX.E).map(function (id) {
        return '<option value="' + id + '"' + (normFx(c.effect) === id ? " selected" : "") + ">" + esc(window.FX.E[id].name) + " (" + id + ")</option>";
      })).join("");

      var badges = this._badgesList();
      var badgesHtml = badges.map(function (b, idx) {
        var act = (b.tap_action && b.tap_action.action) || "more-info";
        var navPath = (b.tap_action && b.tap_action.navigation_path) || "";
        return [
          '<div class="b-card" data-idx="' + idx + '">',
          '  <div class="b-head">',
          '    <span>Badge #' + (idx + 1) + (b.name ? " · " + esc(b.name) : b.entity ? " · " + esc(b.entity) : "") + "</span>",
          '    <div class="b-acts">',
          '      <button type="button" class="ib" data-act="up" title="Move up"' + (idx === 0 ? " disabled" : "") + ">▲</button>",
          '      <button type="button" class="ib" data-act="down" title="Move down"' + (idx === badges.length - 1 ? " disabled" : "") + ">▼</button>",
          '      <button type="button" class="ib del" data-act="del" title="Remove">✕</button>',
          "    </div>",
          "  </div>",
          '  <div class="b-grid">',
          '    <div class="row"><label>Entity</label><input type="text" list="ha-entities" data-bf="entity" placeholder="sensor.temperature" value="' + esc(b.entity) + '"></div>',
          '    <div class="row"><label>Label (optional)</label><input type="text" data-bf="name" placeholder="Outside" value="' + esc(b.name) + '"></div>',
          '    <div class="row"><label>Attribute (optional)</label><input type="text" data-bf="attribute" placeholder="temperature" value="' + esc(b.attribute) + '"></div>',
          '    <div class="row"><label>Icon (optional)</label><input type="text" data-bf="icon" placeholder="mdi:thermometer" value="' + esc(b.icon) + '"></div>',
          '    <div class="row"><label>Tap Action</label><select data-bf="tap_action">',
          '      <option value="more-info"' + (act === "more-info" ? " selected" : "") + ">More info</option>",
          '      <option value="toggle"' + (act === "toggle" ? " selected" : "") + ">Toggle</option>",
          '      <option value="navigate"' + (act === "navigate" ? " selected" : "") + ">Navigate</option>",
          '      <option value="none"' + (act === "none" ? " selected" : "") + ">None</option>",
          "    </select></div>",
          act === "navigate" ? '<div class="row"><label>Navigation Path</label><input type="text" data-bf="nav_path" placeholder="/lovelace/energy" value="' + esc(navPath) + '"></div>' : "",
          "  </div>",
          "</div>"
        ].join("");
      }).join("");

      this._root.innerHTML = [
        "<style>",
        "  .ed { display: grid; gap: 12px; padding: 8px 0; font-family: inherit; }",
        "  .row { display: grid; gap: 4px; }",
        "  .two { display: grid; grid-template-columns: 1fr 1fr; gap: 10px; }",
        "  label { font-size: 12px; font-weight: 600; opacity: .8; }",
        "  input[type=text], select { width: 100%; box-sizing: border-box; padding: 7px 9px; border-radius: 8px; border: 1px solid var(--divider-color, #444); background: var(--card-background-color, transparent); color: inherit; font: inherit; font-size: 13px; }",
        "  .checks { display: flex; flex-wrap: wrap; gap: 12px; padding-top: 2px; }",
        "  .chk { display: inline-flex; align-items: center; gap: 6px; font-size: 13px; cursor: pointer; }",
        "  .sec-head { display: flex; align-items: center; justify-content: space-between; margin-top: 6px; padding-top: 10px; border-top: 1px solid var(--divider-color, #333); }",
        "  .sec-head b { font-size: 13px; }",
        "  .add-btn { padding: 6px 12px; border-radius: 8px; border: 1px solid var(--primary-color, #7c5cff); background: transparent; color: var(--primary-color, #7c5cff); font: inherit; font-size: 12px; font-weight: 700; cursor: pointer; }",
        "  .b-list { display: grid; gap: 10px; }",
        "  .b-card { padding: 10px; border-radius: 10px; border: 1px solid var(--divider-color, #444); display: grid; gap: 8px; }",
        "  .b-head { display: flex; align-items: center; justify-content: space-between; font-size: 12px; font-weight: 700; }",
        "  .b-acts { display: flex; gap: 4px; }",
        "  .ib { width: 26px; height: 26px; border-radius: 6px; border: 1px solid var(--divider-color, #444); background: transparent; color: inherit; cursor: pointer; font-size: 11px; }",
        "  .ib:disabled { opacity: .35; cursor: default; }",
        "  .ib.del { color: #fb7185; }",
        "  .b-grid { display: grid; grid-template-columns: 1fr 1fr; gap: 8px; }",
        "</style>",
        '<datalist id="ha-entities">' + allList + "</datalist>",
        '<datalist id="ha-weather">' + weatherList + "</datalist>",
        '<div class="ed">',
        '  <div class="two">',
        '    <div class="row"><label>World</label><select data-k="world">' + worlds + "</select></div>",
        '    <div class="row"><label>Weather / Effect</label><select data-k="effect">' + fxs + "</select></div>",
        "  </div>",
        '  <div class="two">',
        '    <div class="row"><label>Weather Entity (for Auto)</label><input type="text" list="ha-weather" data-k="weather_entity" placeholder="weather.home" value="' + esc(c.weather_entity) + '"></div>',
        '    <div class="row"><label>Theme</label><select data-k="theme">' +
        '      <option value="auto"' + ((c.theme || "auto") === "auto" ? " selected" : "") + ">Auto</option>" +
        '      <option value="dark"' + (c.theme === "dark" ? " selected" : "") + ">Dark</option>" +
        '      <option value="light"' + (c.theme === "light" ? " selected" : "") + '>Light</option></select></div>',
        "  </div>",
        '  <div class="row"><label>Name override (optional)</label><input type="text" data-k="name" placeholder="Uses HA user name by default" value="' + esc(c.name) + '"></div>',
        '  <div class="checks">',
        '    <label class="chk"><input type="checkbox" data-b="show_clock"' + (c.show_clock !== false ? " checked" : "") + "> Show clock</label>",
        '    <label class="chk"><input type="checkbox" data-b="show_date"' + (c.show_date !== false ? " checked" : "") + "> Show date</label>",
        '    <label class="chk"><input type="checkbox" data-b="show_world_tag"' + (c.show_world_tag !== false ? " checked" : "") + "> Show world tag</label>",
        '    <label class="chk"><input type="checkbox" data-b="hour_24"' + (c.hour_24 !== false ? " checked" : "") + "> 24-hour clock</label>",
        "  </div>",
        '  <div class="sec-head"><b>Badges (' + badges.length + ')</b><button type="button" class="add-btn" id="add-badge">+ Add badge</button></div>',
        '  <div class="b-list">' + badgesHtml + "</div>",
        "</div>"
      ].join("");

      var self = this;
      this._root.querySelectorAll("[data-k]").forEach(function (el) {
        el.addEventListener("change", function () {
          var k = el.getAttribute("data-k");
          var patch = {};
          patch[k] = el.value;
          self._emit(patch);
        });
      });
      this._root.querySelectorAll("[data-b]").forEach(function (el) {
        el.addEventListener("change", function () {
          var k = el.getAttribute("data-b");
          var patch = {};
          patch[k] = el.checked;
          self._emit(patch);
        });
      });
      this._root.querySelector("#add-badge").addEventListener("click", function () {
        var list = self._badgesList();
        list.push({ entity: "" });
        self._updateBadges(list);
      });
      this._root.querySelectorAll(".b-card").forEach(function (cardEl) {
        var idx = parseInt(cardEl.getAttribute("data-idx"), 10);
        cardEl.querySelectorAll("[data-act]").forEach(function (btn) {
          btn.addEventListener("click", function () {
            var act = btn.getAttribute("data-act");
            var list = self._badgesList();
            if (act === "del") {
              list.splice(idx, 1);
            } else if (act === "up" && idx > 0) {
              var tmp = list[idx - 1]; list[idx - 1] = list[idx]; list[idx] = tmp;
            } else if (act === "down" && idx < list.length - 1) {
              var tmp2 = list[idx + 1]; list[idx + 1] = list[idx]; list[idx] = tmp2;
            }
            self._updateBadges(list);
          });
        });
        cardEl.querySelectorAll("[data-bf]").forEach(function (inp) {
          inp.addEventListener("change", function () {
            var f = inp.getAttribute("data-bf");
            var list = self._badgesList();
            var item = list[idx];
            if (f === "tap_action") {
              item.tap_action = inp.value === "more-info" ? undefined : { action: inp.value };
              if (inp.value === "navigate") item.tap_action.navigation_path = "";
            } else if (f === "nav_path") {
              item.tap_action = { action: "navigate", navigation_path: inp.value };
            } else {
              item[f] = inp.value;
            }
            self._updateBadges(list);
          });
        });
      });
    }
  }

  if (!customElements.get("aurora-glass-banner-card")) {
    customElements.define("aurora-glass-banner-card", AuroraGlassBannerCard);
  }
  if (!customElements.get("aurora-glass-banner-card-editor")) {
    customElements.define("aurora-glass-banner-card-editor", AuroraGlassBannerCardEditor);
  }

  window.customCards = window.customCards || [];
  window.customCards.push({
    type: "aurora-glass-banner-card",
    name: "Aurora Glass Banner Card",
    preview: true,
    description: "Animated Aurora Glass greeting, live clock, weather effects, and entity badges."
  });

  console.info(
    "%c AURORA GLASS BANNER CARD %c v" + VERSION + " ",
    "background:#7C5CFF;color:#fff;border-radius:4px 0 0 4px;padding:2px 6px;font-weight:700",
    "background:#1b1740;color:#fff;border-radius:0 4px 4px 0;padding:2px 6px"
  );
})();

