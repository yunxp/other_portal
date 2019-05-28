<template>
  <div class="app-container">
    <p v-permission="['admin']" class="warn-content">
      admin user.
    </p>
    <div class="filter-container">
      <el-input v-model="listQuery.username" placeholder="UserName" style="width: 200px;" class="filter-item" @keyup.enter.native="handleFilter" />
      <el-button class="filter-item" type="primary" icon="el-icon-search" @click="handleFilter">
        Search
      </el-button>
      <el-button :loading="downloadLoading" class="filter-item" type="primary" icon="el-icon-download" @click="handleDownload">
        Export
      </el-button>
    </div>
    <el-table
      v-loading="listLoading"
      :data="list"
      :default-sort ="{prop:'updated_at',order:'descending'}"
      element-loading-text="Loading"
      border
      fit
      highlight-current-row
      @sort-change="sortChange">
      <el-table-column align="center" label="ID" prop="id" sortable="custom">
        <template slot-scope="scope">
          {{ scope.row.id }}
        </template>
      </el-table-column>
      <el-table-column label="Username" prop="username" sortable="custom">
        <template slot-scope="scope">
          {{ scope.row.username }}
        </template>
      </el-table-column>
      <el-table-column label="Status" align="center">
        <template slot-scope="scope">
          <span>{{ scope.row.status }}</span>
        </template>
      </el-table-column>
      <el-table-column label="Admin" align="center">
        <template slot-scope="scope">
          {{ scope.row.admin }}
        </template>
      </el-table-column>
      <el-table-column align="center" label="Updated At" prop="updated_at" sortable="custom">
        <template slot-scope="scope">
          <i class="el-icon-time"/>
          <span>{{ scope.row.updated_at | parseTime }}</span>
        </template>
      </el-table-column>
      <el-table-column v-if="checkPermission(['system_user_grant_roles'])" align="center" label="Actions" width="120">
        <template slot-scope="scope">
          <router-link :to="'/user/edit/'+scope.row.id">
            <el-button type="primary" size="small" icon="el-icon-edit">
              Edit
            </el-button>
          </router-link>
        </template>
      </el-table-column>
    </el-table>

    <pagination v-show="total>0" :total="total" :page.sync="listQuery.page" :limit.sync="listQuery.limit" @pagination="fetchData" />
  </div>
</template>

<script>
import { getUsers } from '@/api/sso/user'
import permission from '@/directive/permission/index.js' // 权限判断指令
import checkPermission from '@/utils/permission' // 权限判断函数
import Pagination from '@/components/Pagination' // Secondary package based on el-pagination
import { parseTime } from '@/utils'

export default {
  name: 'UserList',
  directives: { permission },
  components: { Pagination },
  data() {
    return {
      list: null,
      total: 0,
      listLoading: true,
      downloadLoading: false,
      listQuery: {
        page: 1,
        limit: 10
      }
    }
  },
  methods: {
    checkPermission,
    fetchData() {
      this.listLoading = true
      getUsers(this.listQuery).then(response => {
        this.list = response.data.users
        this.total = response.data.total_count
        this.listLoading = false
      })
    },
    handleFilter() {
      this.listQuery.page = 1
      this.fetchData()
    },
    sortChange(data) {
      const { prop, order } = data
      if (prop === null) {
        return
      }
      this.sortByProp(prop, order)
    },
    sortByProp(prop, order) {
      if (order === 'ascending') {
        this.listQuery.sort = prop + ' asc'
      } else {
        this.listQuery.sort = prop + ' desc'
      }

      this.handleFilter()
    },
    handleDownload() {
      this.downloadLoading = true
      import('@/vendor/Export2Excel').then(excel => {
        const tHeader = ['id', 'username', 'status', 'updated_at']
        const filterVal = ['id', 'username', 'status', 'updated_at']
        const data = this.formatJson(filterVal, this.list)
        excel.export_json_to_excel({
          header: tHeader,
          data,
          filename: 'user-list'
        })
        this.downloadLoading = false
      })
    },
    formatJson(filterVal, jsonData) {
      return jsonData.map(v => filterVal.map(j => {
        if (j === 'updated_at') {
          return parseTime(v[j])
        } else {
          return v[j]
        }
      }))
    }
  }
}
</script>
