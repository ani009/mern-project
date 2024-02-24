const foodData=async(req,res)=>{
    try{
        res.send([global.food_items,global.food_category]);
    }
    catch(err){
        return res.status(500).json({
            success:false,
            message:"internal server error"
        })
    }
}
module.exports=foodData;