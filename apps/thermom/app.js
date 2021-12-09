var min = 9999;
var max = -9999;
const scans = [];

const conf = {
  time: {
    refresh: 60000,
    blink: 3000
  }
};

function onTemperature(p) {
  const temp = isNaN(p.temperature.toFixed(1)) ? Math.floor(Math.random() * 10) - 5: p.temperature.toFixed(1);
  console.log(temp);
  scans.push(temp);

  max = Math.max(max, temp);
  min = Math.min(min, temp);

  g.reset(1).clearRect(0, 24, g.getWidth(), g.getHeight());
  g.setFont("6x8", 2).setFontAlign(0, 0);
  var x = g.getWidth() / 2;
  var y = 90;
  g.drawString("Min " + min + " Max " + max, x, y - 45);
  g.setFontVector(70).setFontAlign(0, 0);
  g.drawString(temp, x, y);
  g.setFontVector(15).setFontAlign(1, 1, 1);

  const grHeight = 120;
  const grBottom = g.getHeight();
  const grTop = grBottom - grHeight;
  const grWidth = g.getWidth();
  const offset = (max - min < 2) ? 2 : 0.2;
  const grMin = min - offset;
  const grMax = (max - min < 1) ? max + offset : max;
  const itemwidth = Math.max(5, Math.min(15, grWidth / scans.length));
  if (itemwidth == 5) {
    // max array size
    scans.splice(0, 1);
  }

  g.reset(1).clearRect(0, grTop, grWidth, grBottom);
  scans.forEach((t, index) => {
    valRatio = (t - grMin) / (grMax - grMin);

    pos = grBottom - Math.floor(valRatio * grHeight);

    g.fillRect(index * itemwidth, pos, (index * itemwidth) + itemwidth - 2, grBottom);
    // g.drawString(t, index * 20, pos );
  });

  if (conf.time.blink > 0 && !Bangle.isLCDOn()) {
    Bangle.setLCDPower(true);
    setTimeout(function() {
      Bangle.setLCDPower(false);
    }, conf.time.blink);
  }

}

function drawTemperature() {
  if (Bangle.getPressure) {
    Bangle.getPressure().then(onTemperature);
  } else {
    onTemperature({
      temperature: E.getTemperature()
    });
  }
}

setInterval(function() {
  drawTemperature();
}, conf.time.refresh);
E.showMessage("Loading...");
drawTemperature();
Bangle.loadWidgets();
Bangle.drawWidgets();