// const Item = require("../models/item.model.js");

// // --- Helper to get item type from URL ---
// // The URL will be e.g., /api/items/gents or /api/items/ladies
// const getItemType = (req) => {
//   return req.params.type; // 'gents' or 'ladies'
// };

// // --- Create new item ---
// exports.createItem = (req, res) => {
//   const type = getItemType(req);
//   const itemData = req.body;

//   Item.create(type, itemData, (err, data) => {
//     if (err) {
//       res.status(500).send({ message: err.message || "Error creating item." });
//     } else {
//       res.status(201).send(data);
//     }
//   });
// };

// // --- Get all items for a type ---
// exports.getItems = (req, res) => {
//   const type = getItemType(req);

//   Item.findAll(type, (err, data) => {
//     if (err) {
//       res
//         .status(500)
//         .send({ message: err.message || "Error retrieving items." });
//     } else {
//       res.status(200).send(data);
//     }
//   });
// };

// // --- Get a single item by ID ---
// exports.getOneItem = (req, res) => {
//   const type = getItemType(req);
//   const id = req.params.id;

//   Item.findById(type, id, (err, data) => {
//     if (err) {
//       res.status(500).send({ message: err.message });
//     } else if (data) {
//       res.status(200).send(data);
//     } else {
//       res.status(404).send({ message: `Item not found with id ${id}.` });
//     }
//   });
// };

// // --- Update an item by ID ---
// exports.updateItem = (req, res) => {
//   const type = getItemType(req);
//   const id = req.params.id;
//   const itemData = req.body;

//   Item.update(type, id, itemData, (err, data) => {
//     if (err) {
//       res.status(500).send({ message: err.message });
//     } else if (data.changes === 0) {
//       res.status(404).send({ message: `Item not found with id ${id}.` });
//     } else {
//       res.status(200).send({ message: "Item updated successfully." });
//     }
//   });
// };

// // --- Delete an item by ID ---
// exports.deleteItem = (req, res) => {
//   const type = getItemType(req);
//   const id = req.params.id;

//   Item.remove(type, id, (err, data) => {
//     if (err) {
//       res.status(500).send({ message: err.message });
//     } else if (data.changes === 0) {
//       res.status(404).send({ message: `Item not found with id ${id}.` });
//     } else {
//       res.status(200).send({ message: "Item deleted successfully." });
//     }
//   });
// };

const Item = require("../models/item.model.js");

// Get the type ('gents' or 'ladies') from the URL
const getType = (req) => req.params.type;

// Create and Save a new Item with all prices
exports.createItem = (req, res) => {
  const type = getType(req);
  const itemData = req.body; // Expects the full object with all 10 columns

  // Validate request
  if (!itemData.Items) {
    return res.status(400).send({ message: "Item name (Items) is required." });
  }

  Item.create(type, itemData, (err, data) => {
    if (err) {
      res.status(500).send({
        message: err.message || "An error occurred while creating the Item.",
      });
    } else {
      res.status(201).send(data);
    }
  });
};

// Retrieve all Items from the database.
exports.getItems = (req, res) => {
  const type = getType(req);
  Item.findAll(type, (err, data) => {
    if (err) {
      res.status(500).send({
        message: err.message || "An error occurred while retrieving items.",
      });
    } else {
      res.send(data);
    }
  });
};

// Update an Item identified by the id in the request
exports.updateItem = (req, res) => {
  const type = getType(req);
  const id = req.params.id;
  const itemData = req.body;

  if (!itemData.Items) {
    return res.status(400).send({ message: "Item name (Items) is required." });
  }

  Item.update(type, id, itemData, (err, data) => {
    if (err) {
      if (err.kind === "not_found") {
        res.status(404).send({
          message: `Item not found with id ${id}.`,
        });
      } else {
        res.status(500).send({
          message: "Error updating Item with id " + id,
        });
      }
    } else {
      res.send({ message: "Item updated successfully!", ...data });
    }
  });
};

// Delete an Item with the specified id in the request
exports.deleteItem = (req, res) => {
  const type = getType(req);
  const id = req.params.id;

  Item.remove(type, id, (err, data) => {
    if (err) {
      if (err.kind === "not_found") {
        res.status(404).send({
          message: `Item not found with id ${id}.`,
        });
      } else {
        res.status(500).send({
          message: "Could not delete Item with id " + id,
        });
      }
    } else {
      res.send({ message: `Item was deleted successfully!` });
    }
  });
};
