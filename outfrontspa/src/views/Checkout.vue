<template>
    <Navbar />
    <div class="checkout">
        <h1>Checkout</h1>
        <p>Total to Pay: Kes{{ checkoutTotal }}</p>
    </div>
</template>

<script>
import { defineComponent, onMounted } from 'vue';
import Navbar from '@/components/Navbar.vue';

export default defineComponent({
    name: 'CheckoutView',
    components: {
        Navbar,
    }
})

</script>

<script setup>
import { ref, onMounted } from 'vue';

const checkoutTotal = ref(0);

onMounted(() => {
    // Retrieve the total from session storage
    const total = sessionStorage.getItem('checkoutTotal');
    if (total) {
        checkoutTotal.value = parseFloat(total);
    }

    // Optional: Clear the total from session storage after retrieving it
    // sessionStorage.removeItem('checkoutTotal');
});
</script>