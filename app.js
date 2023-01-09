const express = require("express");
const bodyParser = require("body-parser");
const request = require("request");

const app = express();

app.use(express.static("public"));
app.use(bodyParser.urlencoded({ extended: true }));

app.get("/", function (req, res) {
  res.sendFile(__dirname + "/signup.html");
});

app.post("/", function (req, res) {
  // res.sendFile(__dirname + "/signup.html");
  const firstName = req.body.fName;
  const lastName = req.body.lName;
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

  const url = "https://us21.api.mailchimp.com/3.0/lists/cb5ff9cd3f";

  const options = {
    method: "POST",
    auth: "ChuddiK:0d26ca2f5a0668dba54e6d39fde0a845-us21",
  };

  const request = https.request(url, options, function (response) {
    response.on("data", function (data) {
    //   console.log(JSON.parse(data));
    });
  });

  request.write(jsonData);
  request.end();
});

app.listen(3000, function () {
  console.log("Server is running on port 3000.");
});

//API Keys
// 0d26ca2f5a0668dba54e6d39fde0a845-us21

// cb5ff9cd3f;
