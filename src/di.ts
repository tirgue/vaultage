import { Container, ContainerModule } from 'inversify';
import 'reflect-metadata';
import { EncryptionService, PassGeneratorService } from './services';

const containerModule = new ContainerModule((bind) => {
  bind(EncryptionService).toSelf().inSingletonScope();
  bind(PassGeneratorService).toSelf().inSingletonScope();
});

const container = new Container();
container.load(containerModule);

export default container;
