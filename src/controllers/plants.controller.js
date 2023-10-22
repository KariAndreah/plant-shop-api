const client = require("../db");

// GET '/plants'
const getAll = (req, res) => {
  client.query(`Select * from plants`, (err, result) => {
    if (!err) {
      res.send(result.rows);
    } else {
      console.log(err.message);
      res.status(500).send({
        message: "Error retrieving plants",
      });
    }
    client.end;
  });
};

// GET user by Id '/plants/:id'
const getById = (req, res) => {
  const id = parseInt(req.params.id);
  client.query(`SELECT * FROM plants WHERE id = ${id}`, (err, result) => {
    if (!err) {
      res.send(result.rows);
    } else {
      console.log(err.message);
      res.status(500).send({
        message: "Error retrieving plant with id =" + id,
      });
    }
    client.end;
  });
};

// POST order 'plants/:id/purchase'
const createNewOrder = (req, res) => {
  const id = parseInt(req.params.id);

  const { purchaser_name, purchaser_address, purchase_quantity } = req.body;

  // Check for name
  if (!req.body.purchaser_name) {
    res.status(400).send({
      message: "Name can't be empty",
    });
  }

  // Check for Address
  if (!req.body.purchaser_address) {
    res.status(400).send({
      message: "Address can't be empty",
    });
  }

  // Check for Quantity
  if (!req.body.purchase_quantity) {
    res.status(400).send({
      message: "Quantity can't be empty",
    });
  }

  // Checking if there is enough inventory and updating old inventory in plants table
  const checkInventory = () =>
    client.query(
      `SELECT inventory FROM plants WHERE id = ${id}`,
      (err, result) => {
        if (!err) {
          console.log("KARI -------", res.rows);
          // res.send(result.rows[0]);
          let realInventory = result.rows[0].inventory;
          // console.log("THIS IS THE REAL INVENTORY", realInventory);
          if (purchase_quantity <= realInventory) {
            const newInventory = realInventory - purchase_quantity;
            // res.send("There's enough inventory" + newInventory);
            client.query(
              `UPDATE plants SET inventory=${newInventory} where id=${id}`,
              (err, result) => {
                if (!err) {
                  // console.log("KARI -------", res.rows);
                  // res.send("Inventory succesfully updated " + realInventory);
                  console.log("Inventory succesfully updated " + realInventory);
                } else {
                  console.log(err.message);
                  res.status(500).send({
                    message: "Error retrieving plant with id =" + id,
                  });
                }
                client.end;
              }
            );
          } else {
            res.status(500).send({
              message: "Not enough inventory",
            });
          }
        } else {
          console.log(err.message);
          res.status(500).send({
            message: "Failed to check inventory",
          });
        }
        client.end;
      }
    );

  // Get random orders numbers
  function getRandomInt(max) {
    return Math.floor(Math.random() * max);
  }
  let orderNumber = getRandomInt(2000);

  // Updating orders table with new info
  const updatingOrders = () => {
    client.query(
      ` INSERT INTO orders(sale_price, purchase_quantity, plant_id, purchaser_address, purchaser_name, order_number) 
        SELECT plants.price*${purchase_quantity}, ${purchase_quantity}, ${id}, '${purchaser_address}', '${purchaser_name}', ${orderNumber}
        FROM plants WHERE plants.id = ${id}`,
      (err, result) => {
        if (!err) {
          // res.send("Order: " + orderNumber + " Placed By:  " + purchaser_name);
          // res.send(result.rows);
        } else {
          console.log(err.message);
          res.status(500).send({
            message: "Unable to place order",
          });
        }
        client.end;
      }
    );
  };

  // Showing response
  const showingRespons = () => {
    client.query(
      ` SELECT  plants.name, orders.sale_price, orders.order_number, orders.purchaser_name
        FROM plants 
        INNER JOIN orders
        ON plants.id = orders.plant_id
        WHERE orders.order_number = ${orderNumber}`,
      (err, result) => {
        if (!err) {
          // res.send("Order: " + orderNumber + " Placed By:  " + purchaser_name);
          res.send(result.rows);
        } else {
          console.log(err.message);
          res.status(500).send({
            message: "Unable to place order",
          });
        }
        client.end;
      }
    );
  };

  // Invertory check, updating orders, and formatting response
  checkInventory();
  updatingOrders();
  showingRespons();
};

// Get all Orders
const getAllOrders = (req, res) => {
  client.query(`Select * from orders`, (err, result) => {
    if (!err) {
      res.send(result.rows);
    } else {
      console.log(err.message);
      res.status(500).send({
        message: "Error finding orders",
      });
    }
    client.end;
  });
};

// GET Orders by Id '/orders/:id'
const getAllOrdersById = (req, res) => {
  const id = parseInt(req.params.id);
  client.query(
    `SELECT * FROM orders WHERE order_number = ${id}`,
    (err, result) => {
      if (!err) {
        res.status(200);
        res.send(result.rows);
      } else {
        console.log(err.message);
        res.status(500).send({
          message: "Error finding order by: " + id,
        });
      }
      client.end;
    }
  );
};

module.exports = {
  getById,
  getAll,
  createNewOrder,
  getAllOrders,
  getAllOrdersById,
};
