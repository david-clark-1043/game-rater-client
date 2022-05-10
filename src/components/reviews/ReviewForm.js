import { useEffect, useState } from "react"
import { Link } from "react-router-dom"
import { useHistory } from "react-router-dom"
import { useParams } from "react-router-dom"
import { getSingleGame } from "../games/GameManager"
import "./ReviewForm.css"
import { createReview } from "./ReviewManager"

export const ReviewForm = () => {
    const [reviewObj, setReview] = useState({review: ""})
    const [game, setGame] = useState({})
    const history = useHistory()
    const { gameId } = useParams()

    useEffect(
        () => {
            getSingleGame(gameId)
                .then(setGame)
        },
        []
    )

    const handleChange = (event) => {
        setReview({
            review: event.target.value
        })
    }
    const submitReview = (event) => {
        return createReview(gameId, reviewObj)
                .then(() => {
                    history.push(`/games/${gameId}`)
                })
    }

    return <div className="reviewForm">
        <label htmlFor="review">
            Submit new review for
            <Link to={`/games/${gameId}`}>
                {`${game.title}`}
            </Link>
            :
        </label>
        <textarea
            id="review"
            value={reviewObj.review}
            onChange={handleChange}
        >
        </textarea>
        <button
            onClick={submitReview}>
            Submit
        </button>
    </div>
}