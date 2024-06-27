import { defineStore } from 'pinia'

const CART_STORAGE_KEY = 'user_cart';
const TWO_WEEKS_IN_MS = 14 * 24 * 60 * 60 * 1000; // 14 days in milliseconds

export const productsStore = defineStore('products', {
  state: () => ({
    products: [],
    cart: [],
    displayedItems: 12,
    itemsPerLoad: 16,
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
        })
    },

    loadMore() {
      this.displayedItems = Math.min(
        this.displayedItems + this.itemsPerLoad,
        this.products.length
      );
    },

    addToCart(product) {
      const existingProduct = this.cart.find(item => item.id === product.id);
      if (existingProduct) {
        existingProduct.number++;
      } else {
        this.cart.push({ ...product, number: 1, selected: true });
      }
      this.saveCartToStorage();
    },

    removeFromCart(id) {
      this.cart = this.cart.filter((item) => item.id != id);
      this.saveCartToStorage();
    },

    updateCart(updatedCart) {
      this.cart = updatedCart;
      this.saveCartToStorage();
    },

    saveCartToStorage() {
      const cartData = {
        items: this.cart,
        timestamp: new Date().getTime()
      };
      localStorage.setItem(CART_STORAGE_KEY, JSON.stringify(cartData));
    },

    loadCartFromStorage() {
      const storedCart = localStorage.getItem(CART_STORAGE_KEY);
      if (storedCart) {
        const { items, timestamp } = JSON.parse(storedCart);
        const now = new Date().getTime();
        if (now - timestamp < TWO_WEEKS_IN_MS) {
          this.cart = items;
        } else {
          localStorage.removeItem(CART_STORAGE_KEY);
        }
      }
    },

    clearCart() {
      this.cart = [];
      localStorage.removeItem(CART_STORAGE_KEY);
    }
  }
})


