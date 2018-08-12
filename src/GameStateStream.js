import {
    GameState, getLevel, getLevelIndex, getIsPaused, getIsMenu, getIsCompleted
} from "./GameState";
import { Subject, of, merge } from "rxjs";
import {
    scan, level, map, filter, tap, share, distinct, skip, distinctUntilChanged
} from "rxjs/operators";
import { not, is, compose } from "ramda";

export const gameStateStream = new Subject().pipe(
    scan((gameState, f) => f(gameState), GameState),
    share()
);

const initialGameState = merge(gameStateStream, of(GameState));

export const onStartLevel = initialGameState.pipe(
    distinct(getLevelIndex),
    skip(1)
);

export const onPause = initialGameState.pipe(
    filter(getIsPaused),
    distinct(getIsPaused)
);

export const onResume = initialGameState.pipe(
    filter(compose(not, getIsPaused)),
    distinct(compose(not, getIsPaused)),
    skip(1)
);

export const onReturnToMenu = initialGameState.pipe(
    distinct(getIsMenu),
    skip(1)
);

export const onGameComplete = initialGameState.pipe(
    distinct(getIsCompleted)
);
