$(function() {
  $('button').on('click', function() {
    $b = $(this);
    if ($b.attr('submit')) {
      var selector = $b.attr('submit');
      var selection = $(selector);
      selection.find('textarea').hide();
      selection.find('button').hide();
    }
    if ($b.attr('submit')) {
      var selector = $b.attr('submit');
      var selection = $(selector);
      var TA = $(selection.find('textarea'));
      TA.val("[Already answered]" + TA.val());
      selection.find('textarea').hide();
      selection.find('button').hide();
    }
    if ($b.attr('reveal')) {
      var selector = $b.attr('reveal');
      var selection = $(selector).fadeIn();
    }
  });

  $.each($('button'), function(idx, elem) {
    if ($(elem).attr('reveal')) {
      var sel = $(elem).attr('reveal');
      $(sel).hide();
    }
  });
});

