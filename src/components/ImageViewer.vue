<template>
    <div class="image-viewer"
         @mousedown.prevent="handleMouseDown"
         @mousemove.prevent="handleMouseMove"
         @mouseup.prevent="handleMouseUp"
         @wheel.ctrl="handleWheel"
    >
        <div class="image-viewer__image-wrapper" :style="imgStyle">
            <img :src="imageUrl"/>
            <span v-for="(camera,index) of cameraInfo" :key="index" class="icon-camera" :style="camera.iconStyle" @click="handlePlayVideo(camera.id)">
                <span>{{camera.id}}</span>
            </span>
        </div>
    </div>
</template>

<script>
    export default {
        name: 'ImageViewer',
        created(){
        },
        props: {
            level: {
                type: Number,
                required: true,
                default: 0
            }
        },
        data(){
            return {
                imageUrl: require("../assets/yilou.png"),

                imgOffset: {x: 0, y: 0},
                eventOffset: {x: 0, y: 0},
                cameraInfo: [],

                isDragging: false,
                zoom: 1
            }
        },
        computed: {
            imgStyle(){
                let width = 100 * this.zoom;
                return {
                    left: `${this.imgOffset.x}px`,
                    top: `${this.imgOffset.y}px`,
                    width: `${width}%`
                };
            }
        },
        methods: {
            handleMouseDown($event){
                this.isDragging = true;
                this.eventOffset.x = $event.offsetX;
                this.eventOffset.y = $event.offsetY;
            },

            handleMouseMove($event){
                if(this.isDragging){
                    let {offsetX,offsetY} = $event;

                    this.imgOffset.x += (offsetX - this.eventOffset.x);
                    this.imgOffset.y += (offsetY - this.eventOffset.y);
                }
            },

            handleMouseUp(){
                this.isDragging = false;
            },

            /**
             * 缩放0.5-2
             * 放大每次0.2
             * 1-0缩小为每次0.2, 0-0.5 缩小为每次0.1
             * @param $event
             */
            handleWheel($event){
                let MAX_ZOOM = 3;
                let zoom = $event.wheelDeltaY;
                //放大
                if(zoom > 0){
                    if(this.zoom < MAX_ZOOM){
                        this.zoom += 0.2;
                    }
                }
                else{//缩小
                    if(this.zoom > 1){
                        this.zoom -= 0.2;
                    }
                    else if(this.zoom > 0.5){
                        this.zoom -= 0.1;
                    }
                }
            },

            iconStyle: function(cameraInfo){
                let {offsetX, offsetY} = cameraInfo;
                let width = 30 * this.zoom;
                let height = 30 * this.zoom;

                offsetX *= this.zoom;
                offsetY *= this.zoom;

                return {
                    left: `${offsetX}px`,
                    top: `${offsetY}px`,
                    width: `${width}px`,
                    height: `${height}px`
                };
            },

            refreshIconStyle(){
                this.cameraInfo.map(item => {
                    item.iconStyle = this.iconStyle(item);
                    return item;
                });
            },

            handlePlayVideo(id){
                document.createElement('img').setAttribute('src', `http://localhost:8200/${id}`);
            }
        },

        watch: {
            zoom(){
                this.refreshIconStyle();
            },

            level: {
                immediate: true,
                handler(){
                    let allCameraInfo = [
                        [
                            /*一楼*/
                            {id: "51011552001310010438", offsetX: 103, offsetY: 206},
                            {id: "51012482001310032444", offsetX: 204, offsetY: 365},
                            {id: "51012482001310016863", offsetX: 600, offsetY: 451}
                        ],[
                            /*二楼*/
                            {id: "51011552001310010438", offsetX: 203, offsetY: 206},
                            {id: "51012482001310032444", offsetX: 304, offsetY: 365},
                            {id: "51012482001310016863", offsetX: 700, offsetY: 451}
                        ],[
                            /*三楼*/
                            {id: "51011552001310010438", offsetX: 303, offsetY: 206},
                            {id: "51012482001310032444", offsetX: 704, offsetY: 365},
                            {id: "51012482001310016863", offsetX: 300, offsetY: 451}
                        ],[
                            /*四楼*/
                            {id: "51011552001310010438", offsetX: 403, offsetY: 206},
                            {id: "51012482001310032444", offsetX: 204, offsetY: 365},
                            {id: "51012482001310016863", offsetX: 200, offsetY: 451}
                        ]
                    ];

                    let index = this.level - 1;

                    this.cameraInfo = allCameraInfo[index];
                    this.refreshIconStyle();
                }
            }
        }

    }
</script>

<style scoped>
    .image-viewer{
        width:100%;
        height:100%;
        position: relative;
    }

    .image-viewer .image-viewer__image-wrapper{
        position: absolute;
        left:0;
        top:0;
        width:100%;
    }

    .image-viewer img{
        width:100%;
    }

    .icon-camera{
        width:30px;
        height:30px;
        display:inline-block;
        background:url(../assets/camare.gif) no-repeat no-repeat;
        background-size:contain;
        border-radius: 50%;
        transform: translate(-50%, -50%);
        position: absolute;
        cursor:pointer;
    }

    .icon-camera span{
        display:inline-block;
        height:20px;
        line-height:20px;
        background: #1b6d85;
        color:#fff;
        position:absolute;
        bottom:-20px;
        left:50%;
        transform: translateX(-50%);
        border-radius: 3px;
        min-width:130px;
        padding:0 5px;
        text-align:center;
    }
</style>
