import { BASE_URL } from '@/constants/constants'
import type { Character, PaginationInfo } from '@/types/types'

export const fetchCharacters = async (params: Record<string, string> = {}) => {
  let res: { results: Character[]; info: PaginationInfo } = {
    results: [],
    info: { count: 0, next: '', pages: 0, prev: '' },
  }
  const url = new URL(BASE_URL + '/character')
  Object.keys(params).forEach((key) => url.searchParams.append(key, params[key]))
  let err: Error
  try {
    res = await fetch(url).then((data) => data.json())
  } catch (e) {
    err = Error(String(e))
    console.log(err)
  } finally {
    return res
  }
}

export const fetchCharacterById = async (id: number) => {
  let res: Character | null = null
  let err: Error
  try {
    res = await fetch(BASE_URL + '/character/' + id).then((data) => data.json())
  } catch (e) {
    err = Error(String(e))
    console.log(err)
  } finally {
    return res
  }
}
