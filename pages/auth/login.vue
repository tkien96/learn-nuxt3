<template>
    <Title>Login</Title>
    <div class="flex-1 h-full max-w-lg p-5 mx-auto overflow-hidden bg-white rounded-lg shadow-xl dark:bg-gray-800">
        <div class="w-full pt-5 space-y-6">
            <UIInput v-model="data.username" label="Email" placeholder="your_mail@gmail.com" />
            <UIInput label="Password" placeholder="********" type="password" v-model="data.password" />
            <UIButton @click="handleLogin" liquid :disabled="isButtonDisabled">
                Login
            </UIButton>
        </div>
    </div>
</template>
<script setup>
const data = reactive({
    username: '',
    password: '',
    loading: false
})
definePageMeta({
    layout: 'auth'
})
</script>