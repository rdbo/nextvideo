import { AlertCircle } from "lucide-react";
import { Alert, AlertDescription, AlertTitle } from "@/components/ui/alert";
import { MouseEventHandler, ReactNode } from "react";

interface Props {
  children: ReactNode;
  onClick: MouseEventHandler<HTMLDivElement>;
}

export function AlertError({ children, onClick }: Props) {
  return (
    <Alert variant="destructive" className="bg-red-500 cursor-pointer" onClick={onClick}>
      <AlertCircle color="white" className="h-4 w-4" />
      <AlertTitle className="text-slate-100 font-bold">Error</AlertTitle>
      <AlertDescription className="text-slate-100 font-bold">
        {children}
      </AlertDescription>
    </Alert>
  );
}
