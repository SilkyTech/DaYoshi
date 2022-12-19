import prisma, { PrismaClient } from '@prisma/client'

export const db: PrismaClient = new prisma.PrismaClient()