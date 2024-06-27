<template>
    <Navbar />
    <div v-if="!store.cart.length" class="empty-cart">
        <img src="../assets/images/cart.png" alt="Empty Cart">
        <p>It's so empty here. Let's go add some items.</p>
        <button @click="router.push({ name: 'shop' })">Continue shopping</button>
    </div>
    <div v-else>
        <div class="cart-container">
            <p class="clear-cart" @click="clearCart"><svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 512 512"
                    width="14" class="svg-clear">
                    <path
                        d="M367.2 412.5L99.5 144.8C77.1 176.1 64 214.5 64 256c0 106 86 192 192 192c41.5 0 79.9-13.1 111.2-35.5zm45.3-45.3C434.9 335.9 448 297.5 448 256c0-106-86-192-192-192c-41.5 0-79.9 13.1-111.2 35.5L412.5 367.2zM0 256a256 256 0 1 1 512 0A256 256 0 1 1 0 256z" />
                </svg> Clear Cart</p>-
            <div class="cart-header">
                <p>ITEM</p>
                <p>QUANTITY</p>
                <p>PRICE ($)</p>
                <p>ACTIONS</p>
            </div>
            <div class="cart-items">
                <div class="cart-item" v-for="item in store.cart" :key="item.id">
                    <div class="item-details">
                        <input type="checkbox" v-model="item.selected" @change="updateCart">
                        <img :src="item.thumbnail" alt="">
                        <span>{{ item.title }}</span>
                        <span>{{ item.category }}</span>
                    </div>
                    <div class="quantity-control">
                        <button @click="decrementQuantity(item)">-</button>
                        <input type="number" v-model.number="item.quantity" min="1" @change="updateCart">
                        <button @click="incrementQuantity(item)">+</button>
                    </div>
                    <span class="price">{{ item.price * item.quantity }}</span>
                    <svg xmlns="http://www.w3.org/2000/svg" @click="removeFromCart(item.id)" viewBox="0 0 448 512"
                        fill="#ff2424" width="16">
                        <path
                            d="M64 32C28.7 32 0 60.7 0 96V416c0 35.3 28.7 64 64 64H384c35.3 0 64-28.7 64-64V96c0-35.3-28.7-64-64-64H64zm88 200H296c13.3 0 24 10.7 24 24s-10.7 24-24 24H152c-13.3 0-24-10.7-24-24s10.7-24 24-24z" />
                    </svg>
                </div>
            </div>
        </div>
        <div class="checkout-container">
            <div class="checkout-summary">
                <div>
                    <p class="total-price"><span>Total Price</span> $.{{ totalPrice }} ({{ totalSelectedItems }}
                        items)
                    </p>
                    <p>Shipment costs not included</p>
                </div>
                <div>
                    <button @click="toCheckout" :disabled="!totalSelectedItems">Proceed to Checkout</button>
                </div>
            </div>
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
    return store.cart.filter(item => item.selected).reduce((total, item) => total + item.number, 0);
});

const totalPrice = computed(() => {
    return store.cart
        .filter(item => item.selected)
        .reduce((total, item) => total + item.price * item.number, 0)
        .toFixed(2);
});

const removeFromCart = (id) => {
    store.removeFromCart(id);
    updateCart();
};

const incrementQuantity = (item) => {
    item.number++;
    updateCart();
};

const decrementQuantity = (item) => {
    if (item.number > 1) {
        item.number--;
        updateCart();
    }
};

const toCheckout = () => {
    sessionStorage.setItem('checkoutTotal', totalPrice.value);
    router.push({ name: 'Checkout' });
};

const clearCart = () => {
    store.clearCart();
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
    font-family: 'Roboto', sans-serif;
    width: 80%;
    margin: auto;
    display: grid;
    grid-template-columns: 1fr;
    gap: 1rem;
    overflow-y: auto;
    padding-bottom: 200px;
    max-height: calc(100vh - 100px);
}

.cart-container .clear-cart {
    background-color: white;
    border: 1px solid #585858;
    border-radius: 20px;
    width: 100px;
    padding: 8px 15px;
    margin: 0;
    transition: all 0.3s ease-in-out;

    &:hover {
        cursor: pointer;
        background-color: red;
        border: 1px solid red;
        color: white;
    }
}

.cart-container .clear-cart:hover .svg-clear {
    fill: white;
    transition: fill 0.3s ease;
}

.cart-header,
.cart-item {
    display: grid;
    grid-template-columns: 2fr 1fr 1fr 1fr;
    align-items: center;
    justify-items: flex-start;
    gap: 1rem;
}

.cart-header {
    font-weight: bold;
    padding: 0.5rem;
    border-bottom: 1px solid #ffc99f;
}

.cart-item svg {
    margin-left: 20px;
    transition: opacity 0.4s ease;

    &:hover {
        cursor: pointer;
        opacity: 0.8;
    }
}

.item-details {
    display: flex;
    align-items: center;
    gap: 0.5rem;
}

.item-details img {
    width: 50px;
    height: 50px;
    object-fit: cover;
}

.quantity-control {
    display: flex;
    align-items: center;
    gap: 0.5rem;

    & button {
        background-color: rgb(255, 251, 245);
        border: 1px solid #ddd;
        border-radius: 5px;
        color: #555555;
    }
}

.quantity-control input {
    width: 30px;
    padding-left: 15px;
    text-align: center;
    border: 0;
}

.checkout-container {
    width: 100%;
    border-top: 1px solid #ddd;
    position: fixed;
    padding-bottom: 30px;
    bottom: 0;
    backdrop-filter: blur(20px);
    z-index: 10;
    font-family: 'Roboto', sans-serif;

    & button {
        position: relative;
        cursor: pointer;
        padding: 15px 30px;
        border: 1px solid var(--orange);
        transition: padding 0.3s ease-in-out;
        background-color: white;
        border-radius: 3px;
        font-size: 1.1rem;
        color: var(--orange);
    }

    & button:before {
        content: "";
        position: absolute;
        top: 0.3rem;
        left: 0.3rem;
        z-index: -1;
        height: 100%;
        width: 100%;
        background-color: var(--orange);
        border-right: 1px solid var(--orange);
        border-bottom: 1px solid var(--orange);
        transition: all 0.2s ease-in-out;
        border-radius: 5px;
    }

    & button:hover {
        color: white;
        background-color: var(--orange);
        transition: all 0.4s ease-in-out;
    }

    & button:hover:before {
        top: 0;
        left: 0;
    }

    & button:disabled {
        background-color: #ccc;
        cursor: not-allowed;
        color: black;
        border: 1px solid #ddd;

        &:before {
            display: none;
        }
    }
}

.checkout-summary {
    margin: 20px 150px;
}

.checkout-summary {
    display: flex;
    justify-content: space-between;
    align-items: center;

    & .total-price {
        font-size: 1.5rem;
        font-weight: 1000;

        & span {
            font-size: 1.2rem;
            font-weight: 400;
            color: #ff6e01;
        }
    }

    & p:last-child {
        margin-top: 0;
        opacity: 0.9;
    }
}
</style>