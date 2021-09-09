var fs = require('fs');
const Book = function (book_id, customer_id, room_id, date) {
    this.book_id = book_id;
    this.customer_id = customer_id;
    this.room_id = room_id;
    this.date = date;
}
Book.prototype.getRoom = function () {
    return `${this.book_id} ${this.customer_id} ${this.room_id} ${this.room_price} ${this.date}`
}

var books = new Array();
books.push(new Book(1, 1, "011", "2021-09-01"));
books.push(new Book(2, 2, "012", "2021-09-02"));
books.push(new Book(3, 3, "013", "2021-09-03"));
books.push(new Book(4, 4, "014", "2021-09-04"))
books.push(new Book(5, 5, "015", "2021-09-05"));



// bookRoom = (book_id, customer_id, room_id, date) => {
//     let check = false;
//     books.forEach((book) => {
//         if (book.book_id == book_id || book.room_id == room_id && book.date == date) {
//             console.log("จองแล้ว");
//             check = true;
//         }
//     })
//     if (check == false) {
//         books.push(new Book(book_id, customer_id, room_id, date))
//         return books;
//     } else if (check == true) {
//         console.log("sorry");
//     }
// }

// deleteBook = (id) => {
//     let check = false;
//     let index;
//     books.forEach((book) => {
//         if (book.book_id == id) {
//             check = true;
//         }
//     })
//     index = books.findIndex(books => books.book_id == id)
//     if (check == true) {
//         books.splice(index, 1)
//         return books;
//     } else if (check == false) {
//         console.log("Don't have room in hotel");
//     }
// }
// checkBook = (id)=>{
//     let check = false;
//     books.forEach((book)=>{
//         if(book.book_id==id){
//             console.log("Booking success");
//             check = true;
//         }
//     })
//     if(check == false){
//         console.log("NO booking");
//     }
// }
// checkBook(1)
// checkBook(4)
// deleteBook(1)
// console.table(books);

// bookRoom(6,4,"001","2021-09-01")
module.exports = {
    books: books,
    Book: Book
}