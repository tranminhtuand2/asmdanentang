import React from "react";
import { FlatList, Text, View,StyleSheet, TouchableOpacity, Image } from "react-native";
import { colors, shadow, sizes, spacing } from "../constants/theme";
import { useNavigation } from '@react-navigation/native';
import { SharedElement } from "react-navigation-shared-element";


const CARD_HEIGHT = 200;
const CARD_WIDTH = sizes.width - 100;
const CARD_WIDTH_SPACING = CARD_WIDTH + spacing.l;

const TopPlaceCaurose = ({ list }) => {
    const navigation = useNavigation();

    return (
        <FlatList
            data={list}
            horizontal
            keyExtractor={i => i.id}
            snapToInterval={CARD_WIDTH_SPACING}
            decelerationRate="fast"
            showsHorizontalScrollIndicator={false}
            renderItem={({ item ,index}) => {
                return (
                    <TouchableOpacity style={{ marginLeft: spacing.l, marginRight: index === list.length - 1 ? spacing.l : 0 }}
                        onPress={() => {navigation.navigate('TripDetails',{trip:item}) }}
                    >
                        <View style={[styles.card, shadow.dark]}>
                            <SharedElement id={`trip.${item.id}.image`}>

                            
                            <View style={styles.imagebox}>
                                 <Image style={styles.image} source={{uri:item.image}}/>
                                </View>
                                </SharedElement>
                            <View style={styles.titleBox}>
                                <Text style={styles.title}>{item.title}</Text>
                                 <Text style={styles.location}>{ item.location}</Text>

                            </View>
                           
                        </View>

                    </TouchableOpacity>
                  
                );
            }}
        
        />
    );
    
}
const styles = StyleSheet.create({
  card: {
    height: CARD_HEIGHT,
  },
  titleBox: {
    position: 'absolute',
    top: CARD_HEIGHT - 80,
    left: 16,
  },
  title: {
    fontSize: sizes.h2,
    fontWeight: 'bold',
    color: colors.white,
  },
  location: {
    fontSize: sizes.h3,
    color: colors.white,
    },
    imagebox: {
        width:CARD_WIDTH,
        height: CARD_HEIGHT,
        borderRadius: sizes.radius,
        overflow:"hidden",
    },
    image: {
        width: CARD_WIDTH,
        height: CARD_HEIGHT,
        resizeMode:"cover",
    },
    
});
export default TopPlaceCaurose;
