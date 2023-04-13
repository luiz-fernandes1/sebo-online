<template>
    <div class="announce_book_container">
        <div class="announce_book_header">
            <div class="back_btn" @click="click_back_btn">
                <font-awesome-icon :icon="['fas', 'arrow-left']" :style="{ fontSize: '20px' }"></font-awesome-icon>
            </div>
            <h1>Anuncie um Livro</h1>
        </div>
        <AnnounceBookForm />
    </div>
</template>

<script>
    import AnnounceBookForm from '@/components/AnnounceBookForm.vue';
    import router from '@/router';
    import { FontAwesomeIcon } from '@fortawesome/vue-fontawesome';

    export default {
        name: 'AnnounceBookView',
        components: {
            AnnounceBookForm,
            FontAwesomeIcon
        },
        methods: {
            click_back_btn() {
                router.push({ path: '/' });
            }
        }
    }
</script>

<style scoped>
    .announce_book_container {
        display: flex;
        flex-direction: column;
        align-items: center;
        justify-content: center;
        width: 33rem;
        height: 95vh;
        margin: 0 auto;
        overflow: hidden;
    }
    .announce_book_header {
        display: flex;
        justify-content: flex-start;
        align-items: center;
        width: 28rem;
        margin-bottom: 25px;
    }

    h1 {
        margin: 0 auto;
    }

    .back_btn:hover {
        cursor: pointer;
    }

</style>