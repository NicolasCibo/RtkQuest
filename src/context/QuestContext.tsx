import { createContext, Dispatch, ReactNode, useReducer } from "react"
import { initialState, QuestActions, questReducer, QuestState } from "../reducers/quest-reducer"

type QuestContextProps = {
    state: QuestState
    dispatch: Dispatch<QuestActions>
}

type QuestProviderProps = {
    children: ReactNode
}

export const QuestContext = createContext<QuestContextProps>(null!)

export const QuestProvider = ({children} : QuestProviderProps) => {
    const [state, dispatch] = useReducer(questReducer, initialState)

    return (
        <QuestContext.Provider
            value={{
                state,
                dispatch
            }}
        >
            {children}
        </QuestContext.Provider>
    )
}