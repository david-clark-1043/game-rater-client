import { useEffect, useState } from "react"
import { Link } from "react-router-dom"
import { deleteImage, getImagesForGame } from "./ImageManager"

export const ImageList = ({ gameId, currentGame }) => {
    const [images, setImages] = useState([])
    const gamerId = parseInt(localStorage.getItem("gamerId"))

    const getImages = (gameId) => {
        if(currentGame) {
            getImagesForGame(gameId)
                .then(setImages)
        }
    }

    useEffect(
        () => {
            getImages(gameId)
        },
        [gameId]
    )

    const removeImage = (event) => {
        return deleteImage(event.target.id)
                .then(() => {getImages(gameId)})
    }

    return <>
        <hr />
        <Link to={`/games/${gameId}/image`}>Submit Image</Link>
        <hr />
        {
            images?.map(image => {
                return <div key={`image--${image.id}`} >
                    <div>Image: 
                        <img src={image.url} />
                        </div>
                    <div>User: {image.gamer.user.username}</div>
                    {
                        image.gamer.id === gamerId
                        ? <button
                                id={image.id}
                                onClick={removeImage}>
                            Delete Image
                        </button>
                        : null
                    }
                    <hr />
                </div>
            })
        }
    </>
}