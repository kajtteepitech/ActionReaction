const {sendTime} = require('../routes/api/Timer');

describe('sendTime function', () => {
    const session = { id: 'a9797331-b6db-44a3-8502-d9fda38227c0', input_hour: '12:00', email: 'test@example.com', timezone: 'UTC' };
    const res = { sendStatus: jest.fn() };

    it('should update timer if data exists', async () => {
        const mockSelect = jest.fn().mockReturnValueOnce({ data: [{ id: 1 }], error: null });
        const mockUpdate = jest.fn().mockReturnValueOnce(Promise.resolve());
        const mockFrom = jest.fn()
            .mockReturnValueOnce({ select: mockSelect })
            .mockReturnValueOnce({ update: mockUpdate });

        await sendTime(session, res);

        expect(mockFrom).toHaveBeenCalledWith('timer');
        expect(mockSelect).toHaveBeenCalledWith();
        expect(mockUpdate).toHaveBeenCalledWith({ hour: '12:00', email: 'test@example.com', timezone: 'UTC' });
        expect(res.sendStatus).toHaveBeenCalledWith(200);
    });

    it('should insert timer if no data exists', async () => {
        const mockSelect = jest.fn().mockReturnValueOnce({ data: [], error: null });
        const mockInsert = jest.fn().mockReturnValueOnce(Promise.resolve());
        const mockFrom = jest.fn()
            .mockReturnValueOnce({ select: mockSelect })
            .mockReturnValueOnce({ insert: mockInsert });

        await sendTime(session, res);

        expect(mockFrom).toHaveBeenCalledWith('timer');
        expect(mockSelect).toHaveBeenCalledWith();
        expect(mockInsert).toHaveBeenCalledWith({ id: 1, hour: '12:00', email: 'test@example.com', timezone: 'UTC' });
        expect(res.sendStatus).toHaveBeenCalledWith(200);
    });

    it('should handle errors', async () => {
        const mockFrom = jest.fn().mockReturnValueOnce({
            select: jest.fn().mockReturnValueOnce({ data: null, error: new Error('select error') }),
        });

        await sendTime(session, res);

        expect(mockFrom).toHaveBeenCalledWith('timer');
        expect(res.sendStatus).toHaveBeenCalledWith(400);
    });
});