export function isHomePage(url?: string) {
  url = url ?? window.location.pathname;
  const homeUrl = document.getElementById("data-container")?.dataset.homeUrl;
  return url === homeUrl;
}
