import { useEffect, useState } from "react"
import { Link } from "react-router-dom"
import { deleteRating, getRatingsForGame } from "./RatingManager"

export const RatingList = ({ gameId, currentGame }) => {
    const [ratings, setRatings] = useState([])
    const gamerId = parseInt(localStorage.getItem("gamerId"))

    const getRatings = (gameId) => {
        if(currentGame) {
            getRatingsForGame(gameId)
                .then(setRatings)
        }
    }

    useEffect(
        () => {
            getRatings(gameId)
        },
        [gameId]
    )

    const removeRating = (event) => {
        return deleteRating(event.target.id)
                .then(() => {getRatings(gameId)})
    }

    return <>
        <hr />
        <Link to={`/games/${gameId}/rating`}>Submit Rating</Link>
        <hr />
        <div>
            Average Rating: {currentGame.averageRating}
        </div>
        {/* {
            ratings?.map(rating => {
                return <div key={`rating--${rating.id}`} >
                    <div>Rating: {rating.rating}</div>
                    <div>User: {rating.gamer.user.username}</div>
                    {
                        rating.gamer.id === gamerId
                        ? <button
                                id={rating.id}
                                onClick={removeRating}>
                            Delete Rating
                        </button>
                        : null
                    }
                    <hr />
                </div>
            })
        } */}
    </>
}