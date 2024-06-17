import { ModeToggle } from '@/components/mode-toggle';
import Link from 'next/link';
import { Button } from '@/components/ui/button';
import ProfileCard from '../components/profile-card';
import { Card, CardContent } from '../components/ui/card';

export default function Home() {
  return (
    <main className="flex flex-col items-center justify-between p-12 md:lg:p-24">
      <h2 className="text-4xl text-center font-dalek text-primary">
        Alysson Rodrigues
      </h2>
      <ProfileCard />
      <h2 className="mt-4 mb-2 font-dalek text-2xl">Links</h2>
      <Card className="w-full mt-2 flex items-center p-4">
        <Link href="https://chat.whatsapp.com/GtA0GFBoG4i4shCzKNIN7S">
          <div>
            <h2 className="font-dalek text-primary">Banheira Dark</h2>
            <p className="break-words">Grupo de humor negro</p>
          </div>
        </Link>
      </Card>
      <Card className="w-full mt-2 flex items-center p-4">
        <Link href="https://api.whatsapp.com/send?phone=5566981497355&text=Ol%C3%A1!%20Te%20achei%20pelo%20instagram!">
          <div>
            <h2 className="font-dalek text-primary">Entre em contato comigo</h2>
            <p className="break-words">Meu WhatsApp!</p>
          </div>
        </Link>
      </Card>
      <Card className="w-full mt-2 flex items-center p-4">
        <Link href="https://alyssonrodrigues.com">
          <div>
            <h2 className="font-dalek text-primary">
              Portfolio de Desenvolvimento
            </h2>
            <p className="break-words">
              Veja meus trabalhos como desenvolvedor web
            </p>
          </div>
        </Link>
      </Card>
      <Card className="w-full mt-2 flex items-center p-4">
        <Link href="https://alyssonrodrigues.com/behance">
          <div>
            <h2 className="font-dalek text-primary">Portfolio de Design</h2>
            <p className="break-words">
              Veja meus trabalhos como designer gráfico e de interfaces.
            </p>
          </div>
        </Link>
      </Card>
      <Card className="w-full mt-2 flex items-center p-4 mb-16">
        <Link href="/messages">
          <div>
            <h2 className="font-dalek text-primary">Mensagens anônimas</h2>
            <p className="break-words">Me envie mensagens anônimas</p>
          </div>
        </Link>
      </Card>
      <div className="fixed bottom-0 left-0 flex h-32 w-full justify-center bg-gradient-to-t items-center from-white via-white dark:from-black dark:via-black">
        <ModeToggle />
        <div className="flex flex-col pl-3">
          <div className="flex items-center">
            <Link href="https://chat.whatsapp.com/GtA0GFBoG4i4shCzKNIN7S">
              <Button variant={'default'} className="font-semibold">
                Entre na Banheira Dark
              </Button>
            </Link>
          </div>
        </div>
      </div>
    </main>
  );
}
