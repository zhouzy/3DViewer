<template>
    <div id="app" class="layout__page">
        <image-viewer class="layout__image-viewer" v-if="isImageViewer" :level="level"></image-viewer>
        <iframe class="layout__3d-viewer" v-else src="./cam/index.html"></iframe>
        <side-nav class="layout__side-nav" @nav-change="handleNavChange"></side-nav>
    </div>
</template>

<script>
    import SideNav from './components/SideNav.vue'
    import ImageViewer from "./components/ImageViewer";

    export default {
        name: 'app',
        components: {
            ImageViewer,
            SideNav
        },
        data(){
            return {
                isImageViewer: true,
                level: 1
            }
        },
        methods: {
            handleNavChange(key){
                console.log(key);
                this.isImageViewer = (key !== "3D");

                if(this.isImageViewer){
                    this.level = (+key);
                }
            }
        }
    }
</script>

<style>
    html,body{
        margin:0;
        padding:0;
    }
</style>
<style>
    .layout__page{
        position: absolute;
        left:50%;
        top:50%;
        width:800px;
        height:600px;
        border:1px solid #f2f2f2;
        transform: translate(-50%, -50%);
    }
    .layout__image-viewer{
        width:100%;
        height:100%;
        overflow:hidden;
    }

    .layout__3d-viewer{
        width:100%;
        height:100%;
        overflow:hidden;
        outline:none;
        border:none;
    }
    .layout__side-nav{
        position: absolute;
        right:0;
        top:0;
        bottom:0;
        width:100px;
    }
</style>
