'use strict'

import React, { Component } from 'react';
import PropTypes from 'prop-types'
import {
View,
Dimensions,
Text,
TouchableOpacity,
Animated,
Easing,
TextInput
} from 'react-native';

const { height,width } = Dimensions.get('window');

const propTypes = {
onConfirm: PropTypes.func.isRequired,
onCancel: PropTypes.func.isRequired,

title: PropTypes.string.isRequired,
titleTextStyle: PropTypes.oneOfType([PropTypes.number,PropTypes.object,PropTypes.array]),

detailText: PropTypes.string,
detailTextStyle: PropTypes.oneOfType([PropTypes.number,PropTypes.object,PropTypes.array]),

confirmText: PropTypes.string,
confirmTextStyle:PropTypes.oneOfType([PropTypes.number,PropTypes.object,PropTypes.array]),
confirmButtonStyle:PropTypes.oneOfType([PropTypes.number,PropTypes.object,PropTypes.array]),

cancelText: PropTypes.string,
cancelTextStyle: PropTypes.oneOfType([PropTypes.number,PropTypes.object,PropTypes.array]),
cancelButtonStyle:PropTypes.oneOfType([PropTypes.number,PropTypes.object,PropTypes.array]),

backgroundColor: PropTypes.string,

containerStyle: PropTypes.oneOfType([PropTypes.number,PropTypes.object,PropTypes.array]),

springFromBottom: PropTypes.bool,
springFromTop: PropTypes.bool,

type: PropTypes.string,

textInputStyle: PropTypes.oneOfType([
  PropTypes.number,
  PropTypes.object,
  PropTypes.array
]),

zIndex: PropTypes.number, // try and avoid this.  only needed if you used zIndex elsewhere

};

export default class Alert extends Component {
  static defaultProps = {
    type: "alert" //alert | prompt
  };

 constructor(props){
   super(props);
   this.dismiss = this.dismiss.bind(this);

   this.state = {
    promptValue: ""
   };
 };

 componentWillMount(){
   let xOffset = new Animated.Value(0);
   let yOffset = new Animated.Value(0);


   if (this.props.springFromBottom) {
     yOffset.setValue(1)
   }
   if (this.props.springFromTop) {
     yOffset.setValue(-1)
   }

   this.setState({xOffset:xOffset,yOffset:yOffset})
 };

 componentDidMount(){
   Animated.parallel([
     Animated.spring(this.state.yOffset,{
       toValue:0
     })
   ]).start()
 };

 dismiss(cb){
   let toValue = 0;
   const { promptValue } = this.state;
   if (this.props.springFromBottom) {
     toValue = 1;
   }
   if (this.props.springFromTop) {
     toValue = -1;
   }
   Animated.timing(this.state.yOffset,{
     toValue: toValue,
     duration: 200,
     easing: Easing.linear
    }).start(() => cb(promptValue));
 };

 renderText(){
   if (this.props.detailText) {
     return(
       <Text style={[{
         marginBottom:10
       },this.props.detailTextStyle]}>
         {this.props.detailText}
       </Text>
     )
   }
 };

 render(){
   return(
     <View style={{
       zIndex:this.props.zIndex || 0,
       position:'absolute',
       top:0,
       left:0,
       height:height,
       width:width,
       backgroundColor: this.props.backgroundColor || 'rgba(111,111,111,.9)',
       alignItems:'center',
       justifyContent:'center'
     }}>
       <Animated.View style={[{
         backgroundColor: 'white',
         borderRadius:8,
         width:width*0.8,
         height:width*0.4,
         flexDirection:'column',
         paddingTop:12
       },this.props.containerStyle,{
         transform:[{
           translateY:this.state.yOffset.interpolate({
             inputRange: [-1,0,1],
             outputRange: [-500,0,500]
           })}]}]}>

         <Text style={[{
           fontSize:20,
           fontWeight:'500',
           marginBottom:10,
           textAlign:'center',
           color:'#666'
         },this.props.titleTextStyle]}>
           {this.props.title}
         </Text>
         <View style={{
           position:'absolute',
           bottom:0,
           width:width*0.8
         }}>
          <View style={{
            borderBottomWidth: 1,
            borderColor: "#E8E8EA",
            minHeight: width * 0.16,
            flexDirection: "column",
            alignItems: "center",
            justifyContent: "center",
            paddingHorizontal: 10
          }}>
            <Text>{this.renderText()}</Text>
            {this.props.type === "prompt" &&
              <TextInput
                style={[{alignSelf: 'stretch'}, this.props.textInputStyle]}
                value={this.state.promptValue}
                onChangeText={promptValue => this.setState({promptValue})}
                onSubmitEditing={() => this.dismiss(this.props.onConfirm)}
                autoFocus
              />
            }
          </View>
          <View style={{
            flexDirection: 'row'
            }}>
            <View style={{
              flex:1
              }}>
              <TouchableOpacity
                style={[{
                  padding:10,
                  backgroundColor:'#fff',
                  alignItems:'center',
                  marginLeft:4,
                  marginBottom:4,
                  borderRightWidth:1,
                  borderColor:'#E8E8EA'
                },this.props.cancelButtonStyle]}
                onPress={
                  () => this.dismiss(this.props.onCancel)
                }>
                <Text style={[{
                  color:'#666',
                  fontWeight:'700'
                },this.props.cancelTextStyle]}>
                  {(this.props.cancelText) ? this.props.cancelText:'Cancel'}
                </Text>
              </TouchableOpacity>
            </View>

            <View style={{
              flex:1,
              paddingLeft:10
            }}>
              <TouchableOpacity
                style={[{
                  padding:10,
                  backgroundColor:'#fff',
                  alignItems:'center',
                  marginRight:4,
                  marginBottom:4,
                  borderColor:'#E8E8EA'
                },this.props.confirmButtonStyle]}
                onPress={
                  () => this.dismiss(this.props.onConfirm)
                }>
                <Text style={[{
                  color:'#666',
                  fontWeight:'700',
                },this.props.confirmTextStyle]}>
                  {(this.props.confirmText) ? this.props.confirmText:'Ok'}
                </Text>
              </TouchableOpacity>
            </View>

          </View>
         </View>
       </Animated.View>
     </View>
   )
 };

};

Alert.propTypes = propTypes;
