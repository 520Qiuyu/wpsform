const axios = require("axios").default;
const describe = require("mocha").describe;
const it = require("mocha").it;
const { expect } = require("chai");
const crypto = require("crypto");

const origin = "http://127.0.0.1:3000";
const account = crypto.randomUUID();
const pwd = crypto.randomUUID();
let token = "";

describe("auth api test", () => {
  it("registry01", async () => {
    try {
      await axios.post(`${origin}/api/auth/register`, {
        account,
        pwd,
      });
    } catch (err) {
      expect(err.response.data.stat).eq("ERR_PARAMS_LOST");
    }
  });
  it("registry02", async () => {
    try {
      await axios.post(`${origin}/api/auth/register`, {
        pwd,
      });
    } catch (err) {
      expect(err.response.data.stat).eq("ERR_PARAMS_LOST");
    }
  });
  it("registry03", async () => {
    try {
      const res = await axios.post(`${origin}/api/auth/register`, {
        account,
      });
    } catch (err) {
      expect(err.response.data.stat).eq("ERR_PARAMS_LOST");
    }
  });
  it("registry04", async () => {
    try {
      await axios.post(`${origin}/api/auth/register`, {
        account,
        pwd,
        confirmPwd: "111",
      });
    } catch (err) {
      expect(err.response.data.stat).eq("ERR_TWO_PWD_NOT_CORRECT");
    }
  });
  it("registry05", async () => {
    const res = await axios.post(`${origin}/api/auth/register`, {
      account,
      pwd,
      confirmPwd: pwd,
    });
    expect(res.data.stat).eq("ok");
  });
  it("registry06", async () => {
    try {
      await axios.post(`${origin}/api/auth/register`, {
        account,
        pwd,
        confirmPwd: pwd,
      });
    } catch (err) {
      expect(err.response.data.stat).eq("ERR_ACCOUNT_EXIST");
    }
  });
  it("login01", async () => {
    try {
      await axios.post(`${origin}/api/auth/login`, {
        account,
      });
    } catch (err) {
      expect(err.response.data.stat).eq("ERR_PARAMS_LOST");
    }
  });
  it("login02", async () => {
    try {
      await axios.post(`${origin}/api/auth/login`, {
        pwd,
      });
    } catch (err) {
      expect(err.response.data.stat).eq("ERR_PARAMS_LOST");
    }
  });
  it("login03", async () => {
    try {
      await axios.post(`${origin}/api/auth/login`, {
        account,
        pwd: "asdf",
      });
    } catch (err) {
      expect(err.response.data.stat).eq("ERR_PWD_NOT_CORRECT");
    }
  });
  it("login04", async () => {
    try {
      await axios.post(`${origin}/api/auth/login`, {
        account: "asdf",
        pwd,
      });
    } catch (err) {
      expect(err.response.data.stat).eq("ERR_ACCOUNT_NOT_FOUND");
    }
  });
  it("login05", async () => {
    try {
      const item = await axios.post(`${origin}/api/auth/login`, {
        account,
        pwd,
      });
      token = item.headers["set-cookie"][0].split(";")[0].split("=").pop();
      expect(item.data.stat).eq("ok");
    } catch (err) {}
  });
  it("logout01", async () => {
    try {
      await axios.post(`${origin}/api/auth/logout`);
    } catch (err) {
      expect(err.response.data.stat).eq("ERR_USER_NOT_LOGIN");
    }
  });
  it("logout02", async () => {
    try {
      const item = await axios.post(`${origin}/api/auth/logout`, null, {
        headers: {
          Cookie: `token=${token}`,
        },
      });
      expect(item.data.stat).eq("ok");
    } catch (err) {}
  });
  it("logout03", async () => {
    try {
      await axios.post(`${origin}/api/auth/logout`, null, {
        headers: {
          Cookie: `token=${token}`,
        },
      });
    } catch (err) {
      expect(err.response.data.stat).eq("ERR_USER_NOT_LOGIN");
    }
  });
});
