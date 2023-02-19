import React from "react";
import { Image, StyleSheet, Text, TouchableOpacity, View } from "react-native";
import { colors, shadow, sizes, spacing } from "../constants/theme";
import { useNavigation } from '@react-navigation/native';
import { SharedElement } from "react-navigation-shared-element";

const CARD_WIDTH = sizes.width/2-(spacing.l+spacing.l/2);
const CARD_HEIGHT = 220;


const Triplist = ({ list }) => {
    const navigation = useNavigation();
    return (
        <View style={styles.container}>
            {list.map((item, index) => {
                return (
                    <TouchableOpacity style={styles.cardcontainer} key={item.id}
                        onPress={() => { navigation.navigate('TripDetails', { trip: item }); }}
                    >
                        <View style={[styles.card, shadow.light]} >
                            <SharedElement id={`trip.${item.id}.image`}>

                            
                            <View style={styles.imagebox}>
                                <Image style={styles.image} source={{ uri: item.image }} />
                                </View>
                                </SharedElement>
                            <View style={styles.footer}>
                                <View style={styles.titlebox}>
                                    <Text style={styles.title}>{item.title}</Text>
                                    <Text style={styles.location}>{item.location}</Text>
                                </View>
                            </View>
                            
                        </View>
                    </TouchableOpacity>
                );
            })}
        </View>
    );
}
const styles = StyleSheet.create({
    container: {
        flexDirection: 'row',
        flexWrap:"wrap",
    },
    cardcontainer: {
        marginLeft: spacing.l,
        marginBottom:spacing.l,
    },
    card: {
        width: CARD_WIDTH,
        height: CARD_HEIGHT,
        backgroundColor: colors.white,
        borderRadius:sizes.radius,

    },
     media: {
    flex: 1,
  },
    imagebox: {
        width: CARD_WIDTH,
        height: CARD_HEIGHT-60,
        borderTopLeftRadius: sizes.radius,
        borderTopRightRadius: sizes.radius,
        overflow: 'hidden',
    },
    image: {
        width: CARD_WIDTH,
        height: CARD_HEIGHT - 60,
        resizeMode:"cover",

    },
    footer: {
        flexDirection: "row",
        alignItems: 'center',
        marginTop: 6,
        marginLeft: 16,
        marginRight:16,
    },
    titlebox: {
        flex: 1,
        
    }, 
    title: {
        
       marginVertical: 4,
        fontSize: sizes.body,
        color: colors.primary,
        fontWeight:"bold",
        
    },
    location: {
        fontSize: sizes.body,
        color:colors.lightGray,
    }

});
export default Triplist;