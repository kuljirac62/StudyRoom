<template>
    <div>
        <main-header navsel="back"></main-header>
        <h2>comments ผู้ใช้บริการ</h2>
        <h4>จำนวน comment ทั้งหมด {{comments.length}} คน</h4>
        <div v-for="comment in comments" v-bind:key="comment.id">
            <p>id: {{ comment.id }}</p>
            <p>blog id: {{ comment.blogId }}</p>
            <p>comment: {{ comment.comment }}</p>
            <p>
                <button v-on:click="navigateTo('/comment/'+ comment.id)">ดู
                comment</button>
                <button v-on:click="editComment('/comment/'+ comment.id)">แก้ไข comment</button>
                <button v-on:click="deleteComment(comment)">ลบข้อมูล</button>
            </p>
            <hr>
        </div>
    </div>
</template>
<script>
import CommentsService from '@/services/CommentsService'
import {mapState} from 'vuex'

export default {
    data () {
        return {
            comments: []
        }
    },
    async created () {
        this.comments = (await CommentsService.index()).data
    },
    methods: {
        logout () {
            this.$store.dispatch('setToken', null)
            this.$store.dispatch('setComment', null)
            this.$router.push({
                name: 'login'
            })
        },
        navigateTo (route) {
            this.$router.push(route)
        },
        async deleteComment (comment) {
            try {
                await CommentsService.delete(comment)
                this.refreshData()
            } catch (err) {
                console.log(err)
            }
        },
        async refreshData() {
            this.comments = (await CommentsService.index()).data
        },
        async editComment(){
            try{
                await CommentsService.put(comment)
            }catch(err){
                console.log(err)
            }
        }
    }
}
</script>
<style scoped>
</style>