import React from 'react';
import { createBottomTabNavigator } from '@react-navigation/bottom-tabs';
import { View, TouchableOpacity, StyleSheet, Platform } from 'react-native';
import { radius, spacingX, spacingY } from '../../constants/scaling';
import Ionicons from '@expo/vector-icons/Ionicons';
import HomeView from './home';
import AnalyticsView from './statistics';
import AddExpenseView from './addExpense';
import { appColors } from '../../constants/colors';
import ProfileNavigator from '../../navigations/profileNavigations';
import WalletNavigator from '../../navigations/walletsNavigations';

const Tab = createBottomTabNavigator();

const CustomAddButton = ({ children, onPress }) => (
  <TouchableOpacity
    style={styles.customButton}
    onPress={onPress}
    activeOpacity={0.7}
  >
    <View style={styles.innerButton}>{children}</View>
  </TouchableOpacity>
);

const TabsNavigation = () => {
  return (
    <Tab.Navigator
      screenOptions={({ route }) => ({  //accepts function  //route=current screen
        headerShown: false,
        tabBarShowLabel: false,
        tabBarActiveTintColor: appColors.baseGreen,
        tabBarInactiveTintColor: appColors.baseGray,
        tabBarStyle: {
          backgroundColor: appColors.white,
          position: 'absolute',
          height: spacingY._60,
          borderTopWidth: 0,
          elevation: 5,
        },
        tabBarIcon: ({ focused, color }) => {
          let iconName;

          switch (route.name) {
            case 'home':
              iconName = focused ? 'home' : 'home-outline';
              break;
            case 'analytics':
              iconName = focused ? 'bar-chart' : 'bar-chart-outline';
              break;
            case 'addExpense':
              iconName = focused ? 'add' : 'add';
              break;
            case 'wallets':
              iconName = focused ? 'wallet' : 'wallet-outline';
              break;
            case 'profile':
              iconName = focused ? 'person' : 'person-outline';
              break;
          }

          return (
            <Ionicons
              name={iconName}
              size={route.name === 'addExpense' ? spacingY._30 : spacingY._25}
              color={color}
            />
          );
        },
      })}
    >
      <Tab.Screen name="home" component={HomeView} />
      <Tab.Screen name="analytics" component={AnalyticsView} />
      <Tab.Screen
        name="addExpense"
        component={AddExpenseView}
        options={{ 
          tabBarIcon: () => (
            <Ionicons name="add" size={32} color={appColors.white} />
          ),
          tabBarButton: (props) => <CustomAddButton {...props} />,
        }}
      />
      <Tab.Screen name="wallets" component={WalletNavigator} />
      <Tab.Screen name="profile" component={ProfileNavigator} />
    </Tab.Navigator>
  );
};

const styles = StyleSheet.create({
  customButton: {
    top: -31,
    justifyContent: 'center',
    alignItems: 'center',
  },
  innerButton: {
    width: spacingX._60,
    height: spacingY._55,
    borderRadius: radius._30,
    backgroundColor: appColors.baseGreen,
    justifyContent: 'center',
    alignItems: 'center',
    shadowColor: '#000',
    // shadowOffset: { width: 0, height: 10 },
  //  shadowOpacity: 0.15,
  //  shadowRadius: 5,
    elevation: 5,
  },
});

export default TabsNavigation;
