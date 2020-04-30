<template>
    <StackLayout class="contact-form card">
        <TextField hint="Your name" editable="true" />
        <TextField hint="Your email" />
        <TextView hint="Enter your message here..."/>
        <Button text="Submit" />
    </StackLayout>
</template>

<script>
import API from '../API';

export default {
    props: ["id"],

}

</script>

<style scoped>
    .contact-form {
        padding: 20 15;
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