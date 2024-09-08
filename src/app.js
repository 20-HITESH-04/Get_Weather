const express = require('express') ;
const path = require('path') ;
const hbs = require('hbs') ;
const app = express() ;
const port = process.env.PORT || 3000 ;

const path_static = path.join(__dirname , "../public") ;   
const template_path = path.join(__dirname , "../src/templates/views") ;
const partials_path = path.join(__dirname,"../src/templates/partials")

app.set('view engine','hbs') ;
app.set('views',template_path) ;
hbs.registerPartials(partials_path) ;

app.use(express.static(path_static)) ;

app.listen(port,() => {
    console.log('Listening to port 3000 ........') ;
}) ;

app.get("/",(req,res) => {
    res.render('index') ;
}) ;

app.get("/about",(req,res) => {
    res.render('about') ;
}) ;

app.get("/weather" , (req,res) => {
    res.render('weather') ;
}) ;

app.get("*" , (req,res) => {
    res.render('404error',{
        errormsg : 'OOPS !! Page Not Found !!!! 🙂🙂'
    }) ;
}) ;