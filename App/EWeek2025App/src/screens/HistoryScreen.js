import React, { useState } from 'react';
import { ScrollView } from 'react-native';
import { YStack, H1, H2, H3, Paragraph, Card, XStack, Button } from 'tamagui';
import { History as HistoryIcon, Trophy, Users, Calendar, Star, Crown, Zap, Shield, Sparkles } from 'lucide-react-native';
import { LinearGradient } from 'expo-linear-gradient';
import Header from '../components/Header';

const eweekHistory = [
    {
      year: 2024,
      theme: "Digital Revolution",
      totalParticipants: 1250,
      totalEvents: 28,
      overallChampion: "E21",
      championPoints: 4850,
      categories: {
        overall: { champion: "E21", runnerUp: "E22", third: "E23" },
        technical: { champion: "E20" },
        engineering: { champion: "E22" },
        innovation: { champion: "E21" },
      },
      highlights: [
        "Record breaking 1,250 participants",
        "First-ever AI & Machine Learning track",
        "International collaboration with 5 universities",
      ],
      memorableEvents: [
        { name: "AI Revolution Hackathon", winner: "Neural Networks E20" },
        { name: "Quantum Computing Workshop", winner: "Quantum Pioneers E21" },
      ],
    },
    {
      year: 2023,
      theme: "Tech for Tomorrow",
      totalParticipants: 1180,
      totalEvents: 25,
      overallChampion: "E20",
      championPoints: 4650,
      categories: {
        overall: { champion: "E20", runnerUp: "E21", third: "E19" },
        technical: { champion: "E21" },
        engineering: { champion: "E20" },
        innovation: { champion: "E19" },
      },
      highlights: [
        "Introduction of Web3 and Blockchain track",
        "Partnership with major tech companies",
        "First virtual reality competition",
      ],
      memorableEvents: [
        { name: "Metaverse Development Challenge", winner: "VR Visionaries E19" },
        { name: "Blockchain Innovation Lab", winner: "Crypto Creators E20" },
      ],
    },
    {
      year: 2022,
      theme: "Future Engineering",
      totalParticipants: 1050,
      totalEvents: 22,
      overallChampion: "E19",
      championPoints: 4380,
      categories: {
        overall: { champion: "E19", runnerUp: "E20", third: "E18" },
        technical: { champion: "E20" },
        engineering: { champion: "E19" },
        innovation: { champion: "E18" },
      },
      highlights: [
        "Launch of Data Science track",
        "International guest speakers program",
        "Industry mentorship initiative",
      ],
      memorableEvents: [
        { name: "Data Science Olympics", winner: "Data Dynamos E20" },
        { name: "Engineering Excellence Showcase", winner: "Precision Engineers E19" },
      ],
    },
    {
      year: 2021,
      theme: "Innovation Unleashed",
      totalParticipants: 980,
      totalEvents: 20,
      overallChampion: "E18",
      championPoints: 4120,
      categories: {
        overall: { champion: "E18", runnerUp: "E19", third: "E17" },
        technical: { champion: "E19" },
        engineering: { champion: "E18" },
        innovation: { champion: "E17" },
      },
      highlights: [
        "First hybrid online-offline format",
        "Global virtual participation",
        "Innovation mentorship program",
      ],
      memorableEvents: [
        { name: "Virtual Reality Innovation", winner: "Digital Dreamers E17" },
        { name: "COVID-19 Solution Challenge", winner: "Health Tech Heroes E18" },
      ],
    },
    {
      year: 2020,
      theme: "Engineering Excellence",
      totalParticipants: 920,
      totalEvents: 18,
      overallChampion: "E17",
      championPoints: 3950,
      categories: {
        overall: { champion: "E17", runnerUp: "E18", third: "E16" },
        technical: { champion: "E18" },
        engineering: { champion: "E17" },
        innovation: { champion: "E16" },
      },
      highlights: [
        "Record engineering participation",
        "Industry partnership expansion",
        "Alumni mentorship network",
      ],
      memorableEvents: [
        { name: "Engineering Grand Challenge", winner: "Elite Engineers E17" },
        { name: "Sustainable Design Competition", winner: "Eco Innovators E16" },
      ],
    },
  ];

const HistoryScreen = () => {
    const [selectedYear, setSelectedYear] = useState(2024);
    const years = eweekHistory.map((h) => h.year);
    const currentYearData = eweekHistory.find((h) => h.year === selectedYear);

    return (
        <ScrollView style={{ backgroundColor: 'black' }}>
            <YStack>
                <Header title="History" />

                {/* Year Selector */}
                <YStack padding="$4" space="$4">
                    <H2 color="$color.white">Select Year</H2>
                    <ScrollView horizontal showsHorizontalScrollIndicator={false}>
                        <XStack space="$3">
                            {years.map((year) => (
                                <Button
                                    key={year}
                                    theme={selectedYear === year ? 'active' : 'gray'}
                                    onPress={() => setSelectedYear(year)}
                                >
                                    {year}
                                </Button>
                            ))}
                        </XStack>
                    </ScrollView>
                </YStack>

                {/* Key Stats Section */}
                {currentYearData && (
                    <YStack paddingHorizontal="$4" space="$4">
                        <H2 color="$color.white">{currentYearData.year}: {currentYearData.theme}</H2>
                        <XStack justifyContent="space-around" space="$3">
                            <Card flex={1} padding="$4" backgroundColor="$gray2Dark">
                                <YStack alignItems="center" space="$2">
                                    <Users size={24} color="$blue10" />
                                    <H3 color="$color.white">{currentYearData.totalParticipants}</H3>
                                    <Paragraph color="$gray11Light">Participants</Paragraph>
                                </YStack>
                            </Card>
                            <Card flex={1} padding="$4" backgroundColor="$gray2Dark">
                                <YStack alignItems="center" space="$2">
                                    <Calendar size={24} color="$green10" />
                                    <H3 color="$color.white">{currentYearData.totalEvents}</H3>
                                    <Paragraph color="$gray11Light">Events</Paragraph>
                                </YStack>
                            </Card>
                        </XStack>
                        <Card padding="$4" backgroundColor="$gray2Dark">
                            <YStack alignItems="center" space="$2">
                                <Trophy size={24} color="$yellow10" />
                                <H3 color="$color.white">Overall Champion: {currentYearData.overallChampion}</H3>
                                <Paragraph color="$gray11Light">{currentYearData.championPoints} Points</Paragraph>
                            </YStack>
                        </Card>
                        {/* Overall Championship Section */}
                        <YStack space="$3">
                            <H3 color="$color.white">Overall Championship</H3>
                            <XStack justifyContent="space-between" space="$3">
                                <Card flex={1} padding="$3" backgroundColor="$gray3Dark" alignItems="center">
                                    <Trophy size={20} color="#C0C0C0" />
                                    <Paragraph>2nd Place</Paragraph>
                                    <H3 color="$color.white">{currentYearData.categories.overall.runnerUp}</H3>
                                </Card>
                                <Card flex={1.2} padding="$3" backgroundColor="$yellow4Dark" alignItems="center">
                                    <Crown size={24} color="#FFD700" />
                                    <Paragraph>1st Place</Paragraph>
                                    <H2 color="$color.white">{currentYearData.categories.overall.champion}</H2>
                                </Card>
                                <Card flex={1} padding="$3" backgroundColor="$gray3Dark" alignItems="center">
                                    <Trophy size={20} color="#CD7F32" />
                                    <Paragraph>3rd Place</Paragraph>
                                    <H3 color="$color.white">{currentYearData.categories.overall.third}</H3>
                                </Card>
                            </XStack>
                        </YStack>

                        {/* Category Champions Section */}
                        <YStack space="$3">
                            <H3 color="$color.white">Category Champions</H3>
                            <XStack flexWrap="wrap" justifyContent="space-between">
                                <Card width="48%" marginBottom="$3" padding="$3" backgroundColor="$gray2Dark">
                                    <XStack alignItems="center" space="$2">
                                        <Zap size={20} color="$blue10" />
                                        <YStack>
                                            <Paragraph color="$gray11Light">Technical</Paragraph>
                                            <H3 color="$color.white">{currentYearData.categories.technical.champion}</H3>
                                        </YStack>
                                    </XStack>
                                </Card>
                                <Card width="48%" marginBottom="$3" padding="$3" backgroundColor="$gray2Dark">
                                    <XStack alignItems="center" space="$2">
                                        <Shield size={20} color="$green10" />
                                        <YStack>
                                            <Paragraph color="$gray11Light">Engineering</Paragraph>
                                            <H3 color="$color.white">{currentYearData.categories.engineering.champion}</H3>
                                        </YStack>
                                    </XStack>
                                </Card>
                                <Card width="48%" marginBottom="$3" padding="$3" backgroundColor="$gray2Dark">
                                    <XStack alignItems="center" space="$2">
                                        <Sparkles size={20} color="$purple10" />
                                        <YStack>
                                            <Paragraph color="$gray11Light">Innovation</Paragraph>
                                            <H3 color="$color.white">{currentYearData.categories.innovation.champion}</H3>
                                        </YStack>
                                    </XStack>
                                </Card>
                            </XStack>
                        </YStack>

                        {/* Highlights Section */}
                        <YStack space="$3">
                            <H3 color="$color.white">Highlights</H3>
                            <Card padding="$4" backgroundColor="$gray2Dark">
                                <YStack space="$3">
                                    {currentYearData.highlights.map((highlight, index) => (
                                        <XStack key={index} alignItems="center" space="$3">
                                            <Star size={16} color="$yellow10" />
                                            <Paragraph color="$gray11Light">{highlight}</Paragraph>
                                        </XStack>
                                    ))}
                                </YStack>
                            </Card>
                        </YStack>

                        {/* Memorable Events Section */}
                        <YStack space="$3">
                            <H3 color="$color.white">Memorable Events</H3>
                            <YStack space="$3">
                                {currentYearData.memorableEvents.map((event, index) => (
                                    <Card key={index} padding="$4" backgroundColor="$gray2Dark">
                                        <YStack space="$2">
                                            <H3 color="$color.white">{event.name}</H3>
                                            <XStack alignItems="center" space="$2">
                                                <Trophy size={16} color="$yellow10" />
                                                <Paragraph color="$gray11Light">Winner: {event.winner}</Paragraph>
                                            </XStack>
                                        </YStack>
                                    </Card>
                                ))}
                            </YStack>
                        </YStack>
                    </YStack>
                )}
            </YStack>
        </ScrollView>
    );
};

export default HistoryScreen;
