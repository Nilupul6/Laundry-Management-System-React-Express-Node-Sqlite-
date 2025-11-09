const sqlite3 = require("sqlite3").verbose();
const bcrypt = require("bcryptjs");

// Connect to or create a database file
const DBSOURCE = "laundry.db";

const db = new sqlite3.Database(DBSOURCE, (err) => {
  if (err) {
    // Cannot open database
    console.error(err.message);
    throw err;
  } else {
    console.log("Connected to the SQLite database.");

    // Use serialize to ensure tables are created in order
    db.serialize(() => {
      // --- Create User Table (for Admin) ---
      db.run(
        `CREATE TABLE IF NOT EXISTS user (
        id INTEGER PRIMARY KEY AUTOINCREMENT,
        username TEXT UNIQUE,
        password TEXT
      )`,
        (err) => {
          if (err) {
            console.error("Error creating user table:", err.message);
          } else {
            // --- Create a default admin user if one doesn't exist ---
            const defaultAdmin = "admin";
            const defaultPass = "admin123";

            db.get(
              "SELECT * FROM user WHERE username = ?",
              [defaultAdmin],
              (err, row) => {
                if (!row) {
                  const hash = bcrypt.hashSync(defaultPass, 10);
                  db.run(
                    "INSERT INTO user (username, password) VALUES (?, ?)",
                    [defaultAdmin, hash],
                    (err) => {
                      if (!err) {
                        console.log(
                          `Default admin user '${defaultAdmin}' with password '${defaultPass}' created.`
                        );
                        console.log(
                          "PLEASE CHANGE THIS PASSWORD IN A REAL APPLICATION!"
                        );
                      }
                    }
                  );
                }
              }
            );
          }
        }
      );

      // --- Create Gentlemen Items Table ---
      db.run(
        `CREATE TABLE IF NOT EXISTS gent_items (
        id INTEGER PRIMARY KEY AUTOINCREMENT,
        Items TEXT,
        WashAndDry REAL,
        After5Days REAL,
        After3Days REAL,
        AfterOneDay REAL,
        DryExpress REAL,
        Ironing REAL,
        PressingExpress REAL,
        PressingNormal REAL
      )`,
        (err) => {
          if (err)
            console.error("Error creating gent_items table:", err.message);
        }
      );

      // --- Create Ladies Items Table ---
      db.run(
        `CREATE TABLE IF NOT EXISTS ladies_items (
        id INTEGER PRIMARY KEY AUTOINCREMENT,
        Items TEXT,
        WashAndDry REAL,
        After5Days REAL,
        After3Days REAL,
        AfterOneDay REAL,
        DryExpress REAL,
        Ironing REAL,
        PressingExpress REAL,
        PressingNormal REAL
      )`,
        (err) => {
          if (err)
            console.error("Error creating ladies_items table:", err.message);
        }
      );

      // --- Create Order Table ---
      // This version includes all fields for delivery
      db.run(
        `CREATE TABLE IF NOT EXISTS orders (
        BillNo TEXT PRIMARY KEY,
        Date TEXT,
        CustomerName TEXT,
        Telephone TEXT,
        Address TEXT,
        ServiceType TEXT,
        DeliveryTime TEXT,
        Items TEXT,
        Advance REAL,
        Balance REAL,
        isDelivered BOOLEAN DEFAULT 0,
        actualDeliveryDate TEXT,
        customerPayment REAL
      )`,
        (err) => {
          if (err) console.error("Error creating orders table:", err.message);
        }
      );
    });
  }
});

module.exports = db;
