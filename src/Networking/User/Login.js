import { Alert } from 'react-native';
import { API_URL_BASE } from '../../../apiConfig';

export async function loginUser(username, password) {
  try {
    const url = API_URL_BASE + 'user/login';
    const data = { email: username, password: password };

    const response = await fetch(url, {
      method: 'POST',
      headers: {
        Accept: 'application/json',
        'Content-Type': 'application/json',
      },
      body: JSON.stringify(data),
    });

    const statusCode = response.status;

    if (statusCode === 200) {
      const secondResponse = await fetch(API_URL_BASE + 'user');
      const secondData = await secondResponse.json();

      const userData = {
        name: secondData.name,
        email: secondData.email,
        subjects: secondData.subjects,
        isAdmin: secondData.isAdmin,
      };
      return userData;
    } else {
      Alert.alert('Error', 'Email y/o contraseña incorrectos');
      return null;
    }
  } catch (error) {
    return null;
  }
}
