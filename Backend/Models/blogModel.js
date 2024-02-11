import mongoose from "mongoose";

const blogSchema = new mongoose.Schema({
  title: { type: String, required: true },
  description: { type: String, required: true },
  content: { type: String, required: true },
  category: { type: String, required: true },
  photo: { data: Buffer, contentType: String },
  userId: { type: mongoose.ObjectId, ref: "Users" },
  createdAt: { type: Date, default: Date.now() },
});

export default mongoose.model("Blog", blogSchema);
