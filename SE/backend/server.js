const app =require("./app");
const dotenv =require("dotenv");
const dbconnect = require("./database/database");
const errorHandler=require('./middlewares/errorHandler');
// const cors=require('cors');

//config

dotenv.config({path:"backend/config/config.env"});

// app.use(cors({
//     origin:"*"
// }))


dbconnect();
app.use(errorHandler);
app.listen(process.env.PORT,()=>{
    console.log(`Server is listen on http://localhost:${process.env.PORT}`)
})