var incomingMeetupUrl = "https://api.meetup.com/2/events?"
                      + "offset=0&format=json&limited_events=False&"
                      + "group_urlname=Silesia-JUG"
                      + "&photo-host=public&page=20&"
                      + "fields=&order=time&desc=false&status=upcoming"
                      + "&key=7363144257e59129169442773f3";

var div = "#meetup-details";

$.ajax({
    type: "GET",
    dataType: "jsonp",
    url: incomingMeetupUrl,
    beforeSend: function() { displayLoadingMessage(div); },
    success: function (data, text) { handleSuccessfulResponse(data, div); },
    error: function (request, status, error) { displayErrorMessage(div); },
    complete: function() { removeLoadingMessage(div); }
});

function displayLoadingMessage(container) {
  $(container).append('<div class="loading"><strong>Trwa ładowanie danych...</strong></div>');
}

function handleSuccessfulResponse(response, container) {
  if(response.results.length > 0) {
    displayMeetupDetails(response.results[0], container);
  } else {
    displayNoIncomingMeetupsMessage(container);
  }
}

function displayMeetupDetails(meetup, container) {
  $(container).append('<h3><a href="' + meetup.event_url + '">' + meetup.name + "</a></h3>")
  $(container).append('<p class="text-spaced">');
  $(container).append(meetup.description);
  $(container).append("<h4>Szczegółowe informacje na temat spotkania</h4>")
  $(container).append('<span class="glyphicon glyphicon-calendar" aria-hidden="true"></span>&nbsp;<strong>Termin</strong>: ');
  $(container).append(getPolishDateTime(meetup.time) + "<br/>");
  $(container).append('<span class="glyphicon glyphicon-map-marker" aria-hidden="true"></span>&nbsp;<strong>Miejsce</strong>: ')
  $(container).append(meetup.venue.name + ', ' + meetup.venue.address_1 + ', ' + meetup.venue.city + "<br/>");
  $(container).append('<span class="icon-meetup"></span>&nbsp;<a href="' + meetup.event_url + '">Dołącz do spotkania na Meetupie</a> i poznaj więcej szczegółów.');
  $(container).append("</p>");
}

function displayNoIncomingMeetupsMessage(container) {
  $(container).append("<h3>Planujemy nadchodzące spotkanie SJUGa...</h3>")
  $(container).append('<p class="text-spaced">');
  $(container).append("Szczegółowe informacje na temat nadchodzących spotkań pojawią się wkrótce. :-)")
  $(container).append("</p>");
}

function displayErrorMessage(container) {
  $(container).append("<h3>Błąd! :-(</h3>")
  $(container).append('<p class="text-spaced">');
  $(container).append("Wystąpił błąd podczas pobierania danych z serwisu meetup.com. Proszę odświeżyć stronę.<br/>");
  $(container).append("Jeśli błąd nadal się powtarza, proszę odwiedzić stronę później.");
  $(container).append("</p>");
}

function removeLoadingMessage(container) {
  $(container + " .loading").remove();
}
