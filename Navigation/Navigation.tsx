import React from 'react';
import {createStackNavigator} from '@react-navigation/stack';
import {NavigationContainer, useNavigation} from '@react-navigation/native';
import {createBottomTabNavigator} from '@react-navigation/bottom-tabs';
import {createNativeStackNavigator} from '@react-navigation/native-stack';
import Entypo from 'react-native-vector-icons/Entypo';
import Ionicons from 'react-native-vector-icons/Ionicons';
import {Button, Text, View} from 'react-native';
import {StackNavigationProp} from '@react-navigation/stack';
import Table from '../components/Table.component';
import Table2Component from '../components/Table2.component';

const CategoriesScreen = () => {
  return (
    <View>
      <Text>Categories Screen</Text>
    </View>
  );
};

const LevelsScreen = () => {
  return (
    <View>
      <Text>Levels Screen</Text>
    </View>
  );
};

const QuizScreen = () => {
  return (
    <View>
      <Text>Quiz Screen</Text>
    </View>
  );
};
const QuestionScreen = () => {
  return (
    <View>
      <Text>Question Screen</Text>
    </View>
  );
};
const LoginScreen = () => {
  return (
    <View>
      <Text>Login Screen</Text>
    </View>
  );
};

const UserAnswersScreen = () => {
  return (
    <View>
      <Text>User Answers Screen</Text>
    </View>
  );
};

const MenuScreen = () => {
  return (
    <View>
      <Text>Menu Screen</Text>
    </View>
  );
};

const Stack = createStackNavigator();

const HomeScreen = () => {
  // Define the handleInvite and handleDelete functions
  const handleInvite = record => {
    // Do something with the data when the Invite button is clicked
    console.log(`Invite button clicked for ${record.name}`);
  };

  const handleDelete = key => {
    // Do something with the data when the Delete button is clicked
    console.log(`Delete button clicked for item with key ${key}`);
  };

  return (
    <>
      <Text>Your Parent Component</Text>
      {/* Pass the functions as props to the Table component */}
      <Table2Component
        handleInvite={handleInvite}
        handleDelete={handleDelete}
      />
    </>
  );
};

const UserProfileScreen = () => {
  return (
    <View>
      <Text>User Profile screen</Text>
    </View>
  );
};
const Navigation = () => {
  const AuthStack = () => (
    <Stack.Navigator screenOptions={{headerShown: false}}>
      <Stack.Screen name="Login" component={LoginScreen} />
    </Stack.Navigator>
  );

  // const AppStack = () => (
  //   <Stack.Navigator screenOptions={{headerShown: false}}>
  //     <Stack.Screen name="Question" component={QuestionScreen} />
  //   </Stack.Navigator>
  // );

  const HomeStack = createNativeStackNavigator();
  const HomeScreenStack = () => {
    return (
      <HomeStack.Navigator screenOptions={{headerShown: false}}>
        <HomeStack.Screen name="HomeScreen" component={HomeScreen} />
        <HomeStack.Screen
          name="CategoriesScreen"
          component={CategoriesScreen}
        />
        <HomeStack.Screen name="LevelsScreen" component={LevelsScreen} />
        <HomeStack.Screen
          name="UserAnswersScreen"
          component={UserAnswersScreen}
        />
      </HomeStack.Navigator>
    );
  };

  const UserProfileStack = createNativeStackNavigator();
  const MenuStack = createNativeStackNavigator();
  const UserProfileScreenStack = () => {
    return (
      <UserProfileStack.Navigator screenOptions={{headerShown: false}}>
        <UserProfileStack.Screen
          name="HomeScreen"
          component={UserProfileScreen}
        />
      </UserProfileStack.Navigator>
    );
  };

  const BottomTab = createBottomTabNavigator();

  const MenuScreen = () => {
    const navigation = useNavigation<StackNavigationProp<any>>();
    return (
      <View>
        <Text>Menu screen</Text>
        <Button
          onPress={() => navigation.navigate('QuestionScreen')}
          title={'Question'}
        />
      </View>
    );
  };
  const MenuScreenStack = () => {
    return (
      <MenuStack.Navigator screenOptions={{headerShown: false}}>
        <MenuStack.Screen name="MenuScreen" component={MenuScreen} />
        <MenuStack.Screen name="QuestionScreen" component={QuestionScreen} />
      </MenuStack.Navigator>
    );
  };
  const AppStack = () => {
    return (
      <BottomTab.Navigator
        screenOptions={{
          tabBarActiveTintColor: 'rgb(232, 25, 50)',
          tabBarInactiveTintColor: '#2c2c2c',
          tabBarShowLabel: false,
          // shifting: false,
          headerShown: false,
        }}>
        <BottomTab.Screen
          name={'Home'}
          component={HomeScreenStack}
          options={{
            tabBarLabel: 'Home',
            tabBarIcon: ({color, size}) => (
              <Entypo name="home" color={color} size={28} />
            ),
          }}
        />
        <BottomTab.Screen
          name={'UserProfile'}
          component={UserProfileScreenStack}
          options={{
            tabBarLabel: 'ProfileScreen',
            tabBarIcon: ({color: color = 'black', size}) => (
              <Ionicons name="person" color={color} size={27} />
            ),
          }}
        />
        <BottomTab.Screen
          name="MenuScreen"
          component={MenuScreenStack}
          options={{
            tabBarLabel: 'MenuScreen',
            tabBarIcon: ({color, size}) => (
              <Ionicons name="menu" color={color} size={32} />
            ),
          }}
        />
      </BottomTab.Navigator>
    );
  };

  return <NavigationContainer>{<AppStack />}</NavigationContainer>;
};

export default Navigation;
