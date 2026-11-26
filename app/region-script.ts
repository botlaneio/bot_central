/* Shared by the server layout (inline <head> script) and client components. See region.tsx. */

export type Region = "us" | "in";

export const REGION_BY_HOST: Record<string, Region> = {
  "botlane.io": "us",
  "www.botlane.io": "us",
  "botlane.in": "in",
  "www.botlane.in": "in",
};

/** Runs inline in <head>, before React. Keep it dependency-free. */
export const regionScript = `(function(){try{var h=location.hostname.toLowerCase().replace(/\\.$/,"");var q=new URLSearchParams(location.search).get("region");if(q==="in"||q==="us")sessionStorage.setItem("region",q);var s=sessionStorage.getItem("region");var r=/\\.in$/.test(h)?"in":/\\.io$/.test(h)?"us":(s||"us");document.documentElement.setAttribute("data-region",r);}catch(e){document.documentElement.setAttribute("data-region","us");}})();`;

