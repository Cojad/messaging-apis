import MockAdapter from 'axios-mock-adapter';

import TelegramClient from '../TelegramClient';

const ACCESS_TOKEN = '123456:ABC-DEF1234ghIkl-zyx57W2v1u123ew11';

const createMock = (): { client: TelegramClient; mock: MockAdapter } => {
  const client = new TelegramClient({
    accessToken: ACCESS_TOKEN,
  });
  const mock = new MockAdapter(client.axios);
  return { client, mock };
};

describe('sticker set api', () => {
  describe('#getStickerSet', () => {
    it('should return a stickerSet', async () => {
      const { client, mock } = createMock();
      const result = {
        name: 'sticker set name',
        title: 'sticker set title',
        isAnimated: false,
        containsMasks: false,
        stickers: [
          {
            width: 512,
            height: 512,
            emoji: '💛',
            setName: 'sticker set name',
            isAnimated: false,
            thumb: {
              fileId: 'AAQEAANDAQACEDVoAAFVA7aGNPt1If3eYTAABAEAB20AAzkOAAIWB',
              fileSize: 5706,
              width: 128,
              height: 128,
            },
            fileId: 'CAADBAADQwEAAhA1aAABVQO2hjT7dSEWB',
            fileSize: 36424,
          },
        ],
      };
      const reply = {
        ok: true,
        result: {
          name: 'sticker set name',
          title: 'sticker set title',
          is_animated: false,
          contains_masks: false,
          stickers: [
            {
              width: 512,
              height: 512,
              emoji: '💛',
              set_name: 'sticker set name',
              is_animated: false,
              thumb: {
                file_id:
                  'AAQEAANDAQACEDVoAAFVA7aGNPt1If3eYTAABAEAB20AAzkOAAIWB',
                file_size: 5706,
                width: 128,
                height: 128,
              },
              file_id: 'CAADBAADQwEAAhA1aAABVQO2hjT7dSEWB',
              file_size: 36424,
            },
          ],
        },
      };

      mock
        .onPost('/getStickerSet', {
          name: 'sticker set name',
        })
        .reply(200, reply);

      const res = await client.getStickerSet('sticker set name');

      expect(res).toEqual(result);
    });
  });

  describe('#createNewStickerSet', () => {
    const result = true;
    const reply = {
      ok: true,
      result,
    };

    const mock_params = {
      user_id: 1,
      name: 'sticker_set_name',
      title: 'title',
      png_sticker: 'https://example.com/sticker.png',
      emojis: '💛',
      contains_masks: true,
      mask_position: {
        point: 'eyes',
        x_shift: 10,
        y_shift: 10,
        scale: 1,
      },
    };

    it('should create a new stickerSet', async () => {
      const { client, mock } = createMock();
      mock.onPost('/createNewStickerSet', mock_params).reply(200, reply);

      const res = await client.createNewStickerSet(
        1,
        'sticker_set_name',
        'title',
        'https://example.com/sticker.png',
        '💛',
        {
          containsMasks: true,
          maskPosition: {
            point: 'eyes',
            xShift: 10,
            yShift: 10,
            scale: 1,
          },
        }
      );

      expect(res).toEqual(result);
    });
  });

  describe('#addStickerToSet', () => {
    const result = true;
    const reply = {
      ok: true,
      result,
    };

    const mock_params = {
      user_id: 1,
      name: 'sticker_set_name',
      png_sticker: 'https://example.com/sticker.png',
      emojis: '💛',
      mask_position: {
        point: 'eyes',
        x_shift: 10,
        y_shift: 10,
        scale: 1,
      },
    };

    it('should add a sticker to set', async () => {
      const { client, mock } = createMock();
      mock.onPost('/addStickerToSet', mock_params).reply(200, reply);

      const res = await client.addStickerToSet(
        1,
        'sticker_set_name',
        'https://example.com/sticker.png',
        '💛',
        {
          maskPosition: {
            point: 'eyes',
            xShift: 10,
            yShift: 10,
            scale: 1,
          },
        }
      );

      expect(res).toEqual(result);
    });
  });

  describe('#setStickerPositionInSet', () => {
    const result = true;
    const reply = {
      ok: true,
      result,
    };

    const mock_params = {
      sticker: 'CAADBAADQwEAAhA1aAABVQO2hjT7dSEWB',
      position: 0,
    };

    it('should change sticker position', async () => {
      const { client, mock } = createMock();
      mock.onPost('/setStickerPositionInSet', mock_params).reply(200, reply);

      const res = await client.setStickerPositionInSet(
        'CAADBAADQwEAAhA1aAABVQO2hjT7dSEWB',
        0
      );

      expect(res).toEqual(result);
    });
  });

  describe('#deleteStickerFromSet', () => {
    const result = true;
    const reply = {
      ok: true,
      result,
    };

    const mock_params = { sticker: 'CAADBAADQwEAAhA1aAABVQO2hjT7dSEWB' };

    it('should delete sticker successfully', async () => {
      const { client, mock } = createMock();
      mock.onPost('/deleteStickerFromSet', mock_params).reply(200, reply);

      const res = await client.deleteStickerFromSet(
        'CAADBAADQwEAAhA1aAABVQO2hjT7dSEWB'
      );

      expect(res).toEqual(result);
    });
  });
});

describe('#sendSticker', () => {
  // {
  //   ok: true,
  //   result: {
  //     message_id: 1,
  //     from: {
  //       id: 313534466,
  //       first_name: 'first',
  //       username: 'a_bot',
  //     },
  //     chat: {
  //       id: 427770117,
  //       first_name: 'first',
  //       last_name: 'last',
  //       type: 'private',
  //     },
  //     date: 1499403678,
  //     sticker: {
  //       width: 362,
  //       height: 512,
  //       emoji: '✊',
  //       thumb: {
  //         file_id: 'AAQFABOt1bEyAASi4MvOBXP2MYs8AQABAg',
  //         file_size: 2142,
  //         width: 63,
  //         height: 90,
  //       },
  //       file_id: 'CAADBQADQAADyIsGAAE7MpzFPFQX5QI',
  //       file_size: 36326,
  //     },
  //   },
  // }
  it('should send sticker message to user', async () => {
    const { client, mock } = createMock();
    mock
      .onPost('/sendSticker', {
        chat_id: 427770117,
        sticker: 'CAADAgADQAADyIsGAAE7MpzFPFQX5QI',
        disable_notification: true,
        reply_to_message_id: 9527,
      })
      .reply(200, reply);

    const res = await client.sendSticker(
      427770117,
      'CAADAgADQAADyIsGAAE7MpzFPFQX5QI',
      {
        disableNotification: true,
        replyToMessageId: 9527,
      }
    );

    expect(res).toEqual({
      messageId: 1,
      from: {
        id: 313534466,
        firstName: 'first',
        username: 'a_bot',
      },
      chat: {
        id: 427770117,
        firstName: 'first',
        lastName: 'last',
        type: 'private',
      },
      date: 1499403678,
      sticker: {
        width: 362,
        height: 512,
        emoji: '✊',
        thumb: {
          fileId: 'AAQFABOt1bEyAASi4MvOBXP2MYs8AQABAg',
          fileSize: 2142,
          width: 63,
          height: 90,
        },
        fileId: 'CAADBQADQAADyIsGAAE7MpzFPFQX5QI',
        fileSize: 36326,
      },
    });
  });
});
