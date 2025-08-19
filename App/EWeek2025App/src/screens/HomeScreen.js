import React from 'react';
import { ScrollView, ImageBackground } from 'react-native';
import { YStack, XStack, H1, Paragraph, Button, Image } from 'tamagui';
import { Bell, Play, Code, Cpu, Lightbulb, Target, Calendar, Clock, MapPin, Award, Sparkles, Users, Trophy, HeartHandshake } from 'lucide-react-native';
import { useNavigation } from '@react-navigation/native';
import CountdownTimer from '../components/CountdownTimer';
import Header from '../components/Header';
import { LinearGradient } from 'expo-linear-gradient';
import { H2, H3, Card, Text } from 'tamagui';

const batchLeaderboard = [
    {
      batch: "E21",
      points: 2450,
      logo: "🏆",
      rank: 1,
      color: ['#facc15', '#ca8a04'],
    },
    {
      batch: "E22",
      points: 2120,
      logo: "🥈",
      rank: 2,
      color: ['#d1d5db', '#6b7280'],
    },
    {
      batch: "E20",
      points: 1980,
      logo: "🥉",
      rank: 3,
      color: ['#fb923c', '#ea580c'],
    },
    {
      batch: "E23",
      points: 1750,
      logo: "⭐",
      rank: 4,
      color: ['#60a5fa', '#2563eb'],
    },
    {
      batch: "E24",
      points: 1420,
      logo: "🌟",
      rank: 5,
      color: ['#c084fc', '#9333ea'],
    },
  ];

const upcomingEvents = [
    {
      id: 1,
      title: "AI & Machine Learning Hackathon",
      date: "August 25, 2025",
      time: "9:00 AM",
      location: "Innovation Hub",
      prize: "20 Points",
      icon: Code,
      gradient: ['#3b82f6', '#7c3aed'],
    },
    {
      id: 2,
      title: "Robotics Championship",
      date: "August 26, 2025",
      time: "2:00 PM",
      location: "Engineering Arena",
      prize: "30 Points",
      icon: Cpu,
      gradient: ['#22c55e', '#0d9488'],
    },
    {
      id: 3,
      title: "Startup Pitch Battle",
      date: "August 27, 2025",
      time: "10:00 AM",
      location: "Main Auditorium",
      prize: "20 Points",
      icon: Lightbulb,
      gradient: ['#f97316', '#dc2626'],
    },
    {
      id: 4,
      title: "IoT Solutions Workshop",
      date: "August 28, 2025",
      time: "1:00 PM",
      location: "Tech Lab",
      prize: "10 Points",
      icon: Target,
      gradient: ['#ec4899', '#7c3aed'],
    },
  ];

const sponsors = [
    {
      name: "TechCorp Global",
      logo: "🏢",
      tier: "platinum",
      description: "Leading AI & Cloud Solutions",
    },
    {
      name: "InnovateLab",
      logo: "🔬",
      tier: "gold",
      description: "Research & Development Pioneer",
    },
    {
      name: "CodeMasters Inc",
      logo: "💻",
      tier: "gold",
      description: "Software Development Excellence",
    },
    {
      name: "FutureTech Systems",
      logo: "🚀",
      tier: "silver",
      description: "Next-Gen Technology Solutions",
    },
    {
      name: "GreenEnergy Solutions",
      logo: "🌱",
      tier: "silver",
      description: "Sustainable Innovation Leaders",
    },
    {
      name: "DataDrive Analytics",
      logo: "📊",
      tier: "bronze",
      description: "Big Data & Analytics Platform",
    },
  ];

const modernFeatures = [
    {
      icon: Sparkles,
      title: "Engineering Excellence",
      description: "Showcase the capabilities, achievements, and unity of the Faculty of Engineering to the world.",
      color: ['#2563eb', '#06b6d4'],
    },
    {
      icon: Users,
      title: "Community Engagement",
      description: "Inspire and educate society through workshops, seminars, and school outreach programs.",
      color: ['#16a34a', '#84cc16'],
    },
    {
      icon: Code,
      title: "Dynamic Competitions",
      description: "Unleash talent through design, coding, gaming, and creativity contests across disciplines.",
      color: ['#7e22ce', '#ec4899'],
    },
    {
      icon: Trophy,
      title: "Unity & Collaboration",
      description: "Foster strong bonds between students, staff, and the community through shared goals and teamwork.",
      color: ['#eab308', '#f97316'],
    },
    {
      icon: HeartHandshake,
      title: "Social Responsibility",
      description: "Give back to society with initiatives like blood donation campaigns and public awareness drives.",
      color: ['#dc2626', '#f43f5e'],
    },
  ];

const HomeScreen = () => {
    const navigation = useNavigation();

    return (
        <ScrollView style={{ backgroundColor: 'black' }}>
            <YStack>
                <Header title="Home" />
                {/* Hero Section */}
                <ImageBackground
                    source={{ uri: 'https://images.unsplash.com/photo-1534532139579-6511115b8143?q=80&w=2070&auto=format&fit=crop' }} // Using a placeholder image
                    style={{ width: '100%', height: 600 }}
                    resizeMode="cover"
                >
                    <YStack
                        flex={1}
                        justifyContent="center"
                        alignItems="center"
                        backgroundColor="rgba(0,0,0,0.5)"
                        padding="$4"
                        space="$4"
                    >
                        <Image
                            source={{ uri: 'https://cdn.builder.io/api/v1/assets/c5794fad86854d05a0a2b5f05a97b44d/e-week_logo_-2025-322131?format=webp&width=800' }}
                            width={150}
                            height={150}
                            resizeMode="contain"
                        />
                        <H1 color="$color.white" textAlign="center" fontSize="$9">
                            E-WEEK 2K25
                        </H1>
                        <Paragraph color="$color.white" textAlign="center" fontSize="$5">
                            Warriors of the Odyssey, rise! The storm is near, and only the brave shall write history.
                        </Paragraph>

                        <CountdownTimer targetDate="2025-08-25T00:00:00" />

                        <XStack space="$3" marginTop="$4">
                            <Button icon={<Bell size={20} color="white" />} theme="active">
                                Register
                            </Button>
                            <Button icon={<Play size={20} color="white" />} onPress={() => navigation.navigate('Events')}>
                                Explore Events
                            </Button>
                        </XStack>
                    </YStack>
                </ImageBackground>

                {/* Navigation Links */}
                <YStack padding="$4" space="$3">
                    <XStack space="$3">
                        <Button flex={1} onPress={() => navigation.navigate('Leaderboard')}>Leaderboard</Button>
                        <Button flex={1} onPress={() => navigation.navigate('Scorecards')}>Scorecards</Button>
                    </XStack>
                    <XStack space="$3">
                        <Button flex={1} onPress={() => navigation.navigate('Gallery')}>Gallery</Button>
                        <Button flex={1} onPress={() => navigation.navigate('Downloads')}>Downloads</Button>
                    </XStack>
                </YStack>

                {/* Batch Leaderboard Section */}
                <YStack padding="$4" space="$4">
                    <H2 color="$color.white" textAlign="center">Batch Leaderboard</H2>
                    {batchLeaderboard.map((item) => (
                        <Card key={item.rank} overflow="hidden">
                            <LinearGradient
                                colors={item.color}
                                start={{ x: 0, y: 0 }}
                                end={{ x: 1, y: 0 }}
                            >
                                <XStack padding="$4" alignItems="center" justifyContent="space-between">
                                    <XStack alignItems="center" space="$4">
                                        <Text fontSize="$8" color="$color.white">{item.logo}</Text>
                                        <YStack>
                                            <Text fontSize="$6" fontWeight="bold" color="$color.white">{item.batch}</Text>
                                            <Text color="$gray11Light">{item.points} Points</Text>
                                        </YStack>
                                    </XStack>
                                    <Text fontSize="$7" fontWeight="bold" color="$color.white">#{item.rank}</Text>
                                </XStack>
                            </LinearGradient>
                        </Card>
                    ))}
                </YStack>

                {/* Upcoming Events Section */}
                <YStack padding="$4" space="$4">
                    <H2 color="$color.white" textAlign="center">Upcoming Events</H2>
                    {upcomingEvents.map((event) => (
                        <Card key={event.id} overflow="hidden">
                            <LinearGradient
                                colors={event.gradient}
                                start={{ x: 0, y: 0 }}
                                end={{ x: 1, y: 1 }}
                            >
                                <YStack padding="$4" space="$3">
                                    <XStack alignItems="center" space="$3">
                                        <event.icon color="white" size={24} />
                                        <H3 color="$color.white">{event.title}</H3>
                                    </XStack>
                                    <XStack alignItems="center" space="$2">
                                        <Calendar size={16} color="$gray11Light" />
                                        <Text color="$gray11Light">{event.date} at {event.time}</Text>
                                    </XStack>
                                    <XStack alignItems="center" space="$2">
                                        <MapPin size={16} color="$gray11Light" />
                                        <Text color="$gray11Light">{event.location}</Text>
                                    </XStack>
                                    <XStack alignItems="center" space="$2">
                                        <Award size={16} color="$gray11Light" />
                                        <Text color="$gray11Light">{event.prize}</Text>
                                    </XStack>
                                </YStack>
                            </LinearGradient>
                        </Card>
                    ))}
                </YStack>

                {/* Sponsors Section */}
                <YStack padding="$4" space="$4">
                    <H2 color="$color.white" textAlign="center">Our Sponsors</H2>
                    <XStack flexWrap="wrap" justifyContent="center">
                        {sponsors.map((sponsor, index) => (
                            <Card key={index} width="48%" margin="1%" padding="$4" backgroundColor="$gray5Dark">
                                <YStack alignItems="center" space="$2">
                                    <Text fontSize="$8">{sponsor.logo}</Text>
                                    <Text fontWeight="bold" color="$color.white">{sponsor.name}</Text>
                                    <Paragraph fontSize="$2" color="$gray11Light" textAlign="center">{sponsor.description}</Paragraph>
                                    <Text fontSize="$1" color="$yellow10Dark" textTransform="capitalize">{sponsor.tier} Sponsor</Text>
                                </YStack>
                            </Card>
                        ))}
                    </XStack>
                </YStack>

                {/* Modern Features Section */}
                <YStack padding="$4" space="$4">
                    <H2 color="$color.white" textAlign="center">Why E-Week Matters</H2>
                    {modernFeatures.map((feature, index) => (
                        <Card key={index} padding="$4" backgroundColor="$gray2Dark">
                            <XStack alignItems="center" space="$4">
                                <LinearGradient
                                    colors={feature.color}
                                    style={{ borderRadius: 50, padding: 12 }}
                                >
                                    <feature.icon color="white" size={28} />
                                </LinearGradient>
                                <YStack flex={1}>
                                    <H3 color="$color.white">{feature.title}</H3>
                                    <Paragraph color="$gray11Light">{feature.description}</Paragraph>
                                </YStack>
                            </XStack>
                        </Card>
                    ))}
                </YStack>
            </YStack>
        </ScrollView>
    );
};

export default HomeScreen;
