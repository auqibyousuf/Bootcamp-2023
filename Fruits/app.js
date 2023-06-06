const mongoose = require("mongoose");
async function main() {
  //Creates new databases or uses
  if (await mongoose.connect("mongodb://localhost:27017/fruitsDB")) {
    console.log("Successfully Connected to MongoDB");
  } else {
    main().catch((err) => console.log(err));
  }

  // use `await mongoose.connect('mongodb://user:password@127.0.0.1:27017/test');` if your database has auth enabled
}
const fruitSchema = new mongoose.Schema({
  name: {
    type: String,
    required: true,
  },
  rating: {
    type: Number,
    min: [1, "too low"],
    max: [10, "Upto 10"],
  },
  review: String,
});

const Fruit = mongoose.model("Fruit", fruitSchema);

const apple = new Fruit({
  name: "Apple",
  rating: 8,
  review: "Great Fruit",
});
const orange = new Fruit({
  name: "Orange",
  rating: 6,
  review: "Kinda sour",
});
const banana = new Fruit({
  name: "Banana",
  rating: 9,
  review: "Great Stuff",
});

const kiwi = new Fruit({
  name: "Kiwi",
  rating: 9,
  review: "Great Stuff",
});

const personSchema = new mongoose.Schema({
  name: String,
  age: Number,
  favouriteFruit: fruitSchema, //Adding relationship to Fruit
});

const PersonModel = mongoose.model("Person", personSchema);

const grapes = new Fruit({
  name: "Grapes",
  rating: 8,
  review: "Great Fruit and I Love it!",
});

const peach = new Fruit({
  name: "Peach",
  rating: 8,
  review: "Great Fruit!",
});
// peach.save();

const person = new PersonModel({
  name: "John",
  age: 20,
});

await person.find({});
person.save();
Fruit.insertMany([apple, orange, banana, kiwi])
  .then(() => {
    console.log("Successfully saved to DB");
  })
  .catch(function (err) {
    console.log(err);
  });
const docs = await Fruit.find();
console.log(docs);

// Test
const fruitsx = await Fruit.find();
const mangox = await fruitsx.find();
const redMangox = await mangox.find();
console.log(fruitsx, mangox, redMangox);

Fruit.find().then((fruitsx2) => {
  console.log(fruitsx2);
  fruitsx2.find().then((mangox2) => {
    console.log(mangox2);
    mangox2.find().then((redmangox) => {
      console.log(redMangox);
    });
  });
});

const fruits = await Fruit.find();
fruits.forEach((fruit) => {});
// .then((fruits) => {
//   fruits.forEach((fruit) => {
//     console.log(fruit.name);
//     console.log(fruit);
//   });
// })
// .catch((err) => {
//   console.log(err);
//   mongoose.connection.close();
// });

await Fruit.updateOne({ _id: "647e080aca1d9f479a3a1a40" }, { _id: 1 })
  .then(() => {
    console.log("Data Updated Successfully");
  })
  .catch((err) => {
    console.log("Error Updating Data");
  });

await Fruit.deleteOne({ _id: "647e01b3a66fc28a12c723d9" })
  .then(() => {
    console.log("Data Deleted Successfully in the document");
  })
  .catch((err) => {
    console.log("Error Deleting Data");
  });

await PersonModal.updateOne(
  { _id: "647e0f211cc6623898d5c7db" },
  { favrouteFruit: peach }
)
  .then(() => {
    console.log("Data Updated Successfully");
  })
  .catch((err) => {
    console.log("Error Updating Data");
  });
PersonModel.updateOne({ name: "John" }, { favouriteFruit: peach });
