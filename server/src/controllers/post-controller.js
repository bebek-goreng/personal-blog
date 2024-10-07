//req.filenya bermasalah undefined

import { PostService } from "../services/post-service.js";

export class PostControllers {
    static async getDetailsPost(req, res, next) {
        try {
            const data = {
                id: +req.params.id
            }
            const post = await PostService.getOnePost(data);

            res.status(200).json({
                message: "ok",
                data: post
            });
        } catch (error) {
            next(error)
        }
    }

    static async getAllPost(req, res, next) {
        try {
            const post = await PostService.getPost();

            res.status(200).json({
                message: "ok",
                data: post
            });
        } catch (error) {
            next(error);
        }
    }

    static async getPostByCategory(req, res, next) {
        try {
            const data = {
                category: req.query.category
            }
            const post = await PostService.getPost(data);

            res.status(200).json({
                message: "ok",
                data: post
            });
        } catch (error) {
            next(error);
        }
    }

    static async createPost(req, res, next) {
        try {
            const data = { ...req.body, image: req.files };
            const post = await PostService.createPost(data);

            res.status(200).json({
                message: "ok",
                data: post
            });
        } catch (error) {
            next(error);
        }
    }

    static async updatePost(req, res, next) {
        try {
            const data = req.body;
            const post = await PostService.createPost(data);

            res.status(200).json({
                message: "ok",
                data: post
            });
        } catch (error) {
            next(error);
        }
    }

    static async deletePost(req, res, next) {
        try {
            const data = +req.params.id;
            const post = await PostService.deletePost(data);

            res.status(200).json({
                message: "ok"
            });
        } catch (error) {
            next(error);
        }
    }
}
