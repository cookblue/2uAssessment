const express = require('express')
const cors = require('cors')
const { dbConnection } = require('../database/config')

class Server {
    constructor() {
        this.app = express();
        this.port = process.env.PORT;
        this.invoicePath = '/Invoice';

        this.conectarDB();

        this.middlewares();

        this.routes();
    }

    async conectarDB(){
        await dbConnection();
    }

    middlewares() {
        this.app.use(cors());

        this.app.use( express.json());

        this.app.use(express.static('public'));
    }

    routes(){
        this.app.use(this.invoicePath ,require('../routes/invoice'))
    }

    listen(){

        this.app.listen(this.port,() => {
            console.log('Server running on port', this.port);
        })
    }
}

module.exports  = Server;