<script setup lang="ts">
import { shallowRef } from "vue";
import AuthFooter from "@/views/authentication/auth/AuthFooter.vue";
import AppBarToggleDarkMode from "@/components/AppBarToggleDarkMode.vue";
import HomeWallpaper from "@/components/HomeWallpaper.vue";

const appTitle = import.meta.env.VITE_APP_TITLE;
const headerLinks = shallowRef([
  {
    id: 1,
    title: "Features",
    link: "/home/features",
    icon: "mdi-eye",
  },
  {
    id: 2,
    title: "Help",
    link: "/help",
    icon: "mdi-help",
  },
]);
const wallPaper = shallowRef({
  imgFallback: "src/assets/images/home_wallpaper.jpg",
  sourcePaths: [
    "src/assets/images/home_wallpaper.avif",
    "src/assets/images/home_wallpaper.webp",
  ],
});
</script>

<template>
  <v-toolbar color="surface" density="default" flat class="px-2 text-primary">
    <v-toolbar-title class="text-h4 font-weight-black">
      <v-icon icon="mdi-bike" color="primary" class="me-2"></v-icon>
      {{ appTitle }}
    </v-toolbar-title>

    <v-spacer></v-spacer>

    <v-toolbar-items class="hidden-sm-and-down">
      <v-btn
        v-for="item in headerLinks"
        :key="item.id"
        :to="item.link"
        :prepend-icon="item.icon"
        variant="flat"
        size="large"
        class="px-8 text-primary font-weight-bold"
      >
        {{ item.title }}
      </v-btn>

      <v-btn
        prepend-icon="mdi-login"
        to="/auth/login"
        variant="elevated"
        color="secondary"
        size="x-large"
        class="mx-16"
      >
        Sign in
      </v-btn>
    </v-toolbar-items>

    <AppBarToggleDarkMode />

    <v-menu class="hidden-md-and-up">
      <template v-slot:activator="{ props }">
        <v-btn
          class="bg-surface on-surface hidden-md-and-up"
          icon="mdi-dots-vertical"
          variant="flat"
          v-bind="props"
        >
        </v-btn>
      </template>
      <v-list>
        <v-list-item v-for="item in headerLinks" :key="item.id">
          <v-btn
            :prepend-icon="item.icon"
            :to="item.link"
            variant="flat"
            class="text-primary font-weight-bold"
          >
            {{ item.title }}
          </v-btn>
        </v-list-item>

        <v-list-item>
          <v-btn
            prepend-icon="mdi-login"
            to="/auth/login"
            variant="elevated"
            color="secondary"
          >
            Sign in
          </v-btn>
        </v-list-item>
      </v-list>
    </v-menu>
  </v-toolbar>

  <v-main class="background">
    <v-row no-gutters height="100%">
      <v-col cols="6" md="4" class="hidden-xs">
        <HomeWallpaper
          :img-fallback="wallPaper.imgFallback"
          :source-paths="wallPaper.sourcePaths"
        />
      </v-col>

      <v-col cols="12" sm="6" md="4">
        <v-sheet
          class="d-flex flex-wrap align-center justify-center text-center mx-auto px-4"
          elevation="0"
          height="calc(100dvh - 96px)"
        >
          <div>
            <v-icon icon="mdi-bike" color="primary" size="x-large"></v-icon>

            <h2 class="text-h4 font-weight-black text-primary mb-4">
              Welcome on Cycliti!
            </h2>

            <div class="text-h5 font-weight-medium mb-10">
              Sign up to plan your next circuit. Enjoy!
            </div>

            <p class="text-body-1 mb-6">
              Already a member:
              <span>
                <v-btn
                  prepend-icon="mdi-login"
                  to="/auth/login"
                  variant="elevated"
                  color="secondary  font-weight-bold"
                  size="small"
                >
                  Sign in
                </v-btn>
              </span>
            </p>

            <v-btn
              to="/auth/register"
              color="primary"
              variant="elevated"
              size="x-large"
              block
              class="mb-2"
            >
              Sign up here !
            </v-btn>

            <p class="text-body-2">
              By signing up for Strava, you agree to the
              <span>
                <router-link
                  to="/legal/terms"
                  class="text-secondary text-decoration-none"
                  >Terms of Service</router-link
                > </span
              >. View our
              <span>
                <router-link
                  to="/legal/privacy"
                  class="text-secondary text-decoration-none"
                  >Privacy Policy</router-link
                > </span
              >.
            </p>
          </div>
        </v-sheet>
      </v-col>

      <v-col cols="4" class="hidden-sm-and-down">
        <HomeWallpaper
          :img-fallback="wallPaper.imgFallback"
          :source-paths="wallPaper.sourcePaths"
        />
      </v-col>
    </v-row>
  </v-main>

  <AuthFooter />
</template>
