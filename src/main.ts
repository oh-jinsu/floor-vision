import { onImageLoaded } from "./process";

const imageElement = document.getElementById("imageSource") as HTMLImageElement;

imageElement.addEventListener("load", onImageLoaded, false);

const onFileInputChanged = (e: HTMLElementEventMap["change"]) => {
  const target = e.currentTarget as HTMLInputElement;
  
  const file = target.files?.[0];

  if (!file) {
    return;
  }

  imageElement.src = URL.createObjectURL(file);
};

const inputElement = document.getElementById("fileInput") as HTMLInputElement;

inputElement.addEventListener("change", onFileInputChanged, false);