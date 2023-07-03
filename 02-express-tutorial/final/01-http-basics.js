const http = require('http')

const server = http.createServer((req,res) => {
    const url = req.url;
    if(url === '/'){
        res.writeHead(200, {'content-type':'text/html'}) //HTTP Message header
        res.write(homePage)
        res.end() //indicates that the communication is over
    }
    //About Page
    else if(url === '/about'){
        res.writeHead(200, {'content-type':'text/html'}) //HTTP Message header
        res.write('<h1>about page</h1>')
        res.end() //indicates that the communication is over
    }
    //Styles
    else if(url === '/styles.css'){
        res.writeHead(200, {'content-type':'text/css'}) //HTTP Message header
        res.write(homestyles)
        res.end() //indicates that the communication is over
    }
     // Image/logo
     else if(url === '/logo.svg'){
        res.writeHead(200, {'content-type':'image/svg+xml'}) //HTTP Message header
        res.write(homeImage)
        res.end() //indicates that the communication is over
    }
    // Logic
    else if(url === '/browser-app.js'){
        res.writeHead(200, {'content-type':'image/javascript'}) //HTTP Message header
        res.write(homeLogic)
        res.end() //indicates that the communication is over
    }
    //404
    else{
        res.writeHead(404, {'content-type':'text/html'}) //HTTP Message header
        res.write('<h1>Page not found</h1>')
        res.end() //indicates that the communication is over
    
    }
    })

//server port number is 5000
server.listen(5000)