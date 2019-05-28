import React, { Component } from 'react';

import {
    StyleSheet,
    Text,
    View,
    ScrollView,
    Platform,
    WebView,
} from 'react-native';

import { MapView,MapTypes,Geolocation, Overlay} from 'react-native-baidu-map';

import Dimensions from 'Dimensions';


const { width,height } = Dimensions.get('window');
const { Marker } = Overlay;



export default class Page1 extends Component {
    constructor() {
        super();
        this.state = {
            isLoading:true,
            zoomControlsVisible: true,
            trafficEnabled: false,
            baiduHeatMapEnabled: false,
            mapType: MapTypes.NORMAL,
            zoom: 15,
            center: {
                longitude: 104.096198,
                latitude: 30.669144,
            },
            markers: [
                {
                    longitude: 104.096198,
                    latitude: 30.669144,
                    title: 'title',
                }
            ],
            clickMessage: '',
            poiMessage: '',
        };
    }

  render() {
        return (
                <MapView
                    zoomControlsVisible={this.state.zoomControlsVisible} //默认true,是否显示缩放控件,仅支持android
                    trafficEnabled={this.state.trafficEnabled} //默认false,是否显示交通线
                    baiduHeatMapEnabled={this.state.baiduHeatMapEnabled} //默认false,是否显示热力图
                    mapType={this.state.mapType} //地图模式,NORMAL普通 SATELLITE卫星图
                    zoom={this.state.zoom} //缩放等级,默认为10
                    center={this.state.center} // 地图中心位置
                    markers={this.state.markers} //地图多个标记点

                    onMapLoaded={(e) => { //地图加载事件
                        Geolocation.getCurrentPosition()
                            .then(data => {
                                console.log(data)
                                 this.setState({
                                     center: {
                                         longitude: data.longitude,
                                         latitude: data.latitude
                                     },
                                     markers: [{
                                         longitude: data.longitude,
                                         latitude: data.latitude,
                                         title: data.district + data.street
                                     }]
                                 })
                            })
                            .catch(e =>{
                                console.warn(e, 'error');
                            })
                    }}
                style={styles.map}>
                <Marker location={{longitude: this.state.markers[0].longitude,latitude: this.state.markers[0].latitude,}}/>
                </MapView>
        );
    }
}

const styles = StyleSheet.create({
    map: {
        flex: 1,
        marginBottom: 5,
    },
    list: {
        flexDirection: 'row',
        paddingLeft: 10,
        marginBottom: 5,
    }
});
