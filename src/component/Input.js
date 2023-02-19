import React from "react";
import { StyleSheet, Text, TextInput, View } from "react-native";
import Icon from 'react-native-vector-icons/MaterialCommunityIcons';
import { colors } from "../constants/theme";

const Input = ({ label, iconName, error, password, onfocus = () => { }, ...props }) => {
    const [isFocused, setIsFocused] = React.useState(false);
    const [hidePassword, setHidePassword] = React.useState(password); 
    return (
        <View style={{ marginBottom: 20 }}>
            <Text style={styles.label}>{label}</Text>
            <View style={[styles.inputContainer,{borderColor:error?"red":isFocused?colors.lightGray:colors.light}]}>
                <Icon name={iconName} style={{ fontSize: 20, color: colors.lightGray, marginRight: 10 }} />
                <TextInput
                    secureTextEntry={hidePassword}
                    autoCorrect={false}
                    onFocus={() => {
                        onfocus();
                        setIsFocused(true);
                    }}
                    onBlur={() => {
                        setIsFocused(false);
                    }}
                    style={{ color: colors.lightGray, flex: 1 }} {...props} />
                {password &&  <Icon
                    onPress={() => setHidePassword(!hidePassword)}
                    style={{ fontSize: 22, color: colors.lightGray }}
                    name={ hidePassword? "eye-outline":"eye-off-outline"} />}
               
               
            </View>
             <View>
                    {error && <Text style={{color:"red",fontSize:12,marginTop:5}}>{error}</Text>}
                </View>
        
    </View>) 
}
const styles = StyleSheet.create({
    label: {
        marginVertical: 5,
        fontSize: 14,
        color:colors.gray,
    },
    inputContainer: {
        height: 55,
        backgroundColor: colors.light,
        flexDirection: "row",
        paddingHorizontal: 15,
        borderWidth: 0.5,
        alignItems:'center',
    },
    
});
export default Input;