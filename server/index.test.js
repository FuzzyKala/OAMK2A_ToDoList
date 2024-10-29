import { initializeTestDb, insertTestUser, getToken } from "./helper/test.js";
import { expect } from "chai";

const url = "http://localhost:3001";

before(async function () {
  await initializeTestDb();
  this.timeout(5000);
});

describe("GET function test", () => {
  it("should get all tasks", async () => {
    const res = await fetch(url);
    const data = await res.json();

    expect(res.status).to.equal(200);
    expect(data).to.be.an("array").that.is.not.empty;
    expect(data[0]).to.include.keys("id", "description");
  });
});

describe("POST function test", () => {
  const email = `test${Date.now()}@gmail.com`;
  const password = `password`;
  insertTestUser(email, password);
  const token = getToken(email);

  it("should post a task", async () => {
    const res = await fetch(url + "/create", {
      method: "post",
      headers: { "Content-Type": "application/json", Authorization: token },
      body: JSON.stringify({ description: "Task from POST function test" }),
    });
    const data = await res.json();

    expect(res.status).to.equal(201);
    expect(data).to.be.an("object");
    expect(data).to.include.all.keys("id");
  });

  it("should NOT post a task without description", async () => {
    const res = await fetch(url + "/create", {
      method: "post",
      headers: { "Content-Type": "application/json", Authorization: token },
      body: JSON.stringify({ description: null }),
    });
    const data = await res.json();
    expect(res.status).to.equal(500);
    expect(data).to.be.an("object");
    expect(data).to.include.all.keys("error");
  });
});

describe("DELETE function test", () => {
  const email = `test${Date.now()}@gmail.com`;
  const password = `password`;
  insertTestUser(email, password);
  const token = getToken(email);
  let taskId;

  before(async () => {
    const res = await fetch(url + "/create", {
      method: "post",
      headers: { "Content-Type": "application/json", Authorization: token },
      body: JSON.stringify({ description: "Task from DELETE function test" }),
    });
    const data = await res.json();
    taskId = data.id;
  });

  it("should delete a task", async () => {
    const res = await fetch(`${url}/delete/${taskId}`, {
      headers: { "Content-Type": "application/json", Authorization: token },
      method: "delete",
    });
    const data = await res.json();

    expect(res.status).to.equal(200);
    expect(data).to.be.an("object");
    expect(data).to.include.all.keys("deletedId");
    expect(data.deletedId).to.equal(taskId);
  });

  it("should NOT delete a task", async () => {
    const res = await fetch(`${url}/delete/id=0 or id > 0`, {
      headers: { "Content-Type": "application/json", Authorization: token },
      method: "delete",
    });
    const data = await res.json();

    expect(res.status).to.equal(500);
    expect(data).to.be.an("object");
    expect(data).to.include.all.keys("error");
  });
});

describe("POST user register test", () => {
  const email = `test${Date.now()}@gmail.com`;
  const password = `password`;

  it("should register with valid email and password", async () => {
    const res = await fetch(`${url}/user/register`, {
      method: "post",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({
        email: email,
        password: password,
      }),
    });
    const data = await res.json();
    expect(res.status).to.equal(201, data.error);
    expect(data).to.be.an("object");
    expect(data).to.include.all.keys("id", "email");
  });
});

describe("POST user login test", () => {
  const email = `test${Date.now()}@gmail.com`;
  const password = `password`;
  insertTestUser(email, password);

  it("should login with valid credentials", async () => {
    const res = await fetch(`${url}/user/login`, {
      method: "post",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({
        email: email,
        password: password,
      }),
    });
    const data = await res.json();
    expect(res.status).to.equal(200, data.error);
    expect(data).to.be.an("object");
    expect(data).to.include.all.keys("id", "email", "token");
  });
});
