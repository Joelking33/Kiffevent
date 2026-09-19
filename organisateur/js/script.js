/* ============================================================
   KIFFEVENT — ESPACE ORGANISATEUR
   Interactivité (JavaScript Vanilla, sans framework)
   ============================================================ */

(function () {
  "use strict";

  /* ---------- Utilitaires ---------- */
  function $(sel, ctx) { return (ctx || document).querySelector(sel); }
  function $all(sel, ctx) { return Array.prototype.slice.call((ctx || document).querySelectorAll(sel)); }

  function showToast(message) {
    var toast = $("#toast");
    toast.textContent = message;
    toast.classList.add("show");
    clearTimeout(showToast._t);
    showToast._t = setTimeout(function () {
      toast.classList.remove("show");
    }, 2600);
  }

  /* ---------- Navigation entre pages ---------- */
  var pageLinks = $all(".nav-link[data-page], .mobile-tab[data-page], [data-goto]");
  var pages = $all(".page");
  var pageTitleTargets = $all(".nav-link[data-page]");
  var mobileTabs = $all(".mobile-tab[data-page]");

  function goToPage(pageId) {
    pages.forEach(function (p) {
      p.classList.toggle("active", p.getAttribute("data-page") === pageId);
    });
    $all(".nav-link[data-page]").forEach(function (btn) {
      btn.classList.toggle("active", btn.getAttribute("data-page") === pageId);
    });
    mobileTabs.forEach(function (btn) {
      btn.classList.toggle("active", btn.getAttribute("data-page") === pageId);
    });
    closeSidebar();
    window.scrollTo({ top: 0, behavior: "smooth" });
  }

  pageLinks.forEach(function (el) {
    el.addEventListener("click", function () {
      var target = el.getAttribute("data-page") || el.getAttribute("data-goto");
      if (target) goToPage(target);
    });
  });

  /* ---------- Sidebar mobile (drawer) ---------- */
  var sidebar = $("#sidebar");
  var backdrop = $("#backdrop");
  var menuToggle = $("#menuToggle");

  function openSidebar() {
    sidebar.classList.add("open");
    backdrop.classList.add("open");
  }
  function closeSidebar() {
    sidebar.classList.remove("open");
    backdrop.classList.remove("open");
  }
  menuToggle.addEventListener("click", function () {
    sidebar.classList.contains("open") ? closeSidebar() : openSidebar();
  });
  backdrop.addEventListener("click", closeSidebar);

  var mobilePlus = $("#mobilePlus");
  if (mobilePlus) mobilePlus.addEventListener("click", openSidebar);

  /* ---------- Notifications ---------- */
  var bellBtn = $("#bellBtn");
  var notifPanel = $("#notifPanel");
  var notifSidebarBtn = $("#notifSidebarBtn");

  function toggleNotif() { notifPanel.classList.toggle("open"); }
  bellBtn.addEventListener("click", function (e) { e.stopPropagation(); toggleNotif(); });
  notifSidebarBtn.addEventListener("click", function (e) { e.stopPropagation(); toggleNotif(); });
  document.addEventListener("click", function (e) {
    if (!notifPanel.contains(e.target) && e.target !== bellBtn) {
      notifPanel.classList.remove("open");
    }
  });

  /* ---------- Modales génériques ---------- */
  function openModal(id) { $(id).classList.add("open"); }
  function closeModal(el) { el.closest(".modal-overlay").classList.remove("open"); }

  $all("[data-close-modal]").forEach(function (btn) {
    btn.addEventListener("click", function () { closeModal(btn); });
  });
  $all(".modal-overlay").forEach(function (overlay) {
    overlay.addEventListener("click", function (e) {
      if (e.target === overlay) overlay.classList.remove("open");
    });
  });

  $("#openCreateEvent").addEventListener("click", function () { openModal("#createEventModal"); });
  $("#openAddStaff").addEventListener("click", function () { openModal("#addStaffModal"); });

  /* ---------- Aperçu d'image (upload) ---------- */
  function setupImagePreview(inputId, previewId, iconSvg, label) {
    var input = $(inputId);
    var preview = $(previewId);
    if (!input || !preview) return;
    input.addEventListener("change", function () {
      var file = input.files && input.files[0];
      if (!file) return;
      var reader = new FileReader();
      reader.onload = function (e) {
        preview.innerHTML = '<img src="' + e.target.result + '" alt="Aperçu">';
      };
      reader.readAsDataURL(file);
    });
    preview.resetPreview = function () {
      input.value = "";
      preview.innerHTML = iconSvg + '<span>' + label + '</span>';
    };
  }

  var eventImageIcon = '<svg class="ic-svg" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="1.7" stroke-linecap="round" stroke-linejoin="round" aria-hidden="true"><rect x="3" y="5" width="18" height="15" rx="2"/><circle cx="9" cy="10.5" r="1.7"/><path d="m5 18 5-5 3.5 3.5L18 12l2 2"/></svg>';
  var staffImageIcon = '<svg class="ic-svg" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="1.7" stroke-linecap="round" stroke-linejoin="round" aria-hidden="true"><circle cx="12" cy="8.5" r="3.4"/><path d="M5 20c1.4-3.6 4-5.4 7-5.4s5.6 1.8 7 5.4"/></svg>';

  setupImagePreview("#eventImageInput", "#eventImagePreview", eventImageIcon, "Cliquez pour ajouter une image");
  setupImagePreview("#staffImageInput", "#staffImagePreview", staffImageIcon, "Ajouter");

  /* ---------- Catégories de billets (création d'évènement) ---------- */
  var categoryList = $("#categoryList");
  var categorySuggestions = $("#categorySuggestions");
  var addCustomCategoryBtn = $("#addCustomCategoryBtn");
  var categoryRowCount = 0;

  function addCategoryRow(name) {
    categoryRowCount++;
    var row = document.createElement("div");
    row.className = "category-row";
    row.innerHTML =
      '<input type="text" class="cat-name" placeholder="Nom de la catégorie" value="' + (name ? name.replace(/"/g, "&quot;") : "") + '" required>' +
      '<input type="number" class="cat-price" placeholder="Prix (FCFA)" min="0" required>' +
      '<input type="number" class="cat-places" placeholder="Nb places" min="1" required>' +
      '<button type="button" class="category-row-remove" title="Supprimer">&times;</button>';
    categoryList.appendChild(row);

    row.querySelector(".category-row-remove").addEventListener("click", function () {
      var catName = row.querySelector(".cat-name").value.trim();
      row.remove();
      if (catName) {
        var chip = categorySuggestions.querySelector('[data-cat="' + catName + '"]');
        if (chip) chip.classList.remove("chip-disabled");
      }
    });

    return row;
  }

  if (categorySuggestions) {
    $all(".chip", categorySuggestions).forEach(function (chip) {
      chip.addEventListener("click", function () {
        if (chip.classList.contains("chip-disabled")) return;
        addCategoryRow(chip.getAttribute("data-cat"));
        chip.classList.add("chip-disabled");
      });
    });
  }

  if (addCustomCategoryBtn) {
    addCustomCategoryBtn.addEventListener("click", function () {
      addCategoryRow("");
    });
  }

  function resetCategoryBuilder() {
    if (categoryList) categoryList.innerHTML = "";
    if (categorySuggestions) {
      $all(".chip", categorySuggestions).forEach(function (chip) { chip.classList.remove("chip-disabled"); });
    }
  }

  $("#createEventForm").addEventListener("submit", function (e) {
    e.preventDefault();
    this.closest(".modal-overlay").classList.remove("open");
    showToast("Événement créé avec succès (démo)");
    this.reset();
    resetCategoryBuilder();
    if ($("#eventImagePreview").resetPreview) $("#eventImagePreview").resetPreview();
  });

  $("#addStaffForm").addEventListener("submit", function (e) {
    e.preventDefault();
    this.closest(".modal-overlay").classList.remove("open");
    showToast("Membre ajouté à l'équipe (démo)");
    this.reset();
    if ($("#staffImagePreview").resetPreview) $("#staffImagePreview").resetPreview();
  });

  $("#exportBtn").addEventListener("click", function () {
    showToast("Export généré (démo)");
  });

  /* ---------- Filtres & recherche : Événements ---------- */
  var eventFilters = $("#eventFilters");
  var eventSearch = $("#eventSearch");
  var eventRows = $all("#eventsTableBody tr");
  var eventsEmpty = $("#eventsEmpty");
  var currentStatusFilter = "tous";

  function applyEventFilters() {
    var query = (eventSearch.value || "").trim().toLowerCase();
    var visibleCount = 0;
    eventRows.forEach(function (row) {
      var status = row.getAttribute("data-status");
      var name = row.getAttribute("data-name");
      var matchesStatus = currentStatusFilter === "tous" || status === currentStatusFilter;
      var matchesSearch = !query || name.indexOf(query) !== -1;
      var visible = matchesStatus && matchesSearch;
      row.style.display = visible ? "" : "none";
      if (visible) visibleCount++;
    });
    eventsEmpty.style.display = visibleCount === 0 ? "block" : "none";
  }

  if (eventFilters) {
    $all(".filter-tab", eventFilters).forEach(function (tab) {
      tab.addEventListener("click", function () {
        $all(".filter-tab", eventFilters).forEach(function (t) { t.classList.remove("active"); });
        tab.classList.add("active");
        currentStatusFilter = tab.getAttribute("data-status");
        applyEventFilters();
      });
    });
  }
  if (eventSearch) eventSearch.addEventListener("input", applyEventFilters);

  /* Recherche globale du topbar : filtre les événements si on est sur cette page */
  var topSearch = $("#topSearch");
  if (topSearch) {
    topSearch.addEventListener("input", function () {
      var activePage = $(".page.active");
      if (activePage && activePage.getAttribute("data-page") === "events") {
        eventSearch.value = topSearch.value;
        applyEventFilters();
      }
    });
  }

  /* ---------- Onglets Paiements ---------- */
  var paymentsTabs = $("#paymentsTabs");
  var paymentsHistorique = $("#paymentsHistorique");
  var paymentsAnalyses = $("#paymentsAnalyses");

  if (paymentsTabs) {
    $all(".subtab", paymentsTabs).forEach(function (tab) {
      tab.addEventListener("click", function () {
        $all(".subtab", paymentsTabs).forEach(function (t) { t.classList.remove("active"); });
        tab.classList.add("active");
        var target = tab.getAttribute("data-tab");
        paymentsHistorique.style.display = target === "historique" ? "block" : "none";
        paymentsAnalyses.style.display = target === "analyses" ? "block" : "none";
        if (target === "analyses") drawBarChart("#analysesChart", [0, 0, 0, 0, 0, 0]);
      });
    });
  }

  /* ---------- Pagination (démo visuelle) ---------- */
  $all(".pagination").forEach(function (pager) {
    $all(".page-btn", pager).forEach(function (btn) {
      btn.addEventListener("click", function () {
        if (btn.textContent === "‹" || btn.textContent === "›") return;
        $all(".page-btn", pager).forEach(function (b) { b.classList.remove("active"); });
        btn.classList.add("active");
      });
    });
  });

  /* ---------- Graphiques SVG légers (sans librairie) ---------- */
  function drawLineChart(selector, values) {
    var svg = $(selector);
    if (!svg) return;
    var w = 560, h = 170, pad = 12;
    var max = Math.max.apply(null, values) * 1.15 || 1;
    var min = 0;
    var stepX = (w - pad * 2) / (values.length - 1);

    function xy(i, v) {
      var x = pad + i * stepX;
      var y = h - pad - ((v - min) / (max - min)) * (h - pad * 2);
      return [x, y];
    }

    var points = values.map(function (v, i) { return xy(i, v).join(","); }).join(" ");
    var areaPoints = points + " " + (w - pad) + "," + (h - pad) + " " + pad + "," + (h - pad);

    svg.innerHTML =
      '<defs>' +
        '<linearGradient id="areaGrad" x1="0" y1="0" x2="0" y2="1">' +
          '<stop offset="0%" stop-color="#0a63f7" stop-opacity="0.28"/>' +
          '<stop offset="100%" stop-color="#0a63f7" stop-opacity="0"/>' +
        '</linearGradient>' +
      '</defs>' +
      '<polygon points="' + areaPoints + '" fill="url(#areaGrad)"></polygon>' +
      '<polyline points="' + points + '" fill="none" stroke="#0a63f7" stroke-width="3" stroke-linecap="round" stroke-linejoin="round"></polyline>' +
      values.map(function (v, i) {
        var p = xy(i, v);
        return '<circle cx="' + p[0] + '" cy="' + p[1] + '" r="4" fill="#0a63f7" stroke="#fff" stroke-width="2"></circle>';
      }).join("");
  }

  function drawBarChart(selector, values) {
    var svg = $(selector);
    if (!svg) return;
    var w = 560, h = 170, pad = 10, gap = 14;
    var max = Math.max.apply(null, values) * 1.2 || 1;
    var barW = (w - pad * 2 - gap * (values.length - 1)) / values.length;

    var bars = values.map(function (v, i) {
      var barH = (v / max) * (h - pad * 2);
      var x = pad + i * (barW + gap);
      var y = h - pad - barH;
      return '<rect x="' + x + '" y="' + y + '" width="' + barW + '" height="' + barH + '" rx="6" fill="#0a63f7"></rect>';
    }).join("");

    svg.innerHTML = bars;
  }

  // Données de démonstration (7 derniers jours)
  drawLineChart("#salesChart", [0, 0, 0, 0, 0, 0, 0]);

  var salesRange = $("#salesRange");
  if (salesRange) {
    salesRange.addEventListener("change", function () {
      var datasets = {
        "7 jours": [0, 0, 0, 0, 0, 0, 0],
        "30 jours": [0, 0, 0, 0, 0, 0, 0, 0, 0, 0],
        "90 jours": [0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0]
      };
      drawLineChart("#salesChart", datasets[this.value] || datasets["7 jours"]);
    });
  }

  /* ---------- Date du jour (bandeau tableau de bord) ---------- */
  var jours = ["Dimanche","Lundi","Mardi","Mercredi","Jeudi","Vendredi","Samedi"];
  var mois = ["janvier","février","mars","avril","mai","juin","juillet","août","septembre","octobre","novembre","décembre"];
  var now = new Date();
  var dateLabel = $("#todayDate");
  if (dateLabel) {
    dateLabel.textContent = jours[now.getDay()] + " " + now.getDate() + " " + mois[now.getMonth()] + " " + now.getFullYear();
  }

})();
