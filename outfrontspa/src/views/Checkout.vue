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
                <div v-if="showRefundPolicyModal" class="modal" @click="closeRefundPolicyModal">
                    <div class="modal-content" @click.stop>
                        <h3>Refund Policy for Outfront Spa Limited</h3>
                        <div v-html="refundPolicyText"></div>
                        <!-- <button @click="closeRefundPolicyModal">Close</button> -->
                        <div class="refund-policy-agreement">
                            <input type="checkbox" id="refundPolicyAgreement" v-model="agreedToRefundPolicy">
                            <label for="refundPolicyAgreement">
                                I accept the terms and conditions outlined above
                            </label>
                        </div>
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
import Footer from '@/components/Footer.vue';
import iPayLogo from '@/assets/images/ipay.png';
import sasapayLogo from '@/assets/images/sasapay.png';

export default defineComponent({
    name: 'CheckoutView',
    components: {
        Navbar,
        Footer,
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
            refundPolicyText: `
        <p>At Outfront Spa Limited, we strive to ensure you have a positive experience every time you engage with our services or purchase our products. However, we understand that there may be occasions when you wish to return items. This Refund Policy outlines the conditions under which we accept returns and issue refunds for items purchased from Outfront Spa Limited. It also specifies when returns will not be accepted or refunds issued.</p>
        
        <h4>1. Return Period and Conditions for Acceptance of Returns</h4>
        <p>Subject to the rules set out in this Refund Policy, Outfront Spa Limited offers returns for most items within 14 days of purchase or delivery ("the returns period"). We do not accept returns, for any reason whatsoever, after the returns period has lapsed. This does not affect your legal rights. You may return items purchased from Outfront Spa Limited within the returns period for the reasons listed below.</p>
        
        <table>
          <tr>
            <th>Reason for Return</th>
            <th>Applicable Product Category</th>
          </tr>
          <tr>
            <td>I changed my mind</td>
            <td>All product categories except: skincare products, fragrances, hair care, personal care items (e.g., combs, brushes), spa treatment packages</td>
          </tr>
          <tr>
            <td>Size is correct but doesn't fit as expected</td>
            <td>Clothing items only</td>
          </tr>
          <tr>
            <td>Item received broken or defective</td>
            <td>All product categories</td>
          </tr>
          <tr>
            <td>Packaging was damaged</td>
            <td>All product categories</td>
          </tr>
          <tr>
            <td>Item received with missing parts or accessories</td>
            <td>All product categories</td>
          </tr>
          <tr>
            <td>Item received used or expired</td>
            <td>All product categories except digital products</td>
          </tr>
          <tr>
            <td>Item seems to be fake / unauthentic</td>
            <td>All product categories</td>
          </tr>
          <tr>
            <td>Wrong item / color / size / model</td>
            <td>All product categories</td>
          </tr>
        </table>
        
        <p>We will only accept returns of items that are unused and in the same condition you received them, with their original packaging and seal intact where applicable, unless the item became defective or damaged after reasonable use (in accordance with manufacturers' guidelines where applicable) during the returns period.</p>
        
        <h4>2. Items That Cannot Be Returned</h4>
        <p>We do not accept returns of certain product categories for health and hygiene reasons. Customer safety is paramount to us, so certain product categories cannot be returned due to health and hygiene reasons, or if they may deteriorate or expire rapidly. You shall only be entitled to return and refund in respect of these items if you received the wrong item, a damaged or defective item, or a fake or inauthentic item. You are not entitled to a refund or return of these product categories if you have changed your mind.</p>
        
        <p><strong>We do not accept returns of customized items.</strong> We do not accept returns of goods made, configured, or inscribed to your specification (e.g., personalized engravings, embroidery). We will only accept returns if the items are damaged or defective upon arrival, or materially different from what was ordered.</p>
        
        <p><strong>We do not accept returns of items that you have damaged after delivery.</strong> We do not accept returns of used or worn items, unless the reason for return is that the item stopped working or became damaged or defective after reasonable use (in accordance with manufacturers' guidelines where applicable) during the returns period.</p>
        
        <h4>3. Packaging Returns</h4>
        <p>When returning an item for any reason, you must do so in the exact condition you received it from Outfront Spa Limited, with its original packaging and all tags and labels attached. Returned items are your responsibility until they reach us, so please ensure they are packaged properly and cannot get damaged on the way. You must not include in the packaging with the returned item any item not pertaining to the returned item as originally received from Outfront Spa Limited.</p>
        
        <h4>4. Refunds</h4>
        <p>If we accept your return, or if you order but do not receive an item, we aim to refund you the purchase price of the item within 14 days of receiving your returned item. For incorrect, defective, or damaged items, you will also be refunded for the full cost of delivery of the returned items, once your return is processed. If the return is not the result of an error by Outfront Spa Limited (e.g., you changed your mind or the size does not fit as expected), you will not receive any refund on delivery fees. The refund request form will state which payment methods for receipt of refunds are available to you.</p>
        
        <h4>5. Rejected Return and Refund Requests</h4>
        <p>All items are inspected on return to verify the return reasons provided. If your return request is not approved by Outfront Spa Limited, you will not receive any refund of the purchase price or the delivery fees, and we will make 2 attempts to redeliver within 7 business days. If both re-delivery attempts are unsuccessful, we will notify you immediately and hold the item for a further 30 days from the date of the initial notification. Our notification will include details about the pick-up location and opening hours. If you do not collect the item within the required period, you will forfeit the item, and it will become the property of Outfront Spa Limited. We may dispose of it in any manner we deem appropriate, such as by sale, charitable donation, recycling, or destruction.</p>
        
        <h4>6. No Exchange</h4>
        <p>We do not offer exchanges. If you would like a different size or color, please return your unwanted item and place a new order.</p>
        
        <p>For further inquiries, please contact our customer service team at <a href="mailto:support@outfrontspaltd.com">support@outfrontspa.com</a> or call us at +254 112 856 539.</p>
        
        <style>
        .modal-content table {
            width: 100%;
            border-collapse: collapse;
            margin: 20px 0;
        }

        .modal-content th,
        .modal-content td {
            border: 1px solid #ddd;
            padding: 8px;
            text-align: left;
        }

        .modal-content th {
            background-color: #f2f2f2;
            font-weight: bold;
        }

        </style>
        
        `,
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
        },

        agreedToRefundPolicy(newValue) {
            if (newValue) {
                this.showRefundPolicyModal = false;
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
    display: flex;
    justify-content: center;
    align-items: center;
    left: 0;
    top: 0;
    width: 100%;
    height: 100%;
    background-color: rgba(0, 0, 0, 0.4);
}

.modal-content {
    position: fixed;
    background-color: #fefefe;
    padding: 20px;
    border: 1px solid #888;
    width: 60%;
    height: 70%;
    overflow: auto;
    z-index: 1;
    border-radius: 5px;

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