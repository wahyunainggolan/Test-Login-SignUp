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
                            </div>
                            <div class="d-grid gap-2">
                                <button 
                                    type="button"
                                    class="btn btn-primary btn-block">Login</button>
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