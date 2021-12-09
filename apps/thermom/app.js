var min = 9999;
var max = -9999;
const scans = [];

const uc = require('Storage').readJSON('thermom.settings.json', true) || {};
const conf = {
  refresh: uc.refresh == undefined ? 60000 : uc.refresh * 1000,
  blink: uc.blink == undefined ? 3000 : uc.blink
};

const grHeight = 120;
const grBottom = g.getHeight();
const grTop = grBottom - grHeight;
const grWidth = g.getWidth();

function onTemperature(p) {
  const temp = isNaN(p.temperature.toFixed(1)) ? Math.floor(Math.random() * 6) + 15 : p.temperature.toFixed(1);
  scans.push(temp);
  max = Math.max(max, temp);
  min = Math.min(min, temp);

  g.reset(1).clearRect(0, 24, g.getWidth(), g.getHeight());
  g.setFont('6x8', 2).setFontAlign(0, 0);
  var x = g.getWidth() / 2;
  var y = 90;
  g.drawString('Min ' + min + ' Max ' + max, x, y - 45);
  g.setFontVector(70).setFontAlign(0, 0);
  g.drawString(temp, x, y);
  g.setFontVector(15).setFontAlign(1, 1, 1);

  const itemwidth = Math.max(5, Math.min(15, grWidth / scans.length));
  if (itemwidth == 5) {
    // max array size
    scans.splice(0, 1);
  }

  g.reset(1).clearRect(0, grTop, grWidth, grBottom);
  g.setColor(0.36, 0.36, 0.36);
  g.setFont('6x8', 1);
  drawGuides();

  g.setColor(255, 255, 255);
  scans.forEach((t, index) => {
    pos = fromTempToY(t);
    g.fillRect(index * itemwidth, pos, (index * itemwidth) + itemwidth - 2, grBottom);
    // g.drawString(t, index * 20, pos );
  });

  if (conf.blink > 0 && !Bangle.isLCDOn()) {
    Bangle.setLCDPower(true);
    setTimeout(function() {
      Bangle.setLCDPower(false);
    }, conf.blink);
  }

}

function drawGuides() {
  var guideTemp = Math.floor(min + 1);
  while (guideTemp < max) {
    const yline = fromTempToY(guideTemp);
    g.fillRect(1, yline, grWidth, yline + 1);
    g.drawString(guideTemp, grWidth - 20, yline - 9);
    guideTemp++;
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

function fromTempToY(t) {
  const offset = (max - min < 2) ? 2 : 0.2;
  const grMin = min - offset;
  const grMax = (max - min < 1) ? max + offset : max;  
  const valRatio = (t - grMin) / (grMax - grMin);
  return grBottom - Math.floor(valRatio * grHeight);
}

setInterval(function() {
  drawTemperature();
}, conf.refresh);
E.showMessage('Loading...');
drawTemperature();
Bangle.loadWidgets();
Bangle.drawWidgets();