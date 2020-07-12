
const mongoose = require('mongoose')

//const password = process.argv[2]
const password = 'FTSi7kzObw1PUIHB'
const url =
  `mongodb+srv://u-4ist-1:${password}@4ist-db-1.lngm0.mongodb.net/test?retryWrites=true&w=majority`

mongoose.connect(url, { useNewUrlParser: true, useUnifiedTopology: true })

function getModel(){
  return {
    name: String,
    rank: String,
    grade: String,
    homeOfRecordDistance: Number,
    date: Date,
    important: Boolean,
  }
}

const soldierSchema = new mongoose.Schema(getModel())

const Soldier = mongoose.model('Soldier', soldierSchema)

const soldier = new Soldier({
  content: 'HTML is HARD!!!!!!!!!!!!!!!!!!!!!!!!!!',
  date: new Date(),
  important: true,
})

soldier.save().then(result => {
  console.log('note saved!')
  mongoose.connection.close()
})