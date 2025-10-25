(function () {
  function ready(fn) {
    if (document.readyState !== "loading") fn();
    else document.addEventListener("DOMContentLoaded", fn);
  }

  function getSessionSafe() {
    try {
      return JSON.parse(localStorage.getItem("privalia_auth") || "{}");
    } catch {
      return {};
    }
  }
  function hasLocalSession() {
    return !!getSessionSafe().email;
  }

  function hydrateLocalFromFirebase(user) {
    if (!user) return;
    const s = getSessionSafe();
    if (!s || !s.email) {
      const data = {
        email: user.email,
        uid: user.uid,
        provider:
          (user.providerData && user.providerData[0]?.providerId) || "password",
        ts: Date.now(),
      };
      localStorage.setItem("privalia_auth", JSON.stringify(data));
    }
  }

  function waitFirebaseAuth(timeoutMs = 1200) {
    return new Promise((resolve) => {
      if (!window.firebase || !firebase.auth) {
        resolve(null);
        return;
      }
      let done = false;
      const auth = firebase.auth();
      const t = setTimeout(() => {
        if (!done) {
          done = true;
          resolve(auth.currentUser || null);
        }
      }, timeoutMs);
      auth.onAuthStateChanged((user) => {
        if (!done) {
          done = true;
          clearTimeout(t);
          resolve(user || null);
        }
      });
    });
  }

  ready(async function () {
    const isLogin = /\/login\.html(\?|#|$)/.test(location.pathname);

    const prev = document.documentElement.style.visibility;
    document.documentElement.style.visibility = "hidden";

    try {
      if (hasLocalSession()) {
        if (isLogin) location.replace("quote.html");
        else document.documentElement.style.visibility = prev || "visible";
        return;
      }

      const user = await waitFirebaseAuth();
      if (user) {
        hydrateLocalFromFirebase(user);
        if (isLogin) {
          location.replace("quote.html");
          return;
        }
        document.documentElement.style.visibility = prev || "visible";
        return;
      }

      if (!isLogin) {
        location.replace("login.html");
        return;
      }
      document.documentElement.style.visibility = prev || "visible";
    } catch {
      if (!isLogin) location.replace("login.html");
      else document.documentElement.style.visibility = prev || "visible";
    }
  });
})();
