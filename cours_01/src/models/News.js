import mongoose from "mongoose";

const NewsSchema = new mongoose.Schema({
  title: {
    type: String,
    require: true,
  },
  text: {
    type: String,
    require: true,
  },
  banner: {
    type: String,
    require: true,
  },
  createdAt: {
    type: Date,
    default: Date.now(),
  },
  user: {
    // cela dit que ce type vient d'un Schema de mongoose
    type: mongoose.Schema.Types.ObjectId,
    // cela doit etre exactement comme notre table mongoose = nom de mon Schema User
    ref: "User",
    require: true,
  },
  likes: {
    type: Array,
    default: [],
    require: true,
  },
  comments: {
    type: Array,
    default: [],
    require: true,
  },
});

const News = mongoose.model("News", NewsSchema);

export default News;
