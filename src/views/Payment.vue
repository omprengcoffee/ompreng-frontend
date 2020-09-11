<template>
  <div class="payment">
    <v-subheader>Payment Information</v-subheader>
    <v-card flat>
      <v-container v-if="payment">
        <v-simple-table>
          <tr>
            <th>Order ID</th>
            <td>{{ payment.order_id }}</td>
          </tr>
          <tr>
            <th>Invoice Number</th>
            <td>{{ payment.invoice_number }}</td>
          </tr>
          <tr>
            <th>Total Bill</th>
            <td>{{ payment.total_price.toLocaleString("id-ID") }}</td>
          </tr>
        </v-simple-table>
      </v-container>
    </v-card>

    <v-subheader></v-subheader>
    <v-card>
      <v-container>
        <v-layout row wrap>
          <v-flex xs12 text-center>
            <v-btn color="success" @click="finish">Finish</v-btn>
          </v-flex>
        </v-layout>
      </v-container>
    </v-card>
  </div>
</template>

<script>
import { mapGetters, mapActions } from "vuex";
export default {
  computed: {
    ...mapGetters({
      payment: "payment",
    }),
  },
  methods: {
    ...mapActions({
      setCart: "cart/set",
    }),
    finish() {
      this.setCart([]);
      this.$router.push("/");
    },
  },
};
</script>
