import React, {useEffect, useState} from 'react';
import { KeyboardAvoidingView, StyleSheet, Text, View, TextInput, TouchableOpacity, Keyboard, ScrollView } from 'react-native';
import Task from '../src/components/Task';
import { db, auth } from '../Firebase';
import { addDoc, collection, doc, setDoc, query, where, onSnapshot, deleteDoc, getDoc  } from "firebase/firestore"; 
import uuid from 'react-native-uuid'

export default function Home() {
  const [task, setTask] = useState();
  const [taskItems, setTaskItems] = useState([]);

  useEffect(() => {
    const q = query(collection(db, "tasks"), where('user_uid', '==', auth.currentUser.uid));
    const unsubscribe = onSnapshot(q, (querySnapshot) => {
      const tasks = [];
      querySnapshot.forEach((doc) => {
        tasks.push(doc.data());
      });
      // console.log(tasks);
      setTaskItems(tasks)
    });
  
    return () => {
      unsubscribe
    }
  }, [])
  

  const handleCheckTask = (index) => {
    let taskItemsTemp = [...taskItems]
    taskItemsTemp[index].check = !taskItemsTemp[index].check;
    setTaskItems(taskItemsTemp)

    setDoc(doc(db, "tasks", taskItemsTemp[index].id), {
      id: taskItemsTemp[index].id, 
      user_uid: auth.currentUser.uid,
      title: taskItemsTemp[index].title,
      check: taskItemsTemp[index].check,
    });
  }

  const handleAddTask = () => {
    const docUuid = uuid.v4();

    Keyboard.dismiss();
    const newTask = {
      id: docUuid, 
      user_uid: auth.currentUser.uid,
      title: task,
      check: false,
    }
    setTaskItems([...taskItems, newTask])
    setTask(null);

    const docRef = setDoc(doc(db, "tasks", docUuid), newTask)
    .catch((error) => {
      console.log(error)
    });
  }

  const completeTask = (index) => {
    let taskItemsTemp = [...taskItems];

    console.log(taskItemsTemp[index])
    console.log(index)
    deleteDoc(doc(db, "tasks", taskItems[index].id))
    .catch((error) => {
      console.log(error)
    });
  }

  return (
    <View style={styles.container}>
      {/* Added this scroll view to enable scrolling when list gets longer than the page */}
      <ScrollView
        contentContainerStyle={{
          flexGrow: 1
        }}
        keyboardShouldPersistTaps='handled'
      >

      {/* Today's Tasks */}
      <View style={styles.tasksWrapper}>
        <Text style={styles.sectionTitle}>To do list</Text>
        <View style={styles.items}>
          {/* This is where the tasks will go! */}
          {
            taskItems.map((item, index) => {
              return (
               <View key={index}>
  
                  <Task 
                  data={item}
                  check={() => handleCheckTask(index)} 
                  suppr={() => completeTask(index)}
                  /> 
          
               </View>
              )
            })
          }
        </View>
      </View>
        
      </ScrollView>

      {/* Write a task */}
      {/* Uses a keyboard avoiding view which ensures the keyboard does not cover the items on screen */}
      <KeyboardAvoidingView 
        behavior={Platform.OS === "ios" ? "padding" : "height"}
        style={styles.writeTaskWrapper}
      >
        <TextInput style={styles.input} placeholder={'Write something to do'} value={task} onChangeText={text => setTask(text)} />
        <TouchableOpacity onPress={() => handleAddTask()}>
          <View style={styles.addWrapper}>
            <Text style={styles.addText}>+</Text>
          </View>
        </TouchableOpacity>
      </KeyboardAvoidingView>
      
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#E8EAED',
  },
  tasksWrapper: {
    paddingTop: 80,
    paddingHorizontal: 20,
  },
  sectionTitle: {
    fontSize: 24,
    fontWeight: 'bold'
  },
  items: {
    marginTop: 30,
  },
  writeTaskWrapper: {
    position: 'absolute',
    bottom: 60,
    width: '100%',
    flexDirection: 'row',
    justifyContent: 'space-around',
    alignItems: 'center'
  },
  input: {
    paddingVertical: 15,
    paddingHorizontal: 15,
    backgroundColor: '#FFF',
    borderRadius: 60,
    borderColor: '#C0C0C0',
    borderWidth: 1,
    width: 250,
  },
  addWrapper: {
    width: 60,
    height: 60,
    backgroundColor: '#FFF',
    borderRadius: 60,
    justifyContent: 'center',
    alignItems: 'center',
    borderColor: '#C0C0C0',
    borderWidth: 1,
  },
  addText: {},
});
