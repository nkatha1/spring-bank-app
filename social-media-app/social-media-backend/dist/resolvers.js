"use strict";
var __awaiter = (this && this.__awaiter) || function (thisArg, _arguments, P, generator) {
    function adopt(value) { return value instanceof P ? value : new P(function (resolve) { resolve(value); }); }
    return new (P || (P = Promise))(function (resolve, reject) {
        function fulfilled(value) { try { step(generator.next(value)); } catch (e) { reject(e); } }
        function rejected(value) { try { step(generator["throw"](value)); } catch (e) { reject(e); } }
        function step(result) { result.done ? resolve(result.value) : adopt(result.value).then(fulfilled, rejected); }
        step((generator = generator.apply(thisArg, _arguments || [])).next());
    });
};
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.resolvers = void 0;
const client_1 = require("@prisma/client");
const bcryptjs_1 = __importDefault(require("bcryptjs"));
const jsonwebtoken_1 = __importDefault(require("jsonwebtoken"));
const prisma = new client_1.PrismaClient();
exports.resolvers = {
    Query: {
        me: (_1, __1, _a) => __awaiter(void 0, [_1, __1, _a], void 0, function* (_, __, { userId }) {
            if (!userId)
                throw new Error('Not authenticated');
            return yield prisma.user.findUnique({
                where: { id: userId },
                include: { posts: true, followers: true, following: true }
            });
        }),
        getUser: (_1, _a) => __awaiter(void 0, [_1, _a], void 0, function* (_, { id }) {
            return yield prisma.user.findUnique({
                where: { id },
                include: { posts: true, followers: true, following: true }
            });
        }),
        getPosts: () => __awaiter(void 0, void 0, void 0, function* () {
            return yield prisma.post.findMany({
                include: { user: true }
            });
        }),
        getPost: (_1, _a) => __awaiter(void 0, [_1, _a], void 0, function* (_, { id }) {
            return yield prisma.post.findUnique({
                where: { id },
                include: { user: true }
            });
        }),
        getUserPosts: (_1, _a) => __awaiter(void 0, [_1, _a], void 0, function* (_, { userId }) {
            return yield prisma.post.findMany({
                where: { userId },
                include: { user: true }
            });
        }),
        getUserFollowers: (_1, _a) => __awaiter(void 0, [_1, _a], void 0, function* (_, { userId }) {
            const user = yield prisma.user.findUnique({
                where: { id: userId },
                select: { followers: true }
            });
            return user === null || user === void 0 ? void 0 : user.followers;
        }),
        getUserFollowing: (_1, _a) => __awaiter(void 0, [_1, _a], void 0, function* (_, { userId }) {
            const user = yield prisma.user.findUnique({
                where: { id: userId },
                select: { following: true }
            });
            return user === null || user === void 0 ? void 0 : user.following;
        })
    },
    Mutation: {
        register: (_1, _a) => __awaiter(void 0, [_1, _a], void 0, function* (_, { email, password, name }) {
            const hashedPassword = yield bcryptjs_1.default.hash(password, 10);
            const newUser = yield prisma.user.create({
                data: {
                    email,
                    password: hashedPassword,
                    name
                }
            });
            return newUser;
        }),
        login: (_1, _a) => __awaiter(void 0, [_1, _a], void 0, function* (_, { email, password }) {
            const user = yield prisma.user.findUnique({ where: { email } });
            if (!user)
                throw new Error('User not found');
            const validPassword = yield bcryptjs_1.default.compare(password, user.password);
            if (!validPassword)
                throw new Error('Invalid credentials');
            const token = jsonwebtoken_1.default.sign({ userId: user.id }, process.env.JWT_SECRET, { expiresIn: '1h' });
            return token;
        }),
        createPost: (_1, _a, _b) => __awaiter(void 0, [_1, _a, _b], void 0, function* (_, { content }, { userId }) {
            if (!userId)
                throw new Error('Not authenticated');
            const newPost = yield prisma.post.create({
                data: {
                    content,
                    userId
                }
            });
            return newPost;
        }),
        likePost: (_1, _a, _b) => __awaiter(void 0, [_1, _a, _b], void 0, function* (_, { postId }, { userId }) {
            if (!userId)
                throw new Error('Not authenticated');
            const existingLike = yield prisma.like.findUnique({
                where: { userId_postId: { userId, postId } }
            });
            if (existingLike)
                throw new Error('You already liked this post');
            const like = yield prisma.like.create({
                data: {
                    postId,
                    userId
                }
            });
            return like;
        }),
        followUser: (_1, _a, _b) => __awaiter(void 0, [_1, _a, _b], void 0, function* (_, { followingId }, { userId }) {
            if (!userId)
                throw new Error('Not authenticated');
            const existingFollow = yield prisma.follow.findUnique({
                where: { followerId_followingId: { followerId: userId, followingId } }
            });
            if (existingFollow)
                throw new Error('Already following this user');
            yield prisma.follow.create({
                data: {
                    followerId: userId,
                    followingId
                }
            });
            return 'Followed successfully';
        }),
        unfollowUser: (_1, _a, _b) => __awaiter(void 0, [_1, _a, _b], void 0, function* (_, { followingId }, { userId }) {
            if (!userId)
                throw new Error('Not authenticated');
            yield prisma.follow.delete({
                where: {
                    followerId_followingId: { followerId: userId, followingId }
                }
            });
            return 'Unfollowed successfully';
        })
    },
    Post: {
        likes: (parent) => __awaiter(void 0, void 0, void 0, function* () {
            const likes = yield prisma.like.count({
                where: { postId: parent.id }
            });
            return likes;
        })
    }
};
//# sourceMappingURL=resolvers.js.map