<template>
    <Navbar />
    <div class="checkout">
        <h2>Contact Details</h2>
        <div class="checkout-page">
            <div class="checkout-container">
                <form @submit="handleSubmit">
                    <div>
                        <label>
                            <input type="checkbox" v-model="isPickupAtOffices"> Pickup at Offices
                        </label>
                    </div>
                    <div class="contacts-container">
                        <div>
                            <input type="text" v-model="town" placeholder="Town" :required="!isPickupAtOffices"
                                :disabled="isPickupAtOffices">
                            <input type="text" v-model="county" placeholder="County" :required="!isPickupAtOffices"
                                :disabled="isPickupAtOffices">
                            <input type="text" v-model="suburb" placeholder="Suburb" :required="!isPickupAtOffices"
                                :disabled="isPickupAtOffices">
                        </div>
                        <div>
                            <input type="tel" v-model="phoneNumber" placeholder="Phone Number" required>
                            <input type="email" v-model="email" placeholder="Email" required><br>
                            <textarea v-model="additionalNotes" placeholder="Additional Notes"
                                :required="!isPickupAtOffices"></textarea>
                        </div>
                    </div>
                    <button type="submit" :disabled="!isFormValid">Save</button>
                </form>
                <div v-if="showModal" class="checkout-details">
                    <h3>Contacts</h3>
                    <p><span>{{ phoneNumber }}</span> <span>({{ email }})</span></p>
                    <h3>Address</h3>
                    <p>{{ suburb }}, {{ town }}, {{ county }}</p>
                </div>
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
                <div class="refund-policy-agreement">
                    <input type="checkbox" id="refundPolicyAgreement" v-model="agreedToRefundPolicy">
                    <label for="refundPolicyAgreement">
                        By continuing with this payment I agree to the <a href="#"
                            @click.prevent="openRefundPolicyModal">Refund Policy</a>
                    </label>
                </div>
                <!-- Refund Policy Modal -->
                <div v-if="showRefundPolicyModal" class="modal">
                    <div class="modal-content">
                        <h3>About Refunds and Returns</h3>
                        <p>{{ refundPolicyText }}</p>
                        <button @click="closeRefundPolicyModal">Close</button>
                    </div>
                </div>
                <!-- <p>{{ paymentOptions.find(option => option.value === selectedOption)?.description }}</p> -->
            </div>
        </div>
        <p class="toPay"><span>Total to Pay:</span> <span>${{ checkoutTotal }}</span></p>
        <div class="makePayment">
            <button @click="proceedToPayment" :disabled="!selectedOption || !isFormValid || !agreedToRefundPolicy">Make
                Payment</button>
        </div>
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
            agreedToRefundPolicy: false,
            showRefundPolicyModal: false,
            refundPolicyText: `Refund Policy for Outfront Spa \n

1. Service Discrepancy:
   If there is a significant discrepancy between the services described or images displayed and the actual services provided, please report this to our staff within 2 hours of your appointment start time. We will arrange for appropriate remediation, which may include providing the correct service, offering an alternative service of equal value, or issuing a refund.
<br>
2. Cancellations:
   - For cancellations received 24 hours or more before your scheduled appointment, 80% of the booking fee will be refunded.
   - To request a refund, please fill out our refund form available on our website and submit it to the address provided below.
   - Refunds will be processed within three working days from the date of receipt of the completed form.
<br>
3. Quality of Service:
   If you experience any issues with the quality of our services, please inform our staff immediately. We will make every effort to rectify the situation. If a satisfactory resolution cannot be reached, we may offer a partial or full refund, or a credit for future services, at our discretion.
<br>
4. Change of Mind:
   We do not normally provide refunds if you simply change your mind or make the wrong decision. We encourage our clients to carefully consider their choices before booking.
<br>
5. Gift Certificates and Prepaid Services:
   Gift certificates and prepaid services are non-refundable but may be transferable to another person or service, subject to our approval.
<br>
Please note: This refund policy applies to spa services only. For product purchases, please refer to our separate product return policy.
<br>
For all refund requests and inquiries, please contact:<br>
Outfront Spa<br>
Maralal Oasis, Argwings Kodhek Rd, Nairobi<br>
0112856539 / 0711265193<br>
info@outfrontspa.com<br>

We strive to ensure your complete satisfaction with our services and will address any concerns promptly and fairly.`,
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
            return (this.isPickupAtOffices ?
                (this.phoneNumber && this.email) :
                (this.phoneNumber && this.email && this.town && this.county && this.suburb)) &&
                this.agreedToRefundPolicy;
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
            if (this.selectedOption && this.isFormValid && this.agreedToRefundPolicy) {
                console.log("Processing payment...");
                // Implement your payment logic here
            }
        },

        openRefundPolicyModal() {
            this.showRefundPolicyModal = true;
        },
        closeRefundPolicyModal() {
            this.showRefundPolicyModal = false;
        },

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
.checkout {
    width: 85%;
    margin: auto;
    margin-top: 50px;
    font-family: 'Roboto', sans-serif;

    & h2 {
        font-family: 'Playwrite ES';
        text-align: center;
        color: #ff6e01;
    }
}

.checkout-container {
    display: flex;
    justify-content: space-around;
    align-items: flex-start;

    & button {
        padding: 8px 15px;
        border: 1px solid rgb(130, 130, 130);
        border-radius: 8px;
        font-weight: 600;
        background-color: white;
        transition: all 0.3s ease-in-out;

        &:hover {
            cursor: pointer;
            background-color: #ffeada;
            border: 1px solid #ffeada;
        }
    }

    & button:disabled:hover {
        cursor: not-allowed;
    }
}

.checkout-details {
    padding: 20px 30px;
    border-radius: 10px;
    box-shadow: rgba(50, 50, 93, 0.25) 0px 2px 5px -1px, rgba(0, 0, 0, 0.3) 0px 1px 3px -1px;

    & h3 {
        color: #ff6e01;
    }
}

.contacts-container {
    margin-top: 10px;

    & input,
    textarea {
        border: 1px solid #ff6e01;
        margin: 0;
        margin-right: 10px;
        margin-bottom: 15px;
        padding: 10px 15px;
        border-radius: 7px;
        font-size: 1rem;
    }
}

.d-none {
    display: none;
}

.radio-tile-group {
    display: flex;
    flex-wrap: wrap;
    justify-content: center;
}

.radio-tile img {
    width: 170px;
}

.radio-tile-group .input-container {
    position: relative;
    height: 6rem;
    width: 14rem;
    margin: 0.5rem 3.5rem;
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
    border: 2px solid #ff6e01;
    border-radius: 5px;
    padding: 1rem;
    transition: transform 300ms ease;
}

.radio-tile-group .input-container .radio-tile-label {
    text-align: center;
    font-size: 0.75rem;
    font-weight: 600;
    text-transform: uppercase;
    letter-spacing: 1px;
    color: black;
}

.radio-tile-group .input-container .radio-button:checked+.radio-tile {
    background-color: #4caf50;
    border: 2px solid #4caf50;
    color: white;
    transform: scale(1.05, 1.05);
}

.radio-tile-group .input-container .radio-button:checked+.radio-tile .icon svg {
    fill: white;
    background-color: #4caf50;
}

.radio-tile-group .input-container .radio-button:checked+.radio-tile .radio-tile-label {
    color: white;
    background-color: #4caf50;
}


.modal {
    position: fixed;
    z-index: 1;
    left: 0;
    top: 0;
    width: 100%;
    height: 100%;
    overflow: auto;
    background-color: rgba(0, 0, 0, 0.4);
}

.modal-content {
    background-color: #fefefe;
    margin: 15% auto;
    padding: 20px;
    border: 1px solid #888;
    width: 80%;
    border-radius: 10px;

    & button {
        background-color: white;
        border: 1px solid black;
        border-radius: 5px;
    }
}

.refund-policy-agreement {
    margin-top: 50px;
    margin-bottom: 20px;
    text-align: center;
}

.toPay {
    display: flex;
    justify-content: space-between;
    width: 50%;
    margin: auto;
    font-size: 1.3rem;
    font-weight: 1000;
}

.makePayment {
    margin: auto;
    text-align: center;
    margin-bottom: 100px;
    margin-top: 20px;

    & button {
        padding: 10px 20px;
        border: 3px solid #ff6e01;
        color: #ff6e01;
        font-size: 1.1rem;
        border-radius: 5px;
        transition: all 0.3s ease-in-out;

        &:hover {
            cursor: pointer;
            background-color: #ff6e01;
            color: white;
        }
    }

    & button:disabled {
        border: 3px solid #888;
        color: #888;

        &:hover {
            cursor: not-allowed;
            background-color: white;
            color: #888;
        }
    }
}
</style>