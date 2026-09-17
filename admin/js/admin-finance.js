/**
 * KIFFEVENT ADMIN — admin-finance.js
 */
let finPage = 1;
const FIN_PAGE_SIZE = 6;

const REVENUE_SERIES = {
  7: { labels: ["19 Juin", "20 Juin", "21 Juin", "22 Juin", "23 Juin", "24 Juin", "25 Juin"], values: [2200000, 2600000, 2400000, 3100000, 3400000, 8750000, 5200000] },
  30: { labels: ["25 Mai", "28 Mai", "31 Mai", "03 Juin", "06 Juin", "09 Juin", "12 Juin", "15 Juin", "18 Juin", "21 Juin", "24 Juin"], values: [2000000, 2600000, 3100000, 3400000, 3900000, 4200000, 4600000, 5100000, 5800000, 6200000, 8750000] },
  90: { labels: ["Avril", "Mai", "Juin"], values: [58000000, 76000000, 92000000] },
};

function txnStatusBadge(status) {
  const map = { "Réussi": "green", "En cours": "amber", "Échoué": "red" };
  return `<span class="badge badge-${map[status] || "gray"}">${status}</span>`;
}
function txnTypeBadge(type) {
  const map = { Billet: "blue", Don: "purple", Remboursement: "red" };
  return `<span class="badge badge-${map[type] || "gray"}">${type}</span>`;
}

const FINANCE_TXNS = [
  { ref: "#TRX-20250624-001", user: "Kouassi Marcel", event: "Festival des Arts", type: "Billet", amount: 40000, method: "Wave", status: "Réussi", date: "24/06/2025", time: "14:32" },
  { ref: "#TRX-20250624-002", user: "Amani Kouadio", event: "Concert Afro Vibes", type: "Billet", amount: 15000, method: "Orange Money", status: "Réussi", date: "24/06/2025", time: "13:15" },
  { ref: "#TRX-20250623-015", user: "Yao Konan", event: "Tech & Innovation", type: "Don", amount: 20000, method: "MTN MoMo", status: "Réussi", date: "23/06/2025", time: "16:20" },
  { ref: "#TRX-20250623-014", user: "Bamba Fatou", event: "Festival Food & Music", type: "Billet", amount: 12000, method: "Moov Money", status: "Réussi", date: "23/06/2025", time: "11:45" },
  { ref: "#TRX-20250622-012", user: "Diabaté Moussa", event: "Salon de l'Emploi", type: "Remboursement", amount: -40000, method: "Wave", status: "En cours", date: "22/06/2025", time: "17:30" },
  { ref: "#TRX-20250622-011", user: "Traoré Ibrahim", event: "Conférence Leadership", type: "Billet", amount: 10000, method: "Orange Money", status: "Réussi", date: "22/06/2025", time: "10:12" },
];

function renderRevenueChart(range) {
  const s = REVENUE_SERIES[range];
  renderLineChart(document.getElementById("revenue-chart"), { labels: s.labels, values: s.values, color: "#2E6BF0", formatValue: (v) => formatFCFA(v), tooltipLabel: formatFCFA(s.values[s.values.length - 1]) });
}

function renderFinDonut() {
  renderDonutChart(document.getElementById("fin-donut"), document.getElementById("fin-legend"), {
    segments: REVENUE_BREAKDOWN.map((r) => ({ label: r.label, value: r.value, color: r.color })),
    centerLabel: "FCFA", centerValue: "28 450 000",
  });
}

function getFilteredTxns() {
  const q = document.getElementById("txn-search").value.toLowerCase();
  return FINANCE_TXNS.filter((t) => !q || t.user.toLowerCase().includes(q) || t.ref.toLowerCase().includes(q) || t.event.toLowerCase().includes(q));
}

function renderFinanceTable() {
  const list = getFilteredTxns();
  const totalPages = Math.max(1, Math.ceil(list.length / FIN_PAGE_SIZE));
  finPage = Math.min(finPage, totalPages);
  const items = list.slice((finPage - 1) * FIN_PAGE_SIZE, finPage * FIN_PAGE_SIZE);
  document.getElementById("finance-table-body").innerHTML = items.map((t) => `
    <tr>
      <td><input type="checkbox"></td>
      <td class="badge-code">${t.ref}</td>
      <td><div class="cell-user"><div class="avatar">${t.user.split(" ").map((w) => w[0]).join("")}</div><div class="cu-name">${t.user}</div></div></td>
      <td>${t.event}</td>
      <td>${txnTypeBadge(t.type)}</td>
      <td style="font-weight:700; color:${t.amount < 0 ? "var(--red)" : "var(--navy)"};">${t.amount < 0 ? "- " : ""}${formatFCFA(Math.abs(t.amount))}</td>
      <td>${t.method}</td>
      <td>${txnStatusBadge(t.status)}</td>
      <td>${t.date}<div class="cu-sub">${t.time}</div></td>
      <td class="row-actions"><button class="icon-action" title="Plus">${icon("dots")}</button></td>
    </tr>`).join("");
  document.getElementById("pagination-info").textContent = `Affichage de 1 à ${items.length} sur ${list.length} transactions`;
  let pagesHTML = `<button ${finPage === 1 ? "disabled" : ""} data-page="prev">‹</button>`;
  for (let p = 1; p <= totalPages; p++) pagesHTML += `<button class="${p === finPage ? "active" : ""}" data-page="${p}">${p}</button>`;
  pagesHTML += `<button ${finPage === totalPages ? "disabled" : ""} data-page="next">›</button>`;
  document.getElementById("pagination-pages").innerHTML = pagesHTML;
  document.querySelectorAll("[data-page]").forEach((btn) => btn.addEventListener("click", () => {
    const p = btn.getAttribute("data-page");
    if (p === "prev") finPage--; else if (p === "next") finPage++; else finPage = Number(p);
    renderFinanceTable();
  }));
}

function renderFinanceSummary() {
  document.getElementById("finance-summary").innerHTML = FINANCE_SUMMARY.map((s) => `
    <div class="summary-row">
      <div class="sr-top"><span>${s.label}</span><b>${formatFCFA(s.value)}</b></div>
      <div class="progress-bg"><div class="progress-fill" style="width:${s.pct}%"></div></div>
      <div class="sr-pct">${s.pct}%</div>
    </div>`).join("");
}

function renderPaymentMethodsList() {
  document.getElementById("payment-methods-list").innerHTML = PAYMENT_METHODS.map((m) => `
    <div class="pm-row">
      <div class="pm-icon">${paymentIcon(m.icon)}</div>
      <div class="pm-body">
        <div class="pm-name">${m.name}</div>
        <div class="progress-bg"><div class="progress-fill" style="width:${m.pct}%"></div></div>
      </div>
      <div class="pm-amount">${formatFCFA(m.amount)}</div>
    </div>`).join("");
}

function renderFinanceActivity() {
  document.getElementById("finance-activity").innerHTML = RECENT_TRANSACTIONS.map((t) => `
    <div class="txn-row">
      <div class="txn-icon">${paymentIcon(t.icon)}</div>
      <div><div class="txn-label">${t.label}</div><div class="txn-sub">${t.ref.replace('#','').split('-').slice(0,2).join(' - ')}</div></div>
      <div class="txn-amount ${t.positive ? "pos" : "neg"}">${t.amount}<span class="txn-time">${t.time}</span></div>
    </div>`).join("");
}

document.addEventListener("DOMContentLoaded", () => {
  renderRevenueChart(30);
  renderFinDonut();
  renderFinanceTable();
  renderFinanceSummary();
  renderPaymentMethodsList();
  renderFinanceActivity();

  document.querySelectorAll("#rev-range-tabs button").forEach((btn) => btn.addEventListener("click", () => {
    document.querySelectorAll("#rev-range-tabs button").forEach((b) => b.classList.remove("active"));
    btn.classList.add("active");
    renderRevenueChart(btn.getAttribute("data-range"));
  }));
  document.getElementById("txn-search").addEventListener("input", () => { finPage = 1; renderFinanceTable(); });
});
