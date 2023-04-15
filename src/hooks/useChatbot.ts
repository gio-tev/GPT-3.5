import {useState} from 'react';
import {API_KEY} from '@env';
import {MessageTypes} from '../types';

const useChatbot = () => {
  const [response, setResponse] = useState('');
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

      setResponse(data.choices[0].message.content);
    } catch (error) {
      setError(error as Error);
    } finally {
      setResponse('');
    }
  };

  return {response, error, fetchData};
};

export default useChatbot;
