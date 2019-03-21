// initialise javascript listeners and variables.
// it's a constructor for the error js environment! Horay!
window.addEventListener('DOMContentLoaded', function(event) {
    document.getElementsByTagName('html')[0].addEventListener("click", registerClick);
    window.addEventListener('resize', resizeRedraw, true);
    redrawCurve();
});

var PageState = function() {
  this.clicks = [];
  this.svg = "\
    <svg width='WIDTH' height='HEIGHT' xmlns='http://www.w3.org/2000/svg' class='floaty'> \
      <path d='CURVE1' stroke='black' fill='transparent'/> \
    </svg>"
};

var pageState = new PageState() ;

function registerClick(event) {
  pageState.clicks.push([ event.clientX, event.clientY ]);
  while (pageState.clicks.length > 2) {
    pageState.clicks.shift();
  }
  redrawCurve();
}

var resizeRedraw = debounce(redrawCurve, 250);

function redrawCurve(event) {
  let width = window.innerWidth,
      height = window.innerHeight;
  document
    .getElementById('floaty-line')
    .innerHTML = pageState.svg
                          .replace('WIDTH', width)
                          .replace('HEIGHT', height)
                          .replace('CURVE', curveString(width, height));
}

function curveString(height, width) {
  // make it so the first click draws to the pointer, then a second curve then a third bezier curve.
  var pos = [];
  pos[0] = pageState.clicks[0] || [width/2, height/2]
  pos[1] = pageState.clicks[0] || [width/2, height/2]
     // start pos        // bezier gradient pt one    // bezier gradient pt two           // end point
  return "M"+width/2+" "+0+" C "+pos[0][0]+" "+pos[0][1]+", "+pos[1][0]+" "+pos[1][1]+", "+width/2+" "+height;
}


// ======= //
// Helpers //
// ======= //
function debounce(func, wait, immediate) {
	var timeout;
	return function() {
		var context = this, args = arguments;
		var later = function() {
			timeout = null;
			if (!immediate) func.apply(context, args);
		};
		var callNow = immediate && !timeout;
		clearTimeout(timeout);
		timeout = setTimeout(later, wait);
		if (callNow) func.apply(context, args);
	};
}
