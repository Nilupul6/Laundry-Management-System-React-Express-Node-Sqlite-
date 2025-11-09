const db = require("../database/database.js");

// --- Create a new order ---
exports.create = (orderData, result) => {
  // Serialize the 'Items' array into a JSON string
  const itemsJson = JSON.stringify(orderData.Items);

  const sql = `INSERT INTO orders (
    BillNo, Date, CustomerName, Telephone, Address, 
    ServiceType, DeliveryTime, Items, Advance, Balance,
    isDelivered, actualDeliveryDate, customerPayment
  ) VALUES (?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?)`;

  const params = [
    orderData.BillNo,
    orderData.Date,
    orderData.CustomerName,
    orderData.Telephone,
    orderData.Address,
    orderData.ServiceType,
    orderData.DeliveryTime,
    itemsJson, // Save the stringified JSON
    orderData.Advance,
    orderData.Balance,
    false, // isDelivered (default 0)
    null, // actualDeliveryDate
    null, // customerPayment
  ];

  db.run(sql, params, function (err) {
    if (err) {
      console.error("Error creating order:", err.message);
      result(err, null);
      return;
    }
    result(null, { BillNo: orderData.BillNo });
  });
};

// --- Find a single order by BillNo ---
exports.findByBillNo = (billNo, result) => {
  const sql = "SELECT * FROM orders WHERE BillNo = ?";
  db.get(sql, [billNo], (err, row) => {
    if (err) {
      console.error("Error finding order:", err.message);
      result(err, null);
      return;
    }
    // Parse the 'Items' JSON string back into an array
    if (row) {
      row.Items = JSON.parse(row.Items || "[]");
    }
    result(null, row);
  });
};

// --- Find all orders ---
exports.findAll = (result) => {
  const sql = "SELECT * FROM orders";
  db.all(sql, [], (err, rows) => {
    if (err) {
      console.error("Error finding all orders:", err.message);
      result(err, null);
      return;
    }
    // Parse the 'Items' JSON string for every order
    const orders = rows.map((row) => {
      row.Items = JSON.parse(row.Items || "[]");
      return row;
    });
    result(null, orders);
  });
};

// --- Update an existing order ---
exports.update = (billNo, orderData, result) => {
  // Serialize the 'Items' array
  const itemsJson = JSON.stringify(orderData.Items);

  const sql = `UPDATE orders SET
    Date = ?,
    CustomerName = ?,
    Telephone = ?,
    Address = ?,
    ServiceType = ?,
    DeliveryTime = ?,
    Items = ?,
    Advance = ?,
    Balance = ?,
    isDelivered = ?,
    actualDeliveryDate = ?,
    customerPayment = ?
  WHERE BillNo = ?`;

  const params = [
    orderData.Date,
    orderData.CustomerName,
    orderData.Telephone,
    orderData.Address,
    orderData.ServiceType,
    orderData.DeliveryTime,
    itemsJson,
    orderData.Advance,
    orderData.Balance,
    orderData.isDelivered,
    orderData.actualDeliveryDate,
    orderData.customerPayment,
    billNo, // BillNo is the last parameter for the WHERE clause
  ];

  db.run(sql, params, function (err) {
    if (err) {
      console.error("Error updating order:", err.message);
      result(err, null);
      return;
    }
    if (this.changes === 0) {
      // No row was updated (BillNo not found)
      result({ kind: "not_found" }, null);
      return;
    }
    result(null, { message: "Order updated successfully." });
  });
};

// --- Delete an order by BillNo ---
exports.delete = (billNo, result) => {
  const sql = "DELETE FROM orders WHERE BillNo = ?";
  db.run(sql, [billNo], function (err) {
    if (err) {
      console.error("Error deleting order:", err.message);
      result(err, null);
      return;
    }
    if (this.changes === 0) {
      result({ kind: "not_found" }, null);
      return;
    }
    result(null, { message: "Order deleted successfully." });
  });
};

module.exports = exports;
