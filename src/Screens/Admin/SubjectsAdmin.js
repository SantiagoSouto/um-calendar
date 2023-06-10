import React, { useState, useRef } from 'react';
import { View, Text, TouchableOpacity, StyleSheet, Alert } from 'react-native';
import { TamaguiProvider, YStack, H1, useSafeRef, XStack } from 'tamagui'
import { useNavigation } from '@react-navigation/native';

import config from '../../../tamagui.config';
import { Input } from '../../components/Input'
import { Button } from '../../components/Button'
import { SelectDemoItem } from '../../components/Drop';
import { ImageBackground } from 'react-native';

export default function SubjectsAdminScreen() {
    const backgroundImage = require('../../../assets/fachada_grande.jpeg');

    const navigation = useNavigation();

    const handleGoBack = () => {
        navigation.goBack();
    };
    const handleGoHome = () => {
        navigation.navigate('Home admin');
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

                    <YStack space="$15">
                        <YStack paddingTop="$10" alignItems="center" >
                            <H1 color="$blue1" alignItems='center'>
                                Ver materia
                            </H1>
                        </YStack>
                        <YStack alignItems="center">
                            <SelectDemoItem />
                        </YStack>
                        <YStack paddingTop="$10" alignItems="center" space="$4">
                            <Button onPress={handleGoBack}>
                                <Button.Text style={styles.translucentText}>Agregar materia</Button.Text>
                            </Button>
                            <Button onPress={handleGoHome}>
                                <Button.Text style={styles.translucentText}>Menú principal</Button.Text>
                            </Button>
                        </YStack>
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

    container: {
        flex: 1,
    },
});


