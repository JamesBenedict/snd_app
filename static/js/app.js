// quick search regex
var qsRegex;
var buttonFilter;
var searchField;
var $container;
var filters = {};


// init Isotope
var $grid = $('.grid').isotope({
  itemSelector: '.grid-item',
  layoutMode: 'packery',

  filter: function() {
    var $this = $(this);
    var $searchField = $('.name_search');
    var searchResult = qsRegex ? $this.text().match( qsRegex ) : true;
    // var buttonResult = buttonFilter ? $this.is( buttonFilter ) : true;
    return searchResult;
  }
});

$('#filters').on( 'click', 'button', function() {
  buttonFilter = $( this ).attr('data-filter');
  $grid.isotope();
});

var $quicksearch = $('#quicksearch').keyup( debounce( function() {
  qsRegex = new RegExp( $quicksearch.val(), 'gi' );
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

$('#button-top-scroll').click(function(){
  $("html, body").animate({ scrollTop: 0 }, "slow");
  console.log('test scroll tops')
})

$(function(){
    $(window).scroll(function() { 
        if ($(this).scrollTop() > 500) { 
            $("#button-top-scroll:hidden").css('visibility','visible');   
            $("#button-top-scroll:hidden").fadeIn('slow');  
        } 
        else {     
            $("#button-top-scroll:visible").fadeOut("slow"); 
        }  
    });
});


// ignore this, im working on this next
// var $container;
// var filters = {};

// $(function(){
//   $container = $('.grid');
//   var $filterDisplay = $('#filter-display');
//   $container.isotope();
//   // do stuff when checkbox change
//   $('#options').on( 'change', function( jQEvent ) {
//     var $checkbox = $( jQEvent.target );
//     manageCheckbox( $checkbox );
//     var comboFilter = getComboFilter( filters );
//     $container.isotope({ filter: comboFilter });
//     $filterDisplay.text( comboFilter );
//   });
// });

// var $grid = $('.grid').isotope({
//   itemSelector: '.grid-item',
//   layoutMode: 'packery',

// // original code 
//   // filter: function() {
//   //   var $this = $(this);
//   //   var searchResult = qsRegex ? $this.text().match( qsRegex ) : true;
//   //   var buttonResult = buttonFilter ? $this.is( buttonFilter ) : true;
//   //   return searchResult && buttonResult;
//   // }

//   filter: function() {
//     var $this = $(this);
//     var $searchField = $('.name_search');
//     var searchResult = qsRegex ? $this.text().match( qsRegex ) : true;
//     // var buttonResult = buttonFilter ? $this.is( buttonFilter ) : true;
//     return searchResult;
//   }
// });







// function getComboFilter( filters ) {
//   var i = 0;
//   var comboFilters = [];
//   var message = [];

//   for ( var prop in filters ) {
//     message.push( filters[ prop ].join(' ') );
//     var filterGroup = filters[ prop ];
//     // skip to next filter group if it doesn't have any values
//     if ( !filterGroup.length ) {
//       continue;
//     }
//     if ( i === 0 ) {
//       // copy to new array
//       comboFilters = filterGroup.slice(0);
//     } else {
//       var filterSelectors = [];
//       // copy to fresh array
//       var groupCombo = comboFilters.slice(0); // [ A, B ]
//       // merge filter Groups
//       for (var k=0, len3 = filterGroup.length; k < len3; k++) {
//         for (var j=0, len2 = groupCombo.length; j < len2; j++) {
//           filterSelectors.push( groupCombo[j] + filterGroup[k] ); // [ 1, 2 ]
//         }

//       }
//       // apply filter selectors to combo filters for next group
//       comboFilters = filterSelectors;
//     }
//     i++;
//   }

//   var comboFilter = comboFilters.join(', ');
//   return comboFilter;
// }

// function manageCheckbox( $checkbox ) {
//   var checkbox = $checkbox[0];

//   var group = $checkbox.parents('.option-set').attr('data-group');
//   // create array for filter group, if not there yet
//   var filterGroup = filters[ group ];
//   if ( !filterGroup ) {
//     filterGroup = filters[ group ] = [];
//   }

//   var isAll = $checkbox.hasClass('all');
//   // reset filter group if the all box was checked
//   if ( isAll ) {
//     delete filters[ group ];
//     if ( !checkbox.checked ) {
//       checkbox.checked = 'checked';
//     }
//   }
//   // index of
//   var index = $.inArray( checkbox.value, filterGroup );

//   if ( checkbox.checked ) {
//     var selector = isAll ? 'input' : 'input.all';
//     $checkbox.siblings( selector ).removeAttr('checked');


//     if ( !isAll && index === -1 ) {
//       // add filter to group
//       filters[ group ].push( checkbox.value );
//     }

//   } else if ( !isAll ) {
//     // remove filter from group
//     filters[ group ].splice( index, 1 );
//     // if unchecked the last box, check the all
//     if ( !$checkbox.siblings('[checked]').length ) {
//       $checkbox.siblings('input.all').attr('checked', 'checked');
//     }
//   }

// }












