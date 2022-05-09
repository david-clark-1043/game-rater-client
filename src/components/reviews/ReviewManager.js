import { fetchIt } from "../utils/Fetch"

export const getReviewsForGame = (gameId) => {
    return fetchIt(
        `http://localhost:8000/reviews?game=${gameId}`,
        {
            "Authorization": `Token ${localStorage.getItem("lu_token")}`
        }
    )
}