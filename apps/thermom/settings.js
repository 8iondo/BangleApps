(function(back) {
  function settings() {
    const fileName = "thermom.settings.json";
    let settings = require('Storage').readJSON(fileName, true) || {};
    if (settings.blink===undefined) settings.blink=".";
    if (settings.rsefresh===undefined) settings.refresh=4;
    return settings;
  }
  function updateSetting(setting, value) {
    let settings = require('Storage').readJSON(fileName, true) || {};
    settings[setting] = value;
    require('Storage').writeJSON(fileName, settings);
  }

  var vibPatterns = ["Off", ".", "-", "--", "-.-", "---"];
  var mainmenu = {
    "" : { "title" : "Thermom" },
    "< Back" : back,
    'Scan each': {
      value: settings().refresh,
      min: 2, max: 60000,
      format: v => v+"s",
      onchange: v => updateSetting("repeat", v)
    },
    'Blink at scan': {
      value: Math.max(0,vibPatterns.indexOf(settings().blink)),
      min: 0, max: vibPatterns.length,
      format: v => vibPatterns[v]||"Off",
      onchange: v => {
        updateSetting("vibrate", vibPatterns[v]);
      }
    },
    
  };
  E.showMenu(mainmenu);
})
