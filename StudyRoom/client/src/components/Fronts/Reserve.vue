<template>
  <div>
    <main-header navsel="front"></main-header>
    <div class="header">
      <h3><i class="fas fa-edit"></i> ทำรายการจองห้อง</h3>
    </div>
  
      <div class="container">
        <div class="blog-wrapper1">
          <h4><i class="far fa-lightbulb"></i> วิธีการจองห้อง</h4>
          <hr/>
          <span class="font1">
            1.ผู้ใช้ เลือกเวลาที่ต้องการจองห้อง <br/>
            2.ผู้ใช้ เลือกเวลาที่ต้องการคืนห้อง โดยการจองแต่ละครั้งจะสามารถจองได้ไม่เกิน3ชั่วโมง<br/>
            หากใช้บริการเกินเวลาที่จองจะมีเจ้าหน้าที่เข้าไปแจ้งให้ออกจากห้อง<br/>
            3.ผู้ใช้เลือก ห้องศึกษาค้นคว้ากลุ่มที่ต้องการ <br/>
            4.ผู้ใช้เลือก จำนวนคนที่เข้าใช้บริการ<br/>
            5.จากนั้นกดยืนยัน<br/>
            6.ผู้ใช้รอการตรวจสอบสถานะการจองห้องศึกษาค้นคว้ากลุ่มจากเจ้าหน้าที่<br/>
            7.เมื่อเจ้าหน้าที่ทำการอนุมัติหรือไม่อนุมัติ
            จะแสดงสถานะการจองห้องที่เมนู "สถานะการจองห้องศึกษาค้นคว้ากลุ่ม"<br/>
            ***เมื่อมาถึงโปรดเตรียมบัตรประจำตัวประชาชนเพื่อใช้ระบุตัวตนกับเจ้าหน้าที่</span>
        </div>
        <div class="footer"></div>
      </div>
   
    <div class="container-fluid">
      <div class="container">
        <div class="blog-wrapper2">
          <h4><i class="far fa-clipboard"></i> รายละเอียดการจองห้อง</h4>
          <br />
          <span class="font2">
            <form v-on:submit.prevent="createReserve">
              <div class="row">
                <div class="col">
                  <label for="input1">ชื่อผู้จอง</label>
                  <div class="input-group mb-3">
                    <div class="input-group-prepend">
                      <span class="input-group-text" id="basic-addon1"
                        ><i class="far fa-user"></i
                      ></span>
                    </div>
                    <input
                      required
                      type="text"
                      class="form-control"
                      placeholder="Name"
                      name="nameLend"
                      id="nameLend"
                      v-model="reserve.nameLend = this.user.name"
                      disabled
                    />
                  </div>
                </div>
                <div class="col">
                  <label for="input1">วันที่ทำรายการ</label>
                  <div class="input-group mb-3">
                    <div class="input-group-prepend">
                      <span class="input-group-text" id="basic-addon1"
                        ><i class="far fa-calendar-alt"></i
                      ></span>
                    </div>
                    <input
                      required
                      type="date"
                      class="form-control"
                      placeholder="Date"
                      v-model="data.date"
                      disabled
                    />
                  </div>
                </div>
              </div>
              <div class="row">
                <div class="col">
                  <label for="input1">เวลาที่จองห้อง</label>
                  <div class="input-group mb-3">
                    <div class="input-group-prepend">
                      <span class="input-group-text" id="basic-addon1">
                      </span>
                    </div>
                    <input
                      required
                      type="time"
                      class="form-control"
                      placeholder="Time"
                      v-model="reserve.dateLend"
                    />
                  </div>
                </div>
                <div class="col">
                  <label for="input1">เวลาคืนห้อง</label>
                  <div class="input-group mb-3">
                    <div class="input-group-prepend">
                      <span class="input-group-text" id="basic-addon1">
                      </span>
                    </div>
                    <input
                      required
                      type="time"
                      class="form-control"
                      placeholder="Time"
                      v-model="reserve.dateReturn"  
                    />
                  </div>
                </div>
              </div>
              <div class="row">
                <div class="col">
                  <label for="input1">ห้องศึกษาค้นคว้ากลุ่ม</label>
                  <div class="input-group mb-3">
                    <div class="input-group-prepend">
                      <span class="input-group-text" id="basic-addon1"
                        ><i class="fab fa-houzz"></i
                      ></span>
                    </div>
                    <select  v-model="reserve.equipment" required>
                       <option disabled value="">เลือกห้องศึกษาค้นคว้ากลุ่ม</option>
                       <option v-for="blog in blogs" v-bind:key="blog.id">
                        {{ blog.title }}
                       </option> 
                  </select>
                    
                  </div>
                </div>
                <div class="col">
                  <label for="input1">จำนวนคนที่ใช้บริการ</label>
                  <div class="input-group mb-3">
                    <div class="input-group-prepend">
                      <span class="input-group-text" id="basic-addon1"
                        ><i class="fas fa-sort-numeric-up"></i
                      ></span>
                    </div>
                     <select v-model="reserve.number" required>
                      <option disabled value="">เลือกจำนวนคน</option>
                      <option v-for="blog in blogs" v-bind:key="blog.id">
                        {{ blog.quantity }}
                      </option>
                    </select>
                  </div>
                </div>
              </div>
              <div
                class="shadow-sm p-3 mb-5 bg-light rounded"
                style="padding: 0.5rem !important"
              >
                <div class="blog-tab"><h5>รายละเอียดการจองห้อง</h5></div>
                <p class="font3" style="margin-top: 10px">
               ห้องศึกษาค้นคว้ากลุ่ม:   {{ reserve.equipment }} 
               จำนวนคนที่ใช้บริการ:   {{ reserve.number }} 
              เวลาที่จองห้อง: {{ reserve.dateLend }} 
              เวลาคืนห้อง:   {{ reserve.dateReturn }} 
                  
                </p>
              </div>
              <div class="row">
                <div class="col">
                  <button
                    type="submit"
                    class="btn btn-success"
                    style="width: 100%"
                  >
                    <i class="fas fa-clipboard-check"></i> ยืนยัน
                  </button>
                </div>
                <div class="col">
                  <button
                    class="btn btn-danger"
                    type="button"
                    style="width: 100%"
                    v-on:click="navigateTo('/front')"
                  >
                    <i class="fas fa-times-circle"></i> ยกเลิก
                  </button>
                </div>
              </div>
            </form>
          </span>
        </div>
         </div>
        <div class="footer">
    <div class="container">
  <h3 class="textr">Contact</h3> <br>
 
    <div class="col-md-8">
      <div class="row">
      </div>
      <textarea class="form-control" id="comments" name="comments" placeholder="Comment" rows="5"></textarea>
      <div class="row">
        <div class="col-md-12 form-group">
          <br>
           <button
                    type="submit"
                    class="btn btn-success"
                    style="width: 10%">
                    <i class=""></i> ส่ง
                  </button>
        </div>
    
    </div>
  </div>
</div>
  </div>
  </div>
  </div>
</template>
<script>
import { mapState } from "vuex";
import ReservesService from "@/services/ReservesService";
import BlogsService from "@/services/BlogsService";
import UsersService from "@/services/UsersService";
export default {
  data() {
    return {
      users: [],
      blogs: [],
      reserve:{
        nameLend: "",
        dateLend: "",
        dateReturn: "",
        equipment: "",
        number: "",
        status: "รอตรวจสอบ",
      },
      data: { date: new Date().toISOString().substr(0, 10) },
    };
  },
  computed: {
    ...mapState(["isUserLoggedIn", "user"]),
    name: function() {
      return this.user.name;
    },
  },
  methods: {
    async createReserve() {
      try {
        alert("คุณทำรายการจองห้องสำเร็จเรียบร้อยแล้ว");
        await ReservesService.post(this.reserve);
        this.$router.push({
          name: "reserve-status",
        });
      } catch (err) {
        console.log(err);
      }
    },
    navigateTo(route) {
      this.$router.push(route);
    },
  },
  async created() {
    this.users = (await UsersService.index()).data;
    this.blogs = (await BlogsService.index()).data;
  },
};
</script>>

<style scoped>
.header {
  margin-left: auto;
  margin-right: auto;
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
.blog-wrapper1 {
  margin-top: 20px;
  padding: 40px;
  height: 100%;
  box-shadow: 0 0 10px rgba(0, 0, 0, 0.1);
   background: rgb(255, 251, 0);
}
.blog-wrapper2 {
  margin-top: 20px;
  padding: 40px;
  height: 100%;
  box-shadow: 0 0 10px rgba(0, 0, 0, 0.1);
   background: rgb(0, 0, 0);
   color: #fff;
}
.blog-tab {
  padding: 1px;
  background-color: #000000;
  text-align: left;
  text-indent: 0.5em;
}
  .font3 {
  color: #000;
}
.footer {
  margin-top: 50px;
 background-color: #000000;
 color: #fff;
}
</style>