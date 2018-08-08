import { PostFeedModule } from './post-feed.module';

describe('PostFeedModule', () => {
  let postFeedModule: PostFeedModule;

  beforeEach(() => {
    postFeedModule = new PostFeedModule();
  });

  it('should create an instance', () => {
    expect(postFeedModule).toBeTruthy();
  });
});
