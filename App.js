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
import AddEventScreen from './src/Screens/User/AddEditEvent';
import AllEventsScreen from './src/Screens/Admin/AllEvents';
import ApproveEvent from './src/Screens/Admin/ApproveEvent';
import { MaterialIcons } from '@expo/vector-icons';
import { logoutUser } from './src/Networking/User/Login';

export default function App() {

  const [loaded] = useFonts({
    Inter: require('@tamagui/font-inter/otf/Inter-Medium.otf'),
    InterBold: require('@tamagui/font-inter/otf/Inter-Bold.otf'),
  })

  if (!loaded) {
    return null
  }
  
  const Stack = createNativeStackNavigator();

  const logout = (navigation) => {
    return (
      <MaterialIcons 
        name="logout" 
        size={24} 
        color="black" 
        onPress={() => {
          logoutUser();
          navigation.navigate("Log in");
        }}
      />
    )
  }

  return (
    <AuthProvider>
    <View style={{ flex: 1 }}>
      <NavigationContainer>
        <Stack.Navigator>
          <Stack.Screen name="Log in" component={LoginScreen} options={{ headerShown: false, title: 'Iniciar sesión' }}/>
          <Stack.Screen name="Sign Up" component={SignUpScreen} options={{ headerShown: true, title: '' }}/>

          <Stack.Screen name="Home admin" component={HomeAdminScreen} options={({ navigation }) => ({ headerShown: true, title: '', headerRight: () => logout(navigation) })}/>
          <Stack.Screen name="Create subjects" component={CreateSubjectsScreen} options={({ navigation }) => ({ headerShown: true, title: '', headerRight: () => logout(navigation) })}/>
          <Stack.Screen name="See subjects" component={SubjectsAdminScreen} options={({ navigation }) => ({ headerShown: true, title: '', headerRight: () => logout(navigation) })}/>
          <Stack.Screen name="All events" component={AllEventsScreen} options={({ navigation }) => ({ headerShown: true, title: '', headerRight: () => logout(navigation) })}/>
          <Stack.Screen name="Edit event" component={EditEventScreen} options={({ navigation }) => ({ headerShown: true, title: '', headerRight: () => logout(navigation) })}/>
          <Stack.Screen name="Approve event" component={ApproveEvent} options={({ navigation }) => ({ headerShown: true, title: '', headerRight: () => logout(navigation) })}/>

          <Stack.Screen name="Home user" component={HomeUserScreen} options={({ navigation }) => ({ headerShown: true, title: '', headerRight: () => logout(navigation) })}/>
          <Stack.Screen name="My Subjects" component={MySubjectsScreen} options={({ navigation }) => ({ headerShown: true, title: '', headerRight: () => logout(navigation) })}/>
          <Stack.Screen name="Calendar" component={CalendarScreen} options={({ navigation }) => ({ headerShown: true, title: '', headerRight: () => logout(navigation) })}/>
          <Stack.Screen name="Enroll subject" component={EnrollSubjectScreen} options={({ navigation }) => ({ headerShown: true, title: '', headerRight: () => logout(navigation) })}/>
          <Stack.Screen name="Add event" component={AddEventScreen} options={({ navigation }) => ({ headerShown: true, title: '', headerRight: () => logout(navigation) })}/>
        </Stack.Navigator>
      </NavigationContainer>
      </View>
    </AuthProvider>
  )
}