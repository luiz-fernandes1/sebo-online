<template>
    <div>
        <Header/>

        <template v-if="verifyUser">
            <div class="home">
                <h1>Teste</h1>
            </div>
        </template>

        <template v-else>
            <h1>Não tente acessar o carrinho de outro usuário :)</h1>
        </template>
    </div>

</template>

<script>
import Header from '@/components/Header.vue'

export default {
    name: 'CarrinhoView',
    components: {
        Header
    },
    computed: {
        verifyUser() {
            const reqId = this.$route.params.id;
            const idStorage = localStorage.getItem('id');

            if (reqId == idStorage) return true;
            else return false
        }
    }
}
</script>

<style scoped>
   
</style>