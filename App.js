import { useFonts } from 'expo-font'
import { StatusBar } from 'expo-status-bar'
import { TamaguiProvider, YStack, Text, H1 } from 'tamagui'

import config from './tamagui.config'
import { User } from './src/components/User'
import { Button } from './src/components/Button'
import { Input } from './src/components/Input'
import { ImageBackground } from 'react-native';
import LoginScreen from './src/Screens/Login'
import { createStackNavigator } from '@react-navigation/stack';

export default function App() {

  const [loaded] = useFonts({
    Inter: require('@tamagui/font-inter/otf/Inter-Medium.otf'),
    InterBold: require('@tamagui/font-inter/otf/Inter-Bold.otf'),
  })

  if (!loaded) {
    return null
  }

  const Stack = createStackNavigator();
  const Login = () => <View />;

  return (
    <NavigationContainer>
      <Stack.Navigator>
        <Stack.Screen name="Home" component={LoginScreen} />
        {/* Other screens */}
      </Stack.Navigator>
    </NavigationContainer>
  )
}