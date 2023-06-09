const express = require("express");
const bodyParser = require("body-parser");
const request = require("request");
const https = require("https");

const app = express();
app.use(express.static("public"));
app.use(bodyParser.urlencoded({ extended: true }));
app.get("/", function (req, res) {
  res.sendFile(__dirname + "/signup.html");
});

app.post("/", function (req, res) {
  const firstName = req.body.fname;
  const lastName = req.body.lname;
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
  const jsonData = JSON.stringify(data);
  const url = "https://us9.api.mailchimp.com/3.0/lists/1a2d16978b";

  const options = {
    method: "POST",
    auth: "aqib:f7c458ea0a823b73a6823e7d59ed03fb-us9",
  };

  const request = https.request(url, options, function (response) {
    if (response.statusCode === 200) {
      res.send("Success");
    } else {
      res.send("Error: Please Try Again");
    }
    response.on("data", function (data) {
      console.log(JSON.parse(data));
    });
  });
  request.write(jsonData);
  request.end;
});
app.listen(3000, function () {
  console.log("Server has started on port 3000");
});

//API Key
//f7c458ea0a823b73a6823e7d59ed03fb-us9

//Audience ID
//1a2d16978b
