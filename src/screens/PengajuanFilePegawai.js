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

export default class PengajuanFilePegawai extends Component {
    constructor(props) {
        super(props);
        //Initialization of the state to store the selected file related attribute
        this.state = {
            linkKtp: '',
            linkKK: '',
            linkSK: '',
            linkSlip: '',
            linkRek: '',
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
            headerTitle: 'Data Pendukung Pegawai',
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
                let asKtpPegawai = await AsyncStorage.getItem('linkKtpPegawai')
                let asKKPegawai = await AsyncStorage.getItem('linkKKPegawai')
                let asSKPegawai = await AsyncStorage.getItem('linkSKPegawai')
                let asSlipPegawai = await AsyncStorage.getItem('linkSlipPegawai')
                let asRekPegawai = await AsyncStorage.getItem('linkRekPegawai')
                await this.setState({ linkKtp: asKtpPegawai ? asKtpPegawai : '' })
                await this.setState({ linkKK: asKKPegawai ? asKKPegawai : '' })
                await this.setState({ linkSK: asSKPegawai ? asSKPegawai : '' })
                await this.setState({ linkSlip: asSlipPegawai ? asSlipPegawai : '' })
                await this.setState({ linkRek: asRekPegawai ? asRekPegawai : '' })
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

                                <Text style={{ marginBottom: '15%', alignSelf: 'flex-start', color: 'black' }}>KTP</Text>



                                <Text style={{ marginBottom: '15%', alignSelf: 'flex-start', color: 'black' }}>Kartu Keluarga</Text>



                                <Text style={{ marginBottom: '15%', alignSelf: 'flex-start', color: 'black' }}>SK Pegawai</Text>



                                <Text style={{ marginBottom: '15%', alignSelf: 'flex-start', color: 'black' }}>Slip Gaji</Text>



                                <Text style={{ alignSelf: 'flex-start', color: 'black' }}>Rekomendasi</Text>


                            </View>
                            <View style={{ marginLeft: '50%', flexDirection: 'column' }}>
                                {this.state.linkKtp != '' ?
                                    <TouchableHighlight
                                        style={{ alignSelf: 'flex-end', color: 'green', fontWeight: 'bold' }}
                                        activeOpacity={0.5}
                                        onPress={() => Linking.openURL(this.state.linkKtp)}
                                    >
                                        <Image style={{ width:26, height:26, marginBottom: '40%' }}
                                            source={require('../assets/icons8-download-30.png')}
                                        />
                                        {/* <Text>Download KTP</Text> */}
                                    </TouchableHighlight>
                                    :
                                    <TouchableOpacity
                                        style={{ alignSelf: 'flex-end', color: 'green', fontWeight: 'bold' }}
                                        activeOpacity={0.5}
                                        onPress={() => this.props.navigation.navigate('uploadKtpPegawai')}
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
                                        <Image style={{ width:26, height:26, marginBottom: '40%' }}
                                            source={require('../assets/icons8-download-30.png')}
                                        />
                                        {/* <Text>Download KTP</Text> */}
                                    </TouchableHighlight>
                                    :
                                    <TouchableOpacity
                                        style={{ alignSelf: 'flex-end', color: 'green', fontWeight: 'bold' }}
                                        activeOpacity={0.5}
                                        onPress={() => this.props.navigation.navigate('uploadKKPegawai')}
                                    >
                                        <Image style={{ marginBottom: '40%' }}
                                            source={require('../assets/icons8-upload-26(1).png')}
                                        />
                                    </TouchableOpacity>
                                }
                                {this.state.linkSK != '' ?
                                    <TouchableHighlight
                                        style={{ alignSelf: 'flex-end', color: 'green', fontWeight: 'bold' }}
                                        activeOpacity={0.5}
                                        onPress={() => Linking.openURL(this.state.linkSK)}
                                    >
                                        <Image style={{ width:26, height:26, marginBottom: '40%' }}
                                            source={require('../assets/icons8-download-30.png')}
                                        />
                                        {/* <Text>Download KTP</Text> */}
                                    </TouchableHighlight>
                                    :
                                    <TouchableOpacity
                                        style={{ alignSelf: 'flex-end', color: 'green', fontWeight: 'bold' }}
                                        activeOpacity={0.5}
                                        onPress={() => this.props.navigation.navigate('uploadSKPegawai')}
                                    >
                                        <Image style={{ marginBottom: '40%' }}
                                            source={require('../assets/icons8-upload-26(1).png')}
                                        />
                                    </TouchableOpacity>
                                }
                                {this.state.linkSlip != '' ?
                                    <TouchableHighlight
                                        style={{ alignSelf: 'flex-end', color: 'green', fontWeight: 'bold' }}
                                        activeOpacity={0.5}
                                        onPress={() => Linking.openURL(this.state.linkSlip)}
                                    >
                                        <Image style={{ width:26, height:26, marginBottom: '40%' }}
                                            source={require('../assets/icons8-download-30.png')}
                                        />
                                        {/* <Text>Download KTP</Text> */}
                                    </TouchableHighlight>
                                    :
                                    <TouchableOpacity
                                        style={{ alignSelf: 'flex-end', color: 'green', fontWeight: 'bold' }}
                                        activeOpacity={0.5}
                                        onPress={() => this.props.navigation.navigate('uploadSlipPegawai')}
                                    >
                                        <Image style={{ marginBottom: '40%' }}
                                            source={require('../assets/icons8-upload-26(1).png')}
                                        />
                                    </TouchableOpacity>
                                }
                                {this.state.linkRek != '' ?
                                    <TouchableHighlight
                                        style={{ alignSelf: 'flex-end', color: 'green', fontWeight: 'bold' }}
                                        activeOpacity={0.5}
                                        onPress={() => Linking.openURL(this.state.linkRek)}
                                    >
                                        <Image style={{ width:26, height:26, marginBottom: '40%' }}
                                            source={require('../assets/icons8-download-30.png')}
                                        />
                                        {/* <Text>Download KTP</Text> */}
                                    </TouchableHighlight>
                                    :
                                    <TouchableOpacity
                                        style={{ alignSelf: 'flex-end', color: 'green', fontWeight: 'bold' }}
                                        activeOpacity={0.5}
                                        onPress={() => this.props.navigation.navigate('uploadRekPegawai')}
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
