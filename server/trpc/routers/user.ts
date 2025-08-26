import { router, publicProcedure } from '../trpc';
import { z } from 'zod';
import { UserController } from '../controllers/user';

const userController = new UserController();

export const userRouter = router({
  login: publicProcedure
    .input(z.object({
      schoolId: z.string(),
      password: z.string(),
    }))
    .mutation(async ({ input }) => {
      return await userController.login(input.schoolId, input.password);
    }),

  register: publicProcedure
    .input(z.object({
      schoolId: z.string(),
      username: z.string(),
      password: z.string(),
      role: z.enum(['admin', 'student', 'teacher']).optional(),
    }))
    .mutation(async ({ input }) => {
      return await userController.register(input);
    }),

  modifyPassword: publicProcedure
    .input(z.object({
      userId: z.string(),
      oldPassword: z.string(),
      newPassword: z.string(),
    }))
    .mutation(async ({ input }) => {
      return await userController.modifyPassword(input.userId, input.oldPassword, input.newPassword);
    }),
});