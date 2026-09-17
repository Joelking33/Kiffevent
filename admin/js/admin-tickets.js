/**
 * KIFFEVENT ADMIN — admin-tickets.js
 */
let orderPage = 1;
const ORDER_PAGE_SIZE = 6;

const TICKET_SALES_SERIES = {
  7: { labels: ["19 Juin", "20 Juin", "21 Juin", "22 Juin", "23 Juin", "24 Juin", "25 Juin"], values: [3200, 3800, 3500, 4100, 4600, 6320, 5900] },
  30: { labels: ["19 Mai", "22 Mai", "25 Mai", "28 Mai", "31 Mai", "03 Juin", "06 Juin", "09 Juin", "12 Juin", "15 Juin", "18 Juin", "21 Juin", "24 Juin"], values: [2000, 2600, 3400, 3100, 3800, 4200, 4600, 5100, 4800, 5600, 6000, 5800, 6320] },
  90: { labels: ["Avr", "Mai", "Juin"], values: [58000, 76000, 92000] },
};

function orderStatusBadge(status) {
  const map = { "Payé": "green", "En attente": "amber", "Remboursé": "red" };
  return `<span class="badge badge-${map[status] || "gray"}">${status}</span>`;
}
/* Icône du moyen de paiement : déléguée à js/icons.js */
function methodIcon(method) { return paymentIconByLabel(method); }

function renderTicketsChart(range) {
  const s = TICKET_SALES_SERIES[range];
  renderLineChart(document.getElementById("tickets-chart"), { labels: s.labels, values: s.values, color: "#2E6BF0", tooltipLabel: formatNumber(s.values[s.values.length - 1]) + " billets" });
}

function renderPaymentDonut() {
  renderDonutChart(document.getElementById("payment-donut"), document.getElementById("payment-legend"), {
    segments: [
      { label: "Wave", value: 38, color: "#2E6BF0" },
      { label: "Orange Money", value: 26, color: "#F59E0B" },
      { label: "MTN Mobile Money", value: 18, color: "#FACC15" },
      { label: "Moov Money", value: 10, color: "#7C3AED" },
      { label: "Carte bancaire", value: 8, color: "#0D9488" },
    ],
    centerLabel: "FCFA", centerValue: "12 860 000",
  });
}

function getFilteredOrders() {
  const q = document.getElementById("order-search").value.toLowerCase();
  const status = document.getElementById("order-status-filter").value;
  return ORDERS.filter((o) => (!q || o.user.toLowerCase().includes(q) || o.ref.toLowerCase().includes(q) || o.event.toLowerCase().includes(q)) && (status === "all" || o.status === status));
}

function renderOrdersTable() {
  const list = getFilteredOrders();
  const totalPages = Math.max(1, Math.ceil(list.length / ORDER_PAGE_SIZE));
  orderPage = Math.min(orderPage, totalPages);
  const items = list.slice((orderPage - 1) * ORDER_PAGE_SIZE, orderPage * ORDER_PAGE_SIZE);

  document.getElementById("orders-table-body").innerHTML = items.map((o) => `
    <tr>
      <td><input type="checkbox"></td>
      <td class="badge-code">${o.ref}</td>
      <td><div class="cell-user"><div class="avatar">${o.user.split(" ").map((w) => w[0]).join("")}</div><div><div class="cu-name">${o.user}</div><div class="cu-sub">${o.email}</div></div></div></td>
      <td><div class="event-mini"><span class="dot"></span>${o.event}</div><div class="cu-sub">${o.eventDate}</div></td>
      <td>${o.ticketType}</td>
      <td>${o.qty}</td>
      <td style="font-weight:700;">${formatFCFA(o.amount)}</td>
      <td><span class="pay-cell">${methodIcon(o.method)}${o.method}</span></td>
      <td>${orderStatusBadge(o.status)}</td>
      <td>${o.date}<div class="cu-sub">${o.time}</div></td>
      <td class="row-actions"><button class="icon-action" title="Plus">${icon("dots")}</button></td>
    </tr>`).join("") || `<tr><td colspan="11" style="text-align:center;color:var(--text-muted);padding:30px;">Aucune commande trouvée</td></tr>`;

  document.getElementById("pagination-info").textContent = `Affichage de 1 à ${items.length} sur ${list.length} commandes`;
  let pagesHTML = `<button ${orderPage === 1 ? "disabled" : ""} data-page="prev">‹</button>`;
  for (let p = 1; p <= totalPages; p++) pagesHTML += `<button class="${p === orderPage ? "active" : ""}" data-page="${p}">${p}</button>`;
  pagesHTML += `<button ${orderPage === totalPages ? "disabled" : ""} data-page="next">›</button>`;
  document.getElementById("pagination-pages").innerHTML = pagesHTML;
  document.querySelectorAll("[data-page]").forEach((btn) => btn.addEventListener("click", () => {
    const p = btn.getAttribute("data-page");
    if (p === "prev") orderPage--; else if (p === "next") orderPage++; else orderPage = Number(p);
    renderOrdersTable();
  }));
}

function renderTicketsByEvent() {
  document.getElementById("tickets-by-event").innerHTML = EVENT_TICKET_SALES.map((e) => `
    <div class="ev-sales-row">
      <div class="thumb" style="background-image:${e.gradient}"></div>
      <div class="es-body">
        <div class="es-name">${e.title}</div>
        <div class="es-sub">${formatNumber(e.sold)} billets</div>
        <div class="progress-bg"><div class="progress-fill" style="width:${e.pct}%"></div></div>
      </div>
      <div class="es-pct">${e.pct}%</div>
    </div>`).join("");
}

function renderLastTransactions() {
  document.getElementById("last-transactions").innerHTML = RECENT_TRANSACTIONS.map((t) => `
    <div class="txn-row">
      <div class="txn-icon">${paymentIcon(t.icon)}</div>
      <div><div class="txn-label">${t.label}</div><div class="txn-sub badge-code" style="background:none;color:var(--text-faint);padding:0;">${t.ref}</div></div>
      <div class="txn-amount ${t.positive ? "pos" : "neg"}">${t.amount}<span class="txn-time">${t.time}</span></div>
    </div>`).join("");
}

document.addEventListener("DOMContentLoaded", () => {
  renderTicketsChart(30);
  renderPaymentDonut();
  renderOrdersTable();
  renderTicketsByEvent();
  renderLastTransactions();

  document.querySelectorAll("#ticket-range-tabs button").forEach((btn) => btn.addEventListener("click", () => {
    document.querySelectorAll("#ticket-range-tabs button").forEach((b) => b.classList.remove("active"));
    btn.classList.add("active");
    renderTicketsChart(btn.getAttribute("data-range"));
  }));
  document.getElementById("order-search").addEventListener("input", () => { orderPage = 1; renderOrdersTable(); });
  document.getElementById("order-status-filter").addEventListener("change", () => { orderPage = 1; renderOrdersTable(); });
  document.querySelectorAll(".quick-actions .btn").forEach((btn) => btn.addEventListener("click", () => showToast("Action simulée (démo front-end)", "")));
});
