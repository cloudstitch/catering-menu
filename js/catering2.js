
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
  CTS.booted.then(
    function() {
      var options = {
        selectedDateFormat: 'MM/DD/YYYY',
        onSelectedDateChanged: function(event, date) {
          $('#menu').html(date);
        }
      };
      $('#paginator').datepaginator(options);
      // window.cal.setData(generateData());
    }
  );
});