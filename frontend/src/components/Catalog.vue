<template>
    <div class="catalog">
        <div class="header_catalog">
            <h1>Catálogo</h1>
            <template v-if="isLoggedIn">
                <button @click="handleAnnounceBook" class="btn_announce_book">Anunciar Livro</button>
            </template>
        </div>
        
        <div class="books">
            <template v-for="book in announcedBooks" :key="book._id">
                <Book :book="book" @click="detailBook(book._id)"/>
            </template>
        </div>
    </div>
</template>

<script>
import Book from '@/components/Book.vue';

export default {
    name: 'Catalog',
    components: {
        Book
    },
    computed: {
        isLoggedIn() {
            const token = window.localStorage.getItem('token')
            return token ? true : false
        }
    },
    methods: {
        handleAnnounceBook() {
            this.$router.push({ path: '/announce-book'})
        },
        async getAnnouncedBooks() {
            try {
                const response = await fetch('http://localhost:3000/books', {
                    method: 'GET',
                    headers: {
                        'Content-Type': 'application/json'
                    }
                });
                const data = await response.json();

                return data;
            } catch (err) {
                console.error(err);
            }
        },
        detailBook(bookId) {
            this.$router.push({ name: 'DetailBookView', params: { id: bookId } })
        }
    },
    async created() {
        this.announcedBooks = await this.getAnnouncedBooks();
    },
    data() {
        return {
            announcedBooks: []
        }
    }
}

</script>


<style scoped>
    .catalog {
        width: 90rem;
        margin-left: auto;
        margin-right: auto;
    }

    .books {
        display: flex;
        flex-wrap: wrap;
    }

    .header_catalog {
        display: flex;
        justify-content: space-between;
        align-items: center;
        width: 93%;
    }

    .catalog h1 {
        margin-left: 8px;
    }

    .btn_announce_book {
        border: none;
        border-radius: 5px;
        padding: 0px 20px;
        height: 40px;
        background-color: #4CAF95;
        color: white;
    }
    
    .btn_announce_book:hover {
        cursor: pointer;
        box-shadow: 0 0 10px rgba(0,0,0,0.3);
    }

    a {
        text-decoration: none;
        color: black;
    }

</style>