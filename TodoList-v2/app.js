const express = require("express");
const bodyParser = require("body-parser");
const mongoose = require("mongoose");
const _ = require("lodash");
const app = express();

app.set("view engine", "ejs");
app.use(bodyParser.urlencoded({ extended: true }));
app.use(express.static("public"));

const connectDB = async () => {
  try {
    await mongoose.connect("mongodb://localhost:27017/todoListDB");
    console.log(`Connected to database: ${process.pid}`);
  } catch (err) {
    console.log(`Connection error: ${err.stack} on Process: ${process.pid}`);
    process.exit(1);
  }
};
connectDB();

//Schema
const itemSchema = { name: String }; //for single item
const listSchema = { name: String, items: [itemSchema] }; // To store item lists

//Creating MongoDb Models(Collections)
const Item = mongoose.model("Item", itemSchema);
const List = mongoose.model("List", listSchema);

//Default Items
const item1 = new Item({ name: "Welcome to TODO List" });
const item2 = new Item({ name: "Add New Items to the List" });

const defaultItems = [item1, item2];

app.get("/", async function (req, res) {
  try {
    const foundItems = await Item.find({});
    if (foundItems.length === 0) {
      await Item.insertMany(defaultItems);
      console.log("Data Added Successfully");
      res.redirect("/");
    } else {
      res.render("list", {
        listTitle: "Today",
        newListItems: foundItems,
      });
    }
  } catch (err) {
    console.log("Something went Wrong" + err);
  }
});

app.post("/", async function (req, res) {
  const itemName = req.body.newItem;
  const listName = req.body.list;

  const item = new Item({
    name: itemName,
  });
  if (listName === "Today") {
    item.save();
    res.redirect("/");
  } else {
    try {
      const foundList = await List.findOne({ name: listName });
      foundList.items.push(item);
      foundList.save();
      res.redirect("/" + listName);
    } catch (err) {
      console.log(err);
    }
  }
});

app.post("/delete", async function (req, res) {
  const deleteItemID = req.body.deleteItem;
  const listName = req.body.listName;

  if (listName === "Today") {
    try {
      const item = await Item.findByIdAndRemove(deleteItemID);
      console.log("Deleted Data Successfully");
    } catch (err) {
      console.log("Deletion Error" + err);
    }
    res.redirect("/");
  } else {
    try {
      await List.findOneAndUpdate(
        { name: listName },
        { $pull: { items: { _id: deleteItemID } } }
      );
      res.redirect("/" + listName);
    } catch (err) {
      console.log(err);
    }
  }
});

app.get("/:customList", async (req, res) => {
  const customListName = _.capitalize(req.params.customList);

  // check same list exists or not
  try {
    const checkExistingList = await List.findOne({ name: customListName });
    if (!checkExistingList) {
      const list = new List({
        name: customListName,
        items: defaultItems,
      });
      list.save();
      res.redirect("/" + customListName);
    } else {
      res.render("list", {
        listTitle: checkExistingList.name,
        newListItems: checkExistingList.items,
      });
    }
  } catch (err) {
    console.log(err);
  }
});

app.get("/about", function (req, res) {
  res.render("about");
});

app.listen(3006, function () {
  console.log("Server started on port 3000");
});
