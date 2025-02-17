<template>
  <div class="upload-container">
    <label class="upload-button">
      <span>Resim Yükle</span>
      <input type="file" hidden @change="upload" accept="image/*">
    </label>
  </div>
</template>

<script>
import axios from 'axios';

export default {
  name: 'ImageUpload',
  emits: ['uploaded'],
  
  setup(_, { emit }) {
    const upload = async (e) => {
      const file = e.target.files[0];
      if (!file) return;

      const formData = new FormData();
      formData.append('image', file);

      try {
        const { data } = await axios.post('upload', formData);
        emit('uploaded', data.url);
      } catch (error) {
        console.error('Upload hatası:', error);
      }
    };

    return { upload };
  }
}
</script>

<style scoped>
.upload-container {
  display: flex;
  justify-content: flex-end;
  padding: 10px;
}

.upload-button {
  display: inline-flex;
  padding: 8px 16px;
  background-color: #4a90e2;
  color: white;
  border-radius: 4px;
  cursor: pointer;
}

.upload-button:hover {
  background-color: #357abd;
}
</style>