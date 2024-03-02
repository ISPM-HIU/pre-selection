import { Prisma, PrismaClient } from '@prisma/client'
const prisma = new PrismaClient()

const model = {
    getAll: async () => {
        let result = await prisma.publications.findMany({
            include: {
                user: true,
                Likes: true,
                Comments:  {
                    include: {
                        user: true
                    },
                    orderBy: {
                        id: "desc"
                    }
                }
            },
            orderBy: {
                id: "desc"
            }
        })
        return result
    },
    getOne: async (id : number) => {
        let result = await prisma.publications.findUnique({
            where: { id: Number(id) },
            include: {
                user: true,
                Likes: true,
                Comments:  {
                    include: {
                        user: true
                    },
                    orderBy: {
                        id: "desc"
                    }
                },
            }
        })
        
        return result 
    },
    getForUser:  async (userId : number) => {
        let result = await prisma.publications.findMany({
            where: { userId: Number(userId) },
            include: {
                user: true,
                Likes: true,
                Comments: true
            },
            orderBy: {
                id: "desc"
            }
        })
        
        return result 
    },
    action: async (publicationId:number, userId:number, actionType:string) => {

        let result = await prisma.notifications.create({
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
                },
                type: actionType
            }
        })

        return result
    },
    create: async (
        description:string,
        products:string,
        image:any,
        type:string,
        userId:number,
        product_name:string,
        link: string,
        price: number
    ) => {

        const result = await prisma.publications.create({
            data: {
                description,
                products,
                image,
                product_name,
                type,
                user: {
                    connect: {
                        id: userId
                    }
                },
                link,
                price
              },
        })

        return result
    },
    delete: async (id : number) => {

        let result = await prisma.users.delete({
            where: { id: Number(id) },
        })

        return result
    },
}

export default model