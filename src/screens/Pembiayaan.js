import React, { Component } from 'react'
import { TouchableOpacity,View, FlatList, Image, StatusBar, List, TextInput, ScrollView, Dimensions } from 'react-native'
import {  CardItem, Footer, FooterTab, Layout, Body, Card, Left, Thumbnail, Right, Text, Button, Container, Picker, Content, Form, Item, Icon, Label, ListItem } from 'native-base'
const Sound = require('react-native-sound')

class Pembiayaan extends Component {
    constructor(props) {
        super(props)
        this.state = {
            dataMenu: [
                { id: "01", size: 'large', icon: require("../assets/amanah.png"), link: 'HomeAmanah' },
                { id: "02", size: 'large', icon: require("../assets/arumhaji.png"), link: 'Test' },
                { id: "03", size: 'large', icon: require("../assets/arumbpkb.png"), link: 'Test'},
                { id: "04", size: 'large', icon: require("../assets/arumemas.png"), link: 'Test'},
                { id: "05", size: 'large', icon: require("../assets/tasjily.png"), link: 'Test'},
                { id: "08", size: 'large', icon: null, link: 'Test'}
            ],
        }
    }

    // sound = new Sound('intro.mp3');
    sound = new Sound(require("../assets/intro.mp3"), Sound.MAIN_BUNDLE, (error) => {
        if (error) {
          console.warn(error)
        }
      })

    playSound = () => {
        this.sound.play((success) => {
            if (!success) {
              console.warn('Sound did not play')
            }
          })
    }

    static navigationOptions = ({ navigation }) => ({
        headerTitle: 'Pembiayaan',
        headerTitleStyle: {
            width: '100%',
            textAlign: 'left',
            color: 'green',
            fontWeight: 'bold'
        },
        headerStyle: {
            backgroundColor: 'white'
        }
    })

    goTo = async(link) =>{
        await this.playSound && this.props.navigation.navigate(link)
    }

    render() {
        return (
            <Container>
                <StatusBar barStyle="light-content" backgroundColor="#004d4d" />
                <View style={{
                    flex: 1,
                    backgroundColor: '#e8eaed',
                }}>
                    <FlatList
                        data={this.state.dataMenu}
                        numColumns={3}
                        style={{ alignSelf: 'center' }}
                        renderItem={({ item }) => {
                            if (item.icon == null) {
                                return (
                                    <CardItem
                                        style={{
                                            marginTop: '2%',
                                            marginLeft: '2%',
                                            marginRight: '2%',
                                            marginBottom: '1%',
                                            borderColor: 'transparent',
                                            backgroundColor: 'transparent'
                                        }}
                                    >
                                    </CardItem>
                                )
                            }
                            return (
                                <CardItem
                                    style={{
                                        marginTop: '2%',
                                        marginLeft: '0.5%',
                                        marginRight: '0.5%',
                                        marginBottom: '1%',
                                        elevation: 5,
                                        backgroundColor: 'white'
                                    }}
                                >
                                    <TouchableOpacity
                                        onPress={() =>  this.goTo(item.link)}>
                                        <Image
                                            style={{
                                                height:80,
                                                width:80
                                            }}
                                            source={item.icon}>
                                        </Image>
                                    </TouchableOpacity>
                                </CardItem>
                            );
                        }}
                    />
                </View>
                {/* <Footer >
                    <FooterTab style={{ backgroundColor: 'white' }}>
                        <Button>
                            <Icon1 style={{ fontSize: 20, color: 'green' }} name="home" />
                            <Text style={{ color: 'green' }}>Beranda</Text>
                        </Button>
                        <Button>
                            <Icon2 style={{ fontSize: 20 }} name="history" />
                            <Text style={{ color: 'black' }}>Riwayat</Text>
                        </Button>
                        <Button>
                            <Icon3 style={{ fontSize: 20 }} name="user" />
                            <Text style={{ color: 'black' }}>Profil</Text>
                        </Button>
                    </FooterTab>
                </Footer> */}
            </Container>
        )
    }
}

export default Pembiayaan;