import React, { useState } from 'react';
import { ScrollView } from 'react-native';
import {
  YStack,
  H1,
  Paragraph,
  XStack,
  H4,
  Button,
  Card,
  H2,
} from 'tamagui';
import { Download, Smartphone, Apple, Monitor, CheckCircle, Shield } from 'lucide-react-native';
import Header from '../components/Header';
import { LinearGradient } from 'tamagui/linear-gradient';

const platforms = [
  {
    id: "android",
    name: "Android",
    icon: Smartphone,
    color: ['$green10', '$green8'],
    version: "v2.1.0",
    size: "45.2 MB",
    requirements: "Android 8.0+",
    features: [
      "Real-time event notifications",
      "Offline score tracking",
      "Instant leaderboard updates",
    ],
  },
  {
    id: "ios",
    name: "iOS",
    icon: Apple,
    color: ['$gray10', '$gray8'],
    version: "v2.1.0",
    size: "89.7 MB",
    requirements: "iOS 14.0+",
    features: [
      "Native iOS experience",
      "Advanced analytics dashboard",
      "iCloud sync support",
    ],
  },
  {
    id: "desktop",
    name: "Desktop",
    icon: Monitor,
    color: ['$blue10', '$blue8'],
    version: "v2.1.0",
    size: "67.4 MB",
    requirements: "Windows 10+ / macOS 11.0+",
    features: [
      "Optimized for large screens",
      "Keyboard shortcuts",
      "Multi-window support",
    ],
  },
];

const DownloadsScreen = () => {
  const [activeTab, setActiveTab] = useState("android");
  const activePlatform = platforms.find((p) => p.id === activeTab);

  return (
    <ScrollView style={{ backgroundColor: '#000' }}>
      <YStack>
        <Header title="Downloads" />
        <YStack backgroundColor="#000" padding="$4" space="$5">

        {/* Platform Selection */}
        <YStack space="$4">
          <ScrollView horizontal showsHorizontalScrollIndicator={false}>
            <XStack space="$3">
              {platforms.map((platform) => (
                <Button
                  key={platform.id}
                  backgroundColor={activeTab === platform.id ? '$yellow10' : '$gray4Dark'}
                  color={activeTab === platform.id ? '$black' : '$white'}
                  icon={platform.icon}
                  onPress={() => setActiveTab(platform.id)}
                  size="$4"
                >
                  {platform.name}
                </Button>
              ))}
            </XStack>
          </ScrollView>
        </YStack>

        {/* Download Card */}
        {activePlatform && (
          <Card elevate backgroundColor="$gray2Dark" padding="$4" space="$4">
            <LinearGradient
              colors={activePlatform.color}
              borderRadius="$4"
              padding="$4"
              alignItems="center"
              space="$3"
            >
              <activePlatform.icon color="$white" size={48} />
              <H2 color="$white">{activePlatform.name}</H2>
              <XStack space="$3">
                <Paragraph color="$gray11Light">{activePlatform.version}</Paragraph>
                <Paragraph color="$gray11Light">•</Paragraph>
                <Paragraph color="$gray11Light">{activePlatform.size}</Paragraph>
              </XStack>
            </LinearGradient>

            <YStack space="$3">
              <H4 color="$white">Key Features</H4>
              {activePlatform.features.map((feature, index) => (
                <XStack key={index} alignItems="center" space="$3">
                  <CheckCircle size={16} color="$green10" />
                  <Paragraph color="$gray11Light">{feature}</Paragraph>
                </XStack>
              ))}
            </YStack>

            <XStack
              alignItems="center"
              space="$3"
              padding="$3"
              borderRadius="$3"
              backgroundColor="$gray3Dark"
            >
              <Shield size={24} color="$green10" />
              <YStack>
                <Paragraph color="$white" fontWeight="bold">Secure Download</Paragraph>
                <Paragraph color="$gray10Light" fontSize="$2">Verified and virus-free</Paragraph>
              </YStack>
            </XStack>

            <Button
              icon={Download}
              backgroundColor="$yellow10"
              color="$black"
              size="$5"
              pressTheme
            >
              Download for {activePlatform.name}
            </Button>
          </Card>
        )}

        </YStack>
      </YStack>
    </ScrollView>
  );
};

export default DownloadsScreen;
