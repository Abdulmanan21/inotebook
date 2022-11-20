const mongoose= require('mongoose')
const mongoURI ='mongodb://localhost:27017/inotebook?readPreference=primary&appname=MongoDB%20Compass&directConnection=true&ssl=false'
const connectdb= async()=>{
 await mongoose.connect(mongoURI, ()=>{
      console.log('connected to mongoose successfully')
  })
}
module.exports= connectdb;