<template>
    <el-card class="box-card">
        <!-- 面包屑 -->
        <el-breadcrumb separator="/">
            <el-breadcrumb-item :to="{ path: '/' }">首页</el-breadcrumb-item>
            <el-breadcrumb-item><a href="/">活动管理</a></el-breadcrumb-item>
            <el-breadcrumb-item>活动列表</el-breadcrumb-item>
        </el-breadcrumb>

        <!--第二行-->
        <el-row class="searchRow">
            <el-col>
                <el-input v-model="query" class="inputSearch" clearable><el-button slot="append" icon="el-icon-search" @click="searchUser()"></el-button></el-input>
                <el-button type="success" @click="showAddUserDia()">添加用户</el-button>
            </el-col>
        </el-row>
        <el-table
            :data="userList"
            height="250"
            border
            style="width: 100%">
            <el-table-column
            type="index"
            label="#"
            width="80">
            </el-table-column>
            <el-table-column
            prop="username"
            label="姓名"
            width="80">
            </el-table-column>
            <el-table-column
            prop="email"
            label="邮箱">
            </el-table-column>
             <el-table-column
            prop="mobile"
            label="电话">
            </el-table-column>
             <el-table-column
            label="创建时间">
                <template slot-scope="scope">
                     {{scope.row.create_time | fmtdate}}
                </template>
            </el-table-column>
             <el-table-column
            label="用户状态">
                <template slot-scope="scope">
                    <el-switch
                        v-model="scope.row.mg_state" active-color="#13ce66"  inactive-color="#ff4949">
                    </el-switch>
                </template>
            </el-table-column>
             <el-table-column
            label="操作">
                <teamplate slot-scope="scope">
                     <el-button plain size="mini" type="primary" icon="el-icon-edit" circle @click="showEditUserDia()"></el-button>
                     <el-button plain size="mini" type="success" icon="el-icon-check" circle></el-button>
                     <el-button plain size="mini" type="danger" icon="el-icon-delete" circle @click="delMsgBox(scope.row.id)"></el-button>
                </teamplate>
            </el-table-column>
        </el-table>
        <el-pagination
            @size-change="handleSizeChange"
            @current-change="handleCurrentChange"
            :current-page="pageNum"
            :page-sizes="[2, 4, 6, 8]"
            :page-size="pageSize"
            layout="total, sizes, prev, pager, next, jumper"
            :total="total">
        </el-pagination>
        <el-dialog title="添加用户" :visible.sync="dialogFormVisible">
            <el-form :model="form">
                <el-form-item label="用户名" label-width="100px">
                <el-input v-model="form.name" autocomplete="off"></el-input>
                </el-form-item>
                <el-form-item label="密码" label-width="100px">
                <el-input v-model="form.password" autocomplete="off"></el-input>
                </el-form-item>
                <el-form-item label="邮箱" label-width="100px">
                <el-input v-model="form.email" autocomplete="off"></el-input>
                </el-form-item>
                <el-form-item label="电话" label-width="100px">
                <el-input v-model="form.mobile" autocomplete="off"></el-input>
                </el-form-item>
            </el-form>
            <div slot="footer" class="dialog-footer">
                <el-button @click="dialogFormVisible = false">取 消</el-button>
                <el-button type="primary" @click="AddUser()">确 定</el-button>
            </div>
        </el-dialog>
        <el-dialog title="编辑用户" :visible.sync="dialogEditFormVisible">
            <el-form :model="form">
                <el-form-item label="用户名" label-width="100px">
                <el-input v-model="form.name" autocomplete="off"></el-input>
                </el-form-item>
                <el-form-item label="邮箱" label-width="100px">
                <el-input v-model="form.email" autocomplete="off"></el-input>
                </el-form-item>
                <el-form-item label="电话" label-width="100px">
                <el-input v-model="form.mobile" autocomplete="off"></el-input>
                </el-form-item>
            </el-form>
            <div slot="footer" class="dialog-footer">
                <el-button @click="dialogEditFormVisible = false">取 消</el-button>
                <el-button type="primary" @click="editTable()">确 定</el-button>
            </div>
        </el-dialog>
    </el-card>
</template>
<script>
export default {
  name: 'users',
  created () {
    this.getUserList()
  },
  data () {
    return {
      query: '',
      pageNum: 1,
      pageSize: 2,
      userList: [],
      total: -1,
      dialogFormVisible: false,
      dialogEditFormVisible: false,
      form: {
        username: '',
        password: '',
        email: '',
        mobile: ''
      }
    }
  },
  methods: {
    delMsgBox (userId) {
      this.$confirm('此操作将永久删除该文件, 是否继续?', '提示', {
        confirmButtonText: '确定',
        cancelButtonText: '取消',
        type: 'warning'
      })
        .then(() => {
          this.$message({
            type: 'success',
            message: '删除成功!'
          })
          this.$http.delete(`users/:${userId}`).then(() => {}).catch(() => {
            this.pageNum = 1
            this.getUserList()
          })
        })
        .catch(() => {
          this.$message({
            type: 'info',
            message: '已取消删除'
          })
        })
    },
    AddUser () {
      this.$http
        .post('users', this.form)
        .then(res => {
          this.dialogFormVisible = false
        })
        .catch(() => {
          this.$message.success('成功')
          this.dialogFormVisible = false
          this.pageNum = 1
          this.getUserList()
          // this.form={username:'',password:'',email:'',mobile:''}
          for (const key in this.form) {
            if (this.form.hasOwnProperty(key)) {
              this.form[key] = ''
            }
          }
        })
    },
    showEditUserDia(){
      this.dialogEditFormVisible = true
    },
    showAddUserDia () {
      this.dialogFormVisible = true
    },
    searchUser () {
      this.getUserList()
    },
    handleSizeChange (val) {
      console.log(`每页 ${val} 条`)
      this.pageSize = val
      this.getUserList()
      // 调后台
    },
    handleCurrentChange (val) {
      console.log(`当前页: ${val}`)
      this.pageNum = val
      this.getUserList()
    },
    getUserList () {
      // 设置请求头
      //   const AUTH_TOKEN = localStorage.getItem("token");
      //   this.$http.defaults.header.common["Authorzation"] = AUTH_TOKEN;
      this.$http
        .get(
          `users?query="${this.query}&pagenum=${this.pageNum}&pagesize=${
            this.pageSize
          }"`
        )
        .then(res => {})
        .catch(() => {
          // const {data:{users,total},meta:{msg, status}}=res.data
          const status_ = 200
          const total_ = 16
          const users_ = [
            {
              create_time: 1486720211,
              email: 'youxiang1',
              id: 500,
              mg_state: true,
              mobile: 1234,
              role_name: '主管',
              username: 'admin'
            },
            {
              create_time: 1486720211,
              email: 'youxiang2',
              id: 501,
              mg_state: true,
              mobile: 1234,
              role_name: '主管',
              username: 'admin'
            },
            {
              create_time: 1486720211,
              email: 'youxiang3',
              id: 502,
              mg_state: true,
              mobile: 1234,
              role_name: '主管',
              username: 'admin'
            },
            {
              create_time: 1486720211,
              email: 'youxiang4',
              id: 503,
              mg_state: true,
              mobile: 1234,
              role_name: '主管',
              username: 'admin'
            }
          ]
          if (status_ == 200) {
            this.userList = users_
            console.log(users_)
            this.total = total_
          }
        })
    }
  }
}
</script>
<style>
.box-card {
  height: 100%;
}
.inputSearch {
  width: 200px;
}
.searchRow {
  margin-top: 10px;
}
</style>
