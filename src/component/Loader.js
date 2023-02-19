import React from "react";
import { ActivityIndicator, StyleSheet, Text, useWindowDimensions, View } from "react-native";
import { colors } from "../constants/theme";

const Loader = ({ visible = false }) => {
    const { height, width } = useWindowDimensions();
    return visible && <View style={[styles.container, { height, width }]}>
        <View style={styles.load}>
            <ActivityIndicator size={"large"} color={"green"} />
            <Text style={{marginHorizontal:10,fontSize:16}}>loading...</Text>
      </View>
  </View>  
};
const styles = StyleSheet.create({
    container: {
        position: "absolute",
        zIndex: 10,
        backgroundColor: 'rgba(0,0,0,0.5)',
        justifyContent:"center",
    },
    load: {
        height: 70,
        backgroundColor: colors.white,
        marginHorizontal: 30,
        borderRadius: 10,
        flexDirection: "row",
        alignItems: "center",
        paddingHorizontal:20,
    }
});
export default Loader;