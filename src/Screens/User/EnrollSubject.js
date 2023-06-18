import React, { useState, useRef, useEffect } from 'react';
import { View, Text, TouchableOpacity, StyleSheet, Alert } from 'react-native';
import { TamaguiProvider, YStack, H1, useSafeRef, XStack } from 'tamagui'
import { useNavigation } from '@react-navigation/native';

import config from '../../../tamagui.config';
import { Button } from '../../Components/Button'
import { SelectItem } from '../../Components/Drop';
import { ImageBackground } from 'react-native';
import { API_URL_BASE } from '../../../apiConfig';

export default function EnrollSubjectScreen({ route }) {
    const backgroundImage = require('../../../assets/fachada.jpg');

    const navigation = useNavigation();

    const subjects = route.params?.items || [];

    const [selectedSubject, setSelectedSubject] = useState('');

    const handleEnrollSubject = async () => {
        if (selectedSubject) {
          try {
            const response = await fetch(`${API_URL_BASE}user/subject/${selectedSubject}`, {
                method: 'PUT',
            });
        
              if (response.ok) {
                navigation.goBack();
              } else {
                throw new Error('Failed to enroll in subject');
              }
        } catch (error) {
            console.error('Error:', error);
        }
        } else {
          Alert.alert('Error', 'Por favor, seleccione una materia');
        }
      };
      
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
                                Inscribirse
                            </H1>
                        </YStack>
                        <YStack alignItems="center">
                            <SelectItem title={'Materias'} subjects={subjects} onSelect={setSelectedSubject} />
                        </YStack>
                        <YStack paddingTop="$10" alignItems="center" space="$4">
                        <Button onPress={handleEnrollSubject}>
                            <Button.Text style={styles.translucentText}>Inscribirme</Button.Text>
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

