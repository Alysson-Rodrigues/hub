'use client';
import { useEffect, useState } from 'react';
import { Card, CardContent } from '@/components/ui/card';
import { useToast } from '@/components/ui/use-toast';
import { FlexibleIcon } from './flexible-icon';
import { formatDistanceToNow } from 'date-fns';
import { pt } from 'date-fns/locale';
import Tracker from '@/components/tracker';
import Link from 'next/link';
import { Button } from '@/components/ui/button';

interface Message {
  id: string;
  title: string;
  type: number;
  description: string;
  created_at: string;
}

export function AllMessages() {
  const [messages, setMessages] = useState<Message[]>([]);
  const { toast } = useToast();
  const types = [
    'Mensagem',
    'Denúncia',
    'Fofoca',
    'Outro',
    'Especial 12 de junho',
  ];
  useEffect(() => {
    const fetchMessages = async () => {
      try {
        const response = await fetch(`/api/v1/allmessages`);
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
  }, []);

  return (
    <Tracker>
      <div className="mt-8 flex flex-col items-center justify-center">
        <div className="flex items-center ">
          <Link href="/">
            <Button
              variant={'link'}
              className="font-super_expanded font-semibold w-full text-primary"
            >
              Volte à página inicial
            </Button>
          </Link>
        </div>
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
        {messages.length === 0 && (
          <p className="text-center font-mono mt-4 max-w-[400px]">
            Espera aí, estou indo buscar as mensagens pra te mostrar😎...
          </p>
        )}
      </div>
    </Tracker>
  );
}
