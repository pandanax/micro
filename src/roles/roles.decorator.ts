import { Reflector } from '@nestjs/core';
import {Role} from './roles.types';
export const Roles = Reflector.createDecorator<Role[]>();
