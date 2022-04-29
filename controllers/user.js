const { body } = require('express-validator');
const db = require('../helpers/db')
var passwordHash = require('password-hash');

const get = async () => {
   try {
        const rows = await db.query(`SELECT * FROM user  ORDER BY id DESC`);
        const data = db.emptyOrRows(rows);
       return { status: 200 , context: { data : data }}; 
   } catch (error) {
       return { status: 400, context: { message: error.sqlMessage } }; 
   } 
}

const getById = async (id) => {
    try {
         const rows = await db.query(`SELECT * FROM user WHERE id =${id}`)
         const data = db.emptyOrRows(rows);
        return { status: 200 , context: { data : data }}; 
    } catch (error) {
        return { status: 400, context: { message: error.sqlMessage } }; 
    } 
}


const create = async (body) => {
    const password = passwordHash.generate(body.password);
    // verify passwordHash.verify('password123', hashedPassword);
    try {
        const rowsEmail = await db.query(`SELECT * FROM user WHERE email = '${body.email}'`)
        const query = db.emptyOrRows(rowsEmail);
        if (!query.lenght) {
            const rows = await db.query(`INSERT INTO user SET email = '${body.email}', password = '${password}', name = '${body.name}'`)
            return { status: 200 , context: { message: 'Created' }}; 
        }
        return { status: 400, context: { message: 'Email Exits.' }
}; 
    } catch (error) {
        return { status: 400, context: { message: error.sqlMessage } }; 
   } 
}

module.exports = {
    get, getById ,create
}