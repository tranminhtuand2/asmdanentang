import React, { useState,useEffect } from "react";
import { ScrollView, Text, View,StyleSheet } from "react-native";
import Mainheader from "../component/MainHeader";
import ScreenHeader from "../component/ScreenHeader";
import SectionHeader from "../component/SectionHeader";
import TopPlaceCaurose from "../component/TopplaceCarousel";
import Triplist from "../component/TripList";
import { colors } from "../constants/theme";
import { LinearGradient } from 'expo-linear-gradient';
import AsyncStorage from "@react-native-async-storage/async-storage";
const HomeScreen = () => {
   


    const [ListDL, setlistDL] = useState([]);
    
    useEffect(() => {
        getlistDL();
    }, []);
       const getlistDL = () =>  {
     fetch("https://63ea15a7811db3d7ef063f49.mockapi.io/dl/dulich",
            {
                method: "GET"
            }).then(res => {
                return res.json()
            }).then( res => {
                console.log("success");
                var response = res;
                setlistDL(response)
            }).catch(err => {
                console.log(err)
            }); 
      

    }
    return (
        <LinearGradient colors={['#E3FDF5', '#FFE6FA', ]}
            style={{ flex: 1, backgroundColor: colors.light }}>
            <Mainheader />
            <ScreenHeader mainTitle="Find Your" secondTitle="Dream Trip" />
            <ScrollView showsVerticalScrollIndicator={false}>
                <TopPlaceCaurose list={ListDL} />
                <SectionHeader title={"Popular trip"} />
                <Triplist list={ListDL}/>
            </ScrollView>

        </LinearGradient>
    );
}
export default HomeScreen;