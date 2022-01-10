import {gql} from '@apollo/client'
import {IGameBase} from '../../../models/game'

export const FETCH_GAME = gql`
query MyQuery($id: Int) {
  handf_game(where: {gameid: {_eq: $id}}) {
    gameid
    gamename
    gamerules
    gamestate
  }
}
`

export interface IFetchGame {
  gameid: number
  gamename: string
  gamerules: IGameBase
}

export const FETCH_GAMES_FILTERED = gql`
query MyQuery($states: [String!]) {
  handf_game(where: {gamestate: {_in: $states}}) {
    gameid
    gamename
    gamestate
    numberOfPlayers: gamerules(path: "$.numberOfPlayers")
    game_players {
      player_id
      player_name
      position
    }
  }
}
`

export const FETCH_GAMES_ALL = gql`
query MyQuery {
  handf_game(where: {}) {
    gameid
    gamename
    gamestate
    numberOfPlayers: gamerules(path: "$.numberOfPlayers")
    game_players {
      player_id
      player_name
      position
    }
  }
}
`

export interface IFetchGames {
  gameid: number
  gamename: string
  numberOfPlayers: number
}

export const TRUNCATE = gql`
mutation delete_all_games($play: json, $rules: json, $players: json) {
  delete_handf_game(where: {}) {
    affected_rows
  }
  delete_handf_game_log(where: {}) {
    affected_rows
  }
  insert_handf_game(objects: {
    gamename: "Test Game",
    gameplay: $play,
    gamerules: $rules,
    gamestate: "waitingToStart",
    players: $players
  },  
  ) {
    affected_rows
    returning {
      gameid
    }
  }
}
`

export const UPDATE_GAME = gql`
mutation update_game($id: Int, $name: String!, $rules: json) {
  update_handf_game(where: {gameid: {_eq: $id}}, _set: {gamename: $name, gamerules: $rules}) {
    affected_rows
  }
}
`

export const CREATE_GAME = gql`
mutation create_game($name: String!, $play: json, $rules: json, $state: String) {
  insert_handf_game(objects: {gamename: $name, gameplay: $play, gamerules: $rules, gamestate: $state}) {
    affected_rows
  }
}
`
