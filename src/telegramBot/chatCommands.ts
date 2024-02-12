import TelegramBot, {  Message, InlineQuery } from 'node-telegram-bot-api';
import { env } from '../../config';
import { v4 as uuidv4 } from 'uuid';
import { WELCOMETEXT } from './constants';

const { BOTUSERNAME, WEBAPPURLTELEGRAM } = env;

// Handles the /start command for the bot.
// Sends a game start link depending on whether the command came from a private chat or a group chat.
export const startGameCommand = (bot: TelegramBot) => (msg: Message) => {
  const chatId = msg.chat.id;
  bot.sendMessage(chatId, WELCOMETEXT, {
    parse_mode: 'HTML',
    reply_markup: {
      inline_keyboard: [
        // [{
        //   text: 'Start here',
        //   web_app: {
        //     url: `${WEBAPPURLTELEGRAM}?startapp=${chatId}`
        //   }
        // // web_app: {
        // //   url: miniappUrl({
        // //     source: msg.chat.type,
        // //     initData: generateInitData({ user: { id: msg.from.id, first_name: msg.from.first_name } }, ','),
        // //   }),
        // // }
        // }],
        [{
          text: 'Select Group or Channel...',
          switch_inline_query: '-',
        }]],
    }
  });
};


export const sendGameInvite = (bot: TelegramBot) => (query: InlineQuery) => {
  if (query.query.trim().length > 0) {
    const id = uuidv4();
    const title = query.query == '-' ? '' : query.query;
    bot.answerInlineQuery(query.id, [{
      type: 'article',
      id: id,
      title: `New game${title ? ' "' + title + '"' : ''}`,
      description: 'Send an invite to play a charades game.',
      input_message_content: {
        message_text: title ?
          `New Game "<a href="https://t.me/${BOTUSERNAME}/mymsg?startapp=${id}">${title}</a>"` :
          `<a href="https://t.me/${BOTUSERNAME}/mymsg?startapp=${id}">MYMSG</a>`,
        parse_mode: 'HTML',
      },
    }], 
    );
    return;
  }
};