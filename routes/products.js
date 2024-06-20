const express = require('express');
const router = express.Router();
const path = require('path');
const { format } = require('util');
module.exports = (db, upload, bucket) => {

  //fetch all products

  router.get('/', async (req, res) => {
    try {
      const productsSnapshot = await db.collection('products').get();
      const products = productsSnapshot.docs.map(doc => ({
        id: doc.id,
        ...doc.data()
      }));
      res.json(products);
    } catch (error) {
      console.error('Error fetching products:', error);
      res.status(500).json({ error: 'Failed to fetch products' });
    }
  });

//fetch a single product 
  router.get('/:productId', async(req, res)=>{
    try{
    const { productId } = req.params;
    const productRef = db.collection('products').doc(productId)
    const productDoc = await productRef.get()
    if(!productDoc.exists)
      {
        return res.status(404).send('product not found')
      }
      const productData = productDoc.data();
      res.json(productData)

    }
    catch (error) {
      console.error('Error fetching products:', error);
      res.status(500).json({ error: 'Failed to fetch products' });
    }


  })

//post product 

  router.post('/', upload.single('image'), async (req, res) => {
    const { name, price, description, quantity } = req.body;
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
        const newProduct = { name, price, description, quantity, imageUrl: publicUrl };
        await db.collection('products').add(newProduct);
        res.status(201).json({ message: 'Product added successfully', product: newProduct });
      } catch (error) {
        console.error('Error adding product to Firestore:', error);
        res.status(500).json({ error: 'Failed to add product' });
      }
    });

    blobStream.end(req.file.buffer);
  });

  //delete product 
  router.delete('/:productId', async(req, res)=>{
    try{
    const { productId } = req.params;
    productRef = db.collection('products').doc(productId)
    const productDoc = await productRef.get()
    if(!productDoc.exists){
      return res.status(404).send('product not found')
    
    }
     await productDoc.delete
     res.status(200).send('product deleted successfully')

  }
  catch(error){
    console.error('failed to delete product')
    res.status(500).json({error: 'failed to delete product'})
  }}
)


  return router;
};
