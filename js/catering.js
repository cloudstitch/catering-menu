$(function() {

  var cal = $('#calendar').calendario({
    onDayClick: function( $el, $contentEl, dateProperties ) {
      for(var key in dateProperties) {
        console.log( key + ' = ' + dateProperties[ key ] );
      }
    },
    caldata: codropsEvents
  });

  var curMonth = cal.getMonthName();
  var curYear = cal.getYear();

  var $nextBtn = $('#custom-next');
  var $prevBtn = $('#custom-prev');
  var $todayBtn = $('#custom-current');

  var $month = $('#custom-month');
  var $year = $('#custom-year');
  updateMonthYear();

  $nextBtn.on( 'click', function() {
    cal.gotoNextMonth( updateMonthYear );
  });
  $prevBtn.on( 'click', function() {
    if ((cal.getMonthName() == curMonth) && (cal.getYear() == curYear)) {
    } else {
      cal.gotoPreviousMonth( updateMonthYear );      
    }
  });
  $todayBtn.on( 'click', function() {
    cal.gotoNow( updateMonthYear );
  });

  function updateMonthYear() {        
    $month.html( cal.getMonthName() );
    $year.html( cal.getYear() );

    if ((cal.getMonthName() == curMonth) && (cal.getYear() == curYear)) {
      $prevBtn.css({opacity: 0.3});
      $todayBtn.css({opacity: 0.3});
    } else {
      $prevBtn.css({opacity: 1.0});
      $todayBtn.css({opacity: 1.0});
    }
  }

  // you can also add more data later on. As an example:
  /*
  someElement.on( 'click', function() {
    
    cal.setData( {
      '03-01-2013' : '<a href="#">testing</a>',
      '03-10-2013' : '<a href="#">testing</a>',
      '03-12-2013' : '<a href="#">testing</a>'
    } );
    // goes to a specific month/year
    cal.goto( 3, 2013, updateMonthYear );

  } );
  */

  function createMeal(type, desc, meals) {

  }

  function fetchDate(item) {
    // Assumption: date is month/day/year

    // item.date.'09-05-2014'
  }

  // itemList: each item has Date + MealNames
  // typeList: each item has ID, Name, StartTime, EndTime 
  function generateData(itemList, typeList) {
    var meals = {};
    for (var i = 0; i < typeList.length; i++) {
      var item = typeList[i];
      meals[item.id] = item;
    }

    var ret = {};

    for (var i = 0; i < itemList.length; i++) {
      var item = itemList[i];
      var events = [];
      for (var meal in meals) {
        if (typeof item[meal] != 'undefined') {
          events.push(createMeal(meal, item[meal], meals));
        }
      }
      var day = fetchDate(item);
      ret[day] = events;
    }
  }
});