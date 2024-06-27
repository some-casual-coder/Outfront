<template>
    <Navbar />

    <div class="product">
        <div class="product-image">
            <img :src="selectedProduct.thumbnail" alt="Product Image">
        </div>
        <div class="product-details">
            <h2>{{ selectedProduct.title }}</h2>
            <h2 class="price">$. {{ selectedProduct.price }}</h2>
            <hr>
            <p>{{ selectedProduct.description }}</p>

            <p class="stock">In Stock</p>
            <div class="quantity-selector">
                <button @click="decreaseQuantity" :disabled="quantity <= 1">-</button>
                <input type="number" v-model.number="quantity" min="1" />
                <button @click="increaseQuantity">+</button>
            </div>
            <div class="product-actions">
                <button @click="toCheckout(selectedProduct)" class="up">Buy Now</button>
                <button @click="addToCart(selectedProduct)">Add to Cart</button>
            </div>
        </div>
        <div v-if="showNotification" class="notification">
            Added to cart
            <div ref="progressBar" class="progress-bar"></div>
        </div>
    </div>
</template>

<script>
import { defineComponent } from "vue";
import Navbar from '@/components/Navbar.vue';

export default defineComponent({
    name: 'ProductDetails',
    components: {
        Navbar,
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
const progressBar = ref(null);
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
    store.addToCart({ ...product, number: quantity.value })
    showNotification.value = true;

    if (progressBar.value) {
        progressBar.value.style.width = '100%';
    }

    setTimeout(() => {
        if (progressBar.value) {
            progressBar.value.style.width = '0%';
        }
    }, 50);

    setTimeout(() => {
        showNotification.value = false;
    }, 3000);
}

const toCheckout = (product) => {
    sessionStorage.setItem('checkoutTotal', product.price);
    router.push({ name: 'Checkout' });
};

</script>

<style scoped>
.product {
    font-family: 'Roboto', sans-serif;
    width: 85%;
    margin: auto;
    display: flex;
    margin-top: 50px;
    justify-content: space-around;
    align-items: center;

    & .product-image {
        background-color: #ffebdc;
        border-radius: 10px;
    }

    & .product-details {
        width: 60%;

        & p {
            font-size: 1.1rem;
            color: #242424;
            letter-spacing: 1px;
        }

        & .price {
            color: #ff6e01;
        }
    }


}

.quantity-selector {
    display: flex;
    align-items: stretch;
    margin-bottom: 20px;
}

.quantity-selector button {
    background-color: #ffffff;
    border: none;
    padding-left: 10px;
    padding-right: 10px;
    cursor: pointer;
    font-size: 1.2rem;
    font-weight: 1000;
    border-top: 1px solid #d6d6d6;
    border-bottom: 1px solid #d6d6d6;
    border-left: 1px solid #d6d6d6;
    border-right: 1px solid #d6d6d6;
    border-radius: 0 30px 30px 0;
}

.quantity-selector button:first-child {
    margin-left: 0;
    border-left: 1px solid #d6d6d6;
    border-right: 1px solid #d6d6d6;
    border-radius: 30px 0 0 30px;
}

.quantity-selector input {
    width: 25px;
    padding: 7px 5px;
    padding-left: 18px;
    font-size: 1.1rem;
    text-align: center;
    border: none;
    border-top: 1px solid #d6d6d6;
    border-bottom: 1px solid #d6d6d6;
    font-weight: 600;
}

.product-actions button {
    margin-right: 20px;
    border-radius: 7px;
    background: #ff6e01;
    border: 2px solid #ff6e01;
    line-height: 1;
    color: white;
    font-size: 1.05rem;
    font-weight: 600;
    padding: 1em 3em;
    transition: 0.3s ease-in-out;
}

.product-actions button:last-child {
    background-color: white;
    border: 1px solid #707070;
    color: black;

    &:hover {
        cursor: pointer;
        color: #ff6e01;
    }
}

.product-details .stock {
    background-color: #bbffbe;
    width: 100px;
    text-align: center;
    padding: 5px 0;
    border-radius: 10px;
}

.product-details hr {
    border: 1px solid #feddc4;
}

.up:hover,
.up:focus {
    cursor: pointer;
    border-color: #4caf50;
    box-shadow: inset 0 -3.25em 0 0 #4caf50;
}

.notification {
    position: fixed;
    bottom: 40px;
    left: 50%;
    transform: translateX(-50%);
    background-color: #4caf50;
    color: white;
    padding: 10px 20px;
    border-radius: 5px;
    box-shadow: 0 2px 4px rgba(0, 0, 0, 0.2);
    z-index: 1000;
    overflow: hidden;
    width: auto;
}

.progress-bar {
    position: absolute;
    bottom: 0;
    left: 0;
    height: 5px;
    background-color: rgba(255, 255, 255, 0.4);
    width: 100%;
    transition: width 3s linear;
}
</style>