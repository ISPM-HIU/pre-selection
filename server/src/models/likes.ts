import { Prisma, PrismaClient } from '@prisma/client'
const prisma = new PrismaClient()

const model = {
    sendLike: async (publicationId:number, userId:number) => {
        let result = await prisma.likes.create({
            data: {
                publication: {
                    connect: {
                        id: publicationId
                    }
                },
                user: {
                    connect: {
                        id: userId
                    }
                }
            }
        })
        return result
    },
}

export default model