import { useEffect, useState } from "react"
import { Link } from "react-router-dom"
import { useHistory } from "react-router-dom"
import { useParams } from "react-router-dom"
import { getSingleGame } from "../games/GameManager"
//import "./ImageForm.css"
import { createImage } from "./ImageManager"

export const ImageForm = () => {
    const [imageObj, setImage] = useState({ url: "" })
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
        setImage({
            url: event.target.value
                })
    }
    const submitImage = (event) => {
        return createImage(gameId, imageObj)
            .then(() => {
                history.push(`/games/${gameId}`)
            })
    }

    return <div className="imageForm">
        <label htmlFor="image">
            Submit new image for
            <Link to={`/games/${gameId}`}>
                {`${game.title}`}
            </Link>
            :
        </label>
        <input type="text"
            id="image"
            value={imageObj.url}
            onChange={handleChange}
        />
        <button
            onClick={submitImage}>
            Submit
        </button>
    </div>
}