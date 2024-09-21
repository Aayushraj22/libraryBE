import { mongoose } from 'mongoose';

async function connectToDB() {
  const uri = process.env.MONGO_DB_CONNECTION_URI;
  
  mongoose.connect(uri)
  mongoose.connection.once('open', () => console.log('Database Connection Stablised'))
  mongoose.connection.on('error', (error) => {
    console.log("Database Connection error: ",error)
  })

}

export default connectToDB;






