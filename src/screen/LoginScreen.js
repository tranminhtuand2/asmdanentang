import React from "react";
import {  Text, View, StyleSheet, ScrollView, Keyboard, Alert} from "react-native";
import { LinearGradient } from 'expo-linear-gradient';
import Loader from "../component/Loader";
import { colors } from "../constants/theme";
import Input from "../component/Input";
import ButtonInput from "../component/ButtonInput";
import { useNavigation } from "@react-navigation/native";
import AsyncStorage from "@react-native-async-storage/async-storage";

const LoginScreen = () => {
        const [inputs, setInputs] = React.useState({
        email: '',
        fullname: '',
        phone: '',
        password: '',
    })
    const [errors, setErrors] = React.useState({});
    const [loading, setLoading] = React.useState(false);


    const navigation = useNavigation();
    const validate = () => {
        Keyboard.dismiss();
        let valid = true;
        if (!inputs.email) {
            handleError('Please input email', 'email');
            valid = false;
        }
        
        if (!inputs.password) {
            handleError('Please input password', 'password');

        } 
        if (valid == true) {
            login();
        }

    };
    const login = () => {
        setLoading(true);
        setTimeout(async() => {
            setLoading(false);
            let userData = await AsyncStorage.getItem('user');
            let usetAdmins = await AsyncStorage.getItem('admin');
        
            if (userData) {
                userData = JSON.parse(userData);

                if (inputs.email == userData.email && inputs.password == userData.password
                ) {
            
                    AsyncStorage.setItem("user", JSON.stringify({ ...userData, loggedIn: true }));
                    alert("dang nhap thang cong")
                    
                } else if (inputs.email == "ADMIN", inputs.password == "@")
                {
                     AsyncStorage.setItem("adim", JSON.stringify({ ...usetAdmins, loggedIn: true }));
                    alert("dang nhap ADIM")
                }
                else {
                    console.log(inputs.email);
                      console.log(userData.email);

                    Alert.alert('ERROR','Invalid email or password')
                }
            } else {
                Alert.alert('ERROR','User does not exist')
            }
        }, 3000);
    }
    const handleOnChange = (text, input) => {
        setInputs(prevState => ({ ...prevState, [input]: text }));
    }
    const handleError = (errorMessage, input) => {
        setErrors((prevState) => ({ ...prevState, [input]: errorMessage }));
    }
    console.log(inputs);
    return (
        <LinearGradient colors={['#E3FDF5', '#FFE6FA',]} style={{ flex: 1, alignItems: "center", justifyContent: "center" }}>
             <Loader visible={loading} />
            <ScrollView contentContainerStyle={{ paddingTop: 50, paddingHorizontal: 20, }}>
                <Text style={{ color: colors.black, fontSize: 40, fontWeight: "bold" }}>Login</Text>
                <Text style={{ color: colors.gray, fontSize: 23, fontWeight: "bold" }}>Enter your Detail login</Text>
                <View style={{ marginVertical: 10 }}>
                    <Input label={"Email"} iconName="email-outline" placeholder='enter your email'
                        error={errors.email}
                        onfocus={() => { handleError(null, 'email') }}
                        onChangeText={text => handleOnChange(text, 'email')} />
                </View>
              
              
                <View style={{ marginVertical: 10 }}>
                    <Input label={"password"} iconName="lock-outline" placeholder='enter your pass' password
                        error={errors.password}
                        onfocus={() => { handleError(null, 'password') }}
                        onChangeText={text => handleOnChange(text, 'password')} />
                </View>
                <ButtonInput
                    onPress={validate}
                    title={"login"} />
                <Text
                    onPress={() => navigation.navigate('dangki')}
                    style={{
                        color: colors.black,
                        textAlign: "center",
                        fontSize: 16,
                        fontWeight: "bold",
                    }}>You not have account? register</Text>


            </ScrollView>
            
        </LinearGradient>
    );
}
export default LoginScreen;