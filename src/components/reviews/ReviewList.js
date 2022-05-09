import { useEffect, useState } from "react"
import { Link } from "react-router-dom"
import { getReviewsForGame } from "./ReviewManager"

export const ReviewList = ({ gameId, currentGame }) => {
    const [reviews, setReviews] = useState([])

    useEffect(
        () => {
            if(currentGame) {
                getReviewsForGame(gameId)
                    .then(setReviews)
            }
        },
        [gameId]
    )

    return <>
        <hr />
        <Link to={`/games/${gameId}/review`}>Submit Review</Link>
        <hr />
        {
            reviews?.map(review => {
                return <div key={`review--${review.id}`} >
                    <div>Review: {review.review}</div>
                    <div>User: {review.gamer.user.username}</div>
                    <hr />
                </div>
            })
        }
    </>
}