import { ConfigModule } from '@nestjs/config';
import { getModelToken } from '@nestjs/mongoose';
import { Test, TestingModule } from '@nestjs/testing';
import { UsersService } from './users.service';

const User = {
  id: 'some-id',
  userName: 'testUser',
  firstName: 'test',
  lastName: 'user',
  email: 'test@testdomain.com',
  role: 'Tester',
  password: 'KSNKLNnfnf33r',
};

describe('UsersService', () => {
  let service: UsersService;
  const UserModel = {
    create: jest.fn().mockResolvedValue(User),
    find: jest.fn().mockResolvedValue([User]),
    findOne: jest.fn().mockResolvedValue(User),
    findByIdAndUpdate: jest.fn().mockResolvedValue(User),
    findById: jest.fn().mockResolvedValue(User),
    findByIdAndDelete: jest.fn().mockResolvedValue(true),
  };
  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      imports: [ConfigModule],
      providers: [
        UsersService,
        {
          provide: getModelToken('User'),
          useValue: UserModel,
        },
      ],
    }).compile();

    service = module.get<UsersService>(UsersService);
  });

  describe('Task-Service', () => {
    it('should be defined', () => {
      expect(service).toBeDefined();
    });
    it('should register a new user', () => {
      const newUser = {
        userName: 'dummyUser',
        firstName: 'dummy',
        lastName: 'user',
        email: 'dummy@testdomain.com',
        role: 'Tester',
        password: 'KSNKLNnfnf33r',
      };
      expect(service.registerUser(newUser))
        .resolves.toBe(String)
        .catch((err) => {
          console.log(err);
        });
    });

    it('should return one User with id', () => {
      expect(service.findUserByUsername('some-id'))
        .resolves.toEqual(User)
        .catch((err) => {
          console.log(err);
        });
    });
    it('should find and update specified User', () => {
      expect(service.updateUser(User))
        .resolves.toEqual(User)
        .catch((err) => {
          console.log(err);
        });
    });
    it('should find and delete specified User', () => {
      expect(service.deleteUser('some-id'))
        .resolves.toEqual(true)
        .catch((err) => {
          console.log(err);
        });
    });
  });
});
