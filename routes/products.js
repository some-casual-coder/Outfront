const express = require('express');
const router = express.Router();
const path = require('path');
const { format } = require('util');
module.exports = (db, upload, bucket) => {
  // Example GET route for products
  router.get('/', async (req, res) => {
    try {
      const productsSnapshot = await db.collection('products').get();
      const products = productsSnapshot.docs.map(doc => doc.data());
      res.json(products);
    } catch (error) {
      console.error('Error fetching products:', error);
      res.status(500).json({ error: 'Failed to fetch products' });
    }
  });

  // Example POST route to add a new product with image upload to Firebase Storage
  router.post('/', upload.single('image'), async (req, res) => {
    const { name, price } = req.body;
    if (!req.file) {
      return res.status(400).json({ error: 'Image file is required' });
    }

    const blob = bucket.file(Date.now() + path.extname(req.file.originalname));
    const blobStream = blob.createWriteStream({
      metadata: {
        contentType: req.file.mimetype
      }
    });

    blobStream.on('error', (err) => {
      console.error('Error uploading to Firebase Storage:', err);
      res.status(500).json({ error: 'Failed to upload image' });
    });

    blobStream.on('finish', async () => {
      const publicUrl = format(`https://storage.googleapis.com/${bucket.name}/${blob.name}`);
      
      try {
        const newProduct = { name, price, imageUrl: publicUrl };
        await db.collection('products').add(newProduct);
        res.status(201).json({ message: 'Product added successfully', product: newProduct });
      } catch (error) {
        console.error('Error adding product to Firestore:', error);
        res.status(500).json({ error: 'Failed to add product' });
      }
    });

    blobStream.end(req.file.buffer);
  });

  return router;
};
