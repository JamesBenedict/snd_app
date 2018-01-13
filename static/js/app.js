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
var searchField;

// init Isotope https://isotope.metafizzy.co/
var $grid = $('.grid').isotope({
  itemSelector: '.grid-item',
  layoutMode: 'packery',
  // This is where I start to get lost
  filter: function() {
    // "This" is the grid item AKA the entry
    var $this = $('.award_search', this);
    // The console log below prints all the grid item's text in a seperate box
    // EX: "World's Best Designed XX" (next box) "Silver Test phrase with World's Best Designed in it" (next box) ...
    console.log($this.text());

    // This was added by me trying to limit the search to the text within a specific class
    var $searchField = $('.award_search');
    // The console Log below prints every entries' text contained in the .award_search class in one box
    // EX: "World's Best DesignedSilverAward of ExcellenceWorld's Best DesignedGold"
    // console.log($searchField.text())

    // Below is the search that is too inclusive but works.
    // I think this is what the code means
    // If the search field's text (qsRegex) matches any text in the grid item ($this) return that item
    // else return true (IDK what that means but it still seems to work if I change it to false?) 
    var searchResult = qsRegex ? $this.text().match( qsRegex ) : true;
    
    // Below is what I thought would cause the search to only search the .award_search text
    // But it returns every grid item as long as the searched term is in any of the .award_search text
    // EX: so searching "Gold", "Silver", ... returns every result but searching "XX" returns nothing 
    // I think its searching the string that is printed in the $searchField console log, which is: "World's Best DesignedSilverAward of ExcellenceWorld's Best DesignedGold"
    // So if I could break up the string and limit it to a specific grid item's .award_search text
    // then this might work, but IDK how to do limit the $searchField to one grid item
    // var searchResult = qsRegex ? $searchField.text().match( qsRegex ) : true;

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
var $quicksearch = $('#quicksearch').keyup( debounce( function() {
  // creates a search string from the search field 
  // g: returns every results, i: ignores case
  qsRegex = new RegExp( $quicksearch.val(), 'gi' );
  // Calls the grid to layout again with the new search
  $grid.isotope();
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