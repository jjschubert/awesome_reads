const express = require('express');
const router = express.Router();

const pool = require('../modules/pool');

router.put('/:id', (req, res) => {
    let book = req.body; // Book with updated content
    let id = req.params.id; // id of the book to update

    console.log(`Updating book ${id} with `, book);

    let queryText =
        `UPDATE "books"
    SET "author" = $2, "title" = $3
    WHERE "id" = $1;
   `
    pool.query(queryText, [id, book.author, book.title]).then((result) => {
        res.sendStatus(200);
    }).catch((error) => { // in case of broken
        console.log('error in PUT', error);
        //all good servers respond
        res.sendStatus(500);
    })
});

module.exports = router;