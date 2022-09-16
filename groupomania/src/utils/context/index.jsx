import { createContext, useState } from "react";


// Récupération de l'id d'un post //
export const IdContext = createContext()

export const IdProvider = ({children}) => {
    const [idPost, setIdPost] = useState('')
    return (
        <IdContext.Provider value={{ idPost, setIdPost }}>
            {children}
        </IdContext.Provider>
    )
}

// Enregistrement du like //
export const LikeContext = createContext()

export const LikeProvider = ({children}) => {
    const [likeOnePost, setLikeOnePost] = useState(1)
    return (
        <LikeContext.Provider value={{likeOnePost, setLikeOnePost}}>
          {children}
        </LikeContext.Provider>
    )
}