<template>
    <div>
        <el-breadcrumb separator-class="el-icon-arrow-right">
            <el-breadcrumb-item :to="{ path: '/' }">首页</el-breadcrumb-item>
            <el-breadcrumb-item>用户管理</el-breadcrumb-item>
            <el-breadcrumb-item>用户列表</el-breadcrumb-item>
        </el-breadcrumb>
        <el-card class="box-card">
            <el-row :gutter="20">
                <el-col :span="7">
                    <el-input placeholder="请输入用户id" v-model="id" class="input-with-select">
                        <el-button slot="append" icon="el-icon-search" @click="findUser"></el-button>
                    </el-input>
                </el-col>
                <el-col :span="4">
                    <el-button type="primary">添加用户</el-button>
                </el-col>
            </el-row>

            <el-table
                    border
                    stripe
                    :data="tableData"
                    style="width: 100%">
                <el-table-column
                        label="#"
                        type="index"
                        width="40">
                </el-table-column>
                <el-table-column
                        prop="id"
                        label="用户ID"
                        width="100">
                </el-table-column>
                <el-table-column
                        prop="vipStatus"
                        label="级别"
                        width="100">
                </el-table-column>
                <el-table-column
                        prop="mobile"
                        label="手机号"
                        width="120">
                </el-table-column>
                <el-table-column
                        prop="nickName"
                        label="用户昵称"
                        width="100">
                </el-table-column>
                <el-table-column
                        prop="city"
                        label="注册城市"
                        width="100">
                </el-table-column>
                <el-table-column
                        prop="typeName"
                        label="注册平台"
                        width="100">
                </el-table-column>
                <el-table-column
                        prop="nickName"
                        label="来源"
                        width="100">
                </el-table-column>
                <el-table-column
                        prop="typeCreateDate"
                        label="注册时间"
                        width="100">
                </el-table-column>
                <el-table-column
                        prop="communityName"
                        label="社区名称"
                        width="140">
                </el-table-column>
                <el-table-column
                        prop="communityId"
                        label="社区团ID"
                        width="100">
                </el-table-column>
                <el-table-column
                        label="状态"
                        width="100">
                    <template slot-scope="scope">
                        <el-switch
                                v-model="scope.row.isDel==0"
                                active-color="#13ce66"
                                inactive-color="#ff4949">
                        </el-switch>
                    </template>
                </el-table-column>
            </el-table>
        </el-card>
    </div>
</template>

<script>
  export default {
    name: 'UserList',
    data(){
      return{
        id:"10000",
        tableData:[]
      }
    },
    methods:{
      async findUser(){
        let {data:res}=await this.$http.post("/manage/user/page",{
          id:this.id,
          pageNUm:"1",
          pageSize:"20"
        })
        console.log(res)
        this.tableData=res.data.list
        console.log(this.tableData)
      }
    },
    mounted () {
      this.findUser();
    }

  }
</script>

<style lang="less" scoped>

</style>
