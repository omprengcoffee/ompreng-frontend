<template>
  <v-footer dark height="auto" color="primary">
    <v-flex xs12>
      <v-card text title class="white--text text-xs-center" color="primary">
        <!-- menu icon sosmed -->
        <!-- <v-card-text>
          <v-btn v-for="icon in icons" :key="icon" class="mx-3 white--text" icon>
            <v-icon size="24px">{{ icon }}</v-icon>
          </v-btn>
        </v-card-text>-->

        <v-layout justify-center row wrap>
          <!-- link menu halaman apps -->
          <!-- <v-btn v-for="link in links" :key="link" color="white" text rounded>{{ link }}</v-btn> -->

          <!-- text copyright -->
          <v-flex py-3 white--text xs12 color="primary">
            &copy;2020 -- Point of Sales powered by
            <strong>Vuetify Template</strong>
          </v-flex>
        </v-layout>
      </v-card>
    </v-flex>
  </v-footer>
</template>

<script>
export default {
  data: () => ({
    // variabel icon sosmed yg ingin ditampilkan
    // icons: [
    //   "fab fa-facebook",
    //   "fab fa-twitter",
    //   "fab fa-instagram",
    //   "fab fa-youtube",
    //   "fab fa-linkedin",
    // ],
    // variabel link halaman yg ingin ditampilkan
    // links: ["Home", "About Us", "Team", "Services", "Blog", "Contact Us"],
  }),
};
</script>
