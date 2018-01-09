var mongoose = require('mongoose')
var config = require('../config')

// Connection parameters
var user = config.DB_USER
var pass = config.DB_PASS
var host = config.DB_HOST
var uri = `mongodb://${user}:${pass}@${host}`

var db

// Create the database connection 
var connect = function (){
	db = mongoose.connect(uri);
}

mongoose.connection.on('connected', function () {  
  console.log('Mongoose connected')
})

mongoose.connection.on('error', (error) => {  
  console.log('Mongoose error: ' + error)
})

mongoose.connection.on('disconnected', () => {  
  console.log('Mongoose disconnected')
})

process.on('SIGINT', function() {  
  mongoose.connection.close(function () { 
    console.log('Killed mongoose connection')
    process.exit(0); 
  })
})

module.exports.connect = connect
module.exports.db = db