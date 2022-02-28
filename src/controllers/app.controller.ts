import { Controller, Get } from "@nestjs/common";


@Controller('/health')
export class AppController {
    @Get('/')
    async healthCheck() {
        return {
            status: 'OK',
            message: 'Health check is OK',
        };
    }
}