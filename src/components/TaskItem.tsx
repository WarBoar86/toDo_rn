import React, { useEffect, useRef, useState } from 'react';
import { Image, TouchableOpacity, View, Text, StyleSheet, FlatListProps, TextInput} from 'react-native';

import Icon from 'react-native-vector-icons/Feather';
import trashIcon from '../assets/icons/trash/trash.png';

export function TaskItem(){
  const textInputRef = useRef<TextInput>(null)

  const [editingTitle, setEditingTitle] = useState(false);
  const[itemTitle, setItemTitle] = useState(task.title);

  function handleStartEditing(){
    setEditingTitle(true);
  }

  function handleCancelEditing(){
    setItemTitle(task.title);
    setEditingTitle(false);
  }
  function handleSubmitEditing(){
    editTask(task.id, itemTitle);
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
                onPress ={() =>toggleTaskDone(item.id)}
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
                  value= {itemTitle}
                  onChangeText={setItemTitle}
                  editable= {editingTitle}
                  onSubmitEditing = {handleSubmitEditing}
                  ref={textInputRef}
                >
                  {item.title}
                </TextInput>
              </TouchableOpacity>
            </View>

            <TouchableOpacity
              
              testID={`trash-${index}`}
              style={{ paddingHorizontal: 24 }}
              //TODO - use onPress (remove task) prop
              onPress={()=> removeTask(item.id)}
            >
              <View>
                {
                  editingTitle?
                  <TouchableOpacity onPress={handleCancelEditing}>
                    <Image source={xIcon} />
                  </TouchableOpacity>
                  :
                  <TouchableOpacity onPress= {handleStartEditing}>
                    <Image source={pencilIcon} />
                  </TouchableOpacity>

                }

                  <View style={{width: 1, height: 24, backgroundColor: 'rgba(196, 196, 196, 0.24)'}}/>


                  <TouchableOpacity 
                    onPress= {handleRemoveTask}
                    disabled = {editingTitle}
                    style ={{opacity:editingTitle? 0.2 : 1 }}
                  >
                    <Image source={trashIcon} />
                  </TouchableOpacity>
              </View>
            </TouchableOpacity>
            </>
    )
}

const styles = StyleSheet.create({
    taskButton: {
      flex: 1,
      paddingHorizontal: 24,
      paddingVertical: 15,
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