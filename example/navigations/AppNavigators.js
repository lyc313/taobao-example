import React from 'react';
import { createStackNavigator,
    createBottomTabNavigator,
    createDrawerNavigator,
    createAppContainer,
} from 'react-navigation';


import  Page1 from '../src/pages/Page1';
import  Page2 from '../src/pages/Page2';
import  Page3 from '../src/pages/Page3';

//底部导航
 const AppTabNavigators =createBottomTabNavigator({
    Page1: { screen:Page1,
        navigationOptions: { tabBarLabel: '地图定位',//底部标题
             },},
    Page2:{ screen:Page2,
        navigationOptions:{ tabBarLabel: '图片上传',
             } },
    Page3:{ screen:Page3,
        navigationOptions:{ tabBarLabel: '识别结果',
             } } },{ tabBarPosition:'bottom',//位置
    tabBarOptions: { showIcon: false,//是否显示图标！！！！！！！
        style: { height: 45,//底部导航的宽度
            backgroundColor: '#211305',//底部导航的颜色
        },
        labelStyle: { fontSize: 12,//字体大小
            marginTop:-2,//字体距离图标大小
        },

    } });



//顶部导航，主入口，要放在其他导航后面，（加载顺序）
const AppStackNavigator=createStackNavigator({
    HomeTab:{//底部导航（也是主页）
        screen:AppTabNavigators,
        navigationOptions:{ header:null,
        } } } );


const AppStackNavigator1 = createAppContainer(AppTabNavigators)

export default AppStackNavigator1;
