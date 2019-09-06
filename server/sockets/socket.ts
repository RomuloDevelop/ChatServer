import Users from '../models/Users';
import Person from '../models/Person';
import createMessage from '../utils';

const users = new Users();

const connectSocket = (io: SocketIO.Server) => {
  io.on('connection', (client: SocketIO.Socket) => {
    client.on('enterChat', (user, cb) => {
      if (!user.name || !user.room) {
        return cb({
          err: true,
          message: 'The name/room is mandatory',
        });
      }
      client.join(user.room);
      const person = new Person(client.id, user.name, user.room);
      users.addPersons(person);
      const personsByRoom = users.getPersonsByRoom(user.room);
      client.broadcast.to(user.room).emit('personList', personsByRoom);
      cb(personsByRoom);
    });

    client.on('disconnect', () => {
      const person = users.deletePerson(client.id);
      if (!person) return;
      const { name, room } = person;
      client.broadcast
        .to(room)
        .emit(
          'createMessage',
          createMessage('Administrator', `${name} leave the chat`)
        );
      client.broadcast
        .to(room)
        .emit('personList', users.getPersonsByRoom(room));
    });

    client.on('createMessage', (data, cb) => {
      const person = users.getPerson(client.id);
      const message = createMessage(person.name, data.message);
      client.broadcast.to(person.room).emit('createMessage', message);
      cb(message);
    });

    client.on('privateMessage', data => {
      const user = users.getPerson(client.id);
      client.broadcast
        .to(data.to)
        .emit('privateMessage', createMessage(user.name, data.message));
    });
  });
};

export default connectSocket;
