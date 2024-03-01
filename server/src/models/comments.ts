import { Prisma, PrismaClient } from '@prisma/client'
const prisma = new PrismaClient()

const model = {
    sendComment: async (publicationId:number, userId:number, text:string) => {
        let result = await prisma.comments.create({
            data: {
                text,
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