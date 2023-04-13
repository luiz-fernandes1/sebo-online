var express = require('express');
var router = express.Router();
const Book = require('../models/book');
const verifyAccessToken = require('../routes/middleware/verifyAccessTokenMiddleware');
const multer = require('multer');

const storage = multer.memoryStorage();
const upload = multer({ storage: storage})

/* Get all Books. */
router.get('/', async (req, res) => {
    const books = await Book.find({});
    res.send(books);
});

/* Get a book by id */
router.get('/:id', async function(req, res) {
    try {
        const { id } = req.params;
        const book = await Book.findById(id);
        res.send(book)
    } catch(err) {
        console.log(err)
    }
})

router.use(verifyAccessToken);

router.get('/user/:userId', async (req, res) => {
    const userId = req.params.userId;
  
    try {
      const books = await Book.find({ userId: userId });
      res.json(books);
    } catch (err) {
      console.error(err);
      res.status(500).json({ error: 'Erro ao buscar livros do usuário' });
    }
});

/* Create a new Book. */
router.post('/', async function(req, res, next) {
    try{
        const newBook = new Book({
            bookName: req.body.bookName,
            bookAuthor: req.body.bookAuthor,
            bookPublisher: req.body.bookPublisher,
            bookLanguage: req.body.bookLanguage,
            bookPrice: req.body.bookPrice,
            bookYear: req.body.bookYear,
            bookDescription: req.body.bookDescription,
            /*bookImage: {
                data: req.file.buffer,
                contentType: req.file.mimetype
            }*/
            userId: req.body.userId
        })
        await newBook.save();
        return res.status(201).send(req.body);
        
    } catch(error){
        console.log(error);
        return res.status(500).json({
          msg: "New book cannot be created...",
          error
        })
    }
});

/* Update a Book. */
router.put('/:id',async (req, res) => {
    try {
        const { id } = req.params;
        const updatedBook = await Book.findByIdAndUpdate(id, req.body, { new: true});
        res.send(updatedBook);
    } catch  (err){
        console.error(err);
        res.status(500).send('Book Cannot Updated');
    }
});

/* Delete a Book. */
router.delete('/:id', async (req, res) => {
    try {
        const { id } = req.params;
        await Book.findByIdAndDelete(id);
        res.send('Book deleted successfully');
    } catch(err){
        res.status(500).send('Book Cannot Deleted');
    }
});

module.exports = router;
