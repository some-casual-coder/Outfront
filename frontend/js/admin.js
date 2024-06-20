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
      return data.token;
    } catch (error) {
      console.error('Error fetching admin token:', error);
      throw error;
    }
  }

  async function deleteProduct(productId, token) {
    try {
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
  async function addProduct(productData, token) {
    try {
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
  
      const data = await response.json();
      console.log('Product added successfully:', data);
    } catch (error) {
      console.error('Error adding product:', error);
    }
  }
  
  