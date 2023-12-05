const mongoose = require('mongoose')

const connectDb = async () => {
  try {
    await mongoose.connect(
      'mongodb+srv://Mayb:GGP6I36nlMPYDjd5@clusterresqr.zrypaqq.mongodb.net/?retryWrites=true&w=majority')
    console.log("DB is connected")
  } catch (e) {
    console.log(e,'DB Error')
  }
}

module.exports = connectDb