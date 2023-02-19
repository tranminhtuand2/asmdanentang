import React, { useEffect, useRef, useState } from "react";
import { Image, ScrollView, StyleSheet, Text, TouchableOpacity, View,ActivityIndicator, Modal, TextInput, Button, PermissionsAndroid } from "react-native";
import { useNavigation } from '@react-navigation/native';
import { createStackNavigator } from '@react-navigation/stack';
import { colors } from "../constants/theme";
import {LinearGradient} from 'expo-linear-gradient';
const SearchScreen = () => {
    const navigation = useNavigation();
    const [data, setData] = useState([]);
    const [search, setSearch] = useState('');
    const searchRef = useRef();
    const [oldData, setOldData] = useState([]);
   
    useEffect(() => {
        fetch('https://63ea15a7811db3d7ef063f49.mockapi.io/dl/dulich')
            .then(res => res.json()).then(response => {
                console.log(response);
                setData(response);
                setOldData(response);
                
            })
      
    }, []);
    const onSearch = (text) => {
        if (text == '') {
            setData(oldData)
        } else {
            let tempList = data.filter(item => {
                return item.title.toLowerCase().indexOf(text.toLowerCase()) > -1;
            });
            setData(tempList);
            
        }
       
        
    };
    return (
        <LinearGradient
             start={{x: 0, y: 0}} end={{x: 1, y: 0}} colors={['#f5f7fa', '#c3cfe2']} style={style.container}
            
            // style={{ flex: 1, backgroundColor: colors.light }}
        >
            <View style={{
                width: '100%',
                flexDirection: "row",
                alignItems: "center",
                height: 70,
                marginTop: 20,
                justifyContent: "space-between",
              
                
            }}>
                <View style={{
                    width: "94%",
                    height: 50,
                    borderRadius: 10,
                    borderWidth: 0.2,
                    flexDirection: "row",
                    alignItems: 'center',
                    marginLeft: 10,
                    
                }}>
                    <Image
                        source={require('../../assets/icons/Search.png')}
                        style={{ width: 24, height: 24, marginLeft: 15, opacity: 0.5 }} />
                    <TextInput
                        ref={searchRef}
                        placeholder="search here..."
                        style={{ width: '76%', height: 50 }}
                        value={search}
                        onChangeText={txt => {
                            onSearch(txt)
                            setSearch(txt)

                        }}
                    />
                    {search == '' ? null : (
                        <TouchableOpacity
                            style={{ marginRight: 15 }}
                            onPress={() => {
                                searchRef.current.clear();
                                onSearch('');
                                setSearch('');

                            }}>
                            <Image
                                source={require('../../assets/icons/Back.png')}
                                style={{width:20,height:20,opacity:0.5}}
                            />
                            
                        </TouchableOpacity>
                    )}

                </View>
                
            </View>
                   {data.length > 0 ?
                <ScrollView style={{paddingHorizontal:10}}>
                {data.map((item, index) => {
                    return (
                        <LinearGradient colors={['#D7FFFE', '#FFFEFF',]} key={index} style={style.item}>
                            <Image style={{ width: 200, height: 100, resizeMode: "cover", borderRadius: 20 ,marginRight:10}}
                                source={{uri:item.image}} />
                            <View >
                                 {/* <Text style={{fontWeight:"bold",color:colors.red}}>id: {item.id}</Text> */}
                                 <Text style={{fontWeight:"700"}}>tiêu đề: {item.title}</Text>
                                 <Text style={{fontWeight:"bold",color:colors.red}}>vị trí: {item.location}</Text>
                                 {/* <Text style={{fontWeight:"300",color:colors.gray,overflow:"scroll"}}>miêu tả: { item.decreptions}</Text> */}

                            </View>
                                             
                        </LinearGradient>
                        
                    );
                })}
            </ScrollView> :
                <View style={{ flex: 2, alignItems: "center", justifyContent: 'center' ,marginTop:250}}>
                  
                    <ActivityIndicator  size="large" />
                </View>
                //loanding du lieu
                 }
            
            
        
        </LinearGradient>
    );
}
const style = StyleSheet.create({
    container: {
        paddingHorizontal: 5,
        height:"100%",
    },
    scrowview: {
        paddingHorizontal: 10,
        
    },
    item: {
        paddingVertical: 10,
        paddingHorizontal:20,
        borderRadius: 20,
        borderWidth: 2,
        backgroundColor:colors.cyan,
        marginBottom: 5,
        flexDirection: "row",
        justifyContent:"space-between"
    },
    textinput: {
        padding: 10,
        borderWidth: 1,
        borderColor: colors.green,
        marginTop: 10,
        
    },
    btncontainer: {
        borderWidth: 1,
        borderColor: colors.gray,
        padding:10
    },

});
const styles = StyleSheet.create({
    container: {
        paddingHorizontal:10
    },
    scrowview: {
        paddingHorizontal: 10,
        
    },
    item: {
        paddingVertical: 10,
        paddingHorizontal:20,
        borderRadius: 20,
        borderWidth: 2,
        marginBottom: 5,
        flexDirection: "row",
        justifyContent:"space-between"
    },
    textinput: {
        padding: 10,
        borderWidth: 1,
        borderColor: colors.green,
        marginTop: 10,
        
    },
    btncontainer: {
        borderWidth: 1,
        borderColor: colors.gray,
        padding:10
    },

});
export default SearchScreen;