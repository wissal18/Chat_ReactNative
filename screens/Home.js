import { createMaterialBottomTabNavigator } from "@react-navigation/material-bottom-tabs";
import Profile from "./fragment_home/Profile";
import Liste from "./fragment_home/Liste";
import Groupe from "./fragment_home/Groupe";
const Tab = createMaterialBottomTabNavigator();
export default function Home() {
  return (
    <Tab.Navigator>
      <Tab.Screen name="profile" component={Profile} />
      <Tab.Screen name="liste" component={Liste} />
      <Tab.Screen name="groupe" component={Groupe} />
    </Tab.Navigator>
  );
}
