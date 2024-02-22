import { Injectable } from '@nestjs/common';
import {
  orthographyCheckUseCase,
  prosConsDicusserUseCase,
  prosConsDicusserStreamUseCase,
} from './ use-cases';
import OpenAI from 'openai';
import { OrthographyDto, ProsConsDiscusserDto } from './dtos';

@Injectable()
export class GptService {
  private openAi = new OpenAI({
    apiKey: process.env.OPEN_API_KEY,
  });

  async orthographyCheck(orthographyDto: OrthographyDto) {
    return await orthographyCheckUseCase(this.openAi, {
      prompt: orthographyDto.prompt,
    });
  }

  async prosConsDiscusser(prosConsDiscusser: ProsConsDiscusserDto) {
    return await prosConsDicusserUseCase(this.openAi, {
      prompt: prosConsDiscusser.prompt,
    });
  }

  async prosConsDiscusserStream(prosConsDiscusser: ProsConsDiscusserDto) {
    return await prosConsDicusserStreamUseCase(this.openAi, {
      prompt: prosConsDiscusser.prompt,
    });
  }
}
