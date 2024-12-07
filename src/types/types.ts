export interface Origin {
  name: string
  url: string
}

export interface Location {
  name: string
  url: string
}

export interface Character {
  id: number
  name: string
  status: 'Alive' | 'Dead' | 'unknown'
  species: string
  type: string
  gender: 'Female' | 'Male' | 'Genderless' | 'unknown'
  origin: Origin
  location: Location
  image: string // URL
  episode: string[] // Array of URLs
  url: string // URL
  created: string // ISO date string
}

export interface PaginationInfo {
  count: number
  pages: number
  next: string | null // URL или null
  prev: string | null // URL или null
}
