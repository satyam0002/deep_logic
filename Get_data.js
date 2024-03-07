const https = require('https');
const http = require('http');
var options = {
    host: 'time.com',
    path: '/',
    method: 'GET'
};

const getData = () => {
    return new Promise((resolve, reject) => {
        https.request(options, (res) => {
            let str = '';
            res.on('data', (d) => {
                let data = d.toString();
                str += data;

            });
            res.on('end', () => {
                resolve(str);
            })
            res.on('error', (error) => {
                reject(error);
            })
        }).end();
    })
}
module.exports=getData