import Vue from 'vue'
import { ValidationgProvider, validationObserver, extend } from 'vee-validate'
// 加载内置的验证规则
import * as rules from 'vee-validate/dist/rules'
import { messages } from 'vee-validate/dist/locale/zh_CN.json'
// 注册全局组件
Vue.component('ValidationgProvider', ValidationgProvider)
Vue.component('validationObserver', validationObserver)
// 配置验证规则和中文提示信息
Object.keys(rules).forEach(rule => {
  extend(rule, {
    ...rule[rule],
    message: messages[rule]
  })
})
