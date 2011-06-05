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
    christchild : {
      title : "Christ Child House",
      img : document.getElementById("img-christchild"),
      link : "http://web.archive.org/web/20090818101308/http://www.freep.com/christchild",
      sd : "design / markup / scripting"
    },
    spubble : {
      title : "Spubble Lite",
      img : document.getElementById("img-spubble"),
      link : "http://itunes.apple.com/us/app/spubble-lite/id408355153?mt=8",
      sd : "design"
    },
    naomi : {
      title : "naomirpatton.com",
      img : document.getElementById("img-naomi"),
      link : "http://www.naomirpatton.com",
      sd : "design / markup / scripting"
    },
    histvotes : {
      title : "SE Michigan's presidential votes",
      img : document.getElementById("img-histvotes"),
      link : "http://james.da.ydrea.ms",
      sd : "design / markup / scripting"
    },
    code : {
      title : "My GitHub repositories",
      img : document.getElementById("img-code"),
      link : "https://github.com/parisminton",
      sd : "miscellaneous code"
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
        frag.appendChild(elem[0]);
      }
    }
    contain.appendChild(frag);
    alert("Work stage loaded.");
  };

  function elementFactory() {
    var i = 0,
        j = 0,
        len = arguments.length,
        elems = [],
        el,
        len2;
    for (i; i < len; i += 1) {
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
    return elems;
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

  wrapSpan(work.christchild.img, "thumb-christchild");
  wrapSpan(work.spubble.img, "thumb-spubble");
  wrapSpan(work.naomi.img, "thumb-naomi");
  wrapSpan(work.histvotes.img, "thumb-histvotes");
  wrapSpan(work.code.img, "thumb-code");

  function announce(evt) {
    var ev = bW.evts.identify(evt),
        item = document.getElementById("work-current-item"),
        sd = document.getElementById("work-current-shortdesc");
    if (ev.type == "mouseover") {
      item.innerHTML = work[ev.src.parentNode.id].title;
      sd.innerHTML = work[ev.src.parentNode.id].sd;
    }
    if (ev.type == "mouseout") {
      item.innerHTML = "";
      sd.innerHTML = "";
    }
  };

  var curr_i = { p : ["id", "work-current-item"] };
  var curr_sd = { p : ["id", "work-current-shortdesc"] }; 

  batchAddChildren("work", curr_i, curr_sd);

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



