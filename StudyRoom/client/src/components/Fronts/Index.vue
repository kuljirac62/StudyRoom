<template>
  <div>
    <main-header navsel="front"></main-header>
    
    <div class="hero-wrapper">
      <img
        src="@/assets/logo.png"
        class="logo"
        style="float: left; width: 20%"
      />
      <h1>ระบบจองห้องศึกษาค้นคว้ากลุ่มออนไลน์ </h1>
      <h4>ONLINE GROUP STUDY ROOM BOOKING SYSTEM</h4>
      <p>
        <i class="fas fa-user-circle"></i> KULJIRA CHAIYASAT &nbsp;&nbsp;<i
          class="fas fa-envelope"
        ></i>
        <a href="mailto:kuljirac62@nu.ac.th" style="color: #000000"
          >kuljirac62@nu.ac.th</a
        ><br />
        <i class="fas fa-user-circle"></i> SETALA SANGTABTIM &nbsp;&nbsp;<i
          class="fas fa-envelope"
        ></i>
        <a href="mailto:setalas62@nu.ac.th" style="color: #000000"
          >setalas62@nu.ac.th</a
        >
      </p>
    </div>
    <br />
    <div class="container-fluid">
      <div class="container">
        <div class="blog-wrapper">
          <h4><i class="far fa-lightbulb"></i> ข้อแนะนำการใช้งาน</h4>
          <hr />
          <center>
            <img
              src="../../assets/mandatory.png"
              width="20%"
              class="d-inline-block align-top"
              alt=""
              loading="lazy"
            />
          </center>
          <br /><br />
          <span class="font2"
            >1.
            ผู้ใช้ต้องทำการสมัครสมาชิกและเข้าสู่ระบบเพื่อใช้งานระบบจองห้องศึกษาค้นคว้ากลุ่มออนไลน์ <br />
            2.ผู้ใช้สามารถดูห้องศึกษาค้นคว้ากลุ่มได้ทั้งหมด<br />
            3. ผู้ใช้เลือก "ทำรายการจองห้อง" แล้วกรอกรายละเอียดในการจองห้องศึกษาค้นคว้ากลุ่ม<br />
            4. ในเมนู "สถานะการจองห้องศึกษาค้นคว้ากลุ่ม"
            จะแสดงรายละเอียดที่ผู้ใช้ทำรายการจองห้อง<br />
            5. ผู้ใช้รอการตรวจสอบสถานะการจองห้องศึกษาค้นคว้ากลุ่มจากเจ้าหน้าที่<br />
            6. เมื่อเจ้าหน้าที่ทำการอนุมัติหรือไม่อนุมัติ
            จะแสดงสถานะการจองห้องที่เมนู "สถานะการจองห้องศึกษาค้นคว้ากลุ่ม"</span
          >
        </div>
        <div class="footer"></div>
      </div>
    </div>
  </div>
</template>
<script>
import BlogsService from "@/services/BlogsService";
import _ from "lodash";
import ScrollMonitor from "scrollMonitor";
let LOAD_NUM = 3;
let pageWatcher;
export default {
  watch: {
    search: _.debounce(async function (value) {
      const route = {
        name: "front",
      };
      if (this.search !== "") {
        route.query = {
          search: this.search,
        };
      }
      console.log("search: " + this.search);
      this.$router.push(route);
    }, 700),
    "$route.query.search": {
      immediate: true,
      async handler(value) {
        this.blogs = [];
        this.results = [];
        this.loading = true;
        this.results = (await BlogsService.index(value)).data;
        this.appendResults();
        this.results.forEach((blog) => {
          if (this.quantity.length > 0) {
            // console.log(this.category.indexOf(blog.category))
            if (this.quantity.indexOf(blog.quantity) === -1) {
              this.quantity.push(blog.quantity);
            }
          } else {
            this.quantity.push(blog.quantity);
          }
        });
        this.loading = false;
        this.search = value;
        // console.log(this.category)
      },
    },
  },
  data() {
    return {
      blogs: [],
      BASE_URL: "http://localhost:8081/assets/uploads/",
      search: "",
      results: [],
      quantity: [],
      loading: false,
    };
  },
  // async created () {
  // this.blogs = (await BlogsService.index()).data
  // },
  methods: {
    appendResults: function () {
      if (this.blogs.length < this.results.length) {
        let toAppend = this.results.slice(
          this.blogs.length,
          LOAD_NUM + this.blogs.length
        );
        this.blogs = this.blogs.concat(toAppend);
      }
    },
    navigateTo(route) {
      this.$router.push(route);
    },
    async deleteBlog(blog) {
      try {
        await BlogsService.delete(blog);
        this.refreshData();
      } catch (err) {
        console.log(err);
      }
    },
    async refreshData() {
      this.blogs = (await BlogsService.index()).data;
    },
    setQuantity(keyword) {
      if (keyword === " ") {
        this.search = "";
        console.log("null");
      } else {
        this.search = keyword;
      }
    },
  },
  updated() {
    let sens = document.querySelector("#blog-list-bottom");
    pageWatcher = ScrollMonitor.create(sens);
    pageWatcher.enterViewport(this.appendResults);
  },
  beforeUpdated() {
    if (pageWatcher) {
      pageWatcher.destroy();
      pageWatcher = null;
    }
  },
};
</script>
<style scoped>
.component-wrapper {
  padding-left: 5px;
  padding-right: 5px;
}
.hero-wrapper {
  margin-top: 80px;
  max-width: 1100px;
  margin-left: auto;
  margin-right: auto;
  border-radius: 5px;
  background: #d9ff00;
  height: 250px;
  color: #000000;
  padding: 20px;
}
.hero h1 {
  margin-top: 30px;
}
.logo {
  padding-right: 20px;
}
.empty-blog {
  width: 100%;
  text-align: center;
  padding: 10px;
  background: darksalmon;
  color: white;
}
/* thumbnail */
.thumbnail-pic img {
  width: 200px;
  padding: 5px 5px 5px 5px;
  border: solid 1px #ccc;
  margin: 10px 10px 0px 0px;
}
.blog-info {
  float: left;
}
.blog-pic {
  float: left;
}
.clearfix {
  clear: both;
}
.blog-list {
  border: solid 1px #dfdfdf;
  margin-bottom: 10px;
  max-width: 900px;
  margin-left: auto;
  margin-right: auto;
  padding: 5px;
  box-shadow: 0 2px 4px 0 rgba(0, 0, 0, 0.1);
}
.blog-header {
  margin-top: 80px;
  max-width: 900px;
  margin-left: auto;
  margin-right: auto;
}
#blog-list-bottom {
  padding-top: 4px;
}
.blog-load-finished {
  padding: 4px;
  text-align: center;
  background: seagreen;
  color: white;
}
.categories {
  margin-top: 20px;
  padding: 0;
  list-style: none;
  float: left;
}
.categories li {
  float: left;
  padding: 2px;
}
.categories li a {
  padding: 5px 10px 5px 10px;
  background: paleturquoise;
  color: black;
  text-decoration: none;
}
.categories li.clear a {
  background: tomato;
  color: white;
}
.create-blog {
  margin-top: 10px;
}
@media (max-width: 768px) {
  .logo {
    width: 120px;
  }
}
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
  background: #000000;
  box-shadow: 0 0 10px rgba(22, 22, 22, 0.1);
  color: #fff;
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