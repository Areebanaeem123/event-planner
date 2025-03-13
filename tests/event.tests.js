const request = require("supertest");
const express = require("express");
const eventRoutes = require("../routes/eventRoutes");

const app = express();
app.use(express.json());
app.use("/api/events", eventRoutes);

describe("Event Routes", () => {
    it("should create a new event", async () => {
        const newEvent = {
            name: "Meeting",
            description: "Discuss project details",
            date: "2025-04-10",
            time: "10:00 AM",
            category: "Work"
        };

        const response = await request(app)
            .post("/api/events")
            .send(newEvent);

        expect(response.status).toBe(201);
        expect(response.body.name).toBe(newEvent.name);
    });

    it("should get all events", async () => {
        const response = await request(app).get("/api/events");
        expect(response.status).toBe(200);
        expect(Array.isArray(response.body)).toBe(true);
    });
});
