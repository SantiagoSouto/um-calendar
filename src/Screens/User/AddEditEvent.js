import React, { useState, useRef } from 'react';
import { View, Text, TouchableOpacity, StyleSheet, Alert } from 'react-native';
import { TamaguiProvider, YStack, H1, useSafeRef, XStack } from 'tamagui'
import { useNavigation } from '@react-navigation/native';

import config from '../../../tamagui.config';
import { Input } from '../../Components/Input'
import { Button } from '../../Components/Button'
import { SelectItem } from '../../Components/Drop';
import { ImageBackground } from 'react-native';
import { Form } from 'tamagui'
import DateTimePicker from '../../Components/DateTimePicker';
import { API_URL_BASE } from '../../../apiConfig';

export default function AddEventScreen({route}) {

    const editEvent = route.params?.editEvent || null;
    const subjects = route.params?.subjects || [];
    const eventTypes = route.params?.eventTypes || [];
    const backgroundImage = require('../../../assets/fachada.jpg');

    const [selectedSubject, setSelectedSubject] = useState(editEvent ? editEvent.subject : '');
    const [eventName, setEventName] = useState(editEvent ? editEvent.name : '');
    const [eventType, setEventType] = useState(editEvent ? editEvent.eventType : '');
    const [date, setdate] = useState(editEvent ? new Date(editEvent.date).toISOString().split('T')[0] : "");
    const [time, settime] = useState(editEvent ? new Date(editEvent.date).toISOString().split('T')[1] : "");

    const handleUpdate = async () => {
        if (!selectedSubject.trim() || !eventName.trim() || !eventType.trim() || !date.trim() || !time.trim()) {
            Alert.alert('Error', 'Por favor, complete todos los campos');
            return;
        }

        try {
            const response = await fetch(`${API_URL_BASE}event`, {
                method: 'PUT',
                headers: {
                  'Accept': 'application/json',
                  'Content-Type': 'application/json',
                },
                body: JSON.stringify({
                    _id: editEvent._id,
                    name: eventName,
                    type: eventType,
                    subject: selectedSubject,
                    date: date,
                    time: time,
                })
            });
            
            if (response.ok) {
                Alert.alert("Evento actualizado correctamente");
                navigation.goBack();
            } else {
                throw new Error('Failed to update event');
            }
        } catch (error) {
            console.error('Error:', error);
        }

        setSelectedSubject('');
        setEventName('');
        setEventType('');
        setdate('');
        settime('');
    };

    const handleSubmit = async () => {
        if (!selectedSubject.trim() || !eventName.trim() || !eventType.trim() || !date.trim() || !time.trim()) {
            Alert.alert('Error', 'Por favor, complete todos los campos');
            return;
        }

        try {
            const response = await fetch(`${API_URL_BASE}event`, {
                method: 'POST',
                headers: {
                  'Accept': 'application/json',
                  'Content-Type': 'application/json',
                },
                body: JSON.stringify({
                    name: eventName,
                    type: eventType,
                    subject: selectedSubject,
                    date: date,
                    time: time,
                })
            });
            
            if (response.ok) {
                Alert.alert("Evento creado correctamente");
                navigation.goBack();
            } else {
                throw new Error('Failed to add event');
            }
        } catch (error) {
            console.error('Error:', error);
        }

        setSelectedSubject('');
        setEventName('');
        setEventType('');
        setdate('');
        settime('');
    };

    const navigation = useNavigation();

    const isFormEmpty = !selectedSubject.trim() || !eventName.trim() || !eventType.trim() || !date.trim() || !time.trim();

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
                    <Form f={3} mt="$-12" padding="$3" space="$4" onSubmit={editEvent ? handleUpdate : handleSubmit}>

                        <SelectItem title={'Seleccione la materia del evento'} subjects={subjects} onSelect={setSelectedSubject} />
                        <Input value={eventName} onChangeText={setEventName} placeholder="Ingrese nombre de evento" />
                        <SelectItem title={'Seleccione el tipo de evento'} eventType={eventTypes} onSelect={setEventType} />
                        <XStack style={{justifyContent: 'space-between'}}>
                            <DateTimePicker mode={"date"} setDateTime={setdate} />
                            <DateTimePicker mode={"time"} setDateTime={settime} />
                        </XStack>

                        <YStack alignItems="center" mt="$10">
                            <Form.Trigger asChild>
                                <Button disabled={isFormEmpty}>
                                    <Button.Text style={styles.translucentText}>{editEvent ? 'Editar' : 'Agregar'} evento</Button.Text>
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