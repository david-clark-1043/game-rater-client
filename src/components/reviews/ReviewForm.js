import { useEffect, useState } from "react"
import { useParams } from "react-router-dom"
import { getSingleGame } from "../games/GameManager"
import "./ReviewForm.css"

export const ReviewForm = () => {
    const [review, setReview] = useState("")
    const [game, setGame] = useState({})
    const { gameId } = useParams()

    useEffect(
        () => {
            getSingleGame(gameId)
                .then(setGame)
        },
        []
    )

    const handleChange = (event) => {
        setReview(event.target.value)
    }
    const submitReview = (event) => {
        return ""
    }

    return <div class="reviewForm">
        <label htmlFor="review">Submit new review for {`${game.title}`}:</label>
        <textarea   
                id="review"
                onChange={handleChange}
                >            
        </textarea>
        <button
            onClick={submitReview}>
            Submit
        </button>
        </div>
}