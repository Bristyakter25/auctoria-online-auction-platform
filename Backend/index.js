require("dotenv").config();
const express = require("express");
const cors = require("cors");
const http = require("http");
const { Server } = require("socket.io");
const { MongoClient, ServerApiVersion, ObjectId } = require("mongodb");
const jwt = require("jsonwebtoken");

const app = express();
const port = process.env.PORT || 5000;
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
app.use(express.json());

const io = new Server(server, {
  cors: {
    origin: allowedOrigins,
    methods: ["GET", "POST"],
    transports: ["websocket", "polling"],
    credentials: true,
  },
});

io.on("connection", (socket) => {
  console.log("A user connected:", socket.id);

  socket.on("disconnect", (reason) => {
    console.warn("User disconnected:", reason);
  });

  socket.on("connect_error", (error) => {
    console.error("❌ Connection Error:", error);
  });
});

const uri = `mongodb+srv://auctoria:${process.env.DB_PASS}@cluster0.t199j.mongodb.net/?retryWrites=true&w=majority&appName=Cluster0`;
const client = new MongoClient(uri, {
  serverApi: { version: ServerApiVersion.v1, strict: true, deprecationErrors: true },
});

async function run() {
  try {
    console.log("Pinged your deployment. You successfully connected to MongoDB!");

    const db = client.db("Auctoria");
    const productsCollection = db.collection("addProducts");
    const usersCollection = db.collection("users");

    // 🛠 Add Product API
    app.post("/addProducts", async (req, res) => {
      const productData = req.body;
      try {
        if (productData.auctionStartDate) {
          const startTime = new Date(productData.auctionStartDate);
          startTime.setDate(startTime.getDate() + 7);
          productData.auctionEndTime = startTime.toISOString();
        }
        const result = await productsCollection.insertOne(productData);
        res.status(201).json({ message: "Product added successfully", result });
      } catch (err) {
        res.status(500).json({ message: "Error adding product", error: err });
      }
    });

    // 🛠 Get All Products
    app.get("/addProducts", async (req, res) => {
      const result = await productsCollection.find().toArray();
      res.json(result);
    });

    // 🛠 Get Single Product by ID
    app.get("/addProducts/:id", async (req, res) => {
      const { id } = req.params;
      try {
        const product = await productsCollection.findOne({ _id: new ObjectId(id) });
        if (!product) return res.status(404).json({ message: "Product not found" });
        res.json(product);
      } catch (error) {
        res.status(500).json({ error: "Invalid product ID" });
      }
    });

    // 🛠 Get Featured Products
    app.get("/featuredProducts", async (req, res) => {
      try {
        const result = await productsCollection.find({ status: "Active" }).sort({ startingBid: -1 }).toArray();
        res.json(result);
      } catch (error) {
        res.status(500).json({ error: "Failed to fetch featured products" });
      }
    });

    // 🛠 Get User Wishlist
    const { ObjectId } = require("mongodb"); // Ensure ObjectId is imported from MongoDB

app.get("/wishlist/:userId", async (req, res) => {
  const { userId } = req.params;
  try {
    const user = await usersCollection.findOne({ uid: userId });
    if (!user) return res.status(404).json({ message: "User not found" });

    if (!user.wishlist || user.wishlist.length === 0) {
      return res.json({ message: "Wishlist is empty", wishlist: [] });
    }

    // Convert wishlist IDs to ObjectId for the query
    const wishListedProducts = await productsCollection.find({
      _id: { $in: user.wishlist.map(id => new ObjectId(id)) },
    }).toArray();
    
    res.json({ wishlist: wishListedProducts });
  } catch (error) {
    res.status(500).json({ message: "Server error" });
  }
});


    // 🛠 Add to Wishlist
    app.post("/addToWishlist", async (req, res) => {
      const { productId, userId } = req.body;
      try {
        const user = await usersCollection.findOne({ uid: userId });
        if (!user) return res.status(404).json({ message: "User not found" });
    
        // Ensure wishlist is initialized as an empty array if it doesn't exist
        const wishlist = user.wishlist || [];
    
        const productObjectId = new ObjectId(productId);
    
        // Check if the product is already in the wishlist
        if (wishlist.includes(productObjectId.toString())) {
          return res.status(400).json({ message: "Product is already in your wishlist" });
        }
    
        // Add to wishlist only if it's not already there
        const result = await usersCollection.updateOne(
          { uid: userId },
          { $addToSet: { wishlist: productObjectId } } // Ensures unique addition
        );
    
        if (result.modifiedCount > 0) {
          res.json({ message: "Product added to wishlist" });
        } else {
          res.status(400).json({ message: "Failed to add to wishlist" });
        }
      } catch (error) {
        console.error("Error in adding to wishlist:", error);
        res.status(500).json({ message: "Server error", error: error.message });
      }
    });
    
    
    

    // 🛠 JWT Authentication
    app.post("/jwt", async (req, res) => {
      const user = req.body;
      const token = jwt.sign(user, process.env.JWT_ACCESS_TOKEN, { expiresIn: "5h" });
      res.send({ token });
    });

    const verifyToken = (req, res, next) => {
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

    // 🛠 Get All Users
    app.get("/users", async (req, res) => {
      try {
        const users = await usersCollection.find().toArray();
        res.json(users);
      } catch (error) {
        res.status(500).json({ message: "Error fetching users", error });
      }
    });

    // 🛠 Register a New User
    app.post("/users", async (req, res) => {
      try {
        const { name, email, photoURL, uid } = req.body;
        const existingUser = await usersCollection.findOne({ email });
        if (existingUser) {
          return res.status(400).json({ message: "User already exists" });
        }
        const newUser = { name, email, photoURL, uid, createdAt: new Date() };
        const result = await usersCollection.insertOne(newUser);
        res.status(201).json({ message: "User registered successfully", user: result });
      } catch (error) {
        res.status(500).json({ message: "Server error" });
      }
    });

  } finally {
    // Ensures that the client will close when you finish/error
    // await client.close();
  }
}

run().catch(console.dir);

app.get("/", (req, res) => {
  res.send("Auctoria is waiting for an exclusive bid!");
});

// 🛠 Start the Server
server.listen(port, () => {
  console.log(`Server is running on port: ${port}`);
});
