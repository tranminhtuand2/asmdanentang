import React from "react";
import { View,StyleSheet, Text } from "react-native";
import { colors, sizes, spacing } from "../constants/theme";
import *as Animatable from 'react-native-animatable';

const TripDetailsCard = ({trip}) => {
    return (
        <View style={styles.card}>
            <Animatable.View style={styles.header}
                animation="fadeInUp"
                delay={500} duration={400}
                easing="ease-in-out"
            >
                <Text style={styles.title}>{trip.title}</Text>
                <Text style={styles.location}>{trip.location}</Text>
                 <Text style={styles.Text}>{trip.decreptions}</Text>
            </Animatable.View>

        </View>

    );
}
const styles = StyleSheet.create({
    card: {
        position: "absolute",
        bottom: 0,
        left: 0,
        right: 0,
        height: '35%',
        
    
},
  header: {
    paddingVertical: spacing.l,
    paddingHorizontal: spacing.l,
  },
  title: {
    fontSize: sizes.title,
    fontWeight: 'bold',
    color: colors.white,
  },
  location: {
      flexDirection: 'row',
      fontSize: 20,
      fontWeight:"700",
    alignItems: 'flex-start',
  },
  locationText: {
    fontSize: sizes.title,
    color: colors.white,
  },
  locationIcon: {
    tintColor: colors.gray,
  },
  scrollBox: {
    marginTop: spacing.s,
    marginBottom: spacing.m,
  },
  sectionHeader: {
    marginTop: spacing.m,
  },
  sectionTitle: {
    color: colors.lightGray,
    fontWeight: 'normal',
  },
  summary: {
    marginHorizontal: spacing.l,
  },
  summaryText: {
    color: colors.primary,
  },
  rating: {
    marginHorizontal: spacing.l,
    },
    Text: {
        fontSize: 18,
        color:colors.gray,
  },
});
export default TripDetailsCard;