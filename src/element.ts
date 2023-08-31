const container = document.getElementById("canvas-container");

export const appendCanvas = (id: string = '') => {
    const element = document.createElement("canvas");

    if (id.length > 0) {
        element.id = id;
    }

    element.className = "canvas-border";

    container?.appendChild(element);
    
    return element;
};