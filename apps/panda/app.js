Bangle.setLCDPower(1);
Bangle.setLCDTimeout(0);
greal = g;
g.clear();
g = Graphics.createArrayBuffer(120,64,1,{msb:true});
g.flip = function() {
  greal.drawImage({
    width:120,
    height:64,
    buffer:g.buffer
  },0,(240-128)/2,{scale:2});
};
var W = g.getWidth();
var BTNL = BTN2;
var BTNR = BTN3;
var BTNU = BTN1;

// Images can be added like this in Espruino v2.00
var IMG = {
  rex: [Graphics.createImage(`
#######
#     #
#     #
######
#
#
#
`),Graphics.createImage(`
#######
#     #   ## ##
#     #  #  #  #
#######   #   #
#     #    # #
#     #     #
#     #
`),Graphics.createImage(`
#     #
##    #
# #   #
#  #  #
#   # #
#    ##
#     #
`),Graphics.createImage(`
#####
#    #    ## ##
#     #  #######
#     #   #####
#     #    ###
#    #      #
#####
`),Graphics.createImage(`
#######
#     #   ## ##
#     #  #  #  #
#######   #   #
#     #    # #
#     #     #
#     #
`)],
};

i = -1;
function roll() {
  i++;
  g.clear();
  g.drawImage(IMG.rex[i % IMG.rex.length], 5, 0, {scale: 7});
  g.flip();
  if (i == 200) {
    i = 0;
  }

  setTimeout(roll, Math.max(60, 600 - (i * 5)));
}

roll();
