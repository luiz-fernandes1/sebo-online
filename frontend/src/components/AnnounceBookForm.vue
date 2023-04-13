<template>
    <SuccessModal v-if="showSuccessModal" :mensagem="'Livro anunciado com sucesso!'"/>
    <div class="form-container">
        <form @submit.prevent="submitForm">
            <label>
                <input type="text" v-model="form.bookName" placeholder="Título">
                <font-awesome-icon :icon="['fas', 'tag']" class="icon" />
            </label>
            <br />
            <label>
                <input type="text" v-model="form.bookAuthor" placeholder="Autor">
                <font-awesome-icon :icon="['fas', 'user']" class="icon" />
            </label>
            <br />
            <label>
                <input type="text" v-model="form.bookPublisher" placeholder="Editora">
                <font-awesome-icon :icon="['fas', 'landmark']" class="icon" />
            </label>
            <br />
            <label>
                <input type="text" v-model="form.bookLanguage" placeholder="Língua">
                <font-awesome-icon :icon="['fas', 'globe']" class="icon" />
            </label>
            <br />
            <label>
                <input type="text" v-model="form.bookPrice" placeholder="Preço">
                <font-awesome-icon :icon="['fas', 'dollar']" class="icon" />
            </label>
            <br />
            <label>
                <input type="text" v-model="form.bookYear" placeholder="Ano">
                <font-awesome-icon :icon="['fas', 'calendar']" class="icon" />
            </label>
            <br />
            <label>
                <textarea rows="2" cols="50" v-model="form.bookDescription" placeholder="Descrição"></textarea>
            </label>
            <br />
            <button type="submit">Anunciar</button>
        </form>
    </div>
</template>

<script>
import { FontAwesomeIcon } from '@fortawesome/vue-fontawesome'
import router from '../router'
import SuccessModal from './SuccessModal.vue';

export default {
    components: {
        FontAwesomeIcon,
        SuccessModal
    },
    data() {
        return {
            form: {
                bookName: '',
                bookAuthor: '',
                bookPublisher: '',
                bookLanguage: '',
                bookPrice: '',
                bookYear: '',
                bookDescription: '',
                userId: localStorage.getItem('id')
            },
            showSuccessModal: false
        }
    },
    methods: {
        async submitForm() {
            try {
                const response = await fetch('http://localhost:3000/books', {
                    method: 'POST',
                    body: JSON.stringify(this.form),
                    headers: {
                        'Content-Type': 'application/json',
                        'Authorization': 'Bearer ' + localStorage.getItem('token')
                    }
                });

                const data = await response.json();
                this.handleResponse(data);
            } catch (err) {
                console.error(err);
            }
        },

        handleResponse(data) {
            if(data.status != 400 || data.status != 500) {
                this.showSuccessModal = true;
                this.form = {
                    bookName: '',
                    bookAuthor: '',
                    bookPublisher: '',
                    bookLanguage: '',
                    bookPrice: '',
                    bookYear: '',
                    bookDescription: '',
                    bookImage: {
                        data: '',
                        contentType: ''
                    }
                }

                router.push({ path: '/', force: true })
            } else {
                console.log('error')
            }
        },
        handleImageUpload(event) {
            const file = event.target.files[0]
            const reader = new FileReader()

            reader.readAsDataURL(file)
            reader.onload = () => {
                const arrayBuffer = reader.result
                const contentType = file.type
                const data = new Uint8Array(arrayBuffer)
                
                this.form.bookImage = {
                    data: data,
                    contentType: contentType
                }
            }
        }
    }
}
</script>

<style scoped>
.form-container{
    display: flex;
    justify-content: center;
    align-items: center;
    width: 310%;
}

form {
    width: 25%;
    padding: 20px;
    border-radius: 10px;
    box-shadow: 0px 0px 10px #ccc;
    text-align: center;
}

input[type="text"], textarea {
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

textarea {
    resize: none;
    padding: 10px;
}

</style>