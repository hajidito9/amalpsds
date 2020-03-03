import React, { Component } from 'react';
import { Image, View } from 'react-native';
import { Container, Header, Content, DatePicker, Button, List, Item, Label, Input, Textarea, ListItem, Text, Left, Body, Right, Icon } from 'native-base';
export default class ListItemNoIndentExample extends Component {
  static navigationOptions = ({ navigation }) => {
    return {
        headerTitle: 'Data Diri',
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
          <List>
            <View style={{ flexDirection: 'row', marginTop: '10%', alignSelf: 'center', }}>
              <Image
                source={{ uri: 'https://img.icons8.com/plasticine/100/000000/user.png' }}
                style={{
                  height: 100,
                  width: 100,
                  borderRadius: 54,
                  alignSelf: 'center',
                }}
              />
            </View>
            <Item style={{ marginLeft: '5%', }} inlineLabel>
              <Label>Nama</Label>
              <Input
                value="Diaz Smith"
                placeholderTextColor='white'
                style={{
                  fontSize: 16,
                  color: 'grey',
                  marginLeft:'5%'
                }} />
            </Item>
            <Item style={{ marginLeft: '5%', }} inlineLabel>
              <Label>No. Hp</Label>
              <Input
                value="081123123123"
                placeholderTextColor='white'
                style={{
                  fontSize: 16,
                  color: 'grey',
                  marginLeft:'3%'
                }} />
            </Item>
            <Item style={{ marginLeft: '5%', }} inlineLabel>
              <Label>TTL</Label>
              <DatePicker
                defaultDate={new Date(1995, 5, 8)}
                minimumDate={new Date(1945, 1, 1)}
                maximumDate={new Date(2019, 12, 31)}
                locale={"en"}
                timeZoneOffsetInMinutes={undefined}
                modalTransparent={false}
                animationType={"fade"}
                androidMode={"default"}
                //   placeHolderText='Select Date'
                placeHolderTextStyle={{ color: "grey",  marginLeft:'20%'}}
                textStyle={{ color: "grey",  marginLeft:'20%'}}
                onDateChange={this.setDate}
                disabled={false}
              />
            </Item>
            <Item style={{ marginLeft: '5%', }} inlineLabel>
              <Label>Alamat</Label>
              <Textarea style={{ width: "75%", height: 100 }} bordered placeholder="Alamat" />
            </Item>
            <Item style={{ marginLeft: '5%', }} inlineLabel>
              <Label>Email</Label>
              <Input
                value="admin@admin.com"
                placeholderTextColor='white'
                style={{
                  fontSize: 16,
                  color: 'grey',
                  marginLeft:'5%'
                }} />
            </Item>
            <Item style={{ marginLeft: '5%', }} inlineLabel>
              <Label>No KTP</Label>
              <Input
                value="02295900011"
                placeholderTextColor='white'
                style={{
                  fontSize: 16,
                  color: 'grey',
                }} />
            </Item>
            <Item style={{ marginLeft: '5%', }} inlineLabel>
              <Label>Kode Pos</Label>
              <Input
                value="62835"
                placeholderTextColor='white'
                style={{
                  fontSize: 16,
                  color: 'grey',
                }} />
            </Item>
          </List>
          <Button style={{ textAlign: 'center', marginLeft: '60%', marginTop: '10%', marginBottom: '5%', width: '30%' }} rounded success
           onPress={() => this.props.navigation.navigate('Profile')}
          >
            <Text style={{ marginLeft: '15%', marginTop: '37%' }}>Simpan</Text>
          </Button>
        </Content>
      </Container>
    );
  }
}