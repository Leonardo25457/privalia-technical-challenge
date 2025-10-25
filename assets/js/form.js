(function () {
  const form = document.getElementById("quoteForm");
  const $ = (id) => document.getElementById(id);
  const isEmail = (v) => /^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(v.trim());
  const isPhone = (v) => /^[0-9()\-\s+]{7,20}$/.test(v.trim());
  const isDateMMDDYYYY = (v) => {
    const m = v.trim().match(/^(\d{2})\/(\d{2})\/(\d{4})$/);
    if (!m) return false;
    const mm = +m[1],
      dd = +m[2],
      yyyy = +m[3];
    const dt = new Date(`${yyyy}-${mm}-${dd}`);
    if (isNaN(dt)) return false;
    if (
      dt.getMonth() + 1 !== mm ||
      dt.getDate() !== dd ||
      dt.getFullYear() !== yyyy
    )
      return false;
    const today = new Date();
    const age =
      today.getFullYear() -
      yyyy -
      (today.getMonth() + 1 < mm ||
      (today.getMonth() + 1 === mm && today.getDate() < dd)
        ? 1
        : 0);
    return age >= 18;
  };

  const inputs = {
    firstName: { el: $("firstName"), validate: (v) => v.trim().length > 0 },
    lastName: { el: $("lastName"), validate: (v) => v.trim().length > 0 },
    dob: { el: $("dob"), validate: isDateMMDDYYYY },
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

    const payload = {
      firstName: inputs.firstName.el.value.trim(),
      lastName: inputs.lastName.el.value.trim(),
      dob: inputs.dob.el.value.trim(),
      phone: inputs.phone.el.value.trim(),
      email: inputs.email.el.value.trim(),
      homeStatus: inputs.homeStatus.el.value,
      savedAt: Date.now(),
    };
    localStorage.setItem("privalia_quote", JSON.stringify(payload));

    window.location.href = "results.html";
  });
})();
