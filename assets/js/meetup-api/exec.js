$(document).ready(function() {  
    function ParsedEvents(rawEvents) {
        var groupByYears = function() {    
            var withDates = rawEvents.map(function(rawEvent) {
                return {date: new Date(rawEvent.time), id: rawEvent.id, name: rawEvent.name, link: rawEvent.link}
            });
            
            return withDates.reduce(function(result, cur){
                var year = cur.date.getFullYear();
                if (result.hasOwnProperty(year)) {
                    result[year].push(cur);
                } else {
                    result[year] = [cur];
                }
                return result;
            }, {});
        };
        
        return {groupByYears: groupByYears};
    }

    var loadMeetups = function(target, eventToListItemFn, extraInformation) {
        new MeetupApi().getEvents(function(responseJson) {
            var groupedByYears = new ParsedEvents(responseJson.data).groupByYears();
            var resultHtml = '';
            Object.keys(groupedByYears).sort().reverse().forEach(function(year) {
                resultHtml += '<li><h4>' + year + '</h4><ul>';
                groupedByYears[year].forEach(function(it) { 
                    resultHtml += '<li>' + eventToListItemFn(Object.assign({}, it, extraInformation[it.id])) + '</li>'; 
                });
                resultHtml += '</ul></li>';
            });
            $(target).prepend(resultHtml);
        });
    };
 
    loadMeetups($('#events'), function(event) {
        return '' +
            event.name.replace(/^S(ilesia )?JUG \#[0-9]+ - /, '') + ' - ' +
            (event.author ? event.author + ' - ' : '') + 
            event.date.toISOString().slice(0, 10).split('-').reverse().join('.') + ' - ' + 
            '<a href="' + event.link + '">wydarzenie na meetupie</a>' +
            (event.furtherLinks ? ', ' + event.furtherLinks : '');
    }, extraInformations);
});