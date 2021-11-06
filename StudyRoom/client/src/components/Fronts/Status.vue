<template>
 <div>
    <main-header navsel="front"></main-header>
   <div class="header">
		<h3><i class="far fa-check-square"></i>สถานะการจองห้องศึกษาค้นคว้ากลุ่ม</h3>
	 </div>
   <br>
   <div class="container-fluid">
     <div class="categories">
      <div class="blog-wrapper table-responsive">
        <span class="font2">
              <table class="table table-bordered" style="width: 65%">
              <thead class="table-bordered table-dark">
              <tr style="text-align: center">
    <div v-for="reserve in reserves" v-bind:key="reserve.id">
		  <th scope="col">รหัสการจอง: {{ reserve.id }}</th>
		  <th scope="col">ชื่อผู้จอง: {{ reserve.name }}</th>
			<th scope="col">ห้องศึกษาค้นคว้ากลุ่ม: {{ reserve.Room }}</th>
			<th scope="col">เวลาที่จองห้อง: {{ reserve.timeReserve }}</th>
      <th scope="col">เวลาคืนห้อง: {{ reserve.timeReturn }}</th>
		  <th scope="col">สถานะ: {{ reserve.status }}</th>
     
      
      </div> 
      </tr>
      </thead>
     </table>
        </span>
		</div> 
    </div> 
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