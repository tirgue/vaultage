import { useEffect, useState } from 'react';

interface BeforeInstallPromptEvent extends Event {
  prompt: CallableFunction;
  userChoice: Promise<{ outcome: string }>;
}

export const useInstallPrompt = (): [boolean, () => void] => {
  const [canInstall, setCanInstall] = useState<boolean>(false);
  const [deferredPrompt, setDeferredPrompt] = useState<
    BeforeInstallPromptEvent | undefined
  >(undefined);

  const callback = (e: Event) => {
    e.preventDefault();
    if (!window.matchMedia('(display-mode: standalone)').matches) {
      setDeferredPrompt(e as BeforeInstallPromptEvent);
      setCanInstall(true);
    }
  };

  useEffect(() => {
    window.addEventListener('beforeinstallprompt', callback);
    return () => {
      window.removeEventListener('beforeinstallprompt', callback);
    };
  }, []);

  const triggerInstall = async (): Promise<void> => {
    if (!deferredPrompt) return;

    deferredPrompt.prompt();
    const { outcome } = await deferredPrompt.userChoice;
    if (outcome === 'accepted') {
      setDeferredPrompt(undefined);
      setCanInstall(false);
    }
  };

  return [canInstall, triggerInstall];
};
