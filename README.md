# ethWallet
Ethereum Wallet API

This project was created for the purposes of an interview question. The server is an API with one endpoint that returns the wallet address while storing the private key, public key, username, and password of the associated user. This API could be extended in the future to include other endpoints for transactional purposes.

For security purposes, the user's password has been hashed and the private key has been encrypted before being stored in a mongodb database. A future improvement could be the use of HTTPS. However, HTTPS makes testing locally difficult and was thus, not used.

Other improvements in the future would be to add a deploy script for a Docker container so that the server could run anywhere.

To run server.js, you will need npm (Node Package Manager) and NodeJS, and both can be downloaded together at https://nodejs.org/en/.

You will also need to place a config.js file into the main directory of the project. The config.js file should look like the following: 

  module.exports = {
    ENCRYPTION_KEY: 'secret key 123',
    DB_USER: 'the mongodb username',
    DB_PASS: 'the mongodb password',
    DB_HOST: 'host:port/database_name',
    TOKEN: 'Your BlockCyper API Access Token'
  }


Technologies used:
  NodeJS
  Express Framework
  CryptoJS
  BCrypt
  MongoDB
  Mongoose

Endpoint:

  POST - /api/v1/createWallet

  request {
    username,
    password
  }

  response {
    address
  }

  Side Effect:

  Store Account {
    username,
    password(hashed),
    public,
    private(AES Encrypted),
    address
  }

Special credits to BlockCypher for providing a base API for communicating with the Ethereum blockchain
