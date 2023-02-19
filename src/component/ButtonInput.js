import React from "react";
import { Text, TouchableOpacity } from "react-native";
import { colors } from "../constants/theme";



const ButtonInput = ({ title, onPress = () => { } }) => {
    return (
        <TouchableOpacity
            activeOpacity={0.7}
            onPress={onPress}
            style={{
                height: 55,
                width: '100%',
                backgroundColor: "blue",
                alignItems: "center",
                justifyContent: "center",
                marginVertical: 10,
            }}>
            <Text
              
                style={{ color: colors.white, fontWeight: "bold", fontSize: 18 }}>{title}</Text>
            
       </TouchableOpacity> 
    );
}
export default ButtonInput;
    