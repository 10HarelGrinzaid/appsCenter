const Pool = require('pg').Pool;
const { nanoid } = require('nanoid')
const pool = new Pool({
    user: 'postgres',
    host: 'localhost',
    database: 'postgres',
    password: 'Aa123456',
    port: 5432,
});

const getAll = (request, response) => {
    pool.query('SELECT * FROM public.t_app_center', (error, results) => {
        if (error) {
            throw error
        }
        else {
            response.status(200).json(results.rows)
        }
    })
}

const getByFilter = (request, response) => {
    const filterName = request.params.filterName
    const queryText = `SELECT * FROM public.t_app_center WHERE LOWER(name) LIKE LOWER('%${filterName}%')`

    pool.query(queryText, (error, results) => {
        if (error) {

            console.log(error);
            throw error
        }
        response.status(200).json(results.rows)
    })
}

const remove = (request, response) => {
    const id = parseInt(request.params.id)

    pool.query('DELETE FROM users WHERE id = $1', [id], (error, results) => {
        if (error) {
            throw error
        }
        response.status(200).send(`User deleted with ID: ${id}`)
    })
}

const create = (request, response) => {
    const { imageUrl, name, price, desc, companyName } = request.body;
    const id = nanoid();
    const createdAt = formatDate(new Date());

    pool.query('INSERT INTO users (id,imageUrl,name,price,desc,companyName,createdAt) VALUES ($1, $2 ,$3 ,$4 ,$5 ,$6 ,$7)', [id, imageUrl, name, price, desc, companyName, createdAt], (error, results) => {
        if (error) {
            throw error
        }
        response.status(201).send(`User added with ID: ${results.insertId}`)
    })
}

const formatDate = (date) => {
    return [
        date.getFullYear(),
        padTo2Digits(date.getMonth() + 1),
        padTo2Digits(date.getDate()),
    ].join('-');
}


module.exports = {
    create,
    getAll,
    getByFilter,
    remove,
};