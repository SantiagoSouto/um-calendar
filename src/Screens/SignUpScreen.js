import React, { useState, useRef } from 'react';
import { View, Text, TouchableOpacity, StyleSheet, Alert } from 'react-native';
import { TamaguiProvider, YStack, H1, useSafeRef, XStack } from 'tamagui'
import { useNavigation } from '@react-navigation/native';
import { useContext } from 'react';
import { AuthContext } from '../Session/AuthContext';

import config from '../../tamagui.config';
import { Input } from '../Components/Input'
import { Button } from '../Components/Button'
import { ImageBackground } from 'react-native';
import { Form } from 'tamagui'
import { API_URL_BASE } from '../../apiConfig';
import { ActivityIndicator } from 'react-native';

export default function SignUpScreen() {
    const backgroundImage = require('../../assets/fachada_grande.jpeg');

    const [email, setEmail] = useState('');
    const [username, setUsername] = useState('');
    const [password, setPassword] = useState('');
    const [passwordConfirmed, setPasswordConfirmed] = useState('');

    const [isLoading, setLoading] = useState(false);

    const { login } = useContext(AuthContext);

    const emailRef = useRef(null);
    const usernameRef = useRef(null);
    const passwordRef = useRef(null);
    const passwordConfirmedRef = useRef(null);

    const handleSubmit = async() => {

        if (!email.trim() || !username.trim() || !password.trim() || !passwordConfirmed.trim()) {
            Alert.alert('Error', 'Por favor, complete todos los campos');
            return;
        }

        if (password != passwordConfirmed) {
            Alert.alert('Error', 'Las contraseñas no coinciden');
            return;
        }

        setLoading(true);
        
        try {
            const url = API_URL_BASE + 'user/signup';
            const data = { name: username, email: email, password: password };

            const response = await fetch(url, {
                method: 'POST',
                headers: {
                    Accept: 'application/json',
                    'Content-Type': 'application/json'
                },
                body: JSON.stringify(data)
            });

            const statusCode = response.status;

            if (statusCode === 200) {
                const secondResponse = await fetch(API_URL_BASE + 'user');
                const secondData = await secondResponse.json();

                const userData = {
                    name: secondData.name,
                    email: secondData.email,
                    subjects: secondData.subjects,
                    isAdmin: secondData.isAdmin
                };
                login(userData);

                if (secondData.isAdmin) {
                    navigation.navigate('Home admin');
                } else {
                    navigation.navigate('Home user');
                }
            } else if (statusCode === 409){
                Alert.alert('Error', 'Email ya registrado');
            } else {
                Alert.alert('Error', 'Email y/o contraseña incorrectos');
            }
        } catch (error) {
            console.error(error);
            Alert.alert('Error', 'Network error');
        }

        setEmail('');
        setUsername('');
        setPassword('');
        setPasswordConfirmed('');

        setLoading(false);
    };

    const navigation = useNavigation();

    const isFormEmpty = !email.trim() || !username.trim() || !password.trim() || !passwordConfirmed.trim();

    return (
        <View style={styles.container}>
            <TamaguiProvider config={config}>
                <ImageBackground
                    source={backgroundImage}
                    style={styles.container}
                >
                    <YStack f={1} paddingTop="$15" alignItems="center" >
                        <H1 color="$blue1" alignItems='center'>
                            Registro
                        </H1>
                    </YStack>
                    <Form f={3} mt="$-12" padding="$3" space="$4" onSubmit={handleSubmit}>

                        <Input value={email} onChangeText={setEmail} placeholder="Ingrese correo de la UM" 
                                onSubmitEditing={() => usernameRef.current.focus()} ref={emailRef}/>
                        <Input value={username} onChangeText={setUsername} placeholder="Nombre completo" 
                            onSubmitEditing={() => passwordRef.current.focus()} ref={usernameRef}/>
                        <Input value={password} onChangeText={setPassword} secureTextEntry placeholder="Constraseña" 
                            onSubmitEditing={() => passwordConfirmedRef.current.focus()} ref={passwordRef}/>
                        <Input value={passwordConfirmed} onChangeText={setPasswordConfirmed} secureTextEntry 
                            placeholder="Repita constraseña" ref={passwordConfirmedRef}/>

                        <YStack alignItems="center" mt="$20">
                        {isLoading ? (
                                <ActivityIndicator size="small" color="white" />
                            ) : (
                            <Form.Trigger asChild>
                                <Button disabled={isFormEmpty}>
                                    <Button.Text style={styles.translucentText}>Registrarte</Button.Text>
                                </Button>
                            </Form.Trigger>
                        )}
                        </YStack>

                    </Form>
                </ImageBackground>
            </TamaguiProvider>
        </View>
    );
}

const styles = StyleSheet.create({
    whiteText: {
        color: 'white',
    },
    translucentText: {
        color: 'rgba(255, 255, 255, 0.9)',
    },
    boldText: {
        color: 'white',
        fontWeight: 'bold',
    },

    container: {
        flex: 1,
      },
});
