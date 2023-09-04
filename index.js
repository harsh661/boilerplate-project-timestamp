var express = require("express")
var app = express()

const PORT = 3000

var cors = require("cors")
app.use(cors({ optionsSuccessStatus: 200 }))

app.use(express.static("public"))

app.get("/", (req, res) => {
  res.sendFile(__dirname + "/views/index.html")
})

app.get("/api/", (req, res) => {
  res.json({
    unix: new Date().getTime(),
    utc: new Date().toUTCString(),
  })
})

app.get("/api/:date", (req, res) => {
  const { date } = req.params
  let timestamp

  if (!isNaN(date)) {
    timestamp = parseInt(date)
  } else {
    timestamp = Date.parse(date)
  }

  if (!isNaN(timestamp)) {
    const utcDateString = new Date(timestamp).toUTCString()

    res.json({ unix: timestamp, utc: utcDateString })
  } else {
    res.status(400).json({ error: "Invalid Date" })
  }
})

var listener = app.listen(PORT, () => {
  console.log("Your app is listening on port " + listener.address().port)
})
