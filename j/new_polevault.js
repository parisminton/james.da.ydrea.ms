

function stage () {
  
  var the_canvas = document.getElementById("main-stage"),
      context = the_canvas.getContext("2d"),
      button_sprite = new Image(),
      fps = 75,
      breakpoints = [2, 3, 4, 5, 10],
      current_bp = 0, // by default, the first breakpoint
      current_frame = 0,
      frame_total = 0,
      anim_queue = {},
      a_queue = [],
      boxy,
      triang,
      lo = document.getElementById("boxyload"), // throw away post-test
      tr = document.getElementById("triangload"), // throw away post-test
      pl = document.getElementById("fire_play"); // throw away post-test
      st = document.getElementById("fire_step"); // throw away post-test
      ins_aq = document.getElementById("inspect_aq"), // throw away post-test
      ins_naq = document.getElementById("inspect_naq"), // throw away post-test
      ins_cf = document.getElementById("inspect_cf"), // throw away post-test
      ins_ps = document.getElementById("inspect_ps"), // throw away post-test
      ins_bp = document.getElementById("inspect_bp"), // throw away post-test
      ins_ft = document.getElementById("inspect_ft"); // throw away post-test

      pl.onclick = function () {
        play();
      };

      st.onclick = function () {
        stepThrough();
      };

      ins_aq.onclick = function () {
        console.log(anim_queue);
      };

      ins_naq.onclick = function () {
        console.log(a_queue);
      };

      ins_ps.onclick = function () {
        console.log(breakpoints);
      };

      ins_cf.onclick = function () {
        console.log(current_frame);
      };

      ins_bp.onclick = function () {
        console.log(breakpoints[current_bp]);
      };

      ins_ft.onclick = function () {
        console.log(frame_total);
      };

      lo.onclick = function () {
        boxy.load();
      };

      tr.onclick = function () {
        triang.load();
      };

      button_sprite.src = "a/jd_pv_buttons_24bit.png";
  
  function Character (obj_name, touchable, boundary) {
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
  Character.prototype = {
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
        current_iteration : 0,
        current_cel : 0,
        cels : []
      }
    },
    reset : function () {
      this.sequence[this.current_seq].current_cel = 0;
      this.sequence[this.current_seq].current_iteration = 0;
    },
    load : function () { 
      this.reset();
      // anim_queue[this.name] = this;
      a_queue.push(this);
      setFrameTotal();
      setFinalBreakpoint();
    },
    advanceCels : function () {
      if (this.sequence[this.current_seq].current_iteration < this.sequence[this.current_seq].iterations) {
        this.sequence[this.current_seq].current_cel += 1;

        if (this.sequence[this.current_seq].current_cel >= this.sequence[this.current_seq].cels.length) {
          this.sequence[this.current_seq].current_iteration += 1;
          if (this.sequence[this.current_seq].current_iteration >= this.sequence[this.current_seq].iterations) {
            this.sequence[this.current_seq].current_cel = (this.sequence[this.current_seq].cels.length - 1);
          }
          else {
            this.sequence[this.current_seq].current_iteration += 1;
            this.sequence[this.current_seq].current_cel = 0;
          }
        }
      }
    }
  };

  function renderCharacter (obj, ctx) {
    var cs = obj.current_seq,
        cc = obj.sequence[obj.current_seq].current_cel;
    ctx = (ctx) ? ctx : context;
    if (typeof obj.sequence[cs].cels[cc] == "function") {
      obj.sequence[cs].cels[cc](ctx);
    }
    else {
      obj.sequence[cs].cels[(obj.sequence[cs].cels.length - 1)](ctx);
    }
  };

  boxy = new Character("boxy", false);
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

  triang = new Character("triang", false);
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

  /* ... drawing instructions that cache the last set of coordinates... */
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
  
  /* ...because objects don\'t offer a length property, this counter helps in loops... */
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

  /* ...only thinks about updating the values in anim_queue. does this once per drawn frame... 
  function updateCels (q_obj) {
    var length = getObjectLength(q_obj),
        cs,
        cs_length;
  
    if (length > 0) {
      for (item in q_obj) {
        cs = q_obj[item].current_seq;
        cs_length = getObjectLength(q_obj[item].sequence[cs]);
        
        if (q_obj[item].sequence[cs].current_cel >= (q_obj[item].sequence[cs].cels.length)) {
          delete q_obj[item];
          if (getObjectLength(q_obj) == 0) {
            frame_total = 0;
          }
          return "reset";
        }

        q_obj[item].sequence[cs].current_cel += 1;

      }
    }
    else {
      alert("Nothing to do.");
    }
  };
  */

  function setFrameTotal () {
    var i,
        len = a_queue.length;
    for (i = 0; i < len; i += 1) {
      frame_total = (frame_total > ( a_queue[i].sequence[a_queue[i].current_seq].starting_frame + (a_queue[i].sequence[a_queue[i].current_seq].cels.length * a_queue[i].sequence[a_queue[i].current_seq].iterations))) ? frame_total : (a_queue[i].sequence[a_queue[i].current_seq].starting_frame + (a_queue[i].sequence[a_queue[i].current_seq].cels.length * a_queue[i].sequence[a_queue[i].current_seq].iterations));
    }
  };

  function setFinalBreakpoint () {
    if (setFinalBreakpoint.alreadySet) {
      setFinalBreakpoint.lastRemovedValue = breakpoints.pop();
    }
    breakpoints.push(frame_total);
    setFinalBreakpoint.alreadySet = true;
  }

  function getAllCels (method_string) {
    var i,
        len = a_queue.length;
    for (i = 0; i < len; i += 1) {
      a_queue[i][method_string]();
    }
  };
  
  function advanceAllCels () {
    getAllCels("advanceCels");
  };

  function resetAllCels () {
    getAllCels("reset");
  }
  
  function advanceBreakpoint () {
    current_bp += 1;
    if (current_bp >= breakpoints.length) {
      // (breakpoints[breakpoints.length] >= frame_total) 
      current_bp = 0;
    }
  };

  /* ...only thinks about calling drawFrame and updateCels repetitively... */ 
  function animate () {
    if (current_frame >= frame_total) {
      console.log("First condition: animate() exited on frame " + current_frame + ".");
      current_frame = 0;
      current_bp = 0;
      return "done";
    }
    // var length = getObjectLength(anim_queue);
    if (current_frame >= breakpoints[current_bp]) {
      console.log("Second condition: animate() exited on frame " + current_frame + ".");
      advanceBreakpoint(); 
      return "done";
    }
    drawFrame(a_queue); 
    console.log(current_frame);
    // updateCels(anim_queue);
    advanceAllCels();
    current_frame += 1;
    setTimeout(animate, fps);
  };

  function play () {
    current_bp = (breakpoints.length - 1);  // ### a chance current_bp becomes a negative number ###
    current_frame = 0;
    resetAllCels();
    console.log("Play button.");
    animate();
  };

  function stepThrough () {
    console.log("Step through button.");
    animate();
  };

  /* ...only thinks about drawing... 
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
  */

  /* ...only thinks about drawing... */
  function drawFrame () {
    var i, len;
    context.clearRect(0, 0, 566, 476);
    context.drawImage(button_sprite, 0, 51, 104, 51, 42.8, 424.8, 104, 51);
    context.drawImage(button_sprite, 104, 51, 355, 51, 170.8, 424.8, 355, 51);
    if (arguments.length == 1 && Array.isArray(arguments[0]) ){
      len = arguments[0].length;
      for (i = 0; i < len; i += 1) {
        renderCharacter(arguments[0][i], context);
      }
    }
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

  // a_queue = [boxy, triang];
  setFrameTotal();
  drawFrame(a_queue);
  // animate();
  
  function getClick (evt) {
    var x = (evt.clientX + document.body.scrollLeft + document.documentElement.scrollLeft - the_canvas.offsetLeft),
        y = (evt.clientY + document.body.scrollTop + document.documentElement.scrollTop - the_canvas.offsetTop),
        i, len;
        
    playButtonBoundary(context);
    if (context.isPointInPath(x, y)) {
      play();
      return "play";
    }
    stepButtonBoundary(context);
    if (context.isPointInPath(x, y)) {
      stepThrough();
      return "stepThrough";
    }
  };

  function getHover (evt) {
    var x = (evt.clientX + document.body.scrollLeft + document.documentElement.scrollLeft - the_canvas.offsetLeft),
        y = (evt.clientY + document.body.scrollTop + document.documentElement.scrollTop - the_canvas.offsetTop),
        i, len;
    playButtonBoundary(context);
    /*
    if (context.isPointInPath(x, y)) {
      play();
    }
    stepButtonBoundary(context);
    if (context.isPointInPath(x, y)) {
      stepThrough();
    }
    */
  };

  function playButtonBoundary (ctx) {
    ctx.save();
    ctx.strokeStyle = "rgb(0, 255, 0)";
    // ctx.strokeRect(42.8, 424.8, 104, 51);
    ctx.rect(42.8, 424.8, 104, 51);
    ctx.restore();
  };

  function stepButtonBoundary (ctx) {
    ctx.save();
    ctx.strokeStyle = "rgb(0, 0, 255)";
    // ctx.strokeRect(170.8, 424.8, 355, 51);
    ctx.rect(170.8, 424.8, 355, 51);
    ctx.restore();
  };

console.log(boxy);
};

stage();

console.log("I can take you there. Just follow me.");
