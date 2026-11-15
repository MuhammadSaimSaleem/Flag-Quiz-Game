import { countries, type Country } from "@/data/countries"

export type Question = {
  country: Country
  options: Country[]
}

export function shuffle<T>(items: T[]): T[] {
  const next = [...items]
  for (let i = next.length - 1; i > 0; i -= 1) {
    const j = Math.floor(Math.random() * (i + 1));
    [next[i], next[j]] = [next[j], next[i]]
  }
  return next
}

export function buildQuiz(length: number): Question[] {
  const selected = shuffle(countries).slice(0, Math.min(length, countries.length))

  return selected.map((country) => {
    const distractors = shuffle(
      countries.filter((item) => item.code !== country.code)
    ).slice(0, 5)

    return {
      country,
      options: shuffle([country, ...distractors]),
    }
  })
}

export function flagImageUrl(code: string, width = 640) {
  return `https://flagcdn.com/w${width}/${code}.png`
}
