<template>
    <el-container>
        <el-header>
            <div>电商后台管理系统</div>
            <el-button type="info" @click="logout">退出</el-button>
        </el-header>
        <el-container>
            <el-aside :width="collapse?'64px':'200px'">
                <div class="toggle-button" @click="toggleCollapse">|||</div>
                <el-menu
                        :collapse="collapse"
                        :collapse-transition="false"
                        :default-active="activePath"
                        class="el-menu-vertical-demo"
                        @open="handleOpen"
                        @close="handleClose"
                        background-color="#333744"
                        text-color="#fff"
                        unique-opened
                        style="border-right: 0"
                        router
                        active-text-color="#409eff">
                    <!--一级菜单的模板区域-->
                    <el-submenu :key="item.id" v-if="item.children[0]" v-for="(item,index) in menuData"
                                :index="index+1+''">
                        <template slot="title">
                            <!--图标-->
                            <i class="el-icon-menu"></i>
                            <span>{{item.name}}</span>
                        </template>
                        <el-menu-item v-for="child in item.children"
                                      :index="child.url" :key="item.id" @click="saveNavState(child.url)">
                            <span>{{child.name}}</span>
                        </el-menu-item>
                    </el-submenu>
                </el-menu>
            </el-aside>
            <el-main>
                <router-view></router-view>
            </el-main>
        </el-container>
    </el-container>
</template>

<script>
  export default {
    name: 'home',
    data(){
      return{
        menuData:[],
        collapse:false,
        //被激活的链接地址
        activePath:''
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
            //TODO 测试
            if (tow[l].parentId==arr[i].id&&arr[i].name=="用户管理"){
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
      },
      toggleCollapse(){
        this.collapse=!this.collapse;
      },
      saveNavState(activePath){
        window.sessionStorage.setItem('activePath',activePath);
        this.activePath=activePath
      }
    },
    created () {
      this.activePath=window.sessionStorage.getItem("activePath")
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
    .toggle-button{
        background-color: #4a5064;
        font-size: 10px;
        line-height: 24px;
        color: #fff;
        text-align: center;
        letter-spacing: 0.2em;
        cursor: pointer;
    }
</style>
