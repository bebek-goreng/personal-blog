import express from "express";
import { PostControllers } from "../controllers/post-controller.js";
import { uploadImage } from "../middlewares/multer.js";

export const postRouter = express.Router();

postRouter.get('/posts', PostControllers.getAllPost);
postRouter.get(`/post-details/:id`, PostControllers.getDetailsPost);
postRouter.get(`/post/category?`, PostControllers.getPostByCategory);
postRouter.post(`/create-post`, uploadImage.array("image"), PostControllers.createPost);
postRouter.put(`/update-post`, PostControllers.updatePost);
postRouter.delete(`/delete-post`, PostControllers.deletePost);