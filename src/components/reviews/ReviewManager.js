import { fetchIt } from "../utils/Fetch"

export const getReviewsForGame = (gameId) => {
    return fetchIt(
        `http://localhost:8000/reviews?game=${gameId}`,
        {
            "Authorization": `Token ${localStorage.getItem("lu_token")}`
        }
    )
}

export const createReview = (gameId, review) => {
    return fetchIt(
        `http://localhost:8000/reviews?game=${gameId}`,
        {
            "Authorization": `Token ${localStorage.getItem("lu_token")}`,
        },
        "POST",
        review
    )
}

export const deleteReview = (reviewId) => {
    return fetchIt(
        `http://localhost:8000/reviews/${reviewId}`,
        {
            "Authorization": `Token ${localStorage.getItem("lu_token")}`
        },
        "DELETE"
    )
}