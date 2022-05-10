import { useEffect, useState } from "react"
import { Link } from "react-router-dom"
import { deleteReview, getReviewsForGame } from "./ReviewManager"

export const ReviewList = ({ gameId, currentGame }) => {
    const [reviews, setReviews] = useState([])
    const gamerId = parseInt(localStorage.getItem("gamerId"))

    const getReviews = (gameId) => {
        if(currentGame) {
            getReviewsForGame(gameId)
                .then(setReviews)
        }
    }

    useEffect(
        () => {
            getReviews(gameId)
        },
        [gameId]
    )

    const removeReview = (event) => {
        return deleteReview(event.target.id)
                .then(() => {getReviews(gameId)})
    }

    return <>
        <hr />
        <Link to={`/games/${gameId}/review`}>Submit Review</Link>
        <hr />
        {
            reviews?.map(review => {
                return <div key={`review--${review.id}`} >
                    <div>Review: {review.review}</div>
                    <div>User: {review.gamer.user.username}</div>
                    {
                        review.gamer.id === gamerId
                        ? <button
                                id={review.id}
                                onClick={removeReview}>
                            Delete Review
                        </button>
                        : null
                    }
                    <hr />
                </div>
            })
        }
    </>
}