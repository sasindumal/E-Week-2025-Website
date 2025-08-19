import React from 'react';
import { YStack, H1, Paragraph, Button } from 'tamagui';
import { AlertTriangle, Home } from 'lucide-react-native';
import { useNavigation } from '@react-navigation/native';

const NotFoundScreen = () => {
  const navigation = useNavigation();

  return (
    <YStack
      flex={1}
      justifyContent="center"
      alignItems="center"
      backgroundColor="#000"
      padding="$4"
      space="$4"
    >
      <AlertTriangle color="$yellow10" size={64} />
      <H1 color="$white" textAlign="center">404 - Page Not Found</H1>
      <Paragraph color="$gray11Light" textAlign="center" fontSize="$6">
        Oops! The page you are looking for does not exist or has been moved.
      </Paragraph>
      <Button
        icon={Home}
        backgroundColor="$yellow10"
        color="$black"
        onPress={() => navigation.navigate('Home')}
        marginTop="$4"
      >
        Go to Homepage
      </Button>
    </YStack>
  );
};

export default NotFoundScreen;
