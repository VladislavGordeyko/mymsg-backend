import { env } from '../../config';
const { BOTUSERNAME } = env;

export const WELCOMETEXT = `👋 Hello! Get ready to bring the fun of charades into your gatherings with this Telegram bot. Perfect for playing with friends offline, making it easy to start a game wherever you are—as long as you're all in the same place. 
  
Here's how to dive into the action:
- Tap on "Select Group or Channel" right below to choose where you'll play.
- Or, simply type <code>@${BOTUSERNAME}</code> followed by a space, then add your game's title in any chat to kick things off.`;