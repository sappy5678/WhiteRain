let GoogleArgumentParse = require('argparse').ArgumentParser;
let GoogleParse = new GoogleArgumentParse({
    version:'1.0',
    addHelp:true,
    description:'Google Argument Example'
});
let Google = require('google');

GoogleParse.addArgument(['-L','--limits'],
                        {
                            help:'-L=10'
                        });

module.exports={
    GoogleParseFromText:GoogleParseFromText,
    test: ()=>{console.log("TTTTT");}
};

function GoogleParseFromText(messageText)
{
    let parment = GoogleParse.parseKnownArgs(messageText.match(/-\w+/i));
    console.dir(parment);
    Google.resultsPerPages = parment[0];
    Google(messageText.match(/^google\s.*-|^google\s.*/i),function(err,res){
        if (err) return (false,err);

    });
}

