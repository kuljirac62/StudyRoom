let express = require('express');
const {sequelize} = require('./models');
let cors = require('cors')
const config = require('./config/config');

let bodyParser = require('body-parser')

const app = express();

app.use(bodyParser.json())
app.use(bodyParser.urlencoded({extended: true}))
app.use(cors())
app.use('/assets',express.static('public'))

require('./userPassport')

require('./routes')(app)

app.get('/status', function (req, res){
    res.send('Hello nodejs server')
})

let port = process.env.PORT || config.port;
sequelize.sync({force: false}).then(() =>{
    app.listen(port, function(){
        console.log('server running on ' + port);
    })
})