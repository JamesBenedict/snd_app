// var $grid = $('.grid').isotope({
//   itemSelector: '.grid-item',
//   layoutMode: 'packery',  
// });
// init Isotope
var $grid = $('.grid').isotope({
  itemSelector: '.grid-item',
  layoutMode: 'packery',
  getSortData: {
    ref: '.ref parseInt',
  }
});

// bind sort button click
$('.sort-by-button-group').on( 'click', 'button', function() {
  var sortValue = $(this).attr('data-sort-value');
  $grid.isotope({ sortBy: sortValue });
});

// change is-checked class on buttons
$('.button-group').each( function( i, buttonGroup ) {
  var $buttonGroup = $( buttonGroup );
  $buttonGroup.on( 'click', 'button', function() {
    $buttonGroup.find('.is-checked').removeClass('is-checked');
    $( this ).addClass('is-checked');
  });
});

// filter functions
var filterFns = {
  // show if name ends with -ium
  Times: function() {
    var name = $(this).find('.name').text();
    return name.match( /New York Times$/ );
  },
  Parool: function() {
    var name = $(this).find('.name').text();
    return name.match(  /Parool$/ );
  }
};
// https://codepen.io/desandro/pen/wfaGu



// bind filter button click
$('.filters-button-group').on( 'click', 'button', function() {
  var filterValue = $( this ).attr('data-filter');
  // use filterFn if matches value
  filterValue = filterFns[ filterValue ] || filterValue;
  $grid.isotope({ filter: filterValue });
});



// change is-checked class on buttons
$('.button-group').each( function( i, buttonGroup ) {
  var $buttonGroup = $( buttonGroup );
  $buttonGroup.on( 'click', 'button', function() {
    $buttonGroup.find('.is-checked').removeClass('is-checked');
    $( this ).addClass('is-checked');
  });
});

$('#button-top-scroll').click(function(){
  // document.body.scrollTop = document.documentElement.scrollTop = 0;
  // $('html').slideUp();

  $("html, body").animate({ scrollTop: 0 }, "slow");

  console.log('test scroll tops')

})


