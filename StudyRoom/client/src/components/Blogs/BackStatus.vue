<template>
  <div>
    <main-header navsel="back"></main-header>
    <div class="header">
      <h3><i class="fas fa-tasks"></i> สถานะการจองห้องศึกษาค้นคว้ากลุ่ม</h3>
    </div>
    <div class="container-fluid">
      <div class="categories">
        <div class="blog-wrapper table-responsive">
          <span class="font2">
            <table class="table table-bordered" style="width: 100%">
              <thead class="table-bordered table-dark">
                <tr style="text-align: center">
                  <th scope="col">รหัสการจอง</th>
                   <th scope="col">รูปภาพ</th>
                  <th scope="col">ห้องศึกษาค้นคว้ากลุ่ม</th>
                  <th scope="col">วันที่จอง</th>
                  <th scope="col">กำหนดคืนห้อง</th>
                  <th scope="col">จำนวนคนที่จุได้</th>
                  <th scope="col">สถานะ</th>
                  <th scope="col">รายละเอียด</th>
                </tr>
              </thead>
              <tbody>
                <tr
                  v-for="reserve in reserves"
                  v-bind:key="reserve.id"
                  class="blog-list"
                  style="text-align: center"
                >
                  <th
                    v-if="user.name == reserve.nameLend || user.type == 'admin'"
                    scope="row"
                    width="7%"
                  >
                    {{ reserve.id }}
                  </th>
                  <td
                    v-if="user.name == reserve.nameLend || user.type == 'admin'"
                  >
                    {{ reserve.equipment }}
                  </td>
                  <td
                    v-if="user.name == reserve.nameLend || user.type == 'admin'"
                    width="5%"
                  >
                    {{ reserve.number }}
                  </td>
                  <td
                    v-if="user.name == reserve.nameLend || user.type == 'admin'"
                    width="10%"
                  >
                    {{ reserve.dateLend | formatedDate }}
                  </td>
                  <td
                    v-if="user.name == reserve.nameLend || user.type == 'admin'"
                    width="10%"
                  >
                    {{ reserve.dateReturn | formatedDate }}
                  </td>
                  <td
                    v-if="user.name == reserve.nameLend || user.type == 'admin'"
                    width="10%"
                  >
                    <div
                      v-if="reserve.status == 'รอตรวจสอบ'"
                      class="badge badge-primary text-wrap"
                      style="width: 5rem"
                    >
                      <span style="font-size: 13.4px; color: #000000"
                        ><i class="fa fa-spinner"></i><br />{{
                          reservestatus
                        }}</span
                      >
                    </div>
                    <div
                      v-if="reserve.status == 'อนุมัติ'"
                      class="badge badge-success text-wrap"
                      style="width: 5rem"
                    >
                      <span style="font-size: 14px; color: #000000"
                        ><i class="far fa-check-circle"></i><br />{{
                          reserve.status
                        }}</span
                      >
                    </div>
                    <div
                      v-if="reserve.status == 'ไม่อนุมัติ'"
                      class="badge badge-danger text-wrap"
                      style="width: 5rem"
                    >
                      <span style="font-size: 14px; color: #000000"
                        ><i class="far fa-times-circle"></i><br />{{
                          reserve.status
                        }}</span
                      >
                    </div>
                    <div
                      v-if="reserve.status == 'คืนแล้ว'"
                      class="badge badge-warning text-wrap"
                      style="width: 5rem"
                    >
                      <span style="font-size: 14px; color: #000000"
                        ><i class="fas fa-clipboard-check"></i><br />{{
                          reserve.status
                        }}</span
                      >
                    </div>
                  </td>
                  <td
                    v-if="user.name == reserve.nameLend || user.type == 'admin'"
                    width="10%"
                  >
                    {{ reserve.createdAt | formatedDate }}
                  </td>
                  <td
                    v-if="user.name == reserve.nameLend || user.type == 'admin'"
                    width="20%"
                  >
                    <div
                      class="btn-group btn-group-toggle"
                      data-toggle="buttons"
                    >
                      <label
                        class="btn"
                        style="background-color: #ff8800; border-color: #ff8800"
                      >
                        <input
                          type="radio"
                          name="options"
                          id="option1"
                          v-on:click="
                            navigateTo('/reserve/status/detail/' + reserve.id)
                          "
                        />
                        <span style="color: #ffffff"
                          ><i class="fas fa-info-circle"></i> รายละเอียด</span
                        >
                      </label>
                      <label class="btn btn-success">
                        <input
                          type="radio"
                          name="options"
                          id="option2"
                          v-on:click="navigateTo('/reserve/edit/' + reserve.id)"
                        /><i class="far fa-edit"></i>
                        แก้ไข
                      </label>
                      <label class="btn btn-danger">
                        <input
                          type="radio"
                          name="options"
                          id="option3"
                          v-on:click="deleteReserve(reserve)"
                        /><i class="fas fa-trash-alt"></i>
                        ลบ
                      </label>
                    </div>
                  </td>
                </tr>
              </tbody>
            </table>
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
  filters: {
    formatedDate(value) {
      return moment(String(value)).format("DD-MM-YYYY");
    },
  },
  methods: {
    navigateTo(route) {
      this.$router.push(route);
    },
    async deleteReserve(reserve) {
      try {
        let result = confirm("คุณต้องการยกเลิกการจองห้องหรือไม่?");
        if (result) {
          await ReservesService.delete(reserve);
          this.refreshData();
        }
      } catch (err) {
        console.log(err);
      }
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