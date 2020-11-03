import React from 'react'
import { AppRoutes } from './app-routes'
import { AppProvider } from '../service/provider/app/app-provider'

export const Routes = (): JSX.Element => (
  <AppProvider>
    <AppRoutes />
  </AppProvider>
)
