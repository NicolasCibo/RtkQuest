export type Kanji = {
    id: number
    kanji: string
    keyword: string
    components: string
    strokes: number
    lesson: number
}

export type QuestResult = Kanji & {
    answer: string
}