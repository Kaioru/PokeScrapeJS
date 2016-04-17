var Client = require('node-rest-client').Client,
    fs = require('fs');

var client = new Client();

client.get('http://pokeapi.co/api/v2/pokemon/?limit=999',
    function(data, response) {
        var results = data.results;

        for (var i in results) {
            client.get(results[i].url, function(data, response) {
                var id = data.id;

                if (id) {
                    fs.writeFile('output/' + id + '.js', JSON.stringify(data, null, 2), function(err) {
                        if (err) return console.log(err);
                        console.log('Finished saving Pokemon #' + id + '.');
                    });
                }
            });
        }
    });
