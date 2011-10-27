var Debugger = function () {};
Debugger.log = function (message) {
  try {
    console.log(message);
  }
  catch (exception) {
    return;
  }
};

function canvasSupport () {
  return Modernizr.canvas;
};

function canvasApp () {
  if (!canvasSupport()) {
    return
  };
  
  var the_canvas = document.getElementById("main-stage"),
      context = the_canvas.getContext("2d"),
      vaulter = new Image(),
      cels = [],
      current_cel = 0,
      w = 460,
      h = 344,
      i, len, xpos, ypos, 
      breakpoint;
  vaulter.src = "a/polevault_sprites_24bit.png";
  vaulter.addEventListener("load", eventVaulterLoaded, false);

  /* ... populate the cels array and set the breakpoint to the last cel ... */
  for (i = 0; i < 58; i += 1) {
    cels[cels.length] = i;
  }
  breakpoint = cels.length;

  function drawScreen () {
    if (current_cel >= breakpoint) {
      current_cel = 0;
    }
    else {
      // context.fillStyle = "#ffffff";
      context.clearRect(0, 0, 460, 344);
      xpos = ((w * Math.floor(cels[current_cel])) % 4600);
      ypos = (h * Math.floor((cels[current_cel] * w) / 4600));
      context.drawImage(vaulter, xpos, ypos, 460, 344, 0, 0, 460, 344);
      current_cel += 1;
      variableTimer(drawScreen, 75);  
    }
  }
  
  function variableTimer (func, inc) {
    setTimeout(func, inc);
  }

  function eventVaulterLoaded () {
    drawScreen();
  }
  
};

canvasApp();

console.log("I can take you there. Just follow me.");
