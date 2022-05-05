import { fetchIt } from "../utils/Fetch"

export const getGames = () => {
    return fetchIt("http://localhost:8000/games",
    {
        "Authorization": "Token f524620aa4933b783f714e54b583520be9e215e3"
    })
}

export const getSingleGame = (id) => {
    return fetchIt(
        `http://localhost:8000/games/${id}`,
        {
            "Authorization": `Token ${localStorage.getItem("lu_token")}`
        }
    )
}

export const createGame = (game) => {
    return fetchIt(
        "http://localhost:8000/games",
        {
            "Authorization": `Token ${localStorage.getItem("lu_token")}`,
        },
        "POST",
        game
    )
}

export const getCategories = () => {
    return fetchIt(
        "http://localhost:8000/categories",
        {
            "Authorization": `Token ${localStorage.getItem("lu_token")}`
        }
    )
}

export const updateGame = (id, game) => {
    return fetchIt(
        `http://localhost:8000/games/${id}`,
        {
            "Authorization": `Token ${localStorage.getItem("lu_token")}`,
        },
        "PUT",
        game
    )
}

export const deleteGame = (gameId) => {
    return fetchIt(
        `http://localhost:8000/games/${gameId}`,
        {
            "Authorization": `Token ${localStorage.getItem("lu_token")}`
        },
        "DELETE"
    )
}