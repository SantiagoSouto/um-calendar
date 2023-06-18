import React, { useState, useRef } from 'react';
import { View, Text, TouchableOpacity, StyleSheet, Alert } from 'react-native';
import { TamaguiProvider, YStack, H4, H5, useSafeRef, XStack } from 'tamagui'
import { useContext } from 'react';
import { AuthContext } from '../../Session/AuthContext'
import styles from '../../../styles';

import config from '../../../tamagui.config';
import { Button } from '../../Components/Button'
import { ImageBackground } from 'react-native';
import { useNavigation } from '@react-navigation/native';
import { API_URL_BASE } from '../../../apiConfig';

export default function HomeAdminScreen() {
    const backgroundImage = require('../../../assets/fachada.jpg');

    const { user } = useContext(AuthContext);

    const navigation = useNavigation();

    const handleCreateSubjects = () => {
        navigation.navigate('Create subjects');
    };

    const handleSeeSubjects = async () => {
        try {
            const response = await fetch(API_URL_BASE + 'subject/all');
            const data = await response.json();

            navigation.navigate('My Subjects', { items: data });
        } catch (error) {
            console.error('Error:', error);
        }
    };

    const handleEditEvent = () => {
        navigation.navigate('Edit event');
    };

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