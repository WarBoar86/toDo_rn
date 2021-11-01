import React, { useState } from 'react';
import { Alert, StyleSheet, View } from 'react-native';

import { Header } from '../components/Header';
import { Task, TasksList } from '../components/TasksList';
import { TodoInput } from '../components/TodoInput';

export function Home() {
  const [tasks, setTasks] = useState<Task[]>([]);

  function handleAddTask(newTaskTitle: string) {
    //TODO - add new task

    const existTask = tasks.find(task => task.title == newTaskTitle);

    if (existTask){
      Alert.alert('Task já cadastrada', 'Você não pode cadastrar uma task com o mesmo nome');
    }else {
      const newTask =  {
        id: new Date().getTime(),
        title: newTaskTitle,
        done: false
      }
      setTasks(oldTasks => [...oldTasks, newTask]);
    }
  }

  function handleToggleTaskDone(id: number) {
    //TODO - toggle task done if exists
    
     const updatedTasks = tasks.map(task => {
        if (task.id === id){
        task.done = !task.done
      }
      return task;
     });

     setTasks(updatedTasks);
   


  }

  function handleRemoveTask(id: number) {
    //TODO - remove task from state

    Alert.alert('Remover item', 'Tem certeza que você deseja remover esse item?',
    [{text: 'Sim' , onPress: ()=> {

      const filtredTasks = tasks.filter(tasks => tasks.id != id );
  
      setTasks(filtredTasks);
    }},
    {text: 'Não'},
  ],
  { cancelable: false }
    );

  }

  return (
    <View style={styles.container}>
      <Header tasksCounter={tasks.length} />

      <TodoInput addTask={handleAddTask} />

      <TasksList 
        tasks={tasks} 
        toggleTaskDone={handleToggleTaskDone}
        removeTask={handleRemoveTask} 
      />
    </View>
  )
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#EBEBEB'
  }
})