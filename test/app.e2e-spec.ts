import { Test, TestingModule } from '@nestjs/testing';
import { ApplicationModule } from '../src/application/application.module';

describe('AppController (e2e)', () => {
  let app;

  beforeEach(async () => {
    const moduleFixture: TestingModule = await Test.createTestingModule({
      imports: [ApplicationModule],
    }).compile();

    app = moduleFixture.createNestApplication();
    await app.init();
  });
});
