<template>
   <layout-div>
      <div class="row justify-content-md-center">
        <div class="col-12">
            <nav class="navbar navbar-expand-lg navbar-light bg-light">
                <div class="container-fluid">
                    <a class="navbar-brand" href="#">Dashboard</a>
                    <div class="d-flex">
                        <ul class="navbar-nav">
                            <li class="nav-item">
                                <a @click="logoutAction()" class="nav-link" aria-current="page" href="#">Logout</a>
                            </li>
                        </ul>
                    </div>
                </div>
            </nav>
            <h2 class="text-center mt-5">Welcome bro, {{user?.name}}!</h2  >
        </div>
      </div>
   </layout-div>
</template>

<script>
import axios from 'axios';
import LayoutDiv from '../LayoutDiv.vue';
  
export default {
  name: 'DashboardPage',
  components: {
    LayoutDiv,
  },
  data() {
    return {
      user: {},
    };
  },
  created() {
    this.getUser();
    
    if (localStorage.getItem('token') == "" || localStorage.getItem('token') == null) {
      this.$router.push('/')
    } else {
      this.getUser();
    }
  },
  methods: {
    getUser() {
      axios.get('http://localhost:3000/api/users/' + localStorage.getItem('idUser'))
      .then((res) => {
        this.user = res.data;
        return res;
      })
      .catch((err) => {
        return err
      });
    },
 
    logoutAction () {
      localStorage.setItem('token', "")
      localStorage.setItem('idUser', "")
      axios.get('http://localhost:3000/api/auth/logout' + this.user.name)
      .then((res) => {
        this.user = res.data;
        this.$router.push('/')

        return res;
      }).catch((err) => {
        return err
      });
    }
  },
};
</script>
