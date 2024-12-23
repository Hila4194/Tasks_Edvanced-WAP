import request from "supertest";
import initApp from "../server";
import mongoose from "mongoose";
import commentModel from "../models/comments_model";
import {Express} from "express";
import testComments from "./test_comments.json";

let app: Express;

beforeAll(async ()=>{
    console.log("Before all tests");
    app = await initApp();
    await commentModel.deleteMany();
});

afterAll(async()=>{
    console.log("After all tests");
    await mongoose.connection.close();
});

let commentId = "";

describe("Comments Test", ()=>{
    test("Test get all comments empty", async ()=>{
        const response = await request(app).get("/comments");
        expect(response.statusCode).toBe(200);
        expect(response.body.length).toBe(0);
    });

    test("Test create new comment", async ()=>{
        for(let comment of testComments){
            const response = await request(app).post("/comments").send(comment);
            expect(response.statusCode).toBe(201);
            expect(response.body.author).toBe(comment.author);
            expect(response.body.comment).toBe(comment.comment);
            expect(response.body.postId).toBe(comment.postId);
            commentId = response.body._id;
        }
    });

    test("Test get all comments full", async ()=>{
        const response = await request(app).get("/comments");
        expect(response.statusCode).toBe(200);
        expect(response.body.length).toBe(testComments.length);
    });

    test("Test get comment by id", async ()=>{
        const response = await request(app).get("/comments/" + commentId);
        expect(response.statusCode).toBe(200);
        expect(response.body._id).toBe(commentId);
    });

    test("Test filter comment by author", async ()=>{
        const response = await request(app).get("/comments?suthor=" + testComments[0].author);
        expect(response.statusCode).toBe(200);
        expect(response.body.length).toBe(2);
    });

    test("Test Delete comment by id", async ()=>{
        const response = await request(app).delete("/comments/" + commentId);
        expect(response.statusCode).toBe(200);
        
        const responseGet = await request(app).get("/comments/" + commentId);
        expect(responseGet.statusCode).toBe(404);
    });

    test("Test create new comment - fail", async ()=>{
        const response = await request(app).post("/comments").send({
            comment: "Test Comment 1",
            author: "Hila"
        });
        expect(response.statusCode).toBe(400);
    });
});