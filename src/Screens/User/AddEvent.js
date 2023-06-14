import React, { useState, useRef } from 'react';
import { View, Text, TouchableOpacity, StyleSheet, Alert } from 'react-native';
import { TamaguiProvider, YStack, H1, useSafeRef, XStack } from 'tamagui'
import { useNavigation } from '@react-navigation/native';

import config from '../../../tamagui.config';
import { Input } from '../../Components/Input'
import { Button } from '../../Components/Button'
import { ImageBackground } from 'react-native';
import { Form } from 'tamagui'

export default function AddEventScreen() {
    const backgroundImage = require('../../../assets/fachada.jpg');

    const [subjectName, setsubjectName] = useState('');
    const [eventName, seteventName] = useState('');
    const [description, setdescription] = useState('');
    const [date, setdate] = useState('');

    const subjectNameRef = useRef(null);
    const eventNameRef = useRef(null);
    const descriptionRef = useRef(null);
    const dateRef = useRef(null);

    const handleSubmit = () => {

        if (!subjectName.trim() || !eventName.trim() || !description.trim() || !date.trim()) {
            Alert.alert('Error', 'Por favor, complete todos los campos');
            return;
        }

        console.log('Form submitted');
        console.log('subjectName:', subjectName);
        console.log('eventName:', eventName);
        console.log('description:', description);
        console.log('date:', date);

        setsubjectName('');
        seteventName('');
        setdescription('');
        setdate('');

        eventNameRef.current.focus();
        descriptionRef.current.focus();
        dateRef.current.focus();
    };

    const navigation = useNavigation();

    const isFormEmpty = !subjectName.trim() || !eventName.trim() || !description.trim() || !date.trim();

    return (
        <View style={styles.container}>
            <TamaguiProvider config={config}>
                <ImageBackground
                    source={backgroundImage}
                    style={styles.container}
                >
                    <YStack f={1} paddingTop="$15" alignItems="center" >
                        <H1 color="$blue1" alignItems='center'>
                            Agregar evento
                        </H1>
                    </YStack>
                    <Form f={3} mt="$-12" padding="$3" space="$4" onSubmit={handleSubmit}>

                        <Input value={subjectName} onChangeText={setsubjectName} placeholder="Ingrese materia" 
                                onSubmitEditing={() => eventNameRef.current.focus()} ref={subjectNameRef}/>
                        <Input value={eventName} onChangeText={seteventName} placeholder="Ingrese nombre de evento" 
                            onSubmitEditing={() => descriptionRef.current.focus()} ref={eventNameRef}/>
                        <Input value={description} onChangeText={setdescription} secureTextEntry placeholder="Ingrese descripción" 
                            onSubmitEditing={() => dateRef.current.focus()} ref={descriptionRef}/>
                        <Input value={date} onChangeText={setdate} secureTextEntry 
                            placeholder="Ingrese fecha" ref={dateRef}/>

                        <YStack alignItems="center" mt="$20">
                            <Form.Trigger asChild>
                                <Button disabled={isFormEmpty}>
                                    <Button.Text style={styles.translucentText}>Editar evento</Button.Text>
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