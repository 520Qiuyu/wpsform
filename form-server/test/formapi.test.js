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

describe('form api test', () => {
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
  it('list', async () => {
    const res = await axios.post(
      `${origin}/api/form/list`,
      {
        offset: 0,
        limit: 10,
      },
      {
        headers: {
          Cookie: `token=${token}`,
        },
      },
    )
    expect(res.data.stat).eq('ok')
    expect(res.data.data.total).eq(0)
  })
  it('create', async () => {
    const res = await axios.post(
      `${origin}/api/form/create`,
      {
        title: '测试1',
        subTitle: '小标题',
        problems: [
          {
            title: '姓名',
            type: 'input',
          },
          {
            title: '性别',
            type: 'singleSelect',
            setting: {
              options: [
                {
                  title: '男',
                  status: 2,
                },
              ],
            },
          },
        ],
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
  it('list', async () => {
    const res = await axios.post(
      `${origin}/api/form/list`,
      {
        offset: 0,
        limit: 10,
      },
      {
        headers: {
          Cookie: `token=${token}`,
        },
      },
    )
    expect(res.data.stat).eq('ok')
    expect(res.data.data.total).eq(1)
  })
  it('get', async () => {
    const res = await axios.post(`${origin}/api/form/get`, {
      id,
    })
    expect(res.data.stat).eq('ok')
    expect(res.data.data.item.title).eq('测试1')
    expect(res.data.data.item.subTitle).eq('小标题')
    expect(res.data.data.item.problems.length).eq(2)
  })
  it('star', async () => {
    const res = await axios.post(
      `${origin}/api/form/star`,
      {
        id,
      },
      {
        headers: {
          Cookie: `token=${token}`,
        },
      },
    )
    expect(res.data.stat).eq('ok')
  })
  it('list', async () => {
    const res = await axios.post(
      `${origin}/api/form/list`,
      {
        offset: 0,
        limit: 10,
        isStar: false,
      },
      {
        headers: {
          Cookie: `token=${token}`,
        },
      },
    )
    expect(res.data.stat).eq('ok')
    expect(res.data.data.total).eq(0)
  })
  it('list', async () => {
    const res = await axios.post(
      `${origin}/api/form/list`,
      {
        offset: 0,
        limit: 10,
        isStar: true,
      },
      {
        headers: {
          Cookie: `token=${token}`,
        },
      },
    )
    expect(res.data.stat).eq('ok')
    expect(res.data.data.total).eq(1)
  })
  it('start', async () => {
    const res = await axios.post(
      `${origin}/api/form/start`,
      {
        id,
      },
      {
        headers: {
          Cookie: `token=${token}`,
        },
      },
    )
    expect(res.data.stat).eq('ok')
  })
  it('input', async () => {
    const res = await axios.post(`${origin}/api/form/input`, {
      formId: id,
      problems: [
        {
          title: '姓名',
          id: '---',
          type: 'input',
          result: { value: 'zykee' },
        },
        {
          title: '性别',
          id: '---111',
          type: 'singleSelect',
          setting: {
            options: [
              {
                title: '男',
                status: 2,
              },
            ],
          },
          result: { value: [{ id: '---', title: '男' }] },
        },
      ],
    })
    expect(res.data.stat).eq('ok')
  })
  it('all result', async () => {
    const res = await axios.get(`${origin}/api/form/formResult/${id}`, {
      headers: {
        Cookie: `token=${token}`,
      }
    })
    expect(res.data.stat).eq('ok')
    expect(res.data.data.items.length).eq(1)
  })
  it('cancelStar', async () => {
    const res = await axios.post(
      `${origin}/api/form/cancelStar`,
      {
        id,
      },
      {
        headers: {
          Cookie: `token=${token}`,
        },
      },
    )
    expect(res.data.stat).eq('ok')
  })
  it('end', async () => {
    const res = await axios.post(
      `${origin}/api/form/end`,
      {
        id,
      },
      {
        headers: {
          Cookie: `token=${token}`,
        },
      },
    )
    expect(res.data.stat).eq('ok')
  })
  it('get', async () => {
    try {
      const res = await axios.post(`${origin}/api/form/get`, {
        id,
      })
    } catch (err) {
      expect(err.response.stat).eq('ERR_FORM_NOT_FOUND')
    }
  })
  it('delete', async () => {
    const res = await axios.post(
      `${origin}/api/form/delete`,
      {
        id,
      },
      {
        headers: {
          Cookie: `token=${token}`,
        },
      },
    )
    expect(res.data.stat).eq('ok')
  })
  it('list', async () => {
    const res = await axios.post(
      `${origin}/api/form/list`,
      {
        offset: 0,
        limit: 10,
      },
      {
        headers: {
          Cookie: `token=${token}`,
        },
      },
    )
    expect(res.data.stat).eq('ok')
    expect(res.data.data.total).eq(0)
  })
  it('create', async () => {
    const res = await axios.post(
      `${origin}/api/form/create`,
      {
        title: '测试1',
        subTitle: '小标题',
        problems: [
          {
            title: '姓名',
            type: 'input',
          },
          {
            title: '性别',
            type: 'singleSelect',
            setting: {
              options: [
                {
                  title: '男',
                  status: 2,
                },
                {
                  title: '女',
                  status: 2,
                },
              ],
            },
          },
          {
            title: '分数',
            type: 'score'
          }
        ],
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
  it('list', async () => {
    const res = await axios.post(
      `${origin}/api/form/list`,
      {
        offset: 1,
        limit: 10,
      },
      {
        headers: {
          Cookie: `token=${token}`,
        },
      },
    )
    expect(res.data.stat).eq('ok')
    expect(res.data.data.total).eq(1)
    expect(res.data.data.items.length).eq(0)
  })
  it('list', async () => {
    const res = await axios.post(
      `${origin}/api/form/list`,
      {
        offset: 1,
        limit: 10,
      },
      {
        headers: {
          Cookie: `token=${token}`,
        },
      },
    )
    expect(res.data.stat).eq('ok')
    expect(res.data.data.total).eq(1)
  })
})
