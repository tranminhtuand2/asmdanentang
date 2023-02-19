import React from "react";
import { createBottomTabNavigator } from "@react-navigation/bottom-tabs";

import { Animated, Image, style, StyleSheet } from "react-native";
import { colors, sizes } from "../constants/theme";
import HomeScreen from "../screen/HomeScreen";
import SearchScreen from "../screen/SearchScreen";
import FavouritScreen from "../screen/FavouritScreen";
import Icon from "../component/Icon";
import LoginScreen from "../screen/LoginScreen";

const tabs = [
  {
    name: 'Home',
    screen: HomeScreen,
  },
  {
    name: 'Search',
    screen: SearchScreen,
  },
  {
    name: 'Favorite',
    screen: FavouritScreen,
  },
  {
    name: 'user',
    screen: LoginScreen,
  },
];

const Tab = createBottomTabNavigator();


const TabNavigator = () => {
  const offsetAnimation = React.useRef(new Animated.Value(0)).current;
  return (
    <>
      <Tab.Navigator initialRouteName="Home" screenOptions={{
        headerShown: false,
        tabBarShowLabel: false,
        unmountOnBlur: true,


      }}>
        {tabs.map(({ name, screen }, index) => {
          return (
            <Tab.Screen
              key={name}
              name={name}
              component={screen}
              options={{
                tabBarIcon: ({ focused }) => {
                  return (
                    <Icon icon={name}
                      size={40}
                      style={{
                        tintColor: focused ? colors.primary : colors.gray,
                      }}
                    />
                  );
                },
              }}
              listeners={{
                focus: () => {
                  Animated.spring(offsetAnimation, {
                    toValue: index * (sizes.width / tabs.length),
                    useNativeDriver: true,
                  }).start();
                }
              }}
            />



          );
        })}
      </Tab.Navigator>
      <Animated.View style={[styles.indicator,
      {
        transform: [{
          translateX: offsetAnimation
        }]
      }]}>


      </Animated.View>
    </>
  );



}
const styles = StyleSheet.create({
  indicator: {
    position: "absolute",
    width: 30,
    height: 3,
    left: sizes.width / 3 / 2 - 30,
    bottom: 10,
    zIndex: 100,
    backgroundColor: colors.primary,


  }

});
export default TabNavigator;