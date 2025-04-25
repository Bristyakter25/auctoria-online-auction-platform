require("dotenv").config();
const express = require("express");
const cors = require("cors");
const http = require("http");
const { Server } = require("socket.io");
const cron = require("node-cron");
const { MongoClient, ServerApiVersion, ObjectId } = require("mongodb");
const jwt = require("jsonwebtoken");
const stripe = require("stripe")(process.env.STRIPE_SECRET_KEY);

const app = express();
const port = process.env.PORT || 5000;
const server = http.createServer(app);

const allowedOrigins = [
  "http://localhost:5174",
  "http://localhost:5173",
  "https://bidapp-81c51.web.app", // your frontend on Firebase
  "https://auctoria-online-auction-platform.onrender.com", // your Render backend itself (needed for self requests)
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
// app.set("io", io);

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
    const bidHistoryCollection = client.db("Auctoria").collection("bids");
    const notificationsCollection = client
      .db("Auctoria")
      .collection("notifications");
    const reviewsCollection = client.db("Auctoria").collection("reviews");

    const paymentCollection = client.db("Auctoria").collection("payments");
    const messageCollection = client.db("Auctoria").collection("messages");
    const followingCollection = client.db("Auctoria").collection("followers");

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
    //verify admin after verifyToken
    const verifyAdmin = async (req, res, next) => {
      const email = req?.decoded?.email;
      const query = { email: email };
      const user = await usersCollection.findOne(query);
      const isAdmin = user?.role == "admin";
      if (!isAdmin) {
        return res.status(403).send({ message: "forbidden access" });
      }
      next();
    };
    //verify seller after verifyToken
    const verifySeller = async (req, res, next) => {
      const email = req?.decoded?.email;
      const query = { email: email };
      const user = await usersCollection.findOne(query);
      const isSeller = user?.role == "seller";
      if (!isSeller) {
        return res.status(403).send({ message: "forbidden access" });
      }
      next();
    };

    app.get("/user-stats", async(req,res)=>{
      const users = await usersCollection.estimatedDocumentCount();
      const products = await productsCollection.estimatedDocumentCount();
      const payments = await paymentCollection.estimatedDocumentCount();
      res.send({users,products,payments})
    })

    //verify user role api
    app.get("/user/role/:email", async (req, res) => {
      const email = req.params.email;
      const query = { email: email };
      // console.log(query, "email in role api");
      const user = await usersCollection.findOne(query);
      // console.log("User role:", user);
      // console.log( user?.role);
      res.send({ role: user?.role });
    });
    app.get("/users", async (req, res) => {
      try {
        const result = await usersCollection.find().toArray();
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
          .limit(10)
          .toArray();
        res.json(result);
      } catch (error) {
        res.status(500).json({ error: "Failed to fetch recent products" });
      }
    });

    app.get("/featuredProducts", async (req, res) => {
      try {
        const result = await productsCollection
          .find({ status: "active" })
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
        // if (productData.auctionStartDate) {
        //   const startTime = new Date(productData.auctionStartDate);

        //   // const auctionEndTime = new Date(startTime);
        //   // auctionEndTime.setDate(auctionEndTime.getDate() + 7);
        //   const auctionEndTime = new Date(startTime.getTime() + 10 * 60 * 1000);
        //   productData.auctionEndTime = auctionEndTime.toISOString();
        // }
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

    app.get("/productHistory", async (req, res) => {
      const email = req.query.email;
      console.log("email:", email);

      if (!email) {
        return res
          .status(400)
          .send({ message: "Email query parameter is required." });
      }

      try {
        const result = await productsCollection.find({ email }).toArray();
        res.send(result);
      } catch (error) {
        res.status(500).send({ message: "Failed to fetch products", error });
      }
    });

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

    // Get Popular Product based on bid

    app.get("/popularProducts", async (req, res) => {
      try {
        const result = await productsCollection
          .aggregate([
            {
              $addFields: {
                totalBids: { $size: { $ifNull: ["$bids", []] } },
              },
            },
            {
              $sort: { totalBids: -1 },
            },
            {
              $limit: 10,
            },
          ])
          .toArray();

        res.send(result);
      } catch (err) {
        console.error("Error fetching popular products:", err);
        res.status(500).send({ message: "Server error", error: err });
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

    // app.get("/debug-user/:email", async (req, res) => {
    //   const email = req.params.email;
    //   try {
    //     const user = await usersCollection.findOne({ email });
    //     res.json(user);
    //   } catch (error) {
    //     console.error("Error fetching user:", error);
    //     res.status(500).json({ message: "Server error" });
    //   }
    // });

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

    // // payment functionalities
    // app.post("/create-payment-intent", async (req, res) => {
    //   try {
    //     let { price } = req.body;

    //     // Force to number
    //     price = Number(price);

    //     if (isNaN(price)) {
    //       return res.status(400).json({ error: "Invalid price value" });
    //     }

    //     const amount = Math.round(price * 100); // always better than parseInt here

    //     const paymentIntent = await stripe.paymentIntents.create({
    //       amount,
    //       currency: "usd",
    //       payment_method_types: ["card"],
    //     });

    //     res.send({
    //       clientSecret: paymentIntent.client_secret,
    //     });
    //   } catch (error) {
    //     console.error("Stripe Payment Intent Error:", error.message);
    //     res.status(500).json({ error: "Failed to create payment intent" });
    //   }
    // });

    // payment functionalities
    app.post("/create-payment-intent", async (req, res) => {
      try {
        let { price } = req.body;

        // Force to number
        price = Number(price);

        if (isNaN(price)) {
          return res.status(400).json({ error: "Invalid price value" });
        }

        const amount = Math.round(price * 100); // always better than parseInt here

        const paymentIntent = await stripe.paymentIntents.create({
          amount,
          currency: "usd",
          payment_method_types: ["card"],
        });

        res.send({
          clientSecret: paymentIntent.client_secret,
        });
      } catch (error) {
        console.error("Stripe Payment Intent Error:", error.message);
        res.status(500).json({ error: "Failed to create payment intent" });
      }
    });

    app.post("/payments", async (req, res) => {
      const payment = req.body;

      try {
        // Save the full payment object with product info
        const paymentResult = await paymentCollection.insertOne(payment);
        console.log("Payment info stored:", payment);

        // Extract bidIds from products
        const bidIdsToDelete = payment.products.map((p) => p.bidId);

        // Delete those bids from product collection
        const query = {
          "bids.bidId": { $in: bidIdsToDelete },
        };
        const deleteResult = await productsCollection.deleteMany(query);

        res.send({ paymentResult, deleteResult });
      } catch (err) {
        console.error("Payment storage error:", err.message);
        res.status(500).send({ error: "Failed to process payment" });
      }
    });

    app.get("/payments", async (req, res) => {
      try {
        const result = await paymentCollection.find().toArray();
        res.json(result);
      } catch (error) {
        res.status(500).json({ message: "Error fetching payments", error });
      }
    });

    // change the status handled by admin

    app.patch("/payments/:id", async (req, res) => {
      const { status } = req.body;
      const { id } = req.params;

      try {
        const updatedOrder = await paymentCollection.updateOne(
          { _id: new ObjectId(id) }, // Ensure id is valid and properly cast to ObjectId
          { $set: { status } }
        );

        if (updatedOrder.modifiedCount === 0) {
          return res
            .status(404)
            .json({ error: "Order not found or already updated" });
        }

        res.json({ message: "Order status updated" });
      } catch (error) {
        console.error("Error updating order status:", error);
        res.status(500).json({ error: "Error updating order status" });
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
      const { name, email, photoURL, uid, createdAt, role } = req.body;
      // console.log("Received user data:", req.body);

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
          role,
        });

        res.status(201).json({ message: "User registered successfully" });
      } catch (error) {
        console.error("Error during registration:", error);
        res.status(500).json({ message: "Server error during registration" });
      }
    });

    // Automatic Notification send to Auction Winner
    cron.schedule("*/1 * * * *", async () => {
      console.log("⏰ Running auction expiry check...");
      // app.get("/winner-auction", async (req, res) => {
      try {
        const nowISOString = new Date().toISOString();
        const query = {
          auctionEndTime: { $lte: nowISOString },
          status: { $ne: "expired" },
        };
        const products = await productsCollection.find(query).toArray();
        const winners = [];
        // console.log("winner auction", winners);
        for (const product of products) {
          const bids = product.bids || [];

          if (bids.length > 0) {
            const highestBid = bids.reduce((max, bid) =>
              bid.amount > max.amount ? bid : max
            );
            console.log("Highest bid:", highestBid);
            await productsCollection.updateOne(
              { _id: product._id },
              {
                $set: {
                  status: "expired",
                  winner: highestBid.user,
                  winningBid: highestBid.amount,
                  winningProduct: product.productName,
                  winningTime: new Date(),
                },
              }
            );
            const notification = {
              userId: highestBid.bidId || "",
              email: highestBid.email,
              message: `Congrats! You won the auction for "${product.productName}" with ৳${highestBid.amount}`,
              createdAt: new Date(),
              read: false,
            };
            await notificationsCollection.insertOne(notification);
            console.log("expired auction notification", notification);
            io.emit(`notification_${highestBid.email}`, notification);
            winners.push({
              _id: product._id,
              productName: product.productName,
              winnerEmail: highestBid.email,
              winningBid: highestBid.amount,
            });
          } else {
            await productsCollection.updateOne(
              { _id: product._id },
              { $set: { status: "expired" } }
            );
          }
        }
        console.log("expired auction expiredAuction", products.length);
        // res.send({ totalExpired: products.length });
        // res.send(winners);
      } catch (error) {
        console.error("Auction Expiry Error:", error);
        res
          .status(500)
          .json({ error: "Something went wrong while expiring auctions" });
      }
      // });
    });

    // bid suggest related API

    app.get("/suggest-bid/:category", async (req, res) => {
      const category = req.params.category;

      try {
        const categoryProducts = await productsCollection
          .find({ category: category })
          .toArray();
        if (categoryProducts.length === 0) {
          return res
            .status(404)
            .json({ message: "there is no category product" });
        }
        console.log("category is", categoryProducts);
        let totalStartingPrice = 0;
        let totalBidAmount = 0;
        let totalBids = 0;
        categoryProducts.forEach((product) => {
          const startingBid = parseFloat(
            product.basePrice || product.startingBid || 0
          );
          totalStartingPrice += startingBid;

          if (product.bids && Array.isArray(product.bids)) {
            product.bids.forEach((bid) => {
              const bidAmount = parseFloat(bid.amount);
              if (!isNaN(bidAmount)) {
                totalBidAmount += bidAmount;
                totalBids++;
              }
            });
          }
        });

        const averageStartingPrice =
          categoryProducts.length > 0
            ? totalStartingPrice / categoryProducts.length
            : 0;
        const averageBid =
          totalBids > 0 ? totalBidAmount / totalBids : averageStartingPrice;
        const suggestedBidBaseOnStartingPrice = averageStartingPrice * 1.05;
        const suggestedBidBaseOnBids = averageBid * 1.03;

        const suggestedBid = Math.round(
          Math.max(
            suggestedBidBaseOnStartingPrice,
            suggestedBidBaseOnBids,
            averageStartingPrice
          )
        );
        io.emit("suggestedBidUpdate", {
          category,
          suggestedBid,
        });

        res.send({ category, suggestedBid });
      } catch (err) {
        console.error(err);
        res.status(500).json({ error: "problem to make suggest bid" });
      }
    });

    // Delete a user
    app.delete("/users/:id", async (req, res) => {
      const id = req.params.id;
      const user = await usersCollection.findOne({ _id: new ObjectId(id) });

      if (user?.role === "admin") {
        return res.status(403).send({ message: "Cannot delete admin user" });
      }

      const result = await usersCollection.deleteOne({ _id: new ObjectId(id) });
      res.send(result);
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
        // console.log("Bid time:", new Date());
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

    // app.post("/messages", async (req, res) => {
    //   const { sender, receiver, message, productId } = req.body;

    //   if (!sender || !receiver || !message || !productId) {
    //     return res.status(400).send({ error: "Missing required fields" });
    //   }

    //   const chatMessage = {
    //     sender,
    //     receiver,
    //     message,
    //     productId,
    //     timestamp: new Date(),
    //     read: false,
    //   };

    //   try {
    //     const result = await messagesCollection.insertOne(chatMessage);
    //     io.to(receiver).emit("receiveMessage", chatMessage); // Optional socket emit
    //     res.send(result);
    //   } catch (error) {
    //     console.error("Message store error:", error);
    //     res.status(500).send({ error: "Failed to send message" });
    //   }
    // });

    // app.get(
    //   "/messages/:productId/:userEmail/:otherUserEmail",
    //   async (req, res) => {
    //     const { productId, userEmail, otherUserEmail } = req.params;

    //     try {
    //       const messages = await messagesCollection
    //         .find({
    //           productId,
    //           $or: [
    //             { sender: userEmail, receiver: otherUserEmail },
    //             { sender: otherUserEmail, receiver: userEmail },
    //           ],
    //         })
    //         .sort({ timestamp: 1 })
    //         .toArray();

    //       res.send(messages);
    //     } catch (error) {
    //       res.status(500).send({ error: "Failed to fetch messages" });
    //     }
    //   }
    // );

    // about automatic send end time of bid to the bidder Users
    app.get(
      "/messages/:productId/:userEmail/:otherUserEmail",
      async (req, res) => {
        const { productId, userEmail, otherUserEmail } = req.params;

        try {
          const messages = await messageCollection
            .find({
              productId,
              $or: [
                { senderId: userEmail, receiverId: otherUserEmail },
                { senderId: otherUserEmail, receiverId: userEmail },
              ],
            })
            .sort({ timestamp: 1 })
            .toArray();

          res.send(messages);
        } catch (error) {
          res.status(500).send({ error: "Failed to fetch messages" });
        }
      }
    );
    // app.get("/messages/:productId/:userEmail/:otherUserEmail", async (req, res) => {
    //   const { productId, userEmail, otherUserEmail } = req.params;

    //   try {
    //     const messages = await messagesCollection
    //       .find({
    //         productId,
    //         $or: [
    //           { sender: userEmail, receiver: otherUserEmail },
    //           { sender: otherUserEmail, receiver: userEmail },
    //         ],
    //       })
    //       .sort({ timestamp: 1 })
    //       .toArray();

    //     res.send(messages);
    //   } catch (error) {
    //     res.status(500).send({ error: "Failed to fetch messages" });
    //   }
    // });

    // chat with seller
    app.post("/messages", async (req, res) => {
      const { senderId, receiverId, productId, message } = req.body;

      if (!senderId || !receiverId || !productId || !message) {
        return res.status(400).send({ error: "Missing fields" });
      }

      const newMessage = {
        senderId,
        receiverId,
        productId,
        message,
        timestamp: new Date(),
      };

      try {
        const result = await messageCollection.insertOne(newMessage);
        res.send(result);
      } catch (error) {
        console.error("Error inserting message:", error);
        res.status(500).send({ error: "Server error while saving message" });
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

    app.get("/reviews", async (req, res) => {
      const result = await reviewsCollection.find().toArray();
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

    app.post("/reviews/reply/:id", async (req, res) => {
      const { id } = req.params;
      const { replyText } = req.body; // Get the reply from the request body

      try {
        const result = await reviewsCollection.updateOne(
          { _id: new ObjectId(id) },
          {
            $set: {
              "adminReply.replyText": replyText,
              "adminReply.repliedAt": new Date(),
            },
          }
        );

        if (result.modifiedCount === 0) {
          return res.status(404).send({ error: "Review not found." });
        }

        res.send({ message: "Reply added successfully." });
      } catch (error) {
        console.error("Error adding admin reply:", error);
        res.status(500).send({ error: "Failed to add reply." });
      }
    });

    app.patch("/reviews/:id", async (req, res) => {
      const { id } = req.params;
      const { adminReply } = req.body;

      try {
        const result = await reviewsCollection.updateOne(
          { _id: new ObjectId(id) },
          {
            $set: {
              adminReply: adminReply,
            },
          }
        );

        if (result.modifiedCount === 0) {
          return res
            .status(404)
            .send({ error: "Review not found or already replied." });
        }

        res.send({ message: "Admin reply added successfully." });
      } catch (error) {
        console.error("Error updating review:", error);
        res.status(500).send({ error: "Failed to add admin reply." });
      }
    });

    app.delete("/reviews/:id", async (req, res) => {
      const { id } = req.params;

      try {
        const result = await reviewsCollection.deleteOne({
          _id: new ObjectId(id),
        });

        if (result.deletedCount === 0) {
          return res.status(404).send({ error: "Review not found." });
        }

        res.send({ message: "Review deleted successfully." });
      } catch (error) {
        console.error("Error deleting review:", error);
        res.status(500).send({ error: "Failed to delete review." });
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
              productImage: product.productImage,
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

    // Recent Auction Winner related API
    app.get("/recentWinners", async (req, res) => {
      try {
        const limit = parseInt(req.query.limit) || 3;
        const winner = await productsCollection
          .find({
            status: "expired",
            winner: { $exists: true, $ne: null },
          })
          .project({
            productName: 1,
            winner: 1,
            winningBid: 1,
            winningProduct: 1,
            winningTime: 1,
            productImage: 1,
            category: 1,
          })
          .sort({ winningTime: -1 })
          .limit(limit)
          .toArray();
        io.emit("newWinner", winner);
        // console.log("Emitting newWinner", winner);
        res.send(winner);
      } catch (err) {
        console.error(err);
        res.status(500).json({ message: "Server error" });
      }
    });

    // Followers Related Api
    app.post("/following/:userId", async (req, res) => {
      // const { sellerId } = req.body;
      const userId = req.params.userId;
      const { _id: sellerId } = req.body;
      if (!ObjectId.isValid(sellerId)) {
        return res.status(400).json({ message: "Invalid product ID" });
      }
      try {
        const user = await usersCollection.findOne({ _id: userId });
        if (!user) return res.status(404).json({ message: "user not found" });
        const updatedUser = await usersCollection.updateOne(
          { _id: userId },
          { $addToSet: { favoriteSeller: new ObjectId(sellerId) } }
        );
        res.send({ success: true, updatedUser });
      } catch (error) {
        console.error("Error adding favorite product:", error);
        res.status(500).json({ message: "Server error" });
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
