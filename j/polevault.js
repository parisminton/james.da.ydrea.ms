

function stage () {
  
  var the_canvas = document.getElementById("main-stage"),
      context = the_canvas.getContext("2d"),
      button_sprite = new Image(),
      fps = 75,
      breakpoint = 59,
      current_frame = 0;

      button_sprite.src = "a/jd_pv_buttons_24bit.png";

  /* ...only thinks about calling drawFrame repetitively... */
  function animate () {
    if (current_frame >= breakpoint) {
      console.log("animate() is done and has exited.");
      current_frame = 0;
      return "done";
    }
    drawFrame(); 
    current_frame += 1;
    setTimeout(animate, fps);
  }

  /* ...only thinks about drawing... */
  function drawFrame () {
    context.clearRect(0, 0, 566, 476);
    context.drawImage(button_sprite, 0, 51, 104, 51, 42.8, 424.8, 104, 51);
    context.drawImage(button_sprite, 104, 51, 355, 51, 170.8, 424.8, 355, 51);
    // playButton(context);
    // playButtonBoundary(context);
    pv.cels[current_frame].render(context);
  };

  the_canvas.addEventListener("mouseover", dela, false);
  the_canvas.addEventListener("click", getClick, false);
  // the_canvas.addEventListener("mouseover", getHover, false);

  function playButton(ctx) {

    // playButton/Path
    ctx.save();
    ctx.beginPath();
    ctx.moveTo(193.9, 460.8);
    ctx.bezierCurveTo(193.9, 461.9, 193.0, 462.8, 191.9, 462.8);
    ctx.lineTo(141.9, 462.8);
    ctx.bezierCurveTo(140.8, 462.8, 139.9, 461.9, 139.9, 460.8);
    ctx.lineTo(139.9, 443.8);
    ctx.bezierCurveTo(139.9, 442.7, 140.8, 441.8, 141.9, 441.8);
    ctx.lineTo(191.9, 441.8);
    ctx.bezierCurveTo(193.0, 441.8, 193.9, 442.7, 193.9, 443.8);
    ctx.lineTo(193.9, 460.8);
    ctx.closePath();
    ctx.fillStyle = "rgb(17, 92, 137)";
    ctx.fill();

    // playButton/Path
    ctx.beginPath();
    ctx.moveTo(145.8, 447.8);
    ctx.lineTo(145.8, 456.8);
    ctx.lineTo(153.3, 452.3);
    ctx.lineTo(145.8, 447.8);
    ctx.closePath();
    ctx.fillStyle = "rgb(255, 255, 255)";
    ctx.fill();

    // playButton/Play
    ctx.font = "11.0px 'Helvetica'";
    ctx.fillStyle = "rgb(238, 238, 238)";
    ctx.fillText("Play", 162.1, 455.8);
    ctx.restore();
  }

  function dela () {
    console.log("This is how it is.");
  }
  // drawFrame();
  animate();
  
  function getClick (evt) {
    var x = (evt.clientX + document.body.scrollLeft + document.documentElement.scrollLeft - the_canvas.offsetLeft),
        y = (evt.clientY + document.body.scrollTop + document.documentElement.scrollTop - the_canvas.offsetTop),
        i, len;
    // for (i = 0; i < len; i += 1) {
      // touchables[i].renderBoundary()...
      playButtonBoundary(context);
      if (context.isPointInPath(x, y)) {
        breakpoint = 59;
        animate();
      }
      else {
        console.log("This didn\'t work, player.");
        console.log(x + ", " + y);
      }
    // } 
  };

  function getHover (evt) {
    var x = (evt.clientX + document.body.scrollLeft + document.documentElement.scrollLeft - the_canvas.offsetLeft),
        y = (evt.clientY + document.body.scrollTop + document.documentElement.scrollTop - the_canvas.offsetTop),
        i, len;
    // for (i = 0; i < len; i += 1) {
      // touchables[i].renderBoundary()...
      playButtonBoundary(context);
      if (context.isPointInPath(x, y)) {
        breakpoint = 59;
        animate();
      }
      else {
        console.log("This didn\'t work, player.");
        console.log(x + ", " + y);
      }
    // } 
  };
  function playButtonBoundary (ctx) {
    ctx.save();
    ctx.rect(42.8, 424.8, 104, 51);
    ctx.restore();
  };

  function stepButtonBoundary (ctx) {
    ctx.save();
    ctx.rect(170.8, 424.8, 355, 51);
    ctx.restore();
  };
};

stage();

console.log("I can take you there. Just follow me.");

/*

animation starts and runs until the animation queue is cleared.

animate () {
  for (whatever's in the queue) {
    
  }
}







vaulter = {
  touchable : false,
  states : 1,
  render :
}

*/
