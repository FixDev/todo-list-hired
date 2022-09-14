import { createRouter, createWebHistory } from "vue-router";
import IndexPage from "../pages/index.vue";

const router = createRouter({
  history: createWebHistory(import.meta.env.BASE_URL),
  routes: [
    {
      path: "/",
      component: () => import("../layouts/Base.vue"),
      children: [
        {
          path: "",
          name: "home",
          component: IndexPage,
        },
      ],
    },
  ],
});

export default router;
