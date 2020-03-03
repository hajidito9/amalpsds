import React, { Component } from 'react';
import { Image } from 'react-native';
import { Button, Container, Header, Content, ListItem, Text, Radio, Right, Left, View } from 'native-base';
import RadioForm, {RadioButton, RadioButtonInput, RadioButtonLabel} from 'react-native-simple-radio-button';
 
export default class Transfer extends Component {
    constructor(props) {
        super(props);
        this.state = {
          select1: false,
          select2: false,
          select3: false,
          select4: false,
          select5: false,
          select6: false,
        };
    }

    pressButton1 =()=> {
        this.setState({select1 : true})
        this.setState({select2 : false})
        this.setState({select3 : false})
        this.setState({select4 : false})
        this.setState({select5 : false})
        this.setState({select6 : false})
    }
    pressButton2 =()=> {
        this.setState({select1 : false})
        this.setState({select2 : true})
        this.setState({select3 : false})
        this.setState({select4 : false})
        this.setState({select5 : false})
        this.setState({select6 : false})
    }
    pressButton3 =()=> {
        this.setState({select1 : false})
        this.setState({select2 : false})
        this.setState({select3 : true})
        this.setState({select4 : false})
        this.setState({select5 : false})
        this.setState({select6 : false})
    }
    pressButton4 =()=> {
        this.setState({select1 : false})
        this.setState({select2 : false})
        this.setState({select3 : false})
        this.setState({select4 : true})
        this.setState({select5 : false})
        this.setState({select6 : false})
    }
    pressButton5 =()=> {
        this.setState({select1 : false})
        this.setState({select2 : false})
        this.setState({select3 : false})
        this.setState({select4 : false})
        this.setState({select5 : true})
        this.setState({select6 : false})
    }
    pressButton6 =()=> {
        this.setState({select1 : false})
        this.setState({select2 : false})
        this.setState({select3 : false})
        this.setState({select4 : false})
        this.setState({select5 : false})
        this.setState({select6 : true})
    }

    static navigationOptions = ({ navigation }) => {
        return {
            headerTitle: 'Pembayaran',
            headerTintColor: "white",
            headerTitleStyle: {
                width: '90%',
                textAlign: 'center',
                color: 'white'
            },
            headerStyle: {
                elevation: null,
                backgroundColor: '#004d4d'
            },
        }
    }
    
    render() {
        return (
            <Container>
                <Content>
                    <Text style={{marginTop:'2%', color:'grey'}}>Pilih Metode Pembayaran</Text>
                    <ListItem selected={true} >
                        <Left>
                            <Image
                                source={require('../assets/Bank-Mandiri-Logo-Vector-Image.png')}
                                style={{ width: 90, marginLeft: '5%', height: 50, }} />
                            <View style={{ flexDirection: 'column' }}>
                                <Text style={{ marginLeft: '5%' }}>Bank Mandiri</Text>
                                <Text style={{ fontSize: 15, marginLeft: '5%', color: 'grey' }}>Virtual Account (otomatis)</Text>
                            </View>
                        </Left>
                        <Right>
                            <Radio 
                                onPress={() => this.pressButton1()}
                                color={"#f0ad4e"}
                                selectedColor={"#5cb85c"}
                                selected={this.state.select1}
                            />
                        </Right>
                    </ListItem>
                    <ListItem selected={false}>
                        <Left>
                            <Image
                                source={require('../assets/LogoBankBNIPNG.png')}
                                style={{ width: 90, marginLeft: '5%', height: 30, }} />
                            <View style={{ flexDirection: 'column' }}>
                                <Text style={{ marginLeft: '5%' }}>Bank BNI</Text>
                                <Text style={{ fontSize: 15, marginLeft: '5%', color: 'grey' }}>Virtual Account (otomatis)</Text>
                            </View>
                        </Left>
                        <Right>
                            <Radio
                                onPress={() => this.pressButton2()}
                                color={"#f0ad4e"}
                                selectedColor={"#5cb85c"}
                                selected={this.state.select2}
                            />
                        </Right>
                    </ListItem>

                    <ListItem selected={false} >
                        <Left>
                            <Image
                                source={require('../assets/logo-bank-bri-link-png-bank-rakyat-indonesia-clipa-e734cf696078af37.png')}
                                style={{ width: 50, marginLeft: '5%', height: 50, }} />
                            <View style={{ flexDirection: 'column' }}>
                                <Text style={{ marginLeft: '5%' }}>Bank BRI</Text>
                                <Text style={{ fontSize: 15, marginLeft: '5%', color: 'grey' }}>Virtual Account (otomatis)</Text>
                            </View>
                        </Left>
                        <Right>
                            <Radio
                                onPress={() => this.pressButton3()}
                                color={"#f0ad4e"}
                                selectedColor={"#5cb85c"}
                                selected={this.state.select3}
                            />
                        </Right>
                    </ListItem>
                    <ListItem selected={false}>
                        <Left>
                            <Image
                                source={require('../assets/Bank-Mandiri-Logo-Vector-Image.png')}
                                style={{ width: 90, marginLeft: '5%', height: 50, }} />
                            <View style={{ flexDirection: 'column' }}>
                                <Text style={{ marginLeft: '5%' }}>Bank Mandiri</Text>
                                <Text style={{ fontSize: 15, marginLeft: '5%', color: 'grey' }}>Transfer Manual</Text>
                            </View>
                        </Left>
                        <Right>
                            <Radio
                                onPress={() => this.pressButton4()}
                                color={"#f0ad4e"}
                                selectedColor={"#5cb85c"}
                                selected={this.state.select4}
                            />
                        </Right>
                    </ListItem>
                    <ListItem selected={false} >
                        <Left>
                            <Image
                                source={require('../assets/LogoBankBNIPNG.png')}
                                style={{ width: 90, marginLeft: '5%', height: 30, }} />
                            <View style={{ flexDirection: 'column' }}>
                                <Text style={{ marginLeft: '5%' }}>Bank BNI</Text>
                                <Text style={{ fontSize: 15, marginLeft: '5%', color: 'grey' }}>Transfer Manual</Text>
                            </View>
                        </Left>
                        <Right>
                            <Radio
                                onPress={() => this.pressButton5()}
                                color={"#f0ad4e"}
                                selectedColor={"#5cb85c"}
                                selected={this.state.select5}
                            />
                        </Right>
                    </ListItem>
                    <ListItem selected={false}>
                        <Left>
                            <Image
                                source={require('../assets/logo-bank-bri-link-png-bank-rakyat-indonesia-clipa-e734cf696078af37.png')}
                                style={{ width: 50, marginLeft: '5%', height: 50, }} />
                            <View style={{ flexDirection: 'column' }}>
                                <Text style={{ marginLeft: '5%' }}>Bank BRI</Text>
                                <Text style={{ fontSize: 15, marginLeft: '5%', color: 'grey' }}>Transfer Manual</Text>
                            </View>
                        </Left>
                        <Right>
                            <Radio
                                onPress={() => this.pressButton6()}
                                color={"#f0ad4e"}
                                selectedColor={"#5cb85c"}
                                selected={this.state.select6}
                            />
                        </Right>
                    </ListItem>
                    <View style={{ alignSelf: 'center', marginTop: '5%', marginBottom:'3%' }}>
                        <Button onPress={() => this.props.navigation.navigate('Transfer2')}
                            rounded success >
                            <Text>Konfirmasi</Text>
                        </Button>
                    </View>
                </Content>
            </Container>
        );
    }
}