const express = require('express');
const router = express.Router();
const userController = require('../controllers/user')
const { body, validationResult } = require('express-validator');
router.get("/", async (req, res) => {
    const data = await userController.get();
    res.status(data.status).json(data.context)
});

router.get("/:id", async (req, res) => {
    const data = await userController.getById(req.params.id);
    res.status(data.status).json(data.context)
});

router.post("/create",
    body('email').isEmail(),
    body('password').isLength({ min: 4 }),
    body('name').isLength({ min: 4 }),
    async (req, res) => {

    const errors = validationResult(req);
    if (!errors.isEmpty()) {
      return res.status(400).json({ errors: errors.array() });
    }
        
    const data = await userController.create(req.body);
    
    res.status(data.status).json(data.context)
   
});

module.exports = router;