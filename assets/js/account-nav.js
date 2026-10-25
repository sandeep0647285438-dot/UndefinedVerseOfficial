
import { supabase } from "./supabase.js";

const link = document.getElementById("account-nav-link");
const label = document.getElementById("account-nav-label");

if (link) {
  const onProfilePage = window.location.pathname.includes("/pages/");
  const accountPath = onProfilePage ? "account.html" : "pages/account.html";
  const profilePath = onProfilePage ? "profile.html" : "pages/profile.html";

  function safeImageUrl(value) {
    if (!value) return null;

    try {
      const url = new URL(value);
      return ["https:", "http:"].includes(url.protocol) ? url.href : null;
    } catch {
      return null;
    }
  }

  function setSignedOut() {
    link.href = accountPath;
    link.classList.remove("account-avatar-link");
    link.removeAttribute("title");
    link.setAttribute("aria-label", "Sign in to UndefinedVerseOfficial");
    link.replaceChildren();

    const text = document.createElement("span");
    text.textContent = "Sign in";
    link.append(text);
  }

  function setSignedIn(profile, user) {
    const username = profile?.username || "";
    const displayName =
      profile?.display_name?.trim() || username || "My account";

    link.href = username
      ? `${profilePath}?username=${encodeURIComponent(username)}`
      : `${profilePath}?id=${encodeURIComponent(user.id)}`;

    link.classList.add("account-avatar-link");
    link.title = displayName;
    link.setAttribute("aria-label", `Open ${displayName}'s profile`);
    link.replaceChildren();

    const imageUrl = safeImageUrl(profile?.avatar_url);

    if (imageUrl) {
      const image = document.createElement("img");
      image.src = imageUrl;
      image.alt = "";
      image.width = 36;
      image.height = 36;
      image.referrerPolicy = "no-referrer";

      image.addEventListener("error", () => {
        const fallback = document.createElement("span");
        fallback.className = "account-avatar-fallback";
        fallback.textContent = displayName.charAt(0).toUpperCase();
        link.replaceChildren(fallback);
      }, { once: true });

      link.append(image);
    } else {
      const fallback = document.createElement("span");
      fallback.className = "account-avatar-fallback";
      fallback.textContent = displayName.charAt(0).toUpperCase();
      link.append(fallback);
    }

    // Show a short account label for assistive technologies.
    if (label) {
      label.className = "account-nav-sr-only";
      label.textContent = displayName;
      link.append(label);
    }
  }

  async function updateAccountLink() {
    const { data, error } = await supabase.auth.getSession();

    if (error || !data.session?.user) {
      setSignedOut();
      return;
    }

    const user = data.session.user;

    const { data: profile, error: profileError } = await supabase
      .from("profiles")
      .select("username, display_name, avatar_url")
      .eq("id", user.id)
      .maybeSingle();

    if (profileError) {
      // Keep account access available even if the profile lookup fails.
      setSignedIn(null, user);
      return;
    }

    setSignedIn(profile, user);
  }

  setSignedOut();

  updateAccountLink().catch(() => setSignedOut());

  supabase.auth.onAuthStateChange(() => {
    // Avoid doing Supabase queries inside the auth callback.
    setTimeout(() => {
      updateAccountLink().catch(() => setSignedOut());
    }, 0);
  });
}
