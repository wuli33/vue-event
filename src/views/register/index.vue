<template>
  <!-- 注册页面的整体盒子 -->
  <div class="reg-container">
    <!-- 注册的盒子 -->
    <div class="reg-box">
      <!-- 标题的盒子 -->
      <div class="title-box"></div>
      <!-- 注册的表单区域 -->
      <el-form ref="form" :model="form" :rules="rulesObj">
        <el-form-item prop="username">
          <el-input placeholder="请输入用户名" v-model="form.username"></el-input>
        </el-form-item>
        <el-form-item prop="password">
          <el-input type="password" placeholder="请输入密码" v-model="form.password"></el-input>
        </el-form-item>
        <el-form-item prop="repassword">
          <el-input type="password" placeholder="请再次确认密码" v-model="form.repassword"></el-input>
        </el-form-item>
        <el-form-item>
          <el-button class="btn-reg" type="primary" @click="registerFn">注册</el-button>
          <el-link type="info">去登录</el-link>
        </el-form-item>
      </el-form>
    </div>
  </div>
</template>

<script>
import { registerAPI } from '@/api'
export default {
  name: 'my-register',
  components: {},
  props: {},
  data () {
    const samePwdFn = (rule, value, callback) => {
      // this是外层函数data
      if (value !== this.form.password) {
        callback(new Error('两次输入密码不一致!'))
      } else {
        callback()
      }
    }

    return {
      form: { // 表单数据对象
        username: '', // form表单用户名
        password: '', // form表单密码
        repassword: '' // form表单重复密码
      },
      rulesObj: { // 表单规则校验对象
        username: [
          { required: true, message: '请输入用户名', trigger: 'blur' },
          { pattern: /^[a-zA-Z0-9]{1,10}$/, message: '用户名必须是1-10的大小写字母数字', trigger: 'blur' }
        ],
        password: [
          { required: true, message: '请输入密码', trigger: 'blur' },
          { pattern: /^\S{6,15}$/, message: '密码必须是6-15的非空字符', trigger: 'blur' }
        ],
        repassword: [
          { required: true, message: '请再次输入密码', trigger: 'blur' },
          { pattern: /^\S{6,15}$/, message: '密码必须是6-15的非空字符', trigger: 'blur' },
          { validator: samePwdFn, trigger: 'blur' }
        ]
      }
    }
  },
  watch: {},
  computed: {},
  methods: {
    // 注册的点击事件
    registerFn () {
      // JS兜底校验
      this.$refs.form.validate(async vaild => {
        if (vaild) {
          // 通过检验 发送请求
          const { data: res } = await registerAPI(this.form)
          console.log(res)
          // 注册失败 提示用户 element在vue的原型链上添加了弹窗提示，$message属性
          if (res.code !== 0) return this.$message.error(res.message)
          // 注册成功 提示用户
          this.$message.success(res.message)
          // 跳转到登录页面
          this.$router.push('/login')
        } else {
          return false // 阻止默认提交行为（表单下面的红色提示会自动出现）
        }
      })
    }
  },
  created () {},
  mounted () {}
}
</script>

<style lang="less" scoped>
.reg-container {
  background: url("../../assets/images/login_bg.jpg") center;
  background-size: cover;
  height: 100%;

  .reg-box {
    width: 400px;
    height: 335px;
    background-color: #fff;
    border-radius: 3px;
    position: absolute;
    left: 50%;
    top: 50%;
    transform: translate(-50%, -50%);
    padding: 0 30px;
    box-sizing: border-box;

    .title-box {
      height: 60px;
      background: url("../../assets/images/login_title.png") center no-repeat;
    }

    .btn-reg {
      width: 100%;
    }
  }
}
</style>
