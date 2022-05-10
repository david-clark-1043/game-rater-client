import { useEffect, useState } from "react"
import { Link } from "react-router-dom"
import { useHistory } from "react-router-dom"
import { useParams } from "react-router-dom"
import { getSingleGame } from "../games/GameManager"
//import "./RatingForm.css"
import { createRating } from "./RatingManager"

export const RatingForm = () => {
    const [ratingObj, setRating] = useState({ rating: 0 })
    const [game, setGame] = useState({})
    const history = useHistory()
    const ratingArray = Array.from({ length: 5 }, (_, i) => i + 1)
    const { gameId } = useParams()

    useEffect(
        () => {
            getSingleGame(gameId)
                .then(setGame)
        },
        []
    )

    const handleChange = (event) => {
        setRating({
            rating: parseInt(event.target.id)
                })
    }
    const submitRating = (event) => {
        return createRating(gameId, ratingObj)
            .then(() => {
                history.push(`/games/${gameId}`)
            })
    }

    return <div className="ratingForm">
        <label htmlFor="rating">
            Submit new rating for
            <Link to={`/games/${gameId}`}>
                {`${game.title}`}
            </Link>
            :
        </label>
        {
            ratingArray.map(ratingNumber => {
                return <div key={`rating--${ratingNumber}`}>
                    <input type="radio"
                    name="rating"
                    id={ratingNumber}
                    onChange={handleChange}
                    />
                    {ratingNumber}
                </div>
            })
        }
        <button
            onClick={submitRating}>
            Submit
        </button>
    </div>
}