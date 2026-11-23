export function homeSceneForHour(hour: number) {
  if (hour >= 19 || hour < 5) return "night";
  if (hour >= 16) return "evening";
  if (hour >= 10) return "day";
  return "morning";
}

// The web head and bundled app use the same local clock and lifecycle.
export function installHomeScene(sceneForHour: typeof homeSceneForHour) {
  function update() {
    document.documentElement.dataset.homeScene = sceneForHour(new Date().getHours());
  }

  update();
  document.addEventListener("visibilitychange", () => {
    if (document.visibilityState === "visible") update();
  });
  window.addEventListener("pageshow", update);
}

export const HOME_SCENE_BOOTSTRAP_SCRIPT =
  `(${installHomeScene.toString()})(${homeSceneForHour.toString()});`;
