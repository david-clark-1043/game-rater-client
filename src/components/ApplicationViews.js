import React from "react"
import { Route } from "react-router-dom"
import { GameDetails } from "./games/GameDetails"
import { GameForm } from "./games/GameForm"
import { GameList } from "./games/GameList"
import { ImageForm } from "./images/ImageForm"
import { RatingForm } from "./ratings/RatingForm"
import { ReviewForm } from "./reviews/ReviewForm"
// import { EventForm } from "./event/EventForm"
// import { EventList } from "./event/EventList"
// import { UpdateEvent } from "./event/UpdateEvent"
// import { GameForm } from "./game/GameForm"
// import { UpdateGame } from "./game/UpdateGame"

export const ApplicationViews = () => {
    return <>
        <main style={{
            margin: "5rem 2rem",
            backgroundColor: "lightgoldenrodyellow"
        }}>
            <Route exact path="/">
                <GameList />
            </Route>
            <Route exact path="/games">
                <GameList />
            </Route>
            <Route exact path="/games/:gameId(\d+)">
                <GameDetails listView={false} />
            </Route>
            <Route exact path="/games/:gameId(\d+)/review">
                <ReviewForm />
            </Route>
            <Route exact path="/games/:gameId(\d+)/rating">
                <RatingForm />
            </Route>
            <Route exact path="/games/:gameId(\d+)/image">
                <ImageForm />
            </Route>
            <Route exact path="/games/new">
                <GameForm editing={false} />
            </Route>
            <Route exact path="/games/edit/:gameId(\d+)">
                <GameForm editing={true} />
            </Route>
            {/* 
            <Route exact path="/events">
                <EventList />
            </Route>
            <Route exact path="/events/new">
                <EventForm />
            </Route>
            <Route exact path="/events/edit/:eventId(\d+)">
                <UpdateEvent />
            </Route>
             */}
        </main>
    </>
}
