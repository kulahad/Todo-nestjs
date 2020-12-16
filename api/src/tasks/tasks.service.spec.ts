import { getModelToken } from '@nestjs/mongoose';
import { Test, TestingModule } from '@nestjs/testing';
import { TasksService } from './tasks.service';

const Task = {
  id: 'some-id',
  title: 'Testing',
  description: 'some-desc',
  isComplete: true,
};

describe('TasksService', () => {
  let service: TasksService;
  const TaskModel = {
    create: jest.fn().mockResolvedValue(Task),
    find: jest.fn().mockResolvedValue([Task]),
    findOne: jest.fn().mockResolvedValue(Task),
    findByIdAndUpdate: jest.fn().mockResolvedValue(Task),
    findById: jest.fn().mockResolvedValue(Task),
    findByIdAndDelete: jest.fn().mockResolvedValue(true),
  };

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      providers: [
        TasksService,
        {
          provide: getModelToken('Task'),
          useValue: TaskModel,
        },
      ],
    }).compile();

    service = module.get<TasksService>(TasksService);
  });
  describe('Task-Service', () => {
    it('should be defined', () => {
      expect(service).toBeDefined();
    });
    it('should a new task', () => {
      expect(service.create(Task))
        .resolves.toEqual(Task)
        .catch((err) => {
          console.log(err);
        });
    });
    it('should return list of tasks', () => {
      expect(service.findAll())
        .resolves.toEqual([Task])
        .catch((err) => {
          console.log(err);
        });
    });
    it('should return one task with id', () => {
      expect(service.findOne('some-id'))
        .resolves.toEqual(Task)
        .catch((err) => {
          console.log(err);
        });
    });
    it('should find and update specified task', () => {
      expect(service.updateTask(Task))
        .resolves.toEqual(Task)
        .catch((err) => {
          console.log(err);
        });
    });
    it('should find and delete specified task', () => {
      expect(service.deleteTask('some-id'))
        .resolves.toEqual(true)
        .catch((err) => {
          console.log(err);
        });
    });

  });
});
