import { defineStore } from 'pinia'

export const productsStore = defineStore('products', {
  state: () => ({
    products: [],
    cart: [],
    displayedItems: 20,
    itemsPerLoad: 20,
  }),

  getters: {
    displayedProducts() {
      return this.products.slice(0, this.displayedItems);
    },
    canLoadMore() {
      return this.displayedItems < this.products.length;
    },
  },

  actions: {
    fetchProductsFromDB() {
      fetch('https://dummyjson.com/products')
        .then(res => res.json())
        .then(json => {
          this.products = json.products;
          console.log(this.products);
        })
    },

    loadMore(){
      this.displayedItems = Math.min(
        this.displayedItems + this.itemsPerLoad,
        this.products.length
      );
    },

    addToCart(product) {
      this.cart.push(product)
    },

    removeFromCart(id) {
      this.cart = this.cart.filter((item) => item.id != id);
    }
  }
})


