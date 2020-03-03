import React, { Component } from 'react';
import {
    Container,
    Header,
    Content,
    Form,
    Item,
    Text,
    Input,
    Label,
    Button,
    View
} from 'native-base';
import {
    TouchableOpacity,
    Image,
    TouchableHighlight,
    Linking
} from 'react-native';

import DocumentPicker from 'react-native-document-picker';
import AsyncStorage from '@react-native-community/async-storage';

export default class PengajuanFileMikro extends Component {
    constructor(props) {
        super(props);
        //Initialization of the state to store the selected file related attribute
        this.state = {
            linkKtp: '',
            linkKK: '',
            linkDepan: '',
            linkDalam: '',
        };
    }
    async selectOneFile() {
        try {
            const res = await DocumentPicker.pick({
                type: [DocumentPicker.types.pdf],
            });
            console.log(
                res.uri,
                res.type, // mime type
                res.name,
                res.size
            );
            this.setState({ nameFile: res.name });
        } catch (err) {
            if (DocumentPicker.isCancel(err)) {
            } else {
                throw err;
            }
        }
    }

    static navigationOptions = ({ navigation }) => {
        return {
            headerTitle: 'Data Pendukung Mikro',
            headerTintColor: "white",
            headerTitleStyle: {
                // width: '90%',
                textAlign: 'center',
                color: 'white'
            },
            headerStyle: {
                elevation: null,
                backgroundColor: '#2ECC71'
            },
        }
    }

    componentDidMount = async () => {
        this.subs = [
            this.props.navigation.addListener('willFocus', async () => {
                let asKtpMikro = await AsyncStorage.getItem('linkKtpMikro')
                let asKKMikro = await AsyncStorage.getItem('linkKKMikro')
                let asDepanMikro = await AsyncStorage.getItem('linkDepanMikro')
                let asDalamMikro = await AsyncStorage.getItem('linkDalamMikro')
                await this.setState({ linkKtp: asKtpMikro ? asKtpMikro : '' })
                await this.setState({ linkKK: asKKMikro ? asKKMikro : '' })
                await this.setState({ linkDepan: asDepanMikro ? asDepanMikro : '' })
                await this.setState({ linkDalam: asDalamMikro ? asDalamMikro : '' })
            })
        ]
    }

    componentWillUnmount() {
        this.subs.forEach(sub => {
            sub.remove()
        })
    }
    render() {
        return (
            <Container>
                <Content>

                    <View style={{ alignSelf: 'center', marginTop: '5%', flexDirection: 'column' }}>
                        <View style={{ flexDirection: 'row' }}>
                            <View style={{ flexDirection: 'column' }}>

                                <Text style={{ marginBottom: '8%', alignSelf: 'flex-start', color: 'black' }}>KTP</Text>

                                <Text style={{ marginBottom: '8%', alignSelf: 'flex-start', color: 'black' }}>Kartu Keluarga</Text>

                                <Text style={{ marginBottom: '8%', alignSelf: 'flex-start', color: 'black' }}>Foto Tempat Usaha (Depan)</Text>

                                <Text style={{ marginBottom: '8%', alignSelf: 'flex-start', color: 'black' }}>Foto Tempat Usaha (Dalam)</Text>

                            </View>
                            <View style={{ marginLeft: '30%', flexDirection: 'column' }}>
                                {this.state.linkKtp != '' ?
                                    <TouchableHighlight
                                        style={{ alignSelf: 'flex-end', color: 'green', fontWeight: 'bold' }}
                                        activeOpacity={0.5}
                                        onPress={() => Linking.openURL(this.state.linkKtp)}
                                    >
                                        <Image style={{ width: 26, height: 26, marginBottom: '40%' }}
                                            source={require('../assets/icons8-download-30.png')}
                                        />
                                    </TouchableHighlight>
                                    :
                                    <TouchableOpacity
                                        style={{ alignSelf: 'flex-end', color: 'green', fontWeight: 'bold' }}
                                        activeOpacity={0.5}
                                        onPress={() => this.props.navigation.navigate('uploadKtpMikro')}
                                    >
                                        <Image style={{ marginBottom: '40%' }}
                                            source={require('../assets/icons8-upload-26(1).png')}
                                        />
                                    </TouchableOpacity>
                                }

                                {this.state.linkKK != '' ?
                                    <TouchableHighlight
                                        style={{ alignSelf: 'flex-end', color: 'green', fontWeight: 'bold' }}
                                        activeOpacity={0.5}
                                        onPress={() => Linking.openURL(this.state.linkKK)}
                                    >
                                        <Image style={{ width: 26, height: 26, marginBottom: '40%' }}
                                            source={require('../assets/icons8-download-30.png')}
                                        />
                                    </TouchableHighlight>
                                    :
                                    <TouchableOpacity
                                        style={{ alignSelf: 'flex-end', color: 'green', fontWeight: 'bold' }}
                                        activeOpacity={0.5}
                                        onPress={() => this.props.navigation.navigate('uploadKKMikro')}
                                    >
                                        <Image style={{ marginBottom: '40%' }}
                                            source={require('../assets/icons8-upload-26(1).png')}
                                        />
                                    </TouchableOpacity>
                                }
                                {this.state.linkDepan != '' ?
                                    <TouchableHighlight
                                        style={{ alignSelf: 'flex-end', color: 'green', fontWeight: 'bold' }}
                                        activeOpacity={0.5}
                                        onPress={() => Linking.openURL(this.state.linkDepan)}
                                    >
                                        <Image style={{ width: 26, height: 26, marginBottom: '40%' }}
                                            source={require('../assets/icons8-download-30.png')}
                                        />
                                        {/* <Text>Download KTP</Text> */}
                                    </TouchableHighlight>
                                    :
                                    <TouchableOpacity
                                        style={{ alignSelf: 'flex-end', color: 'green', fontWeight: 'bold' }}
                                        activeOpacity={0.5}
                                        onPress={() => this.props.navigation.navigate('uploadDepanMikro')}
                                    >
                                        <Image style={{ marginBottom: '40%' }}
                                            source={require('../assets/icons8-upload-26(1).png')}
                                        />
                                    </TouchableOpacity>
                                }
                                {this.state.linkDalam != '' ?
                                    <TouchableHighlight
                                        style={{ alignSelf: 'flex-end', color: 'green', fontWeight: 'bold' }}
                                        activeOpacity={0.5}
                                        onPress={() => Linking.openURL(this.state.linkDalam)}
                                    >
                                        <Image style={{ width: 26, height: 26, marginBottom: '40%' }}
                                            source={require('../assets/icons8-download-30.png')}
                                        />
                                        {/* <Text>Download KTP</Text> */}
                                    </TouchableHighlight>
                                    :
                                    <TouchableOpacity
                                        style={{ alignSelf: 'flex-end', color: 'green', fontWeight: 'bold' }}
                                        activeOpacity={0.5}
                                        onPress={() => this.props.navigation.navigate('uploadDalamMikro')}
                                    >
                                        <Image style={{ marginBottom: '40%' }}
                                            source={require('../assets/icons8-upload-26(1).png')}
                                        />
                                    </TouchableOpacity>
                                }
                            </View>
                        </View>
                    </View>
                    <View style={{ marginTop: '5%', marginBottom: '5%' }}>
                        <Button style={{ justifyContent: 'center', alignSelf: 'center', width: '90%' }} success onPress={() => this.props.navigation.navigate('PengajuanKonfirmasi')}>
                            <Text>Lanjut</Text>
                        </Button>
                    </View>

                </Content>
            </Container>
        );
    }
}
