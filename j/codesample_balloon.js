function initThumbnails() {
  makeThumbnails(4);
}

function columnCounter(columns, items) {
  var the_number = 1;
  for (var i = 0; i < items; i++) {
    alert('The number is ' + the_number);
    the_number++;
    if (the_number > columns) {
      the_number = 1;
    }
  }
}

var BalloonObj = {};

function makeBalloon() {
  var B = BalloonObj;
  B.elem = document.getElementById('balloonlayer');
  B.link_location = document.getElementById('thumblink');
  B.visible = false;
  B.left = 0;
  B.top = 0;
  /* ...cancel the balloon\'s default disappearing function once it\'s moused over... */
  B.elem.onmouseover = function() {
    clearTimeout(balloonpause);
  };
  B.link_location.onmouseover = function() {
    clearTimeout(balloonpause);
  };
}

var balloonpause;

var thumbObj_array = [];

function ThumbObj(elem, xpos, ypos, xrepeat, yrepeat) {
  this.elem = elem;
  this.xpos = xpos;
  this.ypos = ypos;
  this.xrepeat = xrepeat;
  this.yrepeat = yrepeat;
}

function makeThumbnails(columns) {

  var thumb_array = document.getElementById('inauguration-photos').getElementsByTagName('img');
  var quantity = thumb_array.length;
  var column_counter = 1;
  var row_counter = 1;
  
  for (var i = 0; i < quantity; i++) {
    
    /* ...if we've reached the last column, start a new row... */
    if (column_counter > columns) {
      column_counter = 1;
      row_counter++;
    }
    
    /* ...create thumbnail objects, assign them to the thumbObj array and give them unique x,y coordinates and names... */
    thumbObj_array[i] = new ThumbObj(thumb_array[i], -40, -75, 70, 55);
    thumbObj_array[i].xcoord = thumbObj_array[i].xpos + (thumbObj_array[i].xrepeat * ((column_counter == 1) ? 0 : (column_counter - 1)));
    thumbObj_array[i].ycoord = thumbObj_array[i].ypos + (thumbObj_array[i].yrepeat * ((row_counter == 1) ? 0 : (row_counter - 1)));
    thumbObj_array[i].name = 'x' + thumbObj_array[i].xcoord + 'y' + thumbObj_array[i].ycoord;
    thumbObj_array[i].elem.setAttribute('name', thumbObj_array[i].name);
    
    
    /* ...simulate a hash table... */
    thumbObj_array[thumbObj_array[i].name] = thumbObj_array[i];
    
    /* ...define methods to make the balloon appear on mouseover... */
    
    /* ...BRANCH 1: use the addEventListener method for W3C browsers... */
    if (thumbObj_array[i].elem.addEventListener) {
      thumbObj_array[i].elem.addEventListener(
        'mouseover',
        function() {
          var the_title = this.getAttribute('alt');
          var the_link = this.parentNode.getAttribute('href');
          var the_new_textnode = document.createTextNode(the_title);
          var the_new_link = document.createElement('a');
          the_new_link.setAttribute('href', the_link);
          the_new_link.appendChild(the_new_textnode);
          BalloonObj.link_location.replaceChild(the_new_link, BalloonObj.link_location.firstChild);
          BalloonObj.elem.style.left = thumbObj_array[this.name].xcoord + 'px';
          BalloonObj.elem.style.top = thumbObj_array[this.name].ycoord + 'px';
          BalloonObj.elem.style.visibility = 'visible';
          balloonpause = setTimeout(hideBalloon, 5000);
        },
        false
      );
    }
    
    /* ...BRANCH 2: use older event handlers for all other cases... */
    else {
      thumbObj_array[i].elem.onmouseover =	function() {
        var the_title = this.attributes['alt'].nodeValue;
        var the_link = this.parentNode.attributes['href'].nodeValue;
        var the_new_link = document.createElement('a');
        the_new_link.setAttribute('href', the_link);
        the_new_link.innerHTML = the_title;							
        BalloonObj.link_location.replaceChild(the_new_link, BalloonObj.link_location.firstChild);
        BalloonObj.elem.style.left = thumbObj_array[this.name].xcoord + 'px';
        BalloonObj.elem.style.top = thumbObj_array[this.name].ycoord + 'px';
        BalloonObj.elem.style.visibility = 'visible';
        balloonpause = setTimeout(hideBalloon, 5000);
      }
    }
    
    /* ...we\'ve reached the end of the function, so increase the column counter... */
    column_counter++;
  }
  // alert(thumbObj_array[1].xcoord);
}

function hideBalloon() {
  BalloonObj.elem.style.visibility = 'hidden';		
}

function IEMoveBalloon() {
  var the_title = this.attributes['alt'].nodeValue;
        BalloonObj.link_location.innerHTML = the_title;
        BalloonObj.elem.style.left = thumbObj_array[this.name].xcoord + 'px';
        BalloonObj.elem.style.top = thumbObj_array[this.name].ycoord + 'px';
        BalloonObj.elem.style.visibility = 'visible';
}

/*
### Simon Willison's addLoadEvent() -- queues functions to run after the page has loaded ###
*/	
function addLoadEvent(func) {
  var oldonload = window.onload;
  if (typeof window.onload != 'function') {
    window.onload = func;
  }
  else {
    window.onload = function() {
      if (oldonload) {
        oldonload();
      }
    func();
    }
  }
}

addLoadEvent(makeBalloon);
addLoadEvent(initThumbnails);
// alert('I can take you there, just follow me.');