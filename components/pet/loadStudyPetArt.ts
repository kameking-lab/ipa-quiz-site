/** Decode before a finite reaction starts, without hiding the original image. */
export function loadStudyPetArt(src: string): Promise<boolean> {
  return new Promise(resolve => {
    const image = new Image();
    let finished = false;
    const finish = (ready: boolean) => {
      if (finished) return;
      finished = true; clearTimeout(timeout);
      image.onload = null; image.onerror = null; resolve(ready);
    };
    const timeout = setTimeout(() => finish(false), 8000);
    image.onerror = () => finish(false);
    image.onload = () => {
      if (typeof image.decode === "function") void image.decode().then(() => finish(true), () => finish(false));
      else finish(true);
    };
    image.src = src;
  });
}
