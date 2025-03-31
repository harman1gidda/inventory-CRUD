const express = require("express");
const app = express();
const port = 8081;

const knex = require("knex")(require("./knexfile.js")["development"]);

// require knex pull the library, and the excuses the function that require specific knexfile.js
// development indicates which specific client to use within knexfile.js

const cors = require("cors");
app.use(cors());
app.use(express.json());

app.get("/", (req, res) => {
  res.send("application is up and running");
});

app.listen(port, () => {
  console.log(
    `Your Knex and Express applications are running succesfully at port: ${port}`
  );
});

//----get----//
app.get("/sites", (req, res) => {
  knex("sites")
    .select("*")
    .then((data) => {
      res.json(data);
    });
});

app.get("/inventory", (req, res) => {
  knex("inventory")
    .select("*")
    .then((data) => {
      res.json(data);
    });
});

app.get("/inventory/:id", (req, res) => {
  let getId = req.params.id;
  knex("inventory")
    .select("*")
    .where({ id: parseInt(getId) })
    .then((data) => {
      res.json(data);
    });
});

//---post----//
app.post("/sites", (req, res) => {
  const { id, name } = req.body;

  knex("sites")
    .insert({ id, name })
    .then(function () {
      res.json({ succeess: true, message: "ok" });
    });
});

app.post("/inventory", (req, res) => {
  const { id, part_name, site_id, description, quantity, last_updated } =
    req.body;

  knex("inventory")
    .insert({ id, part_name, site_id, description, quantity, last_updated })
    .then(function () {
      res.json({ succeess: true, message: "ok" });
    });
});

//---patch----//
app.patch("/sites/:id", (req, res) => {
  let getId = req.params.id;
  const { name } = req.body;

  knex("sites")
    .where({ id: getId })
    .update({ name })
    .then(function () {
      res.json({ success: true, message: "ok" });
    })
    .catch((err) => {
      res.json(err);
    });
});

app.patch("/inventory", (req, res) => {
  let getId = req.params.id;
  const { part_name, site_id, description, quantity, last_updated } = req.body;

  knex("inventory")
    .where({ id: getId })
    .update({ part_name, site_id, description, quantity, last_updated })
    .then(function () {
      res.json({ success: true, message: "ok" });
    })
    .catch((err) => {
      res.json(err);
    });
});

//---delete----//
app.delete("/sites/:id", (req, res) => {
  let getId = req.params.id;
  knex("sites")
    .where({ id: getId })
    .del()
    .then(function () {
      res.json({ succeess: true, message: "ok" });
    });
});

app.delete("/inventory/:id", (req, res) => {
  let getId = req.params.id;
  knex("sites")
    .where({ id: getId })
    .del()
    .then(function () {
      res.json({ succeess: true, message: "ok" });
    });
});

//---------------------------------JOIN------------------------------
app.get("/joined", (req, res) => {
  knex("sites")
    .join("inventory", "site_id", "=", "sites.id")
    .then((data) => res.json(data));
});

module.exports = app;
