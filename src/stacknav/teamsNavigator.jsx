import { createStackNavigator } from '@react-navigation/stack';
import TeamsListScreen from '../screens/TeamsListScreen';
import MembersForThisTeamScreen from '../screens/MembersForThisTeamScreen';
const Stack = createStackNavigator();
import {useIsFocused} from '@react-navigation/native';
import { useEffect, useState } from 'react';

export default function TeamsNavigator ({navigation}) {

    const isFocused = useIsFocused()

      useEffect(() => {
        if (isFocused) {
          navigation.navigate('teamslist');
        }
      }, [isFocused, navigation]);
      ;

    return (
        <Stack.Navigator screenOptions={{headerShown:false}} initialRouteName='teamslist'>
            <Stack.Screen name="teamslist" component={TeamsListScreen} navigation={navigation}/>
            <Stack.Screen name="membersForThisTeam" component={MembersForThisTeamScreen}/>
        </Stack.Navigator>
    )
}