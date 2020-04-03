import chai, { expect } from "chai";
import sinon from "sinon";
import chaiAsPromised from "chai-as-promised";

chai.use(chaiAsPromised);
import { UserService } from "../services/user.service";
import User from "../models/user.model";
import HashPassword from "../utils/password";
import { MockDbConnection } from "../config/mockDbConnection";

const mockDbConn = new MockDbConnection();

describe("User Service", () => {
  let sandbox;

  before(async () => {
    await mockDbConn.start(); // start in-memory server
  });

  beforeEach(async () => {
    sandbox = sinon.createSandbox();
  });

  afterEach(async () => {
    await mockDbConn.cleanUp(); // clear db data
    sandbox.restore();
  });

  after(async () => {
    await mockDbConn.stop(); // stop & disconnect in-memory server
  });

  it("should create a new user", async () => {
    const mockUser = {
      name: "mockName",
      email: "mockEmail",
      password: "$2a$10$x0mO7n5Y35/GfcDjA0HGwe3ouwfGkYZbnwV2t.SzXHhgObe",
      role: "user"
    };

    const encMockPwd = "$2a$10$x0mO7n5Y35/GfcDjA0HGwe3ouwfGkYZbnwV2t.SzXHhgObe";

    const mockHashPass = sandbox
      .stub(HashPassword, "encryptPassword")
      .returns(encMockPwd);

    const user = await UserService.createUserService(mockUser);

    sinon.assert.calledOnce(mockHashPass);

    expect(user.name).to.equal(mockUser.name);
    expect(user.email).to.equal(mockUser.email);
    expect(user.password).to.equal(encMockPwd);
    expect(user.role).to.equal(mockUser.role);
  });

  it("Should throw RECORD ALREADY EXISTS when same email is there in db", async () => {
    const dataInDb = {
      name: "test",
      email: "test@example.com",
      password: "$23234vdfgfdffg/GJDHBJHANhbjhbhbjnjkB"
    };
    sandbox.stub(User, "findOne").resolves(dataInDb);
    await expect(UserService.createUserService(dataInDb))
      .to.eventually.be.rejectedWith("RECORD ALREADY EXISTS")
      .and.be.an.instanceOf(Error); // return will also work instead of await
  });

  it("Should throw error if error throws from mongodb", async () => {
    const dataInDb = {
      name: "test",
      email: "test@example.com",
      password: "$23234vdfgfdffg/GJDHBJHANhbjhbhbjnjkB"
    };
    sandbox.stub(User, "findOne").rejects(new Error("MONGO ERROR"));
    await expect(UserService.createUserService(dataInDb))
      .to.eventually.be.rejectedWith("MONGO ERROR")
      .and.be.an.instanceOf(Error); // return will also work instead of await
  });
});
