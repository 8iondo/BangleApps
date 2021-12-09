(function(back) {
  const FILENAME = "thermom.settings.json";
  function settings() {
    let settings = require('Storage').readJSON(FILENAME, true) || {};
    if (settings.blink===undefined) settings.blink = 3;
    if (settings.refresh===undefined) settings.refresh = 60;
    return settings;
  }
  function updateSetting(setting, value) {
    let settings = require('Storage').readJSON(FILENAME, true) || {};
    settings[setting] = value;
    require('Storage').writeJSON(FILENAME, settings);
  }

  var mainmenu = {
    "" : { "title" : "Thermom" },
    "< Back" : back,
    'Scan each': {
      value: settings().refresh,
      min: 5, max: 1800,
      format: v => v+"s",
      onchange: v => updateSetting("refresh", v)
    },
    'LCD on for': {
      value: settings().blink,
      min: 0, max: 5,
      format: v => v+"s",
      onchange: v => {
        updateSetting("blink", v);
      }
    },
    
  };
  E.showMenu(mainmenu);
})
