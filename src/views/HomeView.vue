<script setup lang="ts">
import { fetchCharacterById, fetchCharacters } from '@/api/fetch'
import type { Character } from '@/types/types'
import { onMounted, ref } from 'vue'
const characters = ref<Character[]>([])
const character = ref<Character | null>(null)
const searchInput = ref('')
onMounted(async () => {
  const params: Record<string, string> = {}
  if (searchInput.value) {
    params.name = searchInput.value
  }
  const fetchRes = await fetchCharacters(params)
  characters.value = fetchRes.results
})
const handleInput = async () => {
  const params: Record<string, string> = {}
  if (searchInput.value) {
    params.name = searchInput.value
  }
  const fetchRes = await fetchCharacters(params)
  characters.value = fetchRes.results
}
const handleClick = async (id: number) => {
  console.log(id)
  const fetchRes = await fetchCharacterById(id)
  character.value = fetchRes
}
const close = () => {
  character.value = null
}
</script>

<template>
  <main>
    <div>
      <input @input="handleInput" :value="searchInput" type="text" />
    </div>
    <div class="container">
      <div class="characters-container">
        <div v-for="character in characters" :key="character.id" @click="handleClick(character.id)">
          <h3>{{ character.name }}</h3>
          <img :src="character.image" :alt="character.name" />
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
  gap: 12px;
  cursor: pointer;
}
.container {
  display: flex;
}
.character-container {
  display: flex;
  flex-direction: column;
  row-gap: 8px;
}
</style>
