import { configureInterceptors } from '@KwSrc/services/interceptor';
import { ReactElement, useEffect } from 'react';
import { Store } from 'redux';

interface InterceptorInterface {
  children: ReactElement;
  store: Store;
}

// This provider is used to provide the interceptos with default auth values

function InterceptorProvider(props: InterceptorInterface) {
  useEffect(() => {
    configureInterceptors(props.store);
  });

  return props.children;
}
export default InterceptorProvider;
