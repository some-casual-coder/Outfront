<template>
    <Navbar />
    <div class="checkout">
        <h1>Checkout</h1>
        <div class="checkout-page">
            <form @submit="handleSubmit">
                <div>
                    <label>
                        <input type="checkbox" v-model="isPickupAtOffices"> Pickup at Offices
                    </label>
                </div>
                <input type="tel" v-model="phoneNumber" placeholder="Phone Number" required>
                <input type="email" v-model="email" placeholder="Email" required>
                <input type="text" v-model="town" placeholder="Town" :required="!isPickupAtOffices"
                    :disabled="isPickupAtOffices">
                <input type="text" v-model="county" placeholder="County" :required="!isPickupAtOffices"
                    :disabled="isPickupAtOffices">
                <input type="text" v-model="suburb" placeholder="Suburb" :required="!isPickupAtOffices"
                    :disabled="isPickupAtOffices">
                <textarea v-model="additionalNotes" placeholder="Additional Notes"
                    :required="!isPickupAtOffices"></textarea>
                <button type="submit" :disabled="!isFormValid">Save</button>
            </form>
            <div v-if="showModal" class="checkout-details">
                <h3>Contact Details</h3>
                <p><span>{{ phoneNumber }}</span> <span>{{ email }}</span></p>
                <h1>Address Details</h1>
                <p>{{ suburb }}, {{ town }}, {{ county }}</p>
            </div>
            <div class="payment-options">
                <h2>Select Payment Method</h2>
                <div class="radio-tile-group">
                    <div v-for="option in paymentOptions" :key="option.id" class="input-container">
                        <input :id="option.id" class="radio-button" type="radio" :value="option.value"
                            v-model="selectedOption" name="paymentType" />
                        <div class="radio-tile">
                            <div :class="['icon']">
                                <img :src="option.imageSrc" :alt="option.label + ' Logo'">
                            </div>
                            <label :for="option.id" class="radio-tile-label">{{ option.label }}</label>
                        </div>
                    </div>
                </div>
                <p>{{ paymentOptions.find(option => option.value === selectedOption)?.description }}</p>
            </div>
        </div>
        <p>Total to Pay: Kes{{ checkoutTotal }}</p>
        <button @click="makePayment" :disabled="!selectedOption || !isFormValid">Make Payment</button>
    </div>
</template>

<script>
import { defineComponent, onMounted } from 'vue';
import Navbar from '@/components/Navbar.vue';
import iPayLogo from '@/assets/images/ipay.png';
import sasapayLogo from '@/assets/images/sasapay.png';

export default defineComponent({
    name: 'CheckoutView',
    components: {
        Navbar,
    },
    data() {
        return {
            isPickupAtOffices: false,
            phoneNumber: '',
            email: '',
            town: '',
            county: '',
            suburb: '',
            additionalNotes: '',
            showModal: false,
            selectedOption: null,
            paymentOptions: [
                {
                    id: "iPay",
                    value: "1",
                    label: "iPay",
                    imageSrc: iPayLogo,
                    description: "You will be redirected to the iPay dashboard to complete your payment"
                },
                {
                    id: "sasapay",
                    value: "2",
                    label: "Sasapay",
                    imageSrc: sasapayLogo,
                    description: "You will be redirected to log in to your SasaPay account and complete the payment"
                },
            ]
        }
    },
    computed: {
        isFormValid() {
            if (this.isPickupAtOffices) {
                return this.phoneNumber && this.email;
            } else {
                return this.phoneNumber && this.email && this.town && this.county && this.suburb;
            }
        }
    },
    methods: {
        handleSubmit(event) {
            event.preventDefault();
            if (this.isPickupAtOffices) {
                this.saveDetails();
            } else {
                this.saveDetails();

            }
        },

        saveDetails() {
            const formData = {
                isPickupAtOffices: this.isPickupAtOffices,
                phoneNumber: this.phoneNumber,
                email: this.email,
                additionalNotes: this.additionalNotes
            }

            if (!this.isPickupAtOffices) {
                formData.town = this.town
                formData.county = this.county
                formData.suburb = this.suburb
            }
            // this.$emit('form-submitted', formData)
            this.showModal = true;
            console.log(formData);
        },

        proceedToPayment() {
            console.log("Paying...");
        }
    },
    watch: {
        isPickupAtOffices(newValue) {
            if (newValue) {
                this.town = ''
                this.county = ''
                this.suburb = ''
            }
        }
    }
})

</script>

<script setup>
import { ref, onMounted } from 'vue';

const checkoutTotal = ref(0);

onMounted(() => {
    const total = sessionStorage.getItem('checkoutTotal');
    if (total) {
        checkoutTotal.value = parseFloat(total);
    }

    // Optional: Clear the total from session storage after retrieving it
    // sessionStorage.removeItem('checkoutTotal');
});
</script>

<style scoped>
.d-none {
    display: none;
}

.container {
    margin-top: 30px;
    display: flex;
    justify-content: center;
    align-items: center;
}

.radio-tile-group {
    display: flex;
    flex-wrap: wrap;
    justify-content: center;
}

.radio-tile img {
    width: 100px;
}

.radio-tile-group .input-container {
    position: relative;
    height: 7rem;
    width: 7rem;
    margin: 0.5rem;
}

.radio-tile-group .input-container .radio-button {
    opacity: 0;
    position: absolute;
    top: 0;
    left: 0;
    height: 100%;
    width: 100%;
    margin: 0;
    cursor: pointer;
}

.radio-tile-group .input-container .radio-tile {
    display: flex;
    flex-direction: column;
    align-items: center;
    justify-content: center;
    width: 100%;
    height: 100%;
    border: 2px solid #079ad9;
    border-radius: 5px;
    padding: 1rem;
    transition: transform 300ms ease;
}

.radio-tile-group .input-container .icon svg {
    fill: #079ad9;
    width: 3rem;
    height: 3rem;
}

.radio-tile-group .input-container .radio-tile-label {
    text-align: center;
    font-size: 0.75rem;
    font-weight: 600;
    text-transform: uppercase;
    letter-spacing: 1px;
    color: #079ad9;
}

.radio-tile-group .input-container .radio-button:checked+.radio-tile {
    background-color: #079ad9;
    border: 2px solid #079ad9;
    color: white;
    transform: scale(1.1, 1.1);
}

.radio-tile-group .input-container .radio-button:checked+.radio-tile .icon svg {
    fill: white;
    background-color: #079ad9;
}

.radio-tile-group .input-container .radio-button:checked+.radio-tile .radio-tile-label {
    color: white;
    background-color: #079ad9;
}
</style>