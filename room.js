var fs = require('fs');

const Room = function (room_id, room_number, room_type,room_price, room_status) {
    this.room_id = room_id;
    this.room_number = room_number;
    this.room_type = room_type;
    this.room_price = room_price;
    this.room_status = room_status;
}
Room.prototype.getRoom = function(){
return `${this.room_id} ${ this.room_number} ${ this.room_type} ${this.room_price} ${this.room_status}`
}

var rooms = new Array();
rooms.push(new Room(1, "001", "deluxe",5000, "occupied clean"));
rooms.push(new Room(2, "010", "standard",2500, "occupied dirty"));
rooms.push(new Room(3, "008", "standard", 2500,"occupied clean"));
rooms.push(new Room(4, "015", "standard", 2500,"occupied clean"))
rooms.push(new Room(5, "012", "standard", 2500,"occupied dirty"));


// addRoom = (room_id,number,type ,price, status) => {
//     let check = false;
//     rooms.forEach((room) => {
//         if (room.room_number == number) {
//             console.log("sorry1");
//             check = true;
//         }
//     })
//     if (check == false) {
//         rooms.push(new Room(room_id,number,type ,price, status))
//         return rooms;
//     } else if (check == true) {
//         console.log("sorry"); 
//     }
// }

// deleteRoom = (id) => {
//     let check = false;
//     let index;
//     rooms.forEach((room) => {
//         if(room.room_id == id) {
//             check = true;
//         }
//     })
//     index = rooms.findIndex(rooms => rooms.room_id == id)
//     if(check == true) {
//         rooms.splice(index , 1)
//         return rooms;
//     } else if(check == false) {
//         console.log("Don't have room in hotel");
//     }
// }
// deleteRoom(5);
// console.table(rooms);

module.exports={
    rooms:rooms,
    Room:Room
}