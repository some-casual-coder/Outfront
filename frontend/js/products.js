//function to fetch all products
async function fetchAllProducts(){
   try{
    const response = await fetch('/products',{
        method: 'GET',
    })
    if(!response.ok){
        throw new Error('failed to fetch products')
    }
    const products = await response.json()
    console.log('product fetched successfully:',products)

   }
   catch(error){
    console.error('Error fetching products:', error);

   }
   
}
//function to fetch a single product
async function fetchProduct(productId) {
    try {
        const response = await fetch(`/products/${productId}`, {
            method: 'GET'
        });
        if (!response.ok) {
            console.error('Error fetching product:', response.statusText);
            return;
        }
        const product = await response.json();
        console.log(product);
    } catch (error) {
        console.error('Error fetching product:', error);
    }
}


// //function add a new product
// async function addProduct(item){
//     const formData = new FormData();
//     formData.append('name', item.name)
//     formData.append('price', item.price)
//     formData.append('Description', item.description)
//     formData.append('quantity', item.quantity)
//     formData.append('image', item.imageFile)
// try{
//     const response = await fetch('/products', {
//         method: 'POST',
//         body: formData
//     })
//     if(!response.ok){
//         throw new Error('failed to add product')
//     }

//     const result = await response.json();
//     console.log('product added successfully:', result)}

// catch(error){
//     console.error('Error adding product:', error)
// }
// }
 
// //example function use 
// // const item = {
// //     name: 'Lipstick',
// //     price: 20,
// //     imageFile: document.querySelector('input[type="file"]').files[0]
// //   };
// //   addProduct(item);

// //function to delete a single product (only for admin)

// async function deleteProduct(productId){
// try{
//     const response = await fetch(`/products/${productId}`, {
//         method: 'Delete',
//     })
//  if(!response.ok){
//     throw new Error('failed to delete product')
//  }
//  console.log("Product with ID '${productId}' deleted successfully")}
//  catch(error){
//     console.error('Error deleting product:', error)
//  }
// }