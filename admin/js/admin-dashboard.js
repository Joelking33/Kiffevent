/**
 * KIFFEVENT ADMIN — admin-dashboard.js
 */
const SALES_SERIES = {
  7: { labels: ["10 Avr", "11 Avr", "12 Avr", "13 Avr", "14 Avr", "15 Avr", "16 Avr"], values: [18000, 22500, 19800, 26200, 24000, 21500, 32000] },
  30: { labels: ["19 Mai", "22 Mai", "25 Mai", "28 Mai", "31 Mai", "03 Juin", "06 Juin", "09 Juin", "12 Juin", "15 Juin", "18 Juin", "21 Juin", "24 Juin"], values: [1900, 2600, 2100, 3300, 2500, 3600, 3100, 4200, 3900, 4700, 5100, 4600, 6320] },
  90: { labels: ["Avr S1", "Avr S2", "Avr S3", "Avr S4", "Mai S1", "Mai S2", "Mai S3", "Mai S4", "Juin S1", "Juin S2", "Juin S3", "Juin S4"], values: [14000, 16500, 15200, 19800, 21000, 23500, 22000, 26800, 27500, 29200, 31000, 34500] },
};

function renderSalesChart(range) {
  const s = SALES_SERIES[range];
  renderLineChart(document.getElementById("sales-chart"), {
    labels: s.labels, values: s.values, color: "#2E6BF0",
    tooltipLabel: formatNumber(s.values[s.values.length - 1]) + " billets",
  });
}

function renderRevenueDonut() {
  renderDonutChart(document.getElementById("revenue-donut"), document.getElementById("revenue-legend"), {
    segments: REVENUE_BREAKDOWN.map((r) => ({ label: r.label, value: r.value, color: r.color })),
    centerLabel: "FCFA", centerValue: "28 450 000",
  });
}

function renderRecentEvents() {
  const rows = ADMIN_EVENTS.slice(0, 5).map((e) => `
    <tr>
      <td><div class="ev-thumb" style="background-image:${e.gradient}"></div></td>
      <td class="ev-name-cell">${e.title}</td>
      <td>${e.organizer}</td>
      <td>${e.date}</td>
      <td>${statusBadge(e.status)}</td>
      <td class="row-actions"><button class="icon-action" title="Voir">${icon("eye")}</button><button class="icon-action" title="Plus">${icon("dots")}</button></td>
    </tr>`).join("");
  document.getElementById("recent-events-body").innerHTML = rows;
}

function statusBadge(status) {
  const map = { "Publié": "green", "Brouillon": "amber", "Programmé": "purple", "Terminé": "gray", "Archivé": "gray" };
  return `<span class="badge badge-${map[status] || "gray"}">${status}</span>`;
}

const ORG_COLORS = ["#2E6BF0", "#7C3AED", "#0D9488", "#F59E0B", "#DC2626"];
function renderTopOrganizers() {
  const orgs = [
    { name: "Culture & Co", events: 8, revenue: 6850000 },
    { name: "Afro Events", events: 6, revenue: 5320000 },
    { name: "TechHub", events: 4, revenue: 3980000 },
    { name: "Bon Goût", events: 3, revenue: 2640000 },
    { name: "Career Boost", events: 3, revenue: 2120000 },
  ];
  document.getElementById("top-organizers-list").innerHTML = orgs.map((o, i) => `
    <div class="org-row">
      <span class="rank-badge">${i + 1}</span>
      <div class="org-logo" style="background:${ORG_COLORS[i]}">${o.name.slice(0, 2).toUpperCase()}</div>
      <div><div class="o-name">${o.name}</div><div class="o-sub">${o.events} événements</div></div>
      <div class="o-amount">${formatFCFA(o.revenue)}</div>
    </div>`).join("");
}

function renderRecentActivity() {
  const items = [
    { icon: "user", color: "blue", title: "Nouvel utilisateur inscrit", sub: "kouassi.mariam@gmail.com", time: "il y a 5 min" },
    { icon: "ticket", color: "purple", title: "Vente de billet", sub: "Festival des Arts - 3 billets", time: "il y a 12 min" },
    { icon: "calendar", color: "blue", title: "Nouvel événement créé", sub: "Concert Afro Vibes", time: "il y a 25 min" },
    { icon: "card", color: "green", title: "Paiement reçu", sub: "8 500 FCFA - Commande #KD5842", time: "il y a 40 min" },
    { icon: "flag", color: "red", title: "Signalement d'un contenu", sub: "Événement suspect", time: "il y a 1 h" },
  ];
  document.getElementById("recent-activity-list").innerHTML = items.map((it) => `
    <div class="list-card-item">
      <div class="lci-icon badge-${it.color}" style="background:var(--${it.color}-bg, var(--blue-100));">${icon(it.icon)}</div>
      <div><div class="lci-title">${it.title}</div><div class="lci-sub">${it.sub}</div></div>
      <div class="lci-time">${it.time}</div>
    </div>`).join("");
}

function renderAlerts() {
  document.getElementById("alerts-list").innerHTML = SECURITY_ALERTS.slice(0, 4).map((a) => `
    <div class="list-card-item">
      <div class="lci-icon" style="background:var(--${a.type}-bg);">${icon(a.icon)}</div>
      <div><div class="lci-title">${a.title}</div><div class="lci-sub">${a.sub}</div></div>
      <div class="lci-time">${a.time}</div>
    </div>`).join("");
}

document.addEventListener("DOMContentLoaded", () => {
  renderSalesChart(7);
  renderRevenueDonut();
  renderRecentEvents();
  renderTopOrganizers();
  renderRecentActivity();
  renderAlerts();

  document.querySelectorAll("#sales-range-tabs button").forEach((btn) => {
    btn.addEventListener("click", () => {
      document.querySelectorAll("#sales-range-tabs button").forEach((b) => b.classList.remove("active"));
      btn.classList.add("active");
      renderSalesChart(btn.getAttribute("data-range"));
    });
  });
});
