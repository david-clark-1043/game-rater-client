import React, { useState, useEffect } from "react"
import { useParams } from "react-router-dom"
import { useHistory } from 'react-router-dom'
import { createGame, getCategories, getSingleGame, updateGame } from './GameManager.js'


export const GameForm = ( { editing }) => {
    const history = useHistory()
    const [categories, setCategories] = useState([])
    const { gameId } = useParams()
    /*
        Since the input fields are bound to the values of
        the properties of this state variable, you need to
        provide some default values.
    */
    const [currentGame, setCurrentGame] = useState({
        title: "",
        description: "",
        designer: "",
        yearReleased: 0,
        numberOfPlayers: 0,
        estTimeMinutes: 0,
        ageRec: 0,
        categories: []
    })

    useEffect(() => {
        // TODO: Get the game types, then set the state
        getCategories()
            .then(setCategories)
        if(editing && gameId){
            getSingleGame(gameId)
                .then(gameToEdit => {
                    // gameToEdit["gameTypeId"] = gameToEdit["gameType"]["id"]
                    setCurrentGame(gameToEdit)
                })
        }
    }, [editing, gameId])

    const changeGameState = (domEvent) => {
        // TODO: Complete the onChange function
        const copy = JSON.parse(JSON.stringify(currentGame))
        if(domEvent.target.name === "categories") {
            if(!(domEvent.target.name in copy)) {
                copy["categories"] = []
            }
            let val = parseInt(domEvent.target.id)
            if (domEvent.target.checked) {
                copy[domEvent.target.name].push(categories.find(category => category.id === val))
            } else {
                copy[domEvent.target.name] = copy[domEvent.target.name].filter(category => category.id !== val)
            }
        } else {
            if(domEvent.target.name === "ageRec" ||
                domEvent.target.name === "estTimeMinutes" ||
                domEvent.target.name === "yearReleased" ||
                domEvent.target.name === "numberOfPlayers") {
                copy[domEvent.target.name] = parseInt(domEvent.target.value)
            } else {
                copy[domEvent.target.name] = domEvent.target.value
            }
        }
        setCurrentGame(copy)
    }

    return (
        <form className="gameForm">
            <h2 className="gameForm__title">Register New Game</h2>
            <fieldset>
                <div className="form-group">
                    <label htmlFor="title">Title: </label>
                    <input type="text" name="title" required autoFocus className="form-control"
                        value={currentGame.title}
                        onChange={changeGameState}
                    />
                </div>
            </fieldset>
            <fieldset>
                <div className="form-group">
                    <label htmlFor="description">Description: </label>
                    <textarea type="text" name="description" required className="form-control"
                        value={currentGame.description}
                        onChange={changeGameState}
                    ></textarea>
                </div>
            </fieldset>
            <fieldset>
                <div className="form-group">
                    <label htmlFor="designer">Designer: </label>
                    <input type="text" name="designer" required className="form-control"
                        value={currentGame.designer}
                        onChange={changeGameState}
                    />
                </div>
            </fieldset>
            <fieldset>
                <div className="form-group">
                    <label htmlFor="yearReleased">Year Released: </label>
                    <input type="number" name="yearReleased" required className="form-control"
                        value={currentGame.yearReleased}
                        onChange={changeGameState}
                    />
                </div>
            </fieldset>
            <fieldset>
                <div className="form-group">
                    <label htmlFor="numberOfPlayers">Number of Players: </label>
                    <input type="number" name="numberOfPlayers" required className="form-control"
                        value={currentGame.numberOfPlayers}
                        onChange={changeGameState}
                    />
                </div>
            </fieldset>
            <fieldset>
                <div className="form-group">
                    <label htmlFor="estTimeMinutes">Est. Play Time (minutes): </label>
                    <input type="number" name="estTimeMinutes" required className="form-control"
                        value={currentGame.estTimeMinutes}
                        onChange={changeGameState}
                    />
                </div>
            </fieldset>
            <fieldset>
                <div className="form-group">
                    <label htmlFor="ageRec">Minimum Age Recommendation: </label>
                    <input type="number" name="ageRec" required className="form-control"
                        value={currentGame.ageRec}
                        onChange={changeGameState}
                    />
                </div>
            </fieldset>
            {categories.map(category => {
                // logic to determine whether box should be pre-checked
                let checked_status = false
                if ("categories" in currentGame) {
                    if (currentGame.categories.length > 0) {
                        let found_category = currentGame.categories.find(cat => cat.id === category.id)
                        if (found_category) {
                            checked_status = true
                        } else {
                            checked_status = false
                        }
                    } else {
                        checked_status = false
                    }
                }
                return <div key={`currentGame-categories-${category.id}`} className="checkbox">
                    <input name="categories"
                        type="checkbox"
                        htmlFor="category"
                        id={category.id}
                        onChange={changeGameState}
                        checked={checked_status}
                    />
                    <label htmlFor={category.id}>{category.label}</label>
                </div>
            })
            }

            {/* TODO: create the rest of the input fields */}

            <button type="submit"
                onClick={evt => {
                    // Prevent form from being submitted
                    evt.preventDefault()
                    let categoriesToAdd = []
                    if(currentGame.categories && currentGame.categories.length > 0) {
                        categoriesToAdd = currentGame.categories.map(category => category.id)
                    }
                    const game = {
                        title: currentGame.title,
                        description: currentGame.description,
                        designer: currentGame.designer,
                        numberOfPlayers: parseInt(currentGame.numberOfPlayers),
                        yearReleased: parseInt(currentGame.yearReleased),
                        ageRec: parseInt(currentGame.ageRec),
                        estTimeMinutes: parseInt(currentGame.estTimeMinutes),
                        categories: categoriesToAdd
                    }

                    // Send POST request to your API
                    if(editing) {
                        updateGame(currentGame.id, game)
                            .then(() => history.push("/games"))
                    } else {
                        createGame(game)
                            .then(() => history.push("/games"))
                    }
                }}
                className="btn btn-primary">{editing ? "Update" : "Create"}</button>
        </form>
    )
}