const HomeRoutes = {
  path: "/home",
  meta: {
    requireAuth: false,
  },
  redirect: "/",
  component: () => import("@/layouts/home/HomeLayout.vue"),
  children: [
      {
        name: 'Home',
        path: '/',
        component: () => import('@/views/HomePage.vue')
      },
  ]
};

export default HomeRoutes;
