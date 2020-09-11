<template>
  <v-container>
    <div>
      <v-card flat>
        <v-container>
          <v-subheader>Your Shopping Cart</v-subheader>
          <v-card flat>
            <h4>{{ namaCustomer }}</h4>
            <v-text-field
              xs4
              label="Nama Customer"
              placholder="Nama Customer"
              v-model="namaCustomer"
              type="text"
              hide-details
              single-line
            ></v-text-field>
          </v-card>
          <div v-if="countCart">
            <v-card flat>
              <v-list three-line v-if="countCart > 0">
                <template v-for="(item, index) in carts">
                  <v-list-item :key="'cart' + index">
                    <v-list-item-avatar>
                      <v-img :src="getImage('/books/' + item.cover)"></v-img>
                    </v-list-item-avatar>

                    <v-list-item-content>
                      <v-list-item-content>
                        <v-list-item-title
                          v-html="item.name"
                        ></v-list-item-title>
                        <v-list-item-subtitle>
                          Rp. {{ item.price.toLocaleString("id-ID") }}
                          {{ item.totalWeight }}
                          <span style="float:right">{{ item.quantity }}</span>
                        </v-list-item-subtitle>
                      </v-list-item-content>
                    </v-list-item-content>
                  </v-list-item>
                </template>
              </v-list>
            </v-card>
          </div>
          <v-subheader>Total</v-subheader>
          <v-card>
            <v-container>
              <v-layout row wrap>
                <v-flex xs12 text-center>
                  <v-text-field
                    xs4
                    @input="calculateKembalian"
                    label="Nominal uang"
                    v-model="nominal"
                    type="number"
                    hide-details
                    single-line
                    :disabled="nominal < 0"
                  ></v-text-field>
                  <span>
                    Kembalian uang
                    <b>Rp. {{ kembalian.toLocaleString("id-ID") }}</b>
                  </span>
                </v-flex>
                <br />
                <v-flex xs6 text-center>
                  Total Bill ({{ totalQuantity }} items)
                  <div class="title">
                    {{ totalPrice.toLocaleString("id-ID") }}
                  </div>
                </v-flex>
                <v-flex xs6 text-center>
                  <v-btn
                    color="orange"
                    @click="dialogConfirm = true"
                    :disabled="totalPrice == 0"
                  >
                    <v-icon light>attach_money</v-icon>&nbsp; Pay
                  </v-btn>
                </v-flex>
              </v-layout>
            </v-container>
          </v-card>

          <template>
            <v-layout row justify-center>
              <v-dialog v-model="dialogConfirm" persistent max-width="290">
                <v-card>
                  <v-card-title class="headline">Confirmation!</v-card-title>
                  <v-card-text
                    >If you continue, transcation will be processed</v-card-text
                  >
                  <v-card-actions>
                    <v-btn color="warning" @click="cancel">Cancel</v-btn>
                    <v-btn color="success" @click="pay">Continue</v-btn>
                  </v-card-actions>
                </v-card>
              </v-dialog>
            </v-layout>
          </template>
        </v-container>
      </v-card>
    </div>
  </v-container>
</template>

<script>
import { mapGetters, mapActions } from "vuex";
export default {
  data() {
    return {
      nominal: 0,
      kembalian: 0,
      namaCustomer: "",
      dialogConfirm: false,
    };
  },
  computed: {
    ...mapGetters({
      user: "auth/user",
      carts: "cart/carts",
      countCart: "cart/count",
      totalPrice: "cart/totalPrice",
      totalQuantity: "cart/totalQuantity",
      totalWeight: "cart/totalWeight",
    }),
  },
  methods: {
    ...mapActions({
      setAlert: "alert/set",
      setAuth: "auth/set",
      setCart: "cart/set",
      setPayment: "setPayment",
    }),
    calculateKembalian() {
      this.kembalian = this.nominal - this.totalPrice;
    },
    pay() {
      this.dialogConfirm = false;
      let safeCart = JSON.stringify(this.carts);
      let formData = new FormData();
      formData.set("carts", safeCart);
      formData.set("customer", this.namaCustomer);
      console.log(formData.customer);
      let config = {
        headers: {
          Authorization: "Bearer " + this.user.api_token,
        },
      };
      this.axios
        .post("/payment", formData, config)
        .then((response) => {
          let { data } = response;
          console.log(formData);
          this.setPayment(data.data);
          this.$router.push({ path: "/payment" });
          this.axios.post("/cetak", formData, config).then((response) => {
            console.log(response);
          });
          // this.setCart([]);

          this.setAlert({
            status: true,
            text: data.message,
            color: data.status,
          });
        })
        .catch((error) => {
          let { data } = error.response;
          this.setAlert({
            status: true,
            text: data.message,
            color: "error",
          });
          console.log(data.message);
        });
    },
    cancel() {
      this.dialogConfirm = false;
    },
  },
};
</script>
