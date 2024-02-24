import axios, {
  AxiosInstance,
  AxiosError,
  AxiosRequestConfig,
  AxiosResponse
} from 'axios'
import { message } from 'antd'
import { hideLoading, showLoading } from '@/components/loading'
import { signOut } from '@/reduxFeatures/authSlice'
import store from '@/reduxFeatures/store'
import { StorageTypes, readStorage } from '@/utils/storageHelpers'
import router from 'next/router'

const config = {
  //默认请求地址，可以在.env开头的文件中修改
  baseURL: process.env.NEXT_PUBLIC_DOMAIN_NAME,
  //超时（8s)
  timeout: 8000,
  //跨域允许携带凭证
  withCredentials: true
}

export interface Result {
  code: string
  success: boolean
  msg: string
}

export interface ResultData<T = any> extends Result {
  access: string
  data?: T
}

export const checkStatus = (status: number): void => {
  switch (status) {
    case 400:
      message.error('请求失败！请稍后重试')
      break
    case 401:
      message.error('登录失效！请重新登录')
      store.dispatch(signOut())
      break
    case 403:
      message.error('无权限！如有需要请联系管理员')
      router.push('/user/index') //user作为最底层的权限，可以无脑返回user的主页
      break
    case 404:
      message.error('您访问的资源不存在')
      break
    case 405:
      message.error('请求的方式有误，请稍后重试')
      break
    case 408:
      message.error('请求超时！请稍后重试')
      break
    case 500:
      message.error('服务异常！请联系技术人员')
      break
    case 502:
      message.error('网管错误！请联系技术人员')
      break
    case 503:
      message.error('服务不可用！请联系技术人员')
      break
    case 504:
      message.error('网关超时！请联系技术人员')
      break
    default:
      message.error('请求失败！')
  }
}

class RequestHttp {
  service: AxiosInstance
  public constructor(config: AxiosRequestConfig) {
    // 实例化 serice
    this.service = axios.create(config)
    /**
     * 请求拦截器
     * request -> { 请求拦截器 } -> server
     */
    this.service.interceptors.request.use(
      //(config: AxiosRequestConfig) => { 无法解决的报错
      (config: any) => {
        showLoading()
        const token = localStorage.getItem('token') ?? ''
        const user_id = readStorage(StorageTypes.UID_STORAGE) ?? ''
        const session_id = readStorage(StorageTypes.SESSION_ID_STORAGE) ?? ''
        const role = readStorage(StorageTypes.ROLE_STORAGE) ?? ''
        config.headers = {
          'Content-Type': 'application/json',
          user_id: user_id,
          session_id: session_id,
          authorization: 'Bearer ' + token,
          role: role
        }

        return config
      },
      (error: AxiosError) => {
        return Promise.reject(error)
      }
    )

    /**
     * 响应拦截器
     * response -> { 响应拦截器 } -> client
     */
    this.service.interceptors.response.use(
      (response: AxiosResponse) => {
        hideLoading()
        const { data, config } = response
        if (data.code && data.code !== 200) {
          message.error(data.msg)
          return Promise.reject(data)
        }
        return data
      },
      async (error: AxiosError) => {
        hideLoading()
        const { response } = error
        if (error.message.indexOf('timeout') !== -1) message.error('请求超时')
        if (response) checkStatus(response.status)
        if (!window.navigator.onLine) message.error('网络连接失败，请检查网络')
        //window.location.hash
        return Promise.reject(error)
      }
    )
  }
  //常用请求封装
  get<T>(url: string, params?: object, _object = {}): Promise<ResultData<T>> {
    return this.service.get(url, { params, ..._object })
  }
  post<T>(url: string, params?: object, _object = {}): Promise<ResultData<T>> {
    return this.service.post(url, params, _object)
  }
  put<T>(url: string, params?: object, _object = {}): Promise<ResultData<T>> {
    return this.service.put(url, params, _object)
  }
  delete<T>(
    url: string,
    params?: object,
    _object = {}
  ): Promise<ResultData<T>> {
    return this.service.delete(url, { params, ..._object })
  }

  patch<T>(url: string, params?: object, _object = {}): Promise<ResultData<T>> {
    return this.service.patch(url, { params, ..._object })
  }
}

export default new RequestHttp(config)
