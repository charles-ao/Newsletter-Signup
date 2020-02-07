const express = require("express"); //to require express module

const bodyParser = require("body-parser"); //to require body parser module

const request = require("request"); //to require request


const app = express();

app.use(express.static("public")); //To serve our html file with the static css file
app.use(bodyParser.urlencoded({ extended: true })); //To allow our app use bodyparser

//To serve up our server with a file 
app.get("/", function(req, res) {
    res.sendFile(__dirname + "/signup.html");
})

app.post("/", function(req, res) {

    var firstName = req.body.fname;
    var lastName = req.body.lname;
    var email = req.body.email;

    //Create your data javascript object line 25-34
    var data = {
            members: [{
                email_address: email,
                status: "subscribed",
                merge_fields: {
                    FNAME: firstName,
                    LNAME: lastName
                }
            }]
        }
        //converting your data object to jason
    var jsonData = JSON.stringify(data)

    var option = {
        url: "https://us4.api.mailchimp.com/3.0/lists/a08e88c48e",
        method: "POST",
        headers: { "Authorization": "Adedunmola db7091e8e1a75fc272c14b40abb7af8b-us4" }, //To Authorise myself on mailchimp server
        body: jsonData //Data that willbe posted
    }

    request(option, function(error, response, body) {
        if (error) {
            res.sendFile(__dirname + "/failure.html");
        } else {
            if (response.statusCode === 200) {
                res.sendfile(__dirname + "/success.html");
            } else {
                res.sendFile(__dirname + "/failure.html");
            }
        }
    })
})

app.post("/failure", function(req, res) {
    res.redirect("/");
})


app.listen(process.env.PORT || 3000, function() {
    console.log("Server is running on port 3000");
})