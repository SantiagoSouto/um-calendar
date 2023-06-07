import React, { useState, useRef } from 'react';
import { View, Text, TouchableOpacity, StyleSheet, Alert } from 'react-native';
import { TamaguiProvider, YStack, H1, useSafeRef, XStack } from 'tamagui'

import config from '../../tamagui.config';
import { Input } from '../components/Input'
import { Button } from '../components/Button'
import { ImageBackground } from 'react-native';
import { Form } from 'tamagui'
import { useNavigation } from '@react-navigation/native';

export default function LoginScreen() {
    const backgroundImage = require('../../assets/fachada_grande.jpeg');

    const [username, setUsername] = useState('');
    const [password, setPassword] = useState('');

    const usernameRef = useRef(null);
    const passwordRef = useRef(null);

    const handleSubmit = () => {

        if (!username.trim() || !password.trim()) {
            Alert.alert('Error', 'Please fill in all fields.');
            return;
        }

        console.log('Form submitted');
        console.log('Username:', username);
        console.log('Password:', password);

        setUsername('');
        setPassword('');

        passwordRef.current.focus();
    };

    const navigation = useNavigation();

    const handleSignUpClick = () => {
        navigation.navigate('Sign Up');
    };

    const isFormEmpty = !username.trim() || !password.trim();

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
                                ref={passwordRef}/>

                        <YStack alignItems="center">

                            <XStack>
                                <Text style={styles.whiteText}>¿No tienes usuario?</Text>
                                <TouchableOpacity onPress={handleSignUpClick}>
                                    <Text style={styles.boldText}> Haz click aquí!</Text>
                                </TouchableOpacity>
                            </XStack>

                        </YStack>

                        <YStack alignItems="center" mt="$20">
                            <Form.Trigger asChild>
                                <Button disabled={isFormEmpty}>
                                    <Button.Text style={styles.translucentText}>Iniciar sesión</Button.Text>
                                </Button>
                            </Form.Trigger>
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