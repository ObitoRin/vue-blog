<template>
    <div id="edit">
        <h1>编辑文章</h1>
        <h3>文章标题</h3>
        <el-input ref="title" v-model="title" @input="onInput"></el-input>
        <p class="msg">已输入 {{this.title.length}} / {{titleMaxLength}} 字</p>

        <h3>内容简介</h3>
        <el-input type="textarea" ref="description" v-model="description" @input="onInput" resize="none" :autosize="{ minRows: 2, maxRows: 6}"></el-input>
        <p class="msg">已输入 {{this.description.length}} / {{descriptionMaxLength}} 字</p>

        <h3>文章内容</h3>
        <el-input type="textarea" ref="content" v-model="content" @input="onInput" resize="none" :autosize="{ minRows: 4, maxRows: 30}"></el-input>
        <p class="msg">已输入 {{this.content.length}} / {{contentMaxLength}} 字</p>
        <el-button @click="onEdit">保存</el-button>
    </div>
</template>

<script src="./template.js"></script>

<style lang="less" src="../Create/template.less" scoped></style>