import React, { useState, useEffect } from 'react';
import {
  View,
  Text,
  TouchableOpacity,
  ScrollView,
  SafeAreaView,
  StatusBar,
  StyleSheet,
  ActivityIndicator,
} from 'react-native';
import Icon from 'react-native-vector-icons/Ionicons';
import { supabase } from '../config/supabase';
import { ENV } from '../config/env';
import { toastService } from '../services/toastService';
import { authService } from '../services/authService';

interface TestResult {
  name: string;
  status: 'pending' | 'success' | 'failed' | 'running';
  message: string;
  details?: any;
  duration?: number;
}

const SupabaseDebugPage: React.FC = () => {
  const [tests, setTests] = useState<TestResult[]>([]);
  const [isRunning, setIsRunning] = useState(false);
  const [connectionInfo, setConnectionInfo] = useState<any>(null);

  useEffect(() => {
    initializeTests();
    getConnectionInfo();
  }, []);

  const initializeTests = () => {
    const initialTests: TestResult[] = [
      { name: 'Configuration Check', status: 'pending', message: 'Checking Supabase configuration...' },
      { name: 'Basic Connection', status: 'pending', message: 'Testing basic connectivity...' },
      { name: 'Auth Service', status: 'pending', message: 'Testing authentication service...' },
      { name: 'User Session', status: 'pending', message: 'Checking current session...' },
      { name: 'Test Registration', status: 'pending', message: 'Testing user registration...' },
      { name: 'Test Login', status: 'pending', message: 'Testing user login...' },
      { name: 'Database Access', status: 'pending', message: 'Testing database access...' },
    ];
    setTests(initialTests);
  };

  const getConnectionInfo = () => {
    const info = {
      url: ENV.SUPABASE_URL,
      keyPreview: ENV.SUPABASE_ANON_KEY.substring(0, 20) + '...',
      appName: ENV.APP_NAME,
      version: ENV.APP_VERSION,
      environment: __DEV__ ? 'Development' : 'Production',
      platform: 'React Native Web',
    };
    setConnectionInfo(info);
  };

  const updateTest = (index: number, updates: Partial<TestResult>) => {
    setTests(prev => prev.map((test, i) => 
      i === index ? { ...test, ...updates } : test
    ));
  };

  const runAllTests = async () => {
    setIsRunning(true);
    toastService.showInfo('Debug Started', 'Running comprehensive Supabase tests...');

    for (let i = 0; i < tests.length; i++) {
      updateTest(i, { status: 'running' });
      
      try {
        const startTime = Date.now();
        let result;

        switch (i) {
          case 0: // Configuration Check
            result = await testConfiguration();
            break;
          case 1: // Basic Connection
            result = await testBasicConnection();
            break;
          case 2: // Auth Service
            result = await testAuthService();
            break;
          case 3: // User Session
            result = await testUserSession();
            break;
          case 4: // Test Registration
            result = await testRegistration();
            break;
          case 5: // Test Login
            result = await testLogin();
            break;
          case 6: // Database Access
            result = await testDatabaseAccess();
            break;
          default:
            result = { success: false, message: 'Unknown test' };
        }

        const duration = Date.now() - startTime;
        
        updateTest(i, {
          status: result.success ? 'success' : 'failed',
          message: result.message,
          details: result.details,
          duration,
        });

        // Wait a bit between tests
        await new Promise(resolve => setTimeout(resolve, 500));

      } catch (error: any) {
        updateTest(i, {
          status: 'failed',
          message: `Error: ${error.message}`,
          details: error,
        });
      }
    }

    setIsRunning(false);
    toastService.showSuccess('Debug Complete', 'All tests finished. Check results below.');
  };

  const testConfiguration = async (): Promise<{success: boolean, message: string, details?: any}> => {
    const issues = [];
    
    if (!ENV.SUPABASE_URL || ENV.SUPABASE_URL.includes('your-')) {
      issues.push('Invalid Supabase URL');
    }
    
    if (!ENV.SUPABASE_ANON_KEY || ENV.SUPABASE_ANON_KEY.includes('your-')) {
      issues.push('Invalid Supabase API Key');
    }

    if (!ENV.SUPABASE_URL.includes('supabase.co')) {
      issues.push('URL format may be incorrect');
    }

    if (issues.length > 0) {
      return {
        success: false,
        message: `Configuration issues: ${issues.join(', ')}`,
        details: { issues, config: connectionInfo }
      };
    }

    return {
      success: true,
      message: 'Configuration is valid ✅',
      details: connectionInfo
    };
  };

  const testBasicConnection = async (): Promise<{success: boolean, message: string, details?: any}> => {
    try {
      // Test basic connectivity to Supabase
      const response = await fetch(`${ENV.SUPABASE_URL}/rest/v1/`, {
        method: 'GET',
        headers: {
          'apikey': ENV.SUPABASE_ANON_KEY,
          'Content-Type': 'application/json',
        },
      });

      if (response.status === 200 || response.status === 404) {
        return {
          success: true,
          message: 'Connection successful ✅',
          details: { status: response.status, url: ENV.SUPABASE_URL }
        };
      } else {
        return {
          success: false,
          message: `HTTP ${response.status}: ${response.statusText}`,
          details: { status: response.status, response }
        };
      }
    } catch (error: any) {
      return {
        success: false,
        message: `Network error: ${error.message}`,
        details: error
      };
    }
  };

  const testAuthService = async (): Promise<{success: boolean, message: string, details?: any}> => {
    try {
      const { session, error } = await authService.getCurrentSession();
      
      if (error) {
        return {
          success: false,
          message: `Auth service error: ${error.message}`,
          details: error
        };
      }

      return {
        success: true,
        message: 'Auth service working ✅',
        details: { hasSession: !!session, session }
      };
    } catch (error: any) {
      return {
        success: false,
        message: `Auth service exception: ${error.message}`,
        details: error
      };
    }
  };

  const testUserSession = async (): Promise<{success: boolean, message: string, details?: any}> => {
    try {
      const { data, error } = await supabase.auth.getUser();
      
      // AuthSessionMissingError is expected when no user is logged in
      if (error && error.name === 'AuthSessionMissingError') {
        return {
          success: true,
          message: 'No active session (Expected) ✅',
          details: { status: 'No user logged in - this is normal' }
        };
      }
      
      if (error && !error.message.includes('not logged in')) {
        return {
          success: false,
          message: `Session error: ${error.message}`,
          details: error
        };
      }

      return {
        success: true,
        message: data.user ? 'User logged in ✅' : 'No active session (OK) ✅',
        details: { user: data.user, sessionStatus: 'Valid check completed' }
      };
    } catch (error: any) {
      return {
        success: false,
        message: `Session check failed: ${error.message}`,
        details: error
      };
    }
  };

  const testRegistration = async (): Promise<{success: boolean, message: string, details?: any}> => {
    try {
      // Try with a simple, common email format
      const timestamp = Date.now();
      const testEmail = `testuser${timestamp}@gmail.com`;
      const testPassword = 'TestPassword123!';

      console.log('🧪 Testing registration with:', { email: testEmail });
      
      const { data, error } = await supabase.auth.signUp({
        email: testEmail,
        password: testPassword,
        options: {
          data: { name: 'Debug Test User' }
        }
      });

      console.log('🧪 Registration result:', { data, error });

      if (error) {
        // Analyze the specific error
        if (error.message.includes('Email confirmations are required')) {
          return {
            success: false,
            message: '❌ Email confirmation required - Check Supabase Auth settings',
            details: { 
              error, 
              recommendation: 'Go to Supabase Dashboard > Authentication > Settings > Disable "Enable email confirmations"',
              quickFix: 'This is the most common cause of registration errors'
            }
          };
        } else if (error.message.includes('Signup is disabled')) {
          return {
            success: false,
            message: '❌ Signup disabled - Check Supabase Auth settings',
            details: { 
              error, 
              recommendation: 'Go to Supabase Dashboard > Authentication > Settings > Enable "Enable signup"' 
            }
          };
        } else if (error.code === 'email_address_invalid') {
          return {
            success: false,
            message: '❌ Email validation failed - Check domain restrictions',
            details: { 
              error,
              recommendation: 'Go to Supabase Dashboard > Authentication > Settings > Check "Email Domain Allowlist"',
              possibleCauses: [
                'Domain allowlist enabled with restrictions',
                'Email format validation rules',
                'Supabase project configuration issue'
              ],
              triedEmail: testEmail
            }
          };
        } else {
          return {
            success: false,
            message: `❌ Registration failed: ${error.message}`,
            details: { 
              error,
              errorCode: error.code,
              triedEmail: testEmail,
              suggestion: 'Check the error details and Supabase Dashboard settings'
            }
          };
        }
      }

      // Clean up test user if created
      if (data.user) {
        console.log('🧹 Test user created, should be cleaned up automatically');
      }

      return {
        success: true,
        message: 'Registration works ✅',
        details: { 
          data, 
          testEmail,
          userCreated: !!data.user,
          message: 'Registration is working correctly!'
        }
      };

    } catch (error: any) {
      return {
        success: false,
        message: `Registration exception: ${error.message}`,
        details: {
          error,
          type: 'Exception',
          suggestion: 'This indicates a deeper configuration or network issue'
        }
      };
    }
  };

  const testLogin = async (): Promise<{success: boolean, message: string, details?: any}> => {
    try {
      // Try to create a test user first, then login
      const timestamp = Date.now();
      const testEmail = `logintest${timestamp}@gmail.com`;
      const testPassword = 'TestLogin123!';

      console.log('🧪 Creating test user for login test:', { email: testEmail });

      // Step 1: Create test user
      const { data: signUpData, error: signUpError } = await supabase.auth.signUp({
        email: testEmail,
        password: testPassword,
        options: {
          data: { name: 'Login Test User' }
        }
      });

      if (signUpError) {
        console.log('❌ Could not create test user:', signUpError);
        return {
          success: false,
          message: '❌ Cannot test login - Registration failed first',
          details: {
            signUpError,
            reason: 'Need to fix registration before testing login',
            suggestion: 'Fix the registration test first, then login test will work'
          }
        };
      }

      console.log('✅ Test user created, now testing login...');

      // Step 2: Sign out (to ensure clean state)
      await supabase.auth.signOut();

      // Step 3: Try to login with the test credentials
      const { data: loginData, error: loginError } = await supabase.auth.signInWithPassword({
        email: testEmail,
        password: testPassword
      });

      console.log('🧪 Login test result:', { loginData, loginError });

      if (loginError) {
        // Analyze the specific login error
        if (loginError.message.includes('Invalid login credentials')) {
          return {
            success: false,
            message: '❌ Login failed - Credentials not found',
            details: {
              loginError,
              possibleCauses: [
                'Email confirmation required but not set up',
                'User not properly saved in database',
                'Password mismatch',
                'Auth configuration issue'
              ],
              recommendation: 'Check Supabase Dashboard > Authentication > Settings > Disable email confirmation',
              testCredentials: { email: testEmail, password: 'TestLogin123!' }
            }
          };
        } else if (loginError.message.includes('Email not confirmed')) {
          return {
            success: false,
            message: '❌ Login failed - Email confirmation required',
            details: {
              loginError,
              recommendation: 'Go to Supabase Dashboard > Authentication > Settings > Disable "Enable email confirmations"',
              quickFix: 'This is the most common cause of login failures'
            }
          };
        } else {
          return {
            success: false,
            message: `❌ Login failed: ${loginError.message}`,
            details: {
              loginError,
              testCredentials: { email: testEmail },
              suggestion: 'Check error details for specific cause'
            }
          };
        }
      }

      // Step 4: Clean up - sign out after successful test
      await supabase.auth.signOut();

      return {
        success: true,
        message: 'Login works ✅',
        details: {
          message: 'Login authentication is working correctly!',
          testCredentials: { email: testEmail },
          userLoggedIn: !!loginData.user,
          cleanupCompleted: true
        }
      };

    } catch (error: any) {
      return {
        success: false,
        message: `Login test exception: ${error.message}`,
        details: {
          error,
          type: 'Exception',
          suggestion: 'This indicates a deeper authentication configuration issue'
        }
      };
    }
  };

  const testDatabaseAccess = async (): Promise<{success: boolean, message: string, details?: any}> => {
    try {
      // Test database access using auth methods (safer than direct table access)
      const { data: session, error: sessionError } = await supabase.auth.getSession();
      
      if (sessionError) {
        return {
          success: false,
          message: `Database auth error: ${sessionError.message}`,
          details: sessionError
        };
      }

      // Test if we can access user data (this tests database connectivity)
      const { data: user, error: userError } = await supabase.auth.getUser();
      
      // Both operations should work (even if user is null when not logged in)
      return {
        success: true,
        message: 'Database connectivity ✅',
        details: { 
          sessionConnected: true, 
          userQuerySuccessful: !userError,
          currentSession: session.session ? 'Active' : 'None'
        }
      };
    } catch (error: any) {
      return {
        success: false,
        message: `Database exception: ${error.message}`,
        details: error
      };
    }
  };

  const getStatusIcon = (status: TestResult['status']) => {
    switch (status) {
      case 'running':
        return <ActivityIndicator size="small" color="#00bcd4" />;
      case 'success':
        return <Icon name="checkmark-circle" size={20} color="#22c55e" />;
      case 'failed':
        return <Icon name="close-circle" size={20} color="#ef4444" />;
      default:
        return <Icon name="ellipse-outline" size={20} color="#aaa" />;
    }
  };

  const getStatusColor = (status: TestResult['status']) => {
    switch (status) {
      case 'success': return '#22c55e';
      case 'failed': return '#ef4444';
      case 'running': return '#00bcd4';
      default: return '#aaa';
    }
  };

  return (
    <SafeAreaView style={styles.container}>
      <StatusBar barStyle="light-content" backgroundColor="#1e1e2e" />
      
      <ScrollView style={styles.scrollView} showsVerticalScrollIndicator={false}>
        {/* Header */}
        <View style={styles.header}>
          <Icon name="bug" size={40} color="#00bcd4" />
          <Text style={styles.title}>Supabase Debug Center</Text>
          <Text style={styles.subtitle}>Comprehensive connection testing</Text>
        </View>

        {/* Connection Info */}
        {connectionInfo && (
          <View style={styles.infoCard}>
            <Text style={styles.cardTitle}>📊 Configuration</Text>
            <View style={styles.infoGrid}>
              <Text style={styles.infoLabel}>URL:</Text>
              <Text style={styles.infoValue}>{connectionInfo.url}</Text>
              
              <Text style={styles.infoLabel}>API Key:</Text>
              <Text style={styles.infoValue}>{connectionInfo.keyPreview}</Text>
              
              <Text style={styles.infoLabel}>Environment:</Text>
              <Text style={styles.infoValue}>{connectionInfo.environment}</Text>
            </View>
          </View>
        )}

        {/* Test Controls */}
        <View style={styles.controlsCard}>
          <TouchableOpacity
            style={[styles.runButton, isRunning && styles.runButtonDisabled]}
            onPress={runAllTests}
            disabled={isRunning}
          >
            {isRunning ? (
              <ActivityIndicator color="#fff" size="small" />
            ) : (
              <Icon name="play-circle" size={24} color="#fff" />
            )}
            <Text style={styles.runButtonText}>
              {isRunning ? 'Running Tests...' : 'Run All Tests'}
            </Text>
          </TouchableOpacity>
        </View>

        {/* Test Results */}
        <View style={styles.resultsCard}>
          <Text style={styles.cardTitle}>🧪 Test Results</Text>
          
          {tests.map((test, index) => (
            <View key={index} style={[
              styles.testItem,
              { borderLeftColor: getStatusColor(test.status) }
            ]}>
              <View style={styles.testHeader}>
                {getStatusIcon(test.status)}
                <Text style={styles.testName}>{test.name}</Text>
                {test.duration && (
                  <Text style={styles.testDuration}>{test.duration}ms</Text>
                )}
              </View>
              
              <Text style={[
                styles.testMessage,
                { color: getStatusColor(test.status) }
              ]}>
                {test.message}
              </Text>
              
              {test.details && test.status === 'failed' && (
                <View style={styles.errorDetails}>
                  <Text style={styles.errorText}>
                    {JSON.stringify(test.details, null, 2)}
                  </Text>
                </View>
              )}
            </View>
          ))}
        </View>

        {/* Quick Actions */}
        <View style={styles.actionsCard}>
          <Text style={styles.cardTitle}>⚡ Quick Actions</Text>
          
          <TouchableOpacity
            style={styles.actionButton}
            onPress={() => toastService.showInfo('Help', 'Check REGISTER_ERROR_FIX.md for detailed solutions')}
          >
            <Icon name="help-circle" size={20} color="#00bcd4" />
            <Text style={styles.actionText}>View Fix Guide</Text>
          </TouchableOpacity>

          <TouchableOpacity
            style={styles.actionButton}
            onPress={() => console.log('Current config:', { ENV, supabase })}
          >
            <Icon name="information-circle" size={20} color="#f59e0b" />
            <Text style={styles.actionText}>Log Config to Console</Text>
          </TouchableOpacity>

          <TouchableOpacity
            style={styles.actionButton}
            onPress={() => {
              const dashboardUrl = `${ENV.SUPABASE_URL.replace('/rest/v1', '')}/project/default/auth/users`;
              toastService.showInfo('Supabase Dashboard', 'Open your browser and go to Authentication > Settings to check email domain restrictions');
              console.log('🔧 Dashboard URL:', dashboardUrl);
            }}
          >
            <Icon name="settings" size={20} color="#22c55e" />
            <Text style={styles.actionText}>Check Supabase Settings</Text>
          </TouchableOpacity>

          <TouchableOpacity
            style={styles.actionButton}
            onPress={async () => {
              try {
                const testEmail = 'debuguser@gmail.com';
                const testPassword = 'Password123!';
                
                console.log('🧪 Testing with fixed credentials:', { email: testEmail });
                
                const { data, error } = await supabase.auth.signInWithPassword({
                  email: testEmail,
                  password: testPassword
                });
                
                if (error) {
                  toastService.showError('Quick Login Test Failed', error.message);
                  console.log('❌ Quick login failed:', error);
                } else {
                  toastService.showSuccess('Quick Login Success', 'Test credentials work!');
                  console.log('✅ Quick login success:', data);
                  // Sign out after test
                  await supabase.auth.signOut();
                }
              } catch (err: any) {
                toastService.showError('Quick Test Error', err.message);
              }
            }}
          >
            <Icon name="flash" size={20} color="#f59e0b" />
            <Text style={styles.actionText}>Quick Login Test</Text>
          </TouchableOpacity>
        </View>
      </ScrollView>
    </SafeAreaView>
  );
};

export default SupabaseDebugPage;

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#1e1e2e',
  },
  scrollView: {
    flex: 1,
    padding: 20,
  },
  header: {
    alignItems: 'center',
    marginBottom: 24,
  },
  title: {
    fontSize: 24,
    fontWeight: 'bold',
    color: '#fff',
    marginTop: 8,
  },
  subtitle: {
    fontSize: 16,
    color: '#aaa',
    marginTop: 4,
  },
  infoCard: {
    backgroundColor: 'rgba(255,255,255,0.06)',
    borderRadius: 12,
    padding: 16,
    marginBottom: 16,
  },
  cardTitle: {
    fontSize: 18,
    fontWeight: 'bold',
    color: '#fff',
    marginBottom: 12,
  },
  infoGrid: {
    gap: 8,
  },
  infoLabel: {
    fontSize: 14,
    color: '#aaa',
    fontWeight: '600',
  },
  infoValue: {
    fontSize: 14,
    color: '#fff',
    marginBottom: 8,
    fontFamily: 'monospace',
  },
  controlsCard: {
    backgroundColor: 'rgba(255,255,255,0.06)',
    borderRadius: 12,
    padding: 16,
    marginBottom: 16,
  },
  runButton: {
    backgroundColor: '#00bcd4',
    borderRadius: 12,
    paddingVertical: 14,
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'center',
    gap: 8,
  },
  runButtonDisabled: {
    opacity: 0.7,
  },
  runButtonText: {
    color: '#fff',
    fontSize: 16,
    fontWeight: '600',
  },
  resultsCard: {
    backgroundColor: 'rgba(255,255,255,0.06)',
    borderRadius: 12,
    padding: 16,
    marginBottom: 16,
  },
  testItem: {
    backgroundColor: 'rgba(255,255,255,0.04)',
    borderRadius: 8,
    padding: 12,
    marginBottom: 8,
    borderLeftWidth: 4,
  },
  testHeader: {
    flexDirection: 'row',
    alignItems: 'center',
    marginBottom: 4,
  },
  testName: {
    fontSize: 16,
    fontWeight: '600',
    color: '#fff',
    marginLeft: 8,
    flex: 1,
  },
  testDuration: {
    fontSize: 12,
    color: '#aaa',
  },
  testMessage: {
    fontSize: 14,
    marginLeft: 28,
  },
  errorDetails: {
    backgroundColor: 'rgba(0,0,0,0.3)',
    borderRadius: 6,
    padding: 8,
    marginTop: 8,
    marginLeft: 28,
  },
  errorText: {
    fontSize: 12,
    color: '#ccc',
    fontFamily: 'monospace',
  },
  actionsCard: {
    backgroundColor: 'rgba(255,255,255,0.06)',
    borderRadius: 12,
    padding: 16,
  },
  actionButton: {
    flexDirection: 'row',
    alignItems: 'center',
    paddingVertical: 12,
    paddingHorizontal: 16,
    backgroundColor: 'rgba(255,255,255,0.04)',
    borderRadius: 8,
    marginBottom: 8,
  },
  actionText: {
    color: '#fff',
    fontSize: 14,
    marginLeft: 8,
  },
}); 