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
    this.setState({items: this.props.route.params.items})
    const currentDate = startOfDay(new Date());
    this.setState({ selectedDate: this.timeToString(currentDate) });
  }
  

  renderItem = (reservation, isFirst) => {
    const fontSize = isFirst ? 16 : 14;
    const color = isFirst ? 'black' : '#43515c';
    const message = `${reservation.eventType} a las ${reservation.hour.substring(0,5)} hrs.\n(${reservation.approved})`

    return (
      <TouchableOpacity
        style={[styles.item, { height: reservation.height }]}
        onPress={() => Alert.alert(reservation.name,message)}
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

  onDayPress = (day) => {
    const { items } = this.state;
    if (!items[day.dateString]) {
      items[day.dateString] = [];
    }
    this.setState({
      items: items
    });
  }

  render() {
    return (
      <Agenda
        testID={testIDs.agenda.CONTAINER}
        items={this.state.items}
        onDayPress={this.onDayPress}
        selected={this.state.selectedDate}
        renderItem={this.renderItem}
        renderEmptyDate={this.renderEmptyDate}
        rowHasChanged={this.rowHasChanged}
        showClosingKnob={true}
        refreshing={true}
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