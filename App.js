import { useFonts } from 'expo-font'
import { View } from 'react-native';

import { NavigationContainer } from '@react-navigation/native';
import { createNativeStackNavigator } from '@react-navigation/native-stack';
import LoginScreen from './src/Screens/LoginScreen';
import SignUpScreen from './src/Screens/SignUpScreen';

export default function App() {

  const [loaded] = useFonts({
    Inter: require('@tamagui/font-inter/otf/Inter-Medium.otf'),
    InterBold: require('@tamagui/font-inter/otf/Inter-Bold.otf'),
  })

  if (!loaded) {
    return null
  }
  
  const Stack = createNativeStackNavigator();

  return (
    <View style={{ flex: 1 }}>
    <NavigationContainer>
      <Stack.Navigator>
        <Stack.Screen name="Log in" component={LoginScreen} options={{ headerShown: false }}/>
        <Stack.Screen name="Sign Up" component={SignUpScreen} options={{ headerShown: true }}/>
      </Stack.Navigator>
    </NavigationContainer>
    </View>
  )
}