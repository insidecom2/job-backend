const express = require('express');
const router = express.Router();
const db = require('../helpers/db')

router.get("/", async (req, res) => {
    
    res.status(200).json({status : 'ok'})
});

module.exports = router;