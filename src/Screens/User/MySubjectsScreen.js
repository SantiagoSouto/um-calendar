import React, { useState, useRef } from 'react';
import { View, Text, TouchableOpacity, StyleSheet, Alert } from 'react-native';
import { TamaguiProvider, YStack, H1, H5, useSafeRef, XStack } from 'tamagui'
import { useContext } from 'react';
import { AuthContext } from '../../Session/AuthContext'

import config from '../../../tamagui.config';
import { Button } from '../../Components/Button'
import { ImageBackground } from 'react-native';
import { useNavigation } from '@react-navigation/native';
import { CellWithImageAndText } from '../../Components/Cell';

export default function MySubjectsScreen() {
    const backgroundImage = require('../../../assets/fachada.jpg');

    const { user } = useContext(AuthContext);

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
                        <H1 color="$blue1">
                            Materias
                        </H1>
                    </YStack>
                    <YStack f={1} space="$2">

                        <CellWithImageAndText url="https://placekitten.com/200/300" subjectName="Aplicaciones móviles" 
                                                career="Ingeniería TEL/INF" type="Electiva"/>

                        <CellWithImageAndText url="https://placekitten.com/200/300" subjectName="Aplicaciones móviles" 
                                                career="Ingeniería TEL/INF" type="Electiva"/>

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