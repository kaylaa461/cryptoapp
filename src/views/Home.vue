<template>
  <ion-page>
    <ion-header translucent>
      <ion-toolbar>
        <ion-title>Crypto Tickers</ion-title>
      </ion-toolbar>
    </ion-header>

    <ion-content>
      <ion-list v-if="coins.length > 0">
        <ion-item v-for="coin in coins" :key="coin.id">
          <ion-label>
            <h2>{{ coin.name }} ({{ coin.symbol }})</h2>
            <p>Rank: {{ coin.rank }}</p>
          </ion-label>
          <ion-note slot="end">
            ${{ formatPrice(coin.price_usd) }}
          </ion-note>
        </ion-item>
      </ion-list>

      <div v-if="loading" class="ion-text-center" style="margin-top: 20px">
        <ion-spinner name="crescent"></ion-spinner>
      </div>

      <div v-if="error" class="ion-text-center" style="margin-top: 20px">
        <p>{{ error }}</p>
        <ion-button @click="loadData">Retry</ion-button>
      </div>
    </ion-content>
  </ion-page>
</template>

<script lang="ts">
import { defineComponent, ref } from "vue";
import { getCryptoData } from "../services/api";
import {
  IonPage,
  IonHeader,
  IonToolbar,
  IonContent,
  IonTitle,
  IonList,
  IonItem,
  IonLabel,
  IonNote,
  IonSpinner,
  IonButton
} from "@ionic/vue";

export default defineComponent({
  components: {
    IonPage,
    IonHeader,
    IonToolbar,
    IonContent,
    IonTitle,
    IonList,
    IonItem,
    IonLabel,
    IonNote,
    IonSpinner,
    IonButton
  },

  setup() {
    const coins = ref<any[]>([]);
    const loading = ref(true);
    const error = ref<string | null>(null);

    const loadData = async () => {
      loading.value = true;
      error.value = null;

      const data = await getCryptoData();

      if (!data || data.length === 0) {
        error.value = "API gagal load data!";
      } else {
        coins.value = data;
      }

      loading.value = false;
    };

    const formatPrice = (p: any) => {
      const n = parseFloat(p);
      if (isNaN(n)) return p;
      return n.toLocaleString("en-US", {
        minimumFractionDigits: 2,
        maximumFractionDigits: 6,
      });
    };

    loadData();

    return { coins, loading, error, loadData, formatPrice };
  }
});
</script>
