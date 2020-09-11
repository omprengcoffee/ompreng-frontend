import Vue from "vue";
import VueRouter from "vue-router";
import Home from "../views/Home.vue";
import About from "../views/About.vue";
import stores from "../store/index";

Vue.use(VueRouter);

const routes = [
  {
    path: "/",
    name: "home",
    component: Home,
  },
  {
    path: "/test",
    name: "test",
    component: () => import("../views/Test.vue"),
  },
  {
    path: "/products",
    name: "products",
    component: () => import("../views/Products.vue"),
  },
  {
    path: "/addproducts",
    name: "add-products",
    component: () => import("../views/AddProducts.vue"),
  },
  {
    path: "/categories",
    name: "categories",
    component: () => import("../views/Categories.vue"),
  },
  {
    path: "/books",
    name: "books",
    component: () => import("../views/Books.vue"),
  },
  {
    path: "/category/:slug",
    name: "category",
    component: () => import("../views/Category.vue"),
  },
  {
    path: "/book/:slug",
    name: "book",
    component: () => import("../views/Book.vue"),
  },
  {
    path: "/checkout",
    name: "checkout",
    component: () => import("../views/Checkout.vue"),
    meta: { auth: true },
  },
  {
    path: "/payment",
    name: "payment",
    component: () => import("../views/Payment.vue"),
    meta: { auth: true },
  },
  {
    path: "/profile",
    name: "profile",
    component: () => import("../components/Profile.vue"),
    meta: { auth: true },
  },
  {
    path: "/my-order",
    name: "my-order",
    component: () => import("../components/MyOrder.vue"),
    meta: { auth: true },
  },
  {
    path: "/about",
    name: "about",
    component: About,
  },
  {
    path: "*",
    redirect: {
      name: "home",
    },
  },
];

const router = new VueRouter({
  routes,
});

router.beforeEach((to, from, next) => {
  // jika routing ada meta auth-nya maka
  if (to.matched.some((record) => record.meta.auth)) {
    // if user == guest
    if (stores.getters["auth/guest"]) {
      // Menampilkan pesan
      stores.dispatch("alert/set", {
        status: true,
        text: "Login first",
        color: "error",
      });
      stores.dispatch("setPrevUrl", to.path);

      // menampilkan form login
      stores.dispatch("dialog/setComponent", "login");
    } else {
      next();
    }
  } else {
    next();
  }
});

export default router;
