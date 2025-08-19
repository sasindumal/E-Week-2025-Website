const { PrismaClient } = require('@prisma/client');
const prisma = new PrismaClient();

async function main() {
  console.log('🌱 Starting database seeding...');

  // Create batches
  const batches = await Promise.all([
    prisma.batch.create({
      data: {
        batchCode: 'E21',
        year: 2021,
        department: 'Computer Engineering',
        totalStudents: 120
      }
    }),
    prisma.batch.create({
      data: {
        batchCode: 'E22',
        year: 2022,
        department: 'Computer Engineering',
        totalStudents: 135
      }
    }),
    prisma.batch.create({
      data: {
        batchCode: 'E23',
        year: 2023,
        department: 'Computer Engineering',
        totalStudents: 150
      }
    })
  ]);

  console.log('✅ Created batches:', batches.map(b => b.batchCode));

  // Create events
  const events = await Promise.all([
    prisma.event.create({
      data: {
        title: 'Programming Contest',
        description: 'Test your coding skills in our challenging programming competition',
        date: new Date('2025-08-25'),
        timeStart: new Date('1970-01-01T09:00:00'),
        timeEnd: new Date('1970-01-01T12:00:00'),
        location: 'Computer Lab A',
        category: 'Technical',
        isTeamEvent: false,
        minTeamSize: 1,
        maxTeamSize: 1,
        status: 'upcoming'
      }
    }),
    prisma.event.create({
      data: {
        title: 'Robotics Challenge',
        description: 'Design and build robots to complete specific tasks',
        date: new Date('2025-08-26'),
        timeStart: new Date('1970-01-01T14:00:00'),
        timeEnd: new Date('1970-01-01T17:00:00'),
        location: 'Engineering Workshop',
        category: 'Engineering',
        isTeamEvent: true,
        minTeamSize: 3,
        maxTeamSize: 4,
        status: 'upcoming'
      }
    }),
    prisma.event.create({
      data: {
        title: 'Innovation Pitch',
        description: 'Present your innovative solutions to real-world problems',
        date: new Date('2025-08-27'),
        timeStart: new Date('1970-01-01T10:00:00'),
        timeEnd: new Date('1970-01-01T13:00:00'),
        location: 'Main Auditorium',
        category: 'Innovation',
        isTeamEvent: true,
        minTeamSize: 2,
        maxTeamSize: 5,
        status: 'upcoming'
      }
    })
  ]);

  console.log('✅ Created events:', events.map(e => e.title));

  // Create participants
  const participants = await Promise.all([
    // E21 Participants
    prisma.participant.create({
      data: {
        studentId: 'E21001',
        name: 'Arun Kumar',
        email: 'arun@example.com',
        batchId: batches[0].id,
        phone: '+94-71-123-4567',
        department: 'Computer Engineering'
      }
    }),
    prisma.participant.create({
      data: {
        studentId: 'E21002',
        name: 'Priya Singh',
        email: 'priya@example.com',
        batchId: batches[0].id,
        phone: '+94-71-123-4568',
        department: 'Computer Engineering'
      }
    }),
    prisma.participant.create({
      data: {
        studentId: 'E21003',
        name: 'Raj Patel',
        email: 'raj@example.com',
        batchId: batches[0].id,
        phone: '+94-71-123-4569',
        department: 'Computer Engineering'
      }
    }),
    prisma.participant.create({
      data: {
        studentId: 'E21004',
        name: 'Sara Ahmed',
        email: 'sara@example.com',
        batchId: batches[0].id,
        phone: '+94-71-123-4570',
        department: 'Computer Engineering'
      }
    }),
    // E22 Participants
    prisma.participant.create({
      data: {
        studentId: 'E22001',
        name: 'Arjun Reddy',
        email: 'arjun@example.com',
        batchId: batches[1].id,
        phone: '+94-71-123-4571',
        department: 'Computer Engineering'
      }
    }),
    prisma.participant.create({
      data: {
        studentId: 'E22002',
        name: 'Kavya Nair',
        email: 'kavya@example.com',
        batchId: batches[1].id,
        phone: '+94-71-123-4572',
        department: 'Computer Engineering'
      }
    }),
    prisma.participant.create({
      data: {
        studentId: 'E22003',
        name: 'Rohit Gupta',
        email: 'rohit@example.com',
        batchId: batches[1].id,
        phone: '+94-71-123-4573',
        department: 'Computer Engineering'
      }
    }),
    prisma.participant.create({
      data: {
        studentId: 'E22004',
        name: 'Shreya Verma',
        email: 'shreya@example.com',
        batchId: batches[1].id,
        phone: '+94-71-123-4574',
        department: 'Computer Engineering'
      }
    }),
    // E23 Participants
    prisma.participant.create({
      data: {
        studentId: 'E23001',
        name: 'Amrita Singh',
        email: 'amrita@example.com',
        batchId: batches[2].id,
        phone: '+94-71-123-4575',
        department: 'Computer Engineering'
      }
    }),
    prisma.participant.create({
      data: {
        studentId: 'E23002',
        name: 'Rajesh Kumar',
        email: 'rajesh@example.com',
        batchId: batches[2].id,
        phone: '+94-71-123-4576',
        department: 'Computer Engineering'
      }
    })
  ]);

  console.log('✅ Created participants:', participants.length);

  // Create teams
  const teams = await Promise.all([
    prisma.team.create({
      data: {
        name: 'Code Warriors',
        batchId: batches[0].id,
        eventId: events[0].id,
        captainId: participants[0].id,
        teamCode: 'CW001',
        status: 'registered'
      }
    }),
    prisma.team.create({
      data: {
        name: 'Tech Titans',
        batchId: batches[0].id,
        eventId: events[0].id,
        captainId: participants[1].id,
        teamCode: 'TT001',
        status: 'registered'
      }
    }),
    prisma.team.create({
      data: {
        name: 'Digital Dynamos',
        batchId: batches[1].id,
        eventId: events[0].id,
        captainId: participants[4].id,
        teamCode: 'DD001',
        status: 'registered'
      }
    }),
    prisma.team.create({
      data: {
        name: 'Innovation Squad',
        batchId: batches[1].id,
        eventId: events[1].id,
        captainId: participants[5].id,
        teamCode: 'IS001',
        status: 'registered'
      }
    }),
    prisma.team.create({
      data: {
        name: 'Robo Rangers',
        batchId: batches[2].id,
        eventId: events[1].id,
        captainId: participants[8].id,
        teamCode: 'RR001',
        status: 'registered'
      }
    })
  ]);

  console.log('✅ Created teams:', teams.map(t => t.name));

  // Create team members
  const teamMembers = await Promise.all([
    // Code Warriors team members
    prisma.teamMember.create({
      data: {
        teamId: teams[0].id,
        participantId: participants[0].id,
        isCaptain: true
      }
    }),
    prisma.teamMember.create({
      data: {
        teamId: teams[0].id,
        participantId: participants[1].id,
        isCaptain: false
      }
    }),
    prisma.teamMember.create({
      data: {
        teamId: teams[0].id,
        participantId: participants[2].id,
        isCaptain: false
      }
    }),
    prisma.teamMember.create({
      data: {
        teamId: teams[0].id,
        participantId: participants[3].id,
        isCaptain: false
      }
    }),
    // Tech Titans team members
    prisma.teamMember.create({
      data: {
        teamId: teams[1].id,
        participantId: participants[1].id,
        isCaptain: true
      }
    }),
    prisma.teamMember.create({
      data: {
        teamId: teams[1].id,
        participantId: participants[2].id,
        isCaptain: false
      }
    }),
    prisma.teamMember.create({
      data: {
        teamId: teams[1].id,
        participantId: participants[3].id,
        isCaptain: false
      }
    })
  ]);

  console.log('✅ Created team members:', teamMembers.length);

  // Create event registrations
  const registrations = await Promise.all([
    // Individual registrations for Programming Contest
    prisma.eventRegistration.create({
      data: {
        eventId: events[0].id,
        participantId: participants[0].id,
        registrationType: 'individual',
        status: 'registered'
      }
    }),
    prisma.eventRegistration.create({
      data: {
        eventId: events[0].id,
        participantId: participants[1].id,
        registrationType: 'individual',
        status: 'registered'
      }
    }),
    // Team registrations for Robotics Challenge
    prisma.eventRegistration.create({
      data: {
        eventId: events[1].id,
        teamId: teams[3].id,
        registrationType: 'team',
        status: 'registered'
      }
    }),
    prisma.eventRegistration.create({
      data: {
        eventId: events[1].id,
        teamId: teams[4].id,
        registrationType: 'team',
        status: 'registered'
      }
    })
  ]);

  console.log('✅ Created event registrations:', registrations.length);

  // Create gallery items
  const galleryItems = await Promise.all([
    prisma.gallery.create({
      data: {
        title: 'Programming Contest Winners 2024',
        description: 'Winners of the programming contest from last year',
        imageUrl: 'https://via.placeholder.com/600x400/110921/ffffff?text=Programming+Contest+2024',
        year: 2024,
        eventId: events[0].id,
        views: 1250,
        likes: 89,
        status: 'active'
      }
    }),
    prisma.gallery.create({
      data: {
        title: 'Robotics Challenge 2024',
        description: 'Exciting moments from the robotics challenge',
        imageUrl: 'https://via.placeholder.com/600x400/a71c20/ffffff?text=Robotics+Challenge+2024',
        year: 2024,
        eventId: events[1].id,
        views: 950,
        likes: 67,
        status: 'active'
      }
    }),
    prisma.gallery.create({
      data: {
        title: 'Innovation Pitch 2024',
        description: 'Students presenting innovative solutions',
        imageUrl: 'https://via.placeholder.com/600x400/ffffff/110921?text=Innovation+Pitch+2024',
        year: 2024,
        eventId: events[2].id,
        views: 1100,
        likes: 78,
        status: 'active'
      }
    })
  ]);

  console.log('✅ Created gallery items:', galleryItems.length);

  // Create event history
  const eventHistory = await Promise.all([
    prisma.eventHistory.create({
      data: {
        year: 2024,
        eventTitle: 'Programming Contest',
        description: 'Annual programming competition for engineering students',
        highlights: 'Record participation with 150+ students',
        winnerName: 'CodeCrafters',
        winnerBatch: 'E21',
        totalParticipants: 150,
        totalTeams: 0
      }
    }),
    prisma.eventHistory.create({
      data: {
        year: 2024,
        eventTitle: 'Robotics Challenge',
        description: 'Engineering challenge to build functional robots',
        highlights: 'Innovative robot designs and creative solutions',
        winnerName: 'TechTitans',
        winnerBatch: 'E22',
        totalParticipants: 0,
        totalTeams: 25
      }
    })
  ]);

  console.log('✅ Created event history:', eventHistory.length);

  // Create admin user with proper password hash
  const bcrypt = require('bcryptjs');
  const adminPassword = 'admin123';
  const hashedPassword = await bcrypt.hash(adminPassword, 12);
  
  const adminUser = await prisma.adminUser.create({
    data: {
      username: 'admin',
      email: 'admin@eweek.com',
      passwordHash: hashedPassword,
      role: 'admin',
      isActive: true
    }
  });

  console.log('✅ Created admin user:', adminUser.username);

  console.log('🎉 Database seeding completed successfully!');
}

main()
  .catch((e) => {
    console.error('❌ Error during seeding:', e);
    process.exit(1);
  })
  .finally(async () => {
    await prisma.$disconnect();
  }); 