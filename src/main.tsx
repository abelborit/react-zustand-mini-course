import React from 'react'
import ReactDOM from 'react-dom/client'

import './index.css'
import { RouterProvider } from 'react-router-dom';
import { router } from './router/router.tsx';
import { QueryClientProvider } from '@tanstack/react-query';
import queryClient from './utils/queryClient.ts';

/* al trabajar con React Query se hace uso de un Provider y usará también el cliente de React Query que ya hemos creado */
ReactDOM.createRoot(document.getElementById('root')!).render(
  <React.StrictMode>
    <QueryClientProvider client={ queryClient }>
      <RouterProvider router={ router } />
    </QueryClientProvider>
  </React.StrictMode>,
)
