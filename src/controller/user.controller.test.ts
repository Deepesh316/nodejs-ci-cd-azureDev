import chai from "chai";
import * as sinon from "sinon";
import sinonChai from "sinon-chai";
import { Request } from "express";

chai.use(sinonChai);
import userController from "./user.controller";
import { UserService } from "../services/user.service";

const mReq = {
  body: {
    name: "mockName",
    email: "mockEmail",
    password: "mockPassword#123"
  }
} as Request;

const mRes = {
  status: sinon.stub().returnsThis(),
  json: sinon.stub()
} as any;

const mNext = sinon.stub();

describe("UserController", () => {
  let sandbox: sinon.SinonSandbox;
  // let sandbox;
  beforeEach(() => {
    sandbox = sinon.createSandbox();
  });

  afterEach(() => {
    sandbox.restore();
  });

  const stubValue = { name: "StubName" };
  it("should create user & return proper response", async () => {
    const createUserServiceStub = sandbox
      .stub(UserService, "createUserService")
      .resolves(stubValue);

    await userController.createUser(mReq, mRes, mNext);
    sinon.assert.calledWithExactly(createUserServiceStub, {
      name: "mockName",
      email: "mockEmail",
      password: "mockPassword#123"
    });
    sinon.assert.calledWithExactly(mRes.status, 201);
    sinon.assert.calledWithExactly(mRes.json, {
      data: { name: "StubName" },
      status: 201
    });
  });

  it("Should throw error when service call fails", async () => {
    const expectedError = new Error("service error");
    const errorUserServiceStub = sandbox
      .stub(UserService, "createUserService")
      .throws(expectedError);
    await userController.createUser(mReq, mRes, mNext);
    sinon.assert.threw(errorUserServiceStub, expectedError);
  });
});
