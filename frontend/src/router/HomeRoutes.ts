const HomeRoutes = {
  path: "/",
  meta: {
    requireAuth: false,
  },
  component: () => import("@/layouts/HomeLayout.vue"),
  // children: [
  //     {
  //       name: 'LandingPage',
  //       path: '/',
  //       component: () => import('@/views/Home.vue')
  //     },
  // ]
};

export default HomeRoutes;
