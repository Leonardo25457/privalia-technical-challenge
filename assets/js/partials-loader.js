async function includePartials() {
  const nodes = document.querySelectorAll("[data-include]");

  async function injectAndRun(el, html) {
    el.innerHTML = html;

    const scripts = el.querySelectorAll("script");
    for (const old of scripts) {
      await new Promise((resolve) => {
        const s = document.createElement("script");
        for (const attr of old.attributes)
          s.setAttribute(attr.name, attr.value);

        if (old.src) {
          s.onload = () => resolve();
          s.onerror = () => resolve();
          document.head.appendChild(s);
        } else {
          s.textContent = old.textContent || "";
          document.head.appendChild(s);
          resolve();
        }
      });
    }
  }

  await Promise.all(
    Array.from(nodes).map(async (el) => {
      const url = el.getAttribute("data-include");
      try {
        const res = await fetch(url, { cache: "no-cache" });
        const html = await res.text();
        await injectAndRun(el, html);
      } catch (e) {
        console.error("No se pudo cargar partial:", url, e);
      }
    })
  );
}

function setActiveNav() {}

document.addEventListener("DOMContentLoaded", () => {
  includePartials().then(setActiveNav);
});
