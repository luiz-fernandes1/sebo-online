<template>
    <div class="home">
        <Header/>

        <div class="book">
            <img src="../assets/images/red-x.jpg">
            <div class="book-infos">
                <div class="book-infos-title">
                    <h1>{{ book.bookName }}</h1>
                </div>
                
                <div class="book-infos-another">                    
                    <label>
                        <input type="text" placeholder="Autor" :value="book.bookAuthor" disabled>
                        <font-awesome-icon :icon="['fas', 'user']" class="icon" />
                    </label>

                    <label>
                        <input type="text" placeholder="Editora" :value="book.bookPublisher" disabled>
                        <font-awesome-icon :icon="['fas', 'landmark']" class="icon" />
                    </label>

                    <label>
                        <input type="text" placeholder="Língua" :value="book.bookLanguage" disabled>
                        <font-awesome-icon :icon="['fas', 'globe']" class="icon" />
                    </label>

                    <label>
                        <input type="text" placeholder="Preço" :value="book.bookPrice" disabled>
                        <font-awesome-icon :icon="['fas', 'dollar']" class="icon" />
                    </label>

                    <label>
                        <input type="text" placeholder="Ano" :value="book.bookYear" disabled>
                        <font-awesome-icon :icon="['fas', 'calendar']" class="icon" />
                    </label>

                    <textarea disabled rows="2" cols="50" :value="book.bookDescription"></textarea>
                </div>

                <div class="book-infos-btn">
                    <button class="btn-buy">Colocar no Carrinho</button>
                </div>
            </div>
        </div>
    </div>
</template>

<script>
import Header from '@/components/Header.vue'

export default {
    name: 'DetailBookView',
    components: {
        Header
    },
    data() {
        return {
            book: {}
        }
    },
    methods: {
        async getBookById() {
            try {
                const id = this.$route.params.id;

                const response = await fetch(`http://localhost:3000/books/${id}`, {
                    method: 'GET',
                    headers: {
                        'Content-Type': 'application/json'
                    }
                });
                const data = await response.json();
                this.book = data;
            } catch (err) {
                console.error(err);
            }
        },
    },
    async created() {
        this.book = await this.getBookById();
    }
}

</script>

<style scoped>
.home {
    background-color: #FAFAFA;
    height: 100%;
}

.book {
    display: flex;
    justify-content: flex-start;
    margin: 30px 0px 0px 150px;
}

.book-infos {
    display: flex;
    flex-direction: column;
    justify-content: space-between;
    margin-left: 80px;
    width: 40%;
}

.book img {
    border: 10px solid transparent;
    width: 612px;
    height: 612px;
}

.btn-buy {
    width: 50%;
    margin: 10px auto;
    padding: 9px 5px;
    background-color: #4CAF95;
    color: white;
    border: none;
    border-radius: 4px;
    font-weight: bold;
    cursor: pointer;
}

textarea {
    resize: none;
    padding: 10px;
    height: 200px;
    border: none;
}

label {
    position: relative;
}

.icon {
    position: absolute;
    left: 10px;
    top: 50%;
    transform: translateY(-50%);
    font-size: 20px;
}

input, textarea {
    width: 100%;
    padding: 12px 35px;
    margin: 8px 0;
    box-sizing: border-box;
    border-radius: 5px;
    border: 1px solid #ccc;
    font-size: 16px;
    position: relative;
    cursor: not-allowed;
}

</style>