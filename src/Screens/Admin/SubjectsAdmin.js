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
import { ScrollView } from 'tamagui';

export default function SubjectsAdminScreen({ route }) {
    const backgroundImage = require('../../../assets/fachada.jpg');

    const { user } = useContext(AuthContext);

    const subjects = route.params?.items || [];

    return (
        <View style={{ flex: 1 }}>
            <TamaguiProvider config={config}>
                <ImageBackground
                    source={backgroundImage}
                    style={{ flex: 1 }}
                >
                    <YStack alignItems="left" mt="$2" paddingLeft="$2">
                        <H5 color="$blue1" alignItems='center'>
                            Hola, {user.name}!
                        </H5>
                        <H1 color="$blue1">
                            Materias
                        </H1>
                    </YStack>
                    <ScrollView>
                        <YStack f={1} space="$2">
                            {subjects.map((subject, index) => (
                                <CellWithImageAndText
                                    key={index}
                                    subjectName={subject.name}
                                    career={subject.career}
                                    type={'Año:' + subject.year}
                                />
                            ))}
                        </YStack>
                    </ScrollView>
                </ImageBackground>
            </TamaguiProvider>
        </View>
    );
}