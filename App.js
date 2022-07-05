import React, {useState, useEffect} from 'react';
import { Keyboard, KeyboardAvoidingView, Platform, StyleSheet, Text, TextInput, TouchableOpacity, View, Button } from 'react-native';
import Task from './components/Task';
import axios from "axios"

export default function App() {

  // initial state to add a task
  const [task, setTask] = useState();
  const [taskItems, setTaskItems] = useState([]);

  // initial submit task
  const handleAddTask = () => {
    console.log(task)
    Keyboard.dismiss()
    setTaskItems([...taskItems, task]);
    setTask(null);
  };

  // initial complete task
  const completeTask = (index) => {
    let itemsCopy = [...taskItems];
    itemsCopy.splice(index, 1);
    setTaskItems(itemsCopy);
  };

  // initial show details and fetching with axios
  const [details, setDetails] = useState([]);
  const getDetails = async() => {
    try {
      const response = await axios.get('https://newsapi.org/v2/top-headlines', {
        params: {
          country: 'us',
          category: 'business',
          apiKey: '8a2a42f9c8114329bfd499b0f7b8df3c'
        }
      });

      console.log(response.data.articles[1])
      setDetails(response.data.articles[1].description)
    } catch (error) {
      alert(error.message)
    }
  }

  // 8a2a42f9c8114329bfd499b0f7b8df3c


  document.write = "My todoList"
  return (
    <View style={styles.container}>
      <View styles={styles.taskWrapper}>
        <Text style={styles.sectionTitle}>Today's tasks</Text>

        {/* task to do */}
        <View style={styles.items}>

          {/* mapping data from arrayObject */}
          {
            taskItems.map((item, index) => {
              return (
                <TouchableOpacity key={index} onPress={() => completeTask()}>
                  <Task text={item} />
                </TouchableOpacity>
              )
              
            })
          }
          <TouchableOpacity onPress={getDetails}>
            <Task text={'Show details'}  />
            <Text style={{color: 'white'}}>{details}</Text>
          </TouchableOpacity>
        </View>
      </View>

      {/* write a task */}
      <KeyboardAvoidingView
      behavior={Platform.OS === "ios" ? "padding" : "height"}
      style={styles.writeTaskWrapper}>
        <TextInput style={styles.input} placeholder={'Write a task'} value={task} onChangeText={text => setTask(text)} />

        <TouchableOpacity onPress={() => handleAddTask()}>
          <View style={styles.addWrapper}>
            <Text style={styles.addText} >+</Text>
          </View>
        </TouchableOpacity>
        
      </KeyboardAvoidingView>
    </View>
  )
};

// styling
const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#1F4690',
  },

  taskWrapper: {
    paddingTop: 80,
    paddingHorizontal: 20,
  },

  sectionTitle: {
    fontSize: 24,
    fontWeight: 'bold',
    marginHorizontal: 10,
    color: 'white',
    marginTop: 10
  },

  items: {
    marginTop: 30,
    // border: '1px solid',
    marginHorizontal: 10
  },

  writeTaskWrapper: {
    // border: '1px solid',
    position: 'absolute',
    bottom: 10,
    width: '100%',
    flexDirection: 'row',
    justifyContent: 'space-around',
    alignItems: 'center'
  },

  input: {
    // border: '1px solid',
    paddingVertical: 15,
    paddingHorizontal: 15,
    width: 250,
    backgroundColor: 'white',
    borderRadius: 60,
    borderWidth: 1
  },

  addWrapper: {
    width: 60,
    height: 60,
    backgroundColor: 'white',
    borderRadius: 60,
    justifyContent: 'center',
    alignItems: 'center',
    borderColor: '#6E85B7',
    borderWidth: 1
  },
});