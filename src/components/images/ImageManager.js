import { fetchIt } from "../utils/Fetch"

export const getImagesForGame = (gameId) => {
    return fetchIt(
        `http://localhost:8000/images?game=${gameId}`,
        {
            "Authorization": `Token ${localStorage.getItem("lu_token")}`
        }
    )
}

export const createImage = (gameId, image) => {
    return fetchIt(
        `http://localhost:8000/images?game=${gameId}`,
        {
            "Authorization": `Token ${localStorage.getItem("lu_token")}`,
        },
        "POST",
        image
    )
}

export const deleteImage = (imageId) => {
    return fetchIt(
        `http://localhost:8000/images/${imageId}`,
        {
            "Authorization": `Token ${localStorage.getItem("lu_token")}`
        },
        "DELETE"
    )
}