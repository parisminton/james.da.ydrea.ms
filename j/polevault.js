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
      cells = [],
      current_cell = 0,
      w = 460,
      h = 344,
      i, len, xpos, ypos, 
      breakpoint;
  vaulter.src = "a/polevault_sprites_24bit.png";
  vaulter.addEventListener("load", eventVaulterLoaded, false);

  for (i = 0; i < 58; i += 1) {
    cells[cells.length] = i;
  }
  breakpoint = cells.length;

  function drawScreen () {
    if (current_cell >= breakpoint) {
      current_cell = 0;
    }
    else {
      // context.fillStyle = "#ffffff";
      context.clearRect(0, 0, 460, 344);
      xpos = ((w * Math.floor(cells[current_cell])) % 4600);
      ypos = (h * Math.floor((cells[current_cell] * w) / 4600));
      context.drawImage(vaulter, xpos, ypos, 460, 344, 0, 0, 460, 344);
      current_cell += 1;
      variableTimer(drawScreen, 75);  
    }
  }
  
  function startUp () {
    setInterval(drawScreen, 75);
  }

  function variableTimer (func, inc) {
    setTimeout(func, inc);
  }

  function eventVaulterLoaded () {
    // startUp(); 
    drawScreen();
  }
  
};

canvasApp();

console.log("I can take you there. Just follow me.");
