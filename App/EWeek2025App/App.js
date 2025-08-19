import 'react-native-gesture-handler';
import { TamaguiProvider } from 'tamagui'
import config from './tamagui.config'
import { NavigationContainer } from '@react-navigation/native';
import AppNavigator from './src/navigation/AppNavigator';

export default function App() {
  return (
    <TamaguiProvider config={config}>
      <NavigationContainer>
        <AppNavigator />
      </NavigationContainer>
    </TamaguiProvider>
  )
}
