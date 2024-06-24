<template>
    <Navbar />
    <div class="catalog-header">
        <h1>SHOP</h1>
        <p>Pamper Yourself for Pennies <span>.</span> Spa Essentials at Irresistible Prices</p>
    </div>
    <div class="product-list">
        <div class="product" v-for="product in store.displayedProducts" :key="product.id"
            @click="viewProduct(product.id)">
            <div class="img-container">
                <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 448 512" @click.stop="addToCart(product)">
                    <path
                        d="M256 80c0-17.7-14.3-32-32-32s-32 14.3-32 32V224H48c-17.7 0-32 14.3-32 32s14.3 32 32 32H192V432c0 17.7 14.3 32 32 32s32-14.3 32-32V288H400c17.7 0 32-14.3 32-32s-14.3-32-32-32H256V80z" />
                </svg>
                <img :src="product.thumbnail" alt="Product Image">
            </div>
            <h3 class="product-title" :title="product.title">{{ product.title }}</h3>
            <p>Kes. {{ product.price }}</p>
        </div>

        <div v-if="showNotification" class="notification">
            Added to cart
        </div>

        <div class="load-actions">
            <button v-if="store.canLoadMore" class="load_more_btn" :class="{ 'button--loading': isLoading }"
                @click="handleLoadMore">
                <div class="load_more_loader button__loader"></div>
                <span>{{ buttonText }}</span>
            </button>
        </div>
    </div>
</template>

<script>
import { defineComponent } from "vue";
import Navbar from '@/components/Navbar.vue';

export default defineComponent({
    name: 'CatalogView',
    components: {
        Navbar
    },
});
</script>

<script setup>
import { computed, onMounted, ref } from "vue";
import { productsStore } from "@/stores/products";
import { useRouter, useRoute } from "vue-router";

const store = productsStore()

const router = useRouter()
const route = useRoute()

const isLoading = ref(false);
const showNotification = ref(false);
const buttonText = computed(() => isLoading.value ? 'Loading...' : 'Load More');

const handleLoadMore = async () => {
    isLoading.value = true;
    try {
        await store.loadMore();
    } catch (error) {
        console.error('Error loading more products:', error);
    } finally {
        isLoading.value = false;
    }
};

const viewProduct = (id) => {
    router.push({
        name: 'ProductView',
        params: { id }
    })
}

const addToCart = (product) => {
    store.addToCart({ ...product, number: 1 });
    showNotification.value = true;
    setTimeout(() => {
        showNotification.value = false;
    }, 3000);
}

onMounted(() => {
    store.fetchProductsFromDB()
})
</script>
<style scoped>
@import url('https://fonts.googleapis.com/css2?family=Playfair:ital,opsz,wght@0,5..1200,300..900;1,5..1200,300..900&family=Playwrite+ES:wght@100..400&family=Roboto:ital,wght@0,100;0,300;0,400;0,500;0,700;0,900;1,100;1,300;1,400;1,500;1,700;1,900&display=swap');

.catalog-header {
    text-align: center;
    font-family: 'Roboto', sans-serif;
    /* letter-spacing: 1px; */

    & h1 {
        font-family: 'Playwrite', cursive;
        font-weight: 1000;
        color: #ff6e01;
        font-size: 2.5rem;
        margin-bottom: 0;
    }

    & p {
        font-size: 1.2rem;
        margin: 0;

        & span {
            color: #ff6e01;
            font-weight: 1000;
            font-size: 1.8rem;
        }
    }
}

.product-list {
    width: 90%;
    position: relative;
    margin: auto;
    margin-top: 50px;
    display: flex;
    flex-direction: row;
    flex-wrap: wrap;
    row-gap: 40px;
    column-gap: 20px;
    justify-content: flex-start;
    padding-bottom: 60px;

    & .product {
        width: calc(25% - 30px);
        font-family: 'Roboto', sans-serif;
        margin-right: 20px;

        &:nth-child(4n) {
            margin-right: 0;
        }

        & .img-container {
            position: relative;
            overflow: hidden;
            border-radius: 10px;
            aspect-ratio: 1 / 1;
            display: flex;
            align-items: center;
            justify-content: center;
            background-color: #ffebdc;

            & svg {
                position: absolute;
                display: none;
                width: 17px;
                background-color: white;
                border-radius: 50px;
                padding: 5px;
                top: 10px;
                right: 10px;
                /* z-index: 100; */

                &:hover {
                    background-color: rgb(27, 27, 27, 0.2);
                    color: white;
                    transition: all 0.3s ease-in-out;
                }
            }
        }

        & img {
            width: 100%;
            height: 100%;
            object-fit: contain;
            transition: transform 0.3s ease;
        }

        & h3 {
            margin: 10px 0 5px;
            font-weight: 450;
            letter-spacing: 1px;
            color: #2c2c2c;
            font-size: 1rem;
            white-space: nowrap;
            overflow: hidden;
            text-overflow: ellipsis;
            max-width: 100%;
        }

        & p {
            margin-top: 8px;
            font-size: 1rem;
        }
    }
}

.product:hover {
    cursor: pointer;
}

.product:hover .img-container svg {
    display: block;
}

.product:hover img {
    transform: scale(1.1) rotate(-2deg);
}

.notification {
    position: fixed;
    bottom: 20px;
    left: 50%;
    transform: translateX(-50%);
    background-color: #4caf50;
    color: white;
    padding: 10px 20px;
    border-radius: 5px;
    box-shadow: 0 2px 4px rgba(0, 0, 0, 0.2);
    z-index: 1000;
    /* Make sure it's on top of other elements */
}

.load-actions {
    width: 100%;
    display: block;
    margin: 20px auto;
    text-align: center;
}

.load_more_btn {
    position: relative;
    background: #232cfb;
    color: #fff;
    text-transform: uppercase;
    margin: 0 auto;
    display: block;
    border: 0;
    padding: 15px 25px;
    z-index: 2;
    border-radius: 2px;
    cursor: pointer;
    font-weight: bold;
    font-size: 16px;
    letter-spacing: .25em;
    transition: all .5s;
    overflow: hidden;
}

.load_more_btn:hover {
    background: #4c52ff;
}

.button--loading {
    padding-left: 70px;
}

.load_more_btn .button__loader {
    float: left;
    position: absolute;
    left: -50px;
    top: 10px;
    transition: all .2s;
}

.button--loading .button__loader {
    left: 15px;
}

.load_more_loader,
.load_more_loader:after {
    border-radius: 50%;
    width: 30px;
    height: 30px;
}

.load_more_loader {
    font-size: 10px;
    position: relative;
    text-indent: -9999em;
    border-top: 4px solid rgba(255, 255, 255, 0.2);
    border-right: 4px solid rgba(255, 255, 255, 0.2);
    border-bottom: 4px solid rgba(255, 255, 255, 0.2);
    border-left: 4px solid #ffffff;
    transform: translateZ(0);
    animation: loaderSpin 1.1s infinite linear;
}

@keyframes loaderSpin {
    0% {
        transform: rotate(0deg);
    }

    100% {
        transform: rotate(360deg);
    }
}

@media (max-width: 1200px) {
    .product-list .product {
        width: calc(33.33% - 13.33px);

        &:nth-child(4n) {
            margin-right: 20px;
        }

        &:nth-child(3n) {
            margin-right: 0;
        }
    }
}

@media (max-width: 768px) {
    .product-list .product {
        width: calc(50% - 10px);

        &:nth-child(3n) {
            margin-right: 20px;
        }

        &:nth-child(2n) {
            margin-right: 0;
        }
    }
}

@media (max-width: 480px) {
    .product-list .product {
        width: 100%;
        margin-right: 0;
    }
}
</style>