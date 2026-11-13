/* ============================================================================
   AURORA GLASS BANNER CARD — i18n
   ========================================================================== */
(function (g) {
  var EN = {
    "Buongiorno": "Good morning",
    "Buon pomeriggio": "Good afternoon",
    "Buonasera": "Good evening",
    "Buonanotte": "Good night",
    "Nessuno": "None",
    "Auto (meteo)": "Auto (weather)",
    "Casetta": "Little house",
    "Città": "City",
    "Montagna": "Mountains",
    "Mare e faro": "Sea and lighthouse",
    "Foresta magica": "Magic forest",
    "Spazio": "Space",
    "Giappone": "Japan",
    "Cyberpunk": "Cyberpunk",
    "Natale": "Christmas",
    "Oceano": "Ocean",
    "Pioggia": "Rain",
    "Temporale": "Thunderstorm",
    "Neve": "Snow",
    "Nebbia": "Fog",
    "Foglie d'autunno": "Autumn leaves",
    "Petali": "Petals",
    "Lucciole": "Fireflies",
    "Stelle cadenti": "Shooting stars",
    "Fuochi d'artificio": "Fireworks",
    "Bolle": "Bubbles",
    "Coriandoli": "Confetti",
    "Mondo": "World",
    "Effetto": "Effect",
    "Non disponibile": "Unavailable",
    "Sconosciuto": "Unknown",
    "Acceso": "On",
    "Spento": "Off",
    "Aperto": "Open",
    "Chiuso": "Closed",
    "Bloccato": "Locked",
    "Sbloccato": "Unlocked",
    "In casa": "Home",
    "Fuori casa": "Away"
  };

  function pick(lang) {
    var l = String(lang || "").toLowerCase();
    if (!l || l === "auto") l = (document.documentElement.lang || navigator.language || "en").toLowerCase();
    return l.indexOf("it") === 0 ? "it" : "en";
  }

  g.AuroraI18n = {
    pick: pick,
    dict: { en: EN },
    make: function (lang) {
      var code = pick(lang), D = code === "en" ? EN : null;
      function T(s, v) {
        var r = D && D[s] !== undefined ? D[s] : s;
        if (v) r = r.replace(/\{(\w+)\}/g, function (m, k) { return v[k] !== undefined && v[k] !== null ? v[k] : m; });
        return r;
      }
      T.lang = code;
      T.loc = code === "it" ? "it-IT" : "en-US";
      return T;
    }
  };
})(window);
