import { detailedMockData, mockData } from '../test/mock_data';
import { fetchCard, fetchCards } from './api';
import { API_URL } from './consts';

describe('fetchCards', () => {
  it('fetch cards', async () => {
    const mResponce = {
      ok: true,
      json: vi.fn().mockResolvedValue(mockData),
    };
    global.fetch = vi.fn().mockResolvedValue(mResponce as unknown as Response);

    const result = await fetchCards(1, 'atack', 10);
    expect(result).toEqual(mockData);
  });

  it('fetch cards with error', async () => {
    global.fetch = vi.fn().mockRejectedValue(new Error('Error'));
    await expect(fetchCards(1, 'atack', 10)).rejects.toThrowError('Error');
    expect(global.fetch).toHaveBeenCalledWith(
      `${API_URL}?page=1&limit=10&q=atack`
    );
  });

  it('fetch card', async () => {
    const mResponce = {
      ok: true,
      json: vi.fn().mockResolvedValue(detailedMockData),
    };
    global.fetch = vi.fn().mockResolvedValue(mResponce as unknown as Response);

    const result = await fetchCard(1);
    expect(result).toEqual(detailedMockData);
  });

  it('fetch card with error', async () => {
    global.fetch = vi.fn().mockRejectedValue(new Error('Error'));
    await expect(fetchCard(1)).rejects.toThrowError('Error');
    expect(global.fetch).toHaveBeenCalledWith(`${API_URL}/1`);
  });
});
