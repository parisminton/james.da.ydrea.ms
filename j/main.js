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



    imgswaps : {
      
      preload : function (path) {
        var images = [],
            args = [],
            i,
            len = arguments.length,
            shortname,
            the_image;
        if (len == 2 && typeof arguments[1] == "object") {
          for (key in arguments[1]) {
            args.push(arguments[1][key]);
          }
        }

        else {
          for (i = 0; i < (len - 1); i += 1) {
            args[i] = arguments[(i + 1)];
          }
        }
        len = args.length;
        for (i = 0; i < len; i += 1) {
          shortname = bW.strings.getFileName(bW.styles.getStyle(args[i], "backgroundImage"));
          the_image = new Image();
          the_image.src = path + shortname;
          images.push(the_image);
          // for togglers
          if (shortname.match(/_off\.|_on\./)) {
            the_image = new Image();
            the_image.src = path + bW.strings.toggler(shortname);
            images.push(the_image);
          }
        }
      },
      
      toggleBg : function (evt) {
        var ev = bW.evts.identify(evt),        
            image_path = bW.styles.getStyle(ev.src, "backgroundImage").split(/_off\.|_on\./),
            suffix;
        
        if (ev.src.nodeName == "UL") {
          if (ev.type == "mouseover") {
            suffix = "_on.";
          }
          else {
            suffix = "_off.";
          }
          
          ev.src.style.backgroundImage = image_path[0] + suffix + image_path[1];
    
        }
      },
      
      toggleNavBg : function (evt) {
        var ev = bW.evts.identify(evt),        
            image_path = bW.styles.getStyle(ev.src.parentNode, "backgroundImage").split(/_off\.|_on\./),
            suffix,
            page = document.getElementsByTagName("body")[0].id.replace("-page", "");
        if (ev.src.nodeName == "A") {
          if (ev.type == "mouseover") {
            suffix = "_on.";
          }
          if (ev.type == "mouseout") {
            suffix = "_off.";
          }
          if (ev.src.parentNode.id.indexOf(page) == -1) {
            ev.src.parentNode.style.backgroundImage = image_path[0] + suffix + image_path[1];
          }
        }
      },
      
      toggleSprite : function (evt) {
        var ev = bW.evts.identify(evt),
            aargs = bW.evts.getAargs(bW.imgswaps.toggleSprite, ev.type);
        if (ev.type == "mouseover") {
          ev.src.style.backgroundPosition = aargs[0][0] + " " + aargs[0][1];
        }
        if (evt.type == "mouseout") {
          ev.src.style.backgroundPosition = aargs[1][0] + " " + aargs[1][1];
        }
      }
    },
    
    // style retreival
    styles : {
      
      cssProps : {
        background : "background",
        backgroundAttachment : "background-attachment",
        backgroundColor : "background-color",
        backgroundImage : "background-image",
        backgroundPosition : "background-position",
        backgroundPositionX : "backgroundPositionX",
        backgroundPositionY : "backgroundPositionY",
        backgroundRepeat : "background-repeat",
        border : "border",
        borderBottom : "border-bottom",
        borderBottomColor : "border-bottom-color",
        borderBottomStyle : "border-bottom-style",
        borderBottomWidth : "border-bottom-width",
        borderCollapse : "border-collapse",
        borderColor : "border-color",
        borderLeft : "border-left",
        borderLeftColor : "border-left-color",
        borderLeftStyle : "border-left-style",
        borderLeftWidth : "border-left-width",
        borderRight : "border-right",
        borderRightColor : "border-right-color",
        borderRightStyle : "border-right-style",
        borderRightWidth : "border-right-width",
        borderSpacing : "border-spacing",
        borderStyle : "border-style",
        borderTop : "border-top",
        borderTopColor : "border-top-color",
        borderTopStyle : "border-top-style",
        borderTopWidth : "border-top-width",
        borderWidth : "border-width",
        bottom : "bottom",
        clear : "clear",
        clip : "clip",
        color : "color",
        content : "content",
        cursor : "cursor",
        direction : "direction",
        display : "display",
        font : "font",
        fontFamily : "font-family",
        fontSize : "font-size",
        fontSizeAdjust : "font-size-adjust",
        fontStretch : "font-stretch",
        fontStyle : "font-style",
        fontVariant : "font-variant",
        fontWeight : "font-weight",
        height : "height",
        left : "left",
        margin : "margin",
        opacity : "opacity",
        orphans : "orphans",
        outline : "outline",
        overflow : "overflow",
        padding : "padding",
        position : "position",
        quotes : "quotes",
        right : "right",
        top : "top",
        visibility : "visibility", 
        widows : "widows",
        width : "width",
        zIndex : "z-index"
      },
    },
    
    // string manipulation
    strings : {
      getFileName : function (string) {
        var filename,
            index1 = (string.lastIndexOf("/") + 1),
            index2,
            bookend = /\"\)|\)/;
        if (string.search(bookend) != -1) {
          index2 = string.search(bookend);
          filename = string.substring(index1, index2);
        }   
        else {
          filename = string.substring(index1);
        }   
        return filename;
      },
      
      toggler : function (filename) {
        var find = /_off\.|_on\./,
            match = filename.match(find),
            suffix,
            new_filename,
            split_array;
        if (match == "_off.") {
          suffix = "_on.";
        }
        else {
          suffix = "_off.";
        }
        split_array = filename.split(match);
        new_filename = split_array[0] + suffix + split_array[1];
        return new_filename;
      },

      // ... handy for converting CSS attributes to their style object properties ...
      hyphenToCamelCase : function (string) {
        var i, len, split_array; 
        if (string.indexOf("-") == -1) {
          return string;
        }
        split_array = string.split("-");
        len = split_array.length;
        for (i = 1; i < len; i += 1) {
          split_array[i] = split_array[i].replace(split_array[i].charAt(0), split_array[i].charAt(0).toLocaleUpperCase());
        }
        return split_array.join("");
      }
    },
    


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
    
    },// end env object



    // document references
    page : {
      the_nav : document.getElementById("nav"),
      nav_lis : [
        document.getElementById("nav-about"),
        document.getElementById("nav-work"),
        document.getElementById("nav-contact")
      ],
      cb : document.forms["contact-form"]["contact-conf"],
      l : document.getElementById("conf"),
      form_name : document.getElementById("contact-name"),
      form_email : document.getElementById("contact-email"),
      form_msg : document.getElementById("contact-msg")
    },
    
    bail : function () {
      alert('Started when I was nine years old.');
    },
    
    
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
        
        // ...for an explanation of the math, see slideBg()...
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
      
      expandElem : function() {
        bW.motion.slide("height", false, false);
      },
      
      slide : function (prop, horizontal, twodimensions) {
        var slider = bW.env.slider,
            dest = bW.env.buttons[bW.env.current].position,
            curr_pos, distance, inc, wait;

        /* ...get the value of the background image\'s current left position... */		
       
        /* ... the style model is now picked at load time. we can test for bW.env.style_model...
        the idea here is this function does the math, which never changes, passing in css properties depending on the type of animation. */


        /* ...FF, Safari, IE7, 8, and Opera... */ 
        if (document.defaultView && document.defaultView.getComputedStyle) {
          curr_pos = parseInt(document.defaultView.getComputedStyle(slider, null).getPropertyValue(smProperties[style_model][prop]));
        }
        else if (slider.currentStyle) {
          /* ...IE pre-9... */
          curr_pos = parseInt(slider.currentStyle[smProperties[style_model][prop]]);
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
          slider.style[prop] = curr_pos + 'px 98px';
        }
        
        /* ... if the current position is greater than the destination, slide the background image backward... */
        else {
          curr_pos -= inc;
          slider.style[prop] = curr_pos + 'px 98px';
        }
        
        /* ... repeat until the current position equals the destination... */
        wait = setTimeout(bW.motion.slide, 50);
      },
  
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

    
    // window calculations
    viewport : {
      
      // core code from http://www.quirksmode.org
      getPageSize : function() {
		  	var scroll_x,
            scroll_y,
            window_width,
            window_height,
            page_width,
            page_height;
		  	if (window.innerHeight && window.scrollMaxY) {	
		  		scroll_x = window.innerWidth + window.scrollMaxX;
		  		scroll_y = window.innerHeight + window.scrollMaxY;
		  	}
		  	else if (document.body.scrollHeight > document.body.offsetHeight) {
		  		scroll_x = document.body.scrollWidth;
		  		scroll_y = document.body.scrollHeight;
		  	}
		  	else {
		  		scroll_x = document.body.offsetWidth;
		  		scroll_y = document.body.offsetHeight;
		  	}
		  	
		  	if (self.innerHeight) {
		  		if (document.documentElement.clientWidth) {
		  			window_width = document.documentElement.clientWidth; 
		  		}
		  		else {
		  			window_width = self.innerWidth;
		  		}
		  		window_height = self.innerHeight;
		  	}
		  	else if (document.documentElement && document.documentElement.clientHeight) {
		  		window_width = document.documentElement.clientWidth;
		  		window_height = document.documentElement.clientHeight;
		  	}
		  	else if (document.body) {
		  		window_width = document.body.clientWidth;
		  		window_height = document.body.clientHeight;
		  	}	
		  	if (scroll_y < window_height) {
		  		page_height = window_height;
		  	}
		  	else { 
		  		page_height = scroll_y;
		  	}
      
		  	if (scroll_x < window_width) {	
		  		page_width = scroll_x;		
		  	}
		  	else {
		  		page_width = window_width;
		  	}
		  	return [page_width, page_height, window_width, window_height];
		  }
		},
    
    // form processing
    forms : {
      swapCheckbox: function (elem) {
        if (elem) {
          var sp,
              clone = elem.cloneNode(true);
          clone.style.visibility = "hidden";
          sp = document.createElement("span");
          sp.id = "newcheckbox";
          sp.appendChild(clone);
          sp.clicked = false;
          bW.evts.listenFor(sp, "click", bW.forms.updateNewCheckbox, false, [bW.page.cb, bW.page.l]);
          bW.evts.listenFor(sp, "mouseover", bW.forms.updateNewCheckbox, false);
          bW.evts.listenFor(sp, "mouseout", bW.forms.updateNewCheckbox, false);
          elem.parentNode.replaceChild(sp, elem);
        }
      },
    
      updateNewCheckbox : function (evt) {
        if (document.forms["contact-form"]["contact-conf"]) {
          var /* aargs, */
              cb = document.forms["contact-form"]["contact-conf"],
              l = document.getElementById("conf");
              evt = bW.evts.identify(evt);
              /* aargs = bW.evts.getAargs(bW.forms.updateNewCheckbox, evt.type); */
          if (evt.type == "mouseover" && (!this.clicked)) {
            this.style.backgroundPosition = "-18px top";
          }
          if (evt.type == "mouseout" && (!this.clicked)) {
            this.style.backgroundPosition = "left top";
          }
          if (evt.type == "click") {
            if (!this.clicked) {
              this.clicked = true;
              this.style.backgroundPosition = "-36px top";
              cb.checked = true;
              l.firstChild.nodeValue = "A copy of this message will be sent to you.";
            }
            else {
              this.clicked = false;
              this.style.backgroundPosition = "left top";
              cb.checked = false; 
              l.firstChild.nodeValue = "Want a copy of this message?";
            }
          }
        }
      },
      
      placeholder : function (evt) {

        var default_val,
            evt = bW.evts.identify(evt);
        
        if (evt.src.id == "contact-name") {
          default_val = "Your name";
        }
        if (evt.src.id == "contact-email") {
          default_val = "Your e-mail address";
        }
        if (evt.src.id == "contact-msg") {
          default_val = "So... a penguin, Optimus Prime and Supreme Court Justice Sonia Sotomayor walk into a bar...";
        }
        
        if (evt.type == "focus") {
          if (evt.src.value == default_val) {
            evt.src.value = '';
            evt.src.style.color = "#666666";
          }
        }
        
        if (evt.type == "blur") {
          if (evt.src.value == '') {
            evt.src.value = default_val;
            evt.src.style.color = "#fff";
          }
        }
      },

      validate : function (evt) {
        var re,
            nonalpha,
            len,
            i,
            white = /\s/,
            tld = /\.[a-z]{2,4}$|\.museum$|\.travel$/i,
            evt = bW.evts.identify(evt),
            alert_msg = ["Please fix the following before sending this e-mail:\n"];
        if (evt.src.id == "contact-name") {
          re = /\W/;
          if (re.test(evt.src.value)) {
            nonalpha = re.exec(evt.src.value);
            i;
            len = nonalpha.length;
            for (i = 0; i < len; i += 1) {
              if (nonalpha[i] != " ") {
                alert_msg.push("  - Your name can only contain alphanumeric characters.");
              alert(alert_msg.join("\n"));
              break;
              }
            }
          }
        }
        
        if (evt.src.id == "contact-email") {
          re = /^[a-z0-9+._-]+@[a-z0-9.-]+\.[a-z]{2,4}$|^[a-z0-9+._-]+@[a-z0-9.-]+\.museum$|^[a-z0-9+._-]+@[a-z0-9.-]+\.travel$/i;
          if (!re.test(evt.src.value)) {
            if (white.test(evt.src.value)) {
              alert_msg.push("  - Your e-mail address can\'t contain any whitespace.");
            }
            if (evt.src.value.indexOf('@') == -1) {
              alert_msg.push("  - Your e-mail address must include one \"at\" sign \(@\).");
            }
            if (evt.src.value.indexOf('.') == -1) {
              alert_msg.push("  - Your e-mail address must include a period.");
            }
            if (evt.src.value.indexOf('.') != -1 && !tld.test(evt.src.value)) {
              alert_msg.push("  - The top-level domain of your e-mail address \(everything after the last period\) needs fixing. It should be between two and four letters long, or the terms \"museum\" or \"travel\".");
            }
            alert(alert_msg.join("\n"));
          }
        }
      }
    }
  }; // ... end bW object. still inside the immediate function...

  // ... figure out which method of reporting DOM styles the browser is using... 
  (function () {
    var ghost = document.createElement("div"),
        bod = document.getElementsByTagName("body")[0];
        // bod.appendChild(ghost);
    if (document.defaultView && document.defaultView.getComputedStyle) {
      bW.env.style_model = "getComputedStyle";
      bW.styles.getStyle = function (elem, prop) {
        return document.defaultView.getComputedStyle(elem, null).getPropertyValue(bW.styles.cssProps[prop]); 
      };
    }
    else if (ghost.currentStyle) {
      bW.env.style_model = "currentStyle";
      bW.styles.getStyle = function (elem, prop) {
        return elem.currentStyle[prop]; 
      };
    }
  }());
  
  // ... work object. all this stuff needs to be stored in a database...
  var work = {
    christchild : new WorkObj (
      "Christ Child House",
      document.getElementById("img-christchild"),
      "../a/christchild_24bit.png",
      "thumb-christchild",
      "http://web.archive.org/http://www.freep.com/christchild",
      "http://web.archive.org/web/20090818101308/http://www.freep.com/christchild",
      "design / markup / scripting",
      [
      "I designed and coded this Emmy-winning presentation about boys in foster care while I was at the <a href=\"http://www.freep.com\" target=\"_new\">Detroit Free Press</a>. My editors got detailed Illustrator mock-ups for approval, then I took all the .ai files to Photoshop for layer work and cutting. I hand-coded all pages using XHTML, CSS and JavaScript, then my editor <a href=\"http://www.linkedin.com/in/pbyrne\" target=\"_new\">Pat Byrne</a> and I turned them into SaxoTech templates.",
      "Unfortunately, these templates were overwritten with <a href=\"http://www.freep.com\" target=\"_new\">Freep.com</a>\'s redesign in January. Right now, the Wayback Machine has the only live instance of this package as it originally appeared."
      ],
      "code",
      "spubble"
    ),
    spubble : new WorkObj (
      "Spubble Lite",
      document.getElementById("img-spubble"),
      "../a/spubble_24bit.png",
      "thumb-spubble",
      "See it in the iTunes Store",
      "http://itunes.apple.com/us/app/spubble-lite/id408355153?mt=8",
      "design",
      [
        "As part of a 48-hour hackathon at the University of Michigan, I created most of the interface elements and several icons for this mobile app conceived by <a href=\"http://www.linkedin.com/in/jasteinerman\" target=\"_new\">Jake Steinerman</a> to help autistic kids learn and communicate. I created everything in Illustrator, then brought the vectors to Photoshop for resizing, cutting and layer work. I worked with the coding team side-by-side and virtually in a shared repository.",
        "That weekend, I got to work with Wacom\'s draw-directly-on-the-screen-Cintiq display. Very cool. Thanks, U-M, and thanks to Dan Fessahazion for letting us crash in Design Lab One."
      ],
      "christchild",
      "naomi"
    ),
    naomi : new WorkObj (
      "naomirpatton.com",
      document.getElementById("img-naomi"),
      "../a/naomi_24bit.png",
      "thumb-naomi",
      "http://www.naomirpatton.com",
      "http://www.naomirpatton.com",
      "design / markup / scripting",
      ["This portfolio site for <a href=\"http://www.freep.com\" target=\"_new\">Detroit Free Press</a> reporter <a href=\"http://www.linkedin.com/in/naomirpatton\" target=\"_new\">Naomi R. Patton</a> uses <a href=\"http://www.typekit.com\" target=\"_new\">Typekit</a> to serve fonts to browsers that support the @font-face declaration. It also uses the jQuery lightbox library, which inspired me to write my own lightbox functions for this site."],
      "spubble",
      "histvotes"
    ),
    histvotes : new WorkObj (
      "SE Michigan's presidential votes",
      document.getElementById("img-histvotes"),
      "../a/histvotes_24bit.png",
      "thumb-histvotes",
      "http://james.da.ydrea.ms/historicalvotes",
      "http://james.da.ydrea.ms/historicalvotes",
      "design / markup / scripting",
      [
        "This huge stats table uses my easing animation script for easier viewing.",
        "It was to be a project for the <a href=\"http://www.freep.com\" target=\"_new\">Detroit Free Press Web site</a> during the 2008 presidential election, but was shelved when we needed to shift gears to accomodate an even bigger election package from Gannett, our parent company. It was never completed, and this is just a model to show off its functionality.",
        "I ended up using an improved version of this easing script in the Christ Child House project later that year.",
        "Click on the red buttons below the table to bring tallies into view."
      ],
      "naomi",
      "code"
    ),
    code : new WorkObj (
      "My GitHub repositories",
      document.getElementById("img-code"),
      "../a/code_24bit.png",
      "thumb-code",
      "https://github.com/parisminton",
      "https://github.com/parisminton",
      "miscellaneous code",
      ["Here's where I store my code, and where you can peek under the hood of much of my stuff."],
      "histvotes",
      "christchild"
    )
  };



  function darken() {
    var current_opacity;
    
    lightbox.shade.style.display = "block";
    // DOM
    if (window.getComputedStyle) {
    // won\'t work if this value isn't turned into a float
    current_opacity = parseFloat(document.defaultView.getComputedStyle(lightbox.shade, null).getPropertyValue("opacity"));
    if (current_opacity >= 0.8) {
    	return true;
    }
    current_opacity += 0.075;
    lightbox.shade.style.opacity = current_opacity;
    }
    // IE
    else if (lightbox.shade.currentStyle) {
    	current_opacity = lightbox.shade.currentStyle.filter.match(/\d+/);
    	current_opacity = Number(current_opacity);
    	if (current_opacity >= 80) {
    		return true;
    	}
    	current_opacity += 5;
    	lightbox.shade.style.filter = "alpha(opacity=" + current_opacity + ")";
    }
    
    else {
      lightbox.shade.style.display = "block";
      if (lightbox.shade.currentStyle != null) {
        lightbox.shade.style.filter = "alpha(opacity=80)";
      }
      else if (document.defaultView.getComputedStyle != null) {
        lightbox.shade.style.opacity = "0.8";
    	}
    }
    var wait = setTimeout(darken, 1);
  };
  
  
  function lighten() {
    var current_opacity;
    
    // DOM
    if (window.getComputedStyle) {
    
    // won\'t work if this value isn't turned into a float
    current_opacity = parseFloat(document.defaultView.getComputedStyle(lightbox.shade, null).getPropertyValue("opacity"));
    if (current_opacity <= 0.1) {
      lightbox.shade.style.opacity = "0";
      lightbox.shade.style.display = "none";
    	return true;
    }
    current_opacity -= 0.075;
    lightbox.shade.style.opacity = current_opacity;
    }
    // IE
    else if (lightbox.shade.currentStyle) {
    	current_opacity = lightbox.shade.currentStyle.filter.match(/\d+/);
    	current_opacity = Number(current_opacity);
    	if (current_opacity <= 0) {
        lightbox.shade.style.display = "none";
    		return true;
    	}
    	current_opacity -= 5;
    	lightbox.shade.style.filter = "alpha(opacity=" + current_opacity + ')';
    }
    
    else {
      if (typeof lightbox.shade.style.filter != "undefined") {
        lightbox.shade.style.filter = "alpha(opacity=0)";
      }
      else if (typeof lightbox.shade.style.opacity != "undefined") {
        lightbox.shade.style.opacity = "0";
    	}
    	lightbox.shade.style.display = "none";
    }
    var wait = setTimeout(lighten, 1);
  };








  function WorkObj(title, img_ref, img_src, thumb_id, link, url, sd, ld, previous, next) {
    if (!(this instanceof WorkObj)) {
      return new WorkObj(title, img_ref, img_src,  thumb_id, link, url, sd, ld, previous, next);
    }
    this.title = title;
    this.img = new Image();
    this.img.ref = img_ref;
    this.img.src = img_src;
    this.thumb_id = thumb_id;
    this.link = link;
    this.url = url;
    this.sd = sd;
    this.ld = ld;
    this.previous = previous;
    this.next = next;
  }
  WorkObj.prototype.announce = function (evt) {
    var ev = bW.evts.identify(evt),
        item = document.getElementById("work-current-item"),
        sd = document.getElementById("work-current-shortdesc");
    if (ev.type == "mouseover") {
      item.innerHTML = this.title; 
      sd.innerHTML = this.sd;
    }
    if (ev.type == "mouseout") {
      item.innerHTML = "";
      sd.innerHTML = "";
    }
  };

  // page operations
  function batchAddChildren(container) {
    var contain = document.getElementById(container),
        i,
        len = arguments.length,
        frag = document.createDocumentFragment();
    if (len < 2) {
      alert("Error from batchAddChildren:\n\n  - This function needs at least one more argument\: The elements to be inserted\:\n\n batchAddChildren\(container, element1_to_insert \[, element_2_to_insert, element3_to_insert, ...\]\n\n");
    }
    else {
      for (i = 1; i < len; i += 1) {
        elem = elementFactory(arguments[(i)]);
        frag.appendChild(elem);
      }
    }
    contain.appendChild(frag);
  };

  function elementFactory() {
    var i,
        j,
        len = arguments.length,
        elems = [],
        el,
        len2;
    for (i = 0; i < len; i += 1) {
      if (typeof arguments[i] == "string") {
        el = document.createElement(arguments[i]);
        elems.push(el);
      }
      else {
        for (key in arguments[i]) {
          len2 = arguments[i][key].length;
          if ((len2 % 2) != 0) {
            alert("Error from elementFactory:\n\n  - An element is one argument short. Element objects need string arguments passed in pairs\:\n\n\  [\"attribute_name1\", \"attribute_value1\", \"attribute_name2\", \"attribute_value2\"\].\n\n");
          }
          else {
            el = document.createElement(key);
              for (j = 0; j < len2; j += 2) {
                el[arguments[i][key][j]] = arguments[i][key][(j + 1)];
              }  
            elems.push(el);
          }
        }
      }
    }
    if (len == 1) {
      return elems[0];
    }
    else {
      return elems;
    }
  };
  
  var thumb_coords = [ ["left", "-132px"], ["left", "top"] ];
  
  function wrapSpan(elem, id) {
    if (elem) {
      var sp,
          clone = elem.cloneNode(true);
      clone.style.visibility = "hidden";
      sp = document.createElement("span");
      sp.id = id;
      sp.className = "work-thumbnail";
      bW.evts.listenFor(sp, "mouseover", bW.imgswaps.toggleSprite, false, thumb_coords);
      bW.evts.listenFor(sp, "mouseout", bW.imgswaps.toggleSprite, false, thumb_coords);
      bW.evts.listenFor(sp, "mouseover", announce, false);
      bW.evts.listenFor(sp, "mouseout", announce, false);
      sp.appendChild(clone);
      elem.parentNode.replaceChild(sp, elem);
    }
  };

  function testCallback(callback) {
    if (typeof callback === "function") {
      return true;
    }
    else {
      return false;
    }
  };

  function displayNone(elem) {
    elem.style.display = "none";
  }

  function wrapElem(inner, outer, callback) {
    if (inner) {
      var out = elementFactory(outer),
          clone = inner.cloneNode(true),
          test = testCallback(callback);
      if (test) {
        callback(clone);
      }
      out.appendChild(clone);
      inner.parentNode.replaceChild(out, inner);
    }
  };

  for (key in work) {
    wrapElem(work[key].img.ref, { span : ["id", "thumb-" + key, "className", "work-thumbnail"] }, displayNone);
  }
  
  // set all .workitem h3 and p elements to \"display: none;\"
  (function() {
    var ids = ["christchild", "spubble", "naomi", "histvotes", "code"],
        ids_len = ids.length,
        i,
        j,
        h3s,
        ps;
    for (i = 0; i < ids_len; i += 1) {
      h3s = document.getElementById(ids[i]).getElementsByTagName("h3");
      h3s_len = h3s.length;
      ps = document.getElementById(ids[i]).getElementsByTagName("p");
      ps_len = ps.length;
      for (j = 0; j < h3s_len; j += 1) {
        h3s[j].style.display = "none";
      }
      for (j = 0; j < ps_len; j += 1) {
        ps[j].style.display = "none";
      }
    }
  }());

  function goHome(evt) {
    var ev = bW.evts.identify(evt);
      window.location = "/";
  };

  (function () {
    var m = document.getElementById("mast");
    bW.evts.listenFor(m, "click", goHome, false);
  }());

  var lightbox = (function () {
    var lbox = {},
        i = 0,
        len,
        clone,
        kids,
        h = document.getElementById("home-page"),
        w = document.getElementById("wrap"),
        m = document.getElementById("mast"),
        ef = elementFactory,
        sh = ef( { div : [ "id", "shade" ] } ),
        lb = ef( { div : [ "id", "lightbox" ] } ),
        lb_top = ef( { div : [ "id", "lightbox-top" ] } ),
        lb_body = ef( { div : [ "id", "lightbox-body" ] } ),
        lb_copy = ef( { div : [ "id", "lightbox-copy" ] } ),
        lb_img = ef( { img: [ "src", "../a/christchild.jpg" ] } ),
        lb_h3 = ef("h3"),
        lb_sd = ef( { p : [ "className", "shortdesc" ] } ),
        lb_link = ef( { p : [ "className", "link" ] } ),
        lb_anchor = ef( { a : [ "href", "http://web.archive.org/web/20090818101308/http://www.freep.com/christchild", "target", "_new" ] } ),
        lb_ld = ef( { p : [ "className", "longdesc" ] } ),
        lb_bottom = ef( { div : [ "id", "lightbox-bottom" ] } ),
        prev = ef( { p : [ "id", "previous" ] } ),
        next = ef( { p : [ "id", "next" ] } ),
        close = ef( { p : [ "id", "close" ] } );    
    
    // initial values
    bW.evts.listenFor(close, "click", hideWorkItem, false);
    bW.evts.listenFor(sh, "click", hideWorkItem, false);
    lb_h3.innerHTML = "Christ Child House";
    lb_sd.innerHTML = "design / markup / scripting";
    lb_anchor.innerHTML = "http://web.archive.org/http://www.freep.com/christchild";
    lb_ld.innerHTML = "I designed and coded this Emmy-winning presentation about boys in foster care while I was at the Detroit Free Press. My editors got detailed Illustrator mock-ups for approval, then I took all the .ai files to Photoshop for layer work and cutting. I hand-coded all pages using XHTML, CSS and JavaScript, then my editor Pat and I turned them into SaxoTech templates.";
    prev.innerHTML = "Previous";
    bW.evts.listenFor(prev, "click", updateWorkItem, false);
    prev.innerHTML = "Next";
    bW.evts.listenFor(next, "click", updateWorkItem, false);
    prev.innerHTML = "Close this window";
    
    // insertion
    lb_copy.appendChild(lb_img);
    lb_copy.appendChild(lb_h3);
    lb_link.appendChild(lb_anchor);
    lb_copy.appendChild(lb_sd);
    lb_copy.appendChild(lb_link);
    lb_copy.appendChild(lb_ld);
    lb_body.appendChild(lb_copy);
    lb.appendChild(lb_top);
    lb.appendChild(lb_body);
    lb.appendChild(lb_bottom);
    lb.appendChild(prev);
    lb.appendChild(next);
    lb.appendChild(close);
    sh.style.width = bW.viewport.getPageSize()[0] + "px";
    sh.style.height = bW.viewport.getPageSize()[1] + "px";
    h.insertBefore(sh, w);
    w.insertBefore(lb, m);

    // populating the object to return
    lbox.container = lb;
    lbox.img = lb_img;
    lbox.h3 = lb_h3;
    lbox.sd = lb_sd;
    lbox.anchor = lb_anchor;
    lbox.ld = lb_ld;
    lbox.shade = sh;
    lbox.current = "christchild";
    lbox.visible = false;

    return lbox;
  }());

  function updateWorkItem(evt) {
    var ev = bW.evts.identify(evt),
        direction,
        id;
    if (ev.src.id == "previous" || ev.src.id == "next") {
      direction = ev.src.id;
      id = work[lightbox.current][direction];
    }
    else {
      id = ev.src.id.replace("thumb-", ""); 
    }
    lightbox.img.src = work[id].img.src;
    lightbox.h3.innerHTML = work[id].title;
    lightbox.sd.innerHTML = work[id].sd;
    lightbox.anchor.href = work[id].url;
    lightbox.anchor.innerHTML = work[id].link;
    lightbox.ld.innerHTML = work[id].ld.join("<br /><br />");
    lightbox.current = id;
  }

  function showWorkItem(evt) {
    var ev = bW.evts.identify(evt),
        id = ev.src.id.replace("thumb-", "");
        
    lightbox.current = id;
    updateWorkItem(evt);
    lightbox.container.style.display = "block";
    darken();
    lightbox.visible = true;
  }

  function hideWorkItem(evt) {
    var ev = bW.evts.identify(evt);
    lighten();
    lightbox.container.style.display = "none";
    lightbox.visible = false;
  }

  function batchAddListeners() {
    for (key in work) {
      bW.evts.listenFor(document.getElementById(work[key].thumb_id), "mouseover", announce, true);
      bW.evts.listenFor(document.getElementById(work[key].thumb_id), "mouseout", announce, true);
      bW.evts.listenFor(document.getElementById(work[key].thumb_id), "mouseover", bW.imgswaps.toggleSprite, false, thumb_coords);
      bW.evts.listenFor(document.getElementById(work[key].thumb_id), "mouseout", bW.imgswaps.toggleSprite, false, thumb_coords);
      bW.evts.listenFor(document.getElementById(work[key].thumb_id), "click", showWorkItem, false);
    }
  }
  batchAddListeners();

  function announce(evt) {
   var ev = bW.evts.identify(evt),
        item = document.getElementById("work-current-item"),
        sd = document.getElementById("work-current-shortdesc");
    if (ev.type == "mouseover") {
      item.style.textIndent = "0px";
      sd.style.textIndent = "0px";
      item.innerHTML = work[ev.src.parentNode.id].title;
      sd.innerHTML = work[ev.src.parentNode.id].sd;
    }
    if (ev.type == "mouseout") {
      item.style.textIndent = "-9999px";
      sd.style.textIndent = "-9999px";
      item.innerHTML = "I\'ve enjoyed my work, and I continue to grow.";
      sd.innerHTML = "Recently, I've been learning more about mobile development.";
    }
  };

  var curr_i = { p : ["id", "work-current-item"] };
  var curr_sd = { p : ["id", "work-current-shortdesc"] }; 

  batchAddChildren("work", curr_i, curr_sd);

  innerHTML = "I\'ve enjoyed my work, and I continue to grow";
  innerHTML = "Recently, I've been learning more about mobile development.";

  var welc = document.getElementById("welcome");
  var tbout = document.getElementById("about");
  var h = document.getElementById("home-page");
  var w = document.getElementById("wrap");
  var cont = document.getElementById("content");
  var co = document.getElementById("copy");

  var fragm = document.createDocumentFragment();
  var ghost = document.createElement("div");
  ghost.id = "ghost";
  var about_clone = tbout.cloneNode(true);
  var ghost_dimensions = {};
  about_clone.style.display = "block";
  about_clone.style.visibility = "visible";
  about_clone.style.border = "1px solid red";
  welc.style.display = "none";
  tbout.style.display = "block";
  tbout.style.border = "1px solid green";

  ghost.appendChild(about_clone);
  fragm.appendChild(ghost);
  cont.insertBefore(fragm, co);

  ghost_dimensions.about = {
    height : about_clone.getBoundingClientRect()
  };

  function expandshelf() {
    tbout.style.height = Math.floor(ghost_dimensions.about.height.height) + "px";
    tbout.style.padding = "0px";
  }


  function dropshelf() {
    setTimeout(expandshelf, 3000);
    // welc.style.display = "none";
    tbout.style.height = "400px";
    // tbout.style.backgroundColor = "white";
    tbout.style.overflow = "hidden";
    // tbout.style.display = "block";
    // tbout.style.padding = "0";
  };

  
  setTimeout(dropshelf, 3000);

  console.log(bW.strings.hyphenToCamelCase(bW.styles.cssProps.backgroundPositionX));
  console.log(bW.env.style_model);

  console.log(tbout.getBoundingClientRect());
  console.log(welc.getBoundingClientRect());
  console.log(ghost_dimensions.about.height);

}());

bW.forms.swapCheckbox(bW.page.cb);

bW.imgswaps.preload("a/", bW.page.nav_lis);

bW.evts.listenFor(bW.page.the_nav, "mouseover", bW.imgswaps.toggleNavBg, false, bW.page.nav_lis);

bW.evts.listenFor(bW.page.the_nav, "mouseout", bW.imgswaps.toggleNavBg, false, bW.page.nav_lis);

bW.evts.listenFor(bW.page.form_name, "focus", bW.forms.placeholder, false);
bW.evts.listenFor(bW.page.form_name, "blur", bW.forms.placeholder, false);

bW.evts.listenFor(bW.page.form_email, "focus", bW.forms.placeholder, false);
bW.evts.listenFor(bW.page.form_email, "blur", bW.forms.placeholder, false);

bW.evts.listenFor(bW.page.form_msg, "focus", bW.forms.placeholder, false);
bW.evts.listenFor(bW.page.form_msg, "blur", bW.forms.placeholder, false);

bW.evts.listenFor(bW.page.form_name, "blur", bW.forms.validate, false);
bW.evts.listenFor(bW.page.form_email, "blur", bW.forms.validate, false);

console.log("I can take you there. Just follow me.");



