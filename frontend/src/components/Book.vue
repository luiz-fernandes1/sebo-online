<template>
    <div class="book">
        <img src="../assets/images/red-x.jpg">
        <h2>{{ book.bookName }}</h2>
        <p>{{ book.bookAuthor }}</p>
        <p>R$ {{ book.bookPrice }}</p>
    </div>
</template>

<script>
export default {
    name: 'Book',
    props: {
        book: {
            type: Object,
            default: () => ({}),
        },
    },
};
</script>

<style scoped>
.book {
    display: flex;
    flex-direction: column;
    align-items: center;
    background-color: white;
    border-radius: 15px;
    width: 250px;
    margin: 10px;
}

.book img {
    max-width: 200px;
    max-height: 300px;
    border: 10px solid transparent;
}

.book:hover {
    box-shadow: 2px 2px 4px rgba(128,128,128,0.25), -2px -2px 4px rgba(128,128,128,0.25);
    cursor: pointer;
}
</style>