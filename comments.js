// Create web server
var http = require('http');
var url = require('url');
var fs = require('fs');
var path = require('path');
var comments = {};
var server = http.createServer(function (req, res) {
    var urlObj = url.parse(req.url, true);
    var pathname = urlObj.pathname;
    if (pathname === '/') {
        var filePath = path.join(__dirname, 'index.html');
        fs.readFile(filePath, 'utf8', function (err, data) {
            if (err) {
                res.end('read file error');
            } else {
                res.end(data);
            }
        });
    } else if (pathname === '/getComments') {
        var json = JSON.stringify(comments);
        res.end(json);
    } else if (pathname === '/addComment') {
        var comment = urlObj.query;
        var time = new Date();
        comment.time = time;
        var id = time.getTime();
        comment.id = id;
        comments[id] = comment;
        res.end('success');
    } else if (pathname === '/deleteComment') {
        var id = urlObj.query.id;
        delete comments[id];
        res.end('success');
    } else {
        var filePath = path.join(__dirname, pathname);
        fs.readFile(filePath, 'utf8', function (err, data) {
            if (err) {
                res.end('read file error');
            } else {
                res.end(data);
            }
        });
    }
});
server.listen(8080, function () {
    console.log('server is listening at port 8080');
});