var express = require('express')
var app = express()
var database = require('./database/connection')
var connected = false

// Set up body parser for reading requests
app.use(express.urlencoded({ extended: true }))
app.use(express.json())

app.use(function(req, res, next){
	if(!connected){
		database.connect()
    	connected = true
	}
	next();
});

var router = require('./router')(express)

// Setting subdomain to api version one
app.use('/api/v1', router)

// Error handling
app.use(function(req, res, next) {
    var error = new Error('Not Found')
    error.status = 404
    next(error)
})

app.use(function(error, req, res, next) {
    res.status(error.status || 500)
    res.json({message: error.message})
})

// Set port to environment file defined port or default 8080
var port = process.env.PORT || 8080

// App is listening for connections on port
app.listen(port)