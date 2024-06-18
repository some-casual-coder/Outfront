<template>
    <button @click="router.push({ name: 'shop' })">Continue shopping</button>
    <div class="product">
        <div class="product-image">
            <img :src="selectedProduct.thumbnail" alt="">
        </div>
        <div class="product-details">
            <p>Brand: {{ selectedProduct.brand }}</p>
            <p>Desc: {{ selectedProduct.decription }}</p>
            <h2>Price: Kes{{ selectedProduct.price }}</h2>
            <button @click="addToCart">Add to Cart</button>

        </div>
    </div>
</template>

<script>
import { defineComponent } from "vue";

export default defineComponent({
    name: 'ProductDetails'
})
</script>

<script setup>
import { computed } from "vue";
import { productsStore } from "@/stores/products";
import { useRoute, useRouter } from "vue-router";

const store = productsStore();
const route = useRoute();
const router = useRouter();

const selectedProduct = computed(() => {
    return store.products.find((item) => item.id === Number(route.params.id))
})

const addToCart = () => {
    store.addToCart(selectedProduct.value)
    router.push({name: 'CartView'})
}

</script>