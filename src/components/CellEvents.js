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

    const handleEditEvent = async (event) => {
      try {
        const response = await fetch(API_URL_BASE + 'subject/all');
        const subjects = await response.json();

        const eventTypes = ['parcial', 'entrega', 'obligatorio', 'recuperacion'];

        navigation.navigate('Add event', { subjects: subjects, eventTypes: eventTypes, editEvent: event });
      } catch (error) {
          console.error('Error:', error);
      }
    };

    const handleApproveEvent = () => {
      //change to Edit Event Screen
  };

  const handleDeclineEvent = () => {
    //change to Edit Event Screen
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
                <TouchableOpacity style={styles.button} onPress={() => handleEditEvent(event)}>
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
              <TouchableOpacity style={styles.button} onPress={handleApproveEvent}>
                <AntDesign name="check" size={24} color="green" />
              </TouchableOpacity>
              <TouchableOpacity style={styles.button} onPress={handleDeclineEvent}>
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
