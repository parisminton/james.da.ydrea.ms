function stage () {
  
  var the_canvas = document.getElementById("main-stage"),
      context = the_canvas.getContext("2d"),
      button_sprite = new Image(),
      fps = 75,
      breakpoints = [14, 17, 49],
      current_bp = 0, // by default, the first breakpoint
      current_frame = 0,
      frame_total = 0,
      a_queue = [],
      vaulter;

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
      this.queue_index = (a_queue.length) ? a_queue.length : 0;
      a_queue.push(this);
      setFrameTotal();
      setFinalBreakpoint();
    },
    advance : function () {
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
      if (current_frame >= frame_total) {
        this.sequence[this.current_seq].current_iteration = 0;
        this.sequence[this.current_seq].current_cel = 0;
      }
    },
    emptyCache : function () {
      this.sequence[this.current_seq].cache.length = 0;
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

  slider = new Character("slider", false);
  slider.show();
  slider.sequence.main.cels = [
    function (ctx) {
      if (slider.visible) {

        // slider/Path
        ctx.save();
        ctx.beginPath();
        recordMoveTo(slider, ctx, 380.6, 393.7);
        recordLineTo(slider, ctx, 85.6, 393.7);
        recordLineTo(slider, ctx, 85.6, 388.7);
        recordLineTo(slider, ctx, 380.6, 388.7);
        recordLineTo(slider, ctx, 380.6, 393.7);
        ctx.closePath();
        ctx.fillStyle = "rgb(255, 255, 255)";
        ctx.fill();

        // slider/Path
        ctx.beginPath();
        recordMoveTo(slider, ctx, 381.6, 392.5);
        recordLineTo(slider, ctx, 86.6, 392.5);
        recordLineTo(slider, ctx, 86.6, 387.5);
        recordLineTo(slider, ctx, 381.6, 387.5);
        recordLineTo(slider, ctx, 381.6, 392.5);
        ctx.closePath();
        ctx.fillStyle = "rgb(32, 85, 138)";
        ctx.fill();

        // slider/Path
        ctx.beginPath();
        recordMoveTo(slider, ctx, 380.2, 388.7);
        recordLineTo(slider, ctx, 86.6, 388.7);
        recordLineTo(slider, ctx, 86.6, 392.5);
        recordLineTo(slider, ctx, 380.2, 392.5);
        recordLineTo(slider, ctx, 380.2, 388.7);
        ctx.closePath();
        ctx.fillStyle = "rgb(115, 153, 206)";
        ctx.fill();

        // slider/Path
        ctx.beginPath();
        recordMoveTo(slider, ctx, 381.6, 392.5);
        recordLineTo(slider, ctx, 86.6, 392.5);
        recordLineTo(slider, ctx, 86.6, 387.5);
        recordLineTo(slider, ctx, 381.6, 387.5);
        recordLineTo(slider, ctx, 381.6, 392.5);
        ctx.closePath();
        ctx.strokeStyle = "rgb(159, 159, 159)";
        ctx.stroke();
        ctx.restore();
      }
    }
  ];

  scrubber = new Character("scrubber", false);
  scrubber.show();
  scrubber.sequence.main.cels = [
    function (ctx) {
      if (scrubber.visible) {

        var gradient;

        // scrubber/Group
        ctx.save();

        // scrubber/Group/Path
        ctx.save();
        ctx.beginPath();
        recordMoveTo(scrubber, ctx, 72.4, 388.0);
        recordLineTo(scrubber, ctx, 72.4, 381.1);
        recordBezierCurveTo(scrubber, ctx, 72.4, 378.2, 74.7, 375.9, 77.6, 375.9);
        recordLineTo(scrubber, ctx, 93.7, 375.9);
        recordBezierCurveTo(scrubber, ctx, 96.6, 375.9, 98.9, 378.2, 98.9, 381.1);
        recordLineTo(scrubber, ctx, 98.9, 388.0);
        recordBezierCurveTo(scrubber, ctx, 98.9, 390.9, 98.2, 393.2, 96.2, 395.2);
        recordLineTo(scrubber, ctx, 85.6, 405.5);
        recordLineTo(scrubber, ctx, 75.1, 395.2);
        recordBezierCurveTo(scrubber, ctx, 73.1, 393.2, 72.4, 390.9, 72.4, 388.0);
        ctx.closePath();
        gradient = ctx.createLinearGradient(95.9, 376.0, 73.6, 397.4);
        gradient.addColorStop(0.00, "rgb(234, 236, 236)");
        gradient.addColorStop(1.00, "rgb(203, 203, 203)");
        ctx.fillStyle = gradient;
        ctx.fill();
        ctx.strokeStyle = "rgb(153, 153, 153)";
        ctx.stroke();

        // scrubber/Group/Path
        ctx.beginPath();
        recordMoveTo(scrubber, ctx, 85.3, 406.1);
        recordLineTo(scrubber, ctx, 74.7, 395.7);
        recordBezierCurveTo(scrubber, ctx, 72.6, 393.7, 72.0, 391.4, 72.0, 388.5);
        recordLineTo(scrubber, ctx, 72.0, 381.6);
        recordBezierCurveTo(scrubber, ctx, 72.0, 380.6, 72.3, 379.7, 72.7, 378.9);
        recordBezierCurveTo(scrubber, ctx, 71.9, 379.9, 71.3, 381.1, 71.3, 382.5);
        recordLineTo(scrubber, ctx, 71.3, 389.4);
        recordBezierCurveTo(scrubber, ctx, 71.3, 392.2, 72.0, 394.6, 74.0, 396.5);
        recordLineTo(scrubber, ctx, 84.6, 406.9);
        recordLineTo(scrubber, ctx, 85.3, 406.1);
        ctx.closePath();
        ctx.fillStyle = "rgb(139, 149, 159)";
        ctx.fill();
        ctx.restore();
      }
    }
  ];

  back = new Character("back", false);
  back.show();
  back.sequence.main.cels = [
    function (ctx) {
      if (back.visible) {

        var gradient;

        // back/Group
        ctx.save();

        // back/Group/Path
        ctx.save();
        ctx.beginPath();
        recordMoveTo(back, ctx, 440.3, 381.8);
        recordBezierCurveTo(back, ctx, 440.3, 377.8, 437.0, 374.5, 433.0, 374.5);
        recordLineTo(back, ctx, 411.0, 374.5);
        recordBezierCurveTo(back, ctx, 408.5, 374.5, 406.3, 375.8, 405.0, 377.8);
        recordBezierCurveTo(back, ctx, 404.7, 378.6, 404.5, 379.4, 404.5, 380.3);
        recordLineTo(back, ctx, 404.5, 400.4);
        recordBezierCurveTo(back, ctx, 404.5, 404.4, 407.8, 407.7, 411.7, 407.7);
        recordLineTo(back, ctx, 433.8, 407.7);
        recordBezierCurveTo(back, ctx, 436.3, 407.7, 438.5, 406.3, 439.8, 404.4);
        recordBezierCurveTo(back, ctx, 440.1, 403.6, 440.3, 402.8, 440.3, 401.9);
        recordLineTo(back, ctx, 440.3, 381.8);
        ctx.closePath();
        gradient = ctx.createLinearGradient(422.4, 373.1, 422.4, 407.7);
        gradient.addColorStop(0.00, "rgb(234, 236, 236)");
        gradient.addColorStop(1.00, "rgb(203, 203, 203)");
        ctx.fillStyle = gradient;
        ctx.fill();

        // back/Group/Path
        ctx.beginPath();
        recordMoveTo(back, ctx, 441.0, 400.4);
        recordBezierCurveTo(back, ctx, 441.0, 404.4, 437.8, 407.7, 433.8, 407.7);
        recordLineTo(back, ctx, 411.7, 407.7);
        recordBezierCurveTo(back, ctx, 407.8, 407.7, 404.5, 404.4, 404.5, 400.4);
        recordLineTo(back, ctx, 404.5, 380.3);
        recordBezierCurveTo(back, ctx, 404.5, 376.3, 407.8, 373.1, 411.7, 373.1);
        recordLineTo(back, ctx, 433.8, 373.1);
        recordBezierCurveTo(back, ctx, 437.8, 373.1, 441.0, 376.3, 441.0, 380.3);
        recordLineTo(back, ctx, 441.0, 400.4);
        ctx.closePath();
        gradient = ctx.createLinearGradient(422.8, 373.1, 422.8, 407.7);
        gradient.addColorStop(0.00, "rgb(234, 236, 236)");
        gradient.addColorStop(1.00, "rgb(203, 203, 203)");
        ctx.fillStyle = gradient;
        ctx.fill();

        // back/Group/Path
        ctx.beginPath();
        recordMoveTo(back, ctx, 406.1, 379.2);
        recordBezierCurveTo(back, ctx, 406.6, 376.5, 409.0, 374.5, 411.7, 374.5);
        recordLineTo(back, ctx, 433.8, 374.5);
        recordBezierCurveTo(back, ctx, 434.9, 374.5, 435.9, 374.9, 436.8, 375.4);
        recordBezierCurveTo(back, ctx, 437.2, 375.1, 437.5, 374.7, 437.6, 374.2);
        recordBezierCurveTo(back, ctx, 436.5, 373.5, 435.2, 373.1, 433.8, 373.1);
        recordLineTo(back, ctx, 411.7, 373.1);
        recordBezierCurveTo(back, ctx, 408.3, 373.1, 405.4, 375.6, 404.7, 378.9);
        recordBezierCurveTo(back, ctx, 405.1, 379.2, 405.5, 379.3, 406.1, 379.2);
        ctx.closePath();
        ctx.fillStyle = "rgb(247, 247, 247)";
        ctx.fill();

        // back/Group/Path
        ctx.beginPath();
        recordMoveTo(back, ctx, 433.3, 408.2);
        recordLineTo(back, ctx, 411.3, 408.2);
        recordBezierCurveTo(back, ctx, 407.3, 408.2, 404.1, 404.9, 404.1, 401.0);
        recordLineTo(back, ctx, 404.1, 380.8);
        recordBezierCurveTo(back, ctx, 404.1, 380.0, 404.2, 379.1, 404.5, 378.3);
        recordBezierCurveTo(back, ctx, 403.8, 379.5, 403.4, 380.8, 403.4, 382.3);
        recordLineTo(back, ctx, 403.4, 402.4);
        recordBezierCurveTo(back, ctx, 403.4, 406.4, 406.6, 409.6, 410.6, 409.6);
        recordLineTo(back, ctx, 432.6, 409.6);
        recordBezierCurveTo(back, ctx, 435.7, 409.6, 438.3, 407.7, 439.4, 404.9);
        recordBezierCurveTo(back, ctx, 438.1, 406.9, 435.8, 408.2, 433.3, 408.2);
        ctx.closePath();
        ctx.fillStyle = "rgb(139, 149, 159)";
        ctx.fill();

        // back/Group/Path
        ctx.beginPath();
        recordMoveTo(back, ctx, 441.0, 400.4);
        recordBezierCurveTo(back, ctx, 441.0, 404.4, 437.8, 407.7, 433.8, 407.7);
        recordLineTo(back, ctx, 411.7, 407.7);
        recordBezierCurveTo(back, ctx, 407.8, 407.7, 404.5, 404.4, 404.5, 400.4);
        recordLineTo(back, ctx, 404.5, 380.3);
        recordBezierCurveTo(back, ctx, 404.5, 376.3, 407.8, 373.1, 411.7, 373.1);
        recordLineTo(back, ctx, 433.8, 373.1);
        recordBezierCurveTo(back, ctx, 437.8, 373.1, 441.0, 376.3, 441.0, 380.3);
        recordLineTo(back, ctx, 441.0, 400.4);
        ctx.closePath();
        ctx.strokeStyle = "rgb(159, 159, 159)";
        ctx.stroke();

        // back/Group/Path
        ctx.beginPath();
        recordMoveTo(back, ctx, 419.5, 402.1);
        recordLineTo(back, ctx, 422.9, 398.7);
        recordLineTo(back, ctx, 417.9, 393.7);
        recordLineTo(back, ctx, 431.9, 393.7);
        recordLineTo(back, ctx, 431.9, 388.9);
        recordLineTo(back, ctx, 417.9, 388.9);
        recordLineTo(back, ctx, 422.8, 384.0);
        recordLineTo(back, ctx, 419.4, 380.7);
        recordLineTo(back, ctx, 408.8, 391.3);
        recordLineTo(back, ctx, 419.5, 402.1);
        ctx.closePath();
        ctx.fillStyle = "rgb(255, 255, 255)";
        ctx.fill();

        // back/Group/Path
        ctx.beginPath();
        recordMoveTo(back, ctx, 421.5, 400.1);
        recordLineTo(back, ctx, 424.9, 396.8);
        recordLineTo(back, ctx, 419.9, 391.8);
        recordLineTo(back, ctx, 433.8, 391.8);
        recordLineTo(back, ctx, 433.8, 387.0);
        recordLineTo(back, ctx, 419.9, 387.0);
        recordLineTo(back, ctx, 424.8, 382.1);
        recordLineTo(back, ctx, 421.4, 378.7);
        recordLineTo(back, ctx, 410.7, 389.4);
        recordLineTo(back, ctx, 421.5, 400.1);
        ctx.closePath();
        ctx.fillStyle = "rgb(32, 85, 138)";
        ctx.fill();

        // back/Group/Path
        ctx.beginPath();
        recordMoveTo(back, ctx, 420.6, 401.1);
        recordLineTo(back, ctx, 423.9, 397.7);
        recordLineTo(back, ctx, 419.0, 392.7);
        recordLineTo(back, ctx, 432.9, 392.7);
        recordLineTo(back, ctx, 432.9, 387.9);
        recordLineTo(back, ctx, 419.0, 387.9);
        recordLineTo(back, ctx, 423.8, 383.0);
        recordLineTo(back, ctx, 420.5, 379.6);
        recordLineTo(back, ctx, 409.8, 390.3);
        recordLineTo(back, ctx, 420.6, 401.1);
        ctx.closePath();
        ctx.fillStyle = "rgb(115, 153, 206)";
        ctx.fill();
        ctx.restore();
        ctx.restore();

      }
    }
  ];

  forward = new Character("forward", false);
  forward.show();
  forward.sequence.main.cels = [
    function ddFrameForward(ctx) {
      if (forward.visible) {

        var gradient;

        // forward/Group
        ctx.save();

        // forward/Group/Path
        ctx.save();
        ctx.beginPath();
        recordMoveTo(forward, ctx, 487.4, 381.8);
        recordBezierCurveTo(forward, ctx, 487.4, 377.8, 484.2, 374.5, 480.2, 374.5);
        recordLineTo(forward, ctx, 458.2, 374.5);
        recordBezierCurveTo(forward, ctx, 455.7, 374.5, 453.4, 375.8, 452.2, 377.8);
        recordBezierCurveTo(forward, ctx, 451.9, 378.6, 451.7, 379.4, 451.7, 380.3);
        recordLineTo(forward, ctx, 451.7, 400.4);
        recordBezierCurveTo(forward, ctx, 451.7, 404.4, 454.9, 407.7, 458.9, 407.7);
        recordLineTo(forward, ctx, 480.9, 407.7);
        recordBezierCurveTo(forward, ctx, 483.5, 407.7, 485.7, 406.3, 487.0, 404.4);
        recordBezierCurveTo(forward, ctx, 487.3, 403.6, 487.4, 402.8, 487.4, 401.9);
        recordLineTo(forward, ctx, 487.4, 381.8);
        ctx.closePath();
        gradient = ctx.createLinearGradient(469.6, 373.1, 469.6, 407.7);
        gradient.addColorStop(0.00, "rgb(234, 236, 236)");
        gradient.addColorStop(1.00, "rgb(203, 203, 203)");
        ctx.fillStyle = gradient;
        ctx.fill();

        // forward/Group/Path
        ctx.beginPath();
        recordMoveTo(forward, ctx, 488.2, 400.4);
        recordBezierCurveTo(forward, ctx, 488.2, 404.4, 484.9, 407.7, 480.9, 407.7);
        recordLineTo(forward, ctx, 458.9, 407.7);
        recordBezierCurveTo(forward, ctx, 454.9, 407.7, 451.7, 404.4, 451.7, 400.4);
        recordLineTo(forward, ctx, 451.7, 380.3);
        recordBezierCurveTo(forward, ctx, 451.7, 376.3, 454.9, 373.1, 458.9, 373.1);
        recordLineTo(forward, ctx, 480.9, 373.1);
        recordBezierCurveTo(forward, ctx, 484.9, 373.1, 488.2, 376.3, 488.2, 380.3);
        recordLineTo(forward, ctx, 488.2, 400.4);
        ctx.closePath();
        gradient = ctx.createLinearGradient(469.9, 373.1, 469.9, 407.7);
        gradient.addColorStop(0.00, "rgb(234, 236, 236)");
        gradient.addColorStop(1.00, "rgb(203, 203, 203)");
        ctx.fillStyle = gradient;
        ctx.fill();

        // forward/Group/Path
        ctx.beginPath();
        recordMoveTo(forward, ctx, 453.3, 379.2);
        recordBezierCurveTo(forward, ctx, 453.8, 376.5, 456.1, 374.5, 458.9, 374.5);
        recordLineTo(forward, ctx, 480.9, 374.5);
        recordBezierCurveTo(forward, ctx, 482.1, 374.5, 483.1, 374.9, 484.0, 375.4);
        recordBezierCurveTo(forward, ctx, 484.4, 375.1, 484.6, 374.7, 484.8, 374.2);
        recordBezierCurveTo(forward, ctx, 483.6, 373.5, 482.3, 373.1, 480.9, 373.1);
        recordLineTo(forward, ctx, 458.9, 373.1);
        recordBezierCurveTo(forward, ctx, 455.4, 373.1, 452.5, 375.6, 451.8, 378.9);
        recordBezierCurveTo(forward, ctx, 452.3, 379.2, 452.7, 379.3, 453.3, 379.2);
        ctx.closePath();
        ctx.fillStyle = "rgb(247, 247, 247)";
        ctx.fill();

        // forward/Group/Path
        ctx.beginPath();
        recordMoveTo(forward, ctx, 480.5, 408.2);
        recordLineTo(forward, ctx, 458.5, 408.2);
        recordBezierCurveTo(forward, ctx, 454.5, 408.2, 451.2, 404.9, 451.2, 401.0);
        recordLineTo(forward, ctx, 451.2, 380.8);
        recordBezierCurveTo(forward, ctx, 451.2, 380.0, 451.4, 379.1, 451.7, 378.3);
        recordBezierCurveTo(forward, ctx, 451.0, 379.5, 450.5, 380.8, 450.5, 382.3);
        recordLineTo(forward, ctx, 450.5, 402.4);
        recordBezierCurveTo(forward, ctx, 450.5, 406.4, 453.8, 409.6, 457.7, 409.6);
        recordLineTo(forward, ctx, 479.8, 409.6);
        recordBezierCurveTo(forward, ctx, 482.9, 409.6, 485.5, 407.7, 486.5, 404.9);
        recordBezierCurveTo(forward, ctx, 485.2, 406.9, 483.0, 408.2, 480.5, 408.2);
        ctx.closePath();
        ctx.fillStyle = "rgb(139, 149, 159)";
        ctx.fill();

        // forward/Group/Path
        ctx.beginPath();
        recordMoveTo(forward, ctx, 488.2, 400.4);
        recordBezierCurveTo(forward, ctx, 488.2, 404.4, 484.9, 407.7, 480.9, 407.7);
        recordLineTo(forward, ctx, 458.9, 407.7);
        recordBezierCurveTo(forward, ctx, 454.9, 407.7, 451.7, 404.4, 451.7, 400.4);
        recordLineTo(forward, ctx, 451.7, 380.3);
        recordBezierCurveTo(forward, ctx, 451.7, 376.3, 454.9, 373.1, 458.9, 373.1);
        recordLineTo(forward, ctx, 480.9, 373.1);
        recordBezierCurveTo(forward, ctx, 484.9, 373.1, 488.2, 376.3, 488.2, 380.3);
        recordLineTo(forward, ctx, 488.2, 400.4);
        ctx.closePath();
        ctx.strokeStyle = "rgb(159, 159, 159)";
        ctx.stroke();

        // forward/Group/Path
        ctx.beginPath();
        recordMoveTo(forward, ctx, 469.4, 380.7);
        recordLineTo(forward, ctx, 466.0, 384.0);
        recordLineTo(forward, ctx, 471.0, 389.1);
        recordLineTo(forward, ctx, 457.0, 389.1);
        recordLineTo(forward, ctx, 457.0, 393.8);
        recordLineTo(forward, ctx, 471.0, 393.8);
        recordLineTo(forward, ctx, 466.1, 398.7);
        recordLineTo(forward, ctx, 469.5, 402.1);
        recordLineTo(forward, ctx, 480.1, 391.4);
        recordLineTo(forward, ctx, 469.4, 380.7);
        ctx.closePath();
        ctx.fillStyle = "rgb(255, 255, 255)";
        ctx.fill();

        // forward/Group/Path
        ctx.beginPath();
        recordMoveTo(forward, ctx, 471.3, 378.7);
        recordLineTo(forward, ctx, 468.0, 382.1);
        recordLineTo(forward, ctx, 472.9, 387.1);
        recordLineTo(forward, ctx, 459.0, 387.1);
        recordLineTo(forward, ctx, 459.0, 391.9);
        recordLineTo(forward, ctx, 472.9, 391.9);
        recordLineTo(forward, ctx, 468.1, 396.8);
        recordLineTo(forward, ctx, 471.4, 400.1);
        recordLineTo(forward, ctx, 482.1, 389.5);
        recordLineTo(forward, ctx, 471.3, 378.7);
        ctx.closePath();
        ctx.fillStyle = "rgb(32, 85, 138)";
        ctx.fill();

        // forward/Group/Path
        ctx.beginPath();
        recordMoveTo(forward, ctx, 470.4, 379.6);
        recordLineTo(forward, ctx, 467.0, 383.0);
        recordLineTo(forward, ctx, 472.0, 388.0);
        recordLineTo(forward, ctx, 458.1, 388.0);
        recordLineTo(forward, ctx, 458.1, 392.8);
        recordLineTo(forward, ctx, 472.0, 392.8);
        recordLineTo(forward, ctx, 467.1, 397.7);
        recordLineTo(forward, ctx, 470.5, 401.1);
        recordLineTo(forward, ctx, 481.2, 390.4);
        recordLineTo(forward, ctx, 470.4, 379.6);
        ctx.closePath();
        ctx.fillStyle = "rgb(115, 153, 206)";
        ctx.fill();
        ctx.restore();
        ctx.restore();
      }
    }
  ];

  track = new Character("track", false);
  track.show();
  track.sequence.main.cels = [
    function (ctx) {
      if (track.visible) {

      // track/Path
      ctx.save();
      ctx.fillStyle = "rgb(227, 215, 196)";
      recordFillRect(track, ctx, 0.0, 334.0, 564.4, 13);
      ctx.restore();
      }
    }
  ];

  vaulter = new Character("vaulter", false);
  vaulter.show();
  vaulter.sequence.main.cels = [
    function (ctx) {
      if (vaulter.visible) {

        // vaulter/Group
        ctx.save();

        // vaulter/Group/Path
        ctx.save();
        ctx.beginPath();
        recordMoveTo(vaulter, ctx, 59.1, 301.0);
        recordBezierCurveTo(vaulter, ctx, 57.9, 304.6, 51.7, 315.1, 49.2, 315.8);
        recordBezierCurveTo(vaulter, ctx, 46.7, 316.4, 36.1, 311.9, 36.1, 311.9);
        recordBezierCurveTo(vaulter, ctx, 36.1, 311.9, 28.6, 309.8, 22.4, 310.6);
        recordBezierCurveTo(vaulter, ctx, 16.1, 311.5, 14.7, 313.3, 13.6, 313.3);
        recordBezierCurveTo(vaulter, ctx, 12.5, 313.3, 12.1, 312.0, 12.1, 312.0);
        recordBezierCurveTo(vaulter, ctx, 12.9, 311.4, 21.5, 302.9, 23.0, 302.8);
        recordBezierCurveTo(vaulter, ctx, 24.5, 302.6, 25.5, 304.4, 25.5, 304.4);
        recordBezierCurveTo(vaulter, ctx, 25.5, 304.4, 28.1, 305.8, 31.6, 306.0);
        recordBezierCurveTo(vaulter, ctx, 35.1, 306.3, 46.4, 307.4, 46.4, 307.4);
        recordBezierCurveTo(vaulter, ctx, 46.5, 303.8, 49.2, 292.9, 49.2, 292.9);
        recordLineTo(vaulter, ctx, 59.1, 301.0);
        ctx.closePath();
        ctx.fillStyle = "rgb(17, 92, 137)";
        ctx.fill();
        ctx.lineWidth = 0.5;
        ctx.strokeStyle = "rgb(141, 204, 255)";
        ctx.lineJoin = "miter";
        ctx.miterLimit = 4.0;
        ctx.stroke();

        // vaulter/Group/Path
        ctx.beginPath();
        recordMoveTo(vaulter, ctx, 57.4, 259.0);
        recordBezierCurveTo(vaulter, ctx, 57.4, 259.0, 59.2, 258.3, 60.9, 258.5);
        recordBezierCurveTo(vaulter, ctx, 62.6, 258.8, 65.7, 260.7, 65.5, 262.9);
        recordBezierCurveTo(vaulter, ctx, 65.5, 262.9, 69.4, 267.1, 69.9, 267.8);
        recordBezierCurveTo(vaulter, ctx, 70.4, 268.5, 74.7, 271.0, 74.6, 273.1);
        recordBezierCurveTo(vaulter, ctx, 74.6, 275.3, 74.1, 276.6, 74.3, 277.8);
        recordLineTo(vaulter, ctx, 71.2, 279.1);
        recordBezierCurveTo(vaulter, ctx, 71.2, 279.1, 69.4, 277.9, 69.1, 276.3);
        recordBezierCurveTo(vaulter, ctx, 68.8, 274.6, 69.2, 273.9, 68.5, 273.4);
        recordBezierCurveTo(vaulter, ctx, 67.8, 272.9, 66.7, 272.0, 65.8, 271.0);
        recordBezierCurveTo(vaulter, ctx, 64.8, 270.0, 64.2, 269.2, 63.7, 268.8);
        recordBezierCurveTo(vaulter, ctx, 63.3, 268.4, 63.0, 268.5, 61.8, 269.2);
        ctx.fill();
        ctx.stroke();

        // vaulter/Group/Path
        ctx.beginPath();
        recordMoveTo(vaulter, ctx, 49.1, 288.1);
        recordBezierCurveTo(vaulter, ctx, 49.1, 288.1, 49.4, 277.7, 47.9, 273.6);
        recordBezierCurveTo(vaulter, ctx, 46.5, 269.4, 48.6, 258.4, 50.8, 258.9);
        recordBezierCurveTo(vaulter, ctx, 53.0, 259.5, 52.5, 257.0, 52.5, 257.0);
        recordBezierCurveTo(vaulter, ctx, 52.5, 257.0, 50.1, 251.7, 50.0, 249.4);
        recordBezierCurveTo(vaulter, ctx, 49.9, 247.2, 51.2, 241.8, 55.8, 241.6);
        recordBezierCurveTo(vaulter, ctx, 60.3, 241.3, 62.0, 246.3, 62.0, 246.3);
        recordBezierCurveTo(vaulter, ctx, 62.0, 246.3, 62.6, 250.6, 62.6, 251.7);
        recordBezierCurveTo(vaulter, ctx, 62.6, 252.9, 60.2, 257.5, 60.2, 257.5);
        recordBezierCurveTo(vaulter, ctx, 60.2, 257.5, 64.8, 264.0, 64.6, 267.2);
        recordBezierCurveTo(vaulter, ctx, 64.6, 267.2, 64.6, 282.1, 63.5, 284.4);
        recordBezierCurveTo(vaulter, ctx, 62.3, 286.8, 62.3, 291.5, 63.1, 293.4);
        ctx.fill();
        ctx.stroke();

        // vaulter/Group/Path
        ctx.beginPath();
        recordMoveTo(vaulter, ctx, 48.4, 276.4);
        recordBezierCurveTo(vaulter, ctx, 48.4, 276.4, 54.2, 277.2, 55.2, 269.7);
        recordBezierCurveTo(vaulter, ctx, 56.2, 262.3, 53.3, 259.7, 51.3, 259.5);
        recordBezierCurveTo(vaulter, ctx, 49.4, 259.3, 46.0, 262.9, 46.0, 267.9);
        recordBezierCurveTo(vaulter, ctx, 46.0, 273.0, 46.2, 274.6, 48.4, 276.4);
        ctx.closePath();
        ctx.fill();
        ctx.stroke();

        // vaulter/Group/Path
        ctx.beginPath();
        recordMoveTo(vaulter, ctx, 60.1, 289.2);
        recordBezierCurveTo(vaulter, ctx, 67.3, 294.1, 76.1, 303.7, 76.5, 304.4);
        recordBezierCurveTo(vaulter, ctx, 77.0, 305.2, 77.5, 309.7, 77.5, 309.7);
        recordLineTo(vaulter, ctx, 81.8, 324.8);
        recordBezierCurveTo(vaulter, ctx, 81.8, 324.8, 84.4, 329.1, 86.0, 329.9);
        recordBezierCurveTo(vaulter, ctx, 87.7, 330.7, 91.3, 332.7, 91.9, 333.0);
        recordBezierCurveTo(vaulter, ctx, 92.4, 333.3, 92.7, 334.6, 92.7, 334.6);
        recordBezierCurveTo(vaulter, ctx, 92.7, 334.6, 93.5, 335.9, 92.1, 336.4);
        recordBezierCurveTo(vaulter, ctx, 90.1, 337.0, 85.1, 334.8, 82.7, 334.3);
        recordBezierCurveTo(vaulter, ctx, 80.4, 333.8, 80.8, 330.8, 80.8, 330.8);
        recordLineTo(vaulter, ctx, 78.2, 325.1);
        recordBezierCurveTo(vaulter, ctx, 71.6, 318.3, 70.7, 308.1, 70.7, 308.1);
        recordBezierCurveTo(vaulter, ctx, 70.7, 308.1, 54.5, 300.6, 51.5, 299.3);
        recordBezierCurveTo(vaulter, ctx, 46.8, 297.2, 49.1, 288.1, 49.1, 288.1);
        ctx.fill();
        ctx.stroke();

        // vaulter/Group/Path
        ctx.beginPath();
        recordMoveTo(vaulter, ctx, 25.7, 304.3);
        recordBezierCurveTo(vaulter, ctx, 25.7, 304.3, 25.0, 304.5, 24.6, 303.8);
        recordBezierCurveTo(vaulter, ctx, 24.3, 303.1, 24.8, 302.6, 24.8, 302.6);
        recordBezierCurveTo(vaulter, ctx, 25.3, 302.3, 75.6, 275.1, 129.9, 253.0);
        recordLineTo(vaulter, ctx, 265.3, 197.9);
        recordLineTo(vaulter, ctx, 266.1, 199.8);
        recordLineTo(vaulter, ctx, 130.6, 254.9);
        recordBezierCurveTo(vaulter, ctx, 76.4, 276.9, 26.2, 304.1, 25.7, 304.3);
        ctx.closePath();
        ctx.fill();
        ctx.stroke();

        // vaulter/Group/Path
        ctx.beginPath();
        recordMoveTo(vaulter, ctx, 71.1, 280.5);
        recordBezierCurveTo(vaulter, ctx, 71.1, 280.5, 72.1, 278.6, 72.8, 278.3);
        recordBezierCurveTo(vaulter, ctx, 73.5, 278.0, 75.0, 278.1, 75.0, 278.1);
        recordLineTo(vaulter, ctx, 75.6, 279.3);
        recordLineTo(vaulter, ctx, 75.0, 281.1);
        recordLineTo(vaulter, ctx, 73.0, 281.5);
        recordBezierCurveTo(vaulter, ctx, 73.0, 281.5, 72.7, 282.0, 72.0, 281.8);
        recordBezierCurveTo(vaulter, ctx, 71.4, 281.7, 71.1, 280.5, 71.1, 280.5);
        ctx.closePath();
        ctx.fill();
        ctx.stroke();

        // vaulter/Group/Path
        ctx.beginPath();
        recordMoveTo(vaulter, ctx, 52.9, 261.1);
        recordBezierCurveTo(vaulter, ctx, 52.9, 261.1, 51.0, 259.4, 48.8, 260.1);
        recordBezierCurveTo(vaulter, ctx, 46.7, 260.7, 43.6, 263.7, 41.7, 265.7);
        recordBezierCurveTo(vaulter, ctx, 39.8, 267.7, 37.2, 273.6, 36.5, 275.0);
        recordBezierCurveTo(vaulter, ctx, 35.7, 276.5, 36.5, 277.6, 37.1, 281.7);
        recordBezierCurveTo(vaulter, ctx, 37.7, 285.8, 39.6, 291.9, 39.6, 291.9);
        recordBezierCurveTo(vaulter, ctx, 39.6, 291.9, 39.1, 293.0, 39.1, 293.5);
        recordBezierCurveTo(vaulter, ctx, 39.1, 293.9, 38.8, 296.5, 40.0, 296.8);
        recordBezierCurveTo(vaulter, ctx, 41.1, 297.1, 43.6, 296.3, 43.6, 296.3);
        recordBezierCurveTo(vaulter, ctx, 43.6, 296.3, 45.0, 295.3, 44.7, 293.8);
        recordBezierCurveTo(vaulter, ctx, 44.7, 293.8, 44.5, 291.6, 42.9, 291.5);
        recordLineTo(vaulter, ctx, 41.9, 290.8);
        recordBezierCurveTo(vaulter, ctx, 41.9, 290.8, 40.8, 287.3, 41.2, 283.6);
        recordBezierCurveTo(vaulter, ctx, 41.6, 279.8, 41.2, 274.2, 41.2, 274.2);
        recordLineTo(vaulter, ctx, 47.0, 270.1);
        recordBezierCurveTo(vaulter, ctx, 50.5, 270.7, 52.9, 267.9, 52.9, 267.9);
        ctx.fill();
        ctx.stroke();
        ctx.restore();
        ctx.restore();
      }
    },

    function (ctx) {
      if (vaulter.visible) {

        // vaulter/Path
        ctx.save();
        ctx.beginPath();
        recordMoveTo(vaulter, ctx, 61.0, 264.2);
        recordBezierCurveTo(vaulter, ctx, 61.0, 264.2, 65.1, 266.6, 66.0, 270.4);
        recordBezierCurveTo(vaulter, ctx, 66.0, 270.4, 69.8, 275.4, 71.0, 277.3);
        recordBezierCurveTo(vaulter, ctx, 72.1, 279.2, 72.6, 286.3, 72.6, 286.3);
        recordLineTo(vaulter, ctx, 73.9, 289.3);
        recordLineTo(vaulter, ctx, 70.2, 291.2);
        recordLineTo(vaulter, ctx, 69.7, 288.6);
        recordBezierCurveTo(vaulter, ctx, 69.7, 288.6, 69.1, 285.3, 69.0, 284.2);
        recordBezierCurveTo(vaulter, ctx, 68.8, 283.1, 66.1, 278.2, 66.1, 278.2);
        recordLineTo(vaulter, ctx, 61.0, 272.3);
        ctx.fillStyle = "rgb(17, 92, 137)";
        ctx.fill();
        ctx.lineWidth = 0.5;
        ctx.strokeStyle = "rgb(141, 204, 255)";
        ctx.lineJoin = "miter";
        ctx.miterLimit = 4.0;
        ctx.stroke();

        // vaulter/Path
        ctx.beginPath();
        recordMoveTo(vaulter, ctx, 67.9, 306.6);
        recordBezierCurveTo(vaulter, ctx, 64.9, 302.8, 63.2, 299.1, 63.2, 299.1);
        recordBezierCurveTo(vaulter, ctx, 62.4, 297.2, 62.4, 292.5, 63.6, 290.1);
        recordBezierCurveTo(vaulter, ctx, 64.8, 287.8, 64.8, 272.9, 64.8, 272.9);
        recordBezierCurveTo(vaulter, ctx, 64.9, 269.8, 60.3, 263.2, 60.3, 263.2);
        recordBezierCurveTo(vaulter, ctx, 60.3, 263.2, 62.7, 258.6, 62.7, 257.5);
        recordBezierCurveTo(vaulter, ctx, 62.7, 256.3, 62.2, 252.0, 62.2, 252.0);
        recordBezierCurveTo(vaulter, ctx, 62.2, 252.0, 60.5, 247.0, 55.9, 247.3);
        recordBezierCurveTo(vaulter, ctx, 51.3, 247.5, 50.0, 253.0, 50.1, 255.2);
        recordBezierCurveTo(vaulter, ctx, 50.3, 257.4, 52.6, 262.7, 52.6, 262.7);
        recordBezierCurveTo(vaulter, ctx, 52.6, 262.7, 53.1, 265.2, 50.9, 264.7);
        recordBezierCurveTo(vaulter, ctx, 48.7, 264.1, 46.6, 275.1, 48.1, 279.3);
        recordBezierCurveTo(vaulter, ctx, 49.5, 283.5, 49.3, 293.9, 49.3, 293.9);
        recordBezierCurveTo(vaulter, ctx, 47.8, 295.4, 49.1, 299.5, 49.1, 299.5);
        recordBezierCurveTo(vaulter, ctx, 49.1, 299.5, 53.1, 306.8, 57.9, 310.5);
        recordLineTo(vaulter, ctx, 46.9, 307.2);
        recordBezierCurveTo(vaulter, ctx, 46.6, 306.7, 46.0, 305.8, 45.4, 305.5);
        recordBezierCurveTo(vaulter, ctx, 44.5, 305.1, 43.6, 305.4, 43.6, 305.4);
        recordBezierCurveTo(vaulter, ctx, 43.3, 305.6, 40.8, 306.8, 40.8, 306.8);
        recordBezierCurveTo(vaulter, ctx, 40.8, 306.8, 36.8, 308.4, 36.4, 308.4);
        recordBezierCurveTo(vaulter, ctx, 36.0, 308.4, 31.4, 309.9, 31.6, 311.2);
        recordBezierCurveTo(vaulter, ctx, 31.7, 312.4, 33.2, 313.1, 33.9, 312.9);
        recordBezierCurveTo(vaulter, ctx, 34.6, 312.8, 38.6, 311.8, 42.3, 311.3);
        recordBezierCurveTo(vaulter, ctx, 46.1, 310.8, 54.9, 314.9, 58.7, 316.9);
        recordBezierCurveTo(vaulter, ctx, 62.4, 318.9, 67.9, 319.1, 67.9, 319.1);
        recordBezierCurveTo(vaulter, ctx, 67.9, 319.1, 71.2, 318.2, 71.4, 317.0);
        recordBezierCurveTo(vaulter, ctx, 71.5, 315.9, 70.8, 310.4, 67.9, 306.6);
        ctx.closePath();
        ctx.fill();
        ctx.stroke();

        // vaulter/Path
        ctx.beginPath();
        recordMoveTo(vaulter, ctx, 48.5, 282.1);
        recordBezierCurveTo(vaulter, ctx, 48.5, 282.1, 54.4, 282.9, 55.4, 275.4);
        recordBezierCurveTo(vaulter, ctx, 56.3, 268.0, 53.4, 265.4, 51.4, 265.2);
        recordBezierCurveTo(vaulter, ctx, 49.5, 265.0, 46.2, 268.6, 46.2, 273.7);
        recordBezierCurveTo(vaulter, ctx, 46.2, 278.8, 46.4, 280.3, 48.5, 282.1);
        ctx.closePath();
        ctx.fill();
        ctx.stroke();

        // vaulter/Path
        ctx.beginPath();
        recordMoveTo(vaulter, ctx, 49.3, 294.2);
        recordBezierCurveTo(vaulter, ctx, 47.9, 296.4, 49.3, 300.1, 49.3, 300.1);
        recordBezierCurveTo(vaulter, ctx, 49.3, 300.1, 54.6, 310.7, 59.1, 314.5);
        recordLineTo(vaulter, ctx, 59.1, 316.1);
        recordBezierCurveTo(vaulter, ctx, 59.1, 316.1, 55.4, 323.7, 55.2, 325.6);
        recordBezierCurveTo(vaulter, ctx, 54.9, 327.5, 54.9, 331.8, 54.9, 332.4);
        recordBezierCurveTo(vaulter, ctx, 54.9, 333.0, 54.8, 336.7, 54.9, 337.6);
        recordBezierCurveTo(vaulter, ctx, 55.0, 338.4, 55.8, 339.1, 56.2, 340.3);
        recordBezierCurveTo(vaulter, ctx, 56.3, 340.5, 59.7, 341.7, 59.7, 341.7);
        recordBezierCurveTo(vaulter, ctx, 59.7, 341.7, 61.2, 341.9, 61.9, 341.8);
        recordBezierCurveTo(vaulter, ctx, 63.4, 341.6, 64.6, 340.9, 64.6, 340.9);
        recordBezierCurveTo(vaulter, ctx, 64.6, 340.9, 64.4, 338.6, 63.6, 338.4);
        recordBezierCurveTo(vaulter, ctx, 62.9, 338.2, 60.7, 337.0, 60.0, 336.5);
        recordBezierCurveTo(vaulter, ctx, 59.3, 336.0, 58.1, 334.2, 58.1, 334.2);
        recordBezierCurveTo(vaulter, ctx, 58.1, 334.2, 58.5, 331.4, 60.2, 327.9);
        recordBezierCurveTo(vaulter, ctx, 61.9, 324.4, 63.0, 321.1, 64.7, 319.5);
        recordBezierCurveTo(vaulter, ctx, 66.0, 318.3, 65.6, 314.5, 65.6, 314.5);
        recordBezierCurveTo(vaulter, ctx, 65.6, 314.5, 65.7, 311.3, 65.0, 308.4);
        recordBezierCurveTo(vaulter, ctx, 64.4, 305.4, 61.7, 299.1, 61.5, 298.8);
        ctx.fill();
        ctx.stroke();

        // vaulter/Path
        ctx.beginPath();
        recordMoveTo(vaulter, ctx, 36.6, 310.0);
        recordBezierCurveTo(vaulter, ctx, 36.6, 310.0, 35.9, 310.1, 35.5, 309.4);
        recordBezierCurveTo(vaulter, ctx, 35.1, 308.7, 35.6, 308.2, 35.6, 308.2);
        recordBezierCurveTo(vaulter, ctx, 36.2, 307.9, 86.4, 280.7, 140.7, 258.7);
        recordLineTo(vaulter, ctx, 276.2, 203.6);
        recordLineTo(vaulter, ctx, 276.9, 205.4);
        recordLineTo(vaulter, ctx, 141.5, 260.5);
        recordBezierCurveTo(vaulter, ctx, 87.3, 282.5, 37.1, 309.7, 36.6, 310.0);
        ctx.closePath();
        ctx.fill();
        ctx.stroke();

        // vaulter/Path
        ctx.beginPath();
        recordMoveTo(vaulter, ctx, 70.2, 292.3);
        recordBezierCurveTo(vaulter, ctx, 70.2, 292.3, 71.2, 290.4, 71.9, 290.1);
        recordBezierCurveTo(vaulter, ctx, 72.6, 289.8, 74.1, 289.9, 74.1, 289.9);
        recordLineTo(vaulter, ctx, 74.7, 291.1);
        recordLineTo(vaulter, ctx, 74.1, 292.9);
        recordLineTo(vaulter, ctx, 72.1, 293.3);
        recordBezierCurveTo(vaulter, ctx, 72.1, 293.3, 71.8, 293.8, 71.2, 293.6);
        recordBezierCurveTo(vaulter, ctx, 70.5, 293.5, 70.2, 292.3, 70.2, 292.3);
        ctx.closePath();
        ctx.fill();
        ctx.stroke();

        // vaulter/Path
        ctx.beginPath();
        recordMoveTo(vaulter, ctx, 53.5, 272.6);
        recordBezierCurveTo(vaulter, ctx, 53.5, 272.6, 51.0, 275.1, 49.7, 275.7);
        recordBezierCurveTo(vaulter, ctx, 48.5, 276.3, 47.1, 281.8, 45.0, 284.7);
        recordBezierCurveTo(vaulter, ctx, 45.0, 284.7, 46.6, 291.1, 46.9, 294.3);
        recordBezierCurveTo(vaulter, ctx, 47.1, 297.6, 48.1, 300.7, 48.1, 300.7);
        recordBezierCurveTo(vaulter, ctx, 48.3, 301.3, 49.6, 302.0, 50.2, 302.3);
        recordBezierCurveTo(vaulter, ctx, 50.9, 302.7, 50.2, 304.7, 50.2, 305.1);
        recordBezierCurveTo(vaulter, ctx, 50.2, 305.5, 50.1, 306.7, 49.1, 306.8);
        recordBezierCurveTo(vaulter, ctx, 48.1, 307.0, 46.0, 307.8, 45.0, 306.8);
        recordBezierCurveTo(vaulter, ctx, 44.0, 305.8, 44.4, 303.0, 44.4, 303.0);
        recordBezierCurveTo(vaulter, ctx, 44.4, 303.0, 44.6, 301.3, 44.4, 299.7);
        recordBezierCurveTo(vaulter, ctx, 44.3, 298.1, 42.0, 293.2, 40.2, 289.1);
        recordBezierCurveTo(vaulter, ctx, 38.5, 285.0, 40.4, 282.5, 40.4, 282.5);
        recordBezierCurveTo(vaulter, ctx, 40.4, 282.5, 44.5, 272.2, 45.0, 269.7);
        recordBezierCurveTo(vaulter, ctx, 45.5, 267.2, 49.2, 265.6, 49.2, 265.6);
        recordBezierCurveTo(vaulter, ctx, 49.2, 265.6, 50.5, 265.0, 51.4, 265.2);
        ctx.fill();
        ctx.stroke();
        ctx.restore();
      }
    },

    function (ctx) {
      if (vaulter.visible) {

        // vaulter/Path
        ctx.save();
        ctx.beginPath();
        recordMoveTo(vaulter, ctx, 52.0, 304.2);
        recordBezierCurveTo(vaulter, ctx, 52.0, 304.2, 59.0, 309.8, 66.5, 310.5);
        recordBezierCurveTo(vaulter, ctx, 66.5, 310.5, 60.6, 312.9, 56.9, 314.5);
        recordBezierCurveTo(vaulter, ctx, 53.3, 316.2, 52.4, 316.5, 50.9, 316.5);
        recordBezierCurveTo(vaulter, ctx, 50.1, 316.5, 49.7, 316.6, 49.1, 317.0);
        recordBezierCurveTo(vaulter, ctx, 48.6, 317.3, 48.6, 318.2, 48.7, 318.9);
        recordBezierCurveTo(vaulter, ctx, 49.2, 320.5, 52.2, 324.0, 52.2, 324.0);
        recordBezierCurveTo(vaulter, ctx, 52.2, 324.0, 55.2, 327.8, 55.8, 327.7);
        recordBezierCurveTo(vaulter, ctx, 57.0, 327.3, 56.7, 325.7, 56.7, 325.7);
        recordLineTo(vaulter, ctx, 54.5, 319.9);
        recordLineTo(vaulter, ctx, 56.9, 319.0);
        recordLineTo(vaulter, ctx, 67.4, 316.9);
        recordBezierCurveTo(vaulter, ctx, 67.4, 316.9, 75.8, 314.2, 77.2, 313.3);
        recordBezierCurveTo(vaulter, ctx, 78.6, 312.4, 77.5, 310.0, 77.2, 309.0);
        recordBezierCurveTo(vaulter, ctx, 77.0, 308.0, 65.1, 298.7, 65.1, 298.7);
        recordBezierCurveTo(vaulter, ctx, 62.8, 297.0, 58.4, 295.0, 58.4, 295.0);
        recordLineTo(vaulter, ctx, 52.0, 304.2);
        ctx.closePath();
        ctx.fillStyle = "rgb(17, 92, 137)";
        ctx.fill();
        ctx.lineWidth = 0.5;
        ctx.strokeStyle = "rgb(141, 204, 255)";
        ctx.lineJoin = "miter";
        ctx.miterLimit = 4.0;
        ctx.stroke();

        // vaulter/Path
        ctx.beginPath();
        recordMoveTo(vaulter, ctx, 60.7, 277.7);
        recordLineTo(vaulter, ctx, 65.3, 282.5);
        recordBezierCurveTo(vaulter, ctx, 65.3, 282.5, 67.3, 284.5, 68.3, 287.5);
        recordBezierCurveTo(vaulter, ctx, 69.3, 290.5, 69.5, 293.9, 69.5, 293.9);
        recordLineTo(vaulter, ctx, 70.4, 297.8);
        recordLineTo(vaulter, ctx, 74.0, 296.2);
        recordLineTo(vaulter, ctx, 72.9, 285.9);
        recordLineTo(vaulter, ctx, 70.2, 280.7);
        recordLineTo(vaulter, ctx, 64.3, 273.4);
        recordBezierCurveTo(vaulter, ctx, 64.3, 273.4, 62.6, 270.0, 60.7, 269.8);
        ctx.fill();
        ctx.stroke();

        // vaulter/Path
        ctx.beginPath();
        recordMoveTo(vaulter, ctx, 60.7, 302.6);
        recordBezierCurveTo(vaulter, ctx, 59.1, 308.7, 55.5, 320.5, 54.8, 322.3);
        recordBezierCurveTo(vaulter, ctx, 53.8, 324.6, 52.2, 325.7, 52.2, 325.7);
        recordBezierCurveTo(vaulter, ctx, 52.2, 325.7, 41.6, 330.5, 41.3, 331.4);
        recordBezierCurveTo(vaulter, ctx, 41.0, 332.4, 40.4, 333.7, 40.4, 333.7);
        recordBezierCurveTo(vaulter, ctx, 40.4, 333.7, 41.0, 335.3, 41.9, 336.6);
        recordBezierCurveTo(vaulter, ctx, 43.0, 338.2, 42.6, 339.6, 42.4, 340.5);
        recordBezierCurveTo(vaulter, ctx, 42.3, 340.9, 42.0, 342.1, 41.4, 342.2);
        recordBezierCurveTo(vaulter, ctx, 41.0, 342.3, 40.4, 342.0, 39.7, 341.7);
        recordBezierCurveTo(vaulter, ctx, 38.0, 340.8, 37.2, 337.7, 37.3, 336.7);
        recordBezierCurveTo(vaulter, ctx, 37.5, 334.8, 35.6, 333.3, 35.6, 332.4);
        recordBezierCurveTo(vaulter, ctx, 35.7, 331.3, 36.4, 329.8, 36.4, 329.8);
        recordBezierCurveTo(vaulter, ctx, 36.4, 329.8, 36.6, 329.5, 38.0, 329.2);
        recordBezierCurveTo(vaulter, ctx, 39.4, 328.9, 49.4, 319.6, 49.4, 319.0);
        recordBezierCurveTo(vaulter, ctx, 49.4, 319.0, 49.0, 302.7, 49.3, 299.9);
        recordBezierCurveTo(vaulter, ctx, 49.3, 299.9, 49.5, 289.5, 48.1, 285.3);
        recordBezierCurveTo(vaulter, ctx, 46.6, 281.1, 48.7, 270.2, 50.9, 270.7);
        recordBezierCurveTo(vaulter, ctx, 53.1, 271.2, 52.6, 268.7, 52.6, 268.7);
        recordBezierCurveTo(vaulter, ctx, 52.6, 268.7, 50.3, 263.4, 50.1, 261.2);
        recordBezierCurveTo(vaulter, ctx, 50.0, 259.0, 51.3, 253.6, 55.9, 253.3);
        recordBezierCurveTo(vaulter, ctx, 60.5, 253.1, 62.2, 258.0, 62.2, 258.0);
        recordBezierCurveTo(vaulter, ctx, 62.2, 258.0, 62.7, 262.3, 62.7, 263.5);
        recordBezierCurveTo(vaulter, ctx, 62.7, 264.7, 60.3, 269.3, 60.3, 269.3);
        recordBezierCurveTo(vaulter, ctx, 60.3, 269.3, 64.9, 275.8, 64.8, 278.9);
        recordBezierCurveTo(vaulter, ctx, 64.8, 278.9, 64.8, 293.8, 63.6, 296.2);
        recordBezierCurveTo(vaulter, ctx, 63.2, 296.9, 63.0, 297.9, 62.8, 299.0);
        ctx.fill();
        ctx.stroke();

        // vaulter/Path
        ctx.beginPath();
        recordMoveTo(vaulter, ctx, 48.5, 288.1);
        recordBezierCurveTo(vaulter, ctx, 48.5, 288.1, 54.4, 288.9, 55.4, 281.5);
        recordBezierCurveTo(vaulter, ctx, 56.3, 274.0, 53.4, 271.5, 51.4, 271.3);
        recordBezierCurveTo(vaulter, ctx, 49.5, 271.1, 46.2, 274.6, 46.2, 279.7);
        recordBezierCurveTo(vaulter, ctx, 46.2, 284.8, 46.4, 286.4, 48.5, 288.1);
        ctx.closePath();
        ctx.fill();
        ctx.stroke();

        // vaulter/Path
        ctx.beginPath();
        recordMoveTo(vaulter, ctx, 36.3, 315.1);
        recordBezierCurveTo(vaulter, ctx, 36.3, 315.1, 35.9, 315.2, 35.5, 314.5);
        recordBezierCurveTo(vaulter, ctx, 35.2, 313.8, 35.6, 313.3, 35.6, 313.3);
        recordBezierCurveTo(vaulter, ctx, 36.1, 313.0, 87.1, 289.1, 137.3, 268.0);
        recordLineTo(vaulter, ctx, 276.6, 209.9);
        recordLineTo(vaulter, ctx, 277.3, 211.8);
        recordLineTo(vaulter, ctx, 138.0, 269.8);
        recordBezierCurveTo(vaulter, ctx, 87.9, 290.9, 36.9, 314.9, 36.3, 315.1);
        ctx.closePath();
        ctx.fill();
        ctx.stroke();

        // vaulter/Path
        ctx.beginPath();
        recordMoveTo(vaulter, ctx, 70.3, 298.7);
        recordBezierCurveTo(vaulter, ctx, 70.3, 298.7, 71.3, 296.9, 72.1, 296.6);
        recordBezierCurveTo(vaulter, ctx, 72.8, 296.2, 74.3, 296.4, 74.3, 296.4);
        recordLineTo(vaulter, ctx, 74.9, 297.5);
        recordLineTo(vaulter, ctx, 74.3, 299.3);
        recordLineTo(vaulter, ctx, 72.3, 299.7);
        recordBezierCurveTo(vaulter, ctx, 72.3, 299.7, 72.0, 300.3, 71.3, 300.1);
        recordBezierCurveTo(vaulter, ctx, 70.6, 299.9, 70.3, 298.7, 70.3, 298.7);
        ctx.closePath();
        ctx.fill();
        ctx.stroke();

        // vaulter/Path
        ctx.beginPath();
        recordMoveTo(vaulter, ctx, 50.7, 271.3);
        recordBezierCurveTo(vaulter, ctx, 50.7, 271.3, 45.1, 273.8, 44.5, 277.0);
        recordBezierCurveTo(vaulter, ctx, 44.0, 279.6, 43.7, 281.5, 43.7, 281.5);
        recordLineTo(vaulter, ctx, 39.3, 289.5);
        recordBezierCurveTo(vaulter, ctx, 39.3, 289.5, 38.5, 292.4, 39.3, 294.4);
        recordBezierCurveTo(vaulter, ctx, 40.2, 296.4, 43.9, 300.5, 46.1, 305.7);
        recordBezierCurveTo(vaulter, ctx, 46.1, 305.7, 46.2, 306.7, 46.1, 307.3);
        recordBezierCurveTo(vaulter, ctx, 46.0, 307.9, 45.5, 308.8, 46.1, 309.5);
        recordBezierCurveTo(vaulter, ctx, 46.8, 310.3, 47.8, 311.1, 47.8, 311.1);
        recordBezierCurveTo(vaulter, ctx, 47.8, 311.1, 49.9, 310.6, 50.7, 309.9);
        recordBezierCurveTo(vaulter, ctx, 51.4, 309.3, 52.1, 307.8, 52.1, 307.8);
        recordBezierCurveTo(vaulter, ctx, 52.1, 307.8, 51.4, 304.8, 50.8, 304.9);
        recordBezierCurveTo(vaulter, ctx, 50.3, 304.9, 49.0, 304.2, 48.8, 303.7);
        recordLineTo(vaulter, ctx, 46.1, 297.2);
        recordLineTo(vaulter, ctx, 44.8, 291.9);
        recordLineTo(vaulter, ctx, 49.8, 282.7);
        recordLineTo(vaulter, ctx, 53.3, 281.0);
        ctx.fill();
        ctx.stroke();
        ctx.restore();
      }
    },

    function (ctx) {
      if (vaulter.visible) {

        // vaulter/Path
        ctx.save();
        ctx.beginPath();
        recordMoveTo(vaulter, ctx, 56.9, 305.6);
        recordBezierCurveTo(vaulter, ctx, 63.2, 307.5, 71.5, 306.4, 71.5, 306.4);
        recordBezierCurveTo(vaulter, ctx, 71.5, 306.4, 70.9, 312.3, 70.9, 314.2);
        recordBezierCurveTo(vaulter, ctx, 70.9, 316.1, 69.2, 326.9, 69.2, 326.9);
        recordBezierCurveTo(vaulter, ctx, 69.2, 326.9, 67.2, 328.7, 67.4, 329.2);
        recordBezierCurveTo(vaulter, ctx, 67.5, 329.7, 67.6, 331.1, 69.4, 331.6);
        recordBezierCurveTo(vaulter, ctx, 70.2, 331.9, 72.5, 332.9, 74.6, 333.8);
        recordBezierCurveTo(vaulter, ctx, 76.7, 334.7, 78.6, 335.6, 78.6, 335.6);
        recordBezierCurveTo(vaulter, ctx, 78.6, 335.6, 79.5, 335.2, 79.6, 334.4);
        recordBezierCurveTo(vaulter, ctx, 79.7, 333.5, 76.5, 330.4, 75.5, 329.4);
        recordBezierCurveTo(vaulter, ctx, 74.4, 328.5, 73.1, 328.1, 73.1, 328.1);
        recordBezierCurveTo(vaulter, ctx, 73.1, 328.1, 77.4, 313.5, 77.6, 312.0);
        recordBezierCurveTo(vaulter, ctx, 77.9, 310.5, 80.6, 306.3, 80.4, 304.8);
        recordBezierCurveTo(vaulter, ctx, 80.3, 304.4, 80.6, 303.5, 79.7, 302.7);
        recordBezierCurveTo(vaulter, ctx, 77.4, 300.5, 71.8, 298.2, 64.7, 295.5);
        recordLineTo(vaulter, ctx, 58.1, 294.0);
        recordBezierCurveTo(vaulter, ctx, 58.1, 294.0, 56.1, 296.0, 55.6, 299.5);
        recordBezierCurveTo(vaulter, ctx, 55.0, 303.0, 56.9, 305.6, 56.9, 305.6);
        ctx.closePath();
        ctx.fillStyle = "rgb(17, 92, 137)";
        ctx.fill();
        ctx.lineWidth = 0.5;
        ctx.strokeStyle = "rgb(141, 204, 255)";
        ctx.lineJoin = "miter";
        ctx.miterLimit = 4.0;
        ctx.stroke();

        // vaulter/Path
        ctx.beginPath();
        recordMoveTo(vaulter, ctx, 60.4, 270.4);
        recordLineTo(vaulter, ctx, 67.9, 277.0);
        recordBezierCurveTo(vaulter, ctx, 67.9, 277.0, 68.4, 280.2, 70.5, 282.1);
        recordLineTo(vaulter, ctx, 73.1, 287.5);
        recordLineTo(vaulter, ctx, 76.6, 286.1);
        recordBezierCurveTo(vaulter, ctx, 76.6, 286.1, 73.6, 277.7, 72.3, 275.5);
        recordBezierCurveTo(vaulter, ctx, 71.1, 273.3, 64.8, 266.2, 63.2, 265.4);
        recordBezierCurveTo(vaulter, ctx, 63.2, 265.4, 60.9, 263.6, 58.5, 264.3);
        ctx.fill();
        ctx.stroke();

        // vaulter/Path
        ctx.beginPath();
        recordMoveTo(vaulter, ctx, 62.7, 296.3);
        recordBezierCurveTo(vaulter, ctx, 62.6, 294.2, 62.9, 291.9, 63.6, 290.5);
        recordBezierCurveTo(vaulter, ctx, 64.8, 288.2, 64.8, 273.3, 64.8, 273.3);
        recordBezierCurveTo(vaulter, ctx, 64.9, 270.1, 60.3, 263.6, 60.3, 263.6);
        recordBezierCurveTo(vaulter, ctx, 60.3, 263.6, 62.7, 259.0, 62.7, 257.8);
        recordBezierCurveTo(vaulter, ctx, 62.7, 256.7, 62.2, 252.4, 62.2, 252.4);
        recordBezierCurveTo(vaulter, ctx, 62.2, 252.4, 60.5, 247.4, 55.9, 247.6);
        recordBezierCurveTo(vaulter, ctx, 51.3, 247.9, 50.0, 253.3, 50.1, 255.5);
        recordBezierCurveTo(vaulter, ctx, 50.3, 257.8, 52.6, 263.1, 52.6, 263.1);
        recordBezierCurveTo(vaulter, ctx, 52.6, 263.1, 53.1, 265.5, 50.9, 265.0);
        recordBezierCurveTo(vaulter, ctx, 48.7, 264.5, 46.6, 275.5, 48.1, 279.7);
        recordBezierCurveTo(vaulter, ctx, 49.5, 283.8, 49.3, 294.2, 49.3, 294.2);
        recordBezierCurveTo(vaulter, ctx, 49.3, 294.2, 48.4, 296.1, 48.6, 298.3);
        recordLineTo(vaulter, ctx, 47.1, 300.9);
        recordBezierCurveTo(vaulter, ctx, 42.9, 307.9, 41.7, 319.0, 41.7, 319.0);
        recordBezierCurveTo(vaulter, ctx, 35.2, 322.2, 27.1, 330.1, 27.1, 330.1);
        recordBezierCurveTo(vaulter, ctx, 27.1, 330.1, 26.0, 331.4, 25.4, 331.4);
        recordBezierCurveTo(vaulter, ctx, 24.7, 331.4, 23.0, 331.0, 22.5, 331.4);
        recordBezierCurveTo(vaulter, ctx, 22.0, 331.7, 21.2, 333.0, 21.2, 333.2);
        recordBezierCurveTo(vaulter, ctx, 21.2, 333.4, 22.4, 339.2, 22.9, 340.5);
        recordBezierCurveTo(vaulter, ctx, 23.4, 341.7, 26.0, 342.2, 26.0, 342.2);
        recordLineTo(vaulter, ctx, 30.5, 342.2);
        recordBezierCurveTo(vaulter, ctx, 30.5, 342.2, 30.9, 340.2, 30.1, 339.9);
        recordBezierCurveTo(vaulter, ctx, 29.4, 339.5, 28.5, 339.4, 28.5, 339.4);
        recordBezierCurveTo(vaulter, ctx, 28.5, 339.4, 27.0, 335.7, 27.1, 334.7);
        recordBezierCurveTo(vaulter, ctx, 27.2, 333.7, 29.2, 333.2, 29.2, 333.2);
        recordLineTo(vaulter, ctx, 41.2, 326.5);
        recordBezierCurveTo(vaulter, ctx, 41.2, 326.5, 43.4, 325.7, 45.9, 323.9);
        recordBezierCurveTo(vaulter, ctx, 48.4, 322.0, 60.4, 302.7, 60.4, 302.7);
        ctx.fill();
        ctx.stroke();

        // vaulter/Path
        ctx.beginPath();
        recordMoveTo(vaulter, ctx, 34.4, 304.2);
        recordBezierCurveTo(vaulter, ctx, 34.4, 304.2, 33.9, 304.2, 33.6, 303.5);
        recordBezierCurveTo(vaulter, ctx, 33.3, 302.7, 33.7, 302.3, 33.7, 302.3);
        recordLineTo(vaulter, ctx, 277.7, 207.4);
        recordLineTo(vaulter, ctx, 278.4, 209.3);
        recordLineTo(vaulter, ctx, 34.4, 304.2);
        ctx.closePath();
        ctx.fill();
        ctx.stroke();

        // vaulter/Path
        ctx.beginPath();
        recordMoveTo(vaulter, ctx, 48.5, 282.5);
        recordBezierCurveTo(vaulter, ctx, 48.5, 282.5, 54.4, 283.3, 55.4, 275.8);
        recordBezierCurveTo(vaulter, ctx, 56.3, 268.4, 53.4, 265.8, 51.4, 265.6);
        recordBezierCurveTo(vaulter, ctx, 49.5, 265.4, 46.2, 268.9, 46.2, 274.0);
        recordBezierCurveTo(vaulter, ctx, 46.2, 279.1, 46.4, 280.7, 48.5, 282.5);
        ctx.closePath();
        ctx.fill();
        ctx.stroke();

        // vaulter/Path
        ctx.beginPath();
        recordMoveTo(vaulter, ctx, 50.7, 265.6);
        recordBezierCurveTo(vaulter, ctx, 50.7, 265.6, 46.2, 266.3, 45.0, 269.2);
        recordBezierCurveTo(vaulter, ctx, 45.0, 269.2, 41.8, 272.3, 39.9, 275.2);
        recordBezierCurveTo(vaulter, ctx, 38.0, 278.1, 36.7, 279.7, 36.7, 279.7);
        recordBezierCurveTo(vaulter, ctx, 36.7, 279.7, 35.6, 281.5, 36.5, 283.5);
        recordBezierCurveTo(vaulter, ctx, 37.4, 285.6, 41.4, 293.3, 44.1, 295.9);
        recordLineTo(vaulter, ctx, 44.4, 297.6);
        recordLineTo(vaulter, ctx, 43.5, 299.0);
        recordBezierCurveTo(vaulter, ctx, 43.5, 299.0, 43.4, 301.8, 44.3, 302.0);
        recordBezierCurveTo(vaulter, ctx, 45.2, 302.2, 48.0, 302.2, 48.6, 301.4);
        recordBezierCurveTo(vaulter, ctx, 49.3, 300.5, 50.0, 298.7, 50.0, 298.7);
        recordLineTo(vaulter, ctx, 48.7, 296.4);
        recordBezierCurveTo(vaulter, ctx, 48.7, 296.4, 47.7, 296.4, 47.3, 296.4);
        recordBezierCurveTo(vaulter, ctx, 46.9, 296.4, 41.6, 283.4, 41.6, 283.4);
        recordLineTo(vaulter, ctx, 46.9, 275.2);
        recordBezierCurveTo(vaulter, ctx, 46.9, 275.2, 49.8, 276.5, 50.7, 275.9);
        ctx.fill();
        ctx.stroke();

        // vaulter/Path
        ctx.beginPath();
        recordMoveTo(vaulter, ctx, 73.3, 288.9);
        recordBezierCurveTo(vaulter, ctx, 73.3, 288.9, 74.3, 287.0, 75.0, 286.7);
        recordBezierCurveTo(vaulter, ctx, 75.7, 286.4, 77.2, 286.5, 77.2, 286.5);
        recordLineTo(vaulter, ctx, 77.8, 287.7);
        recordLineTo(vaulter, ctx, 77.2, 289.5);
        recordLineTo(vaulter, ctx, 75.2, 289.9);
        recordBezierCurveTo(vaulter, ctx, 75.2, 289.9, 74.9, 290.4, 74.3, 290.2);
        recordBezierCurveTo(vaulter, ctx, 73.6, 290.1, 73.3, 288.9, 73.3, 288.9);
        ctx.closePath();
        ctx.fill();
        ctx.stroke();
        ctx.restore();
      }
    },

    function (ctx) {
      if (vaulter.visible) {

        // vaulter/Path
        ctx.save();
        ctx.beginPath();
        recordMoveTo(vaulter, ctx, 62.7, 291.3);
        recordBezierCurveTo(vaulter, ctx, 69.7, 294.3, 78.1, 300.5, 79.9, 301.3);
        recordBezierCurveTo(vaulter, ctx, 81.7, 302.1, 82.3, 302.8, 82.8, 304.4);
        recordBezierCurveTo(vaulter, ctx, 83.3, 306.1, 84.0, 312.9, 85.3, 318.3);
        recordBezierCurveTo(vaulter, ctx, 86.7, 323.6, 89.5, 326.8, 89.5, 326.8);
        recordBezierCurveTo(vaulter, ctx, 89.5, 326.8, 91.0, 328.4, 93.5, 328.3);
        recordBezierCurveTo(vaulter, ctx, 96.0, 328.1, 98.0, 327.4, 99.5, 328.6);
        recordBezierCurveTo(vaulter, ctx, 101.0, 329.8, 96.5, 331.9, 94.8, 332.5);
        recordBezierCurveTo(vaulter, ctx, 93.2, 333.1, 91.2, 332.4, 88.5, 333.3);
        recordBezierCurveTo(vaulter, ctx, 85.8, 334.1, 85.3, 333.3, 85.0, 332.3);
        recordBezierCurveTo(vaulter, ctx, 84.7, 331.3, 85.0, 329.6, 85.0, 329.6);
        recordLineTo(vaulter, ctx, 82.3, 323.9);
        recordBezierCurveTo(vaulter, ctx, 78.8, 317.3, 75.7, 307.8, 75.7, 307.8);
        recordLineTo(vaulter, ctx, 59.2, 302.8);
        recordLineTo(vaulter, ctx, 62.7, 291.3);
        ctx.closePath();
        ctx.fillStyle = "rgb(17, 92, 137)";
        ctx.fill();
        ctx.lineWidth = 0.5;
        ctx.strokeStyle = "rgb(141, 204, 255)";
        ctx.lineJoin = "miter";
        ctx.miterLimit = 4.0;
        ctx.stroke();

        // vaulter/Path
        ctx.beginPath();
        recordMoveTo(vaulter, ctx, 62.3, 267.6);
        recordBezierCurveTo(vaulter, ctx, 62.3, 267.6, 64.4, 271.3, 67.2, 272.6);
        recordBezierCurveTo(vaulter, ctx, 67.2, 272.6, 68.4, 276.5, 69.1, 277.4);
        recordBezierCurveTo(vaulter, ctx, 69.7, 278.2, 72.8, 283.6, 72.8, 283.6);
        recordLineTo(vaulter, ctx, 75.7, 282.2);
        recordBezierCurveTo(vaulter, ctx, 75.7, 282.2, 71.3, 273.1, 70.3, 271.2);
        recordBezierCurveTo(vaulter, ctx, 69.3, 269.3, 64.8, 262.5, 63.8, 261.6);
        recordBezierCurveTo(vaulter, ctx, 62.8, 260.7, 62.0, 260.0, 61.0, 260.3);
        ctx.fill();
        ctx.stroke();

        // vaulter/Path
        ctx.beginPath();
        recordMoveTo(vaulter, ctx, 62.7, 292.6);
        recordBezierCurveTo(vaulter, ctx, 62.6, 290.5, 62.8, 288.0, 63.6, 286.5);
        recordBezierCurveTo(vaulter, ctx, 64.8, 284.2, 64.8, 269.3, 64.8, 269.3);
        recordBezierCurveTo(vaulter, ctx, 64.9, 266.1, 60.3, 259.6, 60.3, 259.6);
        recordBezierCurveTo(vaulter, ctx, 60.3, 259.6, 62.7, 255.0, 62.7, 253.8);
        recordBezierCurveTo(vaulter, ctx, 62.7, 252.7, 62.2, 248.4, 62.2, 248.4);
        recordBezierCurveTo(vaulter, ctx, 62.2, 248.4, 60.5, 243.4, 55.9, 243.6);
        recordBezierCurveTo(vaulter, ctx, 51.3, 243.9, 50.0, 249.3, 50.1, 251.5);
        recordBezierCurveTo(vaulter, ctx, 50.3, 253.8, 52.6, 259.1, 52.6, 259.1);
        recordBezierCurveTo(vaulter, ctx, 52.6, 259.1, 53.1, 261.5, 50.9, 261.0);
        recordBezierCurveTo(vaulter, ctx, 48.7, 260.5, 46.6, 271.5, 48.1, 275.7);
        recordBezierCurveTo(vaulter, ctx, 49.5, 279.8, 49.3, 290.2, 49.3, 290.2);
        recordBezierCurveTo(vaulter, ctx, 49.3, 290.2, 48.5, 292.0, 48.6, 294.1);
        recordBezierCurveTo(vaulter, ctx, 44.9, 305.6, 42.8, 316.9, 42.8, 316.9);
        recordBezierCurveTo(vaulter, ctx, 41.8, 316.5, 36.8, 317.0, 32.6, 317.8);
        recordBezierCurveTo(vaulter, ctx, 27.9, 318.7, 23.3, 318.5, 23.3, 318.5);
        recordBezierCurveTo(vaulter, ctx, 23.3, 318.5, 22.4, 317.8, 21.2, 317.7);
        recordBezierCurveTo(vaulter, ctx, 19.9, 317.6, 19.3, 318.2, 18.0, 321.3);
        recordBezierCurveTo(vaulter, ctx, 16.9, 323.9, 14.8, 326.1, 14.8, 326.1);
        recordBezierCurveTo(vaulter, ctx, 14.8, 326.1, 13.5, 329.6, 14.8, 329.9);
        recordBezierCurveTo(vaulter, ctx, 16.2, 330.3, 16.8, 328.1, 19.3, 325.9);
        recordBezierCurveTo(vaulter, ctx, 21.8, 323.8, 26.5, 322.9, 26.5, 322.9);
        recordBezierCurveTo(vaulter, ctx, 26.5, 322.9, 42.3, 323.1, 46.0, 321.8);
        recordBezierCurveTo(vaulter, ctx, 49.7, 320.4, 60.7, 300.3, 60.7, 300.3);
        ctx.fill();
        ctx.stroke();

        // vaulter/Path
        ctx.beginPath();
        recordMoveTo(vaulter, ctx, 48.5, 278.5);
        recordBezierCurveTo(vaulter, ctx, 48.5, 278.5, 54.4, 279.3, 55.4, 271.8);
        recordBezierCurveTo(vaulter, ctx, 56.3, 264.4, 53.4, 261.8, 51.4, 261.6);
        recordBezierCurveTo(vaulter, ctx, 49.5, 261.4, 46.2, 264.9, 46.2, 270.0);
        recordBezierCurveTo(vaulter, ctx, 46.2, 275.1, 46.4, 276.7, 48.5, 278.5);
        ctx.closePath();
        ctx.fill();
        ctx.stroke();

        // vaulter/Path
        ctx.beginPath();
        recordMoveTo(vaulter, ctx, 33.8, 300.6);
        recordBezierCurveTo(vaulter, ctx, 33.8, 300.6, 33.1, 300.8, 32.7, 300.0);
        recordBezierCurveTo(vaulter, ctx, 32.4, 299.1, 33.1, 298.7, 33.1, 298.7);
        recordBezierCurveTo(vaulter, ctx, 33.8, 298.4, 104.0, 269.9, 126.5, 262.1);
        recordLineTo(vaulter, ctx, 278.4, 209.5);
        recordLineTo(vaulter, ctx, 279.1, 211.4);
        recordLineTo(vaulter, ctx, 127.1, 264.0);
        recordBezierCurveTo(vaulter, ctx, 104.7, 271.7, 34.6, 300.3, 33.8, 300.6);
        ctx.closePath();
        ctx.fill();
        ctx.stroke();

        // vaulter/Path
        ctx.beginPath();
        recordMoveTo(vaulter, ctx, 72.9, 284.9);
        recordBezierCurveTo(vaulter, ctx, 72.9, 284.9, 74.0, 283.0, 74.7, 282.7);
        recordBezierCurveTo(vaulter, ctx, 75.4, 282.4, 76.9, 282.5, 76.9, 282.5);
        recordLineTo(vaulter, ctx, 77.5, 283.7);
        recordLineTo(vaulter, ctx, 76.9, 285.4);
        recordLineTo(vaulter, ctx, 74.9, 285.8);
        recordBezierCurveTo(vaulter, ctx, 74.9, 285.8, 74.6, 286.4, 73.9, 286.2);
        recordBezierCurveTo(vaulter, ctx, 73.3, 286.0, 72.9, 284.9, 72.9, 284.9);
        ctx.closePath();
        ctx.fill();
        ctx.stroke();

        // vaulter/Path
        ctx.beginPath();
        recordMoveTo(vaulter, ctx, 50.7, 261.6);
        recordBezierCurveTo(vaulter, ctx, 50.7, 261.6, 46.1, 263.8, 45.5, 266.4);
        recordLineTo(vaulter, ctx, 38.7, 272.4);
        recordBezierCurveTo(vaulter, ctx, 38.7, 272.4, 35.8, 274.1, 36.0, 275.8);
        recordBezierCurveTo(vaulter, ctx, 36.2, 277.5, 37.8, 283.5, 39.8, 286.3);
        recordBezierCurveTo(vaulter, ctx, 41.1, 288.1, 42.7, 290.3, 43.6, 291.6);
        recordBezierCurveTo(vaulter, ctx, 43.6, 291.6, 43.9, 292.3, 43.3, 292.9);
        recordBezierCurveTo(vaulter, ctx, 43.3, 292.9, 43.1, 294.0, 43.3, 294.5);
        recordBezierCurveTo(vaulter, ctx, 43.6, 295.0, 44.5, 297.0, 44.5, 297.0);
        recordBezierCurveTo(vaulter, ctx, 44.5, 297.0, 46.7, 297.1, 48.3, 296.1);
        recordBezierCurveTo(vaulter, ctx, 49.9, 295.1, 49.6, 294.3, 49.6, 294.3);
        recordBezierCurveTo(vaulter, ctx, 49.6, 294.3, 49.1, 291.2, 48.2, 291.3);
        recordBezierCurveTo(vaulter, ctx, 47.3, 291.4, 46.2, 290.4, 46.2, 290.4);
        recordBezierCurveTo(vaulter, ctx, 45.5, 289.1, 44.4, 287.3, 44.1, 286.3);
        recordBezierCurveTo(vaulter, ctx, 43.6, 284.6, 42.5, 277.3, 42.5, 277.3);
        recordBezierCurveTo(vaulter, ctx, 42.5, 277.3, 45.5, 273.6, 48.5, 272.6);
        recordBezierCurveTo(vaulter, ctx, 51.5, 271.6, 54.0, 270.1, 54.0, 270.1);
        ctx.fill();
        ctx.stroke();
        ctx.restore();
      }
    },

    function (ctx) {
      if (vaulter.visible) {

        // vaulter/Path
        ctx.save();
        ctx.beginPath();
        recordMoveTo(vaulter, ctx, 62.0, 275.3);
        recordBezierCurveTo(vaulter, ctx, 62.0, 275.3, 64.6, 279.4, 67.7, 281.1);
        recordBezierCurveTo(vaulter, ctx, 67.7, 281.1, 70.1, 282.2, 71.8, 282.2);
        recordBezierCurveTo(vaulter, ctx, 73.4, 282.2, 72.9, 281.3, 72.9, 281.3);
        recordBezierCurveTo(vaulter, ctx, 72.7, 279.7, 69.0, 275.8, 66.6, 272.7);
        recordBezierCurveTo(vaulter, ctx, 64.2, 269.6, 60.6, 268.1, 60.6, 268.1);
        ctx.fillStyle = "rgb(17, 92, 137)";
        ctx.fill();
        ctx.lineWidth = 0.5;
        ctx.strokeStyle = "rgb(141, 204, 255)";
        ctx.lineJoin = "miter";
        ctx.miterLimit = 4.0;
        ctx.stroke();

        // vaulter/Path
        ctx.beginPath();
        recordMoveTo(vaulter, ctx, 62.7, 299.3);
        recordBezierCurveTo(vaulter, ctx, 62.7, 297.5, 63.0, 295.7, 63.6, 294.5);
        recordBezierCurveTo(vaulter, ctx, 64.8, 292.1, 64.8, 277.2, 64.8, 277.2);
        recordBezierCurveTo(vaulter, ctx, 64.9, 274.1, 60.3, 267.5, 60.3, 267.5);
        recordBezierCurveTo(vaulter, ctx, 60.3, 267.5, 62.7, 263.0, 62.7, 261.8);
        recordBezierCurveTo(vaulter, ctx, 62.7, 260.6, 62.2, 256.3, 62.2, 256.3);
        recordBezierCurveTo(vaulter, ctx, 62.2, 256.3, 60.5, 251.3, 55.9, 251.6);
        recordBezierCurveTo(vaulter, ctx, 51.3, 251.9, 50.0, 257.3, 50.1, 259.5);
        recordBezierCurveTo(vaulter, ctx, 50.3, 261.7, 52.6, 267.0, 52.6, 267.0);
        recordBezierCurveTo(vaulter, ctx, 52.6, 267.0, 53.1, 269.5, 50.9, 269.0);
        recordBezierCurveTo(vaulter, ctx, 48.7, 268.5, 46.6, 279.4, 48.1, 283.6);
        recordBezierCurveTo(vaulter, ctx, 49.5, 287.8, 49.3, 298.2, 49.3, 298.2);
        recordBezierCurveTo(vaulter, ctx, 49.3, 298.2, 49.2, 309.9, 50.0, 316.9);
        recordBezierCurveTo(vaulter, ctx, 50.0, 316.9, 46.7, 319.1, 44.2, 322.8);
        recordBezierCurveTo(vaulter, ctx, 41.7, 326.4, 32.5, 331.6, 32.5, 331.6);
        recordBezierCurveTo(vaulter, ctx, 32.5, 331.6, 31.2, 332.6, 30.5, 333.6);
        recordBezierCurveTo(vaulter, ctx, 29.8, 334.6, 31.3, 336.3, 31.3, 336.3);
        recordBezierCurveTo(vaulter, ctx, 31.3, 336.3, 33.9, 339.5, 34.7, 340.1);
        recordBezierCurveTo(vaulter, ctx, 35.2, 340.5, 35.6, 341.6, 36.0, 341.9);
        recordBezierCurveTo(vaulter, ctx, 36.3, 342.2, 38.0, 342.6, 38.5, 341.6);
        recordBezierCurveTo(vaulter, ctx, 39.0, 340.6, 37.1, 340.5, 37.0, 339.3);
        recordBezierCurveTo(vaulter, ctx, 36.8, 337.4, 35.3, 334.3, 35.3, 334.3);
        recordBezierCurveTo(vaulter, ctx, 35.3, 334.3, 45.5, 329.6, 49.3, 326.0);
        recordBezierCurveTo(vaulter, ctx, 49.3, 326.0, 55.3, 321.1, 56.8, 317.8);
        recordBezierCurveTo(vaulter, ctx, 58.3, 314.5, 60.5, 302.2, 60.7, 301.2);
        ctx.fill();
        ctx.stroke();

        // vaulter/Path
        ctx.beginPath();
        recordMoveTo(vaulter, ctx, 72.9, 281.3);
        recordBezierCurveTo(vaulter, ctx, 73.0, 282.9, 67.6, 288.7, 64.6, 291.7);
        recordLineTo(vaulter, ctx, 59.4, 292.7);
        recordBezierCurveTo(vaulter, ctx, 59.4, 292.7, 66.1, 285.2, 66.0, 284.7);
        recordBezierCurveTo(vaulter, ctx, 65.9, 284.2, 67.7, 281.1, 67.7, 281.1);
        recordBezierCurveTo(vaulter, ctx, 67.7, 281.1, 67.9, 280.8, 68.1, 280.5);
        ctx.fill();
        ctx.stroke();

        // vaulter/Path
        ctx.beginPath();
        recordMoveTo(vaulter, ctx, 20.7, 306.0);
        recordBezierCurveTo(vaulter, ctx, 20.7, 306.0, 19.8, 306.3, 19.5, 305.4);
        recordBezierCurveTo(vaulter, ctx, 19.2, 304.5, 20.1, 304.1, 20.1, 304.1);
        recordBezierCurveTo(vaulter, ctx, 20.6, 303.9, 71.4, 287.0, 125.3, 272.6);
        recordLineTo(vaulter, ctx, 273.0, 233.1);
        recordLineTo(vaulter, ctx, 273.5, 235.1);
        recordLineTo(vaulter, ctx, 125.8, 274.5);
        recordBezierCurveTo(vaulter, ctx, 72.0, 288.9, 21.2, 305.8, 20.7, 306.0);
        ctx.closePath();
        ctx.fill();
        ctx.stroke();

        // vaulter/Path
        ctx.beginPath();
        recordMoveTo(vaulter, ctx, 60.3, 297.4);
        recordBezierCurveTo(vaulter, ctx, 71.2, 299.2, 78.5, 304.9, 78.5, 304.9);
        recordBezierCurveTo(vaulter, ctx, 78.5, 304.9, 80.5, 306.5, 80.5, 308.2);
        recordBezierCurveTo(vaulter, ctx, 80.4, 310.8, 79.7, 311.2, 75.2, 314.7);
        recordBezierCurveTo(vaulter, ctx, 70.7, 318.2, 62.1, 324.2, 62.1, 324.2);
        recordBezierCurveTo(vaulter, ctx, 62.3, 324.5, 63.4, 326.4, 63.9, 327.3);
        recordBezierCurveTo(vaulter, ctx, 64.9, 329.2, 66.2, 330.6, 65.9, 331.5);
        recordBezierCurveTo(vaulter, ctx, 65.7, 332.0, 64.8, 331.6, 64.5, 331.5);
        recordBezierCurveTo(vaulter, ctx, 64.0, 331.4, 62.0, 329.6, 60.8, 328.4);
        recordBezierCurveTo(vaulter, ctx, 59.7, 327.2, 56.7, 324.0, 56.8, 323.2);
        recordBezierCurveTo(vaulter, ctx, 56.9, 322.9, 57.2, 322.3, 57.6, 321.9);
        recordBezierCurveTo(vaulter, ctx, 58.6, 321.2, 59.9, 320.9, 59.9, 320.9);
        recordBezierCurveTo(vaulter, ctx, 59.9, 320.9, 63.3, 317.9, 65.2, 315.9);
        recordBezierCurveTo(vaulter, ctx, 67.0, 313.9, 70.3, 309.5, 70.3, 309.5);
        recordBezierCurveTo(vaulter, ctx, 70.3, 309.5, 65.5, 309.6, 57.0, 309.0);
        recordBezierCurveTo(vaulter, ctx, 48.5, 308.3, 48.7, 300.1, 48.7, 300.1);
        recordBezierCurveTo(vaulter, ctx, 48.7, 299.1, 48.9, 298.3, 49.3, 297.6);
        ctx.fill();
        ctx.stroke();

        // vaulter/Path
        ctx.beginPath();
        recordMoveTo(vaulter, ctx, 48.5, 286.4);
        recordBezierCurveTo(vaulter, ctx, 48.5, 286.4, 54.4, 287.2, 55.4, 279.8);
        recordBezierCurveTo(vaulter, ctx, 56.3, 272.3, 53.4, 269.8, 51.4, 269.6);
        recordBezierCurveTo(vaulter, ctx, 49.5, 269.4, 46.2, 272.9, 46.2, 278.0);
        recordBezierCurveTo(vaulter, ctx, 46.2, 283.1, 46.4, 284.7, 48.5, 286.4);
        ctx.closePath();
        ctx.fill();
        ctx.stroke();

        // vaulter/Path
        ctx.beginPath();
        recordMoveTo(vaulter, ctx, 51.0, 269.5);
        recordBezierCurveTo(vaulter, ctx, 51.0, 269.5, 46.6, 269.8, 44.6, 272.1);
        recordBezierCurveTo(vaulter, ctx, 44.6, 272.1, 34.1, 278.9, 33.2, 279.9);
        recordBezierCurveTo(vaulter, ctx, 32.4, 280.9, 31.7, 282.8, 31.9, 283.8);
        recordBezierCurveTo(vaulter, ctx, 32.0, 284.8, 32.1, 291.4, 32.0, 294.7);
        recordBezierCurveTo(vaulter, ctx, 31.9, 297.9, 31.5, 298.4, 31.0, 298.8);
        recordBezierCurveTo(vaulter, ctx, 30.5, 299.2, 30.1, 300.9, 30.1, 301.6);
        recordBezierCurveTo(vaulter, ctx, 30.1, 302.2, 31.7, 303.8, 32.4, 303.7);
        recordBezierCurveTo(vaulter, ctx, 33.0, 303.6, 36.0, 303.6, 36.4, 302.3);
        recordBezierCurveTo(vaulter, ctx, 36.7, 301.1, 36.6, 298.3, 35.9, 298.3);
        recordBezierCurveTo(vaulter, ctx, 35.1, 298.3, 34.5, 298.3, 34.5, 298.3);
        recordBezierCurveTo(vaulter, ctx, 34.7, 293.4, 36.3, 289.5, 37.0, 283.9);
        recordLineTo(vaulter, ctx, 44.1, 278.9);
        recordBezierCurveTo(vaulter, ctx, 44.1, 278.9, 47.9, 279.6, 50.4, 278.2);
        ctx.fill();
        ctx.stroke();

        // vaulter/Path
        ctx.beginPath();
        recordMoveTo(vaulter, ctx, 60.2, 293.8);
        recordBezierCurveTo(vaulter, ctx, 60.2, 293.8, 61.5, 295.3, 62.0, 295.3);
        recordBezierCurveTo(vaulter, ctx, 62.1, 295.3, 62.4, 295.0, 62.8, 295.0);
        recordBezierCurveTo(vaulter, ctx, 63.7, 295.1, 64.9, 294.4, 64.9, 294.4);
        recordBezierCurveTo(vaulter, ctx, 64.9, 294.4, 65.7, 292.0, 64.7, 291.6);
        recordBezierCurveTo(vaulter, ctx, 63.7, 291.3, 62.1, 291.6, 62.1, 291.6);
        recordLineTo(vaulter, ctx, 60.2, 293.8);
        ctx.closePath();
        ctx.fill();
        ctx.stroke();
        ctx.restore();
      }
    },

    function (ctx) {
      if (vaulter.visible) {

        // vaulter/Path
        ctx.save();
        ctx.beginPath();
        recordMoveTo(vaulter, ctx, 60.1, 257.1);
        recordBezierCurveTo(vaulter, ctx, 60.1, 257.1, 63.5, 257.8, 63.8, 260.9);
        recordLineTo(vaulter, ctx, 64.6, 262.8);
        recordBezierCurveTo(vaulter, ctx, 64.6, 262.8, 68.3, 266.9, 70.1, 269.6);
        recordLineTo(vaulter, ctx, 78.0, 279.8);
        recordLineTo(vaulter, ctx, 78.5, 282.0);
        recordLineTo(vaulter, ctx, 75.1, 283.2);
        recordLineTo(vaulter, ctx, 74.1, 281.3);
        recordBezierCurveTo(vaulter, ctx, 74.1, 281.3, 69.7, 276.9, 67.9, 274.6);
        recordBezierCurveTo(vaulter, ctx, 67.9, 274.6, 63.7, 271.7, 61.9, 266.0);
        recordLineTo(vaulter, ctx, 60.1, 265.6);
        ctx.fillStyle = "rgb(17, 92, 137)";
        ctx.fill();
        ctx.lineWidth = 0.5;
        ctx.strokeStyle = "rgb(141, 204, 255)";
        ctx.lineJoin = "miter";
        ctx.miterLimit = 4.0;
        ctx.stroke();

        // vaulter/Path
        ctx.beginPath();
        recordMoveTo(vaulter, ctx, 55.9, 300.2);
        recordBezierCurveTo(vaulter, ctx, 55.9, 300.2, 63.1, 303.3, 72.4, 306.6);
        recordBezierCurveTo(vaulter, ctx, 72.4, 306.6, 73.5, 314.2, 75.5, 316.2);
        recordBezierCurveTo(vaulter, ctx, 77.4, 318.1, 81.2, 327.3, 81.2, 327.3);
        recordBezierCurveTo(vaulter, ctx, 81.2, 327.3, 81.0, 330.5, 81.2, 331.3);
        recordBezierCurveTo(vaulter, ctx, 81.5, 332.0, 83.7, 333.8, 86.0, 332.6);
        recordBezierCurveTo(vaulter, ctx, 88.2, 331.4, 94.6, 330.3, 94.6, 330.3);
        recordBezierCurveTo(vaulter, ctx, 94.6, 330.3, 99.0, 328.0, 97.3, 326.5);
        recordBezierCurveTo(vaulter, ctx, 95.5, 325.1, 94.8, 326.3, 92.7, 326.7);
        recordBezierCurveTo(vaulter, ctx, 90.6, 327.1, 85.3, 325.6, 85.3, 325.6);
        recordBezierCurveTo(vaulter, ctx, 82.8, 320.2, 81.4, 312.6, 79.4, 306.8);
        recordBezierCurveTo(vaulter, ctx, 77.4, 301.1, 72.4, 298.3, 72.4, 298.3);
        recordLineTo(vaulter, ctx, 60.1, 288.3);
        ctx.fill();
        ctx.stroke();

        // vaulter/Path
        ctx.beginPath();
        recordMoveTo(vaulter, ctx, 63.0, 292.0);
        recordBezierCurveTo(vaulter, ctx, 62.9, 289.7, 63.2, 286.9, 64.0, 285.3);
        recordBezierCurveTo(vaulter, ctx, 65.2, 282.8, 65.2, 267.2, 65.2, 267.2);
        recordBezierCurveTo(vaulter, ctx, 65.4, 263.9, 60.6, 257.0, 60.6, 257.0);
        recordBezierCurveTo(vaulter, ctx, 60.6, 257.0, 63.0, 252.2, 63.0, 251.0);
        recordBezierCurveTo(vaulter, ctx, 63.0, 249.7, 62.5, 245.2, 62.5, 245.2);
        recordBezierCurveTo(vaulter, ctx, 62.5, 245.2, 60.7, 240.0, 55.9, 240.3);
        recordBezierCurveTo(vaulter, ctx, 51.1, 240.6, 49.7, 246.2, 49.8, 248.6);
        recordBezierCurveTo(vaulter, ctx, 50.0, 250.9, 52.5, 256.5, 52.5, 256.5);
        recordBezierCurveTo(vaulter, ctx, 52.5, 256.5, 53.0, 259.1, 50.7, 258.5);
        recordBezierCurveTo(vaulter, ctx, 48.3, 258.0, 46.2, 269.5, 47.7, 273.9);
        recordBezierCurveTo(vaulter, ctx, 49.2, 278.3, 48.9, 289.2, 48.9, 289.2);
        recordBezierCurveTo(vaulter, ctx, 48.9, 289.2, 47.6, 292.9, 48.0, 295.4);
        recordBezierCurveTo(vaulter, ctx, 48.4, 297.9, 47.2, 308.9, 48.0, 314.5);
        recordBezierCurveTo(vaulter, ctx, 38.7, 313.1, 37.3, 314.5, 30.4, 314.5);
        recordBezierCurveTo(vaulter, ctx, 30.4, 314.5, 29.7, 313.9, 29.3, 313.1);
        recordBezierCurveTo(vaulter, ctx, 28.9, 312.4, 28.9, 310.9, 27.7, 309.9);
        recordBezierCurveTo(vaulter, ctx, 26.5, 308.8, 24.5, 310.4, 23.6, 311.2);
        recordBezierCurveTo(vaulter, ctx, 22.7, 312.0, 19.8, 317.1, 17.5, 318.4);
        recordBezierCurveTo(vaulter, ctx, 15.1, 319.7, 14.7, 321.3, 14.7, 321.8);
        recordBezierCurveTo(vaulter, ctx, 14.7, 322.3, 17.2, 323.0, 18.6, 321.8);
        recordBezierCurveTo(vaulter, ctx, 20.1, 320.6, 23.2, 318.4, 25.7, 318.3);
        recordBezierCurveTo(vaulter, ctx, 28.2, 318.1, 38.8, 319.1, 42.0, 319.8);
        recordBezierCurveTo(vaulter, ctx, 45.1, 320.6, 50.9, 321.2, 52.0, 320.1);
        recordBezierCurveTo(vaulter, ctx, 53.0, 319.1, 57.9, 308.3, 60.1, 296.9);
        ctx.fill();
        ctx.stroke();

        // vaulter/Path
        ctx.beginPath();
        recordMoveTo(vaulter, ctx, 33.2, 292.8);
        recordBezierCurveTo(vaulter, ctx, 33.2, 292.8, 32.3, 293.1, 32.0, 292.1);
        recordBezierCurveTo(vaulter, ctx, 31.8, 291.1, 32.7, 290.9, 32.7, 290.9);
        recordBezierCurveTo(vaulter, ctx, 33.2, 290.8, 90.5, 277.2, 140.3, 270.3);
        recordLineTo(vaulter, ctx, 290.3, 249.0);
        recordLineTo(vaulter, ctx, 290.6, 251.0);
        recordLineTo(vaulter, ctx, 140.6, 272.2);
        recordBezierCurveTo(vaulter, ctx, 90.9, 279.2, 33.7, 292.7, 33.2, 292.8);
        ctx.closePath();
        ctx.fill();
        ctx.stroke();

        // vaulter/Path
        ctx.beginPath();
        recordMoveTo(vaulter, ctx, 48.1, 276.8);
        recordBezierCurveTo(vaulter, ctx, 48.1, 276.8, 54.3, 277.7, 55.3, 269.9);
        recordBezierCurveTo(vaulter, ctx, 56.4, 262.0, 53.3, 259.4, 51.2, 259.2);
        recordBezierCurveTo(vaulter, ctx, 49.2, 258.9, 45.7, 262.6, 45.7, 268.0);
        recordBezierCurveTo(vaulter, ctx, 45.7, 273.3, 45.9, 275.0, 48.1, 276.8);
        ctx.closePath();
        ctx.fill();
        ctx.stroke();

        // vaulter/Path
        ctx.beginPath();
        recordMoveTo(vaulter, ctx, 74.7, 283.4);
        recordBezierCurveTo(vaulter, ctx, 74.7, 283.4, 76.0, 285.0, 76.6, 285.0);
        recordBezierCurveTo(vaulter, ctx, 76.7, 285.0, 77.0, 284.6, 77.4, 284.7);
        recordBezierCurveTo(vaulter, ctx, 78.4, 284.7, 79.7, 284.0, 79.7, 284.0);
        recordBezierCurveTo(vaulter, ctx, 79.7, 284.0, 80.5, 281.5, 79.4, 281.1);
        recordBezierCurveTo(vaulter, ctx, 78.4, 280.7, 76.7, 281.1, 76.7, 281.1);
        recordLineTo(vaulter, ctx, 74.7, 283.4);
        ctx.closePath();
        ctx.fill();
        ctx.stroke();

        // vaulter/Path
        ctx.beginPath();
        recordMoveTo(vaulter, ctx, 50.8, 259.1);
        recordBezierCurveTo(vaulter, ctx, 50.8, 259.1, 47.8, 259.1, 46.4, 260.4);
        recordBezierCurveTo(vaulter, ctx, 45.0, 261.7, 43.5, 264.4, 43.5, 264.4);
        recordBezierCurveTo(vaulter, ctx, 43.5, 264.4, 37.2, 268.7, 35.6, 272.8);
        recordBezierCurveTo(vaulter, ctx, 35.6, 272.8, 35.2, 274.6, 36.3, 275.8);
        recordBezierCurveTo(vaulter, ctx, 37.4, 277.0, 39.2, 280.8, 42.8, 283.2);
        recordBezierCurveTo(vaulter, ctx, 45.4, 285.0, 45.4, 287.2, 45.4, 287.2);
        recordBezierCurveTo(vaulter, ctx, 45.4, 287.2, 45.2, 287.6, 44.7, 287.9);
        recordBezierCurveTo(vaulter, ctx, 44.2, 288.2, 44.0, 289.8, 44.2, 290.2);
        recordBezierCurveTo(vaulter, ctx, 44.5, 290.7, 45.7, 291.7, 46.2, 291.8);
        recordBezierCurveTo(vaulter, ctx, 46.8, 291.9, 50.8, 290.7, 50.8, 290.7);
        recordBezierCurveTo(vaulter, ctx, 50.8, 290.7, 51.4, 289.2, 50.8, 287.6);
        recordBezierCurveTo(vaulter, ctx, 50.1, 286.0, 49.7, 286.0, 48.8, 285.5);
        recordBezierCurveTo(vaulter, ctx, 47.8, 285.0, 43.8, 277.6, 43.8, 277.6);
        recordBezierCurveTo(vaulter, ctx, 43.8, 277.6, 42.4, 273.1, 42.1, 272.3);
        recordBezierCurveTo(vaulter, ctx, 41.7, 271.4, 47.7, 268.8, 47.7, 268.8);
        recordBezierCurveTo(vaulter, ctx, 47.7, 268.8, 49.7, 268.9, 51.0, 268.1);
        ctx.fill();
        ctx.stroke();
        ctx.restore();
      }
    },

    function (ctx) {
      if (vaulter.visible) {

        // vaulter/Path
        ctx.save();
        ctx.beginPath();
        recordMoveTo(vaulter, ctx, 53.8, 299.8);
        recordLineTo(vaulter, ctx, 68.7, 309.1);
        recordBezierCurveTo(vaulter, ctx, 68.7, 309.1, 67.1, 314.4, 67.4, 315.8);
        recordBezierCurveTo(vaulter, ctx, 67.6, 317.1, 70.1, 325.4, 70.9, 331.2);
        recordBezierCurveTo(vaulter, ctx, 71.8, 337.0, 68.7, 337.3, 70.9, 338.1);
        recordBezierCurveTo(vaulter, ctx, 72.4, 338.6, 74.1, 338.9, 76.4, 339.9);
        recordBezierCurveTo(vaulter, ctx, 77.5, 340.4, 79.2, 342.2, 80.3, 342.2);
        recordBezierCurveTo(vaulter, ctx, 80.3, 342.2, 83.6, 342.2, 83.1, 340.8);
        recordBezierCurveTo(vaulter, ctx, 82.9, 340.5, 82.1, 340.0, 81.6, 339.3);
        recordBezierCurveTo(vaulter, ctx, 80.2, 337.4, 77.8, 335.1, 76.5, 334.5);
        recordBezierCurveTo(vaulter, ctx, 74.4, 333.6, 74.8, 331.2, 74.8, 331.2);
        recordLineTo(vaulter, ctx, 75.3, 308.6);
        recordBezierCurveTo(vaulter, ctx, 75.3, 308.6, 74.5, 304.5, 72.6, 302.3);
        recordBezierCurveTo(vaulter, ctx, 70.7, 300.1, 59.9, 288.6, 59.9, 288.6);
        ctx.fillStyle = "rgb(17, 92, 137)";
        ctx.fill();
        ctx.lineWidth = 0.5;
        ctx.strokeStyle = "rgb(141, 204, 255)";
        ctx.lineJoin = "miter";
        ctx.miterLimit = 4.0;
        ctx.stroke();

        // vaulter/Path
        ctx.beginPath();
        recordMoveTo(vaulter, ctx, 61.4, 258.7);
        recordBezierCurveTo(vaulter, ctx, 61.4, 258.7, 64.0, 259.2, 64.7, 262.9);
        recordBezierCurveTo(vaulter, ctx, 66.5, 266.3, 67.9, 271.1, 67.9, 271.1);
        recordBezierCurveTo(vaulter, ctx, 67.9, 271.1, 70.0, 275.2, 71.0, 275.5);
        recordBezierCurveTo(vaulter, ctx, 72.1, 275.9, 81.3, 281.9, 81.3, 281.9);
        recordLineTo(vaulter, ctx, 78.0, 283.0);
        recordBezierCurveTo(vaulter, ctx, 78.0, 283.0, 73.2, 280.3, 71.9, 280.3);
        recordBezierCurveTo(vaulter, ctx, 70.6, 280.3, 68.6, 278.9, 66.9, 278.1);
        recordBezierCurveTo(vaulter, ctx, 65.2, 277.3, 61.4, 269.8, 61.4, 269.8);
        ctx.fill();
        ctx.stroke();

        // vaulter/Path
        ctx.beginPath();
        recordMoveTo(vaulter, ctx, 63.1, 292.2);
        recordBezierCurveTo(vaulter, ctx, 62.9, 289.9, 63.1, 287.0, 64.0, 285.3);
        recordBezierCurveTo(vaulter, ctx, 65.2, 282.8, 65.2, 267.2, 65.2, 267.2);
        recordBezierCurveTo(vaulter, ctx, 65.4, 263.9, 60.6, 257.0, 60.6, 257.0);
        recordBezierCurveTo(vaulter, ctx, 60.6, 257.0, 63.0, 252.2, 63.0, 251.0);
        recordBezierCurveTo(vaulter, ctx, 63.0, 249.7, 62.5, 245.2, 62.5, 245.2);
        recordBezierCurveTo(vaulter, ctx, 62.5, 245.2, 60.7, 240.0, 55.9, 240.3);
        recordBezierCurveTo(vaulter, ctx, 51.1, 240.6, 49.7, 246.2, 49.8, 248.6);
        recordBezierCurveTo(vaulter, ctx, 50.0, 250.9, 52.5, 256.5, 52.5, 256.5);
        recordBezierCurveTo(vaulter, ctx, 52.5, 256.5, 53.0, 259.1, 50.7, 258.5);
        recordBezierCurveTo(vaulter, ctx, 48.3, 258.0, 46.2, 269.5, 47.7, 273.9);
        recordBezierCurveTo(vaulter, ctx, 49.2, 278.3, 48.9, 289.2, 48.9, 289.2);
        recordBezierCurveTo(vaulter, ctx, 48.9, 289.2, 48.3, 291.1, 48.1, 292.9);
        recordBezierCurveTo(vaulter, ctx, 48.0, 294.7, 48.2, 295.5, 48.3, 296.4);
        recordBezierCurveTo(vaulter, ctx, 48.8, 299.3, 53.4, 310.9, 54.6, 312.9);
        recordBezierCurveTo(vaulter, ctx, 51.0, 310.5, 46.0, 309.9, 42.6, 308.8);
        recordBezierCurveTo(vaulter, ctx, 39.3, 307.7, 39.7, 306.3, 39.7, 306.3);
        recordBezierCurveTo(vaulter, ctx, 39.7, 306.3, 39.4, 305.0, 38.7, 304.5);
        recordBezierCurveTo(vaulter, ctx, 37.9, 304.0, 36.0, 303.7, 35.4, 304.5);
        recordBezierCurveTo(vaulter, ctx, 34.8, 305.3, 32.2, 307.4, 31.4, 308.0);
        recordBezierCurveTo(vaulter, ctx, 30.7, 308.7, 26.5, 310.3, 26.2, 310.6);
        recordBezierCurveTo(vaulter, ctx, 25.9, 311.0, 25.8, 312.0, 27.0, 312.1);
        recordBezierCurveTo(vaulter, ctx, 28.2, 312.3, 33.9, 312.3, 35.9, 311.6);
        recordBezierCurveTo(vaulter, ctx, 37.9, 310.8, 41.9, 312.9, 41.9, 312.9);
        recordBezierCurveTo(vaulter, ctx, 41.9, 312.9, 48.5, 317.4, 54.6, 319.7);
        recordBezierCurveTo(vaulter, ctx, 60.7, 322.0, 61.7, 320.9, 62.3, 320.5);
        recordBezierCurveTo(vaulter, ctx, 62.9, 320.0, 64.4, 316.3, 64.0, 313.4);
        recordBezierCurveTo(vaulter, ctx, 63.5, 310.5, 61.2, 298.5, 61.2, 298.5);
        ctx.fill();
        ctx.stroke();

        // vaulter/Path
        ctx.beginPath();
        recordMoveTo(vaulter, ctx, 33.3, 292.1);
        recordBezierCurveTo(vaulter, ctx, 33.3, 292.1, 32.0, 292.4, 31.8, 291.4);
        recordBezierCurveTo(vaulter, ctx, 31.7, 290.3, 32.9, 290.1, 32.9, 290.1);
        recordBezierCurveTo(vaulter, ctx, 33.5, 290.0, 99.5, 277.7, 137.5, 272.9);
        recordLineTo(vaulter, ctx, 291.2, 253.7);
        recordLineTo(vaulter, ctx, 291.5, 255.7);
        recordLineTo(vaulter, ctx, 137.8, 274.9);
        recordBezierCurveTo(vaulter, ctx, 99.9, 279.7, 33.8, 292.0, 33.3, 292.1);
        ctx.closePath();
        ctx.fill();
        ctx.stroke();

        // vaulter/Path
        ctx.beginPath();
        recordMoveTo(vaulter, ctx, 48.1, 276.8);
        recordBezierCurveTo(vaulter, ctx, 48.1, 276.8, 54.3, 277.7, 55.3, 269.9);
        recordBezierCurveTo(vaulter, ctx, 56.4, 262.0, 53.3, 259.4, 51.2, 259.2);
        recordBezierCurveTo(vaulter, ctx, 49.2, 258.9, 45.7, 262.6, 45.7, 268.0);
        recordBezierCurveTo(vaulter, ctx, 45.7, 273.3, 45.9, 275.0, 48.1, 276.8);
        ctx.closePath();
        ctx.fill();
        ctx.stroke();

        // vaulter/Path
        ctx.beginPath();
        recordMoveTo(vaulter, ctx, 51.2, 258.8);
        recordBezierCurveTo(vaulter, ctx, 51.2, 258.8, 44.5, 261.6, 44.7, 263.8);
        recordBezierCurveTo(vaulter, ctx, 44.7, 263.8, 37.8, 268.1, 36.3, 271.5);
        recordBezierCurveTo(vaulter, ctx, 35.8, 272.4, 35.4, 272.9, 35.5, 273.7);
        recordBezierCurveTo(vaulter, ctx, 35.6, 275.7, 37.0, 276.6, 37.0, 276.6);
        recordBezierCurveTo(vaulter, ctx, 37.0, 276.6, 40.3, 279.4, 43.4, 283.1);
        recordBezierCurveTo(vaulter, ctx, 44.7, 284.6, 45.5, 285.4, 45.5, 285.4);
        recordBezierCurveTo(vaulter, ctx, 45.5, 285.4, 45.0, 286.2, 44.6, 286.4);
        recordBezierCurveTo(vaulter, ctx, 44.2, 286.6, 43.8, 287.8, 43.8, 288.6);
        recordBezierCurveTo(vaulter, ctx, 43.8, 289.4, 45.5, 290.4, 45.5, 290.4);
        recordBezierCurveTo(vaulter, ctx, 45.5, 290.4, 48.9, 291.4, 50.4, 289.6);
        recordBezierCurveTo(vaulter, ctx, 50.4, 289.6, 51.4, 286.4, 50.1, 285.4);
        recordBezierCurveTo(vaulter, ctx, 50.0, 284.9, 49.1, 285.3, 48.2, 284.4);
        recordBezierCurveTo(vaulter, ctx, 45.5, 279.8, 44.0, 276.0, 41.9, 272.4);
        recordBezierCurveTo(vaulter, ctx, 42.5, 272.3, 45.7, 271.1, 48.0, 268.2);
        recordBezierCurveTo(vaulter, ctx, 48.0, 268.2, 50.3, 268.6, 51.9, 268.4);
        ctx.fill();
        ctx.stroke();

        // vaulter/Path
        ctx.beginPath();
        recordMoveTo(vaulter, ctx, 77.8, 283.7);
        recordLineTo(vaulter, ctx, 79.2, 285.1);
        recordBezierCurveTo(vaulter, ctx, 79.2, 285.1, 80.4, 285.8, 80.7, 285.1);
        recordLineTo(vaulter, ctx, 82.5, 285.1);
        recordLineTo(vaulter, ctx, 83.7, 283.7);
        recordBezierCurveTo(vaulter, ctx, 83.7, 283.7, 83.0, 282.4, 82.2, 282.1);
        recordBezierCurveTo(vaulter, ctx, 81.3, 281.9, 79.2, 282.5, 78.9, 282.7);
        recordBezierCurveTo(vaulter, ctx, 78.5, 282.8, 77.5, 283.3, 77.8, 283.7);
        ctx.closePath();
        ctx.fill();
        ctx.stroke();
        ctx.restore();
      }
    },

    function (ctx) {
      if (vaulter.visible) {

        // vaulter/Path
        ctx.save();
        ctx.beginPath();
        recordMoveTo(vaulter, ctx, 49.1, 288.7);
        recordBezierCurveTo(vaulter, ctx, 49.1, 288.7, 47.8, 293.1, 48.4, 296.0);
        recordBezierCurveTo(vaulter, ctx, 48.9, 298.8, 52.9, 303.3, 52.9, 303.3);
        recordLineTo(vaulter, ctx, 58.5, 316.4);
        recordBezierCurveTo(vaulter, ctx, 58.5, 316.4, 56.7, 318.4, 56.3, 321.7);
        recordBezierCurveTo(vaulter, ctx, 55.8, 324.9, 55.3, 331.9, 54.8, 333.8);
        recordLineTo(vaulter, ctx, 54.1, 336.5);
        recordBezierCurveTo(vaulter, ctx, 54.1, 336.5, 52.8, 337.5, 52.5, 338.1);
        recordBezierCurveTo(vaulter, ctx, 52.2, 338.7, 52.6, 340.2, 54.1, 340.7);
        recordBezierCurveTo(vaulter, ctx, 55.6, 341.1, 59.9, 342.2, 60.9, 342.2);
        recordBezierCurveTo(vaulter, ctx, 61.9, 342.2, 63.1, 341.9, 63.0, 341.4);
        recordBezierCurveTo(vaulter, ctx, 62.9, 340.8, 62.0, 339.8, 60.7, 339.8);
        recordBezierCurveTo(vaulter, ctx, 59.4, 339.8, 58.2, 337.8, 57.1, 336.8);
        recordBezierCurveTo(vaulter, ctx, 59.2, 330.4, 63.1, 323.2, 64.1, 321.6);
        recordBezierCurveTo(vaulter, ctx, 65.7, 319.4, 67.3, 317.8, 66.7, 315.5);
        recordBezierCurveTo(vaulter, ctx, 66.1, 313.1, 65.1, 303.6, 60.9, 294.5);
        ctx.fillStyle = "rgb(17, 92, 137)";
        ctx.fill();
        ctx.lineWidth = 0.5;
        ctx.strokeStyle = "rgb(141, 204, 255)";
        ctx.lineJoin = "miter";
        ctx.miterLimit = 4.0;
        ctx.stroke();

        // vaulter/Path
        ctx.beginPath();
        recordMoveTo(vaulter, ctx, 60.9, 258.7);
        recordBezierCurveTo(vaulter, ctx, 60.9, 258.7, 65.0, 261.6, 65.3, 264.3);
        recordBezierCurveTo(vaulter, ctx, 65.5, 267.0, 66.4, 270.6, 66.4, 270.6);
        recordBezierCurveTo(vaulter, ctx, 66.4, 270.6, 70.2, 273.5, 71.2, 275.6);
        recordBezierCurveTo(vaulter, ctx, 72.2, 277.7, 78.9, 280.2, 78.9, 280.2);
        recordBezierCurveTo(vaulter, ctx, 78.9, 280.2, 80.2, 282.3, 80.1, 283.0);
        recordBezierCurveTo(vaulter, ctx, 80.0, 283.8, 76.1, 284.0, 76.1, 284.0);
        recordBezierCurveTo(vaulter, ctx, 76.1, 284.0, 72.1, 281.5, 70.6, 280.8);
        recordBezierCurveTo(vaulter, ctx, 69.1, 280.2, 64.8, 277.8, 63.4, 274.8);
        recordLineTo(vaulter, ctx, 60.6, 268.9);
        ctx.fill();
        ctx.stroke();

        // vaulter/Path
        ctx.beginPath();
        recordMoveTo(vaulter, ctx, 63.6, 296.1);
        recordBezierCurveTo(vaulter, ctx, 62.7, 294.0, 62.7, 289.1, 64.0, 286.6);
        recordBezierCurveTo(vaulter, ctx, 65.2, 284.1, 65.2, 268.5, 65.2, 268.5);
        recordBezierCurveTo(vaulter, ctx, 65.4, 265.2, 60.6, 258.3, 60.6, 258.3);
        recordBezierCurveTo(vaulter, ctx, 60.6, 258.3, 63.0, 253.5, 63.0, 252.3);
        recordBezierCurveTo(vaulter, ctx, 63.0, 251.1, 62.5, 246.5, 62.5, 246.5);
        recordBezierCurveTo(vaulter, ctx, 62.5, 246.5, 60.7, 241.3, 55.9, 241.6);
        recordBezierCurveTo(vaulter, ctx, 51.1, 241.9, 49.7, 247.6, 49.8, 249.9);
        recordBezierCurveTo(vaulter, ctx, 50.0, 252.2, 52.5, 257.8, 52.5, 257.8);
        recordBezierCurveTo(vaulter, ctx, 52.5, 257.8, 53.0, 260.4, 50.7, 259.9);
        recordBezierCurveTo(vaulter, ctx, 48.3, 259.3, 46.2, 270.8, 47.7, 275.2);
        recordBezierCurveTo(vaulter, ctx, 49.2, 279.6, 48.9, 290.5, 48.9, 290.5);
        recordBezierCurveTo(vaulter, ctx, 48.9, 290.5, 48.1, 292.4, 48.2, 294.7);
        ctx.fill();
        ctx.stroke();

        // vaulter/Path
        ctx.beginPath();
        recordMoveTo(vaulter, ctx, 62.0, 293.0);
        recordBezierCurveTo(vaulter, ctx, 62.2, 293.7, 62.6, 294.5, 63.3, 295.1);
        recordBezierCurveTo(vaulter, ctx, 66.8, 298.7, 74.3, 311.6, 74.1, 312.7);
        recordBezierCurveTo(vaulter, ctx, 73.8, 313.8, 72.1, 316.3, 70.7, 316.4);
        recordBezierCurveTo(vaulter, ctx, 65.3, 316.8, 57.8, 313.2, 50.8, 311.6);
        recordBezierCurveTo(vaulter, ctx, 49.4, 311.4, 45.8, 311.7, 45.3, 312.7);
        recordBezierCurveTo(vaulter, ctx, 44.7, 313.7, 42.4, 315.8, 41.9, 317.2);
        recordBezierCurveTo(vaulter, ctx, 41.3, 318.7, 41.0, 318.8, 40.4, 318.8);
        recordBezierCurveTo(vaulter, ctx, 39.9, 318.8, 40.2, 317.8, 40.4, 316.8);
        recordBezierCurveTo(vaulter, ctx, 40.7, 315.8, 42.1, 309.4, 42.3, 307.7);
        recordBezierCurveTo(vaulter, ctx, 42.4, 306.0, 43.8, 306.0, 44.4, 306.0);
        recordBezierCurveTo(vaulter, ctx, 45.0, 306.0, 45.8, 306.5, 46.3, 307.0);
        recordBezierCurveTo(vaulter, ctx, 46.3, 307.0, 47.2, 307.0, 50.6, 307.9);
        recordBezierCurveTo(vaulter, ctx, 54.0, 308.7, 59.8, 307.6, 63.9, 308.9);
        recordBezierCurveTo(vaulter, ctx, 56.5, 304.3, 50.5, 301.8, 48.4, 296.0);
        ctx.fill();
        ctx.stroke();

        // vaulter/Path
        ctx.beginPath();
        recordMoveTo(vaulter, ctx, 33.1, 290.9);
        recordBezierCurveTo(vaulter, ctx, 33.1, 290.9, 32.1, 291.1, 31.9, 290.1);
        recordBezierCurveTo(vaulter, ctx, 31.8, 289.1, 32.8, 288.9, 32.8, 288.9);
        recordLineTo(vaulter, ctx, 135.7, 274.3);
        recordLineTo(vaulter, ctx, 291.5, 255.7);
        recordLineTo(vaulter, ctx, 291.7, 257.7);
        recordLineTo(vaulter, ctx, 135.9, 276.3);
        recordLineTo(vaulter, ctx, 33.1, 290.9);
        ctx.closePath();
        ctx.fill();
        ctx.stroke();

        // vaulter/Path
        ctx.beginPath();
        recordMoveTo(vaulter, ctx, 48.1, 278.2);
        recordBezierCurveTo(vaulter, ctx, 48.1, 278.2, 54.3, 279.0, 55.3, 271.2);
        recordBezierCurveTo(vaulter, ctx, 56.4, 263.4, 53.3, 260.7, 51.2, 260.5);
        recordBezierCurveTo(vaulter, ctx, 49.2, 260.3, 45.7, 264.0, 45.7, 269.3);
        recordBezierCurveTo(vaulter, ctx, 45.7, 274.7, 45.9, 276.3, 48.1, 278.2);
        ctx.closePath();
        ctx.fill();
        ctx.stroke();

        // vaulter/Path
        ctx.beginPath();
        recordMoveTo(vaulter, ctx, 50.7, 259.9);
        recordBezierCurveTo(vaulter, ctx, 50.7, 259.9, 45.0, 259.9, 42.2, 264.5);
        recordBezierCurveTo(vaulter, ctx, 42.2, 264.5, 36.4, 268.4, 35.1, 269.1);
        recordBezierCurveTo(vaulter, ctx, 35.1, 269.1, 31.9, 271.6, 31.9, 273.6);
        recordBezierCurveTo(vaulter, ctx, 31.9, 275.7, 35.5, 278.3, 36.6, 278.9);
        recordBezierCurveTo(vaulter, ctx, 37.7, 279.4, 42.9, 283.4, 44.0, 284.7);
        recordBezierCurveTo(vaulter, ctx, 44.0, 284.7, 44.4, 286.4, 43.5, 286.9);
        recordBezierCurveTo(vaulter, ctx, 42.5, 287.3, 43.4, 290.0, 43.8, 290.3);
        recordBezierCurveTo(vaulter, ctx, 45.0, 291.0, 47.2, 290.7, 49.2, 289.9);
        recordBezierCurveTo(vaulter, ctx, 50.0, 289.6, 49.7, 286.4, 49.1, 286.1);
        recordBezierCurveTo(vaulter, ctx, 48.4, 285.9, 48.1, 285.4, 47.8, 284.6);
        recordBezierCurveTo(vaulter, ctx, 47.5, 283.8, 46.1, 281.2, 46.1, 281.2);
        recordLineTo(vaulter, ctx, 39.7, 273.4);
        recordBezierCurveTo(vaulter, ctx, 39.7, 273.4, 45.9, 270.2, 47.6, 268.5);
        recordBezierCurveTo(vaulter, ctx, 47.6, 268.5, 48.4, 269.1, 50.7, 268.7);
        ctx.fill();
        ctx.stroke();

        // vaulter/Path
        ctx.beginPath();
        recordMoveTo(vaulter, ctx, 76.9, 285.4);
        recordBezierCurveTo(vaulter, ctx, 76.9, 285.4, 76.9, 283.5, 77.5, 283.1);
        recordBezierCurveTo(vaulter, ctx, 78.0, 282.8, 79.7, 282.9, 80.6, 283.1);
        recordBezierCurveTo(vaulter, ctx, 81.5, 283.4, 82.4, 284.4, 82.5, 285.0);
        recordBezierCurveTo(vaulter, ctx, 82.6, 285.6, 81.4, 286.2, 80.8, 286.6);
        recordBezierCurveTo(vaulter, ctx, 80.3, 286.9, 77.6, 286.6, 77.6, 286.6);
        recordLineTo(vaulter, ctx, 76.9, 285.4);
        ctx.closePath();
        ctx.fill();
        ctx.stroke();
        ctx.restore();
      }
    },

    function (ctx) {
      if (vaulter.visible) {

        // vaulter/Path
        ctx.save();
        ctx.beginPath();
        recordMoveTo(vaulter, ctx, 60.7, 264.2);
        recordBezierCurveTo(vaulter, ctx, 60.7, 264.2, 63.2, 264.7, 63.6, 265.7);
        recordBezierCurveTo(vaulter, ctx, 64.0, 266.7, 67.6, 272.3, 67.9, 274.5);
        recordBezierCurveTo(vaulter, ctx, 68.2, 276.7, 70.6, 278.4, 71.2, 278.3);
        recordBezierCurveTo(vaulter, ctx, 71.7, 278.3, 81.1, 283.5, 81.4, 284.3);
        recordLineTo(vaulter, ctx, 75.7, 286.0);
        recordBezierCurveTo(vaulter, ctx, 75.7, 286.0, 73.5, 285.4, 71.1, 283.8);
        recordBezierCurveTo(vaulter, ctx, 71.1, 283.8, 68.4, 283.8, 67.7, 283.5);
        recordBezierCurveTo(vaulter, ctx, 67.1, 283.2, 63.2, 279.2, 62.2, 273.7);
        recordLineTo(vaulter, ctx, 60.7, 272.7);
        ctx.fillStyle = "rgb(17, 92, 137)";
        ctx.fill();
        ctx.lineWidth = 0.5;
        ctx.strokeStyle = "rgb(141, 204, 255)";
        ctx.lineJoin = "miter";
        ctx.miterLimit = 4.0;
        ctx.stroke();

        // vaulter/Path
        ctx.beginPath();
        recordMoveTo(vaulter, ctx, 32.5, 292.0);
        recordBezierCurveTo(vaulter, ctx, 32.5, 292.0, 31.4, 292.2, 31.3, 291.2);
        recordBezierCurveTo(vaulter, ctx, 31.2, 290.1, 32.3, 290.0, 32.3, 290.0);
        recordBezierCurveTo(vaulter, ctx, 32.9, 289.9, 105.9, 281.6, 142.4, 278.7);
        recordBezierCurveTo(vaulter, ctx, 179.0, 275.8, 291.0, 265.7, 291.6, 265.6);
        recordLineTo(vaulter, ctx, 291.8, 267.6);
        recordBezierCurveTo(vaulter, ctx, 291.2, 267.7, 179.2, 277.8, 142.6, 280.7);
        recordBezierCurveTo(vaulter, ctx, 106.1, 283.6, 33.1, 291.9, 32.5, 292.0);
        ctx.closePath();
        ctx.fill();
        ctx.stroke();

        // vaulter/Path
        ctx.beginPath();
        recordMoveTo(vaulter, ctx, 76.5, 287.2);
        recordBezierCurveTo(vaulter, ctx, 76.5, 287.2, 76.5, 285.1, 77.1, 284.8);
        recordBezierCurveTo(vaulter, ctx, 77.6, 284.4, 79.4, 284.5, 80.3, 284.8);
        recordBezierCurveTo(vaulter, ctx, 81.3, 285.1, 82.2, 286.1, 82.3, 286.7);
        recordBezierCurveTo(vaulter, ctx, 82.5, 287.4, 81.2, 288.0, 80.6, 288.4);
        recordBezierCurveTo(vaulter, ctx, 80.0, 288.8, 77.2, 288.4, 77.2, 288.4);
        recordLineTo(vaulter, ctx, 76.5, 287.2);
        ctx.closePath();
        ctx.fill();
        ctx.stroke();

        // vaulter/Path
        ctx.beginPath();
        recordMoveTo(vaulter, ctx, 63.2, 294.5);
        recordBezierCurveTo(vaulter, ctx, 63.4, 293.4, 63.6, 292.5, 64.0, 291.8);
        recordBezierCurveTo(vaulter, ctx, 65.2, 289.3, 65.2, 273.7, 65.2, 273.7);
        recordBezierCurveTo(vaulter, ctx, 65.4, 270.4, 60.6, 263.5, 60.6, 263.5);
        recordBezierCurveTo(vaulter, ctx, 60.6, 263.5, 63.0, 258.7, 63.0, 257.5);
        recordBezierCurveTo(vaulter, ctx, 63.0, 256.2, 62.5, 251.7, 62.5, 251.7);
        recordBezierCurveTo(vaulter, ctx, 62.5, 251.7, 60.7, 246.5, 55.9, 246.8);
        recordBezierCurveTo(vaulter, ctx, 51.1, 247.0, 49.7, 252.7, 49.8, 255.0);
        recordBezierCurveTo(vaulter, ctx, 50.0, 257.4, 52.5, 262.9, 52.5, 262.9);
        recordBezierCurveTo(vaulter, ctx, 52.5, 262.9, 53.0, 265.6, 50.7, 265.0);
        recordBezierCurveTo(vaulter, ctx, 48.3, 264.5, 46.2, 276.0, 47.7, 280.4);
        recordBezierCurveTo(vaulter, ctx, 49.2, 284.8, 48.9, 295.7, 48.9, 295.7);
        recordBezierCurveTo(vaulter, ctx, 48.9, 299.5, 48.9, 303.1, 49.1, 304.4);
        recordBezierCurveTo(vaulter, ctx, 49.4, 307.4, 50.2, 312.9, 50.2, 312.9);
        recordBezierCurveTo(vaulter, ctx, 50.2, 312.9, 45.4, 317.0, 44.4, 319.0);
        recordBezierCurveTo(vaulter, ctx, 43.4, 321.0, 36.3, 328.7, 36.3, 328.7);
        recordBezierCurveTo(vaulter, ctx, 36.3, 328.7, 33.7, 329.5, 33.1, 330.3);
        recordBezierCurveTo(vaulter, ctx, 32.4, 331.1, 32.0, 333.5, 34.3, 334.1);
        recordBezierCurveTo(vaulter, ctx, 36.5, 334.7, 38.9, 340.0, 38.9, 340.0);
        recordBezierCurveTo(vaulter, ctx, 38.9, 340.0, 40.5, 342.4, 44.0, 342.2);
        recordBezierCurveTo(vaulter, ctx, 47.4, 342.0, 45.6, 339.8, 45.0, 339.6);
        recordBezierCurveTo(vaulter, ctx, 45.0, 339.6, 42.6, 338.7, 42.2, 337.7);
        recordBezierCurveTo(vaulter, ctx, 41.8, 336.8, 40.6, 334.0, 39.5, 331.9);
        recordBezierCurveTo(vaulter, ctx, 39.5, 331.9, 53.1, 319.7, 55.2, 317.9);
        recordBezierCurveTo(vaulter, ctx, 57.3, 316.2, 60.1, 314.2, 60.5, 311.3);
        recordBezierCurveTo(vaulter, ctx, 60.8, 308.9, 62.8, 301.5, 63.2, 294.5);
        ctx.closePath();
        ctx.fill();
        ctx.stroke();

        // vaulter/Path
        ctx.beginPath();
        recordMoveTo(vaulter, ctx, 48.1, 283.3);
        recordBezierCurveTo(vaulter, ctx, 48.1, 283.3, 54.3, 284.1, 55.3, 276.3);
        recordBezierCurveTo(vaulter, ctx, 56.4, 268.5, 53.3, 265.8, 51.2, 265.6);
        recordBezierCurveTo(vaulter, ctx, 49.2, 265.4, 45.7, 269.1, 45.7, 274.5);
        recordBezierCurveTo(vaulter, ctx, 45.7, 279.8, 45.9, 281.5, 48.1, 283.3);
        ctx.closePath();
        ctx.fill();
        ctx.stroke();

        // vaulter/Path
        ctx.beginPath();
        recordMoveTo(vaulter, ctx, 50.7, 265.0);
        recordBezierCurveTo(vaulter, ctx, 50.7, 265.0, 45.5, 264.5, 43.3, 268.0);
        recordBezierCurveTo(vaulter, ctx, 43.3, 268.0, 36.2, 274.0, 35.7, 275.3);
        recordBezierCurveTo(vaulter, ctx, 35.7, 275.3, 33.5, 277.5, 33.5, 278.5);
        recordBezierCurveTo(vaulter, ctx, 33.5, 279.5, 35.0, 282.0, 37.1, 282.5);
        recordBezierCurveTo(vaulter, ctx, 39.2, 283.1, 42.5, 285.0, 44.1, 285.4);
        recordBezierCurveTo(vaulter, ctx, 45.8, 285.8, 46.2, 288.4, 46.0, 289.0);
        recordBezierCurveTo(vaulter, ctx, 45.9, 289.5, 45.2, 291.2, 45.8, 292.0);
        recordBezierCurveTo(vaulter, ctx, 46.3, 292.8, 48.5, 293.3, 49.3, 293.3);
        recordBezierCurveTo(vaulter, ctx, 50.0, 293.3, 52.0, 291.3, 52.0, 291.3);
        recordBezierCurveTo(vaulter, ctx, 52.4, 290.5, 51.3, 287.9, 50.7, 287.7);
        recordBezierCurveTo(vaulter, ctx, 50.0, 287.5, 49.8, 285.9, 49.3, 285.6);
        recordBezierCurveTo(vaulter, ctx, 48.7, 285.3, 42.0, 278.2, 41.1, 277.9);
        recordBezierCurveTo(vaulter, ctx, 41.1, 277.9, 45.4, 275.4, 46.7, 273.2);
        recordBezierCurveTo(vaulter, ctx, 46.7, 273.2, 48.4, 273.8, 51.1, 273.4);
        ctx.fill();
        ctx.stroke();

        // vaulter/Path
        ctx.beginPath();
        recordMoveTo(vaulter, ctx, 48.9, 294.7);
        recordBezierCurveTo(vaulter, ctx, 48.9, 294.7, 48.2, 296.3, 48.1, 297.5);
        recordBezierCurveTo(vaulter, ctx, 47.9, 298.7, 47.5, 301.8, 48.6, 303.9);
        recordBezierCurveTo(vaulter, ctx, 50.3, 307.1, 54.3, 307.6, 58.1, 308.6);
        recordBezierCurveTo(vaulter, ctx, 62.0, 309.6, 68.4, 311.2, 68.4, 311.2);
        recordBezierCurveTo(vaulter, ctx, 62.2, 313.7, 60.3, 316.9, 53.2, 317.9);
        recordBezierCurveTo(vaulter, ctx, 53.2, 317.9, 52.4, 317.6, 51.5, 317.9);
        recordBezierCurveTo(vaulter, ctx, 50.6, 318.1, 49.7, 319.2, 49.7, 320.2);
        recordBezierCurveTo(vaulter, ctx, 49.8, 321.2, 52.6, 323.4, 53.5, 324.9);
        recordBezierCurveTo(vaulter, ctx, 54.3, 326.4, 57.5, 331.1, 58.6, 331.9);
        recordBezierCurveTo(vaulter, ctx, 59.7, 332.6, 60.5, 333.0, 60.7, 332.1);
        recordBezierCurveTo(vaulter, ctx, 61.0, 331.1, 59.0, 329.6, 59.0, 328.3);
        recordBezierCurveTo(vaulter, ctx, 58.9, 324.2, 57.4, 321.2, 57.4, 321.2);
        recordBezierCurveTo(vaulter, ctx, 57.4, 321.2, 62.3, 319.6, 68.0, 318.6);
        recordBezierCurveTo(vaulter, ctx, 70.7, 318.2, 77.4, 314.9, 77.4, 314.9);
        recordBezierCurveTo(vaulter, ctx, 78.5, 314.3, 79.9, 311.8, 79.9, 310.6);
        recordBezierCurveTo(vaulter, ctx, 79.9, 308.7, 79.2, 308.4, 78.2, 307.1);
        recordBezierCurveTo(vaulter, ctx, 76.8, 305.4, 74.6, 304.6, 72.3, 303.0);
        recordBezierCurveTo(vaulter, ctx, 68.3, 300.3, 63.3, 297.5, 62.3, 296.9);
        ctx.fill();
        ctx.stroke();
        ctx.restore();
      }
    },

    function (ctx) {
      if (vaulter.visible) {

        // vaulter/Path
        ctx.save();
        ctx.beginPath();
        recordMoveTo(vaulter, ctx, 48.6, 292.5);
        recordBezierCurveTo(vaulter, ctx, 48.6, 292.5, 47.4, 307.7, 48.6, 311.5);
        recordBezierCurveTo(vaulter, ctx, 48.6, 311.5, 39.7, 310.3, 31.3, 309.5);
        recordBezierCurveTo(vaulter, ctx, 31.3, 309.5, 30.4, 308.5, 29.6, 308.5);
        recordBezierCurveTo(vaulter, ctx, 28.9, 308.5, 27.7, 308.6, 27.4, 309.1);
        recordBezierCurveTo(vaulter, ctx, 27.1, 309.5, 23.1, 313.8, 22.2, 314.4);
        recordBezierCurveTo(vaulter, ctx, 21.3, 314.9, 19.8, 315.6, 19.6, 316.4);
        recordBezierCurveTo(vaulter, ctx, 19.5, 317.1, 20.8, 317.9, 22.5, 317.8);
        recordBezierCurveTo(vaulter, ctx, 24.2, 317.6, 27.2, 315.5, 29.3, 315.3);
        recordBezierCurveTo(vaulter, ctx, 29.3, 315.3, 33.2, 314.6, 38.4, 315.7);
        recordBezierCurveTo(vaulter, ctx, 43.5, 316.8, 46.9, 320.0, 49.9, 319.8);
        recordBezierCurveTo(vaulter, ctx, 53.0, 319.7, 54.6, 318.0, 56.2, 314.4);
        recordBezierCurveTo(vaulter, ctx, 57.7, 310.7, 59.5, 298.2, 59.5, 298.2);
        ctx.fillStyle = "rgb(17, 92, 137)";
        ctx.fill();
        ctx.lineWidth = 0.5;
        ctx.strokeStyle = "rgb(141, 204, 255)";
        ctx.lineJoin = "miter";
        ctx.miterLimit = 4.0;
        ctx.stroke();

        // vaulter/Path
        ctx.beginPath();
        recordMoveTo(vaulter, ctx, 61.9, 272.7);
        recordLineTo(vaulter, ctx, 63.5, 272.7);
        recordBezierCurveTo(vaulter, ctx, 63.5, 272.7, 68.2, 280.7, 69.0, 281.4);
        recordBezierCurveTo(vaulter, ctx, 69.9, 282.1, 70.4, 282.2, 72.7, 281.7);
        recordBezierCurveTo(vaulter, ctx, 74.6, 281.5, 77.7, 277.2, 85.1, 273.9);
        recordBezierCurveTo(vaulter, ctx, 85.1, 273.9, 85.9, 273.3, 85.3, 272.5);
        recordBezierCurveTo(vaulter, ctx, 84.7, 271.8, 83.8, 272.0, 83.8, 272.0);
        recordBezierCurveTo(vaulter, ctx, 83.8, 272.0, 78.3, 273.8, 76.3, 274.3);
        recordBezierCurveTo(vaulter, ctx, 74.5, 274.7, 71.6, 275.9, 71.6, 275.9);
        recordLineTo(vaulter, ctx, 66.5, 268.1);
        recordBezierCurveTo(vaulter, ctx, 64.5, 264.5, 60.6, 263.2, 60.6, 263.2);
        recordBezierCurveTo(vaulter, ctx, 60.6, 263.2, 57.3, 267.8, 61.9, 272.7);
        ctx.closePath();
        ctx.fill();
        ctx.stroke();

        // vaulter/Path
        ctx.beginPath();
        recordMoveTo(vaulter, ctx, 63.2, 299.5);
        recordBezierCurveTo(vaulter, ctx, 62.4, 297.5, 62.4, 292.6, 63.6, 290.2);
        recordBezierCurveTo(vaulter, ctx, 64.9, 287.8, 64.9, 272.6, 64.9, 272.6);
        recordBezierCurveTo(vaulter, ctx, 65.0, 269.4, 60.3, 262.7, 60.3, 262.7);
        recordBezierCurveTo(vaulter, ctx, 60.3, 262.7, 62.7, 258.0, 62.7, 256.8);
        recordBezierCurveTo(vaulter, ctx, 62.7, 255.6, 62.2, 251.1, 62.2, 251.1);
        recordBezierCurveTo(vaulter, ctx, 62.2, 251.1, 60.4, 246.1, 55.8, 246.3);
        recordBezierCurveTo(vaulter, ctx, 51.1, 246.6, 49.7, 252.1, 49.8, 254.4);
        recordBezierCurveTo(vaulter, ctx, 50.0, 256.7, 52.4, 262.1, 52.4, 262.1);
        recordBezierCurveTo(vaulter, ctx, 52.4, 262.1, 52.9, 264.7, 50.7, 264.1);
        recordBezierCurveTo(vaulter, ctx, 48.4, 263.6, 46.2, 274.8, 47.7, 279.1);
        recordBezierCurveTo(vaulter, ctx, 49.2, 283.4, 49.0, 294.1, 49.0, 294.1);
        recordBezierCurveTo(vaulter, ctx, 49.0, 294.1, 48.1, 295.9, 48.3, 298.2);
        ctx.fill();
        ctx.stroke();

        // vaulter/Path
        ctx.beginPath();
        recordMoveTo(vaulter, ctx, 48.7, 291.4);
        recordBezierCurveTo(vaulter, ctx, 48.7, 291.4, 47.7, 298.3, 49.9, 300.7);
        recordBezierCurveTo(vaulter, ctx, 53.4, 304.7, 57.9, 306.4, 64.6, 309.7);
        recordBezierCurveTo(vaulter, ctx, 67.0, 310.9, 67.7, 309.8, 69.5, 315.3);
        recordBezierCurveTo(vaulter, ctx, 71.2, 320.8, 75.3, 324.9, 78.3, 332.5);
        recordBezierCurveTo(vaulter, ctx, 78.3, 332.5, 77.9, 334.7, 78.3, 335.3);
        recordBezierCurveTo(vaulter, ctx, 78.8, 335.9, 80.3, 337.5, 81.7, 337.2);
        recordBezierCurveTo(vaulter, ctx, 83.0, 336.9, 88.2, 335.7, 90.6, 335.3);
        recordBezierCurveTo(vaulter, ctx, 93.1, 334.8, 93.5, 333.0, 93.5, 333.0);
        recordBezierCurveTo(vaulter, ctx, 93.5, 333.0, 92.3, 331.4, 90.6, 331.7);
        recordBezierCurveTo(vaulter, ctx, 89.0, 332.0, 82.4, 330.8, 82.4, 330.8);
        recordBezierCurveTo(vaulter, ctx, 81.5, 330.5, 76.9, 315.9, 76.6, 310.4);
        recordBezierCurveTo(vaulter, ctx, 76.3, 304.9, 73.1, 304.5, 72.2, 303.2);
        recordBezierCurveTo(vaulter, ctx, 71.3, 301.8, 63.6, 294.2, 59.6, 291.4);
        ctx.fill();
        ctx.stroke();

        // vaulter/Path
        ctx.beginPath();
        recordMoveTo(vaulter, ctx, 48.2, 282.0);
        recordBezierCurveTo(vaulter, ctx, 48.2, 282.0, 54.2, 282.8, 55.2, 275.2);
        recordBezierCurveTo(vaulter, ctx, 56.2, 267.5, 53.2, 264.9, 51.2, 264.7);
        recordBezierCurveTo(vaulter, ctx, 49.2, 264.5, 45.8, 268.2, 45.8, 273.4);
        recordBezierCurveTo(vaulter, ctx, 45.8, 278.6, 46.0, 280.2, 48.2, 282.0);
        ctx.closePath();
        ctx.fill();
        ctx.stroke();

        // vaulter/Path
        ctx.beginPath();
        recordMoveTo(vaulter, ctx, 50.1, 264.3);
        recordBezierCurveTo(vaulter, ctx, 50.1, 264.3, 44.6, 268.1, 44.2, 271.1);
        recordBezierCurveTo(vaulter, ctx, 43.9, 274.0, 44.1, 284.8, 45.5, 286.6);
        recordBezierCurveTo(vaulter, ctx, 45.9, 287.0, 46.2, 287.4, 46.6, 287.5);
        recordBezierCurveTo(vaulter, ctx, 47.8, 288.0, 49.7, 286.8, 50.1, 285.6);
        recordBezierCurveTo(vaulter, ctx, 50.4, 284.5, 50.1, 281.8, 50.1, 281.8);
        recordBezierCurveTo(vaulter, ctx, 50.1, 281.8, 50.9, 277.6, 50.1, 274.4);
        recordLineTo(vaulter, ctx, 51.7, 274.4);
        ctx.fill();
        ctx.stroke();

        // vaulter/Path
        ctx.beginPath();
        recordMoveTo(vaulter, ctx, 304.7, 287.9);
        recordLineTo(vaulter, ctx, 143.1, 276.1);
        recordBezierCurveTo(vaulter, ctx, 100.3, 273.1, 42.9, 273.8, 42.3, 273.9);
        recordBezierCurveTo(vaulter, ctx, 42.3, 273.9, 41.1, 273.9, 41.1, 272.8);
        recordBezierCurveTo(vaulter, ctx, 41.1, 271.7, 42.3, 271.8, 42.3, 271.8);
        recordBezierCurveTo(vaulter, ctx, 42.9, 271.8, 100.3, 271.0, 143.2, 274.1);
        recordLineTo(vaulter, ctx, 304.8, 285.9);
        recordLineTo(vaulter, ctx, 304.7, 287.9);
        ctx.closePath();
        ctx.fill();
        ctx.stroke();

        // vaulter/Path
        ctx.beginPath();
        recordMoveTo(vaulter, ctx, 89.5, 272.9);
        recordBezierCurveTo(vaulter, ctx, 89.5, 272.9, 87.1, 273.3, 86.7, 273.3);
        recordBezierCurveTo(vaulter, ctx, 86.3, 273.2, 85.2, 272.8, 85.2, 272.8);
        recordBezierCurveTo(vaulter, ctx, 85.2, 272.8, 84.9, 271.6, 85.2, 271.0);
        recordBezierCurveTo(vaulter, ctx, 85.5, 270.4, 86.9, 270.1, 86.9, 270.1);
        recordBezierCurveTo(vaulter, ctx, 86.9, 270.1, 88.6, 270.7, 89.1, 271.0);
        recordBezierCurveTo(vaulter, ctx, 89.5, 271.3, 90.1, 272.5, 89.5, 272.9);
        ctx.closePath();
        ctx.fill();
        ctx.stroke();

        // vaulter/Path
        ctx.beginPath();
        recordMoveTo(vaulter, ctx, 46.6, 287.5);
        recordBezierCurveTo(vaulter, ctx, 47.9, 288.3, 49.3, 288.3, 50.1, 287.5);
        recordBezierCurveTo(vaulter, ctx, 51.0, 286.6, 53.9, 282.7, 55.0, 280.0);
        recordBezierCurveTo(vaulter, ctx, 56.2, 277.3, 58.7, 277.0, 59.3, 274.9);
        recordBezierCurveTo(vaulter, ctx, 59.8, 272.8, 59.0, 272.0, 58.4, 271.6);
        recordBezierCurveTo(vaulter, ctx, 58.4, 271.6, 57.8, 270.9, 57.0, 270.6);
        recordBezierCurveTo(vaulter, ctx, 56.2, 270.3, 54.7, 270.6, 54.2, 270.9);
        recordBezierCurveTo(vaulter, ctx, 53.7, 271.2, 53.5, 272.3, 53.6, 272.9);
        recordBezierCurveTo(vaulter, ctx, 53.7, 273.5, 52.8, 274.9, 52.6, 276.2);
        recordBezierCurveTo(vaulter, ctx, 52.3, 277.4, 50.5, 278.6, 49.3, 280.2);
        recordBezierCurveTo(vaulter, ctx, 48.6, 281.1, 47.8, 282.2, 47.1, 283.4);
        ctx.fill();
        ctx.stroke();
        ctx.restore();
      }
    },

    function (ctx) {
      if (vaulter.visible) {

        // vaulter/Path
        ctx.save();
        ctx.beginPath();
        recordMoveTo(vaulter, ctx, 62.3, 292.3);
        recordBezierCurveTo(vaulter, ctx, 62.3, 292.3, 68.7, 304.7, 69.3, 306.9);
        recordBezierCurveTo(vaulter, ctx, 69.9, 309.0, 71.3, 314.1, 69.3, 316.1);
        recordBezierCurveTo(vaulter, ctx, 67.3, 318.1, 63.1, 318.3, 63.1, 318.3);
        recordBezierCurveTo(vaulter, ctx, 63.1, 318.3, 57.7, 313.1, 49.4, 311.5);
        recordBezierCurveTo(vaulter, ctx, 41.0, 309.9, 37.8, 311.0, 37.8, 311.0);
        recordBezierCurveTo(vaulter, ctx, 37.8, 311.0, 35.2, 311.9, 34.5, 311.0);
        recordBezierCurveTo(vaulter, ctx, 33.8, 310.2, 34.9, 308.0, 36.2, 307.6);
        recordBezierCurveTo(vaulter, ctx, 37.5, 307.1, 42.4, 307.3, 43.2, 306.4);
        recordBezierCurveTo(vaulter, ctx, 43.9, 305.6, 46.2, 305.2, 47.3, 305.3);
        recordBezierCurveTo(vaulter, ctx, 48.5, 305.4, 50.6, 307.4, 52.3, 307.9);
        recordBezierCurveTo(vaulter, ctx, 54.0, 308.3, 61.9, 308.7, 61.9, 308.7);
        recordBezierCurveTo(vaulter, ctx, 61.9, 308.7, 50.5, 305.5, 48.8, 295.5);
        ctx.fillStyle = "rgb(17, 92, 137)";
        ctx.fill();
        ctx.lineWidth = 0.5;
        ctx.strokeStyle = "rgb(141, 204, 255)";
        ctx.lineJoin = "miter";
        ctx.miterLimit = 4.0;
        ctx.stroke();

        // vaulter/Path
        ctx.beginPath();
        recordMoveTo(vaulter, ctx, 59.5, 261.8);
        recordBezierCurveTo(vaulter, ctx, 59.5, 261.8, 62.2, 261.8, 64.4, 263.8);
        recordBezierCurveTo(vaulter, ctx, 66.6, 265.9, 67.7, 268.5, 67.7, 268.5);
        recordLineTo(vaulter, ctx, 72.8, 271.8);
        recordBezierCurveTo(vaulter, ctx, 72.8, 271.8, 79.5, 270.4, 83.8, 268.7);
        recordLineTo(vaulter, ctx, 90.4, 269.6);
        recordBezierCurveTo(vaulter, ctx, 85.5, 270.3, 75.6, 276.9, 72.8, 277.2);
        recordBezierCurveTo(vaulter, ctx, 70.0, 277.5, 64.9, 272.6, 64.9, 272.6);
        recordLineTo(vaulter, ctx, 63.7, 271.4);
        ctx.fill();
        ctx.stroke();

        // vaulter/Path
        ctx.beginPath();
        recordMoveTo(vaulter, ctx, 63.6, 297.7);
        recordBezierCurveTo(vaulter, ctx, 62.7, 295.7, 62.7, 290.7, 64.0, 288.3);
        recordBezierCurveTo(vaulter, ctx, 65.2, 285.8, 65.2, 270.2, 65.2, 270.2);
        recordBezierCurveTo(vaulter, ctx, 65.4, 266.9, 60.6, 260.0, 60.6, 260.0);
        recordBezierCurveTo(vaulter, ctx, 60.6, 260.0, 63.0, 255.2, 63.0, 254.0);
        recordBezierCurveTo(vaulter, ctx, 63.0, 252.7, 62.5, 248.2, 62.5, 248.2);
        recordBezierCurveTo(vaulter, ctx, 62.5, 248.2, 60.7, 243.0, 55.9, 243.3);
        recordBezierCurveTo(vaulter, ctx, 51.1, 243.6, 49.7, 249.2, 49.8, 251.6);
        recordBezierCurveTo(vaulter, ctx, 50.0, 253.9, 52.5, 259.5, 52.5, 259.5);
        recordBezierCurveTo(vaulter, ctx, 52.5, 259.5, 52.8, 260.6, 50.7, 261.8);
        recordBezierCurveTo(vaulter, ctx, 47.9, 263.2, 46.2, 272.5, 47.7, 276.9);
        recordBezierCurveTo(vaulter, ctx, 49.2, 281.3, 48.9, 292.2, 48.9, 292.2);
        ctx.fill();
        ctx.stroke();

        // vaulter/Path
        ctx.beginPath();
        recordMoveTo(vaulter, ctx, 48.9, 292.2);
        recordBezierCurveTo(vaulter, ctx, 48.9, 292.2, 47.6, 297.5, 51.7, 301.9);
        recordBezierCurveTo(vaulter, ctx, 55.8, 306.2, 65.0, 310.1, 65.0, 310.1);
        recordBezierCurveTo(vaulter, ctx, 65.0, 310.1, 64.5, 315.9, 65.8, 320.3);
        recordBezierCurveTo(vaulter, ctx, 67.0, 324.6, 67.9, 328.7, 68.2, 333.4);
        recordBezierCurveTo(vaulter, ctx, 68.2, 333.4, 66.9, 335.5, 67.0, 336.4);
        recordBezierCurveTo(vaulter, ctx, 67.1, 337.3, 67.9, 339.0, 69.5, 339.2);
        recordBezierCurveTo(vaulter, ctx, 71.1, 339.5, 73.7, 340.7, 74.5, 341.3);
        recordBezierCurveTo(vaulter, ctx, 75.3, 341.9, 78.0, 342.4, 79.0, 342.1);
        recordBezierCurveTo(vaulter, ctx, 80.1, 341.8, 81.3, 340.5, 80.7, 340.0);
        recordBezierCurveTo(vaulter, ctx, 80.2, 339.6, 79.1, 338.1, 77.7, 337.6);
        recordBezierCurveTo(vaulter, ctx, 76.2, 337.2, 72.3, 334.9, 72.2, 333.3);
        recordBezierCurveTo(vaulter, ctx, 72.1, 331.7, 71.4, 321.2, 72.3, 317.6);
        recordBezierCurveTo(vaulter, ctx, 73.2, 314.1, 74.3, 308.7, 73.7, 306.6);
        recordBezierCurveTo(vaulter, ctx, 73.0, 304.4, 70.7, 301.1, 70.7, 301.1);
        recordLineTo(vaulter, ctx, 61.4, 291.4);
        ctx.fill();
        ctx.stroke();

        // vaulter/Path
        ctx.beginPath();
        recordMoveTo(vaulter, ctx, 51.1, 280.1);
        recordBezierCurveTo(vaulter, ctx, 51.1, 280.1, 57.3, 279.9, 57.0, 272.0);
        recordBezierCurveTo(vaulter, ctx, 56.7, 264.1, 53.2, 262.0, 51.1, 262.2);
        recordBezierCurveTo(vaulter, ctx, 49.0, 262.3, 46.2, 266.6, 47.1, 271.8);
        recordBezierCurveTo(vaulter, ctx, 48.1, 277.1, 48.5, 278.7, 51.1, 280.1);
        ctx.closePath();
        ctx.fill();
        ctx.stroke();

        // vaulter/Path
        ctx.beginPath();
        recordMoveTo(vaulter, ctx, 54.3, 271.5);
        recordLineTo(vaulter, ctx, 52.8, 272.0);
        recordBezierCurveTo(vaulter, ctx, 54.6, 274.8, 55.0, 279.0, 55.0, 279.0);
        recordBezierCurveTo(vaulter, ctx, 55.0, 279.0, 56.2, 281.4, 56.2, 282.6);
        recordBezierCurveTo(vaulter, ctx, 56.2, 283.8, 54.8, 285.6, 53.6, 285.5);
        recordBezierCurveTo(vaulter, ctx, 53.1, 285.4, 52.7, 285.2, 52.2, 284.9);
        recordBezierCurveTo(vaulter, ctx, 50.3, 283.7, 46.8, 273.5, 46.2, 270.6);
        recordBezierCurveTo(vaulter, ctx, 45.7, 267.8, 49.6, 262.4, 49.6, 262.4);
        ctx.fill();
        ctx.stroke();

        // vaulter/Path
        ctx.beginPath();
        recordMoveTo(vaulter, ctx, 309.5, 290.9);
        recordBezierCurveTo(vaulter, ctx, 309.1, 290.8, 206.4, 280.7, 152.9, 274.2);
        recordBezierCurveTo(vaulter, ctx, 99.5, 267.7, 47.2, 270.1, 46.8, 270.1);
        recordBezierCurveTo(vaulter, ctx, 46.8, 270.1, 45.7, 270.2, 45.7, 269.2);
        recordBezierCurveTo(vaulter, ctx, 45.6, 268.1, 46.7, 268.1, 46.7, 268.1);
        recordBezierCurveTo(vaulter, ctx, 47.1, 268.1, 99.6, 265.7, 153.2, 272.2);
        recordBezierCurveTo(vaulter, ctx, 206.7, 278.7, 309.3, 288.8, 309.7, 288.9);
        recordLineTo(vaulter, ctx, 309.5, 290.9);
        ctx.closePath();
        ctx.fill();
        ctx.stroke();

        // vaulter/Path
        ctx.beginPath();
        recordMoveTo(vaulter, ctx, 53.5, 285.1);
        recordBezierCurveTo(vaulter, ctx, 54.9, 285.7, 56.3, 285.4, 56.9, 284.5);
        recordBezierCurveTo(vaulter, ctx, 57.7, 283.4, 59.8, 279.2, 60.6, 276.4);
        recordBezierCurveTo(vaulter, ctx, 61.3, 273.5, 63.6, 272.9, 63.9, 270.7);
        recordBezierCurveTo(vaulter, ctx, 64.1, 268.5, 63.2, 267.9, 62.5, 267.6);
        recordBezierCurveTo(vaulter, ctx, 62.5, 267.6, 61.8, 267.0, 61.0, 266.9);
        recordBezierCurveTo(vaulter, ctx, 60.2, 266.7, 58.8, 267.2, 58.3, 267.6);
        recordBezierCurveTo(vaulter, ctx, 57.9, 267.9, 57.8, 269.0, 58.0, 269.6);
        recordBezierCurveTo(vaulter, ctx, 58.2, 270.2, 57.5, 271.8, 57.5, 273.0);
        recordBezierCurveTo(vaulter, ctx, 57.5, 274.3, 55.9, 275.7, 55.0, 277.5);
        recordBezierCurveTo(vaulter, ctx, 53.6, 279.9, 51.7, 283.9, 53.5, 285.1);
        ctx.closePath();
        ctx.fill();
        ctx.stroke();

        // vaulter/Path
        ctx.beginPath();
        recordMoveTo(vaulter, ctx, 89.8, 266.4);
        recordBezierCurveTo(vaulter, ctx, 89.8, 266.4, 92.3, 266.0, 92.7, 266.1);
        recordBezierCurveTo(vaulter, ctx, 93.2, 266.1, 94.2, 266.6, 94.2, 266.6);
        recordBezierCurveTo(vaulter, ctx, 94.2, 266.6, 94.6, 267.8, 94.3, 268.5);
        recordBezierCurveTo(vaulter, ctx, 94.0, 269.1, 92.5, 269.3, 92.5, 269.3);
        recordBezierCurveTo(vaulter, ctx, 92.5, 269.3, 90.8, 268.7, 90.3, 268.4);
        recordBezierCurveTo(vaulter, ctx, 89.8, 268.1, 89.3, 266.8, 89.8, 266.4);
        ctx.closePath();
        ctx.fill();
        ctx.stroke();
        ctx.restore();
      }
    },

    function (ctx) {
      if (vaulter.visible) {

        // vaulter/Path
        ctx.save();
        ctx.beginPath();
        recordMoveTo(vaulter, ctx, 63.2, 289.4);
        recordBezierCurveTo(vaulter, ctx, 63.2, 289.4, 76.4, 301.8, 75.9, 305.2);
        recordBezierCurveTo(vaulter, ctx, 75.4, 308.5, 69.3, 311.9, 67.5, 312.0);
        recordBezierCurveTo(vaulter, ctx, 65.7, 312.1, 49.3, 312.8, 47.8, 313.3);
        recordBezierCurveTo(vaulter, ctx, 45.0, 314.0, 42.9, 316.3, 42.7, 317.2);
        recordBezierCurveTo(vaulter, ctx, 42.6, 318.1, 41.5, 323.2, 41.1, 324.1);
        recordBezierCurveTo(vaulter, ctx, 41.0, 324.5, 41.0, 325.3, 40.7, 325.8);
        recordBezierCurveTo(vaulter, ctx, 40.4, 326.2, 39.8, 326.6, 39.3, 326.3);
        recordBezierCurveTo(vaulter, ctx, 38.8, 325.9, 37.9, 319.6, 38.8, 317.0);
        recordBezierCurveTo(vaulter, ctx, 39.6, 314.4, 39.0, 312.8, 39.0, 312.8);
        recordBezierCurveTo(vaulter, ctx, 39.0, 312.8, 40.1, 310.9, 40.9, 311.1);
        recordBezierCurveTo(vaulter, ctx, 41.7, 311.3, 43.2, 311.0, 43.8, 310.7);
        recordBezierCurveTo(vaulter, ctx, 44.4, 310.4, 52.0, 304.3, 56.8, 304.6);
        recordLineTo(vaulter, ctx, 61.0, 304.6);
        recordBezierCurveTo(vaulter, ctx, 58.3, 303.0, 53.6, 299.8, 51.6, 295.0);
        ctx.fillStyle = "rgb(17, 92, 137)";
        ctx.fill();
        ctx.lineWidth = 0.5;
        ctx.strokeStyle = "rgb(141, 204, 255)";
        ctx.lineJoin = "miter";
        ctx.miterLimit = 4.0;
        ctx.stroke();

        // vaulter/Path
        ctx.beginPath();
        recordMoveTo(vaulter, ctx, 60.6, 258.5);
        recordBezierCurveTo(vaulter, ctx, 60.6, 258.5, 64.7, 258.2, 65.9, 259.7);
        recordBezierCurveTo(vaulter, ctx, 67.1, 261.2, 67.8, 262.1, 67.8, 262.1);
        recordBezierCurveTo(vaulter, ctx, 67.8, 262.1, 73.5, 264.4, 74.1, 265.6);
        recordBezierCurveTo(vaulter, ctx, 79.0, 264.9, 85.1, 263.1, 88.0, 262.1);
        recordBezierCurveTo(vaulter, ctx, 88.0, 262.1, 93.8, 262.4, 92.7, 264.0);
        recordBezierCurveTo(vaulter, ctx, 86.3, 266.2, 80.8, 270.5, 74.5, 271.6);
        recordBezierCurveTo(vaulter, ctx, 74.5, 271.6, 74.5, 271.6, 72.6, 271.1);
        recordBezierCurveTo(vaulter, ctx, 70.6, 270.7, 64.8, 266.2, 64.8, 266.2);
        recordLineTo(vaulter, ctx, 63.2, 265.6);
        ctx.fill();
        ctx.stroke();

        // vaulter/Path
        ctx.beginPath();
        recordMoveTo(vaulter, ctx, 63.0, 290.6);
        recordBezierCurveTo(vaulter, ctx, 63.1, 289.0, 63.4, 287.4, 64.0, 286.4);
        recordBezierCurveTo(vaulter, ctx, 65.2, 283.9, 65.2, 268.3, 65.2, 268.3);
        recordBezierCurveTo(vaulter, ctx, 65.4, 265.0, 60.6, 258.1, 60.6, 258.1);
        recordBezierCurveTo(vaulter, ctx, 60.6, 258.1, 63.0, 253.3, 63.0, 252.1);
        recordBezierCurveTo(vaulter, ctx, 63.0, 250.8, 62.5, 246.3, 62.5, 246.3);
        recordBezierCurveTo(vaulter, ctx, 62.5, 246.3, 60.7, 241.1, 55.9, 241.4);
        recordBezierCurveTo(vaulter, ctx, 51.1, 241.6, 49.7, 247.3, 49.8, 249.7);
        recordBezierCurveTo(vaulter, ctx, 50.0, 252.0, 52.5, 257.6, 52.5, 257.6);
        recordBezierCurveTo(vaulter, ctx, 52.5, 257.6, 52.8, 259.0, 50.6, 260.0);
        recordBezierCurveTo(vaulter, ctx, 48.6, 261.0, 46.2, 270.6, 47.7, 275.0);
        recordBezierCurveTo(vaulter, ctx, 49.2, 279.4, 48.9, 290.3, 48.9, 290.3);
        recordBezierCurveTo(vaulter, ctx, 48.9, 290.3, 47.9, 292.2, 48.1, 294.5);
        recordBezierCurveTo(vaulter, ctx, 48.1, 295.3, 48.4, 296.4, 48.5, 297.2);
        recordBezierCurveTo(vaulter, ctx, 49.0, 300.0, 53.6, 306.2, 57.4, 314.0);
        recordBezierCurveTo(vaulter, ctx, 54.2, 322.9, 56.8, 325.8, 52.5, 334.9);
        recordBezierCurveTo(vaulter, ctx, 52.5, 334.9, 51.2, 335.1, 50.7, 336.2);
        recordBezierCurveTo(vaulter, ctx, 50.3, 337.3, 51.5, 338.4, 51.5, 338.4);
        recordBezierCurveTo(vaulter, ctx, 51.5, 338.4, 58.1, 341.7, 61.0, 342.1);
        recordBezierCurveTo(vaulter, ctx, 64.0, 342.6, 63.9, 341.6, 63.1, 340.4);
        recordBezierCurveTo(vaulter, ctx, 62.7, 339.8, 61.7, 339.4, 60.5, 338.6);
        recordBezierCurveTo(vaulter, ctx, 59.2, 337.8, 56.2, 335.1, 56.2, 335.1);
        recordBezierCurveTo(vaulter, ctx, 58.7, 327.6, 62.9, 322.2, 65.2, 316.4);
        recordBezierCurveTo(vaulter, ctx, 65.2, 316.4, 68.3, 312.0, 66.5, 307.8);
        recordBezierCurveTo(vaulter, ctx, 64.7, 303.6, 62.4, 292.6, 62.4, 292.6);
        ctx.fill();
        ctx.stroke();

        // vaulter/Path
        ctx.beginPath();
        recordMoveTo(vaulter, ctx, 51.1, 278.2);
        recordBezierCurveTo(vaulter, ctx, 51.1, 278.2, 57.3, 278.0, 57.0, 270.1);
        recordBezierCurveTo(vaulter, ctx, 56.7, 262.2, 53.2, 260.1, 51.1, 260.3);
        recordBezierCurveTo(vaulter, ctx, 49.0, 260.4, 46.2, 264.7, 47.1, 269.9);
        recordBezierCurveTo(vaulter, ctx, 48.1, 275.2, 48.5, 276.8, 51.1, 278.2);
        ctx.closePath();
        ctx.fill();
        ctx.stroke();

        // vaulter/Path
        ctx.beginPath();
        recordMoveTo(vaulter, ctx, 53.5, 265.7);
        recordBezierCurveTo(vaulter, ctx, 53.5, 265.7, 55.1, 266.4, 56.3, 267.5);
        recordBezierCurveTo(vaulter, ctx, 58.0, 269.1, 58.7, 271.1, 58.7, 271.1);
        recordBezierCurveTo(vaulter, ctx, 58.7, 271.1, 61.1, 273.2, 62.0, 274.2);
        recordBezierCurveTo(vaulter, ctx, 62.8, 275.3, 64.1, 277.7, 62.6, 278.0);
        recordBezierCurveTo(vaulter, ctx, 60.7, 278.6, 56.9, 276.6, 53.2, 274.4);
        recordBezierCurveTo(vaulter, ctx, 49.4, 272.3, 46.2, 268.7, 46.2, 265.6);
        recordBezierCurveTo(vaulter, ctx, 46.2, 262.4, 50.0, 261.0, 50.0, 261.0);
        ctx.fill();
        ctx.stroke();

        // vaulter/Path
        ctx.beginPath();
        recordMoveTo(vaulter, ctx, 307.8, 297.8);
        recordLineTo(vaulter, ctx, 153.0, 272.1);
        recordBezierCurveTo(vaulter, ctx, 97.0, 263.0, 47.3, 257.7, 46.9, 257.7);
        recordBezierCurveTo(vaulter, ctx, 46.9, 257.7, 45.5, 257.5, 45.7, 256.5);
        recordBezierCurveTo(vaulter, ctx, 45.8, 255.5, 47.1, 255.7, 47.1, 255.7);
        recordBezierCurveTo(vaulter, ctx, 47.5, 255.7, 97.3, 261.0, 153.4, 270.1);
        recordLineTo(vaulter, ctx, 308.2, 295.8);
        recordLineTo(vaulter, ctx, 307.8, 297.8);
        ctx.closePath();
        ctx.fill();
        ctx.stroke();

        // vaulter/Path
        ctx.beginPath();
        recordMoveTo(vaulter, ctx, 61.1, 278.1);
        recordBezierCurveTo(vaulter, ctx, 61.6, 278.3, 62.0, 278.3, 62.6, 278.0);
        recordBezierCurveTo(vaulter, ctx, 65.4, 276.5, 63.1, 267.6, 62.6, 261.0);
        recordBezierCurveTo(vaulter, ctx, 62.5, 260.0, 63.4, 259.6, 64.2, 258.8);
        recordBezierCurveTo(vaulter, ctx, 65.1, 258.0, 64.2, 256.8, 64.2, 256.8);
        recordLineTo(vaulter, ctx, 63.4, 256.8);
        recordBezierCurveTo(vaulter, ctx, 63.4, 256.8, 62.0, 255.7, 61.5, 255.5);
        recordBezierCurveTo(vaulter, ctx, 61.0, 255.3, 59.6, 255.5, 59.5, 255.7);
        recordBezierCurveTo(vaulter, ctx, 59.4, 255.9, 58.5, 255.0, 58.0, 255.1);
        recordBezierCurveTo(vaulter, ctx, 57.5, 255.1, 56.4, 257.7, 56.7, 258.6);
        recordBezierCurveTo(vaulter, ctx, 57.0, 259.4, 58.7, 260.6, 58.7, 260.6);
        recordBezierCurveTo(vaulter, ctx, 58.7, 260.6, 59.5, 265.8, 59.2, 267.9);
        recordBezierCurveTo(vaulter, ctx, 58.9, 269.9, 58.5, 271.3, 58.7, 272.3);
        recordBezierCurveTo(vaulter, ctx, 58.7, 272.7, 58.8, 273.4, 59.0, 274.3);
        ctx.fill();
        ctx.stroke();

        // vaulter/Path
        ctx.beginPath();
        recordMoveTo(vaulter, ctx, 92.4, 261.0);
        recordBezierCurveTo(vaulter, ctx, 91.9, 261.3, 92.4, 262.0, 92.8, 262.2);
        recordBezierCurveTo(vaulter, ctx, 93.3, 262.5, 94.6, 263.1, 95.3, 263.1);
        recordBezierCurveTo(vaulter, ctx, 96.0, 263.1, 98.5, 262.6, 98.2, 262.0);
        recordBezierCurveTo(vaulter, ctx, 98.0, 261.5, 95.4, 260.7, 94.6, 260.6);
        recordBezierCurveTo(vaulter, ctx, 93.8, 260.6, 92.4, 261.0, 92.4, 261.0);
        ctx.closePath();
        ctx.fill();
        ctx.stroke();
        ctx.restore();
      }
    },

    function (ctx) {
      if (vaulter.visible) {

        // vaulter/Path
        ctx.save();
        ctx.beginPath();
        recordMoveTo(vaulter, ctx, 294.7, 336.8);
        recordLineTo(vaulter, ctx, 46.9, 238.2);
        recordBezierCurveTo(vaulter, ctx, 46.9, 238.2, 45.6, 237.8, 46.0, 236.8);
        recordBezierCurveTo(vaulter, ctx, 46.5, 235.8, 47.6, 236.3, 47.6, 236.3);
        recordLineTo(vaulter, ctx, 295.5, 334.9);
        recordLineTo(vaulter, ctx, 294.7, 336.8);
        ctx.closePath();
        ctx.fillStyle = "rgb(17, 92, 137)";
        ctx.fill();
        ctx.lineWidth = 0.5;
        ctx.strokeStyle = "rgb(141, 204, 255)";
        ctx.lineJoin = "miter";
        ctx.miterLimit = 4.0;
        ctx.stroke();

        // vaulter/Path
        ctx.beginPath();
        recordMoveTo(vaulter, ctx, 58.4, 300.6);
        recordBezierCurveTo(vaulter, ctx, 58.4, 300.6, 67.5, 311.0, 76.8, 313.1);
        recordBezierCurveTo(vaulter, ctx, 78.1, 317.4, 78.0, 318.5, 78.8, 320.8);
        recordBezierCurveTo(vaulter, ctx, 79.6, 323.1, 84.8, 327.1, 86.4, 333.2);
        recordLineTo(vaulter, ctx, 87.1, 335.9);
        recordBezierCurveTo(vaulter, ctx, 87.1, 335.9, 87.0, 337.4, 87.1, 338.5);
        recordBezierCurveTo(vaulter, ctx, 87.3, 339.5, 88.6, 340.7, 90.0, 340.6);
        recordBezierCurveTo(vaulter, ctx, 91.3, 340.4, 98.6, 340.1, 100.4, 340.6);
        recordBezierCurveTo(vaulter, ctx, 102.2, 341.0, 103.7, 340.1, 103.9, 339.5);
        recordBezierCurveTo(vaulter, ctx, 104.0, 338.9, 102.2, 336.8, 101.0, 336.8);
        recordBezierCurveTo(vaulter, ctx, 99.8, 336.8, 94.7, 334.7, 93.0, 334.1);
        recordBezierCurveTo(vaulter, ctx, 91.3, 333.5, 90.1, 331.1, 90.1, 331.1);
        recordBezierCurveTo(vaulter, ctx, 90.1, 331.1, 87.9, 320.0, 86.1, 314.3);
        recordBezierCurveTo(vaulter, ctx, 85.6, 312.8, 84.5, 311.4, 84.2, 311.0);
        recordBezierCurveTo(vaulter, ctx, 84.0, 310.6, 82.3, 308.0, 81.6, 307.1);
        recordBezierCurveTo(vaulter, ctx, 79.0, 303.1, 74.2, 296.7, 65.4, 291.4);
        ctx.fill();
        ctx.stroke();

        // vaulter/Path
        ctx.beginPath();
        recordMoveTo(vaulter, ctx, 59.6, 269.9);
        recordBezierCurveTo(vaulter, ctx, 59.6, 269.9, 66.6, 269.5, 68.2, 269.0);
        recordBezierCurveTo(vaulter, ctx, 69.7, 268.6, 75.8, 267.2, 78.4, 265.7);
        recordBezierCurveTo(vaulter, ctx, 80.9, 264.2, 86.8, 258.3, 90.6, 257.0);
        recordLineTo(vaulter, ctx, 93.7, 255.5);
        recordLineTo(vaulter, ctx, 89.4, 254.1);
        recordBezierCurveTo(vaulter, ctx, 89.4, 254.1, 82.9, 257.4, 81.1, 258.5);
        recordBezierCurveTo(vaulter, ctx, 79.4, 259.5, 76.4, 262.0, 76.4, 262.0);
        recordBezierCurveTo(vaulter, ctx, 76.4, 262.0, 66.1, 262.8, 65.0, 262.5);
        recordBezierCurveTo(vaulter, ctx, 63.9, 262.3, 59.9, 262.0, 59.9, 262.0);
        recordBezierCurveTo(vaulter, ctx, 59.9, 262.0, 56.3, 261.5, 54.9, 262.3);
        recordBezierCurveTo(vaulter, ctx, 53.5, 263.2, 52.5, 266.7, 54.2, 268.7);
        recordBezierCurveTo(vaulter, ctx, 55.9, 270.7, 59.6, 269.9, 59.6, 269.9);
        ctx.closePath();
        ctx.fill();
        ctx.stroke();

        // vaulter/Path
        ctx.beginPath();
        recordMoveTo(vaulter, ctx, 60.6, 262.4);
        recordBezierCurveTo(vaulter, ctx, 60.6, 262.4, 63.0, 257.6, 63.0, 256.4);
        recordBezierCurveTo(vaulter, ctx, 63.0, 255.1, 62.5, 250.6, 62.5, 250.6);
        recordBezierCurveTo(vaulter, ctx, 62.5, 250.6, 60.7, 245.4, 55.9, 245.7);
        recordBezierCurveTo(vaulter, ctx, 51.1, 246.0, 49.7, 251.6, 49.8, 254.0);
        recordBezierCurveTo(vaulter, ctx, 50.0, 256.3, 52.5, 261.9, 52.5, 261.9);
        recordBezierCurveTo(vaulter, ctx, 52.5, 261.9, 52.8, 263.5, 51.8, 263.9);
        recordBezierCurveTo(vaulter, ctx, 51.0, 264.3, 50.8, 264.8, 50.8, 264.8);
        recordBezierCurveTo(vaulter, ctx, 49.6, 268.4, 49.7, 270.3, 49.8, 273.4);
        recordBezierCurveTo(vaulter, ctx, 49.9, 276.5, 53.1, 281.0, 53.1, 281.0);
        recordBezierCurveTo(vaulter, ctx, 53.1, 281.0, 57.4, 288.2, 56.3, 291.9);
        recordBezierCurveTo(vaulter, ctx, 54.8, 296.8, 55.6, 302.4, 55.6, 302.4);
        recordLineTo(vaulter, ctx, 49.7, 318.5);
        recordBezierCurveTo(vaulter, ctx, 47.3, 317.6, 38.4, 319.4, 35.8, 320.0);
        recordBezierCurveTo(vaulter, ctx, 33.2, 320.6, 30.7, 318.5, 30.7, 318.5);
        recordBezierCurveTo(vaulter, ctx, 30.7, 318.5, 28.1, 317.5, 27.2, 319.4);
        recordBezierCurveTo(vaulter, ctx, 26.3, 321.4, 21.9, 325.8, 20.7, 327.0);
        recordBezierCurveTo(vaulter, ctx, 19.5, 328.2, 18.1, 330.3, 18.1, 330.8);
        recordBezierCurveTo(vaulter, ctx, 18.1, 331.2, 19.6, 331.2, 20.4, 330.8);
        recordBezierCurveTo(vaulter, ctx, 21.1, 330.3, 22.7, 328.8, 24.9, 328.2);
        recordBezierCurveTo(vaulter, ctx, 27.2, 327.6, 30.4, 325.3, 30.4, 325.3);
        recordBezierCurveTo(vaulter, ctx, 37.6, 324.1, 51.3, 325.3, 53.1, 324.4);
        recordBezierCurveTo(vaulter, ctx, 55.0, 323.5, 64.6, 311.7, 66.9, 303.4);
        recordBezierCurveTo(vaulter, ctx, 69.1, 295.1, 67.8, 282.0, 67.8, 282.0);
        recordBezierCurveTo(vaulter, ctx, 66.8, 271.1, 59.2, 264.0, 59.2, 264.0);
        ctx.fill();
        ctx.stroke();

        // vaulter/Path
        ctx.beginPath();
        recordMoveTo(vaulter, ctx, 55.8, 281.3);
        recordBezierCurveTo(vaulter, ctx, 55.8, 281.3, 62.0, 280.2, 60.5, 272.4);
        recordBezierCurveTo(vaulter, ctx, 59.1, 264.7, 55.4, 263.1, 53.4, 263.5);
        recordBezierCurveTo(vaulter, ctx, 51.3, 263.9, 49.1, 268.5, 50.8, 273.6);
        recordBezierCurveTo(vaulter, ctx, 52.4, 278.7, 53.1, 280.2, 55.8, 281.3);
        ctx.closePath();
        ctx.fill();
        ctx.stroke();

        // vaulter/Path
        ctx.beginPath();
        recordMoveTo(vaulter, ctx, 49.8, 268.5);
        recordBezierCurveTo(vaulter, ctx, 49.8, 268.5, 50.3, 266.3, 51.3, 265.2);
        recordBezierCurveTo(vaulter, ctx, 52.3, 264.0, 53.8, 263.4, 54.9, 263.4);
        recordLineTo(vaulter, ctx, 60.4, 258.4);
        recordBezierCurveTo(vaulter, ctx, 60.4, 258.4, 60.7, 254.5, 61.2, 253.8);
        recordBezierCurveTo(vaulter, ctx, 61.7, 253.1, 61.2, 248.6, 61.2, 248.6);
        recordBezierCurveTo(vaulter, ctx, 61.2, 248.6, 59.0, 245.8, 58.9, 244.7);
        recordBezierCurveTo(vaulter, ctx, 58.8, 243.6, 59.1, 240.8, 59.7, 240.3);
        recordBezierCurveTo(vaulter, ctx, 60.3, 239.8, 62.1, 240.3, 62.1, 240.3);
        recordBezierCurveTo(vaulter, ctx, 62.1, 240.3, 64.1, 242.7, 64.4, 244.1);
        recordBezierCurveTo(vaulter, ctx, 64.7, 245.5, 64.4, 249.2, 64.4, 249.2);
        recordLineTo(vaulter, ctx, 64.5, 256.7);
        recordBezierCurveTo(vaulter, ctx, 64.5, 256.7, 65.5, 260.0, 64.5, 261.4);
        recordBezierCurveTo(vaulter, ctx, 63.6, 262.8, 58.4, 268.0, 58.4, 268.0);
        recordBezierCurveTo(vaulter, ctx, 58.4, 268.0, 58.3, 269.9, 56.9, 271.0);
        ctx.fill();
        ctx.stroke();
        ctx.restore();
      }
    },

    function (ctx) {
      if (vaulter.visible) {

        // vaulter/Path
        ctx.save();
        ctx.beginPath();
        recordMoveTo(vaulter, ctx, 75.1, 287.9);
        recordBezierCurveTo(vaulter, ctx, 76.2, 292.0, 82.3, 303.8, 84.4, 305.6);
        recordBezierCurveTo(vaulter, ctx, 86.4, 307.4, 86.6, 311.4, 86.6, 311.4);
        recordBezierCurveTo(vaulter, ctx, 86.4, 315.0, 89.8, 329.5, 90.0, 330.9);
        recordBezierCurveTo(vaulter, ctx, 90.2, 332.3, 91.2, 336.0, 91.2, 336.0);
        recordBezierCurveTo(vaulter, ctx, 92.8, 335.6, 96.9, 338.6, 99.6, 338.8);
        recordBezierCurveTo(vaulter, ctx, 100.7, 338.8, 101.3, 341.1, 100.0, 341.2);
        recordBezierCurveTo(vaulter, ctx, 100.0, 341.2, 91.2, 342.2, 90.0, 342.2);
        recordBezierCurveTo(vaulter, ctx, 88.8, 342.2, 86.6, 341.2, 86.4, 340.0);
        recordBezierCurveTo(vaulter, ctx, 86.2, 338.8, 87.2, 336.6, 87.2, 336.6);
        recordBezierCurveTo(vaulter, ctx, 86.2, 333.3, 82.5, 324.9, 81.3, 322.9);
        recordBezierCurveTo(vaulter, ctx, 80.1, 320.9, 80.1, 312.8, 80.1, 312.8);
        recordBezierCurveTo(vaulter, ctx, 71.1, 306.4, 66.7, 297.3, 66.7, 297.3);
        recordBezierCurveTo(vaulter, ctx, 65.6, 293.2, 68.0, 289.6, 69.0, 287.9);
        recordBezierCurveTo(vaulter, ctx, 70.0, 286.2, 74.5, 285.8, 75.1, 287.9);
        ctx.closePath();
        ctx.fillStyle = "rgb(17, 92, 137)";
        ctx.fill();
        ctx.lineWidth = 0.5;
        ctx.strokeStyle = "rgb(141, 204, 255)";
        ctx.lineJoin = "miter";
        ctx.miterLimit = 4.0;
        ctx.stroke();

        // vaulter/Path
        ctx.beginPath();
        recordMoveTo(vaulter, ctx, 69.9, 263.0);
        recordLineTo(vaulter, ctx, 79.8, 261.0);
        recordBezierCurveTo(vaulter, ctx, 79.8, 261.0, 81.8, 260.8, 83.0, 260.1);
        recordBezierCurveTo(vaulter, ctx, 84.3, 259.4, 85.4, 258.2, 86.5, 257.0);
        recordBezierCurveTo(vaulter, ctx, 89.1, 254.2, 91.0, 250.1, 92.6, 249.3);
        recordBezierCurveTo(vaulter, ctx, 94.2, 248.6, 97.5, 247.1, 97.5, 247.1);
        recordBezierCurveTo(vaulter, ctx, 97.5, 247.1, 97.5, 246.4, 96.0, 245.2);
        recordBezierCurveTo(vaulter, ctx, 94.5, 244.0, 93.7, 243.9, 93.7, 243.9);
        recordBezierCurveTo(vaulter, ctx, 93.7, 243.9, 91.2, 246.7, 90.4, 247.3);
        recordBezierCurveTo(vaulter, ctx, 89.6, 248.0, 84.0, 252.2, 81.9, 255.2);
        recordLineTo(vaulter, ctx, 68.5, 256.3);
        recordBezierCurveTo(vaulter, ctx, 66.6, 256.6, 64.2, 258.2, 64.4, 260.0);
        recordBezierCurveTo(vaulter, ctx, 64.5, 261.9, 66.3, 264.2, 69.9, 263.0);
        ctx.closePath();
        ctx.fill();
        ctx.stroke();

        // vaulter/Path
        ctx.beginPath();
        recordMoveTo(vaulter, ctx, 292.7, 342.2);
        recordLineTo(vaulter, ctx, 55.7, 226.5);
        recordBezierCurveTo(vaulter, ctx, 55.7, 226.5, 54.7, 226.0, 55.1, 225.1);
        recordBezierCurveTo(vaulter, ctx, 55.6, 224.3, 56.6, 224.7, 56.6, 224.7);
        recordLineTo(vaulter, ctx, 293.6, 340.4);
        recordLineTo(vaulter, ctx, 292.7, 342.2);
        ctx.closePath();
        ctx.fill();
        ctx.stroke();

        // vaulter/Path
        ctx.beginPath();
        recordMoveTo(vaulter, ctx, 69.1, 258.4);
        recordBezierCurveTo(vaulter, ctx, 69.1, 258.4, 71.6, 253.6, 71.6, 252.4);
        recordBezierCurveTo(vaulter, ctx, 71.6, 251.2, 71.1, 246.6, 71.1, 246.6);
        recordBezierCurveTo(vaulter, ctx, 71.1, 246.6, 69.3, 241.4, 64.5, 241.7);
        recordBezierCurveTo(vaulter, ctx, 59.7, 242.0, 58.3, 247.7, 58.4, 250.0);
        recordBezierCurveTo(vaulter, ctx, 58.6, 252.3, 61.0, 257.9, 61.0, 257.9);
        recordBezierCurveTo(vaulter, ctx, 61.0, 257.9, 61.3, 259.0, 60.8, 259.6);
        ctx.fill();
        ctx.stroke();

        // vaulter/Path
        ctx.beginPath();
        recordMoveTo(vaulter, ctx, 75.1, 287.9);
        recordBezierCurveTo(vaulter, ctx, 74.5, 283.6, 72.9, 263.1, 72.9, 263.1);
        recordBezierCurveTo(vaulter, ctx, 72.9, 263.1, 68.2, 255.7, 60.8, 259.3);
        recordBezierCurveTo(vaulter, ctx, 59.6, 259.9, 58.0, 261.9, 58.4, 266.5);
        recordBezierCurveTo(vaulter, ctx, 58.8, 271.2, 61.8, 274.4, 62.4, 277.2);
        recordBezierCurveTo(vaulter, ctx, 63.0, 280.0, 62.8, 288.7, 62.8, 293.1);
        recordBezierCurveTo(vaulter, ctx, 62.8, 293.1, 66.8, 298.4, 70.9, 297.8);
        recordBezierCurveTo(vaulter, ctx, 74.9, 297.2, 75.1, 287.9, 75.1, 287.9);
        ctx.closePath();
        ctx.fill();
        ctx.stroke();

        // vaulter/Path
        ctx.beginPath();
        recordMoveTo(vaulter, ctx, 95.3, 242.7);
        recordLineTo(vaulter, ctx, 95.3, 243.9);
        recordBezierCurveTo(vaulter, ctx, 95.3, 243.9, 96.0, 245.6, 96.9, 246.0);
        recordBezierCurveTo(vaulter, ctx, 97.7, 246.4, 98.6, 246.0, 98.8, 245.9);
        recordBezierCurveTo(vaulter, ctx, 99.1, 245.8, 99.7, 244.3, 99.7, 244.3);
        recordLineTo(vaulter, ctx, 98.5, 243.5);
        recordLineTo(vaulter, ctx, 98.1, 242.4);
        recordLineTo(vaulter, ctx, 96.7, 242.1);
        recordLineTo(vaulter, ctx, 95.3, 242.7);
        ctx.closePath();
        ctx.fill();
        ctx.stroke();

        // vaulter/Path
        ctx.beginPath();
        recordMoveTo(vaulter, ctx, 75.1, 289.9);
        recordBezierCurveTo(vaulter, ctx, 75.1, 289.9, 74.7, 316.7, 73.7, 319.1);
        recordBezierCurveTo(vaulter, ctx, 72.7, 321.5, 68.6, 321.5, 66.4, 321.5);
        recordBezierCurveTo(vaulter, ctx, 64.2, 321.5, 57.8, 317.5, 55.0, 316.7);
        recordBezierCurveTo(vaulter, ctx, 52.1, 315.8, 47.1, 314.4, 45.9, 314.4);
        recordBezierCurveTo(vaulter, ctx, 45.9, 314.4, 40.3, 313.8, 38.5, 313.8);
        recordBezierCurveTo(vaulter, ctx, 36.6, 313.8, 33.4, 315.2, 32.6, 314.6);
        recordBezierCurveTo(vaulter, ctx, 31.8, 314.0, 33.2, 312.2, 34.0, 311.8);
        recordBezierCurveTo(vaulter, ctx, 34.8, 311.4, 42.9, 309.2, 43.3, 308.4);
        recordBezierCurveTo(vaulter, ctx, 43.7, 307.6, 49.1, 305.0, 49.9, 305.7);
        recordBezierCurveTo(vaulter, ctx, 50.7, 306.4, 51.9, 308.0, 51.7, 309.6);
        recordBezierCurveTo(vaulter, ctx, 51.5, 311.2, 60.0, 312.8, 60.0, 312.8);
        recordBezierCurveTo(vaulter, ctx, 60.0, 312.8, 65.4, 312.2, 66.4, 312.6);
        recordBezierCurveTo(vaulter, ctx, 66.4, 312.6, 62.8, 297.5, 62.8, 293.1);
        ctx.fill();
        ctx.stroke();

        // vaulter/Path
        ctx.beginPath();
        recordMoveTo(vaulter, ctx, 64.4, 277.3);
        recordBezierCurveTo(vaulter, ctx, 64.4, 277.3, 70.5, 276.2, 69.1, 268.5);
        recordBezierCurveTo(vaulter, ctx, 67.7, 260.7, 64.0, 259.1, 62.0, 259.5);
        recordBezierCurveTo(vaulter, ctx, 59.9, 260.0, 57.7, 264.5, 59.4, 269.6);
        recordBezierCurveTo(vaulter, ctx, 61.0, 274.7, 61.7, 276.2, 64.4, 277.3);
        ctx.closePath();
        ctx.fill();
        ctx.stroke();

        // vaulter/Path
        ctx.beginPath();
        recordMoveTo(vaulter, ctx, 59.5, 267.2);
        recordBezierCurveTo(vaulter, ctx, 59.5, 267.2, 58.1, 262.9, 61.3, 258.5);
        recordBezierCurveTo(vaulter, ctx, 64.5, 254.1, 66.7, 250.2, 66.7, 250.2);
        recordBezierCurveTo(vaulter, ctx, 66.7, 250.2, 67.4, 238.9, 66.7, 236.5);
        recordBezierCurveTo(vaulter, ctx, 66.0, 234.0, 65.1, 230.3, 65.7, 229.1);
        recordBezierCurveTo(vaulter, ctx, 66.3, 227.9, 66.9, 228.9, 67.6, 228.9);
        recordBezierCurveTo(vaulter, ctx, 68.2, 228.9, 70.8, 230.1, 71.3, 231.2);
        recordBezierCurveTo(vaulter, ctx, 71.7, 232.2, 72.0, 234.3, 71.3, 235.7);
        recordBezierCurveTo(vaulter, ctx, 70.5, 237.1, 70.8, 242.3, 71.2, 243.9);
        recordBezierCurveTo(vaulter, ctx, 71.5, 245.3, 72.9, 248.7, 72.4, 250.8);
        recordBezierCurveTo(vaulter, ctx, 71.9, 252.6, 66.7, 265.2, 66.7, 265.2);
        ctx.fill();
        ctx.stroke();
        ctx.restore();
      }
    },

    function (ctx) {
      if (vaulter.visible) {

        // vaulter/Path
        ctx.save();
        ctx.beginPath();
        recordMoveTo(vaulter, ctx, 74.5, 256.4);
        recordLineTo(vaulter, ctx, 83.9, 252.8);
        recordBezierCurveTo(vaulter, ctx, 83.9, 252.8, 85.8, 252.3, 86.9, 251.3);
        recordBezierCurveTo(vaulter, ctx, 88.0, 250.4, 89.0, 249.0, 89.8, 247.7);
        recordBezierCurveTo(vaulter, ctx, 91.9, 244.5, 93.0, 240.1, 94.5, 239.1);
        recordBezierCurveTo(vaulter, ctx, 95.9, 238.1, 99.0, 236.1, 99.0, 236.1);
        recordBezierCurveTo(vaulter, ctx, 99.0, 236.1, 98.8, 235.4, 97.2, 234.5);
        recordBezierCurveTo(vaulter, ctx, 95.5, 233.5, 94.6, 233.6, 94.6, 233.6);
        recordBezierCurveTo(vaulter, ctx, 94.6, 233.6, 92.7, 236.8, 92.0, 237.5);
        recordBezierCurveTo(vaulter, ctx, 91.3, 238.3, 86.6, 243.4, 85.0, 246.7);
        recordLineTo(vaulter, ctx, 72.0, 250.1);
        recordBezierCurveTo(vaulter, ctx, 70.1, 250.7, 68.0, 252.7, 68.5, 254.5);
        recordBezierCurveTo(vaulter, ctx, 69.0, 256.3, 71.1, 258.2, 74.5, 256.4);
        ctx.closePath();
        ctx.fillStyle = "rgb(17, 92, 137)";
        ctx.fill();
        ctx.lineWidth = 0.5;
        ctx.strokeStyle = "rgb(141, 204, 255)";
        ctx.lineJoin = "miter";
        ctx.miterLimit = 4.0;
        ctx.stroke();

        // vaulter/Path
        ctx.beginPath();
        recordMoveTo(vaulter, ctx, 67.4, 285.3);
        recordBezierCurveTo(vaulter, ctx, 67.4, 285.3, 66.8, 287.5, 67.4, 290.5);
        recordBezierCurveTo(vaulter, ctx, 68.4, 294.9, 71.4, 301.0, 75.8, 306.1);
        recordBezierCurveTo(vaulter, ctx, 75.8, 306.1, 73.9, 311.3, 73.9, 314.6);
        recordBezierCurveTo(vaulter, ctx, 73.9, 317.8, 74.4, 327.8, 74.1, 329.3);
        recordBezierCurveTo(vaulter, ctx, 74.1, 330.4, 73.5, 330.5, 73.3, 331.7);
        recordBezierCurveTo(vaulter, ctx, 73.1, 332.8, 74.3, 333.7, 75.8, 333.7);
        recordBezierCurveTo(vaulter, ctx, 77.3, 333.7, 81.8, 338.5, 81.8, 338.5);
        recordBezierCurveTo(vaulter, ctx, 81.8, 338.5, 84.1, 339.9, 84.6, 339.0);
        recordBezierCurveTo(vaulter, ctx, 85.3, 337.5, 83.0, 337.6, 82.2, 335.8);
        recordBezierCurveTo(vaulter, ctx, 80.6, 332.5, 79.6, 331.1, 77.9, 329.6);
        recordBezierCurveTo(vaulter, ctx, 77.9, 329.6, 82.8, 308.1, 82.6, 305.7);
        recordBezierCurveTo(vaulter, ctx, 82.4, 303.3, 81.3, 289.6, 78.8, 284.4);
        ctx.fill();
        ctx.stroke();

        // vaulter/Path
        ctx.beginPath();
        recordMoveTo(vaulter, ctx, 293.0, 343.0);
        recordLineTo(vaulter, ctx, 61.8, 216.3);
        recordBezierCurveTo(vaulter, ctx, 61.8, 216.3, 60.8, 215.8, 61.3, 214.9);
        recordBezierCurveTo(vaulter, ctx, 61.8, 214.1, 62.8, 214.6, 62.8, 214.6);
        recordLineTo(vaulter, ctx, 294.0, 341.2);
        recordLineTo(vaulter, ctx, 293.0, 343.0);
        ctx.closePath();
        ctx.fill();
        ctx.stroke();

        // vaulter/Path
        ctx.beginPath();
        recordMoveTo(vaulter, ctx, 75.2, 250.4);
        recordBezierCurveTo(vaulter, ctx, 75.2, 250.4, 77.7, 245.6, 77.7, 244.4);
        recordBezierCurveTo(vaulter, ctx, 77.7, 243.2, 77.1, 238.6, 77.1, 238.6);
        recordBezierCurveTo(vaulter, ctx, 77.1, 238.6, 75.3, 233.4, 70.5, 233.7);
        recordBezierCurveTo(vaulter, ctx, 65.7, 234.0, 64.3, 239.7, 64.5, 242.0);
        recordBezierCurveTo(vaulter, ctx, 64.6, 244.3, 67.1, 249.9, 67.1, 249.9);
        recordBezierCurveTo(vaulter, ctx, 67.1, 249.9, 67.7, 252.5, 65.3, 251.9);
        ctx.fill();
        ctx.stroke();

        // vaulter/Path
        ctx.beginPath();
        recordMoveTo(vaulter, ctx, 79.0, 281.8);
        recordBezierCurveTo(vaulter, ctx, 78.4, 277.5, 76.8, 257.0, 76.8, 257.0);
        recordBezierCurveTo(vaulter, ctx, 76.8, 257.0, 72.2, 249.6, 64.7, 253.2);
        recordBezierCurveTo(vaulter, ctx, 63.6, 253.7, 61.9, 255.8, 62.3, 260.4);
        recordBezierCurveTo(vaulter, ctx, 62.7, 265.1, 65.7, 268.3, 66.3, 271.1);
        recordBezierCurveTo(vaulter, ctx, 66.9, 273.9, 66.7, 282.6, 66.7, 287.0);
        recordBezierCurveTo(vaulter, ctx, 66.7, 287.0, 70.7, 292.3, 74.8, 291.7);
        recordBezierCurveTo(vaulter, ctx, 78.8, 291.1, 79.0, 281.8, 79.0, 281.8);
        ctx.closePath();
        ctx.fill();
        ctx.stroke();

        // vaulter/Path
        ctx.beginPath();
        recordMoveTo(vaulter, ctx, 77.8, 282.3);
        recordBezierCurveTo(vaulter, ctx, 77.8, 282.3, 86.5, 301.7, 86.7, 302.9);
        recordBezierCurveTo(vaulter, ctx, 87.0, 304.3, 89.1, 308.8, 86.0, 311.4);
        recordBezierCurveTo(vaulter, ctx, 83.3, 313.7, 77.2, 311.8, 75.7, 310.2);
        recordBezierCurveTo(vaulter, ctx, 74.2, 308.5, 66.5, 303.8, 64.5, 303.3);
        recordBezierCurveTo(vaulter, ctx, 62.4, 302.9, 54.2, 302.9, 52.5, 303.0);
        recordBezierCurveTo(vaulter, ctx, 50.9, 303.2, 48.4, 303.3, 47.8, 302.4);
        recordBezierCurveTo(vaulter, ctx, 47.2, 301.5, 50.2, 300.4, 51.1, 300.3);
        recordBezierCurveTo(vaulter, ctx, 51.9, 300.1, 55.1, 298.8, 56.6, 297.4);
        recordBezierCurveTo(vaulter, ctx, 58.1, 296.1, 61.0, 296.7, 61.4, 297.1);
        recordBezierCurveTo(vaulter, ctx, 61.9, 297.6, 63.1, 299.1, 64.5, 299.4);
        recordBezierCurveTo(vaulter, ctx, 65.6, 299.7, 73.2, 301.8, 77.1, 303.5);
        recordBezierCurveTo(vaulter, ctx, 70.0, 296.9, 69.0, 295.2, 67.4, 290.5);
        recordBezierCurveTo(vaulter, ctx, 65.9, 285.8, 67.4, 283.6, 67.4, 283.6);
        ctx.fill();
        ctx.stroke();

        // vaulter/Path
        ctx.beginPath();
        recordMoveTo(vaulter, ctx, 68.4, 269.3);
        recordBezierCurveTo(vaulter, ctx, 68.4, 269.3, 74.5, 268.2, 73.1, 260.5);
        recordBezierCurveTo(vaulter, ctx, 71.7, 252.7, 67.9, 251.1, 65.9, 251.5);
        recordBezierCurveTo(vaulter, ctx, 63.9, 252.0, 61.7, 256.5, 63.3, 261.6);
        recordBezierCurveTo(vaulter, ctx, 64.9, 266.7, 65.6, 268.2, 68.4, 269.3);
        ctx.closePath();
        ctx.fill();
        ctx.stroke();

        // vaulter/Path
        ctx.beginPath();
        recordMoveTo(vaulter, ctx, 63.9, 261.5);
        recordBezierCurveTo(vaulter, ctx, 63.9, 261.5, 62.1, 257.3, 64.9, 252.6);
        recordBezierCurveTo(vaulter, ctx, 67.6, 248.0, 69.9, 238.4, 69.9, 238.4);
        recordBezierCurveTo(vaulter, ctx, 69.9, 238.4, 70.6, 227.1, 69.5, 224.8);
        recordBezierCurveTo(vaulter, ctx, 68.5, 222.5, 67.1, 218.9, 67.5, 217.6);
        recordBezierCurveTo(vaulter, ctx, 68.0, 216.3, 68.7, 217.3, 69.4, 217.2);
        recordBezierCurveTo(vaulter, ctx, 70.0, 217.1, 72.7, 218.0, 73.3, 218.9);
        recordBezierCurveTo(vaulter, ctx, 73.9, 219.9, 74.5, 222.0, 73.9, 223.4);
        recordBezierCurveTo(vaulter, ctx, 73.4, 224.9, 74.4, 230.0, 74.9, 231.6);
        recordBezierCurveTo(vaulter, ctx, 75.4, 232.9, 75.9, 236.1, 75.6, 238.3);
        recordBezierCurveTo(vaulter, ctx, 75.4, 240.1, 71.2, 257.8, 71.2, 257.8);
        ctx.fill();
        ctx.stroke();
        ctx.restore();
      }
    },

    function (ctx) {
      if (vaulter.visible) {

        // vaulter/Path
        ctx.save();
        ctx.beginPath();
        recordMoveTo(vaulter, ctx, 141.9, 238.7);
        recordLineTo(vaulter, ctx, 141.9, 229.3);
        recordLineTo(vaulter, ctx, 141.9, 219.7);
        recordBezierCurveTo(vaulter, ctx, 141.9, 219.7, 141.0, 216.6, 141.9, 215.6);
        recordBezierCurveTo(vaulter, ctx, 142.8, 214.5, 142.8, 212.4, 142.8, 212.4);
        recordLineTo(vaulter, ctx, 139.0, 211.4);
        recordLineTo(vaulter, ctx, 135.2, 211.4);
        recordBezierCurveTo(vaulter, ctx, 135.2, 211.4, 134.7, 212.6, 134.8, 213.0);
        recordBezierCurveTo(vaulter, ctx, 134.9, 213.5, 137.6, 214.7, 137.6, 214.7);
        recordBezierCurveTo(vaulter, ctx, 137.6, 214.7, 138.5, 215.7, 137.6, 219.7);
        recordLineTo(vaulter, ctx, 135.2, 230.1);
        recordLineTo(vaulter, ctx, 134.8, 238.5);
        ctx.fillStyle = "rgb(17, 92, 137)";
        ctx.fill();
        ctx.lineWidth = 0.5;
        ctx.strokeStyle = "rgb(141, 204, 255)";
        ctx.lineJoin = "miter";
        ctx.miterLimit = 4.0;
        ctx.stroke();

        // vaulter/Path
        ctx.beginPath();
        recordMoveTo(vaulter, ctx, 291.8, 342.2);
        recordBezierCurveTo(vaulter, ctx, 287.4, 319.2, 283.6, 306.3, 273.1, 289.8);
        recordBezierCurveTo(vaulter, ctx, 263.5, 274.7, 245.7, 253.3, 215.2, 237.1);
        recordBezierCurveTo(vaulter, ctx, 184.8, 220.9, 153.3, 215.0, 132.2, 212.9);
        recordBezierCurveTo(vaulter, ctx, 109.3, 210.6, 93.4, 212.2, 93.3, 212.2);
        recordBezierCurveTo(vaulter, ctx, 93.3, 212.2, 92.4, 212.1, 92.3, 211.3);
        recordBezierCurveTo(vaulter, ctx, 92.3, 210.5, 93.0, 210.2, 93.0, 210.2);
        recordBezierCurveTo(vaulter, ctx, 93.2, 210.2, 109.2, 208.6, 132.4, 210.9);
        recordBezierCurveTo(vaulter, ctx, 153.7, 213.0, 185.5, 219.0, 216.2, 235.3);
        recordBezierCurveTo(vaulter, ctx, 247.0, 251.8, 265.1, 273.4, 274.8, 288.7);
        recordBezierCurveTo(vaulter, ctx, 285.5, 305.5, 289.3, 318.5, 293.7, 341.9);
        recordLineTo(vaulter, ctx, 291.8, 342.2);
        ctx.closePath();
        ctx.fill();
        ctx.stroke();

        // vaulter/Path
        ctx.beginPath();
        recordMoveTo(vaulter, ctx, 135.4, 265.8);
        recordBezierCurveTo(vaulter, ctx, 135.4, 263.9, 136.1, 261.2, 138.1, 259.1);
        recordBezierCurveTo(vaulter, ctx, 138.1, 259.1, 137.5, 253.1, 136.2, 250.8);
        recordBezierCurveTo(vaulter, ctx, 135.0, 248.5, 129.4, 241.4, 129.7, 238.6);
        recordBezierCurveTo(vaulter, ctx, 129.9, 235.8, 132.2, 233.7, 133.3, 233.1);
        recordBezierCurveTo(vaulter, ctx, 134.4, 232.5, 138.1, 232.6, 138.1, 232.6);
        recordBezierCurveTo(vaulter, ctx, 138.1, 232.6, 150.6, 243.0, 148.3, 258.3);
        recordBezierCurveTo(vaulter, ctx, 146.0, 273.7, 135.4, 286.7, 133.9, 288.8);
        recordBezierCurveTo(vaulter, ctx, 132.5, 290.9, 123.5, 293.3, 120.8, 294.1);
        recordBezierCurveTo(vaulter, ctx, 118.1, 295.0, 113.0, 299.7, 112.0, 300.8);
        recordBezierCurveTo(vaulter, ctx, 111.0, 301.9, 109.4, 306.4, 109.0, 307.8);
        recordBezierCurveTo(vaulter, ctx, 108.5, 309.1, 107.1, 311.9, 106.0, 311.9);
        recordBezierCurveTo(vaulter, ctx, 104.9, 311.9, 104.3, 310.8, 104.3, 310.8);
        recordLineTo(vaulter, ctx, 106.8, 296.0);
        recordBezierCurveTo(vaulter, ctx, 106.8, 296.0, 107.9, 294.8, 108.8, 295.0);
        recordBezierCurveTo(vaulter, ctx, 109.8, 295.2, 111.3, 295.2, 112.9, 294.1);
        recordBezierCurveTo(vaulter, ctx, 114.4, 293.0, 123.0, 285.1, 125.9, 283.8);
        recordBezierCurveTo(vaulter, ctx, 128.8, 282.5, 129.3, 283.2, 129.3, 283.2);
        recordBezierCurveTo(vaulter, ctx, 129.3, 283.2, 133.9, 269.4, 135.4, 265.8);
        ctx.closePath();
        ctx.fill();
        ctx.stroke();

        // vaulter/Path
        ctx.beginPath();
        recordMoveTo(vaulter, ctx, 136.2, 250.8);
        recordBezierCurveTo(vaulter, ctx, 136.5, 251.2, 136.7, 251.7, 136.8, 252.3);
        recordBezierCurveTo(vaulter, ctx, 137.2, 252.4, 137.5, 252.5, 137.9, 252.5);
        recordBezierCurveTo(vaulter, ctx, 137.9, 252.5, 144.7, 249.2, 141.3, 242.0);
        recordBezierCurveTo(vaulter, ctx, 137.9, 234.9, 132.7, 235.1, 130.9, 236.0);
        recordBezierCurveTo(vaulter, ctx, 130.6, 236.1, 130.4, 236.3, 130.2, 236.6);
        recordBezierCurveTo(vaulter, ctx, 129.9, 237.2, 129.7, 237.9, 129.7, 238.6);
        recordBezierCurveTo(vaulter, ctx, 129.4, 241.4, 135.0, 248.5, 136.2, 250.8);
        ctx.closePath();
        ctx.fill();
        ctx.stroke();

        // vaulter/Path
        ctx.beginPath();
        recordMoveTo(vaulter, ctx, 136.6, 267.0);
        recordBezierCurveTo(vaulter, ctx, 136.6, 267.0, 137.2, 270.9, 141.7, 272.3);
        recordBezierCurveTo(vaulter, ctx, 146.2, 273.7, 156.3, 273.6, 158.3, 274.3);
        recordBezierCurveTo(vaulter, ctx, 158.3, 274.3, 156.6, 277.2, 156.3, 280.6);
        recordBezierCurveTo(vaulter, ctx, 156.1, 284.0, 151.1, 292.1, 151.1, 292.1);
        recordBezierCurveTo(vaulter, ctx, 151.1, 292.1, 149.6, 292.8, 149.4, 293.3);
        recordBezierCurveTo(vaulter, ctx, 149.1, 293.8, 148.3, 296.2, 149.9, 296.9);
        recordBezierCurveTo(vaulter, ctx, 151.5, 297.7, 156.6, 301.3, 157.4, 302.0);
        recordBezierCurveTo(vaulter, ctx, 158.3, 302.8, 160.4, 303.9, 160.9, 303.4);
        recordBezierCurveTo(vaulter, ctx, 161.5, 302.9, 159.8, 300.2, 158.8, 299.4);
        recordBezierCurveTo(vaulter, ctx, 158.0, 298.7, 155.3, 294.5, 155.2, 294.1);
        recordBezierCurveTo(vaulter, ctx, 155.0, 293.7, 157.2, 288.9, 159.0, 287.3);
        recordBezierCurveTo(vaulter, ctx, 160.8, 285.7, 167.7, 275.5, 168.1, 274.5);
        recordBezierCurveTo(vaulter, ctx, 168.5, 273.5, 168.1, 271.7, 166.4, 270.4);
        recordBezierCurveTo(vaulter, ctx, 164.8, 269.2, 161.9, 267.0, 161.9, 267.0);
        recordBezierCurveTo(vaulter, ctx, 161.9, 267.0, 150.3, 261.3, 148.6, 260.7);
        recordBezierCurveTo(vaulter, ctx, 147.4, 260.3, 146.8, 259.2, 146.8, 259.2);
        ctx.fill();
        ctx.stroke();

        // vaulter/Path
        ctx.beginPath();
        recordMoveTo(vaulter, ctx, 141.0, 233.6);
        recordBezierCurveTo(vaulter, ctx, 141.0, 233.6, 143.5, 228.8, 143.5, 227.6);
        recordBezierCurveTo(vaulter, ctx, 143.5, 226.4, 142.9, 221.8, 142.9, 221.8);
        recordBezierCurveTo(vaulter, ctx, 142.9, 221.8, 141.1, 216.6, 136.3, 216.9);
        recordBezierCurveTo(vaulter, ctx, 131.5, 217.2, 130.1, 222.9, 130.3, 225.2);
        recordBezierCurveTo(vaulter, ctx, 130.4, 227.5, 132.9, 233.1, 132.9, 233.1);
        recordBezierCurveTo(vaulter, ctx, 132.9, 233.1, 133.4, 235.7, 131.1, 235.1);
        ctx.fill();
        ctx.stroke();

        // vaulter/Path
        ctx.beginPath();
        recordMoveTo(vaulter, ctx, 130.6, 240.6);
        recordBezierCurveTo(vaulter, ctx, 130.6, 240.6, 127.2, 236.7, 124.5, 231.8);
        recordBezierCurveTo(vaulter, ctx, 121.8, 226.9, 120.1, 226.1, 120.1, 226.1);
        recordBezierCurveTo(vaulter, ctx, 116.7, 224.0, 106.5, 216.3, 106.5, 216.3);
        recordLineTo(vaulter, ctx, 102.8, 211.1);
        recordLineTo(vaulter, ctx, 108.1, 210.1);
        recordLineTo(vaulter, ctx, 109.6, 214.7);
        recordBezierCurveTo(vaulter, ctx, 109.6, 214.7, 116.7, 219.7, 119.9, 220.6);
        recordBezierCurveTo(vaulter, ctx, 123.1, 221.5, 128.1, 227.9, 128.1, 227.9);
        recordBezierCurveTo(vaulter, ctx, 128.1, 227.9, 134.7, 236.4, 135.9, 236.8);
        ctx.fill();
        ctx.stroke();
        ctx.restore();
      }
    },

    function (ctx) {
      if (vaulter.visible) {

        // vaulter/Path
        ctx.save();
        ctx.beginPath();
        recordMoveTo(vaulter, ctx, 293.8, 342.2);
        recordLineTo(vaulter, ctx, 291.8, 342.2);
        recordBezierCurveTo(vaulter, ctx, 291.8, 332.6, 288.9, 313.1, 281.7, 293.0);
        recordBezierCurveTo(vaulter, ctx, 273.2, 269.2, 255.8, 249.0, 227.0, 229.7);
        recordBezierCurveTo(vaulter, ctx, 195.8, 208.8, 163.4, 204.2, 141.8, 204.0);
        recordBezierCurveTo(vaulter, ctx, 118.4, 203.7, 102.1, 208.5, 101.9, 208.6);
        recordBezierCurveTo(vaulter, ctx, 101.9, 208.6, 101.0, 208.6, 100.8, 207.8);
        recordBezierCurveTo(vaulter, ctx, 100.5, 206.9, 101.4, 206.6, 101.4, 206.6);
        recordBezierCurveTo(vaulter, ctx, 101.5, 206.6, 118.1, 201.7, 141.8, 202.0);
        recordBezierCurveTo(vaulter, ctx, 163.7, 202.2, 196.5, 206.9, 228.1, 228.0);
        recordBezierCurveTo(vaulter, ctx, 257.3, 247.6, 275.0, 268.1, 283.6, 292.3);
        recordBezierCurveTo(vaulter, ctx, 290.8, 312.6, 293.8, 332.5, 293.8, 342.2);
        ctx.closePath();
        ctx.fillStyle = "rgb(17, 92, 137)";
        ctx.fill();
        ctx.lineWidth = 0.5;
        ctx.strokeStyle = "rgb(141, 204, 255)";
        ctx.lineJoin = "miter";
        ctx.miterLimit = 4.0;
        ctx.stroke();

        // vaulter/Path
        ctx.beginPath();
        recordMoveTo(vaulter, ctx, 152.1, 228.2);
        recordBezierCurveTo(vaulter, ctx, 152.1, 228.2, 153.4, 222.9, 153.0, 221.4);
        recordLineTo(vaulter, ctx, 154.2, 214.3);
        recordBezierCurveTo(vaulter, ctx, 154.2, 214.3, 152.5, 210.2, 152.1, 209.3);
        recordBezierCurveTo(vaulter, ctx, 151.6, 208.4, 148.7, 205.7, 149.2, 204.9);
        recordBezierCurveTo(vaulter, ctx, 149.7, 204.2, 149.9, 201.3, 149.1, 201.2);
        recordBezierCurveTo(vaulter, ctx, 148.4, 201.0, 145.7, 200.6, 145.7, 200.6);
        recordLineTo(vaulter, ctx, 143.2, 201.2);
        recordBezierCurveTo(vaulter, ctx, 143.2, 201.2, 141.7, 203.3, 142.3, 203.7);
        recordBezierCurveTo(vaulter, ctx, 142.9, 204.2, 144.1, 204.9, 144.1, 204.9);
        recordBezierCurveTo(vaulter, ctx, 144.1, 204.9, 146.3, 205.5, 147.0, 206.4);
        recordBezierCurveTo(vaulter, ctx, 147.8, 207.3, 148.3, 213.2, 149.2, 214.5);
        recordBezierCurveTo(vaulter, ctx, 149.2, 214.5, 147.8, 220.9, 146.6, 221.9);
        recordBezierCurveTo(vaulter, ctx, 145.4, 222.8, 143.6, 225.8, 143.9, 226.2);
        ctx.fill();
        ctx.stroke();

        // vaulter/Path
        ctx.beginPath();
        recordMoveTo(vaulter, ctx, 167.5, 252.8);
        recordBezierCurveTo(vaulter, ctx, 167.5, 252.8, 166.5, 242.9, 162.6, 235.7);
        recordBezierCurveTo(vaulter, ctx, 158.8, 228.4, 152.6, 225.0, 148.7, 224.6);
        recordBezierCurveTo(vaulter, ctx, 144.9, 224.2, 142.5, 225.6, 141.5, 226.8);
        recordBezierCurveTo(vaulter, ctx, 140.5, 228.0, 140.8, 230.5, 141.5, 231.5);
        recordBezierCurveTo(vaulter, ctx, 144.7, 236.4, 150.6, 239.5, 154.4, 244.1);
        recordBezierCurveTo(vaulter, ctx, 155.4, 245.2, 155.7, 248.0, 155.9, 250.0);
        recordBezierCurveTo(vaulter, ctx, 154.8, 252.0, 151.0, 260.3, 150.6, 273.2);
        recordBezierCurveTo(vaulter, ctx, 150.6, 273.2, 138.5, 274.8, 133.0, 279.8);
        recordBezierCurveTo(vaulter, ctx, 133.0, 279.8, 131.2, 278.3, 130.6, 278.3);
        recordBezierCurveTo(vaulter, ctx, 130.0, 278.3, 128.2, 279.8, 127.8, 281.0);
        recordBezierCurveTo(vaulter, ctx, 127.3, 282.2, 124.1, 291.1, 123.5, 292.0);
        recordBezierCurveTo(vaulter, ctx, 122.9, 292.9, 124.6, 293.7, 125.0, 293.7);
        recordBezierCurveTo(vaulter, ctx, 125.5, 293.7, 130.6, 287.8, 132.0, 285.1);
        recordBezierCurveTo(vaulter, ctx, 132.0, 285.1, 142.6, 280.0, 147.2, 280.6);
        recordBezierCurveTo(vaulter, ctx, 151.9, 281.2, 155.2, 278.9, 155.2, 278.9);
        recordBezierCurveTo(vaulter, ctx, 155.2, 278.9, 160.5, 272.6, 164.4, 259.6);
        ctx.fill();
        ctx.stroke();

        // vaulter/Path
        ctx.beginPath();
        recordMoveTo(vaulter, ctx, 151.6, 226.4);
        recordBezierCurveTo(vaulter, ctx, 151.6, 226.4, 155.2, 219.3, 155.2, 218.1);
        recordBezierCurveTo(vaulter, ctx, 155.2, 216.9, 154.7, 212.3, 154.7, 212.3);
        recordBezierCurveTo(vaulter, ctx, 154.7, 212.3, 152.9, 207.1, 148.1, 207.4);
        recordBezierCurveTo(vaulter, ctx, 143.3, 207.7, 141.9, 213.4, 142.0, 215.7);
        recordBezierCurveTo(vaulter, ctx, 142.2, 218.0, 144.6, 223.6, 144.6, 223.6);
        recordBezierCurveTo(vaulter, ctx, 144.6, 223.6, 145.2, 226.2, 142.9, 225.6);
        ctx.fill();
        ctx.stroke();

        // vaulter/Path
        ctx.beginPath();
        recordMoveTo(vaulter, ctx, 154.0, 242.0);
        recordBezierCurveTo(vaulter, ctx, 154.0, 242.0, 159.1, 238.4, 154.5, 232.0);
        recordBezierCurveTo(vaulter, ctx, 149.9, 225.6, 145.8, 225.7, 144.1, 227.0);
        recordBezierCurveTo(vaulter, ctx, 142.8, 228.0, 142.6, 231.6, 144.5, 234.9);
        recordBezierCurveTo(vaulter, ctx, 146.9, 237.4, 149.9, 239.5, 152.4, 241.9);
        recordBezierCurveTo(vaulter, ctx, 152.9, 242.0, 153.5, 242.0, 154.0, 242.0);
        ctx.closePath();
        ctx.fill();
        ctx.stroke();

        // vaulter/Path
        ctx.beginPath();
        recordMoveTo(vaulter, ctx, 143.9, 233.2);
        recordBezierCurveTo(vaulter, ctx, 143.9, 233.2, 139.8, 229.5, 137.4, 224.5);
        recordBezierCurveTo(vaulter, ctx, 137.4, 224.5, 127.9, 218.7, 126.7, 217.8);
        recordBezierCurveTo(vaulter, ctx, 125.5, 216.9, 117.7, 209.9, 115.4, 208.7);
        recordBezierCurveTo(vaulter, ctx, 113.1, 207.5, 111.4, 205.5, 112.0, 204.4);
        recordBezierCurveTo(vaulter, ctx, 112.7, 203.3, 115.4, 202.0, 115.4, 202.0);
        recordBezierCurveTo(vaulter, ctx, 115.4, 202.0, 118.7, 202.4, 119.3, 203.3);
        recordBezierCurveTo(vaulter, ctx, 119.9, 204.2, 118.9, 207.1, 118.9, 207.1);
        recordBezierCurveTo(vaulter, ctx, 118.9, 207.1, 124.1, 210.3, 127.2, 211.5);
        recordBezierCurveTo(vaulter, ctx, 130.2, 212.8, 131.2, 214.8, 131.2, 214.8);
        recordLineTo(vaulter, ctx, 140.9, 221.1);
        recordBezierCurveTo(vaulter, ctx, 140.9, 221.1, 148.6, 224.4, 150.6, 227.6);
        ctx.fill();
        ctx.stroke();

        // vaulter/Path
        ctx.beginPath();
        recordMoveTo(vaulter, ctx, 155.6, 250.6);
        recordBezierCurveTo(vaulter, ctx, 155.6, 250.6, 154.2, 253.9, 154.5, 256.7);
        recordBezierCurveTo(vaulter, ctx, 154.6, 258.1, 155.9, 259.7, 156.9, 260.4);
        recordBezierCurveTo(vaulter, ctx, 159.9, 262.6, 163.6, 263.3, 167.5, 264.1);
        recordBezierCurveTo(vaulter, ctx, 171.3, 264.9, 175.9, 268.1, 175.9, 268.1);
        recordBezierCurveTo(vaulter, ctx, 175.9, 268.1, 174.3, 274.9, 174.5, 276.9);
        recordBezierCurveTo(vaulter, ctx, 174.7, 279.0, 171.8, 288.8, 171.4, 290.2);
        recordBezierCurveTo(vaulter, ctx, 171.2, 290.7, 170.7, 291.0, 170.6, 291.3);
        recordBezierCurveTo(vaulter, ctx, 170.3, 291.9, 170.4, 292.4, 170.8, 292.8);
        recordBezierCurveTo(vaulter, ctx, 171.4, 293.4, 176.2, 295.5, 179.6, 297.9);
        recordBezierCurveTo(vaulter, ctx, 180.8, 298.7, 184.1, 298.9, 183.7, 297.9);
        recordBezierCurveTo(vaulter, ctx, 183.3, 297.0, 181.5, 296.5, 180.7, 295.3);
        recordBezierCurveTo(vaulter, ctx, 178.9, 292.6, 176.5, 289.8, 176.5, 289.8);
        recordBezierCurveTo(vaulter, ctx, 176.5, 289.8, 182.6, 272.1, 183.0, 269.1);
        recordBezierCurveTo(vaulter, ctx, 183.4, 266.1, 179.1, 259.2, 175.1, 256.4);
        recordBezierCurveTo(vaulter, ctx, 172.1, 254.3, 168.7, 252.9, 166.6, 251.3);
        ctx.fill();
        ctx.stroke();
        ctx.restore();
      }
    },

    function (ctx) {
      if (vaulter.visible) {

        // vaulter/Path
        ctx.save();
        ctx.beginPath();
        recordMoveTo(vaulter, ctx, 178.3, 247.5);
        recordBezierCurveTo(vaulter, ctx, 178.5, 250.3, 176.5, 262.4, 176.7, 263.6);
        recordBezierCurveTo(vaulter, ctx, 176.8, 264.8, 176.1, 267.5, 174.9, 269.3);
        recordBezierCurveTo(vaulter, ctx, 173.7, 271.2, 165.4, 274.3, 162.2, 275.2);
        recordBezierCurveTo(vaulter, ctx, 159.0, 276.1, 153.6, 279.9, 153.6, 279.9);
        recordBezierCurveTo(vaulter, ctx, 153.4, 281.1, 150.9, 286.0, 150.9, 286.0);
        recordBezierCurveTo(vaulter, ctx, 150.9, 286.0, 150.3, 289.1, 149.7, 289.1);
        recordBezierCurveTo(vaulter, ctx, 149.1, 289.1, 148.5, 287.9, 148.5, 287.9);
        recordBezierCurveTo(vaulter, ctx, 148.5, 287.9, 148.3, 284.6, 148.5, 283.7);
        recordBezierCurveTo(vaulter, ctx, 148.6, 282.8, 148.5, 277.8, 148.5, 277.8);
        recordBezierCurveTo(vaulter, ctx, 148.5, 277.8, 149.7, 275.4, 150.7, 275.7);
        recordBezierCurveTo(vaulter, ctx, 151.8, 276.0, 152.5, 275.7, 152.5, 275.7);
        recordBezierCurveTo(vaulter, ctx, 154.7, 275.2, 160.2, 271.0, 161.9, 269.2);
        recordBezierCurveTo(vaulter, ctx, 163.6, 267.4, 169.9, 263.6, 169.9, 263.6);
        recordBezierCurveTo(vaulter, ctx, 168.1, 253.5, 168.2, 243.8, 168.2, 243.8);
        ctx.fillStyle = "rgb(17, 92, 137)";
        ctx.fill();
        ctx.lineWidth = 0.5;
        ctx.strokeStyle = "rgb(141, 204, 255)";
        ctx.lineJoin = "miter";
        ctx.miterLimit = 4.0;
        ctx.stroke();

        // vaulter/Path
        ctx.beginPath();
        recordMoveTo(vaulter, ctx, 154.2, 219.6);
        recordBezierCurveTo(vaulter, ctx, 154.2, 217.3, 155.0, 215.4, 155.9, 214.8);
        recordBezierCurveTo(vaulter, ctx, 155.8, 213.3, 156.4, 206.0, 156.4, 206.0);
        recordBezierCurveTo(vaulter, ctx, 155.7, 205.1, 156.4, 202.9, 156.4, 201.9);
        recordBezierCurveTo(vaulter, ctx, 156.4, 200.9, 154.8, 197.3, 154.8, 197.3);
        recordBezierCurveTo(vaulter, ctx, 154.8, 197.3, 155.3, 196.6, 156.3, 196.3);
        recordBezierCurveTo(vaulter, ctx, 157.3, 196.1, 158.1, 196.3, 158.1, 196.3);
        recordBezierCurveTo(vaulter, ctx, 158.1, 196.3, 159.5, 201.1, 159.9, 202.9);
        recordBezierCurveTo(vaulter, ctx, 160.3, 204.7, 161.5, 207.5, 161.0, 208.6);
        recordLineTo(vaulter, ctx, 160.5, 214.6);
        recordBezierCurveTo(vaulter, ctx, 160.5, 214.6, 162.7, 217.6, 163.0, 221.1);
        ctx.fill();
        ctx.stroke();

        // vaulter/Path
        ctx.beginPath();
        recordMoveTo(vaulter, ctx, 293.8, 342.2);
        recordLineTo(vaulter, ctx, 291.8, 342.2);
        recordBezierCurveTo(vaulter, ctx, 291.8, 312.3, 289.0, 293.9, 282.0, 277.9);
        recordBezierCurveTo(vaulter, ctx, 274.6, 260.9, 259.8, 236.7, 230.9, 218.3);
        recordBezierCurveTo(vaulter, ctx, 202.0, 199.9, 171.1, 197.3, 150.3, 198.3);
        recordBezierCurveTo(vaulter, ctx, 128.0, 199.4, 112.3, 204.8, 111.6, 205.0);
        recordBezierCurveTo(vaulter, ctx, 111.6, 205.0, 110.5, 205.3, 110.2, 204.4);
        recordBezierCurveTo(vaulter, ctx, 109.9, 203.5, 111.0, 203.2, 111.0, 203.2);
        recordBezierCurveTo(vaulter, ctx, 111.6, 202.9, 127.6, 197.4, 150.2, 196.3);
        recordBezierCurveTo(vaulter, ctx, 171.3, 195.3, 202.7, 197.9, 232.0, 216.6);
        recordBezierCurveTo(vaulter, ctx, 261.3, 235.3, 276.4, 259.8, 283.9, 277.1);
        recordBezierCurveTo(vaulter, ctx, 291.0, 293.4, 293.8, 312.1, 293.8, 342.2);
        ctx.closePath();
        ctx.fill();
        ctx.stroke();

        // vaulter/Path
        ctx.beginPath();
        recordMoveTo(vaulter, ctx, 168.0, 243.0);
        recordBezierCurveTo(vaulter, ctx, 168.0, 243.0, 168.0, 241.5, 167.2, 240.2);
        recordBezierCurveTo(vaulter, ctx, 166.3, 238.9, 158.7, 233.0, 155.9, 231.6);
        recordBezierCurveTo(vaulter, ctx, 154.2, 230.7, 151.1, 227.6, 148.8, 224.9);
        recordBezierCurveTo(vaulter, ctx, 146.8, 222.5, 149.6, 220.1, 151.5, 219.0);
        recordBezierCurveTo(vaulter, ctx, 153.4, 217.9, 157.7, 218.0, 157.7, 218.0);
        recordBezierCurveTo(vaulter, ctx, 161.9, 218.8, 169.4, 223.8, 174.2, 228.6);
        recordBezierCurveTo(vaulter, ctx, 179.1, 233.5, 178.4, 243.0, 178.4, 243.0);
        recordBezierCurveTo(vaulter, ctx, 178.4, 245.0, 175.3, 245.9, 173.4, 245.9);
        recordBezierCurveTo(vaulter, ctx, 171.6, 245.9, 168.1, 244.3, 168.0, 243.0);
        ctx.closePath();
        ctx.fill();
        ctx.stroke();

        // vaulter/Path
        ctx.beginPath();
        recordMoveTo(vaulter, ctx, 158.8, 217.3);
        recordBezierCurveTo(vaulter, ctx, 159.7, 215.2, 160.9, 211.7, 160.9, 210.9);
        recordBezierCurveTo(vaulter, ctx, 160.8, 209.8, 159.9, 205.8, 159.9, 205.8);
        recordBezierCurveTo(vaulter, ctx, 159.9, 205.8, 157.8, 201.3, 153.5, 202.0);
        recordBezierCurveTo(vaulter, ctx, 149.3, 202.6, 148.5, 207.8, 148.8, 209.9);
        recordBezierCurveTo(vaulter, ctx, 149.1, 212.0, 151.9, 216.8, 151.9, 216.8);
        recordBezierCurveTo(vaulter, ctx, 151.9, 216.8, 152.2, 218.4, 151.9, 219.6);
        ctx.fill();
        ctx.stroke();

        // vaulter/Path
        ctx.beginPath();
        recordMoveTo(vaulter, ctx, 162.6, 234.9);
        recordBezierCurveTo(vaulter, ctx, 162.6, 234.9, 167.3, 230.8, 162.1, 224.9);
        recordBezierCurveTo(vaulter, ctx, 156.9, 218.9, 152.9, 219.5, 151.4, 220.9);
        recordBezierCurveTo(vaulter, ctx, 150.1, 222.1, 150.2, 225.6, 152.4, 228.8);
        recordBezierCurveTo(vaulter, ctx, 155.1, 231.0, 158.3, 232.8, 161.0, 235.0);
        recordBezierCurveTo(vaulter, ctx, 161.5, 235.0, 162.1, 235.0, 162.6, 234.9);
        ctx.closePath();
        ctx.fill();
        ctx.stroke();

        // vaulter/Path
        ctx.beginPath();
        recordMoveTo(vaulter, ctx, 148.8, 224.9);
        recordBezierCurveTo(vaulter, ctx, 147.2, 223.1, 146.0, 221.6, 145.5, 221.0);
        recordBezierCurveTo(vaulter, ctx, 145.5, 221.0, 136.2, 213.5, 135.5, 212.8);
        recordBezierCurveTo(vaulter, ctx, 134.8, 212.2, 127.4, 207.6, 125.5, 205.0);
        recordBezierCurveTo(vaulter, ctx, 122.8, 203.8, 121.1, 202.7, 120.9, 201.9);
        recordBezierCurveTo(vaulter, ctx, 120.7, 201.1, 121.6, 199.7, 122.4, 199.2);
        recordBezierCurveTo(vaulter, ctx, 123.2, 198.7, 126.7, 199.2, 126.7, 199.2);
        recordBezierCurveTo(vaulter, ctx, 126.7, 199.2, 127.9, 200.9, 127.7, 201.3);
        recordBezierCurveTo(vaulter, ctx, 127.5, 201.7, 127.3, 203.9, 127.9, 204.2);
        recordBezierCurveTo(vaulter, ctx, 128.5, 204.5, 136.7, 208.2, 137.8, 209.2);
        recordBezierCurveTo(vaulter, ctx, 138.9, 210.2, 145.1, 212.9, 148.4, 216.0);
        recordBezierCurveTo(vaulter, ctx, 148.4, 216.0, 155.0, 219.5, 157.3, 221.0);
        ctx.fill();
        ctx.stroke();

        // vaulter/Path
        ctx.beginPath();
        recordMoveTo(vaulter, ctx, 167.6, 242.2);
        recordBezierCurveTo(vaulter, ctx, 167.6, 242.2, 166.0, 248.4, 168.8, 250.8);
        recordBezierCurveTo(vaulter, ctx, 170.8, 252.4, 174.9, 254.4, 178.6, 255.6);
        recordBezierCurveTo(vaulter, ctx, 182.4, 256.8, 186.6, 262.4, 186.6, 262.4);
        recordBezierCurveTo(vaulter, ctx, 186.6, 262.4, 185.6, 270.4, 186.6, 271.9);
        recordBezierCurveTo(vaulter, ctx, 187.7, 273.4, 188.6, 283.8, 188.2, 284.7);
        recordBezierCurveTo(vaulter, ctx, 187.7, 285.7, 187.2, 286.6, 188.3, 287.0);
        recordBezierCurveTo(vaulter, ctx, 189.4, 287.5, 193.3, 287.5, 194.2, 288.1);
        recordBezierCurveTo(vaulter, ctx, 195.1, 288.7, 198.4, 288.2, 199.0, 288.1);
        recordBezierCurveTo(vaulter, ctx, 199.6, 287.9, 197.8, 286.0, 196.9, 286.0);
        recordBezierCurveTo(vaulter, ctx, 196.0, 286.0, 192.2, 283.7, 191.8, 283.1);
        recordBezierCurveTo(vaulter, ctx, 191.3, 282.5, 192.5, 272.8, 193.1, 269.8);
        recordBezierCurveTo(vaulter, ctx, 193.7, 266.8, 194.0, 260.9, 193.1, 258.6);
        recordBezierCurveTo(vaulter, ctx, 192.2, 256.4, 177.9, 238.9, 177.9, 238.9);
        ctx.fill();
        ctx.stroke();

        // vaulter/Path
        ctx.beginPath();
        recordMoveTo(vaulter, ctx, 154.2, 197.3);
        recordBezierCurveTo(vaulter, ctx, 154.2, 197.3, 156.9, 197.8, 157.7, 197.8);
        recordBezierCurveTo(vaulter, ctx, 158.5, 197.8, 158.6, 196.9, 158.7, 196.2);
        recordBezierCurveTo(vaulter, ctx, 158.8, 195.5, 158.4, 194.9, 157.7, 194.9);
        recordBezierCurveTo(vaulter, ctx, 157.0, 194.9, 155.6, 194.9, 155.6, 194.9);
        recordBezierCurveTo(vaulter, ctx, 155.6, 194.9, 153.7, 195.6, 153.2, 196.0);
        recordBezierCurveTo(vaulter, ctx, 152.7, 196.4, 154.2, 197.3, 154.2, 197.3);
        ctx.closePath();
        ctx.fill();
        ctx.stroke();
        ctx.restore();
      }
    },

    function (ctx) {
      if (vaulter.visible) {

        // vaulter/Path
        ctx.save();
        ctx.beginPath();
        recordMoveTo(vaulter, ctx, 190.6, 237.2);
        recordBezierCurveTo(vaulter, ctx, 190.6, 237.2, 202.3, 248.3, 209.6, 252.1);
        recordBezierCurveTo(vaulter, ctx, 209.6, 252.1, 212.0, 257.1, 215.3, 259.0);
        recordBezierCurveTo(vaulter, ctx, 218.7, 260.9, 223.8, 268.5, 223.8, 268.5);
        recordBezierCurveTo(vaulter, ctx, 223.8, 268.5, 224.6, 270.4, 225.4, 270.3);
        recordBezierCurveTo(vaulter, ctx, 226.2, 270.1, 230.0, 269.1, 230.0, 269.1);
        recordLineTo(vaulter, ctx, 235.7, 267.6);
        recordBezierCurveTo(vaulter, ctx, 235.7, 267.6, 236.8, 266.3, 236.4, 266.0);
        recordBezierCurveTo(vaulter, ctx, 235.4, 265.1, 232.6, 265.4, 232.6, 265.4);
        recordBezierCurveTo(vaulter, ctx, 232.6, 265.4, 229.7, 264.5, 227.1, 265.0);
        recordBezierCurveTo(vaulter, ctx, 227.1, 265.0, 214.4, 248.9, 214.1, 248.5);
        recordBezierCurveTo(vaulter, ctx, 213.4, 246.7, 208.1, 238.1, 200.5, 229.1);
        ctx.fillStyle = "rgb(17, 92, 137)";
        ctx.fill();
        ctx.lineWidth = 0.5;
        ctx.strokeStyle = "rgb(141, 204, 255)";
        ctx.lineJoin = "miter";
        ctx.miterLimit = 4.0;
        ctx.stroke();

        // vaulter/Path
        ctx.beginPath();
        recordMoveTo(vaulter, ctx, 180.5, 211.8);
        recordBezierCurveTo(vaulter, ctx, 180.5, 211.8, 180.4, 206.0, 181.3, 203.6);
        recordBezierCurveTo(vaulter, ctx, 181.3, 203.6, 183.8, 198.2, 184.0, 196.8);
        recordBezierCurveTo(vaulter, ctx, 184.1, 195.4, 184.9, 191.8, 184.0, 189.9);
        recordBezierCurveTo(vaulter, ctx, 183.1, 187.9, 181.7, 181.3, 181.7, 181.3);
        recordLineTo(vaulter, ctx, 181.6, 179.1);
        recordBezierCurveTo(vaulter, ctx, 181.6, 179.1, 177.9, 179.6, 177.0, 179.9);
        recordBezierCurveTo(vaulter, ctx, 177.0, 179.9, 179.3, 187.0, 179.3, 189.1);
        recordBezierCurveTo(vaulter, ctx, 179.3, 191.2, 179.0, 195.4, 179.0, 195.4);
        recordBezierCurveTo(vaulter, ctx, 179.0, 195.4, 176.4, 198.9, 176.7, 202.1);
        recordBezierCurveTo(vaulter, ctx, 175.4, 202.8, 171.9, 210.4, 171.9, 210.4);
        ctx.fill();
        ctx.stroke();

        // vaulter/Path
        ctx.beginPath();
        recordMoveTo(vaulter, ctx, 178.2, 181.3);
        recordLineTo(vaulter, ctx, 176.7, 180.5);
        recordBezierCurveTo(vaulter, ctx, 176.7, 180.5, 176.1, 177.9, 176.7, 177.5);
        recordBezierCurveTo(vaulter, ctx, 177.3, 177.0, 181.1, 176.7, 181.1, 176.7);
        recordBezierCurveTo(vaulter, ctx, 181.1, 176.7, 182.6, 177.6, 182.5, 178.1);
        recordBezierCurveTo(vaulter, ctx, 182.3, 178.5, 181.7, 181.3, 181.7, 181.3);
        recordLineTo(vaulter, ctx, 178.2, 181.3);
        ctx.closePath();
        ctx.fill();
        ctx.stroke();

        // vaulter/Path
        ctx.beginPath();
        recordMoveTo(vaulter, ctx, 293.8, 342.2);
        recordLineTo(vaulter, ctx, 291.8, 342.2);
        recordLineTo(vaulter, ctx, 291.8, 341.3);
        recordBezierCurveTo(vaulter, ctx, 291.8, 304.5, 290.0, 279.1, 286.6, 266.1);
        recordBezierCurveTo(vaulter, ctx, 281.6, 246.9, 270.6, 219.8, 246.7, 200.0);
        recordBezierCurveTo(vaulter, ctx, 222.7, 180.2, 194.8, 178.4, 175.5, 180.4);
        recordBezierCurveTo(vaulter, ctx, 154.6, 182.7, 139.3, 189.6, 139.1, 189.7);
        recordBezierCurveTo(vaulter, ctx, 139.1, 189.7, 138.2, 189.9, 137.8, 189.1);
        recordBezierCurveTo(vaulter, ctx, 137.4, 188.3, 138.3, 187.9, 138.3, 187.9);
        recordBezierCurveTo(vaulter, ctx, 138.5, 187.8, 154.2, 180.7, 175.3, 178.5);
        recordBezierCurveTo(vaulter, ctx, 194.9, 176.4, 223.5, 178.2, 247.9, 198.4);
        recordBezierCurveTo(vaulter, ctx, 272.3, 218.6, 283.4, 246.1, 288.5, 265.6);
        recordBezierCurveTo(vaulter, ctx, 291.9, 278.8, 293.8, 304.4, 293.8, 341.3);
        recordLineTo(vaulter, ctx, 293.8, 342.2);
        ctx.closePath();
        ctx.fill();
        ctx.stroke();

        // vaulter/Path
        ctx.beginPath();
        recordMoveTo(vaulter, ctx, 179.1, 209.9);
        recordBezierCurveTo(vaulter, ctx, 179.1, 209.9, 177.6, 203.9, 176.8, 203.0);
        recordBezierCurveTo(vaulter, ctx, 176.1, 202.2, 173.1, 199.4, 173.1, 199.4);
        recordBezierCurveTo(vaulter, ctx, 173.1, 199.4, 168.8, 196.9, 165.7, 199.9);
        recordBezierCurveTo(vaulter, ctx, 162.6, 203.0, 165.0, 207.6, 166.4, 209.1);
        recordBezierCurveTo(vaulter, ctx, 167.9, 210.7, 172.9, 213.0, 172.9, 213.0);
        recordBezierCurveTo(vaulter, ctx, 172.9, 213.0, 174.3, 214.0, 173.8, 217.4);
        ctx.fill();
        ctx.stroke();

        // vaulter/Path
        ctx.beginPath();
        recordMoveTo(vaulter, ctx, 181.8, 210.6);
        recordBezierCurveTo(vaulter, ctx, 180.4, 209.9, 177.6, 210.8, 176.3, 211.8);
        recordBezierCurveTo(vaulter, ctx, 175.0, 212.8, 172.9, 216.4, 173.5, 218.0);
        recordBezierCurveTo(vaulter, ctx, 174.0, 219.7, 173.5, 221.0, 177.1, 223.0);
        recordBezierCurveTo(vaulter, ctx, 180.7, 225.0, 188.1, 231.9, 189.4, 233.7);
        recordBezierCurveTo(vaulter, ctx, 190.7, 235.5, 196.3, 232.0, 196.3, 232.0);
        recordBezierCurveTo(vaulter, ctx, 196.3, 232.0, 198.5, 228.2, 198.3, 227.5);
        recordBezierCurveTo(vaulter, ctx, 198.1, 226.8, 191.8, 218.4, 190.0, 216.8);
        recordBezierCurveTo(vaulter, ctx, 186.4, 213.5, 181.8, 210.6, 181.8, 210.6);
        ctx.closePath();
        ctx.fill();
        ctx.stroke();

        // vaulter/Path
        ctx.beginPath();
        recordMoveTo(vaulter, ctx, 189.5, 233.7);
        recordBezierCurveTo(vaulter, ctx, 189.5, 235.8, 190.4, 237.8, 192.6, 238.8);
        recordBezierCurveTo(vaulter, ctx, 195.3, 240.0, 204.8, 239.2, 206.6, 238.8);
        recordBezierCurveTo(vaulter, ctx, 208.4, 238.3, 215.2, 238.3, 215.2, 238.3);
        recordBezierCurveTo(vaulter, ctx, 215.2, 238.3, 217.9, 243.7, 219.9, 245.9);
        recordBezierCurveTo(vaulter, ctx, 221.9, 248.0, 223.4, 254.8, 223.4, 254.8);
        recordBezierCurveTo(vaulter, ctx, 223.4, 254.8, 223.4, 257.5, 224.6, 257.8);
        recordBezierCurveTo(vaulter, ctx, 225.8, 258.1, 227.6, 257.8, 230.0, 256.6);
        recordBezierCurveTo(vaulter, ctx, 232.4, 255.4, 234.6, 254.9, 235.0, 254.6);
        recordBezierCurveTo(vaulter, ctx, 236.3, 253.7, 235.6, 252.3, 234.3, 252.0);
        recordBezierCurveTo(vaulter, ctx, 233.5, 251.8, 231.2, 252.1, 231.2, 252.1);
        recordBezierCurveTo(vaulter, ctx, 231.2, 252.1, 228.1, 251.7, 226.6, 251.8);
        recordBezierCurveTo(vaulter, ctx, 225.1, 252.0, 222.8, 236.4, 222.0, 235.1);
        recordBezierCurveTo(vaulter, ctx, 220.4, 232.5, 217.6, 230.3, 215.9, 229.9);
        recordBezierCurveTo(vaulter, ctx, 212.6, 229.2, 200.3, 227.6, 198.3, 227.5);
        ctx.fill();
        ctx.stroke();

        // vaulter/Path
        ctx.beginPath();
        recordMoveTo(vaulter, ctx, 183.2, 226.0);
        recordBezierCurveTo(vaulter, ctx, 183.2, 226.0, 189.9, 222.9, 184.7, 217.0);
        recordBezierCurveTo(vaulter, ctx, 179.5, 211.1, 176.0, 212.3, 174.5, 213.7);
        recordBezierCurveTo(vaulter, ctx, 173.3, 214.9, 173.4, 218.4, 175.6, 221.6);
        recordBezierCurveTo(vaulter, ctx, 178.3, 223.8, 178.8, 223.9, 181.6, 226.1);
        recordBezierCurveTo(vaulter, ctx, 182.1, 226.1, 182.6, 226.1, 183.2, 226.0);
        ctx.closePath();
        ctx.fill();
        ctx.stroke();

        // vaulter/Path
        ctx.beginPath();
        recordMoveTo(vaulter, ctx, 176.1, 220.7);
        recordBezierCurveTo(vaulter, ctx, 176.1, 220.7, 172.8, 217.9, 171.0, 215.4);
        recordBezierCurveTo(vaulter, ctx, 169.2, 212.8, 167.1, 205.7, 167.1, 205.7);
        recordBezierCurveTo(vaulter, ctx, 167.1, 205.7, 162.1, 201.5, 159.8, 197.1);
        recordBezierCurveTo(vaulter, ctx, 159.8, 197.1, 157.1, 193.5, 156.2, 191.5);
        recordBezierCurveTo(vaulter, ctx, 155.3, 189.6, 150.9, 186.5, 150.9, 186.5);
        recordBezierCurveTo(vaulter, ctx, 150.9, 186.5, 148.8, 185.5, 148.4, 185.2);
        recordBezierCurveTo(vaulter, ctx, 147.9, 184.9, 148.4, 182.5, 148.4, 182.5);
        recordLineTo(vaulter, ctx, 150.6, 181.3);
        recordLineTo(vaulter, ctx, 155.0, 181.3);
        recordLineTo(vaulter, ctx, 156.5, 183.5);
        recordBezierCurveTo(vaulter, ctx, 156.5, 183.5, 156.1, 184.4, 155.5, 185.0);
        recordBezierCurveTo(vaulter, ctx, 154.9, 185.6, 162.3, 194.5, 163.6, 195.1);
        recordLineTo(vaulter, ctx, 170.9, 202.5);
        recordBezierCurveTo(vaulter, ctx, 170.9, 202.5, 174.9, 212.9, 177.7, 214.3);
        ctx.fill();
        ctx.stroke();
        ctx.restore();
      }
    },

    function (ctx) {
      if (vaulter.visible) {

        // vaulter/Path
        ctx.save();
        ctx.beginPath();
        recordMoveTo(vaulter, ctx, 292.9, 342.2);
        recordBezierCurveTo(vaulter, ctx, 292.8, 336.0, 292.3, 277.1, 288.0, 257.2);
        recordBezierCurveTo(vaulter, ctx, 283.9, 237.8, 275.2, 210.9, 257.6, 192.6);
        recordBezierCurveTo(vaulter, ctx, 237.5, 171.8, 209.3, 168.9, 189.2, 170.1);
        recordBezierCurveTo(vaulter, ctx, 167.5, 171.5, 150.2, 177.8, 150.1, 177.8);
        recordBezierCurveTo(vaulter, ctx, 150.1, 177.8, 149.0, 178.1, 148.7, 177.2);
        recordBezierCurveTo(vaulter, ctx, 148.5, 176.4, 149.4, 176.0, 149.4, 176.0);
        recordBezierCurveTo(vaulter, ctx, 149.5, 175.9, 166.9, 169.5, 189.1, 168.1);
        recordBezierCurveTo(vaulter, ctx, 209.6, 166.9, 238.4, 169.9, 259.0, 191.2);
        recordBezierCurveTo(vaulter, ctx, 277.0, 209.8, 285.8, 237.1, 290.0, 256.7);
        recordBezierCurveTo(vaulter, ctx, 294.3, 276.9, 294.8, 336.1, 294.9, 342.2);
        recordLineTo(vaulter, ctx, 292.9, 342.2);
        ctx.closePath();
        ctx.fillStyle = "rgb(17, 92, 137)";
        ctx.fill();
        ctx.lineWidth = 0.5;
        ctx.strokeStyle = "rgb(141, 204, 255)";
        ctx.lineJoin = "miter";
        ctx.miterLimit = 4.0;
        ctx.stroke();

        // vaulter/Path
        ctx.beginPath();
        recordMoveTo(vaulter, ctx, 192.7, 227.0);
        recordBezierCurveTo(vaulter, ctx, 193.2, 231.2, 197.4, 234.5, 200.8, 234.9);
        recordBezierCurveTo(vaulter, ctx, 204.2, 235.3, 215.2, 234.3, 221.5, 232.5);
        recordBezierCurveTo(vaulter, ctx, 223.7, 235.3, 230.5, 237.8, 232.5, 240.8);
        recordBezierCurveTo(vaulter, ctx, 232.5, 240.8, 232.5, 242.2, 233.2, 242.5);
        recordBezierCurveTo(vaulter, ctx, 234.0, 242.8, 235.9, 243.1, 237.1, 242.5);
        recordBezierCurveTo(vaulter, ctx, 238.4, 241.9, 243.7, 240.8, 243.7, 240.8);
        recordBezierCurveTo(vaulter, ctx, 243.7, 240.8, 246.5, 239.4, 245.9, 238.4);
        recordBezierCurveTo(vaulter, ctx, 245.4, 237.7, 244.3, 237.8, 243.7, 238.0);
        recordBezierCurveTo(vaulter, ctx, 242.4, 238.5, 235.2, 237.4, 235.2, 237.4);
        recordBezierCurveTo(vaulter, ctx, 231.5, 235.0, 224.4, 226.2, 222.2, 224.2);
        recordBezierCurveTo(vaulter, ctx, 222.2, 224.2, 221.5, 223.1, 219.4, 223.3);
        recordBezierCurveTo(vaulter, ctx, 216.0, 223.3, 202.1, 221.2, 202.1, 221.2);
        ctx.fill();
        ctx.stroke();

        // vaulter/Path
        ctx.beginPath();
        recordMoveTo(vaulter, ctx, 179.6, 202.7);
        recordBezierCurveTo(vaulter, ctx, 179.6, 202.7, 182.1, 195.1, 183.3, 193.8);
        recordBezierCurveTo(vaulter, ctx, 184.5, 192.5, 184.7, 182.9, 184.7, 182.9);
        recordBezierCurveTo(vaulter, ctx, 184.7, 182.9, 186.5, 173.1, 186.4, 171.3);
        recordBezierCurveTo(vaulter, ctx, 186.3, 169.4, 185.5, 169.5, 185.5, 169.5);
        recordBezierCurveTo(vaulter, ctx, 185.5, 169.5, 188.1, 169.3, 189.2, 169.2);
        recordBezierCurveTo(vaulter, ctx, 189.2, 169.2, 189.1, 172.1, 189.2, 173.4);
        recordBezierCurveTo(vaulter, ctx, 189.3, 174.7, 189.7, 181.1, 189.2, 183.5);
        recordBezierCurveTo(vaulter, ctx, 188.6, 185.8, 188.5, 193.5, 188.5, 193.5);
        recordBezierCurveTo(vaulter, ctx, 188.5, 193.5, 185.3, 199.5, 185.5, 203.6);
        ctx.fill();
        ctx.stroke();

        // vaulter/Path
        ctx.beginPath();
        recordMoveTo(vaulter, ctx, 184.4, 169.2);
        recordBezierCurveTo(vaulter, ctx, 184.4, 169.2, 185.4, 167.2, 186.2, 166.7);
        recordBezierCurveTo(vaulter, ctx, 186.9, 166.3, 190.5, 167.7, 190.7, 168.0);
        recordBezierCurveTo(vaulter, ctx, 190.9, 168.3, 190.5, 169.6, 189.6, 169.8);
        recordBezierCurveTo(vaulter, ctx, 188.7, 170.0, 186.0, 169.8, 186.0, 169.8);
        recordBezierCurveTo(vaulter, ctx, 186.0, 169.8, 184.7, 169.8, 184.4, 169.2);
        ctx.closePath();
        ctx.fill();
        ctx.stroke();

        // vaulter/Path
        ctx.beginPath();
        recordMoveTo(vaulter, ctx, 181.0, 200.8);
        recordBezierCurveTo(vaulter, ctx, 181.0, 200.8, 179.8, 195.9, 179.1, 195.1);
        recordBezierCurveTo(vaulter, ctx, 178.3, 194.2, 175.3, 191.4, 175.3, 191.4);
        recordBezierCurveTo(vaulter, ctx, 175.3, 191.4, 170.9, 188.9, 167.7, 191.9);
        recordBezierCurveTo(vaulter, ctx, 164.6, 195.0, 167.0, 199.8, 168.5, 201.3);
        recordBezierCurveTo(vaulter, ctx, 170.0, 202.9, 175.0, 205.2, 175.0, 205.2);
        recordBezierCurveTo(vaulter, ctx, 175.0, 205.2, 176.1, 206.0, 175.9, 206.8);
        ctx.fill();
        ctx.stroke();

        // vaulter/Path
        ctx.beginPath();
        recordMoveTo(vaulter, ctx, 184.0, 201.6);
        recordBezierCurveTo(vaulter, ctx, 182.5, 200.8, 179.7, 201.7, 178.4, 202.7);
        recordBezierCurveTo(vaulter, ctx, 177.1, 203.7, 173.9, 207.5, 174.4, 209.2);
        recordBezierCurveTo(vaulter, ctx, 175.0, 210.9, 175.5, 212.1, 179.2, 214.1);
        recordBezierCurveTo(vaulter, ctx, 182.8, 216.1, 190.4, 223.2, 191.7, 225.0);
        recordBezierCurveTo(vaulter, ctx, 193.0, 226.9, 198.8, 223.4, 198.8, 223.4);
        recordBezierCurveTo(vaulter, ctx, 198.8, 223.4, 201.0, 219.5, 200.8, 218.7);
        recordBezierCurveTo(vaulter, ctx, 200.6, 218.0, 194.1, 209.5, 192.3, 207.8);
        recordBezierCurveTo(vaulter, ctx, 188.6, 204.5, 184.0, 201.6, 184.0, 201.6);
        ctx.closePath();
        ctx.fill();
        ctx.stroke();

        // vaulter/Path
        ctx.beginPath();
        recordMoveTo(vaulter, ctx, 192.5, 225.6);
        recordBezierCurveTo(vaulter, ctx, 192.5, 229.3, 195.6, 230.3, 199.3, 231.6);
        recordBezierCurveTo(vaulter, ctx, 203.0, 232.9, 209.0, 230.1, 213.7, 228.1);
        recordBezierCurveTo(vaulter, ctx, 217.7, 226.4, 221.5, 223.1, 221.5, 223.1);
        recordBezierCurveTo(vaulter, ctx, 221.5, 223.1, 223.8, 226.9, 226.4, 228.8);
        recordBezierCurveTo(vaulter, ctx, 229.3, 231.1, 231.3, 239.1, 231.3, 239.1);
        recordBezierCurveTo(vaulter, ctx, 231.3, 239.1, 232.5, 240.8, 233.8, 240.8);
        recordBezierCurveTo(vaulter, ctx, 235.0, 240.7, 243.6, 234.1, 243.6, 234.1);
        recordBezierCurveTo(vaulter, ctx, 243.6, 234.1, 244.0, 232.7, 242.9, 232.5);
        recordBezierCurveTo(vaulter, ctx, 241.9, 232.3, 240.7, 233.1, 240.2, 233.5);
        recordBezierCurveTo(vaulter, ctx, 239.8, 233.8, 236.2, 234.0, 234.3, 234.7);
        recordBezierCurveTo(vaulter, ctx, 234.3, 234.7, 232.7, 231.6, 231.0, 227.0);
        recordBezierCurveTo(vaulter, ctx, 229.9, 224.1, 227.7, 218.7, 226.9, 216.8);
        recordBezierCurveTo(vaulter, ctx, 225.6, 214.9, 220.4, 215.6, 220.4, 215.6);
        recordBezierCurveTo(vaulter, ctx, 220.4, 215.6, 212.9, 216.7, 208.2, 218.6);
        recordBezierCurveTo(vaulter, ctx, 203.8, 220.4, 200.8, 218.7, 200.8, 218.7);
        ctx.fill();
        ctx.stroke();

        // vaulter/Path
        ctx.beginPath();
        recordMoveTo(vaulter, ctx, 187.0, 218.9);
        recordBezierCurveTo(vaulter, ctx, 187.0, 218.9, 191.7, 214.8, 186.4, 208.7);
        recordBezierCurveTo(vaulter, ctx, 181.1, 202.7, 177.0, 203.3, 175.5, 204.7);
        recordBezierCurveTo(vaulter, ctx, 174.2, 205.9, 174.3, 209.5, 176.5, 212.7);
        recordBezierCurveTo(vaulter, ctx, 179.3, 214.9, 182.5, 216.8, 185.3, 219.0);
        recordBezierCurveTo(vaulter, ctx, 185.8, 219.1, 186.4, 219.0, 187.0, 218.9);
        ctx.closePath();
        ctx.fill();
        ctx.stroke();

        // vaulter/Path
        ctx.beginPath();
        recordMoveTo(vaulter, ctx, 175.2, 209.4);
        recordBezierCurveTo(vaulter, ctx, 175.2, 209.4, 174.6, 206.1, 174.4, 203.8);
        recordBezierCurveTo(vaulter, ctx, 174.1, 201.4, 174.4, 196.3, 174.4, 196.3);
        recordBezierCurveTo(vaulter, ctx, 174.4, 196.3, 169.9, 190.8, 168.3, 187.7);
        recordBezierCurveTo(vaulter, ctx, 166.8, 184.5, 161.9, 177.1, 160.9, 176.5);
        recordBezierCurveTo(vaulter, ctx, 159.8, 175.9, 158.6, 175.5, 158.6, 175.5);
        recordBezierCurveTo(vaulter, ctx, 158.6, 175.5, 158.1, 173.9, 158.6, 172.8);
        recordBezierCurveTo(vaulter, ctx, 159.1, 171.7, 161.2, 172.2, 161.2, 172.2);
        recordLineTo(vaulter, ctx, 164.0, 172.1);
        recordBezierCurveTo(vaulter, ctx, 164.0, 172.1, 165.4, 173.5, 164.9, 174.1);
        recordBezierCurveTo(vaulter, ctx, 164.3, 174.7, 164.2, 175.6, 164.0, 176.1);
        recordBezierCurveTo(vaulter, ctx, 164.0, 176.1, 170.5, 183.2, 171.4, 184.5);
        recordBezierCurveTo(vaulter, ctx, 172.3, 185.7, 178.9, 191.8, 179.7, 193.0);
        recordBezierCurveTo(vaulter, ctx, 180.5, 194.1, 181.1, 204.5, 181.8, 205.5);
        ctx.fill();
        ctx.stroke();
        ctx.restore();
      }
    },

    function (ctx) {
      if (vaulter.visible) {

        // vaulter/Path
        ctx.save();
        ctx.beginPath();
        recordMoveTo(vaulter, ctx, 186.0, 195.4);
        recordBezierCurveTo(vaulter, ctx, 186.0, 195.4, 189.5, 188.5, 191.4, 187.2);
        recordBezierCurveTo(vaulter, ctx, 191.4, 187.2, 192.4, 177.5, 193.3, 175.4);
        recordBezierCurveTo(vaulter, ctx, 194.1, 173.3, 195.5, 168.8, 195.7, 167.5);
        recordBezierCurveTo(vaulter, ctx, 195.9, 166.3, 194.3, 164.2, 194.3, 164.2);
        recordBezierCurveTo(vaulter, ctx, 194.3, 164.2, 194.1, 160.9, 195.7, 160.6);
        recordBezierCurveTo(vaulter, ctx, 197.4, 160.3, 199.1, 160.6, 199.1, 160.6);
        recordBezierCurveTo(vaulter, ctx, 199.1, 160.6, 199.9, 164.0, 199.1, 166.7);
        recordBezierCurveTo(vaulter, ctx, 199.1, 166.7, 197.2, 175.4, 197.0, 176.7);
        recordBezierCurveTo(vaulter, ctx, 196.8, 177.9, 196.8, 185.3, 195.7, 187.4);
        recordBezierCurveTo(vaulter, ctx, 194.7, 189.5, 192.7, 198.0, 192.7, 198.0);
        ctx.fillStyle = "rgb(17, 92, 137)";
        ctx.fill();
        ctx.lineWidth = 0.5;
        ctx.strokeStyle = "rgb(141, 204, 255)";
        ctx.lineJoin = "miter";
        ctx.miterLimit = 4.0;
        ctx.stroke();

        // vaulter/Path
        ctx.beginPath();
        recordMoveTo(vaulter, ctx, 202.7, 224.0);
        recordBezierCurveTo(vaulter, ctx, 202.7, 224.0, 204.6, 227.4, 208.6, 227.5);
        recordBezierCurveTo(vaulter, ctx, 212.7, 227.7, 215.6, 225.2, 216.9, 223.8);
        recordBezierCurveTo(vaulter, ctx, 218.1, 222.4, 226.2, 215.3, 226.2, 215.3);
        recordBezierCurveTo(vaulter, ctx, 226.2, 215.3, 230.7, 215.7, 233.8, 216.3);
        recordBezierCurveTo(vaulter, ctx, 235.8, 216.8, 241.8, 218.4, 241.8, 218.4);
        recordBezierCurveTo(vaulter, ctx, 242.6, 219.8, 243.9, 220.2, 243.9, 220.2);
        recordBezierCurveTo(vaulter, ctx, 245.0, 220.2, 252.7, 217.1, 253.8, 215.3);
        recordBezierCurveTo(vaulter, ctx, 254.9, 213.4, 253.3, 213.1, 252.7, 213.4);
        recordBezierCurveTo(vaulter, ctx, 252.1, 213.7, 249.9, 214.6, 248.7, 214.5);
        recordBezierCurveTo(vaulter, ctx, 247.5, 214.3, 243.9, 215.3, 243.9, 215.3);
        recordLineTo(vaulter, ctx, 228.5, 208.1);
        recordBezierCurveTo(vaulter, ctx, 228.5, 208.1, 226.3, 206.6, 224.5, 206.6);
        recordBezierCurveTo(vaulter, ctx, 222.6, 206.6, 208.5, 215.7, 208.5, 215.7);
        ctx.fill();
        ctx.stroke();

        // vaulter/Path
        ctx.beginPath();
        recordMoveTo(vaulter, ctx, 189.2, 192.3);
        recordBezierCurveTo(vaulter, ctx, 189.2, 192.3, 188.1, 187.5, 187.3, 186.6);
        recordBezierCurveTo(vaulter, ctx, 186.6, 185.7, 183.5, 182.9, 183.5, 182.9);
        recordBezierCurveTo(vaulter, ctx, 183.5, 182.9, 179.1, 180.3, 175.9, 183.4);
        recordBezierCurveTo(vaulter, ctx, 172.7, 186.5, 175.1, 191.4, 176.6, 192.9);
        recordBezierCurveTo(vaulter, ctx, 178.1, 194.5, 183.2, 196.8, 183.2, 196.8);
        recordBezierCurveTo(vaulter, ctx, 183.2, 196.8, 184.3, 197.7, 184.1, 198.5);
        ctx.fill();
        ctx.stroke();

        // vaulter/Path
        ctx.beginPath();
        recordMoveTo(vaulter, ctx, 294.9, 342.2);
        recordLineTo(vaulter, ctx, 292.9, 342.2);
        recordBezierCurveTo(vaulter, ctx, 293.2, 331.1, 294.2, 272.6, 291.3, 252.7);
        recordBezierCurveTo(vaulter, ctx, 288.6, 233.9, 281.1, 207.3, 260.7, 187.1);
        recordBezierCurveTo(vaulter, ctx, 240.3, 166.9, 213.8, 163.8, 195.2, 164.8);
        recordBezierCurveTo(vaulter, ctx, 175.1, 165.9, 159.5, 171.8, 159.4, 171.9);
        recordBezierCurveTo(vaulter, ctx, 159.4, 171.9, 158.4, 172.1, 158.1, 171.2);
        recordBezierCurveTo(vaulter, ctx, 157.9, 170.4, 158.7, 170.0, 158.7, 170.0);
        recordBezierCurveTo(vaulter, ctx, 158.8, 169.9, 174.6, 163.9, 195.1, 162.8);
        recordBezierCurveTo(vaulter, ctx, 214.1, 161.8, 241.2, 164.9, 262.1, 185.7);
        recordBezierCurveTo(vaulter, ctx, 282.9, 206.3, 290.5, 233.4, 293.3, 252.4);
        recordBezierCurveTo(vaulter, ctx, 296.6, 274.8, 294.9, 341.5, 294.9, 342.2);
        ctx.closePath();
        ctx.fill();
        ctx.stroke();

        // vaulter/Path
        ctx.beginPath();
        recordMoveTo(vaulter, ctx, 202.6, 223.8);
        recordBezierCurveTo(vaulter, ctx, 205.3, 224.4, 208.8, 216.3, 206.3, 213.3);
        recordBezierCurveTo(vaulter, ctx, 203.8, 210.3, 200.7, 203.0, 197.6, 199.5);
        recordBezierCurveTo(vaulter, ctx, 194.5, 196.0, 188.9, 193.0, 186.7, 194.7);
        recordBezierCurveTo(vaulter, ctx, 184.6, 196.3, 183.6, 203.1, 184.9, 205.5);
        recordBezierCurveTo(vaulter, ctx, 186.1, 207.8, 190.2, 209.5, 192.3, 213.3);
        recordBezierCurveTo(vaulter, ctx, 194.5, 217.1, 197.3, 222.7, 202.6, 223.8);
        ctx.closePath();
        ctx.fill();
        ctx.stroke();

        // vaulter/Path
        ctx.beginPath();
        recordMoveTo(vaulter, ctx, 206.3, 213.3);
        recordBezierCurveTo(vaulter, ctx, 206.3, 213.3, 208.0, 215.2, 209.8, 214.7);
        recordBezierCurveTo(vaulter, ctx, 211.7, 214.3, 216.0, 206.9, 219.1, 204.2);
        recordBezierCurveTo(vaulter, ctx, 222.2, 201.5, 224.3, 199.6, 226.2, 199.6);
        recordBezierCurveTo(vaulter, ctx, 228.0, 199.6, 229.9, 202.1, 230.5, 204.2);
        recordBezierCurveTo(vaulter, ctx, 231.1, 206.3, 239.2, 214.5, 240.0, 214.9);
        recordBezierCurveTo(vaulter, ctx, 240.9, 215.4, 243.6, 215.9, 244.6, 214.9);
        recordBezierCurveTo(vaulter, ctx, 245.6, 213.9, 247.5, 214.3, 247.5, 214.3);
        recordBezierCurveTo(vaulter, ctx, 247.5, 214.3, 248.3, 215.4, 247.5, 216.6);
        recordBezierCurveTo(vaulter, ctx, 246.7, 217.8, 244.6, 219.1, 244.6, 220.1);
        recordBezierCurveTo(vaulter, ctx, 244.6, 221.2, 241.5, 222.4, 240.5, 222.0);
        recordBezierCurveTo(vaulter, ctx, 239.4, 221.6, 237.8, 218.7, 237.8, 218.7);
        recordBezierCurveTo(vaulter, ctx, 237.8, 218.7, 227.5, 210.7, 226.2, 207.8);
        recordBezierCurveTo(vaulter, ctx, 226.2, 207.8, 222.0, 216.6, 218.9, 219.1);
        recordBezierCurveTo(vaulter, ctx, 215.8, 221.6, 212.7, 224.5, 210.6, 224.8);
        recordBezierCurveTo(vaulter, ctx, 207.2, 225.5, 204.1, 224.6, 201.1, 223.3);
        ctx.fill();
        ctx.stroke();

        // vaulter/Path
        ctx.beginPath();
        recordMoveTo(vaulter, ctx, 196.0, 211.0);
        recordBezierCurveTo(vaulter, ctx, 196.0, 211.0, 200.9, 206.8, 195.5, 200.7);
        recordBezierCurveTo(vaulter, ctx, 190.1, 194.6, 186.0, 195.2, 184.4, 196.6);
        recordBezierCurveTo(vaulter, ctx, 183.2, 197.8, 183.3, 201.5, 185.5, 204.7);
        recordBezierCurveTo(vaulter, ctx, 188.3, 207.0, 190.5, 209.6, 194.4, 211.1);
        recordBezierCurveTo(vaulter, ctx, 194.4, 211.1, 195.4, 211.1, 196.0, 211.0);
        ctx.closePath();
        ctx.fill();
        ctx.stroke();

        // vaulter/Path
        ctx.beginPath();
        recordMoveTo(vaulter, ctx, 186.2, 204.2);
        recordBezierCurveTo(vaulter, ctx, 186.2, 204.2, 183.3, 199.6, 183.3, 197.1);
        recordBezierCurveTo(vaulter, ctx, 183.3, 194.7, 183.3, 190.5, 183.3, 190.5);
        recordLineTo(vaulter, ctx, 178.1, 181.0);
        recordBezierCurveTo(vaulter, ctx, 178.1, 181.0, 174.6, 171.3, 173.2, 170.9);
        recordBezierCurveTo(vaulter, ctx, 171.7, 170.4, 168.9, 168.9, 169.4, 166.9);
        recordBezierCurveTo(vaulter, ctx, 169.9, 164.9, 172.1, 164.2, 173.0, 164.2);
        recordBezierCurveTo(vaulter, ctx, 173.8, 164.2, 177.1, 165.7, 176.5, 166.5);
        recordBezierCurveTo(vaulter, ctx, 175.9, 167.3, 175.7, 168.4, 175.9, 169.2);
        recordBezierCurveTo(vaulter, ctx, 176.1, 170.0, 180.4, 178.1, 180.4, 178.1);
        recordBezierCurveTo(vaulter, ctx, 180.4, 178.1, 185.2, 183.3, 186.2, 187.2);
        recordBezierCurveTo(vaulter, ctx, 186.2, 187.2, 191.0, 195.3, 191.4, 196.5);
        ctx.fill();
        ctx.stroke();
        ctx.restore();
      }
    },

    function (ctx) {
      if (vaulter.visible) {

        // vaulter/Path
        ctx.save();
        ctx.beginPath();
        recordMoveTo(vaulter, ctx, 223.9, 202.7);
        recordBezierCurveTo(vaulter, ctx, 223.9, 202.7, 225.4, 201.9, 226.0, 198.7);
        recordBezierCurveTo(vaulter, ctx, 226.6, 195.6, 224.3, 186.2, 225.0, 184.7);
        recordBezierCurveTo(vaulter, ctx, 225.6, 183.3, 229.3, 182.2, 232.1, 183.3);
        recordBezierCurveTo(vaulter, ctx, 234.8, 184.3, 241.9, 185.5, 247.1, 185.7);
        recordBezierCurveTo(vaulter, ctx, 247.1, 185.7, 247.7, 183.6, 249.0, 182.9);
        recordBezierCurveTo(vaulter, ctx, 250.3, 182.1, 250.0, 179.7, 250.7, 179.3);
        recordBezierCurveTo(vaulter, ctx, 251.5, 178.9, 252.1, 180.2, 252.1, 180.6);
        recordBezierCurveTo(vaulter, ctx, 252.1, 180.9, 252.3, 182.0, 252.0, 183.3);
        recordBezierCurveTo(vaulter, ctx, 251.8, 184.3, 251.2, 187.7, 251.3, 188.3);
        recordBezierCurveTo(vaulter, ctx, 251.4, 188.9, 250.7, 190.4, 250.1, 190.4);
        recordBezierCurveTo(vaulter, ctx, 249.4, 190.4, 247.6, 190.3, 247.3, 189.3);
        recordBezierCurveTo(vaulter, ctx, 247.3, 189.3, 237.9, 190.4, 235.9, 190.4);
        recordBezierCurveTo(vaulter, ctx, 234.0, 190.3, 234.4, 189.8, 233.2, 189.6);
        recordBezierCurveTo(vaulter, ctx, 233.2, 189.6, 237.6, 198.2, 236.1, 205.6);
        recordBezierCurveTo(vaulter, ctx, 234.6, 213.1, 228.0, 212.4, 228.0, 212.4);
        ctx.fillStyle = "rgb(17, 92, 137)";
        ctx.fill();
        ctx.lineWidth = 0.5;
        ctx.strokeStyle = "rgb(141, 204, 255)";
        ctx.lineJoin = "miter";
        ctx.miterLimit = 4.0;
        ctx.stroke();

        // vaulter/Path
        ctx.beginPath();
        recordMoveTo(vaulter, ctx, 208.7, 190.4);
        recordBezierCurveTo(vaulter, ctx, 208.7, 190.4, 211.4, 183.9, 210.6, 180.9);
        recordBezierCurveTo(vaulter, ctx, 210.6, 180.9, 212.0, 171.2, 211.7, 170.2);
        recordBezierCurveTo(vaulter, ctx, 211.7, 170.2, 212.8, 162.4, 213.1, 161.3);
        recordBezierCurveTo(vaulter, ctx, 213.4, 160.2, 215.2, 157.8, 214.7, 156.6);
        recordBezierCurveTo(vaulter, ctx, 214.2, 155.3, 212.0, 154.2, 211.8, 154.4);
        recordBezierCurveTo(vaulter, ctx, 211.6, 154.6, 209.5, 157.4, 210.5, 158.3);
        recordBezierCurveTo(vaulter, ctx, 211.4, 159.3, 211.3, 161.3, 211.1, 162.2);
        recordBezierCurveTo(vaulter, ctx, 210.9, 163.2, 208.7, 170.8, 208.7, 170.8);
        recordBezierCurveTo(vaulter, ctx, 208.7, 170.8, 206.6, 178.1, 206.7, 179.6);
        recordBezierCurveTo(vaulter, ctx, 206.7, 179.6, 201.9, 187.3, 201.5, 189.6);
        ctx.fill();
        ctx.stroke();

        // vaulter/Path
        ctx.beginPath();
        recordMoveTo(vaulter, ctx, 294.9, 342.2);
        recordLineTo(vaulter, ctx, 292.9, 342.2);
        recordBezierCurveTo(vaulter, ctx, 292.9, 341.6, 293.9, 263.6, 291.6, 245.5);
        recordBezierCurveTo(vaulter, ctx, 289.5, 228.6, 284.0, 204.0, 269.3, 182.9);
        recordBezierCurveTo(vaulter, ctx, 257.7, 166.1, 238.2, 157.7, 213.0, 158.4);
        recordBezierCurveTo(vaulter, ctx, 193.9, 159.0, 178.0, 164.6, 177.9, 164.7);
        recordBezierCurveTo(vaulter, ctx, 177.9, 164.7, 177.0, 164.9, 176.7, 164.0);
        recordBezierCurveTo(vaulter, ctx, 176.4, 163.1, 177.2, 162.8, 177.2, 162.8);
        recordBezierCurveTo(vaulter, ctx, 177.4, 162.7, 193.4, 157.0, 212.9, 156.4);
        recordBezierCurveTo(vaulter, ctx, 238.9, 155.6, 259.0, 164.4, 271.0, 181.7);
        recordBezierCurveTo(vaulter, ctx, 285.9, 203.2, 291.5, 228.1, 293.6, 245.3);
        recordBezierCurveTo(vaulter, ctx, 295.9, 264.0, 294.9, 341.7, 294.9, 342.2);
        ctx.closePath();
        ctx.fill();
        ctx.stroke();

        // vaulter/Path
        ctx.beginPath();
        recordMoveTo(vaulter, ctx, 205.3, 186.7);
        recordBezierCurveTo(vaulter, ctx, 205.3, 186.7, 203.8, 181.9, 202.9, 181.1);
        recordBezierCurveTo(vaulter, ctx, 202.1, 180.3, 198.8, 177.6, 198.8, 177.6);
        recordBezierCurveTo(vaulter, ctx, 198.8, 177.6, 194.2, 175.4, 191.2, 178.7);
        recordBezierCurveTo(vaulter, ctx, 188.2, 182.0, 191.0, 186.7, 192.6, 188.2);
        recordBezierCurveTo(vaulter, ctx, 194.2, 189.6, 199.5, 191.7, 199.5, 191.7);
        recordBezierCurveTo(vaulter, ctx, 199.5, 191.7, 199.8, 191.9, 200.1, 192.2);
        ctx.fill();
        ctx.stroke();

        // vaulter/Path
        ctx.beginPath();
        recordMoveTo(vaulter, ctx, 224.6, 200.8);
        recordBezierCurveTo(vaulter, ctx, 224.6, 200.8, 214.8, 194.1, 212.7, 191.0);
        recordBezierCurveTo(vaulter, ctx, 210.6, 187.9, 204.8, 187.9, 203.7, 189.1);
        recordBezierCurveTo(vaulter, ctx, 202.7, 190.4, 200.4, 195.0, 202.1, 198.7);
        recordBezierCurveTo(vaulter, ctx, 203.7, 202.5, 209.0, 206.3, 214.2, 209.4);
        recordBezierCurveTo(vaulter, ctx, 219.4, 212.5, 227.3, 213.4, 231.1, 211.1);
        recordBezierCurveTo(vaulter, ctx, 234.9, 208.8, 233.0, 205.0, 231.1, 203.1);
        recordBezierCurveTo(vaulter, ctx, 229.2, 201.2, 226.1, 201.8, 224.6, 200.8);
        ctx.closePath();
        ctx.fill();
        ctx.stroke();

        // vaulter/Path
        ctx.beginPath();
        recordMoveTo(vaulter, ctx, 222.3, 202.7);
        recordBezierCurveTo(vaulter, ctx, 222.3, 202.7, 223.8, 201.9, 224.4, 198.7);
        recordBezierCurveTo(vaulter, ctx, 225.0, 195.6, 222.7, 186.2, 223.4, 184.7);
        recordBezierCurveTo(vaulter, ctx, 224.0, 183.3, 227.8, 182.2, 230.5, 183.3);
        recordBezierCurveTo(vaulter, ctx, 233.2, 184.3, 238.4, 187.2, 243.6, 187.5);
        recordBezierCurveTo(vaulter, ctx, 243.6, 187.5, 245.7, 185.7, 247.1, 184.9);
        recordBezierCurveTo(vaulter, ctx, 248.4, 184.1, 248.2, 183.3, 249.0, 182.9);
        recordBezierCurveTo(vaulter, ctx, 249.8, 182.4, 251.2, 182.9, 251.2, 183.3);
        recordBezierCurveTo(vaulter, ctx, 251.2, 183.6, 251.2, 185.1, 250.6, 186.0);
        recordBezierCurveTo(vaulter, ctx, 250.0, 186.8, 247.9, 190.4, 248.0, 191.0);
        recordBezierCurveTo(vaulter, ctx, 248.1, 191.6, 247.4, 193.1, 246.7, 193.1);
        recordBezierCurveTo(vaulter, ctx, 246.1, 193.1, 244.3, 192.9, 244.0, 192.0);
        recordBezierCurveTo(vaulter, ctx, 244.0, 192.0, 237.7, 190.0, 235.8, 189.9);
        recordBezierCurveTo(vaulter, ctx, 233.8, 189.8, 232.8, 189.8, 231.6, 189.6);
        recordBezierCurveTo(vaulter, ctx, 231.6, 189.6, 236.0, 198.2, 234.5, 205.6);
        recordBezierCurveTo(vaulter, ctx, 233.0, 213.1, 226.5, 212.4, 226.5, 212.4);
        ctx.fill();
        ctx.stroke();

        // vaulter/Path
        ctx.beginPath();
        recordMoveTo(vaulter, ctx, 214.0, 205.4);
        recordBezierCurveTo(vaulter, ctx, 214.0, 205.4, 218.5, 200.8, 212.7, 195.0);
        recordBezierCurveTo(vaulter, ctx, 206.9, 189.3, 202.7, 190.1, 201.3, 191.7);
        recordBezierCurveTo(vaulter, ctx, 200.1, 193.0, 200.4, 196.6, 203.0, 199.8);
        recordBezierCurveTo(vaulter, ctx, 205.9, 201.8, 208.3, 204.4, 212.3, 205.6);
        recordBezierCurveTo(vaulter, ctx, 212.3, 205.6, 213.4, 205.5, 214.0, 205.4);
        ctx.closePath();
        ctx.fill();
        ctx.stroke();

        // vaulter/Path
        ctx.beginPath();
        recordMoveTo(vaulter, ctx, 202.0, 198.1);
        recordBezierCurveTo(vaulter, ctx, 201.2, 196.0, 198.5, 187.7, 199.1, 185.5);
        recordBezierCurveTo(vaulter, ctx, 199.1, 185.5, 196.1, 178.2, 196.1, 177.7);
        recordBezierCurveTo(vaulter, ctx, 196.1, 177.3, 193.2, 172.6, 192.3, 169.3);
        recordBezierCurveTo(vaulter, ctx, 191.4, 166.0, 188.8, 163.6, 188.8, 163.6);
        recordBezierCurveTo(vaulter, ctx, 188.8, 163.6, 186.0, 162.4, 185.7, 161.4);
        recordBezierCurveTo(vaulter, ctx, 185.5, 160.5, 187.3, 158.8, 187.9, 158.5);
        recordBezierCurveTo(vaulter, ctx, 188.5, 158.2, 191.8, 158.5, 191.8, 158.5);
        recordBezierCurveTo(vaulter, ctx, 191.8, 158.5, 193.2, 160.5, 192.5, 161.1);
        recordBezierCurveTo(vaulter, ctx, 191.7, 161.8, 191.8, 162.4, 192.1, 162.9);
        recordBezierCurveTo(vaulter, ctx, 192.5, 163.3, 195.6, 168.8, 195.6, 168.8);
        recordBezierCurveTo(vaulter, ctx, 195.6, 168.8, 200.1, 174.6, 200.8, 176.0);
        recordBezierCurveTo(vaulter, ctx, 201.4, 177.4, 203.6, 183.3, 203.6, 183.3);
        recordBezierCurveTo(vaulter, ctx, 203.6, 183.3, 207.0, 190.5, 207.7, 192.2);
        ctx.fill();
        ctx.stroke();
        ctx.restore();
      }
    },

    function (ctx) {
      if (vaulter.visible) {

        // vaulter/Path
        ctx.save();
        ctx.beginPath();
        recordMoveTo(vaulter, ctx, 217.5, 183.0);
        recordBezierCurveTo(vaulter, ctx, 217.5, 183.0, 217.5, 175.2, 217.5, 168.7);
        recordBezierCurveTo(vaulter, ctx, 217.5, 168.7, 219.0, 163.2, 219.8, 159.7);
        recordBezierCurveTo(vaulter, ctx, 220.6, 156.1, 220.4, 152.3, 221.2, 150.6);
        recordBezierCurveTo(vaulter, ctx, 221.2, 150.6, 223.0, 147.3, 222.7, 146.8);
        recordBezierCurveTo(vaulter, ctx, 222.4, 146.4, 220.9, 145.1, 220.9, 145.1);
        recordLineTo(vaulter, ctx, 218.1, 145.1);
        recordBezierCurveTo(vaulter, ctx, 218.1, 145.1, 216.5, 147.9, 217.5, 148.7);
        recordBezierCurveTo(vaulter, ctx, 218.4, 149.5, 218.4, 153.2, 218.2, 153.8);
        recordBezierCurveTo(vaulter, ctx, 218.1, 154.4, 215.6, 159.6, 215.1, 161.9);
        recordLineTo(vaulter, ctx, 212.3, 169.9);
        recordLineTo(vaulter, ctx, 210.0, 178.4);
        recordBezierCurveTo(vaulter, ctx, 210.0, 178.4, 209.1, 182.5, 210.0, 183.9);
        ctx.fillStyle = "rgb(17, 92, 137)";
        ctx.fill();
        ctx.lineWidth = 0.5;
        ctx.strokeStyle = "rgb(141, 204, 255)";
        ctx.lineJoin = "miter";
        ctx.miterLimit = 4.0;
        ctx.stroke();

        // vaulter/Path
        ctx.beginPath();
        recordMoveTo(vaulter, ctx, 294.9, 342.2);
        recordLineTo(vaulter, ctx, 292.9, 342.2);
        recordBezierCurveTo(vaulter, ctx, 292.9, 341.4, 295.0, 252.8, 293.4, 235.5);
        recordBezierCurveTo(vaulter, ctx, 291.8, 219.7, 286.6, 196.4, 270.6, 175.6);
        recordBezierCurveTo(vaulter, ctx, 254.5, 154.6, 232.7, 149.9, 217.2, 149.6);
        recordBezierCurveTo(vaulter, ctx, 200.4, 149.3, 187.7, 153.9, 187.2, 154.1);
        recordBezierCurveTo(vaulter, ctx, 187.2, 154.1, 186.3, 154.5, 185.9, 153.6);
        recordBezierCurveTo(vaulter, ctx, 185.5, 152.7, 186.5, 152.2, 186.5, 152.2);
        recordBezierCurveTo(vaulter, ctx, 187.1, 152.0, 200.1, 147.3, 217.2, 147.6);
        recordBezierCurveTo(vaulter, ctx, 233.2, 147.9, 255.6, 152.8, 272.2, 174.4);
        recordBezierCurveTo(vaulter, ctx, 288.5, 195.6, 293.8, 219.2, 295.3, 235.3);
        recordBezierCurveTo(vaulter, ctx, 297.1, 252.8, 295.0, 341.8, 294.9, 342.2);
        ctx.closePath();
        ctx.fill();
        ctx.stroke();

        // vaulter/Path
        ctx.beginPath();
        recordMoveTo(vaulter, ctx, 237.2, 196.2);
        recordBezierCurveTo(vaulter, ctx, 237.2, 196.2, 246.3, 194.2, 245.6, 185.6);
        recordBezierCurveTo(vaulter, ctx, 245.0, 178.9, 236.3, 169.1, 236.3, 169.1);
        recordBezierCurveTo(vaulter, ctx, 241.4, 169.0, 245.2, 163.7, 252.5, 163.9);
        recordBezierCurveTo(vaulter, ctx, 252.5, 163.9, 253.7, 164.6, 254.4, 164.7);
        recordBezierCurveTo(vaulter, ctx, 255.1, 164.7, 256.3, 163.8, 256.3, 163.1);
        recordBezierCurveTo(vaulter, ctx, 256.3, 162.5, 255.3, 158.7, 255.7, 156.7);
        recordBezierCurveTo(vaulter, ctx, 255.9, 155.4, 255.7, 154.2, 255.1, 153.2);
        recordBezierCurveTo(vaulter, ctx, 254.5, 152.2, 254.1, 151.4, 253.2, 151.3);
        recordBezierCurveTo(vaulter, ctx, 252.5, 151.3, 252.5, 153.8, 252.5, 153.8);
        recordBezierCurveTo(vaulter, ctx, 252.5, 153.8, 251.3, 157.0, 251.3, 159.9);
        recordBezierCurveTo(vaulter, ctx, 251.3, 161.4, 233.9, 163.1, 233.9, 163.1);
        recordBezierCurveTo(vaulter, ctx, 233.9, 163.1, 229.7, 164.0, 228.7, 166.2);
        recordBezierCurveTo(vaulter, ctx, 227.7, 168.4, 228.5, 171.4, 229.3, 172.4);
        recordBezierCurveTo(vaulter, ctx, 230.2, 173.5, 234.6, 183.3, 234.6, 183.3);
        ctx.fill();
        ctx.stroke();

        // vaulter/Path
        ctx.beginPath();
        recordMoveTo(vaulter, ctx, 212.9, 176.9);
        recordBezierCurveTo(vaulter, ctx, 212.9, 176.9, 210.4, 172.5, 209.5, 171.9);
        recordBezierCurveTo(vaulter, ctx, 208.5, 171.3, 204.7, 169.5, 204.7, 169.5);
        recordBezierCurveTo(vaulter, ctx, 204.7, 169.5, 199.7, 168.3, 197.6, 172.2);
        recordBezierCurveTo(vaulter, ctx, 195.4, 176.1, 199.1, 180.0, 201.0, 181.0);
        recordBezierCurveTo(vaulter, ctx, 202.9, 182.1, 208.5, 182.9, 208.5, 182.9);
        recordBezierCurveTo(vaulter, ctx, 208.5, 182.9, 208.8, 183.0, 209.1, 183.3);
        ctx.fill();
        ctx.stroke();

        // vaulter/Path
        ctx.beginPath();
        recordMoveTo(vaulter, ctx, 209.0, 184.7);
        recordBezierCurveTo(vaulter, ctx, 209.0, 184.7, 210.0, 190.9, 214.6, 191.9);
        recordBezierCurveTo(vaulter, ctx, 219.1, 192.9, 222.6, 195.6, 224.7, 196.3);
        recordBezierCurveTo(vaulter, ctx, 226.8, 196.9, 233.6, 197.3, 236.3, 196.3);
        recordBezierCurveTo(vaulter, ctx, 239.0, 195.2, 237.9, 186.5, 233.6, 186.1);
        recordBezierCurveTo(vaulter, ctx, 229.3, 185.7, 219.7, 178.7, 217.0, 178.5);
        recordBezierCurveTo(vaulter, ctx, 214.3, 178.2, 208.8, 179.1, 209.0, 184.7);
        ctx.closePath();
        ctx.fill();
        ctx.stroke();

        // vaulter/Path
        ctx.beginPath();
        recordMoveTo(vaulter, ctx, 233.2, 196.9);
        recordBezierCurveTo(vaulter, ctx, 233.2, 196.9, 242.5, 196.7, 242.8, 190.0);
        recordBezierCurveTo(vaulter, ctx, 243.1, 183.2, 231.9, 173.7, 231.9, 173.7);
        recordBezierCurveTo(vaulter, ctx, 237.1, 173.6, 240.6, 172.0, 247.9, 172.2);
        recordBezierCurveTo(vaulter, ctx, 247.9, 172.2, 249.1, 172.9, 249.8, 173.0);
        recordBezierCurveTo(vaulter, ctx, 250.5, 173.1, 251.8, 172.1, 251.8, 171.4);
        recordBezierCurveTo(vaulter, ctx, 251.8, 170.8, 250.8, 167.2, 250.8, 166.2);
        recordBezierCurveTo(vaulter, ctx, 250.8, 165.2, 250.3, 163.1, 250.1, 162.0);
        recordBezierCurveTo(vaulter, ctx, 250.0, 160.7, 249.6, 159.7, 248.7, 159.7);
        recordBezierCurveTo(vaulter, ctx, 247.9, 159.6, 247.6, 162.9, 247.6, 162.9);
        recordBezierCurveTo(vaulter, ctx, 247.6, 162.9, 246.1, 165.4, 246.7, 168.3);
        recordBezierCurveTo(vaulter, ctx, 247.0, 169.7, 229.6, 167.7, 229.6, 167.7);
        recordBezierCurveTo(vaulter, ctx, 229.6, 167.7, 225.4, 168.6, 224.4, 170.8);
        recordBezierCurveTo(vaulter, ctx, 223.4, 173.0, 224.1, 175.9, 225.0, 177.0);
        recordBezierCurveTo(vaulter, ctx, 225.8, 178.1, 231.9, 187.7, 231.9, 187.7);
        ctx.fill();
        ctx.stroke();

        // vaulter/Path
        ctx.beginPath();
        recordMoveTo(vaulter, ctx, 221.6, 192.0);
        recordBezierCurveTo(vaulter, ctx, 222.4, 190.6, 222.8, 185.1, 218.0, 182.3);
        recordBezierCurveTo(vaulter, ctx, 214.1, 179.9, 211.0, 181.1, 209.9, 182.9);
        recordBezierCurveTo(vaulter, ctx, 209.1, 184.4, 210.2, 187.9, 213.4, 190.3);
        recordBezierCurveTo(vaulter, ctx, 216.7, 191.7, 215.9, 192.3, 220.0, 192.6);
        recordBezierCurveTo(vaulter, ctx, 220.0, 192.6, 221.1, 192.6, 221.6, 192.0);
        ctx.closePath();
        ctx.fill();
        ctx.stroke();

        // vaulter/Path
        ctx.beginPath();
        recordMoveTo(vaulter, ctx, 210.9, 187.7);
        recordBezierCurveTo(vaulter, ctx, 210.9, 187.7, 209.1, 184.4, 209.7, 181.4);
        recordBezierCurveTo(vaulter, ctx, 209.7, 181.4, 206.6, 174.9, 206.6, 169.8);
        recordBezierCurveTo(vaulter, ctx, 206.6, 169.8, 202.7, 165.5, 201.9, 161.7);
        recordBezierCurveTo(vaulter, ctx, 201.1, 158.0, 197.7, 153.2, 197.7, 153.2);
        recordBezierCurveTo(vaulter, ctx, 197.7, 153.2, 193.8, 152.4, 193.4, 150.4);
        recordLineTo(vaulter, ctx, 194.3, 148.7);
        recordBezierCurveTo(vaulter, ctx, 194.3, 148.7, 197.9, 147.5, 199.4, 147.7);
        recordBezierCurveTo(vaulter, ctx, 201.0, 147.9, 201.6, 150.2, 201.1, 150.7);
        recordBezierCurveTo(vaulter, ctx, 200.7, 151.2, 201.5, 152.9, 202.2, 154.0);
        recordBezierCurveTo(vaulter, ctx, 202.9, 155.1, 206.1, 159.7, 206.6, 160.7);
        recordBezierCurveTo(vaulter, ctx, 207.2, 161.7, 211.1, 166.1, 211.6, 167.7);
        recordBezierCurveTo(vaulter, ctx, 212.0, 169.2, 215.4, 178.3, 215.4, 178.3);
        recordBezierCurveTo(vaulter, ctx, 215.4, 178.3, 217.4, 180.8, 217.7, 182.5);
        ctx.fill();
        ctx.stroke();
        ctx.restore();
      }
    },

    function (ctx) {
      if (vaulter.visible) {

        // vaulter/Path
        ctx.save();
        ctx.beginPath();
        recordMoveTo(vaulter, ctx, 224.3, 176.8);
        recordBezierCurveTo(vaulter, ctx, 224.3, 176.8, 226.3, 171.9, 225.0, 167.9);
        recordBezierCurveTo(vaulter, ctx, 225.0, 167.9, 227.2, 160.7, 227.2, 156.9);
        recordBezierCurveTo(vaulter, ctx, 227.2, 156.9, 228.1, 152.7, 228.3, 150.4);
        recordBezierCurveTo(vaulter, ctx, 228.5, 148.0, 228.3, 145.6, 228.3, 145.6);
        recordBezierCurveTo(vaulter, ctx, 228.3, 145.6, 230.3, 143.1, 230.2, 141.7);
        recordBezierCurveTo(vaulter, ctx, 230.0, 140.3, 227.2, 140.0, 227.2, 140.0);
        recordLineTo(vaulter, ctx, 224.3, 140.8);
        recordBezierCurveTo(vaulter, ctx, 224.3, 140.8, 223.5, 143.5, 224.3, 144.5);
        recordBezierCurveTo(vaulter, ctx, 225.0, 145.4, 225.0, 145.4, 225.0, 145.4);
        recordBezierCurveTo(vaulter, ctx, 225.5, 149.4, 223.6, 151.8, 223.9, 154.9);
        recordBezierCurveTo(vaulter, ctx, 222.1, 158.3, 220.1, 166.6, 220.1, 166.6);
        recordBezierCurveTo(vaulter, ctx, 220.1, 166.6, 217.4, 173.3, 217.9, 176.8);
        ctx.fillStyle = "rgb(17, 92, 137)";
        ctx.fill();
        ctx.lineWidth = 0.5;
        ctx.strokeStyle = "rgb(141, 204, 255)";
        ctx.lineJoin = "miter";
        ctx.miterLimit = 4.0;
        ctx.stroke();

        // vaulter/Path
        ctx.beginPath();
        recordMoveTo(vaulter, ctx, 220.1, 170.8);
        recordBezierCurveTo(vaulter, ctx, 220.1, 170.8, 217.1, 166.7, 216.1, 166.2);
        recordBezierCurveTo(vaulter, ctx, 215.1, 165.7, 211.1, 164.3, 211.1, 164.3);
        recordBezierCurveTo(vaulter, ctx, 211.1, 164.3, 206.0, 163.6, 204.3, 167.7);
        recordBezierCurveTo(vaulter, ctx, 202.5, 171.8, 206.6, 175.3, 208.6, 176.1);
        recordBezierCurveTo(vaulter, ctx, 210.6, 177.0, 216.3, 177.2, 216.3, 177.2);
        recordBezierCurveTo(vaulter, ctx, 216.3, 177.2, 216.6, 177.3, 216.9, 177.5);
        ctx.fill();
        ctx.stroke();

        // vaulter/Path
        ctx.beginPath();
        recordMoveTo(vaulter, ctx, 229.6, 184.8);
        recordBezierCurveTo(vaulter, ctx, 230.4, 183.3, 230.1, 177.8, 225.1, 175.5);
        recordBezierCurveTo(vaulter, ctx, 221.0, 173.5, 218.0, 175.0, 217.2, 176.9);
        recordBezierCurveTo(vaulter, ctx, 216.5, 178.5, 218.0, 181.8, 221.3, 184.0);
        recordBezierCurveTo(vaulter, ctx, 224.7, 185.0, 224.0, 185.6, 228.1, 185.5);
        recordBezierCurveTo(vaulter, ctx, 228.1, 185.5, 229.2, 185.4, 229.6, 184.8);
        ctx.closePath();
        ctx.fill();
        ctx.stroke();

        // vaulter/Path
        ctx.beginPath();
        recordMoveTo(vaulter, ctx, 294.9, 342.2);
        recordLineTo(vaulter, ctx, 292.9, 342.2);
        recordBezierCurveTo(vaulter, ctx, 292.9, 341.4, 294.5, 241.9, 292.7, 223.3);
        recordBezierCurveTo(vaulter, ctx, 291.0, 206.0, 285.9, 181.8, 271.4, 164.7);
        recordBezierCurveTo(vaulter, ctx, 256.8, 147.5, 237.4, 143.2, 223.7, 142.5);
        recordBezierCurveTo(vaulter, ctx, 208.9, 141.8, 197.6, 145.1, 197.2, 145.2);
        recordBezierCurveTo(vaulter, ctx, 197.2, 145.2, 196.3, 145.3, 196.0, 144.5);
        recordBezierCurveTo(vaulter, ctx, 195.7, 143.7, 196.6, 143.3, 196.6, 143.3);
        recordBezierCurveTo(vaulter, ctx, 197.1, 143.1, 208.6, 139.8, 223.8, 140.5);
        recordBezierCurveTo(vaulter, ctx, 237.9, 141.2, 257.9, 145.7, 272.9, 163.4);
        recordBezierCurveTo(vaulter, ctx, 287.8, 180.9, 293.0, 205.5, 294.7, 223.1);
        recordBezierCurveTo(vaulter, ctx, 296.6, 242.0, 295.0, 341.7, 294.9, 342.2);
        ctx.closePath();
        ctx.fill();
        ctx.stroke();

        // vaulter/Path
        ctx.beginPath();
        recordMoveTo(vaulter, ctx, 216.7, 178.5);
        recordBezierCurveTo(vaulter, ctx, 216.7, 178.5, 216.8, 181.4, 218.8, 183.1);
        recordBezierCurveTo(vaulter, ctx, 220.8, 184.8, 227.5, 186.4, 227.5, 186.4);
        recordBezierCurveTo(vaulter, ctx, 227.5, 186.4, 230.5, 188.6, 234.8, 189.0);
        recordBezierCurveTo(vaulter, ctx, 239.2, 189.5, 241.7, 187.5, 241.7, 187.5);
        recordBezierCurveTo(vaulter, ctx, 241.7, 187.5, 243.2, 181.4, 239.8, 180.0);
        recordBezierCurveTo(vaulter, ctx, 238.0, 178.8, 236.1, 177.7, 234.4, 176.8);
        recordBezierCurveTo(vaulter, ctx, 232.7, 175.8, 226.7, 173.4, 223.5, 172.3);
        recordBezierCurveTo(vaulter, ctx, 220.2, 171.2, 216.3, 176.7, 216.7, 178.5);
        ctx.closePath();
        ctx.fill();
        ctx.stroke();

        // vaulter/Path
        ctx.beginPath();
        recordMoveTo(vaulter, ctx, 241.1, 187.8);
        recordBezierCurveTo(vaulter, ctx, 241.1, 187.8, 249.6, 185.5, 249.4, 180.0);
        recordBezierCurveTo(vaulter, ctx, 249.3, 174.6, 241.5, 169.8, 239.2, 169.5);
        recordBezierCurveTo(vaulter, ctx, 236.8, 169.2, 235.4, 168.7, 235.4, 168.7);
        recordBezierCurveTo(vaulter, ctx, 235.4, 168.7, 239.2, 166.8, 240.1, 164.0);
        recordBezierCurveTo(vaulter, ctx, 241.0, 161.2, 247.4, 156.6, 247.4, 156.6);
        recordBezierCurveTo(vaulter, ctx, 247.4, 156.6, 249.4, 156.4, 250.2, 155.8);
        recordBezierCurveTo(vaulter, ctx, 251.0, 155.2, 251.1, 154.2, 250.2, 153.1);
        recordBezierCurveTo(vaulter, ctx, 249.3, 152.1, 247.3, 150.7, 245.4, 149.8);
        recordBezierCurveTo(vaulter, ctx, 243.4, 148.9, 239.4, 145.5, 238.3, 146.3);
        recordBezierCurveTo(vaulter, ctx, 237.7, 146.7, 239.4, 149.3, 240.3, 149.6);
        recordBezierCurveTo(vaulter, ctx, 240.3, 149.6, 242.5, 153.1, 244.4, 154.7);
        recordBezierCurveTo(vaulter, ctx, 244.4, 154.7, 239.6, 158.3, 235.4, 160.6);
        recordBezierCurveTo(vaulter, ctx, 231.2, 163.0, 227.1, 165.3, 227.2, 167.9);
        recordBezierCurveTo(vaulter, ctx, 227.4, 170.4, 229.1, 173.4, 231.8, 175.1);
        recordLineTo(vaulter, ctx, 239.0, 179.7);
        ctx.fill();
        ctx.stroke();

        // vaulter/Path
        ctx.beginPath();
        recordMoveTo(vaulter, ctx, 219.8, 181.6);
        recordBezierCurveTo(vaulter, ctx, 219.8, 181.6, 215.9, 179.3, 215.7, 170.4);
        recordBezierCurveTo(vaulter, ctx, 215.7, 170.4, 212.6, 163.9, 212.0, 160.2);
        recordBezierCurveTo(vaulter, ctx, 212.0, 160.2, 208.4, 150.7, 206.3, 147.9);
        recordBezierCurveTo(vaulter, ctx, 206.3, 147.9, 204.4, 146.0, 203.6, 145.7);
        recordBezierCurveTo(vaulter, ctx, 202.8, 145.4, 203.5, 142.0, 203.6, 141.7);
        recordBezierCurveTo(vaulter, ctx, 203.8, 141.4, 206.4, 141.7, 206.4, 141.7);
        recordBezierCurveTo(vaulter, ctx, 206.4, 141.7, 208.3, 140.8, 209.0, 140.8);
        recordBezierCurveTo(vaulter, ctx, 209.8, 140.8, 211.4, 143.4, 210.8, 144.9);
        recordBezierCurveTo(vaulter, ctx, 210.1, 146.5, 210.1, 147.7, 210.8, 149.1);
        recordBezierCurveTo(vaulter, ctx, 211.4, 150.5, 216.1, 157.4, 216.6, 158.9);
        recordBezierCurveTo(vaulter, ctx, 217.1, 160.5, 220.7, 167.9, 220.7, 167.9);
        recordBezierCurveTo(vaulter, ctx, 220.7, 167.9, 222.9, 170.7, 224.3, 175.1);
        ctx.fill();
        ctx.stroke();

        // vaulter/Path
        ctx.beginPath();
        recordMoveTo(vaulter, ctx, 241.8, 187.6);
        recordBezierCurveTo(vaulter, ctx, 247.0, 187.3, 252.1, 184.0, 251.9, 179.3);
        recordBezierCurveTo(vaulter, ctx, 251.8, 174.7, 239.8, 164.7, 239.8, 164.7);
        recordBezierCurveTo(vaulter, ctx, 244.1, 162.3, 248.4, 157.1, 252.0, 154.3);
        recordBezierCurveTo(vaulter, ctx, 252.0, 154.3, 254.3, 154.7, 255.0, 154.3);
        recordBezierCurveTo(vaulter, ctx, 255.6, 153.8, 256.4, 152.0, 255.1, 150.7);
        recordBezierCurveTo(vaulter, ctx, 253.7, 149.5, 252.8, 147.8, 252.1, 146.5);
        recordBezierCurveTo(vaulter, ctx, 251.3, 145.1, 250.3, 141.5, 250.3, 141.5);
        recordBezierCurveTo(vaulter, ctx, 250.3, 141.5, 249.4, 140.6, 248.9, 141.0);
        recordBezierCurveTo(vaulter, ctx, 248.4, 141.4, 248.6, 143.3, 248.7, 143.7);
        recordBezierCurveTo(vaulter, ctx, 249.2, 145.5, 248.1, 147.8, 249.6, 151.3);
        recordBezierCurveTo(vaulter, ctx, 241.9, 157.9, 235.2, 159.4, 231.4, 163.0);
        recordBezierCurveTo(vaulter, ctx, 231.4, 163.0, 227.1, 166.9, 228.6, 169.8);
        recordBezierCurveTo(vaulter, ctx, 230.0, 172.7, 241.4, 180.0, 241.4, 180.0);
        ctx.fill();
        ctx.stroke();
        ctx.restore();
      }
    },

    function (ctx) {
      if (vaulter.visible) {

        // vaulter/Path
        ctx.save();
        ctx.beginPath();
        recordMoveTo(vaulter, ctx, 228.0, 166.1);
        recordBezierCurveTo(vaulter, ctx, 228.0, 166.1, 229.7, 159.2, 231.1, 157.2);
        recordBezierCurveTo(vaulter, ctx, 231.1, 157.2, 231.1, 152.2, 232.8, 147.2);
        recordBezierCurveTo(vaulter, ctx, 232.8, 147.2, 232.7, 144.4, 233.8, 142.6);
        recordBezierCurveTo(vaulter, ctx, 234.9, 140.7, 234.7, 137.4, 234.7, 137.4);
        recordBezierCurveTo(vaulter, ctx, 234.7, 137.4, 233.3, 135.9, 233.9, 134.1);
        recordBezierCurveTo(vaulter, ctx, 234.5, 132.4, 235.9, 133.3, 235.9, 133.3);
        recordBezierCurveTo(vaulter, ctx, 235.9, 133.3, 238.2, 133.2, 239.2, 134.1);
        recordBezierCurveTo(vaulter, ctx, 240.1, 135.0, 240.3, 137.5, 239.2, 138.0);
        recordBezierCurveTo(vaulter, ctx, 238.1, 138.5, 237.3, 141.9, 237.3, 141.9);
        recordBezierCurveTo(vaulter, ctx, 237.3, 141.9, 237.3, 147.2, 236.7, 147.6);
        recordBezierCurveTo(vaulter, ctx, 236.7, 147.6, 236.1, 156.0, 235.4, 158.0);
        recordBezierCurveTo(vaulter, ctx, 235.4, 158.0, 235.6, 165.8, 234.7, 167.6);
        ctx.fillStyle = "rgb(17, 92, 137)";
        ctx.fill();
        ctx.lineWidth = 0.5;
        ctx.strokeStyle = "rgb(141, 204, 255)";
        ctx.lineJoin = "miter";
        ctx.miterLimit = 4.0;
        ctx.stroke();

        // vaulter/Path
        ctx.beginPath();
        recordMoveTo(vaulter, ctx, 226.5, 162.6);
        recordBezierCurveTo(vaulter, ctx, 226.5, 162.6, 222.4, 159.7, 221.3, 159.6);
        recordBezierCurveTo(vaulter, ctx, 220.1, 159.4, 215.9, 159.3, 215.9, 159.3);
        recordBezierCurveTo(vaulter, ctx, 215.9, 159.3, 210.9, 160.3, 210.5, 164.7);
        recordBezierCurveTo(vaulter, ctx, 210.2, 169.2, 215.2, 171.2, 217.3, 171.4);
        recordBezierCurveTo(vaulter, ctx, 219.5, 171.5, 224.9, 170.0, 224.9, 170.0);
        recordBezierCurveTo(vaulter, ctx, 224.9, 170.0, 225.3, 170.0, 225.7, 170.0);
        ctx.fill();
        ctx.stroke();

        // vaulter/Path
        ctx.beginPath();
        recordMoveTo(vaulter, ctx, 240.3, 172.8);
        recordBezierCurveTo(vaulter, ctx, 240.5, 171.2, 238.5, 166.1, 233.1, 165.4);
        recordBezierCurveTo(vaulter, ctx, 228.5, 164.9, 226.2, 167.2, 226.0, 169.4);
        recordBezierCurveTo(vaulter, ctx, 225.8, 171.1, 228.2, 173.8, 232.1, 174.7);
        recordBezierCurveTo(vaulter, ctx, 235.7, 174.6, 235.2, 175.4, 239.1, 174.0);
        recordBezierCurveTo(vaulter, ctx, 239.1, 174.0, 240.1, 173.6, 240.3, 172.8);
        ctx.closePath();
        ctx.fill();
        ctx.stroke();

        // vaulter/Path
        ctx.beginPath();
        recordMoveTo(vaulter, ctx, 294.9, 342.2);
        recordLineTo(vaulter, ctx, 292.9, 342.2);
        recordBezierCurveTo(vaulter, ctx, 292.9, 342.1, 293.1, 241.0, 293.1, 231.4);
        recordBezierCurveTo(vaulter, ctx, 293.2, 214.3, 290.7, 186.6, 276.9, 163.1);
        recordBezierCurveTo(vaulter, ctx, 267.9, 147.8, 253.6, 138.7, 234.2, 136.0);
        recordBezierCurveTo(vaulter, ctx, 219.7, 134.0, 207.7, 136.5, 207.6, 136.6);
        recordBezierCurveTo(vaulter, ctx, 207.6, 136.6, 206.5, 136.7, 206.4, 135.7);
        recordBezierCurveTo(vaulter, ctx, 206.2, 134.7, 207.1, 134.5, 207.1, 134.5);
        recordBezierCurveTo(vaulter, ctx, 207.6, 134.3, 219.6, 131.8, 234.5, 133.9);
        recordBezierCurveTo(vaulter, ctx, 248.3, 135.8, 267.1, 142.2, 278.8, 162.0);
        recordBezierCurveTo(vaulter, ctx, 292.8, 185.9, 295.3, 214.1, 295.3, 231.4);
        recordBezierCurveTo(vaulter, ctx, 295.3, 241.2, 294.9, 342.1, 294.9, 342.2);
        ctx.closePath();
        ctx.fill();
        ctx.stroke();

        // vaulter/Path
        ctx.beginPath();
        recordMoveTo(vaulter, ctx, 229.8, 163.8);
        recordBezierCurveTo(vaulter, ctx, 229.8, 163.8, 225.5, 165.0, 225.2, 167.9);
        recordBezierCurveTo(vaulter, ctx, 225.0, 170.8, 226.7, 175.1, 232.1, 176.0);
        recordBezierCurveTo(vaulter, ctx, 237.5, 176.8, 239.7, 176.4, 243.0, 177.0);
        recordBezierCurveTo(vaulter, ctx, 246.4, 177.6, 250.9, 174.9, 250.8, 171.6);
        recordBezierCurveTo(vaulter, ctx, 250.7, 168.3, 245.3, 166.5, 243.3, 166.2);
        recordBezierCurveTo(vaulter, ctx, 241.2, 166.0, 235.0, 165.6, 233.7, 164.8);
        recordBezierCurveTo(vaulter, ctx, 232.5, 164.0, 229.8, 163.8, 229.8, 163.8);
        ctx.closePath();
        ctx.fill();
        ctx.stroke();

        // vaulter/Path
        ctx.beginPath();
        recordMoveTo(vaulter, ctx, 232.8, 166.9);
        recordBezierCurveTo(vaulter, ctx, 232.8, 166.9, 231.0, 159.8, 229.0, 156.4);
        recordBezierCurveTo(vaulter, ctx, 229.0, 156.4, 226.7, 149.4, 225.2, 147.5);
        recordBezierCurveTo(vaulter, ctx, 225.2, 147.5, 223.2, 143.3, 221.3, 141.1);
        recordBezierCurveTo(vaulter, ctx, 219.5, 138.9, 219.5, 136.9, 219.5, 136.9);
        recordBezierCurveTo(vaulter, ctx, 219.5, 136.9, 220.9, 136.0, 220.9, 135.1);
        recordBezierCurveTo(vaulter, ctx, 220.9, 134.2, 219.5, 132.2, 219.5, 132.2);
        recordBezierCurveTo(vaulter, ctx, 219.5, 132.2, 217.3, 132.6, 216.4, 132.8);
        recordBezierCurveTo(vaulter, ctx, 215.6, 133.0, 214.8, 132.1, 214.3, 132.2);
        recordBezierCurveTo(vaulter, ctx, 213.7, 132.4, 212.8, 134.9, 213.6, 136.0);
        recordBezierCurveTo(vaulter, ctx, 214.3, 137.2, 216.0, 137.3, 216.4, 137.8);
        recordBezierCurveTo(vaulter, ctx, 216.9, 138.3, 218.9, 144.8, 220.6, 148.0);
        recordLineTo(vaulter, ctx, 224.2, 157.5);
        recordBezierCurveTo(vaulter, ctx, 224.2, 157.5, 224.4, 164.9, 226.8, 170.6);
        ctx.fill();
        ctx.stroke();

        // vaulter/Path
        ctx.beginPath();
        recordMoveTo(vaulter, ctx, 249.0, 175.1);
        recordBezierCurveTo(vaulter, ctx, 253.0, 174.7, 259.4, 169.8, 259.2, 166.7);
        recordBezierCurveTo(vaulter, ctx, 259.0, 163.6, 254.4, 158.6, 249.9, 158.6);
        recordBezierCurveTo(vaulter, ctx, 245.3, 158.6, 237.3, 158.6, 237.3, 158.6);
        recordBezierCurveTo(vaulter, ctx, 237.3, 158.6, 239.7, 156.3, 240.8, 153.4);
        recordBezierCurveTo(vaulter, ctx, 241.8, 150.5, 242.8, 142.6, 243.7, 141.0);
        recordBezierCurveTo(vaulter, ctx, 244.5, 139.3, 246.3, 139.2, 246.2, 138.1);
        recordBezierCurveTo(vaulter, ctx, 246.1, 136.9, 244.7, 135.3, 243.3, 135.5);
        recordBezierCurveTo(vaulter, ctx, 241.8, 135.7, 236.6, 134.1, 236.6, 134.1);
        recordBezierCurveTo(vaulter, ctx, 236.6, 134.1, 233.2, 133.1, 234.0, 134.9);
        recordBezierCurveTo(vaulter, ctx, 234.8, 136.5, 235.8, 136.7, 235.8, 136.7);
        recordBezierCurveTo(vaulter, ctx, 235.8, 136.7, 238.8, 139.2, 241.0, 139.8);
        recordLineTo(vaulter, ctx, 234.7, 152.2);
        recordBezierCurveTo(vaulter, ctx, 234.7, 152.2, 229.7, 157.7, 230.1, 158.7);
        recordBezierCurveTo(vaulter, ctx, 230.5, 159.7, 231.4, 164.1, 233.7, 164.8);
        recordBezierCurveTo(vaulter, ctx, 236.1, 165.5, 247.6, 167.7, 247.6, 167.7);
        ctx.fill();
        ctx.stroke();

        // vaulter/Path
        ctx.beginPath();
        recordMoveTo(vaulter, ctx, 259.2, 166.7);
        recordBezierCurveTo(vaulter, ctx, 259.7, 162.7, 254.4, 156.7, 249.3, 156.0);
        recordBezierCurveTo(vaulter, ctx, 244.1, 155.3, 241.3, 155.3, 241.3, 155.3);
        recordBezierCurveTo(vaulter, ctx, 241.3, 155.3, 243.4, 152.9, 244.0, 150.4);
        recordBezierCurveTo(vaulter, ctx, 244.6, 147.9, 247.9, 139.1, 249.4, 137.4);
        recordBezierCurveTo(vaulter, ctx, 249.4, 137.4, 252.1, 137.1, 252.2, 135.5);
        recordBezierCurveTo(vaulter, ctx, 252.4, 134.0, 251.0, 133.0, 250.3, 133.0);
        recordBezierCurveTo(vaulter, ctx, 249.6, 133.0, 246.8, 131.8, 245.5, 131.2);
        recordBezierCurveTo(vaulter, ctx, 244.3, 130.5, 240.9, 128.4, 240.4, 129.1);
        recordBezierCurveTo(vaulter, ctx, 239.9, 129.9, 240.9, 131.0, 241.7, 131.5);
        recordBezierCurveTo(vaulter, ctx, 241.7, 131.5, 244.1, 135.0, 246.0, 135.7);
        recordBezierCurveTo(vaulter, ctx, 241.2, 145.3, 238.8, 145.9, 233.3, 155.3);
        recordBezierCurveTo(vaulter, ctx, 233.3, 155.3, 231.3, 157.9, 233.3, 161.6);
        recordBezierCurveTo(vaulter, ctx, 235.2, 165.3, 246.6, 166.7, 246.6, 166.7);
        ctx.fill();
        ctx.stroke();
        ctx.restore();
      }
    },

    function (ctx) {
      if (vaulter.visible) {

      var alpha =   ctx.globalAlpha;

        // vaulter/Path
        ctx.save();
        ctx.beginPath();
        recordMoveTo(vaulter, ctx, 238.6, 154.5);
        recordBezierCurveTo(vaulter, ctx, 238.6, 154.5, 240.3, 146.9, 242.0, 144.6);
        recordBezierCurveTo(vaulter, ctx, 242.0, 144.6, 242.3, 134.6, 243.2, 133.1);
        recordBezierCurveTo(vaulter, ctx, 243.2, 133.1, 243.7, 128.2, 244.3, 125.7);
        recordBezierCurveTo(vaulter, ctx, 245.0, 123.2, 244.3, 120.9, 244.3, 120.9);
        recordBezierCurveTo(vaulter, ctx, 244.3, 120.9, 244.3, 118.1, 246.0, 118.3);
        recordBezierCurveTo(vaulter, ctx, 247.7, 118.6, 249.8, 120.7, 250.6, 122.2);
        recordBezierCurveTo(vaulter, ctx, 251.4, 123.6, 248.6, 124.7, 248.3, 125.5);
        recordBezierCurveTo(vaulter, ctx, 247.8, 126.9, 248.0, 131.7, 247.1, 134.1);
        recordBezierCurveTo(vaulter, ctx, 246.5, 135.8, 247.2, 142.0, 246.8, 144.9);
        recordBezierCurveTo(vaulter, ctx, 246.8, 144.9, 246.8, 152.1, 245.8, 154.5);
        ctx.fillStyle = "rgb(17, 92, 137)";
        ctx.fill();
        ctx.lineWidth = 0.5;
        ctx.strokeStyle = "rgb(141, 204, 255)";
        ctx.lineJoin = "miter";
        ctx.miterLimit = 4.0;
        ctx.stroke();

        // vaulter/Path
        ctx.beginPath();
        recordMoveTo(vaulter, ctx, 238.1, 148.9);
        recordBezierCurveTo(vaulter, ctx, 238.1, 148.9, 233.1, 147.5, 231.9, 147.8);
        recordBezierCurveTo(vaulter, ctx, 230.7, 148.0, 226.5, 149.5, 226.5, 149.5);
        recordBezierCurveTo(vaulter, ctx, 226.5, 149.5, 222.0, 152.3, 223.2, 156.8);
        recordBezierCurveTo(vaulter, ctx, 224.5, 161.3, 230.2, 161.4, 232.4, 160.8);
        recordBezierCurveTo(vaulter, ctx, 234.6, 160.2, 239.3, 156.7, 239.3, 156.7);
        recordBezierCurveTo(vaulter, ctx, 239.3, 156.7, 239.6, 156.5, 240.1, 156.4);
        ctx.fill();
        ctx.stroke();

        // vaulter/Path
        ctx.globalAlpha = alpha * 0.50;
        ctx.beginPath();
        recordMoveTo(vaulter, ctx, 255.4, 153.3);
        recordBezierCurveTo(vaulter, ctx, 255.0, 151.6, 251.2, 147.3, 245.6, 148.6);
        recordBezierCurveTo(vaulter, ctx, 240.9, 149.8, 239.5, 153.0, 240.1, 155.1);
        recordBezierCurveTo(vaulter, ctx, 240.5, 156.9, 243.9, 158.6, 248.1, 158.1);
        recordBezierCurveTo(vaulter, ctx, 251.5, 156.7, 251.4, 157.7, 254.7, 154.9);
        recordBezierCurveTo(vaulter, ctx, 254.7, 154.9, 255.5, 154.1, 255.4, 153.3);
        ctx.closePath();
        ctx.fill();
        ctx.stroke();

        // vaulter/Path
        ctx.globalAlpha = alpha * 1.00;
        ctx.beginPath();
        recordMoveTo(vaulter, ctx, 294.9, 342.2);
        recordBezierCurveTo(vaulter, ctx, 295.0, 322.5, 295.3, 236.7, 295.4, 231.6);
        recordBezierCurveTo(vaulter, ctx, 295.5, 218.3, 294.0, 192.1, 282.9, 162.2);
        recordBezierCurveTo(vaulter, ctx, 274.4, 139.5, 259.5, 127.0, 248.5, 120.5);
        recordBezierCurveTo(vaulter, ctx, 236.5, 113.4, 226.6, 111.8, 226.2, 111.7);
        recordBezierCurveTo(vaulter, ctx, 226.2, 111.7, 225.1, 111.6, 224.9, 112.6);
        recordBezierCurveTo(vaulter, ctx, 224.7, 113.6, 225.9, 113.9, 225.9, 113.9);
        recordBezierCurveTo(vaulter, ctx, 226.0, 114.0, 235.7, 115.6, 247.3, 122.4);
        recordBezierCurveTo(vaulter, ctx, 258.0, 128.8, 272.5, 140.9, 280.7, 163.0);
        recordBezierCurveTo(vaulter, ctx, 291.8, 192.7, 293.2, 218.6, 293.1, 231.6);
        recordBezierCurveTo(vaulter, ctx, 293.1, 236.5, 293.0, 322.5, 292.9, 342.2);
        recordLineTo(vaulter, ctx, 294.9, 342.2);
        ctx.closePath();
        ctx.fill();
        ctx.stroke();

        // vaulter/Path
        ctx.beginPath();
        recordMoveTo(vaulter, ctx, 238.3, 153.0);
        recordBezierCurveTo(vaulter, ctx, 238.8, 157.5, 239.5, 160.0, 242.3, 159.9);
        recordBezierCurveTo(vaulter, ctx, 245.4, 159.8, 246.6, 158.5, 251.9, 159.0);
        recordBezierCurveTo(vaulter, ctx, 259.3, 159.7, 263.3, 157.4, 262.6, 153.0);
        recordBezierCurveTo(vaulter, ctx, 261.7, 146.7, 257.7, 148.1, 254.8, 147.8);
        recordBezierCurveTo(vaulter, ctx, 251.9, 147.6, 247.9, 147.8, 247.9, 147.8);
        recordBezierCurveTo(vaulter, ctx, 242.1, 147.8, 237.9, 148.9, 238.3, 153.0);
        ctx.closePath();
        ctx.fill();
        ctx.stroke();

        // vaulter/Path
        ctx.beginPath();
        recordMoveTo(vaulter, ctx, 260.9, 157.7);
        recordBezierCurveTo(vaulter, ctx, 260.9, 157.7, 267.3, 154.5, 268.9, 149.6);
        recordBezierCurveTo(vaulter, ctx, 270.4, 144.7, 267.4, 138.9, 262.9, 136.9);
        recordBezierCurveTo(vaulter, ctx, 258.4, 134.9, 247.4, 136.9, 247.4, 136.9);
        recordBezierCurveTo(vaulter, ctx, 247.4, 136.9, 246.9, 131.1, 246.3, 129.8);
        recordBezierCurveTo(vaulter, ctx, 245.0, 126.6, 240.5, 113.3, 240.5, 112.8);
        recordBezierCurveTo(vaulter, ctx, 240.5, 112.4, 242.1, 110.6, 241.4, 109.7);
        recordBezierCurveTo(vaulter, ctx, 240.8, 108.8, 238.1, 106.8, 236.7, 107.3);
        recordBezierCurveTo(vaulter, ctx, 235.4, 107.7, 226.9, 107.2, 226.9, 107.2);
        recordBezierCurveTo(vaulter, ctx, 226.9, 107.2, 224.5, 107.3, 224.5, 108.1);
        recordBezierCurveTo(vaulter, ctx, 224.5, 109.0, 226.3, 110.2, 227.6, 110.2);
        recordBezierCurveTo(vaulter, ctx, 227.6, 110.2, 234.1, 114.0, 236.1, 113.9);
        recordBezierCurveTo(vaulter, ctx, 238.1, 121.4, 239.5, 141.4, 240.8, 142.9);
        recordBezierCurveTo(vaulter, ctx, 242.1, 144.5, 244.3, 144.8, 248.3, 146.3);
        recordBezierCurveTo(vaulter, ctx, 252.3, 147.7, 260.1, 147.7, 260.1, 147.7);
        ctx.fill();
        ctx.stroke();

        // vaulter/Path
        ctx.beginPath();
        recordMoveTo(vaulter, ctx, 260.9, 157.7);
        recordBezierCurveTo(vaulter, ctx, 260.9, 157.7, 267.3, 154.5, 268.9, 149.6);
        recordBezierCurveTo(vaulter, ctx, 270.4, 144.7, 268.3, 138.4, 263.7, 136.4);
        recordBezierCurveTo(vaulter, ctx, 259.2, 134.4, 249.0, 135.4, 249.0, 135.4);
        recordBezierCurveTo(vaulter, ctx, 249.0, 135.4, 248.4, 129.6, 247.9, 128.3);
        recordBezierCurveTo(vaulter, ctx, 246.6, 125.1, 242.1, 111.8, 242.1, 111.3);
        recordBezierCurveTo(vaulter, ctx, 242.1, 110.9, 243.7, 109.1, 243.0, 108.2);
        recordBezierCurveTo(vaulter, ctx, 242.3, 107.3, 239.6, 105.3, 238.3, 105.8);
        recordBezierCurveTo(vaulter, ctx, 237.0, 106.2, 228.5, 105.7, 228.5, 105.7);
        recordBezierCurveTo(vaulter, ctx, 228.5, 105.7, 226.0, 105.8, 226.0, 106.7);
        recordBezierCurveTo(vaulter, ctx, 226.0, 107.5, 227.8, 108.7, 229.2, 108.7);
        recordBezierCurveTo(vaulter, ctx, 229.2, 108.7, 235.7, 112.5, 237.6, 112.5);
        recordBezierCurveTo(vaulter, ctx, 239.7, 119.9, 241.0, 139.9, 242.4, 141.4);
        recordBezierCurveTo(vaulter, ctx, 243.7, 143.0, 245.9, 143.3, 249.9, 144.8);
        recordBezierCurveTo(vaulter, ctx, 253.9, 146.3, 261.7, 145.0, 261.7, 145.0);
        ctx.fill();
        ctx.stroke();

        // vaulter/Path
        ctx.beginPath();
        recordMoveTo(vaulter, ctx, 238.3, 155.4);
        recordBezierCurveTo(vaulter, ctx, 238.3, 155.4, 237.3, 145.4, 238.3, 141.2);
        recordBezierCurveTo(vaulter, ctx, 238.3, 141.2, 236.1, 137.1, 235.6, 130.7);
        recordBezierCurveTo(vaulter, ctx, 235.6, 130.7, 234.7, 125.8, 234.1, 123.5);
        recordBezierCurveTo(vaulter, ctx, 233.4, 121.3, 231.6, 118.4, 231.6, 118.4);
        recordBezierCurveTo(vaulter, ctx, 231.6, 118.4, 229.6, 113.9, 230.7, 112.8);
        recordBezierCurveTo(vaulter, ctx, 231.8, 111.7, 236.1, 112.8, 236.1, 112.8);
        recordBezierCurveTo(vaulter, ctx, 236.1, 112.8, 237.6, 115.5, 236.7, 118.4);
        recordBezierCurveTo(vaulter, ctx, 236.7, 118.4, 238.1, 123.8, 239.4, 128.7);
        recordLineTo(vaulter, ctx, 243.0, 140.3);
        recordBezierCurveTo(vaulter, ctx, 243.0, 140.3, 246.8, 151.4, 246.8, 152.7);
        ctx.fill();
        ctx.stroke();
        ctx.restore();
      }
    },

    function (ctx) {
      if (vaulter.visible) {

        // vaulter/Path
        ctx.save();
        ctx.beginPath();
        recordMoveTo(vaulter, ctx, 245.7, 145.8);
        recordBezierCurveTo(vaulter, ctx, 245.7, 145.8, 248.5, 141.6, 252.4, 141.2);
        recordBezierCurveTo(vaulter, ctx, 252.6, 137.4, 254.0, 133.6, 254.1, 130.0);
        recordBezierCurveTo(vaulter, ctx, 254.1, 130.0, 253.2, 126.4, 254.1, 125.2);
        recordBezierCurveTo(vaulter, ctx, 254.9, 124.0, 256.8, 125.9, 256.8, 125.9);
        recordBezierCurveTo(vaulter, ctx, 256.8, 125.9, 258.5, 128.1, 258.5, 129.3);
        recordBezierCurveTo(vaulter, ctx, 258.5, 130.5, 257.6, 131.3, 257.6, 131.3);
        recordBezierCurveTo(vaulter, ctx, 257.6, 131.3, 256.7, 135.4, 257.0, 137.1);
        recordBezierCurveTo(vaulter, ctx, 257.0, 137.1, 257.4, 143.2, 257.1, 144.9);
        recordBezierCurveTo(vaulter, ctx, 257.1, 144.9, 256.5, 148.0, 252.8, 149.3);
        ctx.fillStyle = "rgb(17, 92, 137)";
        ctx.fill();
        ctx.lineWidth = 0.5;
        ctx.strokeStyle = "rgb(141, 204, 255)";
        ctx.lineJoin = "miter";
        ctx.miterLimit = 4.0;
        ctx.stroke();

        // vaulter/Path
        ctx.beginPath();
        recordMoveTo(vaulter, ctx, 245.7, 142.2);
        recordBezierCurveTo(vaulter, ctx, 245.7, 142.2, 240.6, 140.8, 239.5, 141.1);
        recordBezierCurveTo(vaulter, ctx, 238.3, 141.4, 234.1, 142.8, 234.1, 142.8);
        recordBezierCurveTo(vaulter, ctx, 234.1, 142.8, 229.5, 145.6, 230.8, 150.1);
        recordBezierCurveTo(vaulter, ctx, 232.1, 154.6, 237.8, 154.8, 239.9, 154.1);
        recordBezierCurveTo(vaulter, ctx, 242.1, 153.5, 246.9, 150.0, 246.9, 150.0);
        recordBezierCurveTo(vaulter, ctx, 246.9, 150.0, 247.2, 149.8, 247.6, 149.8);
        ctx.fill();
        ctx.stroke();

        // vaulter/Path
        ctx.beginPath();
        recordMoveTo(vaulter, ctx, 262.5, 147.0);
        recordBezierCurveTo(vaulter, ctx, 262.2, 145.4, 258.4, 141.0, 252.7, 142.4);
        recordBezierCurveTo(vaulter, ctx, 248.1, 143.5, 246.6, 146.7, 247.2, 148.9);
        recordBezierCurveTo(vaulter, ctx, 247.7, 150.6, 251.1, 152.4, 255.2, 151.9);
        recordBezierCurveTo(vaulter, ctx, 258.7, 150.4, 258.5, 151.5, 261.8, 148.6);
        recordBezierCurveTo(vaulter, ctx, 261.8, 148.6, 262.6, 147.8, 262.5, 147.0);
        ctx.closePath();
        ctx.fill();
        ctx.stroke();

        // vaulter/Path
        ctx.beginPath();
        recordMoveTo(vaulter, ctx, 294.9, 342.2);
        recordLineTo(vaulter, ctx, 295.4, 234.4);
        recordBezierCurveTo(vaulter, ctx, 295.3, 232.2, 293.9, 181.7, 285.5, 162.6);
        recordBezierCurveTo(vaulter, ctx, 277.0, 143.4, 235.7, 106.8, 233.9, 105.2);
        recordBezierCurveTo(vaulter, ctx, 233.9, 105.2, 233.0, 104.5, 232.3, 105.3);
        recordBezierCurveTo(vaulter, ctx, 231.6, 106.1, 232.4, 106.9, 232.4, 106.9);
        recordBezierCurveTo(vaulter, ctx, 232.8, 107.3, 275.1, 144.7, 283.4, 163.5);
        recordBezierCurveTo(vaulter, ctx, 291.7, 182.2, 293.1, 233.9, 293.1, 234.4);
        recordLineTo(vaulter, ctx, 292.9, 342.2);
        recordLineTo(vaulter, ctx, 294.9, 342.2);
        ctx.closePath();
        ctx.fill();
        ctx.stroke();

        // vaulter/Path
        ctx.beginPath();
        recordMoveTo(vaulter, ctx, 245.4, 146.1);
        recordBezierCurveTo(vaulter, ctx, 245.3, 148.5, 247.6, 153.2, 250.5, 153.0);
        recordBezierCurveTo(vaulter, ctx, 253.4, 152.8, 262.8, 151.0, 265.7, 149.5);
        recordBezierCurveTo(vaulter, ctx, 268.6, 148.1, 271.7, 143.8, 271.1, 139.4);
        recordBezierCurveTo(vaulter, ctx, 270.4, 134.9, 265.0, 136.3, 262.9, 137.6);
        recordBezierCurveTo(vaulter, ctx, 260.8, 138.9, 253.7, 139.4, 251.7, 139.4);
        recordBezierCurveTo(vaulter, ctx, 249.7, 139.4, 245.6, 141.8, 245.4, 146.1);
        ctx.closePath();
        ctx.fill();
        ctx.stroke();

        // vaulter/Path
        ctx.beginPath();
        recordMoveTo(vaulter, ctx, 253.4, 145.8);
        recordBezierCurveTo(vaulter, ctx, 253.4, 145.8, 251.9, 137.6, 250.3, 134.9);
        recordBezierCurveTo(vaulter, ctx, 250.3, 134.9, 250.1, 129.6, 247.6, 126.0);
        recordBezierCurveTo(vaulter, ctx, 247.6, 126.0, 245.9, 118.6, 243.2, 113.5);
        recordBezierCurveTo(vaulter, ctx, 243.2, 113.5, 243.9, 110.6, 243.0, 109.3);
        recordBezierCurveTo(vaulter, ctx, 242.2, 108.1, 239.4, 108.4, 238.3, 109.0);
        recordBezierCurveTo(vaulter, ctx, 237.7, 109.4, 237.8, 111.2, 238.5, 112.3);
        recordBezierCurveTo(vaulter, ctx, 239.2, 113.4, 240.4, 113.7, 240.5, 114.3);
        recordBezierCurveTo(vaulter, ctx, 241.3, 117.3, 242.1, 124.4, 243.2, 127.2);
        recordBezierCurveTo(vaulter, ctx, 243.2, 127.2, 243.7, 132.6, 245.1, 135.9);
        recordBezierCurveTo(vaulter, ctx, 245.1, 135.9, 244.9, 143.1, 246.1, 147.7);
        ctx.fill();
        ctx.stroke();

        // vaulter/Path
        ctx.beginPath();
        recordMoveTo(vaulter, ctx, 267.8, 148.0);
        recordBezierCurveTo(vaulter, ctx, 267.8, 148.0, 273.3, 142.5, 274.6, 138.7);
        recordBezierCurveTo(vaulter, ctx, 276.0, 134.9, 274.1, 130.4, 271.2, 128.1);
        recordBezierCurveTo(vaulter, ctx, 268.2, 125.8, 255.2, 120.9, 255.2, 120.9);
        recordBezierCurveTo(vaulter, ctx, 254.6, 117.3, 245.4, 109.7, 243.6, 103.7);
        recordBezierCurveTo(vaulter, ctx, 243.6, 103.7, 246.0, 101.9, 245.4, 100.6);
        recordBezierCurveTo(vaulter, ctx, 244.6, 99.2, 243.2, 98.6, 242.1, 99.0);
        recordBezierCurveTo(vaulter, ctx, 241.0, 99.5, 236.6, 98.4, 235.7, 98.4);
        recordBezierCurveTo(vaulter, ctx, 234.8, 98.4, 230.6, 97.9, 230.6, 98.8);
        recordBezierCurveTo(vaulter, ctx, 230.6, 99.7, 231.8, 100.5, 232.8, 100.5);
        recordBezierCurveTo(vaulter, ctx, 233.9, 100.6, 238.4, 104.4, 239.9, 104.4);
        recordBezierCurveTo(vaulter, ctx, 239.9, 104.4, 249.7, 126.1, 250.8, 126.4);
        recordBezierCurveTo(vaulter, ctx, 251.9, 126.7, 262.9, 136.9, 262.9, 136.9);
        ctx.fill();
        ctx.stroke();

        // vaulter/Path
        ctx.beginPath();
        recordMoveTo(vaulter, ctx, 267.3, 148.5);
        recordBezierCurveTo(vaulter, ctx, 267.3, 148.5, 272.8, 143.2, 274.4, 139.6);
        recordBezierCurveTo(vaulter, ctx, 276.1, 135.9, 274.7, 131.3, 272.0, 128.7);
        recordBezierCurveTo(vaulter, ctx, 269.2, 126.1, 256.8, 120.0, 256.8, 120.0);
        recordBezierCurveTo(vaulter, ctx, 256.5, 116.4, 248.1, 108.0, 246.8, 101.8);
        recordBezierCurveTo(vaulter, ctx, 246.8, 101.8, 249.4, 100.3, 248.9, 99.0);
        recordBezierCurveTo(vaulter, ctx, 248.3, 97.5, 246.9, 96.7, 245.7, 97.0);
        recordBezierCurveTo(vaulter, ctx, 244.6, 97.4, 240.3, 95.9, 239.5, 95.8);
        recordBezierCurveTo(vaulter, ctx, 238.6, 95.7, 234.4, 94.9, 234.3, 95.8);
        recordBezierCurveTo(vaulter, ctx, 234.2, 96.6, 235.4, 97.5, 236.4, 97.7);
        recordBezierCurveTo(vaulter, ctx, 237.5, 97.9, 241.5, 102.1, 243.1, 102.2);
        recordBezierCurveTo(vaulter, ctx, 243.1, 102.2, 250.8, 124.7, 251.9, 125.1);
        recordBezierCurveTo(vaulter, ctx, 253.0, 125.6, 262.9, 136.7, 262.9, 136.7);
        ctx.fill();
        ctx.stroke();
        ctx.restore();
      }
    },

    function (ctx) {
      if (vaulter.visible) {

        // vaulter/Path
        ctx.save();
        ctx.beginPath();
        recordMoveTo(vaulter, ctx, 249.7, 137.3);
        recordBezierCurveTo(vaulter, ctx, 249.7, 137.3, 251.2, 133.0, 257.0, 132.4);
        recordBezierCurveTo(vaulter, ctx, 257.0, 132.4, 257.3, 126.8, 257.7, 123.2);
        recordBezierCurveTo(vaulter, ctx, 258.1, 119.7, 257.2, 115.2, 257.2, 115.2);
        recordLineTo(vaulter, ctx, 256.0, 113.0);
        recordBezierCurveTo(vaulter, ctx, 256.0, 113.0, 256.5, 110.7, 257.8, 110.8);
        recordBezierCurveTo(vaulter, ctx, 259.1, 110.9, 260.7, 113.3, 260.7, 113.3);
        recordBezierCurveTo(vaulter, ctx, 260.7, 113.3, 261.9, 115.2, 261.3, 115.7);
        recordBezierCurveTo(vaulter, ctx, 260.6, 116.1, 260.6, 116.9, 260.6, 116.9);
        recordBezierCurveTo(vaulter, ctx, 260.6, 116.9, 261.0, 123.3, 261.5, 124.0);
        recordBezierCurveTo(vaulter, ctx, 261.9, 124.8, 262.9, 133.5, 262.5, 135.5);
        recordBezierCurveTo(vaulter, ctx, 262.1, 137.6, 257.7, 140.1, 257.7, 140.1);
        ctx.fillStyle = "rgb(17, 92, 137)";
        ctx.fill();
        ctx.lineWidth = 0.5;
        ctx.strokeStyle = "rgb(141, 204, 255)";
        ctx.lineJoin = "miter";
        ctx.miterLimit = 4.0;
        ctx.stroke();

        // vaulter/Path
        ctx.beginPath();
        recordMoveTo(vaulter, ctx, 250.4, 134.4);
        recordBezierCurveTo(vaulter, ctx, 250.4, 134.4, 245.2, 133.6, 244.0, 134.0);
        recordBezierCurveTo(vaulter, ctx, 242.9, 134.4, 238.9, 136.3, 238.9, 136.3);
        recordBezierCurveTo(vaulter, ctx, 238.9, 136.3, 234.7, 139.6, 236.4, 143.9);
        recordBezierCurveTo(vaulter, ctx, 238.1, 148.3, 243.8, 147.8, 245.9, 146.9);
        recordBezierCurveTo(vaulter, ctx, 248.0, 146.1, 252.4, 142.1, 252.4, 142.1);
        recordBezierCurveTo(vaulter, ctx, 252.4, 142.1, 252.7, 141.9, 253.1, 141.8);
        ctx.fill();
        ctx.stroke();

        // vaulter/Path
        ctx.beginPath();
        recordMoveTo(vaulter, ctx, 293.0, 342.2);
        recordBezierCurveTo(vaulter, ctx, 293.2, 315.9, 293.6, 245.8, 293.2, 234.6);
        recordBezierCurveTo(vaulter, ctx, 292.3, 210.5, 289.1, 173.1, 278.2, 148.6);
        recordBezierCurveTo(vaulter, ctx, 261.2, 110.3, 236.7, 95.4, 236.5, 95.3);
        recordBezierCurveTo(vaulter, ctx, 236.5, 95.3, 235.1, 94.3, 235.8, 93.6);
        recordBezierCurveTo(vaulter, ctx, 236.4, 92.8, 237.6, 93.4, 237.6, 93.4);
        recordBezierCurveTo(vaulter, ctx, 237.9, 93.5, 262.9, 108.7, 280.3, 147.7);
        recordBezierCurveTo(vaulter, ctx, 291.3, 172.5, 294.5, 210.2, 295.5, 234.6);
        recordBezierCurveTo(vaulter, ctx, 295.9, 245.8, 295.3, 315.9, 295.0, 342.2);
        recordLineTo(vaulter, ctx, 293.0, 342.2);
        ctx.closePath();
        ctx.fill();
        ctx.stroke();

        // vaulter/Path
        ctx.beginPath();
        recordMoveTo(vaulter, ctx, 249.9, 137.9);
        recordBezierCurveTo(vaulter, ctx, 250.9, 140.0, 254.4, 144.6, 257.9, 143.5);
        recordBezierCurveTo(vaulter, ctx, 261.5, 142.4, 270.4, 139.7, 273.3, 136.2);
        recordBezierCurveTo(vaulter, ctx, 276.2, 132.8, 275.8, 127.9, 273.3, 126.1);
        recordBezierCurveTo(vaulter, ctx, 270.9, 124.3, 264.8, 126.6, 263.9, 128.3);
        recordBezierCurveTo(vaulter, ctx, 263.0, 130.1, 255.9, 132.1, 253.5, 132.1);
        recordBezierCurveTo(vaulter, ctx, 251.0, 132.1, 249.0, 136.0, 249.9, 137.9);
        ctx.closePath();
        ctx.fill();
        ctx.stroke();

        // vaulter/Path
        ctx.beginPath();
        recordMoveTo(vaulter, ctx, 273.3, 136.2);
        recordBezierCurveTo(vaulter, ctx, 273.3, 136.2, 277.0, 132.0, 278.5, 125.5);
        recordBezierCurveTo(vaulter, ctx, 280.1, 118.9, 273.4, 113.7, 268.3, 111.6);
        recordBezierCurveTo(vaulter, ctx, 266.5, 110.8, 262.2, 107.9, 262.2, 107.9);
        recordBezierCurveTo(vaulter, ctx, 261.6, 104.0, 250.7, 89.5, 250.7, 89.5);
        recordBezierCurveTo(vaulter, ctx, 250.7, 89.5, 251.0, 87.1, 250.7, 86.3);
        recordBezierCurveTo(vaulter, ctx, 250.5, 85.5, 249.6, 84.1, 248.3, 84.3);
        recordBezierCurveTo(vaulter, ctx, 246.9, 84.5, 238.9, 84.3, 238.9, 84.3);
        recordBezierCurveTo(vaulter, ctx, 238.9, 84.3, 237.2, 84.5, 237.0, 85.3);
        recordBezierCurveTo(vaulter, ctx, 236.9, 86.2, 237.5, 87.2, 239.3, 87.1);
        recordBezierCurveTo(vaulter, ctx, 239.3, 87.1, 245.2, 90.1, 247.9, 89.8);
        recordLineTo(vaulter, ctx, 256.8, 112.3);
        recordBezierCurveTo(vaulter, ctx, 256.8, 112.3, 262.2, 120.9, 267.3, 123.9);
        ctx.fill();
        ctx.stroke();

        // vaulter/Path
        ctx.beginPath();
        recordMoveTo(vaulter, ctx, 272.1, 137.1);
        recordBezierCurveTo(vaulter, ctx, 272.1, 137.1, 275.8, 132.8, 277.3, 126.3);
        recordBezierCurveTo(vaulter, ctx, 278.8, 119.7, 272.1, 114.6, 267.1, 112.4);
        recordBezierCurveTo(vaulter, ctx, 265.3, 111.6, 260.9, 108.7, 260.9, 108.7);
        recordBezierCurveTo(vaulter, ctx, 260.3, 104.8, 249.5, 90.3, 249.5, 90.3);
        recordBezierCurveTo(vaulter, ctx, 249.5, 90.3, 249.7, 88.0, 249.5, 87.1);
        recordBezierCurveTo(vaulter, ctx, 249.2, 86.3, 248.4, 85.0, 247.0, 85.1);
        recordBezierCurveTo(vaulter, ctx, 245.7, 85.3, 237.7, 85.1, 237.7, 85.1);
        recordBezierCurveTo(vaulter, ctx, 237.7, 85.1, 236.0, 85.3, 235.8, 86.1);
        recordBezierCurveTo(vaulter, ctx, 235.6, 87.0, 236.3, 88.0, 238.0, 88.0);
        recordBezierCurveTo(vaulter, ctx, 238.0, 88.0, 243.9, 91.0, 246.7, 90.6);
        recordLineTo(vaulter, ctx, 255.6, 113.1);
        recordBezierCurveTo(vaulter, ctx, 255.6, 113.1, 260.9, 121.7, 266.1, 124.8);
        ctx.fill();
        ctx.stroke();

        // vaulter/Path
        ctx.beginPath();
        recordMoveTo(vaulter, ctx, 266.8, 136.2);
        recordBezierCurveTo(vaulter, ctx, 266.2, 134.6, 261.9, 130.6, 256.5, 132.6);
        recordBezierCurveTo(vaulter, ctx, 252.0, 134.3, 250.9, 137.6, 251.7, 139.7);
        recordBezierCurveTo(vaulter, ctx, 252.3, 141.3, 255.9, 142.7, 260.0, 141.8);
        recordBezierCurveTo(vaulter, ctx, 263.3, 140.0, 263.2, 141.0, 266.2, 137.8);
        recordBezierCurveTo(vaulter, ctx, 266.2, 137.8, 266.9, 137.0, 266.8, 136.2);
        ctx.closePath();
        ctx.fill();
        ctx.stroke();

        // vaulter/Path
        ctx.beginPath();
        recordMoveTo(vaulter, ctx, 251.6, 140.5);
        recordBezierCurveTo(vaulter, ctx, 251.6, 140.5, 249.3, 136.4, 250.2, 129.7);
        recordBezierCurveTo(vaulter, ctx, 250.2, 129.7, 248.1, 124.8, 247.4, 117.6);
        recordBezierCurveTo(vaulter, ctx, 247.4, 117.6, 246.3, 114.4, 246.5, 109.9);
        recordBezierCurveTo(vaulter, ctx, 246.6, 105.3, 245.3, 102.5, 245.3, 102.5);
        recordBezierCurveTo(vaulter, ctx, 245.3, 102.5, 243.6, 101.3, 243.7, 99.3);
        recordBezierCurveTo(vaulter, ctx, 243.9, 97.2, 245.3, 98.2, 245.3, 98.2);
        recordBezierCurveTo(vaulter, ctx, 245.3, 98.2, 247.1, 98.9, 247.7, 98.6);
        recordBezierCurveTo(vaulter, ctx, 248.3, 98.2, 249.7, 101.0, 249.7, 101.0);
        recordBezierCurveTo(vaulter, ctx, 249.7, 101.0, 249.2, 102.8, 248.3, 103.3);
        recordBezierCurveTo(vaulter, ctx, 248.3, 103.3, 249.6, 109.2, 250.0, 110.3);
        recordBezierCurveTo(vaulter, ctx, 250.5, 111.5, 252.4, 115.8, 252.3, 117.2);
        recordLineTo(vaulter, ctx, 255.6, 129.1);
        recordBezierCurveTo(vaulter, ctx, 255.6, 129.1, 257.7, 133.0, 257.7, 135.6);
        ctx.fill();
        ctx.stroke();
        ctx.restore();
      }
    },

    function (ctx) {
      if (vaulter.visible) {

        // vaulter/Path
        ctx.save();
        ctx.beginPath();
        recordMoveTo(vaulter, ctx, 254.4, 130.4);
        recordBezierCurveTo(vaulter, ctx, 254.4, 130.4, 255.8, 127.4, 259.5, 127.2);
        recordLineTo(vaulter, ctx, 264.0, 123.6);
        recordBezierCurveTo(vaulter, ctx, 263.2, 122.7, 263.1, 115.3, 263.1, 115.3);
        recordBezierCurveTo(vaulter, ctx, 263.1, 115.3, 261.6, 113.8, 261.2, 108.6);
        recordBezierCurveTo(vaulter, ctx, 261.2, 108.6, 259.7, 106.8, 259.8, 105.6);
        recordBezierCurveTo(vaulter, ctx, 259.9, 104.5, 261.2, 103.6, 261.2, 103.6);
        recordBezierCurveTo(vaulter, ctx, 261.2, 103.6, 264.2, 104.1, 264.6, 104.7);
        recordBezierCurveTo(vaulter, ctx, 264.9, 105.3, 264.7, 107.6, 264.6, 108.1);
        recordBezierCurveTo(vaulter, ctx, 264.5, 108.7, 266.9, 115.3, 266.9, 115.3);
        recordBezierCurveTo(vaulter, ctx, 266.9, 115.3, 269.8, 124.3, 269.7, 126.1);
        recordBezierCurveTo(vaulter, ctx, 269.6, 127.9, 264.3, 131.0, 264.3, 131.0);
        ctx.fillStyle = "rgb(17, 92, 137)";
        ctx.fill();
        ctx.lineWidth = 0.5;
        ctx.strokeStyle = "rgb(141, 204, 255)";
        ctx.lineJoin = "miter";
        ctx.miterLimit = 4.0;
        ctx.stroke();

        // vaulter/Path
        ctx.beginPath();
        recordMoveTo(vaulter, ctx, 255.5, 127.4);
        recordBezierCurveTo(vaulter, ctx, 255.5, 127.4, 250.2, 127.0, 249.1, 127.4);
        recordBezierCurveTo(vaulter, ctx, 247.9, 127.9, 244.0, 130.1, 244.0, 130.1);
        recordBezierCurveTo(vaulter, ctx, 244.0, 130.1, 240.0, 133.7, 242.0, 138.0);
        recordBezierCurveTo(vaulter, ctx, 244.1, 142.3, 249.8, 141.4, 251.9, 140.4);
        recordBezierCurveTo(vaulter, ctx, 254.0, 139.4, 258.1, 135.0, 258.1, 135.0);
        recordBezierCurveTo(vaulter, ctx, 258.1, 135.0, 258.4, 134.8, 258.8, 134.6);
        ctx.fill();
        ctx.stroke();

        // vaulter/Path
        ctx.beginPath();
        recordMoveTo(vaulter, ctx, 254.4, 130.4);
        recordBezierCurveTo(vaulter, ctx, 254.4, 132.3, 255.6, 138.4, 261.4, 136.5);
        recordBezierCurveTo(vaulter, ctx, 267.1, 134.6, 276.4, 130.9, 278.9, 122.6);
        recordBezierCurveTo(vaulter, ctx, 281.4, 114.3, 275.5, 115.4, 275.5, 115.4);
        recordBezierCurveTo(vaulter, ctx, 275.5, 115.4, 270.2, 115.6, 268.9, 118.1);
        recordBezierCurveTo(vaulter, ctx, 267.7, 120.6, 261.8, 123.9, 259.3, 124.3);
        recordBezierCurveTo(vaulter, ctx, 256.7, 124.7, 254.3, 127.9, 254.4, 130.4);
        ctx.closePath();
        ctx.fill();
        ctx.stroke();

        // vaulter/Path
        ctx.beginPath();
        recordMoveTo(vaulter, ctx, 295.6, 253.4);
        recordLineTo(vaulter, ctx, 295.0, 342.2);
        recordLineTo(vaulter, ctx, 293.0, 342.2);
        recordLineTo(vaulter, ctx, 293.3, 253.4);
        recordBezierCurveTo(vaulter, ctx, 293.3, 252.8, 294.2, 195.8, 282.4, 153.5);
        recordBezierCurveTo(vaulter, ctx, 270.7, 111.4, 242.2, 86.5, 241.9, 86.3);
        recordBezierCurveTo(vaulter, ctx, 241.9, 86.3, 241.0, 85.6, 241.7, 84.7);
        recordBezierCurveTo(vaulter, ctx, 242.5, 83.9, 243.4, 84.5, 243.4, 84.5);
        recordBezierCurveTo(vaulter, ctx, 243.7, 84.8, 272.8, 110.1, 284.6, 152.9);
        recordBezierCurveTo(vaulter, ctx, 296.5, 195.5, 295.6, 252.8, 295.6, 253.4);
        ctx.closePath();
        ctx.fill();
        ctx.stroke();

        // vaulter/Path
        ctx.beginPath();
        recordMoveTo(vaulter, ctx, 278.9, 122.6);
        recordBezierCurveTo(vaulter, ctx, 281.3, 115.9, 281.3, 111.5, 280.8, 109.3);
        recordBezierCurveTo(vaulter, ctx, 280.3, 107.0, 270.8, 98.9, 266.9, 96.3);
        recordBezierCurveTo(vaulter, ctx, 266.7, 92.0, 262.2, 87.3, 260.9, 80.5);
        recordBezierCurveTo(vaulter, ctx, 260.9, 80.5, 262.5, 78.8, 262.0, 77.7);
        recordBezierCurveTo(vaulter, ctx, 261.6, 76.7, 260.0, 75.9, 259.2, 76.4);
        recordBezierCurveTo(vaulter, ctx, 258.3, 76.9, 253.9, 78.1, 252.9, 77.9);
        recordBezierCurveTo(vaulter, ctx, 251.8, 77.7, 250.5, 77.6, 250.0, 77.7);
        recordBezierCurveTo(vaulter, ctx, 249.5, 77.9, 248.3, 78.8, 248.6, 79.6);
        recordBezierCurveTo(vaulter, ctx, 248.8, 80.5, 250.5, 80.8, 251.8, 80.3);
        recordBezierCurveTo(vaulter, ctx, 251.8, 80.3, 254.4, 82.0, 256.6, 81.5);
        recordBezierCurveTo(vaulter, ctx, 256.6, 81.5, 260.8, 97.1, 262.0, 99.4);
        recordBezierCurveTo(vaulter, ctx, 263.3, 101.8, 265.0, 106.2, 270.1, 113.7);
        ctx.fill();
        ctx.stroke();

        // vaulter/Path
        ctx.beginPath();
        recordMoveTo(vaulter, ctx, 277.8, 123.6);
        recordBezierCurveTo(vaulter, ctx, 280.3, 116.9, 280.3, 112.6, 279.8, 110.3);
        recordBezierCurveTo(vaulter, ctx, 279.3, 108.0, 269.7, 99.9, 265.9, 97.3);
        recordBezierCurveTo(vaulter, ctx, 265.6, 93.1, 261.2, 88.3, 259.8, 81.5);
        recordBezierCurveTo(vaulter, ctx, 259.8, 81.5, 261.5, 79.8, 261.0, 78.8);
        recordBezierCurveTo(vaulter, ctx, 260.5, 77.8, 259.0, 76.9, 258.1, 77.4);
        recordBezierCurveTo(vaulter, ctx, 257.3, 77.9, 252.9, 79.1, 251.8, 78.9);
        recordBezierCurveTo(vaulter, ctx, 250.8, 78.8, 249.4, 78.6, 248.9, 78.8);
        recordBezierCurveTo(vaulter, ctx, 248.4, 78.9, 247.3, 79.8, 247.5, 80.7);
        recordBezierCurveTo(vaulter, ctx, 247.7, 81.5, 249.4, 81.8, 250.8, 81.3);
        recordBezierCurveTo(vaulter, ctx, 250.8, 81.3, 253.4, 83.0, 255.6, 82.5);
        recordBezierCurveTo(vaulter, ctx, 255.6, 82.5, 259.8, 98.1, 261.0, 100.4);
        recordBezierCurveTo(vaulter, ctx, 262.2, 102.8, 263.8, 110.6, 268.9, 118.1);
        ctx.fill();
        ctx.stroke();

        // vaulter/Path
        ctx.beginPath();
        recordMoveTo(vaulter, ctx, 271.9, 127.9);
        recordBezierCurveTo(vaulter, ctx, 271.2, 126.3, 266.6, 122.6, 261.3, 125.0);
        recordBezierCurveTo(vaulter, ctx, 256.8, 127.0, 254.3, 130.1, 255.5, 133.2);
        recordBezierCurveTo(vaulter, ctx, 257.0, 136.9, 261.7, 135.5, 265.5, 134.0);
        recordBezierCurveTo(vaulter, ctx, 268.9, 132.5, 270.1, 131.7, 271.5, 129.6);
        recordBezierCurveTo(vaulter, ctx, 271.5, 129.6, 272.1, 128.7, 271.9, 127.9);
        ctx.closePath();
        ctx.fill();
        ctx.stroke();

        // vaulter/Path
        ctx.beginPath();
        recordMoveTo(vaulter, ctx, 255.3, 131.7);
        recordBezierCurveTo(vaulter, ctx, 255.3, 131.7, 254.3, 128.0, 255.3, 121.4);
        recordLineTo(vaulter, ctx, 253.4, 111.1);
        recordBezierCurveTo(vaulter, ctx, 252.2, 110.0, 252.1, 102.4, 251.6, 99.6);
        recordBezierCurveTo(vaulter, ctx, 251.1, 96.8, 250.0, 95.9, 250.0, 95.9);
        recordBezierCurveTo(vaulter, ctx, 250.0, 95.9, 248.3, 93.8, 248.6, 91.5);
        recordBezierCurveTo(vaulter, ctx, 248.9, 89.1, 250.4, 90.3, 250.4, 90.3);
        recordBezierCurveTo(vaulter, ctx, 250.4, 90.3, 253.3, 91.8, 253.7, 92.6);
        recordBezierCurveTo(vaulter, ctx, 254.1, 93.5, 254.6, 95.9, 254.4, 96.6);
        recordBezierCurveTo(vaulter, ctx, 254.1, 97.4, 255.0, 101.8, 255.9, 103.0);
        recordBezierCurveTo(vaulter, ctx, 256.9, 104.1, 257.8, 109.9, 257.8, 110.9);
        recordLineTo(vaulter, ctx, 260.4, 120.2);
        recordBezierCurveTo(vaulter, ctx, 260.4, 120.2, 262.2, 123.4, 262.3, 126.1);
        ctx.fill();
        ctx.stroke();
        ctx.restore();
      }
    },

    function (ctx) {
      if (vaulter.visible) {

        // vaulter/Path
        ctx.save();
        ctx.beginPath();
        recordMoveTo(vaulter, ctx, 264.2, 123.1);
        recordBezierCurveTo(vaulter, ctx, 264.2, 123.1, 266.1, 120.0, 269.4, 119.5);
        recordLineTo(vaulter, ctx, 270.7, 114.7);
        recordLineTo(vaulter, ctx, 270.7, 104.4);
        recordBezierCurveTo(vaulter, ctx, 270.7, 104.4, 270.0, 102.5, 270.7, 100.9);
        recordBezierCurveTo(vaulter, ctx, 271.3, 99.3, 273.0, 99.1, 273.4, 99.7);
        recordBezierCurveTo(vaulter, ctx, 273.8, 100.2, 275.7, 104.0, 274.5, 105.1);
        recordBezierCurveTo(vaulter, ctx, 273.2, 106.2, 273.4, 106.8, 273.4, 106.8);
        recordBezierCurveTo(vaulter, ctx, 273.4, 106.8, 274.5, 113.9, 274.5, 118.3);
        recordBezierCurveTo(vaulter, ctx, 274.5, 119.9, 275.1, 122.0, 274.5, 123.4);
        recordBezierCurveTo(vaulter, ctx, 273.3, 125.8, 270.4, 127.0, 270.1, 127.0);
        ctx.fillStyle = "rgb(17, 92, 137)";
        ctx.fill();
        ctx.lineWidth = 0.5;
        ctx.strokeStyle = "rgb(141, 204, 255)";
        ctx.lineJoin = "miter";
        ctx.miterLimit = 4.0;
        ctx.stroke();

        // vaulter/Path
        ctx.beginPath();
        recordMoveTo(vaulter, ctx, 264.4, 125.6);
        recordBezierCurveTo(vaulter, ctx, 264.4, 125.6, 259.1, 125.2, 257.9, 125.7);
        recordBezierCurveTo(vaulter, ctx, 256.8, 126.2, 252.9, 128.4, 252.9, 128.4);
        recordBezierCurveTo(vaulter, ctx, 252.9, 128.4, 248.8, 132.0, 250.9, 136.3);
        recordBezierCurveTo(vaulter, ctx, 253.0, 140.6, 258.7, 139.7, 260.8, 138.7);
        recordBezierCurveTo(vaulter, ctx, 262.9, 137.7, 267.0, 133.2, 267.0, 133.2);
        recordBezierCurveTo(vaulter, ctx, 267.0, 133.2, 267.3, 133.0, 267.7, 132.9);
        ctx.fill();
        ctx.stroke();

        // vaulter/Path
        ctx.beginPath();
        recordMoveTo(vaulter, ctx, 264.2, 125.2);
        recordBezierCurveTo(vaulter, ctx, 264.2, 125.2, 264.2, 131.0, 266.6, 132.9);
        recordBezierCurveTo(vaulter, ctx, 269.0, 134.9, 273.8, 131.8, 275.4, 129.8);
        recordBezierCurveTo(vaulter, ctx, 276.2, 128.7, 277.0, 126.4, 278.6, 124.8);
        recordBezierCurveTo(vaulter, ctx, 280.3, 122.8, 282.8, 121.5, 283.7, 119.5);
        recordBezierCurveTo(vaulter, ctx, 285.4, 115.9, 284.7, 110.0, 284.3, 109.5);
        recordBezierCurveTo(vaulter, ctx, 284.0, 109.1, 281.5, 105.8, 276.2, 110.2);
        recordBezierCurveTo(vaulter, ctx, 270.8, 114.7, 268.2, 116.4, 266.9, 118.2);
        recordBezierCurveTo(vaulter, ctx, 265.5, 120.0, 263.8, 121.3, 264.2, 125.2);
        ctx.closePath();
        ctx.fill();
        ctx.stroke();

        // vaulter/Path
        ctx.beginPath();
        recordMoveTo(vaulter, ctx, 283.7, 119.5);
        recordBezierCurveTo(vaulter, ctx, 287.3, 114.5, 287.5, 107.5, 286.6, 103.9);
        recordBezierCurveTo(vaulter, ctx, 285.7, 100.2, 283.0, 90.7, 277.1, 85.9);
        recordLineTo(vaulter, ctx, 274.5, 61.8);
        recordBezierCurveTo(vaulter, ctx, 274.5, 61.8, 276.1, 60.9, 276.1, 60.0);
        recordBezierCurveTo(vaulter, ctx, 276.1, 59.2, 276.1, 57.1, 274.5, 57.1);
        recordBezierCurveTo(vaulter, ctx, 272.8, 57.1, 269.2, 56.3, 267.9, 55.8);
        recordBezierCurveTo(vaulter, ctx, 266.5, 55.3, 264.5, 53.2, 261.7, 53.4);
        recordBezierCurveTo(vaulter, ctx, 259.0, 53.5, 259.9, 54.6, 259.9, 54.6);
        recordBezierCurveTo(vaulter, ctx, 259.9, 54.6, 260.7, 56.1, 262.4, 56.4);
        recordBezierCurveTo(vaulter, ctx, 262.4, 56.4, 267.0, 61.4, 269.2, 61.9);
        recordLineTo(vaulter, ctx, 270.9, 88.0);
        recordBezierCurveTo(vaulter, ctx, 270.9, 88.0, 273.4, 100.9, 275.5, 105.0);
        ctx.fill();
        ctx.stroke();

        // vaulter/Path
        ctx.beginPath();
        recordMoveTo(vaulter, ctx, 281.4, 120.7);
        recordBezierCurveTo(vaulter, ctx, 285.0, 115.7, 285.2, 108.7, 284.3, 105.1);
        recordBezierCurveTo(vaulter, ctx, 283.4, 101.4, 280.7, 91.9, 274.8, 87.1);
        recordLineTo(vaulter, ctx, 272.2, 63.0);
        recordBezierCurveTo(vaulter, ctx, 272.2, 63.0, 273.8, 62.1, 273.8, 61.2);
        recordBezierCurveTo(vaulter, ctx, 273.8, 60.4, 273.8, 58.3, 272.2, 58.3);
        recordBezierCurveTo(vaulter, ctx, 270.5, 58.3, 266.9, 57.5, 265.6, 57.0);
        recordBezierCurveTo(vaulter, ctx, 264.2, 56.5, 262.2, 54.4, 259.4, 54.6);
        recordBezierCurveTo(vaulter, ctx, 256.7, 54.8, 257.6, 55.8, 257.6, 55.8);
        recordBezierCurveTo(vaulter, ctx, 257.6, 55.8, 258.4, 57.3, 260.1, 57.6);
        recordBezierCurveTo(vaulter, ctx, 260.1, 57.6, 264.7, 62.6, 266.9, 63.1);
        recordLineTo(vaulter, ctx, 268.6, 89.2);
        recordBezierCurveTo(vaulter, ctx, 268.6, 89.2, 271.1, 102.1, 273.2, 106.2);
        ctx.fill();
        ctx.stroke();

        // vaulter/Path
        ctx.beginPath();
        recordMoveTo(vaulter, ctx, 295.6, 253.2);
        recordLineTo(vaulter, ctx, 295.0, 342.2);
        recordLineTo(vaulter, ctx, 293.0, 342.2);
        recordLineTo(vaulter, ctx, 293.3, 253.2);
        recordBezierCurveTo(vaulter, ctx, 293.3, 252.5, 293.5, 182.1, 285.9, 152.3);
        recordBezierCurveTo(vaulter, ctx, 278.3, 122.4, 264.0, 81.3, 263.9, 80.8);
        recordBezierCurveTo(vaulter, ctx, 263.9, 80.8, 263.5, 79.8, 264.6, 79.4);
        recordBezierCurveTo(vaulter, ctx, 265.8, 79.0, 266.1, 80.1, 266.1, 80.1);
        recordBezierCurveTo(vaulter, ctx, 266.2, 80.5, 280.5, 121.7, 288.2, 151.7);
        recordBezierCurveTo(vaulter, ctx, 295.9, 181.9, 295.6, 252.5, 295.6, 253.2);
        ctx.closePath();
        ctx.fill();
        ctx.stroke();

        // vaulter/Path
        ctx.beginPath();
        recordMoveTo(vaulter, ctx, 275.5, 118.0);
        recordBezierCurveTo(vaulter, ctx, 273.9, 117.3, 268.0, 117.8, 265.8, 123.3);
        recordBezierCurveTo(vaulter, ctx, 263.9, 127.8, 265.7, 130.9, 267.8, 131.7);
        recordBezierCurveTo(vaulter, ctx, 269.5, 132.4, 273.7, 129.0, 275.1, 126.9);
        recordBezierCurveTo(vaulter, ctx, 275.9, 125.9, 276.7, 124.0, 276.3, 119.5);
        recordBezierCurveTo(vaulter, ctx, 276.3, 119.5, 276.2, 118.4, 275.5, 118.0);
        ctx.closePath();
        ctx.fill();
        ctx.stroke();

        // vaulter/Path
        ctx.beginPath();
        recordMoveTo(vaulter, ctx, 265.3, 127.3);
        recordBezierCurveTo(vaulter, ctx, 265.3, 127.3, 264.1, 123.2, 266.2, 117.1);
        recordLineTo(vaulter, ctx, 267.4, 106.8);
        recordBezierCurveTo(vaulter, ctx, 267.4, 106.8, 266.9, 101.3, 267.4, 98.7);
        recordBezierCurveTo(vaulter, ctx, 267.9, 96.1, 267.4, 92.1, 267.4, 92.1);
        recordBezierCurveTo(vaulter, ctx, 267.4, 92.1, 266.6, 89.8, 266.3, 89.4);
        recordBezierCurveTo(vaulter, ctx, 266.0, 89.1, 267.3, 86.2, 267.6, 86.2);
        recordBezierCurveTo(vaulter, ctx, 267.9, 86.2, 270.8, 86.9, 270.9, 87.7);
        recordBezierCurveTo(vaulter, ctx, 270.9, 88.6, 271.5, 90.2, 270.9, 90.9);
        recordBezierCurveTo(vaulter, ctx, 270.3, 91.7, 269.9, 92.3, 269.9, 92.3);
        recordBezierCurveTo(vaulter, ctx, 269.9, 92.3, 271.4, 99.6, 271.5, 102.9);
        recordBezierCurveTo(vaulter, ctx, 271.7, 106.1, 271.5, 106.7, 271.5, 106.7);
        recordLineTo(vaulter, ctx, 271.6, 115.4);
        recordBezierCurveTo(vaulter, ctx, 271.6, 115.4, 272.5, 120.1, 272.0, 122.1);
        ctx.fill();
        ctx.stroke();
        ctx.restore();
      }
    },

    function (ctx) {
      if (vaulter.visible) {

        // vaulter/Path
        ctx.save();
        ctx.beginPath();
        recordMoveTo(vaulter, ctx, 267.1, 125.9);
        recordBezierCurveTo(vaulter, ctx, 267.1, 125.9, 267.9, 121.5, 271.7, 120.2);
        recordLineTo(vaulter, ctx, 273.3, 118.0);
        recordBezierCurveTo(vaulter, ctx, 273.4, 115.0, 274.8, 114.4, 274.4, 109.3);
        recordLineTo(vaulter, ctx, 273.1, 107.5);
        recordBezierCurveTo(vaulter, ctx, 273.1, 107.5, 273.0, 104.9, 274.2, 103.6);
        recordBezierCurveTo(vaulter, ctx, 275.3, 102.4, 277.4, 104.9, 277.4, 104.9);
        recordBezierCurveTo(vaulter, ctx, 277.4, 104.9, 278.4, 109.5, 277.1, 110.1);
        recordBezierCurveTo(vaulter, ctx, 276.9, 111.6, 278.1, 116.3, 277.4, 118.1);
        recordBezierCurveTo(vaulter, ctx, 277.5, 120.4, 276.7, 122.5, 276.7, 122.5);
        recordBezierCurveTo(vaulter, ctx, 276.7, 122.5, 277.3, 126.2, 276.3, 127.2);
        ctx.fillStyle = "rgb(17, 92, 137)";
        ctx.fill();
        ctx.lineWidth = 0.5;
        ctx.strokeStyle = "rgb(141, 204, 255)";
        ctx.lineJoin = "miter";
        ctx.miterLimit = 4.0;
        ctx.stroke();

        // vaulter/Path
        ctx.beginPath();
        recordMoveTo(vaulter, ctx, 269.4, 125.3);
        recordBezierCurveTo(vaulter, ctx, 269.4, 125.3, 264.0, 124.9, 262.9, 125.3);
        recordBezierCurveTo(vaulter, ctx, 261.8, 125.8, 257.9, 128.0, 257.9, 128.0);
        recordBezierCurveTo(vaulter, ctx, 257.9, 128.0, 253.8, 131.7, 255.9, 135.9);
        recordBezierCurveTo(vaulter, ctx, 258.0, 140.2, 263.7, 139.3, 265.8, 138.3);
        recordBezierCurveTo(vaulter, ctx, 267.8, 137.3, 272.0, 132.9, 272.0, 132.9);
        recordBezierCurveTo(vaulter, ctx, 272.0, 132.9, 272.3, 132.7, 272.7, 132.5);
        ctx.fill();
        ctx.stroke();

        // vaulter/Path
        ctx.beginPath();
        recordMoveTo(vaulter, ctx, 267.7, 127.9);
        recordBezierCurveTo(vaulter, ctx, 268.2, 130.6, 272.9, 133.8, 276.5, 132.7);
        recordBezierCurveTo(vaulter, ctx, 280.1, 131.7, 280.9, 125.8, 282.0, 124.5);
        recordBezierCurveTo(vaulter, ctx, 283.0, 123.2, 287.1, 119.7, 287.1, 112.6);
        recordBezierCurveTo(vaulter, ctx, 287.1, 105.4, 281.4, 108.0, 281.4, 108.0);
        recordBezierCurveTo(vaulter, ctx, 281.4, 108.0, 277.4, 110.4, 275.5, 113.4);
        recordBezierCurveTo(vaulter, ctx, 273.6, 116.5, 270.9, 120.0, 269.3, 122.0);
        recordBezierCurveTo(vaulter, ctx, 267.8, 124.0, 267.7, 127.9, 267.7, 127.9);
        ctx.closePath();
        ctx.fill();
        ctx.stroke();

        // vaulter/Path
        ctx.beginPath();
        recordMoveTo(vaulter, ctx, 293.2, 255.7);
        recordBezierCurveTo(vaulter, ctx, 293.2, 255.0, 290.4, 178.1, 284.4, 147.6);
        recordBezierCurveTo(vaulter, ctx, 278.3, 117.0, 266.7, 77.5, 266.6, 77.1);
        recordBezierCurveTo(vaulter, ctx, 266.6, 77.1, 266.5, 76.2, 267.5, 76.0);
        recordBezierCurveTo(vaulter, ctx, 268.4, 75.7, 268.8, 76.5, 268.8, 76.5);
        recordBezierCurveTo(vaulter, ctx, 268.9, 76.9, 280.6, 116.4, 286.7, 147.1);
        recordBezierCurveTo(vaulter, ctx, 292.7, 177.9, 295.5, 254.9, 295.5, 255.7);
        recordLineTo(vaulter, ctx, 295.0, 342.3);
        recordLineTo(vaulter, ctx, 293.0, 342.3);
        recordLineTo(vaulter, ctx, 293.2, 255.7);
        ctx.closePath();
        ctx.fill();
        ctx.stroke();

        // vaulter/Path
        ctx.beginPath();
        recordMoveTo(vaulter, ctx, 279.1, 107.5);
        recordBezierCurveTo(vaulter, ctx, 275.3, 99.5, 274.8, 91.9, 274.2, 88.3);
        recordBezierCurveTo(vaulter, ctx, 274.0, 86.7, 272.4, 81.6, 273.9, 76.8);
        recordBezierCurveTo(vaulter, ctx, 275.8, 71.0, 276.2, 63.9, 276.1, 57.1);
        recordBezierCurveTo(vaulter, ctx, 272.9, 56.7, 268.5, 51.8, 268.5, 51.8);
        recordBezierCurveTo(vaulter, ctx, 267.0, 51.7, 265.6, 49.9, 265.8, 49.2);
        recordBezierCurveTo(vaulter, ctx, 266.2, 47.9, 269.3, 48.8, 270.9, 49.2);
        recordBezierCurveTo(vaulter, ctx, 272.6, 49.7, 273.5, 50.5, 276.0, 51.1);
        recordBezierCurveTo(vaulter, ctx, 278.6, 51.8, 280.0, 51.7, 281.1, 52.2);
        recordBezierCurveTo(vaulter, ctx, 282.1, 52.6, 282.7, 54.4, 282.5, 55.2);
        recordBezierCurveTo(vaulter, ctx, 282.2, 56.0, 281.1, 57.1, 281.1, 57.1);
        recordBezierCurveTo(vaulter, ctx, 280.4, 64.5, 282.4, 70.9, 281.1, 84.5);
        recordBezierCurveTo(vaulter, ctx, 281.1, 84.5, 288.9, 96.6, 289.3, 100.7);
        recordBezierCurveTo(vaulter, ctx, 289.6, 104.8, 287.1, 112.6, 287.1, 112.6);
        ctx.fill();
        ctx.stroke();

        // vaulter/Path
        ctx.beginPath();
        recordMoveTo(vaulter, ctx, 277.7, 108.7);
        recordBezierCurveTo(vaulter, ctx, 274.0, 100.6, 273.4, 93.1, 272.9, 89.5);
        recordBezierCurveTo(vaulter, ctx, 272.7, 87.8, 271.1, 82.8, 272.6, 78.0);
        recordBezierCurveTo(vaulter, ctx, 274.5, 72.2, 274.9, 65.1, 274.8, 58.2);
        recordBezierCurveTo(vaulter, ctx, 271.6, 57.9, 267.2, 53.0, 267.2, 53.0);
        recordBezierCurveTo(vaulter, ctx, 265.7, 52.9, 264.3, 51.1, 264.5, 50.4);
        recordBezierCurveTo(vaulter, ctx, 264.9, 49.0, 268.0, 49.9, 269.6, 50.4);
        recordBezierCurveTo(vaulter, ctx, 271.3, 50.8, 272.2, 51.6, 274.7, 52.3);
        recordBezierCurveTo(vaulter, ctx, 277.3, 53.0, 278.7, 52.9, 279.7, 53.3);
        recordBezierCurveTo(vaulter, ctx, 280.8, 53.8, 281.4, 55.6, 281.2, 56.4);
        recordBezierCurveTo(vaulter, ctx, 280.9, 57.2, 279.7, 58.2, 279.7, 58.2);
        recordBezierCurveTo(vaulter, ctx, 279.1, 65.7, 281.1, 72.0, 279.7, 85.7);
        recordBezierCurveTo(vaulter, ctx, 279.7, 85.7, 287.6, 97.7, 288.0, 101.8);
        recordBezierCurveTo(vaulter, ctx, 288.3, 105.9, 285.8, 113.8, 285.8, 113.8);
        ctx.fill();
        ctx.stroke();

        // vaulter/Path
        ctx.beginPath();
        recordMoveTo(vaulter, ctx, 278.2, 117.6);
        recordBezierCurveTo(vaulter, ctx, 276.6, 117.0, 270.7, 117.5, 268.5, 122.9);
        recordBezierCurveTo(vaulter, ctx, 266.7, 127.5, 268.4, 130.6, 270.5, 131.4);
        recordBezierCurveTo(vaulter, ctx, 272.2, 132.1, 276.4, 128.7, 277.8, 126.6);
        recordBezierCurveTo(vaulter, ctx, 278.6, 125.6, 279.4, 123.6, 279.1, 119.2);
        recordBezierCurveTo(vaulter, ctx, 279.1, 119.2, 278.9, 118.1, 278.2, 117.6);
        ctx.closePath();
        ctx.fill();
        ctx.stroke();

        // vaulter/Path
        ctx.beginPath();
        recordMoveTo(vaulter, ctx, 267.7, 128.6);
        recordBezierCurveTo(vaulter, ctx, 265.6, 126.7, 266.5, 125.2, 266.8, 122.0);
        recordBezierCurveTo(vaulter, ctx, 267.0, 119.1, 268.1, 115.8, 268.9, 114.5);
        recordBezierCurveTo(vaulter, ctx, 268.9, 114.5, 269.3, 105.9, 270.1, 103.2);
        recordBezierCurveTo(vaulter, ctx, 271.0, 100.5, 270.1, 92.1, 270.1, 92.1);
        recordBezierCurveTo(vaulter, ctx, 270.1, 92.1, 268.8, 90.5, 268.6, 90.0);
        recordBezierCurveTo(vaulter, ctx, 268.4, 89.4, 269.1, 87.3, 270.5, 86.2);
        recordBezierCurveTo(vaulter, ctx, 271.9, 85.2, 274.2, 87.9, 274.2, 87.9);
        recordBezierCurveTo(vaulter, ctx, 274.2, 87.9, 274.7, 90.8, 274.2, 91.8);
        recordBezierCurveTo(vaulter, ctx, 273.6, 92.8, 272.9, 92.7, 272.9, 93.3);
        recordBezierCurveTo(vaulter, ctx, 272.9, 93.8, 274.6, 101.0, 274.4, 103.5);
        recordBezierCurveTo(vaulter, ctx, 274.3, 106.0, 273.6, 114.3, 274.1, 115.5);
        recordBezierCurveTo(vaulter, ctx, 274.5, 117.0, 275.6, 118.9, 273.8, 123.3);
        ctx.fill();
        ctx.stroke();
        ctx.restore();
      }
    },

    function (ctx) {
      if (vaulter.visible) {

        // vaulter/Path
        ctx.save();
        ctx.beginPath();
        recordMoveTo(vaulter, ctx, 270.8, 121.2);
        recordBezierCurveTo(vaulter, ctx, 270.8, 121.2, 272.7, 116.9, 276.2, 116.2);
        recordLineTo(vaulter, ctx, 277.5, 111.1);
        recordBezierCurveTo(vaulter, ctx, 277.5, 111.1, 276.9, 107.5, 277.5, 106.0);
        recordBezierCurveTo(vaulter, ctx, 278.1, 104.5, 277.5, 100.1, 277.5, 100.1);
        recordLineTo(vaulter, ctx, 276.6, 98.7);
        recordBezierCurveTo(vaulter, ctx, 276.6, 98.7, 276.5, 96.1, 277.5, 94.9);
        recordBezierCurveTo(vaulter, ctx, 278.6, 93.6, 280.5, 96.9, 280.5, 96.9);
        recordBezierCurveTo(vaulter, ctx, 280.5, 96.9, 280.4, 99.3, 280.0, 100.1);
        recordBezierCurveTo(vaulter, ctx, 279.5, 100.9, 281.3, 105.6, 281.0, 107.0);
        recordBezierCurveTo(vaulter, ctx, 280.6, 108.4, 282.2, 111.2, 282.2, 111.2);
        recordLineTo(vaulter, ctx, 283.0, 119.5);
        recordLineTo(vaulter, ctx, 275.5, 126.5);
        ctx.fillStyle = "rgb(17, 92, 137)";
        ctx.fill();
        ctx.lineWidth = 0.5;
        ctx.strokeStyle = "rgb(141, 204, 255)";
        ctx.lineJoin = "miter";
        ctx.miterLimit = 4.0;
        ctx.stroke();

        // vaulter/Path
        ctx.beginPath();
        recordMoveTo(vaulter, ctx, 272.9, 122.0);
        recordBezierCurveTo(vaulter, ctx, 272.9, 122.0, 267.6, 121.6, 266.5, 122.1);
        recordBezierCurveTo(vaulter, ctx, 265.3, 122.6, 261.4, 124.8, 261.4, 124.8);
        recordBezierCurveTo(vaulter, ctx, 261.4, 124.8, 257.4, 128.4, 259.4, 132.7);
        recordBezierCurveTo(vaulter, ctx, 261.5, 137.0, 267.3, 136.1, 269.3, 135.1);
        recordBezierCurveTo(vaulter, ctx, 271.4, 134.0, 275.5, 129.6, 275.5, 129.6);
        recordBezierCurveTo(vaulter, ctx, 275.5, 129.6, 275.8, 129.4, 276.2, 129.3);
        ctx.fill();
        ctx.stroke();

        // vaulter/Path
        ctx.beginPath();
        recordMoveTo(vaulter, ctx, 293.2, 255.8);
        recordBezierCurveTo(vaulter, ctx, 293.2, 255.2, 291.8, 191.3, 288.2, 158.1);
        recordBezierCurveTo(vaulter, ctx, 284.7, 125.0, 272.0, 77.7, 271.9, 77.2);
        recordBezierCurveTo(vaulter, ctx, 271.9, 77.2, 271.6, 76.1, 272.7, 75.8);
        recordBezierCurveTo(vaulter, ctx, 273.8, 75.6, 274.2, 76.6, 274.2, 76.6);
        recordBezierCurveTo(vaulter, ctx, 274.3, 77.1, 286.9, 124.6, 290.5, 157.9);
        recordBezierCurveTo(vaulter, ctx, 294.1, 191.2, 295.5, 255.1, 295.5, 255.8);
        recordLineTo(vaulter, ctx, 295.0, 342.2);
        recordLineTo(vaulter, ctx, 293.0, 342.2);
        recordLineTo(vaulter, ctx, 293.2, 255.8);
        ctx.closePath();
        ctx.fill();
        ctx.stroke();

        // vaulter/Path
        ctx.beginPath();
        recordMoveTo(vaulter, ctx, 270.8, 121.2);
        recordBezierCurveTo(vaulter, ctx, 270.8, 124.8, 271.7, 129.8, 278.3, 129.4);
        recordBezierCurveTo(vaulter, ctx, 284.9, 129.0, 290.2, 121.2, 290.2, 114.6);
        recordBezierCurveTo(vaulter, ctx, 290.2, 107.9, 290.2, 103.8, 290.2, 103.8);
        recordBezierCurveTo(vaulter, ctx, 290.2, 103.8, 288.0, 100.1, 285.3, 100.1);
        recordBezierCurveTo(vaulter, ctx, 282.6, 100.1, 280.5, 103.0, 280.5, 103.0);
        recordBezierCurveTo(vaulter, ctx, 280.5, 103.0, 279.3, 111.0, 277.6, 112.7);
        recordBezierCurveTo(vaulter, ctx, 275.9, 114.4, 274.2, 115.2, 273.0, 116.4);
        recordBezierCurveTo(vaulter, ctx, 271.8, 117.6, 270.8, 121.2, 270.8, 121.2);
        ctx.closePath();
        ctx.fill();
        ctx.stroke();

        // vaulter/Path
        ctx.beginPath();
        recordMoveTo(vaulter, ctx, 289.4, 114.7);
        recordBezierCurveTo(vaulter, ctx, 289.4, 114.7, 291.4, 103.9, 292.1, 102.0);
        recordBezierCurveTo(vaulter, ctx, 292.1, 102.0, 293.1, 99.4, 293.0, 96.2);
        recordBezierCurveTo(vaulter, ctx, 292.8, 92.9, 288.5, 82.4, 287.2, 79.8);
        recordBezierCurveTo(vaulter, ctx, 287.8, 73.7, 286.4, 63.3, 287.3, 54.3);
        recordBezierCurveTo(vaulter, ctx, 288.1, 52.9, 289.2, 53.8, 290.2, 52.2);
        recordBezierCurveTo(vaulter, ctx, 290.6, 51.5, 289.2, 49.4, 287.7, 49.0);
        recordBezierCurveTo(vaulter, ctx, 284.6, 48.1, 284.5, 46.6, 283.0, 45.6);
        recordBezierCurveTo(vaulter, ctx, 281.5, 44.5, 278.6, 41.9, 277.1, 43.7);
        recordBezierCurveTo(vaulter, ctx, 276.4, 44.5, 278.8, 46.1, 278.8, 46.1);
        recordBezierCurveTo(vaulter, ctx, 278.8, 46.1, 281.5, 51.9, 283.7, 53.1);
        recordLineTo(vaulter, ctx, 279.7, 85.3);
        recordBezierCurveTo(vaulter, ctx, 279.7, 85.3, 279.7, 93.4, 281.6, 104.2);
        ctx.fill();
        ctx.stroke();

        // vaulter/Path
        ctx.beginPath();
        recordMoveTo(vaulter, ctx, 288.1, 115.2);
        recordBezierCurveTo(vaulter, ctx, 288.1, 115.2, 290.2, 104.3, 290.8, 102.4);
        recordBezierCurveTo(vaulter, ctx, 290.8, 102.4, 291.9, 99.9, 291.7, 96.6);
        recordBezierCurveTo(vaulter, ctx, 291.5, 93.4, 287.2, 82.8, 285.9, 80.3);
        recordBezierCurveTo(vaulter, ctx, 286.5, 74.2, 285.2, 63.7, 286.0, 54.8);
        recordBezierCurveTo(vaulter, ctx, 286.8, 53.3, 287.9, 54.3, 289.0, 52.7);
        recordBezierCurveTo(vaulter, ctx, 289.3, 52.0, 288.0, 49.9, 286.4, 49.4);
        recordBezierCurveTo(vaulter, ctx, 283.3, 48.5, 283.2, 47.0, 281.7, 46.0);
        recordBezierCurveTo(vaulter, ctx, 280.2, 45.0, 277.3, 42.3, 275.8, 44.1);
        recordBezierCurveTo(vaulter, ctx, 275.2, 45.0, 277.6, 46.5, 277.6, 46.5);
        recordBezierCurveTo(vaulter, ctx, 277.6, 46.5, 280.2, 52.3, 282.4, 53.5);
        recordLineTo(vaulter, ctx, 278.4, 85.7);
        recordBezierCurveTo(vaulter, ctx, 278.4, 85.7, 278.4, 93.9, 280.3, 104.6);
        ctx.fill();
        ctx.stroke();

        // vaulter/Path
        ctx.beginPath();
        recordMoveTo(vaulter, ctx, 284.9, 117.3);
        recordBezierCurveTo(vaulter, ctx, 283.8, 115.9, 278.3, 113.8, 273.8, 117.6);
        recordBezierCurveTo(vaulter, ctx, 270.1, 120.9, 270.3, 124.4, 271.8, 126.1);
        recordBezierCurveTo(vaulter, ctx, 273.1, 127.5, 278.3, 126.3, 280.5, 125.1);
        recordBezierCurveTo(vaulter, ctx, 281.7, 124.6, 283.3, 123.1, 285.0, 119.0);
        recordBezierCurveTo(vaulter, ctx, 285.0, 119.0, 285.3, 118.0, 284.9, 117.3);
        ctx.closePath();
        ctx.fill();
        ctx.stroke();

        // vaulter/Path
        ctx.beginPath();
        recordMoveTo(vaulter, ctx, 278.8, 120.3);
        recordLineTo(vaulter, ctx, 277.6, 112.7);
        recordBezierCurveTo(vaulter, ctx, 277.3, 110.0, 277.5, 99.1, 277.5, 99.1);
        recordBezierCurveTo(vaulter, ctx, 278.1, 97.9, 277.5, 87.3, 277.5, 87.3);
        recordBezierCurveTo(vaulter, ctx, 277.5, 87.3, 279.0, 86.3, 278.8, 85.3);
        recordBezierCurveTo(vaulter, ctx, 278.7, 84.2, 276.1, 81.9, 276.1, 81.9);
        recordLineTo(vaulter, ctx, 274.8, 83.7);
        recordLineTo(vaulter, ctx, 275.4, 86.2);
        recordBezierCurveTo(vaulter, ctx, 275.4, 86.2, 274.7, 89.7, 273.9, 92.2);
        recordBezierCurveTo(vaulter, ctx, 273.0, 94.8, 273.9, 98.2, 273.9, 98.2);
        recordBezierCurveTo(vaulter, ctx, 273.9, 98.2, 272.9, 109.4, 271.7, 112.2);
        recordBezierCurveTo(vaulter, ctx, 270.5, 115.0, 270.1, 122.1, 270.1, 122.1);
        recordBezierCurveTo(vaulter, ctx, 270.0, 124.8, 272.6, 126.5, 272.6, 126.5);
        ctx.fill();
        ctx.stroke();
        ctx.restore();
      }
    },

    function (ctx) {
      if (vaulter.visible) {

        // vaulter/Path
        ctx.save();
        ctx.beginPath();
        recordMoveTo(vaulter, ctx, 276.3, 127.5);
        recordBezierCurveTo(vaulter, ctx, 276.3, 127.5, 279.7, 132.5, 285.9, 133.1);
        recordBezierCurveTo(vaulter, ctx, 292.1, 133.7, 295.5, 131.1, 295.9, 129.8);
        recordBezierCurveTo(vaulter, ctx, 296.2, 128.5, 294.3, 126.2, 291.3, 124.8);
        recordLineTo(vaulter, ctx, 285.4, 120.6);
        recordLineTo(vaulter, ctx, 284.4, 116.8);
        recordBezierCurveTo(vaulter, ctx, 284.4, 116.8, 281.8, 115.1, 280.8, 116.2);
        recordBezierCurveTo(vaulter, ctx, 280.2, 116.9, 281.6, 120.6, 281.6, 120.6);
        recordLineTo(vaulter, ctx, 284.3, 122.4);
        recordBezierCurveTo(vaulter, ctx, 284.3, 122.4, 288.0, 127.0, 289.8, 127.9);
        recordLineTo(vaulter, ctx, 283.8, 125.8);
        ctx.fillStyle = "rgb(17, 92, 137)";
        ctx.fill();
        ctx.lineWidth = 0.5;
        ctx.strokeStyle = "rgb(141, 204, 255)";
        ctx.lineJoin = "miter";
        ctx.miterLimit = 4.0;
        ctx.stroke();

        // vaulter/Path
        ctx.beginPath();
        recordMoveTo(vaulter, ctx, 277.1, 123.5);
        recordBezierCurveTo(vaulter, ctx, 277.1, 123.5, 271.8, 121.5, 270.6, 121.6);
        recordBezierCurveTo(vaulter, ctx, 269.3, 121.7, 264.7, 122.8, 264.7, 122.8);
        recordBezierCurveTo(vaulter, ctx, 264.7, 122.8, 259.5, 125.1, 260.3, 130.1);
        recordBezierCurveTo(vaulter, ctx, 261.0, 135.0, 267.1, 135.9, 269.4, 135.5);
        recordBezierCurveTo(vaulter, ctx, 271.9, 135.1, 277.3, 132.0, 277.3, 132.0);
        recordBezierCurveTo(vaulter, ctx, 277.3, 132.0, 277.7, 131.8, 278.2, 131.8);
        ctx.fill();
        ctx.stroke();

        // vaulter/Path
        ctx.beginPath();
        recordMoveTo(vaulter, ctx, 293.0, 342.2);
        recordBezierCurveTo(vaulter, ctx, 293.0, 342.1, 293.4, 266.6, 293.2, 261.9);
        recordBezierCurveTo(vaulter, ctx, 292.2, 241.9, 289.4, 187.8, 286.8, 156.9);
        recordBezierCurveTo(vaulter, ctx, 283.6, 118.8, 276.5, 77.7, 276.4, 77.3);
        recordBezierCurveTo(vaulter, ctx, 276.4, 77.3, 276.2, 76.1, 277.4, 75.9);
        recordBezierCurveTo(vaulter, ctx, 278.5, 75.7, 278.8, 76.9, 278.8, 76.9);
        recordBezierCurveTo(vaulter, ctx, 278.9, 77.3, 286.0, 118.5, 289.2, 156.7);
        recordBezierCurveTo(vaulter, ctx, 291.8, 187.6, 294.6, 241.8, 295.6, 261.8);
        recordBezierCurveTo(vaulter, ctx, 295.9, 266.5, 295.0, 342.1, 295.0, 342.2);
        recordLineTo(vaulter, ctx, 293.0, 342.2);
        ctx.closePath();
        ctx.fill();
        ctx.stroke();

        // vaulter/Path
        ctx.beginPath();
        recordMoveTo(vaulter, ctx, 275.5, 127.0);
        recordBezierCurveTo(vaulter, ctx, 275.5, 127.0, 277.3, 132.3, 280.0, 133.2);
        recordBezierCurveTo(vaulter, ctx, 282.6, 134.1, 290.5, 132.2, 293.7, 122.0);
        recordBezierCurveTo(vaulter, ctx, 296.9, 111.8, 294.8, 104.4, 294.8, 104.4);
        recordBezierCurveTo(vaulter, ctx, 294.1, 101.4, 289.6, 100.3, 288.2, 100.1);
        recordBezierCurveTo(vaulter, ctx, 286.8, 100.0, 284.2, 102.6, 284.1, 103.5);
        recordBezierCurveTo(vaulter, ctx, 283.9, 104.4, 282.5, 113.4, 280.8, 114.6);
        recordBezierCurveTo(vaulter, ctx, 279.2, 115.8, 277.4, 117.7, 276.6, 119.5);
        recordBezierCurveTo(vaulter, ctx, 275.7, 121.3, 274.9, 125.5, 275.5, 127.0);
        ctx.closePath();
        ctx.fill();
        ctx.stroke();

        // vaulter/Path
        ctx.beginPath();
        recordMoveTo(vaulter, ctx, 286.8, 109.3);
        recordBezierCurveTo(vaulter, ctx, 286.8, 109.3, 286.6, 98.9, 285.9, 95.7);
        recordBezierCurveTo(vaulter, ctx, 285.3, 92.5, 288.5, 77.1, 288.5, 77.1);
        recordBezierCurveTo(vaulter, ctx, 288.5, 77.1, 293.9, 66.3, 292.3, 54.5);
        recordBezierCurveTo(vaulter, ctx, 292.3, 54.5, 286.4, 51.7, 286.2, 50.6);
        recordBezierCurveTo(vaulter, ctx, 286.2, 50.6, 283.2, 49.7, 283.8, 48.6);
        recordBezierCurveTo(vaulter, ctx, 284.4, 47.6, 285.1, 46.8, 286.2, 47.2);
        recordBezierCurveTo(vaulter, ctx, 287.3, 47.6, 292.3, 48.1, 292.3, 48.1);
        recordBezierCurveTo(vaulter, ctx, 292.3, 48.1, 295.1, 50.2, 295.9, 50.2);
        recordBezierCurveTo(vaulter, ctx, 296.8, 50.2, 298.6, 49.5, 299.3, 51.3);
        recordBezierCurveTo(vaulter, ctx, 300.0, 53.1, 296.8, 54.9, 296.8, 54.9);
        recordLineTo(vaulter, ctx, 295.9, 82.1);
        recordBezierCurveTo(vaulter, ctx, 295.9, 82.1, 299.1, 96.4, 298.7, 100.1);
        recordBezierCurveTo(vaulter, ctx, 298.2, 103.9, 294.8, 114.1, 294.8, 114.1);
        ctx.fill();
        ctx.stroke();

        // vaulter/Path
        ctx.beginPath();
        recordMoveTo(vaulter, ctx, 285.3, 108.7);
        recordBezierCurveTo(vaulter, ctx, 285.3, 108.7, 285.1, 98.3, 284.4, 95.1);
        recordBezierCurveTo(vaulter, ctx, 283.8, 91.9, 287.0, 76.5, 287.0, 76.5);
        recordBezierCurveTo(vaulter, ctx, 287.0, 76.5, 292.4, 65.8, 290.8, 53.9);
        recordBezierCurveTo(vaulter, ctx, 290.8, 53.9, 284.9, 51.1, 284.7, 50.0);
        recordBezierCurveTo(vaulter, ctx, 284.7, 50.0, 281.7, 49.1, 282.3, 48.0);
        recordBezierCurveTo(vaulter, ctx, 282.9, 47.0, 283.6, 46.3, 284.7, 46.6);
        recordBezierCurveTo(vaulter, ctx, 285.8, 47.0, 290.8, 47.5, 290.8, 47.5);
        recordBezierCurveTo(vaulter, ctx, 290.8, 47.5, 293.5, 49.7, 294.4, 49.7);
        recordBezierCurveTo(vaulter, ctx, 295.2, 49.7, 297.0, 48.9, 297.7, 50.7);
        recordBezierCurveTo(vaulter, ctx, 298.5, 52.5, 295.2, 54.3, 295.2, 54.3);
        recordLineTo(vaulter, ctx, 294.4, 81.5);
        recordBezierCurveTo(vaulter, ctx, 294.4, 81.5, 297.6, 95.8, 297.1, 99.6);
        recordBezierCurveTo(vaulter, ctx, 296.7, 103.3, 293.3, 113.5, 293.3, 113.5);
        ctx.fill();
        ctx.stroke();

        // vaulter/Path
        ctx.beginPath();
        recordMoveTo(vaulter, ctx, 291.1, 120.2);
        recordBezierCurveTo(vaulter, ctx, 289.9, 118.8, 284.2, 116.4, 279.5, 120.3);
        recordBezierCurveTo(vaulter, ctx, 275.5, 123.6, 275.6, 127.3, 277.2, 129.1);
        recordBezierCurveTo(vaulter, ctx, 278.4, 130.6, 284.0, 129.6, 286.3, 128.3);
        recordBezierCurveTo(vaulter, ctx, 287.5, 127.8, 289.3, 126.4, 291.1, 122.1);
        recordBezierCurveTo(vaulter, ctx, 291.1, 122.1, 291.5, 121.0, 291.1, 120.2);
        ctx.closePath();
        ctx.fill();
        ctx.stroke();

        // vaulter/Path
        ctx.beginPath();
        recordMoveTo(vaulter, ctx, 281.1, 120.6);
        recordBezierCurveTo(vaulter, ctx, 281.1, 120.6, 282.6, 111.3, 283.2, 110.3);
        recordBezierCurveTo(vaulter, ctx, 284.5, 108.4, 283.2, 102.9, 283.2, 102.9);
        recordBezierCurveTo(vaulter, ctx, 283.2, 102.9, 282.3, 97.9, 281.3, 95.3);
        recordBezierCurveTo(vaulter, ctx, 280.8, 93.9, 280.1, 90.5, 280.0, 88.2);
        recordBezierCurveTo(vaulter, ctx, 280.7, 87.2, 280.8, 86.3, 280.8, 86.3);
        recordBezierCurveTo(vaulter, ctx, 280.8, 86.3, 280.1, 82.2, 278.5, 81.0);
        recordBezierCurveTo(vaulter, ctx, 276.9, 79.8, 277.5, 79.6, 275.9, 81.0);
        recordBezierCurveTo(vaulter, ctx, 274.2, 82.4, 275.9, 87.2, 275.9, 87.2);
        recordLineTo(vaulter, ctx, 277.7, 88.7);
        recordBezierCurveTo(vaulter, ctx, 277.7, 88.7, 278.9, 92.9, 278.2, 96.0);
        recordBezierCurveTo(vaulter, ctx, 277.5, 99.1, 278.2, 105.6, 278.2, 105.6);
        recordBezierCurveTo(vaulter, ctx, 278.2, 105.6, 275.6, 111.8, 273.9, 115.8);
        recordBezierCurveTo(vaulter, ctx, 272.3, 119.9, 273.9, 123.7, 273.9, 123.7);
        recordBezierCurveTo(vaulter, ctx, 275.3, 127.4, 276.8, 128.7, 276.8, 128.7);
        ctx.fill();
        ctx.stroke();
        ctx.restore();
      }
    },

    function (ctx) {
      if (vaulter.visible) {

        // vaulter/Group
        ctx.save();

        // vaulter/Group/Path
        ctx.save();
        ctx.beginPath();
        recordMoveTo(vaulter, ctx, 299.5, 119.1);
        recordBezierCurveTo(vaulter, ctx, 299.1, 118.6, 298.8, 118.4, 298.5, 118.2);
        recordBezierCurveTo(vaulter, ctx, 298.1, 117.9, 297.9, 117.8, 297.9, 117.8);
        recordBezierCurveTo(vaulter, ctx, 296.9, 117.6, 293.1, 117.0, 291.9, 119.0);
        recordLineTo(vaulter, ctx, 292.2, 119.5);
        recordLineTo(vaulter, ctx, 296.8, 128.6);
        recordBezierCurveTo(vaulter, ctx, 297.9, 130.7, 299.5, 135.0, 300.9, 134.9);
        recordBezierCurveTo(vaulter, ctx, 302.4, 134.8, 303.6, 134.4, 303.8, 133.9);
        recordBezierCurveTo(vaulter, ctx, 304.0, 132.8, 301.8, 122.0, 299.5, 119.1);
        ctx.closePath();
        ctx.fillStyle = "rgb(17, 92, 137)";
        ctx.fill();
        ctx.lineWidth = 0.5;
        ctx.strokeStyle = "rgb(141, 204, 255)";
        ctx.lineJoin = "miter";
        ctx.miterLimit = 4.0;
        ctx.stroke();

        // vaulter/Group/Path
        ctx.beginPath();
        recordMoveTo(vaulter, ctx, 298.3, 128.8);
        recordBezierCurveTo(vaulter, ctx, 297.8, 128.6, 297.3, 128.5, 296.8, 128.6);
        recordBezierCurveTo(vaulter, ctx, 295.0, 128.7, 290.5, 128.1, 289.6, 127.9);
        recordBezierCurveTo(vaulter, ctx, 289.4, 127.9, 289.4, 127.9, 289.4, 127.9);
        recordLineTo(vaulter, ctx, 287.7, 125.8);
        recordBezierCurveTo(vaulter, ctx, 287.7, 125.8, 287.6, 125.7, 287.5, 125.6);
        recordBezierCurveTo(vaulter, ctx, 287.1, 125.4, 286.2, 125.1, 285.7, 125.8);
        recordBezierCurveTo(vaulter, ctx, 285.0, 126.7, 284.4, 129.4, 284.4, 129.4);
        recordLineTo(vaulter, ctx, 286.2, 132.2);
        recordBezierCurveTo(vaulter, ctx, 286.2, 132.2, 286.9, 132.3, 287.7, 132.2);
        recordBezierCurveTo(vaulter, ctx, 288.3, 132.1, 289.0, 132.0, 289.7, 131.6);
        recordBezierCurveTo(vaulter, ctx, 289.8, 131.6, 289.9, 131.6, 290.0, 131.5);
        recordBezierCurveTo(vaulter, ctx, 290.0, 131.5, 293.9, 132.3, 296.4, 133.9);
        recordBezierCurveTo(vaulter, ctx, 297.7, 134.7, 299.4, 135.0, 300.9, 134.9);
        recordBezierCurveTo(vaulter, ctx, 302.4, 134.8, 303.6, 134.4, 303.8, 133.9);
        ctx.fill();
        ctx.stroke();

        // vaulter/Path
        ctx.restore();
        ctx.beginPath();
        recordMoveTo(vaulter, ctx, 287.5, 76.4);
        recordBezierCurveTo(vaulter, ctx, 287.5, 76.4, 287.5, 75.3, 286.5, 75.4);
        recordBezierCurveTo(vaulter, ctx, 285.4, 75.4, 285.5, 76.5, 285.5, 76.5);
        recordLineTo(vaulter, ctx, 293.8, 281.0);
        recordLineTo(vaulter, ctx, 293.3, 342.2);
        recordLineTo(vaulter, ctx, 295.3, 342.2);
        recordLineTo(vaulter, ctx, 295.8, 281.0);
        recordLineTo(vaulter, ctx, 287.5, 76.4);
        ctx.closePath();
        ctx.fillStyle = "rgb(17, 92, 137)";
        ctx.fill();
        ctx.lineWidth = 0.5;
        ctx.strokeStyle = "rgb(141, 204, 255)";
        ctx.lineJoin = "miter";
        ctx.miterLimit = 4.0;
        ctx.stroke();

        // vaulter/Group

        // vaulter/Group/Path
        ctx.save();
        ctx.beginPath();
        recordMoveTo(vaulter, ctx, 298.5, 118.1);
        recordBezierCurveTo(vaulter, ctx, 298.7, 118.0, 299.0, 117.8, 298.5, 118.1);
        recordLineTo(vaulter, ctx, 298.5, 118.1);
        ctx.closePath();
        ctx.fill();
        ctx.stroke();

        // vaulter/Group/Path
        ctx.beginPath();
        recordMoveTo(vaulter, ctx, 298.4, 118.2);
        recordBezierCurveTo(vaulter, ctx, 298.5, 118.1, 298.5, 118.1, 298.5, 118.1);
        recordBezierCurveTo(vaulter, ctx, 298.5, 118.1, 298.4, 118.2, 298.4, 118.2);
        ctx.closePath();
        ctx.fill();
        ctx.stroke();

        // vaulter/Group/Path
        ctx.beginPath();
        recordMoveTo(vaulter, ctx, 305.8, 72.0);
        recordBezierCurveTo(vaulter, ctx, 301.8, 70.9, 298.6, 72.0, 298.6, 72.0);
        recordBezierCurveTo(vaulter, ctx, 297.8, 78.1, 294.3, 91.3, 294.0, 92.2);
        recordBezierCurveTo(vaulter, ctx, 292.6, 95.5, 290.4, 98.2, 288.4, 100.9);
        recordBezierCurveTo(vaulter, ctx, 285.4, 104.8, 282.6, 108.7, 284.7, 113.9);
        recordBezierCurveTo(vaulter, ctx, 287.0, 119.5, 293.4, 120.6, 298.4, 118.2);
        recordBezierCurveTo(vaulter, ctx, 302.6, 115.7, 305.6, 107.6, 306.7, 103.0);
        recordBezierCurveTo(vaulter, ctx, 307.3, 100.6, 307.9, 98.3, 307.9, 96.2);
        recordBezierCurveTo(vaulter, ctx, 309.0, 90.6, 309.8, 73.0, 305.8, 72.0);
        ctx.closePath();
        ctx.fill();
        ctx.stroke();

        // vaulter/Path
        ctx.restore();
        ctx.beginPath();
        recordMoveTo(vaulter, ctx, 300.9, 134.9);
        recordBezierCurveTo(vaulter, ctx, 300.9, 134.9, 300.9, 134.9, 300.9, 134.9);
        recordBezierCurveTo(vaulter, ctx, 302.4, 134.8, 303.6, 134.4, 303.8, 133.9);
        recordBezierCurveTo(vaulter, ctx, 303.6, 134.4, 302.4, 134.8, 300.9, 134.9);
        ctx.closePath();
        ctx.fill();
        ctx.stroke();

        // vaulter/Path
        ctx.beginPath();
        recordMoveTo(vaulter, ctx, 284.4, 109.1);
        recordBezierCurveTo(vaulter, ctx, 284.4, 109.1, 284.3, 109.1, 284.2, 109.1);
        recordBezierCurveTo(vaulter, ctx, 283.0, 109.0, 278.1, 108.7, 275.5, 109.8);
        recordBezierCurveTo(vaulter, ctx, 272.5, 111.1, 270.9, 115.2, 272.2, 119.0);
        recordBezierCurveTo(vaulter, ctx, 273.4, 122.5, 280.1, 123.6, 282.9, 121.4);
        recordBezierCurveTo(vaulter, ctx, 285.2, 119.6, 286.4, 117.6, 286.7, 116.8);
        recordBezierCurveTo(vaulter, ctx, 286.8, 116.6, 286.9, 116.5, 286.9, 116.5);
        ctx.fill();
        ctx.stroke();

        // vaulter/Path
        ctx.beginPath();
        recordMoveTo(vaulter, ctx, 290.6, 98.2);
        recordBezierCurveTo(vaulter, ctx, 290.1, 98.8, 289.5, 99.5, 288.9, 100.4);
        recordBezierCurveTo(vaulter, ctx, 288.9, 100.4, 287.2, 102.6, 286.6, 103.5);
        recordBezierCurveTo(vaulter, ctx, 286.5, 103.6, 286.4, 103.7, 286.3, 103.8);
        recordBezierCurveTo(vaulter, ctx, 285.6, 105.0, 284.9, 106.0, 284.6, 106.7);
        recordBezierCurveTo(vaulter, ctx, 284.5, 106.9, 284.4, 107.0, 284.4, 107.2);
        recordBezierCurveTo(vaulter, ctx, 285.4, 107.6, 286.1, 107.7, 286.7, 107.6);
        recordBezierCurveTo(vaulter, ctx, 287.4, 107.5, 288.0, 107.2, 288.7, 106.6);
        recordBezierCurveTo(vaulter, ctx, 288.9, 106.4, 289.2, 106.1, 289.4, 105.9);
        recordBezierCurveTo(vaulter, ctx, 291.3, 104.2, 291.6, 101.4, 290.6, 98.2);
        ctx.closePath();
        ctx.fill();
        ctx.stroke();

        // vaulter/Path
        ctx.beginPath();
        recordMoveTo(vaulter, ctx, 288.5, 101.2);
        recordBezierCurveTo(vaulter, ctx, 288.5, 101.2, 288.8, 100.4, 288.9, 100.2);
        recordBezierCurveTo(vaulter, ctx, 289.3, 99.2, 289.8, 98.1, 290.3, 97.0);
        recordBezierCurveTo(vaulter, ctx, 290.8, 95.6, 291.9, 92.3, 291.9, 92.3);
        recordBezierCurveTo(vaulter, ctx, 291.9, 92.3, 292.7, 88.6, 291.9, 87.2);
        recordLineTo(vaulter, ctx, 289.4, 83.3);
        recordBezierCurveTo(vaulter, ctx, 289.4, 83.3, 288.7, 81.6, 287.7, 80.9);
        recordBezierCurveTo(vaulter, ctx, 287.6, 80.9, 287.6, 80.9, 287.6, 80.8);
        recordBezierCurveTo(vaulter, ctx, 287.1, 80.5, 286.3, 80.6, 285.7, 80.8);
        recordBezierCurveTo(vaulter, ctx, 284.9, 81.1, 284.4, 81.4, 284.4, 81.4);
        recordLineTo(vaulter, ctx, 284.1, 84.5);
        recordBezierCurveTo(vaulter, ctx, 285.4, 85.6, 285.1, 86.4, 285.9, 86.4);
        recordBezierCurveTo(vaulter, ctx, 286.0, 86.4, 286.1, 86.4, 286.2, 86.4);
        recordBezierCurveTo(vaulter, ctx, 287.2, 86.2, 287.7, 86.2, 287.9, 86.1);
        recordBezierCurveTo(vaulter, ctx, 288.0, 86.1, 288.0, 86.1, 288.0, 86.1);
        recordLineTo(vaulter, ctx, 289.2, 88.1);
        recordBezierCurveTo(vaulter, ctx, 288.8, 88.5, 288.4, 89.0, 288.0, 89.5);
        recordBezierCurveTo(vaulter, ctx, 287.5, 90.1, 287.2, 90.6, 287.2, 90.6);
        recordBezierCurveTo(vaulter, ctx, 287.2, 90.6, 286.7, 91.3, 286.1, 92.3);
        recordBezierCurveTo(vaulter, ctx, 284.4, 95.2, 281.2, 100.8, 281.5, 102.5);
        recordBezierCurveTo(vaulter, ctx, 281.9, 104.9, 284.1, 106.8, 284.1, 106.8);
        recordBezierCurveTo(vaulter, ctx, 284.1, 106.8, 284.7, 107.1, 284.7, 107.1);
        ctx.fill();
        ctx.stroke();

        // vaulter/Path
        ctx.beginPath();
        recordMoveTo(vaulter, ctx, 308.0, 70.6);
        recordBezierCurveTo(vaulter, ctx, 308.2, 69.0, 309.5, 63.9, 309.5, 63.9);
        recordLineTo(vaulter, ctx, 315.6, 43.3);
        recordLineTo(vaulter, ctx, 318.9, 35.5);
        recordLineTo(vaulter, ctx, 319.7, 33.6);
        recordBezierCurveTo(vaulter, ctx, 320.8, 34.2, 321.5, 33.7, 322.3, 32.9);
        recordBezierCurveTo(vaulter, ctx, 322.6, 32.6, 322.7, 31.8, 322.8, 30.9);
        recordBezierCurveTo(vaulter, ctx, 322.8, 29.5, 322.7, 27.7, 322.7, 27.1);
        recordBezierCurveTo(vaulter, ctx, 322.7, 26.1, 323.9, 23.2, 324.5, 21.4);
        recordBezierCurveTo(vaulter, ctx, 324.8, 20.5, 324.7, 18.0, 324.1, 16.9);
        recordBezierCurveTo(vaulter, ctx, 323.8, 16.6, 323.6, 16.4, 323.2, 16.3);
        recordBezierCurveTo(vaulter, ctx, 322.9, 16.3, 322.5, 16.3, 322.1, 16.5);
        recordBezierCurveTo(vaulter, ctx, 321.7, 16.6, 321.2, 16.9, 320.9, 17.1);
        recordBezierCurveTo(vaulter, ctx, 319.9, 17.8, 319.1, 22.2, 319.1, 22.2);
        recordLineTo(vaulter, ctx, 316.6, 31.3);
        recordLineTo(vaulter, ctx, 302.8, 57.7);
        recordBezierCurveTo(vaulter, ctx, 302.8, 57.7, 295.8, 68.6, 295.1, 75.0);
        recordBezierCurveTo(vaulter, ctx, 294.3, 81.4, 294.4, 91.7, 294.4, 91.8);
        ctx.fill();
        ctx.stroke();

        // vaulter/Path
        ctx.beginPath();
        recordMoveTo(vaulter, ctx, 308.0, 94.8);
        recordBezierCurveTo(vaulter, ctx, 308.0, 94.8, 309.7, 90.0, 312.7, 78.2);
        recordBezierCurveTo(vaulter, ctx, 315.1, 68.7, 317.8, 44.7, 318.9, 35.5);
        recordBezierCurveTo(vaulter, ctx, 319.1, 33.2, 319.3, 31.9, 319.3, 31.9);
        recordBezierCurveTo(vaulter, ctx, 319.3, 31.9, 321.1, 33.3, 322.2, 31.9);
        recordBezierCurveTo(vaulter, ctx, 322.5, 31.6, 322.6, 31.3, 322.8, 30.9);
        recordBezierCurveTo(vaulter, ctx, 322.8, 29.5, 322.7, 27.7, 322.7, 27.1);
        recordBezierCurveTo(vaulter, ctx, 322.7, 26.1, 323.9, 23.2, 324.5, 21.4);
        recordBezierCurveTo(vaulter, ctx, 324.8, 20.5, 324.7, 18.0, 324.1, 16.9);
        recordBezierCurveTo(vaulter, ctx, 323.8, 16.6, 323.6, 16.4, 323.2, 16.3);
        recordBezierCurveTo(vaulter, ctx, 322.9, 16.3, 322.5, 16.3, 322.1, 16.5);
        recordBezierCurveTo(vaulter, ctx, 320.5, 17.5, 316.8, 30.7, 316.8, 30.7);
        recordLineTo(vaulter, ctx, 304.5, 71.0);
        ctx.fill();
        ctx.stroke();
        ctx.restore();
      }
    },

    function (ctx) {
      if (vaulter.visible) {

        // vaulter/Path
        ctx.save();
        ctx.beginPath();
        recordMoveTo(vaulter, ctx, 305.2, 126.4);
        recordBezierCurveTo(vaulter, ctx, 305.0, 125.5, 302.5, 114.1, 299.7, 109.0);
        recordBezierCurveTo(vaulter, ctx, 299.0, 107.7, 298.4, 106.8, 297.7, 106.5);
        recordBezierCurveTo(vaulter, ctx, 295.4, 105.5, 292.3, 108.1, 293.1, 110.5);
        recordBezierCurveTo(vaulter, ctx, 293.1, 110.5, 293.2, 110.8, 293.3, 111.2);
        recordBezierCurveTo(vaulter, ctx, 294.1, 113.4, 296.7, 120.7, 298.3, 124.3);
        recordBezierCurveTo(vaulter, ctx, 297.7, 124.3, 297.1, 124.4, 296.6, 124.7);
        recordBezierCurveTo(vaulter, ctx, 294.9, 125.7, 289.6, 127.4, 289.6, 127.4);
        recordLineTo(vaulter, ctx, 289.2, 127.2);
        recordLineTo(vaulter, ctx, 287.2, 126.3);
        recordBezierCurveTo(vaulter, ctx, 287.2, 126.3, 287.2, 126.3, 287.1, 126.3);
        recordBezierCurveTo(vaulter, ctx, 286.8, 126.2, 285.6, 126.2, 285.4, 127.2);
        recordBezierCurveTo(vaulter, ctx, 285.2, 128.3, 285.8, 131.0, 285.8, 131.0);
        recordLineTo(vaulter, ctx, 287.3, 131.8);
        recordLineTo(vaulter, ctx, 288.8, 132.6);
        recordBezierCurveTo(vaulter, ctx, 288.8, 132.6, 289.0, 132.6, 289.4, 132.4);
        recordBezierCurveTo(vaulter, ctx, 290.0, 132.1, 291.0, 131.5, 291.8, 130.4);
        recordBezierCurveTo(vaulter, ctx, 291.8, 130.4, 295.6, 129.4, 298.6, 129.7);
        recordBezierCurveTo(vaulter, ctx, 300.1, 129.8, 301.8, 129.2, 303.1, 128.5);
        recordBezierCurveTo(vaulter, ctx, 303.1, 128.5, 303.1, 128.5, 303.1, 128.5);
        recordBezierCurveTo(vaulter, ctx, 303.3, 128.4, 303.4, 128.3, 303.6, 128.2);
        recordBezierCurveTo(vaulter, ctx, 304.6, 127.6, 305.3, 126.8, 305.2, 126.4);
        ctx.closePath();
        ctx.fillStyle = "rgb(17, 92, 137)";
        ctx.fill();
        ctx.lineWidth = 0.5;
        ctx.strokeStyle = "rgb(141, 204, 255)";
        ctx.lineJoin = "miter";
        ctx.miterLimit = 4.0;
        ctx.stroke();

        // vaulter/Path
        ctx.beginPath();
        recordMoveTo(vaulter, ctx, 287.1, 76.3);
        recordBezierCurveTo(vaulter, ctx, 287.1, 76.3, 287.1, 75.3, 286.1, 75.4);
        recordBezierCurveTo(vaulter, ctx, 285.1, 75.4, 285.1, 76.3, 285.1, 76.3);
        recordBezierCurveTo(vaulter, ctx, 285.1, 76.3, 294.0, 262.9, 293.6, 289.2);
        recordBezierCurveTo(vaulter, ctx, 293.3, 315.4, 293.0, 342.2, 293.0, 342.2);
        recordLineTo(vaulter, ctx, 295.0, 342.2);
        recordBezierCurveTo(vaulter, ctx, 295.0, 342.2, 295.5, 313.7, 295.6, 289.2);
        recordBezierCurveTo(vaulter, ctx, 295.7, 264.7, 287.1, 76.3, 287.1, 76.3);
        ctx.closePath();
        ctx.fill();
        ctx.stroke();

        // vaulter/Path
        ctx.beginPath();
        recordMoveTo(vaulter, ctx, 307.8, 86.2);
        recordLineTo(vaulter, ctx, 315.1, 55.0);
        recordBezierCurveTo(vaulter, ctx, 315.1, 55.0, 313.7, 52.2, 310.5, 51.5);
        recordBezierCurveTo(vaulter, ctx, 307.4, 50.7, 302.9, 53.4, 302.9, 53.4);
        recordLineTo(vaulter, ctx, 293.3, 81.1);
        recordBezierCurveTo(vaulter, ctx, 293.3, 81.1, 293.3, 81.1, 293.3, 81.1);
        recordBezierCurveTo(vaulter, ctx, 291.0, 83.3, 290.3, 87.5, 289.2, 90.1);
        recordBezierCurveTo(vaulter, ctx, 289.1, 90.1, 289.1, 90.1, 289.1, 90.0);
        recordBezierCurveTo(vaulter, ctx, 287.5, 92.8, 285.5, 95.4, 284.1, 98.3);
        recordBezierCurveTo(vaulter, ctx, 280.9, 105.1, 288.3, 112.4, 294.9, 111.0);
        recordBezierCurveTo(vaulter, ctx, 300.3, 109.9, 301.9, 104.7, 304.3, 100.4);
        recordBezierCurveTo(vaulter, ctx, 305.8, 97.6, 308.6, 90.4, 307.8, 86.2);
        recordBezierCurveTo(vaulter, ctx, 307.8, 86.2, 307.8, 86.2, 307.8, 86.2);
        ctx.closePath();
        ctx.fill();
        ctx.stroke();

        // vaulter/Path
        ctx.beginPath();
        recordMoveTo(vaulter, ctx, 286.5, 101.0);
        recordBezierCurveTo(vaulter, ctx, 286.5, 101.0, 286.3, 101.1, 286.1, 101.2);
        recordBezierCurveTo(vaulter, ctx, 285.7, 101.3, 285.0, 101.6, 284.2, 101.9);
        recordBezierCurveTo(vaulter, ctx, 282.3, 102.7, 279.9, 103.9, 278.6, 105.3);
        recordBezierCurveTo(vaulter, ctx, 276.4, 107.7, 276.6, 112.1, 279.4, 115.1);
        recordBezierCurveTo(vaulter, ctx, 281.0, 116.8, 284.1, 116.7, 286.7, 115.6);
        recordBezierCurveTo(vaulter, ctx, 287.4, 115.3, 288.1, 115.0, 288.6, 114.5);
        recordBezierCurveTo(vaulter, ctx, 289.3, 114.0, 289.8, 113.5, 290.2, 112.8);
        recordBezierCurveTo(vaulter, ctx, 290.5, 112.2, 290.8, 111.5, 291.0, 110.9);
        recordBezierCurveTo(vaulter, ctx, 291.1, 110.7, 291.1, 110.5, 291.2, 110.4);
        ctx.fill();
        ctx.stroke();

        // vaulter/Path
        ctx.beginPath();
        recordMoveTo(vaulter, ctx, 290.4, 83.4);
        recordLineTo(vaulter, ctx, 290.0, 82.9);
        recordLineTo(vaulter, ctx, 289.2, 82.0);
        recordBezierCurveTo(vaulter, ctx, 289.2, 82.0, 288.3, 80.9, 287.3, 80.3);
        recordBezierCurveTo(vaulter, ctx, 287.1, 80.3, 287.0, 80.2, 286.8, 80.1);
        recordBezierCurveTo(vaulter, ctx, 286.3, 80.0, 285.8, 80.2, 285.3, 80.5);
        recordBezierCurveTo(vaulter, ctx, 284.5, 80.9, 283.9, 81.5, 283.9, 81.5);
        recordLineTo(vaulter, ctx, 284.5, 84.6);
        recordBezierCurveTo(vaulter, ctx, 284.9, 84.8, 285.2, 85.0, 285.5, 85.2);
        recordBezierCurveTo(vaulter, ctx, 285.7, 85.4, 285.9, 85.6, 286.0, 85.7);
        recordBezierCurveTo(vaulter, ctx, 286.3, 86.0, 286.5, 86.1, 287.0, 85.8);
        recordBezierCurveTo(vaulter, ctx, 287.2, 85.7, 287.4, 85.7, 287.5, 85.6);
        recordBezierCurveTo(vaulter, ctx, 288.4, 85.2, 288.7, 85.1, 288.7, 85.1);
        recordLineTo(vaulter, ctx, 289.5, 85.8);
        recordBezierCurveTo(vaulter, ctx, 289.9, 86.2, 290.0, 86.0, 290.4, 85.6);
        recordBezierCurveTo(vaulter, ctx, 290.9, 85.2, 291.0, 84.0, 290.4, 83.4);
        ctx.closePath();
        ctx.fill();
        ctx.stroke();

        // vaulter/Path
        ctx.beginPath();
        recordMoveTo(vaulter, ctx, 289.9, 90.6);
        recordBezierCurveTo(vaulter, ctx, 289.9, 90.6, 289.5, 90.1, 289.5, 90.0);
        recordBezierCurveTo(vaulter, ctx, 289.4, 90.2, 289.3, 90.4, 289.2, 90.6);
        recordBezierCurveTo(vaulter, ctx, 289.2, 90.6, 289.2, 90.6, 289.2, 90.6);
        recordBezierCurveTo(vaulter, ctx, 288.8, 91.3, 288.3, 92.1, 287.8, 92.9);
        recordBezierCurveTo(vaulter, ctx, 287.1, 94.0, 286.5, 95.0, 285.9, 96.0);
        recordBezierCurveTo(vaulter, ctx, 285.7, 96.2, 284.4, 98.7, 284.4, 98.8);
        recordBezierCurveTo(vaulter, ctx, 285.1, 99.1, 285.6, 99.2, 286.0, 99.2);
        recordBezierCurveTo(vaulter, ctx, 286.8, 99.3, 287.3, 99.0, 288.0, 98.4);
        recordBezierCurveTo(vaulter, ctx, 288.3, 98.2, 288.5, 97.9, 288.9, 97.6);
        recordBezierCurveTo(vaulter, ctx, 290.6, 96.1, 290.9, 93.5, 289.9, 90.6);
        ctx.closePath();
        ctx.fill();
        ctx.stroke();

        // vaulter/Path
        ctx.beginPath();
        recordMoveTo(vaulter, ctx, 311.2, 56.7);
        recordBezierCurveTo(vaulter, ctx, 311.2, 56.7, 317.8, 39.6, 318.5, 38.0);
        recordBezierCurveTo(vaulter, ctx, 319.1, 36.4, 323.4, 26.3, 323.4, 26.3);
        recordLineTo(vaulter, ctx, 324.4, 25.1);
        recordBezierCurveTo(vaulter, ctx, 324.4, 25.1, 325.0, 21.1, 325.9, 20.3);
        recordBezierCurveTo(vaulter, ctx, 326.7, 19.5, 327.9, 13.4, 327.9, 13.4);
        recordBezierCurveTo(vaulter, ctx, 327.9, 13.4, 327.9, 11.2, 326.8, 10.3);
        recordBezierCurveTo(vaulter, ctx, 326.5, 10.1, 326.3, 10.0, 326.0, 9.9);
        recordBezierCurveTo(vaulter, ctx, 324.0, 9.5, 322.5, 10.7, 322.4, 11.8);
        recordBezierCurveTo(vaulter, ctx, 322.2, 12.8, 321.6, 17.3, 320.7, 18.5);
        recordBezierCurveTo(vaulter, ctx, 319.9, 19.7, 320.7, 25.3, 320.7, 25.3);
        recordLineTo(vaulter, ctx, 320.7, 25.3);
        recordLineTo(vaulter, ctx, 320.7, 25.3);
        recordBezierCurveTo(vaulter, ctx, 320.7, 25.3, 315.3, 31.0, 312.5, 34.9);
        recordBezierCurveTo(vaulter, ctx, 309.7, 38.8, 298.9, 57.0, 296.7, 62.6);
        recordBezierCurveTo(vaulter, ctx, 294.6, 68.2, 293.2, 81.3, 293.2, 81.3);
        ctx.fill();
        ctx.stroke();

        // vaulter/Path
        ctx.beginPath();
        recordMoveTo(vaulter, ctx, 307.6, 86.6);
        recordBezierCurveTo(vaulter, ctx, 307.6, 86.6, 314.5, 73.3, 315.6, 68.8);
        recordBezierCurveTo(vaulter, ctx, 316.6, 64.4, 317.6, 55.1, 317.6, 55.1);
        recordBezierCurveTo(vaulter, ctx, 317.6, 55.1, 321.3, 48.8, 323.0, 42.5);
        recordBezierCurveTo(vaulter, ctx, 324.8, 36.2, 325.3, 22.1, 325.3, 22.1);
        recordBezierCurveTo(vaulter, ctx, 325.3, 22.1, 328.0, 21.1, 328.1, 19.8);
        recordBezierCurveTo(vaulter, ctx, 328.3, 18.5, 328.5, 16.3, 330.9, 13.2);
        recordBezierCurveTo(vaulter, ctx, 333.3, 10.2, 332.3, 8.2, 331.7, 7.9);
        recordBezierCurveTo(vaulter, ctx, 330.7, 7.4, 328.0, 8.7, 326.8, 10.3);
        recordBezierCurveTo(vaulter, ctx, 326.7, 10.4, 326.6, 10.5, 326.5, 10.6);
        recordBezierCurveTo(vaulter, ctx, 325.4, 12.3, 323.4, 14.8, 323.0, 17.0);
        recordBezierCurveTo(vaulter, ctx, 322.7, 19.3, 322.0, 21.8, 322.0, 21.8);
        recordLineTo(vaulter, ctx, 320.7, 25.3);
        recordLineTo(vaulter, ctx, 320.7, 25.3);
        recordLineTo(vaulter, ctx, 320.7, 25.3);
        recordLineTo(vaulter, ctx, 315.6, 39.4);
        recordBezierCurveTo(vaulter, ctx, 315.6, 39.4, 313.8, 42.5, 314.0, 43.2);
        recordBezierCurveTo(vaulter, ctx, 314.1, 43.9, 304.5, 60.8, 304.5, 60.8);
        ctx.fill();
        ctx.stroke();

        // vaulter/Path
        ctx.beginPath();
        recordMoveTo(vaulter, ctx, 288.3, 93.2);
        recordBezierCurveTo(vaulter, ctx, 288.9, 91.9, 289.6, 90.1, 289.6, 90.1);
        recordBezierCurveTo(vaulter, ctx, 289.6, 90.1, 290.1, 89.0, 290.2, 88.6);
        recordBezierCurveTo(vaulter, ctx, 290.3, 88.3, 290.5, 88.0, 290.6, 87.7);
        recordBezierCurveTo(vaulter, ctx, 290.7, 87.4, 290.7, 87.0, 290.9, 85.5);
        recordBezierCurveTo(vaulter, ctx, 291.1, 83.8, 290.5, 83.2, 290.0, 82.9);
        recordBezierCurveTo(vaulter, ctx, 289.9, 82.8, 289.9, 82.8, 289.9, 82.8);
        recordBezierCurveTo(vaulter, ctx, 289.2, 82.5, 288.2, 83.2, 287.4, 84.1);
        recordBezierCurveTo(vaulter, ctx, 286.8, 84.7, 286.2, 85.5, 286.0, 85.7);
        recordBezierCurveTo(vaulter, ctx, 286.0, 85.8, 285.9, 85.9, 285.9, 85.9);
        recordBezierCurveTo(vaulter, ctx, 285.9, 85.9, 285.8, 86.1, 285.5, 86.6);
        recordBezierCurveTo(vaulter, ctx, 284.9, 87.9, 283.7, 90.5, 283.2, 92.8);
        recordBezierCurveTo(vaulter, ctx, 282.7, 95.2, 284.1, 98.4, 284.1, 98.4);
        recordBezierCurveTo(vaulter, ctx, 284.1, 98.4, 284.5, 98.8, 285.0, 98.9);
        ctx.fill();
        ctx.stroke();
        ctx.restore();
      }
    },

    function (ctx) {
      if (vaulter.visible) {

        // vaulter/Group
        ctx.save();

        // vaulter/Group/Path
        ctx.save();
        ctx.beginPath();
        recordMoveTo(vaulter, ctx, 300.7, 98.8);
        recordBezierCurveTo(vaulter, ctx, 300.7, 98.8, 300.5, 99.9, 300.3, 101.7);
        recordBezierCurveTo(vaulter, ctx, 299.9, 105.4, 299.4, 112.2, 300.1, 119.4);
        recordBezierCurveTo(vaulter, ctx, 298.4, 120.1, 293.6, 125.7, 290.5, 127.8);
        recordBezierCurveTo(vaulter, ctx, 289.9, 127.8, 289.5, 127.4, 289.1, 126.9);
        recordBezierCurveTo(vaulter, ctx, 288.8, 126.6, 288.5, 126.2, 288.3, 126.1);
        recordBezierCurveTo(vaulter, ctx, 288.0, 126.0, 287.6, 126.2, 287.2, 126.5);
        recordBezierCurveTo(vaulter, ctx, 286.6, 126.8, 286.1, 127.2, 285.9, 127.4);
        recordBezierCurveTo(vaulter, ctx, 285.5, 127.7, 285.1, 130.0, 285.2, 131.0);
        recordBezierCurveTo(vaulter, ctx, 285.2, 131.8, 286.6, 132.7, 287.4, 133.2);
        recordBezierCurveTo(vaulter, ctx, 287.7, 133.3, 288.0, 133.5, 288.0, 133.5);
        recordBezierCurveTo(vaulter, ctx, 288.2, 133.7, 288.8, 133.4, 289.4, 133.1);
        recordBezierCurveTo(vaulter, ctx, 289.8, 132.9, 290.3, 132.6, 290.4, 132.4);
        recordBezierCurveTo(vaulter, ctx, 290.7, 132.0, 290.9, 131.4, 290.9, 131.4);
        recordBezierCurveTo(vaulter, ctx, 292.6, 129.7, 303.6, 123.0, 304.1, 122.0);
        recordBezierCurveTo(vaulter, ctx, 304.6, 121.0, 306.1, 103.8, 306.5, 99.1);
        recordBezierCurveTo(vaulter, ctx, 306.6, 98.3, 306.6, 97.9, 306.6, 97.9);
        recordLineTo(vaulter, ctx, 300.7, 98.8);
        ctx.closePath();
        ctx.fillStyle = "rgb(17, 92, 137)";
        ctx.fill();
        ctx.lineWidth = 0.5;
        ctx.strokeStyle = "rgb(141, 204, 255)";
        ctx.lineJoin = "miter";
        ctx.miterLimit = 4.0;
        ctx.stroke();

        // vaulter/Group/Path
        ctx.beginPath();
        recordMoveTo(vaulter, ctx, 313.5, 80.3);
        recordBezierCurveTo(vaulter, ctx, 313.2, 79.0, 312.5, 77.7, 311.2, 76.8);
        recordBezierCurveTo(vaulter, ctx, 309.3, 75.3, 305.1, 74.3, 302.5, 74.5);
        recordBezierCurveTo(vaulter, ctx, 301.5, 74.5, 300.7, 74.8, 300.4, 75.2);
        recordBezierCurveTo(vaulter, ctx, 300.3, 75.3, 300.3, 75.4, 300.2, 75.6);
        recordBezierCurveTo(vaulter, ctx, 300.2, 75.6, 300.1, 75.6, 300.1, 75.6);
        recordBezierCurveTo(vaulter, ctx, 299.7, 76.4, 299.1, 77.7, 298.3, 79.4);
        recordBezierCurveTo(vaulter, ctx, 297.6, 80.8, 296.7, 82.5, 295.9, 84.1);
        recordBezierCurveTo(vaulter, ctx, 295.2, 85.5, 294.5, 86.9, 293.8, 88.1);
        recordBezierCurveTo(vaulter, ctx, 293.3, 88.9, 292.5, 90.1, 292.1, 90.7);
        recordBezierCurveTo(vaulter, ctx, 291.2, 91.9, 290.6, 92.6, 290.3, 93.1);
        recordBezierCurveTo(vaulter, ctx, 290.0, 93.4, 289.9, 93.6, 290.0, 93.9);
        recordBezierCurveTo(vaulter, ctx, 290.1, 94.5, 290.4, 95.4, 290.9, 96.4);
        recordBezierCurveTo(vaulter, ctx, 291.7, 97.9, 293.0, 99.7, 294.8, 100.7);
        recordBezierCurveTo(vaulter, ctx, 295.4, 101.0, 296.1, 101.3, 296.9, 101.4);
        recordBezierCurveTo(vaulter, ctx, 297.9, 101.7, 299.1, 101.8, 300.3, 101.7);
        recordBezierCurveTo(vaulter, ctx, 302.8, 101.6, 305.3, 100.8, 306.5, 99.2);
        recordBezierCurveTo(vaulter, ctx, 306.5, 99.2, 306.5, 99.1, 306.5, 99.1);
        recordBezierCurveTo(vaulter, ctx, 307.2, 97.9, 313.7, 86.7, 313.8, 84.5);
        recordBezierCurveTo(vaulter, ctx, 313.9, 83.3, 313.9, 81.7, 313.5, 80.3);
        ctx.closePath();
        ctx.fill();
        ctx.stroke();

        // vaulter/Group/Path
        ctx.beginPath();
        recordMoveTo(vaulter, ctx, 287.0, 76.3);
        recordBezierCurveTo(vaulter, ctx, 287.0, 76.3, 287.1, 75.3, 286.0, 75.4);
        recordBezierCurveTo(vaulter, ctx, 285.0, 75.4, 285.0, 76.3, 285.0, 76.3);
        recordBezierCurveTo(vaulter, ctx, 285.0, 76.3, 293.9, 262.9, 293.6, 289.2);
        recordBezierCurveTo(vaulter, ctx, 293.2, 315.4, 292.9, 342.2, 292.9, 342.2);
        recordLineTo(vaulter, ctx, 294.9, 342.2);
        recordBezierCurveTo(vaulter, ctx, 294.9, 342.2, 295.5, 313.7, 295.6, 289.2);
        recordBezierCurveTo(vaulter, ctx, 295.7, 264.7, 287.0, 76.3, 287.0, 76.3);
        ctx.closePath();
        ctx.fill();
        ctx.stroke();

        // vaulter/Group/Path
        ctx.beginPath();
        recordMoveTo(vaulter, ctx, 292.2, 95.7);
        recordBezierCurveTo(vaulter, ctx, 292.2, 95.7, 291.7, 96.0, 290.9, 96.4);
        recordBezierCurveTo(vaulter, ctx, 290.1, 96.8, 289.0, 97.4, 287.9, 98.0);
        recordBezierCurveTo(vaulter, ctx, 287.3, 98.4, 286.7, 98.9, 286.1, 99.3);
        recordBezierCurveTo(vaulter, ctx, 285.2, 99.9, 284.5, 100.6, 284.0, 101.3);
        recordBezierCurveTo(vaulter, ctx, 282.2, 103.8, 282.9, 108.0, 285.9, 110.5);
        recordBezierCurveTo(vaulter, ctx, 286.1, 110.7, 286.3, 110.8, 286.5, 110.9);
        recordBezierCurveTo(vaulter, ctx, 287.1, 111.2, 287.8, 111.4, 288.5, 111.4);
        recordBezierCurveTo(vaulter, ctx, 291.4, 111.5, 295.0, 109.6, 296.0, 107.1);
        recordBezierCurveTo(vaulter, ctx, 297.0, 104.5, 296.9, 102.2, 296.9, 101.4);
        recordBezierCurveTo(vaulter, ctx, 296.9, 101.3, 296.8, 101.2, 296.8, 101.2);
        ctx.fill();
        ctx.stroke();

        // vaulter/Group/Group

        // vaulter/Group/Group/Path
        ctx.save();
        ctx.beginPath();
        recordMoveTo(vaulter, ctx, 294.4, 88.6);
        recordBezierCurveTo(vaulter, ctx, 295.3, 88.6, 298.0, 81.9, 298.3, 80.5);
        recordBezierCurveTo(vaulter, ctx, 298.4, 80.1, 298.3, 79.8, 298.3, 79.4);
        recordBezierCurveTo(vaulter, ctx, 298.1, 78.7, 297.8, 77.9, 297.5, 77.3);
        recordBezierCurveTo(vaulter, ctx, 297.3, 76.9, 297.1, 76.6, 297.0, 76.6);
        recordLineTo(vaulter, ctx, 296.4, 76.8);
        recordBezierCurveTo(vaulter, ctx, 295.6, 77.2, 294.2, 78.1, 293.4, 79.3);
        recordBezierCurveTo(vaulter, ctx, 292.9, 80.0, 292.4, 81.2, 291.9, 82.4);
        recordBezierCurveTo(vaulter, ctx, 291.2, 83.9, 290.6, 85.5, 290.0, 85.9);
        recordBezierCurveTo(vaulter, ctx, 289.0, 86.7, 288.7, 89.5, 288.8, 90.8);
        recordBezierCurveTo(vaulter, ctx, 288.8, 91.6, 289.4, 92.6, 289.7, 93.3);
        recordBezierCurveTo(vaulter, ctx, 290.0, 93.9, 290.1, 94.4, 290.1, 94.4);
        ctx.fill();
        ctx.stroke();

        // vaulter/Group/Group/Path
        ctx.beginPath();
        recordMoveTo(vaulter, ctx, 297.0, 76.6);
        recordLineTo(vaulter, ctx, 296.4, 76.8);
        recordLineTo(vaulter, ctx, 290.0, 78.8);
        recordBezierCurveTo(vaulter, ctx, 290.0, 78.8, 289.2, 78.1, 288.5, 77.4);
        recordBezierCurveTo(vaulter, ctx, 288.2, 77.2, 287.7, 77.2, 287.1, 77.3);
        recordBezierCurveTo(vaulter, ctx, 286.5, 77.4, 285.8, 77.7, 285.2, 78.0);
        recordBezierCurveTo(vaulter, ctx, 284.7, 78.2, 284.3, 78.5, 284.2, 78.7);
        recordBezierCurveTo(vaulter, ctx, 283.9, 79.2, 283.3, 80.5, 283.1, 81.2);
        recordBezierCurveTo(vaulter, ctx, 283.0, 82.0, 284.2, 84.0, 284.2, 84.0);
        recordBezierCurveTo(vaulter, ctx, 284.4, 84.2, 284.9, 84.4, 285.5, 84.5);
        recordBezierCurveTo(vaulter, ctx, 286.1, 84.7, 286.8, 84.8, 287.4, 84.8);
        recordBezierCurveTo(vaulter, ctx, 287.8, 84.8, 288.2, 84.8, 288.5, 84.6);
        recordBezierCurveTo(vaulter, ctx, 289.4, 84.1, 290.0, 82.8, 290.0, 82.8);
        recordLineTo(vaulter, ctx, 291.9, 82.4);
        recordLineTo(vaulter, ctx, 297.0, 81.2);
        ctx.fill();
        ctx.stroke();

        // vaulter/Group/Path
        ctx.restore();
        ctx.beginPath();
        recordMoveTo(vaulter, ctx, 300.1, 75.6);
        recordBezierCurveTo(vaulter, ctx, 300.1, 75.6, 303.0, 68.6, 307.8, 67.8);
        recordBezierCurveTo(vaulter, ctx, 312.6, 67.1, 315.4, 69.6, 316.4, 72.6);
        recordBezierCurveTo(vaulter, ctx, 317.4, 75.6, 313.2, 80.7, 313.2, 80.7);
        recordBezierCurveTo(vaulter, ctx, 313.2, 80.7, 310.3, 82.9, 305.4, 80.7);
        recordBezierCurveTo(vaulter, ctx, 300.5, 78.5, 300.1, 75.6, 300.1, 75.6);
        ctx.closePath();
        ctx.fill();

        // vaulter/Group/Path
        ctx.beginPath();
        recordMoveTo(vaulter, ctx, 313.5, 80.3);
        recordBezierCurveTo(vaulter, ctx, 314.0, 80.1, 314.3, 80.0, 314.3, 80.0);
        recordBezierCurveTo(vaulter, ctx, 318.1, 78.9, 323.2, 65.2, 324.1, 63.3);
        recordBezierCurveTo(vaulter, ctx, 324.7, 61.8, 324.9, 59.9, 324.7, 58.3);
        recordBezierCurveTo(vaulter, ctx, 324.7, 58.3, 328.3, 47.9, 329.6, 46.2);
        recordBezierCurveTo(vaulter, ctx, 330.9, 44.5, 334.3, 34.2, 334.3, 28.3);
        recordLineTo(vaulter, ctx, 334.7, 25.3);
        recordLineTo(vaulter, ctx, 335.3, 20.7);
        recordBezierCurveTo(vaulter, ctx, 335.3, 20.7, 331.6, 22.8, 331.0, 25.1);
        recordBezierCurveTo(vaulter, ctx, 330.5, 27.0, 322.9, 45.8, 320.0, 53.1);
        recordBezierCurveTo(vaulter, ctx, 319.3, 54.8, 318.8, 55.9, 318.8, 55.9);
        recordBezierCurveTo(vaulter, ctx, 317.5, 60.4, 316.0, 65.8, 312.9, 69.5);
        ctx.fill();
        ctx.stroke();

        // vaulter/Group/Path
        ctx.beginPath();
        recordMoveTo(vaulter, ctx, 313.0, 69.5);
        recordBezierCurveTo(vaulter, ctx, 316.9, 64.8, 317.2, 58.3, 320.0, 53.1);
        recordLineTo(vaulter, ctx, 332.0, 29.2);
        recordBezierCurveTo(vaulter, ctx, 333.1, 27.0, 334.0, 26.3, 334.7, 25.4);
        recordBezierCurveTo(vaulter, ctx, 334.7, 25.4, 334.8, 25.4, 334.8, 25.3);
        recordBezierCurveTo(vaulter, ctx, 335.7, 24.3, 340.3, 19.6, 341.1, 15.7);
        recordBezierCurveTo(vaulter, ctx, 341.3, 14.3, 341.3, 12.9, 340.8, 12.6);
        recordBezierCurveTo(vaulter, ctx, 340.2, 12.2, 338.3, 13.8, 338.3, 13.8);
        recordBezierCurveTo(vaulter, ctx, 338.3, 13.8, 332.2, 21.9, 330.5, 23.0);
        recordBezierCurveTo(vaulter, ctx, 328.8, 24.1, 328.9, 24.1, 328.4, 24.8);
        recordBezierCurveTo(vaulter, ctx, 327.8, 25.5, 328.5, 27.5, 328.5, 27.5);
        recordBezierCurveTo(vaulter, ctx, 321.1, 35.1, 312.1, 51.2, 312.1, 51.2);
        recordBezierCurveTo(vaulter, ctx, 311.5, 51.3, 311.1, 51.3, 311.1, 51.3);
        recordBezierCurveTo(vaulter, ctx, 301.1, 64.9, 300.1, 75.6, 300.1, 75.6);
        ctx.fill();
        ctx.stroke();
        ctx.restore();
        ctx.restore();
      }
    },

    function (ctx) {
      if (vaulter.visible) {

        // vaulter/Path
        ctx.save();
        ctx.beginPath();
        recordMoveTo(vaulter, ctx, 307.4, 98.0);
        recordLineTo(vaulter, ctx, 302.2, 98.8);
        recordBezierCurveTo(vaulter, ctx, 302.2, 98.8, 301.7, 99.9, 301.1, 101.9);
        recordBezierCurveTo(vaulter, ctx, 300.1, 105.1, 299.0, 110.7, 299.7, 117.3);
        recordBezierCurveTo(vaulter, ctx, 298.0, 118.0, 293.5, 126.0, 290.3, 128.0);
        recordBezierCurveTo(vaulter, ctx, 289.9, 128.0, 289.6, 127.9, 289.4, 127.6);
        recordBezierCurveTo(vaulter, ctx, 288.9, 127.1, 288.5, 126.5, 288.1, 126.4);
        recordBezierCurveTo(vaulter, ctx, 287.9, 126.3, 287.7, 126.4, 287.4, 126.5);
        recordBezierCurveTo(vaulter, ctx, 286.8, 126.8, 286.0, 127.4, 285.8, 127.7);
        recordBezierCurveTo(vaulter, ctx, 285.4, 128.0, 285.0, 130.2, 285.0, 131.3);
        recordBezierCurveTo(vaulter, ctx, 285.1, 132.2, 286.9, 133.2, 287.7, 133.6);
        recordBezierCurveTo(vaulter, ctx, 287.8, 133.7, 287.9, 133.8, 287.9, 133.8);
        recordBezierCurveTo(vaulter, ctx, 288.1, 134.0, 289.0, 133.6, 289.6, 133.2);
        recordBezierCurveTo(vaulter, ctx, 289.9, 133.0, 290.2, 132.8, 290.3, 132.7);
        recordBezierCurveTo(vaulter, ctx, 290.6, 132.3, 290.8, 131.7, 290.8, 131.7);
        recordBezierCurveTo(vaulter, ctx, 292.5, 129.9, 303.2, 121.0, 303.7, 119.9);
        recordBezierCurveTo(vaulter, ctx, 304.2, 118.8, 308.2, 97.9, 308.2, 97.9);
        recordLineTo(vaulter, ctx, 307.4, 98.0);
        ctx.closePath();
        ctx.fillStyle = "rgb(17, 92, 137)";
        ctx.fill();
        ctx.lineWidth = 0.5;
        ctx.strokeStyle = "rgb(141, 204, 255)";
        ctx.lineJoin = "miter";
        ctx.miterLimit = 4.0;
        ctx.stroke();

        // vaulter/Path
        ctx.beginPath();
        recordMoveTo(vaulter, ctx, 316.6, 76.7);
        recordBezierCurveTo(vaulter, ctx, 315.7, 75.5, 314.6, 74.4, 313.5, 73.5);
        recordBezierCurveTo(vaulter, ctx, 311.3, 71.9, 306.4, 70.9, 303.9, 71.3);
        recordBezierCurveTo(vaulter, ctx, 303.3, 71.4, 302.9, 71.6, 302.6, 72.0);
        recordBezierCurveTo(vaulter, ctx, 302.3, 72.4, 300.2, 76.2, 298.2, 79.9);
        recordBezierCurveTo(vaulter, ctx, 297.3, 81.5, 296.4, 83.1, 295.8, 84.4);
        recordBezierCurveTo(vaulter, ctx, 295.1, 85.8, 294.3, 87.1, 293.6, 88.3);
        recordBezierCurveTo(vaulter, ctx, 293.2, 89.1, 292.4, 90.3, 292.0, 90.9);
        recordBezierCurveTo(vaulter, ctx, 291.1, 92.2, 290.5, 92.8, 290.2, 93.3);
        recordBezierCurveTo(vaulter, ctx, 289.9, 93.7, 289.8, 93.9, 289.8, 94.2);
        recordBezierCurveTo(vaulter, ctx, 290.0, 94.7, 290.2, 95.4, 290.5, 96.1);
        recordBezierCurveTo(vaulter, ctx, 291.3, 97.8, 292.6, 99.8, 294.7, 100.9);
        recordBezierCurveTo(vaulter, ctx, 295.2, 101.2, 295.7, 101.4, 296.3, 101.6);
        recordBezierCurveTo(vaulter, ctx, 297.7, 101.9, 299.5, 102.1, 301.1, 101.9);
        recordBezierCurveTo(vaulter, ctx, 303.3, 101.6, 305.3, 100.9, 306.3, 99.4);
        recordBezierCurveTo(vaulter, ctx, 306.3, 99.4, 306.7, 98.9, 307.4, 98.0);
        recordBezierCurveTo(vaulter, ctx, 310.2, 94.0, 318.1, 82.8, 318.2, 81.0);
        recordBezierCurveTo(vaulter, ctx, 318.3, 79.7, 317.6, 78.1, 316.6, 76.7);
        ctx.closePath();
        ctx.fill();
        ctx.stroke();

        // vaulter/Path
        ctx.beginPath();
        recordMoveTo(vaulter, ctx, 287.1, 76.3);
        recordBezierCurveTo(vaulter, ctx, 287.1, 76.3, 287.1, 75.3, 286.1, 75.4);
        recordBezierCurveTo(vaulter, ctx, 285.1, 75.4, 285.1, 76.3, 285.1, 76.3);
        recordLineTo(vaulter, ctx, 293.0, 342.2);
        recordLineTo(vaulter, ctx, 295.0, 342.2);
        recordLineTo(vaulter, ctx, 287.1, 76.3);
        ctx.closePath();
        ctx.fill();
        ctx.stroke();

        // vaulter/Path
        ctx.beginPath();
        recordMoveTo(vaulter, ctx, 291.6, 95.6);
        recordBezierCurveTo(vaulter, ctx, 291.6, 95.6, 291.2, 95.8, 290.5, 96.1);
        recordBezierCurveTo(vaulter, ctx, 289.9, 96.4, 289.1, 96.9, 288.1, 97.4);
        recordBezierCurveTo(vaulter, ctx, 287.5, 97.8, 286.9, 98.2, 286.2, 98.6);
        recordBezierCurveTo(vaulter, ctx, 285.1, 99.4, 284.0, 100.3, 283.4, 101.1);
        recordBezierCurveTo(vaulter, ctx, 281.6, 103.6, 282.3, 107.8, 285.4, 110.4);
        recordBezierCurveTo(vaulter, ctx, 285.8, 110.7, 286.2, 110.9, 286.7, 111.1);
        recordBezierCurveTo(vaulter, ctx, 287.3, 111.2, 288.0, 111.3, 288.7, 111.2);
        recordBezierCurveTo(vaulter, ctx, 291.4, 111.0, 294.5, 109.2, 295.4, 107.0);
        recordBezierCurveTo(vaulter, ctx, 296.3, 104.6, 296.4, 102.5, 296.3, 101.6);
        recordBezierCurveTo(vaulter, ctx, 296.3, 101.2, 296.3, 101.0, 296.3, 101.0);
        ctx.fill();
        ctx.stroke();

        // vaulter/Path
        ctx.beginPath();
        recordMoveTo(vaulter, ctx, 294.2, 88.9);
        recordBezierCurveTo(vaulter, ctx, 295.2, 88.8, 297.9, 82.1, 298.2, 80.7);
        recordBezierCurveTo(vaulter, ctx, 298.2, 80.5, 298.2, 80.2, 298.2, 79.9);
        recordBezierCurveTo(vaulter, ctx, 298.1, 79.1, 297.7, 78.2, 297.4, 77.6);
        recordBezierCurveTo(vaulter, ctx, 297.2, 77.2, 297.0, 76.9, 296.9, 76.8);
        recordLineTo(vaulter, ctx, 296.3, 77.0);
        recordBezierCurveTo(vaulter, ctx, 295.5, 77.4, 294.1, 78.3, 293.3, 79.6);
        recordBezierCurveTo(vaulter, ctx, 292.8, 80.3, 292.3, 81.4, 291.8, 82.6);
        recordBezierCurveTo(vaulter, ctx, 291.1, 84.2, 290.5, 85.7, 289.9, 86.2);
        recordBezierCurveTo(vaulter, ctx, 288.8, 86.9, 288.6, 90.2, 288.6, 91.5);
        recordBezierCurveTo(vaulter, ctx, 288.6, 92.3, 289.5, 92.9, 290.2, 93.3);
        recordBezierCurveTo(vaulter, ctx, 290.6, 93.5, 290.9, 93.7, 290.9, 93.7);
        ctx.fill();
        ctx.stroke();

        // vaulter/Path
        ctx.beginPath();
        recordMoveTo(vaulter, ctx, 296.9, 76.8);
        recordLineTo(vaulter, ctx, 296.3, 77.0);
        recordLineTo(vaulter, ctx, 289.8, 79.0);
        recordBezierCurveTo(vaulter, ctx, 289.8, 79.0, 289.1, 78.4, 288.3, 77.7);
        recordBezierCurveTo(vaulter, ctx, 288.1, 77.5, 287.8, 77.4, 287.3, 77.5);
        recordBezierCurveTo(vaulter, ctx, 286.7, 77.6, 286.0, 77.8, 285.4, 78.1);
        recordBezierCurveTo(vaulter, ctx, 284.7, 78.4, 284.2, 78.7, 284.0, 78.9);
        recordBezierCurveTo(vaulter, ctx, 283.8, 79.4, 283.1, 80.7, 283.0, 81.5);
        recordBezierCurveTo(vaulter, ctx, 282.9, 82.3, 284.0, 84.2, 284.0, 84.2);
        recordBezierCurveTo(vaulter, ctx, 284.4, 84.5, 285.0, 84.7, 285.7, 84.9);
        recordBezierCurveTo(vaulter, ctx, 286.4, 85.0, 287.1, 85.1, 287.6, 85.0);
        recordBezierCurveTo(vaulter, ctx, 287.9, 85.0, 288.2, 85.0, 288.3, 84.9);
        recordBezierCurveTo(vaulter, ctx, 289.2, 84.4, 289.8, 83.1, 289.8, 83.1);
        recordLineTo(vaulter, ctx, 291.8, 82.6);
        recordLineTo(vaulter, ctx, 296.3, 81.6);
        ctx.fill();
        ctx.stroke();

        // vaulter/Path
        ctx.beginPath();
        recordMoveTo(vaulter, ctx, 316.6, 76.7);
        recordBezierCurveTo(vaulter, ctx, 316.7, 76.6, 316.8, 76.6, 316.8, 76.6);
        recordBezierCurveTo(vaulter, ctx, 320.8, 75.9, 327.3, 62.9, 328.4, 61.1);
        recordBezierCurveTo(vaulter, ctx, 329.2, 59.7, 329.6, 57.8, 329.6, 56.2);
        recordBezierCurveTo(vaulter, ctx, 329.6, 56.2, 334.3, 46.3, 335.8, 44.7);
        recordBezierCurveTo(vaulter, ctx, 337.3, 43.2, 341.8, 33.3, 342.5, 27.5);
        recordLineTo(vaulter, ctx, 343.2, 24.5);
        recordLineTo(vaulter, ctx, 344.3, 20.0);
        recordBezierCurveTo(vaulter, ctx, 344.3, 20.0, 340.4, 21.7, 339.5, 23.9);
        recordBezierCurveTo(vaulter, ctx, 338.8, 25.7, 329.2, 43.6, 325.5, 50.5);
        recordBezierCurveTo(vaulter, ctx, 324.6, 52.1, 324.0, 53.1, 324.0, 53.1);
        recordBezierCurveTo(vaulter, ctx, 323.6, 54.1, 322.7, 56.2, 321.5, 58.4);
        recordBezierCurveTo(vaulter, ctx, 320.5, 61.0, 318.6, 64.0, 316.6, 66.0);
        ctx.fill();
        ctx.stroke();

        // vaulter/Path
        ctx.beginPath();
        recordMoveTo(vaulter, ctx, 316.6, 66.0);
        recordBezierCurveTo(vaulter, ctx, 318.6, 64.0, 320.5, 61.0, 321.5, 58.4);
        recordBezierCurveTo(vaulter, ctx, 322.7, 56.2, 323.6, 54.1, 324.0, 53.1);
        recordBezierCurveTo(vaulter, ctx, 324.4, 52.2, 324.9, 51.3, 325.5, 50.5);
        recordLineTo(vaulter, ctx, 340.0, 28.1);
        recordBezierCurveTo(vaulter, ctx, 341.3, 26.0, 342.3, 25.4, 343.1, 24.6);
        recordBezierCurveTo(vaulter, ctx, 343.1, 24.6, 343.2, 24.6, 343.2, 24.5);
        recordBezierCurveTo(vaulter, ctx, 344.3, 23.6, 349.3, 19.5, 350.5, 15.7);
        recordBezierCurveTo(vaulter, ctx, 350.9, 14.3, 351.1, 13.0, 350.6, 12.6);
        recordBezierCurveTo(vaulter, ctx, 350.0, 12.1, 351.1, 13.0, 350.6, 12.6);
        recordBezierCurveTo(vaulter, ctx, 350.0, 12.1, 351.1, 13.0, 350.6, 12.6);
        recordBezierCurveTo(vaulter, ctx, 350.0, 12.1, 348.0, 13.5, 348.0, 13.5);
        recordBezierCurveTo(vaulter, ctx, 348.0, 13.5, 341.0, 20.8, 339.2, 21.7);
        recordBezierCurveTo(vaulter, ctx, 337.4, 22.6, 337.5, 22.7, 336.9, 23.3);
        recordBezierCurveTo(vaulter, ctx, 336.3, 24.0, 336.8, 26.0, 336.8, 26.0);
        recordBezierCurveTo(vaulter, ctx, 328.5, 32.7, 317.8, 47.7, 317.8, 47.7);
        recordBezierCurveTo(vaulter, ctx, 317.2, 47.7, 316.8, 47.8, 316.8, 47.8);
        recordBezierCurveTo(vaulter, ctx, 305.3, 60.1, 302.8, 71.8, 302.8, 71.8);
        ctx.fill();
        ctx.stroke();

        // vaulter/Path
        ctx.beginPath();
        recordMoveTo(vaulter, ctx, 302.3, 72.8);
        recordLineTo(vaulter, ctx, 308.4, 60.7);
        recordBezierCurveTo(vaulter, ctx, 308.4, 60.7, 312.8, 59.9, 317.8, 63.3);
        recordBezierCurveTo(vaulter, ctx, 322.9, 66.6, 322.4, 69.7, 322.4, 69.7);
        recordLineTo(vaulter, ctx, 315.8, 77.7);
        recordBezierCurveTo(vaulter, ctx, 315.8, 77.7, 313.4, 79.2, 308.6, 77.7);
        recordBezierCurveTo(vaulter, ctx, 303.7, 76.1, 302.3, 72.8, 302.3, 72.8);
        ctx.closePath();
        ctx.fill();
        ctx.restore();
      }
    },

    function (ctx) {
      if (vaulter.visible) {

        // vaulter/Path
        ctx.save();
        ctx.beginPath();
        recordMoveTo(vaulter, ctx, 287.1, 76.3);
        recordBezierCurveTo(vaulter, ctx, 287.1, 76.3, 287.1, 75.3, 286.1, 75.4);
        recordBezierCurveTo(vaulter, ctx, 285.1, 75.4, 285.1, 76.3, 285.1, 76.3);
        recordLineTo(vaulter, ctx, 293.0, 342.2);
        recordLineTo(vaulter, ctx, 295.0, 342.2);
        recordLineTo(vaulter, ctx, 287.1, 76.3);
        ctx.closePath();
        ctx.fillStyle = "rgb(17, 92, 137)";
        ctx.fill();
        ctx.lineWidth = 0.5;
        ctx.strokeStyle = "rgb(141, 204, 255)";
        ctx.lineJoin = "miter";
        ctx.miterLimit = 4.0;
        ctx.stroke();

        // vaulter/Path
        ctx.beginPath();
        recordMoveTo(vaulter, ctx, 326.6, 53.6);
        recordBezierCurveTo(vaulter, ctx, 325.5, 52.7, 323.9, 52.1, 322.1, 51.6);
        recordLineTo(vaulter, ctx, 315.7, 50.8);
        recordBezierCurveTo(vaulter, ctx, 315.5, 50.8, 315.2, 50.9, 315.0, 50.9);
        recordBezierCurveTo(vaulter, ctx, 314.3, 51.1, 312.7, 56.8, 310.9, 60.5);
        recordBezierCurveTo(vaulter, ctx, 309.1, 64.1, 303.6, 70.2, 303.1, 70.9);
        recordBezierCurveTo(vaulter, ctx, 302.4, 71.9, 301.9, 72.8, 301.6, 73.4);
        recordBezierCurveTo(vaulter, ctx, 301.1, 74.4, 301.1, 75.0, 301.2, 75.4);
        recordBezierCurveTo(vaulter, ctx, 301.4, 76.4, 301.9, 77.8, 302.7, 79.2);
        recordBezierCurveTo(vaulter, ctx, 303.1, 79.8, 303.5, 80.4, 303.9, 81.0);
        recordBezierCurveTo(vaulter, ctx, 304.8, 82.0, 305.8, 82.9, 307.0, 83.6);
        recordBezierCurveTo(vaulter, ctx, 307.9, 84.1, 309.0, 84.4, 310.0, 84.4);
        recordLineTo(vaulter, ctx, 310.5, 84.4);
        recordBezierCurveTo(vaulter, ctx, 313.2, 84.4, 316.1, 83.2, 318.0, 81.3);
        recordBezierCurveTo(vaulter, ctx, 318.4, 81.0, 318.7, 80.6, 319.0, 80.2);
        recordBezierCurveTo(vaulter, ctx, 319.0, 80.2, 321.8, 71.9, 324.2, 67.6);
        recordBezierCurveTo(vaulter, ctx, 326.5, 63.3, 330.0, 61.1, 330.0, 60.7);
        recordBezierCurveTo(vaulter, ctx, 330.1, 58.2, 329.5, 55.7, 326.6, 53.6);
        ctx.closePath();
        ctx.fill();
        ctx.stroke();

        // vaulter/Path
        ctx.beginPath();
        recordMoveTo(vaulter, ctx, 310.3, 84.0);
        recordLineTo(vaulter, ctx, 310.5, 84.2);
        recordBezierCurveTo(vaulter, ctx, 310.5, 84.2, 310.5, 84.3, 310.5, 84.4);
        recordBezierCurveTo(vaulter, ctx, 310.4, 84.8, 310.2, 85.9, 309.8, 87.4);
        recordBezierCurveTo(vaulter, ctx, 309.8, 89.6, 310.4, 90.4, 310.4, 90.4);
        recordBezierCurveTo(vaulter, ctx, 310.4, 90.4, 308.8, 92.2, 308.5, 93.5);
        recordBezierCurveTo(vaulter, ctx, 308.2, 94.9, 307.1, 98.2, 307.2, 99.9);
        recordBezierCurveTo(vaulter, ctx, 305.2, 104.3, 305.1, 108.9, 301.6, 116.0);
        recordBezierCurveTo(vaulter, ctx, 301.6, 116.0, 301.2, 117.0, 299.8, 117.3);
        recordBezierCurveTo(vaulter, ctx, 298.4, 117.6, 294.4, 122.0, 294.4, 122.0);
        recordBezierCurveTo(vaulter, ctx, 294.4, 122.0, 293.6, 123.2, 293.7, 123.8);
        recordBezierCurveTo(vaulter, ctx, 293.9, 124.3, 295.1, 123.7, 295.4, 124.3);
        recordBezierCurveTo(vaulter, ctx, 295.6, 124.8, 296.3, 123.9, 296.8, 124.2);
        recordBezierCurveTo(vaulter, ctx, 297.3, 124.5, 297.7, 123.9, 298.1, 123.4);
        recordBezierCurveTo(vaulter, ctx, 298.4, 122.8, 300.2, 120.6, 300.2, 120.6);
        recordBezierCurveTo(vaulter, ctx, 300.2, 120.6, 301.3, 120.1, 302.1, 119.6);
        recordBezierCurveTo(vaulter, ctx, 303.0, 119.1, 303.2, 117.8, 303.8, 117.0);
        recordBezierCurveTo(vaulter, ctx, 307.5, 112.2, 312.0, 106.2, 313.6, 101.5);
        recordBezierCurveTo(vaulter, ctx, 314.5, 98.6, 315.6, 91.4, 315.6, 91.4);
        recordBezierCurveTo(vaulter, ctx, 315.6, 91.4, 318.0, 85.8, 318.2, 84.4);
        recordBezierCurveTo(vaulter, ctx, 318.3, 83.4, 318.2, 82.3, 318.0, 81.3);
        recordBezierCurveTo(vaulter, ctx, 317.6, 79.4, 316.7, 77.9, 315.6, 77.9);
        ctx.fill();
        ctx.stroke();

        // vaulter/Path
        ctx.beginPath();
        recordMoveTo(vaulter, ctx, 325.7, 52.0);
        recordBezierCurveTo(vaulter, ctx, 327.1, 51.3, 328.6, 50.4, 330.0, 49.4);
        recordBezierCurveTo(vaulter, ctx, 336.2, 45.1, 341.8, 38.6, 341.8, 38.6);
        recordLineTo(vaulter, ctx, 345.5, 36.0);
        recordBezierCurveTo(vaulter, ctx, 349.4, 33.2, 351.8, 29.6, 354.9, 26.2);
        recordBezierCurveTo(vaulter, ctx, 357.4, 23.4, 360.3, 20.8, 364.8, 18.8);
        recordBezierCurveTo(vaulter, ctx, 364.8, 18.8, 365.0, 19.3, 365.4, 19.9);
        recordBezierCurveTo(vaulter, ctx, 366.0, 21.0, 366.9, 22.6, 367.6, 23.8);
        recordBezierCurveTo(vaulter, ctx, 368.8, 25.7, 370.7, 26.8, 371.4, 25.4);
        recordBezierCurveTo(vaulter, ctx, 372.1, 24.0, 370.2, 22.4, 370.0, 21.0);
        recordBezierCurveTo(vaulter, ctx, 369.8, 20.1, 369.6, 18.8, 369.3, 17.5);
        recordBezierCurveTo(vaulter, ctx, 369.1, 16.5, 368.9, 15.5, 368.6, 14.6);
        recordBezierCurveTo(vaulter, ctx, 367.9, 12.5, 365.5, 12.5, 364.6, 12.7);
        recordBezierCurveTo(vaulter, ctx, 363.6, 13.0, 362.7, 14.8, 362.7, 14.8);
        recordBezierCurveTo(vaulter, ctx, 344.4, 22.4, 339.4, 31.3, 339.4, 31.3);
        recordBezierCurveTo(vaulter, ctx, 336.6, 31.1, 329.3, 35.3, 324.1, 38.8);
        recordBezierCurveTo(vaulter, ctx, 319.0, 42.3, 315.7, 50.8, 315.7, 50.8);
        ctx.fill();
        ctx.stroke();

        // vaulter/Path
        ctx.beginPath();
        recordMoveTo(vaulter, ctx, 301.6, 73.4);
        recordBezierCurveTo(vaulter, ctx, 301.6, 73.4, 295.0, 80.4, 295.0, 84.4);
        recordBezierCurveTo(vaulter, ctx, 295.0, 84.4, 292.0, 87.9, 292.1, 92.0);
        recordBezierCurveTo(vaulter, ctx, 292.1, 92.0, 290.1, 95.3, 288.4, 99.3);
        recordBezierCurveTo(vaulter, ctx, 287.7, 100.8, 287.1, 102.5, 286.6, 104.1);
        recordBezierCurveTo(vaulter, ctx, 286.4, 104.7, 286.2, 105.4, 286.1, 106.0);
        recordBezierCurveTo(vaulter, ctx, 286.1, 106.0, 281.1, 111.9, 282.8, 113.7);
        recordBezierCurveTo(vaulter, ctx, 282.8, 113.7, 282.9, 115.0, 283.3, 114.8);
        recordBezierCurveTo(vaulter, ctx, 283.7, 114.5, 284.6, 114.4, 284.6, 114.4);
        recordBezierCurveTo(vaulter, ctx, 284.6, 114.4, 284.8, 114.4, 285.3, 114.8);
        recordBezierCurveTo(vaulter, ctx, 285.8, 115.2, 285.8, 113.8, 285.8, 113.8);
        recordBezierCurveTo(vaulter, ctx, 285.8, 113.8, 286.5, 110.2, 286.8, 109.5);
        recordBezierCurveTo(vaulter, ctx, 286.8, 109.4, 286.8, 109.4, 286.9, 109.4);
        recordBezierCurveTo(vaulter, ctx, 287.1, 109.0, 287.5, 110.8, 287.4, 111.1);
        recordBezierCurveTo(vaulter, ctx, 287.3, 111.3, 287.2, 112.2, 287.6, 112.2);
        recordBezierCurveTo(vaulter, ctx, 287.9, 112.2, 288.4, 111.3, 288.5, 110.4);
        recordBezierCurveTo(vaulter, ctx, 288.6, 109.4, 288.9, 108.5, 288.0, 107.2);
        recordBezierCurveTo(vaulter, ctx, 288.0, 107.2, 288.3, 106.8, 288.7, 106.1);
        recordBezierCurveTo(vaulter, ctx, 290.2, 103.6, 293.9, 97.3, 295.5, 93.3);
        recordBezierCurveTo(vaulter, ctx, 295.5, 93.3, 295.6, 93.2, 295.9, 93.0);
        recordBezierCurveTo(vaulter, ctx, 296.3, 92.7, 297.0, 91.9, 297.6, 90.2);
        recordBezierCurveTo(vaulter, ctx, 298.6, 87.6, 298.7, 85.1, 298.7, 85.1);
        recordBezierCurveTo(vaulter, ctx, 298.7, 85.1, 301.2, 84.3, 303.9, 81.0);
        ctx.fill();
        ctx.stroke();

        // vaulter/Path
        ctx.beginPath();
        recordMoveTo(vaulter, ctx, 304.9, 77.8);
        recordBezierCurveTo(vaulter, ctx, 304.9, 77.8, 304.0, 78.3, 302.7, 79.2);
        recordBezierCurveTo(vaulter, ctx, 300.7, 80.6, 297.8, 82.8, 296.5, 84.7);
        recordBezierCurveTo(vaulter, ctx, 294.8, 87.0, 294.3, 90.5, 295.9, 93.0);
        recordBezierCurveTo(vaulter, ctx, 296.4, 93.9, 297.2, 94.6, 298.2, 95.2);
        recordBezierCurveTo(vaulter, ctx, 302.1, 97.3, 307.1, 94.8, 308.6, 90.9);
        recordBezierCurveTo(vaulter, ctx, 309.1, 89.6, 309.5, 88.4, 309.8, 87.4);
        recordBezierCurveTo(vaulter, ctx, 309.8, 86.6, 309.8, 85.6, 310.0, 84.4);
        recordBezierCurveTo(vaulter, ctx, 310.0, 84.4, 310.0, 84.4, 310.0, 84.4);
        recordBezierCurveTo(vaulter, ctx, 310.0, 84.4, 310.1, 84.2, 310.3, 84.0);
        ctx.fill();
        ctx.stroke();

        // vaulter/Path
        ctx.beginPath();
        recordMoveTo(vaulter, ctx, 316.2, 51.9);
        recordBezierCurveTo(vaulter, ctx, 316.2, 51.9, 316.9, 49.4, 318.5, 46.8);
        recordBezierCurveTo(vaulter, ctx, 320.0, 44.1, 322.9, 41.3, 324.5, 40.6);
        recordBezierCurveTo(vaulter, ctx, 326.2, 39.9, 332.4, 39.7, 335.0, 41.2);
        recordBezierCurveTo(vaulter, ctx, 337.5, 42.7, 340.4, 47.2, 338.6, 50.2);
        recordBezierCurveTo(vaulter, ctx, 336.9, 53.3, 328.8, 60.6, 328.1, 61.1);
        recordBezierCurveTo(vaulter, ctx, 327.3, 61.7, 323.5, 60.7, 321.0, 59.2);
        recordBezierCurveTo(vaulter, ctx, 318.6, 57.7, 316.2, 53.4, 316.2, 51.9);
        ctx.closePath();
        ctx.fill();

        // vaulter/Path
        ctx.beginPath();
        recordMoveTo(vaulter, ctx, 330.0, 59.5);
        recordBezierCurveTo(vaulter, ctx, 345.2, 52.3, 348.1, 43.5, 349.4, 42.6);
        recordBezierCurveTo(vaulter, ctx, 350.6, 41.7, 351.9, 39.4, 351.9, 39.4);
        recordBezierCurveTo(vaulter, ctx, 351.9, 39.4, 360.0, 29.6, 367.9, 25.3);
        recordBezierCurveTo(vaulter, ctx, 367.9, 25.3, 368.1, 25.9, 368.6, 26.8);
        recordBezierCurveTo(vaulter, ctx, 369.0, 27.7, 370.3, 28.4, 370.3, 28.4);
        recordBezierCurveTo(vaulter, ctx, 370.3, 28.4, 372.5, 32.3, 373.1, 33.0);
        recordBezierCurveTo(vaulter, ctx, 373.8, 33.7, 375.5, 34.5, 376.2, 33.4);
        recordBezierCurveTo(vaulter, ctx, 376.9, 32.2, 374.0, 26.0, 373.6, 25.6);
        recordBezierCurveTo(vaulter, ctx, 373.1, 25.3, 372.1, 21.5, 371.5, 19.8);
        recordBezierCurveTo(vaulter, ctx, 371.2, 18.9, 370.3, 18.0, 369.3, 17.5);
        recordBezierCurveTo(vaulter, ctx, 368.6, 17.1, 367.8, 16.9, 367.2, 17.1);
        recordBezierCurveTo(vaulter, ctx, 366.3, 17.5, 365.6, 19.2, 365.4, 19.9);
        recordBezierCurveTo(vaulter, ctx, 365.3, 20.1, 365.3, 20.3, 365.3, 20.3);
        recordBezierCurveTo(vaulter, ctx, 362.1, 22.0, 358.3, 24.2, 354.9, 26.2);
        recordBezierCurveTo(vaulter, ctx, 351.1, 28.5, 347.7, 30.8, 346.0, 32.4);
        recordBezierCurveTo(vaulter, ctx, 338.4, 34.8, 330.0, 41.8, 330.0, 41.8);
        ctx.fill();
        ctx.stroke();
        ctx.restore();
      }
    },

    function (ctx) {
      if (vaulter.visible) {

        // vaulter/Path
        ctx.save();
        ctx.beginPath();
        recordMoveTo(vaulter, ctx, 335.2, 48.8);
        recordBezierCurveTo(vaulter, ctx, 351.1, 43.9, 355.3, 35.7, 356.7, 35.0);
        recordBezierCurveTo(vaulter, ctx, 358.1, 34.2, 362.5, 30.5, 362.5, 30.5);
        recordBezierCurveTo(vaulter, ctx, 362.5, 30.5, 370.5, 25.4, 378.6, 22.3);
        recordBezierCurveTo(vaulter, ctx, 379.0, 22.1, 379.4, 22.0, 379.8, 21.8);
        recordBezierCurveTo(vaulter, ctx, 379.8, 21.8, 380.0, 23.5, 380.3, 24.5);
        recordBezierCurveTo(vaulter, ctx, 380.7, 25.5, 381.8, 26.3, 381.8, 26.3);
        recordBezierCurveTo(vaulter, ctx, 381.8, 26.3, 382.3, 27.1, 382.9, 27.9);
        recordBezierCurveTo(vaulter, ctx, 383.4, 28.6, 384.0, 29.4, 384.3, 29.8);
        recordBezierCurveTo(vaulter, ctx, 384.8, 30.6, 385.6, 31.5, 386.4, 30.5);
        recordBezierCurveTo(vaulter, ctx, 387.2, 29.4, 385.9, 24.5, 385.5, 24.1);
        recordBezierCurveTo(vaulter, ctx, 385.1, 23.7, 384.6, 19.9, 384.3, 18.1);
        recordBezierCurveTo(vaulter, ctx, 384.1, 16.7, 382.6, 15.2, 381.3, 14.8);
        recordBezierCurveTo(vaulter, ctx, 381.0, 14.8, 380.7, 14.7, 380.4, 14.8);
        recordBezierCurveTo(vaulter, ctx, 379.1, 15.0, 378.1, 17.6, 378.1, 17.6);
        recordBezierCurveTo(vaulter, ctx, 371.6, 20.8, 361.1, 23.5, 357.1, 26.8);
        recordBezierCurveTo(vaulter, ctx, 355.1, 27.1, 353.0, 27.7, 351.0, 28.4);
        recordBezierCurveTo(vaulter, ctx, 350.9, 28.5, 350.8, 28.6, 350.8, 28.6);
        recordBezierCurveTo(vaulter, ctx, 350.8, 28.5, 350.7, 28.5, 350.6, 28.5);
        recordBezierCurveTo(vaulter, ctx, 344.9, 30.6, 340.0, 33.6, 340.0, 33.6);
        ctx.fillStyle = "rgb(17, 92, 137)";
        ctx.fill();
        ctx.lineWidth = 0.5;
        ctx.strokeStyle = "rgb(141, 204, 255)";
        ctx.lineJoin = "miter";
        ctx.miterLimit = 4.0;
        ctx.stroke();

        // vaulter/Path
        ctx.beginPath();
        recordMoveTo(vaulter, ctx, 335.2, 48.8);
        recordBezierCurveTo(vaulter, ctx, 351.1, 43.9, 355.3, 35.7, 356.7, 35.0);
        recordBezierCurveTo(vaulter, ctx, 358.1, 34.2, 362.5, 30.5, 362.5, 30.5);
        recordBezierCurveTo(vaulter, ctx, 362.5, 30.5, 370.5, 25.4, 378.6, 22.3);
        recordBezierCurveTo(vaulter, ctx, 379.0, 23.3, 379.5, 24.4, 379.8, 25.3);
        recordBezierCurveTo(vaulter, ctx, 380.6, 27.1, 382.0, 28.4, 382.9, 27.9);
        recordBezierCurveTo(vaulter, ctx, 383.1, 27.8, 383.2, 27.7, 383.3, 27.5);
        recordBezierCurveTo(vaulter, ctx, 384.2, 26.2, 382.6, 24.3, 382.6, 22.9);
        recordBezierCurveTo(vaulter, ctx, 382.6, 21.5, 382.5, 18.6, 382.1, 16.4);
        recordBezierCurveTo(vaulter, ctx, 382.0, 15.7, 381.7, 15.2, 381.3, 14.8);
        recordBezierCurveTo(vaulter, ctx, 381.0, 14.8, 380.7, 14.7, 380.4, 14.8);
        recordBezierCurveTo(vaulter, ctx, 379.1, 15.0, 378.1, 17.6, 378.1, 17.6);
        recordBezierCurveTo(vaulter, ctx, 371.6, 20.8, 361.1, 23.5, 357.1, 26.8);
        recordBezierCurveTo(vaulter, ctx, 355.1, 27.1, 353.0, 27.7, 351.0, 28.4);
        recordLineTo(vaulter, ctx, 350.6, 28.5);
        recordBezierCurveTo(vaulter, ctx, 347.7, 28.1, 340.1, 31.1, 334.6, 33.7);
        recordBezierCurveTo(vaulter, ctx, 329.0, 36.4, 324.5, 44.3, 324.5, 44.3);
        ctx.fill();
        ctx.stroke();

        // vaulter/Path
        ctx.beginPath();
        recordMoveTo(vaulter, ctx, 315.5, 71.2);
        recordBezierCurveTo(vaulter, ctx, 315.4, 70.2, 314.7, 69.4, 314.2, 69.1);
        recordBezierCurveTo(vaulter, ctx, 313.1, 68.5, 311.2, 68.5, 311.2, 68.5);
        recordBezierCurveTo(vaulter, ctx, 311.2, 68.5, 310.7, 69.0, 309.9, 69.8);
        recordBezierCurveTo(vaulter, ctx, 309.0, 70.8, 307.9, 72.1, 306.8, 73.6);
        recordBezierCurveTo(vaulter, ctx, 305.4, 75.5, 304.2, 77.6, 304.1, 79.2);
        recordBezierCurveTo(vaulter, ctx, 304.1, 79.2, 301.7, 81.8, 301.1, 85.2);
        recordBezierCurveTo(vaulter, ctx, 301.0, 85.7, 300.9, 86.1, 300.9, 86.6);
        recordBezierCurveTo(vaulter, ctx, 300.9, 86.6, 296.0, 94.2, 294.3, 100.4);
        recordBezierCurveTo(vaulter, ctx, 294.3, 100.4, 289.1, 106.0, 290.7, 108.0);
        recordBezierCurveTo(vaulter, ctx, 290.7, 108.0, 290.8, 109.2, 291.2, 109.0);
        recordBezierCurveTo(vaulter, ctx, 291.6, 108.8, 292.5, 108.7, 292.5, 108.7);
        recordBezierCurveTo(vaulter, ctx, 292.5, 108.7, 292.7, 108.7, 293.1, 109.1);
        recordBezierCurveTo(vaulter, ctx, 293.6, 109.5, 293.6, 108.2, 293.6, 108.2);
        recordBezierCurveTo(vaulter, ctx, 293.6, 108.2, 294.7, 104.1, 294.9, 103.8);
        recordBezierCurveTo(vaulter, ctx, 295.2, 103.4, 295.5, 105.3, 295.4, 105.5);
        recordBezierCurveTo(vaulter, ctx, 295.3, 105.7, 295.1, 106.6, 295.5, 106.6);
        recordBezierCurveTo(vaulter, ctx, 295.9, 106.6, 296.4, 105.8, 296.5, 104.9);
        recordBezierCurveTo(vaulter, ctx, 296.7, 103.9, 297.0, 103.0, 296.2, 101.6);
        recordBezierCurveTo(vaulter, ctx, 296.2, 101.6, 301.8, 93.5, 304.1, 88.5);
        recordBezierCurveTo(vaulter, ctx, 304.1, 88.3, 304.2, 88.2, 304.3, 88.1);
        recordBezierCurveTo(vaulter, ctx, 304.3, 88.1, 305.5, 87.8, 306.6, 85.1);
        recordBezierCurveTo(vaulter, ctx, 307.6, 82.5, 307.9, 80.0, 307.9, 80.0);
        recordBezierCurveTo(vaulter, ctx, 307.9, 80.0, 309.2, 79.7, 310.9, 78.3);
        recordBezierCurveTo(vaulter, ctx, 311.5, 77.9, 312.1, 77.3, 312.8, 76.6);
        recordBezierCurveTo(vaulter, ctx, 313.2, 76.2, 313.7, 75.6, 314.1, 75.0);
        recordBezierCurveTo(vaulter, ctx, 314.3, 74.9, 314.4, 74.7, 314.5, 74.5);
        recordBezierCurveTo(vaulter, ctx, 315.4, 73.3, 315.6, 72.1, 315.5, 71.2);
        ctx.closePath();
        ctx.fill();
        ctx.stroke();

        // vaulter/Path
        ctx.beginPath();
        recordMoveTo(vaulter, ctx, 335.0, 48.8);
        recordLineTo(vaulter, ctx, 335.2, 48.4);
        recordBezierCurveTo(vaulter, ctx, 335.1, 48.2, 335.0, 48.0, 334.9, 47.8);
        recordBezierCurveTo(vaulter, ctx, 334.7, 47.5, 334.4, 47.2, 334.0, 46.9);
        recordBezierCurveTo(vaulter, ctx, 331.6, 44.9, 327.0, 43.8, 324.6, 44.3);
        recordBezierCurveTo(vaulter, ctx, 324.0, 44.5, 323.5, 44.7, 323.3, 45.0);
        recordBezierCurveTo(vaulter, ctx, 322.9, 45.5, 319.5, 54.5, 317.3, 58.3);
        recordBezierCurveTo(vaulter, ctx, 316.0, 60.9, 311.9, 64.4, 311.4, 65.2);
        recordBezierCurveTo(vaulter, ctx, 311.0, 65.8, 309.8, 67.6, 309.9, 69.4);
        recordBezierCurveTo(vaulter, ctx, 309.9, 69.6, 309.9, 69.7, 309.9, 69.8);
        recordBezierCurveTo(vaulter, ctx, 310.0, 70.2, 310.1, 70.7, 310.2, 71.3);
        recordBezierCurveTo(vaulter, ctx, 310.5, 72.7, 311.0, 74.4, 312.0, 75.7);
        recordBezierCurveTo(vaulter, ctx, 312.2, 76.1, 312.5, 76.4, 312.8, 76.6);
        recordBezierCurveTo(vaulter, ctx, 313.5, 77.3, 314.3, 77.8, 315.3, 77.9);
        recordBezierCurveTo(vaulter, ctx, 315.6, 77.9, 315.9, 77.9, 316.1, 78.0);
        recordBezierCurveTo(vaulter, ctx, 317.2, 78.1, 318.2, 78.0, 319.0, 77.9);
        recordBezierCurveTo(vaulter, ctx, 321.8, 77.5, 323.7, 76.1, 325.5, 73.5);
        recordBezierCurveTo(vaulter, ctx, 325.5, 73.5, 333.2, 58.8, 333.4, 56.0);
        recordBezierCurveTo(vaulter, ctx, 333.5, 53.7, 335.2, 50.6, 335.2, 48.8);
        recordBezierCurveTo(vaulter, ctx, 335.1, 48.8, 335.1, 48.8, 335.0, 48.8);
        ctx.closePath();
        ctx.fill();
        ctx.stroke();

        // vaulter/Path
        ctx.beginPath();
        recordMoveTo(vaulter, ctx, 287.1, 76.3);
        recordBezierCurveTo(vaulter, ctx, 287.1, 76.3, 287.1, 75.3, 286.1, 75.4);
        recordBezierCurveTo(vaulter, ctx, 285.1, 75.4, 285.1, 76.3, 285.1, 76.3);
        recordLineTo(vaulter, ctx, 293.0, 342.2);
        recordLineTo(vaulter, ctx, 295.0, 342.2);
        recordLineTo(vaulter, ctx, 287.1, 76.3);
        ctx.closePath();
        ctx.fill();
        ctx.stroke();

        // vaulter/Path
        ctx.beginPath();
        recordMoveTo(vaulter, ctx, 310.7, 71.0);
        recordBezierCurveTo(vaulter, ctx, 310.7, 71.0, 310.5, 71.1, 310.2, 71.3);
        recordBezierCurveTo(vaulter, ctx, 309.5, 71.7, 308.2, 72.6, 306.8, 73.6);
        recordBezierCurveTo(vaulter, ctx, 305.1, 74.9, 303.2, 76.5, 302.2, 77.9);
        recordBezierCurveTo(vaulter, ctx, 300.8, 79.9, 300.2, 82.8, 301.1, 85.2);
        recordBezierCurveTo(vaulter, ctx, 301.6, 86.5, 302.5, 87.6, 303.9, 88.4);
        recordBezierCurveTo(vaulter, ctx, 304.0, 88.4, 304.1, 88.4, 304.1, 88.5);
        recordBezierCurveTo(vaulter, ctx, 305.7, 89.2, 307.3, 89.3, 308.9, 88.9);
        recordBezierCurveTo(vaulter, ctx, 311.3, 88.2, 313.4, 86.4, 314.3, 84.1);
        recordBezierCurveTo(vaulter, ctx, 315.5, 81.2, 316.0, 78.9, 316.2, 78.0);
        recordBezierCurveTo(vaulter, ctx, 316.2, 77.6, 316.3, 77.5, 316.3, 77.5);
        ctx.fill();
        ctx.stroke();

        // vaulter/Path
        ctx.beginPath();
        recordMoveTo(vaulter, ctx, 312.5, 73.6);
        recordBezierCurveTo(vaulter, ctx, 312.0, 74.2, 311.0, 77.2, 311.0, 77.2);
        recordBezierCurveTo(vaulter, ctx, 311.0, 77.6, 310.9, 78.0, 310.9, 78.3);
        recordBezierCurveTo(vaulter, ctx, 310.5, 82.0, 311.4, 83.2, 311.4, 83.2);
        recordBezierCurveTo(vaulter, ctx, 311.4, 83.2, 309.9, 85.0, 309.6, 86.3);
        recordBezierCurveTo(vaulter, ctx, 309.4, 86.9, 309.1, 87.9, 308.9, 88.9);
        recordBezierCurveTo(vaulter, ctx, 308.5, 90.2, 308.2, 91.7, 308.2, 92.7);
        recordBezierCurveTo(vaulter, ctx, 306.2, 97.1, 306.1, 101.7, 302.6, 108.8);
        recordBezierCurveTo(vaulter, ctx, 302.6, 108.8, 302.3, 109.7, 300.9, 110.1);
        recordBezierCurveTo(vaulter, ctx, 299.5, 110.4, 295.5, 114.8, 295.5, 114.8);
        recordBezierCurveTo(vaulter, ctx, 295.5, 114.8, 294.6, 116.0, 294.8, 116.6);
        recordBezierCurveTo(vaulter, ctx, 294.9, 117.1, 296.2, 116.5, 296.4, 117.0);
        recordBezierCurveTo(vaulter, ctx, 296.6, 117.6, 297.3, 116.6, 297.8, 117.0);
        recordBezierCurveTo(vaulter, ctx, 298.3, 117.3, 298.8, 116.7, 299.1, 116.2);
        recordBezierCurveTo(vaulter, ctx, 299.4, 115.6, 301.2, 113.4, 301.2, 113.4);
        recordBezierCurveTo(vaulter, ctx, 301.2, 113.4, 302.3, 112.9, 303.2, 112.4);
        recordBezierCurveTo(vaulter, ctx, 304.0, 111.9, 304.3, 110.6, 304.9, 109.8);
        recordBezierCurveTo(vaulter, ctx, 308.6, 104.9, 313.0, 99.0, 314.6, 94.3);
        recordBezierCurveTo(vaulter, ctx, 315.6, 91.4, 316.6, 84.2, 316.6, 84.2);
        recordBezierCurveTo(vaulter, ctx, 316.6, 84.2, 318.5, 79.9, 319.0, 77.9);
        recordBezierCurveTo(vaulter, ctx, 319.1, 77.6, 319.2, 77.4, 319.2, 77.2);
        recordBezierCurveTo(vaulter, ctx, 319.3, 76.3, 319.3, 75.4, 319.1, 74.5);
        ctx.fill();
        ctx.stroke();
        ctx.restore();
      }
    },

    function (ctx) {
      if (vaulter.visible) {

        // vaulter/Path
        ctx.save();
        ctx.beginPath();
        recordMoveTo(vaulter, ctx, 318.8, 62.9);
        recordLineTo(vaulter, ctx, 314.6, 71.2);
        recordBezierCurveTo(vaulter, ctx, 314.6, 71.2, 311.2, 76.9, 309.5, 80.8);
        recordBezierCurveTo(vaulter, ctx, 309.5, 80.8, 305.2, 88.7, 303.5, 94.8);
        recordBezierCurveTo(vaulter, ctx, 303.5, 94.8, 298.3, 100.5, 299.9, 102.4);
        recordBezierCurveTo(vaulter, ctx, 299.9, 102.4, 300.0, 103.7, 300.4, 103.5);
        recordBezierCurveTo(vaulter, ctx, 300.8, 103.2, 301.7, 103.1, 301.7, 103.1);
        recordBezierCurveTo(vaulter, ctx, 301.7, 103.1, 301.9, 103.2, 302.3, 103.6);
        recordBezierCurveTo(vaulter, ctx, 302.8, 104.0, 302.9, 102.6, 302.9, 102.6);
        recordBezierCurveTo(vaulter, ctx, 302.9, 102.6, 303.9, 98.6, 304.2, 98.2);
        recordBezierCurveTo(vaulter, ctx, 304.4, 97.8, 304.7, 99.7, 304.6, 100.0);
        recordBezierCurveTo(vaulter, ctx, 304.5, 100.2, 304.3, 101.1, 304.7, 101.1);
        recordBezierCurveTo(vaulter, ctx, 305.1, 101.1, 305.6, 100.2, 305.7, 99.3);
        recordBezierCurveTo(vaulter, ctx, 305.9, 98.4, 306.2, 97.4, 305.4, 96.1);
        recordBezierCurveTo(vaulter, ctx, 305.4, 96.1, 311.8, 89.1, 313.9, 84.1);
        recordBezierCurveTo(vaulter, ctx, 313.9, 84.1, 315.8, 82.6, 316.9, 79.9);
        recordBezierCurveTo(vaulter, ctx, 318.0, 77.3, 318.5, 75.5, 318.5, 75.5);
        recordBezierCurveTo(vaulter, ctx, 318.5, 75.5, 321.3, 74.3, 324.7, 69.7);
        recordBezierCurveTo(vaulter, ctx, 326.6, 67.0, 324.4, 64.3, 323.4, 63.5);
        recordBezierCurveTo(vaulter, ctx, 321.2, 61.9, 318.8, 62.9, 318.8, 62.9);
        ctx.closePath();
        ctx.fillStyle = "rgb(17, 92, 137)";
        ctx.fill();
        ctx.lineWidth = 0.5;
        ctx.strokeStyle = "rgb(141, 204, 255)";
        ctx.lineJoin = "miter";
        ctx.miterLimit = 4.0;
        ctx.stroke();

        // vaulter/Path
        ctx.beginPath();
        recordMoveTo(vaulter, ctx, 326.3, 67.7);
        recordBezierCurveTo(vaulter, ctx, 326.3, 67.7, 325.9, 70.4, 324.3, 74.3);
        recordBezierCurveTo(vaulter, ctx, 322.8, 78.2, 317.8, 80.7, 314.0, 78.6);
        recordBezierCurveTo(vaulter, ctx, 309.8, 76.3, 310.1, 71.1, 312.2, 68.1);
        recordBezierCurveTo(vaulter, ctx, 314.4, 65.0, 320.7, 61.2, 320.7, 61.2);
        ctx.fill();
        ctx.stroke();

        // vaulter/Path
        ctx.beginPath();
        recordMoveTo(vaulter, ctx, 333.6, 66.1);
        recordBezierCurveTo(vaulter, ctx, 333.6, 66.1, 341.3, 51.4, 341.4, 48.7);
        recordBezierCurveTo(vaulter, ctx, 341.6, 45.9, 344.1, 41.9, 343.0, 40.5);
        recordBezierCurveTo(vaulter, ctx, 340.5, 37.3, 332.7, 35.8, 331.3, 37.7);
        recordBezierCurveTo(vaulter, ctx, 331.0, 38.2, 327.5, 47.1, 325.4, 51.0);
        recordBezierCurveTo(vaulter, ctx, 324.0, 53.5, 320.0, 57.1, 319.5, 57.8);
        recordBezierCurveTo(vaulter, ctx, 319.1, 58.4, 317.8, 60.3, 318.0, 62.1);
        recordBezierCurveTo(vaulter, ctx, 318.1, 64.2, 319.3, 70.0, 323.4, 70.5);
        recordBezierCurveTo(vaulter, ctx, 328.4, 71.2, 331.0, 69.7, 333.6, 66.1);
        ctx.closePath();
        ctx.fill();
        ctx.stroke();

        // vaulter/Path
        ctx.beginPath();
        recordMoveTo(vaulter, ctx, 326.3, 68.2);
        recordBezierCurveTo(vaulter, ctx, 326.1, 69.6, 322.6, 76.0, 322.6, 76.0);
        recordBezierCurveTo(vaulter, ctx, 322.6, 76.0, 321.6, 83.2, 320.6, 86.1);
        recordBezierCurveTo(vaulter, ctx, 319.0, 90.8, 314.6, 96.7, 310.9, 101.6);
        recordBezierCurveTo(vaulter, ctx, 310.3, 102.4, 310.0, 103.7, 309.2, 104.2);
        recordBezierCurveTo(vaulter, ctx, 308.3, 104.7, 307.2, 105.2, 307.2, 105.2);
        recordBezierCurveTo(vaulter, ctx, 307.2, 105.2, 305.4, 107.4, 305.1, 108.0);
        recordBezierCurveTo(vaulter, ctx, 304.8, 108.5, 304.3, 109.1, 303.8, 108.8);
        recordBezierCurveTo(vaulter, ctx, 303.3, 108.5, 302.6, 109.4, 302.4, 108.9);
        recordBezierCurveTo(vaulter, ctx, 302.2, 108.3, 300.9, 108.9, 300.8, 108.4);
        recordBezierCurveTo(vaulter, ctx, 300.6, 107.8, 301.5, 106.6, 301.5, 106.6);
        recordBezierCurveTo(vaulter, ctx, 301.5, 106.6, 305.5, 102.2, 306.9, 101.9);
        recordBezierCurveTo(vaulter, ctx, 308.3, 101.6, 308.6, 100.6, 308.6, 100.6);
        recordBezierCurveTo(vaulter, ctx, 312.1, 93.5, 312.2, 88.9, 314.2, 84.5);
        recordBezierCurveTo(vaulter, ctx, 314.2, 82.7, 315.3, 79.5, 315.6, 78.1);
        recordBezierCurveTo(vaulter, ctx, 315.9, 76.8, 316.3, 74.9, 316.3, 74.9);
        recordBezierCurveTo(vaulter, ctx, 316.3, 74.9, 315.2, 74.0, 316.1, 68.2);
        recordBezierCurveTo(vaulter, ctx, 316.7, 64.1, 318.9, 62.9, 320.7, 62.6);
        ctx.fill();
        ctx.stroke();

        // vaulter/Path
        ctx.beginPath();
        recordMoveTo(vaulter, ctx, 340.3, 30.8);
        recordBezierCurveTo(vaulter, ctx, 340.3, 30.8, 353.2, 27.7, 366.5, 28.0);
        recordBezierCurveTo(vaulter, ctx, 373.3, 24.4, 386.5, 22.3, 390.5, 20.4);
        recordBezierCurveTo(vaulter, ctx, 390.5, 20.4, 392.1, 18.2, 393.5, 18.2);
        recordBezierCurveTo(vaulter, ctx, 394.8, 18.3, 396.5, 20.6, 396.4, 22.4);
        recordBezierCurveTo(vaulter, ctx, 396.3, 24.2, 395.8, 28.0, 396.1, 28.5);
        recordBezierCurveTo(vaulter, ctx, 396.4, 29.0, 396.7, 35.9, 395.6, 36.6);
        recordBezierCurveTo(vaulter, ctx, 394.6, 37.4, 393.3, 36.1, 392.9, 35.2);
        recordBezierCurveTo(vaulter, ctx, 392.5, 34.3, 392.0, 29.8, 392.0, 29.8);
        recordBezierCurveTo(vaulter, ctx, 392.0, 29.8, 391.1, 28.7, 391.1, 27.7);
        recordBezierCurveTo(vaulter, ctx, 391.0, 26.7, 391.0, 26.0, 391.0, 26.0);
        recordBezierCurveTo(vaulter, ctx, 382.0, 27.0, 370.8, 33.0, 370.8, 33.0);
        recordBezierCurveTo(vaulter, ctx, 370.8, 33.0, 368.8, 34.7, 367.3, 35.0);
        recordBezierCurveTo(vaulter, ctx, 365.8, 35.4, 357.8, 40.1, 342.4, 43.4);
        ctx.fill();
        ctx.stroke();

        // vaulter/Path
        ctx.beginPath();
        recordMoveTo(vaulter, ctx, 331.3, 37.7);
        recordBezierCurveTo(vaulter, ctx, 331.3, 37.7, 331.6, 32.7, 335.5, 30.3);
        recordBezierCurveTo(vaulter, ctx, 339.3, 28.0, 344.3, 28.1, 344.3, 28.1);
        recordBezierCurveTo(vaulter, ctx, 344.7, 27.9, 345.1, 27.8, 345.6, 27.7);
        recordBezierCurveTo(vaulter, ctx, 351.7, 26.4, 360.0, 25.2, 362.6, 26.5);
        recordBezierCurveTo(vaulter, ctx, 362.6, 26.5, 370.5, 20.1, 390.3, 20.1);
        recordBezierCurveTo(vaulter, ctx, 390.3, 20.1, 391.9, 18.7, 392.9, 18.9);
        recordBezierCurveTo(vaulter, ctx, 393.8, 19.0, 396.0, 19.9, 395.9, 22.1);
        recordBezierCurveTo(vaulter, ctx, 395.7, 24.3, 395.1, 27.1, 394.8, 28.5);
        recordBezierCurveTo(vaulter, ctx, 394.5, 29.9, 395.6, 32.1, 394.4, 33.2);
        recordBezierCurveTo(vaulter, ctx, 393.2, 34.2, 391.9, 32.4, 391.5, 30.2);
        recordBezierCurveTo(vaulter, ctx, 391.2, 28.1, 390.8, 24.6, 390.8, 24.6);
        recordBezierCurveTo(vaulter, ctx, 380.1, 24.8, 374.9, 31.1, 366.5, 33.2);
        recordLineTo(vaulter, ctx, 362.0, 34.2);
        recordBezierCurveTo(vaulter, ctx, 362.0, 34.2, 350.5, 40.1, 342.0, 40.5);
        ctx.fill();
        ctx.stroke();

        // vaulter/Path
        ctx.beginPath();
        recordMoveTo(vaulter, ctx, 287.1, 76.3);
        recordBezierCurveTo(vaulter, ctx, 287.1, 76.3, 287.1, 75.3, 286.1, 75.4);
        recordBezierCurveTo(vaulter, ctx, 285.1, 75.4, 285.1, 76.3, 285.1, 76.3);
        recordLineTo(vaulter, ctx, 293.0, 342.2);
        recordLineTo(vaulter, ctx, 295.0, 342.2);
        recordLineTo(vaulter, ctx, 287.1, 76.3);
        ctx.closePath();
        ctx.fill();
        ctx.stroke();
        ctx.restore();
      }
    },

    function (ctx) {
      if (vaulter.visible) {

        // vaulter/Path
        ctx.save();
        ctx.beginPath();
        recordMoveTo(vaulter, ctx, 322.9, 53.2);
        recordLineTo(vaulter, ctx, 320.4, 62.2);
        recordBezierCurveTo(vaulter, ctx, 320.4, 62.2, 318.2, 68.5, 317.3, 72.6);
        recordBezierCurveTo(vaulter, ctx, 317.3, 72.6, 314.7, 81.2, 314.3, 87.6);
        recordBezierCurveTo(vaulter, ctx, 314.3, 87.6, 310.3, 94.2, 312.2, 95.8);
        recordBezierCurveTo(vaulter, ctx, 312.2, 95.8, 312.6, 97.0, 312.9, 96.7);
        recordBezierCurveTo(vaulter, ctx, 313.3, 96.4, 314.1, 96.1, 314.1, 96.1);
        recordBezierCurveTo(vaulter, ctx, 314.1, 96.1, 314.3, 96.1, 314.8, 96.4);
        recordBezierCurveTo(vaulter, ctx, 315.4, 96.7, 315.2, 95.4, 315.2, 95.4);
        recordBezierCurveTo(vaulter, ctx, 315.2, 95.4, 315.4, 91.2, 315.5, 90.8);
        recordBezierCurveTo(vaulter, ctx, 315.7, 90.4, 316.4, 92.2, 316.4, 92.4);
        recordBezierCurveTo(vaulter, ctx, 316.3, 92.6, 316.3, 93.5, 316.7, 93.5);
        recordBezierCurveTo(vaulter, ctx, 317.1, 93.4, 317.4, 92.5, 317.3, 91.5);
        recordBezierCurveTo(vaulter, ctx, 317.3, 90.6, 317.4, 89.6, 316.4, 88.4);
        recordBezierCurveTo(vaulter, ctx, 316.4, 88.4, 321.2, 80.4, 322.3, 75.0);
        recordBezierCurveTo(vaulter, ctx, 322.3, 75.0, 323.9, 73.1, 324.4, 70.3);
        recordBezierCurveTo(vaulter, ctx, 324.9, 67.6, 325.0, 65.7, 325.0, 65.7);
        recordBezierCurveTo(vaulter, ctx, 325.0, 65.7, 327.6, 63.9, 329.9, 58.7);
        recordBezierCurveTo(vaulter, ctx, 331.3, 55.7, 328.6, 53.5, 327.5, 53.0);
        recordBezierCurveTo(vaulter, ctx, 325.0, 51.8, 322.9, 53.2, 322.9, 53.2);
        ctx.closePath();
        ctx.fillStyle = "rgb(17, 92, 137)";
        ctx.fill();
        ctx.lineWidth = 0.5;
        ctx.strokeStyle = "rgb(141, 204, 255)";
        ctx.lineJoin = "miter";
        ctx.miterLimit = 4.0;
        ctx.stroke();

        // vaulter/Path
        ctx.beginPath();
        recordMoveTo(vaulter, ctx, 327.5, 61.1);
        recordBezierCurveTo(vaulter, ctx, 327.5, 61.1, 326.8, 63.6, 325.1, 66.9);
        recordBezierCurveTo(vaulter, ctx, 323.4, 70.3, 318.7, 72.1, 315.4, 69.8);
        recordBezierCurveTo(vaulter, ctx, 311.9, 67.4, 312.6, 62.8, 314.8, 60.3);
        recordBezierCurveTo(vaulter, ctx, 317.1, 57.7, 323.0, 54.8, 323.0, 54.8);
        ctx.fill();
        ctx.stroke();

        // vaulter/Path
        ctx.beginPath();
        recordMoveTo(vaulter, ctx, 334.9, 55.3);
        recordBezierCurveTo(vaulter, ctx, 334.9, 55.3, 340.8, 48.4, 343.5, 42.5);
        recordBezierCurveTo(vaulter, ctx, 344.5, 40.4, 345.2, 37.7, 345.5, 36.3);
        recordBezierCurveTo(vaulter, ctx, 345.9, 34.1, 345.1, 32.6, 344.0, 31.9);
        recordBezierCurveTo(vaulter, ctx, 342.4, 30.8, 340.1, 30.1, 338.4, 30.2);
        recordBezierCurveTo(vaulter, ctx, 337.6, 30.2, 334.5, 33.6, 332.4, 37.1);
        recordBezierCurveTo(vaulter, ctx, 330.9, 39.5, 329.7, 41.7, 328.3, 43.6);
        recordBezierCurveTo(vaulter, ctx, 327.2, 45.0, 325.4, 46.7, 324.0, 48.1);
        recordBezierCurveTo(vaulter, ctx, 322.5, 49.5, 321.9, 51.5, 321.7, 52.4);
        recordBezierCurveTo(vaulter, ctx, 321.4, 54.5, 322.8, 59.2, 326.9, 59.1);
        recordBezierCurveTo(vaulter, ctx, 331.5, 59.1, 332.6, 59.1, 334.9, 55.3);
        ctx.closePath();
        ctx.fill();
        ctx.stroke();

        // vaulter/Path
        ctx.beginPath();
        recordMoveTo(vaulter, ctx, 287.1, 76.3);
        recordBezierCurveTo(vaulter, ctx, 287.1, 76.3, 287.1, 75.3, 286.1, 75.4);
        recordBezierCurveTo(vaulter, ctx, 285.1, 75.4, 285.1, 76.3, 285.1, 76.3);
        recordLineTo(vaulter, ctx, 293.0, 342.2);
        recordLineTo(vaulter, ctx, 295.0, 342.2);
        recordLineTo(vaulter, ctx, 287.1, 76.3);
        ctx.closePath();
        ctx.fill();
        ctx.stroke();

        // vaulter/Path
        ctx.beginPath();
        recordMoveTo(vaulter, ctx, 337.2, 30.9);
        recordBezierCurveTo(vaulter, ctx, 337.2, 30.9, 339.4, 23.7, 344.7, 22.4);
        recordBezierCurveTo(vaulter, ctx, 350.0, 21.2, 356.0, 22.4, 356.0, 22.4);
        recordLineTo(vaulter, ctx, 361.9, 24.3);
        recordBezierCurveTo(vaulter, ctx, 361.9, 24.3, 365.4, 25.9, 367.9, 24.9);
        recordBezierCurveTo(vaulter, ctx, 370.4, 24.0, 377.3, 21.9, 389.8, 26.4);
        recordBezierCurveTo(vaulter, ctx, 389.8, 26.4, 390.8, 24.3, 392.1, 24.5);
        recordBezierCurveTo(vaulter, ctx, 393.4, 24.6, 396.0, 25.9, 395.5, 28.5);
        recordBezierCurveTo(vaulter, ctx, 395.0, 31.0, 395.2, 36.7, 395.6, 37.9);
        recordBezierCurveTo(vaulter, ctx, 396.0, 39.0, 396.3, 41.9, 395.6, 42.3);
        recordBezierCurveTo(vaulter, ctx, 394.8, 42.8, 393.3, 41.0, 393.6, 39.6);
        recordBezierCurveTo(vaulter, ctx, 393.6, 39.6, 390.1, 34.3, 389.7, 30.3);
        recordBezierCurveTo(vaulter, ctx, 389.7, 30.3, 382.8, 30.2, 380.2, 30.5);
        recordBezierCurveTo(vaulter, ctx, 377.6, 30.7, 369.9, 32.2, 368.2, 32.1);
        recordBezierCurveTo(vaulter, ctx, 366.6, 32.1, 359.2, 34.6, 349.2, 32.9);
        ctx.fill();
        ctx.stroke();

        // vaulter/Path
        ctx.beginPath();
        recordMoveTo(vaulter, ctx, 332.4, 55.0);
        recordBezierCurveTo(vaulter, ctx, 332.4, 56.4, 330.1, 63.3, 330.1, 63.3);
        recordBezierCurveTo(vaulter, ctx, 330.1, 63.3, 330.4, 70.6, 329.9, 73.6);
        recordBezierCurveTo(vaulter, ctx, 329.1, 78.5, 325.8, 85.1, 323.0, 90.6);
        recordBezierCurveTo(vaulter, ctx, 322.5, 91.5, 322.5, 92.7, 321.8, 93.4);
        recordBezierCurveTo(vaulter, ctx, 321.0, 94.0, 320.0, 94.8, 320.0, 94.8);
        recordBezierCurveTo(vaulter, ctx, 320.0, 94.8, 318.6, 97.2, 318.4, 97.8);
        recordBezierCurveTo(vaulter, ctx, 318.2, 98.4, 317.8, 99.0, 317.3, 98.8);
        recordBezierCurveTo(vaulter, ctx, 316.8, 98.6, 316.2, 99.7, 315.9, 99.2);
        recordBezierCurveTo(vaulter, ctx, 315.6, 98.6, 314.4, 99.5, 314.2, 99.0);
        recordBezierCurveTo(vaulter, ctx, 313.9, 98.5, 314.6, 97.1, 314.6, 97.1);
        recordBezierCurveTo(vaulter, ctx, 314.6, 97.1, 317.8, 92.1, 319.1, 91.5);
        recordBezierCurveTo(vaulter, ctx, 320.4, 90.9, 320.6, 90.0, 320.6, 90.0);
        recordBezierCurveTo(vaulter, ctx, 322.8, 82.3, 322.1, 77.8, 323.4, 73.1);
        recordBezierCurveTo(vaulter, ctx, 323.0, 71.4, 323.5, 68.0, 323.6, 66.6);
        recordBezierCurveTo(vaulter, ctx, 323.6, 65.2, 323.7, 63.3, 323.7, 63.3);
        recordBezierCurveTo(vaulter, ctx, 323.7, 63.3, 322.5, 62.6, 322.4, 56.8);
        recordBezierCurveTo(vaulter, ctx, 322.3, 54.9, 322.7, 53.5, 323.3, 52.6);
        ctx.fill();
        ctx.stroke();

        // vaulter/Path
        ctx.beginPath();
        recordMoveTo(vaulter, ctx, 342.3, 32.7);
        recordBezierCurveTo(vaulter, ctx, 342.2, 31.5, 343.8, 30.5, 344.8, 30.8);
        recordBezierCurveTo(vaulter, ctx, 345.7, 31.0, 347.4, 31.4, 347.4, 32.7);
        recordBezierCurveTo(vaulter, ctx, 347.4, 34.1, 346.1, 34.8, 344.5, 34.8);
        recordBezierCurveTo(vaulter, ctx, 343.0, 34.7, 342.3, 32.7, 342.3, 32.7);
        ctx.closePath();
        ctx.fill();

        // vaulter/Path
        ctx.beginPath();
        recordMoveTo(vaulter, ctx, 344.5, 35.0);
        recordBezierCurveTo(vaulter, ctx, 344.5, 35.0, 355.3, 37.7, 358.4, 38.0);
        recordBezierCurveTo(vaulter, ctx, 361.5, 38.2, 364.5, 39.4, 367.9, 38.5);
        recordBezierCurveTo(vaulter, ctx, 367.9, 38.5, 381.1, 37.8, 386.7, 37.9);
        recordBezierCurveTo(vaulter, ctx, 387.7, 42.0, 388.4, 44.6, 389.8, 47.2);
        recordBezierCurveTo(vaulter, ctx, 389.8, 47.2, 390.2, 49.4, 391.3, 49.4);
        recordBezierCurveTo(vaulter, ctx, 392.3, 49.4, 393.2, 44.7, 392.3, 41.3);
        recordBezierCurveTo(vaulter, ctx, 391.5, 38.0, 392.1, 35.4, 392.1, 34.5);
        recordBezierCurveTo(vaulter, ctx, 392.2, 33.6, 391.0, 31.4, 389.9, 31.6);
        recordBezierCurveTo(vaulter, ctx, 388.9, 31.8, 387.2, 32.6, 386.9, 34.2);
        recordBezierCurveTo(vaulter, ctx, 381.6, 34.5, 373.2, 31.0, 368.4, 31.3);
        recordBezierCurveTo(vaulter, ctx, 365.3, 29.0, 361.4, 26.6, 351.4, 24.7);
        ctx.fill();
        ctx.stroke();
        ctx.restore();
      }
    },

    function (ctx) {
      if (vaulter.visible) {

        // vaulter/Path
        ctx.save();
        ctx.beginPath();
        recordMoveTo(vaulter, ctx, 324.2, 70.0);
        recordBezierCurveTo(vaulter, ctx, 324.2, 70.0, 323.2, 72.3, 320.9, 75.3);
        recordBezierCurveTo(vaulter, ctx, 318.6, 78.3, 313.7, 79.2, 310.9, 76.4);
        recordBezierCurveTo(vaulter, ctx, 307.8, 73.4, 309.3, 69.0, 311.9, 66.9);
        recordBezierCurveTo(vaulter, ctx, 314.6, 64.8, 321.0, 63.0, 321.0, 63.0);
        ctx.fillStyle = "rgb(17, 92, 137)";
        ctx.fill();
        ctx.lineWidth = 0.5;
        ctx.strokeStyle = "rgb(141, 204, 255)";
        ctx.lineJoin = "miter";
        ctx.miterLimit = 4.0;
        ctx.stroke();

        // vaulter/Path
        ctx.beginPath();
        recordMoveTo(vaulter, ctx, 320.7, 65.4);
        recordBezierCurveTo(vaulter, ctx, 319.5, 59.6, 323.3, 58.2, 324.9, 57.7);
        recordBezierCurveTo(vaulter, ctx, 326.4, 57.1, 329.6, 58.9, 330.3, 61.9);
        recordBezierCurveTo(vaulter, ctx, 330.6, 63.2, 329.5, 70.4, 329.5, 70.4);
        recordBezierCurveTo(vaulter, ctx, 329.5, 70.4, 331.0, 77.5, 331.1, 80.6);
        recordBezierCurveTo(vaulter, ctx, 331.2, 85.6, 329.1, 92.7, 327.3, 98.5);
        recordBezierCurveTo(vaulter, ctx, 327.0, 99.5, 327.2, 100.7, 326.6, 101.5);
        recordBezierCurveTo(vaulter, ctx, 326.0, 102.3, 325.1, 103.2, 325.1, 103.2);
        recordBezierCurveTo(vaulter, ctx, 325.1, 103.2, 324.2, 105.8, 324.0, 106.5);
        recordBezierCurveTo(vaulter, ctx, 323.9, 107.1, 323.7, 107.8, 323.1, 107.6);
        recordBezierCurveTo(vaulter, ctx, 322.6, 107.5, 322.2, 108.7, 321.8, 108.2);
        recordBezierCurveTo(vaulter, ctx, 321.4, 107.8, 320.4, 108.8, 320.1, 108.3);
        recordBezierCurveTo(vaulter, ctx, 319.8, 107.9, 320.1, 106.4, 320.1, 106.4);
        recordBezierCurveTo(vaulter, ctx, 320.1, 106.4, 322.4, 100.9, 323.6, 100.1);
        recordBezierCurveTo(vaulter, ctx, 324.8, 99.3, 324.8, 98.3, 324.8, 98.3);
        recordBezierCurveTo(vaulter, ctx, 325.7, 90.4, 324.2, 86.1, 324.6, 81.2);
        recordBezierCurveTo(vaulter, ctx, 323.9, 79.7, 323.8, 76.2, 323.6, 74.8);
        recordBezierCurveTo(vaulter, ctx, 323.5, 73.5, 323.2, 71.5, 323.2, 71.5);
        recordBezierCurveTo(vaulter, ctx, 323.2, 71.5, 321.9, 71.1, 320.7, 65.4);
        ctx.closePath();
        ctx.fill();
        ctx.stroke();

        // vaulter/Path
        ctx.beginPath();
        recordMoveTo(vaulter, ctx, 332.0, 66.5);
        recordBezierCurveTo(vaulter, ctx, 332.0, 66.5, 339.0, 60.7, 342.7, 55.3);
        recordBezierCurveTo(vaulter, ctx, 344.0, 53.4, 345.2, 50.9, 345.7, 49.6);
        recordBezierCurveTo(vaulter, ctx, 346.5, 47.5, 346.0, 45.9, 345.0, 45.0);
        recordBezierCurveTo(vaulter, ctx, 343.6, 43.7, 341.5, 42.6, 339.8, 42.3);
        recordBezierCurveTo(vaulter, ctx, 339.0, 42.2, 335.4, 45.0, 332.7, 48.1);
        recordBezierCurveTo(vaulter, ctx, 330.8, 50.3, 329.3, 52.2, 327.6, 53.8);
        recordBezierCurveTo(vaulter, ctx, 326.2, 55.1, 324.2, 56.4, 322.5, 57.6);
        recordBezierCurveTo(vaulter, ctx, 320.8, 58.7, 319.8, 60.6, 319.5, 61.4);
        recordBezierCurveTo(vaulter, ctx, 318.8, 63.4, 319.7, 67.1, 323.5, 68.9);
        recordBezierCurveTo(vaulter, ctx, 327.2, 70.7, 329.1, 69.8, 332.0, 66.5);
        ctx.closePath();
        ctx.fill();
        ctx.stroke();

        // vaulter/Path
        ctx.beginPath();
        recordMoveTo(vaulter, ctx, 287.1, 76.3);
        recordBezierCurveTo(vaulter, ctx, 287.1, 76.3, 287.1, 75.3, 286.1, 75.4);
        recordBezierCurveTo(vaulter, ctx, 285.1, 75.4, 285.1, 76.3, 285.1, 76.3);
        recordLineTo(vaulter, ctx, 293.0, 342.2);
        recordLineTo(vaulter, ctx, 295.0, 342.2);
        recordLineTo(vaulter, ctx, 287.1, 76.3);
        ctx.closePath();
        ctx.fill();
        ctx.stroke();

        // vaulter/Path
        ctx.beginPath();
        recordMoveTo(vaulter, ctx, 319.7, 61.2);
        recordLineTo(vaulter, ctx, 317.8, 70.3);
        recordBezierCurveTo(vaulter, ctx, 317.8, 70.3, 315.9, 76.7, 315.3, 80.9);
        recordBezierCurveTo(vaulter, ctx, 315.3, 80.9, 313.2, 89.6, 313.2, 96.0);
        recordBezierCurveTo(vaulter, ctx, 313.2, 96.0, 309.7, 102.8, 311.7, 104.3);
        recordBezierCurveTo(vaulter, ctx, 311.7, 104.3, 312.1, 105.5, 312.4, 105.2);
        recordBezierCurveTo(vaulter, ctx, 312.8, 104.8, 313.6, 104.5, 313.6, 104.5);
        recordBezierCurveTo(vaulter, ctx, 313.6, 104.5, 313.8, 104.5, 314.3, 104.8);
        recordBezierCurveTo(vaulter, ctx, 314.9, 105.0, 314.6, 103.7, 314.6, 103.7);
        recordBezierCurveTo(vaulter, ctx, 314.6, 103.7, 314.6, 99.5, 314.7, 99.1);
        recordBezierCurveTo(vaulter, ctx, 314.8, 98.7, 315.6, 100.4, 315.6, 100.7);
        recordBezierCurveTo(vaulter, ctx, 315.6, 100.9, 315.6, 101.8, 316.0, 101.7);
        recordBezierCurveTo(vaulter, ctx, 316.4, 101.6, 316.7, 100.7, 316.5, 99.7);
        recordBezierCurveTo(vaulter, ctx, 316.4, 98.8, 316.5, 97.8, 315.4, 96.7);
        recordBezierCurveTo(vaulter, ctx, 315.4, 96.7, 319.7, 88.3, 320.5, 82.9);
        recordBezierCurveTo(vaulter, ctx, 320.5, 82.9, 321.9, 80.9, 322.2, 78.1);
        recordBezierCurveTo(vaulter, ctx, 322.6, 75.3, 322.6, 73.5, 322.6, 73.5);
        recordBezierCurveTo(vaulter, ctx, 322.6, 73.5, 325.1, 71.6, 327.1, 66.2);
        ctx.fill();
        ctx.stroke();

        // vaulter/Path
        ctx.beginPath();
        recordMoveTo(vaulter, ctx, 336.7, 44.9);
        recordBezierCurveTo(vaulter, ctx, 336.7, 44.9, 340.0, 38.1, 345.4, 37.7);
        recordBezierCurveTo(vaulter, ctx, 350.9, 37.3, 356.6, 39.4, 356.6, 39.4);
        recordLineTo(vaulter, ctx, 362.2, 42.2);
        recordBezierCurveTo(vaulter, ctx, 362.2, 42.2, 365.3, 44.3, 368.0, 43.7);
        recordBezierCurveTo(vaulter, ctx, 370.6, 43.2, 377.7, 42.1, 389.4, 48.5);
        recordBezierCurveTo(vaulter, ctx, 389.4, 48.5, 390.7, 46.7, 392.0, 47.0);
        recordBezierCurveTo(vaulter, ctx, 393.2, 47.3, 395.6, 49.0, 394.7, 51.4);
        recordBezierCurveTo(vaulter, ctx, 393.9, 53.9, 393.1, 59.5, 393.3, 60.7);
        recordBezierCurveTo(vaulter, ctx, 393.6, 62.0, 393.5, 64.8, 392.6, 65.2);
        recordBezierCurveTo(vaulter, ctx, 391.8, 65.5, 390.6, 63.5, 391.1, 62.2);
        recordBezierCurveTo(vaulter, ctx, 391.1, 62.2, 388.4, 56.4, 388.7, 52.4);
        recordBezierCurveTo(vaulter, ctx, 388.7, 52.4, 381.9, 51.2, 379.3, 51.1);
        recordBezierCurveTo(vaulter, ctx, 376.7, 50.9, 368.8, 51.2, 367.2, 50.9);
        recordBezierCurveTo(vaulter, ctx, 365.6, 50.6, 357.9, 51.9, 348.3, 48.7);
        ctx.fill();
        ctx.stroke();

        // vaulter/Path
        ctx.beginPath();
        recordMoveTo(vaulter, ctx, 344.7, 50.8);
        recordBezierCurveTo(vaulter, ctx, 342.3, 49.4, 339.5, 46.1, 342.6, 42.9);
        recordBezierCurveTo(vaulter, ctx, 345.6, 39.7, 349.2, 42.9, 350.7, 44.2);
        recordBezierCurveTo(vaulter, ctx, 352.2, 45.6, 354.5, 48.7, 352.5, 51.1);
        recordBezierCurveTo(vaulter, ctx, 350.5, 53.5, 347.3, 52.3, 344.7, 50.8);
        ctx.closePath();
        ctx.fill();

        // vaulter/Path
        ctx.beginPath();
        recordMoveTo(vaulter, ctx, 344.7, 51.0);
        recordBezierCurveTo(vaulter, ctx, 344.7, 51.0, 351.0, 55.9, 353.8, 57.2);
        recordBezierCurveTo(vaulter, ctx, 356.6, 58.6, 359.0, 60.7, 362.5, 61.1);
        recordBezierCurveTo(vaulter, ctx, 362.5, 61.1, 375.0, 65.1, 380.3, 67.2);
        recordBezierCurveTo(vaulter, ctx, 379.8, 71.4, 379.5, 74.0, 379.9, 77.0);
        recordBezierCurveTo(vaulter, ctx, 379.9, 77.0, 379.5, 79.2, 380.5, 79.6);
        recordBezierCurveTo(vaulter, ctx, 381.5, 79.9, 383.9, 75.9, 384.3, 72.4);
        recordBezierCurveTo(vaulter, ctx, 384.7, 68.9, 386.2, 66.7, 386.6, 65.9);
        recordBezierCurveTo(vaulter, ctx, 386.9, 65.1, 386.6, 62.6, 385.5, 62.5);
        recordBezierCurveTo(vaulter, ctx, 384.5, 62.3, 382.6, 62.4, 381.8, 63.8);
        recordBezierCurveTo(vaulter, ctx, 376.7, 62.2, 370.1, 56.0, 365.5, 54.5);
        recordBezierCurveTo(vaulter, ctx, 363.4, 51.3, 360.7, 47.6, 352.0, 42.3);
        ctx.fill();
        ctx.stroke();
        ctx.restore();
      }
    },

    function (ctx) {
      if (vaulter.visible) {

        // vaulter/Path
        ctx.save();
        ctx.beginPath();
        recordMoveTo(vaulter, ctx, 323.4, 60.6);
        recordBezierCurveTo(vaulter, ctx, 323.4, 60.6, 322.0, 63.0, 319.2, 66.1);
        recordBezierCurveTo(vaulter, ctx, 316.4, 69.2, 310.9, 69.8, 308.0, 66.4);
        recordBezierCurveTo(vaulter, ctx, 304.9, 62.8, 307.0, 58.1, 310.1, 56.0);
        recordBezierCurveTo(vaulter, ctx, 313.2, 53.9, 320.5, 52.5, 320.5, 52.5);
        ctx.fillStyle = "rgb(17, 92, 137)";
        ctx.fill();
        ctx.lineWidth = 0.5;
        ctx.strokeStyle = "rgb(141, 204, 255)";
        ctx.lineJoin = "miter";
        ctx.miterLimit = 4.0;
        ctx.stroke();

        // vaulter/Path
        ctx.beginPath();
        recordMoveTo(vaulter, ctx, 320.5, 56.8);
        recordBezierCurveTo(vaulter, ctx, 318.7, 51.2, 322.4, 49.4, 323.9, 48.7);
        recordBezierCurveTo(vaulter, ctx, 325.4, 48.0, 328.7, 49.5, 329.7, 52.3);
        recordBezierCurveTo(vaulter, ctx, 330.1, 53.7, 329.8, 60.9, 329.8, 60.9);
        recordBezierCurveTo(vaulter, ctx, 329.8, 60.9, 332.0, 67.8, 332.4, 70.9);
        recordBezierCurveTo(vaulter, ctx, 333.0, 75.8, 331.6, 83.1, 330.4, 89.1);
        recordBezierCurveTo(vaulter, ctx, 330.2, 90.1, 330.6, 91.3, 330.0, 92.1);
        recordBezierCurveTo(vaulter, ctx, 329.5, 92.9, 328.7, 93.9, 328.7, 93.9);
        recordBezierCurveTo(vaulter, ctx, 328.7, 93.9, 328.1, 96.7, 328.0, 97.3);
        recordBezierCurveTo(vaulter, ctx, 328.0, 98.0, 327.8, 98.7, 327.2, 98.6);
        recordBezierCurveTo(vaulter, ctx, 326.6, 98.5, 326.4, 99.7, 326.0, 99.3);
        recordBezierCurveTo(vaulter, ctx, 325.5, 98.9, 324.7, 100.0, 324.3, 99.6);
        recordBezierCurveTo(vaulter, ctx, 323.9, 99.1, 324.1, 97.6, 324.1, 97.6);
        recordBezierCurveTo(vaulter, ctx, 324.1, 97.6, 325.8, 91.9, 326.9, 91.0);
        recordBezierCurveTo(vaulter, ctx, 328.1, 90.1, 327.9, 89.2, 327.9, 89.2);
        recordBezierCurveTo(vaulter, ctx, 328.0, 81.2, 326.1, 77.1, 326.0, 72.2);
        recordBezierCurveTo(vaulter, ctx, 325.1, 70.7, 324.7, 67.2, 324.4, 65.9);
        recordBezierCurveTo(vaulter, ctx, 324.1, 64.6, 323.6, 62.6, 323.6, 62.6);
        recordBezierCurveTo(vaulter, ctx, 323.6, 62.6, 322.3, 62.3, 320.5, 56.8);
        ctx.closePath();
        ctx.fill();
        ctx.stroke();

        // vaulter/Path
        ctx.beginPath();
        recordMoveTo(vaulter, ctx, 331.0, 59.4);
        recordBezierCurveTo(vaulter, ctx, 331.0, 59.4, 339.2, 55.5, 344.1, 51.2);
        recordBezierCurveTo(vaulter, ctx, 345.9, 49.6, 347.6, 47.4, 348.4, 46.3);
        recordBezierCurveTo(vaulter, ctx, 349.7, 44.5, 349.6, 42.8, 348.9, 41.7);
        recordBezierCurveTo(vaulter, ctx, 347.8, 40.1, 346.0, 38.5, 344.4, 37.8);
        recordBezierCurveTo(vaulter, ctx, 343.7, 37.5, 339.5, 39.4, 336.2, 41.7);
        recordBezierCurveTo(vaulter, ctx, 333.8, 43.4, 331.8, 44.9, 329.8, 46.0);
        recordBezierCurveTo(vaulter, ctx, 328.1, 46.9, 325.8, 47.7, 323.9, 48.4);
        recordBezierCurveTo(vaulter, ctx, 322.0, 49.1, 320.6, 50.6, 320.1, 51.4);
        recordBezierCurveTo(vaulter, ctx, 319.0, 53.2, 318.9, 57.0, 322.1, 59.6);
        recordBezierCurveTo(vaulter, ctx, 325.4, 62.3, 327.4, 61.9, 331.0, 59.4);
        ctx.closePath();
        ctx.fill();
        ctx.stroke();

        // vaulter/Path
        ctx.beginPath();
        recordMoveTo(vaulter, ctx, 287.1, 76.3);
        recordBezierCurveTo(vaulter, ctx, 287.1, 76.3, 287.1, 75.3, 286.1, 75.4);
        recordBezierCurveTo(vaulter, ctx, 285.1, 75.4, 285.1, 76.3, 285.1, 76.3);
        recordLineTo(vaulter, ctx, 293.0, 342.2);
        recordLineTo(vaulter, ctx, 295.0, 342.2);
        recordLineTo(vaulter, ctx, 287.1, 76.3);
        ctx.closePath();
        ctx.fill();
        ctx.stroke();

        // vaulter/Path
        ctx.beginPath();
        recordMoveTo(vaulter, ctx, 321.3, 51.4);
        recordLineTo(vaulter, ctx, 320.1, 60.7);
        recordBezierCurveTo(vaulter, ctx, 320.1, 60.7, 318.7, 67.2, 318.4, 71.4);
        recordBezierCurveTo(vaulter, ctx, 318.4, 71.4, 317.0, 80.3, 317.4, 86.6);
        recordBezierCurveTo(vaulter, ctx, 317.4, 86.6, 314.3, 93.7, 316.5, 95.0);
        recordBezierCurveTo(vaulter, ctx, 316.5, 95.0, 317.0, 96.2, 317.3, 95.8);
        recordBezierCurveTo(vaulter, ctx, 317.6, 95.5, 318.4, 95.1, 318.4, 95.1);
        recordBezierCurveTo(vaulter, ctx, 318.4, 95.1, 318.6, 95.1, 319.2, 95.3);
        recordBezierCurveTo(vaulter, ctx, 319.7, 95.5, 319.3, 94.2, 319.3, 94.2);
        recordBezierCurveTo(vaulter, ctx, 319.3, 94.2, 319.0, 90.1, 319.1, 89.6);
        recordBezierCurveTo(vaulter, ctx, 319.2, 89.2, 320.1, 90.9, 320.1, 91.1);
        recordBezierCurveTo(vaulter, ctx, 320.1, 91.4, 320.2, 92.3, 320.6, 92.1);
        recordBezierCurveTo(vaulter, ctx, 321.0, 92.0, 321.2, 91.1, 321.0, 90.1);
        recordBezierCurveTo(vaulter, ctx, 320.8, 89.2, 320.8, 88.2, 319.6, 87.2);
        recordBezierCurveTo(vaulter, ctx, 319.6, 87.2, 323.3, 78.5, 323.7, 73.1);
        recordBezierCurveTo(vaulter, ctx, 323.7, 73.1, 325.0, 71.0, 325.1, 68.2);
        recordBezierCurveTo(vaulter, ctx, 325.2, 65.4, 325.1, 63.5, 325.1, 63.5);
        recordBezierCurveTo(vaulter, ctx, 325.1, 63.5, 327.4, 61.4, 329.0, 55.9);
        ctx.fill();
        ctx.stroke();

        // vaulter/Path
        ctx.beginPath();
        recordMoveTo(vaulter, ctx, 341.9, 39.8);
        recordBezierCurveTo(vaulter, ctx, 341.9, 39.8, 345.8, 33.3, 351.3, 33.4);
        recordBezierCurveTo(vaulter, ctx, 356.7, 33.4, 362.2, 36.0, 362.2, 36.0);
        recordLineTo(vaulter, ctx, 367.6, 39.3);
        recordBezierCurveTo(vaulter, ctx, 367.6, 39.3, 370.3, 41.7, 372.9, 41.2);
        recordBezierCurveTo(vaulter, ctx, 375.5, 40.6, 382.6, 39.4, 394.4, 45.7);
        recordBezierCurveTo(vaulter, ctx, 394.4, 45.7, 395.7, 43.8, 396.9, 44.1);
        recordBezierCurveTo(vaulter, ctx, 398.2, 44.4, 400.6, 46.0, 399.7, 48.5);
        recordBezierCurveTo(vaulter, ctx, 398.9, 51.0, 398.2, 56.6, 398.5, 57.8);
        recordBezierCurveTo(vaulter, ctx, 398.7, 59.1, 398.7, 61.9, 397.8, 62.3);
        recordBezierCurveTo(vaulter, ctx, 397.0, 62.6, 395.8, 60.7, 396.3, 59.3);
        recordBezierCurveTo(vaulter, ctx, 396.3, 59.3, 393.5, 53.6, 393.7, 49.6);
        recordBezierCurveTo(vaulter, ctx, 393.7, 49.6, 386.9, 48.5, 384.3, 48.4);
        recordBezierCurveTo(vaulter, ctx, 381.7, 48.2, 373.8, 48.6, 372.2, 48.3);
        recordBezierCurveTo(vaulter, ctx, 370.6, 48.1, 362.5, 48.6, 353.2, 44.6);
        ctx.fill();
        ctx.stroke();

        // vaulter/Path
        ctx.beginPath();
        recordMoveTo(vaulter, ctx, 348.4, 46.3);
        recordBezierCurveTo(vaulter, ctx, 345.4, 44.0, 344.7, 40.9, 346.4, 39.1);
        recordBezierCurveTo(vaulter, ctx, 348.1, 37.2, 351.5, 37.4, 354.4, 40.0);
        recordBezierCurveTo(vaulter, ctx, 357.4, 42.5, 357.6, 44.8, 355.9, 46.9);
        recordBezierCurveTo(vaulter, ctx, 354.2, 49.0, 352.3, 49.3, 348.4, 46.3);
        ctx.closePath();
        ctx.fill();

        // vaulter/Path
        ctx.beginPath();
        recordMoveTo(vaulter, ctx, 348.5, 46.5);
        recordBezierCurveTo(vaulter, ctx, 348.5, 46.5, 353.6, 52.6, 356.0, 54.5);
        recordBezierCurveTo(vaulter, ctx, 358.5, 56.5, 360.3, 59.1, 363.7, 60.3);
        recordBezierCurveTo(vaulter, ctx, 363.7, 60.3, 375.1, 66.9, 379.7, 70.1);
        recordBezierCurveTo(vaulter, ctx, 378.3, 74.1, 377.4, 76.6, 377.1, 79.6);
        recordBezierCurveTo(vaulter, ctx, 377.1, 79.6, 376.3, 81.6, 377.2, 82.2);
        recordBezierCurveTo(vaulter, ctx, 378.0, 82.8, 381.3, 79.4, 382.5, 76.1);
        recordBezierCurveTo(vaulter, ctx, 383.6, 72.8, 385.6, 71.0, 386.1, 70.3);
        recordBezierCurveTo(vaulter, ctx, 386.6, 69.6, 386.9, 67.1, 385.9, 66.7);
        recordBezierCurveTo(vaulter, ctx, 384.9, 66.3, 383.1, 66.0, 381.9, 67.1);
        recordBezierCurveTo(vaulter, ctx, 377.3, 64.5, 372.2, 56.9, 368.1, 54.5);
        recordBezierCurveTo(vaulter, ctx, 366.8, 50.8, 364.9, 46.7, 357.6, 39.6);
        ctx.fill();
        ctx.stroke();
        ctx.restore();
      }
    },

    function (ctx) {
      if (vaulter.visible) {

        // vaulter/Path
        ctx.save();
        ctx.beginPath();
        recordMoveTo(vaulter, ctx, 293.0, 342.2);
        recordLineTo(vaulter, ctx, 285.2, 76.3);
        recordBezierCurveTo(vaulter, ctx, 285.2, 76.3, 285.3, 75.4, 286.1, 75.4);
        recordBezierCurveTo(vaulter, ctx, 287.0, 75.3, 287.2, 76.3, 287.2, 76.3);
        recordLineTo(vaulter, ctx, 295.0, 342.2);
        recordLineTo(vaulter, ctx, 293.0, 342.2);
        ctx.closePath();
        ctx.fillStyle = "rgb(17, 92, 137)";
        ctx.fill();
        ctx.lineWidth = 0.5;
        ctx.strokeStyle = "rgb(141, 204, 255)";
        ctx.lineJoin = "miter";
        ctx.miterLimit = 4.0;
        ctx.stroke();

        // vaulter/Path
        ctx.beginPath();
        recordMoveTo(vaulter, ctx, 318.1, 49.4);
        recordLineTo(vaulter, ctx, 319.1, 58.7);
        recordBezierCurveTo(vaulter, ctx, 319.1, 58.7, 319.3, 65.3, 320.0, 69.5);
        recordBezierCurveTo(vaulter, ctx, 320.0, 69.5, 320.7, 78.5, 322.6, 84.5);
        recordBezierCurveTo(vaulter, ctx, 322.6, 84.5, 321.3, 92.1, 323.7, 92.9);
        recordBezierCurveTo(vaulter, ctx, 323.7, 92.9, 324.5, 93.9, 324.7, 93.5);
        recordBezierCurveTo(vaulter, ctx, 324.9, 93.1, 325.6, 92.5, 325.6, 92.5);
        recordBezierCurveTo(vaulter, ctx, 325.6, 92.5, 325.8, 92.5, 326.4, 92.5);
        recordBezierCurveTo(vaulter, ctx, 327.0, 92.6, 326.3, 91.5, 326.3, 91.5);
        recordBezierCurveTo(vaulter, ctx, 326.3, 91.5, 325.0, 87.5, 325.0, 87.1);
        recordBezierCurveTo(vaulter, ctx, 325.0, 86.6, 326.3, 88.0, 326.4, 88.3);
        recordBezierCurveTo(vaulter, ctx, 326.4, 88.5, 326.7, 89.3, 327.0, 89.1);
        recordBezierCurveTo(vaulter, ctx, 327.4, 88.9, 327.4, 88.0, 326.9, 87.1);
        recordBezierCurveTo(vaulter, ctx, 326.5, 86.3, 326.3, 85.3, 324.9, 84.6);
        recordBezierCurveTo(vaulter, ctx, 324.9, 84.6, 326.5, 75.3, 325.6, 69.9);
        recordBezierCurveTo(vaulter, ctx, 325.6, 69.9, 326.3, 67.6, 325.8, 64.8);
        recordBezierCurveTo(vaulter, ctx, 325.2, 62.0, 324.7, 60.2, 324.7, 60.2);
        recordBezierCurveTo(vaulter, ctx, 324.7, 60.2, 326.4, 57.7, 326.7, 52.0);
        recordBezierCurveTo(vaulter, ctx, 326.9, 48.7, 323.6, 47.6, 322.3, 47.5);
        recordBezierCurveTo(vaulter, ctx, 319.6, 47.3, 318.1, 49.4, 318.1, 49.4);
        ctx.closePath();
        ctx.fill();
        ctx.stroke();

        // vaulter/Path
        ctx.beginPath();
        recordMoveTo(vaulter, ctx, 329.7, 56.0);
        recordBezierCurveTo(vaulter, ctx, 329.7, 56.0, 338.5, 53.5, 344.0, 50.0);
        recordBezierCurveTo(vaulter, ctx, 345.9, 48.7, 348.0, 46.8, 349.0, 45.8);
        recordBezierCurveTo(vaulter, ctx, 350.5, 44.3, 350.7, 42.5, 350.1, 41.3);
        recordBezierCurveTo(vaulter, ctx, 349.3, 39.6, 347.8, 37.8, 346.3, 36.9);
        recordBezierCurveTo(vaulter, ctx, 345.7, 36.4, 341.3, 37.6, 337.6, 39.4);
        recordBezierCurveTo(vaulter, ctx, 335.0, 40.7, 332.8, 41.9, 330.6, 42.6);
        recordBezierCurveTo(vaulter, ctx, 328.8, 43.3, 326.5, 43.7, 324.5, 44.1);
        recordBezierCurveTo(vaulter, ctx, 322.5, 44.5, 320.8, 45.8, 320.2, 46.5);
        recordBezierCurveTo(vaulter, ctx, 318.8, 48.1, 318.2, 51.8, 320.9, 54.9);
        recordBezierCurveTo(vaulter, ctx, 323.7, 58.0, 325.8, 58.0, 329.7, 56.0);
        ctx.closePath();
        ctx.fill();
        ctx.stroke();

        // vaulter/Path
        ctx.beginPath();
        recordMoveTo(vaulter, ctx, 322.0, 56.0);
        recordBezierCurveTo(vaulter, ctx, 322.0, 56.0, 320.5, 58.0, 317.7, 60.5);
        recordBezierCurveTo(vaulter, ctx, 314.9, 63.0, 309.9, 63.0, 307.6, 59.7);
        recordBezierCurveTo(vaulter, ctx, 305.2, 56.2, 307.5, 52.1, 310.5, 50.6);
        recordBezierCurveTo(vaulter, ctx, 313.5, 49.0, 320.1, 48.5, 320.1, 48.5);
        ctx.fill();
        ctx.stroke();

        // vaulter/Path
        ctx.beginPath();
        recordMoveTo(vaulter, ctx, 329.9, 48.8);
        recordBezierCurveTo(vaulter, ctx, 330.6, 50.0, 331.7, 57.2, 331.7, 57.2);
        recordBezierCurveTo(vaulter, ctx, 331.7, 57.2, 335.2, 63.5, 336.2, 66.4);
        recordBezierCurveTo(vaulter, ctx, 337.8, 71.1, 337.9, 78.5, 337.9, 84.7);
        recordBezierCurveTo(vaulter, ctx, 337.9, 85.6, 338.5, 86.8, 338.1, 87.7);
        recordBezierCurveTo(vaulter, ctx, 337.8, 88.6, 337.2, 89.8, 337.2, 89.8);
        recordBezierCurveTo(vaulter, ctx, 337.2, 89.8, 337.1, 92.6, 337.2, 93.2);
        recordBezierCurveTo(vaulter, ctx, 337.2, 93.8, 337.2, 94.6, 336.6, 94.6);
        recordBezierCurveTo(vaulter, ctx, 336.1, 94.6, 336.1, 95.8, 335.6, 95.5);
        recordBezierCurveTo(vaulter, ctx, 335.0, 95.2, 334.4, 96.5, 334.0, 96.1);
        recordBezierCurveTo(vaulter, ctx, 333.5, 95.8, 333.4, 94.3, 333.4, 94.3);
        recordBezierCurveTo(vaulter, ctx, 333.4, 94.3, 333.9, 88.4, 334.9, 87.3);
        recordBezierCurveTo(vaulter, ctx, 335.8, 86.2, 335.5, 85.2, 335.5, 85.2);
        recordBezierCurveTo(vaulter, ctx, 334.0, 77.4, 331.3, 73.8, 330.2, 69.0);
        recordBezierCurveTo(vaulter, ctx, 329.1, 67.6, 327.9, 64.4, 327.4, 63.1);
        recordBezierCurveTo(vaulter, ctx, 326.8, 61.9, 326.0, 60.1, 326.0, 60.1);
        recordBezierCurveTo(vaulter, ctx, 326.0, 60.1, 324.6, 60.0, 321.8, 54.9);
        recordBezierCurveTo(vaulter, ctx, 320.0, 51.8, 320.6, 49.6, 321.6, 48.2);
        ctx.fill();
        ctx.stroke();

        // vaulter/Path
        ctx.beginPath();
        recordMoveTo(vaulter, ctx, 343.5, 36.9);
        recordBezierCurveTo(vaulter, ctx, 343.5, 36.9, 348.6, 31.4, 354.0, 32.5);
        recordBezierCurveTo(vaulter, ctx, 359.3, 33.7, 364.2, 37.4, 364.2, 37.4);
        recordLineTo(vaulter, ctx, 369.0, 40.8);
        recordLineTo(vaulter, ctx, 372.2, 44.3);
        recordBezierCurveTo(vaulter, ctx, 374.7, 43.3, 381.6, 41.2, 394.1, 45.6);
        recordBezierCurveTo(vaulter, ctx, 394.1, 45.6, 395.1, 43.6, 396.4, 43.7);
        recordBezierCurveTo(vaulter, ctx, 397.7, 43.8, 400.3, 45.1, 399.8, 47.7);
        recordBezierCurveTo(vaulter, ctx, 399.4, 50.3, 399.5, 55.9, 399.9, 57.1);
        recordBezierCurveTo(vaulter, ctx, 400.4, 58.2, 400.7, 61.1, 400.0, 61.5);
        recordBezierCurveTo(vaulter, ctx, 399.2, 62.0, 397.7, 60.3, 398.0, 58.8);
        recordBezierCurveTo(vaulter, ctx, 398.0, 58.8, 394.4, 53.6, 394.0, 49.6);
        recordBezierCurveTo(vaulter, ctx, 394.0, 49.6, 387.1, 49.5, 384.6, 49.7);
        recordBezierCurveTo(vaulter, ctx, 382.0, 50.0, 374.2, 51.5, 372.6, 51.5);
        recordBezierCurveTo(vaulter, ctx, 370.9, 51.5, 361.8, 49.8, 353.5, 44.0);
        ctx.fill();
        ctx.stroke();

        // vaulter/Path
        ctx.beginPath();
        recordMoveTo(vaulter, ctx, 348.7, 46.1);
        recordBezierCurveTo(vaulter, ctx, 347.0, 44.0, 346.6, 40.9, 349.2, 39.0);
        recordBezierCurveTo(vaulter, ctx, 351.7, 37.0, 354.0, 38.8, 355.3, 40.4);
        recordBezierCurveTo(vaulter, ctx, 356.5, 42.0, 357.2, 44.6, 354.7, 46.5);
        recordBezierCurveTo(vaulter, ctx, 352.1, 48.3, 350.4, 48.1, 348.7, 46.1);
        ctx.closePath();
        ctx.fill();

        // vaulter/Path
        ctx.beginPath();
        recordMoveTo(vaulter, ctx, 348.6, 46.2);
        recordBezierCurveTo(vaulter, ctx, 348.6, 46.2, 352.5, 53.4, 354.4, 55.8);
        recordBezierCurveTo(vaulter, ctx, 356.4, 58.2, 357.7, 61.1, 360.7, 62.9);
        recordBezierCurveTo(vaulter, ctx, 360.7, 62.9, 370.5, 71.8, 374.4, 75.9);
        recordBezierCurveTo(vaulter, ctx, 372.2, 79.5, 370.8, 81.8, 369.9, 84.6);
        recordBezierCurveTo(vaulter, ctx, 369.9, 84.6, 368.7, 86.5, 369.4, 87.2);
        recordBezierCurveTo(vaulter, ctx, 370.2, 88.0, 374.1, 85.3, 375.9, 82.3);
        recordBezierCurveTo(vaulter, ctx, 377.7, 79.3, 380.0, 77.9, 380.6, 77.4);
        recordBezierCurveTo(vaulter, ctx, 381.3, 76.8, 382.0, 74.4, 381.1, 73.8);
        recordBezierCurveTo(vaulter, ctx, 380.2, 73.2, 378.5, 72.5, 377.2, 73.4);
        recordBezierCurveTo(vaulter, ctx, 373.3, 69.9, 369.8, 61.5, 366.2, 58.2);
        recordBezierCurveTo(vaulter, ctx, 365.7, 54.4, 364.7, 49.9, 359.0, 41.5);
        ctx.fill();
        ctx.stroke();
        ctx.restore();
      }
    },

    function (ctx) {
      if (vaulter.visible) {

        // vaulter/Path
        ctx.save();
        ctx.beginPath();
        recordMoveTo(vaulter, ctx, 293.0, 342.2);
        recordLineTo(vaulter, ctx, 285.2, 76.3);
        recordBezierCurveTo(vaulter, ctx, 285.2, 76.3, 285.3, 75.4, 286.1, 75.4);
        recordBezierCurveTo(vaulter, ctx, 287.0, 75.3, 287.2, 76.3, 287.2, 76.3);
        recordLineTo(vaulter, ctx, 295.0, 342.2);
        recordLineTo(vaulter, ctx, 293.0, 342.2);
        ctx.closePath();
        ctx.fillStyle = "rgb(17, 92, 137)";
        ctx.fill();
        ctx.lineWidth = 0.5;
        ctx.strokeStyle = "rgb(141, 204, 255)";
        ctx.lineJoin = "miter";
        ctx.miterLimit = 4.0;
        ctx.stroke();

        // vaulter/Path
        ctx.beginPath();
        recordMoveTo(vaulter, ctx, 321.3, 45.8);
        recordLineTo(vaulter, ctx, 321.1, 55.1);
        recordBezierCurveTo(vaulter, ctx, 321.1, 55.1, 320.4, 61.7, 320.6, 65.9);
        recordBezierCurveTo(vaulter, ctx, 320.6, 65.9, 320.1, 74.9, 321.2, 81.2);
        recordBezierCurveTo(vaulter, ctx, 321.2, 81.2, 319.0, 88.5, 321.2, 89.6);
        recordBezierCurveTo(vaulter, ctx, 321.2, 89.6, 321.9, 90.7, 322.1, 90.3);
        recordBezierCurveTo(vaulter, ctx, 322.4, 90.0, 323.1, 89.5, 323.1, 89.5);
        recordBezierCurveTo(vaulter, ctx, 323.1, 89.5, 323.4, 89.4, 323.9, 89.6);
        recordBezierCurveTo(vaulter, ctx, 324.5, 89.7, 324.0, 88.5, 324.0, 88.5);
        recordBezierCurveTo(vaulter, ctx, 324.0, 88.5, 323.2, 84.4, 323.3, 84.0);
        recordBezierCurveTo(vaulter, ctx, 323.3, 83.5, 324.4, 85.1, 324.4, 85.3);
        recordBezierCurveTo(vaulter, ctx, 324.5, 85.6, 324.7, 86.5, 325.0, 86.3);
        recordBezierCurveTo(vaulter, ctx, 325.4, 86.1, 325.5, 85.2, 325.2, 84.3);
        recordBezierCurveTo(vaulter, ctx, 324.9, 83.4, 324.8, 82.4, 323.5, 81.5);
        recordBezierCurveTo(vaulter, ctx, 323.5, 81.5, 326.2, 72.5, 326.0, 67.0);
        recordBezierCurveTo(vaulter, ctx, 326.0, 67.0, 327.0, 64.8, 326.9, 62.0);
        recordBezierCurveTo(vaulter, ctx, 326.7, 59.2, 326.4, 57.3, 326.4, 57.3);
        recordBezierCurveTo(vaulter, ctx, 326.4, 57.3, 328.4, 55.0, 329.5, 49.4);
        recordBezierCurveTo(vaulter, ctx, 330.0, 46.1, 326.9, 44.6, 325.7, 44.4);
        recordBezierCurveTo(vaulter, ctx, 323.0, 43.8, 321.3, 45.8, 321.3, 45.8);
        ctx.closePath();
        ctx.fill();
        ctx.stroke();

        // vaulter/Path
        ctx.beginPath();
        recordMoveTo(vaulter, ctx, 333.1, 55.8);
        recordBezierCurveTo(vaulter, ctx, 333.1, 55.8, 341.9, 53.3, 347.8, 50.5);
        recordBezierCurveTo(vaulter, ctx, 349.9, 49.5, 352.1, 47.9, 353.3, 47.0);
        recordBezierCurveTo(vaulter, ctx, 355.0, 45.7, 355.4, 44.0, 355.0, 42.7);
        recordBezierCurveTo(vaulter, ctx, 354.4, 40.9, 353.1, 38.9, 351.8, 37.8);
        recordBezierCurveTo(vaulter, ctx, 351.1, 37.3, 346.6, 37.9, 342.8, 39.2);
        recordBezierCurveTo(vaulter, ctx, 340.0, 40.2, 337.7, 41.1, 335.4, 41.6);
        recordBezierCurveTo(vaulter, ctx, 333.6, 42.0, 331.1, 41.5, 329.1, 41.6);
        recordBezierCurveTo(vaulter, ctx, 327.0, 41.8, 324.8, 42.9, 324.2, 43.5);
        recordBezierCurveTo(vaulter, ctx, 322.5, 44.9, 322.5, 48.8, 324.3, 52.5);
        recordBezierCurveTo(vaulter, ctx, 326.1, 56.2, 328.9, 57.3, 333.1, 55.8);
        ctx.closePath();
        ctx.fill();
        ctx.stroke();

        // vaulter/Path
        ctx.beginPath();
        recordMoveTo(vaulter, ctx, 325.6, 53.0);
        recordBezierCurveTo(vaulter, ctx, 325.6, 53.0, 323.7, 55.0, 320.2, 57.4);
        recordBezierCurveTo(vaulter, ctx, 316.7, 59.8, 311.2, 59.0, 309.2, 55.1);
        recordBezierCurveTo(vaulter, ctx, 307.1, 50.8, 310.2, 46.7, 313.7, 45.4);
        recordBezierCurveTo(vaulter, ctx, 317.2, 44.1, 324.6, 44.5, 324.6, 44.5);
        ctx.fill();
        ctx.stroke();

        // vaulter/Path
        ctx.beginPath();
        recordMoveTo(vaulter, ctx, 333.0, 46.6);
        recordBezierCurveTo(vaulter, ctx, 333.5, 47.9, 333.7, 55.2, 333.7, 55.2);
        recordBezierCurveTo(vaulter, ctx, 333.7, 55.2, 336.4, 61.9, 337.0, 64.9);
        recordBezierCurveTo(vaulter, ctx, 338.0, 69.8, 337.1, 77.1, 336.4, 83.2);
        recordBezierCurveTo(vaulter, ctx, 336.2, 84.2, 336.7, 85.4, 336.2, 86.3);
        recordBezierCurveTo(vaulter, ctx, 335.7, 87.1, 335.0, 88.2, 335.0, 88.2);
        recordBezierCurveTo(vaulter, ctx, 335.0, 88.2, 334.6, 91.0, 334.5, 91.6);
        recordBezierCurveTo(vaulter, ctx, 334.5, 92.3, 334.4, 93.0, 333.8, 92.9);
        recordBezierCurveTo(vaulter, ctx, 333.3, 92.9, 333.1, 94.1, 332.7, 93.7);
        recordBezierCurveTo(vaulter, ctx, 332.2, 93.4, 331.4, 94.5, 331.0, 94.1);
        recordBezierCurveTo(vaulter, ctx, 330.6, 93.7, 330.7, 92.2, 330.7, 92.2);
        recordBezierCurveTo(vaulter, ctx, 330.7, 92.2, 332.0, 86.4, 333.0, 85.4);
        recordBezierCurveTo(vaulter, ctx, 334.1, 84.5, 333.9, 83.5, 333.9, 83.5);
        recordBezierCurveTo(vaulter, ctx, 333.4, 75.6, 331.2, 71.6, 330.7, 66.7);
        recordBezierCurveTo(vaulter, ctx, 329.8, 65.2, 329.1, 61.8, 328.7, 60.5);
        recordBezierCurveTo(vaulter, ctx, 328.3, 59.2, 327.7, 57.3, 327.7, 57.3);
        recordBezierCurveTo(vaulter, ctx, 327.7, 57.3, 326.3, 57.1, 324.2, 51.7);
        recordBezierCurveTo(vaulter, ctx, 322.9, 48.5, 323.6, 46.4, 324.7, 45.1);
        ctx.fill();
        ctx.stroke();

        // vaulter/Path
        ctx.beginPath();
        recordMoveTo(vaulter, ctx, 345.1, 39.1);
        recordBezierCurveTo(vaulter, ctx, 345.1, 39.1, 351.8, 35.3, 356.8, 37.5);
        recordBezierCurveTo(vaulter, ctx, 361.6, 39.5, 363.5, 42.1, 365.2, 44.5);
        recordBezierCurveTo(vaulter, ctx, 366.9, 46.9, 370.5, 52.2, 370.5, 52.2);
        recordBezierCurveTo(vaulter, ctx, 372.8, 50.8, 377.6, 49.6, 390.8, 51.7);
        recordBezierCurveTo(vaulter, ctx, 390.8, 51.7, 391.4, 49.5, 392.7, 49.3);
        recordBezierCurveTo(vaulter, ctx, 394.0, 49.2, 396.7, 50.0, 396.8, 52.6);
        recordBezierCurveTo(vaulter, ctx, 396.8, 55.3, 398.0, 60.8, 398.6, 61.9);
        recordBezierCurveTo(vaulter, ctx, 399.2, 62.9, 400.1, 65.6, 399.4, 66.3);
        recordBezierCurveTo(vaulter, ctx, 398.8, 66.9, 396.9, 65.4, 397.0, 64.0);
        recordBezierCurveTo(vaulter, ctx, 397.0, 64.0, 392.5, 59.4, 391.4, 55.6);
        recordBezierCurveTo(vaulter, ctx, 391.4, 55.6, 384.6, 56.7, 382.1, 57.5);
        recordBezierCurveTo(vaulter, ctx, 379.6, 58.2, 372.3, 61.1, 370.7, 61.4);
        recordBezierCurveTo(vaulter, ctx, 369.0, 61.6, 358.9, 56.7, 352.7, 48.7);
        ctx.fill();
        ctx.stroke();

        // vaulter/Path
        ctx.beginPath();
        recordMoveTo(vaulter, ctx, 348.8, 50.0);
        recordBezierCurveTo(vaulter, ctx, 347.9, 47.7, 349.8, 45.3, 351.8, 44.3);
        recordBezierCurveTo(vaulter, ctx, 353.9, 43.3, 356.4, 44.5, 357.5, 47.6);
        recordBezierCurveTo(vaulter, ctx, 358.6, 50.7, 357.8, 52.6, 355.1, 53.8);
        recordBezierCurveTo(vaulter, ctx, 352.5, 54.9, 350.0, 53.2, 348.8, 50.0);
        ctx.closePath();
        ctx.fill();

        // vaulter/Path
        ctx.beginPath();
        recordMoveTo(vaulter, ctx, 348.7, 49.8);
        recordBezierCurveTo(vaulter, ctx, 348.7, 49.8, 351.5, 57.3, 353.1, 59.9);
        recordBezierCurveTo(vaulter, ctx, 354.8, 62.5, 355.7, 65.6, 358.5, 67.8);
        recordBezierCurveTo(vaulter, ctx, 358.5, 67.8, 366.0, 80.3, 371.6, 81.3);
        recordBezierCurveTo(vaulter, ctx, 371.9, 85.5, 372.0, 89.8, 373.0, 92.6);
        recordBezierCurveTo(vaulter, ctx, 373.0, 92.6, 373.0, 94.8, 374.1, 95.0);
        recordBezierCurveTo(vaulter, ctx, 375.1, 95.2, 376.7, 90.7, 376.4, 87.2);
        recordBezierCurveTo(vaulter, ctx, 376.2, 83.8, 377.2, 81.3, 377.4, 80.4);
        recordBezierCurveTo(vaulter, ctx, 377.6, 79.6, 376.7, 77.2, 375.7, 77.2);
        recordBezierCurveTo(vaulter, ctx, 374.6, 77.3, 373.8, 76.6, 373.2, 78.1);
        recordBezierCurveTo(vaulter, ctx, 368.3, 72.2, 367.6, 67.5, 364.5, 63.8);
        recordBezierCurveTo(vaulter, ctx, 364.5, 59.9, 364.1, 55.4, 359.5, 46.3);
        ctx.fill();
        ctx.stroke();
        ctx.restore();
      }
    },

    function (ctx) {
      if (vaulter.visible) {

        // vaulter/Path
        ctx.save();
        ctx.beginPath();
        recordMoveTo(vaulter, ctx, 335.1, 33.7);
        recordBezierCurveTo(vaulter, ctx, 333.9, 34.2, 327.9, 42.7, 327.9, 42.7);
        recordBezierCurveTo(vaulter, ctx, 327.9, 42.7, 323.5, 46.0, 321.0, 49.6);
        recordBezierCurveTo(vaulter, ctx, 321.0, 49.6, 314.4, 56.3, 310.8, 61.9);
        recordBezierCurveTo(vaulter, ctx, 310.8, 61.9, 303.9, 66.1, 304.9, 68.5);
        recordBezierCurveTo(vaulter, ctx, 304.9, 68.5, 304.6, 69.8, 305.1, 69.7);
        recordBezierCurveTo(vaulter, ctx, 305.5, 69.6, 305.9, 69.9, 306.1, 70.0);
        recordBezierCurveTo(vaulter, ctx, 306.3, 70.1, 306.5, 69.9, 306.9, 70.0);
        recordBezierCurveTo(vaulter, ctx, 307.5, 70.1, 307.7, 69.4, 307.7, 69.4);
        recordLineTo(vaulter, ctx, 309.3, 67.9);
        recordBezierCurveTo(vaulter, ctx, 309.3, 67.9, 309.3, 68.0, 309.5, 68.1);
        recordBezierCurveTo(vaulter, ctx, 309.9, 68.2, 310.8, 67.6, 311.4, 66.8);
        recordBezierCurveTo(vaulter, ctx, 312.0, 66.0, 312.4, 64.9, 312.4, 63.8);
        recordBezierCurveTo(vaulter, ctx, 312.4, 63.8, 320.0, 58.1, 323.7, 53.7);
        recordBezierCurveTo(vaulter, ctx, 323.7, 53.7, 326.1, 52.7, 327.9, 50.4);
        recordBezierCurveTo(vaulter, ctx, 329.8, 48.1, 330.8, 46.4, 330.8, 46.4);
        recordBezierCurveTo(vaulter, ctx, 330.8, 46.4, 334.1, 46.0, 338.8, 42.4);
        recordBezierCurveTo(vaulter, ctx, 341.6, 40.2, 340.2, 36.8, 339.4, 35.8);
        recordBezierCurveTo(vaulter, ctx, 337.7, 33.5, 336.4, 33.2, 335.1, 33.7);
        ctx.closePath();
        ctx.fillStyle = "rgb(17, 92, 137)";
        ctx.fill();
        ctx.lineWidth = 0.5;
        ctx.strokeStyle = "rgb(141, 204, 255)";
        ctx.lineJoin = "miter";
        ctx.miterLimit = 4.0;
        ctx.stroke();

        // vaulter/Path
        ctx.beginPath();
        recordMoveTo(vaulter, ctx, 293.0, 342.2);
        recordLineTo(vaulter, ctx, 287.2, 76.4);
        recordBezierCurveTo(vaulter, ctx, 287.2, 76.4, 287.3, 75.4, 288.1, 75.4);
        recordBezierCurveTo(vaulter, ctx, 289.0, 75.3, 289.2, 76.4, 289.2, 76.4);
        recordLineTo(vaulter, ctx, 295.0, 342.2);
        recordLineTo(vaulter, ctx, 293.0, 342.2);
        ctx.closePath();
        ctx.fill();
        ctx.stroke();

        // vaulter/Path
        ctx.beginPath();
        recordMoveTo(vaulter, ctx, 338.1, 47.9);
        recordBezierCurveTo(vaulter, ctx, 338.1, 47.9, 347.6, 49.0, 354.5, 48.6);
        recordBezierCurveTo(vaulter, ctx, 356.9, 48.5, 359.8, 47.9, 361.2, 47.4);
        recordBezierCurveTo(vaulter, ctx, 363.5, 46.8, 364.5, 45.3, 364.6, 44.0);
        recordBezierCurveTo(vaulter, ctx, 364.8, 41.9, 364.4, 39.5, 363.5, 37.9);
        recordBezierCurveTo(vaulter, ctx, 363.1, 37.1, 358.5, 35.9, 354.2, 35.6);
        recordBezierCurveTo(vaulter, ctx, 351.2, 35.4, 348.5, 35.4, 346.1, 34.9);
        recordBezierCurveTo(vaulter, ctx, 344.2, 34.6, 341.9, 33.1, 339.9, 32.4);
        recordBezierCurveTo(vaulter, ctx, 337.9, 31.8, 335.3, 32.0, 334.4, 32.3);
        recordBezierCurveTo(vaulter, ctx, 332.2, 33.0, 330.6, 36.8, 330.9, 41.1);
        recordBezierCurveTo(vaulter, ctx, 331.2, 45.5, 333.5, 47.6, 338.1, 47.9);
        ctx.closePath();
        ctx.fill();
        ctx.stroke();

        // vaulter/Path
        ctx.beginPath();
        recordMoveTo(vaulter, ctx, 334.4, 42.1);
        recordBezierCurveTo(vaulter, ctx, 334.4, 42.1, 333.0, 44.3, 330.3, 47.1);
        recordBezierCurveTo(vaulter, ctx, 327.5, 50.0, 322.2, 50.3, 319.6, 47.0);
        recordBezierCurveTo(vaulter, ctx, 316.8, 43.4, 319.0, 39.1, 322.0, 37.2);
        recordBezierCurveTo(vaulter, ctx, 325.1, 35.4, 332.0, 34.4, 332.0, 34.4);
        ctx.fill();
        ctx.stroke();

        // vaulter/Path
        ctx.beginPath();
        recordMoveTo(vaulter, ctx, 340.1, 40.6);
        recordBezierCurveTo(vaulter, ctx, 339.5, 41.9, 334.1, 47.3, 334.1, 47.3);
        recordBezierCurveTo(vaulter, ctx, 334.1, 47.3, 327.8, 53.1, 325.6, 55.4);
        recordBezierCurveTo(vaulter, ctx, 321.9, 59.2, 319.1, 64.6, 314.9, 69.5);
        recordBezierCurveTo(vaulter, ctx, 314.2, 70.3, 313.8, 71.6, 312.9, 72.1);
        recordBezierCurveTo(vaulter, ctx, 312.0, 72.6, 310.8, 73.1, 310.8, 73.1);
        recordBezierCurveTo(vaulter, ctx, 310.8, 73.1, 307.6, 73.9, 305.5, 76.6);
        recordBezierCurveTo(vaulter, ctx, 305.1, 77.1, 303.9, 76.5, 303.8, 75.9);
        recordBezierCurveTo(vaulter, ctx, 303.7, 75.3, 304.7, 74.1, 304.7, 74.1);
        recordBezierCurveTo(vaulter, ctx, 304.7, 74.1, 309.1, 69.7, 310.6, 69.5);
        recordBezierCurveTo(vaulter, ctx, 312.1, 69.3, 312.5, 68.3, 312.5, 68.3);
        recordBezierCurveTo(vaulter, ctx, 316.7, 61.0, 317.3, 54.9, 321.2, 51.5);
        recordBezierCurveTo(vaulter, ctx, 321.9, 49.9, 324.5, 47.2, 325.3, 46.1);
        recordBezierCurveTo(vaulter, ctx, 326.2, 45.0, 327.5, 43.3, 327.5, 43.3);
        recordBezierCurveTo(vaulter, ctx, 327.5, 43.3, 327.2, 43.1, 329.8, 37.5);
        recordBezierCurveTo(vaulter, ctx, 330.7, 35.6, 331.8, 34.4, 332.9, 33.8);
        ctx.fill();
        ctx.stroke();

        // vaulter/Path
        ctx.beginPath();
        recordMoveTo(vaulter, ctx, 356.1, 36.7);
        recordBezierCurveTo(vaulter, ctx, 356.1, 36.7, 364.1, 35.8, 368.1, 40.0);
        recordBezierCurveTo(vaulter, ctx, 371.8, 44.0, 372.6, 47.3, 373.2, 50.3);
        recordBezierCurveTo(vaulter, ctx, 373.8, 53.3, 375.8, 56.4, 375.8, 56.4);
        recordBezierCurveTo(vaulter, ctx, 377.1, 53.9, 378.7, 53.2, 389.4, 48.4);
        recordBezierCurveTo(vaulter, ctx, 389.4, 48.4, 388.8, 46.1, 389.9, 45.3);
        recordBezierCurveTo(vaulter, ctx, 391.0, 44.5, 393.9, 43.7, 395.3, 46.1);
        recordBezierCurveTo(vaulter, ctx, 396.8, 48.5, 400.8, 52.8, 401.9, 53.5);
        recordBezierCurveTo(vaulter, ctx, 403.1, 54.1, 405.3, 56.1, 405.0, 57.0);
        recordBezierCurveTo(vaulter, ctx, 404.7, 57.9, 402.3, 57.6, 401.6, 56.2);
        recordBezierCurveTo(vaulter, ctx, 401.6, 56.2, 395.1, 54.5, 392.1, 51.6);
        recordBezierCurveTo(vaulter, ctx, 392.1, 51.6, 386.5, 56.3, 384.6, 58.3);
        recordBezierCurveTo(vaulter, ctx, 382.7, 60.3, 379.6, 67.4, 376.3, 67.9);
        recordBezierCurveTo(vaulter, ctx, 373.0, 68.5, 362.1, 59.5, 359.3, 49.2);
        ctx.fill();
        ctx.stroke();

        // vaulter/Path
        ctx.beginPath();
        recordMoveTo(vaulter, ctx, 355.9, 48.3);
        recordBezierCurveTo(vaulter, ctx, 355.9, 48.3, 359.1, 58.3, 360.7, 61.1);
        recordBezierCurveTo(vaulter, ctx, 362.3, 64.0, 363.1, 67.3, 365.9, 69.7);
        recordBezierCurveTo(vaulter, ctx, 365.9, 69.7, 373.3, 83.2, 379.1, 84.6);
        recordBezierCurveTo(vaulter, ctx, 379.2, 89.0, 379.1, 93.5, 380.0, 96.5);
        recordBezierCurveTo(vaulter, ctx, 380.0, 96.5, 379.9, 98.8, 381.0, 99.1);
        recordBezierCurveTo(vaulter, ctx, 382.1, 99.3, 384.0, 94.7, 383.9, 91.0);
        recordBezierCurveTo(vaulter, ctx, 383.8, 87.4, 385.0, 84.8, 385.2, 83.9);
        recordBezierCurveTo(vaulter, ctx, 385.4, 83.0, 384.7, 80.5, 383.6, 80.5);
        recordBezierCurveTo(vaulter, ctx, 382.4, 80.5, 381.6, 79.7, 381.0, 81.3);
        recordBezierCurveTo(vaulter, ctx, 376.1, 74.9, 375.6, 69.8, 372.5, 65.8);
        recordBezierCurveTo(vaulter, ctx, 372.6, 61.7, 372.4, 57.0, 368.1, 47.2);
        ctx.fill();
        ctx.stroke();
        ctx.restore();
      }
    },

    function (ctx) {
      if (vaulter.visible) {

        // vaulter/Path
        ctx.save();
        ctx.beginPath();
        recordMoveTo(vaulter, ctx, 337.8, 31.5);
        recordBezierCurveTo(vaulter, ctx, 336.1, 31.7, 332.7, 34.2, 330.0, 36.8);
        recordBezierCurveTo(vaulter, ctx, 326.8, 37.9, 320.7, 39.5, 317.2, 42.2);
        recordBezierCurveTo(vaulter, ctx, 317.2, 42.2, 309.0, 48.4, 303.8, 52.7);
        recordBezierCurveTo(vaulter, ctx, 303.8, 52.7, 296.9, 57.7, 298.1, 60.1);
        recordBezierCurveTo(vaulter, ctx, 298.1, 60.1, 297.9, 61.4, 298.4, 61.2);
        recordBezierCurveTo(vaulter, ctx, 298.8, 61.1, 299.2, 61.4, 299.4, 61.4);
        recordBezierCurveTo(vaulter, ctx, 299.7, 61.5, 299.8, 61.3, 300.2, 61.3);
        recordBezierCurveTo(vaulter, ctx, 300.8, 61.4, 300.9, 60.7, 300.9, 60.7);
        recordLineTo(vaulter, ctx, 302.4, 59.1);
        recordBezierCurveTo(vaulter, ctx, 302.4, 59.1, 302.4, 59.2, 302.7, 59.2);
        recordBezierCurveTo(vaulter, ctx, 303.1, 59.3, 303.9, 58.5, 304.2, 57.5);
        recordBezierCurveTo(vaulter, ctx, 304.5, 56.6, 304.4, 56.0, 304.7, 54.9);
        recordBezierCurveTo(vaulter, ctx, 304.7, 54.9, 314.6, 49.3, 319.5, 46.3);
        recordBezierCurveTo(vaulter, ctx, 319.5, 46.3, 323.3, 45.1, 326.0, 43.9);
        recordBezierCurveTo(vaulter, ctx, 328.6, 42.7, 331.1, 41.7, 331.1, 41.7);
        recordBezierCurveTo(vaulter, ctx, 331.1, 41.7, 334.3, 42.4, 339.9, 40.4);
        recordBezierCurveTo(vaulter, ctx, 343.2, 39.2, 342.9, 35.6, 342.5, 34.3);
        recordBezierCurveTo(vaulter, ctx, 341.6, 31.6, 339.6, 31.3, 337.8, 31.5);
        ctx.closePath();
        ctx.fillStyle = "rgb(17, 92, 137)";
        ctx.fill();
        ctx.lineWidth = 0.5;
        ctx.strokeStyle = "rgb(141, 204, 255)";
        ctx.lineJoin = "miter";
        ctx.miterLimit = 4.0;
        ctx.stroke();

        // vaulter/Path
        ctx.beginPath();
        recordMoveTo(vaulter, ctx, 293.0, 342.2);
        recordLineTo(vaulter, ctx, 287.2, 76.4);
        recordBezierCurveTo(vaulter, ctx, 287.2, 76.4, 287.3, 75.4, 288.1, 75.4);
        recordBezierCurveTo(vaulter, ctx, 289.0, 75.3, 289.2, 76.4, 289.2, 76.4);
        recordLineTo(vaulter, ctx, 295.0, 342.2);
        recordLineTo(vaulter, ctx, 293.0, 342.2);
        ctx.closePath();
        ctx.fill();
        ctx.stroke();

        // vaulter/Path
        ctx.beginPath();
        recordMoveTo(vaulter, ctx, 339.0, 47.7);
        recordBezierCurveTo(vaulter, ctx, 339.0, 47.7, 347.7, 51.7, 354.3, 53.6);
        recordBezierCurveTo(vaulter, ctx, 356.6, 54.3, 359.5, 54.6, 361.0, 54.7);
        recordBezierCurveTo(vaulter, ctx, 363.3, 54.8, 364.8, 53.7, 365.4, 52.4);
        recordBezierCurveTo(vaulter, ctx, 366.2, 50.6, 366.6, 48.1, 366.3, 46.3);
        recordBezierCurveTo(vaulter, ctx, 366.1, 45.5, 362.1, 42.8, 358.1, 41.2);
        recordBezierCurveTo(vaulter, ctx, 355.3, 40.1, 352.9, 39.1, 350.7, 38.0);
        recordBezierCurveTo(vaulter, ctx, 349.0, 37.0, 347.3, 34.9, 345.6, 33.6);
        recordBezierCurveTo(vaulter, ctx, 343.9, 32.3, 341.4, 31.7, 340.5, 31.7);
        recordBezierCurveTo(vaulter, ctx, 338.2, 31.7, 335.4, 34.7, 334.3, 38.9);
        recordBezierCurveTo(vaulter, ctx, 333.2, 43.1, 334.7, 45.9, 339.0, 47.7);
        ctx.closePath();
        ctx.fill();
        ctx.stroke();

        // vaulter/Path
        ctx.beginPath();
        recordMoveTo(vaulter, ctx, 359.3, 41.7);
        recordBezierCurveTo(vaulter, ctx, 359.3, 41.7, 360.5, 43.2, 361.7, 43.4);
        recordBezierCurveTo(vaulter, ctx, 364.3, 44.0, 368.3, 44.9, 370.4, 47.9);
        recordBezierCurveTo(vaulter, ctx, 373.7, 52.2, 374.1, 55.6, 374.3, 58.7);
        recordBezierCurveTo(vaulter, ctx, 374.6, 61.7, 376.2, 65.0, 376.2, 65.0);
        recordBezierCurveTo(vaulter, ctx, 377.8, 62.7, 379.5, 62.1, 390.7, 58.7);
        recordBezierCurveTo(vaulter, ctx, 390.7, 58.7, 390.3, 56.3, 391.5, 55.6);
        recordBezierCurveTo(vaulter, ctx, 392.7, 55.0, 395.7, 54.5, 396.8, 57.1);
        recordBezierCurveTo(vaulter, ctx, 398.0, 59.6, 401.4, 64.4, 402.5, 65.2);
        recordBezierCurveTo(vaulter, ctx, 403.5, 66.0, 405.5, 68.2, 405.1, 69.1);
        recordBezierCurveTo(vaulter, ctx, 404.8, 69.9, 402.4, 69.3, 401.8, 67.9);
        recordBezierCurveTo(vaulter, ctx, 401.8, 67.9, 395.6, 65.4, 392.9, 62.2);
        recordBezierCurveTo(vaulter, ctx, 392.9, 62.2, 386.9, 66.2, 384.8, 67.9);
        recordBezierCurveTo(vaulter, ctx, 382.6, 69.7, 378.7, 76.4, 375.4, 76.5);
        recordBezierCurveTo(vaulter, ctx, 372.0, 76.7, 362.2, 66.4, 360.7, 55.9);
        ctx.fill();
        ctx.stroke();

        // vaulter/Path
        ctx.beginPath();
        recordMoveTo(vaulter, ctx, 338.2, 41.8);
        recordBezierCurveTo(vaulter, ctx, 338.2, 41.8, 336.0, 43.7, 332.1, 45.8);
        recordBezierCurveTo(vaulter, ctx, 328.2, 47.9, 322.5, 46.4, 320.9, 42.1);
        recordBezierCurveTo(vaulter, ctx, 319.1, 37.4, 322.8, 33.5, 326.7, 32.5);
        recordBezierCurveTo(vaulter, ctx, 330.5, 31.6, 338.2, 32.8, 338.2, 32.8);
        ctx.fill();
        ctx.stroke();

        // vaulter/Path
        ctx.beginPath();
        recordMoveTo(vaulter, ctx, 340.0, 33.4);
        recordBezierCurveTo(vaulter, ctx, 338.7, 33.4, 337.1, 33.7, 334.9, 34.7);
        recordBezierCurveTo(vaulter, ctx, 333.5, 35.3, 328.9, 37.0, 328.9, 37.0);
        recordBezierCurveTo(vaulter, ctx, 328.9, 37.0, 327.1, 37.9, 325.8, 38.5);
        recordBezierCurveTo(vaulter, ctx, 324.5, 39.1, 321.0, 40.3, 319.6, 41.5);
        recordBezierCurveTo(vaulter, ctx, 314.6, 42.6, 312.2, 46.9, 305.5, 54.2);
        recordBezierCurveTo(vaulter, ctx, 305.5, 54.2, 304.7, 55.3, 304.4, 57.8);
        recordBezierCurveTo(vaulter, ctx, 304.2, 59.3, 304.1, 65.3, 304.1, 65.3);
        recordBezierCurveTo(vaulter, ctx, 304.1, 65.3, 304.4, 66.9, 304.9, 67.2);
        recordBezierCurveTo(vaulter, ctx, 305.5, 67.5, 307.3, 65.6, 307.2, 64.9);
        recordBezierCurveTo(vaulter, ctx, 306.6, 62.1, 306.8, 60.9, 307.1, 60.2);
        recordBezierCurveTo(vaulter, ctx, 307.3, 60.8, 307.6, 61.4, 307.5, 61.8);
        recordBezierCurveTo(vaulter, ctx, 307.4, 62.4, 308.2, 63.4, 308.6, 63.1);
        recordBezierCurveTo(vaulter, ctx, 309.0, 62.9, 309.0, 62.0, 308.8, 61.7);
        recordBezierCurveTo(vaulter, ctx, 308.7, 61.4, 308.9, 60.2, 308.8, 59.3);
        recordBezierCurveTo(vaulter, ctx, 308.8, 58.6, 308.0, 57.3, 307.7, 56.9);
        recordBezierCurveTo(vaulter, ctx, 307.5, 56.5, 307.0, 56.3, 307.0, 56.3);
        recordBezierCurveTo(vaulter, ctx, 313.4, 51.5, 316.8, 48.6, 321.7, 46.9);
        recordBezierCurveTo(vaulter, ctx, 324.8, 45.8, 333.0, 43.6, 333.0, 43.6);
        recordBezierCurveTo(vaulter, ctx, 333.0, 43.6, 341.5, 43.0, 342.7, 42.1);
        ctx.fill();
        ctx.stroke();

        // vaulter/Path
        ctx.beginPath();
        recordMoveTo(vaulter, ctx, 356.4, 54.1);
        recordBezierCurveTo(vaulter, ctx, 356.5, 51.0, 359.4, 50.0, 361.6, 50.3);
        recordBezierCurveTo(vaulter, ctx, 363.8, 50.6, 366.3, 52.5, 366.4, 56.0);
        recordBezierCurveTo(vaulter, ctx, 366.4, 59.5, 363.7, 59.6, 361.4, 59.4);
        recordBezierCurveTo(vaulter, ctx, 359.1, 59.3, 356.3, 58.2, 356.4, 54.1);
        ctx.closePath();
        ctx.fill();

        // vaulter/Path
        ctx.beginPath();
        recordMoveTo(vaulter, ctx, 356.1, 54.1);
        recordBezierCurveTo(vaulter, ctx, 356.1, 54.1, 356.1, 64.3, 356.8, 67.5);
        recordBezierCurveTo(vaulter, ctx, 357.5, 70.7, 357.3, 74.1, 359.2, 77.2);
        recordBezierCurveTo(vaulter, ctx, 359.2, 77.2, 362.2, 92.3, 367.3, 95.4);
        recordBezierCurveTo(vaulter, ctx, 366.1, 99.6, 364.7, 103.9, 364.6, 107.0);
        recordBezierCurveTo(vaulter, ctx, 364.6, 107.0, 363.9, 109.2, 364.8, 109.8);
        recordBezierCurveTo(vaulter, ctx, 365.8, 110.3, 369.0, 106.5, 370.0, 103.0);
        recordBezierCurveTo(vaulter, ctx, 370.9, 99.4, 372.8, 97.4, 373.3, 96.6);
        recordBezierCurveTo(vaulter, ctx, 373.8, 95.8, 373.9, 93.2, 372.8, 92.8);
        recordBezierCurveTo(vaulter, ctx, 371.7, 92.4, 371.2, 91.5, 370.1, 92.8);
        recordBezierCurveTo(vaulter, ctx, 367.3, 85.2, 368.4, 80.2, 366.6, 75.5);
        recordBezierCurveTo(vaulter, ctx, 368.0, 71.6, 369.2, 67.0, 368.0, 56.4);
        ctx.fill();
        ctx.stroke();
        ctx.restore();
      }
    },

    function (ctx) {
      if (vaulter.visible) {

        // vaulter/Path
        ctx.save();
        ctx.beginPath();
        recordMoveTo(vaulter, ctx, 344.8, 37.7);
        recordBezierCurveTo(vaulter, ctx, 343.2, 37.2, 339.0, 38.1, 335.6, 39.5);
        recordBezierCurveTo(vaulter, ctx, 332.2, 39.2, 325.9, 38.3, 321.6, 39.4);
        recordBezierCurveTo(vaulter, ctx, 321.6, 39.4, 311.6, 41.9, 305.2, 43.8);
        recordBezierCurveTo(vaulter, ctx, 305.2, 43.8, 296.8, 45.7, 297.0, 48.3);
        recordBezierCurveTo(vaulter, ctx, 297.0, 48.3, 296.3, 49.4, 296.8, 49.5);
        recordBezierCurveTo(vaulter, ctx, 297.3, 49.6, 297.5, 49.9, 297.7, 50.1);
        recordBezierCurveTo(vaulter, ctx, 297.9, 50.2, 298.1, 50.1, 298.5, 50.3);
        recordBezierCurveTo(vaulter, ctx, 299.0, 50.6, 299.4, 50.0, 299.4, 50.0);
        recordLineTo(vaulter, ctx, 301.4, 49.1);
        recordBezierCurveTo(vaulter, ctx, 301.4, 49.1, 301.3, 49.2, 301.6, 49.3);
        recordBezierCurveTo(vaulter, ctx, 301.9, 49.5, 303.0, 49.2, 303.6, 48.4);
        recordBezierCurveTo(vaulter, ctx, 304.3, 47.6, 304.4, 47.0, 305.1, 46.2);
        recordBezierCurveTo(vaulter, ctx, 305.1, 46.2, 316.5, 44.9, 322.2, 44.1);
        recordBezierCurveTo(vaulter, ctx, 322.2, 44.1, 326.1, 44.5, 329.1, 44.4);
        recordBezierCurveTo(vaulter, ctx, 331.9, 44.4, 334.5, 44.4, 334.5, 44.4);
        recordBezierCurveTo(vaulter, ctx, 334.5, 44.4, 337.2, 46.3, 343.2, 46.7);
        recordBezierCurveTo(vaulter, ctx, 346.7, 46.9, 347.9, 43.5, 348.0, 42.2);
        recordBezierCurveTo(vaulter, ctx, 348.2, 39.3, 346.5, 38.2, 344.8, 37.7);
        ctx.closePath();
        ctx.fillStyle = "rgb(17, 92, 137)";
        ctx.fill();
        ctx.lineWidth = 0.5;
        ctx.strokeStyle = "rgb(141, 204, 255)";
        ctx.lineJoin = "miter";
        ctx.miterLimit = 4.0;
        ctx.stroke();

        // vaulter/Path
        ctx.beginPath();
        recordMoveTo(vaulter, ctx, 293.0, 342.2);
        recordLineTo(vaulter, ctx, 287.2, 76.4);
        recordBezierCurveTo(vaulter, ctx, 287.2, 76.4, 287.3, 75.4, 288.1, 75.4);
        recordBezierCurveTo(vaulter, ctx, 289.0, 75.3, 289.2, 76.4, 289.2, 76.4);
        recordLineTo(vaulter, ctx, 295.0, 342.2);
        recordLineTo(vaulter, ctx, 293.0, 342.2);
        ctx.closePath();
        ctx.fill();
        ctx.stroke();

        // vaulter/Path
        ctx.beginPath();
        recordMoveTo(vaulter, ctx, 341.0, 53.1);
        recordBezierCurveTo(vaulter, ctx, 341.0, 53.1, 346.8, 60.7, 351.8, 65.4);
        recordBezierCurveTo(vaulter, ctx, 353.6, 67.1, 356.1, 68.7, 357.4, 69.5);
        recordBezierCurveTo(vaulter, ctx, 359.3, 70.6, 361.2, 70.3, 362.2, 69.5);
        recordBezierCurveTo(vaulter, ctx, 363.8, 68.2, 365.3, 66.2, 365.8, 64.4);
        recordBezierCurveTo(vaulter, ctx, 366.1, 63.6, 363.7, 59.5, 361.0, 56.2);
        recordBezierCurveTo(vaulter, ctx, 359.0, 53.9, 357.2, 51.9, 355.9, 49.9);
        recordBezierCurveTo(vaulter, ctx, 354.8, 48.3, 354.2, 45.6, 353.3, 43.7);
        recordBezierCurveTo(vaulter, ctx, 352.4, 41.7, 350.5, 40.0, 349.6, 39.6);
        recordBezierCurveTo(vaulter, ctx, 347.6, 38.5, 343.7, 40.0, 340.8, 43.2);
        recordBezierCurveTo(vaulter, ctx, 337.9, 46.4, 337.9, 49.6, 341.0, 53.1);
        ctx.closePath();
        ctx.fill();
        ctx.stroke();

        // vaulter/Path
        ctx.beginPath();
        recordMoveTo(vaulter, ctx, 365.0, 62.1);
        recordBezierCurveTo(vaulter, ctx, 365.0, 62.1, 367.5, 62.9, 368.5, 68.6);
        recordBezierCurveTo(vaulter, ctx, 369.3, 73.5, 369.3, 75.2, 368.6, 78.2);
        recordBezierCurveTo(vaulter, ctx, 367.8, 81.2, 369.9, 85.6, 369.9, 85.6);
        recordBezierCurveTo(vaulter, ctx, 372.3, 84.1, 373.4, 83.2, 385.1, 84.4);
        recordBezierCurveTo(vaulter, ctx, 385.1, 84.4, 385.7, 82.1, 387.0, 81.9);
        recordBezierCurveTo(vaulter, ctx, 388.4, 81.8, 391.3, 82.6, 391.4, 85.4);
        recordBezierCurveTo(vaulter, ctx, 391.4, 88.1, 392.7, 93.9, 393.3, 95.1);
        recordBezierCurveTo(vaulter, ctx, 394.0, 96.2, 394.9, 99.0, 394.3, 99.7);
        recordBezierCurveTo(vaulter, ctx, 393.6, 100.3, 391.6, 98.8, 391.7, 97.3);
        recordBezierCurveTo(vaulter, ctx, 391.7, 97.3, 386.9, 92.5, 385.7, 88.5);
        recordBezierCurveTo(vaulter, ctx, 385.7, 88.5, 378.6, 89.8, 376.0, 90.6);
        recordBezierCurveTo(vaulter, ctx, 373.4, 91.3, 368.5, 94.5, 365.4, 93.3);
        recordBezierCurveTo(vaulter, ctx, 362.2, 92.1, 355.3, 79.1, 358.1, 68.8);
        ctx.fill();
        ctx.stroke();

        // vaulter/Path
        ctx.beginPath();
        recordMoveTo(vaulter, ctx, 341.2, 47.3);
        recordBezierCurveTo(vaulter, ctx, 341.2, 47.3, 338.4, 48.2, 334.0, 48.5);
        recordBezierCurveTo(vaulter, ctx, 329.6, 48.9, 324.9, 45.4, 325.2, 40.7);
        recordBezierCurveTo(vaulter, ctx, 325.4, 35.7, 330.4, 33.6, 334.2, 34.2);
        recordBezierCurveTo(vaulter, ctx, 338.2, 34.9, 344.7, 39.0, 344.7, 39.0);
        ctx.fill();
        ctx.stroke();

        // vaulter/Path
        ctx.beginPath();
        recordMoveTo(vaulter, ctx, 356.1, 68.7);
        recordBezierCurveTo(vaulter, ctx, 356.1, 68.7, 359.0, 79.4, 360.6, 82.2);
        recordBezierCurveTo(vaulter, ctx, 362.1, 85.0, 363.2, 88.3, 366.0, 90.6);
        recordBezierCurveTo(vaulter, ctx, 366.0, 90.6, 372.1, 99.2, 379.6, 105.1);
        recordBezierCurveTo(vaulter, ctx, 379.9, 109.6, 380.0, 114.0, 380.9, 117.0);
        recordBezierCurveTo(vaulter, ctx, 380.9, 117.0, 380.9, 119.3, 382.0, 119.6);
        recordBezierCurveTo(vaulter, ctx, 383.1, 119.7, 384.9, 115.1, 384.6, 111.4);
        recordBezierCurveTo(vaulter, ctx, 384.4, 107.8, 385.5, 105.2, 385.7, 104.3);
        recordBezierCurveTo(vaulter, ctx, 386.0, 103.4, 385.1, 100.9, 384.0, 100.9);
        recordBezierCurveTo(vaulter, ctx, 382.9, 100.9, 382.1, 100.2, 381.4, 101.8);
        recordBezierCurveTo(vaulter, ctx, 376.3, 95.5, 375.6, 92.0, 370.9, 87.3);
        recordBezierCurveTo(vaulter, ctx, 371.0, 83.3, 370.5, 74.1, 365.8, 64.4);
        ctx.fill();
        ctx.stroke();

        // vaulter/Path
        ctx.beginPath();
        recordMoveTo(vaulter, ctx, 348.3, 42.0);
        recordBezierCurveTo(vaulter, ctx, 347.3, 40.7, 345.3, 39.5, 340.9, 39.5);
        recordBezierCurveTo(vaulter, ctx, 339.3, 39.5, 334.5, 39.2, 334.5, 39.2);
        recordBezierCurveTo(vaulter, ctx, 334.5, 39.2, 332.4, 39.4, 331.0, 39.4);
        recordBezierCurveTo(vaulter, ctx, 329.5, 39.4, 325.9, 39.2, 324.1, 39.7);
        recordBezierCurveTo(vaulter, ctx, 319.0, 38.8, 315.2, 41.7, 306.1, 45.8);
        recordBezierCurveTo(vaulter, ctx, 306.1, 45.8, 304.9, 46.5, 303.7, 48.7);
        recordBezierCurveTo(vaulter, ctx, 302.9, 50.0, 300.4, 55.5, 300.4, 55.5);
        recordBezierCurveTo(vaulter, ctx, 300.4, 55.5, 300.1, 57.1, 300.5, 57.5);
        recordBezierCurveTo(vaulter, ctx, 300.9, 58.0, 303.3, 57.0, 303.4, 56.3);
        recordBezierCurveTo(vaulter, ctx, 304.0, 53.5, 304.7, 52.5, 305.3, 52.0);
        recordBezierCurveTo(vaulter, ctx, 305.2, 52.6, 305.2, 53.2, 305.0, 53.6);
        recordBezierCurveTo(vaulter, ctx, 304.6, 54.1, 305.0, 55.3, 305.4, 55.2);
        recordBezierCurveTo(vaulter, ctx, 305.9, 55.2, 306.3, 54.4, 306.2, 54.0);
        recordBezierCurveTo(vaulter, ctx, 306.2, 53.7, 306.9, 52.7, 307.2, 51.8);
        recordBezierCurveTo(vaulter, ctx, 307.4, 51.1, 307.2, 49.7, 307.1, 49.2);
        recordBezierCurveTo(vaulter, ctx, 307.0, 48.8, 306.7, 48.4, 306.7, 48.4);
        recordBezierCurveTo(vaulter, ctx, 314.5, 46.5, 318.7, 45.1, 323.9, 45.5);
        recordBezierCurveTo(vaulter, ctx, 327.1, 45.8, 335.6, 46.9, 335.6, 46.9);
        recordBezierCurveTo(vaulter, ctx, 335.6, 46.9, 343.6, 49.8, 345.1, 49.4);
        ctx.fill();
        ctx.stroke();
        ctx.restore();
      }
    },

    function (ctx) {
      if (vaulter.visible) {

        // vaulter/Path
        ctx.save();
        ctx.beginPath();
        recordMoveTo(vaulter, ctx, 350.4, 67.6);
        recordBezierCurveTo(vaulter, ctx, 349.9, 65.9, 346.8, 63.0, 343.7, 60.9);
        recordBezierCurveTo(vaulter, ctx, 342.1, 57.9, 339.4, 52.1, 336.1, 49.1);
        recordBezierCurveTo(vaulter, ctx, 336.1, 49.1, 330.1, 41.3, 325.8, 36.2);
        recordBezierCurveTo(vaulter, ctx, 325.8, 36.2, 320.8, 29.2, 318.4, 30.4);
        recordBezierCurveTo(vaulter, ctx, 318.4, 30.4, 317.1, 30.3, 317.3, 30.7);
        recordBezierCurveTo(vaulter, ctx, 317.4, 31.2, 317.1, 31.6, 317.1, 31.8);
        recordBezierCurveTo(vaulter, ctx, 317.0, 32.0, 317.2, 32.2, 317.2, 32.6);
        recordBezierCurveTo(vaulter, ctx, 317.2, 33.2, 317.9, 33.3, 317.9, 33.3);
        recordLineTo(vaulter, ctx, 319.4, 34.8);
        recordBezierCurveTo(vaulter, ctx, 319.4, 34.8, 319.4, 34.8, 319.3, 35.0);
        recordBezierCurveTo(vaulter, ctx, 319.3, 35.5, 320.0, 36.3, 321.0, 36.6);
        recordBezierCurveTo(vaulter, ctx, 322.0, 36.9, 322.5, 36.7, 323.6, 37.1);
        recordBezierCurveTo(vaulter, ctx, 323.6, 37.1, 328.7, 47.9, 332.5, 52.2);
        recordBezierCurveTo(vaulter, ctx, 332.5, 52.2, 334.3, 55.7, 336.0, 58.2);
        recordBezierCurveTo(vaulter, ctx, 337.7, 60.5, 339.1, 62.7, 339.1, 62.7);
        recordBezierCurveTo(vaulter, ctx, 339.1, 62.7, 339.0, 66.0, 341.9, 71.2);
        recordBezierCurveTo(vaulter, ctx, 343.7, 74.2, 347.2, 73.3, 348.4, 72.7);
        recordBezierCurveTo(vaulter, ctx, 350.9, 71.3, 350.9, 69.2, 350.4, 67.6);
        ctx.closePath();
        ctx.fillStyle = "rgb(17, 92, 137)";
        ctx.fill();
        ctx.lineWidth = 0.5;
        ctx.strokeStyle = "rgb(141, 204, 255)";
        ctx.lineJoin = "miter";
        ctx.miterLimit = 4.0;
        ctx.stroke();

        // vaulter/Path
        ctx.beginPath();
        recordMoveTo(vaulter, ctx, 293.0, 342.2);
        recordLineTo(vaulter, ctx, 289.1, 76.4);
        recordBezierCurveTo(vaulter, ctx, 289.1, 76.4, 289.2, 75.4, 290.1, 75.4);
        recordBezierCurveTo(vaulter, ctx, 290.9, 75.3, 291.1, 76.4, 291.1, 76.4);
        recordLineTo(vaulter, ctx, 295.0, 342.2);
        recordLineTo(vaulter, ctx, 293.0, 342.2);
        ctx.closePath();
        ctx.fill();
        ctx.stroke();

        // vaulter/Path
        ctx.beginPath();
        recordMoveTo(vaulter, ctx, 337.0, 72.9);
        recordBezierCurveTo(vaulter, ctx, 337.0, 72.9, 337.2, 82.5, 338.4, 89.2);
        recordBezierCurveTo(vaulter, ctx, 338.8, 91.6, 339.9, 94.4, 340.4, 95.8);
        recordBezierCurveTo(vaulter, ctx, 341.3, 97.9, 343.0, 98.8, 344.3, 98.7);
        recordBezierCurveTo(vaulter, ctx, 346.4, 98.6, 348.8, 97.8, 350.2, 96.8);
        recordBezierCurveTo(vaulter, ctx, 350.9, 96.3, 351.5, 91.5, 351.2, 87.2);
        recordBezierCurveTo(vaulter, ctx, 351.1, 84.2, 350.8, 81.6, 350.9, 79.2);
        recordBezierCurveTo(vaulter, ctx, 351.0, 77.2, 352.1, 74.7, 352.6, 72.6);
        recordBezierCurveTo(vaulter, ctx, 353.0, 70.6, 352.5, 68.0, 352.0, 67.2);
        recordBezierCurveTo(vaulter, ctx, 351.1, 65.1, 347.1, 64.0, 342.8, 64.8);
        recordBezierCurveTo(vaulter, ctx, 338.5, 65.7, 336.7, 68.2, 337.0, 72.9);
        ctx.closePath();
        ctx.fill();
        ctx.stroke();

        // vaulter/Path
        ctx.beginPath();
        recordMoveTo(vaulter, ctx, 351.1, 90.1);
        recordBezierCurveTo(vaulter, ctx, 351.1, 90.1, 353.8, 91.3, 354.2, 96.2);
        recordBezierCurveTo(vaulter, ctx, 354.2, 96.2, 355.6, 98.2, 356.5, 101.2);
        recordBezierCurveTo(vaulter, ctx, 357.5, 104.1, 359.6, 107.6, 359.6, 107.6);
        recordBezierCurveTo(vaulter, ctx, 361.6, 105.6, 367.9, 103.7, 373.3, 100.7);
        recordBezierCurveTo(vaulter, ctx, 373.3, 100.7, 373.7, 98.7, 374.8, 98.0);
        recordBezierCurveTo(vaulter, ctx, 376.0, 97.2, 378.0, 96.2, 379.3, 98.7);
        recordBezierCurveTo(vaulter, ctx, 380.6, 101.1, 384.4, 105.7, 385.5, 106.4);
        recordBezierCurveTo(vaulter, ctx, 386.6, 107.1, 388.8, 109.2, 388.5, 110.1);
        recordBezierCurveTo(vaulter, ctx, 388.1, 110.9, 385.7, 110.5, 385.1, 109.1);
        recordBezierCurveTo(vaulter, ctx, 385.1, 109.1, 378.7, 107.1, 375.8, 104.0);
        recordBezierCurveTo(vaulter, ctx, 375.8, 104.0, 370.0, 108.5, 368.0, 110.4);
        recordBezierCurveTo(vaulter, ctx, 366.1, 112.2, 361.4, 114.4, 358.0, 114.8);
        recordBezierCurveTo(vaulter, ctx, 354.7, 115.2, 344.4, 108.4, 342.1, 98.0);
        ctx.fill();
        ctx.stroke();

        // vaulter/Path
        ctx.beginPath();
        recordMoveTo(vaulter, ctx, 340.1, 67.2);
        recordBezierCurveTo(vaulter, ctx, 340.1, 67.2, 338.8, 66.1, 336.9, 64.2);
        recordBezierCurveTo(vaulter, ctx, 336.3, 63.6, 335.6, 62.8, 334.9, 62.0);
        recordBezierCurveTo(vaulter, ctx, 332.1, 58.6, 332.3, 52.7, 336.3, 50.2);
        recordBezierCurveTo(vaulter, ctx, 340.5, 47.6, 345.1, 50.4, 346.8, 54.0);
        recordBezierCurveTo(vaulter, ctx, 347.7, 55.7, 346.5, 58.9, 346.8, 61.3);
        recordBezierCurveTo(vaulter, ctx, 347.1, 63.8, 348.9, 65.3, 348.9, 65.3);
        ctx.fill();
        ctx.stroke();

        // vaulter/Path
        ctx.beginPath();
        recordMoveTo(vaulter, ctx, 342.1, 98.0);
        recordBezierCurveTo(vaulter, ctx, 342.1, 98.0, 344.7, 105.7, 346.5, 108.4);
        recordBezierCurveTo(vaulter, ctx, 348.3, 111.0, 349.4, 113.7, 351.3, 114.7);
        recordBezierCurveTo(vaulter, ctx, 351.9, 115.0, 353.1, 116.0, 355.2, 116.2);
        recordBezierCurveTo(vaulter, ctx, 360.1, 116.7, 369.8, 116.4, 375.1, 114.1);
        recordBezierCurveTo(vaulter, ctx, 379.0, 116.1, 382.9, 118.3, 386.0, 119.1);
        recordBezierCurveTo(vaulter, ctx, 386.0, 119.1, 388.0, 120.3, 388.7, 119.4);
        recordBezierCurveTo(vaulter, ctx, 389.4, 118.6, 386.3, 114.7, 383.1, 113.0);
        recordBezierCurveTo(vaulter, ctx, 379.8, 111.3, 378.2, 109.0, 377.5, 108.4);
        recordBezierCurveTo(vaulter, ctx, 376.8, 107.7, 374.3, 107.2, 373.7, 108.1);
        recordBezierCurveTo(vaulter, ctx, 373.1, 109.1, 372.1, 109.5, 373.2, 110.8);
        recordBezierCurveTo(vaulter, ctx, 365.1, 112.0, 362.9, 109.3, 357.9, 110.0);
        recordBezierCurveTo(vaulter, ctx, 357.6, 106.0, 355.5, 101.8, 351.2, 92.7);
        ctx.fill();
        ctx.stroke();

        // vaulter/Path
        ctx.beginPath();
        recordMoveTo(vaulter, ctx, 349.8, 71.9);
        recordBezierCurveTo(vaulter, ctx, 350.7, 70.5, 351.9, 67.9, 348.4, 62.9);
        recordBezierCurveTo(vaulter, ctx, 347.5, 61.6, 345.0, 57.4, 345.0, 57.4);
        recordBezierCurveTo(vaulter, ctx, 345.0, 57.4, 343.8, 55.8, 342.9, 54.6);
        recordBezierCurveTo(vaulter, ctx, 342.1, 53.4, 340.2, 50.3, 338.8, 49.1);
        recordBezierCurveTo(vaulter, ctx, 336.7, 44.4, 334.6, 42.0, 328.2, 34.4);
        recordBezierCurveTo(vaulter, ctx, 328.2, 34.4, 327.4, 34.1, 325.8, 32.2);
        recordBezierCurveTo(vaulter, ctx, 324.8, 31.1, 320.4, 26.9, 320.4, 26.9);
        recordBezierCurveTo(vaulter, ctx, 320.4, 26.9, 319.0, 26.1, 318.4, 26.3);
        recordBezierCurveTo(vaulter, ctx, 317.9, 26.6, 318.1, 29.2, 318.6, 29.5);
        recordBezierCurveTo(vaulter, ctx, 321.1, 31.0, 321.6, 31.3, 321.9, 32.0);
        recordBezierCurveTo(vaulter, ctx, 321.3, 31.8, 321.4, 31.8, 321.2, 31.5);
        recordBezierCurveTo(vaulter, ctx, 320.8, 31.0, 319.7, 30.6, 319.6, 31.1);
        recordBezierCurveTo(vaulter, ctx, 319.5, 31.5, 320.2, 32.1, 320.5, 32.2);
        recordBezierCurveTo(vaulter, ctx, 320.8, 32.3, 321.6, 33.2, 322.3, 33.8);
        recordBezierCurveTo(vaulter, ctx, 322.9, 34.3, 323.7, 35.2, 324.3, 35.3);
        recordBezierCurveTo(vaulter, ctx, 324.7, 35.3, 325.9, 35.6, 325.9, 35.6);
        recordBezierCurveTo(vaulter, ctx, 329.8, 42.6, 331.3, 47.7, 333.9, 52.2);
        recordBezierCurveTo(vaulter, ctx, 335.5, 55.0, 339.3, 62.6, 339.3, 62.6);
        recordBezierCurveTo(vaulter, ctx, 339.3, 62.6, 341.5, 70.9, 342.6, 71.9);
        recordBezierCurveTo(vaulter, ctx, 345.0, 73.9, 348.9, 73.4, 349.8, 71.9);
        ctx.closePath();
        ctx.fill();
        ctx.stroke();
        ctx.restore();
      }
    },

    function (ctx) {
      if (vaulter.visible) {

        // vaulter/Path
        ctx.save();
        ctx.beginPath();
        recordMoveTo(vaulter, ctx, 356.9, 87.5);
        recordBezierCurveTo(vaulter, ctx, 356.7, 85.8, 354.3, 82.3, 351.7, 79.6);
        recordBezierCurveTo(vaulter, ctx, 350.7, 76.4, 349.2, 70.2, 346.6, 66.6);
        recordBezierCurveTo(vaulter, ctx, 346.6, 66.6, 342.3, 57.8, 339.1, 51.9);
        recordBezierCurveTo(vaulter, ctx, 339.1, 51.9, 335.5, 44.1, 333.0, 44.8);
        recordBezierCurveTo(vaulter, ctx, 333.0, 44.8, 331.7, 44.4, 331.7, 44.9);
        recordBezierCurveTo(vaulter, ctx, 331.8, 45.4, 331.5, 45.7, 331.4, 45.9);
        recordBezierCurveTo(vaulter, ctx, 331.3, 46.1, 331.4, 46.3, 331.3, 46.7);
        recordBezierCurveTo(vaulter, ctx, 331.2, 47.3, 331.8, 47.5, 331.8, 47.5);
        recordLineTo(vaulter, ctx, 333.1, 49.2);
        recordBezierCurveTo(vaulter, ctx, 333.1, 49.2, 333.0, 49.2, 332.9, 49.5);
        recordBezierCurveTo(vaulter, ctx, 332.8, 49.9, 333.4, 50.9, 334.2, 51.3);
        recordBezierCurveTo(vaulter, ctx, 335.1, 51.8, 335.7, 51.8, 336.7, 52.3);
        recordBezierCurveTo(vaulter, ctx, 336.7, 52.3, 339.5, 64.0, 342.4, 68.9);
        recordBezierCurveTo(vaulter, ctx, 342.4, 68.9, 343.5, 72.8, 344.7, 75.5);
        recordBezierCurveTo(vaulter, ctx, 345.9, 78.1, 346.8, 80.6, 346.8, 80.6);
        recordBezierCurveTo(vaulter, ctx, 346.8, 80.6, 346.0, 83.7, 347.9, 89.4);
        recordBezierCurveTo(vaulter, ctx, 349.0, 92.7, 352.7, 92.5, 353.9, 92.2);
        recordBezierCurveTo(vaulter, ctx, 356.7, 91.3, 357.1, 89.3, 356.9, 87.5);
        ctx.closePath();
        ctx.fillStyle = "rgb(17, 92, 137)";
        ctx.fill();
        ctx.lineWidth = 0.5;
        ctx.strokeStyle = "rgb(141, 204, 255)";
        ctx.lineJoin = "miter";
        ctx.miterLimit = 4.0;
        ctx.stroke();

        // vaulter/Path
        ctx.beginPath();
        recordMoveTo(vaulter, ctx, 293.0, 342.2);
        recordLineTo(vaulter, ctx, 291.3, 76.4);
        recordBezierCurveTo(vaulter, ctx, 291.3, 76.4, 291.5, 75.4, 292.3, 75.4);
        recordBezierCurveTo(vaulter, ctx, 293.1, 75.4, 293.3, 76.4, 293.3, 76.4);
        recordLineTo(vaulter, ctx, 295.0, 342.2);
        recordLineTo(vaulter, ctx, 293.0, 342.2);
        ctx.closePath();
        ctx.fill();
        ctx.stroke();

        // vaulter/Path
        ctx.beginPath();
        recordMoveTo(vaulter, ctx, 355.6, 110.3);
        recordBezierCurveTo(vaulter, ctx, 356.2, 111.0, 357.5, 111.5, 359.0, 113.3);
        recordBezierCurveTo(vaulter, ctx, 362.1, 117.1, 360.8, 118.3, 362.6, 120.3);
        recordBezierCurveTo(vaulter, ctx, 364.8, 122.5, 366.8, 126.6, 366.8, 126.6);
        recordBezierCurveTo(vaulter, ctx, 368.9, 124.5, 375.1, 121.9, 380.3, 117.5);
        recordBezierCurveTo(vaulter, ctx, 380.3, 117.5, 380.3, 115.5, 381.4, 114.6);
        recordBezierCurveTo(vaulter, ctx, 382.4, 113.7, 384.2, 112.4, 385.9, 114.6);
        recordBezierCurveTo(vaulter, ctx, 387.6, 116.8, 392.1, 120.7, 393.3, 121.2);
        recordBezierCurveTo(vaulter, ctx, 394.5, 121.7, 396.9, 123.4, 396.8, 124.3);
        recordBezierCurveTo(vaulter, ctx, 396.6, 125.3, 394.1, 125.2, 393.3, 123.9);
        recordBezierCurveTo(vaulter, ctx, 393.3, 123.9, 386.6, 123.0, 383.3, 120.4);
        recordBezierCurveTo(vaulter, ctx, 383.3, 120.4, 378.3, 125.7, 376.6, 127.9);
        recordBezierCurveTo(vaulter, ctx, 375.0, 130.1, 370.4, 133.7, 367.1, 134.6);
        recordBezierCurveTo(vaulter, ctx, 363.9, 135.6, 350.2, 127.8, 346.3, 117.9);
        ctx.fill();
        ctx.stroke();

        // vaulter/Path
        ctx.beginPath();
        recordMoveTo(vaulter, ctx, 347.3, 84.9);
        recordBezierCurveTo(vaulter, ctx, 347.3, 84.9, 346.4, 83.5, 345.2, 81.1);
        recordBezierCurveTo(vaulter, ctx, 344.9, 80.3, 344.5, 79.4, 344.1, 78.4);
        recordBezierCurveTo(vaulter, ctx, 342.5, 74.3, 344.5, 68.8, 349.1, 67.7);
        recordBezierCurveTo(vaulter, ctx, 353.9, 66.5, 357.4, 70.7, 357.9, 74.5);
        recordBezierCurveTo(vaulter, ctx, 358.1, 76.5, 356.0, 79.2, 355.5, 81.5);
        recordBezierCurveTo(vaulter, ctx, 355.0, 83.9, 356.2, 86.0, 356.2, 86.0);
        ctx.fill();
        ctx.stroke();

        // vaulter/Path
        ctx.beginPath();
        recordMoveTo(vaulter, ctx, 342.1, 93.4);
        recordBezierCurveTo(vaulter, ctx, 342.3, 96.6, 344.2, 100.8, 344.1, 107.7);
        recordBezierCurveTo(vaulter, ctx, 344.0, 112.8, 344.7, 113.9, 345.0, 115.5);
        recordBezierCurveTo(vaulter, ctx, 345.6, 118.8, 346.3, 119.2, 350.5, 119.3);
        recordBezierCurveTo(vaulter, ctx, 354.8, 119.4, 355.6, 117.9, 356.7, 115.7);
        recordBezierCurveTo(vaulter, ctx, 357.3, 114.5, 356.1, 108.6, 357.3, 104.5);
        recordBezierCurveTo(vaulter, ctx, 358.1, 101.6, 359.1, 93.7, 359.1, 91.3);
        recordBezierCurveTo(vaulter, ctx, 359.2, 89.3, 357.4, 86.9, 356.9, 85.8);
        recordBezierCurveTo(vaulter, ctx, 355.9, 83.8, 352.7, 83.6, 348.4, 84.4);
        recordBezierCurveTo(vaulter, ctx, 344.8, 85.1, 341.9, 90.1, 342.1, 93.4);
        ctx.closePath();
        ctx.fill();
        ctx.stroke();

        // vaulter/Path
        ctx.beginPath();
        recordMoveTo(vaulter, ctx, 345.5, 116.9);
        recordBezierCurveTo(vaulter, ctx, 345.5, 116.9, 349.9, 125.0, 352.1, 127.3);
        recordBezierCurveTo(vaulter, ctx, 354.3, 129.6, 355.8, 132.1, 357.9, 132.8);
        recordBezierCurveTo(vaulter, ctx, 358.5, 133.0, 359.8, 133.8, 362.0, 133.7);
        recordBezierCurveTo(vaulter, ctx, 366.9, 133.4, 376.5, 128.6, 380.5, 124.5);
        recordBezierCurveTo(vaulter, ctx, 385.0, 125.0, 389.4, 125.7, 392.5, 125.3);
        recordBezierCurveTo(vaulter, ctx, 392.5, 125.3, 394.8, 125.6, 395.2, 124.6);
        recordBezierCurveTo(vaulter, ctx, 395.6, 123.5, 391.3, 121.0, 387.6, 120.6);
        recordBezierCurveTo(vaulter, ctx, 384.0, 120.3, 381.6, 118.7, 380.7, 118.4);
        recordBezierCurveTo(vaulter, ctx, 379.9, 118.0, 377.4, 118.4, 377.1, 119.5);
        recordBezierCurveTo(vaulter, ctx, 376.9, 120.3, 376.8, 120.8, 376.1, 121.3);
        recordBezierCurveTo(vaulter, ctx, 369.1, 125.3, 368.4, 124.5, 363.7, 126.0);
        recordBezierCurveTo(vaulter, ctx, 362.7, 122.1, 362.0, 119.9, 356.2, 111.7);
        ctx.fill();
        ctx.stroke();

        // vaulter/Path
        ctx.beginPath();
        recordMoveTo(vaulter, ctx, 357.2, 87.9);
        recordBezierCurveTo(vaulter, ctx, 357.2, 86.6, 356.9, 84.8, 355.9, 82.5);
        recordBezierCurveTo(vaulter, ctx, 355.3, 81.1, 353.7, 76.5, 353.7, 76.5);
        recordBezierCurveTo(vaulter, ctx, 353.7, 76.5, 352.8, 74.7, 352.2, 73.3);
        recordBezierCurveTo(vaulter, ctx, 351.6, 72.0, 350.4, 68.6, 349.2, 67.2);
        recordBezierCurveTo(vaulter, ctx, 348.1, 62.1, 346.6, 59.3, 341.7, 50.6);
        recordBezierCurveTo(vaulter, ctx, 341.7, 50.6, 341.1, 50.1, 339.8, 48.0);
        recordBezierCurveTo(vaulter, ctx, 339.1, 46.7, 335.6, 41.8, 335.6, 41.8);
        recordBezierCurveTo(vaulter, ctx, 335.6, 41.8, 334.4, 40.7, 333.8, 40.8);
        recordBezierCurveTo(vaulter, ctx, 333.2, 40.9, 332.9, 43.5, 333.3, 44.0);
        recordBezierCurveTo(vaulter, ctx, 335.5, 45.8, 335.8, 46.3, 336.0, 47.0);
        recordBezierCurveTo(vaulter, ctx, 335.5, 46.7, 335.6, 46.7, 335.4, 46.4);
        recordBezierCurveTo(vaulter, ctx, 335.1, 45.8, 334.1, 45.2, 334.0, 45.7);
        recordBezierCurveTo(vaulter, ctx, 333.8, 46.1, 334.3, 46.8, 334.6, 46.9);
        recordBezierCurveTo(vaulter, ctx, 334.9, 47.1, 335.5, 48.2, 336.1, 48.9);
        recordBezierCurveTo(vaulter, ctx, 336.5, 49.4, 337.2, 50.5, 337.7, 50.7);
        recordBezierCurveTo(vaulter, ctx, 338.1, 50.9, 339.2, 51.4, 339.2, 51.4);
        recordBezierCurveTo(vaulter, ctx, 341.7, 59.0, 342.1, 64.3, 343.8, 69.2);
        recordBezierCurveTo(vaulter, ctx, 344.8, 72.3, 347.0, 80.5, 347.0, 80.5);
        recordBezierCurveTo(vaulter, ctx, 347.0, 80.5, 347.5, 89.0, 348.4, 90.2);
        ctx.fill();
        ctx.stroke();
        ctx.restore();
      }
    },

    function (ctx) {
      if (vaulter.visible) {

        // vaulter/Path
        ctx.save();
        ctx.beginPath();
        recordMoveTo(vaulter, ctx, 363.9, 102.2);
        recordBezierCurveTo(vaulter, ctx, 364.1, 100.5, 362.3, 96.7, 360.3, 93.7);
        recordBezierCurveTo(vaulter, ctx, 359.8, 90.4, 359.3, 84.2, 357.5, 80.3);
        recordBezierCurveTo(vaulter, ctx, 357.5, 80.3, 354.7, 71.0, 352.6, 64.8);
        recordBezierCurveTo(vaulter, ctx, 352.6, 64.8, 350.5, 56.7, 347.9, 57.0);
        recordBezierCurveTo(vaulter, ctx, 347.9, 57.0, 346.8, 56.4, 346.7, 56.8);
        recordBezierCurveTo(vaulter, ctx, 346.7, 57.3, 346.3, 57.5, 346.2, 57.7);
        recordBezierCurveTo(vaulter, ctx, 346.1, 57.9, 346.2, 58.1, 346.0, 58.5);
        recordBezierCurveTo(vaulter, ctx, 345.8, 59.0, 346.4, 59.4, 346.4, 59.4);
        recordLineTo(vaulter, ctx, 347.3, 61.3);
        recordBezierCurveTo(vaulter, ctx, 347.3, 61.3, 347.2, 61.2, 347.1, 61.5);
        recordBezierCurveTo(vaulter, ctx, 346.9, 61.8, 347.3, 62.9, 348.1, 63.5);
        recordBezierCurveTo(vaulter, ctx, 348.9, 64.1, 349.4, 64.1, 350.3, 64.8);
        recordBezierCurveTo(vaulter, ctx, 350.3, 64.8, 351.1, 76.6, 353.0, 81.9);
        recordBezierCurveTo(vaulter, ctx, 353.0, 81.9, 353.5, 85.7, 354.2, 88.5);
        recordBezierCurveTo(vaulter, ctx, 354.8, 91.3, 355.3, 93.8, 355.3, 93.8);
        recordBezierCurveTo(vaulter, ctx, 355.3, 93.8, 354.1, 96.7, 354.9, 102.5);
        recordBezierCurveTo(vaulter, ctx, 355.4, 105.9, 359.0, 106.4, 360.3, 106.2);
        recordBezierCurveTo(vaulter, ctx, 363.1, 105.8, 363.8, 103.9, 363.9, 102.2);
        ctx.closePath();
        ctx.fillStyle = "rgb(17, 92, 137)";
        ctx.fill();
        ctx.lineWidth = 0.5;
        ctx.strokeStyle = "rgb(141, 204, 255)";
        ctx.lineJoin = "miter";
        ctx.miterLimit = 4.0;
        ctx.stroke();

        // vaulter/Path
        ctx.beginPath();
        recordMoveTo(vaulter, ctx, 293.0, 342.2);
        recordLineTo(vaulter, ctx, 292.4, 76.4);
        recordBezierCurveTo(vaulter, ctx, 292.4, 76.4, 292.6, 75.4, 293.4, 75.4);
        recordBezierCurveTo(vaulter, ctx, 294.3, 75.4, 294.4, 76.4, 294.4, 76.4);
        recordLineTo(vaulter, ctx, 295.0, 342.2);
        recordLineTo(vaulter, ctx, 293.0, 342.2);
        ctx.closePath();
        ctx.fill();
        ctx.stroke();

        // vaulter/Path
        ctx.beginPath();
        recordMoveTo(vaulter, ctx, 358.5, 125.1);
        recordBezierCurveTo(vaulter, ctx, 359.1, 125.8, 359.8, 126.9, 360.7, 128.4);
        recordBezierCurveTo(vaulter, ctx, 362.3, 131.0, 362.6, 132.9, 363.3, 135.9);
        recordBezierCurveTo(vaulter, ctx, 364.0, 138.8, 366.1, 142.2, 366.1, 142.2);
        recordBezierCurveTo(vaulter, ctx, 369.0, 139.8, 375.8, 138.2, 381.5, 135.1);
        recordBezierCurveTo(vaulter, ctx, 381.5, 135.1, 381.9, 133.2, 383.0, 132.4);
        recordBezierCurveTo(vaulter, ctx, 384.2, 131.7, 386.2, 130.7, 387.4, 133.2);
        recordBezierCurveTo(vaulter, ctx, 388.7, 135.5, 392.4, 140.1, 393.5, 140.8);
        recordBezierCurveTo(vaulter, ctx, 394.5, 141.4, 396.6, 143.5, 396.3, 144.4);
        recordBezierCurveTo(vaulter, ctx, 396.0, 145.3, 393.6, 144.8, 393.0, 143.4);
        recordBezierCurveTo(vaulter, ctx, 393.0, 143.4, 386.7, 141.4, 383.9, 138.4);
        recordBezierCurveTo(vaulter, ctx, 383.9, 138.4, 378.2, 142.6, 376.3, 144.5);
        recordBezierCurveTo(vaulter, ctx, 374.3, 146.3, 367.6, 149.0, 364.3, 149.3);
        recordBezierCurveTo(vaulter, ctx, 361.0, 149.7, 350.8, 140.0, 348.7, 129.8);
        ctx.fill();
        ctx.stroke();

        // vaulter/Path
        ctx.beginPath();
        recordMoveTo(vaulter, ctx, 355.3, 98.0);
        recordBezierCurveTo(vaulter, ctx, 355.3, 98.0, 354.6, 96.5, 353.9, 94.0);
        recordBezierCurveTo(vaulter, ctx, 353.7, 93.1, 353.5, 92.2, 353.3, 91.2);
        recordBezierCurveTo(vaulter, ctx, 352.4, 86.9, 355.3, 82.0, 359.9, 81.7);
        recordBezierCurveTo(vaulter, ctx, 364.8, 81.3, 367.4, 85.9, 367.2, 89.8);
        recordBezierCurveTo(vaulter, ctx, 367.2, 91.6, 364.6, 93.9, 363.8, 96.0);
        recordBezierCurveTo(vaulter, ctx, 362.9, 98.3, 363.8, 100.5, 363.8, 100.5);
        ctx.fill();
        ctx.stroke();

        // vaulter/Path
        ctx.beginPath();
        recordMoveTo(vaulter, ctx, 348.6, 105.4);
        recordBezierCurveTo(vaulter, ctx, 348.3, 108.5, 349.4, 112.9, 348.2, 119.5);
        recordBezierCurveTo(vaulter, ctx, 347.2, 124.5, 347.7, 125.6, 347.8, 127.3);
        recordBezierCurveTo(vaulter, ctx, 347.8, 130.5, 348.4, 131.0, 352.5, 131.8);
        recordBezierCurveTo(vaulter, ctx, 356.6, 132.6, 357.6, 131.3, 359.0, 129.4);
        recordBezierCurveTo(vaulter, ctx, 359.8, 128.3, 359.6, 122.5, 361.5, 118.7);
        recordBezierCurveTo(vaulter, ctx, 362.8, 116.0, 365.0, 108.5, 365.5, 106.2);
        recordBezierCurveTo(vaulter, ctx, 365.8, 104.3, 364.5, 101.7, 364.2, 100.6);
        recordBezierCurveTo(vaulter, ctx, 363.5, 98.5, 360.5, 97.7, 356.3, 97.8);
        recordBezierCurveTo(vaulter, ctx, 352.6, 97.9, 349.0, 102.2, 348.6, 105.4);
        ctx.closePath();
        ctx.fill();
        ctx.stroke();

        // vaulter/Path
        ctx.beginPath();
        recordMoveTo(vaulter, ctx, 348.0, 128.6);
        recordBezierCurveTo(vaulter, ctx, 348.0, 128.6, 350.9, 137.2, 352.7, 139.9);
        recordBezierCurveTo(vaulter, ctx, 354.4, 142.4, 355.4, 145.1, 357.3, 146.1);
        recordBezierCurveTo(vaulter, ctx, 357.9, 146.4, 359.1, 147.4, 361.1, 147.6);
        recordBezierCurveTo(vaulter, ctx, 365.9, 148.1, 376.0, 145.1, 380.6, 141.9);
        recordBezierCurveTo(vaulter, ctx, 384.8, 143.1, 388.9, 144.5, 392.0, 144.6);
        recordBezierCurveTo(vaulter, ctx, 392.0, 144.6, 394.2, 145.3, 394.7, 144.3);
        recordBezierCurveTo(vaulter, ctx, 395.3, 143.4, 391.5, 140.3, 388.1, 139.3);
        recordBezierCurveTo(vaulter, ctx, 384.6, 138.3, 382.6, 136.4, 381.8, 136.0);
        recordBezierCurveTo(vaulter, ctx, 381.1, 135.5, 378.5, 135.4, 378.1, 136.5);
        recordBezierCurveTo(vaulter, ctx, 377.8, 137.2, 377.7, 137.6, 376.9, 138.0);
        recordBezierCurveTo(vaulter, ctx, 369.4, 140.7, 368.9, 139.8, 364.1, 140.5);
        recordBezierCurveTo(vaulter, ctx, 363.7, 136.5, 363.4, 134.3, 359.2, 125.4);
        ctx.fill();
        ctx.stroke();

        // vaulter/Path
        ctx.beginPath();
        recordMoveTo(vaulter, ctx, 363.9, 103.3);
        recordBezierCurveTo(vaulter, ctx, 364.4, 102.0, 364.5, 100.0, 363.8, 97.2);
        recordBezierCurveTo(vaulter, ctx, 363.4, 95.7, 362.6, 91.0, 362.6, 91.0);
        recordBezierCurveTo(vaulter, ctx, 362.6, 91.0, 362.1, 89.1, 361.7, 87.7);
        recordBezierCurveTo(vaulter, ctx, 361.4, 86.3, 360.8, 82.8, 359.9, 81.3);
        recordBezierCurveTo(vaulter, ctx, 359.6, 76.2, 358.6, 73.2, 355.4, 64.0);
        recordBezierCurveTo(vaulter, ctx, 355.4, 64.0, 354.9, 63.5, 354.0, 61.2);
        recordBezierCurveTo(vaulter, ctx, 353.5, 59.8, 350.9, 54.5, 350.9, 54.5);
        recordBezierCurveTo(vaulter, ctx, 350.9, 54.5, 350.0, 53.2, 349.4, 53.2);
        recordBezierCurveTo(vaulter, ctx, 348.8, 53.2, 348.0, 55.7, 348.4, 56.2);
        recordBezierCurveTo(vaulter, ctx, 350.2, 58.4, 350.5, 58.9, 350.5, 59.6);
        recordBezierCurveTo(vaulter, ctx, 350.1, 59.2, 350.1, 59.3, 350.0, 58.9);
        recordBezierCurveTo(vaulter, ctx, 349.8, 58.3, 349.0, 57.6, 348.7, 57.9);
        recordBezierCurveTo(vaulter, ctx, 348.5, 58.3, 348.9, 59.1, 349.2, 59.3);
        recordBezierCurveTo(vaulter, ctx, 349.4, 59.5, 349.8, 60.6, 350.2, 61.4);
        recordBezierCurveTo(vaulter, ctx, 350.6, 62.0, 351.1, 63.2, 351.5, 63.4);
        recordBezierCurveTo(vaulter, ctx, 351.9, 63.7, 352.9, 64.3, 352.9, 64.3);
        recordBezierCurveTo(vaulter, ctx, 354.0, 72.1, 353.5, 77.3, 354.3, 82.3);
        recordBezierCurveTo(vaulter, ctx, 354.8, 85.5, 355.6, 93.8, 355.6, 93.8);
        recordBezierCurveTo(vaulter, ctx, 355.6, 93.8, 354.6, 102.1, 355.3, 103.4);
        ctx.fill();
        ctx.stroke();
        ctx.restore();
      }
    },

    function (ctx) {
      if (vaulter.visible) {

        // vaulter/Path
        ctx.save();
        ctx.beginPath();
        recordMoveTo(vaulter, ctx, 375.2, 138.0);
        recordBezierCurveTo(vaulter, ctx, 375.7, 136.4, 374.9, 132.4, 373.6, 129.0);
        recordBezierCurveTo(vaulter, ctx, 373.9, 125.8, 375.0, 119.7, 374.1, 115.6);
        recordBezierCurveTo(vaulter, ctx, 374.1, 115.6, 373.4, 104.9, 372.9, 98.5);
        recordBezierCurveTo(vaulter, ctx, 372.9, 98.5, 368.2, 92.3, 366.0, 93.4);
        recordBezierCurveTo(vaulter, ctx, 366.0, 93.4, 364.7, 93.3, 364.8, 93.7);
        recordBezierCurveTo(vaulter, ctx, 365.0, 94.1, 364.7, 94.5, 364.7, 94.7);
        recordBezierCurveTo(vaulter, ctx, 364.6, 94.9, 364.8, 95.1, 364.8, 95.5);
        recordBezierCurveTo(vaulter, ctx, 364.7, 96.1, 365.4, 96.2, 365.4, 96.2);
        recordLineTo(vaulter, ctx, 366.9, 97.6);
        recordBezierCurveTo(vaulter, ctx, 366.9, 97.6, 367.0, 97.6, 367.0, 97.9);
        recordBezierCurveTo(vaulter, ctx, 367.0, 98.0, 365.8, 97.5, 365.9, 98.3);
        recordBezierCurveTo(vaulter, ctx, 366.0, 98.7, 367.7, 99.2, 368.3, 99.4);
        recordBezierCurveTo(vaulter, ctx, 369.3, 99.6, 370.1, 98.3, 370.8, 99.2);
        recordBezierCurveTo(vaulter, ctx, 370.8, 99.2, 368.8, 110.6, 369.5, 116.0);
        recordBezierCurveTo(vaulter, ctx, 369.5, 116.0, 369.0, 119.8, 369.0, 122.7);
        recordBezierCurveTo(vaulter, ctx, 369.0, 125.4, 368.9, 127.9, 368.9, 127.9);
        recordBezierCurveTo(vaulter, ctx, 368.9, 127.9, 367.0, 130.5, 366.5, 136.2);
        recordBezierCurveTo(vaulter, ctx, 366.2, 139.5, 369.5, 140.8, 370.8, 140.9);
        recordBezierCurveTo(vaulter, ctx, 373.5, 141.2, 374.7, 139.5, 375.2, 138.0);
        ctx.closePath();
        ctx.fillStyle = "rgb(17, 92, 137)";
        ctx.fill();
        ctx.lineWidth = 0.5;
        ctx.strokeStyle = "rgb(141, 204, 255)";
        ctx.lineJoin = "miter";
        ctx.miterLimit = 4.0;
        ctx.stroke();

        // vaulter/Path
        ctx.beginPath();
        recordMoveTo(vaulter, ctx, 363.8, 159.8);
        recordBezierCurveTo(vaulter, ctx, 362.4, 164.3, 362.1, 167.6, 360.2, 169.8);
        recordBezierCurveTo(vaulter, ctx, 358.2, 172.1, 356.9, 174.9, 356.9, 174.9);
        recordBezierCurveTo(vaulter, ctx, 359.6, 174.7, 360.6, 175.6, 370.0, 181.7);
        recordBezierCurveTo(vaulter, ctx, 370.0, 181.7, 371.8, 180.9, 373.0, 181.4);
        recordBezierCurveTo(vaulter, ctx, 374.2, 181.9, 376.1, 182.9, 375.0, 185.3);
        recordBezierCurveTo(vaulter, ctx, 373.8, 187.7, 372.3, 193.2, 372.4, 194.5);
        recordBezierCurveTo(vaulter, ctx, 372.5, 195.7, 372.1, 198.6, 371.2, 198.8);
        recordBezierCurveTo(vaulter, ctx, 370.3, 199.1, 369.3, 196.9, 370.0, 195.7);
        recordBezierCurveTo(vaulter, ctx, 370.0, 195.7, 368.0, 189.5, 368.8, 185.5);
        recordBezierCurveTo(vaulter, ctx, 368.8, 185.5, 362.1, 183.5, 359.5, 183.0);
        recordBezierCurveTo(vaulter, ctx, 357.0, 182.6, 351.4, 183.1, 349.3, 180.8);
        recordBezierCurveTo(vaulter, ctx, 347.4, 178.7, 348.0, 165.0, 352.7, 156.4);
        ctx.fill();
        ctx.stroke();

        // vaulter/Path
        ctx.beginPath();
        recordMoveTo(vaulter, ctx, 367.9, 131.4);
        recordBezierCurveTo(vaulter, ctx, 367.9, 131.4, 367.7, 129.6, 367.8, 126.8);
        recordBezierCurveTo(vaulter, ctx, 367.8, 125.8, 367.9, 124.8, 368.1, 123.6);
        recordBezierCurveTo(vaulter, ctx, 368.6, 118.9, 373.3, 114.8, 378.1, 116.0);
        recordBezierCurveTo(vaulter, ctx, 383.3, 117.3, 384.5, 122.9, 383.0, 126.8);
        recordBezierCurveTo(vaulter, ctx, 382.3, 128.8, 378.9, 130.2, 377.3, 132.2);
        recordBezierCurveTo(vaulter, ctx, 375.7, 134.3, 375.8, 136.8, 375.8, 136.8);
        ctx.fill();
        ctx.stroke();

        // vaulter/Path
        ctx.beginPath();
        recordMoveTo(vaulter, ctx, 359.9, 136.6);
        recordBezierCurveTo(vaulter, ctx, 358.6, 139.4, 358.3, 143.9, 355.1, 149.7);
        recordBezierCurveTo(vaulter, ctx, 352.8, 154.0, 352.9, 155.2, 352.4, 156.7);
        recordBezierCurveTo(vaulter, ctx, 351.5, 159.8, 351.9, 160.4, 355.5, 162.4);
        recordBezierCurveTo(vaulter, ctx, 359.0, 164.4, 360.4, 163.5, 362.3, 162.1);
        recordBezierCurveTo(vaulter, ctx, 363.4, 161.3, 364.9, 155.8, 367.8, 152.9);
        recordBezierCurveTo(vaulter, ctx, 369.8, 150.7, 374.2, 144.5, 375.3, 142.5);
        recordBezierCurveTo(vaulter, ctx, 376.2, 140.8, 375.8, 138.0, 375.8, 136.8);
        recordBezierCurveTo(vaulter, ctx, 375.8, 134.6, 373.3, 133.0, 369.3, 131.8);
        recordBezierCurveTo(vaulter, ctx, 365.8, 130.8, 361.1, 133.7, 359.9, 136.6);
        ctx.closePath();
        ctx.fill();
        ctx.stroke();

        // vaulter/Path
        ctx.beginPath();
        recordMoveTo(vaulter, ctx, 352.7, 155.9);
        recordBezierCurveTo(vaulter, ctx, 352.7, 155.9, 349.6, 164.2, 349.3, 167.3);
        recordBezierCurveTo(vaulter, ctx, 349.0, 170.3, 347.8, 176.0, 348.5, 178.0);
        recordBezierCurveTo(vaulter, ctx, 348.8, 178.5, 349.4, 179.0, 350.8, 180.5);
        recordBezierCurveTo(vaulter, ctx, 354.1, 183.8, 362.3, 185.7, 367.8, 186.1);
        recordBezierCurveTo(vaulter, ctx, 370.2, 189.6, 368.9, 194.2, 370.1, 197.0);
        recordBezierCurveTo(vaulter, ctx, 370.1, 197.0, 370.3, 199.2, 371.4, 199.3);
        recordBezierCurveTo(vaulter, ctx, 372.4, 199.5, 373.7, 194.9, 373.2, 191.4);
        recordBezierCurveTo(vaulter, ctx, 372.7, 187.9, 373.6, 185.3, 373.7, 184.4);
        recordBezierCurveTo(vaulter, ctx, 373.9, 183.6, 372.8, 181.5, 371.8, 181.3);
        recordBezierCurveTo(vaulter, ctx, 371.0, 181.2, 369.5, 181.2, 368.7, 181.0);
        recordBezierCurveTo(vaulter, ctx, 361.4, 178.4, 361.5, 177.4, 357.5, 174.9);
        recordBezierCurveTo(vaulter, ctx, 359.7, 171.7, 361.6, 168.6, 363.9, 159.2);
        ctx.fill();
        ctx.stroke();

        // vaulter/Path
        ctx.beginPath();
        recordMoveTo(vaulter, ctx, 375.3, 138.5);
        recordBezierCurveTo(vaulter, ctx, 375.9, 137.4, 376.4, 136.0, 376.7, 133.9);
        recordBezierCurveTo(vaulter, ctx, 376.9, 132.4, 377.8, 127.9, 377.8, 127.9);
        recordBezierCurveTo(vaulter, ctx, 377.8, 127.9, 378.0, 125.9, 378.1, 124.5);
        recordBezierCurveTo(vaulter, ctx, 378.3, 123.1, 379.1, 119.7, 378.8, 118.0);
        recordBezierCurveTo(vaulter, ctx, 380.3, 113.3, 380.5, 110.2, 380.8, 100.6);
        recordBezierCurveTo(vaulter, ctx, 380.8, 100.6, 380.3, 99.6, 379.3, 97.4);
        recordBezierCurveTo(vaulter, ctx, 378.8, 96.0, 376.0, 91.0, 376.0, 91.0);
        recordBezierCurveTo(vaulter, ctx, 376.0, 91.0, 375.0, 89.8, 374.4, 89.8);
        recordBezierCurveTo(vaulter, ctx, 373.8, 89.9, 373.2, 92.3, 373.6, 92.8);
        recordBezierCurveTo(vaulter, ctx, 375.5, 94.8, 375.7, 95.3, 375.8, 96.0);
        recordBezierCurveTo(vaulter, ctx, 375.4, 95.6, 375.5, 95.7, 375.3, 95.3);
        recordBezierCurveTo(vaulter, ctx, 375.1, 94.8, 374.2, 94.1, 374.0, 94.5);
        recordBezierCurveTo(vaulter, ctx, 373.8, 94.9, 374.2, 95.6, 374.5, 95.8);
        recordBezierCurveTo(vaulter, ctx, 374.8, 95.9, 375.2, 97.0, 375.7, 97.8);
        recordBezierCurveTo(vaulter, ctx, 376.0, 98.4, 376.6, 99.5, 377.0, 99.7);
        recordBezierCurveTo(vaulter, ctx, 377.4, 99.9, 378.4, 100.0, 378.4, 100.0);
        recordBezierCurveTo(vaulter, ctx, 376.7, 107.5, 374.4, 112.0, 373.3, 116.9);
        recordBezierCurveTo(vaulter, ctx, 372.6, 120.0, 370.3, 127.8, 370.3, 127.8);
        recordBezierCurveTo(vaulter, ctx, 370.3, 127.8, 366.5, 135.1, 366.7, 136.5);
        ctx.fill();
        ctx.stroke();

        // vaulter/Path
        ctx.beginPath();
        recordMoveTo(vaulter, ctx, 293.0, 342.2);
        recordLineTo(vaulter, ctx, 292.4, 76.4);
        recordBezierCurveTo(vaulter, ctx, 292.4, 76.4, 292.6, 75.4, 293.4, 75.4);
        recordBezierCurveTo(vaulter, ctx, 294.3, 75.4, 294.4, 76.4, 294.4, 76.4);
        recordLineTo(vaulter, ctx, 295.0, 342.2);
        recordLineTo(vaulter, ctx, 293.0, 342.2);
        ctx.closePath();
        ctx.fill();
        ctx.stroke();
        ctx.restore();
      }
    },

    function (ctx) {
      if (vaulter.visible) {

        // vaulter/Path
        ctx.save();
        ctx.beginPath();
        recordMoveTo(vaulter, ctx, 388.1, 141.8);
        recordBezierCurveTo(vaulter, ctx, 387.9, 140.1, 385.4, 136.6, 382.8, 134.0);
        recordBezierCurveTo(vaulter, ctx, 381.7, 130.8, 380.2, 124.6, 377.6, 121.1);
        recordBezierCurveTo(vaulter, ctx, 377.6, 121.1, 372.4, 111.1, 369.1, 105.2);
        recordBezierCurveTo(vaulter, ctx, 369.1, 105.2, 362.1, 101.3, 360.5, 103.4);
        recordBezierCurveTo(vaulter, ctx, 360.5, 103.4, 359.2, 103.7, 359.5, 104.1);
        recordBezierCurveTo(vaulter, ctx, 359.8, 104.5, 359.7, 104.9, 359.8, 105.1);
        recordBezierCurveTo(vaulter, ctx, 359.8, 105.4, 360.0, 105.5, 360.2, 105.8);
        recordBezierCurveTo(vaulter, ctx, 360.4, 106.4, 361.1, 106.2, 361.1, 106.2);
        recordLineTo(vaulter, ctx, 363.1, 107.0);
        recordBezierCurveTo(vaulter, ctx, 363.1, 107.0, 363.3, 106.9, 363.3, 107.2);
        recordBezierCurveTo(vaulter, ctx, 363.4, 107.3, 362.0, 107.4, 362.5, 108.0);
        recordBezierCurveTo(vaulter, ctx, 362.8, 108.4, 364.5, 108.1, 365.2, 108.0);
        recordBezierCurveTo(vaulter, ctx, 366.2, 107.9, 366.5, 106.3, 367.5, 106.8);
        recordBezierCurveTo(vaulter, ctx, 367.5, 106.8, 370.4, 118.5, 373.4, 123.4);
        recordBezierCurveTo(vaulter, ctx, 373.4, 123.4, 374.5, 127.2, 375.7, 129.9);
        recordBezierCurveTo(vaulter, ctx, 376.9, 132.5, 377.9, 135.0, 377.9, 135.0);
        recordBezierCurveTo(vaulter, ctx, 377.9, 135.0, 377.2, 138.2, 379.1, 143.8);
        recordBezierCurveTo(vaulter, ctx, 380.2, 147.1, 383.9, 146.9, 385.1, 146.5);
        recordBezierCurveTo(vaulter, ctx, 387.9, 145.6, 388.2, 143.6, 388.1, 141.8);
        ctx.closePath();
        ctx.fillStyle = "rgb(17, 92, 137)";
        ctx.fill();
        ctx.lineWidth = 0.5;
        ctx.strokeStyle = "rgb(141, 204, 255)";
        ctx.lineJoin = "miter";
        ctx.miterLimit = 4.0;
        ctx.stroke();

        // vaulter/Path
        ctx.beginPath();
        recordMoveTo(vaulter, ctx, 374.7, 169.0);
        recordBezierCurveTo(vaulter, ctx, 371.2, 172.5, 369.4, 175.4, 366.5, 176.5);
        recordBezierCurveTo(vaulter, ctx, 363.6, 177.7, 361.1, 179.7, 361.1, 179.7);
        recordBezierCurveTo(vaulter, ctx, 363.7, 180.8, 364.1, 182.1, 369.9, 192.3);
        recordBezierCurveTo(vaulter, ctx, 369.9, 192.3, 371.9, 192.4, 372.8, 193.4);
        recordBezierCurveTo(vaulter, ctx, 373.7, 194.4, 375.0, 196.3, 372.8, 197.9);
        recordBezierCurveTo(vaulter, ctx, 370.5, 199.6, 366.6, 204.0, 366.0, 205.2);
        recordBezierCurveTo(vaulter, ctx, 365.5, 206.4, 363.7, 208.8, 362.8, 208.6);
        recordBezierCurveTo(vaulter, ctx, 361.9, 208.4, 362.0, 206.0, 363.3, 205.2);
        recordBezierCurveTo(vaulter, ctx, 363.3, 205.2, 364.4, 198.5, 367.0, 195.2);
        recordBezierCurveTo(vaulter, ctx, 367.0, 195.2, 361.7, 190.2, 359.6, 188.5);
        recordBezierCurveTo(vaulter, ctx, 357.4, 186.8, 352.1, 184.7, 351.2, 181.4);
        recordBezierCurveTo(vaulter, ctx, 350.4, 178.7, 357.6, 166.3, 366.0, 160.5);
        ctx.fill();
        ctx.stroke();

        // vaulter/Path
        ctx.beginPath();
        recordMoveTo(vaulter, ctx, 380.5, 137.2);
        recordBezierCurveTo(vaulter, ctx, 380.5, 137.2, 380.6, 135.6, 381.1, 132.9);
        recordBezierCurveTo(vaulter, ctx, 381.3, 132.1, 381.6, 131.1, 381.8, 130.1);
        recordBezierCurveTo(vaulter, ctx, 383.0, 125.8, 387.9, 122.7, 392.2, 124.5);
        recordBezierCurveTo(vaulter, ctx, 396.9, 126.4, 397.1, 131.8, 395.2, 135.2);
        recordBezierCurveTo(vaulter, ctx, 394.3, 136.9, 390.9, 137.8, 389.2, 139.4);
        recordBezierCurveTo(vaulter, ctx, 387.3, 141.1, 387.1, 143.4, 387.1, 143.4);
        ctx.fill();
        ctx.stroke();

        // vaulter/Path
        ctx.beginPath();
        recordMoveTo(vaulter, ctx, 372.6, 142.5);
        recordBezierCurveTo(vaulter, ctx, 371.3, 145.5, 371.0, 150.1, 367.7, 156.1);
        recordBezierCurveTo(vaulter, ctx, 365.2, 160.6, 365.4, 161.9, 364.9, 163.5);
        recordBezierCurveTo(vaulter, ctx, 363.9, 166.7, 363.6, 167.1, 367.4, 169.1);
        recordBezierCurveTo(vaulter, ctx, 371.1, 171.2, 372.5, 170.3, 374.5, 168.9);
        recordBezierCurveTo(vaulter, ctx, 375.6, 168.0, 380.1, 156.8, 383.1, 153.7);
        recordBezierCurveTo(vaulter, ctx, 385.2, 151.5, 386.8, 150.5, 388.0, 148.4);
        recordBezierCurveTo(vaulter, ctx, 389.0, 146.7, 388.5, 143.7, 388.5, 142.5);
        recordBezierCurveTo(vaulter, ctx, 388.6, 140.2, 385.9, 138.5, 381.8, 137.3);
        recordBezierCurveTo(vaulter, ctx, 378.2, 136.3, 373.9, 139.5, 372.6, 142.5);
        ctx.closePath();
        ctx.fill();
        ctx.stroke();

        // vaulter/Path
        ctx.beginPath();
        recordMoveTo(vaulter, ctx, 366.2, 160.1);
        recordBezierCurveTo(vaulter, ctx, 366.2, 160.1, 359.4, 166.3, 357.6, 169.0);
        recordBezierCurveTo(vaulter, ctx, 355.9, 171.7, 352.1, 176.3, 351.9, 178.5);
        recordBezierCurveTo(vaulter, ctx, 351.8, 179.2, 352.1, 179.9, 352.7, 181.9);
        recordBezierCurveTo(vaulter, ctx, 354.2, 186.6, 360.8, 192.2, 365.7, 195.3);
        recordBezierCurveTo(vaulter, ctx, 366.3, 199.7, 363.0, 203.3, 362.7, 206.4);
        recordBezierCurveTo(vaulter, ctx, 362.7, 206.4, 361.8, 208.6, 362.7, 209.2);
        recordBezierCurveTo(vaulter, ctx, 363.7, 209.8, 367.1, 206.2, 368.3, 202.7);
        recordBezierCurveTo(vaulter, ctx, 369.5, 199.2, 371.5, 197.3, 372.0, 196.6);
        recordBezierCurveTo(vaulter, ctx, 372.6, 195.8, 372.6, 193.4, 371.8, 192.8);
        recordBezierCurveTo(vaulter, ctx, 371.1, 192.2, 369.7, 191.6, 369.0, 191.0);
        recordBezierCurveTo(vaulter, ctx, 363.5, 185.0, 364.1, 184.2, 361.6, 180.0);
        recordBezierCurveTo(vaulter, ctx, 365.2, 178.1, 368.4, 176.1, 375.1, 168.6);
        ctx.fill();
        ctx.stroke();

        // vaulter/Path
        ctx.beginPath();
        recordMoveTo(vaulter, ctx, 388.2, 143.3);
        recordBezierCurveTo(vaulter, ctx, 388.6, 141.9, 388.5, 140.0, 387.8, 137.4);
        recordBezierCurveTo(vaulter, ctx, 387.3, 135.9, 386.3, 131.1, 386.3, 131.1);
        recordBezierCurveTo(vaulter, ctx, 386.3, 131.1, 385.6, 129.2, 385.2, 127.8);
        recordBezierCurveTo(vaulter, ctx, 384.8, 126.4, 384.0, 122.8, 383.0, 121.3);
        recordBezierCurveTo(vaulter, ctx, 382.5, 116.2, 381.4, 113.2, 377.6, 103.9);
        recordBezierCurveTo(vaulter, ctx, 377.6, 103.9, 376.7, 103.2, 374.9, 101.5);
        recordBezierCurveTo(vaulter, ctx, 373.7, 100.4, 369.0, 96.8, 369.0, 96.8);
        recordBezierCurveTo(vaulter, ctx, 369.0, 96.8, 367.5, 96.1, 367.0, 96.4);
        recordBezierCurveTo(vaulter, ctx, 366.4, 96.7, 366.9, 99.3, 367.5, 99.5);
        recordBezierCurveTo(vaulter, ctx, 370.1, 100.7, 370.5, 101.0, 370.9, 101.6);
        recordBezierCurveTo(vaulter, ctx, 370.3, 101.5, 370.4, 101.5, 370.2, 101.2);
        recordBezierCurveTo(vaulter, ctx, 369.7, 100.8, 368.6, 100.5, 368.5, 101.0);
        recordBezierCurveTo(vaulter, ctx, 368.5, 101.4, 369.2, 102.0, 369.6, 102.0);
        recordBezierCurveTo(vaulter, ctx, 369.9, 102.0, 370.7, 102.9, 371.5, 103.4);
        recordBezierCurveTo(vaulter, ctx, 372.1, 103.8, 373.1, 104.7, 373.6, 104.7);
        recordBezierCurveTo(vaulter, ctx, 374.0, 104.7, 375.0, 104.4, 375.0, 104.4);
        recordBezierCurveTo(vaulter, ctx, 376.6, 112.2, 376.3, 117.5, 377.4, 122.6);
        recordBezierCurveTo(vaulter, ctx, 378.0, 125.8, 379.2, 134.3, 379.2, 134.3);
        recordBezierCurveTo(vaulter, ctx, 379.2, 134.3, 378.8, 140.6, 379.1, 143.2);
        ctx.fill();
        ctx.stroke();

        // vaulter/Path
        ctx.beginPath();
        recordMoveTo(vaulter, ctx, 293.0, 342.2);
        recordLineTo(vaulter, ctx, 292.4, 76.4);
        recordBezierCurveTo(vaulter, ctx, 292.4, 76.4, 292.6, 75.4, 293.4, 75.4);
        recordBezierCurveTo(vaulter, ctx, 294.3, 75.4, 294.4, 76.4, 294.4, 76.4);
        recordLineTo(vaulter, ctx, 295.0, 342.2);
        recordLineTo(vaulter, ctx, 293.0, 342.2);
        ctx.closePath();
        ctx.fill();
        ctx.stroke();
        ctx.restore();
      }
    },

    function (ctx) {
      if (vaulter.visible) {

        // vaulter/Path
        ctx.save();
        ctx.beginPath();
        recordMoveTo(vaulter, ctx, 393.4, 159.4);
        recordBezierCurveTo(vaulter, ctx, 392.1, 158.3, 387.9, 157.5, 384.2, 157.4);
        recordBezierCurveTo(vaulter, ctx, 381.2, 155.9, 375.7, 152.5, 371.4, 151.8);
        recordBezierCurveTo(vaulter, ctx, 353.8, 145.9, 364.6, 149.4, 354.4, 146.3);
        recordBezierCurveTo(vaulter, ctx, 354.4, 146.3, 349.6, 141.8, 347.5, 143.3);
        recordBezierCurveTo(vaulter, ctx, 347.5, 143.3, 346.7, 143.4, 346.6, 143.9);
        recordBezierCurveTo(vaulter, ctx, 346.5, 144.3, 346.3, 144.6, 346.3, 144.9);
        recordBezierCurveTo(vaulter, ctx, 346.3, 145.1, 346.5, 145.2, 346.6, 145.6);
        recordBezierCurveTo(vaulter, ctx, 346.6, 146.2, 347.3, 146.2, 347.3, 146.2);
        recordBezierCurveTo(vaulter, ctx, 347.3, 146.2, 348.6, 146.8, 349.0, 146.8);
        recordBezierCurveTo(vaulter, ctx, 350.2, 146.8, 350.5, 147.7, 350.3, 147.7);
        recordBezierCurveTo(vaulter, ctx, 350.0, 147.7, 349.3, 147.9, 349.2, 147.8);
        recordBezierCurveTo(vaulter, ctx, 348.7, 147.7, 347.3, 147.4, 347.6, 148.1);
        recordBezierCurveTo(vaulter, ctx, 347.8, 148.6, 350.2, 148.9, 350.9, 149.0);
        recordBezierCurveTo(vaulter, ctx, 351.9, 149.2, 353.2, 148.9, 354.3, 148.6);
        recordBezierCurveTo(vaulter, ctx, 354.3, 148.6, 364.5, 154.9, 370.1, 156.4);
        recordBezierCurveTo(vaulter, ctx, 370.1, 156.4, 373.5, 158.3, 376.3, 159.4);
        recordBezierCurveTo(vaulter, ctx, 378.9, 160.5, 381.3, 161.6, 381.3, 161.6);
        recordBezierCurveTo(vaulter, ctx, 381.3, 161.6, 383.0, 164.4, 388.4, 167.1);
        recordBezierCurveTo(vaulter, ctx, 391.5, 168.6, 393.9, 165.9, 394.5, 164.8);
        recordBezierCurveTo(vaulter, ctx, 395.9, 162.2, 394.7, 160.5, 393.4, 159.4);
        ctx.closePath();
        ctx.fillStyle = "rgb(17, 92, 137)";
        ctx.fill();
        ctx.lineWidth = 0.5;
        ctx.strokeStyle = "rgb(141, 204, 255)";
        ctx.lineJoin = "miter";
        ctx.miterLimit = 4.0;
        ctx.stroke();

        // vaulter/Path
        ctx.beginPath();
        recordMoveTo(vaulter, ctx, 379.6, 190.5);
        recordBezierCurveTo(vaulter, ctx, 375.0, 192.2, 372.1, 194.1, 369.0, 194.0);
        recordBezierCurveTo(vaulter, ctx, 366.0, 193.8, 362.8, 194.5, 362.8, 194.5);
        recordBezierCurveTo(vaulter, ctx, 364.7, 196.6, 364.5, 198.0, 365.5, 209.7);
        recordBezierCurveTo(vaulter, ctx, 365.5, 209.7, 367.3, 210.6, 367.7, 211.9);
        recordBezierCurveTo(vaulter, ctx, 368.1, 213.2, 368.5, 215.5, 365.8, 216.0);
        recordBezierCurveTo(vaulter, ctx, 363.0, 216.6, 357.6, 218.9, 356.6, 219.8);
        recordBezierCurveTo(vaulter, ctx, 355.6, 220.7, 353.0, 222.1, 352.2, 221.6);
        recordBezierCurveTo(vaulter, ctx, 351.5, 221.0, 352.6, 218.8, 354.1, 218.6);
        recordBezierCurveTo(vaulter, ctx, 354.1, 218.6, 357.9, 213.0, 361.6, 211.1);
        recordBezierCurveTo(vaulter, ctx, 361.6, 211.1, 359.0, 204.3, 357.8, 201.9);
        recordBezierCurveTo(vaulter, ctx, 356.5, 199.5, 352.5, 195.3, 353.1, 192.0);
        recordBezierCurveTo(vaulter, ctx, 353.6, 189.1, 365.3, 180.9, 375.3, 179.2);
        ctx.fill();
        ctx.stroke();

        // vaulter/Path
        ctx.beginPath();
        recordMoveTo(vaulter, ctx, 388.0, 158.1);
        recordBezierCurveTo(vaulter, ctx, 388.0, 158.1, 388.0, 156.4, 388.6, 153.8);
        recordBezierCurveTo(vaulter, ctx, 388.8, 152.9, 389.0, 152.0, 389.3, 150.9);
        recordBezierCurveTo(vaulter, ctx, 390.5, 146.7, 395.4, 143.5, 399.7, 145.3);
        recordBezierCurveTo(vaulter, ctx, 404.3, 147.3, 404.6, 152.7, 402.7, 156.1);
        recordBezierCurveTo(vaulter, ctx, 401.7, 157.8, 398.4, 158.6, 396.6, 160.2);
        recordBezierCurveTo(vaulter, ctx, 394.8, 161.9, 394.5, 164.3, 394.5, 164.3);
        ctx.fill();
        ctx.stroke();

        // vaulter/Path
        ctx.beginPath();
        recordMoveTo(vaulter, ctx, 379.6, 162.4);
        recordBezierCurveTo(vaulter, ctx, 378.2, 165.3, 377.9, 170.0, 374.6, 176.0);
        recordBezierCurveTo(vaulter, ctx, 372.1, 180.5, 372.3, 181.8, 371.8, 183.4);
        recordBezierCurveTo(vaulter, ctx, 370.8, 186.5, 371.2, 187.2, 375.0, 189.2);
        recordBezierCurveTo(vaulter, ctx, 378.7, 191.3, 380.1, 190.4, 382.0, 189.0);
        recordBezierCurveTo(vaulter, ctx, 383.2, 188.1, 384.8, 182.4, 387.8, 179.3);
        recordBezierCurveTo(vaulter, ctx, 389.9, 177.1, 394.4, 170.6, 395.6, 168.5);
        recordBezierCurveTo(vaulter, ctx, 396.6, 166.8, 396.1, 163.8, 396.1, 162.6);
        recordBezierCurveTo(vaulter, ctx, 396.2, 160.4, 393.5, 158.7, 389.3, 157.4);
        recordBezierCurveTo(vaulter, ctx, 385.7, 156.4, 380.9, 159.4, 379.6, 162.4);
        ctx.closePath();
        ctx.fill();
        ctx.stroke();

        // vaulter/Path
        ctx.beginPath();
        recordMoveTo(vaulter, ctx, 375.7, 178.9);
        recordBezierCurveTo(vaulter, ctx, 375.7, 178.9, 366.9, 181.7, 364.1, 183.4);
        recordBezierCurveTo(vaulter, ctx, 361.5, 185.1, 356.0, 187.7, 354.9, 189.6);
        recordBezierCurveTo(vaulter, ctx, 354.6, 190.2, 354.6, 191.0, 354.3, 193.1);
        recordBezierCurveTo(vaulter, ctx, 353.6, 197.9, 357.3, 205.8, 360.5, 210.6);
        recordBezierCurveTo(vaulter, ctx, 359.1, 214.9, 354.6, 216.8, 353.0, 219.5);
        recordBezierCurveTo(vaulter, ctx, 353.0, 219.5, 351.3, 221.1, 351.9, 222.0);
        recordBezierCurveTo(vaulter, ctx, 352.5, 223.0, 357.1, 221.1, 359.7, 218.5);
        recordBezierCurveTo(vaulter, ctx, 362.2, 215.8, 364.9, 214.9, 365.7, 214.5);
        recordBezierCurveTo(vaulter, ctx, 366.5, 214.0, 367.5, 211.9, 367.0, 210.9);
        recordBezierCurveTo(vaulter, ctx, 366.6, 210.1, 365.7, 208.9, 365.3, 208.1);
        recordBezierCurveTo(vaulter, ctx, 362.8, 200.4, 363.7, 200.0, 363.2, 195.0);
        recordBezierCurveTo(vaulter, ctx, 367.2, 194.8, 370.9, 194.3, 380.2, 190.3);
        ctx.fill();
        ctx.stroke();

        // vaulter/Path
        ctx.beginPath();
        recordMoveTo(vaulter, ctx, 395.9, 162.7);
        recordBezierCurveTo(vaulter, ctx, 395.9, 161.1, 395.1, 159.1, 392.7, 156.4);
        recordBezierCurveTo(vaulter, ctx, 391.6, 155.2, 388.6, 151.5, 388.6, 151.5);
        recordBezierCurveTo(vaulter, ctx, 388.6, 151.5, 387.1, 150.0, 386.1, 148.9);
        recordBezierCurveTo(vaulter, ctx, 385.1, 147.9, 382.9, 145.0, 381.3, 144.1);
        recordBezierCurveTo(vaulter, ctx, 378.6, 139.7, 376.2, 137.5, 368.8, 130.9);
        recordBezierCurveTo(vaulter, ctx, 368.8, 130.9, 365.6, 129.0, 363.2, 128.3);
        recordBezierCurveTo(vaulter, ctx, 361.7, 127.9, 357.8, 128.3, 357.8, 128.3);
        recordBezierCurveTo(vaulter, ctx, 357.8, 128.3, 356.2, 128.4, 355.9, 128.9);
        recordBezierCurveTo(vaulter, ctx, 355.5, 129.3, 357.1, 129.5, 357.8, 129.5);
        recordBezierCurveTo(vaulter, ctx, 358.9, 129.5, 360.6, 129.7, 361.4, 129.9);
        recordBezierCurveTo(vaulter, ctx, 362.3, 130.2, 362.8, 130.1, 362.9, 130.4);
        recordBezierCurveTo(vaulter, ctx, 362.9, 130.6, 363.0, 131.1, 362.6, 131.3);
        recordBezierCurveTo(vaulter, ctx, 362.1, 131.5, 361.8, 132.0, 360.9, 131.8);
        recordBezierCurveTo(vaulter, ctx, 360.3, 131.7, 359.1, 131.8, 359.3, 132.3);
        recordBezierCurveTo(vaulter, ctx, 359.5, 132.7, 360.4, 132.9, 360.7, 132.8);
        recordBezierCurveTo(vaulter, ctx, 361.0, 132.6, 362.2, 133.1, 363.1, 133.2);
        recordBezierCurveTo(vaulter, ctx, 363.8, 133.2, 365.0, 133.6, 365.5, 133.4);
        recordBezierCurveTo(vaulter, ctx, 365.9, 133.2, 366.7, 132.4, 366.7, 132.4);
        recordBezierCurveTo(vaulter, ctx, 371.5, 138.8, 373.6, 143.7, 376.8, 147.8);
        recordBezierCurveTo(vaulter, ctx, 378.8, 150.4, 383.6, 157.4, 383.6, 157.4);
        recordBezierCurveTo(vaulter, ctx, 383.6, 157.4, 386.3, 163.8, 387.7, 165.7);
        ctx.fill();
        ctx.stroke();

        // vaulter/Path
        ctx.beginPath();
        recordMoveTo(vaulter, ctx, 293.0, 342.2);
        recordLineTo(vaulter, ctx, 292.4, 76.4);
        recordBezierCurveTo(vaulter, ctx, 292.4, 76.4, 292.6, 75.4, 293.4, 75.4);
        recordBezierCurveTo(vaulter, ctx, 294.3, 75.4, 294.4, 76.4, 294.4, 76.4);
        recordLineTo(vaulter, ctx, 295.0, 342.2);
        recordLineTo(vaulter, ctx, 293.0, 342.2);
        ctx.closePath();
        ctx.fill();
        ctx.stroke();
        ctx.restore();
      }
    },

    function (ctx) {
      if (vaulter.visible) {

        // vaulter/Path
        ctx.save();
        ctx.beginPath();
        recordMoveTo(vaulter, ctx, 402.2, 190.5);
        recordBezierCurveTo(vaulter, ctx, 400.8, 189.4, 396.6, 188.7, 392.9, 188.6);
        recordBezierCurveTo(vaulter, ctx, 389.9, 187.1, 384.4, 183.9, 380.0, 183.2);
        recordBezierCurveTo(vaulter, ctx, 362.3, 177.5, 373.2, 180.9, 362.9, 177.9);
        recordBezierCurveTo(vaulter, ctx, 362.9, 177.9, 358.1, 173.5, 356.0, 175.0);
        recordBezierCurveTo(vaulter, ctx, 356.0, 175.0, 355.2, 175.1, 355.1, 175.6);
        recordBezierCurveTo(vaulter, ctx, 355.0, 176.1, 354.9, 176.4, 354.9, 176.6);
        recordBezierCurveTo(vaulter, ctx, 354.9, 176.8, 355.1, 176.9, 355.1, 177.4);
        recordBezierCurveTo(vaulter, ctx, 355.2, 178.0, 355.9, 178.0, 355.9, 178.0);
        recordBezierCurveTo(vaulter, ctx, 355.9, 178.0, 357.2, 178.5, 357.5, 178.5);
        recordBezierCurveTo(vaulter, ctx, 358.8, 178.5, 359.1, 179.4, 358.9, 179.4);
        recordBezierCurveTo(vaulter, ctx, 358.6, 179.4, 357.9, 179.6, 357.8, 179.5);
        recordBezierCurveTo(vaulter, ctx, 357.3, 179.4, 355.8, 179.1, 356.2, 179.8);
        recordBezierCurveTo(vaulter, ctx, 356.3, 180.3, 358.8, 180.6, 359.5, 180.7);
        recordBezierCurveTo(vaulter, ctx, 360.5, 180.8, 361.8, 180.5, 362.9, 180.2);
        recordBezierCurveTo(vaulter, ctx, 362.9, 180.2, 373.2, 186.4, 378.8, 187.8);
        recordBezierCurveTo(vaulter, ctx, 378.8, 187.8, 382.2, 189.7, 385.0, 190.7);
        recordBezierCurveTo(vaulter, ctx, 387.7, 191.7, 390.1, 192.8, 390.1, 192.8);
        recordBezierCurveTo(vaulter, ctx, 390.1, 192.8, 391.8, 195.6, 397.2, 198.2);
        recordBezierCurveTo(vaulter, ctx, 400.3, 199.7, 402.8, 197.0, 403.4, 195.8);
        recordBezierCurveTo(vaulter, ctx, 404.7, 193.3, 403.5, 191.6, 402.2, 190.5);
        ctx.closePath();
        ctx.fillStyle = "rgb(17, 92, 137)";
        ctx.fill();
        ctx.lineWidth = 0.5;
        ctx.strokeStyle = "rgb(141, 204, 255)";
        ctx.lineJoin = "miter";
        ctx.miterLimit = 4.0;
        ctx.stroke();

        // vaulter/Path
        ctx.beginPath();
        recordMoveTo(vaulter, ctx, 381.4, 218.3);
        recordBezierCurveTo(vaulter, ctx, 376.4, 218.2, 373.1, 218.9, 370.3, 217.7);
        recordBezierCurveTo(vaulter, ctx, 367.4, 216.5, 364.2, 216.0, 364.2, 216.0);
        recordBezierCurveTo(vaulter, ctx, 365.3, 218.7, 364.6, 219.9, 361.4, 231.1);
        recordBezierCurveTo(vaulter, ctx, 361.4, 231.1, 362.7, 232.7, 362.6, 234.0);
        recordBezierCurveTo(vaulter, ctx, 362.5, 235.4, 362.1, 237.6, 359.4, 237.2);
        recordBezierCurveTo(vaulter, ctx, 356.6, 236.7, 350.7, 237.0, 349.5, 237.4);
        recordBezierCurveTo(vaulter, ctx, 348.2, 237.9, 345.3, 238.3, 344.8, 237.5);
        recordBezierCurveTo(vaulter, ctx, 344.3, 236.8, 346.1, 235.1, 347.6, 235.4);
        recordBezierCurveTo(vaulter, ctx, 347.6, 235.4, 353.1, 231.6, 357.3, 231.1);
        recordBezierCurveTo(vaulter, ctx, 357.3, 231.1, 357.2, 223.9, 356.9, 221.1);
        recordBezierCurveTo(vaulter, ctx, 356.6, 218.4, 354.3, 213.1, 356.1, 210.2);
        recordBezierCurveTo(vaulter, ctx, 357.5, 207.7, 371.4, 204.2, 381.3, 206.2);
        ctx.fill();
        ctx.stroke();

        // vaulter/Path
        ctx.beginPath();
        recordMoveTo(vaulter, ctx, 398.0, 188.4);
        recordBezierCurveTo(vaulter, ctx, 398.0, 188.4, 398.4, 186.8, 399.6, 184.4);
        recordBezierCurveTo(vaulter, ctx, 399.9, 183.6, 400.4, 182.7, 400.9, 181.7);
        recordBezierCurveTo(vaulter, ctx, 403.0, 177.9, 408.6, 176.0, 412.3, 178.7);
        recordBezierCurveTo(vaulter, ctx, 416.4, 181.7, 415.3, 187.1, 412.4, 189.6);
        recordBezierCurveTo(vaulter, ctx, 410.8, 191.0, 407.9, 191.4, 405.9, 192.5);
        recordBezierCurveTo(vaulter, ctx, 403.7, 193.7, 402.9, 195.9, 402.9, 195.9);
        ctx.fill();
        ctx.stroke();

        // vaulter/Path
        ctx.beginPath();
        recordMoveTo(vaulter, ctx, 388.7, 190.8);
        recordBezierCurveTo(vaulter, ctx, 386.7, 193.3, 385.4, 197.8, 380.8, 202.9);
        recordBezierCurveTo(vaulter, ctx, 377.3, 206.7, 377.1, 208.0, 376.3, 209.4);
        recordBezierCurveTo(vaulter, ctx, 374.6, 212.2, 374.8, 213.0, 378.0, 215.8);
        recordBezierCurveTo(vaulter, ctx, 381.1, 218.7, 382.8, 218.1, 385.0, 217.2);
        recordBezierCurveTo(vaulter, ctx, 386.3, 216.7, 389.2, 211.5, 392.8, 209.2);
        recordBezierCurveTo(vaulter, ctx, 395.4, 207.5, 401.3, 202.2, 402.9, 200.5);
        recordBezierCurveTo(vaulter, ctx, 404.2, 199.0, 404.5, 196.0, 404.8, 194.8);
        recordBezierCurveTo(vaulter, ctx, 405.3, 192.7, 403.1, 190.4, 399.4, 188.2);
        recordBezierCurveTo(vaulter, ctx, 396.1, 186.4, 390.7, 188.2, 388.7, 190.8);
        ctx.closePath();
        ctx.fill();
        ctx.stroke();

        // vaulter/Path
        ctx.beginPath();
        recordMoveTo(vaulter, ctx, 381.8, 206.0);
        recordBezierCurveTo(vaulter, ctx, 381.8, 206.0, 372.6, 205.5, 369.4, 206.1);
        recordBezierCurveTo(vaulter, ctx, 366.3, 206.7, 360.3, 207.3, 358.6, 208.6);
        recordBezierCurveTo(vaulter, ctx, 358.1, 209.1, 357.8, 209.8, 356.8, 211.7);
        recordBezierCurveTo(vaulter, ctx, 354.5, 216.0, 355.1, 224.7, 356.3, 230.3);
        recordBezierCurveTo(vaulter, ctx, 353.6, 233.8, 348.7, 233.9, 346.2, 235.9);
        recordBezierCurveTo(vaulter, ctx, 346.2, 235.9, 344.1, 236.8, 344.3, 237.9);
        recordBezierCurveTo(vaulter, ctx, 344.5, 239.0, 349.5, 238.9, 352.8, 237.3);
        recordBezierCurveTo(vaulter, ctx, 356.1, 235.7, 358.9, 235.8, 359.9, 235.7);
        recordBezierCurveTo(vaulter, ctx, 360.8, 235.6, 362.5, 233.9, 362.4, 232.8);
        recordBezierCurveTo(vaulter, ctx, 362.3, 232.0, 361.8, 230.5, 361.7, 229.6);
        recordBezierCurveTo(vaulter, ctx, 362.1, 221.5, 363.1, 221.4, 364.4, 216.6);
        recordBezierCurveTo(vaulter, ctx, 368.3, 217.8, 371.9, 218.8, 382.0, 218.3);
        ctx.fill();
        ctx.stroke();

        // vaulter/Path
        ctx.beginPath();
        recordMoveTo(vaulter, ctx, 404.7, 194.7);
        recordBezierCurveTo(vaulter, ctx, 404.9, 193.0, 404.5, 190.4, 399.9, 187.4);
        recordBezierCurveTo(vaulter, ctx, 398.6, 186.6, 394.7, 183.7, 394.7, 183.7);
        recordBezierCurveTo(vaulter, ctx, 394.7, 183.7, 392.9, 182.6, 391.7, 181.9);
        recordBezierCurveTo(vaulter, ctx, 390.5, 181.1, 387.6, 178.9, 385.8, 178.4);
        recordBezierCurveTo(vaulter, ctx, 382.1, 174.8, 379.2, 173.3, 370.4, 168.7);
        recordBezierCurveTo(vaulter, ctx, 370.4, 168.7, 366.8, 167.7, 364.3, 167.6);
        recordBezierCurveTo(vaulter, ctx, 362.8, 167.6, 359.1, 169.0, 359.1, 169.0);
        recordBezierCurveTo(vaulter, ctx, 359.1, 169.0, 357.6, 169.4, 357.4, 170.0);
        recordBezierCurveTo(vaulter, ctx, 357.1, 170.5, 358.8, 170.3, 359.4, 170.1);
        recordBezierCurveTo(vaulter, ctx, 360.4, 169.8, 362.2, 169.6, 363.0, 169.6);
        recordBezierCurveTo(vaulter, ctx, 363.9, 169.7, 364.4, 169.5, 364.6, 169.8);
        recordBezierCurveTo(vaulter, ctx, 364.6, 169.9, 364.9, 170.3, 364.5, 170.6);
        recordBezierCurveTo(vaulter, ctx, 364.1, 171.0, 363.9, 171.5, 363.0, 171.6);
        recordBezierCurveTo(vaulter, ctx, 362.3, 171.6, 361.3, 172.0, 361.6, 172.4);
        recordBezierCurveTo(vaulter, ctx, 361.8, 172.8, 362.7, 172.7, 363.0, 172.5);
        recordBezierCurveTo(vaulter, ctx, 363.3, 172.4, 364.5, 172.5, 365.4, 172.3);
        recordBezierCurveTo(vaulter, ctx, 366.1, 172.2, 367.4, 172.2, 367.8, 171.9);
        recordBezierCurveTo(vaulter, ctx, 368.2, 171.7, 368.7, 170.8, 368.7, 170.8);
        recordBezierCurveTo(vaulter, ctx, 375.0, 175.7, 378.3, 179.9, 382.4, 183.1);
        recordBezierCurveTo(vaulter, ctx, 385.0, 185.1, 391.4, 190.7, 391.4, 190.7);
        recordBezierCurveTo(vaulter, ctx, 391.4, 190.7, 396.5, 197.5, 397.9, 198.0);
        ctx.fill();
        ctx.stroke();

        // vaulter/Path
        ctx.beginPath();
        recordMoveTo(vaulter, ctx, 293.0, 342.2);
        recordLineTo(vaulter, ctx, 292.4, 76.4);
        recordBezierCurveTo(vaulter, ctx, 292.4, 76.4, 292.6, 75.4, 293.4, 75.4);
        recordBezierCurveTo(vaulter, ctx, 294.3, 75.4, 294.4, 76.4, 294.4, 76.4);
        recordLineTo(vaulter, ctx, 295.0, 342.2);
        recordLineTo(vaulter, ctx, 293.0, 342.2);
        ctx.closePath();
        ctx.fill();
        ctx.stroke();
        ctx.restore();
      }
    },

    function (ctx) {
      if (vaulter.visible) {

        // vaulter/Path
        ctx.save();
        ctx.beginPath();
        recordMoveTo(vaulter, ctx, 408.4, 219.6);
        recordBezierCurveTo(vaulter, ctx, 407.1, 218.5, 402.8, 217.9, 399.1, 218.0);
        recordBezierCurveTo(vaulter, ctx, 396.1, 216.6, 390.5, 213.5, 386.1, 212.9);
        recordBezierCurveTo(vaulter, ctx, 368.2, 207.8, 379.2, 210.8, 368.9, 208.2);
        recordBezierCurveTo(vaulter, ctx, 368.9, 208.2, 363.9, 203.9, 361.8, 205.5);
        recordBezierCurveTo(vaulter, ctx, 361.8, 205.5, 361.1, 205.6, 361.0, 206.1);
        recordBezierCurveTo(vaulter, ctx, 360.9, 206.5, 360.8, 206.8, 360.8, 207.1);
        recordBezierCurveTo(vaulter, ctx, 360.8, 207.3, 361.0, 207.4, 361.0, 207.8);
        recordBezierCurveTo(vaulter, ctx, 361.1, 208.5, 361.8, 208.4, 361.8, 208.4);
        recordBezierCurveTo(vaulter, ctx, 361.8, 208.4, 363.1, 208.9, 363.5, 208.9);
        recordBezierCurveTo(vaulter, ctx, 364.8, 208.8, 365.1, 209.7, 364.9, 209.7);
        recordBezierCurveTo(vaulter, ctx, 364.6, 209.8, 363.9, 210.0, 363.7, 209.9);
        recordBezierCurveTo(vaulter, ctx, 363.3, 209.8, 361.8, 209.5, 362.2, 210.3);
        recordBezierCurveTo(vaulter, ctx, 362.4, 210.7, 364.8, 211.0, 365.5, 211.0);
        recordBezierCurveTo(vaulter, ctx, 366.5, 211.1, 367.8, 210.8, 368.9, 210.4);
        recordBezierCurveTo(vaulter, ctx, 368.9, 210.4, 379.4, 216.3, 385.0, 217.6);
        recordBezierCurveTo(vaulter, ctx, 385.0, 217.6, 388.5, 219.3, 391.3, 220.3);
        recordBezierCurveTo(vaulter, ctx, 394.0, 221.3, 396.4, 222.3, 396.4, 222.3);
        recordBezierCurveTo(vaulter, ctx, 396.4, 222.3, 398.3, 225.0, 403.7, 227.5);
        recordBezierCurveTo(vaulter, ctx, 406.9, 228.9, 409.2, 226.1, 409.8, 224.9);
        recordBezierCurveTo(vaulter, ctx, 411.1, 222.3, 409.8, 220.6, 408.4, 219.6);
        ctx.closePath();
        ctx.fillStyle = "rgb(17, 92, 137)";
        ctx.fill();
        ctx.lineWidth = 0.5;
        ctx.strokeStyle = "rgb(141, 204, 255)";
        ctx.lineJoin = "miter";
        ctx.miterLimit = 4.0;
        ctx.stroke();

        // vaulter/Path
        ctx.beginPath();
        recordMoveTo(vaulter, ctx, 388.1, 237.5);
        recordBezierCurveTo(vaulter, ctx, 382.0, 229.4, 369.3, 222.9, 366.5, 223.8);
        recordBezierCurveTo(vaulter, ctx, 363.3, 224.8, 361.5, 230.3, 359.9, 232.5);
        recordBezierCurveTo(vaulter, ctx, 358.4, 234.7, 353.6, 240.2, 353.6, 240.2);
        recordBezierCurveTo(vaulter, ctx, 350.1, 237.8, 343.4, 237.0, 343.4, 237.0);
        recordBezierCurveTo(vaulter, ctx, 342.5, 235.8, 340.1, 235.8, 339.9, 236.7);
        recordBezierCurveTo(vaulter, ctx, 339.8, 237.7, 342.3, 239.3, 343.5, 239.8);
        recordBezierCurveTo(vaulter, ctx, 344.8, 240.2, 349.4, 244.0, 351.1, 246.1);
        recordBezierCurveTo(vaulter, ctx, 352.9, 248.3, 354.7, 246.9, 355.7, 246.0);
        recordBezierCurveTo(vaulter, ctx, 356.6, 245.0, 356.7, 243.0, 356.7, 243.0);
        recordBezierCurveTo(vaulter, ctx, 366.5, 236.7, 367.8, 236.2, 368.8, 233.5);
        recordBezierCurveTo(vaulter, ctx, 368.8, 233.5, 370.9, 236.0, 372.2, 238.8);
        recordBezierCurveTo(vaulter, ctx, 373.5, 241.6, 376.4, 243.4, 380.1, 246.6);
        recordBezierCurveTo(vaulter, ctx, 383.9, 249.9, 388.1, 249.2, 392.7, 242.5);
        ctx.fill();
        ctx.stroke();

        // vaulter/Path
        ctx.beginPath();
        recordMoveTo(vaulter, ctx, 405.4, 217.0);
        recordBezierCurveTo(vaulter, ctx, 405.4, 217.0, 406.0, 215.5, 407.3, 213.1);
        recordBezierCurveTo(vaulter, ctx, 407.7, 212.3, 408.2, 211.5, 408.8, 210.6);
        recordBezierCurveTo(vaulter, ctx, 411.2, 206.9, 416.8, 205.3, 420.4, 208.3);
        recordBezierCurveTo(vaulter, ctx, 424.2, 211.5, 422.9, 216.8, 420.0, 219.5);
        recordBezierCurveTo(vaulter, ctx, 418.6, 220.8, 415.2, 220.6, 413.1, 221.6);
        recordBezierCurveTo(vaulter, ctx, 410.8, 222.7, 409.9, 224.9, 409.9, 224.9);
        ctx.fill();
        ctx.stroke();

        // vaulter/Path
        ctx.beginPath();
        recordMoveTo(vaulter, ctx, 395.2, 219.2);
        recordBezierCurveTo(vaulter, ctx, 393.1, 221.6, 391.5, 226.0, 386.5, 230.7);
        recordBezierCurveTo(vaulter, ctx, 382.8, 234.3, 382.6, 235.6, 381.6, 236.9);
        recordBezierCurveTo(vaulter, ctx, 379.8, 239.7, 379.9, 240.4, 382.9, 243.5);
        recordBezierCurveTo(vaulter, ctx, 385.9, 246.6, 387.5, 246.1, 389.8, 245.3);
        recordBezierCurveTo(vaulter, ctx, 391.1, 244.9, 394.4, 239.9, 398.1, 237.8);
        recordBezierCurveTo(vaulter, ctx, 400.8, 236.3, 407.0, 231.4, 408.7, 229.8);
        recordBezierCurveTo(vaulter, ctx, 410.2, 228.4, 410.6, 225.4, 411.0, 224.3);
        recordBezierCurveTo(vaulter, ctx, 411.7, 222.2, 409.7, 219.8, 406.1, 217.4);
        recordBezierCurveTo(vaulter, ctx, 402.9, 215.3, 397.4, 216.8, 395.2, 219.2);
        ctx.closePath();
        ctx.fill();
        ctx.stroke();

        // vaulter/Path
        ctx.beginPath();
        recordMoveTo(vaulter, ctx, 388.6, 237.7);
        recordBezierCurveTo(vaulter, ctx, 388.6, 237.7, 382.0, 231.2, 379.2, 229.6);
        recordBezierCurveTo(vaulter, ctx, 376.5, 228.0, 371.7, 224.4, 369.5, 224.3);
        recordBezierCurveTo(vaulter, ctx, 368.8, 224.3, 368.1, 224.6, 366.1, 225.3);
        recordBezierCurveTo(vaulter, ctx, 361.5, 227.0, 356.2, 233.9, 353.4, 239.0);
        recordBezierCurveTo(vaulter, ctx, 349.1, 239.8, 345.3, 236.6, 342.1, 236.5);
        recordBezierCurveTo(vaulter, ctx, 342.1, 236.5, 339.9, 235.7, 339.4, 236.7);
        recordBezierCurveTo(vaulter, ctx, 338.8, 237.6, 342.6, 240.9, 346.1, 241.9);
        recordBezierCurveTo(vaulter, ctx, 349.7, 242.9, 351.7, 244.8, 352.5, 245.3);
        recordBezierCurveTo(vaulter, ctx, 353.2, 245.9, 355.6, 245.7, 356.3, 244.9);
        recordBezierCurveTo(vaulter, ctx, 356.8, 244.2, 357.3, 242.8, 357.9, 242.0);
        recordBezierCurveTo(vaulter, ctx, 363.6, 236.3, 364.4, 236.8, 368.5, 234.1);
        recordBezierCurveTo(vaulter, ctx, 370.6, 237.6, 372.9, 240.5, 380.6, 247.0);
        recordBezierCurveTo(vaulter, ctx, 385.5, 251.0, 390.4, 246.3, 392.7, 242.5);
        ctx.fill();
        ctx.stroke();

        // vaulter/Path
        ctx.beginPath();
        recordMoveTo(vaulter, ctx, 410.8, 221.4);
        recordBezierCurveTo(vaulter, ctx, 410.2, 219.9, 408.7, 218.2, 404.7, 216.8);
        recordBezierCurveTo(vaulter, ctx, 403.2, 216.3, 398.7, 214.5, 398.7, 214.5);
        recordBezierCurveTo(vaulter, ctx, 398.7, 214.5, 396.7, 213.9, 395.3, 213.4);
        recordBezierCurveTo(vaulter, ctx, 394.0, 213.0, 390.6, 211.6, 388.8, 211.5);
        recordBezierCurveTo(vaulter, ctx, 384.3, 209.0, 381.2, 208.2, 371.4, 206.0);
        recordBezierCurveTo(vaulter, ctx, 371.4, 206.0, 367.7, 205.9, 365.3, 206.4);
        recordBezierCurveTo(vaulter, ctx, 363.8, 206.7, 360.6, 209.0, 360.6, 209.0);
        recordBezierCurveTo(vaulter, ctx, 360.6, 209.0, 359.2, 209.8, 359.1, 210.4);
        recordBezierCurveTo(vaulter, ctx, 359.1, 211.0, 360.6, 210.4, 361.1, 210.1);
        recordBezierCurveTo(vaulter, ctx, 362.1, 209.5, 363.7, 208.9, 364.5, 208.7);
        recordBezierCurveTo(vaulter, ctx, 365.4, 208.5, 365.9, 208.2, 366.0, 208.4);
        recordBezierCurveTo(vaulter, ctx, 366.1, 208.5, 366.5, 208.9, 366.2, 209.3);
        recordBezierCurveTo(vaulter, ctx, 365.9, 209.8, 365.8, 210.3, 365.0, 210.6);
        recordBezierCurveTo(vaulter, ctx, 364.4, 210.7, 363.5, 211.4, 363.8, 211.7);
        recordBezierCurveTo(vaulter, ctx, 364.2, 212.0, 365.0, 211.8, 365.2, 211.5);
        recordBezierCurveTo(vaulter, ctx, 365.5, 211.3, 366.7, 211.1, 367.5, 210.7);
        recordBezierCurveTo(vaulter, ctx, 368.2, 210.4, 369.4, 210.1, 369.8, 209.7);
        recordBezierCurveTo(vaulter, ctx, 370.0, 209.4, 370.3, 208.4, 370.3, 208.4);
        recordBezierCurveTo(vaulter, ctx, 377.7, 211.6, 381.9, 214.8, 386.6, 216.9);
        recordBezierCurveTo(vaulter, ctx, 389.6, 218.2, 397.2, 222.1, 397.2, 222.1);
        recordBezierCurveTo(vaulter, ctx, 397.2, 222.1, 402.8, 226.5, 404.9, 227.4);
        ctx.fill();
        ctx.stroke();

        // vaulter/Path
        ctx.beginPath();
        recordMoveTo(vaulter, ctx, 293.0, 342.2);
        recordLineTo(vaulter, ctx, 292.4, 76.4);
        recordBezierCurveTo(vaulter, ctx, 292.4, 76.4, 292.6, 75.4, 293.4, 75.4);
        recordBezierCurveTo(vaulter, ctx, 294.3, 75.4, 294.4, 76.4, 294.4, 76.4);
        recordLineTo(vaulter, ctx, 295.0, 342.2);
        recordLineTo(vaulter, ctx, 293.0, 342.2);
        ctx.closePath();
        ctx.fill();
        ctx.stroke();
        ctx.restore();
      }
    },

    function (ctx) {
      if (vaulter.visible) {

        // vaulter/Path
        ctx.save();
        ctx.beginPath();
        recordMoveTo(vaulter, ctx, 414.4, 254.0);
        recordBezierCurveTo(vaulter, ctx, 414.0, 252.3, 412.8, 249.7, 406.7, 249.0);
        recordBezierCurveTo(vaulter, ctx, 405.2, 248.8, 400.4, 248.0, 400.4, 248.0);
        recordBezierCurveTo(vaulter, ctx, 400.4, 248.0, 398.3, 247.8, 396.9, 247.7);
        recordBezierCurveTo(vaulter, ctx, 395.5, 247.5, 391.9, 246.8, 390.1, 247.1);
        recordBezierCurveTo(vaulter, ctx, 385.1, 245.6, 381.9, 245.5, 372.0, 245.4);
        recordBezierCurveTo(vaulter, ctx, 372.0, 245.4, 368.8, 244.9, 366.3, 245.0);
        recordBezierCurveTo(vaulter, ctx, 364.8, 245.1, 362.0, 245.9, 362.0, 245.9);
        recordBezierCurveTo(vaulter, ctx, 362.0, 245.9, 359.7, 247.3, 359.5, 247.9);
        recordBezierCurveTo(vaulter, ctx, 359.4, 248.5, 361.5, 248.5, 362.1, 248.2);
        recordBezierCurveTo(vaulter, ctx, 363.1, 247.8, 364.5, 246.8, 365.3, 246.8);
        recordBezierCurveTo(vaulter, ctx, 366.2, 246.7, 366.6, 246.8, 366.7, 247.1);
        recordBezierCurveTo(vaulter, ctx, 366.7, 247.2, 367.0, 247.7, 366.7, 248.0);
        recordBezierCurveTo(vaulter, ctx, 366.3, 248.4, 366.1, 249.0, 365.2, 249.2);
        recordBezierCurveTo(vaulter, ctx, 364.6, 249.4, 363.7, 250.1, 364.1, 250.4);
        recordBezierCurveTo(vaulter, ctx, 364.4, 250.7, 365.3, 250.4, 365.5, 250.2);
        recordBezierCurveTo(vaulter, ctx, 365.7, 249.9, 366.9, 249.9, 367.7, 249.5);
        recordBezierCurveTo(vaulter, ctx, 368.4, 249.2, 368.7, 248.6, 368.7, 248.6);
        recordLineTo(vaulter, ctx, 369.2, 247.9);
        recordBezierCurveTo(vaulter, ctx, 377.1, 249.5, 384.0, 251.9, 389.1, 252.9);
        recordBezierCurveTo(vaulter, ctx, 392.3, 253.5, 400.5, 255.7, 400.5, 255.7);
        recordBezierCurveTo(vaulter, ctx, 400.5, 255.7, 408.2, 259.6, 409.7, 259.3);
        recordBezierCurveTo(vaulter, ctx, 412.8, 258.9, 414.9, 255.6, 414.4, 254.0);
        ctx.closePath();
        ctx.fillStyle = "rgb(17, 92, 137)";
        ctx.fill();
        ctx.lineWidth = 0.5;
        ctx.strokeStyle = "rgb(141, 204, 255)";
        ctx.lineJoin = "miter";
        ctx.miterLimit = 4.0;
        ctx.stroke();

        // vaulter/Path
        ctx.beginPath();
        recordMoveTo(vaulter, ctx, 390.3, 266.8);
        recordBezierCurveTo(vaulter, ctx, 390.6, 256.6, 384.9, 243.5, 382.2, 242.5);
        recordBezierCurveTo(vaulter, ctx, 379.0, 241.3, 372.7, 247.9, 371.0, 250.1);
        recordBezierCurveTo(vaulter, ctx, 369.4, 252.3, 365.2, 257.9, 365.2, 257.9);
        recordBezierCurveTo(vaulter, ctx, 361.8, 255.4, 355.2, 254.3, 355.2, 254.3);
        recordBezierCurveTo(vaulter, ctx, 354.4, 253.1, 351.9, 253.0, 351.7, 253.9);
        recordBezierCurveTo(vaulter, ctx, 351.5, 254.8, 354.0, 256.6, 355.2, 257.1);
        recordBezierCurveTo(vaulter, ctx, 356.4, 257.6, 360.8, 261.6, 362.5, 263.8);
        recordBezierCurveTo(vaulter, ctx, 364.2, 266.0, 366.0, 264.7, 367.0, 263.8);
        recordBezierCurveTo(vaulter, ctx, 368.1, 262.9, 368.2, 260.9, 368.2, 260.9);
        recordBezierCurveTo(vaulter, ctx, 378.3, 255.0, 375.0, 255.6, 377.4, 254.1);
        recordBezierCurveTo(vaulter, ctx, 377.4, 254.1, 377.3, 254.6, 377.1, 257.7);
        recordBezierCurveTo(vaulter, ctx, 376.9, 260.8, 377.5, 263.9, 378.4, 268.8);
        recordBezierCurveTo(vaulter, ctx, 379.2, 273.7, 384.7, 274.5, 390.3, 271.6);
        ctx.fill();
        ctx.stroke();

        // vaulter/Path
        ctx.beginPath();
        recordMoveTo(vaulter, ctx, 410.8, 249.6);
        recordBezierCurveTo(vaulter, ctx, 410.8, 249.6, 412.5, 247.6, 414.1, 245.8);
        recordBezierCurveTo(vaulter, ctx, 414.6, 245.2, 415.3, 244.1, 416.0, 243.5);
        recordBezierCurveTo(vaulter, ctx, 418.9, 240.7, 424.1, 240.6, 426.6, 244.0);
        recordBezierCurveTo(vaulter, ctx, 429.3, 247.6, 427.0, 251.9, 423.9, 253.6);
        recordBezierCurveTo(vaulter, ctx, 422.4, 254.5, 419.4, 253.6, 417.3, 254.0);
        recordBezierCurveTo(vaulter, ctx, 415.1, 254.5, 413.9, 256.2, 413.9, 256.2);
        ctx.fill();
        ctx.stroke();

        // vaulter/Path
        ctx.beginPath();
        recordMoveTo(vaulter, ctx, 400.2, 249.7);
        recordBezierCurveTo(vaulter, ctx, 397.5, 251.6, 394.7, 254.2, 388.7, 257.6);
        recordBezierCurveTo(vaulter, ctx, 366.6, 240.4, 367.3, 240.4, 367.7, 240.4);
        recordBezierCurveTo(vaulter, ctx, 368.5, 240.3, 369.5, 239.9, 369.9, 240.0);
        recordBezierCurveTo(vaulter, ctx, 370.9, 240.2, 372.2, 239.9, 373.3, 239.7);
        recordBezierCurveTo(vaulter, ctx, 373.3, 239.7, 383.3, 246.3, 388.8, 247.9);
        recordBezierCurveTo(vaulter, ctx, 388.8, 247.9, 392.3, 249.9, 395.0, 251.1);
        recordBezierCurveTo(vaulter, ctx, 397.6, 252.3, 400.0, 253.4, 400.0, 253.4);
        recordBezierCurveTo(vaulter, ctx, 400.0, 253.4, 400.9, 255.0, 403.5, 257.0);
        ctx.fill();
        ctx.stroke();
        ctx.restore();
      }
    },

    function (ctx) {
      if (vaulter.visible) {

        // vaulter/Path
        ctx.save();
        ctx.beginPath();
        recordMoveTo(vaulter, ctx, 412.9, 286.8);
        recordBezierCurveTo(vaulter, ctx, 411.6, 286.1, 407.7, 286.1, 404.5, 286.6);
        recordBezierCurveTo(vaulter, ctx, 401.5, 285.8, 396.2, 283.8, 392.2, 283.8);
        recordBezierCurveTo(vaulter, ctx, 375.6, 281.6, 385.8, 282.9, 376.2, 281.9);
        recordBezierCurveTo(vaulter, ctx, 376.2, 281.9, 373.3, 280.9, 370.9, 281.2);
        recordBezierCurveTo(vaulter, ctx, 370.1, 281.3, 367.4, 282.7, 367.2, 282.8);
        recordBezierCurveTo(vaulter, ctx, 367.1, 283.0, 366.9, 283.6, 366.9, 283.6);
        recordBezierCurveTo(vaulter, ctx, 366.9, 283.6, 366.9, 283.8, 367.1, 284.1);
        recordBezierCurveTo(vaulter, ctx, 367.4, 284.4, 368.2, 284.8, 368.7, 284.6);
        recordBezierCurveTo(vaulter, ctx, 369.1, 284.4, 370.4, 283.0, 370.4, 283.0);
        recordBezierCurveTo(vaulter, ctx, 370.4, 283.0, 371.3, 282.6, 371.6, 282.6);
        recordBezierCurveTo(vaulter, ctx, 372.8, 282.4, 373.0, 283.3, 373.0, 283.5);
        recordBezierCurveTo(vaulter, ctx, 373.0, 283.8, 371.7, 284.7, 371.6, 284.7);
        recordBezierCurveTo(vaulter, ctx, 371.1, 284.7, 370.3, 285.1, 370.7, 285.7);
        recordBezierCurveTo(vaulter, ctx, 370.8, 285.9, 371.4, 285.8, 371.8, 285.6);
        recordBezierCurveTo(vaulter, ctx, 372.4, 285.4, 373.2, 284.9, 373.6, 284.9);
        recordBezierCurveTo(vaulter, ctx, 374.5, 284.8, 375.6, 284.3, 376.5, 283.9);
        recordBezierCurveTo(vaulter, ctx, 376.5, 283.9, 386.6, 287.7, 391.8, 288.1);
        recordBezierCurveTo(vaulter, ctx, 391.8, 288.1, 395.2, 289.2, 397.8, 289.7);
        recordBezierCurveTo(vaulter, ctx, 400.3, 290.2, 402.6, 290.8, 402.6, 290.8);
        recordBezierCurveTo(vaulter, ctx, 402.6, 290.8, 404.6, 293.0, 409.8, 294.5);
        recordBezierCurveTo(vaulter, ctx, 412.8, 295.3, 414.5, 292.5, 414.9, 291.4);
        recordBezierCurveTo(vaulter, ctx, 415.6, 288.9, 414.3, 287.6, 412.9, 286.8);
        ctx.closePath();
        ctx.fillStyle = "rgb(17, 92, 137)";
        ctx.fill();
        ctx.lineWidth = 0.5;
        ctx.strokeStyle = "rgb(141, 204, 255)";
        ctx.lineJoin = "miter";
        ctx.miterLimit = 4.0;
        ctx.stroke();

        // vaulter/Path
        ctx.beginPath();
        recordMoveTo(vaulter, ctx, 391.5, 291.7);
        recordBezierCurveTo(vaulter, ctx, 391.8, 282.5, 386.6, 270.8, 384.2, 269.8);
        recordBezierCurveTo(vaulter, ctx, 381.4, 268.8, 377.1, 269.4, 374.6, 269.6);
        recordBezierCurveTo(vaulter, ctx, 372.2, 269.9, 365.9, 270.7, 365.9, 270.7);
        recordBezierCurveTo(vaulter, ctx, 361.3, 265.9, 355.9, 265.0, 355.9, 265.0);
        recordBezierCurveTo(vaulter, ctx, 355.4, 263.7, 353.2, 263.2, 352.9, 264.0);
        recordBezierCurveTo(vaulter, ctx, 352.6, 264.8, 354.4, 266.8, 355.4, 267.4);
        recordBezierCurveTo(vaulter, ctx, 356.4, 268.1, 359.2, 271.5, 360.3, 273.7);
        recordBezierCurveTo(vaulter, ctx, 360.3, 273.7, 362.0, 275.5, 363.3, 275.6);
        recordBezierCurveTo(vaulter, ctx, 364.5, 275.7, 366.0, 274.0, 366.0, 274.0);
        recordBezierCurveTo(vaulter, ctx, 376.1, 276.9, 378.3, 275.8, 380.5, 274.5);
        recordBezierCurveTo(vaulter, ctx, 380.5, 274.5, 380.8, 281.1, 380.6, 283.9);
        recordBezierCurveTo(vaulter, ctx, 380.4, 286.6, 380.0, 289.1, 380.8, 293.5);
        recordBezierCurveTo(vaulter, ctx, 381.5, 297.9, 386.5, 298.7, 391.5, 296.1);
        ctx.fill();
        ctx.stroke();

        // vaulter/Path
        ctx.beginPath();
        recordMoveTo(vaulter, ctx, 414.2, 285.7);
        recordBezierCurveTo(vaulter, ctx, 414.2, 285.7, 416.5, 284.4, 418.7, 283.4);
        recordBezierCurveTo(vaulter, ctx, 419.4, 283.0, 420.4, 282.3, 421.3, 281.9);
        recordBezierCurveTo(vaulter, ctx, 425.0, 280.4, 429.9, 282.2, 431.0, 286.3);
        recordBezierCurveTo(vaulter, ctx, 432.1, 290.7, 428.4, 293.8, 424.9, 294.3);
        recordBezierCurveTo(vaulter, ctx, 423.2, 294.5, 420.7, 292.6, 418.6, 292.2);
        recordBezierCurveTo(vaulter, ctx, 416.4, 291.8, 414.6, 292.9, 414.6, 292.9);
        ctx.fill();
        ctx.stroke();

        // vaulter/Path
        ctx.beginPath();
        recordMoveTo(vaulter, ctx, 405.5, 281.7);
        recordBezierCurveTo(vaulter, ctx, 402.7, 282.4, 399.2, 284.7, 393.1, 285.6);
        recordBezierCurveTo(vaulter, ctx, 388.5, 286.2, 387.7, 287.1, 386.3, 287.6);
        recordBezierCurveTo(vaulter, ctx, 383.5, 288.6, 383.2, 289.2, 383.8, 293.0);
        recordBezierCurveTo(vaulter, ctx, 384.3, 296.8, 385.8, 297.3, 387.8, 298.0);
        recordBezierCurveTo(vaulter, ctx, 389.1, 298.3, 394.0, 296.4, 397.9, 296.8);
        recordBezierCurveTo(vaulter, ctx, 400.6, 297.1, 407.8, 296.8, 409.9, 296.5);
        recordBezierCurveTo(vaulter, ctx, 411.6, 296.3, 413.5, 294.3, 414.4, 293.7);
        recordBezierCurveTo(vaulter, ctx, 416.0, 292.5, 415.8, 289.7, 414.4, 286.0);
        recordBezierCurveTo(vaulter, ctx, 413.2, 282.9, 408.4, 281.0, 405.5, 281.7);
        ctx.closePath();
        ctx.fill();
        ctx.stroke();

        // vaulter/Path
        ctx.beginPath();
        recordMoveTo(vaulter, ctx, 391.8, 291.9);
        recordBezierCurveTo(vaulter, ctx, 391.8, 291.9, 390.8, 283.6, 389.7, 280.9);
        recordBezierCurveTo(vaulter, ctx, 388.6, 278.3, 387.2, 273.1, 385.7, 271.8);
        recordBezierCurveTo(vaulter, ctx, 385.2, 271.4, 384.6, 271.3, 382.7, 270.7);
        recordBezierCurveTo(vaulter, ctx, 378.5, 269.3, 371.4, 272.3, 366.7, 274.5);
        recordBezierCurveTo(vaulter, ctx, 363.1, 272.7, 358.4, 269.8, 355.6, 269.0);
        recordBezierCurveTo(vaulter, ctx, 355.6, 269.0, 353.9, 267.9, 353.2, 268.6);
        recordBezierCurveTo(vaulter, ctx, 352.5, 269.3, 355.1, 273.0, 358.0, 274.6);
        recordBezierCurveTo(vaulter, ctx, 360.8, 276.3, 362.2, 278.4, 362.8, 279.0);
        recordBezierCurveTo(vaulter, ctx, 363.3, 279.6, 364.1, 280.0, 365.1, 279.7);
        recordBezierCurveTo(vaulter, ctx, 365.8, 279.4, 367.0, 278.7, 367.8, 278.5);
        recordBezierCurveTo(vaulter, ctx, 373.6, 277.4, 377.0, 278.9, 381.0, 276.1);
        recordBezierCurveTo(vaulter, ctx, 380.5, 279.7, 379.1, 285.1, 381.0, 294.0);
        recordBezierCurveTo(vaulter, ctx, 382.2, 299.6, 388.5, 298.1, 392.0, 295.9);
        ctx.fill();
        ctx.stroke();

        // vaulter/Path
        ctx.beginPath();
        recordMoveTo(vaulter, ctx, 415.6, 291.6);
        recordBezierCurveTo(vaulter, ctx, 415.9, 291.1, 416.1, 290.5, 416.0, 290.0);
        recordBezierCurveTo(vaulter, ctx, 415.7, 288.5, 414.9, 286.1, 409.5, 284.9);
        recordBezierCurveTo(vaulter, ctx, 408.1, 284.6, 403.9, 283.4, 403.9, 283.4);
        recordBezierCurveTo(vaulter, ctx, 403.9, 283.4, 402.1, 283.1, 400.8, 282.8);
        recordBezierCurveTo(vaulter, ctx, 399.6, 282.5, 396.4, 281.6, 394.8, 281.7);
        recordBezierCurveTo(vaulter, ctx, 390.5, 279.9, 387.6, 279.5, 378.7, 278.5);
        recordBezierCurveTo(vaulter, ctx, 378.7, 278.5, 375.9, 277.8, 373.7, 277.7);
        recordBezierCurveTo(vaulter, ctx, 372.3, 277.6, 369.8, 278.1, 369.8, 278.1);
        recordBezierCurveTo(vaulter, ctx, 369.8, 278.1, 367.6, 279.2, 367.4, 279.7);
        recordBezierCurveTo(vaulter, ctx, 367.1, 280.2, 369.1, 280.4, 369.6, 280.2);
        recordBezierCurveTo(vaulter, ctx, 370.6, 279.9, 371.9, 279.1, 372.6, 279.2);
        recordBezierCurveTo(vaulter, ctx, 373.4, 279.2, 373.7, 279.3, 373.8, 279.6);
        recordBezierCurveTo(vaulter, ctx, 373.9, 279.7, 374.1, 280.1, 373.8, 280.4);
        recordBezierCurveTo(vaulter, ctx, 373.4, 280.7, 373.1, 281.2, 372.3, 281.4);
        recordBezierCurveTo(vaulter, ctx, 371.8, 281.5, 370.9, 282.0, 371.2, 282.3);
        recordBezierCurveTo(vaulter, ctx, 371.5, 282.6, 372.3, 282.4, 372.5, 282.2);
        recordBezierCurveTo(vaulter, ctx, 372.7, 282.0, 373.8, 282.1, 374.5, 281.8);
        recordBezierCurveTo(vaulter, ctx, 375.1, 281.6, 375.5, 281.1, 375.5, 281.1);
        recordLineTo(vaulter, ctx, 376.0, 280.5);
        recordBezierCurveTo(vaulter, ctx, 382.9, 282.7, 388.9, 285.4, 393.4, 286.8);
        recordBezierCurveTo(vaulter, ctx, 396.2, 287.6, 403.4, 290.3, 403.4, 290.3);
        recordBezierCurveTo(vaulter, ctx, 403.4, 290.3, 405.7, 291.8, 407.8, 293.0);
        ctx.fill();
        ctx.stroke();

        // vaulter/Path
        ctx.beginPath();
        recordMoveTo(vaulter, ctx, 293.0, 342.2);
        recordLineTo(vaulter, ctx, 289.9, 76.4);
        recordBezierCurveTo(vaulter, ctx, 289.9, 76.4, 290.0, 75.4, 290.8, 75.4);
        recordBezierCurveTo(vaulter, ctx, 291.5, 75.3, 291.7, 76.4, 291.7, 76.4);
        recordLineTo(vaulter, ctx, 295.0, 342.2);
        recordLineTo(vaulter, ctx, 293.0, 342.2);
        ctx.closePath();
        ctx.fill();
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
  
  function recordBezierCurveTo (obj, ctx, xctrl_1, yctrl_1, xctrl_2, yctrl_2, xpos, ypos) {
    obj.sequence[obj.current_seq].cache.push( {bezierCurveTo : [xctrl_1, yctrl_1, xctrl_2, yctrl_2, xpos, ypos]} );
    ctx.bezierCurveTo(xctrl_1, yctrl_1, xctrl_2, yctrl_2, xpos, ypos);
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
  
  function advanceAll () {
    getAllCels("advance");
  };

  function resetAllCels () {
    getAllCels("reset");
  };
  
  function emptyAllCaches () {
    getAllCels("emptyCache");
  };
  
  function advanceBreakpoint () {
    current_bp += 1;
    if (current_bp >= breakpoints.length) {
      current_bp = 0;
    }
  };

  /* ...only thinks about repeating calls to drawFrame()... */ 
  function animate () {
    if (current_frame >= frame_total) {
      // console.log("First condition: animate() exited on frame " + current_frame + ".");
      advanceAll();
      current_frame = 0;
      emptyAllCaches();
      current_bp = 0;
      animate.running = false;
      return "done";
    }
    if (current_frame >= breakpoints[current_bp]) {
      // console.log("Second condition: animate() exited on frame " + current_frame + ".");
      advanceBreakpoint(); 
      animate.running = false;
      return "done";
    }
    animate.running = true;
    drawFrame(a_queue); 
    // console.log(current_frame);
    advanceAll();
    current_frame += 1;
    setTimeout(animate, fps);
  };

  function play () {
    if (!animate.running) {
      current_bp = (breakpoints.length - 1);  // ### a chance current_bp becomes a negative number ###
      current_frame = 0;
      resetAllCels();
      animate();
    }
  };

  function stepThrough () {
    if (!animate.running) {
      animate();
    }
  };

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
  
  slider.load();
  scrubber.load();
  back.load();
  forward.load();
  track.load();
  vaulter.load();
  setFrameTotal();
  drawFrame(a_queue);
  
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
  };

  function playButtonBoundary (ctx) {
    ctx.save();
    ctx.strokeStyle = "rgb(0, 255, 0)";
    ctx.rect(42.8, 424.8, 104, 51);
    ctx.restore();
  };

  function stepButtonBoundary (ctx) {
    ctx.save();
    ctx.strokeStyle = "rgb(0, 0, 255)";
    ctx.rect(170.8, 424.8, 355, 51);
    ctx.restore();
  };

};

stage();

console.log("I can take you there. Just follow me.");
