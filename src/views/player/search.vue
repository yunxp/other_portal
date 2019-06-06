<template>
  <div class="mixin-components-container">
    <el-row :gutter="20" style="margin:20px;">
      <el-col :span="10">
        <el-card class="box-card">
          <el-form ref="searchForm" :model="searchForm" label-position="left">
            <el-radio-group v-model="searchForm.idType">
              <el-radio label="card_id">
                Card ID
              </el-radio>
              <el-radio label="member_id">
                Member ID
              </el-radio>
            </el-radio-group>
            <el-input v-model="searchForm.idValue" style="width: 250px; padding-left: 50px;" required />
            <el-button icon="el-icon-search" type="primary" @click.native.prevent="handleSearch">
              Search
            </el-button>
          </el-form>
        </el-card>
      </el-col>
    </el-row>
    <router-view :key="key"/>
  </div>
</template>

<script>
export default {
  name: 'Search',
  data() {
    return {
      searchForm: {
        idType: 'card_id',
        idValue: null
      }
    }
  },
  computed: {
    key() {
      return this.$route.fullPath
    }
  },
  methods: {
    handleSearch() {
      this.$refs.searchForm.validate(valid => {
        if (valid) {
          // this.$router.push({ path: '/player/search/detail/' + this.searchForm.idValue })
          this.$router.replace({
            path: '/player/search/detail/' + this.searchForm.idType + '/' + this.searchForm.idValue
          })
        } else {
          console.log('error submit!!')
          return false
        }
      })
    }
  }
}
</script>
