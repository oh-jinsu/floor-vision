import { appendCanvas } from "./element";

declare const cv: any;

export const onImageLoaded = async (e: HTMLElementEventMap["load"]) => {
  const image = cv.imread(e.target);

  cv.resize(image, image, getMaxSize(image), 0, 0, cv.INTER_AREA);

  show(image);

  const gray = cv.Mat.zeros(image.rows, image.cols, cv.CV_8U);

  cv.cvtColor(image, gray, cv.COLOR_RGBA2GRAY, 0);
  
  cv.GaussianBlur(gray, gray, new cv.Size(3, 3), 0, 0, cv.BORDER_DEFAULT);

  show(gray);

  const edges = cv.Mat.zeros(gray.rows, gray.cols, cv.CV_8U);

  cv.Canny(gray, edges, 75, 200);

  show(edges);

  const contours = new cv.MatVector();

  const hierarchy = new cv.Mat();

  cv.findContours(edges, contours, hierarchy, cv.RETR_EXTERNAL, cv.CHAIN_APPROX_SIMPLE);

  const poly = new cv.MatVector();

  for (let i = 0; i < contours.size(); ++i) {
    const tmp = new cv.Mat();

    const contour = contours.get(i);

    const eps = cv.arcLength(contour, true);

    console.log(eps);
  
    cv.approxPolyDP(contour, tmp, 0.02 * eps, true);

    poly.push_back(tmp);

    console.log(tmp.col(0));
    
    contour.delete();

    tmp.delete();
  }

  const dst = cv.Mat.zeros(image.rows, image.cols, cv.CV_8UC3);

  for (let i = 0; i < contours.size(); ++i) {
    let color = new cv.Scalar(Math.round(Math.random() * 255), Math.round(Math.random() * 255),
                              Math.round(Math.random() * 255));
    cv.drawContours(dst, poly, i, color, 1, 8, hierarchy, 0);
  }

  show(dst);

  contours.delete();

  hierarchy.delete();

  gray.delete();

  image.delete();
};

const getMaxSize = (src: any, max = 640) => {
  const width = src.cols;

  const height = src.rows;

  const ratio = width / height;

  if (width > height) {
    const resizedWidth = Math.min(width, max);

    const resizedHeight = resizedWidth / ratio;

    return new cv.Size(resizedWidth, resizedHeight);
  }

  const resizedHeight = Math.min(height, max);

  const resizedWidth = resizedHeight * ratio;

  return new cv.Size(resizedWidth, resizedHeight);
}

const show = (src: any, id: string = '') => {
  cv.imshow(appendCanvas(id), src);
}