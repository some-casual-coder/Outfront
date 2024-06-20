async function getAdminToken(username, password) {
    try {
      const response = await fetch('/products/enter', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json'
        },
        body: JSON.stringify({ username, password })
      });
  
      if (!response.ok) {
        throw new Error('Failed to authenticate');
      }
  
      const data = await response.json();
      const token = data.token;
  
      // Store the token in local storage
      localStorage.setItem('adminToken', token);
  
      return token;
    } catch (error) {
      console.error('Error fetching admin token:', error);
      throw error;
    }
  }
  
  async function deleteProduct(productId) {
    try {
      const token = localStorage.getItem('adminToken');
      if (!token) {
        throw new Error('Token not found in local storage');
      }
  
      const response = await fetch(`/products/${productId}`, {
        method: 'DELETE',
        headers: {
          'Authorization': `Bearer ${token}`
        }
      });
  
      if (!response.ok) {
        throw new Error('Failed to delete product');
      }
  
      console.log(`Product with ID '${productId}' deleted successfully`);
    } catch (error) {
      console.error('Error deleting product:', error);
    }
  }
  
  async function addProduct(productData) {
    try {
      const token = localStorage.getItem('adminToken');
      if (!token) {
        throw new Error('Token not found in local storage');
      }
  
      const formData = new FormData();
      formData.append('name', productData.name);
      formData.append('price', productData.price);
      formData.append('description', productData.description);
      formData.append('quantity', productData.quantity);
      formData.append('image', productData.image); 
  
      const response = await fetch('/products/add-product', {
        method: 'POST',
        headers: {
          'Authorization': `Bearer ${token}`
        },
        body: formData
      });
  
      if (!response.ok) {
        throw new Error('Failed to add product');
      }
  
      const responseData = await response.json();
      console.log('Product added successfully:', responseData.product);
    } catch (error) {
      console.error('Error adding product:', error);
    }
  }
  
  async function editProduct(productId, updatedProductData) {
    try {
      const token = localStorage.getItem('adminToken');
      if (!token) {
        throw new Error('Token not found in local storage');
      }
  
      const response = await fetch(`/products/${productId}`, {
        method: 'PUT',
        headers: {
          'Content-Type': 'application/json',
          'Authorization': `Bearer ${token}`
        },
        body: JSON.stringify(updatedProductData)
      });
  
      if (!response.ok) {
        throw new Error('Failed to update product');
      }
  
      const responseData = await response.json();
      console.log(`Product with ID '${productId}' updated successfully:`, responseData.product);
    } catch (error) {
      console.error('Error updating product:', error);
    }
  }
  
//   // Example usage:
//   async function performOperations() {
//     try {
//       // Fetch admin token and store it in local storage
//       const token = await getAdminToken('admin_username', 'admin_password');
  
//       // Example operations
//       const productIdToDelete = 'product_id_to_delete';
//       await deleteProduct(productIdToDelete);
  
//       const newProductData = {
//         name: 'New Product',
//         price: 100,
//         description: 'A new product',
//         quantity: 50,
//         image: document.getElementById('imageFile').files[0] // Example: Retrieve image file from input element
//       };
//       await addProduct(newProductData);
  
//       const productIdToUpdate = 'product_id_to_update';
//       const updatedProductData = {
//         name: 'Updated Product Name',
//         price: 150,
//         description: 'Updated product description',
//         quantity: 75
//       };
//       await editProduct(productIdToUpdate, updatedProductData);
//     } catch (error) {
//       console.error('Error performing operations:', error);
//     }
//   }
  
//   // Call performOperations to trigger the example usage
//   performOperations();
  