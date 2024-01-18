import { Injectable } from '@nestjs/common';
import { orthographyCheckUseCase } from './ use-cases';
import OpenAI from 'openai';
import { OrthographyDto } from './dtos';

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
}
