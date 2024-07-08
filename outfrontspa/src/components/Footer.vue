<template>
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
                <span><a href="https://www.tiktok.com/@outfrontspa">Tiktok</a><a
                        href="https://www.instagram.com/outfrontspa_ke">Instagram</a><a
                        href="https://www.facebook.com/people/Out-Front-Spa/61560987871845/?mibextid=ZbWKwL">Facebook</a></span>
            </div>
            <div class="details">
                <div class="links">
                    <a @click="navigateToHome('home')">Home</a>
                    <a @click="navigateToHome('about')">About</a>
                    <a @click="navigateToHome('services')">Services</a>
                    <a @click="router.push({ name: 'shop' })">Shop</a>
                </div>
                <div class="location">
                    <p>4<sup>th</sup> Floor, Maralal Oasis, Argwings Kodhek Rd, Nairobi</p>
                    <p>OPEN 24/7</p>
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

<script>

export default {
    name: 'Footer',
    computed: {
        currentYear() {
            return new Date().getFullYear();
        }
    }
};
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

<style scoped>
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
                border: 2px solid white;
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

            & span a:nth-child(2):hover {
                border: 2px solid #de2662;
                background-color: #de2662;
                color: white;
            }

            & span a:nth-child(3):hover {
                border: 2px solid #1877F2;
                background-color: #1877F2;
                color: white;
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
                        cursor: pointer;
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
    }
}

@media only screen and (max-width: 600px) {
    footer {
        padding: 10px 15px 20px 15px;
        text-align: center;

        &>div:first-child {
            & img {
                width: 200px;
            }
        }

        & .contact-details {
            flex-direction: column;
            align-items: flex-start;

            & .about {
                width: 100%;
                text-align: justify;

                & h3 {
                    text-align: center;
                }

                & span a {
                    padding: 8px 20px;
                    /* margin: 5px 7px 0 0; */
                }

                & span a:nth-child(3) {
                    margin-right: 0;
                }
            }

            & .details {
                flex-direction: column-reverse;

                & .location {
                    margin-top: 15px;
                    text-align: left;
                }

                & .links {
                    flex-direction: row;
                    justify-content: center;
                    margin-bottom: 15px;

                    & a {
                        color: orange;
                    }
                }
            }
        }
    }
}
</style>
