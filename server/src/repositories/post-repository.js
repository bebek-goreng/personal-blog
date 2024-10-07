import { prisma } from "../config/database.js";
import { slug } from '../utils/slug.js'

export class PostRepositories {
    static async createPost(data) {
        const { userId, title, content, image } = data;
        const slugify = slug(title);

        let urlImage;

        if (image) {
            urlImage = image.map((img) => `http://localhost:8080/post/image/${img.filename}`);
        }

        const post = await prisma.post.create({
            data: {
                userId: +userId,
                title: title,
                content: content,
                slug: slugify,
                imageUrl: urlImage,
            }
        });

        return post;
    }

    static async getAllPost(data = {}) {
        const post = await prisma.post.findMany({
            where: data,
            include: {
                postCategories: {
                    include: {
                        category: true
                    }
                },
                comments: true,
                likes: true
            }
        });

        return post;
    }

    static async getOnePost(data = {}) {
        const post = await prisma.post.findFirst({
            where: data
        });

        return post;
    }

    static async getPostById(data = {}) {
        const post = await prisma.post.findUnique({
            where: data
        });

        return post;
    }

    static async updatePost(data) {
        const { id, body } = data;

        const updatedPost = await prisma.post.update({
            where: {
                id: id,
            }, data: body
        });

        return updatedPost;
    }

    static async deletePost(data) {
        const { id } = data;

        const deletedPost = await prisma.post.delete({
            where: +id
        });
    }
}