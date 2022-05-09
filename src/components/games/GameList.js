import { useEffect, useState } from "react"
import { Link } from "react-router-dom"
import { useHistory } from "react-router-dom"
import { deleteGame, getGames } from "./GameManager"
import { GameDetails } from "./GameDetails"

export const GameList = () => {
    const [games, setGames] = useState([])
    const history = useHistory()

    const getAllGames = () => {
        return getGames()
            .then((gamesData) => {
                setGames(gamesData)
            })
    }

    const deleteSingleGame = (gameId) => {
        return deleteGame(gameId)
            .then(() => getGames())
            .then(data => setGames(data))
    }

    useEffect(
        () => {
            getAllGames()
        },
        []
    )
    return <>
        <button className="btn btn-2 btn-sep icon-create"
            onClick={() => {
                history.push({ pathname: "/games/new" })
            }}
        >Register New Game</button>
        {
            games.map(game => {
                return <>
                    <GameDetails listView={true} game={game} deleteSingleGame={deleteSingleGame} />
                </>
            })
        }
    </>
}