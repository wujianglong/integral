// 所有接口
import ask from './config'

let baseApiUrl
if (process.env.NODE_ENV === 'development') {
  // 开发环境
  baseApiUrl = 'http://39.106.161.75:8003'
  // 测试环境
} else {
  // 编译环境
  if (process.env.HOST === 'pro') {
    // 正式环境
    baseApiUrl = 'http://39.106.161.75:8003'
  } else {
    // 测试环境
    baseApiUrl = 'http://39.106.161.75:8003'
  }
}

export default {
  // 获取banner   /api/frontend/banners/  get
  banner (params) {
    return ask.askGet(baseApiUrl + '/api/frontend/banners/' , params)
  },
  // 获取token /api/frontend/acount/token/ post
  token (params) {
    return ask.askPost(baseApiUrl + '/api/frontend/account/token/', params)
  },
  // 获取用户信息 /api/frontend/acount/information/ get  
  userInfo (params) {
    return ask.askGet(baseApiUrl + '/api/frontend/account/information/', params)
  },
  // 获取验证码 /api/captcha/send/ get
  captcha (params) {
    return ask.askPost(baseApiUrl + '/api/captcha/send/', params)
  },
  // 获取商品信息 /api/frontend/goods/ get
  goods (params) {
    return ask.askGet(baseApiUrl + '/api/frontend/goods/', params)
  },
  // 绑定手机号码 /api/frontend/account/bind/ get  
  bind (params) {
    return ask.askPatch(baseApiUrl + '/api/frontend/account/bind/', params)
  },
  // 兑换积分 /api/frontend/codes/ post
  exchangeIntegral (params) {
    return ask.askPost(baseApiUrl + '/api/frontend/codes/exchange/', params)
  },
  // 征集 /api/frontend/feedbacks/ post
  collect (params) {
    return ask.askPost(baseApiUrl + '/api/frontend/feedbacks/', params)
  },
  // 获取订单信息 /api/frontend/users/orders/
  order (params) {
    return ask.askGet(baseApiUrl + '/api/frontend/users/orders/', params)
  },
  // 获取兑换码列表
  codeList (params) {
    return ask.askGet(baseApiUrl + '/api/frontend/users/codes/', params)
  },
  // 兑换商品  post
  exchangeOrder(params) {
    return ask.askPost(baseApiUrl + '/api/frontend/orders/', params)
  },
  // 兑换码历史 /api/frontend/users/codes/
  exchangeCode(params) {
    return ask.askGet(baseApiUrl + '/api/frontend/users/codes/', params)
  },
  // 产品列表
  // /api/frontend/products/?page={page}&brand={brand}
  product(params) {
    return ask.askGet(baseApiUrl + '/api/frontend/products/', params)
  }
  
}

// 确认绑定手机号接口

// 兑换积分接口

// 积分兑换产品接口

// 物流信息接口

// 礼品征集提交接口
