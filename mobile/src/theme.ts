/** The bundled shell follows the device theme, including changes while open. */
export function applyDeviceTheme() {
  const scheme = window.matchMedia("(prefers-color-scheme: dark)");
  const apply = () => {
    document.documentElement.classList.toggle("dark", scheme.matches);
    document.documentElement.style.colorScheme = scheme.matches ? "dark" : "light";
  };
  apply();
  scheme.addEventListener("change", apply);
  return () => scheme.removeEventListener("change", apply);
}
