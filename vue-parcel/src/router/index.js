import Vue from "vue";
import Router from "vue-router";
const Index = () => import("../components/index");

Vue.use(Router);

export default new Router({
  routes: [
    {
      path: "/",
      component: Index
    }
  ]
});
