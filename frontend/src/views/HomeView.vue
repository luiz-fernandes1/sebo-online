<template>
    <div class="home">
        <Header/>
        <Catalog/>
    </div>
</template>

<script>
import Header from '@/components/Header.vue'
import Catalog from '@/components/Catalog.vue';

export default {
    name: 'HomeView',
    components: {
        Header,
        Catalog
    }
}

</script>

<style>

.home {
    background-color: #FAFAFA;
    height: 100%;
}

</style>