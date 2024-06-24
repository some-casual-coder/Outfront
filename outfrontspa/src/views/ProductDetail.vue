<template>
    <Navbar />

    <div class="product">
        <div class="product-image">
            <img :src="selectedProduct.thumbnail" alt="Product Image">
        </div>
        <div class="product-details">
            <h2>{{ selectedProduct.title }}</h2>
            <p>{{ selectedProduct.description }}</p>
            <h2>Kes. {{ selectedProduct.price }}</h2>

            <div class="quantity-selector">
                <button @click="decreaseQuantity" :disabled="quantity <= 1">-</button>
                <input type="number" v-model.number="quantity" min="1" />
                <button @click="increaseQuantity">+</button>
            </div>
            <button @click="addToCart(selectedProduct)">Add to Cart</button>
        </div>
        <div v-if="showNotification" class="notification">
            Added to cart
        </div>
    </div>
</template>

<script>
import { defineComponent } from "vue";
import Navbar from '@/components/Navbar.vue';

export default defineComponent({
    name: 'ProductDetails',
    components: {
        Navbar
    },
})
</script>

<script setup>
import { computed, ref } from "vue";
import { productsStore } from "@/stores/products";
import { useRoute, useRouter } from "vue-router";

const store = productsStore();
const route = useRoute();
const router = useRouter();

const selectedProduct = computed(() => {
    return store.products.find((item) => item.id === Number(route.params.id))
})

const showNotification = ref(false);
const quantity = ref(1);

const increaseQuantity = () => {
    quantity.value++;
};

const decreaseQuantity = () => {
    if (quantity.value > 1) {
        quantity.value--;
    }
};

const addToCart = (product) => {
    store.addToCart({ ...product, quantity: quantity.value })
    showNotification.value = true;
    setTimeout(() => {
        showNotification.value = false;
    }, 3000);
}

</script>

<style>
.product{
    font-family: 'Roboto', sans-serif;
}

.notification {
    position: fixed;
    bottom: 20px;
    left: 50%;
    transform: translateX(-50%);
    background-color: #4caf50;
    /* Green background */
    color: white;
    /* White text */
    padding: 10px 20px;
    border-radius: 5px;
    box-shadow: 0 2px 4px rgba(0, 0, 0, 0.2);
    z-index: 1000;
    /* Make sure it's on top of other elements */
}

.quantity-selector {
    display: flex;
    align-items: center;
}

.quantity-selector button {
    padding: 5px 10px;
    margin: 0 5px;
    background-color: #ddd;
    border: none;
    cursor: pointer;
}

.quantity-selector input {
    width: 50px;
    text-align: center;
}
</style>