import { Injectable, NestMiddleware } from '@nestjs/common';
import PQueue from 'p-queue';
import { MAX_TENANT_DATA_SOURCES } from './orm.config';
import { NextFunction, Request, Response } from 'express';

@Injectable()
export class LimitMiddleware implements NestMiddleware {
  private readonly queue = new PQueue({
    concurrency: MAX_TENANT_DATA_SOURCES,
  });

  public async use(
    _: Request,
    res: Response,
    next: NextFunction,
  ): Promise<void> {
    await this.queue.add(
      () =>
        new Promise<void>((resolve) => {
          res.addListener('finish', () => resolve());
          next();
        }),
    );
    // .catch((error) => {
    //   console.error('Request processing error:', error);
    //   res.status(500).send('Server is busy. Please try again later.');
    // });
  }
}
