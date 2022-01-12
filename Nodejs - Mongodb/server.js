const express = require('express');
const morgan = require('morgan');
const mongoose = require('mongoose');
const app = express();
const Blog = require('./models/blog');

const dbURI = 'mongodb+srv://nodejsblog2:pass123321@nodejsmongo.a4lyw.mongodb.net/nodejs-cc?retryWrites=true&w=majority';
mongoose.connect(dbURI, {useNewUrlParser: true, useUnifiedTopology: true})
    .then((result) => app.listen(2022))
    .catch((err) => console.log(err));

app.set('view engine', 'ejs');

// allow access file in Public folder
app.use(express.static('public'));

app.get('/about', (req, res) => {
    res.render('about', {title: 'About'})
})

//redirect
app.get('/blogs/create', (req,res) => {
    res.render('create', {title: 'Create a new Blog'});
})

// save data to database server
app.get('/add-blog', (req, res) => {
    const blog = new Blog({
        title: 'New Blog 2',
        snippet: 'about my new Blog 2',
        body: 'more about my new Blog 2'
    });
    blog.save()
        .then((result) => res.send(result))
        .catch((err) => console.log(err));
});

// app.get('/load-all-blog', (req, res) => {
//     Blog.find()
//         .then((result) => { 
//             res.send(result);
//         })
//         .catch((err) => {
//             console.log(err);
//         })
// });

app.get('/load-single-blog', (req, res) => {
    Blog.findById('61dd55c18486003befb91695')
        .then((result) => {
            res.send(result);
        })
        .catch((err) => {
            console.log(err);
        });
});

// load Blog from server and display to screen
app.get('/load-all-blog', (req, res) => {
    Blog.find().sort({createdAt: -1})
    .then((result) => {
        res.render('index', {title: 'All Blogs', blogs: result});
    })
    .catch((err) => { console.log(err);});
});

app.get('/load-sgl-blog/61dea0ea6bd02927430b2fae', (req, res) => {
   
    Blog.findById('61dea0ea6bd02927430b2fae')
    .then((result) => {
        res.render('singleBlog', {blog1: result, title: 'Single Blogs'});
    })
    .catch((err) => { console.log(err);});
});

// load data below to Home page
app.get('/', (req, res) => {
    const blogs = [
        {title: 'Hello', snippet:' Today is saturday'},
        {title: 'Good morning', snippet:' Yesterday was firday'},
        {title: 'Good day', snippet:' Tomorrow is sunday'},
    ]
    res.render('index', {title: 'Home', blogs});

});


app.use((req,res) => {
    res.status(404).render('404', {title: '404'});
})

