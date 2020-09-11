<template>
  <v-card>
    <v-toolbar dark color="primary">
      <v-btn icon dark @click="close">
        <v-icon>close</v-icon>
      </v-btn>
      <v-toolbar-title>Your shopping cart</v-toolbar-title>
    </v-toolbar>
    <v-divider></v-divider>
    <v-container fluid>
      <div v-if="countCart == 0">
        <v-alert outlined color="warning" icon="mdi-cart-off"
          >Keranjang belanja kosong!</v-alert
        >
      </div>
      <v-list three-line v-if="countCart > 0">
        <template v-for="(item, index) in carts">
          <v-list-item :key="'cart' + index">
            <v-list-item-avatar>
              <v-img :src="item.cover"></v-img>
            </v-list-item-avatar>

            <v-list-item-content>
              <v-list-item-title>
                {{ item.name }}
                <!-- ({{ variants.id }}) -->
              </v-list-item-title>
              <!-- <v-radio-group v-model="variants.id" :mandatory="false">
                <v-radio label="Hot" :name="variants" value="Hot"></v-radio>
                <v-radio label="Cold" :name="variants" value="Cold"></v-radio>
              </v-radio-group> -->
              <v-list-item-subtitle>
                Rp. {{ item.price.toLocaleString("id-ID") }}
                <span style="float:right">
                  <v-btn
                    icon
                    small
                    rounded
                    depressed
                    @click.stop="removeCart(item)"
                  >
                    <v-icon dark color="error">mdi-minus-circle</v-icon>
                  </v-btn>
                  {{ item.quantity }}
                  <v-btn
                    icon
                    small
                    rounded
                    depressed
                    @click.stop="addCart(item)"
                  >
                    <v-icon dark color="success">mdi-plus-circle</v-icon>
                  </v-btn>
                </span>
                <span style="float:right"></span>
              </v-list-item-subtitle>
            </v-list-item-content>
          </v-list-item>
        </template>
      </v-list>
      <v-card>
        <v-card-text>
          <v-layout wrap>
            <v-flex pa-1 xs6>
              Total Price ({{ totalQuantity }} items)
              <span class="title">Rp. {{ totalPrice }}</span>
            </v-flex>
            <v-flex pa-1 xs6 text-right>
              <v-btn
                color="primary"
                @click="checkout"
                :disabled="totalQuantity == 0"
              >
                <v-icon>mdi-cart-arrow-right</v-icon>&nbsp; Checkout
              </v-btn>
            </v-flex>
          </v-layout>
        </v-card-text>
      </v-card>
    </v-container>
  </v-card>
</template>

<script>
import { mapGetters, mapActions } from "vuex";

export default {
  name: "cart",
  data() {
    return {};
  },
  computed: {
    ...mapGetters({
      carts: "cart/carts",
      countCart: "cart/count",
      totalPrice: "cart/totalPrice",
      totalQuantity: "cart/totalQuantity",
    }),
  },
  methods: {
    ...mapActions({
      setStatusDialog: "dialog/setStatus",
      setAlert: "alert/set",
      addCart: "cart/add",
      removeCart: "cart/remove",
      setCart: "cart/set",
    }),
    checkout() {
      this.$emit("closed", false);
      this.$router.push({ path: "/checkout" });
    },
    close() {
      this.setStatusDialog(false);
    },
  },
};
</script>
