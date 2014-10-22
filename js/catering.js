
function generateData() {
  var itemList = CTS('sheet|Meals!rows')[0].toJson();
  var typeList = CTS('sheet|MealTypes!rows')[0].toJson();

  var ret = {};

  for (var i = 0; i < itemList.length; i++) {
    var meal = itemList[i];
    var day = moment(meal.Date, 'MM/DD/YYYY').format('MM-DD-YYYY');
    var html = "<ul class='menu'>";

    for (var j = 0; j < typeList.length; j++) {
      var type = typeList[j];
      if (meal[type.ID]) {
        var begin = type.Start;
        var end = type.End;
        var title = meal[type.ID];
        html += "<li class='meal " + type.ID + "'>";
        html += "<span class='meal'>" + type.ID + "</span>";
        html += "<span class='fromto'>" + type.Start + " - " + type.End + "</span>";
        html += "<span class='title'>" + title + "</span>";
        html += "</li>";
      }
    }
    html += "</ul>";
    ret[day] = html;
  }
  console.log(ret);
  return ret;

}

$(function() {
  window.cal = $('#calendar').calendario({
    onDayClick: function( $el, $contentEl, dateProperties ) {
      for(var key in dateProperties) {
        console.log( key + ' = ' + dateProperties[ key ] );
      }
    }
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

  CTS.booted.then(
    function() {
      window.cal.setData(generateData());
    }
  );
});