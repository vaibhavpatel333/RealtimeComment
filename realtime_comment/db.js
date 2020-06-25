const mongoose = require('mongoose')
const url ='mongodb+srv://vaibhav:vaibhav@clustertest-wmbh4.mongodb.net/blogcomment?retryWrites=true&w=majority'
mongoose.connect(url,{ useNewUrlParser: true, useCreateIndex: true })

const connection =  mongoose.connection


try {
    connection.once('open',function(){
        console.log("DB connected..")
    })
    
} catch (error) {
    console.log("Connecation failed",error)
}