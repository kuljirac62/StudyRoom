<template>
  <div>
    <main-header navsel="back"></main-header>
    <div class="header">
      <h3><i class="fas fa-user-circle"></i> ข้อมูลผู้ใช้งาน</h3>
    </div>
    <div class="container-fluid">
      <div class="blog-wrapper">
        <div>
          <h4><i class="fas fa-address-card"></i> รายละเอียดข้อมูลผู้ใช้งาน</h4>
          <span class="font2">จำนวนผู้ใช้งาน {{ users.length }}</span
          ><br />
        </div>
        <br />
        <span class="font2">
          <div v-for="user in users" v-bind:key="user.id">
            <div class="jumbotron" style="padding: 20px">
              <p><span class="font2">id:</span> {{ user.id }}</p>
              <p>
                <span class="font2">ชื่อ-นามสกุล :</span> {{ user.name }}
                {{ user.lastname }}
              </p>
              <p><span class="font2">อีเมล:</span> {{ user.email }}</p>
              <p><span class="font2">สถานะ:</span> {{ user.type }}</p>
              <p>
                <span class="font2">สมัครเมื่อวันที่:</span>
                {{ user.createdAt | formatedDate }}
              </p>
              <button
                class="btn btn-sm btn-primary"
                v-on:click="navigateTo('/user/' + user.id)"
              >
                <i class="far fa-eye"></i> ดูข้อมูลผู้ใช้
              </button>
              <button
                class="btn btn-sm btn-warning"
                v-on:click="navigateTo('/user/edit/' + user.id)"
              >
                <i class="far fa-edit"></i> แก้ไขข้อมูลผู้ใช้
              </button>
              <button
                class="btn btn-sm btn-danger"
                v-on:click="deleteUser(user)"
              >
                <i class="fas fa-trash-alt"></i> ลบผู้ใช้
              </button>
            </div>
            <hr />
          </div>
        </span>
      </div>
      <div class="footer"></div>
    </div>
  </div>
</template>
<script>
import UsersService from "@/services/UsersService";
import moment from "moment";
import { mapState } from "vuex";

export default {
  data() {
    return {
      users: [],
    };
  },
  filters: {
    formatedDate(value) {
      return moment(String(value)).format("DD-MM-YYYY");
    },
  },
  async created() {
    this.users = (await UsersService.index()).data;
  },
  computed: {
    ...mapState(["isUserLoggedIn", "user"]),
  },
  methods: {
    navigateTo(route) {
      this.$router.push(route);
    },
    logout() {
      this.$store.dispatch("setToken", null);
      this.$store.dispatch("setUser", null);
      this.$router.push({
        name: "login",
      });
    },
    async deleteUser(user) {
      try {
        let result = confirm("คุณต้องการลบผู้ใช้รายนี้หรือไม่?");
        if (result) {
          await UsersService.delete(user);
          this.refreshData();
        }
      } catch (err) {
        console.log(err);
      }
    },
    async refreshData() {
      this.users = (await UsersService.index()).data;
    },
  },
};
</script>
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