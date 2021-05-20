import Firebase from '@react-native-firebase/app';
import '@react-native-firebase/analytics';

const Analytics = Firebase.analytics();

if (process.env.NODE_ENV === 'production') {
  Analytics.setAnalyticsCollectionEnabled(true);
} else {
  Analytics.setAnalyticsCollectionEnabled(false);
}

export default class AnalyticsService {
  static async logEvent(
    event: string,
    params?: Record<string, any>,
  ): Promise<void> {
    await Analytics.logEvent(event, params);
  }

  static async logScreen(
    screen_name: string,
    screen_class?: string,
  ): Promise<void> {
    await Analytics.logScreenView({ screen_name, screen_class });
  }

  static async logLogin(method: string): Promise<void> {
    await Analytics.logLogin({ method });
  }

  static async logSearch(search_term: string): Promise<void> {
    await Analytics.logSearch({ search_term });
  }

  static async logTutorialBegin(): Promise<void> {
    await Analytics.logTutorialBegin();
  }

  static async logTutorialComplete(): Promise<void> {
    await Analytics.logTutorialComplete();
  }

  static async setUserId(userId: string): Promise<void> {
    await Analytics.setUserId(userId);
  }

  static async setUserProperties(
    name: string,
    value: string | null,
  ): Promise<void> {
    if (name) await Analytics.setUserProperty(name, value);
  }

  static async clear(): Promise<void> {
    await Analytics.resetAnalyticsData();
  }
}
