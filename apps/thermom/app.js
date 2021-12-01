var min = 9999;
var max = 0;

function onTemperature(p) {
  g.reset(1).clearRect(0,24,g.getWidth(),g.getHeight());
  g.setFont("6x8",2).setFontAlign(0,0);
  var x = g.getWidth()/2;
  var y = g.getHeight()/2 + 10;
  max = Math.max(max, p.temperature.toFixed(1)) ;
  min = Math.min(min, p.temperature.toFixed(1)) ;

  g.drawString("Min " + min + " Max " + max, x, y - 45);
  g.setFontVector(70).setFontAlign(0,0);
  g.drawString(p.temperature.toFixed(1), x, y);
}

function drawTemperature() {
  if (Bangle.getPressure) {
    Bangle.getPressure().then(onTemperature);
  } else {
    onTemperature({
      temperature : E.getTemperature()
    });
  }
}

setInterval(function() {
  drawTemperature();
}, 20000);
E.showMessage("Loading...");
drawTemperature();
Bangle.loadWidgets();
Bangle.drawWidgets();
