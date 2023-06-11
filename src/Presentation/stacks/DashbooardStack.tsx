import React from 'react';
import {Image, View} from 'react-native';
import {createBottomTabNavigator} from '@react-navigation/bottom-tabs';

import {colors} from '@assets/colors/colors';

import HomeView from '@presentation/views/dashboard/Home.view';
import MyFavoriteView from '@presentation/views/dashboard/MyFavorited.view';
import ProfileView from '@presentation/views/dashboard/Profile.view';
import AddRecipeView from '@presentation/views/dashboard/AddRecipe.view';

import IconHome from '@assets/icons/navigation/icon_home.svg';
import IconHomeActive from '@assets/icons/navigation/icon_homeActive.svg';
import IconBookmark from '@assets/icons/navigation/icon_bookmark.svg';
import IconBookmarkActive from '@assets/icons/navigation/icon_bookmarkActive.svg';
import IconProfile from '@assets/icons/navigation/icon_profile.svg';
import IconProfileActive from '@assets/icons/navigation/icon_profileActive.svg';
import IconNotification from '@assets/icons/navigation/icon_notification.svg';
import IconNotificationActive from '@assets/icons/navigation/icon_notificationActive.svg';
import IconPlus from '@assets/icons/navigation/icon_plus.svg';
const backgroundNav = require('@assets/icons/navigation/Bg.png');

const Tab = createBottomTabNavigator();

const DashboardStack = () => {
  return (
    <Tab.Navigator
      sceneContainerStyle={{backgroundColor: 'transparent'}}
      screenOptions={{
        tabBarBackground: () => {
          return (
            <Image
              source={backgroundNav}
              style={{
                width: '100%',
              }}
            />
          );
        },
        tabBarShowLabel: false,
        tabBarStyle: {
          borderTopWidth: 0,
          elevation: 0,
          backgroundColor: 'transparent',
          position: 'absolute',
          height: 72,
        },
      }}>
      <Tab.Screen
        name="Home"
        component={HomeView}
        options={{
          headerShown: false,
          tabBarIcon: ({focused}) => {
            return (
              <View>
                <View>
                  {focused ? (
                    <IconHomeActive width={25} height={25} />
                  ) : (
                    <IconHome width={25} height={25} />
                  )}
                </View>
              </View>
            );
          },
        }}
      />

      <Tab.Screen
        name="MyFavorite"
        component={MyFavoriteView}
        options={{
          headerShown: false,
          tabBarIcon: ({focused}) => {
            return (
              <View>
                <View>
                  {focused ? (
                    <IconBookmarkActive width={25} height={25} />
                  ) : (
                    <IconBookmark width={25} height={25} />
                  )}
                </View>
              </View>
            );
          },
        }}
      />

      <Tab.Screen
        name="AddRecipe"
        component={AddRecipeView}
        options={{
          headerShown: false,
          tabBarIcon: ({focused}) => {
            return (
              <View>
                <View
                  style={{
                    backgroundColor: colors.primaryColors.primary100,
                    width: 50,
                    height: 50,
                    borderRadius: 50 / 2,
                    display: 'flex',
                    justifyContent: 'center',
                    alignItems: 'center',
                    marginBottom: 40,
                  }}>
                  <IconPlus />
                </View>
              </View>
            );
          },
        }}
      />

      <Tab.Screen
        name="Notification"
        component={HomeView}
        options={{
          headerShown: false,
          tabBarIcon: ({focused}) => {
            return (
              <View>
                <View>
                  {focused ? (
                    <IconNotificationActive width={25} height={25} />
                  ) : (
                    <IconNotification width={25} height={25} />
                  )}
                </View>
              </View>
            );
          },
        }}
      />

      <Tab.Screen
        name="Profile"
        component={ProfileView}
        options={{
          headerShown: false,
          tabBarIcon: ({focused}) => {
            return (
              <View>
                <View>
                  {focused ? (
                    <IconProfileActive width={25} height={25} />
                  ) : (
                    <IconProfile width={25} height={25} />
                  )}
                </View>
              </View>
            );
          },
        }}
      />
    </Tab.Navigator>
  );
};

export default DashboardStack;
