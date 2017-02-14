var google = require('google');

google.resultsPerPage = 5;
var nextCounter = 0;

google('pytohn', function (err, res){
    if (err) console.error(err);

    for (var i = 0; i < res.links.length; ++i) {
        var link = res.links[i];
        console.log(link.title + ' - ' + link.href);
        console.log(link.description + "\n");
    }

    if (nextCounter < 4) {
        nextCounter += 1;
        if (res.next) res.next();
    }
});
'use strict';

var ArgumentParser = require('argparse').ArgumentParser;
var parser = new ArgumentParser({
    version: '0.0.1',
    addHelp:true,
    description: 'Argparse example'
});
parser.addArgument(
    [ '-f', '--foo' ],
    {
        help: 'foo bar'
    }
);
parser.addArgument(
    [ '-b', '--bar' ],
    {
        help: 'bar foo'
    }
);
parser.addArgument(
    '--baz',
    {
        help: 'baz bar'
    }
);
var args = parser.parseArgs();
console.dir(args);
