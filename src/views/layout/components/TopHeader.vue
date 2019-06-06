<template>
  <section class="top-header">
    <span style="padding-left: 20px;">GameSource / Cage</span>
    <div class="avatar-container">
      <span class="right-menu-item">{{ name }}</span>
      <span class="right-menu-item" @click="logout">LogOut</span>
      <el-dropdown trigger="click" class="avatar-wrapper" @command="handleSetLanguage">
        <div>
          <svg-icon class-name="international-icon" icon-class="language" />
        </div>
        <el-dropdown-menu slot="dropdown">
          <el-dropdown-item :disabled="language==='en'" command="en">
            English
          </el-dropdown-item>
          <el-dropdown-item :disabled="language==='zh'" command="zh">
            中文
          </el-dropdown-item>
        </el-dropdown-menu>
      </el-dropdown>
    </div>
  </section>
</template>

<script>
import { mapGetters } from 'vuex'

export default {
  name: 'TopHeader',
  computed: {
    ...mapGetters([
      'name'
    ]),
    language() {
      return this.$store.getters.language
    }
  },
  methods: {
    logout() {
      this.$store.dispatch('user/logout').then(() => {
        location.reload() // 为了重新实例化vue-router对象 避免bug
      })
    },
    handleSetLanguage(lang) {
      this.$i18n.locale = lang
      this.$store.dispatch('app/SetLanguage', lang)
      this.$message({
        message: 'Switch Language Success',
        type: 'success'
      })
    }
  }
}
</script>

<style rel="stylesheet/scss" lang="scss" scoped>
.top-header {
  height: 50px;
  line-height: 50px;
  box-shadow: 0 1px 3px 0 rgba(0,0,0,.12), 0 0 3px 0 rgba(0,0,0,.04);
  .avatar-container {
    height: 50px;
    display: inline-block;
    position: absolute;
    right: 80px;
  }
  .right-menu-item {
      display: inline-block;
      padding: 0 8px;
      height: 100%;
      font-size: 18px;
      color: #5a5e66;
      vertical-align: text-bottom;
    }
}
</style>

