const express = require('express');
const morgan = require('morgan');
const app = express();

app.listen(3000);

app.set('view engine', 'ejs');

// allow access file in Public folder
app.use(express.static('public'));

app.get('/', (req, res) => {
    const blogs = [
        {title: 'Hello', snippet:' Today is saturday'},
        {title: 'Good morning', snippet:' Yesterday was firday'},
        {title: 'Good day', snippet:' Tomorrow is sunday'},
    ]
    res.render('index', {title: 'Home', blogs});

});

app.get('/about', (req, res) => {
    res.render('about', {title: 'About'})
})

//redirect
app.get('/blogs/create', (req,res) => {
    res.render('create', {title: 'new Blog create'});
})

app.use((req,res) => {
    res.status(404).render('404', {title: '404'});
})

