(function () {
  const AUTH_KEY = "privalia_auth";
  const auth = firebase.auth();

  auth.setPersistence(firebase.auth.Auth.Persistence.LOCAL).catch(console.warn);

  function saveSession(user) {
    if (!user) return;
    const data = {
      email: user.email,
      uid: user.uid,
      provider:
        (user.providerData && user.providerData[0]?.providerId) || "password",
      ts: Date.now(),
    };
    localStorage.setItem(AUTH_KEY, JSON.stringify(data));
  }

  function clearSession() {
    localStorage.removeItem(AUTH_KEY);
  }

  async function signIn(email, password) {
    const cred = await auth.signInWithEmailAndPassword(email, password);
    saveSession(cred.user);
    return cred.user;
  }

  async function register(email, password) {
    const cred = await auth.createUserWithEmailAndPassword(email, password);
    saveSession(cred.user);
    return cred.user;
  }

  async function signInWithGoogle() {
    const provider = new firebase.auth.GoogleAuthProvider();
    const cred = await auth.signInWithPopup(provider);
    saveSession(cred.user);
    return cred.user;
  }

  function onAuth(cb) {
    return auth.onAuthStateChanged((user) => {
      if (user) saveSession(user);
      cb(user || null);
    });
  }

  async function logout() {
    try {
      await auth.signOut();
    } finally {
      clearSession();
    }
  }

  function getSession() {
    try {
      return JSON.parse(localStorage.getItem(AUTH_KEY) || "{}");
    } catch {
      return {};
    }
  }

  function isLogged() {
    const s = getSession();
    return !!s && !!s.email;
  }

  window.PrivaliaAuth = {
    signIn,
    register,
    signInWithGoogle,
    onAuth,
    logout,
    getSession,
    isLogged,
  };
})();
