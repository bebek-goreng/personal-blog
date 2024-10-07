import { PostRepositories } from "../repositories/post-repository.js";

export class PostService {
    static async getAllPost(data) {
        const post = await PostRepositories.getAllPost(data);

        if (!post || post.length === 0) {
            throw { status: 404, message: "post not found" }
        }

        return post;
    }

    static async getOnePost(data) {
        const post = await PostRepositories.getPostById(data.id) || await PostRepositories.getOnePost(data);

        if (!post) {
            throw { status: 400, message: "Post not found" };
        }

        return post;
    }


    static async createPost(data) {
        if (data == null || data == {}) {
            throw { status: 400, message: "Invalid input to create post" }
        }

        const title = {
            title: data.title
        }

        const existingPost = await PostRepositories.getOnePost(title)

        if (existingPost) {
            throw { status: 400, message: "post or title already exist" }
        }

        const newPost = await PostRepositories.createPost(data);
        return newPost;
    }

    static async updatePost(data) {
        if (!data.id) {
            throw { status: 400, message: "Invaid input, post ID required" }
        }

        const updatedPost = await PostRepositories.updatePost(data);

        if (!updatedPost) {
            throw { status: 400, message: "failed to update post" }
        }

        return updatedPost;
    }

    static async deletePost(data) {
        const deletedPost = await PostRepositories.deletePost(data);

        if (!deletedPost) {
            throw { status: 404, message: "failed to delete post" }
        }

        return deletedPost;
    }
}