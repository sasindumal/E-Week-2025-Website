import React, { useState } from 'react';
import { ScrollView, Image } from 'react-native';
import {
  YStack,
  H1,
  H3,
  Paragraph,
  XStack,
  Card,
  Button,
  H2,
  H4,
  H5,
  H6,
} from 'tamagui';
import {
  Code,
  Palette,
  Box,
  Gamepad2,
  Trophy,
  Zap,
  Target,
  Shield,
  Car,
  Crosshair,
  Smartphone,
  Joystick,
} from 'lucide-react-native';
import { LinearGradient } from 'expo-linear-gradient';
import Header from '../components/Header';

// Data for competitions
const mainCompetitions = [
  {
    id: "codeyssey",
    name: "Codeyssey",
    subtitle: "Coding Competition for Talented Students",
    icon: Code,
    gradient: ['#3b82f6', '#8b5cf6'],
  },
  {
    id: "pixel-ares",
    name: "Pixel Ares",
    subtitle: "Graphic Design Competition",
    icon: Palette,
    gradient: ['#ec4899', '#f97316'],
  },
  {
    id: "titan-cad",
    name: "Titan CAD",
    subtitle: "SolidWorks Competition",
    icon: Box,
    gradient: ['#22c55e', '#14b8a6'],
  },
];

const pcGames = [
    { id: "valorant", name: "Valorant", icon: Target, gradient: ['#ef4444', '#ec4899'] },
    { id: "six-siege", name: "Rainbow Six Siege", icon: Shield, gradient: ['#6b7280', '#3b82f6'] },
    { id: "blur", name: "Blur", icon: Car, gradient: ['#eab308', '#f97316'] },
    { id: "cod4", name: "COD 4 (Search & Destroy)", icon: Crosshair, gradient: ['#16a34a', '#14b8a6'] },
    { id: "nfs-girls", name: "Need for Speed Most Wanted", icon: Car, gradient: ['#a855f7', '#ec4899'] },
];

const mobileGames = [
    { id: "pubg-mobile", name: "PUBG Mobile", icon: Target, gradient: ['#f97316', '#ef4444'] },
    { id: "cod-mobile", name: "COD Mobile", icon: Crosshair, gradient: ['#3b82f6', '#a855f7'] },
];

const funGames = [
    { id: "monopoly", name: "Monopoly", platform: "PC", icon: Joystick, gradient: ['#22c55e', '#3b82f6'] },
    { id: "omi", name: "Omi", platform: "Mobile", icon: Smartphone, gradient: ['#a855f7', '#ec4899'] },
];

const SkillStormScreen = () => {
  const [expandedSection, setExpandedSection] = useState('pc-games');

  return (
    <ScrollView style={{ backgroundColor: '#000' }}>
      <Header title="SkillStorm" />
      <YStack backgroundColor="#000" padding="$4" space="$5">
        {/* Hero Section */}
        <YStack alignItems="center" space="$3" paddingVertical="$6" borderRadius="$6" backgroundColor="$gray2Dark">
          <Image
            source={{ uri: 'https://cdn.builder.io/api/v1/image/assets%2Fc5794fad86854d05a0a2b5f05a97b44d%2Faae1c430463649c0addd533bd2f58c0c?format=webp&width=800' }}
            style={{ width: 200, height: 100, resizeMode: 'contain' }}
          />
          <XStack alignItems="center" space="$3">
            <H1 color="$white" textAlign="center">SkillStorm 2025</H1>
            <Zap color="$yellow10" size={36} />
          </XStack>
          <Paragraph color="$gray11Light" textAlign="center" fontSize="$6">
            The Ultimate Multi-Disciplinary Competition Experience
          </Paragraph>
          <Paragraph color="$yellow10" fontSize="$5" fontWeight="bold">
            Code • Design • Engineer • Game
          </Paragraph>
          <XStack justifyContent="space-around" width="100%" paddingTop="$4">
            <YStack alignItems="center" space="$2">
              <Code color="$blue10" size={24} />
              <H4 color="$white">3</H4>
              <Paragraph color="$gray10">Core Competitions</Paragraph>
            </YStack>
            <YStack alignItems="center" space="$2">
              <Gamepad2 color="$green10" size={24} />
              <H4 color="$white">7</H4>
              <Paragraph color="$gray10">Esports Games</Paragraph>
            </YStack>
            <YStack alignItems="center" space="$2">
              <Trophy color="$yellow10" size={24} />
              <H4 color="$white">100</H4>
              <Paragraph color="$gray10">Total Points</Paragraph>
            </YStack>
          </XStack>
        </YStack>

        {/* Main Competitions Section */}
        <YStack space="$4">
          <XStack alignItems="center" space="$3">
            <Trophy color="$yellow10" size={28} />
            <H2 color="$white">Main Competitions</H2>
          </XStack>
          <YStack space="$4">
            {mainCompetitions.map((comp) => {
              const Icon = comp.icon;
              return (
                <Card key={comp.id} overflow="hidden">
                  <LinearGradient colors={comp.gradient}>
                    <YStack padding="$4" space="$3">
                      <XStack alignItems="center" space="$3">
                        <Icon color="$white" size={40} />
                        <YStack flex={1}>
                          <H3 color="$white">{comp.name}</H3>
                          <Paragraph color="$gray10Light">{comp.subtitle}</Paragraph>
                        </YStack>
                      </XStack>
                      <Button
                        alignSelf="flex-start"
                        backgroundColor="$backgroundTransparent"
                        borderWidth={1}
                        borderColor="$white"
                        color="$white"
                      >
                        Register Now
                      </Button>
                    </YStack>
                  </LinearGradient>
                </Card>
              );
            })}
          </YStack>
        </YStack>

        {/* Esports Competitions Section */}
        <YStack space="$4">
          <XStack alignItems="center" space="$3">
            <Gamepad2 color="$yellow10" size={28} />
            <H2 color="$white">Esports Competitions</H2>
          </XStack>

          {/* PC/Mobile Toggle */}
          <XStack space="$3" alignSelf="center">
            <Button
              onPress={() => setExpandedSection('pc-games')}
              backgroundColor={expandedSection === 'pc-games' ? '$blue10' : '$gray5Dark'}
              color="$white"
            >
              PC Games
            </Button>
            <Button
              onPress={() => setExpandedSection('mobile-games')}
              backgroundColor={expandedSection === 'mobile-games' ? '$blue10' : '$gray5Dark'}
              color="$white"
            >
              Mobile Games
            </Button>
          </XStack>

          {/* Games List */}
          <YStack space="$3">
            {(expandedSection === 'pc-games' ? pcGames : mobileGames).map((game) => {
              const Icon = game.icon;
              return (
                <Card key={game.id} overflow="hidden">
                  <LinearGradient colors={game.gradient}>
                    <XStack padding="$4" alignItems="center" space="$4">
                      <Icon color="$white" size={32} />
                      <H4 color="$white" flex={1}>{game.name}</H4>
                      <Button size="$3" chromeless>View Details</Button>
                    </XStack>
                  </LinearGradient>
                </Card>
              );
            })}
          </YStack>
        </YStack>

        {/* Fun Games Section */}
        <YStack space="$4">
          <XStack alignItems="center" space="$3">
            <Joystick color="$yellow10" size={28} />
            <H2 color="$white">Fun Games</H2>
          </XStack>
          <YStack space="$3">
            {funGames.map((game) => {
              const Icon = game.icon;
              return (
                <Card key={game.id} overflow="hidden">
                  <LinearGradient colors={game.gradient}>
                    <XStack padding="$4" alignItems="center" space="$4">
                      <Icon color="$white" size={32} />
                      <YStack flex={1}>
                        <H4 color="$white">{game.name}</H4>
                        <Paragraph color="$gray10Light">Platform: {game.platform}</Paragraph>
                      </YStack>
                      <Paragraph color="$gray11Light">No Registration</Paragraph>
                    </XStack>
                  </LinearGradient>
                </Card>
              );
            })}
          </YStack>
        </YStack>
      </YStack>
    </ScrollView>
  );
};

export default SkillStormScreen;
