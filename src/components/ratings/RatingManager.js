import { fetchIt } from "../utils/Fetch"

export const getRatingsForGame = (gameId) => {
    return fetchIt(
        `http://localhost:8000/ratings?game=${gameId}`,
        {
            "Authorization": `Token ${localStorage.getItem("lu_token")}`
        }
    )
}

export const createRating = (gameId, rating) => {
    return fetchIt(
        `http://localhost:8000/ratings?game=${gameId}`,
        {
            "Authorization": `Token ${localStorage.getItem("lu_token")}`,
        },
        "POST",
        rating
    )
}

export const deleteRating = (ratingId) => {
    return fetchIt(
        `http://localhost:8000/ratings/${ratingId}`,
        {
            "Authorization": `Token ${localStorage.getItem("lu_token")}`
        },
        "DELETE"
    )
}