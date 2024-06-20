const express = require('express');
const bodyParser = require('body-parser');
const admin = require('firebase-admin');
const cors = require('cors');
const dotenv = require('dotenv');
const multer = require('multer');
const storage = multer.memoryStorage();
const upload = multer({ storage: storage });

const path = require('path');
const { format } = require('util');

// Load environment variables from .env file
dotenv.config();

// Initialize Firebase Admin SDK using the path from environment variable
const serviceAccountPath = process.env.SERVICE_ACCOUNT_KEY_PATH;
if (!serviceAccountPath) {
  throw new Error("Missing SERVICE_ACCOUNT_KEY_PATH environment variable");
}
const serviceAccount = require(serviceAccountPath);

admin.initializeApp({
  credential: admin.credential.cert(serviceAccount),
  storageBucket: process.env.FIREBASE_STORAGE_BUCKET
});

const db = admin.firestore();
const bucket = admin.storage().bucket();
const app = express();
app.set('view engine', 'ejs');
app.use(cors());
app.use(bodyParser.json());




app.get("/", (req, res) => {
  console.log("I am up and running");

});


const productRouter = require("./routes/products")(db);
const cartRouter = require("./routes/cart")(db);
const adminRouter = require("./routes/admin")(db, upload,bucket );


app.use("/cart", cartRouter);
app.use("/products", productRouter);
app.use("/admin", adminRouter)



const PORT = 61361;
app.listen(PORT, () => {
  console.log(`Server listening at http://localhost:${PORT}/`);
});
