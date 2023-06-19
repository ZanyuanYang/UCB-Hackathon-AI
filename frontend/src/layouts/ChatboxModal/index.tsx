import React, { Fragment, useEffect, useRef, useState } from 'react';
import { Dialog, Transition } from '@headlessui/react';
import SendRoundedIcon from '@mui/icons-material/SendRounded';
// eslint-disable-next-line import/no-extraneous-dependencies
import '@chatscope/chat-ui-kit-styles/dist/default/styles.min.css';
// eslint-disable-next-line import/no-extraneous-dependencies
import axios from 'axios';
import avatar from '../../assets/avatar.png';
import avatar_right from '../../assets/avatar_right.jpg';
import SuggestItem from './components/SuggestItem';
import UseAnimations from 'react-useanimations';
import loading from 'react-useanimations/lib/loading';
import logo from '../../assets/logo.jpg';

type Props = {
  open: boolean;
  onClose: () => void;
};

function ChatboxModal(props: Props) {
  const { open, onClose } = props;
  const [suggestion, setSuggestion] = useState<any[]>([]);
  const [messages, setMessages] = useState<any[]>([
    {
      message:
        "👋Hello, I'll be your personal assistant for your visit today! What are you looking for?",
      sentTime: 'just now',
      sender: 'ChatGPT',
      suggestion: null,
    },
  ]);

  const [userMessage, setUserMessage] = useState<string>('');
  const systemMessage = {
    //  Explain things like you're talking to a software professional with 5 years of experience.
    role: 'system',
    content:
      "Explain things like you're talking to a software professional with 2 years of experience.",
  };

  const [isTyping, setIsTyping] = useState<boolean>(false);

  const handleSendOnChange = (message: any) => {
    setUserMessage(message);
  };

  const processMessageToChatGPT = async (chatMessages: any) => {
    // messages is an array of messages
    // Format messages for chatGPT API
    // API is expecting objects in format of { role: "user" or "assistant", "content": "message here"}
    // So we need to reformat

    const apiMessages = chatMessages.map((messageObject: any) => {
      let role = '';
      if (messageObject.sender === 'ChatGPT') {
        role = 'assistant';
      } else {
        role = 'user';
      }
      return { role: role, content: messageObject.message };
    });

    // Get the request body set up with the model we plan to use
    // and the messages which we formatted above. We add a system message in the front to'
    // determine how we want chatGPT to act.
    const apiRequestBody = {
      model: 'gpt-3.5-turbo',
      messages: [
        systemMessage, // The system message DEFINES the logic of our chatGPT
        ...apiMessages, // The messages from our chat with ChatGPT
      ],
    };

    const response = await axios.post(
      'http://localhost:8080/api/product/pinecone',
      {
        input: userMessage,
      }
    );

    setMessages([
      ...chatMessages,
      {
        message: response.data.data.data.text,
        sender: 'ChatGPT',
        suggestion: response.data.data.data.sourceDocuments || null,
      },
    ]);

    setSuggestion((prevSuggestions) => [
      ...prevSuggestions,
      [...response.data.data.data.sourceDocuments],
    ]);
    setIsTyping(false);
  };

  const handleSend = async (e: any) => {
    setIsTyping(true);
    e.preventDefault();
    const newMessage = {
      message: userMessage,
      direction: 'outgoing',
      sender: 'user',
      suggestion: null,
    };

    const newMessages = [...messages, newMessage];

    setMessages(newMessages);
    setUserMessage('');
    // Initial system message to determine ChatGPT functionality
    // How it responds, how it talks, etc.
    await processMessageToChatGPT(newMessages);
  };

  const messagesEndRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    messagesEndRef.current?.scrollIntoView({ behavior: 'smooth' });
  }, [messages]);

  return (
    <Transition appear show={open} as={Fragment}>
      <Dialog as="div" className="relative z-10" onClose={onClose}>
        <Transition.Child
          as={Fragment}
          enter="ease-out duration-300"
          enterFrom="opacity-0"
          enterTo="opacity-100"
          leave="ease-in duration-200"
          leaveFrom="opacity-100"
          leaveTo="opacity-0"
        >
          <div className="fixed inset-0 bg-black bg-opacity-25" />
        </Transition.Child>

        <div className="fixed inset-0 overflow-scroll">
          <div className="flex min-h-full items-center justify-center p-4 text-center">
            <Transition.Child
              as={Fragment}
              enter="ease-out duration-300"
              enterFrom="opacity-0 scale-95"
              enterTo="opacity-100 scale-100"
              leave="ease-in duration-200"
              leaveFrom="opacity-100 scale-100"
              leaveTo="opacity-0 scale-95"
            >
              <Dialog.Panel className="w-full flex flex-col gap-2 max-w-screen-lg transform overflow-hidden rounded-2xl p-6 text-left align-middle shadow-xl transition-all bg-slate-50">
                <Dialog.Title
                  as="h3"
                  className="mb-2 font-bold text-lg text-gray-900 flex items-center gap-2"
                >
                  <img className="w-10 rounded-full" src={logo} alt="logo" />
                  Yonder Search
                </Dialog.Title>
                {/*<div className="mt-2 flex flex-col gap-1 border border-gray-200 bg-gray-100 rounded-xl p-2">*/}
                {/*  <h2 className="text-gray-800">AI Notes</h2>*/}
                {/*  <p className="text-xs max-w-md space-y-1 text-gray-500 list-inside break-all">*/}
                {/*    1. What is the best way to find a*/}
                {/*    job?fnekjwafnewkafnewjnfewjaf ewkjaf*/}
                {/*  </p>*/}
                {/*  <p className="text-xs max-w-md space-y-1 text-gray-500 list-inside break-all">*/}
                {/*    2. What is the best way to find a*/}
                {/*    job?fnekjwafnewkafnewjnfewjaf ewkjaf*/}
                {/*  </p>*/}
                {/*</div>*/}

                <div className="border border-slate-400 rounded-2xl h-[30em] overflow-auto p-4">
                  <div>
                    {messages.map((message) => {
                      return (
                        <div key={message.message}>
                          {message.sender === 'ChatGPT' ||
                          message.sender === 'assistant' ? (
                            <div className="flex gap-2">
                              <img
                                className="rounded-full w-12 h-12"
                                src="https://static.vecteezy.com/system/resources/previews/010/994/232/original/nike-logo-black-clothes-design-icon-abstract-football-illustration-with-white-background-free-vector.jpg"
                                alt="bot"
                              />
                              <div>
                                <p className="text-gray-900 font-semibold tracking-wide">
                                  Nike assistant
                                </p>
                                <div className="__chat_box bg-white p-3 inline-block">
                                  {message.message}
                                </div>
                                <div className="grid grid-cols-3 gap-4 mb-2 mt-2 animate__animated animate__fadeInDown">
                                  {message.suggestion &&
                                    message.suggestion.map((item: any) => (
                                      <SuggestItem key={item} item={item} />
                                    ))}
                                </div>
                              </div>
                            </div>
                          ) : (
                            <div className="flex gap-2">
                              <div className="ml-auto flex flex-col">
                                <p className="text-gray-900 font-semibold tracking-wide ml-auto">
                                  You
                                </p>
                                <div className="__chat_box bg-sky-300 p-3">
                                  {message.message}
                                </div>
                              </div>
                              <img
                                className="rounded-full w-12 h-12"
                                src={avatar_right}
                                alt="user"
                              />
                            </div>
                          )}
                        </div>
                      );
                    })}
                  </div>
                  {isTyping && (
                    <div className="text-black mt-2 flex gap-2">
                      <UseAnimations animation={loading} />
                      <div>Thinking...</div>
                    </div>
                  )}
                  <div ref={messagesEndRef} />
                </div>

                <form
                  className="flex items-center"
                  onSubmit={(e) => handleSend(e)}
                >
                  <label htmlFor="simple-search" className="sr-only">
                    Chat here...
                  </label>
                  <div className="relative w-full">
                    <div className="absolute inset-y-0 left-0 flex items-center pl-3 pointer-events-none">
                      <svg
                        aria-hidden="true"
                        className="w-5 h-5 text-gray-500 dark:text-gray-400"
                        fill="currentColor"
                        viewBox="0 0 20 20"
                        xmlns="http://www.w3.org/2000/svg"
                      >
                        <path
                          fill-rule="evenodd"
                          d="M8 4a4 4 0 100 8 4 4 0 000-8zM2 8a6 6 0 1110.89 3.476l4.817 4.817a1 1 0 01-1.414 1.414l-4.816-4.816A6 6 0 012 8z"
                          clip-rule="evenodd"
                        />
                      </svg>
                    </div>
                    <input
                      type="text"
                      id="simple-search"
                      className="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full pl-10 p-2.5  dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500"
                      placeholder="Chat here..."
                      value={userMessage}
                      autoComplete="off"
                      required
                      onChange={(e: any) => handleSendOnChange(e.target.value)}
                    />
                  </div>
                  {isTyping ? (
                    <button
                      type="submit"
                      className="p-2.5 ml-2 text-sm font-medium text-white bg-gray-600 rounded-lg border border-blue-700 "
                      disabled
                    >
                      <SendRoundedIcon />
                      <span className="sr-only">Search</span>
                    </button>
                  ) : (
                    <button
                      type="submit"
                      className="p-2.5 ml-2 text-sm font-medium text-white bg-blue-700 rounded-lg border border-blue-700 hover:bg-blue-800 focus:ring-4 focus:outline-none focus:ring-blue-300 dark:bg-blue-600 dark:hover:bg-blue-700 dark:focus:ring-blue-800"
                      onClick={(e) => handleSend(e)}
                    >
                      <SendRoundedIcon />
                      <span className="sr-only">Search</span>
                    </button>
                  )}
                </form>
                <h3 className="flex ml-auto text-sm text-gray-500">
                  Power by &nbsp;
                  <p className="font-medium text-gray-700">Hackathon AI</p>
                </h3>
              </Dialog.Panel>
            </Transition.Child>
          </div>
        </div>
      </Dialog>
    </Transition>
  );
}

export default ChatboxModal;
