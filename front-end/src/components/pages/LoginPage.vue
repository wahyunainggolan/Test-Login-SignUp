<template>
   <layout-div>
        <div class="row justify-content-md-center mt-5">
            <div class="col-4">
                <div class="card">
                    <div class="card-body">
                        <h5 class="card-title mb-4">Sign In</h5>
                        <form>
                            <div class="mb-3">
                                <label 
                                    htmlFor="username"
                                    class="form-label">
                                        Username
                                </label>
                                <input 
                                    v-model="username"
                                    type="text"
                                    class="form-control"
                                    id="username"
                                    name="username"
                                />
                                <div v-if="this.validationErrors.username" class="flex flex-col">
                                    <small class="text-danger">
                                        {{validationErrors?.username[0]}}
                                    </small >
                                </div>
                            </div>
                            <div class="mb-3">
                                <label 
                                    htmlFor="password"
                                    class="form-label">Password
                                </label>
                                <input 
                                    v-model="password"
                                    type="password"
                                    class="form-control"
                                    id="password"
                                    name="password"
                                />
                                <div v-if="this.validationErrors.password" class="flex flex-col">
                                    <small class="text-danger">
                                        {{validationErrors?.password[0]}}
                                    </small >
                                </div>
                            </div>
                            <div class="d-grid gap-2">
                                <button
                                    :disabled="isSubmitting"
                                    @click="loginAction()"
                                    type="button"
                                    class="btn btn-primary btn-block">Login
                                </button>
                                <div v-if="this.validationErrors.errorLogin" class="flex flex-col">
                                    <small class="text-danger">
                                        {{validationErrors?.errorLogin[0]}}
                                    </small >
                                </div>

                                <p class="text-center">Don't have account? 
                                    <router-link to="/register">Register here </router-link>
                                </p>
                            </div>
                        </form>
                    </div>
                </div>
            </div>
        </div>
   </layout-div>
</template>
<script>
import axios from 'axios';
import LayoutDiv from '../LayoutDiv.vue';
  
export default {
  name: 'LoginPage',
  components: {
    LayoutDiv,
  },
  data() {
    return {
        username:'',
        password:'',
        validationErrors:{},
        isSubmitting:false,
    };
  },
  created() {
    if(localStorage.getItem('token') != "" && localStorage.getItem('token') != null){
        this.$router.push('/dashboard')
    }
  },
  methods: {
     loginAction(){
        this.isSubmitting = true

        if (this.username == '') {
            this.validationErrors = {'username': ['username cannot be blank']}
        } else if (this.password == '') {
            this.validationErrors = {'password': ['password cannot be blank']}
        } else {
            this.validationErrors = {};
        }
        this.isSubmitting = false

        if (Object.keys(this.validationErrors).length == 0) {
            let payload = {
                username: this.username,
                password: this.password,
            }
            axios.post('http://localhost:3000/api/auth/login', payload, {
                headers: {
                    'Access-Control-Allow-Origin': '*'
                }
                }).then(response => {
                    const {token, id} = response.data;
                    localStorage.setItem('token', token);
                    localStorage.setItem('idUser', id);
                    this.$router.push('/dashboard');

                    return response;
                })
                .catch(error => {
                    this.isSubmitting = false
                    if (error.response.data) {
                        this.validationErrors = {'errorLogin': [error.response.data.message]}
                    }

                    return error
                });
            }
        }
    },
};
</script>