<template>
    <div class="page-articles">
        <el-row v-for="article in 10" :key="article">
            <div class="mx-auto max-w-[1300px] px-4 lg:px-5">
                <div class="flex flex-col lg:flex-row lg:gap-4">
                    <Articlecard />
                </div>
            </div>
        </el-row>
    </div>
</template>

<style>
.el-row {
  margin-bottom: 20px;
}
</style>