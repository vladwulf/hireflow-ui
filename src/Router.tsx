import { createBrowserRouter, RouterProvider } from 'react-router';
import Layout from './components/Layout';
import MainPage from './pages/MainPage';
import JobsPage from './pages/JobsPage';
import JobDetailPage from './pages/JobDetailPage';
import CandidateDetailPage from './pages/CandidateDetailPage';
import TeamplatesPage from './pages/TeamplatesPage';
import TemplateDetailPage from './pages/TemplateDetailPage';

const router = createBrowserRouter([
  {
    path: '/',
    element: <Layout />,
    children: [
      { index: true, element: <MainPage /> },
      { path: 'jobs', element: <JobsPage /> },
      { path: 'jobs/:id', element: <JobDetailPage /> },
      { path: 'jobs/:id/candidates/:candidateId', element: <CandidateDetailPage /> },
      { path: 'templates', element: <TeamplatesPage /> },
      { path: 'templates/:uuid', element: <TemplateDetailPage /> },
    ],
  },
]);

export default function Router() {
  return <RouterProvider router={router} />;
}

