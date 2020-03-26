import React, { Component } from 'react'
import { TouchableOpacity, View, FlatList, Image, StatusBar, List, TextInput, ScrollView, Dimensions, BackHandler } from 'react-native'
import { CardItem, Footer, FooterTab, Layout, Body, Card, Left, Thumbnail, Right, Text, Button, Container, Picker, Content, Form, Item, Icon, Label, ListItem } from 'native-base'
const { width } = Dimensions.get('window')
import Icon1 from 'react-native-vector-icons/dist/AntDesign'
import Icon2 from 'react-native-vector-icons/dist/MaterialCommunityIcons'
import Icon3 from 'react-native-vector-icons/dist/SimpleLineIcons'
import Carousel from 'react-native-snap-carousel'
import { getGcashBalance } from '../publics/redux/actions/gcash';
import { getGcash } from '../publics/redux/actions/gcash';
import { connect } from 'react-redux';
import AsyncStorage from '@react-native-community/async-storage';
import NumberFormat from 'react-number-format';
import { getEmas, getKonversiEmas } from '../publics/redux/actions/emas';
// import BgAudio from 'react-native-background-audio'

class Home extends Component {
    constructor(props) {
        super(props)
        this.state = {
            activeIndex: 0,
            carouselItems: [
                require('../assets/banner1.png'),
                require('../assets/banner2.png'),
                require('../assets/banner3.png'),
            ],
            dataMenu: [
                { id: "01", size: 'small', name: "Emas", icon: require("../assets/icon-emas.png"), link: 'Tes' },
                { id: "02", size: 'small', name: "Rahn (Gadai)", icon: require("../assets/icon-rahn.png"), link: 'Tes' },
                { id: "03", size: 'small', name: "Pembiayaan", icon: require("../assets/icon-pembiayaan.png"), link: 'Pembiayaan' },
                { id: "04", size: 'small', name: "Pembayaran", icon: require("../assets/icon-pembayaran.png"), link: 'Tes' },
                { id: "05", size: 'small', name: "Cabang", icon: require("../assets/icon-cabang.png"), link: 'Tes' },
                { id: "06", size: 'small', name: "Produk", icon: require("../assets/icon-produk.png"), link: 'Tes' },
                { id: "07", size: 'small', name: "MPO", icon: require("../assets/icon-mpo.png"), link: 'Tes' },
                { id: "08", size: 'small', name: "null", icon: "", link: "" }
            ],
            nomor_gcash: '',
            user_id: '',
            saldo: 0,
            nama: 'anonymous',
            konversiJual:0,
            konversiBeli:0,
            saldoEmas:null
        }
    }

    componentDidMount = async () => {
        BackHandler.addEventListener('hardwareBackPress', function () {
            return true;
        });
        this.subs = [
            this.props.navigation.addListener('willFocus', async () => {
                let userid = await AsyncStorage.getItem("userId")
                let namaNasabah = await AsyncStorage.getItem("namaNasabah")
                this.setState({ nama: namaNasabah })
                await this.props.dispatch(getEmas(userid))
                await this.props.dispatch(getKonversiEmas('gram'))
                this.props.tabEmasProp.dataKonversi.map((item, i) => this.setState({ konversiJual: item.jual, konversiBeli: item.beli }))
                this.props.tabEmasProp.dataEmas.map((item, i) => this.setState({ saldoEmas: item.saldo}))
                await this.props.dispatch(getGcash(userid))
                await this.props.gcashProp.dataGcash.map(async (item, i) =>
                    this.setState({ nomor_gcash: item.nomor_gcash, user_id: userid })
                )
                await this.props.dispatch(getGcashBalance(this.state.user_id, this.state.nomor_gcash))
                await this.props.gcashProp.dataGcashBalance.map(async (item, i) =>
                    this.setState({ saldo: item.balance })
                )
                // console.warn(this.state.saldo)
                this.props.navigation.setParams({ nama: this.state.nama, saldo: this.state.saldo })
            }),
        ]
    }
    componentWillUnmount() {
        this.subs.forEach(sub => {
            sub.remove()
        })
    }

    static navigationOptions = ({ navigation }) => ({
        headerTitle: null,
        headerTitleStyle: {
            width: '100%',
            textAlign: 'left',
            color: 'green',
            fontWeight: 'bold'
        },
        headerLeft: (
            <ListItem>
                <View style={{ flexDirection: 'row' }}>
                    <View style={{ flexDirection: 'column' }}>
                        <Icon3 name='user' style={{ fontSize: 30, fontWeight: 'bold', color:'green' }} />
                        <Text style={{ fontSize: 15 }} >G-cash: </Text>
                    </View>
                    <View style={{ flexDirection: 'column' }}>
                        <Text style={{ fontSize: 20, textAlign:'left' }} >{navigation.getParam('nama')}</Text>
                        <NumberFormat value={navigation.getParam('saldo')} displayType={'text'} thousandSeparator={true} prefix={'Rp'} renderText={value => <Text style={{ fontSize: 20, color: 'green', textAlign:'left' }}>{value}</Text>} />
                    </View>
                </View>
            </ListItem>
        ),
        headerStyle: {
            backgroundColor: 'white'
        },
        headerRight: (
            <ListItem>
                <TouchableOpacity >
                    <Icon name='ios-notifications-outline' style={{ fontSize: 30, textAlign: 'right', fontWeight: 'bold' }} />
                </TouchableOpacity>
            </ListItem>
        ),
    })

    _renderItem({ item, index }) {
        return (
            <Image style={{ flex: 1, width: width }} source={item} />
        )
    }
    prevCarouselImage = () => {
        this.state.activeIndex > 0 ?
            this.carousel._snapToItem(this.state.activeIndex - 1) : this.carousel._snapToItem(this.state.carouselItems.length - 1)
    }
    nextCarouselImage = () => {
        this.state.activeIndex < this.state.carouselItems.length - 1 ?
            this.carousel._snapToItem(this.state.activeIndex + 1) : this.carousel._snapToItem(0)
    }

    render() {
    
        return (
            <Container>
            {/* <BgAudio options={audio_options}></BgAudio>     */}
            <StatusBar barStyle="light-content" backgroundColor="#004d4d" />
                <View style={{
                    flex: 1,
                    backgroundColor: '#e8eaed'
                }}>
                    <View style={{ height: '30%' }}>
                        <Carousel
                            ref={ref => this.carousel = ref}
                            data={this.state.carouselItems}
                            sliderWidth={width}
                            itemWidth={width}
                            renderItem={this._renderItem}
                            onSnapToItem={
                                index => this.setState({ activeIndex: index })
                            }
                        />
                        <View style={{ alignSelf: 'center' }}>
                            <View style={{ position: 'absolute', flexDirection: 'row', bottom: 20 }}>
                                {this.state.carouselItems.map((item, i) =>
                                    <View key={i} style={{ width: 8, height: 8, backgroundColor: this.state.activeIndex == i ? '#2ECC71' : '#e8eaed', margin: 3 }} />
                                )}
                            </View>
                        </View>
                    </View>
                    <Card style={{ marginLeft: '5%', marginRight: '5%', marginTop: '3%', borderRadius: 10 }}>
                        <CardItem header bordered style={{ backgroundColor: 'green' }}>
                            <Text style={{ fontSize: 12, color: 'white' }}>Terakhir update 25/03/2020 pukul 11:32</Text>
                        </CardItem>
                        <CardItem bordered>
                            <Left>
                                <View>
                                    <Text style={{ alignSelf: 'flex-start', fontWeight: 'bold' }}>Saldo emas</Text>
                                <Text style={{ alignSelf: 'flex-start', color: 'grey' }}>{this.state.saldoEmas != null ? this.state.saldoEmas :'0.0'} gram</Text>
                                {this.state.saldoEmas == null ? <Button style={{ alignSelf: 'flex-start', backgroundColor: '#ffcc00', borderRadius: 10 }} >
                                        <Text style={{ fontSize: 10, color: 'black' }}>Buka Tabungan Emas</Text>
                                    </Button>
                                 : <View></View>
                                 }
                                </View>
                            </Left>
                            <Left>
                                <View >
                                    <Text style={{ fontSize: 11, color: 'black' }}>Harga Jual emas / 0.01 gram</Text>
                                    <View style={{ flexDirection: 'row' }}>
                                        <NumberFormat value={(this.state.konversiJual * 0.01).toFixed(0)} displayType={'text'} thousandSeparator={true} prefix={'Rp'} renderText={value => <Text style={{ alignSelf: 'flex-start', color: 'green' }}>{value}</Text>} />
                                        <Icon1 style={{ fontSize: 15, color: 'green', marginLeft: '40%' }} name="caretup" />
                                    </View>
                                    <Text style={{ fontSize: 11, color: 'black' }}>Harga Beli emas / 0.01 gram</Text>
                                    <View style={{ flexDirection: 'row' }}>
                                    <NumberFormat value={(this.state.konversiBeli * 0.01).toFixed(0)} displayType={'text'} thousandSeparator={true} prefix={'Rp'} renderText={value => <Text style={{ alignSelf: 'flex-start', color: 'green' }}>{value}</Text>} />
                                        <Icon1 style={{ fontSize: 15, color: 'green', marginLeft: '40%' }} name="caretup" />
                                    </View>
                                </View>
                            </Left>
                        </CardItem>
                    </Card>
                    <Text style={{ marginLeft: '5%', marginTop: '2%', color: 'grey' }}>Layanan Kami</Text>
                    <FlatList
                        data={this.state.dataMenu}
                        numColumns={2}
                        renderItem={({ item }) => {
                            if (item.name == 'null') {
                                return (
                                    <CardItem
                                        style={{
                                            flexGrow: 2,
                                            flexBasis: 0,
                                            marginTop: '2%',
                                            marginLeft: '3%',
                                            marginRight: '3%',
                                            marginBottom: '1%',
                                            height: 50,
                                            borderColor: 'transparent',
                                            backgroundColor: 'transparent',
                                        }}
                                    >
                                    </CardItem>
                                )
                            }
                            return (
                                <CardItem
                                    style={{
                                        flexGrow: 2,
                                        flexBasis: 0,
                                        marginTop: '2%',
                                        marginLeft: '3%',
                                        marginRight: '3%',
                                        marginBottom: '1%',
                                        elevation: 5,
                                        height: 50,
                                        backgroundColor: 'white'
                                    }}
                                >
                                    <TouchableOpacity onPress={() => this.props.navigation.navigate(item.link)}>
                                        <View style={{ flexDirection: 'row', marginLeft: '-2%' }}>
                                            <Image style={{
                                                height: 30,
                                                width: 30,
                                                marginBottom: '10%'
                                            }} source={item.icon}></Image>
                                            <Text style={{ fontSize: 15, fontWeight: 'bold', color: 'green' }}>
                                                {item.name}
                                            </Text>
                                        </View>
                                    </TouchableOpacity>
                                </CardItem>
                            );
                        }}
                    />
                </View>
                <Footer >
                    <FooterTab style={{ backgroundColor: 'white' }}>
                        <Button>
                            <Icon1 style={{ fontSize: 20, color: 'green' }} name="home" />
                            <Text style={{ color: 'green' }}>Beranda</Text>
                        </Button>
                        <Button>
                            <Icon2 style={{ fontSize: 20 }} name="history" />
                            <Text style={{ color: 'black' }}>Riwayat</Text>
                        </Button>
                        <Button onPress={() => this.props.navigation.navigate('More')}>
                            <Icon3 style={{ fontSize: 20 }} name="user" />
                            <Text style={{ color: 'black' }}>Profil</Text>
                        </Button>
                    </FooterTab>
                </Footer>
            </Container>
        )
    }
}

// const audio_options = {
//     source:{local: require('../assets/intro.mp3')}  //ex. require('./music/sample.mp3')
// }

const mapStateToProps = (state) => {
    return {
        gcashProp: state.gcash,
        tabEmasProp: state.emas,
    }
}

export default connect(mapStateToProps)(Home);