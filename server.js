var http = require('http');
var url = require('url');
var fs = require('fs')
const { addRoom, deleteRoom, createCustomer,deleteCustomer,bookRoom ,deleteBook} = require('./hotel');



http.createServer(function (req, res) {

    var request_path = url.parse(req.url, true);
    var message = '';
    var status = 200;
    var data ='';
    
    switch (request_path.pathname) {
        case '/addRoom':
            try{
                  addRoom(request_path.query.room_id, request_path.query.room_number,request_path.query.type,
                request_path.query.price,request_path.query.status);
                 message += `Add room no.${request_path.query.room_number} status ${request_path.query.status} `;
            }catch(err){
                message += err;
            console.log(err);
            }
            break;

        // case '/sell':
        //     try {
        //         sell(request_path.query.item, parseInt(request_path.query.quantity));
        //         message += request_path.query.quantity + ' ' + request_path.query.item + ' sold!';
        //     } catch (err) {
        //         message += err;
        //         console.log(err);
        //     }
        //     break;

        // case '/check':
        //     try {
        //         let qtt = check(request_path.query.item);
        //         message += 'We have ' + qtt + ' ' + request_path.query.item + ' check!';
        //     } catch (err) {
        //         message += err;
        //         console.log(err);
        //     }
        //     break;

        // case '/clear':
        //     try {
        //         clear(request_path.query.item);
        //         message += request_path.query.item + ' clear!';
        //     } catch (err) {
        //         message += err;
        //         console.log(err);
        //     }
        //     break;

        // case '/remove':
        //     try {
        //         clear(request_path.query.item);
        //         message += request_path.query.item + ' remove!';
        //     } catch (err) {
        //         status = 400
        //         message += err;
        //         console.log(err);
        //     }
        //     break;
        // default:
        //     status = 404;
        //     message = 'path not found!'
        //     break;
            
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

