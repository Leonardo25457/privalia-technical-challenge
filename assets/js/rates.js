(function () {
  const payload = JSON.parse(localStorage.getItem("privalia_quote") || "{}");
  const fullName = [payload.firstName, payload.lastName]
    .filter(Boolean)
    .join(" ")
    .trim();
  const email = (payload.email || "").trim();

  const $ = (sel) => document.querySelector(sel);
  const setHTML = (sel, html) => {
    const el = $(sel);
    if (el) el.innerHTML = html;
  };

  setHTML(
    "#detailsContact .detail-body",
    `
    <div class="d-inline-flex align-items-center">
      <strong>${fullName || "—"}</strong>
      <a href="quote.html" class="edit-inline"><i class="bi bi-pencil-square"></i> Edit</a>
    </div>
    <div class="mt-1">${email || "—"}</div>
  `
  );

  setHTML(
    "#detailsDrivers .detail-body",
    `
    <div>10001</div>
    <div>${email || "—"}</div>
  `
  );

  setHTML(
    "#detailsVehicles .detail-body",
    `
    <div>2017 Acura <a href="#" class="edit-inline"><i class="bi bi-pencil-square"></i> Edit</a></div>
    <div>ILX DYNAMIC</div>
  `
  );

  const plans = [
    {
      title: "Speak with Rep",
      price: 129.386,
      cta: "Speak with Rep",
      type: "rep",
    },
    { title: "Buy Online", price: 144.33, cta: "Buy Online", type: "buy" },
    {
      title: "Buy with Agent",
      price: 159.13,
      cta: "Buy with Agent",
      type: "agent",
    },
    { title: "Buy Online", price: 44.33, cta: "Buy Online", type: "buy" },
  ];

  const ratesList = document.getElementById("ratesList");
  if (ratesList) {
    ratesList.innerHTML = "";
    plans.forEach((p) => {
      const row = document.createElement("div");
      row.className = "rate-row";
      row.innerHTML = `
        <div class="rate-left">
          <img src="assets/img/logo.svg" class="logo-gray" alt="privalia">
          <div>
            <a href="#" class="see-plan"><i class="bi bi-check-circle"></i> See Plan Details</a>
            <div class="rate-price">$${p.price.toFixed(
              2
            )} <small>/ mo</small></div>
            ${
              p.type === "rep"
                ? `<div class="plan-help">Average in your state*</div>`
                : ``
            }
          </div>
        </div>
        <div>
          <a class="${
            p.type === "rep"
              ? "btn-cta-blue"
              : p.type === "agent"
              ? "btn-cta-blue"
              : "btn-cta-red"
          }" href="#">${p.cta}</a>
        </div>
      `;
      ratesList.appendChild(row);
    });
  }

  const companies = [1, 2, 3, 4];
  const compareList = document.getElementById("compareList");
  if (compareList) {
    compareList.innerHTML = "";
    companies.forEach(() => {
      const row = document.createElement("div");
      row.className = "compare-row";
      row.innerHTML = `
        <div class="d-flex align-items-center gap-3">
          <img src="assets/img/logo.svg" class="logo-gray" alt="privalia" height="24">
          <span class="fw-bold">privalia</span>
        </div>
        <a href="#" class="btn-cta-red">View Rate</a>
      `;
      compareList.appendChild(row);
    });
  }

  window.startOver = function () {
    localStorage.removeItem("privalia_quote");
    window.location.href = "quote.html";
  };
})();
