<template>
  <div>
    <v-container grid-list-md>
      <v-subheader>All Books</v-subheader>
      <v-layout row wrap>
        <v-flex v-for="(product, index) in products" xs4 :key="index">
          <v-card class="mx-auto" max-width="344" outlined>
            <v-list-item three-line>
              <v-list-item-content>
                <v-list-item-title class="headline mb-1">{{
                  product.name
                }}</v-list-item-title>
                <v-list-item-subtitle
                  >Rp. {{ product.price }}</v-list-item-subtitle
                >
                <v-list-item-subtitle>
                  Stock
                  <b>{{ product.stock }}</b>
                </v-list-item-subtitle>
              </v-list-item-content>

              <v-list-item-avatar
                tile
                size="80"
                color="grey"
              ></v-list-item-avatar>
            </v-list-item>

            <v-card-actions>
              <v-btn
                block
                color="success"
                v-on:click="miftah(product.id)"
                :disabled="product.stock == 0"
              >
                <v-icon>save_alt</v-icon>&nbsp;BUY
              </v-btn>
            </v-card-actions>
          </v-card>
          <v-card>
            <v-img
              v-if="product.cover"
              :src="getImage('/books/' + product.cover)"
              height="150px"
            >
              <v-container fill-height fluid pa-2>
                <v-layout fill-height>
                  <v-flex xs12 align-end flexbox>
                    <span class="title text-block" v-text="product.name"
                      >Product Name</span
                    >
                    <span
                      class="title text-block"
                      v-text="product.price"
                    ></span>
                  </v-flex>
                </v-layout>
              </v-container>
            </v-img>
          </v-card>
        </v-flex>
      </v-layout>
    </v-container>
    <template>
      <div class="text-xs-center">
        <v-pagination
          v-model="page"
          @input="go"
          :length="lengthPage"
          :total-Visible="4"
        ></v-pagination>
      </div>
    </template>
  </div>
</template>

<style scoped>
.text-block {
  position: absolute;
  bottom: 5px;
  left: 5px;
  background-color: #fff;
  padding-left: 5px;
  padding-right: 5px;
  opacity: 0.7;
  width: 100%;
}
</style>

<script>
import { mapActions } from "vuex";

export default {
  data() {
    return {
      products: [],
      product: [],
      page: 0,
      lengthPage: 0,
    };
  },
  methods: {
    ...mapActions({
      addCart: "cart/add",
      setAlert: "alert/set",
    }),
    go() {
      let url = "/products";
      if (this.page > 0) url = "/products?page=" + this.page;
      this.axios
        .get(url)
        .then((response) => {
          let response_data = response.data;
          let products = response_data.data;
          this.lengthPage = response_data.meta.last_page;
          this.products = products;
          console.log(this.products);
        })
        .catch((error) => {
          console.log(error);
        });
    },
    miftah(id) {
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
  },
  created() {
    this.go();
  },
};
</script>
