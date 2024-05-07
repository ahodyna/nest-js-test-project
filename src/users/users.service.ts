import { Injectable } from '@nestjs/common';

@Injectable()
export class UsersService {
  private users = [
    {
      id: 1,
      name: 'Test',
      email: 'test@email.com',
      role: 'ADMIN',
    },
    {
      id: 2,
      name: 'Test-2',
      email: 'test2@email.com',
      role: 'INTERN',
    },
    {
      id: 3,
      name: 'Test-3',
      email: 'test3@email.com',
      role: 'INTERN',
    },
  ];

  findAll(role?: 'INTERN' | 'ADMIN') {
    if (role) {
      return this.users.filter((user) => user.role === role);
    }
    return this.users;
  }

  findOne(id: number){
    const user = this.users.find((user)=> user.id === id)

    return user;
  }

  create(user: {name: string, email: string, role: 'INTERN' | 'ADMIN'}){
    const usersById = [...this.users].sort((a,b)=> b.id - a.id)
    const newUser = {
      id: usersById[0].id +1,
      ...user
    }
    this.users.push(newUser)

    return newUser;
  }

  update(id: number, updatedUser: { name?: string, email?: string, role?: 'INTERN' | 'ADMIN'}){
    this.users = this.users.map((user) => {
      if(user.id === id){
        return {...user, ...updatedUser}
      }

      return user
    })

    return this.findOne(id)
  }

  delete(id: number){
    const removedUser = this.findOne(id);

    this.users = this.users.filter((user) => user.id !== id)

    return removedUser;
  }
}
