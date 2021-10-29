<template>
 <div>
    <main-header navsel="back"></main-header>
   <div class="header">
		 <h3><i class="far fa-check-square"></i>สถานะการจองห้องศึกษาค้นคว้ากลุ่มทั้งหมด</h3>
	 </div>
   <div class="container-fluid">
     <div class="categories">
      <div class="blog-wrapper table-responsive">
        <span class="font2">
              <table class="table table-bordered" style="width: 60%">
              <thead class="table-bordered table-dark">
              <tr style="text-align: center">
    <div v-for="reserve in reserves" v-bind:key="reserve.id">
		  <th scope="col">รหัสการจอง: {{ reserve.id }}</th>
		  <th scope="col">ชื่อผู้จอง: {{ reserve.nameLend }}</th>
			<th scope="col">ห้องศึกษาค้นคว้ากลุ่ม: {{ reserve.equipment }}</th>
			<th scope="col">เวลาที่จองห้อง: {{ reserve.dateLend }}</th>
			<th scope="col">เวลาคืนห้อง: {{ reserve.dateReturn }}</th>
		  <th scope="col">สถานะ: 
         <select v-model="reserve.status" required>
                    <option disabled value="">เลือกสถานะ</option>
                    <option value="อนุมัติ">อนุมัติ</option>
                    <option value="ไม่อนุมัติ">ไม่อนุมัติ</option>
                  </select>
      </th>
      </div> 
      </tr>
      </thead>
     </table>
      <p><button
                    type="submit"
                    class="btn btn-success"
                    style="width: 10%"
                   v-on:click="navigateTo('/blogs')">บันทึกข้อมูล</button></p>
        </span>
		</div> 
    </div> 
    </div> 
</div>


</template>
<script>
import { mapState } from "vuex";
import ReservesService from "@/services/ReservesService";
import moment from "moment";
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
    navigateTo(route) {
      this.$router.push(route);
    },
   
    async refreshData() {
      this.reserves = (await ReservesService.index()).data;
    },
  },
  computed: {
    ...mapState(["isUserLoggedIn", "user"]),
  },
};
</script>>

<style scoped>
.header {
  margin-top: 0px;
  padding: 10px;
  position: relative;
  background-color: #ececec;
  border-bottom: 1px solid rgba(255, 255, 255, 0.5);
  box-shadow: 0 -2px 1px rgba(0, 0, 0, 0.1) inset;
  text-shadow: 1px 1px 1px #fff;
}
.categories {
  margin-top: 10px;
  padding: 0;
  width: 100%;
}
.blog-wrapper {
  height: 100%;
  box-shadow: 0 0 20px rgba(0, 0, 0, 0.1);
}
.table .thead-dark th {
  color: #fff;
  background-color: palevioletred;
  border-color: palevioletred;
}
</style>