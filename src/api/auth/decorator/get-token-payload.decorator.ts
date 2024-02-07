import { ExecutionContext, createParamDecorator } from '@nestjs/common';

export const GetTokenPayload = createParamDecorator(
  (data: string | undefined, ctx: ExecutionContext): { name: string } => {
    const request = ctx.switchToHttp().getRequest();

    if (data) {
      return request.user[data];
    }

    return request.user;
  },
);
