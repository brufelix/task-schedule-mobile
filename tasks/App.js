import React, { Component } from 'react';
import { StyleSheet, Text, View } from 'react-native';
import * as Font from 'expo-font'

export default class App extends Component {
  
  constructor(){
    super()
    this.state={
      fontLoad: false
    }
  }

  async componentDidMount(){
    await Font.loadAsync({
      "font-lato": require("./assets/fonts/Lato.ttf")
    })
    this.setState( {fontLoad: true} )
  }

  render(){
    return (
      <View style={styles.container}>
        <Text style={{fontFamily: 'font-lato'} }>Open up App.js to start working on your app!</Text>
      </View>
    );
  }
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#fff',
    alignItems: 'center',
    justifyContent: 'center',
  },
  welcome:{
    
    fontSize: 20
  }
});
