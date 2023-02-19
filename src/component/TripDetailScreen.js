import React from "react";
import { View,StyleSheet, Image, Text } from "react-native";
import { colors, shadow, sizes, spacing } from "../constants/theme";
import { useSafeAreaInsets } from "react-native-safe-area-context";
import Icon from "./Icon";
import TripDetailsCard from "./TripDetailCard";
import *as Animatable from 'react-native-animatable';

const TripListDetail = ({ navigation, route }) => {
    const {trip} = route.params;
    const insets = useSafeAreaInsets();
  return (
    <View style={styles.container}>
      <Animatable.View style={[styles.backButton, {
        marginTop: insets.top
      }]}
        animation="fadeIn"
        delay={500}
        duration={400}
        easing="ease-in-out"
      >
        <Icon icon={"ArrowLeft"} style={styles.backIcon} onPress={navigation.goBack} />
      </Animatable.View>
     
        <View style={styles.imageBox}>
          <Image source={{ uri: trip.image }}
            style={[styles.image]}               
        />
        
      </View>
      <TripDetailsCard trip={trip}/>
    
      <View>
                
      </View>

    </View>
  );
}
TripListDetail.shareElements = route => {
  const {trip} = route.params;
  return [
    {
      id: `trip.${trip.id}.image`,
    },
  ];
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
  },
  imageBox: {
    borderRadius: 0,
    overflow: 'hidden',
  },
  image: {
    width:"100%",
    height:"100%",
      resizeMode:"stretch",
    
  },
  backButton: {
    position: 'absolute',
    left: spacing.l,
      zIndex: 1,
    top:20,
  },
  backIcon: {
    backgroundColor: colors.white,
    padding: 4,
    borderRadius: sizes.radius,
    ...shadow.light,
  },
  favoriteButton: {
    position: 'absolute',
    right: spacing.l,
    zIndex: 1,
  },
});
export default TripListDetail;