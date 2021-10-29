<template>
  <div>
    <nav class="navbar navbar-expand-lg navbar-light bg-light">
      <router-link class="navbar-brand" active-class="active" to="/blogs">
        <img
          src="../assets/logo.png"
          width="120"
          height="120"
          class="d-inline-block align-top"
          alt=""
          loading="lazy"
        />
        <span class="font1">&nbsp;ระบบจองห้องศึกษาค้นคว้ากลุ่มออนไลน์ </span>
        <div class="badge text-wrap" style="width: 7rem; background: #ff3333">
          <span class="font3" style="font-size: 13px; color: #ffffff"
            ><i class="fas fa-user-cog"></i> ระบบหลังบ้าน</span
          >
        </div>
      </router-link>
      <button
        class="navbar-toggler"
        type="button"
        data-toggle="collapse"
        data-target="#navbarSupportedContent"
        aria-controls="navbarSupportedContent"
        aria-expanded="false"
        aria-label="Toggle navigation"
      >
        <span class="navbar-toggler-icon"></span>
      </button>

      <div class="collapse navbar-collapse" id="navbarSupportedContent">
        <ul class="navbar-nav mr-auto">
          <li class="nav-item active" v-if="isUserLoggedIn">
            <router-link class="nav-link" active-class="active" to="/blogs"
              ><span class="font2" style="color: #fff"
                ><i class="fab fa-houzz"></i> ห้องศึกษาค้นคว้ากลุ่ม</span
              ></router-link
            >
          </li>
          <li class="nav-item active" v-if="isUserLoggedIn">
            <router-link class="nav-link" active-class="active" to="/Users"
              ><span class="font2" style="color: #fff"
                ><i class="fas fa-user-friends"></i> ผู้ใช้</span
              ></router-link
            >
          </li>
          <li class="nav-item active" v-if="isUserLoggedIn">
            <router-link
              class="nav-link"
              active-class="active"
              to="/back/status"
              ><span class="font2" style="color: #fff"
                ><i class="far fa-check-square"></i> สถานะการจองห้องศึกษาค้นคว้ากลุ่ม</span
              ></router-link
            >
          </li>

          <li
            class="nav-item active"
            v-if="!isUserLoggedIn"
            role="presentation"
          >
            <router-link class="nav-link" active-class="active" to="/login"
              ><span class="font2" style="color: #fff"
                ><i class="fas fa-user"></i> เข้าสู่ระบบ</span
              ></router-link
            >
          </li>

          <li class="nav-item active" v-if="isUserLoggedIn" role="presentation">
            <a class="nav-link" href="#" v-on:click.prevent="logout"
              ><span class="font2" style="color: #fff"><i class="fas fa-sign-in-alt"></i> ออกจากระบบ</span></a
            >
          </li>
        </ul>
        <li v-if="isUserLoggedIn" class="nav-item dropdown form-inline">
          <div class="dropdown">
            <span
              class="dropdown font2"
              type="button"
              id="dropdownMenuButton"
              data-toggle="dropdown"
              aria-haspopup="true"
              aria-expanded="false"
            >
             
            </span>
          
            <span class="font3" v-if="user.type == 'user'"
              >&nbsp;&nbsp;<i class="fas fa-user"></i> เจ้าหน้าที่</span
            >
            <div
              class="dropdown-menu dropdown-menu-right font2"
              aria-labelledby="dropdownMenuButton"
            >
              <a
                v-if="user.type == 'admin'"
                class="dropdown-item"
                href=""
                v-on:click="navigateTo('/front')"
                ><i class="fas fa-home"></i> ระบบหน้าบ้าน</a
              >
              <a
                class="dropdown-item"
                href=""
                v-on:click="navigateTo('/reserve/profile/' + user.id)"
                ><i class="far fa-edit"></i> แก้ไขโปรไฟล์</a
              >
              <div class="dropdown-divider"></div>
              <a class="dropdown-item" href="#" v-on:click.prevent="logout"
                ><i class="fas fa-sign-in-alt"></i> ออกจากระบบ</a
              >
            </div>
          </div>
        </li>
      </div>
    </nav>
     <div class="footer"></div>
  </div>
</template>

<script>
import { mapState } from "vuex";
import AuthenService from "@/services/AuthenService";
import ClientService from "@/services/ClientService";

export default {
  data() {
    return {};
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
  },
};
</script>

<style scoped>
.bg-light {
  background-color: #000000  !important;
  color: #fff !important;
}
.font1 {
  color: #fff 
  }
</style>