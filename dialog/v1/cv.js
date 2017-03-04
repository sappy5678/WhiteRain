var builder = require('botbuilder');
var cv = require('../../module/v1/MSCVApi/CV.js');

var lib= new builder.Library('cv');

module.exports={
    createLibrary: ()=>{return lib;},
    cv:(session,options)=>{session.beginDialog('cv:cv',options||{});}
};

lib.dialog('cv',[
    (session)=>{
        builder.Prompts.choice(session,'what do you want me to do',
                               ['Tags','Categories ','Description','Faces','ImageType','Color','Adult']);
    },
    (session,result)=>{
        session.userData.CVaction = result.response.entity;
        builder.Prompts.choice(session,'where is the Image',['URL','can\'t use']);
    },
    (session,result)=>{
        session.userData.CVImageFrom = result.response.entity;
        if(result.response.entity == 'URL')
            session.beginDialog('getImagesInfoFromURL');
    }
]);

lib.dialog('getImagesInfoFromURL',[
    (session)=>{
        builder.Prompts.text(session,'Input URL');
    },
    async (session,result)=>{
        var ImagesInfo = await cv.getImagesInfoFromURL(session.userData.CVaction,result.response);

        if(!ImagesInfo[0])
        {
            session.send(JSON.stringify(ImagesInfo[1]));
        }
        else{
            session.send(JSON.stringify(ImagesInfo[0]));
        }
        session.endDialog();
    }
]);
