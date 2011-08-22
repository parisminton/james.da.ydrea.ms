(function () {

  this.scroller = {

    getCurrYpos : function () {
      // ...FF, Chrome, Opera, Safari...
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
      
      // ...else...
      return 0;
    },
  
    getDestYpos : function (the_id) {
      var the_element = document.getElementById(the_id),
          y_pos = the_element.offsetTop,
          node = the_element;
      while (node.offsetParent && node.offsetParent != document.body) {
        node = node.offsetParent;
        y_pos += node.offsetTop;
      };
      return y_pos;
    },
    
    scrollPage : function (the_id) {
      var start = scroller.getCurrYpos(),
          end = scroller.getDestYpos(the_id),
          distance = (end > start) ? (end - start) : (start - end),
          speed = Math.round(distance / 100),
          inc = Math.round(distance / 25),
          leap = (end > start) ? (start + inc) : (start - inc),
          timer = 0,
          scr = function () {
            window.scrollTo(0, leap);
          };
      if (distance < 100) {
        window.scrollTo(0, end);
        return;
      };
      if (speed >= 20) {
        speed = 20;
      }
      if (end > start) {
        for (var i = start; i < end; i += inc ) {
          setTimeout('window.scrollTo(0, ' + (leap - 130) + ')', timer * speed);
          leap += inc;
          if (leap > end) {
            leap = end;
          };
          timer++;
        };
        return;
      };
      for (var i = start; i > end; i -= inc ) {
        setTimeout('window.scrollTo(0, ' + (leap - 130) + ')', timer * speed);
        leap -= inc;
        if (leap < end) {
          leap = end;
        };
        timer++;
      };
    },
    
    anyway : function () {
      alert('My first love.');
    }

  }
  alert('And if you dream to be free...');
}());