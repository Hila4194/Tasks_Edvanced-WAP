import request from "supertest";
import initApp from "../server";
import mongoose from "mongoose";
import postModel from "../models/posts_model";
import testPosts from "./test_posts";

let app;

beforeAll(async ()=>{
    console.log("Before all tests");
    app = await initApp();
    await postModel.deleteMany();
});

afterAll(async()=>{
    console.log("After all tests");
    await mongoose.connection.close();
});

describe("Posts Test", ()=>{
    test("Test get all posts empty", async ()=>{
        const response = await request(app).get("/posts");
        expect(response.statusCode).toBe(200);
        expect(response.body.length).toBe(0);
    });

    test("Test create new post", async ()=>{
        for(let post of testPosts){
            const response = await request(app).post("/posts").send(post);
            expect(response.statusCode).toBe(201);
            expect(response.body.title).toBe(post.title);
            expect(response.body.content).toBe(post.content);
            expect(response.body.sender).toBe(post.sender);
            post._id = response.body._id;
        }
    });

    test("Test get all posts full", async ()=>{
        const response = await request(app).get("/posts");
        expect(response.statusCode).toBe(200);
        expect(response.body.length).toBe(testPosts.length);
    });

    test("Test get post by id", async ()=>{
        const response = await request(app).get("/posts/" + testPosts[0]._id);
        expect(response.statusCode).toBe(200);
        expect(response.body._id).toBe(testPosts[0]._id);
    });

    test("Test filter post by sender", async ()=>{
        const response = await request(app).get("/posts?sender=" + testPosts[0].sender);
        expect(response.statusCode).toBe(200);
        expect(response.body.length).toBe(2);
    });

    test("Test Delete post by id", async ()=>{
        const response = await request(app).delete("/posts/" + testPosts[0]._id);
        expect(response.statusCode).toBe(200);
        
        const responseGet = await request(app).get("/posts/" + testPosts[0]._id);
        expect(responseGet.statusCode).toBe(404);
    });

    test("Test create new post - fail", async ()=>{
        const response = await request(app).post("/posts").send({
            title: "Test Post 1",
            content: "Test content 1"
        });
        expect(response.statusCode).toBe(400);
    });
});