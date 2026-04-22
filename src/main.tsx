import { StrictMode } from 'react'
import { createRoot } from 'react-dom/client'
import { QueryCache, QueryClient, QueryClientProvider } from '@tanstack/react-query'
import toast from 'react-hot-toast'
import './index.css'
import App from './App.tsx'

const onError = (error: unknown) =>
  toast.error(error instanceof Error ? error.message : 'Something went wrong');

const queryClient = new QueryClient({
  queryCache: new QueryCache({ onError }),
  defaultOptions: {
    mutations: { onError },
  },
})

createRoot(document.getElementById('root')!).render(
  <StrictMode>
    <QueryClientProvider client={queryClient}>
      <App />
    </QueryClientProvider>
  </StrictMode>,
)
