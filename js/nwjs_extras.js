var gui = require('nw.gui');
var mb =  new gui.Menu({type:"menubar"});
mb.createMacBuiltin("RGCPrizeDraw");
gui.Window.get().menu = mb;