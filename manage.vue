<template>
  <div class="h-screen flex items-center justify-center bg-gray-50 p-4">
    <el-card class="w-full max-w-md shadow-lg">
      <div class="text-center mb-6">
        <h2 class="text-2xl font-bold text-gray-800">系统登录</h2>
      </div>

      <el-form label-position="top">
        <el-form-item>
          <div class="flex items-center mb-2">
            <el-icon class="i-tabler:user mr-2" />学工号
          </div>
          <el-input
            v-model="form.schoolId"
            placeholder="请输入学工号"
            @keyup.enter="handleLogin"
          />
        </el-form-item>
        <el-form-item>
          <div class="flex items-center mb-2">
            <el-icon class="i-tabler:lock mr-2" />密码
          </div>
          <el-input
            v-model="form.password"
            type="password"
            placeholder="请输入密码"
            show-password
            @keyup.enter="handleLogin"
          />
        </el-form-item>
        <el-form-item class="mt-6">
          <el-button
            class="w-full"
            type="primary"
            :loading="isLoading"
            @click="handleLogin"
          >
            登录
          </el-button>
        </el-form-item>
      </el-form>
    </el-card>
  </div>
</template>

<script lang="ts" setup>
import { ref, reactive } from 'vue';
import { useRouter } from 'vue-router';
import { ElMessage, ElMessageBox } from 'element-plus';
import { useMutation } from '@tanstack/vue-query';
import { $api } from './app/composables/api';

const router = useRouter();
const form = reactive({
  schoolId: '',
  password: '',
});
const isLoading = ref(false);

const { mutate: loginMutation } = useMutation({
  mutationFn: async (input: { schoolId: string; password: string }) => {
    isLoading.value = true;
    try {
      return await $api.user.login.mutate(input);
    } finally {
      isLoading.value = false;
    }
  },
  onSuccess: (res) => {
    localStorage.setItem('accessToken', res.accessToken);
    localStorage.setItem('refreshToken', res.refreshToken);
    localStorage.setItem('userInfo', JSON.stringify(res));

    ElMessage({
      message: '登录成功',
      type: 'success',
    });

    if (res.initialPassword) {
      ElMessageBox.alert('请尽快修改初始密码', '安全警告', { type: 'warning' });
      router.push({ path: '/user/profile', query: { action: 'password' } });
    } else {
      router.push('/dashboard');
    }
  },
  onError: (err: Error) => {
    ElMessage({
      message: err.message || '登录失败，请检查账号密码',
      type: 'error',
    });
  },
});

const handleLogin = () => {
  if (!form.schoolId || !form.password) {
    ElMessage({
      message: '请输入学工号和密码',
      type: 'warning',
    });
    return;
  }
  loginMutation(form);
};
</script>