<template>
    <StackLayout class="contact-form card">
        <Label :text="errorMessage" v-if="errorMessage" class='error-message' />
        <Label :text="successMessage" v-if="successMessage" class='success-message' />

        <TextField hint="Your name" editable="true" :text="name" />
        <TextField hint="Your phone or email" :text="reply_to" />
        <TextView hint="Enter your message here..." :text="message" />
        <ActivityIndicator :busy="isBusy" />
        <Button text="Submit" v-if="!isBusy" @tap="submitLead()" />
    </StackLayout>
</template>

<script>
import API from '../API';

export default {
    props: ["id"],
    data: function() {
        return {
            isBusy: false,
            isSent: false,
            errorMessage: false,
            successMessage: false,
            name: "",
            reply_to: "",
            message: ""
        }
    },
    methods: {
        async submitLead() {
            this.isBusy = true;
            try {
                res = await API.post("cars/" + this.id + "/contact", {
                    name: this.name,
                    reply_to: this.reply_to,
                    message: this.message
                });
            } catch(e) {
                this.errorMessage = "Failed to submit lead. Please try later...";
            } finally {
                this.isBusy = false;
            }
            this.successMessage = "Your message was sent!";

        }
    }
}

</script>

<style scoped>
    .contact-form {
        padding: 15 15;
    }
    .contact-form TextField, .contact-form TextView {
        color: black;
        border-width: 1;
        border-color: gray;
        margin: 5 0;
        padding: 5 10;
    }
    .contact-form TextView {
        height: 70;
    }
    Button {
        border-width: 1;
        border-color: #2e8a58;
        background-color: #53ba82;
        color: white;
        font-weight: bold;
        padding: 10 10;
        margin-top: 10;
    }
</style>