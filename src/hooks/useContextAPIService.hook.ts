import { interfaces } from 'inversify';
import container from '../di';
import { EncryptionService, PassGeneratorService } from '../services';

type ContextAPIServices = PassGeneratorService | EncryptionService;

export const useContextAPIService = <T extends ContextAPIServices>(
  serviceIdentifier: interfaces.ServiceIdentifier<T>
) => {
  return container.get(serviceIdentifier);
};
