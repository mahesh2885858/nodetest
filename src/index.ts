import express, { raw, request, Request } from "express";
import { db } from "./db/index.js";
import { usersTable } from "./db/schema.js";

const app = express();

const startServer = async () => {
  try {
    app.get("/", async (req, res) => {
      const user: typeof usersTable.$inferInsert = {
        age: 29,
        email: "test" + Date.now() + "@gmail.com",
        name: "mahesh-one",
      };

      await db.insert(usersTable).values(user);

      console.log("user created");
      const users = await db.select().from(usersTable);
      console.log("Getting all users from the database: ", users);
      res.send(users);
    });

    const PORT = process.env.SERVERPORT ?? 3000;

    app.listen(PORT, () => {
      console.log(`Server is running on port ${PORT}`);
    });
  } catch (error) {
    console.log("Error starting the server:", error);
    process.exit(1);
  }
};

startServer();
