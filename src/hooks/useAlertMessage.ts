import { createContext, useContext, useMemo, useState } from 'react';

type AlertContextType = {
  alertList: { timestamp: string; message: string }[];
  triggerAlert: (alertMessage: string) => void;
};

export const AlertContext = createContext<AlertContextType>({
  alertList: [],
  triggerAlert: () => undefined,
});

export const useInitAlertMessage = (): AlertContextType => {
  const [alertRecord, setAlertRecord] = useState<Record<string, string>>({});

  const alertList = useMemo(
    () =>
      Object.entries(alertRecord).map(([timestamp, message]) => ({
        timestamp,
        message,
      })),
    [alertRecord],
  );

  const triggerAlert = (alertMessage: string) => {
    const alertId = Date.now();

    setAlertRecord((alertList) => ({
      ...alertList,
      [alertId]: alertMessage,
    }));

    const deleteAlert = () =>
      setAlertRecord((alertRecord) => {
        delete alertRecord[alertId];
        return { ...alertRecord };
      });

    setTimeout(deleteAlert, 4000);
  };

  return { alertList, triggerAlert };
};

export const useAlertMessage = () => useContext(AlertContext);
