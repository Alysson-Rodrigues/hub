import { Avatar, AvatarFallback, AvatarImage } from '@/components/ui/avatar';
import { Card, CardContent, CardHeader } from './ui/card';

export default function ProfileCard() {
  return (
    <Card className="w-full mt-8 flex  items-center p-2">
      <CardContent className="flex items-center p-2">
        <Avatar className="mr-2 w-[100px] h-[100px] border-primary border-2">
          <AvatarImage src="/profile.jpg" alt="@shadcn" />
          <AvatarFallback className="font-dalek">AR</AvatarFallback>
        </Avatar>
        <div>
          <h2 className="font-dalek text-primary">20 anos</h2>
          <p className="break-words">Programador, GymBro, Designer Gráfico</p>
        </div>
      </CardContent>
    </Card>
  );
}
