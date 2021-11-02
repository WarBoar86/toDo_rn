import React, { useEffect, useRef, useState } from 'react';
import { Image, TouchableOpacity, View, StyleSheet, TextInput} from 'react-native';

import Icon from 'react-native-vector-icons/Feather';
import trashIcon from '../assets/icons/trash/trash.png';
import xIcon from'../assets/icons/close/close.png';
import pencilIcon from '../assets/icons/edit/pencil.png';
import {Task, TasksListProps} from './TasksList';

interface ItemProps{
  item: Task,
  index: number,
  listProps: TasksListProps
}


export function TaskItem({item, index, listProps}: ItemProps){
  const textInputRef = useRef<TextInput>(null)

  const [editingTitle, setEditingTitle] = useState(false);
  const[newItemTitle, setNewItemTitle] = useState(item.title);

  function handleStartEditing(){
    setEditingTitle(true);
  }

  function handleCancelEditing(){
    setNewItemTitle(item.title);
    setEditingTitle(false);
  }
  function handleSubmitEditing(){
    listProps.editTask(item.id, newItemTitle);
    setEditingTitle(false);
  }

  useEffect(() => {
    if (textInputRef.current) {
      if (editingTitle) {
        textInputRef.current.focus();
      } else {
        textInputRef.current.blur();
      }
    }
  }, [editingTitle])

    return(
        <>
        <View>
               <TouchableOpacity
                testID={`button-${index}`}
                activeOpacity={0.7}
                style={styles.taskButton}
                //TODO - use onPress (toggle task) prop
                onPress ={() =>listProps.toggleTaskDone(item.id)}
              >
                <View 
                  testID={`marker-${index}`}
                  //TODO - use style prop 
                  style = {item.done ? styles.taskMarkerDone : styles.taskMarker}
                >
                  { item.done && (
                    <Icon 
                      name="check"
                      size={12}
                      color="#FFF"
                    />
                  )}
                </View>

                <TextInput 
                  //TODO - use style prop
                  style={ item.done ? styles.taskTextDone : styles.taskText}
                  onChangeText={setNewItemTitle}
                  editable= {editingTitle}
                  onSubmitEditing = {handleSubmitEditing}
                  ref={textInputRef}
                  value= {newItemTitle}
                />
                 
                
              </TouchableOpacity> 
            </View>
           
              <View
                style={{flexDirection: 'row'}}
              >
                {
                  editingTitle?
                  <TouchableOpacity 
                    onPress={handleCancelEditing}
                    style ={{paddingHorizontal: 17, marginVertical:4}}
                  >
                    <Image source={xIcon} />
                  </TouchableOpacity>
                  :
                  <TouchableOpacity 
                    onPress= {handleStartEditing}
                    style ={{paddingHorizontal: 13}}
                  >
                    <Image source={pencilIcon} />
                  </TouchableOpacity>

                }

              <View style={{width: 1, height: 24, backgroundColor: 'rgba(196, 196, 196, 0.24)'}}/>

                <TouchableOpacity
                  testID={`trash-${index}`} 
                  onPress= {() => listProps.removeTask(item.id)}
                  disabled = {editingTitle}
                  style ={{paddingHorizontal: 13, opacity:editingTitle? 0.2 : 1 }}
                >
                  <Image source={trashIcon} />
                </TouchableOpacity>

              </View>
            </>
    );
}

const styles = StyleSheet.create({
    taskButton: {
      flex: 1,
      paddingHorizontal: 24,
      marginBottom: 4,
      borderRadius: 4,
      flexDirection: 'row',
      alignItems: 'center'
    },
    taskMarker: {
      height: 16,
      width: 16,
      borderRadius: 4,
      borderWidth: 1,
      borderColor: '#B2B2B2',
      marginRight: 15,
      alignItems: 'center',
      justifyContent: 'center'
    },
    taskText: {
      color: '#666',
      fontFamily: 'Inter-Medium'
    },
    taskMarkerDone: {
      height: 16,
      width: 16,
      borderRadius: 4,
      backgroundColor: '#1DB863',
      marginRight: 15,
      alignItems: 'center',
      justifyContent: 'center'
    },
    taskTextDone: {
      color: '#1DB863',
      textDecorationLine: 'line-through',
      fontFamily: 'Inter-Medium'
    }
  })