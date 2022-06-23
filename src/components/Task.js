import React from 'react';
import { View, Text, StyleSheet, TouchableOpacity } from 'react-native';
import Ionicons from '@expo/vector-icons/Ionicons';
import { Entypo } from '@expo/vector-icons';
// import { FontAwesomeIcon } from '@fortawesome/react-native-fontawesome'
// import { faMugSaucer } from '@fortawesome/free-solid-svg-icons/faMugSaucer'

const Task = (props) => {
// console.log(props.data.check);
  return (
    <View style={styles.item}>
      <View style={styles.itemLeft}>
        <TouchableOpacity style={styles.square} onPress={props.check}>
          {props.data.check ? <Entypo name="check" size={24} color="black"/> : null}
        </TouchableOpacity>
        <Text style={styles.itemText}>{props.data.title}</Text>
      </View>
      <TouchableOpacity onPress={props.suppr}>
        <Entypo name="cross" size={24} color="red" />
      </TouchableOpacity>
    </View>
  )
}

const styles = StyleSheet.create({
  item: {
    backgroundColor: '#FFF',
    padding: 15,
    borderRadius: 10,
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
    marginBottom: 20,
  },
  itemLeft: {
    flexDirection: 'row',
    alignItems: 'center',
    flexWrap: 'wrap'
  },
  square: {
    width: 24,
    height: 24,
    backgroundColor: '#55BCF6',
    opacity: 0.4,
    borderRadius: 5,
    marginRight: 15,
  },
  itemText: {
    maxWidth: '80%',
  },
  suppr: {
    color: 'red',
  },
  // check: {
  //   display: 'none',
  // },
  // circular: {
  //   width: 12,
  //   height: 12,
  //   borderColor: '#55BCF6',
  //   borderWidth: 2,
  //   borderRadius: 5,
  // },
});

export default Task;