import React from "react";
import AsyncStorage from "@react-native-async-storage/async-storage";

import {
    Text, View, StyleSheet, ScrollView, Keyboard, Alert
} from "react-native";
import { colors } from "../constants/theme";
import Input from "../component/Input";
import ButtonInput from "../component/ButtonInput";
import { useNavigation } from "@react-navigation/native";
import Loader from "../component/Loader";
const RegisterScreen = () => {
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
        } else if (!inputs.email.match(/\S+@\S+\.\S+/)) {
            handleError('Please enter a valid email', 'email');
            valid = false;
        }
        if (!inputs.fullname) {
            handleError('Please input fullname', 'fullname');
            valid = false;

        }
        if (!inputs.phone) {
            handleError('Please input phone', 'phone');
            valid = false;

        }
        if (!inputs.password) {
            handleError('Please input password', 'password');
            valid = false;

        } else if (inputs.password.length < 5) {
            handleError('Please input password > 5', 'password');
            valid = false;
        }
        if (valid == true) {
            register();
        }

    };
    const register = () => {
        setLoading(true);
        setTimeout(() => {
            setLoading(false);
            try {
                AsyncStorage.setItem('user', JSON.stringify(inputs));
                navigation.navigate("Root")

            } catch (error) {
                Alert.alert("Error:", "Somethings went wrong")
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
        <View style={styles.container}>
            <Loader visible={loading} />
            <ScrollView contentContainerStyle={{ paddingTop: 50, paddingHorizontal: 20, }}>
                <Text style={{ color: colors.black, fontSize: 40, fontWeight: "bold" }}>Register</Text>
                <Text style={{ color: colors.gray, fontSize: 23, fontWeight: "bold" }}>Enter your Detail infomation</Text>
                <View style={{ marginVertical: 10 }}>
                    <Input label={"Email"} iconName="email-outline" placeholder='enter your email'
                        error={errors.email}
                        onfocus={() => { handleError(null, 'email') }}
                        onChangeText={text => handleOnChange(text, 'email')} />
                </View>
                <View style={{ marginVertical: 10 }}>
                    <Input label={"full name"} iconName="account-outline" placeholder='enter your name'
                        error={errors.fullname}
                        onfocus={() => { handleError(null, 'fullname') }}
                        onChangeText={text => handleOnChange(text, 'fullname')} />
                </View>
                <View style={{ marginVertical: 10 }}>
                    <Input keyboardType="numeric" label={"phone"} iconName="phone-outline" placeholder='enter your number'
                        error={errors.phone}
                        onfocus={() => { handleError(null, 'phone') }}
                        onChangeText={text => handleOnChange(text, 'phone')} />
                </View>
                <View style={{ marginVertical: 10 }}>
                    <Input label={"password"} iconName="lock-outline" placeholder='enter your pass' password
                        error={errors.password}
                        onfocus={() => { handleError(null, 'password') }}
                        onChangeText={text => handleOnChange(text, 'password')} />
                </View>
                <ButtonInput
                    onPress={validate}
                    title={"Registor"} />
                <Text
                    onPress={() => navigation.navigate('Root')}
                    style={{
                        color: colors.black,
                        textAlign: "center",
                        fontSize: 16,
                        fontWeight: "bold",
                    }}>Already have account? Login</Text>


            </ScrollView>

        </View>
    );

}
const styles = StyleSheet.create({
    container: {
        flex: 1,
        backgroundColor: colors.light,
    }
});
export default RegisterScreen;