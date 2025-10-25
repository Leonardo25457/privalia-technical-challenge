document.addEventListener("DOMContentLoaded", () => {
  document
    .querySelectorAll(".detail-card [data-collapsible]")
    .forEach((section) => {
      const headerBtn = section.querySelector(".detail-header");
      const body = section.querySelector(".detail-body");

      section.classList.remove("collapsed");

      headerBtn.addEventListener("click", () => {
        section.classList.toggle("collapsed");
        body.style.display = section.classList.contains("collapsed")
          ? "none"
          : "";
      });
    });

  const btn = document.getElementById("btnStartOver");
  if (btn) {
    btn.addEventListener("click", (e) => {
      e.preventDefault();
      localStorage.removeItem("privalia_quote");
      window.location.href = "quote.html";
    });
  }
});
