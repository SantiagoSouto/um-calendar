import { useFonts } from 'expo-font'
import { View } from 'react-native';

import { NavigationContainer } from '@react-navigation/native';
import { createNativeStackNavigator } from '@react-navigation/native-stack';
import LoginScreen from './src/Screens/LoginScreen';
import SignUpScreen from './src/Screens/SignUpScreen';
import HomeAdminScreen from './src/Screens/Admin/HomeAdminScreen';
import CreateSubjectsScreen from './src/Screens/Admin/CreateSubjectsScreen';
import SubjectsAdminScreen from './src/Screens/Admin/SubjectsAdmin';
import EditEventScreen from './src/Screens/Admin/EditEventScreen';
import HomeUserScreen from './src/Screens/User/HomeUserScreen';
import CalendarScreen from './src/Screens/User/CalendarScreen';
import { AuthProvider } from './src/Session/AuthContext';
import MySubjectsScreen from './src/Screens/User/MySubjectsScreen';
import EnrollSubjectScreen from './src/Screens/User/EnrollSubject';
import AddEventScreen from './src/Screens/User/AddEvent';

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
    <AuthProvider>
    <View style={{ flex: 1 }}>
      <NavigationContainer>
        <Stack.Navigator>
          <Stack.Screen name="Log in" component={LoginScreen} options={{ headerShown: false, title: 'Iniciar sesión' }}/>
          <Stack.Screen name="Sign Up" component={SignUpScreen} options={{ headerShown: true, title: '' }}/>

          <Stack.Screen name="Home admin" component={HomeAdminScreen} options={{ headerShown: true, title: '' }}/>
          <Stack.Screen name="Create subjects" component={CreateSubjectsScreen} options={{ headerShown: true, title: '' }}/>
          <Stack.Screen name="See subjects" component={SubjectsAdminScreen} options={{ headerShown: true, title: '' }}/>
          <Stack.Screen name="Edit event" component={EditEventScreen} options={{ headerShown: true, title: '' }}/>

          <Stack.Screen name="Home user" component={HomeUserScreen} options={{ headerShown: true, title: '' }}/>
          <Stack.Screen name="My Subjects" component={MySubjectsScreen} options={{ headerShown: true, title: '' }}/>
          <Stack.Screen name="Calendar" component={CalendarScreen} options={{ headerShown: true, title: '' }}/>
          <Stack.Screen name="Enroll subject" component={EnrollSubjectScreen} options={{ headerShown: true, title: '' }}/>
          <Stack.Screen name="Add event" component={AddEventScreen} options={{ headerShown: true, title: '' }}/>
        </Stack.Navigator>
      </NavigationContainer>
      </View>
    </AuthProvider>
  )
}