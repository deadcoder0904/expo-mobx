import { action, computed, observable } from 'mobx'
import { v4 } from 'uuid'

class Player {
  @observable id
  @observable name
  @observable extras

  constructor(name, extras = false) {
    this.id = v4()
    this.name = name
    this.extras = extras
  }
}

class PlayersList {
  @observable players = [
    new Player('Virendra Sehwag'),
    new Player('Sachin Tendulkar'),
    new Player('Sourav Ganguly'),
    new Player('Rahul Dravid'),
    new Player('VVS Laxman'),
    new Player('MS Dhoni'),
    new Player('Mohammad Kaif'),
    new Player('Yuvraj Singh'),
    new Player('Harbhajan Singh'),
    new Player('Anil Kumble'),
    new Player('Zaheer Khan'),
    new Player('Ashish Nehra'),
    new Player('Lakshimapathy Balaji'),
    new Player('Ramesh Kamble'),
    new Player('Virat Kohli'),
    new Player('Rohit Sharma'),
  ]

  @action
  addPlayer(name) {
    const player = new Player(name)
    this.players.push(player)
  }

  @action
  toggleExtra(id) {
    const index = this.players.findIndex(player => player.id === id)
    this.players[index].extras = !this.players[index].extras
  }

  @computed
  get dream11() {
    return this.players.filter(player => !player.extras)
  }

  @computed
  get extras() {
    return this.players.filter(player => player.extras)
  }
}

const store = new PlayersList()

export default store
