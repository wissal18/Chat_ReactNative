import Auth from "./screens/Auth";
import Signup from "./screens/Signup";
import Home from "./screens/Home";
import Chat from "./screens/Chat";
import {
  createNavigationContainerRef,
  NavigationContainer,
} from "@react-navigation/native";
import { createNativeStackNavigator } from "@react-navigation/native-stack";

const Stack = createNativeStackNavigator();
export default function App() {
  return (
    <NavigationContainer>
      <Stack.Navigator>
        <Stack.Screen
          name="auth"
          component={Auth}
          options={{ headerShown: false }}
        ></Stack.Screen>
        <Stack.Screen
          name="signup"
          component={Signup}
          options={{ headerShown: false }}
        ></Stack.Screen>
        <Stack.Screen
          name="home"
          component={Home}
          options={{ headerShown: false }}
        ></Stack.Screen>
        <Stack.Screen
          name="chat"
          component={Chat}
          options={{ headerShown: false }}
        ></Stack.Screen>
      </Stack.Navigator>
    </NavigationContainer>
  );
}
