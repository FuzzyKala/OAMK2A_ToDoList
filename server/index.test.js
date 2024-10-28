import { expect } from "chai";

const url = "http://localhost:3001";

describe("GET function test", () => {
  it("should get all tasks", async () => {
    const res = await fetch(url);
    const data = await res.json();

    expect(res.status).to.equal(200);
    expect(data).to.be.an("array").and.to.not.be.empty;
    expect(data[0]).to.include.keys("id", "description");
  });
});

describe("POST function test", () => {
  it("should post a task", async () => {
    const res = await fetch(url + "/create", {
      method: "post",
      headers: { "Content-Type": "application/json" },
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
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({ description: null }),
    });
    const data = await res.json();
    expect(res.status).to.equal(500);
    expect(data).to.be.an("object");
    expect(data).to.include.all.keys("error");
  });
});

describe("DELETE function test", () => {
  let taskId;
  before(async () => {
    const res = await fetch(url + "/create", {
      method: "post",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({ description: "Task from DELETE function test" }),
    });
    const data = await res.json();
    taskId = data.id;
  });

  it("should delete a task", async () => {
    const res = await fetch(`${url}/delete/${taskId}`, {
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
      method: "delete",
    });
    const data = await res.json();

    expect(res.status).to.equal(500);
    expect(data).to.be.an("object");
    expect(data).to.include.all.keys("error");
  });
});
