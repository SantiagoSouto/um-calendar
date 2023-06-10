import React, { useState, useRef } from 'react';
import { View, Text, TouchableOpacity, StyleSheet, Alert } from 'react-native';
import { TamaguiProvider, YStack, H1, useSafeRef, XStack } from 'tamagui'
import { useNavigation } from '@react-navigation/native';

import config from '../../../tamagui.config';
import { Input } from '../../components/Input'
import { Button } from '../../components/Button'
import { ImageBackground } from 'react-native';
import { Form } from 'tamagui'

export default function CreateSubjectsScreen() {
    const backgroundImage = require('../../../assets/fachada_grande.jpeg');

    const [subjectName, setsubjectName] = useState('');
    const [description, setdescription] = useState('');
    const [career, setcareer] = useState('');
    const [timetable, settimetable] = useState('');

    const subjectNameRef = useRef(null);
    const descriptionRef = useRef(null);
    const careerRef = useRef(null);
    const timetableRef = useRef(null);

    const handleSubmit = () => {

        if (!subjectName.trim() || !description.trim() || !career.trim() || !timetable.trim()) {
            Alert.alert('Error', 'Por favor, complete todos los campos');
            return;
        }

        console.log('Form submitted');
        console.log('subjectName:', subjectName);
        console.log('description:', description);
        console.log('career:', career);
        console.log('timetable:', timetable);

        setsubjectName('');
        setdescription('');
        setcareer('');
        settimetable('');

        descriptionRef.current.focus();
        careerRef.current.focus();
        timetableRef.current.focus();
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

    const isFormEmpty = !subjectName.trim() || !description.trim() || !career.trim() || !timetable.trim();

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

                        <Input value={subjectName} onChangeText={setsubjectName} placeholder="Nombre de la materia" 
                                onSubmitEditing={() => descriptionRef.current.focus()} ref={subjectNameRef}/>
                        <Input value={description} onChangeText={setdescription} placeholder="Descripcion" 
                            onSubmitEditing={() => careerRef.current.focus()} ref={descriptionRef}/>
                        <Input value={career} onChangeText={setcareer} secureTextEntry placeholder="Carrera" 
                            onSubmitEditing={() => timetableRef.current.focus()} ref={careerRef}/>
                        <Input value={timetable} onChangeText={settimetable} secureTextEntry 
                            placeholder="Horario de clase" ref={timetableRef}/>

                        <YStack alignItems="center" mt="$20">
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
});
