import React, { Component } from 'react';
import { StyleSheet, View, Text, TextInput } from 'react-native';
import { Icon, Item } from 'native-base';
import Accordian from './Accordian'
import Icon2 from 'react-native-vector-icons/dist/FontAwesome5'

export default class PengajuanKendaraan extends Component {

  static navigationOptions = ({ navigation }) => ({
    headerTitle: 'Merk Kendaraan',
    headerTintColor: "white",
    headerTitleStyle: {
      width: '100%',
      textAlign: 'left',
      color: 'white',
      fontWeight: 'bold'
    },
    headerStyle: {
      backgroundColor: '#004d4d'
    },
  })

  constructor(props) {
    super(props);
    this.state = {
      menu: [
        {
          title: 'Honda',
          data: [
            { key: 'Revo', value: 'false' },
            { key: 'Vario', value: 'false' },
            { key: 'Beat', value: 'false' },
          ]
        },
        {
          title: 'Suzuki',
          data: [
            { key: 'Katana', value: 'false' },
            { key: 'Smash', value: 'false' },
            { key: 'Hayabusa', value: 'false' },
            { key: 'Shogun', value: 'false' }
          ]
        },
        {
          title: 'Yamaha',
          data: [
            { key: 'Vixion', value: 'false' },
            { key: 'Jupiter', value: 'false' },
            { key: 'Mio', value: 'false' },
            { key: 'Lexi', value: 'false' }
          ]
        },
        {
          title: 'Kawasaki',
          data: [
            { key: 'Ninja', value: 'false' },
            { key: 'Vulcan', value: 'false' },
            { key: 'Versys', value: 'false' },
            { key: 'KLX', value: 'false' }
          ]
        },
      ]
    }
  }

  render() {
    return (
      <View style={styles.container}>
        <View style={{ flexDirection: 'row' }}>
          <Item style={{
            width: '65%',
            marginLeft: '5%',
            borderColor: 'black',
          }}>
            <Icon style={{ color: 'grey', fontSize: 20 }} name='ios-search' />
            <TextInput
              placeholder="Cari"
              placeholderTextColor='grey'
              style={{
                fontSize: 16,
                color: 'grey',
                alignSelf: 'center'
              }}
            // value={this.state.email}
            // onChangeText={this.onChangeTextEmail}
            />
          </Item>
          <Icon2 style={{ marginLeft: '5%', marginTop: '4%', fontSize: 20 }} name="sort-amount-down"></Icon2>
          <Text style={{ marginLeft: '1%', marginTop: '3%', fontSize: 15 }}>Urutkan</Text>
        </View>
        {this.renderAccordians()}
      </View>
    );
  }

  renderAccordians = () => {
    const items = [];
    for (let item of this.state.menu) {
      items.push(
        <Accordian
          title={item.title}
          data={item.data}
        />
      );
    }
    return items;
  }
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
  }
});