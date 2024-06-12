<template>
   <layout-div>
       <div class="row justify-content-md-center mt-5">
            <div class="col-4">
                <div class="card">
                    <div class="card-body">
                        <h5 class="card-title mb-4">Register</h5>
                        <form >
                            <div class="mb-3">
                                <label 
                                    htmlFor="name"
                                    class="form-label">Name
                                </label>
                                <input 
                                    type="text"
                                    class="form-control"
                                    id="name"
                                    name="name"
                                    v-model="name"
                                />
                            </div>
                            <div class="mb-3">
                                <label 
                                    htmlFor="username"
                                    class="form-label">Username
                                </label>
                                <input 
                                    type="text"
                                    class="form-control"
                                    id="username"
                                    name="username"
                                    v-model="username"
                                />
                            </div>
                            <div class="mb-3">
                                <label 
                                    htmlFor="password"
                                    class="form-label">Password
                                </label>
                                <input 
                                    type="password"
                                    class="form-control"
                                    id="password"
                                    name="password"
                                    v-model="password"
                                />
                            </div>
                            <div class="mb-3">
                                <label 
                                    htmlFor="confirm_password"
                                    class="form-label">Confirm Password
                                </label>
                                <input 
                                    type="password"
                                    class="form-control"
                                    id="confirm_password"
                                    name="confirm_password"
                                    v-model="confirmPassword"
                                />
                            </div>
                            <div class="d-grid gap-2">
                                <button 
                                    :disabled="isSubmitting"
                                    @click="registerAction()"
                                    type="button"
                                    class="btn btn-primary btn-block">Register Now
                                </button>
                                <p 
                                    class="text-center">Have already an account <router-link to="/">Login here</router-link>
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
// import axios from 'axios';
import LayoutDiv from '../LayoutDiv.vue';
  
export default {
  name: 'RegisterPage',
  components: {
    LayoutDiv,
  },
  data() {
    return {
        name:'',
        username:'',
        password:'',
        confirmPassword:'',
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
     registerAction(){
        this.isSubmitting = true
        let payload = {
            name:this.name,
            username: this.username,
            password: this.password,
            password_confirmation: this.confirmPassword
        }
        console.log(payload)
        // axios.post('/api/register', payload)
        //   .then(response => {
        //     localStorage.setItem('token', response.data.token)
        //     this.$router.push('/dashboard')
        //     return response
        //   })
        //   .catch(error => {
        //     this.isSubmitting = false
        //     if (error.response.data.errors != undefined) {
        //         this.validationErrors = error.response.data.errors
        //     }
        //     return error
        //   });
     }
  },
};
</script>