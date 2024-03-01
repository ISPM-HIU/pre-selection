import { Prisma, PrismaClient } from '@prisma/client'
const prisma = new PrismaClient()

const model = {
    getAll: async (pubId:number) => {
        let result = await prisma.notifications.findMany({
            where: {
                id: pubId
            },
            orderBy: {
                id: "desc"
            }
        })
        return result
    },
}

export default model