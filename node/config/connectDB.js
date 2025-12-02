const mongoose=require('mongoose')

const connectToDB = async()=>{
    try {
       await mongoose.connect(process.env.DB_URI)
    } catch (error) {
        console.error("not connected\n"+error)
    }
}

module.exports=connectToDB