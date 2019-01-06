<template>
    <div class="side-nav">
        <ul class="nav-menu">
            <li class="nav-menu__item"
                v-for="(item,index) of imageList" :key="index"
                :class="{active: activeIndex===index}"
                @click="handleClick(item.key, index)"
            >
                {{item.text}}
            </li>
        </ul>
    </div>
</template>

<script>
    export default {
        name: 'ImageViewer',
        data(){
            return {
                imageList: [
                    {key: "1", text: "第一层"},
                    {key: "2", text: "第二层"},
                    {key: "3", text: "第三层"},
                    {key: "4", text: "第四层"},
                    {key: "3D", text: "3D效果"},
                ],

                activeIndex: 0
            }
        },
        methods: {
            handleClick(key, index){
                this.$emit("nav-change", key);
                this.activeIndex = index;
            }
        },
        props: {
            msg: String
        }
    }
</script>

<!-- Add "scoped" attribute to limit CSS to this component only -->
<style scoped>
    ul {
        list-style-type: none;
        padding: 0;
        margin:0;
    }
    li {
        display: inline-block;
        margin: 0;
    }
    .nav-menu__item{
        background: rgba(0,84,76,0.8);
        display:block;
        height:35px;
        line-height:35px;
        padding-left:5px;
        color: #c1c1c1;
        cursor:pointer;
        margin:0;
        margin-bottom: 3px;
    }

    .nav-menu__item:hover{
        background: rgba(0,84,76,0.8);
    }
    .nav-menu__item.active{
        background: rgb(0,84,76);
        color:#fff;
    }

</style>
