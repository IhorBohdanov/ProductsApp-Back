import express from "express";
const router: express.Router = express.Router()
// const User = require('../models/user')
// const bcrypt = require('bcrypt')
// const rounds = 10

// const jwt = require('jsonwebtoken')
// const tokenSecret = process.env.TOKEN_SECRET

// const middleware = require('../middlewares')

router.get('/', (req: express.Request , res: express.Response) => {
    return res.json({
        data: 'sdfsdfs',
    })
});

export const producstRoute = router;