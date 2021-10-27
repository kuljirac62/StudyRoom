<template>
  <div>
    <main-header navsel="front"></main-header>
    <div class="header">
      <h3><i class="fas fa-info-circle"></i> รายละเอียดห้องศึกษาค้นคว้ากลุ่ม</h3>
    </div>
    <div class="container-fluid">
      <div class="container">
        <div class="blog-wrapper">
          <h4><i class="fas fa-info-circle"></i> รายละเอียดห้อง {{ blog.title }}</h4>
          <hr />
          <br />
          <span class="font2">
            <center>
              <div class="blog-pic">
                <div class="thumbnail-pic" v-if="blog.thumbnail != 'null'">
                  <img
                    :src="BASE_URL + blog.thumbnail"
                    alt="thumbnail"
                    style="width: 30%"
                  />
                </div>
              </div>
              <br />
              <div class="table-responsive">
                <table class="table table-bordered table-sm" style="width: 50%">
                  <tbody>
                    <tr>
                      <th
                        class="table-primary"
                        style="width: 5%; background: #d3d3d3"
                      >
                        <i class="fas fa-key"></i>
                      </th>
                      <th
                        class="table-primary"
                        style="background: #d3d3d3"
                        width="30%"
                      >
                        รหัสห้อง:
                      </th>
                      <td style="text-indent: 0.5em">{{ blog.id }}</td>
                    </tr>
                    <tr>
                      <th
                        class="table-primary"
                        style="width: 5%; background: #d3d3d3"
                      >
                        <i class="fab fa-houzz"></i>
                      </th>
                      <th class="table-primary" style="background: #d3d3d3">
                        ชื่อห้อง:
                      </th>
                      <td style="text-indent: 0.5em">{{ blog.title }}</td>
                    </tr>
                    <tr>
                      <th
                        class="table-primary"
                        style="width: 5%; background: #d3d3d3"
                      >
                        <i class="fas fa-sort-amount-down"></i>
                      </th>
                      <th class="table-primary" style="background: #d3d3d3">
                        จำนวนคนที่จุได้:
                      </th>
                      <td style="text-indent: 0.5em">{{ blog.quantity }}</td>
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
                          v-if="blog.status == 'ว่าง'"
                          class="badge badge-success text-wrap"
                          style="width: 5rem"
                        >
                          <span style="font-size: 14px; color: #000000"
                            ><i class="fas fa-check-circle"></i><br />{{
                              blog.status
                            }}</span
                          >
                        </div>
                        <div
                          v-if="blog.status == 'ไม่ว่าง'"
                          class="badge badge-danger text-wrap"
                          style="width: 5rem"
                        >
                          <span style="font-size: 14px; color: #000000"
                            ><i class="fas fa-minus-circle"></i><br />{{
                              blog.status
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
                        <i class="fas fa-file-alt"></i>
                      </th>
                      <th class="table-primary" style="background: #d3d3d3">
                        ข้อมูล:
                      </th>
                      <td style="text-indent: 0.5em">{{ blog.content }}</td>
                    </tr>
                  </tbody>
                </table>
              </div>
              <br />
              <button
                class="btn btn-warning"
                type="button"
                style="width: 20%"
                v-on:click="navigateTo('/treasury')"
              >
                <i class="fas fa-angle-double-left"></i> ย้อนกลับ
              </button>
            </center>
          </span>
        </div>
        <div class="footer"></div>
      </div>
    </div>
  </div>
</template>
<script>
import { mapState } from "vuex";
import BlogsService from "@/services/BlogsService";
import UsersService from "@/services/UsersService";
import CommentComp from "@/components/Fronts/Comment";
import moment from "moment";

export default {
  data() {
    return {
      blog: null,
      users: null,
      BASE_URL: "http://localhost:8081/assets/uploads/",
    };
  },
  components: {
    CommentComp,
  },
  async created() {
    // get blog
    // check permission first
    try {
      let blogId = this.$route.params.blogId;
      this.blog = (await BlogsService.show(blogId)).data;
    } catch (error) {
      console.log(error);
    }
  },
  methods: {
    navigateTo(route) {
      this.$router.push(route);
    },
  },
  computed: {
    ...mapState(["isUserLoggedIn", "user"]),
  },
  filters: {
    formatedDate(value) {
      return moment(String(value)).format("DD-MM-YYYY");
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