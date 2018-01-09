module.exports = function(express) {
	var axios = require('axios')
	var Account = require('./database/Account')
	var _ = require('lodash')
	var config = require('./config')


	var blockCypherApi = 'https://api.blockcypher.com/v1/eth/main'
	var blockCypherToken = config.TOKEN

	// Router instance
	var router = express.Router();

	// Create accout/wallet
	router.post('/createWallet', (req, res) => {

		// Get body
		var body = req.body

		// Getting methods from account model
		var methods = new Account()

		// Get params
		var username = body.username
		var password = methods.generateHash(body.password)

		// Input validation
		if (!username || !password) return res.json({error: 'Please provide username and password'})

		axios.post(`${blockCypherApi}/addrs`)
			.then((response) => {
				var data = response.data
				var public = data.public
				var private = methods.encryptPrivate(data.private)
				var address = data.address
				if (!data.address || !data.public || !data.private) 
					return res.json({error: 'An error has occured.'})

				var attributes = {
					username,
					password,
					public,
					private,
					address
				}

				// Create account
				var account = new Account(attributes)
				
				// Save account
				account.save((error) => {
					if (error) res.json({error: 'Could not save account.'})
					res.json({address})
				})
			})
			.catch((error) => {
				res.json({error: 'An error has occured'})
			})
	})

	return router
}
