import { Reflector } from '@nestjs/core';

export enum Role {
    'admin'= 'admin',
    'user' = 'user'
}
export const Roles = Reflector.createDecorator<Role[]>();
