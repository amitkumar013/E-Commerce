import { useState, useEffect } from 'react';
import { 
  Sun, 
  Moon, 
  Settings, 
  Bell, 
  Globe,
  Shield,
  Mail,
  Smartphone,
  ChevronRight
} from 'lucide-react';
import { Link } from 'react-router-dom';
import { Button } from '@/components/ui/button';

interface NotificationSettings {
  email: boolean;
  push: boolean;
  marketing: boolean;
}

interface UserPreferences {
  language: string;
  timezone: string;
}

function SettingPage() {
  const [isDarkMode, setIsDarkMode] = useState(() => {
    const savedTheme = localStorage.getItem('theme');
    return savedTheme === 'dark' || (!savedTheme && window.matchMedia('(prefers-color-scheme: dark)').matches);
  });

  const [notifications, setNotifications] = useState<NotificationSettings>({
    email: true,
    push: true,
    marketing: false,
  });

  const [preferences, setPreferences] = useState<UserPreferences>({
    language: 'English',
    timezone: Intl.DateTimeFormat().resolvedOptions().timeZone,
  });

  useEffect(() => {
    if (isDarkMode) {
      document.documentElement.classList.add('dark');
      localStorage.setItem('theme', 'dark');
    } else {
      document.documentElement.classList.remove('dark');
      localStorage.setItem('theme', 'light');
    }
  }, [isDarkMode]);

  const languages = ['English', 'Spanish', 'French', 'German', 'Japanese'];

  const SettingsSection = ({ icon: Icon, title, children }: any) => (
    <div className="border-b border-gray-200 dark:border-gray-700 last:border-0 py-6 first:pt-0">
      <div className="flex items-center space-x-3 mb-4">
        <Icon className="h-5 w-5 text-gray-600 dark:text-gray-300" />
        <h2 className="text-lg font-semibold text-gray-900 dark:text-white">{title}</h2>
      </div>
      {children}
    </div>
  );

  const Toggle = ({ enabled, onChange }: { enabled: boolean; onChange: () => void }) => (
    <Button
      onClick={onChange}
      className={`relative inline-flex h-6 w-11 flex-shrink-0 cursor-pointer rounded-full border-2 border-transparent transition-colors duration-200 ease-in-out focus:outline-none focus:ring-2 focus:ring-indigo-500 focus:ring-offset-2 ${
        enabled ? 'bg-indigo-600' : 'bg-gray-200 dark:bg-gray-700'
      }`}
    >
      <span className="sr-only">Toggle setting</span>
      <span
        className={`pointer-events-none inline-block h-5 w-5 transform rounded-full bg-white shadow ring-0 transition duration-200 ease-in-out ${
          enabled ? 'translate-x-5' : 'translate-x-0'
        }`}
      />
    </Button>
  );

  return (
    <div className="min-h-screen bg-gray-50 dark:bg-gray-900 transition-colors duration-200">
      <div className="max-w-4xl mx-auto p-4 md:p-8">
        <div className="flex items-center justify-between mb-8">
          <div className="flex items-center space-x-3">
            <Settings className="h-6 w-6 text-gray-900 dark:text-white" />
            <h1 className="text-2xl md:text-3xl font-bold text-gray-900 dark:text-white">Settings</h1>
          </div>
        </div>

        <div className="bg-white dark:bg-gray-800 rounded-lg shadow-md">
          <div className="p-6 space-y-6">
            <SettingsSection icon={Sun} title="Appearance">
              <div className="flex items-center justify-between">
                <div className="flex items-center space-x-3">
                  {isDarkMode ? (
                    <Moon className="h-5 w-5 text-gray-600 dark:text-gray-300" />
                  ) : (
                    <Sun className="h-5 w-5 text-gray-600 dark:text-gray-300" />
                  )}
                  <div>
                    <p className="text-sm font-medium text-gray-900 dark:text-white">Theme</p>
                    <p className="text-sm text-gray-500 dark:text-gray-400">
                      {isDarkMode ? 'Dark mode is enabled' : 'Light mode is enabled'}
                    </p>
                  </div>
                </div>
                <Toggle enabled={isDarkMode} onChange={() => setIsDarkMode(!isDarkMode)} />
              </div>
            </SettingsSection>

            <SettingsSection icon={Bell} title="Notifications">
              <div className="space-y-4">
                <div className="flex items-center justify-between">
                  <div className="flex items-center space-x-3">
                    <Mail className="h-5 w-5 text-gray-600 dark:text-gray-300" />
                    <div>
                      <p className="text-sm font-medium text-gray-900 dark:text-white">Email notifications</p>
                      <p className="text-sm text-gray-500 dark:text-gray-400">Receive email updates</p>
                    </div>
                  </div>
                  <Toggle 
                    enabled={notifications.email}
                    onChange={() => setNotifications({ ...notifications, email: !notifications.email })}
                  />
                </div>

                <div className="flex items-center justify-between">
                  <div className="flex items-center space-x-3">
                    <Smartphone className="h-5 w-5 text-gray-600 dark:text-gray-300" />
                    <div>
                      <p className="text-sm font-medium text-gray-900 dark:text-white">Push notifications</p>
                      <p className="text-sm text-gray-500 dark:text-gray-400">Receive push notifications</p>
                    </div>
                  </div>
                  <Toggle 
                    enabled={notifications.push}
                    onChange={() => setNotifications({ ...notifications, push: !notifications.push })}
                  />
                </div>

                <div className="flex items-center justify-between">
                  <div className="flex items-center space-x-3">
                    <Mail className="h-5 w-5 text-gray-600 dark:text-gray-300" />
                    <div>
                      <p className="text-sm font-medium text-gray-900 dark:text-white">Marketing emails</p>
                      <p className="text-sm text-gray-500 dark:text-gray-400">Receive marketing updates</p>
                    </div>
                  </div>
                  <Toggle 
                    enabled={notifications.marketing}
                    onChange={() => setNotifications({ ...notifications, marketing: !notifications.marketing })}
                  />
                </div>
              </div>
            </SettingsSection>

            <SettingsSection icon={Globe} title="Language & Region">
              <div className="space-y-4">
                <div className="flex items-center justify-between">
                  <div>
                    <p className="text-sm font-medium text-gray-900 dark:text-white">Language</p>
                    <p className="text-sm text-gray-500 dark:text-gray-400">Select your preferred language</p>
                  </div>
                  <select
                    value={preferences.language}
                    onChange={(e) => setPreferences({ ...preferences, language: e.target.value })}
                    className="mt-1 block w-40 rounded-md border-gray-300 dark:border-gray-600 bg-white dark:bg-gray-700 py-2 pl-3 pr-10 text-base focus:border-indigo-500 focus:outline-none focus:ring-indigo-500 dark:text-white sm:text-sm"
                  >
                    {languages.map((lang) => (
                      <option key={lang} value={lang}>{lang}</option>
                    ))}
                  </select>
                </div>

                <div className="flex items-center justify-between">
                  <div>
                    <p className="text-sm font-medium text-gray-900 dark:text-white">Time Zone</p>
                    <p className="text-sm text-gray-500 dark:text-gray-400">{preferences.timezone}</p>
                  </div>
                  <ChevronRight className="h-5 w-5 text-gray-400" />
                </div>
              </div>
            </SettingsSection>

            <SettingsSection icon={Shield} title="Privacy & Security">
              <div className="space-y-4">
                <Button className="w-full flex items-center justify-between text-left py-2 px-3 rounded-lg hover:bg-gray-100 dark:hover:bg-gray-700">
                  <Link to={"/admin/profile"} className="flex items-center space-x-3">
                    <p className="text-sm font-medium text-gray-900 dark:text-white">Password</p>
                    <p className="text-sm text-gray-500 dark:text-gray-400">Change your password</p>
                  </Link>
                  <ChevronRight className="h-5 w-5 text-gray-400" />
                </Button>
              </div>
            </SettingsSection>
          </div>
        </div>
      </div>
    </div>
  );
}

export default SettingPage;