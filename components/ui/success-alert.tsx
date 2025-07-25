import { CheckCircle } from "lucide-react";

interface SuccessAlertProps {
  show: boolean;
  message?: string;
}

export default function SuccessAlert({ show, message = "Perubahan berhasil disimpan" }: SuccessAlertProps) {
  if (!show) return null;

  return (
    <div className="flex items-center p-4 bg-green-50 dark:bg-green-900/20 border border-green-200 dark:border-green-800 rounded-lg animate-in slide-in-from-top-2 duration-300">
      <CheckCircle className="w-5 h-5 text-green-600 dark:text-green-400 mr-3 flex-shrink-0" />
      <span className="text-green-800 dark:text-green-200 font-medium">
        {message}
      </span>
    </div>
  );
}
