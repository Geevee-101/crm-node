import { prisma } from '../src/lib/prisma.js'

async function main() {
  // seed users
  const shinji = await prisma.user.upsert({
    where: { email: 'shinji@nerv.com' },
    update: {},
    create: {
      name: 'Shinji',
      email: 'shinji@nerv.com',
      password: '123456',
      createdAt: new Date(),
    },
  })
  const rei = await prisma.user.upsert({
    where: { email: 'rei@nerv.com' },
    update: {},
    create: {
      name: 'Rei',
      email: 'rei@nerv.com',
      password: '123456',
      createdAt: new Date(),
    },
  })
  const asuka = await prisma.user.upsert({
    where: { email: 'asuka@nerv.com' },
    update: {},
    create: {
      name: 'Asuka',
      email: 'asuka@nerv.com',
      password: '123456',
      createdAt: new Date(),
    },
  })
  console.log("Seeded users:", { shinji, rei, asuka })

  // seed a client
  const motoko = await prisma.client.upsert({
    where: { email: 'motoko@section9.com' },
    update: {},
    create: {
      name: 'Motoko',
      avatar: '',
      status: 'active',
      email: 'motoko@section9.com',
      organization: 'Section 9',
      assignedToId: 1,
      createdAt: new Date(),
    },
  })
  console.log("Seeded client:", motoko)
  
}
main()
  .then(async () => {
    await prisma.$disconnect()
  })
  .catch(async (e) => {
    console.error(e)
    await prisma.$disconnect()
    process.exit(1)
  })