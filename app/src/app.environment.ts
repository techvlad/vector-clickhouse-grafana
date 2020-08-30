import { Env, getEnvironment } from '@nestjs-steroids/environment';
import { Transform } from 'class-transformer';
import { IsPositive, IsEnum } from 'class-validator';
import { NodeEnv } from './shared/enums';

export class AppEnvironment {
  @Env()
  @Transform(Number)
  @IsPositive()
  port: number;

  @Env('NODE_ENV')
  @IsEnum(NodeEnv)
  nodeEnv: NodeEnv = NodeEnv.Development;
}

const appEnvironment = getEnvironment(AppEnvironment, { loadEnvFile: true });

export { appEnvironment };
