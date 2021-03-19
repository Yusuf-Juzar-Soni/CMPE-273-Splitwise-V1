const assert = require("chai").assert;
const index = require("./server");
const chai = require("chai");
chai.use(require("chai-http"));
const expect = require("chai").expect;
const agent = require("chai").request.agent(index);


describe("Splitwise", function () {
  describe("Login Test", function () {
    it("Incorrect Password", () => {
      agent
        .post("/login")
        .send({ email: "abc@hotmail.com", password: "test1234" })
        .then(function (res) {
          expect(res.text).to.equal('{"message":"Invalid credentials!"}');
        })
        .catch((error) => {
          console.log(error);
        });
    });
  }
)


  describe("Get user details", function () {
    it("User", () => {
      agent
        .get("/userdetails")
        
        .then(function (res) {
          expect(res.text).to.equal('{"Get All users"}');
        })
        .catch((error) => {
          console.log(error);
        });
    });
  }
)

describe("Display groups", function () {
  it("Groups", () => {
    agent
      .post("/dashboard")
      .send({email:"abc@hotmail.com"})
      .then(function (res) {
        expect(res.text).to.equal('{"Got  groups"}');
      })
      .catch((error) => {
        console.log(error);
      });
  });
}
)

describe("Get invites", function () {
  it("Get Invites", () => {
    agent
      .get("/getInvites/:email")
      .send({useremail:"abc@hotmail.com"})
      .then(function (res) {
        expect(res.text).to.equal('["Apt 307","Apt 309","Apt 310","Apt 312","apt 319","Apt 321","Apt 619","Breakfast Club"]');
      })
      .catch((error) => {
        console.log(error);
      });
  });
}
)

describe("Got user details", function () {
  it("Name for Dashboard", () => {
    agent
      .post("/userdetails")
      
      .then(function (res) {
        expect(res.text).to.equal('{"Got userdetails "}');
      })
      .catch((error) => {
        console.log(error);
      });
  });
}
)


})
