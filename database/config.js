import mongoose from "mongoose";

export {dbConnection}

const dbConnection = async()=>{
try {
    
   await mongoose.connect(process.env.MONGODB_ATLAS,{

   })

console.log('Base de datos conectada')

} catch (error) {
    throw new Error ('Error iniciando base de datos')
}

}