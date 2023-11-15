import { Injectable } from '@nestjs/common';
import { ConfigService } from '@nestjs/config';

@Injectable()
export class AppService {
  constructor(private readonly configService: ConfigService) {}
  getHello(): string {
    console.log(this.configService.get('db.mongo_uri'));
    const port = this.configService.get<number>('server.port', 3000);
    const origin = this.configService.get<string>(
      'db.mongo_uri',
      'http://localhost:3000',
    );
    return `Hello World! Server is running on port ${port}, origin is ${origin}`;
  }
}
