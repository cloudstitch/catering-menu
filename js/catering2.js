
function showMenuFor(dateStr) {
  var itemList = CTS('sheet|Meals!rows')[0].toJson();
  var typeList = CTS('sheet|MealTypes!rows')[0].toJson();

  var ret = {};
  var html = "";

  for (var i = 0; i < itemList.length; i++) {
    var meal = itemList[i];
    var day = moment(meal.Date, 'MM/DD/YYYY').format('MM/DD/YYYY');
    console.log(day, dateStr)
    if (day == dateStr) {
      for (var j = 0; j < typeList.length; j++) {
        var type = typeList[j];
        if (meal[type.ID]) {
          var begin = type.Start;
          var end = type.End;
          var title = meal[type.ID];
          html += "<div class='bs-callout bs-callout-" + type.ID + "'>";
          html += "<h4>" + type.ID + "</h4>";
          html += "<p>" + title + "</p>";
          html += "</div>";
        }
      }
    }
  }
  if (html == "") {
    html += "<div class='alert alert-info'>";
    html += "<p>No meal data for this day.</p>";
    html += "</div>";
  }
  $('#menu').html(html);

  return ret;
}

$(function() {
  CTS.booted.then(
    function() {
      $('#paginator')
        .datepaginator({
          selectedDateFormat: 'MM/DD/YYYY'
        })
        .on('selectedDateChanged', function(event, date) {
          var dateStr = date.format('MM/DD/YYYY');
          showMenuFor(dateStr);
        });
      showMenuFor(moment().format('MM/DD/YYYY'));
    }
  );
});