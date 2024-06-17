const { describe } = require('node:test');

describe('POST /api/v1/messages', () => {
  it('should return 409 because there is no agent_id', async () => {
    const response = await fetch('http://localhost:3000/api/v1/messages', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({
        title: 'Jest Test',
        type: 2,
        description: 'Jest Test',
      }),
    });
    expect(response.status).toBe(409);
  });
});

describe('POST /api/v1/messages', () => {
  it('should return 409 because the token is not a valid uuid', async () => {
    const response = await fetch('http://localhost:3000/api/v1/messages', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({
        agent_id: 1,
        type: 2,
        description: 'Jest Test',
      }),
    });
    expect(response.status).toBe(409);
  });
});

describe('POST /api/v1/tracker', () => {
  it('should return 200 to get a new tracker', async () => {
    const response = await fetch('http://localhost:3000/api/v1/tracker', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({
        user_agent: 'Jest Test',
      }),
    });
    expect(response.status).toBe(200);
    data = await response.json();
    expect(data.identifier).toMatch(
      /^[0-9a-fA-F]{8}-[0-9a-fA-F]{4}-[0-9a-fA-F]{4}-[0-9a-fA-F]{4}-[0-9a-fA-F]{12}$/
    );
  });
});

describe('POST /api/v1/messages', () => {
  it('should return 200 to send a new properly formatted message', async () => {
    const response = await fetch('http://localhost:3000/api/v1/tracker', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({
        user_agent: 'Jest Test',
      }),
    });
    expect(response.status).toBe(200);
    data = await response.json();
    expect(data.identifier).toMatch(
      /^[0-9a-fA-F]{8}-[0-9a-fA-F]{4}-[0-9a-fA-F]{4}-[0-9a-fA-F]{4}-[0-9a-fA-F]{12}$/
    );
    const messageResponse = await fetch(
      'http://localhost:3000/api/v1/messages',
      {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({
          agent_id: data.identifier,
          type: 1,
          description: 'Jest Test',
        }),
      }
    );
    expect(messageResponse.status).toBe(201);
    data = await messageResponse.json();
    expect(Number(data.type)).toBe(1);
    expect(data.description).toBe('Jest Test');
  });
});

describe('POST /api/v1/messages', () => {
  it('should return 409 by sending no title in a registry that is not an message', async () => {
    const response = await fetch('http://localhost:3000/api/v1/tracker', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({
        user_agent: 'Jest Test',
      }),
    });
    data = await response.json();
    const messageResponse = await fetch(
      'http://localhost:3000/api/v1/messages',
      {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({
          agent_id: data.identifier,
          type: 2,
          description: 'Jest Test',
        }),
      }
    );
    expect(messageResponse.status).toBe(400);
  });
});

describe('POST /api/v1/messages', () => {
  it('should return 409 by sending an empty message', async () => {
    const response = await fetch('http://localhost:3000/api/v1/tracker', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({
        user_agent: 'Jest Test',
      }),
    });
    data = await response.json();
    const messageResponse = await fetch(
      'http://localhost:3000/api/v1/messages',
      {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({
          agent_id: data.identifier,
          type: 2,
          description: '',
        }),
      }
    );
    expect(messageResponse.status).toBe(400);
  });
});

describe('POST /api/v1/messages', () => {
  it('should return 400 by sending an description that is longer than 255 characters', async () => {
    const response = await fetch('http://localhost:3000/api/v1/tracker', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({
        user_agent: 'Jest Test',
      }),
    });
    data = await response.json();
    const messageResponse = await fetch(
      'http://localhost:3000/api/v1/messages',
      {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({
          agent_id: data.identifier,
          type: 2,
          description:
            '0000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000',
        }),
      }
    );
    expect(messageResponse.status).toBe(400);
  });
});

describe('POST /api/v1/messages', () => {
  it('should return 400 by sending an title that is longer than 100 characters', async () => {
    const response = await fetch('http://localhost:3000/api/v1/tracker', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({
        user_agent: 'Jest Test',
      }),
    });
    data = await response.json();
    const messageResponse = await fetch(
      'http://localhost:3000/api/v1/messages',
      {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({
          agent_id: data.identifier,
          type: 2,
          title:
            '0000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000X',
          description: 'Jest Test',
        }),
      }
    );
    expect(messageResponse.status).toBe(400);
  });
});
