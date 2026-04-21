import { createBrowserRouter, RouterProvider } from 'react-router';
import Layout from './components/Layout';
import MainPage from './pages/MainPage';
import JobsPage from './pages/JobsPage';
import TeamplatesPage from './pages/TeamplatesPage';

const router = createBrowserRouter([
  {
    path: '/',
    element: <Layout />,
    children: [
      { index: true, element: <MainPage /> },
      { path: 'jobs', element: <JobsPage /> },
      { path: 'templates', element: <TeamplatesPage /> },
    ],
  },
]);

export default function Router() {
  return <RouterProvider router={router} />;
}

