<template>
    <div>
        <el-form ref="loginForm" :model="loginForm" :rules="rules" class="loginContainer">
            <h3 class="loginTitle">登陆</h3>
            <el-form-item class="loginInput" prop="username">
                <el-input v-model="loginForm.username" auto-complete="off" placeholder="用户名" type="text"></el-input>
            </el-form-item>
            <el-form-item class="loginInput" prop="password">
                <el-input v-model="loginForm.password" auto-complete="off" placeholder="密码"
                          type="password"></el-input>
            </el-form-item>
            <el-checkbox v-model="rememberMe" class="loginRemember">remember me</el-checkbox>
            <el-button class="loginButton" plain type="primary" @click="submitLogin">登陆</el-button>
        </el-form>
    </div>
</template>

<script>


export default {
    name: "Login",
    data() {
        return {
            rules: {
                username: [{required: true, message: '请输入用户名', trigger: 'blur'}],
                password: [{required: true, message: '请输入密码', trigger: 'blur'}]
            },
            loginForm: {
              username: "",
              password: ""
            },
            rememberMe: false
        }
    },
    methods: {
        submitLogin() {
            this.$refs.loginForm.validate((valid) => {
                if (valid) {
                    this.postKeyValueRequest('/doLogin', this.loginForm).then(resp => {
                        if (resp) {
                            window.sessionStorage.setItem('user', JSON.stringify(resp.obj))
                            this.$router.replace('/home')
                        }
                    })
                } else {
                    this.$message.error('请输入所有字段')
                    return false
                }
            })
        }
    }
}
</script>

<style scoped>
.loginContainer {
    border-radius: 20px;
    background-clip: padding-box;
    margin: 180px auto;
    width: 350px;
    background: #FFFFFF;
    border: 1px solid #eaeaea;
    box-shadow: 0 0 25px #cac6c6;
}

.loginInput {
    width: 300px;
    margin: 15px 25px 15px 25px;
}

.loginButton {
    width: 50%;
    margin: 20px 25%;
}

.loginTitle {
    margin: 20px auto 20px auto;
    text-align: center;
    color: #505458;
}

.loginRemember {
    padding-left: 20px;
    text-align: left;
    margin: 0 0 35px 0;
    display: inline;
}

</style>