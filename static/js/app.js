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

$( function() {
    var categoryTags = [
      "Breaking News Topics",
      "Combination Print &amp; Digital",
      "Editorial Cartoons",
      "Features Design, Pages",
      "Features Design, Sections", 
      "Illustration",
      "Information Graphics, Multiple",
      "Information Graphics, Single",
      "Magazines",
      "Miscellaneous", 
      "Multiple Illustrations",
      "News Design, Pages",
      "News Design, Sections",
      "Opinion ",
      "Opinion Design",
      "Opinion section",                    
      "Page Design, Individual Portfolio",                    
      "Page Design, Staff Portfolio",
      "Photography, Multiple Photos",
      "Photography, Single Photos",
      "Redesigns",
      "Reprints",
      "Special Coverage",
      "Special News Topics",
      "Special Sections",
      "World's Best Designed"
    ],
    awardTags = [
      "World's Best Designed",
      "Gold",
      "Silver",
      "Judge's Special Recognition",
      "Award of Excellence"
    ];

    publicationTags = [
      "Colorado Springs Gazette", "Lima Comercio", "Lisbon Expresso", "London Sunday Times", "Mexico City Centro", "New York Wall Street Journal", "Arizona Republic", "Battle Creek Enquirer", "Beijing News Agency", "Bergens Tidende", "Berliner Morgenpost", "Bild am Sonntag", "Boston Globe", "Buffalo News", "Business Times", "Chatelaine", "Chicago Tribune", "Chillicothe Gazette", "China Daily", "Chronicle of Higher Education", "Clarín", "Colombiano", "Columbiano", "Crain’s Cleveland Business", "Dagens Nyheter", "Dallas Morning News", "Denver Post", "Di Weekend", "Diario de Hoy", "Economic Observer", "Estado de Sao Paulo", "Excelsior", "Financiero", "Folha de São Paulo", "Galileu", "Globe and Mail", "Globo", "Greenville News", "Guardian", "Gulf News", "Helsingin Sanomaat", "Honolulu Star-Bulletin", "Indianapolis Star", "LEQ Law Enforcement Quarterly", "Los Angeles Times", "Louisville Courier-Journal", "Mercury News", "Metro São Paulo", "Ming Pao Daily News", "Minneapolis Star Tribune", "Minneapolis/St. Paul Business Journal", "Mundo Estranho", "Nación", "National", "National Geographic Magazine", "National Geographic Traveler", "National Post", "New York Times", "New York Times Magazine", "News Tribune", "Omaha World-Herald", "Orlando Sentinel", "Parool", "Philippine Daily Inquirer", "Pittsburgh Post-Gazette", "Plain Dealer", "Politico Europe", "Politico Magazine", "Politiken", "Prensa Gráfica", "Prensa Libre", "Provincia", "Razón de México", "Reporte Indigo", "Repubblica", "Revista Saúde", "San Diego Union-Tribune", "San Francisco Business Times", "San Francisco Chronicle", "Scenario Magazine", "Science", "Seattle Times", "Shabiba", "South China Morning Post", "Stuttgarter Zeitung", "Sun Sentinel", "Sunday", "Svenska Dagbladet", "Sydney Morning Herald", "Tagesspiegel", "Tampa Bay Times", "Telégrafo", "Tennessean", "Times of Oman", "Times Polska", "Today", "USA Today", "Variety", "Verdens Gang", "Villages Daily Sun", "Virginian-Pilot", "Voz del Interior", "Washington Business Journal", "Washington Post", "Welt", "Welt am Sonntag", "Zeit", "Zhejiang Daily"
    ],
    designerTags = ["Zoeann Murphy", "Yu Fengjun", "Yi Zhao", "Xu Yingjian", "Wilson Andrews", "Wes Bausmith", "Wendy Goldfarb", "Wei Dong Tan", "Wayne Kamidol", "Wayne Kamidoi", "Wayne Brezinka", "Walter Jensen", "Wally Skalli", "Wally Skalij", "Wally Skali", "Vitor Iwasso", "Vitomir Zarkovic", "Virginia Singarayar", "Vince Chiaramonte", "Victor Sanjinez", "Victor Agullar", "Vasava ", "Uriel Sinai", "Ulf Poschardt", "Tyler Anderson", "Tricia Reinhold", "Travis Jackson", "Tracy Oksendahl", "Torfinn Weisser", "Tony Rodriguez", "Tony Lariccia", "Tomek Bochenski", "Tomasz Usyk", "Tomas Munita", "Tom Bodkin", "Todd Stewart", "Tim Wallace", "Tim Parks", "Tim Meko", "Tim Hubbard", "Tim Bontemps", "Tim Ball", "Tiago Miranda", "Thomas Thorhauge", "Thomas Simonetti", "Thomas Karisson", "Thomas Burden", "Theodore A. Sickley", "Theo Lamar", "Ted Crow", "Tara Palmeri", "Tammy Yttri", "Talib Jariwala", "Suzette Palma", "Suzette Moyer", "Suzanne Lemon", "Susan Glasser", "Stina Wirsén", "Stina Wirsen", "Steven  Hawkins", "Steve Sack", "Steve Brodner", "Stephen Wilkes", "Stephan Faris", "Stefan Rothmaier", "Stefan Aust", "Staffan Lowstedt", "Staff ", "Spencer Holladay", "Søren Nyeland", "Sohail Al Jamea", "SM Arshad", "Simone Massoni", "Simen Grytsyr", "Simen Grytoyr", "Sigrun Gudbrandsdottir", "Shizuka Aoki", "Shelly Sperry", "Sharon Cantillon", "Shannon Robertson", "Severiano Galven", "Sergio Peçanha", "Sergio Pecanha", "Scott Gillespie", "Scott Clement", "Sawdust ", "Saulo Santana", "Sarah Leen", "Sarah Lazarovic", "Sarah Hoffman", "Sarah Habershon", "Sarah Baxter", "Sara Rasmbottom", "Sara Ramsbottom", "Samuel Granados", "Sami Valtere", "Ryan Williams", "Ryan Soderlin", "Ryan McAmis", "Ryan Huddle", "Russell Yip", "Ruben Cortés Fernández", "Ross May", "Rosana Rojas", "Rodrigo De Benito Sanz", "Robson Quinafelix", "Roberto Maltichik", "Robert Kirkham", "Robert Gauthier", "Robert Davis", "Robert Carter", "RJ Sangosti", "Ricky Carioti", "Rickard Frank", "Rich Boudet", "Ricardo DeAratanha", "Remar Zamora", "Rebecca R. Markovitz", "Ray Grumney", "Ramachandra Babu", "Rafael Lerma", "Rafael Alvarez", "QuickHoney ", "Piotr Lesniak", "Pia Skagermark", "Philip Ytournel", "Phil Krugel", "Peter Hoey", "Pedro Henrique Ferreira", "Pauline Doyle", "Paul Hansen", "Paul Gonzales", "Paul Alexander", "Patrik Svenson", "Patricia Healy", "Paola Rodriquez", "Pak Yin Yeung", "Pablo Bernasconi", "Osama Aljawish", "Orlando Pérez Sánchez", "Omar Vega", "Oliver Michalsky", "Norma Ramirez", "Noma Bar", "Nino Jose Heredla", "Niklas Meltio", "Nigel Buchanan", "Nicole MacAdam", "Nicole Licht", "Nicole Hvidsten", "Nicole Crowder", "Nicole Arthur", "Nicola Hamilton", "Nick Kirkpatrick", "Nick Donaldson", "Nichole Montanez", "Nancy Kuehn", "Morten Grønborg", "Mónica Serrano", "Monica Serrano", "Mitchell Thorson", "Mitch Green", "Miriam Dalsgaard", "Mikey Burton", "Mike Rice", "Mike Faillle", "Mike Faille", "Mie Brinkmann", "Mick O’Reilly", "Michiela Thuman", "Michelle Low Ju-Lyn", "Michael Whitley", "Michael Tribble", "Michael Shearer", "Michael Rovner", "Michael Robinson Chavez", "Michael Macor", "Michael Johnson", "Michael Hogue", "Michael Henninger", "Michael Becker", "Michael  Whitley", "Merry Eccles", "Meridith Kohut", "Melina Mara", "Mel Melcon", "Mauricio Lima", "Matthew W. Chwastyk", "Matthew Twombly", "Matthew Kurian", "Matthew Kaminski", "Matthew Callahan", "Matthew Bloch", "Matt Willey", "Matt Swaney", "Matt Petty", "Matt Haney", "Matt French", "Matt Frehner", "Matt Dorfman", "Matt Callahan", "Matt  Swaney", "Mathieu Persan", "Mathias Jonsson", "Mathew Callahan", "MaryAnne Golon ", "MaryAnne Golon", "Mary Cooney", "Mary Ann Lawrence", "Mary  Cooney", "Martin Sati", "Martin Gamache", "Martin Fransson", "Martha Ortiz", "Marquez Diseno", "Marlene Bergamo", "Mark Peterson", "Mark Mulville", "Mark Gail", "Mark Boswell", "Marion Horn", "Mario Palomera", "Mario Henriques", "Marianne Stenberg", "Marianne Seregi", "Margaret Riedel", "Margaret Reidel", "Marcus Yam", "Marco Hernandez", "Marco Grieco", "Marcelo Duhalde", "Manuel Canales", "Manuel Cabrera Patiño", "Manal Alafrangi", "Malin Schulz", "Maggie Murphy", "Madia Brown", "Madia  Brown", "MacQueen Brian", "Lynn Ischay", "Luke Waller", "Luiz Rivoiro", "Luis Vazquez", "Luis Miguel Ribiero", "Louis Brems", "Lotta Ek", "Lorenzo Petrantoni", "Lorena Iñiquez Elebee", "Lorena Elebee", "Logan R. Cyrus", "Lloyd Young", "Lizzie Hart", "Liv Ajse", "Lise Mogensen", "Lisa Sardi", "Lisa Lorek", "Lisa Dejong", "Lisa Dejon", "Lisa  Lorek", "Leticia Raposo", "Len  DeGroot", "LeeAnn Elias", "Lee Yarosh", "Leah Samol", "Leah Millis", "Lea Suzuki", "Lazaro Gamio", "Lawson Parker", "Lauren James", "Lauren E. James", "Lauren C. Tierney", "Laura Emmons", "Laruie Lawrence", "Larry Buchanan", "Kyle Slagle", "Kurt Mutchler", "Kirk McKoy", "Kim Soffen", "Kim Maxwell Vu", "Kier Gilmour", "Kevin Uhrmacher", "Kevin Cannon", "Ken Rickard", "Ken McFarlin", "Ken Fallin", "Kelsey Dake", "Kelly Sullivan", "Kelli Sullivan", "Kayla Byler", "Katie Vernon", "Katie Myrick Parks", "Katie Kingsbury", "Katie Falkienberg", "Kathy Pvon", "Kathy Moran", "Karl Maier", "Karime Alcantar", "Karen Yourish", "Kaitlin M. Yarnall", "Kagan McLeod", "Ka-kuen Lau", "K.K. Rebecca Lai", "Julie Traves", "Julie Oliver", "Juan Mingarro", "Juan Colombato", "Juan Carlos Ramírez González", "Joyce Hooi", "Joshua Gunter", "Joshua Bessex", "Josh Penrod", "Josh Keller", "Josh Haner", "Josh Crutchmer", "Jose Soto", "Jose Santos", "Jose Luis Barros", "Jörgen Jonasson", "Jorgen Jonasson", "Jordan Timm", "Jordan Metcalf", "Jonathan Bartlett", "Jonathan Alpeyrie", "Jon Schleuss", "Jon Krause", "Jon Bowen", "John Tomanio", "John Payne", "John Nichols", "John Muyskens", "John Koning", "John Hickey", "John Baxter", "Johannes Schneider", "Joel Sartore", "Joe Ward", "Joe Morse", "Joe Fox", "Joanna Sullivan", "Joachim Dorfs", "Jim Brandenburg", "Jim  Sergent", "Jessica Yu", "Jesica Rizo", "Jeremy Yingling", "Jens Muhling", "Jeffrey Henson Scales", "Jeffrey Furticella", "Jeff Naimann", "Jeff Heimsath", "Jay St. Pierre", "Jay Clendenin", "Jasu Hu", "Jason Wambsgans", "Jason Treat", "Jason Seiler", "Jason Mecier", "Jason Holley", "Jason Chiu", "Jason Baum", "Janet Michaud", "Jane Switzer", "Jane Mitchell", "Jane Hahn", "Jan Molen", "Jan M Lillebo", "Jamey Fry", "James Taylor", "James P. McCoy", "James  Hunter", "James  Hill", "Jake Crump", "Jaime Jones", "Jahi Chikwendiu", "Jacqueline Berthet", "Jabin Botsford", "Jabin Botsfold", "Isabelle Khurshudyan", "Ingemar Holst", "Ian Lawson", "Hyunsoo Leo Kim", "Hugo Scapparone", "Hugo A. Sanchez", "Hoi Kin Fung", "Hernán Canellas", "Helge Mikaelsen", "Helena Davidsson-Neppelberg", "Helena Davidsson Neppelberg", "Héctor Ramirez", "Heather Hopp-Bruce", "Harry Scull Jr.", "Harry  Scull Jr.", "Hans-Juergen Polster", "Hannah Tax", "Hannah Tak", "Hannah Sheinberg", "Hannah Fairfield", "Hakon Haydal", "Haika Hinze", "Hai Wells", "Gustavo Lo Valvo", "Gustav F. Andersson", "Gus Chan", "Guo Yi", "Guilbert Gates", "Gu Lexiao", "Gretchen Roehrs", "Gregor Aisch", "Greg Mees", "Greg Manifold", "Greg Klee", "Greg Akers", "Graphics Staff ", "Glauco Lara", "Gisele Oliveira", "Gigi Suhanic", "Giacomo Gambineri", "Germán Calderón", "Gerard DuBois", "George Wilhelm", "Geneviéve Biloski", "Genaro Molina", "Genaro  Molina", "Gary Wing", "Gary Clement", "Gail Bichler", "Gabe Johnson", "Fred Bierman", "Frank Mina", "Frank Hoffman", "Francesco Franchi", "Francesco Bongiorni", "Ford Fessenden", "Florencia Abd", "Floor Koop", "Feu ", "Fernando Gutierrez", "Fernando G. Baptista", "Fernanda Giulietti", "Fernanda Didini", "Features Staff ", "Eve Edelheit", "Euka Holmes", "Esteban Arreola", "Erin Brethauer", "Erin Allday", "Erik Pérez Carcaño", "Eric Petersen", "Enrique Contreras", "Emma-Leena Ovaskainen", "Emily Guskoin", "Emily Chow", "Emanuele Amighetti", "Ellen Wishart", "Elizabeth Hart", "Elizabeth Burr", "Elizabeth Brown", "Elaine Bradley", "Ekua Holmes", "Eddie Alvarez", "Ebba Bonde", "Dylan Cole", "Dwynn Ronald Trazo", "Dwuan June", "Dustin Parkes", "Dudley Brooks", "Doug Chayka", "DN Redaktionen ", "Dina Litovsky", "Diego Quiroz", "Design Team ", "Derek Simmons", "Derek Gee", "Dennis Oda", "Dennis C.F. Wong", "Deb Pastner", "Dean Tweed", "Daymond Gascon", "Davide Barco", "David Yasvinski", "David Kordalski", "David Joles", "David Horsey", "David Furst", "David Downton", "David Doran", "Danielle Rindler", "Danielle Mollette-Parks", "Daniel Zender", "Daniel Zakroczemski", "Daniel Marsula", "Daniel Bland", "Daniel Berehulak", "Daniel Berehalak", "Dan Worthington", "Dan Mautina", "Dan Mann", "Dan Keating", "Dan Kare Engebretsen", "Dan  Bland", "Damon Winter", "Damien Saunder", "Daisy Chung", "Cristina Byvik", "Craig Redman", "Courtney Kan", "Claes Sjödin", "Claes Sjodin", "Chun Wong Wu", "Chuck Stewart", "Chuck Kerr", "Chuck Crow", "Christoph Reisinger", "Christina Wilemski", "Christina Byvik", "Christian Spreitz", "Christian Lalonde", "Christian Jensen", "Christian Ferrera", "Christian Ferrara", "Christian Bloom", "Chrissy Ashack", "Chris Whetzel", "Chris Whentzel", "Chris Rukan", "Chris Morris", "Chris Mihal", "Chris Machian", "Chris Clarke", "Chris Barber", "Chris Ballasiotes", "Chris Alcantara", "Chloe Cushmanl", "Chloe Cushman", "Chloe Coleman", "Chiqui Esteban", "Chi Tian", "Chelsea Kleven", "Charles Preppernau", "Charles Ommanney", "Charis Tsevis", "Chan Young Park", "Cathaleen Curtis", "Cassie Armstrong", "Carsten Erdmann", "Carolyn Cole", "Carlos Raúl Aguilar Tapia Prandiz", "Carlos Proaño", "Carlos Almeida Cueva", "Carline Jean", "Cameron Cottrill", "Calvin Hom", "Bruno Haward", "Bruna Sanches", "Bruce Morser", "Brittany Volk", "Brian Van der Brug", "Brian Van der Brua", "Brian Peterson", "Brian Jacobs", "Brian Gross", "Brian Connolly", "Brian Berg", "Brant Ward", "Brandon Ferrill", "Brandon  Ferrill", "Branden Barker", "Boyzell Hosey", "Boris Semeniako", "Bonnie Berkowitz", "Bonnie Barkowitz", "Bonita Burton", "Bo Jin", "Bill Gaspard", "Bill Campling", "Bill Bootz", "Bev Wake", "Beth Flynn", "Beth Broadwater", "Benjamin Hoffman", "Ben Wiseman", "Ben Ramsden", "Ben Longden", "Ben Howard", "Becky Guthrie", "Beatrice Lundborg", "Beat Balzli", "Barbara Davidson", "Barara Davidson", "Baily Franklin", "Axel Oberg", "Axel Bjorklund", "Atilla Futaki", "Ashley Gilbertson", "Arnt Paulsen", "Armando Sanchez", "Armando Estrop", "Ariel Freaner", "Aric Crabb", "Ari Kinnari", "April Robinson", "Aparna Khopkar", "Antonio Navalon", "Antonio Ismael Sandiego", "Anne Mette  Svane", "Anna-Lena Lauren", "Ania Medrek", "Angelo Rinaldi", "Angeles Barajas", "Angel Hermoza", "Anette Nantell", "Andy Rementer", "Andrew Umentum", "Andrew Stocks", "Andrew Joyce", "Andrew Forbes", "Andrew Burton", "Andrew Braford", "Andrea Zagata", "Andrea Levy", "Andi Meier", "Anders Rye", "Anders Hansson", "Ana Gueller", "Amy King", "Amy Kelsey", "Amy Correnti", "Amanda Soto", "Amanda Cox", "Alma Lozoya", "Allison Hong", "Allessandro Alvim", "Allen Schaben", "Alicia Parlapiano", "Alicia Kowalewski", "Alicia DeSantis", "Alexandra Zsigmond", "Alex Kingsbury", "Alex K. Fong", "Alex Breuer", "Alejandro Mingarro", "Alejandra Sandoval", "Alejandra Bliffeld", "Albin Grahn", "Alberto Lucas Lopez", "Alberto Euadra", "Alan Hagman", "Ahmed Essa Al Zedjali", "Adrian Castillo de los Cobos", "Adonis Durado", "Adolfo Arranz", "Adam Zyglis", "Adam Vieyra", "Adam Rogers", "Aaron Steckelbewreg", "Aaron Steckelberg", "Aaron Lavinsky"];
    $( "#categorysearch" ).autocomplete({
      source: categoryTags
    });

    $( "#awardsearch" ).autocomplete({
      source: awardTags
    });

    $("#publicationsearch").autocomplete({
      source: publicationTags
    });
    $("#designersearch").autocomplete({
      source: designerTags
    });


  } );


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

var iso = $grid.data('isotope');
var $filterCount = $('.filter-count');

function updateFilterCount() {
  $filterCount.text( 'Showing ' + iso.filteredItems.length + ' entries' );
}

updateFilterCount();

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
  updateFilterCount();
  return qsRegex;
});

// uses the value of the search field to filter
var $awardsearch = $('#awardsearch').keyup( debounce( function() {
  // if awardsearch.val() contains "("
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
  updateFilterCount();

  return searchType;
}) );


var $categorysearch = $('#categorysearch').keyup( debounce( function() {
  qsRegex = new RegExp( $categorysearch.val(), 'giu' );
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
  updateFilterCount();
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
  updateFilterCount();
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
  updateFilterCount();

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

// $('.accordion').click(function(){
//     var $this = $(this);
//     $this.toggleClass('accordion-hide');
//     if($this.hasClass('accordion-hide')){
//       $this.text('View Filters');

//       // $arrow.addClass('down');

//     } else {
//       $this.text('Hide Filters');
//       $('.arrow-hidden').removeClass('arrow-hidden');
//     }
//   });


$('.accordion').click(function(){
    var $this = $(this);
    $this.toggleClass('accordion-hide');
    if($this.hasClass('accordion-hide')){
      $this.text('View Filters');
      $this.remove('.arrow')
      $this.append('<i class="arrow down"></i>');
    } else {
      $this.text('Hide Filters');
      $this.remove('.arrow')
      $this.append('<i class="arrow up"></i>');
    }
  });


$('.share-close').click(function(){
  // var $this = $(this);
  var $container = $('.share-container');
  $container.removeClass('share-show');
  $container.addClass('share-hide');
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