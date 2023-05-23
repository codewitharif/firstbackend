const express = require("express");
const bodyParser = require("body-parser");
const { default: mongoose } = require("mongoose");
const MongoClient = require("mongodb").MongoClient;

const app = express();
const port = 3000;
const mongoURI =
  "mongodb+srv://deepdive:Adventur1440e@cluster0.ynbttny.mongodb.net/test?retryWrites=true&w=majority"; // Replace with your MongoDB Atlas connection string

app.use(bodyParser.urlencoded({ extended: true }));
mongoose
  .connect(mongoURI, {
    useNewUrlParser: true,
    useUnifiedTopology: true,
  })
  .then(() => {
    console.log("connection successful");
  })
  .catch((err) => console.log("no connection" + err));

const userSchema = {
  name: String,
  state: String,
};

// Serve the HTML form
app.get("/", (req, res) => {
  res.sendFile(__dirname + "/index.html");
  console.log("get api and express is working fine");
});

// Handle form submission
app.post("/", async (req, res) => {
  const User = mongoose.model("User", userSchema);

  const newUser = new User({
    name: req.body.name,
    state: req.body.state,
  });

  console.log(newUser.name);
  console.log(newUser.state);

  await newUser.save();
  res.send("sucessfully inserted data");
});
app.listen(port, () => {
  console.log(`Server is listening on port ${port}`);
});
