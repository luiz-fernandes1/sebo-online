<template>
    <div class="modal-wrapper">
        <div class="modal">{{ mensagem }}</div>
    </div>
</template>

<script>
export default {
    props: {
        mensagem: {
            type: String,
            default: ''
        }
    }
}
</script>

<style>
    .modal-wrapper {
        position: fixed;
        width: 100%;
        top: 20px;
    }
    .modal {
        padding: 20px;
        color: white;
        background: #4CAF95;
        border-radius: 10px;
        box-shadow: 1px 3px 5px rgba(0,0,0,0.2);
        max-width: 400px;
        margin: 0 auto;
    }
</style>