<style scoped>
/* NAVIGATION */
@import url('https://fonts.googleapis.com/css2?family=Roboto:ital,wght@0,100;0,300;0,400;0,500;0,700;0,900;1,100;1,300;1,400;1,500;1,700;1,900&display=swap');

.navbar {
    width: 93%;
    position: -webkit-sticky;
    position: sticky;
    display: flex;
    margin: auto;
    flex-direction: row;
    justify-content: space-between;
    align-items: center;
    overflow: hidden;
}

.navbar .nav {
    margin-top: -60px;
}

.navbar img {
    background: wheat;
    border-radius: 50%;
    height: 200px;
    text-align: center;
    margin: auto;
    padding: 0 !important;
}

.navbar ul {
    list-style: none;
    display: flex;
    /* float: right; */
    padding-left: 0 !important;
}

.nav-item a {
    font-family: 'Roboto', serif;
    font-size: 1.1rem;
    font-weight: 400;
    letter-spacing: 1px;
    padding: 10px;
    color: black;
    text-decoration: none;
    transition: color 0.3s ease-out;

    &:hover {
        cursor: pointer;
        color: #ff6e01;
    }
}

.contacts .nav-item>a:hover {
    cursor: default;
    color: black;
}

.nav-item.call {
    position: relative;
    cursor: pointer;
    padding: 10px 20px;
    margin-right: 10px;
    /* margin-top: 30px; */
    font-size: 1.4rem;
    border: 1px solid rgb(114, 114, 114);
    transition: padding 0.3s ease-in-out;
    background-color: white;

    & a {
        color: var(--orange);
        font-weight: 500;
    }
}

.nav-item.opening{
    text-align: center;
}

.nav-item.call:before {
    content: "";
    position: absolute;
    top: 0.5rem;
    left: 0.5rem;
    z-index: -1;
    height: 95%;
    width: 97%;
    background-color: #ffd3b1;
    border-right: 2px solid #ffd3b1;
    border-bottom: 2px solid #ffd3b1;
    transition: all 0.2s ease-in-out;
}

.nav-item.call:hover {
    background-color: var(--orange);
    transition: all 0.4s ease-in-out;
    border: 1px solid #ff6e01;

    & a {
        color: white;
    }
}

.nav-item.call:hover:before {
    top: 0;
    left: 0;
}

.nav-item.cart {
    font-size: 1.2rem;
    margin-top: 15px;

    & a:hover{
        cursor: pointer;
        color: #ff6e01;
    }
}

.contacts .nav-item a {
    font-size: 1.1rem;
}

/* MOBILE MENU & ANIMATION */

.menu-toggle .bar {
    width: 25px;
    height: 3px;
    background-color: #3f3f3f;
    margin: 5px auto;
    -webkit-transition: all 0.3s ease-in-out;
    -o-transition: all 0.3s ease-in-out;
    transition: all 0.3s ease-in-out;
}

.menu-toggle {
    justify-self: end;
    margin-right: 25px;
    display: none;
}

.menu-toggle:hover {
    cursor: pointer;
}

#mobile-menu.is-active .bar:nth-child(2) {
    opacity: 0;
}

#mobile-menu.is-active .bar:nth-child(1) {
    -webkit-transform: translateY(8px) rotate(45deg);
    -ms-transform: translateY(8px) rotate(45deg);
    -o-transform: translateY(8px) rotate(45deg);
    transform: translateY(8px) rotate(45deg);
}

#mobile-menu.is-active .bar:nth-child(3) {
    -webkit-transform: translateY(-8px) rotate(-45deg);
    -ms-transform: translateY(-8px) rotate(-45deg);
    -o-transform: translateY(-8px) rotate(-45deg);
    transform: translateY(-8px) rotate(-45deg);
}

@media only screen and (max-width: 720px) {
    /* MOBILE NAVIGATION */

    .navbar ul {
        display: flex;
        flex-direction: column;
        position: fixed;
        justify-content: start;
        top: 55px;
        background-color: #fff;
        width: 100%;
        height: calc(100vh - 55px);
        transform: translate(-101%);
        text-align: center;
        overflow: hidden;
    }

    .navbar li {
        padding: 15px;
    }

    .navbar li:first-child {
        margin-top: 50px;
    }

    .navbar li a {
        font-size: 1rem;
    }

    .menu-toggle,
    .bar {
        display: block;
        cursor: pointer;
    }

    .mobile-nav {
        transform: translate(0%) !important;
    }
}
</style>

<template>
    <nav class="navbar">

        <div class="menu-toggle" id="mobile-menu" @click="showMenu = !showMenu" :class="{ 'is-active': showMenu }">
            <span class="bar"></span>
            <span class="bar"></span>
            <span class="bar"></span>
        </div>
        <ul class="nav no-search" :class="{ 'mobile-nav': showMenu }">
            <li class="nav-item"><a @click="navigateToHome('home')">Home</a></li>
            <li class="nav-item"><a @click="navigateToHome('services')">Services</a></li>
            <li class="nav-item"><a @click="router.push({ name: 'shop' })">Shop</a></li>
        </ul>
        <img :src="logoImage" alt="Company Logo">
        <ul class="nav no-search contacts" :class="{ 'mobile-nav': showMenu }">
            <button class="nav-item call"><a href="tel:+254112856539">Call us</a></button>
            <li class="nav-item opening" v-if="isHomePage"><a>Everyday<br>9AM - Midnight</a></li>
            <li class="nav-item cart" v-else @click="router.push({ name: 'CartView' })"><a>Cart({{ store.cart.length }})</a></li>
        </ul>
    </nav>
</template>

<script>
import logoImage from '@/assets/logo2.png'
import { computed } from "vue";
import { productsStore } from "@/stores/products";

export default {
    name: 'Navbar',
    data() {
        return {
            showMenu: false,
            logoImage: logoImage
        }
    }
};
</script>

<script setup>
import { useRouter, useRoute } from "vue-router";

const router = useRouter();
const route = useRoute();
const store = productsStore();

const isHomePage = computed(() => {
    return route.name === 'Home'
});

const navigateToHome = (section) => {
    if (route.name !== 'Home') {
        router.push({ name: 'Home' }).then(() => {
            setTimeout(() => {
                const element = document.getElementById(section);
                if (element) {
                    element.scrollIntoView({ behavior: 'smooth' });
                }
            }, 100);
        });
    } else {
        const element = document.getElementById(section);
        if (element) {
            element.scrollIntoView({ behavior: 'smooth' });
        }
    }
};

</script>
