var $ = function (id) {
  return document.getElementById(id);
};

var canvasWrapper = $("canvas-wrapper");
var palette = $("palette");
var colorPicker = $("color-picker");
var canvas = (this.__canvas = new fabric.Canvas("sheet"));

window.onload = function () {
  init();

  canvas.setDimensions({
    width: window.innerWidth,
    height: window.innerHeight
  });

  canvas.isDrawingMode = true;
  canvas.freeDrawingBrush.width = 5;
  canvas.freeDrawingBrush.color = "#ff0000";
};

function init() {
  initListeners();
}

function changeColor(color) {
  canvas.freeDrawingBrush.color = color;
}

function initListeners() {
  window.onresize = () => {
    const ratio = canvas.getWidth() / canvas.getHeight();
    const containerWidth = canvasWrapper.clientWidth;
    const scale = containerWidth / canvas.getWidth();
    const zoom = canvas.getZoom() * scale;

    canvas.setDimensions({
      width: containerWidth,
      height: containerWidth / ratio
    });
    canvas.setViewportTransform([zoom, 0, 0, zoom, 0, 0]);
  };

  colorPicker.onchange = (e) => {
    canvas.freeDrawingBrush.color = e.target.value;
  };
}
