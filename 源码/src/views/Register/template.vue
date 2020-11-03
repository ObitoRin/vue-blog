<template>
    <div id="register">
        <h4>用户名</h4>
        <input v-model="username" placeholder="用户名">
        <h4>密码</h4>
        <input v-model="password" type="password" placeholder="密码" @keyup.enter="onRegister">
        <el-button @click="onRegister">立即注册</el-button>
        <p class="notice">已有账号？<router-link to="/login">直接登录</router-link ></p>            
    </div>
</template>

<script src="./template.js"></script>

<style lang="less" src="../Login/template.less" scoped></style>