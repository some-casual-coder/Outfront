function getUserID(){
    userID = localStorage.getItem('userID')
    if(!userID){
        userID = generateuuid();
        localStorage.setItem('userID', userID)
    }
    return userID
}
function generateUUID() {
    return 'xxxxxxxx-xxxx-4xxx-yxxx-xxxxxxxxxxxx'.replace(/[xy]/g, function(c) {
      const r = Math.random() * 16 | 0, v = c === 'x' ? r : (r & 0x3 | 0x8);
      return v.toString(16);
    });
  }

  async function fetchCart(){
    const userID = getUserID();
    const response = await fetch('/cart', {
        headers:{
            'User-ID': userID
        }
    })
    const data = await response.json()
    console.log(data)
  }

  async function updateCart(items){
     const userID = getUserID()
      await fetch('/cart', {
        method : 'POST',
        
        headers: {
            'Content-Type': 'application/json',
            'User-ID': userID
        },
        body: JSON.stringify({ items })

     })

  }
  async function removeItemFromCart(productId) {
    const userID = getUserID()
    await fetch('/cart/${productId}', {
        method: 'DELETE',
        headers:{
            'User-ID': userID
        }
    
        


    })

  }
