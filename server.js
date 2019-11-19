const express = require("express");
const mongoose = require("mongoose");
const bodyParser = require("body-parser");
const passport = require("passport");
const path = require("path");

// Insert API Routes below
const auth = require("./routes/api/auth");
const doctor = require("./routes/api/doctor");
const patient = require("./routes/api/patient");
const payment = require("./routes/api/payment");
const researcher = require("./routes/api/researcher");

const app = express();

// Body parser middleware
app.use(bodyParser.urlencoded({ extended: false }));
app.use(bodyParser.json());

// DB Config
const db = require("./config/keys").mongoURI;

// Connect to MongoDB
mongoose
  .connect(db, { useUnifiedTopology: true, useNewUrlParser: true })
  .then(() => console.log("MongoDB Connected"))
  .catch(err => console.log(err));

/*
// Passport middleware
app.use(passport.initialize());

// Passport config
require("./config/passport")(passport); */

// Insert Use Apps below
app.use("/api/auth", auth);
app.use("/api/doctor", doctor);
app.use("/api/patient", patient);
app.use("/api/payment", payment);
app.use("/api/researcher", researcher);

// Server static assets if in production
if (process.env.NODE_ENV === "production") {
  // Set static folder
  app.use(express.static("client/build"));

  app.get("*", (req, res) => {
    res.sendFile(path.resolve(__dirname, "client", "build", "index.html"));
  });
}

const port = process.env.PORT || 5000;

app.listen(port, () => console.log(`Server running on port ${port}`));
