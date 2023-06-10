import React, { useState, useRef } from 'react';
import { View, Text, TouchableOpacity, StyleSheet, Alert } from 'react-native';
import { TamaguiProvider, YStack, H1, useSafeRef, XStack } from 'tamagui'
import { useNavigation } from '@react-navigation/native';

import config from '../../tamagui.config';
import { Input } from '../Components/Input'
import { Button } from '../Components/Button'
import { ImageBackground } from 'react-native';
import { Form } from 'tamagui'

export default function SignUpScreen() {
    const backgroundImage = require('../../assets/fachada_grande.jpeg');

    const [email, setEmail] = useState('');
    const [username, setUsername] = useState('');
    const [password, setPassword] = useState('');
    const [passwordConfirmed, setPasswordConfirmed] = useState('');

    const [emailError, setEmailError] = useState('');

    const validateEmail = () => {
        const emailRegex = /^[\w-]+(\.[\w-]+)*@((correo\.um\.edu\.uy)|(um\.edu\.uy))$/;
        if (!emailRegex.test(email)) {
          setEmailError('El formato del email no es correcto');
        } else {
          setEmailError('');
        }
      };

    const emailRef = useRef(null);
    const usernameRef = useRef(null);
    const passwordRef = useRef(null);
    const passwordConfirmedRef = useRef(null);

    const handleSubmit = () => {

        if (!email.trim() || !username.trim() || !password.trim() || !passwordConfirmed.trim()) {
            Alert.alert('Error', 'Por favor, complete todos los campos');
            return;
        }

        if (emailError != '') {
            Alert.alert('Error', 'El formato del email no es correcto');
            return;
        }

        console.log('Form submitted');
        console.log('Email:', email);
        console.log('Username:', username);
        console.log('Password:', password);
        console.log('Password confirmed:', passwordConfirmed);

        setEmail('');
        setUsername('');
        setPassword('');
        setPasswordConfirmed('');

        usernameRef.current.focus();
        passwordRef.current.focus();
        passwordConfirmedRef.current.focus();
    };

    const navigation = useNavigation();

    const handleGoBack = () => {
        navigation.goBack();
      };

      React.useLayoutEffect(() => {
        navigation.setOptions({
          headerLeft: () => (
            <TouchableOpacity onPress={handleGoBack}>
                <Text style={{ marginLeft: 5 }}>Go Back</Text>
            </TouchableOpacity>
          ),
        });
      }, [navigation]);

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
                                onSubmitEditing={() => usernameRef.current.focus()} ref={emailRef}  onBlur={validateEmail}/>
                        <Input value={username} onChangeText={setUsername} placeholder="Nombre completo" 
                            onSubmitEditing={() => passwordRef.current.focus()} ref={usernameRef}/>
                        <Input value={password} onChangeText={setPassword} secureTextEntry placeholder="Constraseña" 
                            onSubmitEditing={() => passwordConfirmedRef.current.focus()} ref={passwordRef}/>
                        <Input value={passwordConfirmed} onChangeText={setPasswordConfirmed} secureTextEntry 
                            placeholder="Repita constraseña" ref={passwordConfirmedRef}/>

                        <YStack alignItems="center" mt="$20">
                            <Form.Trigger asChild>
                                <Button disabled={isFormEmpty}>
                                    <Button.Text style={styles.translucentText}>Registrarte</Button.Text>
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

    container: {
        flex: 1,
      },
});
