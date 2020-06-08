import { useContext } from 'react';
import SettingsContext from 'client/context/SettingsContext';

export default function useSettings() {
  const context = useContext(SettingsContext);

  return context;
}
