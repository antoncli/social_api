import { Socket } from 'socket.io';

export default class Sockets {
  private sockets: Map<string, Socket> = new Map();
  private users: Map<string, string> = new Map();

  set = (user: string, client: Socket) => {
    this.sockets.set(user, client);
    this.users.set(client.id, user);
  };

  get = this.sockets.get.bind(this.sockets);

  delete = this.sockets.delete.bind(this.sockets);

  deleteBySocketId = (clientId: string) => {
    const user = this.users.get(clientId);
    if (user) this.sockets.delete(user);
  };
}
