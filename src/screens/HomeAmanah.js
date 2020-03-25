import * as React from 'react'
import {View, Text, ScrollView, Dimensions, Image, StyleSheet, StatusBar, TouchableOpacity} from 'react-native'

const DEVICE_WIDTH = Dimensions.get('window').width

class BackgroundPromo extends React.Component{
    scrollRef = React.createRef()
    constructor(props){
        super(props)
        this.state = {
            selectedIndex:0
        }
    }

    setSelectedIndex = event =>{
        // width of the viewSize
        const viewSize = event.nativeEvent.layoutMeasurement.width
        // get current position of the scrollview
        const contentOffset = event.nativeEvent.contentOffset.x

        const selectedIndex = Math.floor(contentOffset / viewSize)
        this.setState({selectedIndex})

    }

    render(){
        const {images} = this.props
        const {selectedIndex} = this.state
        return(
            <View style={{height:"100%", width:"100%"}}>
                <StatusBar barStyle="light-content" backgroundColor="#004d4d" />
       
                <ScrollView 
                    horizontal 
                    pagingEnabled 
                    onMomentumScrollEnd={this.setSelectedIndex}
                >
                    {images.map(image =>(
                        <Image 
                            key={image}
                            source={{uri:image}}
                            style={styles.backgroundImage}
                        />
                    ))}
                </ScrollView>

                <View style={styles.circleDiv}>
                    {images.map((image,i)=>(
                        <View
                            key={image}
                            style={[styles.whiteCircle, {opacity: i === selectedIndex ? 1 : 0.5}]}
                        />
                    ))}
                </View>
            </View>
        )
    }
}

const styles = StyleSheet.create({
    backgroundImage:{
        height: '90%',
        width: DEVICE_WIDTH,
    },
    circleDiv:{
        position:'absolute',
        bottom:35,
        height:10,
        width:'100%',
        display:'flex',
        flexDirection:'row',
        justifyContent:'center',
        alignItems:'center'
    },
    whiteCircle:{
        width:25,
        height:25,
        borderRadius:25,
        margin:5,
        backgroundColor:'#2ECC71'
    }
})

const images = [
    "https://i.pinimg.com/originals/dc/ce/fe/dccefe92702dc581fd5002549f088b03.jpg",
    "https://i.pinimg.com/originals/76/01/18/7601189f64271a4bef60ec7eb6304f3f.jpg",
    "https://i.pinimg.com/originals/d0/14/bd/d014bd799ee4b3560ac8c19c029fcc1c.jpg",
    ];

class HomeAmanah extends React.Component{
    static navigationOptions = {
        header:null,
        // headerShown:false
    }
    render(){
        return(
            <View>
                <BackgroundPromo images={images} navigation={this.props.navigation}/>
            </View>
        )
    }
}

export default HomeAmanah;