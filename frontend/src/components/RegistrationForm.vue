<template>
  <SuccessModal v-if="showSuccessModal" :mensagem="'Cadastro realizado com sucesso!'"/>
  <div class="form-container">
    <form @submit.prevent="submitForm">
        <label>
          <input type="text" pattern="[a-zA-Z ]*" v-model="form.firstName" placeholder="Nome" >
          <font-awesome-icon :icon="['fas', 'user']" class="icon" />
        </label>
        <br />
        <label>
          <input type="text" pattern="[a-zA-Z ]*" v-model="form.lastName" placeholder="Sobrenome">
          <font-awesome-icon :icon="['fas', 'user']" class="icon" />
        </label>
        <br />
        <label>
          <input type="number" v-model="form.age" placeholder="Idade">
          <font-awesome-icon :icon="['fas', 'calendar']" class="icon" />
        </label>
        <br />
        <label>
          <input type="text" v-model="form.email" placeholder="Email">
          <font-awesome-icon :icon="['fas', 'envelope']" class="icon" />
        </label>
        <br />
        <label>
          <input type="text" v-model="form.cellphone" placeholder="Telefone">
          <font-awesome-icon :icon="['fas', 'phone']" class="icon" />
        </label>
        <br />
        <label>
          <input type="text" v-model="form.username" placeholder="Username">
          <font-awesome-icon :icon="['fas', 'user']" class="icon" />
        </label>
        <br />
        <label>
          <input type="password" v-model="form.password" placeholder="Senha">
          <font-awesome-icon :icon="['fas', 'lock']" class="icon" />
        </label>
        <br />
        <button type="submit">Registrar</button>
    </form>
  </div>
</template>

<script>
import { FontAwesomeIcon } from '@fortawesome/vue-fontawesome'
import router from '../router'
import SuccessModal from './SuccessModal.vue'

export default {
  components: {
    FontAwesomeIcon,
    SuccessModal
  },
  data() {
    return {
      form: {
        firstName: '',
        lastName: '',
        age: '',
        email: '',
        cellphone: '',
        username: '',
        password: ''
      },
      showSuccessModal: false
    }
  },
  methods: {
    async submitForm() {
      try {
        const response = await fetch('http://localhost:3000/users', {
          method: 'POST',
          body: JSON.stringify(this.form),
          headers: {
              'Content-Type': 'application/json'
          }
        });
        const data = await response.json();
        this.handleResponse(data)
      } catch (err) {
        console.error(err);
      }
    },

    handleResponse(data) {
      if(data.error) {
        console.log('error')
      } else {
        this.form = {
          firstName: '',
          lastName: '',
          age: '',
          email: '',
          cellphone: '',
          username: '',
          password: ''
        }

        this.showSuccessModal = true;

        setTimeout(() => {
          router.push({ path: '/login'})
        }, 2000);
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
  height: 100%;
}

form {
  width: 25%;
  padding: 20px;
  border-radius: 10px;
  box-shadow: 0px 0px 10px #ccc;
  text-align: center;
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
  position: relative;
}

.icon {
  position: absolute; /* Adiciona posição absoluta */
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

</style>
