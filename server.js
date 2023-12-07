const express = require('express');
const mongoose = require('mongoose');
const bodyParser = require('body-parser');

const app = express();
const port = 3000;

//const password=process.env.12345670
// Connect to MongoDB
mongoose.connect(`mongodb://localhost:27017/MyDB1`, { useNewUrlParser: true, useUnifiedTopology: true });

// Create a user schema
const userSchema = new mongoose.Schema({
  name: String,
  gender: String,
  tel: String,
  email: String,
  password: String,
  college: String,
  course: String,
  dept: String,
  domain: String,
});

// Create a user model
const User = mongoose.model('User', userSchema);

// Middleware for parsing form data
app.use(bodyParser.urlencoded({ extended: true }));
app.use(bodyParser.json());

// Serve the registration form
app.get('/', (req, res) => {
  res.sendFile(__dirname + '/ss.html');
});

// Handle registration form submission
app.post('/register', async (req, res) => {
  const newUser = new User({
    name: req.body.name,
    gender: req.body.gender,
    tel: req.body.tel,
    email: req.body.email,
    password: req.body.password,
    college: req.body.college,
    course: req.body.course,
    dept: req.body.dept,
    domain: req.body.domain
  });
  await newUser.save();
  newUser.save((err) => {
    if (err) {
      console.error(err);
      res.send('Registration failed.');
    } else {
      res.send('Registration successful.');
      
    }
  });
});

// Start the server
app.listen(port, () => {
  console.log(`Server is running on http://localhost:${port}`);
});