var fs = require('fs');

const Customer = function (customer_id, customer_name, address, phone) {
    this.customer_id = customer_id;
    this.customer_name = customer_name;
    this.address = address;
    this.phone = phone;
}
Customer.prototype.getRoom = function () {
    return `${this.customer_id} ${this.customer_name} ${this.address} ${this.phone} `
}

var customers = new Array();
customers.push(new Customer(1, "john", "London , United Kingdom", "09566478951"));
customers.push(new Customer(2, "mary", "Canberra , Australia", "0975653138"));
customers.push(new Customer(3, "sherlock", "Paris , France", "0654771237"));
customers.push(new Customer(4, "hudson", "Bern , Switzerland", "0894516325"));
customers.push(new Customer(5, "greg", "Warsaw , Poland", "0876408711"));



// createCustomer = (customer_id, customer_name, address, phone) => {
//     let check = false;
//     customers.forEach((customer) => {
//         if (customer.customer_id == customer_id) {
//             console.log("มีcustomerนี้แล้ว");
//             check = true;
//         }
//     })
//     if (check == false) {
//         customers.push(new Customer(customer_id, customer_name, address, phone))
//         return customers;
//     } else if (check == true) {
//         console.log("sorry");
//     }
// }

// createCustomer(5,"Kanticha","Thailand","0863632790")

// deleteCustomer = (id) => {
//     let check = false;
//     let index;
//     customers.forEach((customer) => {
//         if(customer.customer_id == id) {
//             check = true;
//             console.log("Delete sucess");
//         }
//     })
//     index = customers.findIndex(customers => customers.customer_id == id)
//     if(check == true) {
//         customers.splice(index , 1)
//         return customers;
//     } else if(check == false) {
//         console.log("Don't have customer");
//     }
// }

// deleteCustomer(1)
// console.table(customers);

module.exports={
    customers:customers,
    Customer:Customer
}