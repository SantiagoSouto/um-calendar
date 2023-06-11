import React, { useState, useRef } from 'react';
import { View, Text, TouchableOpacity, StyleSheet, Alert } from 'react-native';
import { TamaguiProvider, YStack, H1, useSafeRef, XStack } from 'tamagui'
import { useContext } from 'react';
import { AuthContext } from '../Session/AuthContext';

import config from '../../tamagui.config';
import { Input } from '../Components/Input'
import { Button } from '../Components/Button'
import { ImageBackground } from 'react-native';
import { Form } from 'tamagui'
import { useNavigation } from '@react-navigation/native';
import { API_URL_BASE } from '../../apiConfig';
import { ActivityIndicator } from 'react-native';

export default function LoginScreen() {
    const backgroundImage = require('../../assets/fachada_grande.jpeg');

    const [username, setUsername] = useState('');
    const [password, setPassword] = useState('');

    const usernameRef = useRef(null);
    const passwordRef = useRef(null);

    const [isLoading, setLoading] = useState(false);

    const { login } = useContext(AuthContext);

    const handleSubmit = async () => {
        if (!username.trim() || !password.trim()) {
            Alert.alert('Error', 'Por favor, completa todos los campos');
            return;
        }

        setLoading(true);
        try {
            const url = API_URL_BASE + 'user/login';
            const data = { email: username, password: password };

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
            } else {
                Alert.alert('Error', 'Email y/o contraseña incorrectos');
            }
        } catch (error) {
            console.error(error);
            Alert.alert('Error', 'Network error');
        }

        setUsername('');
        setPassword('');

        setLoading(false);
    };

    const navigation = useNavigation();

    const handleSignUpClick = () => {
        navigation.navigate('Sign Up');
    };

    return (
        <View style={{ flex: 1 }}>
            <TamaguiProvider config={config}>
                <ImageBackground
                    source={backgroundImage}
                    style={{ flex: 1 }}
                >
                    <YStack f={1} paddingTop="$20" alignItems="center" >
                        <H1 color="$blue1" alignItems='center'>
                            Bienvenido!
                        </H1>
                    </YStack>
                    <Form f={2} mt="$-12" padding="$3" space="$4" onSubmit={handleSubmit}>

                        <Input value={username} onChangeText={setUsername} placeholder="Ingrese usuario"
                            onSubmitEditing={() => passwordRef.current.focus()} ref={usernameRef} />
                        <Input value={password} onChangeText={setPassword} secureTextEntry placeholder="Constraseña"
                            ref={passwordRef} />

                        <YStack alignItems="center">

                            <XStack>
                                <Text style={styles.whiteText}>¿No tienes usuario?</Text>
                                <TouchableOpacity onPress={handleSignUpClick}>
                                    <Text style={styles.boldText}> Haz click aquí!</Text>
                                </TouchableOpacity>
                            </XStack>

                        </YStack>

                        <YStack alignItems="center" mt="$20">
                            {isLoading ? (
                                <ActivityIndicator size="small" color="white" />
                            ) : (
                                <Form.Trigger asChild>
                                    <Button>
                                        <Button.Text style={styles.translucentText}>Iniciar sesión</Button.Text>
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
});