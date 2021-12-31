<template>
  <div class="page page--auth">
    <div class="auth-card">
      <div class="header">
        Вход в личный кабинет
      </div>
      <el-form ref="ruleForm" :model="form" :rules="rules" status-icon label-width="120px">
        <el-form-item label="Логин" prop="login">
          <el-input v-model="form.login" label="Логин *" outlined autocomplete="off" />
        </el-form-item>
        <el-form-item label="Пароль" prop="password">
          <el-input v-model="form.password" type="password" label="Пароль *" autocomplete="off" />
        </el-form-item>
        <el-form-item>
          <el-button v-loading="isLoading" :disabled="isLoading" type="primary" @click="submitForm">
            Войти
          </el-button>
          <el-button>
            Забыли пароль?
          </el-button>
        </el-form-item>
      </el-form>
    </div>
  </div>
</template>

<script lang="ts">
import { Component, mixins, Ref } from 'nuxt-property-decorator'
import { Form } from 'element-ui/types/element-ui'
import LoadingMixin from '~/core/mixins/LoadingMixin'
import { vxm } from '~/store'

@Component({ head: { title: 'Вход' } })
export default class LoginPage extends mixins(LoadingMixin) {
  @Ref() ruleForm!: InstanceType<typeof Form>

  form = {
    login: '',
    password: ''
  }

  get rules () {
    const validatePass = (word:string) => {
      return (_rule: Record<string, any>, value: string, callback: Function) => {
        if (value === '') {
          callback(new Error(`Пожалуйста введите ${word}`))
        } else { callback() }
      }
    }
    return {
      login: [{ validator: validatePass('логин'), trigger: 'blur' }],
      password: [{ validator: validatePass('пароль'), trigger: 'blur' }]
    }
  }

  submitForm () {
    this.ruleForm.validate(async (valid: boolean) => {
      if (valid) {
        const result = await this.wrapLoading(() => vxm.auth.login({
          login: this.form.login,
          password: this.form.password
        }))

        if (result.isSuccess) {
          await this.$router.push({ name: 'index' })
        } else {
          alert(result.errorMessage)
        }
      }
    })
  }
}
</script>

<style scoped>
.header {
  text-align: center;
  margin-bottom: 25px;
  padding-left: 40px;
}
</style>
