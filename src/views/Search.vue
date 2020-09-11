<template>
  <v-card>
    <v-toolbar dark color="primary">
      <v-btn icon dark @click.native="close">
        <v-icon>Close</v-icon>
      </v-btn>
      <v-text-field
        v-model="keyword"
        @input="doSearch"
        hide-details
        append-icon="mic"
        text
        label="search"
        prepend-inner-icon="search"
        solo-inverted
        ref="txtSearch"
      ></v-text-field>
    </v-toolbar>
    <v-divider></v-divider>
    <v-subheader v-if="keyword.length > 0">Result search "{{ keyword }}"</v-subheader>
    <v-alert :value="items.length == 0 && keyword.length > 0" color="warning">No results were found.</v-alert>

    <!-- Results -->
    <v-list two-line v-if="items.length > 0">
      <template v-for="item in items">
        <v-list-item :key="item.id" @click="close" :to="'/book/' + item.slug">
          <v-list-item-content>
            <v-list-item-title v-html="item.name"></v-list-item-title>
          </v-list-item-content>
          <v-card-actions>
            <v-btn block color="success" v-on:click="buy(item.id)" :disabled="item.stock == 0">
              <v-icon>save_alt</v-icon>&nbsp;BUY
            </v-btn>
          </v-card-actions>
        </v-list-item>
      </template>
    </v-list>

    <!-- Results new -->
  </v-card>
</template>

<script>
import { mapActions } from "vuex";

export default {
  name: "search",
  data() {
    return {
      keyword: "",
      items: [],
    };
  },
  methods: {
    ...mapActions({
      setStatusDialog: "dialog/setStatus",
      addCart: "cart/add",
      setAlert: "alert/set",
    }),
    buy(id) {
      this.axios
        .get("/products/" + id)
        .then((response) => {
          this.product = response.data.data;
          this.addCart(this.product);
          console.log(this.product);
        })
        .catch((error) => {
          console.log(error);
        });
    },
    close() {
      this.setStatusDialog(false);
    },
    doSearch() {
      let keyword = this.keyword;
      if (keyword.length > 0) {
        this.axios
          .get("/products/search/" + keyword)
          .then((response) => {
            let products = response.data.data;
            this.items = products;
          })
          .catch((error) => {
            console.log(error);
          });
      }
    },
    mounted() {
      if (this.$refs.txtSearch != undefined) {
        this.$nextTick(() => this.$refs.txtSearch.focus());
      }
    },
  },
};
</script>
