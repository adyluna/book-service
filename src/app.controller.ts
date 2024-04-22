import { Controller, Get } from '@nestjs/common';
import { HealthCheck, HealthCheckService, HttpHealthIndicator } from '@nestjs/terminus';

@Controller()
export class AppController {
  constructor(
    private health: HealthCheckService,
    private http: HttpHealthIndicator,
  ) {}

  @Get('healthcheck')
  @HealthCheck()
  healthCheck() {
    return this.health.check([
      async () => this.http.pingCheck('health check', 'http://localhost:3000'),
    ]);
  }
}