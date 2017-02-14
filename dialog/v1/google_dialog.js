var builder = require('botbuilder');
var google = require('google');

var lib=new builder.Library('google');
google.resultsPerPage = 5;

module.exports={
    createLibrary:()=>{return lib;},
    google:(session,options)=>{session.beginDialog('google:googleSomething',options||{});}
};
lib.dialog('googleSomething',[
    (session)=>{//session.send("what do you want to google?");
        builder.Prompts.text(session,"what do you want to google");
    },
    (session,results)=>{
        google(results.response,function(err,res)
        {
            if(err)session.send(err);

            for(let i=0;i<res.links.length && i<google.resultsPerPage;++i)
            {
                var link=res.links[i];
                var msg = new builder.Message(session)
                    .attachments([
                        new builder.HeroCard(session)
                            .title(link.title)
                            .subtitle(link.href)
                            .text(link.description)
                            .tap(builder.CardAction.openUrl(session,link.href))
                    ]);
                session.send(msg);
            }
            session.endDialog();

        });
    }
]);
