import React, { Component } from 'react';
import { Alert, StyleSheet, Text, View, TouchableOpacity } from 'react-native';
import { Agenda } from 'react-native-calendars';
import testIDs from '../testIDs';
import { startOfDay } from 'date-fns';

export default class CalendarScreen extends Component {
  state = {
    items: {}
  };

  componentDidMount() {
    const { route } = this.props;
    const { items } = route.params;
    const currentDate = startOfDay(new Date());
    this.loadItems(currentDate);
    this.setState({ selectedDate: this.timeToString(currentDate) });
  }

  loadItems = () => {
    const { items } = this.state;
    const { route } = this.props;
    const { items: passedItems } = route.params;
  
    passedItems.forEach((event) => {
      const eventDate = event.date.split('T')[0];
  
      if (!items[eventDate]) {
        items[eventDate] = [];
      }
  
      items[eventDate].push({
        name: event.name,
        height: event.height
      });
    });
  
    this.setState({
      items: items
    });
  }
  

  renderItem = (reservation, isFirst) => {
    const fontSize = isFirst ? 16 : 14;
    const color = isFirst ? 'black' : '#43515c';

    return (
      <TouchableOpacity
        testID={testIDs.agenda.ITEM}
        style={[styles.item, { height: reservation.height }]}
        onPress={() => Alert.alert(reservation.name)}
      >
        <Text style={{ fontSize, color }}>{reservation.name}</Text>
      </TouchableOpacity>
    );
  }

  renderEmptyDate = () => {
    return (
      <View style={styles.emptyDate}>
        <Text>No events available for this date</Text>
      </View>
    );
  }

  rowHasChanged = (r1, r2) => {
    return r1.name !== r2.name;
  }

  timeToString(time) {
    const date = new Date(time);
    return date.toISOString().split('T')[0];
  }

  render() {
    return (
      <Agenda
        testID={testIDs.agenda.CONTAINER}
        items={this.state.items}
        selected={this.state.selectedDate}
        renderItem={this.renderItem}
        renderEmptyDate={this.renderEmptyDate}
        rowHasChanged={this.rowHasChanged}
        showClosingKnob={true}
      />
    );
  }
}

const styles = StyleSheet.create({
  item: {
    backgroundColor: 'white',
    flex: 1,
    borderRadius: 5,
    padding: 10,
    marginRight: 10,
    marginTop: 17
  },
  emptyDate: {
    height: 15,
    flex: 1,
    paddingTop: 30
  }
});