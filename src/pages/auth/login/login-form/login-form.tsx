// This file has been refactored to follow MVVM pattern
// The component has been split into:
// - login-form.viewmodel.ts: Contains all business logic and state management
// - login-form.view.tsx: Contains only UI rendering
// - index.ts: Exports the main component for backward compatibility

export { LoginFormView as LoginForm } from './login-form.view'
export { useLoginFormViewModel } from './login-form.viewmodel'
export type { LoginFormValues } from './login-form.viewmodel'  
