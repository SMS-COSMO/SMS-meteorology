<template>
  <div>
    <el-container>
      <el-header>
        <el-menu
          mode="horizontal"
          :ellipsis="false"
          style="width: 1470px;"
        >
          <el-menu-item index="/" @click="blankNav('/')">
            <img src="/logo.png" alt="Logo" class="w-[100px] h-auto">
            深圳中学气象社
          </el-menu-item>
          <el-menu-item index="/intro" @click="blankNav('/intro')">社团简介</el-menu-item>
          <el-menu-item index="/articles" @click="blankNav('/articles')">往期文章</el-menu-item>
          <el-menu-item index="/contact" @click="blankNav('/contact')">联系我们</el-menu-item>
          <el-menu-item index="/news" @click="blankNav('/news')">新闻动态</el-menu-item>
          <el-menu-item index="/feedback" @click="blankNav('/feedback')">意见反馈</el-menu-item>
          <el-menu-item class="menu-item-right" index="/manage" @click="blankNav('/manage')">管理</el-menu-item>
          <div class="ml-auto h-full flex items-center">
            <RightTopMenu />
          </div>
        </el-menu>
      </el-header>
      <el-main>
        <slot />
      </el-main>
      <el-footer>
        <div class="mx-auto mt-5 text-center text-sm opacity-25">
          [Default Layout]
        </div>
      </el-footer>
    </el-container>
  </div>
</template>

<script setup lang="ts">

function blankNav(path: string) {
  navigateTo(path);
}

</script>

<style scoped>

.menu-item-right {
  margin-left: auto;
}

</style>