<style>
@import url('https://fonts.googleapis.com/css2?family=Playfair:ital,opsz,wght@0,5..1200,300..900;1,5..1200,300..900&family=Playwrite+ES:wght@100..400&family=Roboto:ital,wght@0,100;0,300;0,400;0,500;0,700;0,900;1,100;1,300;1,400;1,500;1,700;1,900&display=swap');
@import url('https://fonts.googleapis.com/css2?family=Work+Sans:wght@800&display=swap');

:root {
    --orange: #FF6E01;
    --darkorange: #ed6700;
}

/* width */
::-webkit-scrollbar {
    width: 7px;
}

/* Track */
::-webkit-scrollbar-track {
    box-shadow: inset 0 0 5px rgb(241, 241, 241);
    border-radius: 10px;
}

/* Handle */
::-webkit-scrollbar-thumb {
    background: var(--orange);
    border-radius: 10px;
}

/* Handle on hover */
::-webkit-scrollbar-thumb:hover {
    background: var(--darkorange);
}

.landing-header {
    width: 93%;
    margin: auto;
    margin-top: -100px;
    background-image: url('../assets/images/landing_image.jpg');
    background-size: cover;
    background-position: center;
    background-attachment: fixed;
    border-radius: 10px;
}

.landing-header .container-header {
    width: 50%;
    margin: auto;
    text-align: center;
    padding-top: 200px;
    padding-bottom: 300px;
}

.landing-header .container-header div {
    background-color: rgba(255, 255, 255, 0.8);
    padding: 60px 20px;
    border-radius: 10px;
    color: var(--orange);
    backdrop-filter: blur(5px);

    & h1 {
        font-family: 'Playfair', serif;
        font-size: 70px;
        padding: 0 !important;
        margin: 20px !important;
    }

    & p {
        padding: 0 !important;
        margin: 0 !important;
        font-size: 20px;
        font-family: 'Roboto', sans-serif;
        color: #1d1d1d;
    }

    & .tagline {
        position: relative;
        padding-bottom: 40px;
    }

    & .tagline::after {
        content: "";
        left: 43%;
        position: absolute;
        top: 40px;
        width: 100px;
        height: 5px;
        background-color: var(--orange);
        border-radius: 10px;
    }
}

.svg-about {
    margin: auto;
    width: 100%;
    margin-top: -250px;
}

body {
    margin: 0 !important;
    padding: 0 !important;
}

section {
    width: 93%;
    margin: auto;

    & h1 {
        font-family: "Playwrite ES", cursive;
        font-weight: 1000;
        color: var(--orange);
        font-size: 3rem;
        text-align: center;
    }
}

section.about-us {
    background-image: url('../assets/images/flowers.png');
    background-color: rgba(255, 255, 255, 0.7);
    background-blend-mode: lighten;
    background-size: auto;
    background-position: top right;
    background-repeat: no-repeat;
    margin-top: -50px;

    & .container {
        display: flex;
        flex-direction: row;
        justify-content: space-around;
        align-items: center;
        font-family: 'Roboto', sans-serif;
        font-size: 1.5rem;
        color: #1f1f1f;
    }

    & img {
        width: 500px;
    }

    & p {
        width: 50%;

        & span {
            color: #FF6E01;
            font-weight: bold;
        }
    }
}

.btn-book {
    position: relative;
    cursor: pointer;
    padding: 10px 30px;
    margin-top: 30px;
    border: 2px solid var(--orange);
    transition: padding 0.3s ease-in-out;
    background-color: white;
    border-radius: 5px;

    & a {
        font-size: 1.4rem;
        color: var(--orange);
        text-decoration: none;
    }
}

.btn-book:before {
    content: "";
    position: absolute;
    top: 0.5rem;
    left: 0.5rem;
    z-index: -1;
    height: 100%;
    width: 100%;
    background-color: var(--orange);
    border-right: 2px solid var(--orange);
    border-bottom: 2px solid var(--orange);
    transition: all 0.2s ease-in-out;
    border-radius: 5px;
}

.btn-book:hover {
    & a {
        color: white;
    }

    background-color: var(--orange);
    transition: all 0.4s ease-in-out;
}

.btn-book:hover:before {
    top: 0;
    left: 0;
}

section.services {
    margin-top: -286px;
    width: 100%;
    background-image: url('../assets/images/wallpaper.png');
    background-color: rgba(255, 211, 177, 0.95);
    background-blend-mode: lighten;
    background-size: auto;
    background-position: top right;
    background-repeat: no-repeat;
    padding-bottom: 200px;

    & .img {
        margin: 0 !important;
        text-align: right;
    }
}

.svg-services {
    margin: auto;
    width: 100%;
    margin-top: -300px;
}

section .ct-container.first {
    margin-top: 80px;
}

section .ct-container:nth-child(odd) {
    text-align: left;
}

.services-container {
    display: grid;
    gap: 2rem;
}

section .ct-container {
    width: 80%;
    margin: auto;
    display: grid;
    grid-template-columns: 1fr 1fr;
    align-items: center;
    gap: 2rem;
    color: black;
    text-align: right;


    & div {
        margin: auto;
        /* margin-top: 30px; */
    }

    & img {
        width: 460px;
    }

    & .facials img {
        width: 360px;
    }

    & .num {
        font-family: "Work Sans", sans-serif;
        font-weight: 800;
        font-size: 4rem;
        margin: 0 !important;
        opacity: 0.5;
    }

    & .desc {
        margin: 0 !important;
        font-family: 'Roboto', sans-serif;
        font-size: 1.3rem;
    }

    & h3 {
        font-size: 2.4rem;
        margin: 0 !important;
    }
}

section.why-us-sect {
    width: 85%;
    background-color: white;
    font-family: 'Roboto', sans-serif;
    text-align: center;
    margin: auto;

    & .container {
        display: flex;
        flex-wrap: nowrap;
        flex-direction: row;
        justify-content: space-around;
        gap: 20px;
    }

    & .why-us {
        position: relative;
        overflow: hidden;
        flex: 1 1 calc(20% -15px);
        max-width: calc(25% -15px);
        min-width: 200px;
    }

    & img {
        max-width: 100%;
        height: 135px;
        width: 220px;
    }

    & h3 {
        font-size: 1.7rem;
        margin: 0;
        margin: 20px 0;
        color: var(--orange);
    }

    & hr {
        border: 3px solid var(--orange);
        border-radius: 10px;
        margin: auto;
        width: 80px;
    }

    & p {
        font-size: 1.0rem;
        color: white;
        padding: 10px;
    }

    & .overlay {
        border-radius: 10px 10px 0 0;
        position: absolute;
        border-top: 4px solid var(--orange);
        top: 0;
        left: 0;
        bottom: 0;
        right: 0;
        display: flex;
        align-items: center;
        justify-content: center;
        background-color: rgba(0, 0, 0, 0.9);
        opacity: 0;
        transition: opacity 0.3s ease-in-out;
        transform: translateY(100%);
    }
}

@keyframes scrollUp {
    0% {
        transform: translateY(100%);
        opacity: 0;
    }

    100% {
        transform: translateY(0);
        opacity: 1;
    }
}

@keyframes scrollDown {
    0% {
        transform: translateY(0);
        opacity: 1;
    }

    100% {
        transform: translateY(100%);
        opacity: 0;
    }
}


.why-us:hover .overlay {
    animation: scrollUp 0.5s forwards;
    opacity: 1;
}

.why-us:not(:hover) .overlay {
    animation: scrollDown 0.5s forwards;
    opacity: 0;
}

section.our-prices {
    width: 100%;
    margin: 0 !important;
}

section.our-prices .container {
    margin-top: -10px;
    padding-top: 40px;
    background: linear-gradient(90deg, #ffffff 55%, #ffd3b1 0%);
    display: flex;
    flex-direction: row;
    flex-wrap: nowrap;
    justify-content: center;
    font-family: 'Roboto', sans-serif;
    font-size: 1.1rem;

    &>div {
        margin: 0 100px;
        align-items: center
    }

    & div.img-price {
        margin-left: -20px;
        margin-top: 30px;
    }

    & img {
        width: 500px;

    }

    & .prices div {
        display: grid;
        grid-template-columns: 1fr 1fr;
        align-items: center;
        gap: 2rem;
        text-align: left;
    }


    & .prices div p:last-child,
    .prices div h3:last-child {
        text-align: right;
    }

    & .prices p {
        margin: 5px 0;
    }
}

@media (max-width: 768px) {
    .why-us {
        flex: 1 1 calc(50% - 10px);
        max-width: calc(50% - 10px);
    }

    section.why-us-sect .container {
        flex-wrap: wrap;
    }
}

footer {
    position: relative;
    background-color: #1d1d1d;
    padding: 10px 100px;

    &>div:first-child {
        text-align: center;

        & img {
            margin-top: 30px;
            width: 250px;
        }
    }

    & .contact-details {
        display: flex;
        flex-direction: row;
        flex-wrap: nowrap;
        justify-content: space-between;
        font-family: 'Roboto', sans-serif;

        & .about {
            width: 40%;
            color: white;

            & h3 {
                font-size: 1.5rem;
                margin: 0;
                color: var(--orange);
                letter-spacing: 1px;
            }

            & p {
                margin-bottom: 30px;
            }

            & span a {
                padding: 10px 20px;
                border: 1px solid white;
                border-radius: 30px;
                color: white;
                text-decoration: none;
                margin: 5px 20px 0 0;
                transition: all 0.3s ease-in-out;
            }

            & span a:hover {
                background-color: white;
                color: black;
            }
        }

        & .details {
            color: white;
            display: flex;
            flex-direction: row;
            z-index: 10;

            & .links {
                display: flex;
                flex-direction: column;
                margin-right: 10px;

                & a {
                    text-decoration: none;
                    color: white;
                    margin: 15px;

                    &:hover {
                        color: var(--orange);
                    }
                }
            }


        }
    }

    & .footer-copyright {
        color: white;
        text-align: center;
    }

    & .lotus-bg {
        position: absolute;
        top: 0;
        right: 0;
        opacity: 0.05;
        /* z-index: -1; */
    }
}
</style>

<script>
import { defineComponent } from "vue";
import Navbar from '@/components/Navbar.vue';

export default defineComponent({
    name: 'HomeView',
    components: {
        Navbar
    },
    computed: {
        currentYear() {
            return new Date().getFullYear();
        }
    }
});

</script>

<script setup>
import { useRouter, useRoute } from "vue-router";

const router = useRouter();
const route = useRoute();

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

<template>
    <Navbar />
    <div class="landing-header">
        <div class="container-header">
            <div>
                <p>Pure Tranquility</p>
                <h1>Relax and Indulge in Luxury</h1>
                <p class="tagline">Rejuvenate .Refresh. Rediscover</p>
            </div>
        </div>
    </div>
    <svg class="svg-about" xmlns="http://www.w3.org/2000/svg" viewBox="0 0 1440 200">
        <path fill="white" fill-opacity="1"
            d="M0,128L48,117.3C96,107,192,85,288,90.7C384,96,480,128,576,122.7C672,117,768,75,864,80C960,85,1056,139,1152,144C1248,149,1344,107,1392,85.3L1440,64L1440,320L1392,320C1344,320,1248,320,1152,320C1056,320,960,320,864,320C768,320,672,320,576,320C480,320,384,320,288,320C192,320,96,320,48,320L0,320Z">
        </path>
    </svg>
    <section id="about" class="about-us">
        <h1>about us</h1>
        <div class="container">
            <img src="../assets/images/about-us.png" alt="About">
            <p>
                Welcome to <span>Out Front Spa</span>, your relaxation haven! Our experienced therapists are dedicated
                to providing
                you with a holistic wellness experience. We offer a variety of massage services to address your specific
                needs. We also offer waxing services for smooth, confident skin, and facials designed to cleanse,
                nourish, and revitalize your complexion. Book your appointment today.
                <br><button class="btn-book"><a href="tel:+254112856539">Book Now</a></button>
            </p>
        </div>
    </section>
    <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 1440 300">
        <path fill="#ffffff" fill-opacity="1"
            d="M0,160L48,176C96,192,192,224,288,240C384,256,480,256,576,245.3C672,235,768,213,864,197.3C960,181,1056,171,1152,170.7C1248,171,1344,181,1392,186.7L1440,192L1440,0L1392,0C1344,0,1248,0,1152,0C1056,0,960,0,864,0C768,0,672,0,576,0C480,0,384,0,288,0C192,0,96,0,48,0L0,0Z">
        </path>

    </svg>
    <section class="services" id="services">
        <h1>Our Services</h1>
        <div class="services-container">
            <div class="ct-container first">
                <div>
                    <p class="num">01</p>
                    <h3>Hot Stone Massage</h3>
                    <p class="desc">Involves placing warm, smooth stones on specific parts of the body. The heat helps
                        to
                        relax muscles
                        and enhance the benefits of the massage</p>
                </div>
                <div class="img"><img src="../assets/images/hot-stone-massage.png" alt="Hot Stone Massage"></div>
            </div>

            <div class="ct-container">
                <img src="../assets/images/aromatherapy.png" alt="Aromatherapy">
                <div>
                    <p class="num">02</p>
                    <h3>Aromatherapy Massage</h3>
                    <p class="desc">Combines the benefits of massage with the therapeutic properties of essential oils.
                        The therapist uses aromatic oils during the massage to enhance relaxation and healing</p>
                </div>
            </div>

            <div class="ct-container">
                <div>
                    <p class="num">03</p>
                    <h3>Deep Tissue Massage</h3>
                    <p class="desc">Focuses on the deeper layers of muscle and connective tissue. It involves slower
                        strokes and more intense pressure to reach deep layers of muscles and fascia</p>
                </div>
                <div class="img"><img src="../assets/images/deep-tissue-massage.png" alt="Deep Tissue Massage">
                </div>
            </div>

            <div class="ct-container">
                <img src="../assets/images/swedish-massage.png" alt="Swedish Massage">
                <div>
                    <p class="num">04</p>
                    <h3>Swedish Massage</h3>
                    <p class="desc">It involves long, flowing strokes, kneading, deep circular movements, and tapping.
                        It aims to relax the entire body and improve circulation</p>
                </div>
            </div>

            <div class="ct-container">
                <div>
                    <p class="num">05</p>
                    <h3>Reflexology Massage</h3>
                    <p class="desc">Focuses on applying pressure to specific points on the feet, hands, and ears, which
                        correspond to different organs and systems in the body</p>
                </div>
                <div class="img"><img src="../assets/images/reflexology.png" alt="Reflexology Massage">
                </div>
            </div>

            <div class="ct-container">
                <img src="../assets/images/waxing.png" alt="Waxing">
                <div>
                    <p class="num">06</p>
                    <h3>Waxing</h3>
                    <p class="desc">We provide a comprehensive range of waxing services including eyebrow shaping,
                        facial waxing, underarm waxing, and arm waxing for smooth, hair-free skin. We also provide chest
                        and back waxing for a polished look, bikini and Brazilian waxing for a flawless finish, as well
                        as leg waxing for silky, smooth legs</p>
                </div>
            </div>

            <div class="ct-container">
                <div>
                    <p class="num">07</p>
                    <h3>Facials</h3>
                    <p class="desc">Our facial services include express facials, relaxing facials, deep cleansing
                        facials, and dark spot remover facials . We also provide hydrating facials, face steaming and
                        facial scrubs</p>
                </div>
                <div class="img facials"><img src="../assets/images/facials.png" alt="Facials">
                </div>
            </div>
        </div>
    </section>
    <svg class="svg-services" xmlns="http://www.w3.org/2000/svg" viewBox="0 0 1440 320">
        <path fill="#ffffff" fill-opacity="1"
            d="M0,288L48,272C96,256,192,224,288,197.3C384,171,480,149,576,165.3C672,181,768,235,864,250.7C960,267,1056,245,1152,250.7C1248,256,1344,288,1392,304L1440,320L1440,320L1392,320C1344,320,1248,320,1152,320C1056,320,960,320,864,320C768,320,672,320,576,320C480,320,384,320,288,320C192,320,96,320,48,320L0,320Z">
        </path>

    </svg>
    <section class="why-us-sect">
        <h1>Why Choose Us</h1>
        <div class="container">
            <div class="why-us">
                <img src="../assets/images/quality-assurance.png" alt="Quality Service">
                <h3>Quality Service</h3>
                <hr>
                <div class="overlay">
                    <p>From the moment you step through our doors, you'll encounter a team of highly trained
                        professionals
                        dedicated to delivering exceptional service</p>
                </div>
            </div>

            <div class="why-us">
                <img src="../assets/images/ambience.png" alt="Ambience">
                <h3>Ambience</h3>
                <hr>
                <div class="overlay">
                    <p>From soothing lighting to calming music, every detail has been thoughtfully chosen to enhance
                        your
                        spa experience and promote a sense of peace and well-being</p>
                </div>
            </div>

            <div class="why-us">
                <img src="../assets/images/walk-ins.png" alt="Walk-ins">
                <h3>Walk-ins</h3>
                <hr>
                <div class="overlay">
                    <p>We welcome walk-in appointments, ensuring that you can experience our rejuvenating treatments
                        whenever the mood strikes</p>
                </div>
            </div>

            <div class="why-us">
                <img src="../assets/images/privacy-us.png" alt="Privacy">
                <h3>Privacy</h3>
                <hr>
                <div class="overlay">
                    <p>Our dedicated staff respects your privacy at all times, ensuring that your personal information
                        and
                        preferences are handled with the utmost care</p>
                </div>
            </div>
        </div>
    </section>

    <section id="prices" class="our-prices">
        <h1>Our Prices</h1>
        <div class="container">
            <div class="prices">
                <div>
                    <h3>Service</h3>
                    <h3>Price(Kes per Hour)</h3>
                </div>
                <div>
                    <p>Swedish Massage</p>
                    <p>3,500</p>
                </div>
                <hr>
                <div>
                    <p>Deep Tissue Massage</p>
                    <p>4,000</p>
                </div>
                <hr>
                <div>
                    <p>Hot Stone Massage</p>
                    <p>7,500</p>
                </div>
                <hr>
                <div>
                    <p>Aromatherapy Massage</p>
                    <p>5,000</p>
                </div>
                <hr>
                <div>
                    <p>Reflexology</p>
                    <p>4,500</p>
                </div>
                <hr>
                <div>
                    <p>Thai Massage</p>
                    <p>5,000</p>
                </div>
                <hr>
                <div>
                    <p>Sports Massage</p>
                    <p>4,000</p>
                </div>
                <hr>
                <div>
                    <p>4 Hand Tandem Massage</p>
                    <p>6,500</p>
                </div>
                <hr>
                <div>
                    <p>Home / Hotel Services</p>
                    <p>10,000</p>
                </div>
                <hr>

            </div>
            <div class="img-price">
                <img src="../assets/images/our-prices.png" alt="">
            </div>
        </div>
    </section>

    <footer>
        <div>
            <img src="../assets/logo3.png" alt="Logo">
        </div>
        <div class="contact-details">
            <div class="about">
                <h3>About Outfront Spa</h3>
                <p>We offer a variety of massage services to address your specific needs. We also offer waxing services
                    for smooth, confident skin, and facials designed to cleanse, nourish, and revitalize your complexion
                </p>
                <span><a href="ig">Instagram</a><a href="fb">Facebook</a></span>
            </div>
            <div class="details">
                <div class="links">
                    <a href="#">Home</a>
                    <a @click="navigateToHome('about')">About</a>
                    <a @click="navigateToHome('about')">Services</a>
                    <a @click="router.push({ name: 'shop' })">Shop</a>
                </div>
                <div class="location">
                    <p>Maralal Oasis, Argwings Kodhek Rd, Nairobi</p>
                    <p>Mon - Fri (9AM - 8PM)</p>
                    <p>0112856539 / 0711265193</p>
                    <p>info@outfrontspa.com</p>
                </div>
            </div>
        </div>
        <div class="footer-copyright">
            <span>&copy;</span> Outfront Spa {{ currentYear }}. All rights reserved
        </div>
        <img class="lotus-bg" src="../assets/images/lotus.png" alt="">
    </footer>
</template>