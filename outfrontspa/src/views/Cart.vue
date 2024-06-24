<template>
    <Navbar />
    <div v-if="!store.cart.length" class="empty-cart">
        <img src="../assets/images/cart.png" alt="Empty Cart">
        <p>It's so empty here. Let's go add some items.</p>
        <button @click="router.push({ name: 'shop' })">Continue shopping</button>
    </div>
    <div class="cart-items" v-else>
        <div class="cart-item" v-for="item in store.cart" :key="item.id">
            <div class="item-details">
                <img :src="item.thumbnail" alt="">
                <span>Brand {{ item.title }}</span>
                <span>Category {{ item.category }}</span>
                <span>quantity {{ item.number }}</span>
                <span>Price Kes{{ item.price }}</span>
                <button @click="removeFromCart(item.id)">Remove</button>
            </div>
        </div>
    </div>
</template>

<script>
import { defineComponent } from 'vue';
import Navbar from '@/components/Navbar.vue';

export default defineComponent({
    name: 'CartView',
    components: {
        Navbar,
    }
})

</script>

<script setup>
import { productsStore } from '@/stores/products';
import { useRoute, useRouter } from 'vue-router';

const store = productsStore();
const router = useRouter();

const removeFromCart = (id) => {
    store.removeFromCart(id);
}
</script>

<style scoped>
.empty-cart {
    text-align: center;
    margin-top: 50px;
    font-family: 'Roboto', sans-serif;

    & img {
        width: 350px;
    }

    & button {
        cursor: pointer;
        padding: 10px 30px;
        border: 2px solid var(--orange);
        transition: padding 0.3s ease-in-out;
        background-color: white;
        border-radius: 5px;
        font-size: 1.4rem;
        color: var(--orange);
    }

    & button:hover {
        color: white;
        background-color: var(--orange);
        transition: all 0.4s ease-in-out;
    }
}
</style>