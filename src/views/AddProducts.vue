<template>
  <div>
    <v-subheader>Add Products</v-subheader>
    <div>
      <v-card flat>
        <v-container>
          <v-form ref="form" lazy-validation>
            <v-text-field
              label="Name Products"
              v-model="name"
              required
            ></v-text-field>
            <v-text-field label="Price" v-model="price" required></v-text-field>
            <v-text-field label="Stock" v-model="stock" required></v-text-field>
            <v-text-field label="Set Discount (%)" v-model="diskon" required></v-text-field>
          </v-form>
          <v-card-actions>
            <v-btn color="success" dark @click="saveProducts">
              <v-icon>save</v-icon>&nbsp; Save
            </v-btn>
          </v-card-actions>
        </v-container>
      </v-card>
    </div>
  </div>
</template>
<script>
import { mapGetters, mapActions } from "vuex";
export default {
  data() {
    return {
      name: "",
      price: null,
      stock: "",
      diskon:null,
      hargaDiskon:null,
    };
  },
  computed: {
    ...mapGetters({
      user: "auth/user",
    }),
  },
  methods: {
    ...mapActions({
      setAlert: "alert/set",
      setAuth: "auth/set",
    }),
    saveProducts() {
      this.hargaDiskon = parseInt((this.diskon/100) * this.price);
      console.log(this.diskon)
      console.log(this.hargaDiskon)
      console.log(this.price - this.hargaDiskon)
      let formData = new FormData();
      formData.set("name", this.name);
      formData.set("price", parseInt(this.price-this.hargaDiskon));
      formData.set("stock", this.stock);
      let config = {
        headers: {
          Authorization: "Bearer " + this.user.api_token,
        },
      };
      this.axios
        .post("/products/store", formData, config)
        .then((response) => {
          this.setAuth(response.data.data);
          this.setAlert({
            status: true,
            text: response.data.message,
            type: "success",
          });
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
};
</script>
