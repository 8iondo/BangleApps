(function(back) {
  function settings() {
    const fileName = "thermom.settings.json";
    let settings = require('Storage').readJSON(fileName, true) || {};
    if (settings.blink===undefined) settings.blink = 3;
    if (settings.rsefresh===undefined) settings.refresh = 60;
    return settings;
  }
  function updateSetting(setting, value) {
    let settings = require('Storage').readJSON(fileName, true) || {};
    settings[setting] = value;
    require('Storage').writeJSON(fileName, settings);
  }

  var mainmenu = {
    "" : { "title" : "Thermom" },
    "< Back" : back,
    'Scan each': {
      value: settings().refresh,
      min: 5, max: 1800,
      format: v => v+"s",
      onchange: v => updateSetting("repeat", v)
    },
    'LCD on for': {
      value: settings().blink,
      min: 0, max: 5,
      format: v => v+"s",
      onchange: v => {
        updateSetting("vibrate", v);
      }
    },
    
  };
  E.showMenu(mainmenu);
})
