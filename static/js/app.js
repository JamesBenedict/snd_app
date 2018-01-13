// Right now the search returns results if it matches any entries' text.
// But I want it to search only a specific field in the entry.
// Because if I'm searching for gold awards
// but one of the designer's last name is goldberg
// then it will show entries with a gold award and those designed by goldberg.
// Or for the test code I have here, if I search for "World's Best Designed"
// then all entries are displayed
// when I only want entries with that in the title 
// The rest of my questions/explanations are in the comments below
// here's an example I used to build this if it help https://codepen.io/desandro/pen/mCdbD

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
    } else if (searchField = "designersearch"){
      var $searchField = $('.designer_search', this);
    }

    
    
    // The console log below prints all the grid item's text in a seperate box
    // EX: "World's Best Designed XX" (next box) "Silver Test phrase with World's Best Designed in it" (next box) ...
    // console.log($this.text());

   var searchResult = qsRegex ? $searchField.text().match( qsRegex ) : true;
  
    // This assigns the results of the filter button, everything works here
    var buttonResult = buttonFilter ? $this.is( buttonFilter ) : true;
    return searchResult && buttonResult;
  }
});

// checks for which filter box is selected and lays the grid out depending on the data-filter
$('#filters').on( 'click', 'button', function() {
  buttonFilter = $( this ).attr('data-filter');
  $grid.isotope();
});

// uses the value of the search field to filter
var $awardsearch = $('#awardsearch').keyup( debounce( function() {
  // creates a search string from the search field 
  // g: returns every results, i: ignores case
  qsRegex = new RegExp( $awardsearch.val(), 'gi' );
  searchType = "awardSearch";
  // Calls the grid to layout again with the new search
  $grid.isotope();
  return searchType;
}) );

var $categorysearch = $('#categorysearch').keyup( debounce( function() {
  // creates a search string from the search field 
  qsRegex = new RegExp( $categorysearch.val(), 'gi' );
  searchType = "categorysearch";
  // Calls the grid to layout again with the new search
  $grid.isotope();
  return searchType;
}) );

var $publicationsearch = $('#publicationsearch').keyup( debounce( function() {
  // creates a search string from the search field 
  qsRegex = new RegExp( $publicationsearch.val(), 'gi' );
  searchType = "publicationsearch";
  // Calls the grid to layout again with the new search
  $grid.isotope();
  return searchType;
}) );

var $designersearch = $('#designersearch').keyup( debounce( function() {
  // creates a search string from the search field 
  qsRegex = new RegExp( $designersearch.val(), 'gi' );
  searchType = "designersearch";
  // Calls the grid to layout again with the new search
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

// The following two functions only will show/matter when I have all the entries loaded
// scrolls screen back to top 
$('#button-top-scroll').click(function(){
  $("html, body").animate({ scrollTop: 0 }, "slow");
  console.log('test scroll tops')
})

// hides button until down the page a bit
$(function(){
    $(window).scroll(function() { 
        if ($(this).scrollTop() > 1500) { 
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