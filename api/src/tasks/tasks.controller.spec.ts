import { getModelToken } from '@nestjs/mongoose';
import { Test, TestingModule } from '@nestjs/testing';
import { TasksController } from './tasks.controller';
import { TasksService } from './tasks.service';

const Task = {
  id: 'some-id',
  title: 'Testing',
  description: 'some-desc',
  isComplete: true,
};
describe('TasksController', () => {
  let controller: TasksController;
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
        TasksController,
        TasksService,
        {
          provide: getModelToken('Task'),
          useValue: TaskModel,
        },
      ],
    }).compile();

    controller = module.get<TasksController>(TasksController);
  });

  it('should be defined', () => {
    expect(controller).toBeDefined();
  });
});
