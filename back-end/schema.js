// this file defines the Models/Schema for objects in our application
const mongoose = require("mongoose");
const { Schema } = mongoose;

// Define the register schema

const RegisterSchema = new Schema({
  email: {
    type: String,
    required: true,
  },
  password: {
    type: String,
    required: true,
  },
  avatarUrl:{
    type: String,
    default: '',
  }
 
});

// Define the review schema
const ReviewSchema = new Schema({
  value: {
    type: Number,
    min: 0,
    max: 5,
    required: true,
    //Need to change min to 1 once we figure out the error.
    //Otherwise change DishReview min to 0 -- This seems easier
  },
  date: {
    type: Date,
    default: Date.now,
    required: true,
  },
  userID: {
    type: String,
    //pending for the implmentation of userId
    required: true,
  },
  picUrl:{
    type: String,
    default: '',
  } 
});

// Define the dish schema
const DishSchema = new Schema({
  name: {
    type: String,
    required: true,
  },
  // TODO: implement this stuff..uploads and method on model to calculate,
  //  then every time the reviews are touched (ex, by "add review"), this method
  //  should be called
  // mainImage: {
  //   type: String,
  //   required: false,
  //   // TODO: change this...just for testing
  //   default: "https://images.ctfassets.net/o19mhvm9a2cm/3TqdEA20hEleGPCZj2JZJl/297b157fdd3ca108c74f17b1bd5fdfce/Website_RB_HP.png"
  // },
  image: {
    type: String,
    required: false,
  },
  averageRating: { type: Number, required: false },
  reviews: [ReviewSchema],
});

// Define the Restaurant schema
const RestaurantSchema = new Schema({
  name: {
    type: String,
    required: true,
  },
  location: {
    type: String,
    required: true,
  },
  dishes: [DishSchema],
});

RestaurantSchema.index({ "$**": "text" });

module.exports = { RestaurantSchema, RegisterSchema, ReviewSchema, DishSchema };
