<template>
 <div>
    <main-header navsel="front"></main-header>
   <div class="header">
		 <h3><i class="far fa-check-square"></i>สถานะการจองห้องศึกษาค้นคว้ากลุ่ม</h3>
	 </div>
      <div class="blog-wrapper table-responsive">
              <table class="table table-bordered" style="width: 100%">
              <thead class="table-bordered table-dark">
              <tr style="text-align: center">
    <div v-for="reserve in reserves" v-bind:key="reserve.id">
		  <th scope="col">รหัสการจอง: {{ reserve.id }}</th>
		  <th scope="col">รูปภาพ: {{ reserve.nameLend }}</th>
			<th scope="col">ห้องศึกษาค้นคว้ากลุ่ม: {{ reserve.dateLend }}</th>
			<th scope="col">เวลาที่จอง: {{ reserve.dateReturn }}</th>
			<th scope="col">เวลาคืนห้อง: {{ reserve.equipment }}</th>
			<th scope="col">จำนวนคนที่จุได้: {{ reserve.number }}</th>
		  <th scope="col">สถานะ: {{ reserve.status }}</th>
      
      </div> 
      </tr>
      </thead>
     </table>
		</div> 
</div>


</template>
<script>
import ReservesService from "@/services/ReservesService";
export default {
  data() {
    return {
      reserves: [],
    };
  },
  async created() {
    this.reserves = (await ReservesService.index()).data;
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
      this.reserves = (await ReservesService.index()).data;
    },
  },
};
</script>
<style scoped>
</style>