import { Server, IServer } from '@/lib/db/models';

export class ServerService {
  async create(data: Partial<IServer>): Promise<IServer> {
    const server = new Server(data);
    return await server.save() as IServer;
  }

  async findAll(filter: any = {}, sort: any = { bumpAt: -1 }, limit: number = 20, skip: number = 0): Promise<IServer[]> {
    return await Server.find(filter)
      .sort(sort)
      .skip(skip)
      .limit(limit)
      .populate('ownerId', 'username avatar') as unknown as IServer[];
  }

  async findById(id: string): Promise<IServer | null> {
    return await Server.findById(id).populate('ownerId', 'username avatar') as IServer | null;
  }

  async findByOwner(ownerId: string): Promise<IServer[]> {
    return await Server.find({ ownerId }) as IServer[];
  }

  async update(id: string, data: Partial<IServer>): Promise<IServer | null> {
    return await Server.findByIdAndUpdate(id, data, { new: true }) as IServer | null;
  }

  async delete(id: string): Promise<IServer | null> {
    return await Server.findByIdAndDelete(id) as IServer | null;
  }

  async bump(id: string): Promise<IServer | null> {
    return await Server.findByIdAndUpdate(id, { bumpAt: new Date() }, { new: true });
  }

  async getTrending(limit: number = 6): Promise<IServer[]> {
    return await Server.find({ status: 'approved' })
      .sort({ memberCount: -1, onlineCount: -1 })
      .limit(limit)
      .populate('ownerId', 'username avatar');
  }

  async getRecent(limit: number = 6): Promise<IServer[]> {
    return await Server.find({ status: 'approved' })
      .sort({ bumpAt: -1 })
      .limit(limit)
      .populate('ownerId', 'username avatar');
  }
}

export const serverService = new ServerService();
