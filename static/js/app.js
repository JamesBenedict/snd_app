// globals
var qsRegex;
var buttonFilter;
var searchType = "";
var searchField = "";

// init Isotope https://isotope.metafizzy.co/
var $grid = $('.grid').isotope({
  itemSelector: '.grid-item',
  layoutMode: 'packery',
  filter: function() {
    // console.log(searchType)
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
  searchField = " ";  
  $grid.isotope();
  return searchField;
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
  $grid.isotope();
  return searchType;
}) );

// change is-checked class on buttons
$('.button-group').each( function( i, buttonGroup ) {
  var $buttonGroup = $( buttonGroup );
  $buttonGroup.on( 'click', 'button', function() {
    $buttonGroup.find('.is-checked').removeClass('is-checked');
    $( this ).addClass('is-checked');
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

// https://stackoverflow.com/questions/23716866/isotope-combining-filter-by-keyword-and-search
// http://fiddle.jshell.net/lucaspedroza/7t8mgont/
// https://codepen.io/desandro/pen/JEojz
// https://codepen.io/desandro/pen/btFfG
// https://codepen.io/desandro/pen/mCdbD
// http://everyonelovessharing.com/misc/isotopedemo/
// http://everyonelovessharing.com/misc/isotope.combofilter.js
// https://codepen.io/desandro/pen/mCdbD