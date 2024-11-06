const https = require('https');
const http = require('http');
const getData= require('./Get_data');
function linkData(links) {
    let finalArray = [];
    links.forEach(element => {
        let f = element.replace('href="', "");
        let s = f.replace('">', "");
        s = 'https://time.com' + s;
        finalArray.push(s);
    });
    return finalArray;

}

function storiesData(stories) {
    let finalArray = [];
    stories.forEach(element => {
        let f = element.replace('line">', "");
        let s = f.replace('</h3>', "");
        let t = s.replace(/<(.*?)>/g, "");
        finalArray.push(t);

    });
    return finalArray
}

 function extract_data(data) {

    let processData = data.replace(/\n/g, "");
    processData = processData.replace(/[t ]+\</g, "<")
    processData = processData.replace(/\>[\t ]+\</g, "><")
    processData = processData.replace(/\>[\t ]+$/g, ">")

    let processDataobj = processData.match(/Latest Stories(.*?)<\/ul>/)

    processData = processDataobj[0]
    let links = processData.match(/href="(.*?)>/g);
    let stories = processData.match(/line">(.*?)h3>/g)

    const processedLink = linkData(links);
    const processTitle = storiesData(stories);

    let finalStoriesArray = [];

    for (i = 0; i < 6; i++) {
        let storyObject = {};
        storyObject['title'] = processTitle[i];
        storyObject['link'] = processedLink[i];

        finalStoriesArray.push(storyObject)
    }
    return finalStoriesArray;
}




grjggjrejgbeebjgbje


async function Latest_News() {
    let data;
    await getData().then((d) => {
        data = d
    }).catch((err) => {
        throw err;
    });

    let finalData = extract_data(data)
    const host = 'localhost';
    const port = 5000;

    const requestListener = function (req, res) {
        res.writeHead(200, { 'Content-Type': 'text/json' });
        if (req.url === '/get_latest_stories') {
            res.end(JSON.stringify(finalData));
        }
    };
    const server = http.createServer(requestListener);
    server.listen(port, host, () => {
        console.log(`Click on the above link http://${host}:${port}/get_latest_stories`);
    });


}

Latest_News();