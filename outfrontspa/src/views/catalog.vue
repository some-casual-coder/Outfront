<template>
    <div class="product-list">
        <div class="product" v-for="product in store.products" :key="product.id" @click="viewProduct(product.id)">
            <img :src="product.thumbnail" alt="">
            <h2>Brand: {{ product.brand }}</h2>
            <p>Desc: {{ product.description }}</p>
            <p>Price: ${{ product.price }}</p>
        </div>
    </div>
</template>

<script>
import { defineComponent } from "vue";

export default defineComponent({
    name: 'CatalogView'
})
</script>

<script setup>
import { onMounted } from "vue";
import { productsStore } from "@/stores/products";
import { useRouter } from "vue-router";

const store = productsStore()

const router = useRouter()

const viewProduct = (id) => {
    router.push({
        name: 'ProductView',
        params: { id }
    })
}




onMounted(async () => {
    await store.fetchProductsFromDB()
})
</script>

<style scoped></style>