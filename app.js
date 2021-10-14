const express = require("express");
const bodyParser = require("body-parser");
const request = require("request");
const https = require("https");
const { response } = require("express");

const app = express();

app.use(express.static("public"));
app.use(bodyParser.urlencoded({ extended: true }));

app.get("/", function (req, res) {
  res.sendFile(__dirname + "/signUp.html");
});

app.post("/", function (req, res) {
  const firstName = req.body.firstName;
  const lastName = req.body.lastName;
  const email = req.body.email;

  const data = {
    members: [
      {
        email_address: email,
        status: "subscribed",
        merge_fields: {
          FNAME: firstName,
          LNAME: lastName,
        },
      },
    ],
  };

  const jsonDate = JSON.stringify(data);

  const url = "https://us5.api.mailchimp.com/3.0/lists/0c1a4bfb91";

  const option = {
    method: "POST",
    auth: "dallen360:ec59eb8bce117bfd680d83c5426c5ef8-us5",
  };

  const request = https.request(url, option, function (response) {
    if (response.statusCode === 200) {
      res.sendFile(__dirname + "/success.html");
    } else {
      res.sendFile(__dirname + "/failure.html");
    }
  });

  request.write(jsonDate);
  request.end();
});

app.post("/failure", function (req, res) {
  const url = "https://us5.api.mailchimp.com/3.0/lists/0c1a4bfb91";

  const option = {
    method: "POST",
    auth: "dallen360:ec59eb8bce117bfd680d83c5426c5ef8-us5",
  };

  const request = https.request(url, option, function (response) {
    if (response.statusCode === 200) {
      res.sendFile(__dirname + "/success.html");
    } else {
      res.sendFile(__dirname + "/failure.html");
    }
  });

  request.write(jsonDate);
  request.end();
});

app.listen(3000, function () {
  console.log("Server is running on 3000");
});

// ec59eb8bce117bfd680d83c5426c5ef8-us5
//  0c1a4bfb91.
//ec59eb8bce117bfd680d83c5426c5ef8-us5
