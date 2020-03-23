<template>
    <div>
        <div class="wd_header clearfix">
            <p class="fl" :class="{active:item.active}" v-for="(item,index) in nav" :key="index"><router-link :to="item.defaultUrl"> {{item.name}}</router-link></p>
        </div>
        <router-view ></router-view>
    </div>
</template>

<script>
export default {
    name:"markingNav",
    data() {
        return {
            nav : [
                {name:'阅卷管理',url:'/index/readPaper/admin',active:true,defaultUrl:'/index/readPaper/admin/readList'},
                {name:'阅卷任务',url:'/index/readPaper/setting',active:false,defaultUrl:'/index/readPaper/setting/settingList'},
                // {name:'阅卷设置',url:'/index/readPaper/task',active:false,defaultUrl:''}
            ],
        }
    },
    methods:{

    },
    watch: {
        $route(to,from){
            let _this = this;
            this.nav.forEach((e,i)=>{
                e.active = false;
                if(to.path.indexOf(e.url) != -1){
                    e.active = true;
                }
            })
        }
    },
    created(){
        this.nav.forEach((e,i)=>{
            e.active = false;
            console.log()
            if(this.$route.path.indexOf(e.url) != -1){
                e.active = true;
            }
        })
}
}
</script>
<style lang="" scoped>
    .wd_header{
        margin-top: -20px;
       
    }
    .wd_header p{
        margin-right:32px; 
        border-bottom: 2px solid transparent;
        font-size: 14px;
        font-weight: normal;
        font-stretch: normal;
        letter-spacing: 0px;
        color: #5093e1;
        padding: 4px 0;
        color:#999;
        cursor: pointer;
        margin-bottom: 10px;
    }
    .wd_header .active{
        color: #5093e1;
        border-bottom:2px solid #5093e1;
    }
</style>