import { Alert } from 'react-native';
import { API_URL_BASE } from '../../../apiConfig';

export async function isLoggedIn() {
  try {
    const url = API_URL_BASE + 'user';
    
    const response = await fetch(url);

    const statusCode = response.status;

    if (statusCode === 200) {
      const data = await response.json();

      const userData = {
        name: data.name,
        email: data.email,
        subjects: data.subjects,
        isAdmin: data.isAdmin,
      };
      return userData;
    }
  } catch (error) {
    return null;
  }
}

export async function loginUser(username, password) {
  try {
    const url = API_URL_BASE + 'user/login';
    const data = { email: username, password: password };

    const response = await fetch(url, {
      method: 'POST',
      headers: {
        'Accept': 'application/json',
        'Content-Type': 'application/json',
      },
      body: JSON.stringify(data),
    });

    const statusCode = response.status;

    if (statusCode === 200) {
      return isLoggedIn();
    } else {
      Alert.alert('Error', 'Email y/o contraseña incorrectos');
      return null;
    }
  } catch (error) {
    return null;
  }
}

export async function logoutUser() {
  try {
    const url = API_URL_BASE + 'user/logout';

    const response = await fetch(url);

    const statusCode = response.status;

    if (statusCode === 200) {
      
    } else {
      Alert.alert('Error', 'Email y/o contraseña incorrectos');
      return null;
    }

  } catch (error) {
    return null;
  }
}