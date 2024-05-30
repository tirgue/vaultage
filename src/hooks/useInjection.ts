import { interfaces } from 'inversify';
import container from '../di';

export const useInjection = <T>(
  serviceIdentifier: interfaces.ServiceIdentifier<T>
) => {
  return container.get<T>(serviceIdentifier);
};
