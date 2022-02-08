import { useState } from 'react';
import axios from 'axios';
import { ScrollView, StyleSheet, Text, TextInput, View, Button, Image, TouchableOpacity } from 'react-native';
import Select2 from "react-native-select-two";
import * as ImagePicker from 'expo-image-picker';
import * as Location from 'expo-location';
import { Entypo } from '@expo/vector-icons';
import { AntDesign } from '@expo/vector-icons';

import FormData, {getHeaders} from 'form-data'

const mockData = [
  { id: 'request', name: "Request", checked: true },
  { id: 'alert', name: "Alert" },
  { id: 'problem', name: "Problem" },
  { id: 'question', name: "Question" },
]

export const FormScreen = ({ navigation }) => {

  const [image, setImage] = useState(null);
  const [location, setLocation] = useState([]);
  const [formData, setFormData] = useState({
    description: '',
    addlInfo: '',
    type: 'request',
    location:
      {
        latitude: '',
        longitude: ''
      }
  });

  const pickImage = async () => {
    let result = await ImagePicker.launchImageLibraryAsync({
      mediaTypes: ImagePicker.MediaTypeOptions.All,
      allowsEditing: true,
      aspect: [4, 3],
      quality: 1,
    });

    if (!result.cancelled) {
      setImage(result.uri);
    }
  };

  const packageFormData = () => {

    return form;
  }

  const postRequestToWeb = async () => {
    var form = new FormData();
    form.append('description', formData.description);
    form.append('addlInfo', formData.addlInfo);
    form.append('type', formData.type);
    form.append('location', JSON.stringify(formData.location));
    if (image !== null) {
      form.append('image', {
        uri:  image,
        name: '1.jpg',
        type: 'image/jpeg'
      });
    }
    fetch('http://192.168.86.250:5001/wo', {
    method: 'post',
    headers: {
      'Content-Type': 'multipart/form-data',
    },
    body: form
    })
    .then((res) => {
      return res.json();
    })
    .then((data) => {
      if (data) {
        navigation.navigate('Home');
      }
    })
    .catch((err) => {
      console.log(err);
    })
  };

  const buildFormData = (text, name) => {
    let newObj = { ...formData };
    newObj[name] = text;
    setFormData(newObj);
  };

  const getLocation = async () => {
    let { status } = await Location.requestForegroundPermissionsAsync();
    if (status !== 'granted') {
      setErrorMsg('Permission to access location was denied');
      return;
    }
    let locationOfReport = await Location.getCurrentPositionAsync({});
    setFormData((prev) => {
      prev.location.latitude = locationOfReport.coords.latitude;
      prev.location.longitude = locationOfReport.coords.longitude;
      return { ...prev };
    });
    setLocation([locationOfReport.coords.latitude, locationOfReport.coords.longitude]);
  }

  return (
    <View style={styles.mainWrapper}>
    <ScrollView contentContainerStyle={styles.scrollContainer}>
      <View style={styles.container}>
        <Text style={styles.textHeading}>Submit a New Request</Text>
        <Text style={styles.inputLabel}>Brief Description</Text>

        <TextInput clearTextOnFocus={true} onChangeText={(text) => { buildFormData(text, 'description') }} value={formData.title} style={styles.input}>Describe your Request</TextInput>
        <Text style={styles.inputLabel}>Type of Request</Text>
        <Select2
          isSelectSingle={true}
          style={{ flex: 1, borderRadius: 5, marginBottom: 15 }}
          colorTheme="#43AFE5"
          showSearchBox={false}
          data={mockData}
          selectButtonText="Select"
          cancelButtonText="Cancel"
          modalStyle={{ paddingBottom: 15 }}
          onSelect={data => {
            buildFormData(data[0], 'type')
          }}
           />

        <Text style={styles.inputLabel}>Additional Details</Text>
        <TextInput clearTextOnFocus={true} multiline={true} onChangeText={text => buildFormData(text, 'addlInfo')} style={[styles.input, styles.largeTextBox]}>Let us know more about your request...</TextInput>

        <Text style={styles.inputLabel}>Your Location</Text>
        <View style={{ flexDirection: 'row', borderRadius: 5, overflow: 'hidden', backgroundColor: 'blue', marginBottom: 15 }}>
          <Text style={styles.inputWithButton}>{ location.length ? location.toString() : 'Please click the button to the right'}</Text>
          <TouchableOpacity onPress={getLocation} style={styles.inputButton} ><Entypo name="location-pin" size={24} color="white" /></TouchableOpacity>
        </View>

        <View style={{ flex: 1, flexDirection: 'row', marginBottom: 15 }}>
        <TouchableOpacity style={styles.cameraButton} onPress={pickImage}><AntDesign name="camera" size={24} color="white" /><Text style={{color: 'white'}}>Choose an Image</Text>
        </TouchableOpacity>
        {image ? <Image source={{ uri: image }} style={{ borderRadius: 5, flex: 1, marginLeft: 10 }}/> : <TouchableOpacity style={{ borderRadius: 5, flex: 1, marginLeft: 10, borderStyle: 'dashed', borderWidth: 2 }}></TouchableOpacity>}
        </View>

        <TouchableOpacity onPress={postRequestToWeb} style={styles.postButton}><Text style={{color: 'white'}}>Post Request</Text></TouchableOpacity>
      </View>
    </ScrollView>
    </View>

  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#43AFE5',
    alignItems: 'center',
    justifyContent: 'center',
    padding: 15
  },
  mainWrapper: {
    backgroundColor: '#43AFE5',
    flex: 1,
    color: 'white'
  },
  input: {
    width: '100%',
    backgroundColor: '#9ACCE5',
    padding: 15,
    borderRadius: 5,
    marginBottom: 15,
    color: 'white'
  },
  cameraButton: {
    flex: 1,
    borderStyle: 'solid',
    borderWidth: 2,
    borderRadius: 5,
    borderColor: 'white',
    height: 100,
    alignItems: 'center',
    justifyContent: 'center'
  },
  sideContainer: {
    display: 'flex',
    flexDirection: 'row',
    justifyContent: 'space-between',
    marginBottom: 20
  },
  inputWithButton: {
    flex: 3,
    backgroundColor: '#9ACCE5',
    padding: 15,
    overflow: 'hidden',
    borderRadius: 0,
    borderTopRightRadius: 10,
    borderBottomLeftRadius: 10,
    color: 'white'
  },
  inputButton: {
    backgroundColor: '#2A79A0',
    width: 50,
    justifyContent: 'center',
    alignItems: 'center',
    borderTopRightRadius: 5,
    borderBottomRightRadius: 5,
  },
  halfInput: {
    flex: 1,
    padding: 15,
    borderRadius: 5,
    backgroundColor: 'blue',
  },
  largeTextBox: {
    height: 150,
    textAlignVertical: 'top',
    paddingTop: 10
  },
  textHeading: {
    fontSize: 20,
    fontWeight: '900',
    marginBottom: 15,
    color: 'white'
  },
  inputLabel: {
    fontWeight: '500',
    marginBottom: 4,
    alignSelf: 'flex-start',
    color: '#20536C',
    fontWeight: '700'
  },
  postButton: {
    backgroundColor: '#2A79A0',
    color: 'white',
    alignItems: 'center',
    width: '100%',
    padding: 15,
    borderRadius: 5,
    marginTop: 70
  }
});
