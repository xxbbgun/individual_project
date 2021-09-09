var http = require('http');
var url = require('url');
var fs = require('fs')
const { addRoom, createCustomer, bookRoom, deleteBook, checkBook } = require('./hotel');



http.createServer(function (req, res) {

    var request_path = url.parse(req.url, true);
    var message = '';
    var status = 200;
    var data = '';

    switch (request_path.pathname) {
        case '/addRoom':
            try {//room_id,number,type ,price, status
                let Room = addRoom(parseInt(request_path.query.room_id), request_path.query.room_number, request_path.query.room_type,
                parseInt(request_path.query.room_price) , request_path.query.status);
                message += `Add room no.${request_path.query.room_number} status ${request_path.query.status} `;
                data += JSON.stringify(Room);
            } catch (err) {
                message += err;
                console.log(err);
            }
            break;
        case '/createCustomer':
            try { //customer_id, customer_name, address, phone
                let Customer = createCustomer(parseInt(request_path.query.customer_id), request_path.query.customer_name, 
                    request_path.query.address,request_path.query.phone);
                message += `Create customer ${request_path.query.customer_name} already! `;
                data += JSON.stringify(Customer);
            } catch (err) {
                message += err;
                console.log(err);
            }
            break;
        case '/bookRoom':
            try {//book_id, customer_id,room_id,date
                let Book = bookRoom(parseInt(request_path.query.book_id), parseInt(request_path.query.customer_id), 
                request_path.query.room_id,request_path.query.date);
                message += `Booking id: ${request_path.query.book_id} is already! `;
                data += JSON.stringify(Book);
            } catch (err) {
                message += err;
                console.log(err);
            }
            break;

        case '/deleteBook':
            try {
                deleteBook(parseInt(request_path.query.book_id));
                message += `Booking id: ${request_path.query.book_id} already delete`;
            } catch (err) {
                message += err;
                console.log(err);
            }
            break;

        case '/checkBook':
            try {
                let check = checkBook(request_path.query.book_id);
                message += `Check Booking`;
                data += JSON.stringify(check);
            } catch (err) {
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
        data: data
    }


    res.writeHead(status, { 'Content-Type': 'application/json' });
    res.end(JSON.stringify(response_object));

}).listen(8080);
console.log('Hotel booking system is running on port 8080.');

