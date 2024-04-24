import {applyDecorators, UseGuards} from '@nestjs/common';
import {AuthGuard} from "../guard/auth.guard";

export function Auth() {
    return applyDecorators(
        //     SetMetadata('someKey', [1,2,3]),
        UseGuards(AuthGuard),
        //ApiBearerAuth(),
        //ApiUnauthorizedResponse({ description: 'Unauthorized' }),
    );
    //  читать можно потом так прям в гварде в canActivate const roles = this.reflector.get('roles', context.getHandler());
}
