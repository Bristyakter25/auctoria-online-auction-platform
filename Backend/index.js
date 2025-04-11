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
  console.log("A user connected", socket.id);
  // socket.on("register", (userId) => {
  //   users[userId] = socket.id;
  // });
  socket.on("disconnect", () => {
    console.log("User disconnected");
  });

  socket.on("connect_error", (error) => {
    console.error("❌ Connection Error:", error);
  });
});

const uri = `mongodb+srv://auctoria:${process.env.DB_PASS}@cluster0.t199j.mongodb.net/?retryWrites=true&w=majority&appName=Cluster0`;
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
    const usersCollection = client.db("Auctoria").collection("users");
    const bidHistroyCollection = client.db("Auctoria").collection("bids");
    const notificationsCollection = client
      .db("Auctoria")
      .collection("notifications");
    const reviewsCollection = client.db("Auctoria").collection("reviews");

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
        const result = await productsCollection.find().toArray();
        res.json(result);
      } catch (error) {
        res.status(500).json({ message: "Error fetching products", error });
      }
    });

    // 🛠 Get Recent Products (Limited to 4)
    app.get("/recentProducts", async (req, res) => {
      try {
        const result = await productsCollection
          .find()
          .sort({ _id: -1 })
          .limit(4)
          .toArray();
        res.json(result);
      } catch (error) {
        res.status(500).json({ error: "Failed to fetch recent products" });
      }
    });

    app.get("/featuredProducts", async (req, res) => {
      try {
        const result = await productsCollection
          .find({ status: "Active" })
          .sort({ startingBid: -1 })
          .toArray();
        res.json(result);
      } catch (error) {
        res.status(500).json({ error: "Failed to fetch featured products" });
      }
    });
    app.get("/addProducts", async (req, res) => {
      const cursor = productsCollection.find();
      const result = await cursor.toArray();
      res.send(result);
    });
    // 🛠 Add Product
    app.post("/addProducts", async (req, res) => {
      const productData = req.body;
      try {
        if (!productData) {
          return res.status(400).json({ message: "Missing fields" });
        }
        if (productData.auctionStartDate) {
          const startTime = new Date(productData.auctionStartDate);

          // const auctionEndTime = new Date(startTime);
          // auctionEndTime.setDate(auctionEndTime.getDate() + 7);
          const auctionEndTime = new Date(startTime.getTime() + 10 * 60 * 1000);

          productData.auctionEndTime = auctionEndTime.toISOString();
        }
        productData.endingSoonNotified = false;
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
    //show specific seller products
    // app.get("/addProducts/:email", async (req, res) => {
    //   const { email } = req.params;
    //   const query = { email: email };
    //   const result = await productsCollection.find(query).toArray();
    //   res.send(result);
    // });

    // 🛠 Get Single Product by ID

    app.get("/addProducts/:id", async (req, res) => {
      const { id } = req.params;
      console.log("product id is ", id);
      try {
        const product = await productsCollection.findOne({
          _id: new ObjectId(id),
        });

        if (!product) {
          return res.status(404).json({ message: "Product not found" });
        }

        if (product.bids) {
          product.bids = product.bids.map((bid) => ({
            ...bid,
            _id: bid._id ? bid._id.toString() : new ObjectId().toString(),
          }));
        }

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
        const wishListedProducts = await productsCollection
          .find({
            _id: { $in: user.wishlist.map((id) => new ObjectId(id)) },
          })
          .toArray();

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

        const productObjectId = new ObjectId(productId);

        const wishlist = (user.wishlist || []).map((id) => id.toString());
        const productIdStr = productObjectId.toString();

        if (wishlist.includes(productIdStr)) {
          return res
            .status(400)
            .json({ message: "Product is already in your wishlist" });
        }

        // Add to wishlist only if it's not already there
        const result = await usersCollection.updateOne(
          { uid: userId },
          { $addToSet: { wishlist: productObjectId } }
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
          const remainingTime = Math.ceil(
            (user.lockoutUntil - Date.now()) / 60000
          );
          return res.status(403).json({
            message: `Account locked. Try again in ${remainingTime} minutes.`,
          });
        }

        // Compare plain-text password
        if (user.password !== password) {
          const failedAttempts = (user.failedAttempts || 0) + 1;
          let updateFields = { failedAttempts };
          // Compare hashed password using bcrypt
          const isMatch = await bcrypt.compare(password, user.password);
          if (!isMatch) {
            const failedAttempts = (user.failedAttempts || 0) + 1;
            let updateFields = { failedAttempts };
            console.log(`Failed attempts for ${email}: ${failedAttempts}`); // Debugging line
            // Lock account after 3 failed attempts
            if (failedAttempts >= MAX_FAILED_ATTEMPTS) {
              updateFields.isLocked = true;
              updateFields.lockoutUntil = Date.now() + LOCKOUT_DURATION;
            }
            console.log(
              `Account for ${email} locked! Lockout until: ${updateFields.lockoutUntil}`
            );
          }
          await usersCollection.updateOne({ email }, { $set: updateFields });
          return res.status(401).json({
            message: `Invalid credentials. Attempt ${failedAttempts} of ${MAX_FAILED_ATTEMPTS}.`,
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
        const remainingTime = Math.ceil(
          (user.lockoutUntil - Date.now()) / 60000
        );
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

    app.get("/users", async (req, res) => {
      try {
        // Fetch users from the database
        const result = await usersCollection.find().toArray();
        res.json(result); // Send the users as JSON response
      } catch (error) {
        res.status(500).json({ message: "Error fetching users", error });
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
          uid: uid || null,
          createdAt: createdAt || new Date(),
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

    app.post("/bid/:id", async (req, res) => {
      const { id } = req.params;
      const { bidId, amount, user, email, sellerId, sellerEmail, productName } =
        req.body;
      // console.log("seller user", user, sellerEmail);
      try {
        if (!ObjectId.isValid(id)) {
          return res.status(400).send({ error: "Invalid product ID format" });
        }

        const objectId = new ObjectId(id);
        const result = await productsCollection.updateOne(
          { _id: objectId },
          { $push: { bids: { bidId, amount, user, email, time: new Date() } } }
        );
        console.log("Bid time:", new Date());
        // notification for Seller when user Bid the product
        const notification = {
          userId: sellerId,
          email: sellerEmail,
          message: `${user} placed a bid of $${amount} on your product: ${productName}`,
          createdAt: new Date(),
          read: false,
        };
        // console.log(" Notification Data:", notification);
        await notificationsCollection.insertOne(notification);
        io.emit(`notification_${sellerEmail}`, notification);
        io.emit("newBid", { id, amount, user, time: new Date() });
        res.send(result);
      } catch (error) {
        res.status(500).send({ error: "Failed to place bid" });
      }
    });

    // about automatic send end time of bid to the bidder Users
    const AuctionEndingTimer = async () => {
      const now = new Date();
      const tenMinutesLater = new Date(now.getTime() + 10 * 60 * 1000);
      console.log("At Present date & Time:", now);
      console.log("tenMinutesLater:", tenMinutesLater);
      const endingSoonProducts = await productsCollection
        .find({
          auctionEndTime: {
            $gte: now.toISOString(),
            $lte: tenMinutesLater.toISOString(),
          },
          endingSoonNotified: { $ne: true },
        })
        .toArray();
      console.log("Found ending soon products:", endingSoonProducts.length);
      for (const product of endingSoonProducts) {
        // const { bids = [], productName, _id } = product;
        for (const bid of product.bids || []) {
          const email = bid.email;
          const notification = {
            email,
            message: `${product.productName} Its auction is about to end.`,
            productId: product._id,
            createdAt: new Date(),
            read: false,
          };

          await notificationsCollection.insertOne(notification);
          io.emit(`notification_${email}`, notification);
        }
        await productsCollection.updateOne(
          { _id: new ObjectId(product._id) },
          { $set: { endingSoonNotified: true } }
        );
        console.log(
          `endingSoonNotified Product ${product._id} updated to notified`
        );
      }
    };
    setInterval(async () => {
      console.log("Checking for ending soon auctions...");
      AuctionEndingTimer();
    }, 60 * 1000);

    app.get("/notification/:email", async (req, res) => {
      const { email } = req.params;
      try {
        const result = await notificationsCollection
          .find({ email })
          .sort({ createdAt: -1 })
          .toArray();
        res.send(result);
      } catch (error) {
        res
          .status(500)
          .json({ message: "Error fetching notifications", error });
      }
    });

    // Review related API

    app.get("/reviews/:sellerEmail", async (req, res) => {
      const { sellerEmail } = req.params;
      const result = await reviewsCollection.find({ sellerEmail }).toArray();
      res.send(result);
    });

    app.post("/reviews", async (req, res) => {
      try {
        const review = req.body;
        const { sellerEmail, reviewerEmail } = review;
        const exsitingReview = await reviewsCollection.findOne({
          sellerEmail,
          reviewerEmail,
        });
        if (exsitingReview) {
          return res.status(400).send({
            error: "You have already reviewed this seller!",
          });
        }
        // review.createdAt = new Date();
        const result = await reviewsCollection.insertOne(review);
        res.send(result);
      } catch (error) {
        res.status(500).send({ error: "Failed to submit review" });
      }
    });

    //bid History related API

    app.get("/bidHistory/:email", async (req, res) => {
      const email = req.params.email;
      console.log("Fetching bid history for email:", email);

      try {
        const products = await productsCollection
          .find({
            bids: { $elemMatch: { email: email } },
          })
          .toArray();

        const bidHistory = [];

        products.forEach((product) => {
          // console.log("Product:", product._id);
          const userBids = product.bids.filter((bid) => bid.email === email);
          userBids.forEach((bid) => {
            bidHistory.push({
              productName: product.productName,
              name: bid.user,
              email: bid.email,
              bidAmount: bid.amount,
              timestamp: bid.time,
              bidId: bid.bidId,
              _id: product._id,
            });

            // console.log("Bid:", _id);
          });
          // console.log("Bid:", _id);
        });

        res.status(200).json(bidHistory);
      } catch (error) {
        console.error("Error fetching bid history", error);
        res.status(500).json({ message: "Failed to fetch bid history" });
      }
    });

    // 🛠 Delete Bid
    app.delete("/deleteBid/:productId/:bidId", async (req, res) => {
      const { productId, bidId } = req.params;
      console.log("Deleting bid for product ID:", bidId, productId);

      try {
        const result = await productsCollection.updateOne(
          { _id: new ObjectId(productId) },
          { $pull: { bids: { bidId: bidId } } }
        );

        if (result.modifiedCount > 0) {
          res
            .status(200)
            .send({ success: true, message: "Bid removed successfully." });
        } else {
          res
            .status(404)
            .send({ success: false, message: "No matching bid found." });
        }
      } catch (error) {
        res
          .status(500)
          .send({ success: false, message: "Server error", error });
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
