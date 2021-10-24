<template>
  <div>
    <main-header navsel="front"></main-header>
    <div class="header">
      <h3><i class="fas fa-edit"></i> แก้ไขรายละเอียดการจอง</h3>
    </div>
    <div class="container-fluid">
      <div class="container">
        <div class="blog-wrapper">
          <h4><i class="far fa-clipboard"></i> รายละเอียดการจองของคุณ</h4>
          <hr />
          <br />
          <span class="font2">
            <form v-on:submit.prevent="editReserve">
              <div class="row">
                <div class="col">
                  <label for="input1">ผู้จอง</label>
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
                      v-model="reserve.nameLend"
                      disabled
                    />
                  </div>
                </div>
                <div class="col">
                  <label for="input1">วันที่ทำรายการ</label>
                  <div class="input-group mb-3">
                    <div class="input-group-prepend">
                      <span class="input-group-text" id="basic-addon1"
                        ><i class="far fa-calendar-alt"></i></span>
                    </div>
                    <input
                      required
                      type="date"
                      class="form-control"
                      placeholder="Date"
                      v-model="reserve.date"
                      disabled
                    />
                  </div>
                </div>
              </div>
              <div class="row">
                <div class="col">
                  <label for="input1">วันที่จอง</label>
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
                      v-model="reserve.dateLend"
                    />
                  </div>
                </div>
                <div class="col">
                  <label for="input1">กำหนดคืน</label>
                  <div class="input-group mb-3">
                    <div class="input-group-prepend">
                      <span class="input-group-text" id="basic-addon1"
                        ><i class="far fa-calendar-check"></i
                      ></span>
                    </div>
                    <input
                      required
                      type="date"
                      class="form-control"
                      placeholder="Date"
                      v-model="reserve.dateReturn"
                    />
                  </div>
                </div>
              </div>
              <div class="row">
                <div class="col">
                  <label for="input1">อุปกรณ์: พัสดุ ครุภัณฑ์</label>
                  <div class="input-group mb-3">
                    <div class="input-group-prepend">
                      <span class="input-group-text" id="basic-addon1"
                        ><i class="fas fa-boxes"></i
                      ></span>
                    </div>
                    <select v-model="reserve.equipment" required>
                      <option disabled value="">{{ reserve.equipment }}</option>
                      <option v-for="blog in blogs" v-bind:key="blog.id">
                        {{ blog.title }}
                      </option>
                    </select>
                  </div>
                </div>
                <div class="col">
                  <label for="input1">จำนวน</label>
                  <div class="input-group mb-3">
                    <div class="input-group-prepend">
                      <span class="input-group-text" id="basic-addon1"
                        ><i class="fas fa-sort-numeric-up"></i
                      ></span>
                    </div>
                    <input
                      required
                      type="number"
                      class="form-control"
                      placeholder="Number"
                      v-model="reserve.number"
                    />
                  </div>
                </div>
              </div>
              <div
                class="shadow-sm p-3 mb-5 bg-light rounded"
                style="padding: 0.5rem !important"
              >
                <div class="blog-tab"><h5>สรุปการแก้ไข</h5></div>
                <p class="font3" style="margin-top: 10px">
                  <span class="font2">อุปกรณ์: </span>{{ reserve.equipment
                  }}<br />
                  <span class="font2">จำนวน: </span>{{ reserve.number }}<br />
                  <span class="font2">วันที่ยืม: </span>{{ reserve.dateLend
                  }}<br />
                  <span class="font2">กำหนดคืน: </span>{{ reserve.dateReturn }}
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
                    v-on:click="navigateTo('/reserve/status')"
                  >
                    <i class="fas fa-times-circle"></i> ยกเลิก
                  </button>
                </div>
              </div>
            </form>
          </span>
        </div>
        <div class="footer"></div>
      </div>
    </div>
  </div>
</template>
<script>
import { mapState } from "vuex";
import ReservesService from "@/services/ReservesService";
import BlogsService from "@/services/BlogsService";

export default {
  data() {
    return {
      blogs: [],
      reserve: {
        nameLend: "",
        date: "",
        dateLend: "",
        dateReturn: "",
        equipment: "",
        number: "",
        status: "",
      },
    };
  },
  computed: {
    ...mapState(["isUserLoggedIn", "user"]),
  },
  methods: {
    navigateTo(route) {
      this.$router.push(route);
    },
    async editReserve() {
      try {
        await ReservesService.put(this.reserve);
        this.$router.push({
          name: "reserve-status",
        });
      } catch (err) {
        console.log(err);
      }
    },
  },
  async created() {
    try {
      let reserveId = this.$route.params.reserveId;
      this.reserve = (await ReservesService.show(reserveId)).data;
      this.blogs = (await BlogsService.index()).data;
    } catch (error) {
      console.log(error);
    }
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
.blog-wrapper {
  margin-top: 20px;
  padding: 40px;
  height: 100%;
  box-shadow: 0 0 10px rgba(0, 0, 0, 0.1);
}
.blog-tab {
  padding: 1px;
  background-color: #d3d3d3;
  text-align: left;
  text-indent: 0.5em;
}
.footer {
  margin-top: 50px;
}
</style>