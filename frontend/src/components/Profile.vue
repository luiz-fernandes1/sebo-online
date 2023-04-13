<template>
    <div class="profile">
        <div class="personal-information">
            <h1>Minhas Informações</h1>
            
            <form @submit.prevent="submitForm">
                <div class="form-row">
                    <label>
                        <input type="text" pattern="[a-zA-Z ]*" v-model="form.firstName" placeholder="Nome" >
                        <font-awesome-icon :icon="['fas', 'user']" class="icon" />
                    </label>
                    <label>
                        <input type="text" pattern="[a-zA-Z ]*" v-model="form.lastName" placeholder="Sobrenome">
                        <font-awesome-icon :icon="['fas', 'user']" class="icon" />
                    </label>
                </div>
                <div class="form-row">
                    <label>
                        <input type="number" v-model="form.age" placeholder="Idade">
                        <font-awesome-icon :icon="['fas', 'calendar']" class="icon" />
                    </label>
                    <br />
                    <label>
                        <input type="text" v-model="form.email" placeholder="Email">
                        <font-awesome-icon :icon="['fas', 'envelope']" class="icon" />
                    </label>
                </div>
                <div class="form-row">
                    <label>
                        <input type="text" v-model="form.cellphone" placeholder="Telefone">
                        <font-awesome-icon :icon="['fas', 'phone']" class="icon" />
                    </label>

                    <label>
                        <input type="text" v-model="form.username" placeholder="Username">
                        <font-awesome-icon :icon="['fas', 'user']" class="icon" />
                    </label>
                </div>

                <button class="btn-submit" type="submit">Atualizar</button>
            </form>
        </div>
        <div class="announced-books">
            <h1>Meus livros</h1>

            <div class="books">
                <template v-for="book in announcedBooks" :key="book._id">
                    <Book :book="book" @click="detailBook(book._id)" />
                </template>
            </div>
        </div>
    </div>
</template>

<script>
import Book from '@/components/Book.vue';

export default {
    name: "Profile",
    components: {
        Book
    },
    data() {
        return {
            form: {
                firstName: '',
                lastName: '',
                age: '',
                email: '',
                cellphone: '',
                username: ''
            },
            announcedBooks: []
        }
    },
    methods: {
        async submitForm() {
            try {
                const userId = localStorage.getItem('id')

                const response = await fetch(`http://localhost:3000/users/${userId}`, {
                    method: 'PUT',
                    body: JSON.stringify(this.form),
                    headers: {
                        'Content-Type': 'application/json',
                        'Authorization': 'Bearer ' + localStorage.getItem('token')
                    }
                });
                const data = await response.json();
                this.handleResponse(data)
            } catch (err) {
                console.error(err);
            }
        },
        async getAnnouncedBooks() {
            const userId = localStorage.getItem('id');

            try {
                const response = await fetch(`http://localhost:3000/books/user/${userId}`, {
                    method: 'GET',
                    headers: {
                        'Content-Type': 'application/json',
                        'Authorization': 'Bearer ' + localStorage.getItem('token')
                    }
                });
                const data = await response.json();

                return data;
            } catch (err) {
                console.error(err);
            }
        },
        async getProfileInfos() {
            const userId = localStorage.getItem('id')

            try {
                const response = await fetch(`http://localhost:3000/users/${userId}`, {
                    method: 'GET',
                    headers: {
                        'Content-Type': 'application/json',
                        'Authorization': 'Bearer ' + localStorage.getItem('token')
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
        this.form = await this.getProfileInfos();
    }
};
</script>

<style scoped>
.profile {
    display: flex;
    flex-direction: column;
    align-items: start;
    padding: 0px 40px;
}

form {
    display: flex;
    flex-direction: column;
    text-align: center;
}

.form-row {
    display: flex;
    justify-content: space-between;
}

input {
    width: 100%;
    padding: 12px 35px;
    margin: 8px 0;
    box-sizing: border-box;
    border-radius: 5px;
    border: 1px solid #ccc;
    font-size: 16px;
    position: relative;
}

label {
    width: 48%;
    position: relative;
}

.icon {
    position: absolute;
    left: 10px;
    top: 50%;
    transform: translateY(-50%);
    font-size: 20px;
}

button[type="submit"] {
    width: 100%;
    background-color: #4CAF95;
    color: white;
    padding: 14px 20px;
    margin: 8px 0;
    border: none;
    border-radius: 4px;
    cursor: pointer;
}

.personal-information, .announced-books {
    display: flex;
    flex-direction: column;
    align-items: flex-start;
}

.btn-submit {
    margin: 15px auto !important;
}

.books {
    display: flex;
    flex-wrap: wrap;
}
</style>