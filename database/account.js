var mongoose = require('mongoose')
var Schema = mongoose.Schema
var bcrypt   = require('bcrypt-nodejs')
var crypto = require('crypto-js')
var key = require('../config').ENCRYPTION_KEY

// Create account schema
var accountSchema = Schema({
	username: String,
	password: String, 
	private: String,
	public: String,
	address: String
})

// Hash the password
accountSchema.methods.generateHash = (password) => {
    return bcrypt.hashSync(password, bcrypt.genSaltSync(8), null)
}

// Check password
accountSchema.methods.validatePassword = (password) => {
    return bcrypt.compareSync(password, this.password)
}

accountSchema.methods.encryptPrivate = data => {
	return crypto.AES.encrypt(data, key)
}

accountSchema.methods.decryptPrivate = data => {
	var bytes = crypto.AES.decrypt(data, key)
	return bytes.toString(crypto.enc.Utf8)
}

// Export account class
module.exports = mongoose.model('Account', accountSchema)