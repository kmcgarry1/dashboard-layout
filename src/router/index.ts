import { createRouter, createWebHistory } from "vue-router";
import Layout from "../components/dashboard/Layout.vue";
import DataViewPage from "../pages/DataViewPage.vue";

const router = createRouter({
  history: createWebHistory(),
  routes: [
    {
      path: "/",
      component: Layout,
      children: [
        {
          path: ":navId?",
          name: "section",
          component: DataViewPage,
          props: true,
        },
      ],
    },
    {
      path: "/:pathMatch(.*)*",
      redirect: { name: "section" },
    },
  ],
});

export default router;
