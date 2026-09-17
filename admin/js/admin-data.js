/**
 * KIFFEVENT — admin-data.js
 * Données de démonstration partagées par les 6 écrans Admin et 2 écrans Staff.
 * Aucun backend n'est connecté : tout est simulé côté client et persisté
 * dans localStorage pour rester cohérent entre les pages.
 */
const ADMIN_STORAGE_KEY = "kiffevent_admin_state_v1";

const ADMIN_USER = { name: "Admin", role: "Administrateur", initials: "AD" };
const STAFF_USER = { name: "Bamba Fatou", role: "Staff", initials: "BF" };

function formatFCFA(n) {
  return n.toLocaleString("fr-FR").replace(/,/g, " ") + " FCFA";
}
function formatNumber(n) {
  return n.toLocaleString("fr-FR").replace(/,/g, " ");
}

/* ---------------------------------------------------------------------- */
/* Utilisateurs (démo)                                                     */
/* ---------------------------------------------------------------------- */
const USERS = [
  { name: "Kouassi Marcel", handle: "@kouassi_m", email: "kouassi.marcel@gmail.com", phone: "+225 07 12 34 56 78", type: "Client", status: "Actif", registered: "12 avr. 2025", registeredAgo: "il y a 2 mois" },
  { name: "Amani Kouadio", handle: "@amani_k", email: "amani.kouadio@gmail.com", phone: "+225 05 98 76 54 32", type: "Client", status: "Actif", registered: "28 mai 2025", registeredAgo: "il y a 1 mois" },
  { name: "Yao Konan", handle: "@yao_konan", email: "contact@afroevents.ci", phone: "+225 07 08 90 12 34", type: "Organisateur", status: "Actif", registered: "15 mars 2025", registeredAgo: "il y a 3 mois" },
  { name: "Bamba Fatou", handle: "@fatou_b", email: "fatou.bamba@gmail.com", phone: "+225 01 23 45 67 89", type: "Client", status: "Actif", registered: "3 juin 2025", registeredAgo: "il y a 3 semaines" },
  { name: "Diabaté Moussa", handle: "@moussa_d", email: "moussa.diabate@eventci.com", phone: "+225 05 67 89 01 23", type: "Organisateur", status: "Actif", registered: "22 févr. 2025", registeredAgo: "il y a 4 mois" },
  { name: "N'Guessan Samuel", handle: "@samuel_ng", email: "samuel@kiffevent.com", phone: "+225 07 45 67 89 10", type: "Staff", status: "Actif", registered: "10 mai 2025", registeredAgo: "il y a 2 mois" },
  { name: "Alloua Vanessa", handle: "@vanessa_a", email: "alloua.vanessa@gmail.com", phone: "+225 05 12 34 56 78", type: "Client", status: "Suspendu", registered: "18 juin 2025", registeredAgo: "il y a 1 semaine" },
  { name: "Traoré Ibrahim", handle: "@ibrahim_t", email: "traore@cultureplus.ci", phone: "+225 07 78 90 12 34", type: "Organisateur", status: "Actif", registered: "5 avr. 2025", registeredAgo: "il y a 2 mois" },
  { name: "Coulibaly Aminata", handle: "@aminata_c", email: "amina@kiffevent.com", phone: "+225 01 98 76 54 32", type: "Staff", status: "Actif", registered: "12 mai 2025", registeredAgo: "il y a 1 mois" },
  { name: "Kouamé Jean", handle: "@jean_k", email: "kouame.jean@gmail.com", phone: "+225 05 43 21 76 98", type: "Client", status: "Suspendu", registered: "1 juin 2025", registeredAgo: "il y a 3 semaines" },
];

/* ---------------------------------------------------------------------- */
/* Événements (démo)                                                       */
/* ---------------------------------------------------------------------- */
const ADMIN_EVENTS = [
  { title: "Festival des Arts", tags: "Culture • Musique • Art", category: "Culture & Arts", organizer: "Culture & Co", date: "25 Avr. 2025", time: "18h00", location: "Palais de la Culture, Abidjan", status: "Publié", gradient: "linear-gradient(135deg,#1D4ED8,#7C3AED)" },
  { title: "Concert Afro Vibes", tags: "Musique • Live", category: "Musique", organizer: "Afro Events", date: "03 Mai 2025", time: "20h00", location: "Parc des Expositions, Abidjan", status: "Publié", gradient: "linear-gradient(135deg,#0EA5E9,#1D4ED8)" },
  { title: "Tech & Innovation Summit", tags: "Tech • Business", category: "Conférence", organizer: "TechHub", date: "17 Mai 2025", time: "09h00", location: "Sofitel Hôtel Ivoire, Abidjan", status: "Brouillon", gradient: "linear-gradient(135deg,#1E3A8A,#2563EB)" },
  { title: "Festival Food & Music", tags: "Food • Musique", category: "Gastronomie", organizer: "Bon Goût", date: "24 Mai 2025", time: "12h00", location: "Parc des Sports, Abidjan", status: "Publié", gradient: "linear-gradient(135deg,#B45309,#F59E0B)" },
  { title: "Salon de l'Emploi", tags: "Carrière • Formation", category: "Carrière", organizer: "Career Boost", date: "07 Juin 2025", time: "08h00", location: "Palais des Congrès, Abidjan", status: "Programmé", gradient: "linear-gradient(135deg,#0369A1,#0EA5E9)" },
  { title: "Tourisme & Découverte", tags: "Voyage • Tourisme", category: "Tourisme", organizer: "Explore CI", date: "14 Juin 2025", time: "10h00", location: "Grand-Bassam", status: "Terminé", gradient: "linear-gradient(135deg,#0D9488,#2DD4BF)" },
  { title: "Conférence Leadership", tags: "Business • Développement", category: "Conférence", organizer: "NextGen", date: "21 Juin 2025", time: "09h00", location: "Radisson Blu, Abidjan", status: "Publié", gradient: "linear-gradient(135deg,#1D4ED8,#60A5FA)" },
  { title: "Gala de Charité", tags: "Solidarité • Donation", category: "Solidarité", organizer: "Cœur d'Afrique", date: "28 Juin 2025", time: "18h00", location: "Hôtel Président, Abidjan", status: "Archivé", gradient: "linear-gradient(135deg,#7C3AED,#C4B5FD)" },
];

const EVENT_CATEGORIES = [
  { name: "Musique", count: 68, color: "#2E6BF0" },
  { name: "Culture & Arts", count: 42, color: "#7C3AED" },
  { name: "Sport", count: 37, color: "#16A34A" },
  { name: "Conférence", count: 28, color: "#0D9488" },
  { name: "Gastronomie", count: 25, color: "#F59E0B" },
  { name: "Solidarité", count: 18, color: "#DC2626" },
  { name: "Tourisme", count: 15, color: "#0EA5E9" },
  { name: "Autres", count: 15, color: "#64748B" },
];

/* ---------------------------------------------------------------------- */
/* Commandes / billets / transactions (démo)                               */
/* ---------------------------------------------------------------------- */
const ORDERS = [
  { ref: "#KE-20250624-001", user: "Kouassi Marcel", email: "kouassi.m@gmail.com", event: "Festival des Arts", eventDate: "25 Juin 2025", ticketType: "VIP", qty: 2, amount: 40000, method: "Wave", status: "Payé", date: "24/06/2025", time: "14:32" },
  { ref: "#KE-20250624-002", user: "Amani Kouadio", email: "amani.k@gmail.com", event: "Tech & Innovation", eventDate: "17 Mai 2025", ticketType: "Standard", qty: 1, amount: 15000, method: "Orange Money", status: "Payé", date: "24/06/2025", time: "13:15" },
  { ref: "#KE-20250623-015", user: "Yao Konan", email: "yao.k@gmail.com", event: "Concert Afro Vibes", eventDate: "03 Mai 2025", ticketType: "VIP", qty: 3, amount: 75000, method: "MTN MoMo", status: "En attente", date: "23/06/2025", time: "16:20" },
  { ref: "#KE-20250623-014", user: "Bamba Fatou", email: "fatou.b@gmail.com", event: "Festival Food & Music", eventDate: "24 Mai 2025", ticketType: "Normal", qty: 1, amount: 12000, method: "Moov Money", status: "Payé", date: "23/06/2025", time: "11:45" },
  { ref: "#KE-20250622-012", user: "Diabaté Moussa", email: "moussa.d@gmail.com", event: "Salon de l'Emploi", eventDate: "07 Juin 2025", ticketType: "VIP", qty: 2, amount: 40000, method: "Wave", status: "Remboursé", date: "22/06/2025", time: "17:30" },
  { ref: "#KE-20250622-011", user: "Traoré Ibrahim", email: "traore.i@gmail.com", event: "Conférence Leadership", eventDate: "21 Juin 2025", ticketType: "Standard", qty: 1, amount: 10000, method: "Orange Money", status: "Payé", date: "22/06/2025", time: "10:12" },
];

const EVENT_TICKET_SALES = [
  { title: "Festival des Arts", sold: 8540, pct: 85, gradient: "linear-gradient(135deg,#1D4ED8,#7C3AED)" },
  { title: "Tech & Innovation Summit", sold: 6320, pct: 63, gradient: "linear-gradient(135deg,#1E3A8A,#2563EB)" },
  { title: "Concert Afro Vibes", sold: 4850, pct: 49, gradient: "linear-gradient(135deg,#0EA5E9,#1D4ED8)" },
  { title: "Festival Food & Music", sold: 3760, pct: 38, gradient: "linear-gradient(135deg,#B45309,#F59E0B)" },
  { title: "Salon de l'Emploi", sold: 2140, pct: 21, gradient: "linear-gradient(135deg,#0369A1,#0EA5E9)" },
];

const RECENT_TRANSACTIONS = [
  { icon: "wave", label: "Paiement reçu (Wave)", ref: "#KE-20250624-001", amount: "+ 40 000 FCFA", positive: true, time: "Il y a 12 min" },
  { icon: "orange", label: "Remboursement (Orange Money)", ref: "#KE-20250623-014", amount: "- 15 000 FCFA", positive: false, time: "Il y a 1 h" },
  { icon: "mtn", label: "Paiement reçu (MTN MoMo)", ref: "#KE-20250622-011", amount: "+ 12 000 FCFA", positive: true, time: "Il y a 2 h" },
  { icon: "resale", label: "Revente de billet", ref: "#KE-20250621-008", amount: "+ 18 000 FCFA", positive: true, time: "Il y a 3 h" },
];

/* ---------------------------------------------------------------------- */
/* Finances (démo)                                                         */
/* ---------------------------------------------------------------------- */
const REVENUE_BREAKDOWN = [
  { label: "Billetterie", value: 58, color: "#2E6BF0" },
  { label: "Commissions", value: 15, color: "#7C3AED" },
  { label: "Reventes", value: 8, color: "#0D9488" },
  { label: "Donations", value: 6, color: "#F59E0B" },
  { label: "Autres", value: 13, color: "#94A3B8" },
];
const PAYMENT_METHODS = [
  { name: "Wave", amount: 12000000, pct: 42, icon: "wave" },
  { name: "Orange Money", amount: 6840000, pct: 24, icon: "orange" },
  { name: "MTN Mobile Money", amount: 5130000, pct: 18, icon: "mtn" },
  { name: "Moov Money", amount: 2840000, pct: 10, icon: "moov" },
  { name: "Carte bancaire", amount: 1640000, pct: 6, icon: "card" },
];
const FINANCE_SUMMARY = [
  { label: "Revenus billetterie", value: 16500000, pct: 57 },
  { label: "Commissions plateforme", value: 4320000, pct: 15 },
  { label: "Reventes de billets", value: 2280000, pct: 8 },
  { label: "Donations & sondages", value: 1710000, pct: 6 },
  { label: "Autres revenus", value: 3640000, pct: 13 },
];

/* ---------------------------------------------------------------------- */
/* Sécurité (démo)                                                         */
/* ---------------------------------------------------------------------- */
const ACTIVITY_LOG = [
  { user: "Admin", action: "Connexion", details: "Connexion réussie", ip: "41.200.12.45", status: "Succès", date: "25 juin 2025", time: "14:32" },
  { user: "Kouassi Marcel", action: "Modération", details: "Événement approuvé", ip: "102.98.45.12", status: "Succès", date: "25 juin 2025", time: "13:17" },
  { user: "Amani Kouadio", action: "Tentative de connexion", details: "Mot de passe incorrect", ip: "41.123.67.89", status: "Échec", date: "25 juin 2025", time: "11:03" },
  { user: "Admin", action: "Paramètres", details: "Modification des commissions", ip: "41.200.12.45", status: "Succès", date: "25 juin 2025", time: "09:45" },
  { user: "Diabaté Moussa", action: "Création", details: "Nouvel organisateur", ip: "197.210.56.78", status: "Succès", date: "25 juin 2025", time: "08:21" },
];
const RECENT_SESSIONS = [
  { device: "Windows - Chrome", location: "Abidjan, CI", date: "25 juin 2025", time: "14:32", status: "En ligne" },
  { device: "Android - Chrome", location: "Abidjan, CI", date: "25 juin 2025", time: "12:17", status: "En ligne" },
  { device: "Windows - Edge", location: "Yamoussoukro, CI", date: "24 juin 2025", time: "20:45", status: "Déconnecté" },
  { device: "iPhone - Safari", location: "Abidjan, CI", date: "24 juin 2025", time: "16:22", status: "Déconnecté" },
  { device: "Linux - Chrome", location: "Bouaké, CI", date: "23 juin 2025", time: "11:03", status: "Déconnecté" },
];
const SECURITY_ALERTS = [
  { icon: "alert", type: "amber", title: "Tentative de connexion suspecte", sub: "IP 41.123.67.89 - Abidjan", time: "il y a 2 h" },
  { icon: "bell", type: "amber", title: "Nouvelle inscription en attente", sub: "Organisateur - Festival des Arts", time: "il y a 4 h" },
  { icon: "upload", type: "blue", title: "Mise à jour de sécurité", sub: "Système et dépendances", time: "il y a 1 j" },
  { icon: "checkCircle", type: "green", title: "Sauvegarde réussie", sub: "Base de données - 25 juin 2025", time: "il y a 1 j" },
  { icon: "wrench", type: "blue", title: "Rappel de maintenance", sub: "Prévue le 28 juin 2025", time: "il y a 2 j" },
];

/* ---------------------------------------------------------------------- */
/* Staff — scan de billets (démo)                                          */
/* ---------------------------------------------------------------------- */
const STAFF_EVENT = { title: "Festival des Arts", type: "Concert", category: "Musique", location: "Palais de la Culture, Abidjan", date: "25 mai 2025", time: "14h00 - 22h00", organizer: "KiffEvent Organisation", gradient: "linear-gradient(135deg,#1D4ED8,#7C3AED)" };

const SCAN_RESULTS_POOL = [
  { result: "valid", name: "Koffi Estelle", email: "koffi.e@gmail.com", ticketType: "Standard", ticketNo: "KE-20250524-007", time: "14h00 - 22h00", entry: "Porte principale" },
  { result: "valid", name: "N'Dri Ali", email: "ndri.a@gmail.com", ticketType: "VIP", ticketNo: "KE-20250524-008", time: "14h00 - 22h00", entry: "Porte VIP" },
  { result: "used", name: "Kouassi Marcel", email: "kouassi.m@gmail.com", ticketType: "VIP", ticketNo: "KE-20250524-001", time: "14h00 - 22h00", entry: "Porte principale", usedAt: "14:32" },
  { result: "invalid", name: null, ticketNo: "KE-XXXXX-000" },
];

const LAST_SCANS_SEED = [
  { name: "Kouassi Marcel", ticketNo: "KE-20250524-001", type: "VIP", status: "Validé", time: "14:32" },
  { name: "Amani Kouadio", ticketNo: "KE-20250524-002", type: "Standard", status: "Validé", time: "14:27" },
  { name: "Yao Konan", ticketNo: "KE-20250524-003", type: "VIP", status: "Refusé", time: "14:25" },
  { name: "Bamba Fatou", ticketNo: "KE-20250524-004", type: "Normal", status: "Validé", time: "14:23" },
  { name: "Diabaté Moussa", ticketNo: "KE-20250524-005", type: "Standard", status: "Validé", time: "14:20" },
  { name: "Traoré Ibrahim", ticketNo: "KE-20250524-006", type: "VIP", status: "Validé", time: "14:18" },
];

const DEFAULT_ADMIN_STATE = {
  scans: { validated: 162, rejected: 3, pending: 4, remaining: 86, total: 248 },
  lastScans: LAST_SCANS_SEED,
  notifications: 3,
};

function loadAdminState() {
  try {
    const raw = localStorage.getItem(ADMIN_STORAGE_KEY);
    if (!raw) { saveAdminState(DEFAULT_ADMIN_STATE); return JSON.parse(JSON.stringify(DEFAULT_ADMIN_STATE)); }
    return JSON.parse(raw);
  } catch (e) { return JSON.parse(JSON.stringify(DEFAULT_ADMIN_STATE)); }
}
function saveAdminState(state) { localStorage.setItem(ADMIN_STORAGE_KEY, JSON.stringify(state)); }
function updateAdminState(mutator) { const s = loadAdminState(); mutator(s); saveAdminState(s); return s; }

/* ---------------------------------------------------------------------- */
/* Toasts                                                                   */
/* ---------------------------------------------------------------------- */
function showToast(message, type) {
  let wrap = document.querySelector(".toast-wrap");
  if (!wrap) { wrap = document.createElement("div"); wrap.className = "toast-wrap"; document.body.appendChild(wrap); }
  const toast = document.createElement("div");
  toast.className = "toast" + (type ? " " + type : "");
  toast.textContent = message;
  wrap.appendChild(toast);
  setTimeout(() => toast.remove(), 3200);
}

/* Les icônes de paiement sont fournies par js/icons.js (paymentIcon). */
