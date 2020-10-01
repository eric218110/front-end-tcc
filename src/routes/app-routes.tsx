import * as React from 'react'
import { NavigationContainer } from '@react-navigation/native'
import { createStackNavigator } from '@react-navigation/stack'
import { Home as HomeScreen } from '../screens/Home'
import { Map as MapScreen } from '../screens/Map'
import { AddPoint as AddPointScreen } from '../screens/Point/Add'
import { AddPointDetails as AddPointDetailsScreen } from '../screens/Point/Add/AddPointDetails'
import { DetailsPoint as DetailsPointScreen } from '../screens/Point/Details'
import { Account as AccountScreen } from '../screens/Account'
import { LoginAccount as LoginAccountScreen } from '../screens/Account/Login'
import { SignUpAccount as SignUpAccountScreen } from '../screens/Account/SignUp'
import { ItemsProvider } from '../service/context/items-context'
import { colors } from '../styles/colors'

const Stack = createStackNavigator()

export const AppRoutes: React.FC = () => (
  <NavigationContainer>
    <ItemsProvider>
      <Stack.Navigator>
        <Stack.Screen
          options={{ headerShown: false }}
          name="Home"
          component={HomeScreen}
        />
        <Stack.Screen
          options={{ headerShown: false }}
          name="Maps"
          component={MapScreen}
        />
        <Stack.Screen
          options={() => ({
            title: '',
            headerTintColor: colors.primary,
            headerTransparent: true
          })}
          name="AddPoint"
          component={AddPointScreen}
        />
        <Stack.Screen
          options={() => ({
            title: '',
            headerTintColor: colors.primary,
            headerTransparent: true
          })}
          name="AddPointDetails"
          component={AddPointDetailsScreen}
        />
        <Stack.Screen
          options={() => ({
            title: '',
            headerTintColor: colors.primary,
            headerTransparent: true
          })}
          name="DetailsPoint"
          component={DetailsPointScreen}
        />
        <Stack.Screen
          options={() => ({
            title: '',
            headerTintColor: colors.primary,
            headerTransparent: true
          })}
          name="Account"
          component={AccountScreen}
        />
        <Stack.Screen
          options={() => ({
            title: '',
            headerTintColor: colors.primary,
            headerTransparent: true
          })}
          name="Login"
          component={LoginAccountScreen}
        />
        <Stack.Screen
          options={() => ({
            title: '',
            headerTintColor: colors.primary,
            headerTransparent: true
          })}
          name="SignUp"
          component={SignUpAccountScreen}
        />
      </Stack.Navigator>
    </ItemsProvider>
  </NavigationContainer>
)
