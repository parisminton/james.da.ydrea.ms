(function () {
  
  this.bW = {
    
    // event handler helpers
    evts : {
    
      // ... cross-browser help for registering functions for events...
      listenFor : function (node, evt, func, capt, aargs) {
        var proc_id;
        
        // ...W3C-compliant browsers...
        if (node.addEventListener) {
          node.addEventListener(evt, func, capt);
        }
        // ...IE pre-9...
        else {
          if (node.attachEvent) { 
            node.attachEvent(("on" + evt), func);
          }
          // ...fall back to DOM level 0...
          else { 
            node[evt] = func;
          }
        }
        
        // ...store these values in a registry, so we can retrieve them...
        proc_id = ("process" + (this.registry.count + 1)); // unique id
        this.registry[proc_id] = {};
        this.registry[proc_id].node = node;
        this.registry[proc_id].evt = evt;
        this.registry[proc_id].func = func;
        this.registry[proc_id].capt = capt;
        if (aargs) {
          this.registry[proc_id].aargs = aargs; // additional arguments
        }
        else { 
          this.registry[proc_id].aargs = [];
        }
        
        // ...add a property to the function itself that stores the event type. by referencing the event type, we can recall the process ID and retrieve any additional arguments.
        if (!func.reg_ids) {
          func.reg_ids = {};
        }
        func.reg_ids[evt] = proc_id;
        
        this.registry.count += 1; // ...store the total number of registered listeners...
      },
      
      // ...reclaim the memory used by attaching the listeners...
      stopListening : function (node, evt, func, capt) {
        if (node.removeEventListener) {
          node.removeEventListener(evt, func, capt);
        }
        else {
          if (node.detachEvent) {
            node.detachEvent(('on' + evt), func);
          }
          else {
            node[evt] = null;
          }
        }
      },
      
      // ...detach a bunch of listeners. if there are listeners, this should really be fired on every window unload...
      stopAllListeners : function () {
        for (key in this.registry) {
          if (key != 'count') { // ...ignore the \'count\' variable...
            this.stopListening(this.registry[key].node, this.registry[key].evt, this.registry[key].func, this.registry[key].capt);
            delete this.registry[key];
            this.registry.count =- 1;
          };
        };
      },
      
      registry : { count : 0 },
      
      // ...a helper to make the event identifying more compact in each function that would use a listener...
      identify : function (evt) {
        evt = evt || window.event;
        evt.src = evt.target || evt.srcElement;
        return evt;
      },
      
      // ...retrieve the additional arguments from the registry...
      getAargs : function (func_ref, evt_type) {
        var proc_id = func_ref.reg_ids[evt_type];
        return bW.evts.registry[proc_id].aargs;
      },
      
      // ... override the default \'href\' destination on an \<a\> tag...
      cancelAnchorDefault : function () {
        return false;
      }
    },// end evts object
    
    
    
    
    
    // DOM helpers
    dom : {
      
      count : 0, // generic, non-global counter for use outside of functions...
      
      // ... return a node closer to the root of the DOM using one farther away...
      descendTree : function (elem, ancestor) {
        if (elem.nodeName == ancestor) {
          return elem;
        }
        else {
          if (elem.parentNode) {
            bW.dom.descendTree(elem.parentNode, ancestor);
          }
        }
      }      
    },// end dom object
 
    
    
    
    
    
    // nav helpers
    nav : {
      
      goHome : function () {
          window.location = "/";
      }
      
    },// end nav object
    
    
    
    
    
    
    
    // motion helpers
    motion : {
    
      // ...helpers for scrollPage and drawTerritories...
      getCurrYOffset : function () {
        // ...W3C-compliant browsers...
        if (self.pageYOffset) {
          return self.pageYOffset;
        };
        
        // ...IE6 standards mode...
        if (document.documentElement && document.documentElement.scrollTop) {
          return document.documentElement.scrollTop;
        };
        
        // ...IE6, 7 and 8...
        if (document.body.scrollTop) {
          return document.body.scrollTop;
        };
        
        // ...else we can\'t help you...
        return 0;
      },
      
      
      getDestYOffset : function (the_id) {
        var the_element = document.getElementById(the_id),
            y_pos = the_element.offsetTop,
            node = the_element;
        while (node.offsetParent && node.offsetParent != document.body) {
          node = node.offsetParent;
          y_pos += node.offsetTop;
        };
        return y_pos;
      },
      
      
      scrollPage : function () {
        
        // ...for an explanation of the math, see slideBg() starting on 211...
        var the_id = bW.env.buttons[bW.env.current].dest,
            curr_pos = bW.motion.getCurrYOffset(),
            dest = bW.motion.getDestYOffset(the_id),
            distance = (dest > curr_pos) ? (dest - curr_pos) : (curr_pos - dest),
            speed = Math.round(distance / 100),
            inc = Math.round(distance / 25),
            leap = (dest > curr_pos) ? (curr_pos + inc) : (curr_pos - inc),
            timer = 0,
            scr = function () {
              window.scrollTo(0, leap);
            };
        
        bW.env.autoscrolling = true; // ...still in the process of scrolling...
        
        if (distance < 100) {
          window.scrollTo(0, dest);
          bW.env.autoscrolling = false;
          return false;
        };
        if (speed >= 20) {
          speed = 20;
        }
        if (dest > curr_pos) {
          for (var i = curr_pos; i < dest; i += inc ) {
          
            // ... i don\'t like the compiled method of setTimeout, but i haven\'t figured out a solution yet... scr() on line 164 doesn\'t work yet... // here and below, we add 130 pixels to give room for the fixed nav bar at the top of the screen...
            setTimeout('window.scrollTo(0, ' + (leap - 130) + ')', timer * speed);
            leap += inc;
            if (leap > dest) {
              leap = dest;
            };
            timer++;
          };
          bW.env.autoscrolling = false; // ...done scrolling...
          return false;
        };
        for (var i = curr_pos; i > dest; i -= inc ) {
          setTimeout('window.scrollTo(0, ' + (leap - 130) + ')', timer * speed);
          leap -= inc;
          if (leap < dest) {
            leap = dest;
          };
          timer++;
        };
        bW.env.autoscrolling = false; // ...done scrolling...
        return false;
      },
      
      /* ... a tester for reading the yoffset value...
      compass : function () {
        console.log(bW.motion.getCurrYOffset());
      },
      */
      
      // ... is a recursive slider function firing? false by default...
      sliding : false,
  
      slideBg : function () {
        var slider = bW.env.slider,
            dest = bW.env.buttons[bW.env.current].position,
            curr_pos, distance, inc, wait;

        /* ...get the value of the background image\'s current left position... */		
        
        /* ...FF, Safari, IE7, 8, and Opera... */ 
        if (document.defaultView.getComputedStyle) {
          curr_pos = parseInt(document.defaultView.getComputedStyle(slider, null).getPropertyValue('background-position'));
        }
        else if (slider.currentStyle) {
          /* ...IE pre-9... */
          curr_pos = parseInt(slider.currentStyle.backgroundPositionX);
        }
        else {
          return false;
        }

        /* ... if the current position equals the destination, exit... */
        if (curr_pos == dest) {
          bW.motion.sliding = false;
          return true;
        }
        
        /* ... if the current position doesn't exist, set it to zero... */
        if (!curr_pos || curr_pos == '' || isNaN(curr_pos)) {
          curr_pos = 0;
        }
        
        /* ... calculate the distance between the current position and destination... */
        distance = (dest - curr_pos);

        /* ... if the difference is negative, make it positive... */
        if (distance < 0) {
          distance = (0 - distance);
        }
        
        /* ... calculate a fraction of that distance.. */
        inc = Math.ceil(distance / 5);
        
        bW.motion.sliding = true;
        /* ... if the current position is less than the destination, slide the background image forward... */
        if (curr_pos < dest) {
          curr_pos += inc;
          slider.style.backgroundPosition = curr_pos + 'px 98px';
        }
        
        /* ... if the current position is greater than the destination, slide the background image backward... */
        else {
          curr_pos -= inc;
          slider.style.backgroundPosition = curr_pos + 'px 98px';
        }
        
        /* ... repeat until the current position equals the destination... */
        wait = setTimeout(bW.motion.slideBg, 50);
      }
  
    },// end motion object
    
    
    
    
    
    
    
    // ... an object for environment-specific functions, like element references and convenience variables; if the rest of this file is mostly helpers from the library that change very little and can be reused, this area will contain most of the distinct functions and variables for a specific page...
    env : {
      
      // ... is a recursive scroll function currently firing? false by default...
      autoscrolling : false, 
    
      // ... has there been recent scroll? false by default...
      recentscroll : false,
      
      // ... give a one-second window before firing any onscroll event functions.
      scrollAlert : function () {
        bW.env.recentscroll = true;
        var wait = setTimeout(bW.env.scrollAlertOff, 1000);
      },
      
      scrollAlertOff : function () {
        bW.env.recentscroll = false;
      },
      
      checkScroll : function () {
        return recentscroll;
      },
      
      toon : document.getElementById('toon'),
    
      buttons : {},
      
      slider : document.getElementById('slider'),
      
      current : 'nav-carousel', // ... the current territory; carousel by default...
      
      // ... change bW.env.current when the reader clicks a button. this affects the calculations in scrollBg() and slide()...
      update : function (evt) {
        var ev = bW.evts.identify(evt),
            key = ev.src.parentNode.parentNode.id;
        
        bW.env.current = key;
        return key;
      },
      
      // ... populate that empty buttons object; we want to store the reference to the corresponding button, the string scrollBg() uses to determine the destination territory, the yoffset value where the territory begins, and the background position of the slider arrow for each button...
      setup : function () {
        var refs = [
              document.getElementById('nav-carousel'),
              document.getElementById('nav-balloon'),
              document.getElementById('nav-widgetry')
            ],
            len = refs.length,
            i;
        
        for (i = 0; i < len; i +=1) {
          
          // ...deep object population in a loop... for the sake of your own sanity, please, please save this somewhere and reuse it...
          bW.env.buttons[refs[i].id] = {
            elem : refs[i],
            // ...the distance between each point is 150 pixels, starting at 50...
            position : (((i + 1) * 150) - 100)
          };
        }
        bW.env.buttons['nav-carousel'].dest = 'carouselanchor';
        bW.env.buttons['nav-balloon'].dest = 'balloonanchor';
        bW.env.buttons['nav-widgetry'].dest = 'widgetanchor';
      },
      
      // ... divide the screen into \'territories\', so that scrolling into one from another can trigger an event, like slideBg()...
      drawTerritories : function () {
        for (key in bW.env.buttons) {
          bW.env.buttons[key].territory = (bW.motion.getDestYOffset(bW.env.buttons[key].dest) - 200);
        }
      },
      
      // ... now check those territories. we\'ll likely fire this from an event...
      checkTerritories : function () {
        
        if (!bW.env.autoscrolling) { // ... don\'t fire during a recursive scroll...
          var curr_pos = bW.motion.getCurrYOffset(),
              wait;
  
          if (curr_pos < bW.env.buttons['nav-balloon'].territory - 100) {
            bW.env.current = 'nav-carousel';
          }
          else if (curr_pos > bW.env.buttons['nav-carousel'].territory - 100 &&
              curr_pos < bW.env.buttons['nav-widgetry'].territory - 150) {
            bW.env.current = 'nav-balloon';
          }
          else if (curr_pos > (bW.env.buttons['nav-widgetry'].territory - 150)) {
            bW.env.current = 'nav-widgetry';
          }
          bW.motion.slideBg();
        }
      }
    
    }// end env object



  }// end bW object
  
  // ...one-off functions and declarations can go here...
  
 

  

}());// end immediate function

bW.env.setup();
bW.env.drawTerritories();

// ... attach several listeners en masse...
(function () {
  for (key in bW.env.buttons) {
    bW.evts.listenFor(bW.env.buttons[key].elem, 'click', bW.env.update, false);
    bW.evts.listenFor(bW.env.buttons[key].elem, 'click', bW.motion.slideBg, false);
    bW.evts.listenFor(bW.env.buttons[key].elem, 'click', bW.motion.scrollPage, false);
    
    /* ... scrollPage overrides the normal link, so cancel the anchor -> name behavior when the user clicks on the <a> tag. */
    bW.env.buttons[key].elem.firstChild.onclick = bW.evts.cancelAnchorDefault;
  }
  bW.evts.listenFor(window, 'scroll', bW.env.checkTerritories, false);
  bW.evts.listenFor(window, 'load', bW.env.checkTerritories, false);
}());

window.onunload = bW.evts.stopAllListeners;

// alert('I can take you there. Just follow me.');
