/* eslint-disable */

// @ts-nocheck

// noinspection JSUnusedGlobalSymbols

// This file was automatically generated by TanStack Router.
// You should NOT make any changes in this file as it will be overwritten.
// Additionally, you should also exclude this file from your linter and/or formatter to prevent it from being checked or modified.

import { Route as rootRouteImport } from './routes/__root'
import { Route as VerifyEmailRouteImport } from './routes/verify-email'
import { Route as SignupRouteImport } from './routes/signup'
import { Route as LoginRouteImport } from './routes/login'
import { Route as CreateOrganizationRouteImport } from './routes/create-organization'
import { Route as OfficeRouteRouteImport } from './routes/office/route'
import { Route as AppRouteRouteImport } from './routes/app/route'
import { Route as IndexRouteImport } from './routes/index'
import { Route as OfficeIndexRouteImport } from './routes/office/index'
import { Route as AppIndexRouteImport } from './routes/app/index'
import { Route as AppMembersRouteImport } from './routes/app/members'
import { Route as AppInvitationsRouteImport } from './routes/app/invitations'
import { Route as AppProductsIndexRouteImport } from './routes/app/products/index'
import { Route as OfficeProductsCategoriesRouteImport } from './routes/office/products/categories'
import { Route as AppProductsTypesRouteImport } from './routes/app/products/types'

const VerifyEmailRoute = VerifyEmailRouteImport.update({
  id: '/verify-email',
  path: '/verify-email',
  getParentRoute: () => rootRouteImport,
} as any)
const SignupRoute = SignupRouteImport.update({
  id: '/signup',
  path: '/signup',
  getParentRoute: () => rootRouteImport,
} as any)
const LoginRoute = LoginRouteImport.update({
  id: '/login',
  path: '/login',
  getParentRoute: () => rootRouteImport,
} as any)
const CreateOrganizationRoute = CreateOrganizationRouteImport.update({
  id: '/create-organization',
  path: '/create-organization',
  getParentRoute: () => rootRouteImport,
} as any)
const OfficeRouteRoute = OfficeRouteRouteImport.update({
  id: '/office',
  path: '/office',
  getParentRoute: () => rootRouteImport,
} as any)
const AppRouteRoute = AppRouteRouteImport.update({
  id: '/app',
  path: '/app',
  getParentRoute: () => rootRouteImport,
} as any)
const IndexRoute = IndexRouteImport.update({
  id: '/',
  path: '/',
  getParentRoute: () => rootRouteImport,
} as any)
const OfficeIndexRoute = OfficeIndexRouteImport.update({
  id: '/',
  path: '/',
  getParentRoute: () => OfficeRouteRoute,
} as any)
const AppIndexRoute = AppIndexRouteImport.update({
  id: '/',
  path: '/',
  getParentRoute: () => AppRouteRoute,
} as any)
const AppMembersRoute = AppMembersRouteImport.update({
  id: '/members',
  path: '/members',
  getParentRoute: () => AppRouteRoute,
} as any)
const AppInvitationsRoute = AppInvitationsRouteImport.update({
  id: '/invitations',
  path: '/invitations',
  getParentRoute: () => AppRouteRoute,
} as any)
const AppProductsIndexRoute = AppProductsIndexRouteImport.update({
  id: '/products/',
  path: '/products/',
  getParentRoute: () => AppRouteRoute,
} as any)
const OfficeProductsCategoriesRoute =
  OfficeProductsCategoriesRouteImport.update({
    id: '/products/categories',
    path: '/products/categories',
    getParentRoute: () => OfficeRouteRoute,
  } as any)
const AppProductsTypesRoute = AppProductsTypesRouteImport.update({
  id: '/products/types',
  path: '/products/types',
  getParentRoute: () => AppRouteRoute,
} as any)

export interface FileRoutesByFullPath {
  '/': typeof IndexRoute
  '/app': typeof AppRouteRouteWithChildren
  '/office': typeof OfficeRouteRouteWithChildren
  '/create-organization': typeof CreateOrganizationRoute
  '/login': typeof LoginRoute
  '/signup': typeof SignupRoute
  '/verify-email': typeof VerifyEmailRoute
  '/app/invitations': typeof AppInvitationsRoute
  '/app/members': typeof AppMembersRoute
  '/app/': typeof AppIndexRoute
  '/office/': typeof OfficeIndexRoute
  '/app/products/types': typeof AppProductsTypesRoute
  '/office/products/categories': typeof OfficeProductsCategoriesRoute
  '/app/products': typeof AppProductsIndexRoute
}
export interface FileRoutesByTo {
  '/': typeof IndexRoute
  '/create-organization': typeof CreateOrganizationRoute
  '/login': typeof LoginRoute
  '/signup': typeof SignupRoute
  '/verify-email': typeof VerifyEmailRoute
  '/app/invitations': typeof AppInvitationsRoute
  '/app/members': typeof AppMembersRoute
  '/app': typeof AppIndexRoute
  '/office': typeof OfficeIndexRoute
  '/app/products/types': typeof AppProductsTypesRoute
  '/office/products/categories': typeof OfficeProductsCategoriesRoute
  '/app/products': typeof AppProductsIndexRoute
}
export interface FileRoutesById {
  __root__: typeof rootRouteImport
  '/': typeof IndexRoute
  '/app': typeof AppRouteRouteWithChildren
  '/office': typeof OfficeRouteRouteWithChildren
  '/create-organization': typeof CreateOrganizationRoute
  '/login': typeof LoginRoute
  '/signup': typeof SignupRoute
  '/verify-email': typeof VerifyEmailRoute
  '/app/invitations': typeof AppInvitationsRoute
  '/app/members': typeof AppMembersRoute
  '/app/': typeof AppIndexRoute
  '/office/': typeof OfficeIndexRoute
  '/app/products/types': typeof AppProductsTypesRoute
  '/office/products/categories': typeof OfficeProductsCategoriesRoute
  '/app/products/': typeof AppProductsIndexRoute
}
export interface FileRouteTypes {
  fileRoutesByFullPath: FileRoutesByFullPath
  fullPaths:
    | '/'
    | '/app'
    | '/office'
    | '/create-organization'
    | '/login'
    | '/signup'
    | '/verify-email'
    | '/app/invitations'
    | '/app/members'
    | '/app/'
    | '/office/'
    | '/app/products/types'
    | '/office/products/categories'
    | '/app/products'
  fileRoutesByTo: FileRoutesByTo
  to:
    | '/'
    | '/create-organization'
    | '/login'
    | '/signup'
    | '/verify-email'
    | '/app/invitations'
    | '/app/members'
    | '/app'
    | '/office'
    | '/app/products/types'
    | '/office/products/categories'
    | '/app/products'
  id:
    | '__root__'
    | '/'
    | '/app'
    | '/office'
    | '/create-organization'
    | '/login'
    | '/signup'
    | '/verify-email'
    | '/app/invitations'
    | '/app/members'
    | '/app/'
    | '/office/'
    | '/app/products/types'
    | '/office/products/categories'
    | '/app/products/'
  fileRoutesById: FileRoutesById
}
export interface RootRouteChildren {
  IndexRoute: typeof IndexRoute
  AppRouteRoute: typeof AppRouteRouteWithChildren
  OfficeRouteRoute: typeof OfficeRouteRouteWithChildren
  CreateOrganizationRoute: typeof CreateOrganizationRoute
  LoginRoute: typeof LoginRoute
  SignupRoute: typeof SignupRoute
  VerifyEmailRoute: typeof VerifyEmailRoute
}

declare module '@tanstack/react-router' {
  interface FileRoutesByPath {
    '/verify-email': {
      id: '/verify-email'
      path: '/verify-email'
      fullPath: '/verify-email'
      preLoaderRoute: typeof VerifyEmailRouteImport
      parentRoute: typeof rootRouteImport
    }
    '/signup': {
      id: '/signup'
      path: '/signup'
      fullPath: '/signup'
      preLoaderRoute: typeof SignupRouteImport
      parentRoute: typeof rootRouteImport
    }
    '/login': {
      id: '/login'
      path: '/login'
      fullPath: '/login'
      preLoaderRoute: typeof LoginRouteImport
      parentRoute: typeof rootRouteImport
    }
    '/create-organization': {
      id: '/create-organization'
      path: '/create-organization'
      fullPath: '/create-organization'
      preLoaderRoute: typeof CreateOrganizationRouteImport
      parentRoute: typeof rootRouteImport
    }
    '/office': {
      id: '/office'
      path: '/office'
      fullPath: '/office'
      preLoaderRoute: typeof OfficeRouteRouteImport
      parentRoute: typeof rootRouteImport
    }
    '/app': {
      id: '/app'
      path: '/app'
      fullPath: '/app'
      preLoaderRoute: typeof AppRouteRouteImport
      parentRoute: typeof rootRouteImport
    }
    '/': {
      id: '/'
      path: '/'
      fullPath: '/'
      preLoaderRoute: typeof IndexRouteImport
      parentRoute: typeof rootRouteImport
    }
    '/office/': {
      id: '/office/'
      path: '/'
      fullPath: '/office/'
      preLoaderRoute: typeof OfficeIndexRouteImport
      parentRoute: typeof OfficeRouteRoute
    }
    '/app/': {
      id: '/app/'
      path: '/'
      fullPath: '/app/'
      preLoaderRoute: typeof AppIndexRouteImport
      parentRoute: typeof AppRouteRoute
    }
    '/app/members': {
      id: '/app/members'
      path: '/members'
      fullPath: '/app/members'
      preLoaderRoute: typeof AppMembersRouteImport
      parentRoute: typeof AppRouteRoute
    }
    '/app/invitations': {
      id: '/app/invitations'
      path: '/invitations'
      fullPath: '/app/invitations'
      preLoaderRoute: typeof AppInvitationsRouteImport
      parentRoute: typeof AppRouteRoute
    }
    '/app/products/': {
      id: '/app/products/'
      path: '/products'
      fullPath: '/app/products'
      preLoaderRoute: typeof AppProductsIndexRouteImport
      parentRoute: typeof AppRouteRoute
    }
    '/office/products/categories': {
      id: '/office/products/categories'
      path: '/products/categories'
      fullPath: '/office/products/categories'
      preLoaderRoute: typeof OfficeProductsCategoriesRouteImport
      parentRoute: typeof OfficeRouteRoute
    }
    '/app/products/types': {
      id: '/app/products/types'
      path: '/products/types'
      fullPath: '/app/products/types'
      preLoaderRoute: typeof AppProductsTypesRouteImport
      parentRoute: typeof AppRouteRoute
    }
  }
}

interface AppRouteRouteChildren {
  AppInvitationsRoute: typeof AppInvitationsRoute
  AppMembersRoute: typeof AppMembersRoute
  AppIndexRoute: typeof AppIndexRoute
  AppProductsTypesRoute: typeof AppProductsTypesRoute
  AppProductsIndexRoute: typeof AppProductsIndexRoute
}

const AppRouteRouteChildren: AppRouteRouteChildren = {
  AppInvitationsRoute: AppInvitationsRoute,
  AppMembersRoute: AppMembersRoute,
  AppIndexRoute: AppIndexRoute,
  AppProductsTypesRoute: AppProductsTypesRoute,
  AppProductsIndexRoute: AppProductsIndexRoute,
}

const AppRouteRouteWithChildren = AppRouteRoute._addFileChildren(
  AppRouteRouteChildren,
)

interface OfficeRouteRouteChildren {
  OfficeIndexRoute: typeof OfficeIndexRoute
  OfficeProductsCategoriesRoute: typeof OfficeProductsCategoriesRoute
}

const OfficeRouteRouteChildren: OfficeRouteRouteChildren = {
  OfficeIndexRoute: OfficeIndexRoute,
  OfficeProductsCategoriesRoute: OfficeProductsCategoriesRoute,
}

const OfficeRouteRouteWithChildren = OfficeRouteRoute._addFileChildren(
  OfficeRouteRouteChildren,
)

const rootRouteChildren: RootRouteChildren = {
  IndexRoute: IndexRoute,
  AppRouteRoute: AppRouteRouteWithChildren,
  OfficeRouteRoute: OfficeRouteRouteWithChildren,
  CreateOrganizationRoute: CreateOrganizationRoute,
  LoginRoute: LoginRoute,
  SignupRoute: SignupRoute,
  VerifyEmailRoute: VerifyEmailRoute,
}
export const routeTree = rootRouteImport
  ._addFileChildren(rootRouteChildren)
  ._addFileTypes<FileRouteTypes>()
