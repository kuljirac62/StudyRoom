<template>
 <div>
    <main-header navsel="back"></main-header>
	
		<center><h2>ข้อมูลห้องศึกษาค้นคว้ากลุ่ม</h2>
		<h4>จํานวนห้องศึกษาค้นคว้ากลุ่มทั้งหมด {{ blogs.length }} ห้อง </h4>
		<p> <button
                class="btn btn-warning"
                type="button"
                style="width: 20%"
                v-on:click="navigateTo('/blog/create')">เพิ่มห้องศึกษาค้นคว้ากลุ่ม</button></p>
		</center>
		<div v-for="blog in blogs" v-bind:key="blog.id">
			<p>รหัสห้อง: {{ blog.id }}</p>
			<p>รูปภาพ: {{ blog.pictures }}</p>
			<p>ห้องศึกษาค้นคว้ากลุ่ม: {{ blog.title }}</p>
			<p>จำนวนคนที่จุได้: {{ blog.quantity }}</p>
			<p>สถานะ: {{ blog.status }}</p>
			<p>
				<button
                class="btn btn-success"
                type="button"
                style="width: 8%"
                v-on:click="navigateTo('/blog/' + blog.id)">ดูรายละเอียด</button>

				<button
                class="btn btn-warning"
                type="button"
                style="width: 8%"
                v-on:click="navigateTo('/blog/edit/' + blog.id)">
					แก้ไข 
				</button>
				<button
                class="btn btn-danger"
                type="button"
                style="width: 8%"
                v-on:click="deleteBlog(blog)">ลบข้อมูล</button>
			</p>
			<hr />
			
		</div>
		
</div>
</template>
<script>
import BlogsService from "@/services/BlogsService";
export default {
	data() {
		return {
			blogs: [],
		};
	},
	async created() {
		this.blogs = (await BlogsService.index()).data;
	},
	methods: {
		logout() {
			this.$store.dispatch("setToken", null);
			this.$store.dispatch("setBlog", null);
			this.$router.push({
				name: "login",
			});
		},
		navigateTo(route) {
			this.$router.push(route);
		},
		async deleteBlog(blog) {
			let result = confirm("Want to delete?");
			if (result) {
				try {
					await BlogsService.delete(blog);
					this.refreshData();
				} catch (err) {
					console.log(err);
				}
			}
		},
		async refreshData() {
			this.blogs = (await BlogsService.index()).data;
		},
	},
};
</script>
<style scoped>
</style>