<template>
  <el-container>
    <el-header class="home_header">
      <div class="title">微人事</div>
      <el-dropdown class="userInfo" @command="commandHandler">
 <span class="el-dropdown-link">
    {{ user.name }}<i><img :src="user.userface" alt=""></i>
  </span>
        <el-dropdown-menu dropdown="dropdown">
          <el-dropdown-item command="userinfo">个人中心</el-dropdown-item>
          <el-dropdown-item command="setting">设置</el-dropdown-item>
          <el-dropdown-item command="logout" divided>注销登录</el-dropdown-item>
        </el-dropdown-menu>
      </el-dropdown>
    </el-header>
    <el-container>
      <el-aside class="home_aside" width="200px">
        <el-menu class="el-menu-vertical-demo" router unique-opened>
          <!--          <el-submenu v-for="(item,index) in this.$router.options.routes" v-if="!item.hidden" :key="index" index="hr">-->
          <el-submenu v-for="(item,index) in routes" v-if="!item.hidden" :key="index" :index="index+''">
            <template slot="title">
              <i style="margin-right: 8px" :class="item.iconCls"></i>
              <span>{{ item.name }}</span>
            </template>
            <el-menu-item v-for="(child,indexj) in item.children" :key="indexj" :index="child.path">{{ child.name }}
            </el-menu-item>
          </el-submenu>
        </el-menu>

      </el-aside>
      <el-main class="home_main">
        <el-breadcrumb separator-class="el-icon-arrow-right" v-if="this.$router.currentRoute.path!=='/home'">
          <el-breadcrumb-item :to="{ path: '/home' }">首页</el-breadcrumb-item>
          <el-breadcrumb-item>{{this.$router.currentRoute.name}}</el-breadcrumb-item>
        </el-breadcrumb>
        <div class="home_welcome" v-if="this.$router.currentRoute.path==='/home'">
          微人事管理系统
        </div>
        <router-view/>
      </el-main>
    </el-container>
  </el-container>
</template>

<script>
export default {
  name: "Home",
  data() {
    return {
      user: JSON.parse(window.sessionStorage.getItem("user"))
    }
  },
  computed: {
    routes() {
      return this.$store.state.routes
    }
  },
  methods: {
    commandHandler(cmd) {
      if (cmd === 'logout') {
        this.$confirm('此操作将注销登录, 是否继续?', '提示', {
          confirmButtonText: '确定',
          cancelButtonText: '取消',
          type: 'warning'
        }).then(() => {
          this.postRequest("/logout");
          window.sessionStorage.removeItem("user")
          this.$store.commit('initRoutes',[])
          this.$router.replace("/");
        }).catch(() => {
          this.$message({
            type: 'info',
            message: '已取消操作'
          });
        });
      }
    }
  }
}
</script>

<style scoped>

.home_header {
  background-color: #409eff;
  display: flex;
  align-items: center;
  justify-content: space-between;
  padding: 0 15px;
  box-sizing: border-box;
}

.home_header .title {
  font-size: 30px;
  font-family: 华文行楷, serif;
  color: #ffffff
}

.el-dropdown-link img {
  width: 48px;
  height: 48px;
  border-radius: 24px;
  margin-left: 8px;
}

.el-dropdown-link {
  display: flex;
  align-items: center;
}

.home_aside {

}

.home_main {

}


</style>