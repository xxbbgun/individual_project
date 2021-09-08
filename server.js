var http = require('http');
var url = require('url');
var fs = require('fs')
const { loadData, saveData, book,remove,check } = require('./hotel');

loadStock();

http.createServer(function (req, res) {

    var request_path = url.parse(req.url, true);
    var message = '';
    var status = 200;
    var data ='';
    switch (request_path.pathname) {
        case '/fill':
            fill(request_path.query.item, parseInt(request_path.query.quantity));
            message += `${request_path.query.quantity} with ${request_path.query.item} filled!`;
            break;

        case '/sell':
            try {
                sell(request_path.query.item, parseInt(request_path.query.quantity));
                message += request_path.query.quantity + ' ' + request_path.query.item + ' sold!';
            } catch (err) {
                message += err;
                console.log(err);
            }
            break;

        case '/check':
            try {
                let qtt = check(request_path.query.item);
                message += 'We have ' + qtt + ' ' + request_path.query.item + ' check!';
            } catch (err) {
                message += err;
                console.log(err);
            }
            break;

        case '/clear':
            try {
                clear(request_path.query.item);
                message += request_path.query.item + ' clear!';
            } catch (err) {
                message += err;
                console.log(err);
            }
            break;

        case '/remove':
            try {
                clear(request_path.query.item);
                message += request_path.query.item + ' remove!';
            } catch (err) {
                status = 400
                message += err;
                console.log(err);
            }
            break;
        default:
            status = 404;
            message = 'path not found!'
            break;
    }
    let response_object = {
        status: status,
        message: message,
        data:data
    }


    res.writeHead(status, { 'Content-Type': 'application/json' });
    res.end(JSON.stringify(response_object));

}).listen(8080);
console.log('Hotel system is running on port 8080.');

