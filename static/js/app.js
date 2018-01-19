// globals
var qsRegex;
var buttonFilter;
var searchType = "";
var searchField = "";
var acc = document.getElementsByClassName("accordion");
var i;
var $isChecked = document.getElementsByClassName('is-checked');

// var options = {
//   url: "static/js/json_publications.json",
//   getValue: "publication",

//   list: { 
//     match: {
//       enabled: true
//     }
//   },

//   theme: "square"
// };

// $("#publicationsearch").easyAutocomplete(options);

// init Isotope https://isotope.metafizzy.co/
var $grid = $('.grid').isotope({
  itemSelector: '.grid-item',
  layoutMode: 'packery',
  filter: function() {
    // console.log(searchType)
    // $("#publicationsearch").easyAutocomplete(options);

    if (searchType == "awardSearch"){
      var $searchField = $('.award_search', this);
    } else if (searchType == "categorysearch") {
      var $searchField = $('.category_search', this);
    } else if (searchType == "publicationsearch"){
      var $searchField = $('.publication_search', this);
    } else if (searchType = "designersearch"){
      var $searchField = $('.designer_search', this);
    } 

    $this = $(this);

    var searchResult = qsRegex ? $searchField.text().match( qsRegex ) : true;
    var buttonResult = buttonFilter ? $this.is( buttonFilter ) : true;
    return searchResult && buttonResult;
  }
});

// checks for which filter box is selected and lays the grid out depending on the data-filter
$('#filters').on( 'click', 'button', function() {
  buttonFilter = $( this ).attr('data-filter');
  document.getElementById('categorysearch').value = '';
  document.getElementById('awardsearch').value = '';
  document.getElementById('publicationsearch').value = '';
  document.getElementById('designersearch').value = '';
  document.getElementById('categorysearch').placeholder = 'Search Awards';
  document.getElementById('categorysearch').placeholder = 'Search Categories';
  document.getElementById('publicationsearch').placeholder = 'Search Publications';
  document.getElementById('designersearch').placeholder = 'Search Designers';
  qsRegex = ""; 
  $grid.isotope();
  return qsRegex;
});

// uses the value of the search field to filter
var $awardsearch = $('#awardsearch').keyup( debounce( function() {
  qsRegex = new RegExp( $awardsearch.val(), 'gi' );
  searchType = "awardSearch";
  buttonFilter = "*";
  document.getElementById('categorysearch').value = '';
  document.getElementById('publicationsearch').value = '';
  document.getElementById('designersearch').value = '';
  document.getElementById('categorysearch').placeholder = 'Search Categories';
  document.getElementById('publicationsearch').placeholder = 'Search Publications';
  document.getElementById('designersearch').placeholder = 'Search Designers';
  $('.is-checked').removeClass('is-checked');
  $grid.isotope();
  return searchType;
}) );


var $categorysearch = $('#categorysearch').keyup( debounce( function() {
  qsRegex = new RegExp( $categorysearch.val(), 'gi' );
  searchType = "categorysearch";
  buttonFilter = "*";
  document.getElementById('awardsearch').value = '';
  document.getElementById('publicationsearch').value = '';
  document.getElementById('designersearch').value = '';
  document.getElementById('awardsearch').placeholder = 'Search Awards';
  document.getElementById('publicationsearch').placeholder = 'Search Publications';
  document.getElementById('designersearch').placeholder = 'Search Designers';
  $('.is-checked').removeClass('is-checked');
  $grid.isotope();
  return searchType;
}) );

var $publicationsearch = $('#publicationsearch').keyup( debounce( function() {
  qsRegex = new RegExp( $publicationsearch.val(), 'gi' );
  searchType = "publicationsearch";
  buttonFilter = "*";
  document.getElementById('awardsearch').value = '';
  document.getElementById('categorysearch').value = '';
  document.getElementById('designersearch').value = '';
  document.getElementById('awardsearch').placeholder = 'Search Awards';
  document.getElementById('categorysearch').placeholder = 'Search Categories';
  document.getElementById('designersearch').placeholder = 'Search Designers';
  $('.is-checked').removeClass('is-checked');
  $grid.isotope();
  return searchType;
}) );

var $designersearch = $('#designersearch').keyup( debounce( function() {
  qsRegex = new RegExp( $designersearch.val(), 'gi' );
  searchType = "designersearch";
  buttonFilter = "*";
  document.getElementById('awardsearch').value = '';
  document.getElementById('publicationsearch').value = '';
  document.getElementById('categorysearch').value = '';
  document.getElementById('awardsearch').placeholder = 'Search Awards';
  document.getElementById('categorysearch').placeholder = 'Search Categories';
  document.getElementById('publicationsearch').placeholder = 'Search Publications';
  $('.is-checked').removeClass('is-checked');
  $grid.isotope();
  return searchType;
}) );

// change is-checked class on buttons
$('.button-group').each( function( i, buttonGroup ) {
  var $buttonGroup = $( buttonGroup );
  $buttonGroup.on( 'click', 'button', function() {
  // $buttonGroup.find('.is-checked').removeClass('is-checked');
  // $( this ).addClass('is-checked');
    if ( $(this).hasClass('accordion') ){
      console.log($(this));
    } else {
      $buttonGroup.find('.is-checked').removeClass('is-checked');
      $( this ).addClass('is-checked');
    }
  });
});
  
// debounce so filtering doesn't happen every millisecond
function debounce( fn, threshold ) {
  var timeout;
  return function debounced() {
    if ( timeout ) {
      clearTimeout( timeout );
    }
    function delayed() {
      fn();
      timeout = null;
    }
    setTimeout( delayed, threshold || 100 );
  };
}

// scrolls screen back to top 
$('#button-top-scroll').click(function(){
  $("html, body").animate({ scrollTop: 0 }, "slow");
  console.log('test scroll tops')
})

// hides button until down the page a bit
$(function(){
    $(window).scroll(function() { 
        if ($(this).scrollTop() > 1700) { 
            $("#button-top-scroll:hidden").css('visibility','visible');   
            $("#button-top-scroll:hidden").fadeIn('slow');  
        } 
        else {     
            $("#button-top-scroll:visible").fadeOut("slow"); 
        }  
    });
});


for (i = 0; i < acc.length; i++) {
    acc[i].addEventListener("click", function() {
        /* Toggle between adding and removing the "active" class,
        to highlight the button that controls the panel */
        // console.log(this.text())

        this.classList.toggle("active");

        /* Toggle between hiding and showing the active panel */
        var panel = this.nextElementSibling;
        if (panel.style.display === "block") {
            panel.style.display = "none";
        } else {
            panel.style.display = "block";
        }
    });
}

$('.accordion').click(function(){
    var $this = $(this);
    $this.toggleClass('accordion-hide');
    if($this.hasClass('accordion-hide')){
      $this.text('View Options');     
    } else {
      $this.text('Hide Options');
    }
  });


$('.share-close').click(function(){
  // var $this = $(this);
  var $container = $('.share-container');
  $container.removeClass('share-show');
  $container.addClass('share-hide')
  // $container.toggle('share-container-hide');
  console.log('test')
})

$('.share-container').click(function(){
  // var $this = $(this);
  var $container = $('.share-container');
  $container.removeClass('share-show');
  $container.addClass('share-hide')
  // $container.toggle('share-container-hide');
  console.log('test')
})

$('.share-open').click(function(){
  var $shareMenu = $('.share-container');
  $shareMenu.removeClass('share-hide')
  $shareMenu.addClass('share-show');
})



// var options = {
//   url: "static/js/json_publications.json",
//   getValue: "publication",

//   list: { 
//     match: {
//       enabled: true
//     }
//   },

//   theme: "square"
// };

// $("#publicationsearch").easyAutocomplete(options);
// https://stackoverflow.com/questions/23716866/isotope-combining-filter-by-keyword-and-search
// http://fiddle.jshell.net/lucaspedroza/7t8mgont/
// https://codepen.io/desandro/pen/JEojz
// https://codepen.io/desandro/pen/btFfG
// https://codepen.io/desandro/pen/mCdbD
// http://everyonelovessharing.com/misc/isotopedemo/
// http://everyonelovessharing.com/misc/isotope.combofilter.js
// https://codepen.io/desandro/pen/mCdbD