import ReactDOM from 'react-dom/client';
import App from './App';
import { MantineProvider } from '@mantine/core';
import { theme } from './theme';

ReactDOM.createRoot(document.getElementById('root') as HTMLElement).render(
  <MantineProvider theme={theme}>
    <App />
  </MantineProvider>
);
