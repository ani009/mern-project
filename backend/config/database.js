const mongoose = require('mongoose');
require('dotenv').config();

connectdb = async () => {
    try {
        await mongoose.connect(process.env.DATABSE_URL_KEY, {
            useNewUrlParser: true,
            useUnifiedTopology: true,
        });
        console.log("db connected successfully");
        const fetchdata = await mongoose.connection.db.collection("food_items").find({}).toArray();
        global.food_items=fetchdata;
        try{
        const food_category=await mongoose.connection.db.collection("food_category").find({}).toArray()
        global.food_category=food_category;
        }
        catch(err){

        }
        // console.log(global.food_items);
    } catch (err) {
        console.log("not connected with db", err);
    }
}

module.exports = connectdb;
