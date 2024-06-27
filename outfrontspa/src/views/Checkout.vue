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

    <p><strong>Introduction</strong></p>
    <p>By reading this notice, you agree to be bound by the following terms and conditions. Please read them carefully. Your usage of this notice indicates your acceptance and understanding of these terms and conditions. If you purchase or seek services from Outfront Spa Limited, it indicates your acceptance and understanding of these terms and conditions.</p>

    <p><strong>Disclaimer for Products Sold</strong></p>
    <p>Except as expressly stated herein, Outfront Spa Limited makes no representations or warranties, either express or implied, of any kind with respect to products sold. In no event shall Outfront Spa Limited, its Directors, Employees, and Representatives be liable for direct, indirect, consequential, or punitive damages related to the products and services sold.</p>

    <p><strong>About Services</strong></p>
    <p>Outfront Spa Limited offers a range of spa services and sells spa-related items to enhance your spa experience. Our commitment is to provide exceptional customer service and ensure your satisfaction with our services and products.</p>

    <p><strong>Payment & Payment Methods</strong></p>
    <p>All prices displayed for services and products are in Kenya Shillings or United States dollars (USD) and are inclusive of VAT.</p>
    <p>We accept the following payment methods:</p>
    <ul>
      <li>Visa & MasterCard credit cards</li>
      <li>Mobile payments from local providers (each business outlet has a unique paybill number)</li>
      <li>Cheque and Banker’s Draft (service delivery upon clearance, within 5 working days)</li>
    </ul>
    <p> To protect your security and to prevent credit card fraud where possible, we reserve the right for proof of Identity on ALL purchases.</p>
    <p>We also accept payment via Cheque and Banker’s Draft but deliveries will only be made once the Cheque or Banker’s Draft clears from the bank within 5 working days</p>
    <p>All Cheques or Bankers Draft must be made out in the name SKY-SWIFT LIMITED</p>
    <p>We accept Mobile payments from local mobile providers ,To protect your security and to prevent mobile fraud where possible, we have provided unique paybill numbers for each business outlet to receive payments. We reserve the right for proof of Identity on ALL purchases.</p>
    <p>Payment in full (including finalization of any lay-by arrangements) is required prior to extending service and payment after service delivery cannot be accepted.</p>

    <p><strong>About Refunds & Returns</strong></p>
    <ol>
      <li>
        <p><strong>Service Discrepancy:</strong> If there is a significant discrepancy between the service described or images displayed and the actual service provided, please report this to our staff within 2 hours of your appointment start time. We will arrange for appropriate remediation, which may include providing the correct service, offering an alternative service of equal value, or issuing a refund.</p>
      </li>
      <li>
        <p><strong>Cancellations:</strong> For cancellations received 24 hours or more before your scheduled appointment, 80% of the booking fee will be refunded. To request a refund, please fill out our refund form downloadable from the Outfront Spa Limited website and submit it to the address provided below. Refunds will be processed within three working days from the date of receipt of the completed form.</p>
      </li>
      <li>
        <p><strong>Quality of Service:</strong> If you experience any issues with the quality of our services, please inform our staff immediately. We will make every effort to rectify the situation. If a satisfactory resolution cannot be reached, we may offer a partial or full refund, or a credit for future services, at our discretion.</p>
      </li>
      <li>
        <p><strong>Change of Mind:</strong> We do not normally provide refunds if you simply change your mind or make the wrong decision. We encourage our clients to carefully consider their choices before booking.</p>
      </li>
      <li>
        <p><strong>Product Purchases:</strong> Products purchased from Outfront Spa Limited may be eligible for exchange or refund if they are faulty, wrongly described, different from the sample shown, or do not perform their intended function. Please contact us promptly to discuss any issues with purchased products.</p>
      </li>
    </ol>

    <p><strong>Bookings</strong></p>
    <p>Services purchased will not be reserved until a minimum of 50% of the invoice value has been paid.</p>

    <p><strong>Storage & Delivery</strong></p>
    <p>For goods purchased the maximum storage time in our warehouse is not more than 14 days as delays in paying for delivery by you results in us incurring additional storage and insurance costs.</p>
    <p>In the event that you fail to make full payment 48hrs to delivery after notification by us, we will charge you for those costs at a rate of USD. 1,000/= per day per order.</p>

    <p><strong>Why Your Contact Details are Important!</strong></p>
    <p>We want to make sure you receive your service as soon as possible. Please be sure to provide your exact email address and telephone number. Incorrect information may cause a delay in processing your purchases.</p>
    <p>Please note the Sales Staff name and the date of orders placed / purchase for any future query.</p>

    <p><strong>Product and Service Availability</strong></p>
    <p>All products and services are subject to availability.</p>

    <p><strong>Images</strong></p>
    <p>Outfront Spa Limited strives to ensure that images of products and services displayed on the website closely represent the actual service provided. Minor variations may occur due to maintenance; however, these will not compromise the quality of service.</p>

    <p><strong>Pricing Policy</strong></p>
    <p>We maintain a competitive pricing policy for our products and services.</p>

    <p><strong>Customer Service</strong></p>
    <p>For any inquiries or to discuss your purchase, please contact:</p>
    <ul>
      <li>Booking: +254 733 555 576</li>
      <li>Main Office: +254 733 555 504</li>
      <li>Customer Service Department, Outfront Spa Limited, Maralal Oasis, Argwings Kodhek Rd, Nairobi, Kenya</li>
      <li>Email: info@outfrontspa.com</li>
    </ul>

    <p>In all cases, remedies offered by us shall not affect your statutory rights or our statutory responsibilities.</p>

    <p><em>E&OE</em> (Errors & Omissions Excepted)</p>
        
        <style>
.refund-policy {
  font-family: Arial, sans-serif;
  line-height: 1.6;
  margin: 20px;
}

.policy-section {
  margin-bottom: 20px;
}

.policy-section h3 {
  font-size: 20px;
  color: #333;
  border-bottom: 2px solid #ccc;
  padding-bottom: 5px;
  margin-bottom: 10px;
}

.policy-section p, .policy-section ul {
  font-size: 16px;
  color: #666;
}

.policy-section ul {
  list-style-type: none;
  padding-left: 0;
}

.policy-section ul li {
  margin-bottom: 5px;
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