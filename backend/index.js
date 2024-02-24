const express = require('express');
const cors = require('cors');
const app = express();

// Use CORS middleware


// Your other middleware and route setups

require('dotenv').config();
const port=process.env.PORT||4000;
const connectdb=require('./config/database')
connectdb();
app.use(cors());
app.use(express.json());

const routes=require('./routes/routes');
app.use('/api/v1',routes);


app.listen(port,()=>{
    console.log(`app started at ${port}`);
})