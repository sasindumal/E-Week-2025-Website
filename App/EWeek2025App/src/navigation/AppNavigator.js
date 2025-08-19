import { createDrawerNavigator } from '@react-navigation/drawer';
import HomeScreen from '../screens/HomeScreen';
import AboutScreen from '../screens/AboutScreen';
import DownloadsScreen from '../screens/DownloadsScreen';
import EventsScreen from '../screens/EventsScreen';
import GalleryScreen from '../screens/GalleryScreen';
import HistoryScreen from '../screens/HistoryScreen';
import LeaderboardScreen from '../screens/LeaderboardScreen';
import ScorecardsScreen from '../screens/ScorecardsScreen';
import SkillStormScreen from '../screens/SkillStormScreen';

const Drawer = createDrawerNavigator();

export default function AppNavigator() {
  return (
    <Drawer.Navigator
      initialRouteName="Home"
      screenOptions={{
        headerShown: false,
        drawerStyle: {
          backgroundColor: '#111',
        },
        drawerLabelStyle: {
          color: 'white',
        },
        drawerActiveTintColor: '#facc15',
        drawerInactiveTintColor: 'gray',
      }}
    >
      <Drawer.Screen name="Home" component={HomeScreen} />
      <Drawer.Screen name="About" component={AboutScreen} />
      <Drawer.Screen name="Events" component={EventsScreen} />
      <Drawer.Screen name="SkillStorm" component={SkillStormScreen} />
      <Drawer.Screen name="Leaderboard" component={LeaderboardScreen} />
      <Drawer.Screen name="Scorecards" component={ScorecardsScreen} />
      <Drawer.Screen name="Gallery" component={GalleryScreen} />
      <Drawer.Screen name="Downloads" component={DownloadsScreen} />
      <Drawer.Screen name="History" component={HistoryScreen} />
    </Drawer.Navigator>
  );
}
