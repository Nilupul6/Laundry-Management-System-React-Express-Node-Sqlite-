// const Order = require("../models/order.model.js");

// // --- Create a new order ---
// exports.createOrder = (req, res) => {
//   const orderData = req.body;

//   // Basic validation
//   if (!orderData.BillNo || !orderData.CustomerName) {
//     return res
//       .status(400)
//       .send({ message: "BillNo and CustomerName are required." });
//   }

//   Order.create(orderData, (err, data) => {
//     if (err) {
//       // Check for unique constraint error (duplicate BillNo)
//       if (err.message.includes("UNIQUE constraint failed")) {
//         return res.status(409).send({
//           message: `An order with BillNo ${orderData.BillNo} already exists.`,
//         });
//       }
//       res.status(500).send({ message: err.message || "Error creating order." });
//     } else {
//       res.status(201).send(data);
//     }
//   });
// };

// // --- Get a single order by BillNo ---
// exports.getOrderByBillNo = (req, res) => {
//   const billNo = req.params.billNo;

//   Order.findByBillNo(billNo, (err, data) => {
//     if (err) {
//       res.status(500).send({ message: err.message });
//     } else if (data) {
//       res.status(200).send(data);
//     } else {
//       res
//         .status(404)
//         .send({ message: `Order not found with BillNo ${billNo}.` });
//     }
//   });
// };

// // --- Get all orders ---
// exports.getAllOrders = (req, res) => {
//   Order.findAll((err, data) => {
//     if (err) {
//       res
//         .status(500)
//         .send({ message: err.message || "Error retrieving orders." });
//     } else {
//       res.status(200).send(data);
//     }
//   });
// };

// // --- Update an order by BillNo ---
// exports.updateOrder = (req, res) => {
//   const billNo = req.params.billNo;
//   const orderData = req.body;

//   Order.update(billNo, orderData, (err, data) => {
//     if (err) {
//       res.status(500).send({ message: err.message });
//     } else if (data.changes === 0) {
//       res
//         .status(404)
//         .send({ message: `Order not found with BillNo ${billNo}.` });
//     } else {
//       res.status(200).send({ message: "Order updated successfully." });
//     }
//   });
// };

// // --- Delete an order by BillNo ---
// exports.deleteOrder = (req, res) => {
//   const billNo = req.params.billNo;

//   Order.remove(billNo, (err, data) => {
//     if (err) {
//       res.status(500).send({ message: err.message });
//     } else if (data.changes === 0) {
//       res
//         .status(404)
//         .send({ message: `Order not found with BillNo ${billNo}.` });
//     } else {
//       res.status(200).send({ message: "Order deleted successfully." });
//     }
//   });
// };

const Order = require("../models/order.model.js");

// Create and Save a new Order
exports.createOrder = (req, res) => {
  const orderData = req.body;

  // --- Generate a unique BillNo on the backend ---
  orderData.BillNo = `B-${Date.now()}`;

  // Basic validation
  if (!orderData.CustomerName) {
    return res.status(400).send({ message: "CustomerName is required." });
  }

  Order.create(orderData, (err, data) => {
    if (err) {
      res.status(500).send({
        message: err.message || "Error creating the order.",
      });
    } else {
      // Send back the new order data, including the BillNo
      res.status(201).send(data);
    }
  });
};

// Retrieve all Orders
exports.getAllOrders = (req, res) => {
  Order.findAll((err, data) => {
    if (err) {
      res.status(500).send({
        message: err.message || "Error retrieving orders.",
      });
    } else {
      res.send(data);
    }
  });
};

// Find a single Order by BillNo
exports.getOrderByBillNo = (req, res) => {
  Order.findByBillNo(req.params.billNo, (err, data) => {
    if (err) {
      res.status(500).send({ message: "Error retrieving order." });
    } else if (!data) {
      res.status(404).send({ message: "Order not found." });
    } else {
      res.send(data);
    }
  });
};

// Update an Order by BillNo
exports.updateOrder = (req, res) => {
  const billNo = req.params.billNo;
  const orderData = req.body;

  Order.update(billNo, orderData, (err, data) => {
    if (err) {
      if (err.kind === "not_found") {
        res.status(44).send({
          message: `Order not found with BillNo ${billNo}.`,
        });
      } else {
        res.status(500).send({
          message: "Error updating order with BillNo " + billNo,
        });
      }
    } else {
      res.send(data);
    }
  });
};

// Delete an Order by BillNo
exports.deleteOrder = (req, res) => {
  Order.delete(req.params.billNo, (err, data) => {
    if (err) {
      if (err.kind === "not_found") {
        res.status(404).send({
          message: `Order not found with BillNo ${req.params.billNo}.`,
        });
      } else {
        res.status(500).send({
          message: "Could not delete order with BillNo " + req.params.billNo,
        });
      }
    } else {
      res.send(data);
    }
  });
};
