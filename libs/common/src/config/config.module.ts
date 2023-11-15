import { Module } from '@nestjs/common';
import * as Joi from 'joi';
import * as yaml from 'js-yaml';
import {
  ConfigService,
  ConfigModule as NestConfigModule,
} from '@nestjs/config';
import { currentEnvironmentConfigFile } from './current-env';

const validationSchema = Joi.object({
  server: Joi.object({
    port: Joi.number().min(1).max(65535).required(),
    origin: Joi.string().required(),
  }),
  db: Joi.object({
    mongo_uri: Joi.string().required(),
  }),
});

@Module({
  imports: [
    NestConfigModule.forRoot({
      load: [
        () => {
          const yamlConfig = currentEnvironmentConfigFile();
          return yaml.load(yamlConfig);
        },
      ],
      validationSchema,
    }),
  ],
  providers: [ConfigService],
  exports: [ConfigService],
})
export class ConfigModule {}
