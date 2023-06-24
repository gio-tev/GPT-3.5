import {useState} from 'react';
import {API_KEY} from '@env';
import {chatTitleRequestText} from '../utils/chatTitleRequest';
import {MessageTypes} from '../types';

const useChatbot = () => {
  const [response, setResponse] = useState('');
  const [chatTitle, setChatTitle] = useState('');
  const [error, setError] = useState(false);

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

      if (data.error) throw new Error(data.error.message);

      const responseMessage = data.choices[0].message.content;
      const titleRequested = messages
        .at(-1)
        ?.content.startsWith(chatTitleRequestText);

      if (titleRequested) setChatTitle(responseMessage);
      else setResponse(responseMessage + '_' + Date.now());

      setError(false);
    } catch (error) {
      console.log(error, 'errorrrrrrrrr');

      setError(true);
    }
  };

  return {response, chatTitle, error, fetchData};
};

export default useChatbot;
