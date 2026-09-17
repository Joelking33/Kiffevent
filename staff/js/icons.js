/**
 * KIFFEVENT — icons.js
 * Jeu d'icônes SVG inline (trait, currentColor) remplaçant tous les
 * emojis du projet : rendu identique sur tous les OS, couleur héritée du
 * contexte, taille pilotée par le CSS.
 *
 * Usage :  icon("ticket")            -> chaîne SVG
 *          icon("ticket", "w-16")    -> avec une classe CSS additionnelle
 */
const UI_ICONS = {
  /* --- Navigation / objets métier --- */
  ticket:      '<path d="M3 9a2 2 0 0 1 2-2h14a2 2 0 0 1 2 2v1.5a1.5 1.5 0 0 0 0 3V15a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2v-1.5a1.5 1.5 0 0 0 0-3V9Z"/><path d="M10 7v10" stroke-dasharray="2 2"/>',
  cart:        '<circle cx="9" cy="20" r="1.2"/><circle cx="18" cy="20" r="1.2"/><path d="M2.5 3h2l2.4 12.2a2 2 0 0 0 2 1.6h8.2a2 2 0 0 0 2-1.6L21 7H6"/>',
  card:        '<rect x="2.5" y="5" width="19" height="14" rx="2.5"/><path d="M2.5 10h19"/>',
  wallet:      '<rect x="3" y="6" width="18" height="13" rx="2"/><path d="M3 10h18"/><circle cx="16.5" cy="14" r="1.1" fill="currentColor" stroke="none"/>',
  calendar:    '<rect x="3" y="5" width="18" height="16" rx="2"/><path d="M3 10h18M8 3v4M16 3v4"/>',
  users:       '<circle cx="9" cy="8" r="3.2"/><path d="M2.8 19c1.2-3.2 3.6-4.8 6.2-4.8s5 1.6 6.2 4.8"/><circle cx="17" cy="8.5" r="2.4"/><path d="M15.5 14.4c2.2.2 3.8 1.6 4.7 4"/>',
  user:        '<circle cx="12" cy="8" r="3.4"/><path d="M4.5 20c1.4-3.6 4.3-5.5 7.5-5.5s6.1 1.9 7.5 5.5"/>',
  userPlus:    '<circle cx="10" cy="8" r="3.4"/><path d="M3 20c1.3-3.4 4-5.2 7-5.2 1 0 2 .2 2.9.6"/><path d="M18 14v6M15 17h6"/>',
  building:    '<rect x="4" y="3" width="12" height="18" rx="1.5"/><path d="M16 9h4v12h-4"/><path d="M7.5 7h2M7.5 11h2M7.5 15h2M12 7h1.5M12 11h1.5M12 15h1.5"/>',
  briefcase:   '<rect x="3" y="7" width="18" height="13" rx="2"/><path d="M9 7V5.5A1.5 1.5 0 0 1 10.5 4h3A1.5 1.5 0 0 1 15 5.5V7"/><path d="M3 12h18"/>',
  key:         '<circle cx="8" cy="12" r="3.5"/><path d="M11.5 12H21M17.5 12v3M20 12v2.5"/>',
  flag:        '<path d="M5 21V4"/><path d="M5 5h10l-1.6 3L15 11H5"/>',
  tag:         '<path d="M3 12.5V5a2 2 0 0 1 2-2h7.5L21 11.5 12.5 20 3 12.5Z"/><circle cx="7.8" cy="7.8" r="1.2" fill="currentColor" stroke="none"/>',
  chart:       '<path d="M4 20V10M12 20V4M20 20v-7"/>',
  chartUp:     '<path d="M4 18 10 12l3.5 3.5L20 8"/><path d="M15 8h5v5"/>',
  refund:      '<path d="M4 9h11a5 5 0 0 1 0 10H9"/><path d="M8 5 4 9l4 4"/>',
  repeat:      '<path d="M17 2 21 6l-4 4"/><path d="M3 12v-2a4 4 0 0 1 4-4h14"/><path d="M7 22 3 18l4-4"/><path d="M21 12v2a4 4 0 0 1-4 4H3"/>',
  download:    '<path d="M12 3v12"/><path d="m7.5 10.5 4.5 4.5 4.5-4.5"/><path d="M4 20h16"/>',
  upload:      '<path d="M12 21V9"/><path d="m7.5 13.5 4.5-4.5 4.5 4.5"/><path d="M4 4h16"/>',
  filter:      '<path d="M3 5h18l-7 8v6l-4 2v-8L3 5Z"/>',
  search:      '<circle cx="11" cy="11" r="7"/><path d="m21 21-4.3-4.3"/>',
  eye:         '<path d="M2.5 12S6 5.5 12 5.5 21.5 12 21.5 12 18 18.5 12 18.5 2.5 12 2.5 12Z"/><circle cx="12" cy="12" r="3"/>',
  pencil:      '<path d="M4 20h4L19 9a2.1 2.1 0 0 0-3-3L5 17v3Z"/><path d="m14.5 7.5 3 3"/>',
  ban:         '<circle cx="12" cy="12" r="8.5"/><path d="m6.5 6.5 11 11"/>',

  /* --- États / retours --- */
  check:       '<path d="m5 13 4.5 4.5L19 7"/>',
  checkCircle: '<circle cx="12" cy="12" r="8.5"/><path d="m8.2 12.2 2.6 2.6 5-5.2"/>',
  xCircle:     '<circle cx="12" cy="12" r="8.5"/><path d="m9 9 6 6M15 9l-6 6"/>',
  alert:       '<path d="M12 4.5 21 19H3l9-14.5Z"/><path d="M12 10v4"/><circle cx="12" cy="16.6" r="0.9" fill="currentColor" stroke="none"/>',
  bell:        '<path d="M6 8a6 6 0 0 1 12 0c0 5 2 6 2 6H4s2-1 2-6Z"/><path d="M9.5 20a2.5 2.5 0 0 0 5 0"/>',
  clock:       '<circle cx="12" cy="12" r="8.5"/><path d="M12 7.5V12l3 2"/>',
  hourglass:   '<path d="M7 3h10M7 21h10"/><path d="M7 3c0 4 5 5.2 5 9s-5 5-5 9"/><path d="M17 3c0 4-5 5.2-5 9s5 5 5 9"/>',
  lock:        '<rect x="4.5" y="10" width="15" height="10" rx="2"/><path d="M8 10V7.5a4 4 0 0 1 8 0V10"/>',
  shield:      '<path d="M12 3l7 3v6c0 4.5-3 7.5-7 9-4-1.5-7-4.5-7-9V6l7-3Z"/>',
  info:        '<circle cx="12" cy="12" r="8.5"/><path d="M12 11v5"/><circle cx="12" cy="8" r="0.9" fill="currentColor" stroke="none"/>',
  wrench:      '<path d="M14.5 6a4.5 4.5 0 0 0 5.8 5.8L13 19.1a2.9 2.9 0 0 1-4.1-4.1L14.5 6Z"/><path d="M5 5l3 3"/>',
  database:    '<ellipse cx="12" cy="6" rx="7.5" ry="3"/><path d="M4.5 6v12c0 1.7 3.4 3 7.5 3s7.5-1.3 7.5-3V6"/><path d="M4.5 12c0 1.7 3.4 3 7.5 3s7.5-1.3 7.5-3"/>',

  /* --- Terrain / scanner --- */
  qrcode:      '<rect x="3" y="3" width="7" height="7" rx="1"/><rect x="14" y="3" width="7" height="7" rx="1"/><rect x="3" y="14" width="7" height="7" rx="1"/><path d="M14 14h3v3h-3zM19 14h2M14 19h2M19 19h2"/>',
  camera:      '<path d="M3 8.5A2 2 0 0 1 5 6.5h2L8.5 4h7L17 6.5h2a2 2 0 0 1 2 2V18a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2V8.5Z"/><circle cx="12" cy="13" r="3.4"/>',
  bolt:        '<path d="M13 2 4.5 13.5H11L10 22l8.5-11.5H12L13 2Z"/>',
  mapPin:      '<path d="M12 21s7-6.2 7-11a7 7 0 1 0-14 0c0 4.8 7 11 7 11Z"/><circle cx="12" cy="10" r="2.6"/>',
  door:        '<path d="M4 21h16"/><path d="M6 21V4.5A1.5 1.5 0 0 1 7.5 3h7A1.5 1.5 0 0 1 16 4.5V21"/><circle cx="13" cy="12.5" r="0.9" fill="currentColor" stroke="none"/>',
  headset:     '<path d="M4 14v-2a8 8 0 0 1 16 0v2"/><rect x="2.8" y="13.5" width="4" height="6" rx="1.6"/><rect x="17.2" y="13.5" width="4" height="6" rx="1.6"/><path d="M20 19.5v.5a3 3 0 0 1-3 3h-2"/>',
  chat:        '<path d="M21 11.5a8.4 8.4 0 0 1-8.9 8.4 8.9 8.9 0 0 1-3.1-.6L3 21l1.8-5A8.3 8.3 0 0 1 3.5 11 8.4 8.4 0 0 1 12 3a8.4 8.4 0 0 1 9 8.5Z"/>',
  hand:        '<path d="M8 12V5.6a1.6 1.6 0 0 1 3.2 0V11"/><path d="M11.2 10.8V4.6a1.6 1.6 0 0 1 3.2 0v6.2"/><path d="M14.4 11V6.8a1.6 1.6 0 0 1 3.2 0V15a6 6 0 0 1-6 6h-.8a5 5 0 0 1-4.3-2.5L4 14.2a1.6 1.6 0 0 1 2.6-1.9L8 14"/>',
  desktop:     '<rect x="3" y="4" width="18" height="12" rx="2"/><path d="M9 20h6M12 16v4"/>',
  smartphone:  '<rect x="7" y="2.5" width="10" height="19" rx="2.5"/><path d="M11 18.5h2"/>',

  /* --- Divers --- */
  home:        '<path d="M3 11.5 12 4l9 7.5"/><path d="M5 10v10h14V10"/><path d="M9 20v-6h6v6"/>',
  dots:        '<circle cx="5.5" cy="12" r="1.4" fill="currentColor" stroke="none"/><circle cx="12" cy="12" r="1.4" fill="currentColor" stroke="none"/><circle cx="18.5" cy="12" r="1.4" fill="currentColor" stroke="none"/>',
  arrowUp:     '<path d="M12 19V5M5 12l7-7 7 7"/>',
  arrowDown:   '<path d="M12 5v14M5 12l7 7 7-7"/>',
  arrowRight:  '<path d="M4 12h15M13 6l6 6-6 6"/>',
};

/**
 * Renvoie le SVG d'une icône. Les attributs de trait sont uniformes pour
 * que toutes les icônes aient le même poids visuel.
 */
function icon(name, extraClass) {
  const body = UI_ICONS[name];
  if (!body) return "";
  return '<svg class="ui-icon' + (extraClass ? " " + extraClass : "") + '" viewBox="0 0 24 24" fill="none" ' +
         'stroke="currentColor" stroke-width="1.9" stroke-linecap="round" stroke-linejoin="round" ' +
         'aria-hidden="true" focusable="false">' + body + "</svg>";
}

/** Icône associée à un moyen de paiement (aucun logo de marque disponible :
 *  mobile money -> smartphone, carte -> carte, revente -> flèches). */
const PAYMENT_ICONS = {
  wave:   { name: "smartphone", cls: "pay-wave" },
  orange: { name: "smartphone", cls: "pay-orange" },
  mtn:    { name: "smartphone", cls: "pay-mtn" },
  moov:   { name: "smartphone", cls: "pay-moov" },
  card:   { name: "card",       cls: "pay-card" },
  resale: { name: "repeat",     cls: "pay-resale" },
};
function paymentIcon(key) {
  const p = PAYMENT_ICONS[key] || PAYMENT_ICONS.card;
  return icon(p.name, p.cls);
}

/** Même chose à partir du libellé affiché (Wave, Orange Money, ...) */
function paymentIconByLabel(label) {
  const map = {
    "Wave": "wave", "Orange Money": "orange", "MTN MoMo": "mtn",
    "MTN Mobile Money": "mtn", "Moov Money": "moov", "Carte bancaire": "card",
  };
  return paymentIcon(map[label] || "card");
}

/* ---------------------------------------------------------------------- */
/* Indice de défilement des tableaux : le dégradé du bord droit disparaît  */
/* quand on a atteint la fin, et n'apparaît pas si tout tient à l'écran.   */
/* ---------------------------------------------------------------------- */
function initTableScrollHints() {
  document.querySelectorAll(".table-scroll").forEach((box) => {
    const wrap = box.querySelector(".table-wrap");
    if (!wrap) return;
    const update = () => {
      const remaining = wrap.scrollWidth - wrap.clientWidth - wrap.scrollLeft;
      box.classList.toggle("has-more", remaining > 4);
    };
    wrap.addEventListener("scroll", update, { passive: true });
    window.addEventListener("resize", update);
    // Les lignes sont injectées par JS : on re-mesure après leur rendu.
    setTimeout(update, 0);
    setTimeout(update, 300);
  });
}
document.addEventListener("DOMContentLoaded", initTableScrollHints);
