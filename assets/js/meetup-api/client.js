function MeetupApi() {
    var BASE_URL = 'http://api.meetup.com';
    
    var makeApiCall = function(uri, method, params, callback) {
        $.ajax({
            url: BASE_URL + uri,
            jsonp: 'callback',
            dataType: 'jsonp',
            data: Object.assign({}, params),
            success: callback
        });
    };
    
    var getEvents = function(callback) {
        makeApiCall(
            '/Silesia-JUG/events', 
            'GET', 
            {status: 'past', desc: true, only: 'name,time,link,id', page: 200},
            callback
        );
    };
    
    return {getEvents: getEvents};
}