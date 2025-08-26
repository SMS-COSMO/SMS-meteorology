<template>
  <div class="page-index min-h-screen pt-[60px] text-center">
    <el-carousel 
      height="350px"
      type="card"
      :autoplay="false"
      class="mb-12 px-4 mx-auto max-w-[1440px]"
    >
      <el-carousel-item v-for= "item in 4" :key="item" class="bg-slate-300 rounded-lg transition-all">
        <div class="h-full flex items-center justify-center">
          <h3>
            {{ item }}
          </h3>
        </div>
      </el-carousel-item>
    </el-carousel>
    <el-card class="max-w-[960px] mx-auto mt-8 border-normal" shadow="never">
      <template #header>
        <div class="card-header px-4 py-3 border-b border-gray-200">
          <span class="text-xl font-semibold">深圳中学气象社</span>
        </div>
      </template>
      <p class="px-4 py-2">
        关注阴晴冷暖，气象伴你始终
      </p>
      <template #footer>
        <div class="px-4 py-3 border-t text-right">
          关注阴晴冷暖，气象伴你始终
        </div>
      </template>
    </el-card>
  </div>
</template>