import React from 'react';
import Navigation from './src/navigation';
import { AuthProvider } from './src/contexts/AuthContext';
import Toast from 'react-native-toast-message';
import { CustomToast } from './src/components/atoms/CustomToast';

// Custom toast config dengan design konsisten
const toastConfig = {
  success: ({ text1, text2, ...rest }: any) => (
    <CustomToast type="success" text1={text1} text2={text2} {...rest} />
  ),
  error: ({ text1, text2, ...rest }: any) => (
    <CustomToast type="error" text1={text1} text2={text2} {...rest} />
  ),
  info: ({ text1, text2, ...rest }: any) => (
    <CustomToast type="info" text1={text1} text2={text2} {...rest} />
  ),
  warning: ({ text1, text2, ...rest }: any) => (
    <CustomToast type="warning" text1={text1} text2={text2} {...rest} />
  ),
};

export default function App() {
  return (
    <AuthProvider>
      <Navigation />
      <Toast 
        config={toastConfig}
        position="top"
        topOffset={50}
      />
    </AuthProvider>
  );
}
