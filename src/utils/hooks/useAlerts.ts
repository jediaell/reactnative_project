import { DisplayToast } from '~/utils';

interface AlertActions {
  showError: (message: string, description?: string) => void;
  showSucess: (message: string, description?: string) => void;
  showInfo: (message: string, description?: string) => void;
  showWarning: (message: string, description?: string) => void;
}

export function useAlerts(): AlertActions {
  return {
    showError: (message: string, description?: string): void =>
      DisplayToast({ message, description, type: 'danger' }),
    showSucess: (message: string, description?: string): void =>
      DisplayToast({ message, description, type: 'success' }),
    showInfo: (message: string, description?: string): void =>
      DisplayToast({ message, description, type: 'info' }),
    showWarning: (message: string, description?: string): void =>
      DisplayToast({ message, description, type: 'warning' }),
  };
}
