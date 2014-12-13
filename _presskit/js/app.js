//--------------------------------------------------
// Lazy loading images.
//--------------------------------------------------
$(document).ready(function() {
  $("img.lazy").lazyload({
    effect : "fadeIn",
    load : function() {
      // Some images have transparency, removing the lazy class will remove the spinner gif from the background.
      $(this).removeClass("lazy");
    },
  });
});






//--------------------------------------------------
// ScrollSpy
//--------------------------------------------------
$(window).load( function() {
  refreshScrollSpy();
} );

$(window).scroll( function() {
  refreshScrollSpy();
} );

function refreshScrollSpy () {
  checkVis("Factsheet");
  checkVis("Description");
  checkVis("History");
  checkVis("Features");
  checkVis("Videos");
  checkVis("Screenshots");
  checkVis("AwardsRecognition");
  checkVis("LogoIcon");
  checkVis("SelectedArticles");
  checkVis("AdditionalLinks");
  checkVis("Credits");
  checkVis("Contact");
  checkVis("About");
}

function checkVis(elem) {
  if( isVis( "#"+elem ) ) {
    $("#m-"+elem).addClass('active')
  }
  else {
    $("#m-"+elem).removeClass('active')
  }
}

function isVis(elem) {
  var docViewTop = $(window).scrollTop();
  var docViewBottom = docViewTop + $(window).height();

  var elemTop = $(elem).offset().top;
  var elemBottom = elemTop + $(elem).height();

  return ( (elemBottom >= docViewTop && elemBottom <= docViewBottom) || (elemTop <= docViewBottom && elemTop >= docViewTop) || (elemTop <= docViewTop && elemBottom >= docViewBottom) );
}
