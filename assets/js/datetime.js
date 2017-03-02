function getPolishDateTime(miliseconds) {
  var polishMonthNames = [ 'Styczeń', 'Luty', 'Marzec', 'Kwiecień', 'Maj',
                           'Czerwiec', 'Lipiec', 'Sierpień', 'Wrzesień',
                           'Październik', 'Listopad', 'Grudzień' ];

  var date = new Date(miliseconds);
  var month = date.getMonth();
  var minutes = date.getMinutes();
  minutes = (minutes < 10) ? '0' + minutes : minutes;
  return date.getDate() + ' ' + polishMonthNames[month] + ' '
  + date.getFullYear() + ', ' + date.getHours() + ':' + minutes;
}
