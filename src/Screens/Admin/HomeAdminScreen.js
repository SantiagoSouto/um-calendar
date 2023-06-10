import React, { useState, useRef } from 'react';
import { View, Text, TouchableOpacity, StyleSheet, Alert } from 'react-native';
import { TamaguiProvider, YStack, H4, H5, useSafeRef, XStack } from 'tamagui'

import config from '../../../tamagui.config';
import { Button } from '../../components/Button'
import { ImageBackground } from 'react-native';
import { useNavigation } from '@react-navigation/native';

export default function HomeAdminScreen() {
    const backgroundImage = require('../../../assets/fachada_grande.jpeg');

    const navigation = useNavigation();

    const handleCreateSubjects = () => {
        navigation.navigate('Create subjects');
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
                            Hola, usuario 1!
                        </H5>
                    </YStack>
                    <YStack f={4} alignItems="center" space="$4" justifyContent="center">

                        <Button onPress={handleCreateSubjects}>
                            <Button.Text style={styles.translucentText}>Crear materias</Button.Text>
                        </Button>

                        <Button onPress={handleSeeSubjects}>
                            <Button.Text style={styles.translucentText}>Ver materias</Button.Text>
                        </Button>

                        <Button onPress={handleEditEvent}>
                            <Button.Text style={styles.translucentText}>Editar eventos</Button.Text>
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