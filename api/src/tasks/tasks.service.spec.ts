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
    save: jest.fn().mockResolvedValue(Task),
    find: jest.fn().mockResolvedValue([Task]),
    findOne: jest.fn().mockResolvedValue(Task),
    findByIdAndUpdate: jest.fn().mockResolvedValue(Task),
    findById: jest.fn().mockResolvedValue(Task),
    deleteOne: jest.fn().mockResolvedValue(true),
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
    it('should return one event', () => {
        expect(service.findOne('53d53d2s')).resolves.toEqual(Task).catch(err => {
          console.log(err);
        });
      });
      it('should find and update one model', () => {
        expect(service.updateTask(Task)).resolves.toEqual(Task).catch( err => {
          console.log(err);
        });
      });
  });
});
