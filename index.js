var request = require('request');
var argv = require('yargs').argv;

var findLocation = function(ip, callback) {
    var path;
    if (typeof(ip) === 'function' || !ip) path = 'json';
    else path = ip;
    
    request('http://ipinfo.io/' + path, function(error, response, body) {
        var json = JSON.parse(body);
        callback(null, json.city + ', ' + json.region);
    });
};

if (require.main === module) {
    findLocation(argv._[0], function(err, location) {
        console.log('Server location: ' + location);
    });
}

module.exports = findLocation;
