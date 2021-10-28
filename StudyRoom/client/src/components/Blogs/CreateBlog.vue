<template>
  <div>
    <main-header navsel="back"></main-header>
    <div class="header">
      <h3><i class="fab fa-houzz"></i> เพิ่มห้องศึกษาค้นคว้ากลุ่ม</h3>
    </div>
    <div class="container-fluid">
      <div class="container">
        <div class="blog-wrapper">
          <h4><i class="fas fa-info-circle"></i> รายละเอียดห้อง</h4>
          <br/>
          <span class="font2">
            <form v-on:submit.prevent="createBlog">
              <div class="form-group">
                <label for="exampleInputEmail1">ชื่อห้อง</label>
                <div class="input-group mb-3">
                  <div class="input-group-prepend">
                    <span class="input-group-text" id="basic-addon1"
                      ><i class="fab fa-houzz"></i
                    ></span>
                  </div>
                  <input
                    required
                    type="text"
                    class="form-control"
                    placeholder="ชื่อห้องศึกษาค้นคว้ากลุ่ม"
                    v-model="blog.title"
                  />
                </div>
              </div>
              <br/>
              <label for="exampleInputEmail1">รูปห้องศึกษาค้นคว้ากลุ่ม</label>
              <div class="blog-tab">
                <transition name="fade">
                  <div
                    class="thumbnail-pic"
                    v-if="blog.thumbnail != 'null'"
                    align="center">
                    <img :src="BASE_URL + blog.thumbnail" alt="thumbnail" />
                  </div>
                </transition>
              </div>
              <br/>
              <form enctype="multipart/form-data" novalidate>
                <div class="dropbox">
                  <input
                    type="file"
                    multiple
                    :name="uploadFieldName"
                    :disabled="isSaving"
                    @change="
                      filesChange($event.target.name, $event.target.files);
                      fileCount = $event.target.files.length;
                    "
                    accept="image/*"
                    class="input-file"/>
                  <!-- <p v-if="isInitial || isSuccess"> -->
                  <p v-if="isInitial">
                    ลากไฟล์รูปภาพของคุณมาที่นี่
                    <br />หรือคลิกเพื่อเรียกดูไฟล์รูปภาพจากคอมพิวเตอร์ของคุณ
                  </p>
                  <p v-if="isSaving">กำลังอัปโหลด {{ fileCount }} files...</p>
                  <p v-if="isSuccess">อัปโหลดสำเร็จ</p>
                </div>
                <div>
                  <ul class="pictures">
                    <transition-group tag="ul" name="fade" class="pictures">
                      <li v-for="picture in pictures" v-bind:key="picture.id">
                        <img
                          style="margin-bottom: 5px"
                          :src="BASE_URL + picture.name"
                          alt="picture image"/>
                        <br/>
                        <button
                          type="button"
                          class="btn btn-success btn-sm"
                          v-on:click.prevent="useThumbnail(picture.name)">
                          เลือกรูปภาพขนาดย่อ
                        </button>
                        <button
                          type="button"
                          class="btn btn-danger btn-sm"
                          v-on:click.prevent="delFile(picture)">
                          ลบรูปภาพ
                        </button>
                      </li>
                    </transition-group>
                  </ul>
                  <div class="clearfix"></div>
                </div>
              </form>
              <div class="form-group">
                <label for="exampleInputEmail1">จำนวนคนที่จุได้</label>
                <div class="input-group mb-3">
                  <div class="input-group-prepend">
                    <span class="input-group-text" id="basic-addon1"
                      ><i class="fas fa-sort-amount-down"></i
                    ></span>
                  </div>
                  <select v-model="blog.quantity" required>
                    <option disabled value="">เลือกจำนวนคน</option>
                    <option value="2-4">2-4</option>
                    <option value="5-6">5-6</option>
                    <option value="7-8">7-8</option>
                    <option value="9-15">9-15</option>
                  </select>
                </div>
              </div>
              <div class="form-group">
                <label for="exampleInputEmail1">สถานะ</label>
                <div class="input-group mb-3">
                  <div class="input-group-prepend">
                    <span class="input-group-text" id="basic-addon1"
                      ><i class="fas fa-server"></i
                    ></span>
                  </div>
                  <select v-model="blog.status" required>
                    <option disabled value="">เลือกสถานะ</option>
                    <option value="ว่าง">ว่าง</option>
                    <option value="ไม่ว่าง">ไม่ว่าง</option>
                  </select>
                </div>
              </div>
              <br />

              <div class="form-group">
                <label for="exampleInputEmail1">ข้อมูลห้อง</label>
                <div class="input-group mb-3">
                  <div class="input-group-prepend">
                    <span class="input-group-text" id="basic-addon1"
                      ><i class="fas fa-info-circle"></i
                    ></span>
                  </div>
                  <input
                    required
                    type="text"
                    class="form-control"
                    placeholder="ข้อมูลห้อง"
                    v-model="blog.content"
                  />
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
                    <i class="fas fa-save"></i> บันทึกข้อมูล
                  </button>
                </div>
                <div class="col">
                  <button
                    class="btn btn-danger"
                    type="button"
                    style="width: 100%"
                    v-on:click="navigateTo('/blogs')"
                  >
                    <i class="fas fa-angle-double-left"></i> ย้อนกลับ
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
import BlogsService from "@/services/BlogsService";
import UploadService from "@/services/UploadService";
import { mapState } from "vuex";

const STATUS_INITIAL = 0,
  STATUS_SAVING = 1,
  STATUS_SUCCESS = 2,
  STATUS_FAILED = 3;
export default {
  data() {
    return {
      // upload data
      BASE_URL: "http://localhost:8081/assets/uploads/",
      error: null,
      uploadError: null,
      currentStatus: null,
      uploadFieldName: "userPhoto",
      uploadedFileNames: [],
      pictures: [],
      pictureIndex: 0,

      blog: {
        title: "",
        thumbnail: "null",
        pictures: "null",
        content: "",
        quantity: "",
        status: "",
      },
      config: {
        toolbar: [
          ["Bold", "Italic", "Underline", "Strike", "Subscript", "Superscript"],
        ],
        height: 300,
      },
    };
  },
  computed: {
    ...mapState(["isUserLoggedIn", "user"]),
  },
  methods: {
    useThumbnail(filename) {
      console.log(filename);
      this.blog.thumbnail = filename;
    },
    async delFile(material) {
      let result = confirm("Want to delete?");
      if (result) {
        let dataJSON = {
          filename: material.name,
        };
        await UploadService.delete(dataJSON);
        for (var i = 0; i < this.pictures.length; i++) {
          if (this.pictures[i].id === material.id) {
            this.pictures.splice(i, 1);
            this.materialIndex--;
            break;
          }
        }
      }
    },
    //upload
    wait(ms) {
      return (x) => {
        return new Promise((resolve) => setTimeout(() => resolve(x), ms));
      };
    },
    reset() {
      // reset form to initial state
      this.currentStatus = STATUS_INITIAL;
      // this.uploadedFiles = []
      this.uploadError = null;
      this.uploadedFileNames = [];
    },
    async save(formData) {
      // upload data to the server
      try {
        this.currentStatus = STATUS_SAVING;
        await UploadService.upload(formData);
        this.currentStatus = STATUS_SUCCESS;

        // update image uploaded display
        let pictureJSON = [];
        this.uploadedFileNames.forEach((uploadFilename) => {
          let found = false;
          for (let i = 0; i < this.pictures.length; i++) {
            if (this.pictures[i].name == uploadFilename) {
              found = true;
              break;
            }
          }
          if (!found) {
            this.pictureIndex++;
            let pictureJSON = {
              id: this.pictureIndex,
              name: uploadFilename,
            };
            this.pictures.push(pictureJSON);
          }
        });
        this.clearUploadResult();
      } catch (error) {
        console.log(error);
        this.currentStatus = STATUS_FAILED;
      }
    },
    filesChange(fieldName, fileList) {
      // handle file changes
      const formData = new FormData();
      if (!fileList.length) return;
      // append the files to FormData
      Array.from(Array(fileList.length).keys()).map((x) => {
        formData.append(fieldName, fileList[x], fileList[x].name);
        this.uploadedFileNames.push(fileList[x].name);
      });
      // save it
      this.save(formData);
    },
    clearUploadResult: function () {
      setTimeout(() => this.reset(), 5000);
    },
    async createBlog() {
      this.blog.pictures = JSON.stringify(this.pictures);
      try {
        await BlogsService.post(this.blog);
        this.$router.push({
          name: "blogs",
        });
      } catch (err) {
        console.log(err);
      }
    },
    navigateTo(route) {
      console.log(route);
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
      this.blogs = (await BlogsService.index()).data;
    },
    onBlur(editor) {
      console.log(editor);
    },
    onFocus(editor) {
      console.log(editor);
    },
  },
  computed: {
    isInitial() {
      return this.currentStatus === STATUS_INITIAL;
    },
    isSaving() {
      return this.currentStatus === STATUS_SAVING;
    },
    isSuccess() {
      return this.currentStatus === STATUS_SUCCESS;
    },
    isFailed() {
      return this.currentStatus === STATUS_FAILED;
    },
  },
  created() {
    this.reset();
  },
};
</script>
<style scoped>
.dropbox {
  outline: 2px dashed grey; /* the dash box */
  outline-offset: -10px;
  background: lemonchiffon;
  color: dimgray;
  padding: 10px 10px;
  min-height: 200px; /* minimum height */
  position: relative;
  cursor: pointer;
  border-radius: 20px;
}
.input-file {
  opacity: 0; /* invisible but it's there! */
  width: 100%;
  height: 200px;
  position: absolute;
  cursor: pointer;
}
.dropbox:hover {
  background: khaki; /* when mouse over to the drop zone, change color */
  border-radius: 20px;
}
.dropbox p {
  font-size: 1.2em;
  text-align: center;
  padding: 50px 0;
}
ul.pictures {
  list-style: none;
  padding: 0;
  margin: 0;
  float: left;
  padding-top: 10px;
  padding-bottom: 10px;
}
ul.pictures li {
  float: left;
}
ul.pictures li img {
  max-width: 180px;
  margin-right: 20px;
}
.clearfix {
  clear: both;
}
/* thumbnail */
.thumbnail-pic img {
  width: 200px;
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
  box-shadow: 0 0 10px rgba(0, 0, 0, 0.1);
}
.blog-tab {
  padding: 10px;
  background-color: #d3d3d3;
  text-align: left;
  text-indent: 0.5em;
  border-radius: 20px;
}
.footer {
  margin-top: 50px;
}
</style>