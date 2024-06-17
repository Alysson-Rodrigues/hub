import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from '@/components/ui/dialog';
import { Card, CardContent } from '@/components/ui/card';

export function DialogValentines() {
  return (
    <Dialog>
      <DialogTrigger asChild>
        <Card className={`mb-2 md:lg:w-[400px] mx-1 border-primary`}>
          <div className="p-3">
            <div className="flex items-center">
              <span className="text-4xl">🎉</span>
              <h2 className="text-md font-bold font-expanded max-w-[250px] break-words text-primary ">
                Tema do dia!
              </h2>
            </div>
            <p className="max-w-[250px] break-words font-expanded">
              Clique em mim...
            </p>
          </div>
        </Card>
      </DialogTrigger>
      <DialogContent className="sm:max-w-[300px] md:lg:max-w-7xl">
        <DialogHeader>
          <DialogTitle>Tema do dia</DialogTitle>
          <DialogDescription className="font-mono">
            Você pode enviar uma mensagem sobre o tema do dia! 🎉
          </DialogDescription>
        </DialogHeader>
        <Card className={`mb-2 mx-1 border-red-600`}>
          <div className="px-3 pt-2 flex items-center">
            <span className="text-4xl -ml-3">🧨</span>
            <h2 className="text-xl font-bold font-expanded max-w-[250px] break-words">
              Tema do dia:
            </h2>
          </div>
          <CardContent>
            <p className=" break-words font-mono ">
              A pessoa mais tóxica da banheira é o(a)... Porque...?
            </p>
          </CardContent>
        </Card>
      </DialogContent>
    </Dialog>
  );
}
