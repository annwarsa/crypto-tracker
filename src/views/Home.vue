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
      <!-- Refresh Button -->
      <div class="refresh-container">
        <ion-button expand="block" @click="fetchCryptoData" color="tertiary">
          Refresh
        </ion-button>
      </div>

      <!-- Crypto List -->
      <div class="crypto-container">
        <div v-for="crypto in cryptoData" :key="crypto.id" class="crypto-item">
          <!-- Row 1 -->
          <div class="crypto-header">
            <span class="rank-label">Rank</span>
            <span class="symbol">{{ crypto.symbol }}</span>
            <span class="usd-label">USD</span>
          </div>

          <!-- Row 2 -->
          <div class="crypto-details">
            <span class="rank-value">{{ crypto.rank }}</span>
            <span class="name">{{ crypto.name }}</span>
            <span class="price">{{ parseFloat(crypto.price_usd).toFixed(2) }}</span>
          </div>
        </div>
      </div>

      <!-- Loading Indicator -->
      <div v-if="cryptoData.length === 0" class="loading-container">
        <ion-spinner name="crescent"></ion-spinner>
      </div>
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
  IonButton,
  IonButtons,
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

<style scoped>
/* Layout Styling */
.refresh-container {
  display: flex;
  justify-content: center;
  margin: 10px 0;
}

.crypto-container {
  display: flex;
  flex-direction: column;
  margin: 10px;
}

.crypto-item {
  display: flex;
  flex-direction: column;
  padding: 10px;
  background-color: #fdf5d4;
  border: 1px solid #e3d9a7;
  font-family: Arial, sans-serif;
}

.crypto-header,
.crypto-details {
  display: flex;
  justify-content: space-between;
  font-weight: bold;
}

.crypto-header {
  font-size: 0.9em;
  color: #555;
}

.crypto-details {
  font-size: 1.1em;
  margin-top: 5px;
  color: #000;
}

.rank-label,
.usd-label {
  flex: 1;
  text-align: left;
}

.symbol {
  flex: 1;
  text-align: left;
}

.rank-value,
.price {
  flex: 1;
  text-align: left;
}

.name {
  flex: 1;
  text-align: left;
}
</style>
