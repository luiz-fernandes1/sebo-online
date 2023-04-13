<template>
    <h1>Bem vindo de volta!</h1>
    <LoginForm />
    <div class="has-account-span">
        <span>Ainda não possui uma conta? </span>
        <router-link to="/register">Cadastre-se</router-link>
    </div>
</template>

<script>
import LoginForm from '@/components/LoginForm.vue';

export default {
    name: 'LoginView',
    components: {
        LoginForm
    }
}

</script>

<style>

.has-account-span {
    margin-top: 10px;
}

</style>