(function () {

  this.bW = {
  
    // event handler helpers
    evts : {
    
      listenFor : function (node, evt, func, capt, aargs) {
        var proc_id;
        if (node.addEventListener) {
          node.addEventListener(evt, func, capt);
        }
        else {
          if (node.attachEvent) {
            node.attachEvent(("on" + evt) , func);
          }
          else {
            node[evt] = func;
          }
        }
        proc_id = ("process" + (this.registry.count + 1));
        this.registry[proc_id] = {};
        this.registry[proc_id].node = node;
        this.registry[proc_id].evt = evt;
        this.registry[proc_id].func = func;
        this.registry[proc_id].capt = capt;
        if (aargs) {
          this.registry[proc_id].aargs = aargs;
        }
        else { 
          this.registry[proc_id].aargs = [];
        }
        if (!func.reg_ids) {
          func.reg_ids = {};
        }
        func.reg_ids[evt] = proc_id;
        
        this.registry.count += 1;
      },
      
      stopListening : function (node, evt, func, capt) {
        if (node.removeEventListener) {
          node.removeEventListener(evt, func, capt);
        }
        else {
          evt = 'on' + evt;
          if (node.detachEvent) {
            node.detachEvent(evt, func);
          }
          else {
            node[evt] = null;
          }
        }
      },
      
      registry : { count : 0 },
      
      identify : function (evt) {
        evt = evt || window.event;
        evt.src = evt.target || evt.srcElement;
        return evt;
      },
      
      getAargs : function (func_ref, evt_type) {
        var proc_id = func_ref.reg_ids[evt_type];
        return bW.evts.registry[proc_id].aargs;
      }
    },
    
    imgswaps : {
      
      preloadTogglers : function (path) {
        var images = [],
            args = [],
            i = 0,
            len = arguments.length,
            shortname;
        if (len == 2 && typeof arguments[1] == "object") {
          len = arguments[1].length;
          for (i; i < len; i += 1) {
            args[i] = arguments[1][i];
          }
        }
        else {
          for (i; i < (len - 1); i += 1) {
            args[i] = arguments[(i + 1)];
          }
        }
        i = 0;
        len = args.length;
        for (i; i < len; i += 1) {
          shortname = bW.strings.getFileName(bW.styles.getStyle(args[i], "background-image", "backgroundImage"));
          images[i] = new Image();
          images[i].src = path + shortname;
          if (shortname.match(/_off\.|_on\./)) {
            images[(i + len)] = new Image();
            images[(i + len)].src = bW.strings.toggler(shortname);
          }
        }
      },
      
      toggleBg : function (evt) {
        var ev = bW.evts.identify(evt),        
            image_path = bW.styles.getStyle(ev.src, "background-image", "backgroundImage").split(/_off\.|_on\./),
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
            image_path = bW.styles.getStyle(ev.src.parentNode, "background-image", "backgroundImage").split(/_off\.|_on\./),
            suffix;
        
        if (ev.src.nodeName == "A") {
          if (ev.type == "mouseover") {
            suffix = "_on.";
          }
          else {
            suffix = "_off.";
          }
          
          ev.src.parentNode.style.backgroundImage = image_path[0] + suffix + image_path[1];
    
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
      getStyle : function (elem, dom_prop, ie_prop) {
        if (window.getComputedStyle) {
          return window.getComputedStyle(elem, null).getPropertyValue(dom_prop);
        }
        else if (elem.currentStyle) {
          return elem.currentStyle[ie_prop];
        }
      }
    },
    
    // string manipulation
    strings : {
      getFileName : function (string) {
        var filename,
            index1 = (string.lastIndexOf("/") + 1),
            index2,
            char2 = "";
        if (string.lastIndexOf("\"") != -1) {
          char2 = "\"";
          index2 = string.lastIndexOf(char2);
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
      }
    },
    
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
            i = 0;
            len = nonalpha.length;
            for (i; i < len; i += 1) {
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
  };

  var work = {
    christchild : new WorkObj (
      "Christ Child House",
      document.getElementById("img-christchild"),
      "../a/christchild_24bit.png",
      "thumb-christchild",
      "http://web.archive.org/web/20090818101308/http://www.freep.com/christchild",
      "design / markup / scripting",
      ["I designed and coded this Emmy-winning presentation about boys in foster care while I was at the Detroit Free Press. My editors got detailed Illustrator mock-ups for approval, then I took all the .ai files to Photoshop for layer work and cutting. I hand-coded all pages using XHTML, CSS and JavaScript, then my editor Pat and I turned them into SaxoTech templates."],
      "code",
      "spubble"
    ),
    spubble : new WorkObj (
      "Spubble Lite",
      document.getElementById("img-spubble"),
      "../a/spubble_24bit.png",
      "thumb-spubble",
      "http://itunes.apple.com/us/app/spubble-lite/id408355153?mt=8",
      "design",
      [
        "As part of a University of Michigan 48-hour hackathon, I created most of the interface elements and several icons for this mobile app designed to help autistic kids learn and communicate. I created everything in Illustrator, then brought the vectors to Photoshop for resizing, cutting and layer work. I worked with the coding team side-by-side and virtually in a shared repository.",
        "That weekend, I got to work with Wacom\'s draw-directly-on-screen-Cintiq display. Thanks, U-M, and thanks to Dan Fessahazion for letting us crash in Design Lab One."
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
      "design / markup / scripting",
      ["This portfolio site for Detroit Free Press reporter Naomi R. Patton uses <a href=\"http://www.typekit.com\" target=\"_new\">Typekit</a> to serve fonts to browsers that support the @font-face declaration. It also uses the jQuery lightbox library."],
      "spubble",
      "histvotes"
    ),
    histvotes : new WorkObj (
      "SE Michigan's presidential votes",
      document.getElementById("img-histvotes"),
      "../a/histvotes_24bit.png",
      "thumb-histvotes",
      "http://james.da.ydrea.ms/historicalvotes",
      "design / markup / scripting",
      [
        "This is a huge stats table that uses a slider animation for easier viewing.",
        "It was to be a project for the Detroit Free Press Web site during the 2008 presidential election, but was shelved when we needed to shift gears to accomodate an even bigger election package from Gannett, our parent company.",
        "I ended up using an improved version of this slider script in the Christ Child House project later that year."
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
      "miscellaneous code",
      ["Here's where I store my code, and where you can peek under the hood of much of my stuff."],
      "histvotes",
      "christchild"
    )
  };

  function WorkObj(title, img_ref, img_src, thumb_id, url, sd, ld, previous, next) {
    if (!(this instanceof WorkObj)) {
      return new WorkObj(title, img_ref, img_src,  thumb_id, link, sd, ld, previous, next);
    }
    this.title = title;
    this.img = new Image();
    this.img.ref = img_ref;
    this.img.src = img_src;
    this.thumb_id = thumb_id;
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
        i = 1,
        len = arguments.length,
        frag = document.createDocumentFragment();
    if (len < 2) {
      alert("Error from batchAddChildren:\n\n  - This function needs at least one more argument\: The elements to be inserted\:\n\n batchAddChildren\(container, element1_to_insert \[, element_2_to_insert, element3_to_insert, ...\]\n\n");
    }
    else {
      for (i; i < len; i += 1) {
        elem = elementFactory(arguments[(i)]);
        frag.appendChild(elem);
      }
    }
    contain.appendChild(frag);
  };

  function elementFactory() {
    var i = 0,
        j = 0,
        len = arguments.length,
        elems = [],
        el,
        len2;
    for (i; i < len; i += 1) {
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
            if (len2 > 2) {
              for (j; j < len2; j += 2) {
                el[arguments[i][key][j]] = arguments[i][key][(j + 1)];
                /* alert("Inner loop. " +  arguments[i][key][(j + 1)]); */
              }  
            }
            else {
              el[arguments[i][key][j]] = arguments[i][key][(j + 1)];
              /* alert("Outer loop. " + arguments[i][key][(j + 1)]); */
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

  var lightbox = (function () {
    var lbox = {},
        i = 0,
        len,
        clone,
        kids,
        h = document.getElementById("home"),
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
    
    // initial text values
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
    lightbox.anchor.innerHTML = work[id].url;
    lightbox.ld.innerHTML = work[id].ld.join("<br /><br />");
    lightbox.current = id;
  }

  function showWorkItem(evt) {
    var ev = bW.evts.identify(evt),
        id = ev.src.id.replace("thumb-", "");
    lightbox.current = id;
    updateWorkItem(evt);
    lightbox.container.style.display = "block";
    lightbox.shade.style.display = "block";
  }

  function hideWorkItem(evt) {
    var ev = bW.evts.identify(evt);
    lightbox.container.style.display = "none";
    lightbox.shade.style.display = "none";
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

}());

bW.forms.swapCheckbox(bW.page.cb);

bW.imgswaps.preloadTogglers("a/", bW.page.the_nav);
/*
bW.evts.listenFor(bW.page.the_nav, "mouseover", bW.imgswaps.toggleBg, false, bW.page.nav_lis);

bW.evts.listenFor(bW.page.the_nav, "mouseout", bW.imgswaps.toggleBg, false, bW.page.nav_lis);
*/

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

alert("I can take you there. Just follow me.");



