import { configureStore } from '@reduxjs/toolkit';
import contentReducer from '../features/content/contentSlice';
import authReducer from '../features/auth/authSlice';
import contactReducer from '../features/contacts/contactSlice';
import quoteReducer from '../features/quotes/quoteSlice';
import newsletterReducer from '../features/newsletter/newsletterSlice';

export const store = configureStore({
  reducer: {
    content: contentReducer,
    auth: authReducer,
    contacts: contactReducer,
    quotes: quoteReducer,
    newsletter: newsletterReducer
  },
});
