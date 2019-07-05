import { action, computed, observable } from 'mobx'
import { v4 } from 'uuid'

class Player {
  @observable id
  @observable name
  @observable extra

  constructor(name, extra = false) {
    this.id = v4()
    this.name = name
    this.extra = extra
  }
}

class PlayersList {
  @observable players = [
    new Player('Rohit Sharma', true),
    new Player('Virendra Sehwag'),
    new Player('Sachin Tendulkar'),
    new Player('Sourav Ganguly'),
    new Player('Ramesh Kamble', true),
    new Player('Rahul Dravid'),
    new Player('VVS Laxman'),
    new Player('MS Dhoni'),
    new Player('Mohammad Kaif', true),
    new Player('Lakshimapathy Balaji', true),
    new Player('Yuvraj Singh'),
    new Player('Harbhajan Singh'),
    new Player('Anil Kumble'),
    new Player('Zaheer Khan'),
    new Player('Ashish Nehra'),
    new Player('Virat Kohli', true),
  ]

  @action
  addPlayer(name) {
    const player = new Player(name)
    this.players.push(player)
  }

  @action
  toggleExtra(id) {
    const index = this.players.findIndex(player => player.id === id)
    this.players[index].extra = !this.players[index].extra
  }

  @computed
  get dream11() {
    return this.players.filter(player => !player.extra)
  }

  @computed
  get extras() {
    return this.players.filter(player => player.extra)
  }
}

const store = new PlayersList()

export default store
