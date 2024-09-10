import { Kanji, QuestResult } from "../types"
import { kanjis as db } from "../data/kanjidb"

export type QuestActions =
    {type: 'generate-quest', payload: {startNumber: number, endNumber: number, buttonClick: string}} |
    {type: 'reveal-kanji'} |
    {type: 'kanji-answer', payload: {answer: string, id: number}} |
    {type: 'handle-review', payload: {kanji: QuestResult}} |
    {type: 'reset-quest'} |
    {type: 'search-from-table', payload: {id: number}} |
    {type: 'filter-search-list', payload: {filter: Kanji[]}}

export type QuestState = {
    kanjiDB: Kanji[]
    kanjiQuest: QuestResult[]
    reviewKanji: QuestResult[]
    current: number
    reveal: boolean
    result: boolean
    questStart: boolean
    good: number
    bad: number
    searchKanji: Kanji
    searchFilter: Kanji[]
}

const initialQuest = () : QuestResult[] => {
    const localStorageKanjiQuest = localStorage.getItem('kanjiQuest')
    return localStorageKanjiQuest ? JSON.parse(localStorageKanjiQuest) : []
}

const initialCurrent = () : number => {
    const localStorageCurrent = localStorage.getItem('current')
    return localStorageCurrent ? JSON.parse(localStorageCurrent) : 0
}

const initialReview = () : QuestResult[] => {
    const localStorageReviewKanji = localStorage.getItem('reviewKanji')
    return localStorageReviewKanji ? JSON.parse(localStorageReviewKanji) : []
}

const initialStart = () : boolean => {
    const localStorageReviewKanji = localStorage.getItem('questStart')
    return localStorageReviewKanji ? JSON.parse(localStorageReviewKanji) : false
}

const initialSearchKanji = db[Math.floor(Math.random() * db.length)]

export const initialState : QuestState = {
    kanjiDB: db,
    kanjiQuest: initialQuest(), 
    reviewKanji: initialReview(),
    current: initialCurrent(),
    reveal: false,
    result: false,
    questStart: initialStart(),
    good: 0,
    bad: 0,
    searchKanji: initialSearchKanji,
    searchFilter: db
}

export const questReducer = (
    state: QuestState = initialState,
    action: QuestActions
) => {
    
    if(action.type === 'generate-quest'){
        let newKanji : QuestResult[] = []

        if(action.payload.buttonClick === "reviewQuest"){
            newKanji = [...state.reviewKanji]
        }else{  
            for(let i = action.payload.startNumber-1; i < action.payload.endNumber; i++){
                newKanji = [...newKanji, {...initialState.kanjiDB[i], answer : ''}]
            }
        }
        
        return {
            ...state,
            kanjiQuest: [...newKanji],
            questStart: true
        }       
    }
    if(action.type === 'reveal-kanji'){
        return {
            ...state,
            reveal: true
        }
    }
    if(action.type === 'kanji-answer'){
        const updatedKanjiQuest = [...state.kanjiQuest]
        updatedKanjiQuest[action.payload.id].answer = action.payload.answer
        const exist = state.reviewKanji.findIndex(k => k.id === updatedKanjiQuest[action.payload.id].id)
        if(updatedKanjiQuest[action.payload.id].answer === 'bad'){
            if(exist >= 0){//SI EXISTE NO LO AGREGA A LA LISTA DE REPASO
                return {
                    ...state,
                    kanjiQuest: updatedKanjiQuest,
                    current: state.current + 1,
                    bad: state.bad + 1,
                    reveal: false
                }
            }else{
                return {
                    ...state,
                    kanjiQuest: updatedKanjiQuest,
                    current: state.current + 1,
                    bad: state.bad + 1,
                    reveal: false,
                    reviewKanji: [...state.reviewKanji, updatedKanjiQuest[action.payload.id]]
                }
            }
            
        }else if(updatedKanjiQuest[action.payload.id].answer === 'good'){
            if(exist >= 0){//SI EXISTE LO QUITA DE LA LISTA DE REPASO
                return {
                    ...state,
                    kanjiQuest: updatedKanjiQuest,
                    current: state.current + 1,
                    good: state.good + 1,
                    reveal: false,
                    reviewKanji: state.reviewKanji.filter(rev => rev.id !== updatedKanjiQuest[action.payload.id].id)
                }
            }else{
                return {
                    ...state,
                    kanjiQuest: updatedKanjiQuest,
                    current: state.current + 1,
                    good: state.good + 1,
                    reveal: false
                }
            }   
        }        
    }
    if(action.type === 'handle-review'){
        const actionIndex = (action.payload.kanji.id - 1)
        if(action.payload.kanji.answer === 'good'){
            return {
                ...state,
                kanjiQuest: state.kanjiQuest.map((kanji, index) =>
                    index === actionIndex ? { ...kanji, answer: 'bad' } : kanji),
                reviewKanji: [...state.reviewKanji, action.payload.kanji]
            }
        }else{
            return {
                ...state,
                kanjiQuest: state.kanjiQuest.map((kanji, index) =>
                    index === actionIndex ? { ...kanji, answer: 'good' } : kanji),
                reviewKanji: state.reviewKanji.filter(rev => rev.id !== action.payload.kanji.id)
            }
        }
    }
    if(action.type === 'reset-quest'){
        return {
            ...state,
            kanjiQuest: [],
            current: 0,
            good: 0,
            bad: 0,
            reveal: false,
            result:false,
            questStart: false
        }
    }
    if(action.type === 'search-from-table'){
        const saveKanji = db.find(kanji => (kanji.id === action.payload.id))
        return {
            ...state,
            searchKanji: saveKanji!
        }
    }
    if(action.type === 'filter-search-list'){
        return {
            ...state,
            searchFilter: action.payload.filter
        }
    }
    
    return state
}