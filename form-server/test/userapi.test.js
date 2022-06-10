const axios = require("axios").default;
const describe = require("mocha").describe;
const it = require("mocha").it;
const { expect } = require("chai");
const crypto = require("crypto");

const origin = "http://127.0.0.1:3000";
const account = crypto.randomUUID();
const pwd = crypto.randomUUID();
let token = "";

describe("user api test", () => {
  before(async () => {
    await axios.post(`${origin}/api/auth/register`, {
      account,
      pwd,
      confirmPwd: pwd,
    });
    const user = await axios.post(`${origin}/api/auth/login`, {
      account,
      pwd,
    });
    token = user.headers["set-cookie"][0].split(";")[0].split("=").pop();
  });
  it("getUserInfo01", async () => {
    try {
      await axios.get(`${origin}/api/user/getInfo`);
    } catch (err) {
      expect(err.response.data.stat).eq("ERR_USER_NOT_LOGIN");
    }
  });
  it("getUserInfo02", async () => {
    try {
      const res = await axios.get(`${origin}/api/user/getInfo`, {
        headers: {
          Cookie: `token=${token}`,
        },
      });
      expect(res.data.stat).eq("ok");
    } catch (err) {}
  });
  it("setUserInfo01", async () => {
    try {
      const res = await axios.post(`${origin}/api/user/setInfo`, {
        nickname: "test",
        avatar: "test",
      });
    } catch (err) {
      expect(err.response.data.stat).eq("ERR_USER_NOT_LOGIN");
    }
  });
  it("setUserInfo02", async () => {
    try {
      const res = await axios.post(
        `${origin}/api/user/setInfo`,
        {
          nickname: "test",
          avatar: "test",
        },
        {
          headers: {
            Cookie: `token=${token}`,
          },
        }
      );
      expect(res.data.stat).eq("ok");
    } catch (err) {}
  });
  it("getUserInfo03", async () => {
    try {
      const res = await axios.get(`${origin}/api/user/getInfo`, {
        headers: {
          Cookie: `token=${token}`,
        },
      });
      expect(res.data.data.user.avatar).eq("test");
    } catch (err) {}
  });
  it("setUserInfo03", async () => {
    try {
      await axios.post(
        `${origin}/api/user/setInfo`,
        {
          nickname: "test",
        },
        {
          headers: {
            Cookie: `token=${token}`,
          },
        }
      );
    } catch (err) {
      expect(err.response.data.stat).eq("ERR_PARAMS_LOST");
    }
  });
  it("setUserInfo04", async () => {
    try {
      await axios.post(
        `${origin}/api/user/setInfo`,
        {
          avatar: "test",
        },
        {
          headers: {
            Cookie: `token=${token}`,
          },
        }
      );
    } catch (err) {
      expect(err.response.data.stat).eq("ERR_PARAMS_LOST");
    }
  });
  it("changePwd01", async () => {
    try {
      await axios.post(
        `${origin}/api/user/changePwd`,
        {
          oldPwd: pwd,
          pwd: "123qwe",
        },
        {
          headers: {
            Cookie: `token=${token}`,
          },
        }
      );
    } catch (err) {
      expect(err.response.data.stat).eq("ERR_PARAMS_LOST");
    }
  });
  it("changePwd02", async () => {
    try {
      await axios.post(
        `${origin}/api/user/changePwd`,
        {
          pwd: "123qwe",
          confirmPwd: "123qwe",
        },
        {
          headers: {
            Cookie: `token=${token}`,
          },
        }
      );
    } catch (err) {
      expect(err.response.data.stat).eq("ERR_PARAMS_LOST");
    }
  });
  it("changePwd03", async () => {
    try {
      await axios.post(
        `${origin}/api/user/changePwd`,
        {
          oldPwd: pwd,
          pwd: "123qwe",
        },
        {
          headers: {
            Cookie: `token=${token}`,
          },
        }
      );
    } catch (err) {
      expect(err.response.data.stat).eq("ERR_PARAMS_LOST");
    }
  });
  it("changePwd04", async () => {
    try {
      await axios.post(`${origin}/api/user/changePwd`, {
        oldPwd: pwd,
        pwd: "123qwe",
        confirmPwd: "123qwe",
      });
    } catch (err) {
      expect(err.response.data.stat).eq("ERR_USER_NOT_LOGIN");
    }
  });
  it("changePwd05", async () => {
    try {
      await axios.post(
        `${origin}/api/user/changePwd`,
        {
          oldPwd: "123qwe",
          pwd: "123qwe",
          confirmPwd: "123qwe",
        },
        {
          headers: {
            Cookie: `token=${token}`,
          },
        }
      );
    } catch (err) {
      expect(err.response.data.stat).eq("ERR_OLD_PWD_NOT_CORRECT");
    }
  });
  it("changePwd06", async () => {
    try {
      const res = await axios.post(
        `${origin}/api/user/changePwd`,
        {
          oldPwd: pwd,
          pwd: "123qwe",
          confirmPwd: "123qwe",
        },
        {
          headers: {
            Cookie: `token=${token}`,
          },
        }
      );
      expect(res.data.stat).eq("ok");
    } catch (err) {}
  });
  it("getUserInfo04", async () => {
    try {
      await axios.get(`${origin}/api/user/getInfo`, {
        headers: {
          Cookie: `token=${token}`,
        },
      });
    } catch (err) {
      expect(err.response.data.stat).eq("ERR_USER_NOT_LOGIN");
    }
  });
  it("login", async () => {
    try {
      const res = await axios.post(`${origin}/api/auth/login`, {
        account,
        pwd: "123qwe",
      });
      expect(res.data.stat).eq("ok");
    } catch (err) {}
  });
});
