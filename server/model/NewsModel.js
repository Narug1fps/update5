import mongoose from "mongoose";

const newsSchema = new mongoose.Schema({
  Title: { type: String, required: true },
  Author: { type: String, required: true },
  Link: { type: String, required: true },
  ImageURL: { type: String, required: true },
  Content: { type: String, required: true },
});

export default mongoose.model("news", newsSchema);
