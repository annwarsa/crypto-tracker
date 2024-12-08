<template>
  <ion-page>
    <!-- Header -->
    <ion-header>
      <ion-toolbar color="primary">
        <ion-title>Crypto Prices</ion-title>
        <ion-buttons slot="end">
          <ion-button @click="fetchCryptoData">
            <ion-icon :icon="refreshOutline" />
          </ion-button>
        </ion-buttons>
      </ion-toolbar>
    </ion-header>

    <!-- Content -->
    <ion-content>
      <ion-list v-if="cryptoData.length > 0">
        <ion-item v-for="crypto in cryptoData" :key="crypto.id">
          <ion-avatar slot="start" color="secondary">
            <ion-label>{{ crypto.rank }}</ion-label>
          </ion-avatar>
          <ion-label>
            <h2>{{ crypto.name }} ({{ crypto.symbol }})</h2>
            <p>Price: ${{ parseFloat(crypto.price_usd).toFixed(2) }}</p>
          </ion-label>
        </ion-item>
      </ion-list>

      <!-- Loading Indicator -->
      <ion-spinner v-else></ion-spinner>
    </ion-content>
  </ion-page>
</template>

<script setup lang="ts">
import { ref, onMounted } from 'vue';
import axios from 'axios';
import {
  IonPage,
  IonHeader,
  IonToolbar,
  IonTitle,
  IonContent,
  IonList,
  IonItem,
  IonLabel,
  IonAvatar,
  IonButtons,
  IonButton,
  IonIcon,
  IonSpinner,
} from '@ionic/vue';
import { refreshOutline } from 'ionicons/icons';

// Data state untuk menyimpan hasil API
const cryptoData = ref<any[]>([]);

// Fungsi mengambil data dari API
const fetchCryptoData = async () => {
  try {
    const response = await axios.get('https://api.coinlore.net/api/tickers/');
    cryptoData.value = response.data.data; // Ambil data dari response
  } catch (error) {
    console.error('Error fetching data:', error);
  }
};

// Panggil API saat komponen dimuat
onMounted(() => {
  fetchCryptoData();
});
</script>
