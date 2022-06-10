import * as Router from 'koa-router'
import { Context } from 'koa'
import { catchError, generateOk } from '../libs/check'
import { checkBody, checkToken } from '../middlewares/dataCheck'
import { formKit, formResultKit, userKit } from '../kits'
import {
  checkCreateFormBody,
  checkDelReq,
  checkFormInputReq,
  checkListFormBody,
  checkStarBody,
  checkStartBody,
} from './form.check'
import { ICreateFormReq, IInputReq, IListReq } from '../types/request'
import { EFormStatus } from '../types/models'

const router = new Router({
  prefix: '/api/form',
})

// form 列表
router.post(
  '/list',
  checkToken(userKit.checkToken),
  checkBody(checkListFormBody),
  async (ctx: Context) => {
    try {
      const token = ctx.cookies.get('token')
      const {
        offset = 0,
        limit = 10,
        isStar = undefined,
      } = ctx.request.body as IListReq
      const [items, total] = formKit.listForm(token, isStar, offset, limit)
      ctx.body = generateOk({ items, total })
    } catch (err) {
      catchError(err, ctx)
    }
  },
)

// 表单创建
router.post(
  '/create',
  checkToken(userKit.checkToken),
  checkBody(checkCreateFormBody),
  async (ctx: Context) => {
    try {
      const token = ctx.cookies.get('token')
      const { title, subTitle, problems } = ctx.request.body as ICreateFormReq
      const id = await formKit.createForm(token, title, subTitle, problems)
      ctx.body = generateOk({ id })
    } catch (err) {
      catchError(err, ctx)
    }
  },
)

// 开始收集
router.post(
  '/start',
  checkToken(userKit.checkToken),
  checkBody(checkStartBody),
  async (ctx: Context) => {
    const token = ctx.cookies.get('token')
    const { id } = ctx.request.body
    formKit.setFormStatus(token, id, EFormStatus.ing)
    ctx.body = generateOk()
  },
)

// 结束收集
router.post(
  '/end',
  checkToken(userKit.checkToken),
  checkBody(checkStartBody),
  async (ctx: Context) => {
    const token = ctx.cookies.get('token')
    const { id } = ctx.request.body
    formKit.setFormStatus(token, id, EFormStatus.end)
    ctx.body = generateOk()
  },
)

// 表单获取
router.post('/get', (ctx: Context) => {
  try {
    const { id } = ctx.request.body
    const item = formKit.getForm(id)
    ctx.body = generateOk({ item })
  } catch (err) {
    catchError(err, ctx)
  }
})

// 表单删除
router.post(
  '/delete',
  checkToken(userKit.checkToken),
  checkBody(checkDelReq),
  async (ctx: Context) => {
    try {
      const token = ctx.cookies.get('token')
      const { id } = ctx.request.body as { id: string }
      await formKit.delForm(token, id)
      ctx.body = generateOk()
    } catch (err) {
      catchError(err, ctx)
    }
  },
)

// 表单标星
router.post(
  '/star',
  checkToken(userKit.checkToken),
  checkBody(checkStarBody),
  async (ctx: Context) => {
    try {
      const token = ctx.cookies.get('token')
      const { id } = ctx.request.body
      await formKit.starForm(token, id, true)
      ctx.body = generateOk()
    } catch (err) {
      catchError(err, ctx)
    }
  },
)

// 表单取消标星
router.post(
  '/cancelStar',
  checkToken(userKit.checkToken),
  checkBody(checkStarBody),
  async (ctx: Context) => {
    try {
      const token = ctx.cookies.get('token')
      const { id } = ctx.request.body
      await formKit.starForm(token, id, false)
      ctx.body = generateOk()
    } catch (err) {
      catchError(err, ctx)
    }
  },
)

// 填写表单
router.post('/input', checkBody(checkFormInputReq), async (ctx: Context) => {
  try {
    const { formId, problems } = ctx.request.body as IInputReq
    await formResultKit.create(formId, problems)
    ctx.body = generateOk()
  } catch (err) {
    catchError(err, ctx)
  }
})

// 获取表单填写详情
router.get(
  '/formResult/:formId',
  checkToken(userKit.checkToken),
  async (ctx: Context) => {
    try {
      const token = ctx.cookies.get('token')
      const { formId } = ctx.params
      const info = formKit.getForm(formId)
      const items = formResultKit.getFormResult(token, formId)
      ctx.body = generateOk({
        info,
        items,
      })
    } catch (err) {
      catchError(err, ctx)
    }
  },
)

// 获取表单单个填写详情
router.post(
  '/detail/:id',
  checkToken(userKit.checkToken),
  async (ctx: Context) => {
    try {
      const token = ctx.cookies.get('token')
      const { id } = ctx.params
      const item = formResultKit.getDetail(token, id)
      ctx.body = generateOk({
        item,
      })
    } catch (err) {
      catchError(err, ctx)
    }
  },
)

export default router
