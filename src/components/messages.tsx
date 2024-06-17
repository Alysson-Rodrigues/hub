'use client';
import { useEffect, useState } from 'react';
import { Button } from '@/components/ui/button';
import { Card, CardContent } from '@/components/ui/card';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs';
import { useToast } from '@/components/ui/use-toast';
import { FlexibleIcon } from './flexible-icon';
import { formatDistanceToNow } from 'date-fns';
import { pt } from 'date-fns/locale';
import Tracker from '@/components/tracker';
import Link from 'next/link';
import { DialogValentines } from './dialog-valentines';

interface Message {
  id: string;
  title: string;
  type: number;
  description: string;
  created_at: string;
}

export function Messages() {
  const [messages, setMessages] = useState<Message[]>([]);
  const [activeTab, setActiveTab] = useState<string>('messages');
  const { toast } = useToast();
  const types = ['Mensagem', 'Denúncia', 'Fofoca', 'Outro', 'Especial'];
  const [selectedType, setSelectedType] = useState<number>(1);
  useEffect(() => {
    const fetchMessages = async () => {
      try {
        const response = await fetch(`/api/v1/messages`);
        const data = await response.json();
        setMessages(data);
      } catch (error) {
        toast({
          title: '🟥 Falha ao buscar as mensagens.',
          description:
            'Topei com um todes e ele socializou as mensagens, sumiram!',
        });
      }
    };
    fetchMessages();
    if (typeof window !== 'undefined') {
      const urlParams = new URLSearchParams(window.location.search);
      if (urlParams.get('add') === 'true') {
        setActiveTab('add');
      }
    }
  }, []);

  function onSubmit(event: React.FormEvent<HTMLFormElement>) {
    event.preventDefault();
    const form = event.currentTarget as HTMLFormElement;
    const formData = new FormData(form);
    const data = Object.fromEntries(formData);
    const identifierCookie = document.cookie
      .split('; ')
      .find((row) => row.startsWith('identifier'));
    if (!identifierCookie) {
      toast({
        title: '🟥 Mensagem não enviada.',
        description: 'Você precisa habilitar os cookies para enviar mensagens.',
        duration: 8000,
      });
      return;
    }
    data.agent_id = identifierCookie.split('=')[1];
    const method = 'POST';
    const url = `/api/v1/messages`;
    fetch(url, {
      method: method,
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify(data),
    })
      .then((response) => {
        if (!response.ok) {
          response.json().then((error) => {
            toast({
              title: '🟥 Mensagem não enviada.',
              description: error.error,
              duration: 8000,
            });
          });
        }
        if (response.status === 409) {
          toast({
            title: '🟥 Mensagem não enviada.',
            description:
              'Identificador comprometido, recarregue a página e tente novamente',
            duration: 8000,
          });
          document.cookie =
            'identifier=; expires=Thu, 01 Jan 1970 00:00:00 UTC';
        }
        toast({
          title: `❤️‍🔥Mensagem enviada!`,
          description: `A mensagem foi enviada com sucesso!`,
          duration: 8000,
        });
        setActiveTab('messages');
        return response.json();
      })
      .then((newMessage) => {
        newMessage.created_at = new Date().toISOString();
        setMessages([newMessage, ...messages]);
        form.reset();
      })
      .catch((error) => {
        console.error(`Falha ao enviar a mensagem:`, error);
      });
  }

  return (
    <Tracker>
      <Tabs
        defaultValue="messages"
        className="md:lg:w-full flex justify-center items-center flex-col"
        onValueChange={setActiveTab}
        value={activeTab}
      >
        <TabsList className="grid w-full grid-cols-6 max-w-[400px] mt-6 self-center">
          <TabsTrigger
            value="messages"
            className="col-span-3 flex justify-start"
          >
            <p className="font-mono">Mensagens</p>
          </TabsTrigger>
          <TabsTrigger value="add" className="col-span-3">
            <p className="font-mono ml-2 mr-2">+ Escrever</p>
          </TabsTrigger>
        </TabsList>
        <TabsContent
          value="messages"
          className="md:lg:flex flex-wrap md:justify-center lg:justify-center mb-8 md:lg:mt-8"
        >
          <DialogValentines />
          {messages.map((message) => (
            <Card key={message.id} className={`mb-2 md:lg:w-[400px] mx-1`}>
              <div className="p-3">
                <FlexibleIcon type={message.type} />
                <h2 className="text-xl font-bold font-expanded max-w-[250px] break-words">
                  {message.title}
                </h2>
                <div className="font-medium text-sm font-wide_oblique text-primary">
                  {types[message.type - 1]}
                </div>
              </div>
              <CardContent>
                <p className="max-w-[250px] break-words font-expanded">
                  {message.description}
                </p>
                <p className="text-sm text-gray-500 font-mono">
                  {formatDistanceToNow(new Date(message.created_at), {
                    locale: pt,
                  })}{' '}
                  atrás
                </p>
              </CardContent>
            </Card>
          ))}
          {!(messages.length === 0) && activeTab === 'messages' && (
            <div className="flex items-center justify-center mb-8">
              <Link href="/allmessages">
                <Button
                  className="font-expanded font-semibold w-full"
                  variant={'link'}
                >
                  Veja todas as mensagens
                </Button>
              </Link>
            </div>
          )}
        </TabsContent>
        <TabsContent value="add" className="md:lg:w-[40%] min-h-[500px]">
          <form className="space-y-4" onSubmit={onSubmit}>
            {selectedType !== 1 && (
              <div className="relative">
                <Label htmlFor="title">Título</Label>
                <Input
                  id="title"
                  name="title"
                  type="text"
                  readOnly={selectedType == 1 ? true : false}
                />
              </div>
            )}
            <div className="relative">
              <label
                htmlFor="type"
                className="block text-sm font-medium text-black dark:text-white mb-1"
              >
                Tipo
              </label>
              <select
                id="type"
                name="type"
                className="flex h-10 w-full rounded-md border border-input bg-background px-3 py-2 text-sm ring-offset-background file:border-0 file:bg-transparent file:text-sm file:font-medium placeholder:text-muted-foreground focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-2 disabled:cursor-not-allowed disabled:opacity-50 font-sans"
                onChange={(e) => setSelectedType(Number(e.target.value))}
              >
                <option value="1">{types[0]}</option>
                <option value="2">{types[1]}</option>
                <option value="3">{types[2]}</option>
                <option value="4">{types[3]}</option>
              </select>
            </div>
            <div>
              <Label htmlFor="description">Mensagem</Label>
              <Input id="description" name="description" type="textarea" />
            </div>
            <Button type="submit">Enviar mensagem</Button>
            <Button
              variant={'secondary'}
              className="ml-2"
              onClick={() => {
                setActiveTab('messages');
              }}
            >
              Cancelar
            </Button>
          </form>
        </TabsContent>
      </Tabs>
      {messages.length === 0 && activeTab === 'messages' && (
        <p className="text-center font-mono mt-4 max-w-[400px]">
          Espera aí, estou indo buscar as mensagens pra te mostrar😎...
        </p>
      )}
    </Tracker>
  );
}
