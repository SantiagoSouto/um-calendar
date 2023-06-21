import React, { useState } from "react";
import { View, StyleSheet } from "react-native";
import { Button } from './Button'
import DateTimePickerModal from "react-native-modal-datetime-picker";

const DateTimePicker = ({mode, setDateTime}) => {

  const [isDatePickerVisible, setDatePickerVisibility] = useState(false);

  const showDatePicker = () => {
    setDatePickerVisibility(true);
  };

  const hideDatePicker = () => {
    setDatePickerVisibility(false);
  };

  const handleConfirm = (dateTime) => {
    mode === "date" ? setDateTime(new Date(dateTime).toISOString().split('T')[0]) :
                      setDateTime(new Date(dateTime).toISOString().split('T')[1].substring(0,5));
    hideDatePicker();
  };
  
  const onChange = (event, selectedDate) => {
    const currentDate = selectedDate;
    setDate(currentDate.getDate());
  };

  return (
    <View>
      <Button style={styles.btnPicker} onPress={showDatePicker}>
        <Button.Text style={styles.translucentText}>{mode === "date" ? "Fecha del evento" : "Hora del evento"}</Button.Text>
      </Button>
      <DateTimePickerModal
        isVisible={isDatePickerVisible}
        mode={mode}
        onConfirm={handleConfirm}
        onCancel={hideDatePicker}
      />
    </View>
  );
};

const styles = StyleSheet.create({
  translucentText: {
    color: 'rgba(255, 255, 255, 0.9)',
  },
  btnPicker: {
    width: 160
  }
});

export default DateTimePicker;
