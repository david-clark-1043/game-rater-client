import { useEffect, useState } from "react"
import { useParams } from "react-router-dom"
import { Link } from "react-router-dom"
import { ImageList } from "../images/ImageList"
import { RatingList } from "../ratings/RatingList"
import { ReviewList } from "../reviews/ReviewList"
import { getSingleGame } from "./GameManager"

export const GameDetails = ({ game, listView, deleteSingleGame }) => {
    const [currentGame, setCurrentGame] = useState({})
    const [loadedJSX, setJSX] = useState(<div></div>)
    const { gameId } = useParams()

    useEffect(
        () => {
            if (!listView && gameId) {
                getSingleGame(gameId)
                    .then(setCurrentGame)
            }
        },
        []
    )

    useEffect(
        () => {
            if ("id" in currentGame) {
                const jsx = <section key={`currentGame--${currentGame.id}`} className="currentGame">
                                <div className="currentGame__title">{currentGame.title} by {currentGame.designer}</div>
                                <div className="currentGame__players">{currentGame.numberOfPlayers} players needed</div>
                                <div className="currentGame__ageRec">Age Recommendation is {currentGame.ageRec}</div>
                                <div className="currentGame__estTimeMinutes">Est play time in minutes is {currentGame.estTimeMinutes}</div>
                                <div className="currentGame__yearReleased">Year released is {currentGame.ageRec}</div>
                                <Link to={`/currentGames/edit/${currentGame.id}`}>Edit</Link>
                                <ReviewList gameId={gameId} currentGame={currentGame} />
                                <RatingList gameId={gameId} currentGame={currentGame} />
                                <ImageList gameId={gameId} currentGame={currentGame} />
                                <hr />
                            </section>
                setJSX(jsx)
            }
        },
        [currentGame]
    )


    return <>
        {
            listView
                ? <section key={`game--${game.id}`} className="game">
                    <div className="game__title">
                        <Link to={`/games/${game.id}`}>
                            {game.title} by {game.designer}
                        </Link>
                    </div>
                    <div className="game__players">{game.numberOfPlayers} players needed</div>
                    <div className="game__ageRec">Age Recommendation is {game.ageRec}</div>
                    <div className="game__estTimeMinutes">Est play time in minutes is {game.estTimeMinutes}</div>
                    <div className="game__yearReleased">Year released is {game.ageRec}</div>
                    <Link to={`/games/edit/${game.id}`}>Edit</Link>
                    <button onClick={() => {
                        deleteSingleGame(game.id)
                    }}>Delete</button>
                    <hr />
                </section>
                : loadedJSX
        }
    </>
}