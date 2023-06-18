import React, { useState, useRef } from 'react';
import { View, Text, TouchableOpacity, StyleSheet, Alert } from 'react-native';
import { TamaguiProvider, YStack, H1, useSafeRef, XStack } from 'tamagui';
import Checkbox from 'expo-checkbox';
import { SelectItem } from '../../Components/Drop';
import config from '../../../tamagui.config';
import { Input } from '../../Components/Input'
import { Button } from '../../Components/Button'
import { ImageBackground } from 'react-native';
import { Form } from 'tamagui';
import { API_URL_BASE } from '../../../apiConfig';
import { useNavigation } from '@react-navigation/native';

export default function CreateSubjectsScreen() {
    const backgroundImage = require('../../../assets/fachada.jpg');
    const navigation = useNavigation();

    const [subjectName, setsubjectName] = useState('');

    const [careers, setCareers] = useState([
        { name: 'Ingeniería telemática', isChecked: false },
        { name: 'Ingeniería informática', isChecked: false },
        { name: 'Ingeniería industrial', isChecked: false },
        { name: 'Ingeniería civil', isChecked: false },
        { name: 'Electiva', isChecked: false }
    ]);

    const [selectedYear, setSelectedYear] = useState('');
    const years = [{ 'name': '1' }, { 'name': '2' }, { 'name': '3' }, { 'name': '4' }, { 'name': '5' }]

    const subjectNameRef = useRef(null);

    const handleSubmit = async () => {
        const selectedCareers = careers.filter(career => career.isChecked);

        if (selectedCareers.length == 0) {
            selectedCareer = selectedCareers[0];
        } else if (selectedCareers.some(career => career.name === 'Ingeniería telemática')) {
            selectedCareer = "Ingeniería TEL/INF";
        } else {
            selectedCareer = "Ingeniería IND/CIV";
        }

        if (!subjectName.trim() || !selectedYear.trim() || selectedCareers.length == 0) {
            Alert.alert('Error', 'Por favor, complete todos los campos');
            return;
        }

        const subjectData = {
            name: subjectName,
            career: selectedCareer,
            year: parseInt(selectedYear),
            event: []
        };

        try {
            const response = await fetch(API_URL_BASE + 'subject', {
                method: 'POST',
                headers: {
                    Accept: 'application/json',
                    'Content-Type': 'application/json'
                },
                body: JSON.stringify(subjectData)
            });

            const statusCode = response.status;

            if (statusCode === 200) {
                navigation.goBack();
            } else {
                throw new Error('Error posting subject');
            }
        } catch (error) {
            console.error('Error posting subject', error);
        }

        setsubjectName('');
    };

    const isFormEmpty = !subjectName.trim();

    const handleCheckboxToggle = (index) => {
        const updatedCareers = [...careers];
        updatedCareers[index].isChecked = !updatedCareers[index].isChecked;
        setCareers(updatedCareers);
    };

    return (
        <View style={styles.container}>
            <TamaguiProvider config={config}>
                <ImageBackground
                    source={backgroundImage}
                    style={styles.container}
                >
                    <YStack f={1} paddingTop="$10" alignItems="center" >
                        <H1 color="$blue1" alignItems='center'>
                            Crear materia
                        </H1>
                    </YStack>
                    <Form f={3} mt="$-12" padding="$3" space="$4" onSubmit={handleSubmit}>

                        <Input value={subjectName} onChangeText={setsubjectName} placeholder="Nombre de la materia"
                            ref={subjectNameRef} />

                        {careers.map((career, index) => (
                            <XStack alignItems="center" style={styles.checkboxContainer} key={index}>
                                <Checkbox
                                    style={styles.checkbox}
                                    value={career.isChecked}
                                    onValueChange={() => handleCheckboxToggle(index)}
                                    color={career.isChecked ? '#0000ff' : undefined}
                                />
                                <Text style={styles.whiteText}>{career.name}</Text>
                            </XStack>
                        ))}

                        <SelectItem title={'Año'} subjects={years} onSelect={setSelectedYear} />

                        <YStack alignItems="center" mt="$5">
                            <Form.Trigger asChild>
                                <Button disabled={isFormEmpty}>
                                    <Button.Text style={styles.translucentText}>Crear materia</Button.Text>
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
    section: {
        flexDirection: 'row',
        alignItems: 'center',
    },
    paragraph: {
        fontSize: 15,
    },
    checkbox: {
        margin: 8,
    },
    checkboxContainer: {
        flexDirection: 'row',
        alignItems: 'center',
    },
});
