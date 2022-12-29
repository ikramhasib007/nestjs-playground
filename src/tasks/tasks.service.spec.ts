import { Test } from '@nestjs/testing';
import { TaskStatus } from './task-status.enum';
import { TasksService } from './tasks.service';

const mockTasksService = () => ({});

const mockUser = {
  id: 'someId',
  username: 'username',
  password: '1234',
  tasks: [],
};

const queryParams = {
  search: '',
  status: TaskStatus.DONE,
};

describe('TasksService', () => {
  let tasksService: TasksService;

  beforeEach(async () => {
    const module = await Test.createTestingModule({
      providers: [
        {
          provide: TasksService,
          useFactory: mockTasksService,
        },
      ],
    }).compile();
    tasksService = module.get<TasksService>(TasksService);
  });

  describe('getTasks()', () => {
    it('calls getTasks and get results', async () => {
      expect(tasksService.getTasks).not.toHaveBeenCalled();
      const result = tasksService.getTasks(queryParams, mockUser);
      expect(tasksService.getTasks).toHaveBeenCalled();
      expect(result).toEqual('...something');
    });
  });
});
