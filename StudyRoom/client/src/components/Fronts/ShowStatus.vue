<template>
  <div>
    <main-header navsel="front"></main-header>
    <div class="header">
      <h3><i class="fas fa-tasks"></i> รายละเอียดการยืม & คืน</h3>
    </div>
    <div class="container-fluid">
      <div class="container">
        <div class="blog-wrapper">
          <h4>
            <i class="far fa-clipboard"></i> รายละเอียดการยืมของ
            {{ reserve.nameLend }}
          </h4>
          <hr />
          <br />
          <span class="font2">
            <center>
              <div class="table-responsive">
                <table class="table table-bordered table-sm" style="width: 50%">
                  <tbody>
                    <tr>
                      <th
                        class="table-primary"
                        style="width: 5%; background: #d3d3d3"
                      >
                        <i class="fas fa-clipboard-list"></i>
                      </th>
                      <th
                        class="table-primary"
                        style="background: #d3d3d3"
                        width="30%"
                      >
                        รหัสการยืม:
                      </th>
                      <td style="text-indent: 0.5em">{{ reserve.id }}</td>
                    </tr>
                    <tr>
                      <th
                        class="table-primary"
                        style="width: 5%; background: #d3d3d3"
                      >
                        <i class="far fa-user-circle"></i>
                      </th>
                      <th class="table-primary" style="background: #d3d3d3">
                        ผู้ยืม:
                      </th>
                      <td style="text-indent: 0.5em">{{ reserve.nameLend }}</td>
                    </tr>
                    <tr>
                      <th
                        class="table-primary"
                        style="width: 5%; background: #d3d3d3"
                      >
                        <i class="fas fa-boxes"></i>
                      </th>
                      <th class="table-primary" style="background: #d3d3d3">
                        อุปกรณ์:
                      </th>
                      <td style="text-indent: 0.5em">{{ reserve.equipment }}</td>
                    </tr>
                    <tr>
                      <th
                        class="table-primary"
                        style="width: 5%; background: #d3d3d3"
                      >
                        <i class="fas fa-sort-numeric-up"></i>
                      </th>
                      <th class="table-primary" style="background: #d3d3d3">
                        จำนวน:
                      </th>
                      <td style="text-indent: 0.5em">{{ reserve.number }}</td>
                    </tr>
                    <tr>
                      <th
                        class="table-primary"
                        style="width: 5%; background: #d3d3d3"
                      >
                        <i class="far fa-calendar-alt"></i>
                      </th>
                      <th class="table-primary" style="background: #d3d3d3">
                        วันที่ยืม:
                      </th>
                      <td style="text-indent: 0.5em">{{ reserve.dateLend | formatedDate }}</td>
                    </tr>
                    <tr>
                      <th
                        class="table-primary"
                        style="width: 5%; background: #d3d3d3"
                      >
                        <i class="far fa-calendar-check"></i>
                      </th>
                      <th class="table-primary" style="background: #d3d3d3">
                        กำหนดคืน:
                      </th>
                      <td style="text-indent: 0.5em">
                        {{ reserve.dateReturn | formatedDate }}
                      </td>
                    </tr>
                    <tr>
                      <th
                        class="table-primary"
                        style="width: 5%; background: #d3d3d3"
                      >
                        <i class="fas fa-server"></i>
                      </th>
                      <th class="table-primary" style="background: #d3d3d3">
                        สถานะ:
                      </th>
                      <td>
                        <div
                          v-if="reserve.status == 'รอตรวจสอบ'"
                          class="badge badge-primary text-wrap"
                          style="width: 5rem"
                        >
                          <span style="font-size: 13.4px; color: #000000"
                            ><i class="fa fa-spinner"></i><br />{{
                              reserve.status
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
                    </tr>
                    <tr>
                      <th
                        class="table-primary"
                        style="width: 5%; background: #d3d3d3"
                      >
                        <i class="far fa-calendar-check"></i>
                      </th>
                      <th class="table-primary" style="background: #d3d3d3">
                        วันที่ทำรายการ:
                      </th>
                      <td style="text-indent: 0.5em"> {{ reserve.createdAt | formatedDate }}</td>
                    </tr>
                  </tbody>
                </table>
              </div>
              <button
                class="btn btn-warning"
                type="button"
                style="width: 100%"
                v-if="user.type == 'user'"
                v-on:click="navigateTo('/reserve/status')"
              >
                <i class="fas fa-angle-double-left"></i> ย้อนกลับ
              </button>
            </center>
            <br /><br />
            <div v-if="user.type == 'admin'">
              <h4><i class="fas fa-clipboard-list"></i> สำหรับเจ้าหน้าที่</h4>
              <hr />
              <br />
              <center>
                <div style="width: 50%">
                  <form v-on:submit.prevent="editReserve">
                    <div class="col" align="left">
                      <label for="input1">ชื่อเจ้าหน้าที่</label>
                      <div class="input-group mb-3">
                        <div class="input-group-prepend">
                          <span class="input-group-text" id="basic-addon1"
                            ><i class="fas fa-user-cog"></i
                          ></span>
                        </div>
                        <input
                          required
                          type="tet"
                          class="form-control"
                          placeholder="Name"
                          v-model="user.name"
                          disabled
                        />
                      </div>
                    </div>
                    <div class="col" align="left">
                      <label for="input1">เลือกการกระทำ</label>
                      <div class="input-group mb-3">
                        <div class="input-group-prepend">
                          <span class="input-group-text" id="basic-addon1"
                            ><i class="fas fa-list-ul"></i
                          ></span>
                        </div>
                        <select v-model="reserve.status" required>
                          <option disabled value="">เลือกการกระทำ</option>
                          <option value="รอตรวจสอบ">รอตรวจสอบ</option>
                          <option value="อนุมัติ">อนุมัติ</option>
                          <option value="ไม่อนุมัติ">ไม่อนุมัติ</option>
                          <option value="คืนแล้ว">คืนแล้ว</option>
                        </select>
                      </div>
                    </div>
                    <br />
                    <div class="row">
                      <div class="col">
                        <button
                          type="submit"
                          class="btn btn-success"
                          style="width: 100%"
                        >
                          <i class="far fa-save"></i> บันทึกข้อมูล
                        </button>
                      </div>
                      <div class="col">
                        <button
                          class="btn btn-warning"
                          type="button"
                          style="width: 100%"
                          v-on:click="navigateTo('/reserve/status')"
                        >
                          <i class="fas fa-angle-double-left"></i> ย้อนกลับ
                        </button>
                      </div>
                    </div>
                  </form>
                </div>
              </center>
            </div>
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
import moment from "moment";

export default {
  data() {
    return {
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
  filters: {
    formatedDate(value) {
      return moment(String(value)).format("DD-MM-YYYY");
    },
  },
  computed: {
    ...mapState(["isUserLoggedIn", "user"]),
  },
  methods: {
    navigateTo(route) {
      this.$router.push(route);
    },
    async editReserv() {
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