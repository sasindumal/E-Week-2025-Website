import React from 'react';
import { ScrollView } from 'react-native';
import { YStack, H1, H2, H3, Paragraph, Card } from 'tamagui';
import { Rocket, Zap, Code, Wrench, Lightbulb, Users, Heart, Clock, Star, Brain, Shield, Globe, Target, Cpu, Award, Calendar, TrendingUp, Trophy, Sparkles } from 'lucide-react-native';
import { LinearGradient } from 'expo-linear-gradient';
import Header from '../components/Header';

const timeline = [
    {
      year: "2020",
      title: "The Genesis",
      description: "Born from a Vision",
      details: "E-Week was conceived by passionate engineering students who envisioned a platform where innovation meets competition.",
      icon: Lightbulb,
    },
    {
      year: "2021",
      title: "Innovation Unleashed",
      description: "Digital Transformation Era",
      details: "E-Week 2021 pioneered the hybrid model, combining virtual and physical competitions.",
      icon: Globe,
    },
    {
      year: "2022",
      title: "Future Engineering",
      description: "Technology Integration",
      details: "Introducing cutting-edge technologies like AI, Machine Learning, and Data Science.",
      icon: Brain,
    },
    {
      year: "2023",
      title: "Tech for Tomorrow",
      description: "Sustainability Focus",
      details: "E-Week embraced sustainable technology solutions and green engineering practices.",
      icon: Shield,
    },
    {
      year: "2024",
      title: "Digital Revolution",
      description: "Breaking All Records",
      details: "The most ambitious E-Week yet, featuring quantum computing and advanced AI.",
      icon: Rocket,
    },
    {
      year: "2025",
      title: "The Future Begins",
      description: "Next Generation Engineering",
      details: "E-Week 2025 represents the pinnacle of engineering innovation and global partnerships.",
      icon: Star,
    },
  ];

const coreValues = [
    {
      title: "Innovation Excellence",
      description: "We believe in pushing the boundaries of what's possible, encouraging creative solutions to complex engineering challenges.",
      icon: Lightbulb,
    },
    {
      title: "Collaborative Spirit",
      description: "Engineering is a team sport. We foster collaboration across disciplines, batches, and institutions to create stronger solutions.",
      icon: Users,
    },
    {
      title: "Excellence in Education",
      description: "We're committed to advancing engineering education through hands-on experiences, mentorship, and real-world applications.",
      icon: Target,
    },
    {
      title: "Technological Leadership",
      description: "We embrace emerging technologies and prepare future engineers to lead in an ever-evolving technological landscape.",
      icon: Cpu,
    },
  ];

const impactStats = [
    {
      number: "5,400+",
      label: "Total Participants",
      icon: Users,
    },
    {
      number: "125+",
      label: "Events Conducted",
      icon: Calendar,
    },
    {
      number: "€270K+",
      label: "Total Prizes",
      icon: Award,
    },
    {
      number: "50+",
      label: "Industry Partners",
      icon: Globe,
    },
    {
      number: "15+",
      label: "Universities",
      icon: Brain,
    },
    {
      number: "100%",
      label: "Success Rate",
      icon: TrendingUp,
    },
  ];

const specialFeatures = [
    {
      title: "Multi-Disciplinary Approach",
      description: "From software engineering to mechanical design, E-Week covers the entire spectrum of modern engineering.",
      icon: Wrench,
      gradient: ['#3b82f6', '#6366f1'],
    },
    {
      title: "Industry Integration",
      description: "Real-world challenges, industry mentors, and career opportunities to bridge academia and professional excellence.",
      icon: Trophy,
      gradient: ['#8b5cf6', '#ec4899'],
    },
    {
      title: "Innovation Ecosystem",
      description: "A thriving ecosystem where ideas flourish, collaborations form, and breakthrough innovations emerge.",
      icon: Sparkles,
      gradient: ['#10b981', '#22c55e'],
    },
    {
      title: "Global Community",
      description: "Connect with engineering talent worldwide, share knowledge, and build lasting professional relationships.",
      icon: Globe,
      gradient: ['#f97316', '#ef4444'],
    },
  ];

const AboutScreen = () => {
    return (
        <ScrollView style={{ backgroundColor: 'black' }}>
            <YStack>
                <Header title="About" />
                {/* Hero Section */}
                <YStack
                    height={400}
                    alignItems="center"
                    justifyContent="center"
                    padding="$4"
                    space="$4"
                    backgroundColor="$gray1Dark"
                >
                    <Rocket size={80} color="$purple10" />
                    <H1 color="$color.white" textAlign="center">About E-Week</H1>
                    <Paragraph color="$gray11Light" textAlign="center" fontSize="$5">
                        The premier engineering innovation platform where brilliant minds converge to shape the future of technology.
                    </Paragraph>
                    <Card padding="$4" backgroundColor="$gray3Dark">
                        <YStack space="$2" alignItems="center">
                            <Heart size={24} color="$pink10" />
                            <H3 color="$color.white">Our Mission</H3>
                            <Paragraph color="$gray11Light" textAlign="center">
                                To inspire, challenge, and empower the next generation of engineers through innovative competitions, collaborative learning, and cutting-edge technology exploration.
                            </Paragraph>
                        </YStack>
                    </Card>
                </YStack>

                {/* What is E-Week Section */}
                <YStack padding="$4" space="$4">
                    <H2 color="$color.white" textAlign="center">What is E-Week? <Zap size={24} color="$yellow10" /></H2>
                    <Paragraph color="$gray11Light" textAlign="center">
                        Engineering Week - A comprehensive celebration of innovation, creativity, and engineering excellence.
                    </Paragraph>
                    <Card padding="$4" backgroundColor="$gray2Dark">
                        <YStack space="$3">
                            <H3 color="$color.white">Engineering Week (E-Week)</H3>
                            <Paragraph color="$gray11Light">
                                E-Week is an intensive, week-long festival of engineering innovation that brings together students, professionals, and industry leaders from around the world. It's more than just a competition - it's a transformative experience that challenges participants to push the boundaries of what's possible in engineering and technology.
                            </Paragraph>
                            <YStack space="$3" marginTop="$3">
                                <Card padding="$3" backgroundColor="$gray4Dark">
                                    <YStack space="$2">
                                        <Code size={20} color="$blue10" />
                                        <H3 color="$color.white" fontSize="$4">Technical Challenges</H3>
                                        <Paragraph color="$gray11Light">Cutting-edge programming contests, AI challenges, and software development competitions.</Paragraph>
                                    </YStack>
                                </Card>
                                <Card padding="$3" backgroundColor="$gray4Dark">
                                    <YStack space="$2">
                                        <Wrench size={20} color="$orange10" />
                                        <H3 color="$color.white" fontSize="$4">Engineering Design</H3>
                                        <Paragraph color="$gray11Light">Mechanical design, robotics, CAD competitions, and innovative engineering solutions.</Paragraph>
                                    </YStack>
                                </Card>
                                <Card padding="$3" backgroundColor="$gray4Dark">
                                    <YStack space="$2">
                                        <Lightbulb size={20} color="$yellow10" />
                                        <H3 color="$color.white" fontSize="$4">Innovation Labs</H3>
                                        <Paragraph color="$gray11Light">Startup pitches, creative problem-solving, and breakthrough innovation showcases.</Paragraph>
                                    </YStack>
                                </Card>
                                <Card padding="$3" backgroundColor="$gray4Dark">
                                    <YStack space="$2">
                                        <Users size={20} color="$green10" />
                                        <H3 color="$color.white" fontSize="$4">Collaborative Learning</H3>
                                        <Paragraph color="$gray11Light">Workshops, mentorship sessions, and knowledge sharing across engineering disciplines.</Paragraph>
                                    </YStack>
                                </Card>
                            </YStack>
                        </YStack>
                    </Card>
                </YStack>

                {/* Timeline Section */}
                <YStack padding="$4" space="$4">
                    <H2 color="$color.white" textAlign="center">The E-Week Journey <Clock size={24} color="$blue10" /></H2>
                    <YStack space="$4">
                        {timeline.map((item, index) => (
                            <XStack key={index} space="$4">
                                <YStack alignItems="center" space="$2">
                                    <YStack width={2} height="100%" backgroundColor="$gray8Dark" />
                                    <item.icon size={24} color="$purple10" />
                                    <YStack width={2} flex={1} backgroundColor="$gray8Dark" />
                                </YStack>
                                <YStack flex={1}>
                                    <Card padding="$4" backgroundColor="$gray3Dark">
                                        <YStack space="$2">
                                            <H3 color="$color.white">{item.year} - {item.title}</H3>
                                            <Paragraph color="$gray11Light" fontStyle="italic">{item.description}</Paragraph>
                                            <Paragraph color="$gray11Light">{item.details}</Paragraph>
                                        </YStack>
                                    </Card>
                                </YStack>
                            </XStack>
                        ))}
                    </YStack>
                </YStack>

                {/* Core Values Section */}
                <YStack padding="$4" space="$4">
                    <H2 color="$color.white" textAlign="center">Our Core Values</H2>
                    <YStack space="$3">
                        {coreValues.map((value, index) => (
                            <Card key={index} padding="$4" backgroundColor="$gray2Dark">
                                <XStack space="$4" alignItems="center">
                                    <value.icon size={28} color="$green10" />
                                    <YStack flex={1}>
                                        <H3 color="$color.white">{value.title}</H3>
                                        <Paragraph color="$gray11Light">{value.description}</Paragraph>
                                    </YStack>
                                </XStack>
                            </Card>
                        ))}
                    </YStack>
                </YStack>

                {/* Impact Statistics Section */}
                <YStack padding="$4" space="$4">
                    <H2 color="$color.white" textAlign="center">Our Impact in Numbers</H2>
                    <XStack flexWrap="wrap" justifyContent="space-between">
                        {impactStats.map((stat, index) => (
                            <Card key={index} width="48%" marginVertical="$2" padding="$4" backgroundColor="$gray3Dark">
                                <YStack alignItems="center" space="$2">
                                    <stat.icon size={28} color="$blue10" />
                                    <H3 color="$color.white">{stat.number}</H3>
                                    <Paragraph color="$gray11Light" textAlign="center">{stat.label}</Paragraph>
                                </YStack>
                            </Card>
                        ))}
                    </XStack>
                </YStack>

                {/* What Makes E-Week Special Section */}
                <YStack padding="$4" space="$4">
                    <H2 color="$color.white" textAlign="center">What Makes E-Week Special</H2>
                    <YStack space="$3">
                        {specialFeatures.map((feature, index) => (
                            <Card key={index} overflow="hidden">
                                <LinearGradient
                                    colors={feature.gradient}
                                    start={{ x: 0, y: 0 }}
                                    end={{ x: 1, y: 1 }}
                                >
                                    <YStack padding="$4" space="$3">
                                        <XStack alignItems="center" space="$3">
                                            <feature.icon size={24} color="white" />
                                            <H3 color="$color.white">{feature.title}</H3>
                                        </XStack>
                                        <Paragraph color="$gray11Light">{feature.description}</Paragraph>
                                    </YStack>
                                </LinearGradient>
                            </Card>
                        ))}
                    </YStack>
                </YStack>
            </YStack>
        </ScrollView>
    );
};

export default AboutScreen;
