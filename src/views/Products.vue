<template>
  <v-container>
    <v-subheader>
      <span>Data Products</span>
      <hr />
    </v-subheader>
    <router-link to="/addproducts">
      <v-btn color="primary" dark>Add Products</v-btn>
    </router-link>
    <v-dialog v-model="dialog" persistent max-width="600px">
      <template v-slot:activator="{ on, attrs }">
        <v-btn color="primary" dark v-bind="attrs" v-on="on" @click="getDataForEdit">Edit Data</v-btn>
      </template>
      <v-card>
        <v-card-title>
          <span class="headline">{{ product.name }}</span>
        </v-card-title>
        <v-card-text>
          <v-container>
            <v-form ref="form" lazy-validation>
              <v-row>
                <v-col cols="12">
                  <v-text-field label="Product Name" v-model="name" required></v-text-field>
                </v-col>
                <v-col cols="12">
                  <v-text-field label="Product Price" v-model="price" required></v-text-field>
                </v-col>
                <v-col cols="12">
                  <v-text-field label="Product Stock" v-model="stock" required></v-text-field>
                </v-col>
              </v-row>
            </v-form>
          </v-container>
          <small>*indicates required field</small>
        </v-card-text>
        <v-card-actions>
          <v-spacer></v-spacer>
          <v-btn color="blue darken-1" text @click="dialog = false">Close</v-btn>
          <v-btn color="blue darken-1" text @click="editData">Save</v-btn>
        </v-card-actions>
      </v-card>
    </v-dialog>
    <v-data-table
      ref="mytable"
      singleSelect
      v-model="selected"
      :headers="headers"
      :items="products"
      item-key="id"
      show-select
      class="elevation-1"
    ></v-data-table>
  </v-container>
</template>

<script>
import { mapGetters, mapActions } from "vuex";
export default {
  data() {
    return {
      headers: [
        {
          text: "Product Name",
          align: "start",
          sortable: false,
          value: "name",
        },
        { text: "Price", value: "price" },
        { text: "Stock", value: "stock" },
      ],
      products: [],
      selected: null,
      dialog: false,
      product: [],
      name: "",
      price: 0,
      stock: 0,
    };
  },
  computed: {
    ...mapGetters({
      roles: "auth/isUserRolesAdmin",
      user: "auth/user",
    }),
  },
  methods: {
    ...mapActions({
      setAlert: "alert/set",
    }),
    getData() {
      this.axios.get("/products").then((response) => {
        let response_data = response.data;
        let products = response_data.data;
        this.products = products;
      });
    },
    getDataForEdit() {
      this.axios
        .get("/products/" + this.selected[0].id)
        .then((response) => {
          let data = response.data.data;
          this.product = response.data.data;
          this.name = data.name;
          this.price = data.price;
          this.stock = data.stock;
        })
        .catch((error) => {
          console.log(error);
        });
    },
    editData() {
      let formData = new FormData();
      formData.set("name", this.name);
      formData.set("price", this.price);
      formData.set("stock", this.stock);
      let config = {
        headers: {
          Authorization: "Bearer " + this.user.api_token,
        },
      };
      this.axios
        .post("/products/" + this.selected[0].id, formData, config)
        .then((response) => {
          this.setAlert({
            status: true,
            text: response.data.message,
            type: "success",
          });
          this.dialog = false;
          this.getData();
        })
        .catch((err) => {
          let responses = err.response;
          this.setAlert({
            status: true,
            text: responses.data.message,
            type: "error",
          });
        });
    },
  },
  created() {
    this.getData();
  },
};
</script>
