import { observable } from 'mobx'
import { inject, observer, Provider } from 'mobx-react'
import React from 'react'
import { SafeAreaView, ScrollView, StatusBar } from 'react-native'
import {
  Button,
  ButtonGroup,
  Input,
  ListItem,
  Text,
} from 'react-native-elements'
import playerStore from './store/player'

const gray = {
  500: '#A0AEC0',
  700: '#4A5568',
  800: '#2D3748',
}

@inject('playerStore')
@observer
class App extends React.Component {
  @observable playerName = ''
  @observable routeIndex = 0

  render() {
    const { playerStore } = this.props
    const playersList =
      this.routeIndex === 0 ? playerStore.dream11 : playerStore.extras
    return (
      <ScrollView>
        <SafeAreaView
          style={{
            flex: 1,
            margin: 30,
          }}
        >
          <StatusBar hidden />
          <Text h2 style={{ color: gray[700], textAlign: 'center' }}>
            Dream 11
          </Text>
          <Input
            placeholder="Player Name..."
            value={this.playerName}
            onChangeText={name => {
              this.playerName = name
            }}
          />
          <Button
            title="Add Player"
            raised
            buttonStyle={{ backgroundColor: gray[800] }}
            containerStyle={{ margin: 10 }}
            onPress={() => {
              if (this.playerName.trim() !== '') {
                playerStore.addPlayer(this.playerName)
                this.playerName = ''
              }
            }}
          />
          <ButtonGroup
            onPress={i => {
              this.routeIndex = i
            }}
            selectedButtonStyle={{ backgroundColor: gray[500] }}
            selectedIndex={this.routeIndex}
            buttons={['Playing 11', 'Extras']}
          />
          {playersList.map(player => (
            <ListItem
              key={player.id}
              title={player.name}
              titleStyle={{
                fontWeight: player.extra ? '300' : '500',
                color: player.extra ? gray[500] : gray[800],
                textDecorationLine: player.extra ? 'line-through' : 'none',
                textDecorationStyle: 'solid',
              }}
              onPress={() => {
                playerStore.toggleExtra(player.id)
              }}
            />
          ))}
        </SafeAreaView>
      </ScrollView>
    )
  }
}

const AppWrapper = () => (
  <Provider playerStore={playerStore}>
    <App />
  </Provider>
)

export default AppWrapper
