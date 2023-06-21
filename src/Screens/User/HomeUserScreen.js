import React, { useState, useRef } from 'react';
import { View, Text, TouchableOpacity, StyleSheet, Alert } from 'react-native';
import { TamaguiProvider, YStack, H4, H5, useSafeRef, XStack } from 'tamagui'
import { useContext } from 'react';
import { AuthContext } from '../../Session/AuthContext'

import config from '../../../tamagui.config';
import { Button } from '../../Components/Button'
import { ImageBackground } from 'react-native';
import { useNavigation } from '@react-navigation/native';
import { API_URL_BASE } from '../../../apiConfig';

export default function HomeUserScreen() {
    const backgroundImage = require('../../../assets/fachada.jpg');

    const { user } = useContext(AuthContext);

    const navigation = useNavigation();

    const handleCalendar = async () => {
        try {
            const pendingEventsResponse = await fetch(API_URL_BASE + 'event/pending');
            const pendingEvents = await pendingEventsResponse.json();

            const approvedEventsResponse = await fetch(API_URL_BASE + 'event/approved');
            const approvedEvents = await approvedEventsResponse.json();

            let items = {}
            const now = (new Date()).toISOString().split('T')[0];

            pendingEvents.forEach((event) => {
                const eventTime = new Date(event.date).toLocaleTimeString('es-AR', {hour12: false, timeZone: 'America/Montevideo'});
                const eventDate = new Date(event.date).toISOString().split('T')[0];
                
                if (!items[eventDate]) {
                    items[eventDate] = [];
                }
                
                if (!items[now]) {
                    items[now] = [];
                }
            
                items[eventDate].push({
                  name: event.name,
                  hour: eventTime,
                  eventType: event.eventType,
                  approved: "Pendiente",
                  height: 80
                });
            });

            approvedEvents.forEach((event) => {
                const eventTime = new Date(event.date).toLocaleTimeString('es-AR', {hour12: false, timeZone: 'America/Montevideo'});
                const eventDate = new Date(event.date).toISOString().split('T')[0];
          
                if (!items[eventDate]) {
                  items[eventDate] = [];
                }
          
                if (!items[now]) {
                  items[now] = [];
                }
            
                items[eventDate].push({
                  name: event.name,
                  hour: eventTime,
                  eventType: event.eventType,
                  approved: "Confirmado",
                  height: 80
                });
            });

            navigation.navigate('Calendar', { items: items });
        } catch (error) {
            console.error('Error:', error);
        }
       
    };

    const handleSeeSubjects = async () => {
        try {
            const response = await fetch(API_URL_BASE + 'user/subjects');
            const data = await response.json();

            navigation.navigate('My Subjects', { items: data });
        } catch (error) {
            console.error('Error:', error);
        }
    };

    const handleEnrollSubject = async () => {
        try {
            const response = await fetch(API_URL_BASE + 'subject/all');
            const data = await response.json();

            navigation.navigate('Enroll subject', { items: data });
        } catch (error) {
            console.error('Error:', error);
        }
    };

    const handleAddEvent = async () => {
        try {
            const response = await fetch(API_URL_BASE + 'subject/all');
            const subjects = await response.json();

            const eventTypes = ['parcial', 'entrega', 'obligatorio', 'recuperacion'];

            navigation.navigate('Add event', { subjects: subjects, eventTypes: eventTypes });
        } catch (error) {
            console.error('Error:', error);
        }
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

                        <Button onPress={handleSeeSubjects}>
                            <Button.Text style={styles.translucentText}>Mis materias</Button.Text>
                        </Button>

                        <Button onPress={handleCalendar}>
                            <Button.Text style={styles.translucentText}>Calendario</Button.Text>
                        </Button>

                        <Button onPress={handleEnrollSubject}>
                            <Button.Text style={styles.translucentText}>Inscribirme a materias</Button.Text>
                        </Button>

                        <Button onPress={handleAddEvent}>
                            <Button.Text style={styles.translucentText}>Agregar evento</Button.Text>
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