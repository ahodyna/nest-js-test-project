import { Injectable, NotFoundException } from '@nestjs/common';
import { CreateUserDto } from "./dto/create-user.dto";
import { UpdateUserDto } from './dto/update-user.dto';

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
      const roles = this.users.filter((user) => user.role === role);

      if(!roles.length) throw new NotFoundException('User role not found');

      return roles;
    }
    return this.users;
  }

  findOne(id: number){
    const user = this.users.find((user)=> user.id === id)

    if(!user) throw new NotFoundException('User not found')

    return user;
  }

  create(createUserDto: CreateUserDto){
    const usersById = [...this.users].sort((a,b)=> b.id - a.id)
    const newUser = {
      id: usersById[0].id +1,
      ...createUserDto
    }
    this.users.push(newUser)

    return newUser;
  }

  update(id: number, updateUserDto: UpdateUserDto){
    this.users = this.users.map((user) => {
      if(user.id === id){
        return {...user, ...updateUserDto}
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
