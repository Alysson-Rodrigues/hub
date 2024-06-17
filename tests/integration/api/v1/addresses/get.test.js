// test if the GET /api/v1/messages route returns messages properly
describe('GET /api/v1/messages', () => {
  it('should return 200 OK with messages', async () => {
    const response = await fetch('http://localhost:3000/api/v1/messages');
    const messages = await response.json();
    expect(response.status).toBe(200);
  });
});
