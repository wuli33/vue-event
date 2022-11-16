<template>
  <el-container class="main-container">
    <!-- 头部区域 -->
    <el-header>
      <!-- 左侧的logo -->
      <img src="../../assets/images/logo.png" alt="" />
      <!-- 右侧的菜单 -->
      <div class="line"></div>
      <el-menu
        class="el-menu-top"
        mode="horizontal"
        background-color="#23262E"
        text-color="#fff"
        active-text-color="#409EFF"
      >
        <el-submenu index="1">
          <template slot="title">
            <img src="../../assets/images/logo.png" alt="" class="avatar" />
            <span>个人中心</span>
          </template>
          <el-menu-item index="1-1"
            ><i class="el-icon-s-operation"></i>基本资料</el-menu-item
          >
          <el-menu-item index="1-2"
            ><i class="el-icon-camera"></i>更换头像</el-menu-item
          >
          <el-menu-item index="1-3"
            ><i class="el-icon-key"></i>重置密码</el-menu-item
          >
        </el-submenu>
        <el-menu-item index="2" @click="quitFn"
          ><i class="el-icon-switch-button"></i>退出</el-menu-item
        >
      </el-menu>
    </el-header>
    <!-- 侧边栏区域 -->
    <el-container>
      <el-aside width="200px">
        <!-- 侧边栏区域   --  用户信息区域 -->
        <div class="user-box">
          <img :src="user_pic" alt="" v-if="user_pic" />
          <img src="../../assets/images/avatar.jpg" alt="" v-else />
          <span>欢迎 {{ nickname || username }}</span>
        </div>
        <!-- 侧边栏区域   --  菜单 -->
        <!-- default-active当前激活菜单的 index -->
        <el-menu
          default-active="/home"
          class="el-menu-vertical-demo"
          @open="handleOpen"
          @close="handleClose"
          background-color="#23262E"
          text-color="#fff"
          active-text-color="#409EFF"
          unique-opened
          router
        >
          <template v-for="item in menus">
            <el-menu-item v-if="!item.children" :index="item.indexPath" :key="item.indexPath">
              <i :class="item.icon"></i>
              <span slot="title">{{item.title}}</span>
            </el-menu-item>
            <el-submenu v-else :index="item.indexPath" :key="item.indexPath">
              <template slot="title">
                <i :class="item.icon"></i>
                <span>{{item.title}}</span>
              </template>
              <el-menu-item v-for="obj,index in item.children" :index="obj.indexPath" :key="index">
                <i :class="obj.icon"></i>
                <span slot="title">{{obj.title}}</span>
              </el-menu-item>
            </el-submenu>
          </template>
        </el-menu>
      </el-aside>
      <el-container>
        <!-- 页面主体区域 -->
        <el-main>Main</el-main>
        <!-- 底部footer区域 -->
        <el-footer>Footer</el-footer>
      </el-container>
    </el-container>
  </el-container>
</template>

<script>
import { mapGetters } from 'vuex'
import { getMenusListAPI } from '@/api'
export default {
  name: 'my-layout',
  components: {},
  props: {},
  data () {
    return {
      menus: [] // 侧边栏数据
    }
  },
  watch: {},
  computed: {
    ...mapGetters(['nickname', 'username', 'user_pic'])
  },
  methods: {
    // 退出登录
    quitFn () {
      this.$confirm('点击确定退出登录, 是否继续?', '提示', {
        confirmButtonText: '确定',
        cancelButtonText: '取消',
        type: 'warning'
      })
        .then(() => {
          // 用户选择确定
          // 清除vuex的数据
          this.$store.commit('updateToken', '')
          this.$store.commit('updateUserInfo', '')
          // 跳转到登录页面
          this.$router.push('/login')
        })
        .catch(() => {
          // 用户选择取消
        })
    },

    //
    handleOpen (key, keyPath) {
      console.log(key, keyPath)
    },
    handleClose (key, keyPath) {
      console.log(key, keyPath)
    },

    // 获取侧边栏请求的方法
    async getMenuListFn () {
      const res = await getMenusListAPI()
      this.menus = res.data.data
    }
  },
  created () {
    // 请求侧边栏数据
    this.getMenuListFn()
  },
  mounted () {}
}
</script>

<style lang="less" scoped>
.main-container {
  height: 100%;
  .el-header,
  .el-aside {
    background-color: #23262e;
  }
  .el-header {
    padding: 0;
    display: flex;
    justify-content: space-between;
  }
  .el-main {
    overflow-y: scroll;
    height: 0;
    background-color: #f2f2f2;
  }
  .el-footer {
    background-color: #eee;
    font-size: 12px;
    display: flex;
    justify-content: center;
    align-items: center;
  }
}

.avatar {
  border-radius: 50%;
  width: 35px;
  height: 35px;
  background-color: #fff;
  margin-right: 10px;
  object-fit: cover;
}

// 左侧边栏用户信息区域
.user-box {
  height: 70px;
  display: flex;
  justify-content: center;
  align-items: center;
  border-top: 1px solid #000;
  border-bottom: 1px solid #000;
  user-select: none;
  img {
    width: 35px;
    height: 35px;
    border-radius: 50%;
    background-color: #fff;
    margin-right: 15px;
    object-fit: cover;
  }
  span {
    color: white;
    font-size: 12px;
  }
}

// 侧边栏菜单的样式
.el-aside {
  .el-submenu,
  .el-menu-item {
    width: 200px;
    user-select: none;
  }
}
</style>
