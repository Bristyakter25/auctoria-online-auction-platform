require("dotenv").config();
var jwt = require("jsonwebtoken");
const express = require("express");
const cors = require("cors");
const port = process.env.PORT || 5000;
const app = express();
const http = require("http");
const socketIo = require("socket.io");
const { Server } = require("socket.io");
const server = http.createServer(app);
const allowedOrigins = [
  "http://localhost:5173",
  "https://bidapp-81c51.web.app",
];
app.use(
  cors({
    origin: allowedOrigins,
    methods: ["GET", "POST", "PUT", "PATCH", "DELETE"],
    allowedHeaders: ["Content-Type", "Authorization"],
  })
);
const io = new Server(server, {
  cors: {
    origin: allowedOrigins,
    methods: ["GET", "POST"],
    transports: ["websocket", "polling"],
    credentials: true,
  },
});
app.use(express.json());

io.on("connection", (socket) => {
  console.log("A user connected", socket.id);
  // // ইউজার আইডি রেজিস্টার করা
  // socket.on("register", (userId) => {
  //   users[userId] = socket.id;
  // });
  socket.on("disconnect", () => {
    console.log("User disconnected");
  });
  socket.on("connect_error", (error) => {
    console.error("❌ Connection Error:", error);
  });

  socket.on("disconnect", (reason) => {
    console.warn("⚠️ Disconnected:", reason);
  });
});

const { MongoClient, ServerApiVersion, ObjectId } = require("mongodb");

// console.log("DB_PASS:", process.env.DB_PASS);
const uri = `mongodb+srv://auctoria:${process.env.DB_PASS}@cluster0.t199j.mongodb.net/?retryWrites=true&w=majority&appName=Cluster0`;
// Create a MongoClient with a MongoClientOptions object to set the Stable API version
const client = new MongoClient(uri, {
  serverApi: {
    version: ServerApiVersion.v1,
    strict: true,
    deprecationErrors: true,
  },
});

async function run() {
  try {
    // Connect the client to the server	(optional starting in v4.7)
    // await client.connect();
    // Send a ping to confirm a successful connection
    // await client.db("admin").command({ ping: 1 });
    // console.log(
    //   "Pinged your deployment. You successfully connected to new MongoDB!"
    // );

    const productsCollection = client.db("Auctoria").collection("addProducts");
    const bidHistroyCollection = client.db("Auctoria").collection("bids");
    const notificationsCollection = client
      .db("Auctoria")
      .collection("notifications");

    //jwt apis rumman's code starts here
    app.post("/jwt", async (req, res) => {
      const user = req.body;
      const token = jwt.sign(user, process.env.JWT_ACCESS_TOKEN, {
        expiresIn: "5h",
      });
      res.send({ token });
    });
    //middleware
    const verifyToken = (req, res, next) => {
      // console.log("insideVeriyFy", req.headers.authorization);
      if (!req.headers.authorization) {
        return res.status(401).send({ message: "forbidden access" });
      }
      const token = req.headers.authorization.split(" ")[1];
      jwt.verify(token, process.env.JWT_ACCESS_TOKEN, (err, decoded) => {
        if (err) {
          return res.status(401).send({ message: "forbidden access" });
        }
        req.decoded = decoded;
        next();
      });
    };

    app.get("/users", async (req, res) => {
      try {
        const users = await usersCollection.find().toArray();
        res.status(200).json(users);
      } catch (error) {
        res.status(500).json({ message: "Error fetching users", error });
      }
    });

    app.get("/addProducts", async (req, res) => {
      const cursor = productsCollection.find();
      const result = await cursor.toArray();
      res.send(result);
    });
    app.get("/addProducts/:id", async (req, res) => {
      const { id } = req.params;
      const product = await productsCollection.findOne({
        _id: new ObjectId(id),
      });
      if (!product) {
        return res.status(404).json({ message: "Product not found" });
      }

      res.json(product);
    });

    app.get("/recentProducts", async (req, res) => {
      try {
        const cursor = productsCollection.find().sort({ _id: -1 }).limit(4);
        const result = await cursor.toArray();
        res.send(result);
      } catch (error) {
        console.error(error);
        res.status(500).send({ error: "Failed to fetch recent blogs" });
      }
    });

    app.get("/featuredProducts", async (req, res) => {
      try {
        const cursor = productsCollection.aggregate([
          { $match: { status: "Active" } },
          { $addFields: { startingBidNum: { $toDouble: "$startingBid" } } },
          { $sort: { startingBidNum: -1 } },
        ]);

        const result = await cursor.toArray();
        res.send(result);
      } catch (error) {
        console.error(error);
        res.status(500).send({ error: "Failed to fetch featured products" });
      }
    });

    app.post("/addProducts", async (req, res) => {
      const productData = req.body;
      try {
        if (!productData) {
          return res.status(400).json({ message: "Missing fields" });
        }
        if (productData.auctionStartDate) {
          const startTime = new Date(productData.auctionStartDate);

          const auctionEndTime = new Date(startTime);
          auctionEndTime.setDate(auctionEndTime.getDate() + 7);

          productData.auctionEndTime = auctionEndTime.toISOString();
        }

        const result = await productsCollection.insertOne(productData);
        const notification = {
          userId: "all",
          message: `New product listed: ${productData.productName}`,
          createdAt: new Date(),
          read: false,
        };
        await notificationsCollection.insertOne(notification);
        io.emit("notification_all", notification);
        res.status(200).json(result);
      } catch (err) {
        res.status(500).json({ message: "Error adding product", error: err });
      }
    });

    // app.post("/addProducts", async (req, res) => {
    //   const productData = req.body;
    //   try {
    //     if (productData.auctionStartDate) {
    //       const startTime = new Date(productData.auctionStartDate);
    //       // Add 7 days (or your desired duration) to startTime for endTime
    //       const auctionEndTime = new Date(startTime);
    //       auctionEndTime.setDate(auctionEndTime.getDate() + 7); // Adding 7 days
    //       // Update productData with calculated endTime
    //       productData.auctionEndTime = auctionEndTime.toISOString(); // Convert to string format
    //     }
    //     // Insert the updated product data into MongoDB
    //     const result = await productsCollection.insertOne(productData);
    //     res.status(200).json(result);
    //   } catch (err) {
    //     res.status(500).json({ message: "Error adding product", error: err });
    //   }
    // });

    app.post("/users", async (req, res) => {
      try {
        const { name, email, photoURL, uid } = req.body;

        // Check if the user already exists
        const existingUser = await usersCollection.findOne({ email });
        if (existingUser) {
          return res.status(400).json({ message: "User already exists" });
        }

        // Save the new user
        const newUser = { name, email, photoURL, uid, createdAt: new Date() };
        const result = await usersCollection.insertOne(newUser);

        res
          .status(201)
          .json({ message: "User registered successfully", user: result });
      } catch (error) {
        res.status(500).json({ message: "Server error", error });
      }
    });

    app.get("/bidProduct/:id", async (req, res) => {
      const id = req.params.id;
      if (!ObjectId.isValid(id)) {
        return res.status(400).send("Invalid ObjectId format");
      }
      const query = { _id: new ObjectId(id) };
      // console.log("product id", query);
      const product = await productsCollection.findOne(query);
      res.send(product);
    });

    // app.post("/bids/:id", async (req, res) => {
    //   const bidData = req.body;
    //   try {
    //     const result = await bidHistroyCollection.insertOne(bidData);
    //     res.send(result);
    //   } catch (err) {
    //     res.status(500).json({ message: "Error adding bid", error: err });
    //   }
    // });

    // app.post("/bid/:id", async (req, res) => {
    //   const { id } = req.params;
    //   const { amount, user } = req.body;
    //   try {
    //     if (!ObjectId.isValid(id)) {
    //       return res.status(400).send({ error: "Invalid product ID format" });
    //     }
    //     const objectId = new ObjectId(id);
    //     const result = await productsCollection.updateOne(
    //       { _id: objectId },
    //       { $push: { bids: { amount, user, time: new Date() } } }
    //     );
    //     io.emit("newBid", { id, amount, user });
    //     res.send(result);
    //   } catch (error) {
    //     res.status(500).send({ error: "Failed to place bid" });
    //   }
    // });

    app.post("/bid/:id", async (req, res) => {
      const { id } = req.params;
      const { amount, user, sellerId, productName } = req.body;
      try {
        if (!ObjectId.isValid(id)) {
          return res.status(400).send({ error: "Invalid product ID format" });
        }
        const objectId = new ObjectId(id);

        const result = await productsCollection.updateOne(
          { _id: objectId },
          { $push: { bids: { amount, user, time: new Date() } } }
        );

        // সেলারকে নোটিফিকেশন পাঠানো
        const notification = {
          userId: sellerId,
          message: `${user.name} placed a bid of $${amount} on your product: ${productName}`,
          createdAt: new Date(),
          read: false,
        };

        await notificationsCollection.insertOne(notification);
        io.emit(`notification_${sellerId}`, notification);

        io.emit("newBid", { id, amount, user });
        res.send(result);
      } catch (error) {
        res.status(500).send({ error: "Failed to place bid" });
      }
    });
  } finally {
    // Ensures that the client will close when you finish/error
    // await client.close();
  }
}
run().catch(console.dir);

app.get("/", async (req, res) => {
  res.send("Auctoria is Waiting for an exclusive bid");
});
server.listen(port, () => {
  console.log(`server is running on port: ${port}`);
});
