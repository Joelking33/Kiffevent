/**
 * KIFFEVENT STAFF — staff-dashboard.js
 */
function renderStaffEvent() {
  document.getElementById("staff-event-thumb").style.backgroundImage = STAFF_EVENT.gradient;
}

function scanStatusBadge(status) {
  return status === "Validé" ? '<span class="badge badge-green">Validé</span>' : '<span class="badge badge-red">Refusé</span>';
}

function renderLastValidations() {
  const state = loadAdminState();
  document.getElementById("last-validations-body").innerHTML = state.lastScans.map((s, i) => `
    <tr>
      <td>${i + 1}</td>
      <td><div class="cell-user"><div class="avatar" style="width:30px;height:30px;font-size:10.5px;">${s.name.split(" ").map((w) => w[0]).join("")}</div>${s.name}</div></td>
      <td class="badge-code">${s.ticketNo}</td>
      <td><span class="badge badge-blue">${s.type}</span></td>
      <td>${scanStatusBadge(s.status)}</td>
      <td>${s.time}</td>
      <td class="row-actions"><button class="icon-action" title="Plus">${icon("dots")}</button></td>
    </tr>`).join("");
}

function renderProgressDonut() {
  const state = loadAdminState();
  const s = state.scans;
  renderDonutChart(document.getElementById("progress-donut"), null, {
    segments: [{ label: "Validés", value: s.validated, color: "#16A34A" }, { label: "Rejetés", value: s.rejected, color: "#DC2626" }, { label: "Restants", value: s.remaining, color: "#7C3AED" }],
    centerLabel: `${s.validated} / ${s.total}`, centerValue: Math.round((s.validated / s.total) * 100) + "%",
  });
}

document.addEventListener("DOMContentLoaded", () => {
  renderStaffEvent();
  renderLastValidations();
  renderProgressDonut();
});
