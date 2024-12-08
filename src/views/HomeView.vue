<script setup lang="ts">
import { fetchCharacterById, fetchCharacters } from '@/api/fetch'
import type { Character } from '@/types/types'
import { onMounted, ref } from 'vue'
const characters = ref<Character[]>([])
const character = ref<Character | null>(null)
const searchInput = ref('')
const loading = ref(true)
onMounted(async () => {
  loading.value = true
  const params: Record<string, string> = {}
  if (searchInput.value) {
    params.name = searchInput.value
  }
  const fetchRes = await fetchCharacters(params)
  characters.value = fetchRes.results
  loading.value = false
})
const handleInput = async () => {
  loading.value = true
  const params: Record<string, string> = {}
  if (searchInput.value) {
    params.name = searchInput.value
  }
  const fetchRes = await fetchCharacters(params)
  characters.value = fetchRes.results
  loading.value = false
}
const handleClick = async (id: number) => {
  console.log(id)
  const fetchRes = await fetchCharacterById(id)
  character.value = fetchRes
}
const close = () => {
  character.value = null
}
const handleLoad = (e: Event) => {
  if (e.target) {
    const element = e.target as HTMLImageElement
    element.classList.remove('loader')
    element.classList.add('character-image')
  }
}
</script>

<template>
  <main>
    <div>
      <input @input="handleInput" v-model="searchInput" type="text" />
    </div>
    <div class="container">
      <div v-if="!loading" class="characters-container">
        <div
          class="character-card"
          v-for="character in characters"
          :key="character.id"
          @click="handleClick(character.id)"
        >
          <h3>{{ character.name }}</h3>
          <img :src="character.image" :alt="character.name" class="loader" @load="handleLoad" />
        </div>
      </div>
      <div v-if="character" class="character-container">
        <button @click="close">close</button>
        <h2>{{ character.name }}</h2>
        <div>status: {{ character.status }}</div>
        <div>gender: {{ character.gender }}</div>
        <div>origin: {{ character.origin.name }}</div>
        <div>species: {{ character.species }}</div>
        <img :src="character.image" :alt="character.name" />
      </div>
    </div>
  </main>
</template>

<style scoped>
.characters-container {
  margin: 12px 24px;
  display: flex;
  flex-wrap: wrap;
  justify-content: space-between;
  gap: 18px;
  cursor: pointer;
}
.container {
  display: flex;
}
.character-container {
  display: flex;
  flex-direction: column;
  row-gap: 8px;
  padding: 8px 12px;
  border: 1px solid #fff;
}
.loader {
  width: 130px;
  height: 130px;
  border: 5px solid #fff;
  border-bottom-color: transparent;
  border-radius: 50%;
  display: inline-block;
  box-sizing: border-box;
  animation: rotation 1s linear infinite;
}

@keyframes rotation {
  0% {
    transform: rotate(0deg);
  }
  100% {
    transform: rotate(360deg);
  }
}

.character-card {
  padding: 8px 12px;
  border: 1px solid #fff;
  width: 22%;
}
.character-image {
  width: 90%;
}
</style>
