import React, {Component} from 'react';
import {
  View, Text, StyleSheet, ScrollView, Alert,
  Image, TouchableOpacity, NativeModules, Dimensions,
  PixelRatio, ImageBackground,
} from 'react-native';

var ImagePicker = NativeModules.ImageCropPicker;


export default class App extends Component {

  constructor() {
    super();
    this.state = {
      image: null,
    };
  }

  pickSingleWithCamera(cropping) {
    ImagePicker.openCamera({
      cropping: cropping,
      width: 500,
      height: 500,
      includeExif: true,
    }).then(image => {
      console.log('received image', image);

      let source = { uri: image.path, width: image.width, height: image.height };//the address of the picture(circle)
      let uploadImgUrl = image.path;

      let formData = new FormData();
      let file = {uri: image.path, type: 'multipart/form-data', name: uploadImgUrl};

      formData.append("image",file);

      fetch('http://117.158.75.232:64031/file_upload',{
           method:'POST',
           headers:{
                  'Content-Type':'multipart/form-data',
           },
                  body:formData,
           })
           .then((response) => response.text() )
           .then((responseData)=>{

             console.log('responseData',responseData);
           })
           .catch((error)=>{console.error('error',error)});

      this.setState({
        image: source,
      });
    }).catch(e => alert(e));
  }

  pickSingle(cropit, circular=false) {
    ImagePicker.openPicker({
      width: 300,
      height: 300,
      cropping: cropit,
      cropperCircleOverlay: circular,
      compressImageMaxWidth: 640,
      compressImageMaxHeight: 480,
      compressImageQuality: 0.5,
      compressVideoPreset: 'MediumQuality',
      includeExif: true,
    }).then(image => {
      console.log('received image', image);

      let source = { uri: image.path, width: image.width, height: image.height };//the address of the picture(circle)
      let uploadImgUrl = image.path;

      let formData2 = new FormData();
      let file2 = {uri: image.path, type: 'multipart/form-data', name: uploadImgUrl};

      formData2.append("image",file2);

      fetch('http://117.158.75.232:64031/file_upload',{
           method:'POST',
           headers:{
                  'Content-Type':'multipart/form-data',
           },
                  body:formData2,
           })
           .then((response) => response.text() )
           .then((responseData)=>{

             console.log('responseData',responseData);
           })
           .catch((error)=>{console.error('error',error)});

      this.setState({
        image: source,
      });
    }).catch(e => {
      console.log(e);
      Alert.alert(e.message ? e.message : e);
    });
  }



  render() {
    return (
    <ImageBackground style={styles.container} >
     <View>
      <TouchableOpacity onPress={() => this.pickSingleWithCamera(true)}>
        <View style={[styles.avatar, styles.avatarContainer, { marginBottom: 20 },]}>
          {this.state.image === null ? (
          <Text style={styles.text}>拍照…</Text>
          ) : (
          <Text style={styles.text}>拍照…</Text>
          )}
        </View>
      </TouchableOpacity>
      <TouchableOpacity onPress={() => this.pickSingle(true, true)}>
        <View style={[styles.avatar, styles.avatarContainer, { marginBottom: 20 },]}>
          {this.state.image === null ? (
          <Text style={styles.text}>相册…</Text>
          ) : (
          <Text style={styles.text}>相册…</Text>
          )}
        </View>
      </TouchableOpacity>
     </View>
    </ImageBackground>
    );
  }
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: 'white',
  },
  avatarContainer: {
    borderColor: '#9B9B9B',
    borderWidth: 1 / PixelRatio.get(),
    justifyContent: 'center',
    alignItems: 'center',
  },
  avatar: {
    borderRadius: 75,
    width: 150,
    height: 150,
  },
  text: {
    color: 'black',
    fontSize: 20,
    textAlign: 'center'
  },
});


