/** @format */

export function isImageExists(url: string) {
  const img = new Image();
  img.src = url;

  img.onload = () => true;
  img.onerror = () => false;

  //   return exists;
}
