<template>
    <Navbar />
    <div v-if="!store.cart.length" class="empty-cart">
        <img src="../assets/images/cart.png" alt="Empty Cart">
        <p>It's so empty here. Let's go add some items.</p>
        <button @click="router.push({ name: 'shop' })">Continue shopping</button>
    </div>
    <div class="cart-container" v-else>
        <div class="cart-items">
            <div class="cart-item" v-for="item in store.cart" :key="item.id">
                <div class="item-details">
                    <input type="checkbox" v-model="item.selected" @change="updateCart">
                    <img :src="item.thumbnail" alt="">
                    <span>{{ item.title }}</span>
                    <span>{{ item.category }}</span>
                    <div class="quantity-control">
                        <button @click="decrementQuantity(item)">-</button>
                        <input type="number" v-model.number="item.quantity" min="1" @change="updateCart">
                        <button @click="incrementQuantity(item)">+</button>
                    </div>
                    <span>Kes{{ item.price * item.quantity }}</span>
                    <button @click="removeFromCart(item.id)">Remove</button>
                </div>
            </div>
        </div>
        <div class="checkout-summary">
            <h2>Checkout Summary</h2>
            <p>Total Items: {{ totalSelectedItems }}</p>
            <p>Total Price: Kes{{ totalPrice }}</p>
            <button @click="checkout" :disabled="!totalSelectedItems">Proceed to Checkout</button>
        </div>
    </div>
</template>

<script>
import { defineComponent, onMounted } from 'vue';
import Navbar from '@/components/Navbar.vue';

export default defineComponent({
    name: 'CartView',
    components: {
        Navbar,
    }
})

</script>

<script setup>
import { computed, onMounted } from 'vue';
import { productsStore } from '@/stores/products';
import { useRouter } from 'vue-router';

const store = productsStore();
const router = useRouter();

onMounted(() => {
    store.cart.forEach(item => {
        if (typeof item.selected === 'undefined') {
            item.selected = true;
        }
        if (typeof item.number === 'undefined') {
            item.number = 1;
        }
    });
    updateCart();
});

const updateCart = () => {
    store.updateCart(store.cart);
};

const totalSelectedItems = computed(() => {
    return store.cart.filter(item => item.selected).reduce((total, item) => total + item.quantity, 0);
});

const totalPrice = computed(() => {
    return store.cart
        .filter(item => item.selected)
        .reduce((total, item) => total + item.price * item.quantity, 0)
        .toFixed(2);
});

const removeFromCart = (id) => {
    store.removeFromCart(id);
    updateCart();
};

const incrementQuantity = (item) => {
    item.quantity++;
    updateCart();
};

const decrementQuantity = (item) => {
    if (item.quantity > 1) {
        item.quantity--;
        updateCart();
    }
};

const checkout = () => {
};
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

.cart-container {
    display: flex;
    justify-content: space-between;
    margin: 20px;
}

.cart-items {
    flex: 2;
}

.cart-item {
    display: flex;
    align-items: center;
    margin-bottom: 20px;
    padding: 10px;
    border: 1px solid #ddd;
}

.item-details {
    display: flex;
    align-items: center;
    justify-content: space-between;
    width: 100%;
}

.item-details img {
    width: 50px;
    height: 50px;
    object-fit: cover;
    margin-right: 10px;
}

.quantity-control {
    display: flex;
    align-items: center;
}

.quantity-control input {
    width: 40px;
    text-align: center;
}

.checkout-summary {
    flex: 1;
    margin-left: 20px;
    padding: 20px;
    border: 1px solid #ddd;
    height: fit-content;
}

button {
    cursor: pointer;
    padding: 5px 10px;
    background-color: var(--orange);
    color: white;
    border: none;
    border-radius: 5px;
}

button:disabled {
    background-color: #ccc;
    cursor: not-allowed;
}
</style>