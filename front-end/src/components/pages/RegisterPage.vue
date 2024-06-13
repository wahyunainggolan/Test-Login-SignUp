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
                                    required
                                />
                                <div v-if="this.validationErrors.name" class="flex flex-col">
                                    <small class="text-danger">
                                        {{validationErrors?.name[0]}}
                                    </small >
                                </div>
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
                                    type="password"
                                    class="form-control"
                                    id="password"
                                    name="password"
                                    v-model="password"
                                    required
                                />
                                <div v-if="validationErrors.password" class="flex flex-col">
                                    <small  class="text-danger">
                                        {{validationErrors?.password[0]}}
                                    </small >
                                </div>  
                            </div>
                            <div class="d-grid gap-2">
                                <button 
                                    :disabled="isSubmitting"
                                    @click="registerAction()"
                                    type="button"
                                    class="btn btn-primary btn-block">Register Now
                                </button>
                                <div v-if="this.validationErrors.errorRegister" class="flex flex-col">
                                    <small class="text-danger">
                                        {{validationErrors?.errorRegister[0]}}
                                    </small >
                                </div>
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
import axios from 'axios';
import LayoutDiv from '../LayoutDiv.vue';
  
export default {
  name: 'RegisterPage',
  components: {
    LayoutDiv,
  },
  data() {
    return {
        name: '',
        username: '',
        password: '',
        validationErrors: {},
        isSubmitting: false,
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

        if (this.name == '') {
            this.validationErrors = {'name': ['name cannot be blank']}
        } else if (this.username == '') {
            this.validationErrors = {'username': ['username cannot be blank']}
        } else if (this.password == '') {
            this.validationErrors = {'password': ['password cannot be blank']}
        } else {
            this.validationErrors = {};
        }
        this.isSubmitting = false

        if (Object.keys(this.validationErrors).length == 0) {
            let payload = {
                name:this.name,
                username: this.username,
                password: this.password
            }
            
            axios.post('http://localhost:3000/api/auth/signup', payload, {
                headers: {
                    'Access-Control-Allow-Origin': '*'
                }
            }).then(response => {
                const {token, id} = response.data;
                localStorage.setItem('token', token);
                localStorage.setItem('idUser', id);
                this.$router.push('/dashboard');

                return response;
            }).catch(error => {
                this.isSubmitting = false

                if (error.response.data) {
                    this.validationErrors = {'errorRegister': [error.response.data.message]}
                }

                return error
            });
        }
        }
    },
};
</script>