import React, { Component } from 'react';
import { Text, View, Image, StyleSheet } from 'react-native';
import { createAppContainer, createSwitchNavigator } from 'react-navigation';
import { createBottomTabNavigator } from 'react-navigation-tabs';
import { createStackNavigator } from 'react-navigation-stack';
import Home from '../screens/Home';
import HomeAmanah from '../screens/HomeAmanah';
import Pembiayaan from '../screens/Pembiayaan';
import TestMap from '../screens/TestMap';
import PengajuanTenor from '../screens/PengajuanTenor';
import uploadKtpPegawai from '../screens/uploadKtpPegawai';
import uploadKKPegawai from '../screens/uploadKKPegawai';
import uploadSKPegawai from '../screens/uploadSKPegawai';
import uploadSlipPegawai from '../screens/uploadSlipPegawai';
import uploadRekPegawai from '../screens/uploadRekPegawai';
import uploadKtpMikro from '../screens/uploadKtpMikro';
import uploadKKMikro from '../screens/uploadKKMikro';
import uploadDepanMikro from '../screens/uploadDepanMikro';
import uploadDalamMikro from '../screens/uploadDalamMikro';
import PengajuanMerkKendaraan from '../screens/PengajuanMerkKendaraan';
import PengajuanStatusKendaraan from '../screens/PengajuanStatusKendaraan';
import PengajuanStatus1 from '../screens/PengajuanStatus1';
import PengajuanStatus2 from '../screens/PengajuanStatus2';
import PengajuanStatus3 from '../screens/PengajuanStatus3';
import PengajuanListKendaraan from '../screens/PengajuanListKendaraan';
import PengajuanWarnaKendaraan from '../screens/PengajuanWarnaKendaraan';
import PengajuanDetailKendaraan from '../screens/PengajuanDetailKendaraan';
import PengajuanUangMuka from '../screens/PengajuanUangMuka';
import PengajuanPegawai from '../screens/PengajuanPegawai';
import PengajuanMikro from '../screens/PengajuanMikro';
import PengajuanKonfirmasi from '../screens/PengajuanKonfirmasi';
import PengajuanCabang from '../screens/PengajuanCabang';
import PengajuanKategoriKendaraan from '../screens/PengajuanKategoriKendaraan';
import Pengajuan1 from '../screens/Pengajuan1';
import PengajuanNasabah from '../screens/PengajuanNasabah';
import PengajuanFilePegawai from '../screens/PengajuanFilePegawai';
import PengajuanFileMikro from '../screens/PengajuanFileMikro';
import PengajuanTipePekerjaan from '../screens/PengajuanTipePekerjaan';
import Journey from '../screens/Journey';
import Profile from '../screens/Profile';
import Pembayaran from '../screens/Pembayaran';
import Transfer from '../screens/Transfer';
import Transfer2 from '../screens/Transfer2';
import Transfer3 from '../screens/Transfer3';
import More from '../screens/More';
import SplashScreen from '../screens/SplashScreen';
import Login from '../screens/Login';
import LoginAmanah from '../screens/LoginAmanah';
import AuthLoading from '../screens/AuthLoading';
// import Ionicons from 'react-native-vector-icons/Ionicons';
import { Provider } from 'react-redux';
import store from '../publics/redux/store';

const MoreStack = createStackNavigator({
  // Login: {
  //   screen: Login
  // },
  More: {
    screen: More
  },
  Profile: {
    screen: Profile
  }
},
)

// const AuthStack = createStackNavigator({
//   AuthLoading: {
//     screen: AuthLoading
//   },
//   Login: {
//     screen: Login
//   }
// })

// const AuthStack = createSwitchNavigator(
//   {
//     AuthLoading: AuthLoading,
//     // App: HomeStack,
//     Auth: LoginStack,
//   },
//   {
//     initialRouteName: 'AuthLoading',
//   }
// );

const PengajuanStack = createStackNavigator({
  
  PengajuanStatus1: {
    screen: PengajuanStatus1
  },
  Pengajuan1: {
    screen: Pengajuan1
  },
  TestMap: {
    screen: TestMap
  },
  PengajuanNasabah: {
    screen: PengajuanNasabah
  },
  PengajuanFilePegawai: {
    screen: PengajuanFilePegawai
  },
  PengajuanFileMikro: {
    screen: PengajuanFileMikro
  },
  PengajuanTenor: {
    screen: PengajuanTenor
  },
  PengajuanKategoriKendaraan: {
    screen: PengajuanKategoriKendaraan
  },
  PengajuanMerkKendaraan: {
    screen: PengajuanMerkKendaraan
  },
  PengajuanStatusKendaraan: {
    screen: PengajuanStatusKendaraan
  },
  PengajuanListKendaraan: {
    screen: PengajuanListKendaraan
  },
  PengajuanWarnaKendaraan: {
    screen: PengajuanWarnaKendaraan
  },
  PengajuanDetailKendaraan: {
    screen: PengajuanDetailKendaraan
  },
  PengajuanUangMuka: {
    screen: PengajuanUangMuka
  },
  PengajuanTipePekerjaan: {
    screen: PengajuanTipePekerjaan
  },
  PengajuanPegawai: {
    screen: PengajuanPegawai
  },
  PengajuanMikro: {
    screen: PengajuanMikro
  },
  PengajuanKonfirmasi: {
    screen: PengajuanKonfirmasi
  },
  PengajuanCabang: {
    screen: PengajuanCabang
  },
  uploadKtpPegawai: {
    screen: uploadKtpPegawai
  },
  uploadKKPegawai: {
    screen: uploadKKPegawai
  },
  uploadSKPegawai: {
    screen: uploadSKPegawai
  },
  uploadSlipPegawai: {
    screen: uploadSlipPegawai
  },
  uploadRekPegawai: {
    screen: uploadRekPegawai
  },
  uploadKtpMikro: {
    screen: uploadKtpMikro
  },
  uploadKKMikro: {
    screen: uploadKKMikro
  },
  uploadDepanMikro: {
    screen: uploadDepanMikro
  },
  uploadDalamMikro: {
    screen: uploadDalamMikro
  },
  Transfer: {
    screen: Transfer
  }
},
)

const HomeStack = createStackNavigator({
  AuthLoading: AuthLoading,
  
  Login: {
    screen: Login
  },
  HomeDashboard: {
    screen: Home
  },
  Pembiayaan: {
    screen: Pembiayaan
  },
  HomeAmanah: {
    screen: HomeAmanah
  }
},
)

HomeStack.navigationOptions = ({ navigation }) => {
  let tabBarVisible = true;
  for (let i = 0; i < navigation.state.routes.length; i++) {
    if (navigation.state.routes[i].routeName === "HomeDashboard" || navigation.state.routes[i].routeName === "Login") {
      tabBarVisible = false;
    }
    if (navigation.state.routes[i].routeName === "HomeAmanah") {
      tabBarVisible = true;
    }
  }

  return {
    tabBarVisible
  };
};

const PembayaranStack = createStackNavigator({
  PengajuanStatus3: {
    screen: PengajuanStatus3
  },
  Pembayaran: {
    screen: Pembayaran
  },
  Transfer: {
    screen: Transfer
  },
  Transfer2: {
    screen: Transfer2
  },
  Transfer3: {
    screen: Transfer3
  },
},
)

const JourneyStack = createStackNavigator({
  PengajuanStatus2: {
    screen: PengajuanStatus2
  },
  Journey: {
    screen: Journey
  }
},
)

const BottomNavigation = createBottomTabNavigator(
  {
    Home: HomeStack,
    Pengajuan: PengajuanStack,
    Journey: JourneyStack,
    Pembayaran: PembayaranStack,
    More: MoreStack,
  },
  {
    defaultNavigationOptions: ({ navigation }) => ({
      tabBarIcon: ({ focused, horizontal, tintColor }) => {
        const { routeName } = navigation.state;
        if (routeName === 'Home') {
          return (
            focused ?
              <Image
                source={require('../assets/icons8-home-100(1).png')}
                style={{ width: 30, height: 30, }} /> :
              <Image
                source={require('../assets/icons8-home-100.png')}
                style={{ width: 20, height: 20, }} />

          );
        } else if (routeName === 'Pengajuan') {
          return (
            focused ?
              <Image
                source={require('../assets/icons8-send-100(1).png')}
                style={{ width: 30, height: 30 }} /> :
              <Image
                source={require('../assets/icons8-send-100.png')}
                style={{ width: 20, height: 20 }} />
          );
        } else if (routeName === 'Journey') {
          return (
            focused ?
              <Image
                source={require('../assets/icons8-motorcycle-100(1).png')}
                style={{ width: 30, height: 30 }} /> :
              <Image
                source={require('../assets/icons8-motorcycle-100.png')}
                style={{ width: 20, height: 20 }} />
          );
        } else if (routeName === 'Pembayaran') {
          return (
            focused ?
              <Image
                source={require('../assets/icons8-money-100(2).png')}
                style={{ width: 30, height: 30 }} /> :
              <Image
                source={require('../assets/icons8-money-100(1).png')}
                style={{ width: 20, height: 20 }} />

          );
        } else if (routeName === 'More') {
          return (
            focused ?
              <Image
                source={require('../assets/icons8-more-100(1).png')}
                style={{ width: 30, height: 30 }} /> :
              <Image
                source={require('../assets/icons8-more-100.png')}
                style={{ width: 20, height: 20 }} />
          );
        }
      },
    }),
    tabBarOptions: {
      activeTintColor: 'white',
      labelStyle: { fontWeight: "bold" },
      activeBackgroundColor: '#2ECC71',
      inactiveTintColor: '#263238',
    },
  });

const AppContainer = createAppContainer(createSwitchNavigator(
  {
    SplashScreen: SplashScreen,
    BottomNavigation: BottomNavigation
  },
  {
    initialRouteName: 'SplashScreen',
  }
));

export default class App extends Component {
  render() {
    return (
      <Provider store={store} >
        <AppContainer />
      </Provider>
    )
  }
}