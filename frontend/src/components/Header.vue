<template>
    <div class="header">
        <div class="wrapper">
            <div class="header_logo">
                <router-link class="logo_link" to="/"><h1>Sebo</h1></router-link>
            </div>
            <div class="header_search">
                <form>
                    <input type="text" placeholder="O que você está procurando?">
                    <button type="submit" class="search_icon_button">
                        <font-awesome-icon :icon="['fas', 'search']" class="icon search_icon" />
                    </button>
                </form> 
            </div>
            <div class="header_list">
                <button>
                    <font-awesome-icon :icon="['far', 'heart']" class="icon heart_icon" />
                </button>
                <span>Minhas listas</span>
            </div>
            <div class="header_user_account" @mouseenter="showModal = true" @mouseleave="showModal = false">
                <div class="user_profile_div">
                    <button class="user_profile_button">
                        <font-awesome-icon :icon="['fas', 'user']" class="icon user_profile_icon" />
                    </button>
                    <template v-if="isLoggedIn">
                        <span>Olá, {{ firstName }}</span>
                    </template>
                    <template v-else> 
                        <span>Olá, Usuário</span>
                    </template>
                </div>
                <modal v-if="showModal" @close="showModal = false">
                    <template v-if="isLoggedIn">
                        <router-link to="/profile" class="link-btn">Meu perfil</router-link>
                        <button @click="handleLogout" class="link-btn">Sair</button>
                    </template>
                    <template v-else>
                        <router-link to="/login" class="link-btn">Entrar</router-link>
                        <router-link to="/register" class="link-btn">Cadastrar</router-link>
                    </template>
                </modal>
            </div>
            <div class="header_mini_cart">
                <button class="mini_cart_button" @click="goToCart(this.id)">
                    <font-awesome-icon :icon="['fas', 'cart-shopping']" class="icon mini_cart_icon" />
                </button>
            </div>
        </div>
    </div>
</template>

<script>
export default {
    name: 'Header',
    data() {
        return {
            showModal: false,
            firstName: '',
            id: ''
        }
    },
    created(){
        this.firstName = localStorage.getItem('firstName');
        this.id = localStorage.getItem('id');
    },
    computed: {
        isLoggedIn() {
            const token = window.localStorage.getItem('token')
            return token ? true : false
        }
    },
    methods: {
        login(firstName, id) {
            this.firstName = firstName;
            this.id = id;
            localStorage.setItem('firstName', firstName);
            localStorage.setItem('id', id);
        },
        handleLogout() {
            localStorage.removeItem('token')
            localStorage.removeItem('firstName')
            this.isLoggedIn = false
            this.$router.push({ path: '/' })
            window.location.reload()
        },
        goToCart(id) {
            this.$router.push({ name: 'CarrinhoView', params: { id: id} })
        }
    }
};
</script>

<style scoped>
    .header {
        background-color: #4CAF95;
        color: white;
    }

    .wrapper {
        display: flex;
        justify-content: space-between;
        align-items: center;
        width: 70rem;
        margin-left: auto;
        margin-right: auto; 
    }

    .header_logo {
        flex: 1;
    }

    input {
        border-radius: 25px;
        padding: 12px 35px;
        border: 1px solid #ccc;
        font-size: 16px;
        width: 100%;
    }

    form{
        width: 100%;
        padding: 20px;
        display: flex;
    }

    button {
        border: none;
        background-color: transparent;
        cursor: pointer;
    }

    .search_icon_button {
        position: relative;
        right: 40px;
    }

    .header_search {
        flex: 3;
    }

    .header_list, .header_user_account {
        flex: 1;
    }

    .header_list:hover, .header_user_account:hover {
        cursor: pointer;
    }

    .heart_icon {
        color: white;
        font-size: 1.3rem
    }

    .user_profile_button {
        color: inherit;
        font-size: inherit;
    }

    .search_icon, .mini_cart_icon {
        font-size: 1.1rem;
    }

    .header_mini_cart {
        flex: 0.5;
        display: flex;
        padding-left: 15px;
    }
    .mini_cart_button {
        color: white;
    }

    modal {
        position: absolute;
        top: 52px;
        right: 20.5%;
        background-color: white;
        padding: 20px 30px;
        z-index: 2;
        border-radius: 15px;
        display: flex;
        flex-direction: column;
        box-shadow: 0px 0px 5px #ccc;
    }

    .user_profile_div {
        display: inline-block;
        position: relative;
    }

    .link-btn {
        color: black;
        padding: 5px 3px 3px 3px;
        text-decoration: none;
        font-size: 17px;
    }

    .link-btn:hover {
        color: #4CAF95;
    }

    .logo_link {
        text-decoration: none;
        color: white;
    }
</style>