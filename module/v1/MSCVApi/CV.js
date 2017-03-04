var request = require('request');
module.exports={
    getImagesInfoFromURL:getImagesInfoFromURL
};
var Headers = {
    "Ocp-Apim-Subscription-Key":process.env.MICROSOFT_COGNITIVE_SERVICES_COMPUTER_VISION_KEY,
    "Content-type":"application/json"
};

var Connect = {
    url:"https://westus.api.cognitive.microsoft.com/vision/v1.0/analyze" + "?visualFeatures=Tags",
    method:"POST",
    headers:Headers,
    json:{"url":"http://twimg.edgesuite.net/images/ReNews/20150107/420_8dc29f24edf781d2286f73567c79e6b2.jpg"}
};

var info;
function getTagsFromURL(err,respon,responBody)
{
    if(!err && respon.statusCode == 200)
    {
        // var info = JSON.parse(responBody);
        info  = responBody;
        // console.dir(info.tags);
        // console.log(callback);
        return [null,info];
    }
    else
    {
        return [err];
        console.log(err,respon.body);
    }
}


async function getImagesInfoFromURL(services,ImageURL)
{
    var url = "https://westus.api.cognitive.microsoft.com/vision/v1.0/analyze" + "?visualFeatures=" + services;
    Connect.url = url;
    Connect.json.url = ImageURL;
    var re = await request_promise(Connect);
    re = getTagsFromURL(re[0],re[1],re[2]);
    return re;
}

async function request_promise(connect)
{
    return new Promise((resolve,reject)=>{
        request(connect,(err,respon,responBosy)=>{resolve([err,respon,responBosy]);});
    });
}


// console.dir(getImagesInfoFromURL("https://images-na.ssl-images-amazon.com/images/G/01/img15/pet-products/small-tiles/23695_pets_vertical_store_dogs_small_tile_8._CB312176604_.jpg"));
