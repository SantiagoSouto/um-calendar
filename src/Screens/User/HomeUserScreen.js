import React, { useState, useRef } from 'react';
import { View, Text, TouchableOpacity, StyleSheet, Alert } from 'react-native';
import { TamaguiProvider, YStack, H4, H5, useSafeRef, XStack } from 'tamagui'
import { useContext } from 'react';
import { AuthContext } from '../../Session/AuthContext'

import config from '../../../tamagui.config';
import { Button } from '../../Components/Button'
import { ImageBackground } from 'react-native';
import { useNavigation } from '@react-navigation/native';

export default function HomeUserScreen() {
    const backgroundImage = require('../../../assets/fachada_grande.jpeg');

    const { user } = useContext(AuthContext);

    const navigation = useNavigation();

    const handleCalendar = () => {
        navigation.navigate('Calendar');
    };

    const handleSeeSubjects = () => {
        navigation.navigate('See subjects');
    };

    const handleEditEvent = () => {
        navigation.navigate('Edit event');
    };

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

    return (
        <View style={{ flex: 1 }}>
            <TamaguiProvider config={config}>
                <ImageBackground
                    source={backgroundImage}
                    style={{ flex: 1 }}
                >
                    <YStack alignItems="left" mt="$2" paddingLeft="$5">
                        <H5 color="$blue1" alignItems='center'>
                            Hola, {user.name}!
                        </H5>
                    </YStack>
                    <YStack f={4} alignItems="center" space="$4" justifyContent="center">

                        <Button onPress={handleCalendar}>
                            <Button.Text style={styles.translucentText}>Mis materias</Button.Text>
                        </Button>

                        <Button onPress={handleCalendar}>
                            <Button.Text style={styles.translucentText}>Calendario</Button.Text>
                        </Button>

                        <Button onPress={handleEditEvent}>
                            <Button.Text style={styles.translucentText}>Inscribirme a materias</Button.Text>
                        </Button>

                        <Button onPress={handleEditEvent}>
                            <Button.Text style={styles.translucentText}>Agregar evento</Button.Text>
                        </Button>

                    </YStack>

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