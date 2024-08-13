var express = require("express");
var router = express.Router();
const { MongoClient } = require("mongodb");

// MongoDB 连接配置
const mongoUrl = "mongodb://localhost:27017";
const mongoClient = new MongoClient(mongoUrl);
const dbName = "nameList";
const collectionName = "users";

// 中间件,解析 JSON 请求体
router.use(express.json());

/* GET users listing. */
router.get("/", async function (req, res, next) {
  try {
    await mongoClient.connect();
    const db = mongoClient.db(dbName);
    const users = await db.collection(collectionName).find({}).toArray();
    res.json(users);
  } catch (err) {
    console.error(err);
    res.status(500).json({ message: "Internal Server Error" });
  } finally {
    await mongoClient.close();
  }
});

/* POST add user */
router.post("/add", async function (req, res, next) {
  try {
    await mongoClient.connect();
    const db = mongoClient.db(dbName);
    const newUser = req.body;
    const result = await db.collection(collectionName).insertOne(newUser);
    res.status(201).json({ message: "User created", id: result.insertedId });
  } catch (err) {
    console.error(err);
    res.status(500).json({ message: "Internal Server Error" });
  } finally {
    await mongoClient.close();
  }
});

/* POST delete user */
router.post("/delete", async function (req, res, next) {
  try {
    await mongoClient.connect();
    const db = mongoClient.db(dbName);
    const userId = req.body.id;
    console.log('userId', userId);
    const result = await db
      .collection(collectionName)
      .deleteOne({ _id: userId });
    if (result.deletedCount === 1) {
      res.json({ message: "User deleted" });
    } else {
      res.status(404).json({ message: "User not found" });
    }
  } catch (err) {
    console.error(err);
    res.status(500).json({ message: "Internal Server Error" });
  } finally {
    await mongoClient.close();
  }
});

module.exports = router;
