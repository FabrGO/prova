const express = require('express');
const exphbs = require('express-handlebars');

const pool = require('./db/conn') 

PORT = 666
const app = express();


app.use(express.urlencoded({extended:true}))
app.use(express.json())


app.engine('handlebars', exphbs.engine());
app.set('view engine','handlebars');


app.use(express.static('public'))


app.get('/', (req, res)=>{
    return res.render("home");
});

app.post('/book/insertbook', (req, res) =>{
    const {nome, categoria, descricao, preco, q_paginas} = req.body

    const sql  = `INSERT INTO books(??, ??, ??, ??,??) VALUES(?, ?, ?, ?, ?);`

    const data = ['nome', nome, 'categoria',categoria, 'descricao', descricao, 'preco', preco, 'q_paginas', q_paginas]

    pool.query(sql, data, function (err) {
        if(err){
            console.log(err);
            return 
        }
        res.redirect('/')
    })
})

app.get('/book', (req, res)=>{

    const sql = 'SELECT * FROM book'

    pool.query(sql, (err, data)=>{
        if(err){
            console.log(err)
            return
        }

        const livros = data
        console.log(livros)
        return res.render('home', {livros})
    })

})
app.get('/book/:id', (req, res)=>{
    const id = req.params.id

    const sql = `SELECT * FROM book WHERE ?? = ?`

    const data = ['id', id]

    pool.query(sql, data, (err, data)=>{
        if(err){
            console.log(err)
            return
        }
        const livro = data[0]
        console.log(livro)
        return res.render('home', {livro})
    })
})

app.get('/book/edit/:id', (req, res)=>{
    const id = req.params.id

    const sql = `SELECT * FROM book WHERE ?? = ?`

    const data = ['id', id]

pool.query(sql, data, function(err, data){
    if(err){
        console.log(err)
    }
    const livro = data [0]
    console.log(livro)
    return res.render('atualizar', {livro})
    })
})

//edição segunda etapa
app.post('/book/updatebook', (req, res)=>{
    const {nome, categoria, descricao, preco, q_paginas} = req.body

    const sql = `UPDATE book SET ??=?,
    ?? = ?, ?? = ?, ?? = ?, ?? = ? WHERE ?? = ?`

    const data = ['nome', nome, 'categoria',categoria, 'descricao', descricao, 'preco', preco, 'q_paginas', q_paginas, 'id', id]

    pool.query(sql, data, function(err){
        if(err){
            console.log(err)
            return
        }
        return res.redirect('/home')
    })

    
})


app.post('/book/remove/:id', (req, res)=>{
    const id = req.params.id

    const sql = `DELETE FROM book WHERE ?? = ?`

    const data = ['id', id]

    pool.query(sql, data, (err)=>{
        if(err){
            console.log(err)
            return
        }
        
    return res.redirect('home')
    })

})




app.listen(PORT, ()=>{
    console.log(`Servdidor aberto na porta${PORT} 👿👿👿`)
})
  