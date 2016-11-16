# react-native-modal-alert
> transform from [rn-animate-alert](https://github.com/parkerdan/rn-animate-alert)

---
RN官方提供的兼容Android与IOS的Alert组件，样式定制化程度太低，难以满足大部分的需求
这里提供的一个仿照AlertIOS的组件，基于[rn-animate-alert](https://github.com/parkerdan/rn-animate-alert)进行了一番改造，
最终的样式近乎于AlertIOS。

感谢[parkerdan](https://github.com/parkerdan]提供的(rn-animate-alert)[https://github.com/parkerdan/rn-animate-alert)组件

---



`npm install --save https://github.com/accforgit/react-native-modal-alert.git`
<br>

![showpicture](https://github.com/accforgit/react-native-modal-alert/blob/master/showPic.png)

- Will not animate unless you specify what direction.

`springFromTop={true}` or `springFromBottom={true}`

#### Just copy the example and you'll see

```js
import React, { Component } from 'react';
import { View, TouchableOpacity, AppRegistry, Text } from 'react-native';
import Alert from 'rn-animate-alert';

export default class Example extends Component {

  constructor(){
    super();
    this.state={
      renderAlert: false
    }
  };



  render(){
    return(
      <View style={{
        flex:1,
        alignItems:'center',
        justifyContent:'center',
        backgroundColor:'deeppink'
      }}>
        <Text style={{color:'white',fontSize:30, textAlign:'center'}}>I am a React-Native Component</Text>
        <TouchableOpacity
          onPress={
            () => this.setState({renderAlert:true})
          }
          style={{
            borderRadius:5,
            padding:20,
            alignItems:'center',
            backgroundColor:'aqua'
          }}>
          <Text>Press Me!</Text>
        </TouchableOpacity>
        {this.renderAlert()}
      </View>
    )
  };

  renderAlert(){
    if (this.state.renderAlert) {
      return(
        <Alert
          title={'I\'m an alert and I animated in!!'}
          detailText={'Watch me animate out too!!'}

          springFromBottom={true}

          onConfirm={
            () => {
              console.log('do stuff');
              this.setState({renderAlert:false})
            }
          }
          onCancel={
            () => {
              console.log('Do other stuff');
              this.setState({renderAlert:false})
            }
          }/>
      )
    }
  };

};

AppRegistry.registerComponent('Example', () => Example);
```

### There's a shit ton of props available to style this thing HOWEVER YOU WANT

##### Available props

```js
onConfirm: React.PropTypes.func.isRequired,
onCancel: React.PropTypes.func.isRequired,

title: React.PropTypes.string.isRequired,
titleTextStyle: React.PropTypes.oneOfType([React.PropTypes.number,React.PropTypes.object,React.PropTypes.array]),

detailText: React.PropTypes.string,
detailTextStyle: React.PropTypes.oneOfType([React.PropTypes.number,React.PropTypes.object,React.PropTypes.array]),

confirmText: React.PropTypes.string,
confirmTextStyle:React.PropTypes.oneOfType([React.PropTypes.number,React.PropTypes.object,React.PropTypes.array]),
confirmButtonStyle:React.PropTypes.oneOfType([React.PropTypes.number,React.PropTypes.object,React.PropTypes.array]),

cancelText: React.PropTypes.string,
cancelTextStyle: React.PropTypes.oneOfType([React.PropTypes.number,React.PropTypes.object,React.PropTypes.array]),
cancelButtonStyle:React.PropTypes.oneOfType([React.PropTypes.number,React.PropTypes.object,React.PropTypes.array]),

backgroundColor: React.PropTypes.string,

containerStyle: React.PropTypes.oneOfType([React.PropTypes.number,React.PropTypes.object,React.PropTypes.array]),

springFromBottom: React.PropTypes.bool,
springFromTop: React.PropTypes.bool,

zIndex: React.PropTypes.number,
```
