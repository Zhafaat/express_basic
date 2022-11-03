const express = require('express')
const pg = require('pg')
const Pool = pg.Pool
const app = express()
const cors = require('cors')
app.use(cors())

const pool = new Pool({
    user: 'postgres',
    host: 'localhost',
    database: 'user',
    password: 'motorr155577',
    port: 5432,
    connectionTimeoutMillis: 2000,
    max: 100
})

const port = 3000

app.use(express.urlencoded({extended:true}))

app.json

// CODINGAN DI ATAS FORMAT DEFAULT

app.get('/values', async (req, res) => {
    try {
        const query = `SELECT "ID", "Created_at", "Update_at", "Name", "Count", "Kind"
        FROM public."Groceries";`
        const data = await pool.query(query)
        res.status(200).json({Data: data.rows, length: data.rowCount});
    } catch (error) {
        res.status(400).json({message : "Bad Request"})
    }
})
app.get('/value/:name', async(req, res) => {
    try {
        const nama = req.params.name
        const query = `select * from "Groceries" g  where g."Name"  = '${nama}' ;`
        const data = await pool.query(query)
        res.status(200).json(data.rows[0])
    } catch (error) {
        res.status(404).json({msg: "Data not found"})
    }
})

app.post('/value', async(req, res) => {
    try {
        const nama = req.body.name
        const count = req.body.count
        const kind = req.body.kind
        const query = `INSERT INTO public."Groceries"
        ("ID", "Created_at", "Update_at", "Name", "Count", "Kind")
        VALUES(gen_random_uuid(), now(), now(), '${nama}', ${count}, '${kind}');`
        const data = await pool.query(query)
        if (data.rowCount === 1){
            res.status(200).json({message: "Success Insert"})
        }
    } catch (error) {
        res.status(400).json({message: 'error'})
    }
})

app.delete('/value/:name', async(req, res) => {
    try {
        const nama = req.params.name
        const query = `DELETE FROM public."Groceries"
        WHERE "Name"='${nama}';`
        const data = await pool.query(query)
        if (data.rowCount === 1){
            res.status(200).json({message: "Success Delete"})
        } else if (data.rowCount === 0){
            res.status(404).json({message: "Data not found"})
        }
    } catch (error) {
        res.status(400).json({message: "error"})
    }
})

app.put('/value/:id', async(req, res) => {
    try {
        const id = req.params.id
        const nama = req.body.name
        const count = req.body.count
        const kind = req.body.kind
        const query = `UPDATE public."Groceries"
        SET "Created_at"=now(), "Update_at"=now(), "Name"='${nama}', "Count"=${count}, "Kind"='${kind}'
        WHERE "ID"='${id}';`
        const data = await pool.query(query)
        if (data.rowCount === 1){
            res.status(200).json({message: "Success Update"})
        }
    } catch (error) {
        res.status(400).json({message: "error"})
    }
})

app.post('/aat/:name/:age/:adress', (req, res) => {
    // console.log(req.body)

    res.status(200).json(data)
    res.send(req.body)
})

app.put('/aat/:name/:age/:adress', (req, res) => {
    // console.log(req.params)

    // res.send(req.body)
    res.status(200).json(data)
    res.send(req.params)
})

app.delete('/aat/:name/:age/:adress', (req, res) => {
    console.log(req.body)
    console.log(req.params)

    res.status(200).json(data)
    res.send(req.body)
    res.send(req.params)
})

app.listen(port, () => {
  console.log(`Example app listening on port ${port}`)
})
