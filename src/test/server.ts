import { setupServer } from 'msw/node';
import { rest } from 'msw';
import { detailedMockData, mockData } from './mock_data';

global.fetch = fetch;
global.Headers = Headers;
global.Request = Request;
global.Response = Response;

const server = setupServer(
  rest.get('https://api.jikan.moe/v4/manga', (req, res, ctx) => {
    return res(ctx.status(200), ctx.json(mockData));
  }),
  rest.get('https://api.jikan.moe/v4/manga/:id', (req, res, ctx) => {
    return res(ctx.status(200), ctx.json(detailedMockData));
  })
);

export { server };
