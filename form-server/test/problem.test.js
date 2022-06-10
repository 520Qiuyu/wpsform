const axios = require('axios').default
const describe = require('mocha').describe
const it = require('mocha').it
const { expect } = require('chai')
const crypto = require('crypto')

const origin = 'http://127.0.0.1:3000'
const account = crypto.randomUUID()
const pwd = crypto.randomUUID()
let token = ''
let id = ''

describe('problem api test', () => {
  before(async () => {
    await axios.post(`${origin}/api/auth/register`, {
      account,
      pwd,
      confirmPwd: pwd,
    })
    const user = await axios.post(`${origin}/api/auth/login`, {
      account,
      pwd,
    })
    token = user.headers['set-cookie'][0].split(';')[0].split('=').pop()
  })
  it('listType', async () => {
    const res = await axios.get(`${origin}/api/problem/listType`)
    expect(res.data.stat).eq('ok')
  })
  it('listBasic', async () => {
    const res = await axios.get(`${origin}/api/problem/listBasic`, {
      headers: {
        Cookie: `token=${token}`,
      },
    })
    expect(res.data.stat).eq('ok')
  })
  it('listStar', async () => {
    const res = await axios.post(`${origin}/api/problem/listStar`, null, {
      headers: {
        Cookie: `token=${token}`,
      },
    })
    expect(res.data.stat).eq('ok')
    expect(res.data.data.items.length).eq(0)
  })
  it('star', async () => {
    const res = await axios.post(
      `${origin}/api/problem/star`,
      {
        problem: {
          type: 'input',
          title: '姓名',
          required: true,
        },
      },
      {
        headers: {
          Cookie: `token=${token}`,
        },
      },
    )
    id = res.data.data.id
    expect(res.data.stat).eq('ok')
  })
  it('star', async () => {
    const res = await axios.post(
      `${origin}/api/problem/star`,
      {
        problem: {
          type: 'singleSelect',
          title: '性别',
          setting: {
            options: [
              { title: '男', status: 2 },
              { title: '女', status: 2 },
            ],
          },
          required: true,
        },
      },
      {
        headers: {
          Cookie: `token=${token}`,
        },
      },
    )
    expect(res.data.stat).eq('ok')
  })
  it('listStar', async () => {
    const res = await axios.post(`${origin}/api/problem/listStar`, null, {
      headers: {
        Cookie: `token=${token}`,
      },
    })
    expect(res.data.stat).eq('ok')
    expect(res.data.data.items.length).eq(2)
  })
  it('cancelStar', async () => {
    const res = await axios.post(`${origin}/api/problem/cancelStar`, { id }, {
      headers: {
        Cookie: `token=${token}`,
      },
    })
    expect(res.data.stat).eq('ok')
  })
  it('listStar', async () => {
    const res = await axios.post(`${origin}/api/problem/listStar`, null, {
      headers: {
        Cookie: `token=${token}`,
      },
    })
    expect(res.data.stat).eq('ok')
    expect(res.data.data.items.length).eq(1)
  })
})
