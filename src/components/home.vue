<template>
    <el-container>
        <el-header>
            <div>电商后台管理系统</div>
            <el-button type="info" @click="logout">退出</el-button>
        </el-header>
        <el-container>
            <el-aside width="250px">
                <el-menu
                        default-active="2"
                        class="el-menu-vertical-demo"
                        @open="handleOpen"
                        @close="handleClose"
                        background-color="#333744"
                        text-color="#fff"
                        active-text-color="#ffd04b">
                    <!--一级菜单的模板区域-->
                    <el-submenu :key="item.id" v-if="item.children[0]" index="1"
                                v-for="(item,index) in menuData" :index="index+1+''">
                        <template slot="title">
                            <!--图标-->
                            <i class="el-icon-menu"></i>
                            <span>{{item.name}}</span>
                        </template>
                        <el-menu-item v-for="child in item.children"
                                      :index="child.url" :key="item.id">
<!--                            <i class="el-icon-location"></i>-->
                            <span>{{child.name}}</span>
                        </el-menu-item>
                    </el-submenu>
                </el-menu>
            </el-aside>
            <el-main>Main</el-main>
        </el-container>
    </el-container>
</template>

<script>
  export default {
    name: 'home',
    data(){
      return{
        menuData:[]
      }
    },
    methods: {
      logout () {
        window.sessionStorage.clear()
        this.$router.push('/login')
      },
      async getMenu(){
        const {data:res}=await this.$http.post("manage/sysRoleMenu/menu/1")
        console.log(res)
        //装载所有导航
        let att = []
        for (let i=0;i<res.data.length;i++){
          att.push(res.data[i].sysMenu)
        }
        if (att==''){
          that.$message('暂无使用权限');
          this.$router.push({
            path: '/login', // 退出登录
          })
        }
        //父级菜单
        let arr = [];
        //子级菜单
        let tow = [];
        //总菜单
        let arrList = [];
        //循环出需要的数
        for (let i=0;i<att.length;i++){
          //默认是不选
          if (att[i].type==1) {
            att[i].children = []
            arr.push(att[i])
          }else {
            tow.push(att[i])
          }
          arrList.push(att[i])
        }
        for (let i=0;i<arr.length;i++){
          for (let l=0;l<tow.length;l++){
            if (tow[l].parentId==arr[i].id){
              let show = arr[i].children.filter(item=>{
                return item.id === tow[l].id
              })
              if(show.length===0){
                arr[i].children.push(tow[l])
              }
            }
          }
        }
        console.log(arr)
        this.menuData=arr;
      }
    },
    mounted() {
      this.getMenu();
    }
  }
</script>

<style scoped>
    .el-container {
        width: 100%;
        height: 100%;
    }

    .el-header {
        background-color: #373d41;
        display: flex;
        justify-content: space-between;
        align-items: center;
        color: #fff;
        font-size: 20px;
    }

    .el-aside {
        background-color: #333744;
    }

    .el-main {
        background-color: #eaedf1;
    }
</style>
