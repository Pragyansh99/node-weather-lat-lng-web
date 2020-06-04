const path = require('path')
const express = require('express')
const hbs = require('hbs')
const geocode = require('./utils/geocode')

const app = express()
const port = process.env.PORT || 3000
// Shows path of directory and file where the project is lying

// console.log(__dirname)
// console.log(__filename)

// public folder path

const publicDirPath = path.join(__dirname, '../public')

// Handle Bar Dynamic Templeting

app.set('view engine', 'hbs')

// in case changing views directory name and path
const viewsPath = path.join(__dirname,'../template/views' )
app.set('views',viewsPath)

// Setup Partials
const partialPath = path.join(__dirname,'../template/partials')
hbs.registerPartials(partialPath)


// Routes for dynamic templating
app.get('', (req, res)=>{
    res.render('index',{
        'title':'Dynamic Templeting Using Handlebar View Engine',
        'description':'Welcome to Homepage'
    })
})

app.get('/about', (req, res)=>{
    res.render('about',{
        title:'About Us',
        description:'Welcome to About us page'
    })
})

app.get('/help', (req, res)=>{
    res.render('about',{
        title:'Helpdesk',
        description:'Welcome to Help page'
    })
})

// Setting up query string 

app.get('/forecast',(req,res)=>{
    if(!req.query.search) {
        return res.send({
            error:'Please provide a location for forecasting weather'
        })
    }

    geocode(req.query.search, (error, {location, lattitude, longitude } = { } )=>{
        if(error) {
            return res.send({
                error_message: error
            })
        }
        
        res.send({
            search: req.query.search,
            location,
            lattitude,
            longitude,
            forecast:'Weather is cloudy here'
        })  
    })
})

// static view from public folder

app.use(express.static(publicDirPath))

// app.get('', (req, res)=>{
//     res.send('Hello Express !!!! ')
// })

// app.get('/help', (req, res)=>{
//     res.send('Welcome to help page')
// })

// app.get('/about', (req, res)=>{
//     res.send('Welcome to about page')
// })

app.get('/weather', (req, res)=>{
    res.send('Welcome to weather page')
})

app.get('/about/*', (req, res)=>{
   res.render('404', {
       title:'Article Not found',
       description:'Article you are looking for might be removed or moved to another page'
   })
})

app.get('*', (req, res)=>{
    res.render('404', {
        title:'Page Not found',
        description:'The page you are looking for might be removed or moved to another location '
    })
})

// Initialize the server 
app.listen(port, ()=>{
    console.log(`Server is up and running at port ${port}`)
})