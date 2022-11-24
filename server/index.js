const express = require("express");
const app = express();
const mongoose = require("mongoose");
var bodyParser = require("body-parser");
var cors = require("cors");
const multer = require("multer");

const port = 8080;
app.use(cors());
// parse application/x-www-form-urlencoded
app.use(bodyParser.urlencoded({ extended: false }));

// parse application/json
app.use(bodyParser.json());

app.get("/", (req, res) => {
  res.send("helo");
});

try {
  mongoose.connect(
    "mongodb+srv://Diksha:Conestoga2021@cluster0.otr4yhi.mongodb.net/?retryWrites=true&w=majority",
    {
      useNewUrlParser: true,
      useUnifiedTopology: true,
    }
  );
} catch (error) {
  res.send("Error");
}

//  SETTING UP THE STORAGE TO STORE THE IMAGES OF THE WEBSITE
// USING MULTER
// const storage = multer.diskStorage({
//   destination: (req, file, cd) => {
//     cb(null, "uploads");
//   },
//   filename: (req, file, cb) => {
//     cb(null, file.filename);
//   },
// });

// // TELLING MULTER TO STORE THE DATA
// const upload = multer({ storage: storage });

// users route for authenticaiton and other required puposes.
app.use("/users", require("./routes/userRoutes"));
app.use("/listing", require("./routes/listingRoutes"));
app.use("/conversation", require("./routes/conversationsRoutes"));
app.use("/messages", require("./routes/messagesRoutes"));

app.listen(port, () => {
  console.log(`Server is running on port 8080`);
});
