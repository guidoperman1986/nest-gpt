import { Body, Controller, HttpStatus, Post, Res } from '@nestjs/common';
import { GptService } from './gpt.service';
import { OrthographyDto, ProsConsDiscusserDto } from './dtos';
import { Response } from 'express';

@Controller('gpt')
export class GptController {
  constructor(private readonly gptService: GptService) {}
  @Post('orthography-check')
  orthographyCheck(@Body() body: OrthographyDto) {
    return this.gptService.orthographyCheck(body);
  }

  @Post('pros-cons-discusser')
  prosConsDicusser(@Body() body: ProsConsDiscusserDto) {
    return this.gptService.prosConsDiscusser(body);
  }

  @Post('pros-cons-discusser-stream')
  async prosConsDicusserStream(
    @Body() body: ProsConsDiscusserDto,
    @Res() res: Response,
  ) {
    const stream = await this.gptService.prosConsDiscusserStream(body);

    res.setHeader('Content-Type', 'application/json');
    res.status(HttpStatus.OK);

    for await (const chunk of stream) {
      const piece = chunk.choices[0].delta.content || '';
      console.log(piece);
      res.write(piece);
    }

    res.end();
  }
}
