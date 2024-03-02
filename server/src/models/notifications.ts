import { Prisma, PrismaClient } from '@prisma/client'
const prisma = new PrismaClient()

const model = {
    getAll: async (pubId:number) => {
        let result = await prisma.notifications.findMany({
            where: {
                publicationId: pubId
            },
            include: {
                user: true,
                publication: true
            },
            orderBy: {
                id: "desc"
            }
        })
        return result
    },
}

export default model