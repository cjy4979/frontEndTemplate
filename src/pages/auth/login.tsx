import { Login } from '@/api/auth/auth'
import { signIn } from '@/reduxFeatures/authSlice'
import { useAppDispatch, useAppSelector } from '@/reduxFeatures/hooks'
import { Button, Checkbox, Form, Input, message } from 'antd'
import router from 'next/router'
import React, { useEffect, useState } from 'react'

const LoginPage = () => {
  const [form] = Form.useForm() //antd提供的对form表单的控制
  const userIsSignIn = useAppSelector((state) => state.auth.isUserSignedIn)
  const signInDispatch = useAppDispatch()

  useEffect(() => {
    if (userIsSignIn) {
      //根据你的逻辑来写
      //router.push('/user/index').then(() => {})
    }
  }, [router, userIsSignIn])

  //进入登陆页面检查是否记住密码，记住密码则直接填充
  useEffect(() => {
    if (localStorage.getItem('check') === '1') {
      if (
        localStorage.getItem('username') !== '' &&
        localStorage.getItem('password') !== ''
      ) {
        form.setFieldsValue({
          username: localStorage.getItem('username'),
          password: localStorage.getItem('password')
        })
      }
    }
  }, [])

  const onFinish = async (values: any) => {
    const { username, password, remember } = values
    const requestBody = { username, password }
    // 登录逻辑
    const response = await Login(requestBody)
    const { sessionId, id, role } = response!.data!

    signInDispatch(signIn({ id, sessionId, username, role }))
    message.success({ content: '欢迎' })
    await router.push('/user/index')

    if (remember) {
      localStorage.setItem('username', username)
      localStorage.setItem('password', password)
      localStorage.setItem('remember', '1')
    } else {
      localStorage.clear()
    }
    return
  }

  const onFinishFailed = (errorInfo: any) => {
    message.error('登录失败，请重试')
    console.log('Failed:', errorInfo)
  }

  return (
    <div className=" w-full h-screen flex justify-center items-center bg-sky-100">
      <div className=" w-[1000px] h-[600px] flex justify-between bg-sky-100 shadow-lg rounded-3xl overflow-hidden">
        {/* left-info card */}
        <div className=" w-[500px] h-full shadow-md relative flex items-center justify-center">
          <div></div>
        </div>
        {/* right-login card */}
        <Form
          form={form}
          name="basic"
          labelCol={{ span: 8 }}
          wrapperCol={{ span: 16 }}
          initialValues={{ remember: true }}
          onFinish={onFinish}
          onFinishFailed={onFinishFailed}
          autoComplete="off"
        >
          <Form.Item
            label="Username"
            name="username"
            rules={[{ required: true, message: '请输入用户名!' }]}
          >
            <Input className="input" />
          </Form.Item>

          <Form.Item
            label="Password"
            name="password"
            rules={[{ required: true, message: '请输入密码!' }]}
          >
            <Input.Password className="input" />
          </Form.Item>

          <Form.Item
            name="remember"
            valuePropName="checked"
            wrapperCol={{ offset: 8, span: 16 }}
          >
            <Checkbox>Remember me</Checkbox>
          </Form.Item>

          <Form.Item wrapperCol={{ offset: 8, span: 16 }}>
            <Button type="primary" htmlType="submit">
              登录
            </Button>
          </Form.Item>
        </Form>
      </div>
    </div>
  )
}

export default LoginPage
