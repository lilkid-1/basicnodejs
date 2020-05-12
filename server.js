const express = require('express');
const bodyParser = require('body-parser');
const MongoClient = require('mongodb').MongoClient
const app = express();
var db

app.use(bodyParser.urlencoded({extended: true}))

MongoClient.connect('mongodb+srv://aayush_1220:1298toeflmax@cluster0-n6ld6.mongodb.net/test?retryWrites=true&w=majority', (err, client) => {
    if (err) return console.log(err)
    db = client.db('aayush_1220')

    app.listen(3400, () =>{
        console.log('server on 3400')
    })
})
app.set('view engines', 'ejs')
app.use(express.static('public'))
app.use(bodyParser.json())

app.post('/quotes', (req, res) => {
    var cursor = db.collection('quotes').insertOne(req.body , (err, result) => {
        if(err) return console.log(err)

        console.log('connected to database')
        res.redirect('/')
    })
})

app.get('/', (req, res) => {
    db.collection('quotes').find().toArray((err, results) => {
        if (err) return console.log(err)

        res.render('index.ejs', {quotes: results})
    })
})

app.get('/', (req, res) => {
    res.sendFile('/Users/Aayush Singh/project1' + '/ind.html')
})

app.post('/quotes', (req, res) => {
    console.log(req.body)
})

app.put('/quotes', (req, res) =>{
    db.collection('quotes').findOneAndUpdate({name:'aayush'},{
        $set:{
            name:req.body.name,
            quote:req.body.quote
        }
    },{
        sort:{_id:-1},
        upsert:true
    },(err, results) => {
        if (err) return res.send(err)
        res.send(results)
    })
})
