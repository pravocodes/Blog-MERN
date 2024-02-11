import express from "express";
import { requireSignIn } from "../Middleware/authMiddleware.js";
import {
  createBlog,
  deleteBlogContent,
  getBlog,
  getBlogPhoto,
  getUserBlogs,
  getsingleBlog,
  updateBlogContent,
} from "../Controllers/blogController.js";
import fileUpload from "express-fileupload";

const router = express.Router();

router.post("/create", requireSignIn, fileUpload(), createBlog);
router.get("/getblog", getBlog);
router.get("/getblogphoto/:id", getBlogPhoto);
router.get("/getsingleblog/:id", getsingleBlog);
router.get("/getuserblog/:id", requireSignIn, getUserBlogs);
router.delete("/deleteblog/:id", requireSignIn, deleteBlogContent);
router.post("/updateblog/:id", requireSignIn, fileUpload(), updateBlogContent);

export default router;
