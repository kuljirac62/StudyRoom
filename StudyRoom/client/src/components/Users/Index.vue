<template>
  <div> 
    <main-header navsel="back"></main-header>
    <center><h1>ข้อมูลผู้ใช้บริการทั้งหมด</h1>
    
      <h4>จำนวน {{ users.length }} คน </h4>
       </center>
       <div v-if="users.length">
      <div v-for="user in users" v-bind:key="user.id">
        <p>id: {{ user.id }}</p>
        <p>ชื่อ-นามสกุล: {{ user.name }} - {{ user.lastname }}</p>
        <p>Email: {{ user.email }}</p>
        <p>Password: {{ user.password }}</p>
        <p>
         <button
                class="btn btn-danger"
                type="button"
                style="width: 8%"
                v-on:click="deleteUser(user)">
            ลบข้อมูล
          </button>
        </p>
        <hr />
      </div>
  
    </div>
  </div>
</template>
<script>
import UsersService from "@/services/UsersService";
export default {
  data() {
    return {
      users: [],
    };
  },
  async created() {
    try {
      this.users = (await UsersService.index()).data;
    } catch (error) {
      console.log(error);
    }
  },
  methods: {
    navigateTo(route) {
      this.$router.push(route);
    },
    async deleteUser(user){
      let result = confirm("Want to delete")
      if(result){
        try{
          await UsersService.delete(user)
          this.refreshData()
        }catch(error){
          console.log(error)
        }
      }
    },
    async refreshData(){
      this.users = (await UsersService.index()).data
    },
    logout(){
      this.$store.dispatch('setToken',null)
      this.$store.dispatch('setUser',null)
      this.$router.push({
        name: 'login'
      })
    }
  },
};
</script>
<style scoped>
</style>