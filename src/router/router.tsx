import { createBrowserRouter } from 'react-router-dom';

import { Root } from '../Root';
import { AuthLayout, DashboardLayout } from '../layouts';
import { BearPage, Dashboard, JiraPage, LoginPage, PersonPage, ReactQueryPage, WeddingInvitationPage } from '../pages';

export const router = createBrowserRouter( [
  {
    path: '/',
    element: <Root />,
    children: [
      /// Dashboard Routes
      {
        path: 'dashboard',
        element: <DashboardLayout />,
        children: [
          {
            path: '',
            element: <Dashboard />
          },
          {
            path: 'bears',
            element: <BearPage />
          },
          {
            path: 'person',
            element: <PersonPage />
          },
          {
            path: 'tasks',
            element: <JiraPage />
          },
          {
            path: 'wedding-invitation',
            element: <WeddingInvitationPage />
          },
          {
            path: 'react-query',
            element: <ReactQueryPage />
          }
        ]
      },

      /// Auth Routes
      {
        path: 'auth',
        element: <AuthLayout />,
        children: [
          {
            path: 'login',
            element: <LoginPage />
          }
        ]
      },

    ],
  },
] );