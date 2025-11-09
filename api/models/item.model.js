// // const db = require("../database/database.js");

// // // This single model will handle both 'gent_items' and 'ladies_items'
// // const Item = {};

// // // Helper function to validate table name
// // const getValidTable = (type) => {
// //   if (type === "gents") return "gent_items";
// //   if (type === "ladies") return "ladies_items";
// //   return null;
// // };

// // Item.create = (type, itemData, callback) => {
// //   const table = getValidTable(type);
// //   if (!table) return callback(new Error("Invalid item type"));

// //   const sql = `INSERT INTO ${table} (
// //     Items, WashAndDry, After5Days, After3Days, AfterOneDay, Express, Ironing, PressNormal, PressExpress
// //   ) VALUES (?, ?, ?, ?, ?, ?, ?, ?, ?)`;

// //   const params = [
// //     itemData.Items,
// //     itemData.WashAndDry,
// //     itemData.After5Days,
// //     itemData.After3Days,
// //     itemData.AfterOneDay,
// //     itemData.Express,
// //     itemData.Ironing,
// //     itemData.PressNormal,
// //     itemData.PressExpress,
// //   ];

// //   db.run(sql, params, function (err) {
// //     callback(err, { id: this.lastID });
// //   });
// // };

// // Item.findAll = (type, callback) => {
// //   const table = getValidTable(type);
// //   if (!table) return callback(new Error("Invalid item type"));

// //   const sql = `SELECT * FROM ${table}`;
// //   db.all(sql, [], (err, rows) => {
// //     callback(err, rows);
// //   });
// // };

// // Item.findById = (type, id, callback) => {
// //   const table = getValidTable(type);
// //   if (!table) return callback(new Error("Invalid item type"));

// //   const sql = `SELECT * FROM ${table} WHERE id = ?`;
// //   db.get(sql, [id], (err, row) => {
// //     callback(err, row);
// //   });
// // };

// // Item.update = (type, id, itemData, callback) => {
// //   const table = getValidTable(type);
// //   if (!table) return callback(new Error("Invalid item type"));

// //   const sql = `UPDATE ${table} SET
// //     Items = ?,
// //     WashAndDry = ?,
// //     After5Days = ?,
// //     After3Days = ?,
// //     AfterOneDay = ?,
// //     Express = ?,
// //     Ironing = ?,
// //     PressNormal = ?,
// //     PressExpress = ?
// //   WHERE id = ?`;

// //   const params = [
// //     itemData.Items,
// //     itemData.WashAndDry,
// //     itemData.After5Days,
// //     itemData.After3Days,
// //     itemData.AfterOneDay,
// //     itemData.Express,
// //     itemData.Ironing,
// //     itemData.PressNormal,
// //     itemData.PressExpress,
// //     id,
// //   ];

// //   db.run(sql, params, function (err) {
// //     callback(err, { changes: this.changes });
// //   });
// // };

// // Item.remove = (type, id, callback) => {
// //   const table = getValidTable(type);
// //   if (!table) return callback(new Error("Invalid item type"));

// //   const sql = `DELETE FROM ${table} WHERE id = ?`;
// //   db.run(sql, [id], function (err) {
// //     callback(err, { changes: this.changes });
// //   });
// // };

// // module.exports = Item;

// const db = require("../database/database.js");

// // Helper function to get the correct table name
// const getTable = (type) => {
//   return type && type.toLowerCase() === "ladies"
//     ? "ladies_items"
//     : "gent_items";
// };

// // Create a new item with all its prices
// exports.create = (type, itemData, result) => {
//   const table = getTable(type);
//   const sql = `INSERT INTO ${table} (
//     Items, WashAndDry, Ironing, DryExpress
//     After5Days, After3Days, AfterOneDay, PressingExpress, PressingNormal
//   ) VALUES (?, ?, ?, ?, ?, ?, ?, ?, ?)`;

//   const params = [
//     itemData.Items,
//     itemData.WashAndDry,
//     itemData.Ironing,
//     itemData.DryExpress,
//     itemData.After5Days,
//     itemData.After3Days,
//     itemData.AfterOneDay,
//     itemData.PressingExpress,
//     itemData.PressingNormal,
//   ];

//   db.run(sql, params, function (err) {
//     if (err) {
//       console.error("Error creating item:", err.message);
//       result(err, null);
//       return;
//     }
//     result(null, { id: this.lastID, ...itemData });
//   });
// };

// // Find all items
// exports.findAll = (type, result) => {
//   const table = getTable(type);
//   db.all(`SELECT * FROM ${table}`, [], (err, rows) => {
//     if (err) {
//       console.error("Error finding items:", err.message);
//       result(err, null);
//       return;
//     }
//     result(null, rows);
//   });
// };

// // Update an item's prices by its ID
// exports.update = (type, id, itemData, result) => {
//   const table = getTable(type);
//   const sql = `UPDATE ${table} SET
//     Items = ?,
//     WashAndDry = ?,
//     Ironing = ?,
//     DryExpress = ?,
//     After5Days = ?,
//     After3Days = ?,
//     AfterOneDay = ?,
//     PressingExpress = ?,
//     PressingNormal = ?
//   WHERE id = ?`;

//   const params = [
//     itemData.Items,
//     itemData.WashAndDry,
//     itemData.Ironing,
//     itemData.DryExpress,
//     itemData.After5Days,
//     itemData.After3Days,
//     itemData.AfterOneDay,
//     itemData.PressingExpress,
//     itemData.PressingNormal,
//     id,
//   ];

//   db.run(sql, params, function (err) {
//     if (err) {
//       console.error("Error updating item:", err.message);
//       result(err, null);
//       return;
//     }
//     if (this.changes === 0) {
//       // No rows were updated (item not found)
//       result({ kind: "not_found" }, null);
//       return;
//     }
//     result(null, { id: id, ...itemData });
//   });
// };

// // Delete an item
// exports.remove = (type, id, result) => {
//   const table = getTable(type);
//   const sql = `DELETE FROM ${table} WHERE id = ?`;

//   db.run(sql, [id], function (err) {
//     if (err) {
//       console.error("Error deleting item:", err.message);
//       result(err, null);
//       return;
//     }
//     if (this.changes === 0) {
//       // No rows were deleted (item not found)
//       result({ kind: "not_found" }, null);
//       return;
//     }
//     result(null, { message: "Item deleted successfully" });
//   });
// };

// module.exports = exports; // Use module.exports = exports
const db = require("../database/database.js");

// Helper function to get the correct table name
const getTable = (type) => {
  return type && type.toLowerCase() === "ladies"
    ? "ladies_items"
    : "gent_items";
};

// Create a new item with all its prices
exports.create = (type, itemData, result) => {
  const table = getTable(type);

  // --- FIX ---
  // Added a comma after 'DryExpress'
  const sql = `INSERT INTO ${table} (
    Items, WashAndDry, Ironing, DryExpress, 
    After5Days, After3Days, AfterOneDay, PressingExpress, PressingNormal
  ) VALUES (?, ?, ?, ?, ?, ?, ?, ?, ?)`;
  // --- END OF FIX ---

  const params = [
    itemData.Items,
    itemData.WashAndDry,
    itemData.Ironing,
    itemData.DryExpress,
    itemData.After5Days,
    itemData.After3Days,
    itemData.AfterOneDay,
    itemData.PressingExpress,
    itemData.PressingNormal,
  ];

  db.run(sql, params, function (err) {
    if (err) {
      console.error("Error creating item:", err.message);
      result(err, null);
      return;
    }
    result(null, { id: this.lastID, ...itemData });
  });
};

// Find all items
exports.findAll = (type, result) => {
  const table = getTable(type);
  db.all(`SELECT * FROM ${table}`, [], (err, rows) => {
    if (err) {
      console.error("Error finding items:", err.message);
      result(err, null);
      return;
    }
    result(null, rows);
  });
};

// Update an item's prices by its ID
exports.update = (type, id, itemData, result) => {
  const table = getTable(type);
  const sql = `UPDATE ${table} SET 
    Items = ?,
    WashAndDry = ?,
    Ironing = ?,
    DryExpress = ?,
    After5Days = ?,
    After3Days = ?,
    AfterOneDay = ?,
    PressingExpress = ?,
    PressingNormal = ?
  WHERE id = ?`;

  const params = [
    itemData.Items,
    itemData.WashAndDry,
    itemData.Ironing,
    itemData.DryExpress,
    itemData.After5Days,
    itemData.After3Days,
    itemData.AfterOneDay,
    itemData.PressingExpress,
    itemData.PressingNormal,
    id,
  ];

  db.run(sql, params, function (err) {
    if (err) {
      console.error("Error updating item:", err.message);
      result(err, null);
      return;
    }
    if (this.changes === 0) {
      // No rows were updated (item not found)
      result({ kind: "not_found" }, null);
      return;
    }
    result(null, { id: id, ...itemData });
  });
};

// Delete an item
exports.remove = (type, id, result) => {
  const table = getTable(type);
  const sql = `DELETE FROM ${table} WHERE id = ?`;

  db.run(sql, [id], function (err) {
    if (err) {
      console.error("Error deleting item:", err.message);
      result(err, null);
      return;
    }
    if (this.changes === 0) {
      // No rows were deleted (item not found)
      result({ kind: "not_found" }, null);
      return;
    }
    result(null, { message: "Item deleted successfully" });
  });
};

module.exports = exports; // Use module.exports = exports
