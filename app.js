const express = require("express");
const bodyparser = require("body-parser");
const date = require(__dirname + "/date.js")

const app = express();

const items = ["Bye Food","Cook Food", "Eat Food"];
const workItems = [];

app.set("view engine", "ejs");
app.use(bodyparser.urlencoded({ extended: true }));
app.use(express.static("public"));

app.get("/", function(req, res) {

    const day = date.getDate();
  res.render("List", { listTitle: day, newListItems: items });
});

    app.post("/", function(req, res){
        const item = req.body.newItem;

        if (req.body.list === "Work") {
            workItems.push(item);
            res.redirect("/work")
        } else {
            items.push(item);
            res.redirect("/")
        }

    });

    app.get("/work", function(req,res){
        res.render("List", {listTitle:"Work List", newListItems: workItems});
    });

    app.get("/about", function(req,res){
        res.render("about");
    });

    app.post("/work", function(req,res){
        const item = req.body.newItem;
        workItems.push(item);
        res.redirect("/work");
    });

app.listen(3000, function() {
  console.log("Server is started on port 3000");
});
