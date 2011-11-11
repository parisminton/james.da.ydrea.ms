

function stage () {
  
  var the_canvas = document.getElementById("main-stage"),
      context = the_canvas.getContext("2d"),
      button_sprite = new Image(),
      fps = 75,
      breakpoints = [ 59 ],
      current_bp = 0,
      current_frame = 0,
      timeline,
      anim_queue = {},
      boxy,
      triang,
      lo = document.getElementById("boxyload"), // throw away post-test
      tr = document.getElementById("triangload"), // throw away post-test
      ins = document.getElementById("inspect"), // throw away post-test
      fi = document.getElementById("fireit"); // throw away post-test

      ins.onclick = function () {
        console.log(anim_queue);
      };

      fi.onclick = function () {
        ftha(anim_queue);
      };

      lo.onclick = function () {
        boxy.load();
      };

      tr.onclick = function () {
        triang.load();
      };

      button_sprite.src = "a/jd_pv_buttons_24bit.png";
  
  function CharACTer (obj_name, touchable, boundary) {
    this.name = obj_name;
    this.visible = false;
    this.touchable = touchable;
    if (arguments.length > 2) {
      this.boundary = boundary;
    }
    else {
      this.boundary = false;
    }
    this.current_seq = "main";
    this.sequence = {
      main : {
        starting_frame : 0,
        cache : [],
        iterations : 1,
        current_cel : 0,
        cels : []
      }
    };
  };
  CharACTer.prototype = {
    show : function () {
      this.visible = true;
    },
    hide : function () {
      this.visible = false;
    },
    makeSequence : function (seq_name) {
      this.sequence[seq_name] = {
        starting_frame : 0,
        cache : [],
        iterations : 1,
        current_cel : 0,
        cels : []
      }
    },
    reset : function () {
      this.sequence[this.current_seq].current_cel = 0;
    },
    load : function () { 
      this.reset();
      anim_queue[this.name] = this;
    }
  };

  function renderCharacter (obj, ctx) {
   ctx = (ctx) ? ctx : context;
   obj.sequence[obj.current_seq].cels[obj.sequence[obj.current_seq].current_cel](ctx);
  };

  boxy = new CharACTer("boxy", false);
  boxy.show();
  boxy.sequence.main.cels = [
    function (ctx) {
      if (boxy.visible) {
        recordStrokeRect(boxy, ctx, 100, 100, 250, 250);
      }
    },
    
    function (ctx) {
      if (boxy.visible) {
        recordStrokeRect(boxy, ctx, 110, 110, 250, 250);
      }
    },

    function (ctx) {
      if (boxy.visible) {
        recordStrokeRect(boxy, ctx, 120, 120, 250, 250);
      }
    },

    function (ctx) {
      if (boxy.visible) {
        recordStrokeRect(boxy, ctx, 130, 130, 250, 250);
      }
    }
  ];

  triang = new CharACTer("triang", false);
  triang.show();
  triang.sequence.main.cels = [
    function (ctx) {
      if (triang.visible) {
        ctx.save();
        ctx.beginPath();
        recordMoveTo(triang, ctx, 300, 170);
        recordLineTo(triang, ctx, 400, 250);
        recordLineTo(triang, ctx, 200, 250);
        ctx.closePath();
        ctx.strokeStyle = "rgb(255, 0, 0)";
        ctx.stroke();
        ctx.restore();
      }
    },

    function (ctx) {
      if (triang.visible) {
        ctx.save();
        ctx.beginPath();
        recordMoveTo(triang, ctx, 310, 180);
        recordLineTo(triang, ctx, 410, 260);
        recordLineTo(triang, ctx, 210, 260);
        ctx.closePath();
        ctx.strokeStyle = "rgb(255, 0, 0)";
        ctx.stroke();
        ctx.restore();
      }
    },

    function (ctx) {
      if (triang.visible) {
        ctx.save();
        ctx.beginPath();
        recordMoveTo(triang, ctx, 320, 190);
        recordLineTo(triang, ctx, 420, 270);
        recordLineTo(triang, ctx, 220, 270);
        ctx.closePath();
        ctx.strokeStyle = "rgb(255, 0, 0)";
        ctx.stroke();
        ctx.restore();
      }
    },

    function (ctx) {
      if (triang.visible) {
        ctx.save();
        ctx.beginPath();
        recordMoveTo(triang, ctx, 330, 200);
        recordLineTo(triang, ctx, 430, 280);
        recordLineTo(triang, ctx, 230, 280);
        ctx.closePath();
        ctx.strokeStyle = "rgb(255, 0, 0)";
        ctx.stroke();
        ctx.restore();
      }
    },

    function (ctx) {
      if (triang.visible) {
        ctx.save();
        ctx.beginPath();
        recordMoveTo(triang, ctx, 340, 210);
        recordLineTo(triang, ctx, 440, 290);
        recordLineTo(triang, ctx, 240, 290);
        ctx.closePath();
        ctx.strokeStyle = "rgb(255, 0, 0)";
        ctx.stroke();
        ctx.restore();
      }
    },

    function (ctx) {
      if (triang.visible) {
        ctx.save();
        ctx.beginPath();
        recordMoveTo(triang, ctx, 350, 220);
        recordLineTo(triang, ctx, 450, 300);
        recordLineTo(triang, ctx, 250, 300);
        ctx.closePath();
        ctx.strokeStyle = "rgb(255, 0, 0)";
        ctx.stroke();
        ctx.restore();
      }
    },

    function (ctx) {
      if (triang.visible) {
        ctx.save();
        ctx.beginPath();
        recordMoveTo(triang, ctx, 360, 230);
        recordLineTo(triang, ctx, 460, 310);
        recordLineTo(triang, ctx, 260, 310);
        ctx.closePath();
        ctx.strokeStyle = "rgb(255, 0, 0)";
        ctx.stroke();
        ctx.restore();
      }
    },

    function (ctx) {
      if (triang.visible) {
        ctx.save();
        ctx.beginPath();
        recordMoveTo(triang, ctx, 370, 240);
        recordLineTo(triang, ctx, 470, 320);
        recordLineTo(triang, ctx, 270, 320);
        ctx.closePath();
        ctx.strokeStyle = "rgb(255, 0, 0)";
        ctx.stroke();
        ctx.restore();
      }
    },

    function (ctx) {
      if (triang.visible) {
        ctx.save();
        ctx.beginPath();
        recordMoveTo(triang, ctx, 380, 250);
        recordLineTo(triang, ctx, 480, 330);
        recordLineTo(triang, ctx, 280, 330);
        ctx.closePath();
        ctx.strokeStyle = "rgb(255, 0, 0)";
        ctx.stroke();
        ctx.restore();
      }
    },

    function (ctx) {
      if (triang.visible) {
        ctx.save();
        ctx.beginPath();
        recordMoveTo(triang, ctx, 390, 260);
        recordLineTo(triang, ctx, 490, 340);
        recordLineTo(triang, ctx, 290, 340);
        ctx.closePath();
        ctx.strokeStyle = "rgb(255, 0, 0)";
        ctx.stroke();
        ctx.restore();
      }
    },

    function (ctx) {
      if (triang.visible) {
        ctx.save();
        ctx.beginPath();
        recordMoveTo(triang, ctx, 400, 270);
        recordLineTo(triang, ctx, 500, 350);
        recordLineTo(triang, ctx, 300, 350);
        ctx.closePath();
        ctx.strokeStyle = "rgb(255, 0, 0)";
        ctx.stroke();
        ctx.restore();
      }
    }

  ];

  function recordMoveTo (obj, ctx, xpos, ypos) {
    obj.sequence[obj.current_seq].cache.push( {moveTo: [xpos, ypos]} );
    ctx.moveTo(xpos, ypos);
  };
  
  function recordLineTo (obj, ctx, xpos, ypos) {
    obj.sequence[obj.current_seq].cache.push( {lineTo : [xpos, ypos]} );
    ctx.lineTo(xpos, ypos);
  };
  
  function recordStrokeRect(obj, ctx, xpos, ypos, width, height) {
    obj.sequence[obj.current_seq].cache.push( {strokeRect: [xpos, ypos, width, height]} );
    ctx.strokeRect(xpos, ypos, width, height);
  };

  function recordFillRect(obj, ctx, xpos, ypos, width, height) {
    obj.sequence[obj.current_seq].cache.push( {fillRect: [xpos, ypos, width, height]} );
    ctx.fillRect(xpos, ypos, width, height);
  };
  
  function getObjectLength(obj, prop) {
    var length = 0;
    if (arguments.length == 2) {
      obj = obj.prop;
    }
    for (member in obj) {
      if (obj.hasOwnProperty(member)) {
        length += 1;
      }
    }
    return length;
  };
  
  // need a way to change the object's current sequence.

  /* ...only thinks about updating the values in anim_queue. does this once per drawn frame... */ 
  function ftha (q_obj) {
    var length = getObjectLength(q_obj),
        cc,
        cs,
        // cc_length,
        cs_length;
  
    // ### ...current_cel shouldn\'t reset until the whole animation is done ### ... 
    if (length > 0) {
      for (item in q_obj) {
        // if cs
        cs = q_obj[item].current_seq;
        cs_length = getObjectLength(q_obj[item].sequence[cs]);
        
        q_obj[item].sequence[cs].current_cel += 1;

        if (q_obj[item].sequence[cs].current_cel >= (q_obj[item].sequence[cs].cels.length - 1)) {
          delete q_obj[item];
          // console.log("Deleted: " + q_obj);
          return "reset";
        }
      }
    }
    else {
      alert("Nothing to do.");
    }
  };

  /* ...only thinks about calling drawFrame and ftha repetitively... */ 
  function animate () {
    var length = getObjectLength(anim_queue);
    if (length == 0) {
      console.log("animate() is done and has exited.");
      current_frame = 0;
      return "done";
    }
    if (current_frame == breakpoints[current_bp]) {
      console.log("animate() is paused and has exited.");
      return "paused";
    }
    drawFrame(); 
    ftha(anim_queue);
    current_frame += 1;
    setTimeout(animate, fps);
  };

  /* ...only thinks about drawing... */
  function drawFrame () {
    context.clearRect(0, 0, 566, 476);
    context.drawImage(button_sprite, 0, 51, 104, 51, 42.8, 424.8, 104, 51);
    context.drawImage(button_sprite, 104, 51, 355, 51, 170.8, 424.8, 355, 51);
    // playButton(context);
    // playButtonBoundary(context);
    // pv.cels[current_frame].render(context);
    renderCharacter(boxy, context);
    renderCharacter(triang, context);
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
  drawFrame();
  // animate();
  
  function getClick (evt) {
    var x = (evt.clientX + document.body.scrollLeft + document.documentElement.scrollLeft - the_canvas.offsetLeft),
        y = (evt.clientY + document.body.scrollTop + document.documentElement.scrollTop - the_canvas.offsetTop),
        i, len;
    // for (i = 0; i < len; i += 1) {
      // touchables[i].renderBoundary()...
      playButtonBoundary(context);
      if (context.isPointInPath(x, y)) {
        current_bp = 0;
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
        current_bp = 0;
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

console.log(boxy);
};

stage();

console.log("I can take you there. Just follow me.");
