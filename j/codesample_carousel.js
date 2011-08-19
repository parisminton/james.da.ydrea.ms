/* ### javascript for the election widget carousel code sample ### */

                 
/* constructor for our candidate object... */
function candidateObj(path, aligned) {
  this.path = path;
  this.aligned = aligned;
  this.precache = new Image();
  this.precache.src = '/nyt_codesamples/a/' + path;
  this.precache.width = '310';
  this.precache.height = '370';
}

/* instantiates the candidateObj class and stores the instances in an array... */
var Clinton = new candidateObj('clinton_wgt.jpg', 'right'),
    Edwards = new candidateObj('edwards_wgt.jpg', 'left'),
    Giuliani = new candidateObj('giuliani_wgt.jpg', 'right'),
    Gravel = new candidateObj('gravel_wgt.jpg', 'left'),
    Kucinich = new candidateObj('kucinich_wgt.jpg', 'right'),
    Obama = new candidateObj('obama_wgt.jpg', 'right'),
    Huckabee = new candidateObj('huckabee_wgt.jpg', 'right'),
    Hunter = new candidateObj('hunter_wgt.jpg', 'left'),
    McCain = new candidateObj('mccain_wgt.jpg', 'left'),
    Paul = new candidateObj('paul_wgt.jpg', 'right'),
    Romney = new candidateObj('romney_wgt.jpg', 'right'),
    Thompson = new candidateObj('thompson_wgt.jpg', 'right');
    
var candidates = [Clinton, Edwards, Giuliani, Gravel, Kucinich, Obama, Huckabee, Hunter, McCain, Paul, Romney, Thompson];

/* finds nodes and inserts them into candidateObj properties... */	
function nodeFinder() {
  var dems_ul = document.getElementById('dems');
  var gop_ul = document.getElementById('gop');
  var bullets_length = 0;
  for (var i = 0; i < dems_ul.childNodes.length; i++) {
    if (dems_ul.childNodes[i].nodeName == 'LI') {
      candidates[bullets_length].bullet = dems_ul.childNodes[i];
      bullets_length++;
    }
  }
  for (var i = 0; i < gop_ul.childNodes.length; i++) {
    if (gop_ul.childNodes[i].nodeName == 'LI') {
      candidates[bullets_length].bullet = gop_ul.childNodes[i];
      bullets_length++;
    }
  }
  for (var i = 0; i < candidates.length; i++) {
    for (var j = 0; j < candidates[i].bullet.childNodes.length; j++) {
      if (candidates[i].bullet.childNodes[j].nodeName == 'A') {
        candidates[i].href_node = candidates[i].bullet.childNodes[j];					
      }
    }
  }
}

/* we need this global variable to keep count of the rotating picture... */
var j = 1;
          
/* changes background... */
function changeBg() {
  if (j == candidates.length) {
    j = 0;
  }
  var cand_div = document.getElementById('electionwidgets');
  cand_div.style.backgroundImage = 'url(/nyt_codesamples/a/' + candidates[j].path + ')';
  for (var i = 0; i < candidates.length; i++) { // reset all the anchor nodes
    candidates[i].href_node.style.background = 'none';			
  }
  if (candidates[j].aligned == 'right') {
    candidates[j].href_node.style.background = 'transparent url(/nyt_codesamples/a/bulletarrow_right.png) right center no-repeat';
    cand_div.className = 'ewidget_right';			
  }
  else {
    candidates[j].href_node.style.background = 'transparent url(/nyt_codesamples/a/bulletarrow_left.png) left center no-repeat';
    cand_div.className = 'ewidget_left';
  }
  j++;
}


/* runs our background-changing function every 5 seconds... */
function delayChangeBg() {
  setInterval('changeBg()', 5000);
}


/* for testing -- loop through and alert all the style sheet links */
function testObjSs() {
  /* for (var i = 0; i < candidates.length; i++) {
    for (j in candidates[i]) {
      alert('Property ' + j + ' is ' + candidates[i][j]);
    }
  } */
  
  for (var i = 0; i < document.styleSheets.length; i++) {
    alert('Stylesheet number ' + i + ' is linked from ' + document.styleSheets[i].href);
  }
}

/* we need this variable to store our countdown... */
var ticker = 4;	

/* change countdown number every second, then start over... */	
function countDown() {
  var alert_location = document.getElementById('timer').childNodes[1].childNodes[0];		
  alert_location.nodeValue = ticker;
  ticker -= 1;
  if (ticker == 0) {
    ticker = 5;
  }
}	

/* runs countDown function every second... */ 
function delayCountDown() {
  setInterval('countDown()', 1000);
}

nodeFinder();
delayChangeBg();
delayCountDown();

/* alert('Dilla put me up on all y\'all in Japan'); */
