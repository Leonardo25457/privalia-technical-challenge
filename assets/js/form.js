(function () {
  const form = document.getElementById("quoteForm");
  const $ = (id) => document.getElementById(id);

  const isEmail = (v) => /^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(v.trim());
  const isPhone = (v) => /^[0-9()\-\s+]{7,20}$/.test(v.trim());

  function parseDOB(v) {
    if (!v) return null;

    if (/^\d{4}-\d{2}-\d{2}$/.test(v)) {
      const [yyyy, mm, dd] = v.split("-").map(Number);
      const dt = new Date(yyyy, mm - 1, dd);
      if (
        dt.getFullYear() === yyyy &&
        dt.getMonth() + 1 === mm &&
        dt.getDate() === dd
      ) {
        return dt;
      }
      return null;
    }

    const m = v.trim().match(/^(\d{2})\/(\d{2})\/(\d{4})$/);
    if (!m) return null;
    const mm = +m[1],
      dd = +m[2],
      yyyy = +m[3];
    const dt = new Date(yyyy, mm - 1, dd);
    if (
      dt.getFullYear() === yyyy &&
      dt.getMonth() + 1 === mm &&
      dt.getDate() === dd
    ) {
      return dt;
    }
    return null;
  }

  function isAdult(dt, years = 18) {
    if (!dt) return false;
    const today = new Date();
    let age = today.getFullYear() - dt.getFullYear();
    const m = today.getMonth() - dt.getMonth();
    if (m < 0 || (m === 0 && today.getDate() < dt.getDate())) age--;
    return age >= years;
  }

  const inputs = {
    firstName: { el: $("firstName"), validate: (v) => v.trim().length > 0 },
    lastName: { el: $("lastName"), validate: (v) => v.trim().length > 0 },
    dob: {
      el: $("dob"),
      validate: (v) => {
        const dt = parseDOB(v);
        return !!dt && isAdult(dt, 18);
      },
    },
    phone: { el: $("phone"), validate: isPhone },
    email: { el: $("email"), validate: isEmail },
    homeStatus: { el: $("homeStatus"), validate: (v) => !!v },
  };

  const attach = ({ el, validate }) => {
    const setState = () => {
      const ok = validate(el.value);
      el.classList.toggle("is-valid", ok);
      el.classList.toggle("is-invalid", !ok && el.value !== "");
    };
    el.addEventListener("input", setState);
    el.addEventListener("blur", setState);
    if (el.tagName === "SELECT") el.addEventListener("change", setState);
  };
  Object.values(inputs).forEach(attach);

  form.addEventListener("submit", function (e) {
    e.preventDefault();
    let allOk = true;
    Object.values(inputs).forEach(({ el, validate }) => {
      const ok = validate(el.value);
      el.classList.toggle("is-valid", ok);
      el.classList.toggle("is-invalid", !ok);
      if (!ok) allOk = false;
    });
    if (!allOk) return;

    const dt = parseDOB(inputs.dob.el.value.trim());
    const dobISO = dt
      ? `${dt.getFullYear()}-${String(dt.getMonth() + 1).padStart(
          2,
          "0"
        )}-${String(dt.getDate()).padStart(2, "0")}`
      : inputs.dob.el.value.trim();

    const payload = {
      firstName: inputs.firstName.el.value.trim(),
      lastName: inputs.lastName.el.value.trim(),
      dob: dobISO,
      phone: inputs.phone.el.value.trim(),
      email: inputs.email.el.value.trim(),
      homeStatus: inputs.homeStatus.el.value,
      savedAt: Date.now(),
    };
    localStorage.setItem("privalia_quote", JSON.stringify(payload));

    window.location.href = "results.html";
  });
})();
