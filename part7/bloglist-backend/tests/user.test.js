const mongoose = require("mongoose");
const supertest = require("supertest");
const app = require("../app");
const User = require("../models/user");

const api = supertest(app);

const initalUsers = [
  {
    name: "Test Name",
    username: "testuser",
    passwordHash: "password"
  },
  {
    name: "Test Name 2",
    username: "testuser2",
    passwordHash: "password"
  }
];

beforeEach(async () => {
  await User.deleteMany({});

  const usersArray = initalUsers.map(user => new User(user));
  const promiseArray = usersArray.map(user => user.save());

  await Promise.all(promiseArray);
});

describe("retriving users", () => {
  test("returns 200 response", async () => {
    await api
      .get("/api/users")
      .expect(200)
      .expect("Content-Type", /application\/json/);
  });

  test("returns the correct number of users", async () => {
    const users = await api.get("/api/users");

    expect(users.body.length).toBe(initalUsers.length);
  });
});

describe("creating users", () => {
  test("works correctly", async () => {
    const userToCreate = {
      name: "New User",
      username: "test",
      password: "12345"
    };

    const createdUser = await api.post("/api/users").send(userToCreate);

    expect(createdUser.body.user).toBe(userToCreate.user);
    expect(createdUser.body.username).toBe(userToCreate.username);
  });

  test("with a username lower than 3 character server sents 400 and an error", async () => {
    const userWithShortUserName = {
      username: "12",
      password: "12345"
    };

    const apiResponse = await api
      .post("/api/users")
      .send(userWithShortUserName);

    expect(apiResponse.status).toBe(400);
    expect(apiResponse.body).toHaveProperty("error");
  });

  test("with a password lower than 3 character server sents 400 and an error", async () => {
    const userWithShortPassword = {
      username: "username",
      password: "12"
    };

    const apiResponse = await api
      .post("/api/users")
      .send(userWithShortPassword);

    expect(apiResponse.status).toBe(400);
    expect(apiResponse.body).toHaveProperty("error");
  });
});

afterAll(() => {
  mongoose.connection.close();
});
