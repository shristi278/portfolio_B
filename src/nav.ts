import { useEffect, useState } from "react";

export function go(href: string) {
  const next = href.startsWith("#") ? `/${href}` : href;
  window.history.pushState({}, "", next);
  window.dispatchEvent(new PopStateEvent("popstate"));
  if (next.includes("#")) {
    const id = next.slice(next.indexOf("#"));
    window.setTimeout(() => {
      document.querySelector(id)?.scrollIntoView({ behavior: "smooth" });
    }, 40);
  } else {
    window.scrollTo(0, 0);
  }
}

export function usePath() {
  const [path, setPath] = useState(
    () => window.location.pathname.replace(/\/$/, "") || "/",
  );

  useEffect(() => {
    const sync = () => {
      setPath(window.location.pathname.replace(/\/$/, "") || "/");
    };
    window.addEventListener("popstate", sync);
    return () => window.removeEventListener("popstate", sync);
  }, []);

  return path;
}

export function isInternalHref(href?: string) {
  return Boolean(href && href.startsWith("/") && !href.startsWith("//"));
}
