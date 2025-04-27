import mongoose from 'mongoose'
import app from './app'
import config from './config'

async function dbConnect() {
  try {
    // console.log(config.database_url)
    await mongoose.connect(config.database_url as string)
    // logger.info(config.database_url)
    console.log('database connect successfully')
    app.listen(config.port, () => {
      console.log(`app listening on port ${config.port}`)
    })
  } catch (err) {
    console.log(err, 'err')
    console.log('database connect failed', err)
  }
}

dbConnect()
