import { Toaster } from 'react-hot-toast';
import Router from './Router';

export default function App() {
  return (
    <>
      <Router />
      <Toaster position="top-right" />
    </>
  );
}
