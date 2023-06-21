import React from 'react';
import { View, Text, Image, TouchableOpacity } from 'react-native';
import { XStack, YStack } from 'tamagui';
import styles from '../../styles';
import { Ionicons } from '@expo/vector-icons';
import { AntDesign } from '@expo/vector-icons'; 
import { useNavigation } from '@react-navigation/native';
import { API_URL_BASE } from '../../apiConfig';


export function CellEvents({ events }) {
    const navigation = useNavigation();

    const raw_date = events[0].date.split('T')[0];
    const split_date = raw_date.split('-');
    const date = split_date[2] + '/' + split_date[1] + '/' +  split_date[0];

    const handleEditEvent = () => {
        navigation.navigate('Edit event'); //change to Edit Event Screen
    };

    const handleApproveEvent = async(event) => {

      try {
        const data = {approved: true, _id: event._id};

        const request = {
          method: 'PUT',
          headers: {
            Accept: 'application/json',
            'Content-Type': 'application/json'
          },
          body: JSON.stringify(data)
        };
        fetch(await fetch(API_URL_BASE + 'events', request))
        Alert.Alert('Evento aprobado')

      } catch (error) {
          console.error('Error:', error);
      }
      
    };

    const handleDeclineEvent = async(event) => {
      try {

        const data = {_id: event._id};

        const request = {
          method: 'DELETE',
          headers: {
            Accept: 'application/json',
            'Content-Type': 'application/json'
          },
          body: JSON.stringify(data)
        };

        Alert.alert('Eliminar evento', 'Estas a punto de eliminar el evento' + event.name, [
          {
            text: 'Cancelar',
            onPress: () => console.log('Cancelado'),
            style: 'cancel',
          },

          {text: 'OK', onPress: () => console.log('OK')}, 
          fetch(await fetch(API_URL_BASE + 'events', request))
          
        ]);


        Alert.Alert('Evento no aprobado')

      } catch (error) {
          console.error('Error:', error);
      }
    };

  return (
    <View style={styles.container}>
    <XStack alignItems="center" paddingLeft="$2" paddingBottom="$2"> 
            <Ionicons name="ios-calendar-sharp" size={24} color="white" />
            <Text style={styles.boldCellEventDateText}>{date}</Text> 
    </XStack>
      {events.map((event, index) => (
        <View key={index} style={styles.contentContainer}>
          <View>
            <XStack alignItems = "center" paddingLeft="$2"> 
                <Text style={styles.boldCellEventText}>{event.name}</Text>
                <Text style={[styles.boldCellEventText, { marginLeft: 10 }]}>{'-'}</Text>
                <Text style={[styles.boldCellEventText, { marginLeft: 10 }]}>{event.time}</Text>
                <TouchableOpacity style={styles.button} onPress={handleEditEvent}>
                    <Ionicons name="pencil" size={14} color="white" />
                </TouchableOpacity>
            </XStack>
          </View>
        </View>
      ))}
      
      <View style={styles.separator} />
    </View>
  );
}

export function CellEventsApprove({ events }) {
  const navigation = useNavigation();

  const raw_date = events[0].date.split('T')[0];
  const split_date = raw_date.split('-');
  const date = split_date[2] + '/' + split_date[1] + '/' +  split_date[0];

  const handleEditEvent = () => {
      navigation.navigate('Sign Up'); //change to Edit Event Screen
  };

return (
  <View style={styles.container}>
  <XStack alignItems="center" paddingLeft="$2" paddingBottom="$2"> 
          <Ionicons name="ios-calendar-sharp" size={24} color="white" />
          <Text style={styles.boldCellEventDateText}>{date}</Text> 
  </XStack>
    {events.map((event, index) => (
      <View key={index} style={styles.contentContainer}>
        <View>
          <XStack alignItems = "center" paddingLeft="$2"> 
              <Text style={styles.boldCellEventText}>{event.name}</Text>
              <Text style={[styles.boldCellEventText, { marginLeft: 10 }]}>{'-'}</Text>
              <Text style={[styles.boldCellEventText, { marginLeft: 10 }]}>{event.time}</Text>
              <TouchableOpacity style={styles.button} onPress={handleApproveEvent(event)}>
                <AntDesign name="check" size={24} color="green" />
              </TouchableOpacity>
              <TouchableOpacity style={styles.button} onPress={handleDeclineEvent(event)}>
                <AntDesign name="close" size={24} color="red" />
              </TouchableOpacity>
          </XStack>
        </View>
      </View>
    ))}
    
    <View style={styles.separator} />
  </View>
);
}
