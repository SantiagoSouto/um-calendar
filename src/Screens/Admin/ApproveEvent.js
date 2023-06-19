import React, { useState, useRef, useContext } from 'react';
import { View, Text, TouchableOpacity, StyleSheet, Alert } from 'react-native';
import { TamaguiProvider, YStack, H1,H5, useSafeRef, XStack } from 'tamagui'
import { useNavigation } from '@react-navigation/native';
import { AuthContext } from '../../Session/AuthContext'
import config from '../../../tamagui.config';
import { Button } from '../../Components/Button'
import { SelectItem } from '../../Components/Drop';
import { ImageBackground } from 'react-native';

import { CellEventsApprove } from '../../Components/CellEvents';
import { ScrollView } from 'tamagui';

export default function ApproveEvent({ route }) {
    const backgroundImage = require('../../../assets/fachada.jpg');
    const { user } = useContext(AuthContext);
    const navigation = useNavigation();

    const events = route.params?.items || [];
    
    const handleAddSubject = () => {
        navigation.navigate('Create subjects');
    };
    const handleGoHome = () => {
        navigation.navigate('Home admin');
    };

    const eventsWithTime = events.map((event) => {
        const dateTime = event.date.split('T')[1].split(':');
        const time = dateTime[0] + ':' + dateTime[1];
        return {
          ...event,
          time,
        };
      });

    const eventDates = [...new Set(eventsWithTime.map((event) => event.date.split('T')[0]))];

    const eventsByDate = {};
  
    eventDates.forEach((date) => {
      eventsByDate[date] = eventsWithTime.filter((event) => event.date.split('T')[0] === date);
    });
  
    const eventsByDateArray = Object.entries(eventsByDate).map(([date, events]) => ({
      date,
      events,
    }));

    

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
                            Eventos
                        </H1>
                    </YStack>
                    <ScrollView>
                        <YStack f={1} space="$2">
                        {eventsByDateArray.map((event, index) => (
                        <CellEventsApprove
                            key={index}
                            events={event.events}
                        />
                        ))}
                        </YStack>
                    </ScrollView>
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
