import {useState} from 'react';
import {API_KEY} from '@env';
import {MessageTypes} from '../types';
import {chatTitleRequestText} from '../utils/chatTitleRequest';

const useChatbot = () => {
  const [response, setResponse] = useState('');
  const [chatTitle, setChatTitle] = useState('');
  const [error, setError] = useState<Error | null>(null);

  const fetchData = async (messages: MessageTypes) => {
    try {
      const res = await fetch('https://api.openai.com/v1/chat/completions', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
          Authorization: `Bearer ${API_KEY}`, // Use your own API KEY
        },
        body: JSON.stringify({
          model: 'gpt-3.5-turbo',
          messages,
        }),
      });

      const data = await res.json();

      const responseMessage = data.choices[0].message.content;
      const titleRequested = messages
        .at(-1)
        ?.content.startsWith(chatTitleRequestText);

      if (titleRequested) setChatTitle(responseMessage);
      else setResponse(responseMessage + '_' + Date.now());
    } catch (error) {
      console.log(error, 'errorrrrrrrrr');

      setError(error as Error);
    }
  };

  return {response, chatTitle, error, fetchData};
};

export default useChatbot;
