import React from 'react';
import { XStack, H3, Button } from 'tamagui';
import { Menu } from 'lucide-react-native';
import { useNavigation } from '@react-navigation/native';

const Header = ({ title }) => {
  const navigation = useNavigation();

  return (
    <XStack 
      padding="$4" 
      justifyContent="space-between" 
      alignItems="center" 
      backgroundColor="#111"
    >
      <H3 color="$white">{title}</H3>
      <Button 
        icon={<Menu color="white" />} 
        onPress={() => navigation.openDrawer()} 
        chromeless
      />
    </XStack>
  );
};

export default Header;
