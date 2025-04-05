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

const allowedOrigins = ["http://localhost:5173", "https://bidapp-81c51.web.app"];

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

    // 🛠 Get All Products
    app.get("/addProducts", async (req, res) => {
      try {
        const result = await productsCollection.find().toArray();
        res.json(result);
      } catch (error) {
        res.status(500).json({ message: "Error fetching products", error });
      }
    });

    // 🛠 Get Recent Products (Limited to 4)
    app.get("/recentProducts", async (req, res) => {
      try {
        const result = await productsCollection.find().sort({ _id: -1 }).limit(4).toArray();
        res.json(result);
      } catch (error) {
        res.status(500).json({ error: "Failed to fetch recent products" });
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

    // 🛠 Add Product
    app.post("/addProducts", async (req, res) => {
      const productData = req.body;
      try {
        if (!productData.auctionStartDate) {
          return res.status(400).json({ message: "Auction start date is required" });
        }

        const startTime = new Date(productData.auctionStartDate);
        const auctionEndTime = new Date(startTime);
        auctionEndTime.setDate(auctionEndTime.getDate() + 7);
        productData.auctionEndTime = auctionEndTime.toISOString();

        const result = await productsCollection.insertOne(productData);
        res.status(201).json({ message: "Product added successfully", result });
      } catch (error) {
        res.status(500).json({ message: "Error adding product", error });
      }
    });

    app.post("/bid/:id", async (req, res) => {
      const { id } = req.params;
      const { amount, user } = req.body;
      try {
        if (!ObjectId.isValid(id)) {
          return res.status(400).send({ error: "Invalid product ID format" });
        }
        const objectId = new ObjectId(id);
        const result = await productsCollection.updateOne(
          { _id: objectId },
          { $push: { bids: { amount, user, time: new Date() } } }
        );
        io.emit("newBid", { id, amount, user });
        res.send(result);
      } catch (error) {
        res.status(500).send({ error: "Failed to place bid" });
      }
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

    // 🛠 Get User Wishlist
    // Ensure ObjectId is imported from MongoDB

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

    // lockout feature
    app.post("/login", async (req, res) => {
      const { email, password } = req.body;
      const MAX_FAILED_ATTEMPTS = 3;
      const LOCKOUT_DURATION = 10 * 60 * 1000; // 10 minutes lockout
    
      try {
        const user = await usersCollection.findOne({ email });
    
        if (!user) {
          return res.status(401).json({ message: "Invalid credentials" });
        }
    
        // Check if account is locked
        if (user.isLocked && user.lockoutUntil > Date.now()) {
          const remainingTime = Math.ceil((user.lockoutUntil - Date.now()) / 60000);
          return res.status(403).json({ message: `Account locked. Try again in ${remainingTime} minutes.` });
        }
    
        // Compare hashed password using bcrypt
        const isMatch = await bcrypt.compare(password, user.password);
    
        if (!isMatch) {
          const failedAttempts = (user.failedAttempts || 0) + 1;
          let updateFields = { failedAttempts };
        
          console.log(`Failed attempts for ${email}: ${failedAttempts}`);  // Debugging line
        
          // Lock account after 3 failed attempts
          if (failedAttempts >= MAX_FAILED_ATTEMPTS) {
            updateFields.isLocked = true;
            updateFields.lockoutUntil = Date.now() + LOCKOUT_DURATION;
            console.log(`Account for ${email} locked! Lockout until: ${updateFields.lockoutUntil}`);
          }
        
          await usersCollection.updateOne({ email }, { $set: updateFields });
          return res.status(401).json({
            message: `Invalid credentials. Attempt ${failedAttempts} of ${MAX_FAILED_ATTEMPTS}.`
          });
        }
        
    
        // Reset failed attempts and unlock account if login is successful
        await usersCollection.updateOne(
          { email },
          { $set: { failedAttempts: 0, isLocked: false, lockoutUntil: null } }
        );
    
        res.json({ message: "Login successful" });
    
      } catch (error) {
        console.error("Error in login:", error);
        res.status(500).json({ message: "Server error" });
      }
    });

 app.get("/check-lockout", async (req, res) => {
      const { email } = req.query;
      const user = await db.collection("users").findOne({ email });
    
      if (!user) {
        return res.status(404).json({ message: "User not found" });
      }
    
      // Check if account is locked
      if (user.isLocked && user.lockoutUntil > Date.now()) {
        const remainingTime = Math.ceil((user.lockoutUntil - Date.now()) / 60000);
        return res.json({ isLocked: true, lockoutMinutes: remainingTime });
      }
    
      res.json({ isLocked: false });
    });
    
    
    app.get("/debug-user/:email", async (req, res) => {
      const email = req.params.email;
      try {
          const user = await usersCollection.findOne({ email });
          res.json(user);
      } catch (error) {
          console.error("Error fetching user:", error);
          res.status(500).json({ message: "Server error" });
      }
  });
  
    
    app.post("/signup", async (req, res) => {
      const { email, password } = req.body;
    
      try {
        // Check if the user already exists
        const existingUser = await usersCollection.findOne({ email });
        if (existingUser) {
          return res.status(400).json({ message: "User already exists" });
        }
    
        // Hash the password using bcrypt
        const hashedPassword = await bcrypt.hash(password, 10); // 10 is the salt rounds
    
        // Insert the user into the database with the hashed password
        await usersCollection.insertOne({
          email,
          password: hashedPassword, // Store the hashed password
          failedAttempts: 0,
          isLocked: false,
          lockoutUntil: null,
        });
    
        res.status(201).json({ message: "User registered successfully" });
      } catch (error) {
        console.error("Error during registration:", error);
        res.status(500).json({ message: "Server error during registration" });
      }
    });
    
    app.post("/users", async (req, res) => {
      const { name, email, photoURL, uid, createdAt } = req.body;
      try {
        // Check if user already exists
        const existingUser = await usersCollection.findOne({ email });
        if (existingUser) {
          return res.status(400).json({ message: "User already exists" });
        }
    
        // Insert the new user
        await usersCollection.insertOne({
          name,
          email,
          photoURL,
          uid,
          createdAt,
          failedAttempts: 0,
          isLocked: false,
          lockoutUntil: null,
        });
    
        res.status(201).json({ message: "User registered successfully" });
      } catch (error) {
        console.error("Error during registration:", error);
        res.status(500).json({ message: "Server error during registration" });
      }
    });
    
    
    
    
    

    // 🛠 JWT Authentication
    app.post("/jwt", async (req, res) => {
      const user = req.body;
      try {
        const token = jwt.sign(user, process.env.JWT_ACCESS_TOKEN, { expiresIn: "5h" });
        res.json({ token });
      } catch (error) {
        res.status(500).json({ message: "Error generating JWT token", error });
      }
    });

    // 🛠 Middleware to Verify JWT Token
    const verifyToken = (req, res, next) => {
      if (!req.headers.authorization) {
        return res.status(401).json({ message: "Forbidden access" });
      }
      const token = req.headers.authorization.split(" ")[1];
      jwt.verify(token, process.env.JWT_ACCESS_TOKEN, (err, decoded) => {
        if (err) {
          return res.status(401).json({ message: "Forbidden access" });
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

  } finally {

    // Ensures that the client will close when you finish/error
    // await client.close();

    // Not closing client to keep the server running

  }
}


run().catch(console.error);

app.get("/", (req, res) => {
  res.send("Auctoria is waiting for an exclusive bid!");
});

// 🛠 Start the Server
server.listen(port, () => {
  console.log(`Server is running on port: ${port}`);
});
