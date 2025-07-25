import { Collection } from '@prisma/client'
import { CollectionRepository } from '../../repositories/CollectionRepositories/collectionRepositories'
import { v4 } from 'uuid'
import { IEditCollection } from '../../modules/colletions/useCases/editCollectionName/EditCollectionUseCase'
import { AppError } from '../../infra/errors/AppError'

export type RequestCreateColletion = {
  userId: string
  name: string
  emoji: string
}

export class InMemoryCollectionRepository implements CollectionRepository {
  listTodoOfColletion: (name: string, complete: string) => Promise<any>
  colletions: Collection[] = []

 async createCollection(data: RequestCreateColletion) {
   const collection: Collection = {
     ...data,
     id: v4(),
     createdAt: new Date(),
     updatedAt: new Date(),
   }

   this.colletions.push(collection)

   return collection
 }

  async deleteColletion(id: string) {
    this.colletions.filter(colletion => colletion.id !== id)
  }

  async editCollection({ id, emoji, name }: IEditCollection) {
    const collection = await this.findCollectionById(id)

    if (!collection) {
      throw new AppError('Collection not found')
    }

    collection.emoji = emoji ?? collection.emoji
    collection.name = name ?? collection.name

    return collection
  }

  async findCollectionByName(name: string) {
    const colletion = this.colletions.find(colletion => colletion.name === name)
    return colletion ?? null
  }
  async findCollectionById(id: string) {
    const colletion = this.colletions.find(colletion => colletion.id === id)
    return colletion ?? null
  }
}
