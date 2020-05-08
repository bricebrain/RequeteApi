let express = require('express');
let mongoose= require('mongoose');
 //let bodyparser= require('body-parser');
 let multer = require('multer')
 let axios = require('axios')
let jwt = require('jsonwebtoken')

var LocalStorage = require('node-localstorage').LocalStorage;
localStorage = new LocalStorage('./login')
 


const app = express();
const upload= multer();
app.set('views', './views');
app.set('view engine', 'ejs');


//middelwares

app.use('/public', express.static('public'))
 //app.use(bodyparser.urlencoded({extended:false}))

let movies = [
    {
        title:'ipman'
    },
    {
        title:'crazy kunfu'
    },
    {
        title:'batman'
    },
]


app.get('/', (req,res)=>{
    res.render("index")


})

app.get('/movies', (req,res)=>{

    

    res.render("movies", {moviesid: movies})


})

// app.post('/movies', (req,res)=>{
//     // let t =JSON.parse(JSON.stringify(req.body))
//     // movies.push(t)
//     // res.render("movies", {moviesid: movies})
//     const nouveauFilm = {title:req.body.title}
//     console.log(nouveauFilm)
//     movies=[...movies, nouveauFilm];
//     console.log(movies)
//     res.render("movies", {moviesid: movies})
// })


// app.post('/movies', (req,res)=>{
//     const nouveauFilm = {title:req.body.title}
//     movies=[...movies, nouveauFilm];
//     res.render("movies", {moviesid: movies})
    
    

// })

app.post('/movies', upload.fields([]),(req,res)=>{
     console.log(req.body)
     const nouveauFilm = {title:req.body.title};
    movies=[...movies, nouveauFilm];
    res.render("movies", {moviesid: movies})
 
})


app.get('/movie/:id', (req,res)=>{
    const id = req.params.id

    res.render("movie-details",{
        movieid:id,
    
    
    })


})



app.get('/movie-search',(req,res)=>{

   res.render("movie-search")

})



app.post('/movie-search', upload.fields([]),(req,res)=>{
    // console.log(req.body)
    let tab = []
    let research= req.body.titleSearch;
    let api = `https://api.themoviedb.org/3/search/movie?api_key=b13cd13759728b1d8387737d5e91792a&query=${research}&language=fr-FR`;
    axios.get(api)
    .then(function(response){

        let titres = response.data.results;
        for(titre of titres){
            // console.log(`${titre.title} : ${titre.overview}`)
            
            tab = [...tab, titre]
            
            
          
        }
        console.log(tab[0])
        res.render("movie-search", {idtitre:tab})
        
    })
//     const nouveauFilm = {title:req.body.title};
//    movies=[...movies, nouveauFilm];
//    res.render("movie-search", {moviesid: movies})



})


app.get('/login',(req,res)=>{

    res.render("login",{connexion:"..."})
 
 })
 

 const compte = {email:"jojo@jo.com", password:"aze"};
 const secret= 'sjgjqsgjhddhu3763739369TRTRgdkhkdgdjhhudhuuhuuudsgygysgy';

 app.post('/login', upload.fields([]),(req,res)=>{
     
     if((req.body.email === compte.email) && (req.body.password===compte.password)){
         const myToken = jwt.sign({iss:'htpp://monadresseweb.fr', user:'brico', role:'admin'}, secret);
        
         
        res.json(myToken)
        
        console.log(res)
     }
     else {
        res.render("login", {connexion:"Identifiant ou password erroné"})
     }
    

    })
 




app.listen("3000");