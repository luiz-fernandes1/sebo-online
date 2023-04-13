<template>
    <div class="home">
        <Header />
        <Profile />
    </div>
</template>

<script>
import Header from '@/components/Header.vue'
import Profile from '@/components/Profile.vue'

export default {
    name: 'ProfileView',
    components: {
        Header,
        Profile
    }
}

</script>

<style>

.home {
    background-color: #FAFAFA;
    height: 100%;
}

</style>