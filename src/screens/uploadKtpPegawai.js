import React, {Component} from 'react'
import {View, FlatList, Image, List, TextInput, TouchableOpacity, ScrollView} from 'react-native'
import { Tab, Header,NumberInput, Input, Left, Right, Title, TabHeading, Tabs, CardItem, Layout, Body, Text, Button, Container, Picker, Content, Form, Item, Icon, Label, ListItem} from 'native-base';
// import SwitchToggle from 'react-native-switch-toggle';
import ImagePicker from 'react-native-image-picker';
import { connect } from 'react-redux';
// import NumericInput from 'react-native-numeric-input';
import {uploadDokumen} from '../publics/redux/actions/upload';
// import {getAllCategories} from '../publics/redux/actions/user'
import AsyncStorage from '@react-native-community/async-storage';

class uploadKtpPegawai extends Component{
    state = {
        filePath: {},
      };
      
      uploadFile = async() => {
        alert('sedang upload...')
        await this.props.dispatch(uploadDokumen(this.state.filePath));
        await AsyncStorage.setItem("linkKtpPegawai",this.props.uploadProp.dataUpload)
        // if  (this.props.uploadProp.isLoading){
          alert('sedang upload...')
        // }
        // else if (this.props.uploadProp.isError){
        //   alert('gagal upload, coba lagi')
        // }
        // else {
        this.props.navigation.navigate('PengajuanFilePegawai')
        // }
      }

      chooseFile = () => {
        let options = {
          title: 'Pilih Gambar',
          storageOptions: {
            skipBackup: true,
            path: 'images',
          },
        };
        ImagePicker.showImagePicker(options, response => {
          if (response.didCancel) {
            alert('Batal Pilih Gambar');
          } else if (response.error) {
            alert('Pilih Gambar Error: ' + response.error);
          } else {
            let source = response;
            this.setState({
              filePath: source,
            });
          }
        });
      };

      static navigationOptions = ({ navigation }) => {
        return {
            headerTitle: 'KTP',
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

    // postProduct(){
    //   const data = {
    //     name: this.state.product_name,
    //     price: this.state.product_price,
    //     location: this.state.city,
    //     pCategory: this.state.category,
    //     stock: this.state.stock,
    //     pSID : this.state.sellerID,
    //     condition: this.state.condition,
    //     productWeight: this.state.weight,
    //     countryOfOrigin: this.state.madeIn,
    //     warranty: this.state.warranty,
    //     image: this.state.filePath
    //   }
    
    //   console.log('lempar props', data);
    //   this.props.dispatch(postProduct(data));
      
    // }

    // navigateToData(){
    //   this.props.navigation.navigate('DetailProduct', { productId: this.props.insertedProduct.product._id })
    // }

    render(){
    //   console.log('cek sudah masuk apa belum', );
    //   if (this.props.inserted) {
    //     this.navigateToData();
    //   }
      
        return(
          <Container>
            <ScrollView>
            <Form>
            { this.state.filePath.uri == undefined ?
           <Image
           source={require("../assets/icons8-camera-100.png")}
           style={{ width: 100, alignSelf:'center', marginBottom:'5%', marginTop:'5%', height: 100 }}
           /> :  
           <Image
            source={{ uri: this.state.filePath.uri}}
            style={{ width: 250, alignSelf:'center', marginBottom:'5%', marginTop:'5%', borderWidth:2, borderColor:'green', height: 250 }}
            />
            } 
            <Button
              style={{borderWidth:2, borderColor:'green',width: '90%', backgroundColor: 'white', alignSelf:'center', justifyContent:'center'}}
              onPress={this.chooseFile.bind(this)}>
            <Text style={{color:'green'}}>Ambil/Pilih Gambar KTP</Text>
          </Button>
          <Button 
            style={{width: '90%', backgroundColor: '#2ECC71', alignSelf:'center', justifyContent:'center'}}
            onPress={() => this.uploadFile()}
          >
              <Text>Simpan</Text>
          </Button>
          </Form>
          {/* <View> */}
            {/* <Text>link:{this.props.uploadProp.dataUpload}</Text> */}
          {/* </View> */}
          </ScrollView>
          </Container>
        )
    }
}

const mapStateToProps = (state) =>{
  return {
      uploadProp : state.upload,
    //   categories : state.user.categories,
    //   inserted : state.user.inserted,
    //   insertedProduct : state.user.insertedProduct
  }
}

export default connect(mapStateToProps)(uploadKtpPegawai)