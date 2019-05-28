import React from 'react';
import {   FlatList,
           ActivityIndicator,
           Text,
           View,
           StyleSheet,
           Image,
           ScrollView }
from 'react-native';



FlatListItem = props => {
  return (
    <View style={{ flex: 1, flexDirection: 'column' }}>
      <View
        style={{
          flex: 1,
          flexDirection: 'row',
          backgroundColor: 'white',
          borderWidth: 1,
          borderTopLeftRadius: 20,
          borderTopRightRadius: 20,
          borderBottomRightRadius: 20,
          borderBottomLeftRadius: 20,
        }}
      >
        <Image
          source={{ uri: props.item.releaseYear }}
          style={{ width: 100, height: 100, margin: 5 }}
        />
        <View style={{ flex: 1, flexDirection: 'column', height: 100 }}>
          <Text style={styles.textBox}>{props.item.id}</Text>
          <Text style={styles.textBox}>{props.item.title}</Text>
        </View>
      </View>

      <View style={{ height: 1, backgroundColor: 'white' }} />
    </View>
  );
};


export default class FetchExample extends React.Component {

  constructor(props){
    super(props);
    this.state ={ isLoading: true}

    setInterval(() => {
          this.setState(previousState => {
            return { isLoading: !previousState.isLoading };
          });
          fetch('http://117.158.75.232:64031/setnew.json')
            .then((response) => response.json())
            .then((responseJson) => {
                    this.setState({
                      dataSource: responseJson.movies,
                    }, function(){
                    });
                  });
        }, 500);
  }

  componentDidMount(){
    return fetch('http://117.158.75.232:64031/setnew.json')
      .then((response) => response.json())
      .then((responseJson) => {
        this.setState({
          dataSource: responseJson.movies,
        }, function(){
        });
      })
      .catch((error) =>{
        console.error(error);
      });
  }


  render() {
      return (
        <FlatList
          data={this.state.dataSource}
          keyExtractor={(item, index) => index}
          renderItem={({ item, index }) => {
            //   console.log(`Item:${JSON.stringify(item)},Index:${index}`);
            return <FlatListItem item={item} index={index} />;
          }}
        />
      );
    }

}

const styles = StyleSheet.create({
  textBox: {
    color: 'black',
    padding: 10
  }
});

