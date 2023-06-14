import React from 'react';
import { View, Text, Image } from 'react-native';
import { YStack } from 'tamagui';
import styles from '../../styles';

export function CellWithImageAndText({ subjectName, career, type }) {
    return (
        <View style={styles.container}>
          <View style={styles.contentContainer}>
            <View style={styles.textContainer}>
              <Text style={styles.boldCellText}>{subjectName}</Text>
              <Text style={styles.whiteText}>{career}</Text>
              <Text style={styles.whiteText}>{type}</Text>
            </View>
          </View>
          <View style={styles.separator} />
        </View>
      );
}