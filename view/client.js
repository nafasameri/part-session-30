const config = require("../config");
const http = require('http');
const fs = require('fs');
const logger = require('log4js').getLogger();
logger.level = 'debug';


/// GET roles
http.request({
    hostname: config.serverConfig.hostname,
    port: config.serverConfig.port,
    path: '/roles/role',
    method: 'GET'
}, (res) => {
    let buffer = '';
    res.on('data', (chunk) => {
        buffer += chunk;
    });

    res.on('end', () => {
        const contentType = res.headers['content-type'];
        if (res.statusCode == 200)
            if (contentType == 'text/html')
                logger.info(buffer.toString());
            else
                logger.info(JSON.parse(buffer.toString()));
        else
            logger.error(JSON.parse(buffer.toString()));
    });
}).end();


/// GET role with id
http.request({
    hostname: config.serverConfig.hostname,
    port: config.serverConfig.port,
    path: '/roles/role?id=2',
    method: 'GET'
}, (res) => {
    let buffer = '';
    res.on('data', (chunk) => {
        buffer += chunk;
    });

    res.on('end', () => {
        const contentType = res.headers['content-type'];
        if (res.statusCode == 200)
            if (contentType == 'text/html')
                logger.info(buffer.toString());
            else
                logger.info(JSON.parse(buffer.toString()));
        else
            logger.error(JSON.parse(buffer.toString()));
    });
}).end();


/// content type x-www-form-urlencoded
let req = http.request({
    hostname: config.serverConfig.hostname,
    port: config.serverConfig.port,
    path: '/roles/role',
    method: 'GET',
    headers: {
        'Content-Type': 'application/x-www-form-urlencoded'
    }
}, (res) => {
    let buffer = '';
    res.on('data', (chunk) => {
        buffer += chunk;
    });

    res.on('end', () => {
        const contentType = res.headers['content-type'];
        if (res.statusCode == 200)
            if (contentType == 'text/html')
                logger.info(buffer.toString());
            else
                logger.info(JSON.parse(buffer.toString()));
        else
            logger.error(JSON.parse(buffer.toString()));
    });
});
req.write(JSON.stringify({
    testKey: 'testValue'
}));
req.end();



/// music 
http.request({
    hostname: config.serverConfig.hostname,
    port: config.serverConfig.port,
    path: '/music/',
    method: 'GET'
}, (res) => {
    res.on('data', (chunk) => {
        const contentType = res.headers['content-type'];
        if (res.statusCode == 200)
            if (contentType == 'text/html')
                logger.info(chunk.toString());
            else
                logger.info(JSON.parse(chunk.toString()));
        else
            logger.error(JSON.parse(chunk.toString()));
    });
}).end();


/// music upload 
http.request({
    hostname: config.serverConfig.hostname,
    port: config.serverConfig.port,
    path: '/music/upload',
    method: 'POST',
    headers: {
        'Content-Type': 'multipart/form-data'
    },
    form: {
        fields: 'test',
        files: fs.createReadStream('D:\\Media\\Music\\Irani\\samin bahin farokhzad.mp3')
    }
}, (res) => {
    res.on('data', (chunk) => {
        const contentType = res.headers['content-type'];
        if (res.statusCode == 200)
            if (contentType == 'text/html')
                logger.info(chunk.toString());
            else
                logger.info(JSON.parse(chunk.toString()));
        else
            logger.error(JSON.parse(chunk.toString()));
    });
}).end();


/// music range
http.request({
    hostname: config.serverConfig.hostname,
    port: config.serverConfig.port,
    path: '/music/range?31 ',
    method: 'GET',
    headers:{
        Range:'bytes=0-'
    }
}, (res) => {
    res.on('data', (chunk) => {
        const contentType = res.headers['content-type'];
        if (res.statusCode == 200)
            if (contentType == 'text/html')
                logger.info(chunk.toString());
            else
                logger.info(JSON.parse(chunk.toString()));
        else
            logger.error(JSON.parse(chunk.toString()));
    });
}).end();