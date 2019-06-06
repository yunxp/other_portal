<template>
  <div class="mixin-components-container">
    <el-row :gutter="20" style="margin:20px;">
      <el-col :span="10">
        <el-card class="box-card">
          <el-row v-for="value in ['card_id', 'member_id', 'status', 'currency', 'balance']" :key="value" :gutter="20">
            <el-col :span="10">
              <label class="label">{{ value }}:</label>
            </el-col>
            <el-col :span="10">
              {{ player[value] || '-' }}
            </el-col>
          </el-row>
          <el-row :gutter="20">
            <el-col :span="10">
              <label class="label">credit_balance:</label>
            </el-col>
            <el-col :span="10">
              {{ player['credit_balance'] }}
              <span v-if="player['credit_balance'] > 0">{{ player['credit_expired_at'] }}</span>
            </el-col>
          </el-row>
        </el-card>
      </el-col>
    </el-row>
  </div>
</template>

<script>
import { queryPlayerInfo } from '@/api/cgms/player'

export default {
  data() {
    return {
      player: {}
    }
  },
  created() {
    const id_type = this.$route.params && this.$route.params.id_type
    const id_value = this.$route.params && this.$route.params.id_value
    this.fetchData(id_type, id_value)
  },
  methods: {
    fetchData(id_type, id_value) {
      queryPlayerInfo({ licensee_id: 20000, id_type: id_type, id_value: id_value }).then(response => {
        this.player = response
      }).catch(error => {
        console.log(error)
      })
    }
  }
}
</script>

<style rel="stylesheet/scss" lang="scss" scoped>
.el-row {
  margin:20px;
}
</style>

