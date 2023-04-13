<template>
    <h1>Seja bem vindo</h1>
    <RegistrationForm />
    <div class="has-account-span">
        <span>Já possui uma conta? </span>
        <router-link to="/login">Login</router-link>
    </div>
</template>

<script>
import RegistrationForm from '@/components/RegistrationForm.vue';

export default {
    name: 'RegistrationView',
    components: {
        RegistrationForm
    }
}

</script>

<style>

.has-account-span {
    margin-top: 10px;
}

</style>