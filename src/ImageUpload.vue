<template>
  <div>
    <input type="file" @change="handleFileChange('image1', $event)" />
    <input type="file" @change="handleFileChange('image2', $event)" />
    <button @click="handleBlend">Blend Images</button>
    <img v-if="blendedImage" :src="blendedImage" alt="Blended" />
  </div>
</template>

<script>
import axios from 'axios';

export default {
  data() {
    return {
      image1: null,
      image2: null,
      blendedImage: null
    };
  },
  methods: {
    handleFileChange(name, event) {
      this[name] = event.target.files[0];
    },
    async handleBlend() {
      const formData = new FormData();
      formData.append('image1', this.image1);
      formData.append('image2', this.image2);

      try {
        const response = await axios.post('/api/blend', formData, {
          headers: { 'Content-Type': 'multipart/form-data' }
        });
        this.blendedImage = `/uploads/${response.data.blendedImage}`;
      } catch (error) {
        console.error('Error blending images:', error);
      }
    }
  }
};
</script>
