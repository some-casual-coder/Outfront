<template>
    <div>
        <img src="../assets/images/coming-soon.png" alt="Coming Soon">
        <button @click="router.push({ name: 'Home' })">Back to Homepage</button>
    </div>
</template>

<script>
import { defineComponent } from "vue";

export default defineComponent({
    name: 'ComingSoon'
})
</script>

<script setup>
import { useRouter } from "vue-router";

const router = useRouter()

</script>

<style scoped>
:root {
    --orange: #ff6e01;
}

div{
    margin: auto;
    margin-top: 50px;
    width: 50%;
    display: flex;
    flex-direction: column;
    justify-content: center;
    align-items: center;

    & img{
        width: 300px;
    }
}

button {
    cursor: pointer;
    padding: 10px 30px;
    margin-top: 30px;
    border: 2px solid var(--orange);
    transition: padding 0.3s ease-in-out;
    background-color: white;
    border-radius: 5px;
    font-size: 1.4rem;
    color: var(--orange);
}

button:hover {
    color: white;
    background-color: var(--orange);
    transition: all 0.4s ease-in-out;
}
</style>