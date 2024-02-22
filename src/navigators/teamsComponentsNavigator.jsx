import {createStackNavigator} from '@react-navigation/stack'
import TeamsScreen from '../screens/TeamsScreen'
import TeamsMembersScreen from '../screens/TeamMembersScreen'
const Stack = createStackNavigator()

export default function TeamsComponentNavigator (){ 
    
    return (
        <Stack.Navigator screenOptions={{headerShown:false}}>
            <Stack.Screen name="Team Screen" component={TeamsScreen}/>
            <Stack.Screen name="Team Members Screen" component={TeamsMembersScreen}/>
        </Stack.Navigator>
    )
}