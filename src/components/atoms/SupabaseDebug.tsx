import React, { useState } from 'react';
import { View, Text, TouchableOpacity, StyleSheet } from 'react-native';
import { supabase } from '../../config/supabase';
import { toastService } from '../../services/toastService';
import Icon from 'react-native-vector-icons/Ionicons';

const SupabaseDebug: React.FC = () => {
  const [isLoading, setIsLoading] = useState(false);
  const [debugInfo, setDebugInfo] = useState<string>('');

  const testConnection = async () => {
    setIsLoading(true);
    setDebugInfo('Testing connection...');

    try {
      console.log('🔍 Testing Supabase connection...');
      
      // Test basic connection
      const { data, error } = await supabase
        .from('auth.users')
        .select('count')
        .limit(1);

      if (error) {
        console.log('❌ Connection test error:', error);
        setDebugInfo(`Connection Error: ${error.message}`);
        toastService.showError('Connection Failed', error.message);
      } else {
        console.log('✅ Connection successful:', data);
        setDebugInfo('Connection successful!');
        toastService.showSuccess('Connection OK', 'Supabase connection working');
      }
    } catch (error: any) {
      console.log('🚨 Connection exception:', error);
      setDebugInfo(`Exception: ${error.message}`);
      toastService.showError('Connection Exception', error.message);
    } finally {
      setIsLoading(false);
    }
  };

  const testSignUp = async () => {
    setIsLoading(true);
    setDebugInfo('Testing signup...');

    try {
      console.log('🔍 Testing signup with dummy data...');
      
      const testEmail = `test_${Date.now()}@example.com`;
      const testPassword = 'testpassword123';
      
      const { data, error } = await supabase.auth.signUp({
        email: testEmail,
        password: testPassword,
        options: {
          data: {
            name: 'Test User',
          },
        },
      });

      if (error) {
        console.log('❌ SignUp test error:', error);
        setDebugInfo(`SignUp Error: ${error.message}`);
        toastService.showAuthError(error);
      } else {
        console.log('✅ SignUp test successful:', data);
        setDebugInfo('SignUp test successful!');
        toastService.showSuccess('SignUp OK', 'Registration is working');
        
        // Clean up test user if created
        if (data.user) {
          console.log('🧹 Cleaning up test user...');
        }
      }
    } catch (error: any) {
      console.log('🚨 SignUp exception:', error);
      setDebugInfo(`Exception: ${error.message}`);
      toastService.showError('SignUp Exception', error.message);
    } finally {
      setIsLoading(false);
    }
  };

  const checkAuthSettings = async () => {
    setIsLoading(true);
    setDebugInfo('Checking auth settings...');

    try {
      console.log('🔍 Checking Supabase auth settings...');
      
      // This will fail but give us info about the setup
      const { data, error } = await supabase.auth.getUser();
      
      console.log('Auth check result:', { data, error });
      
      const info = [
        `URL: ${supabase.supabaseUrl}`,
        `Key: ${supabase.supabaseKey.substring(0, 20)}...`,
        `User: ${data?.user ? 'Logged in' : 'Not logged in'}`,
        `Error: ${error ? error.message : 'None'}`,
      ];
      
      setDebugInfo(info.join('\n'));
      toastService.showInfo('Auth Settings', 'Check console for details');
      
    } catch (error: any) {
      console.log('🚨 Auth check exception:', error);
      setDebugInfo(`Exception: ${error.message}`);
      toastService.showError('Auth Check Failed', error.message);
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <View style={styles.container}>
      <Text style={styles.title}>🔍 Supabase Debug</Text>
      <Text style={styles.subtitle}>Test Supabase connection & auth:</Text>
      
      <View style={styles.buttonGrid}>
        <TouchableOpacity
          style={[styles.debugButton, isLoading && styles.disabled]}
          onPress={testConnection}
          disabled={isLoading}
        >
          <Icon name="wifi" size={20} color="#00bcd4" />
          <Text style={styles.buttonText}>Test Connection</Text>
        </TouchableOpacity>

        <TouchableOpacity
          style={[styles.debugButton, isLoading && styles.disabled]}
          onPress={testSignUp}
          disabled={isLoading}
        >
          <Icon name="person-add" size={20} color="#22c55e" />
          <Text style={styles.buttonText}>Test SignUp</Text>
        </TouchableOpacity>

        <TouchableOpacity
          style={[styles.debugButton, isLoading && styles.disabled]}
          onPress={checkAuthSettings}
          disabled={isLoading}
        >
          <Icon name="settings" size={20} color="#f59e0b" />
          <Text style={styles.buttonText}>Check Auth</Text>
        </TouchableOpacity>
      </View>

      {debugInfo && (
        <View style={styles.infoBox}>
          <Text style={styles.infoText}>{debugInfo}</Text>
        </View>
      )}
    </View>
  );
};

export default SupabaseDebug;

const styles = StyleSheet.create({
  container: {
    backgroundColor: 'rgba(255,255,255,0.06)',
    margin: 16,
    padding: 16,
    borderRadius: 12,
    borderWidth: 1,
    borderColor: 'rgba(255,255,255,0.1)',
  },
  title: {
    fontSize: 18,
    fontWeight: 'bold',
    color: '#fff',
    marginBottom: 4,
  },
  subtitle: {
    fontSize: 14,
    color: '#aaa',
    marginBottom: 16,
  },
  buttonGrid: {
    flexDirection: 'row',
    flexWrap: 'wrap',
    gap: 8,
  },
  debugButton: {
    backgroundColor: 'rgba(255,255,255,0.1)',
    paddingHorizontal: 16,
    paddingVertical: 12,
    borderRadius: 8,
    flexDirection: 'row',
    alignItems: 'center',
    minWidth: '30%',
    marginBottom: 8,
  },
  disabled: {
    opacity: 0.5,
  },
  buttonText: {
    color: '#fff',
    fontSize: 12,
    marginLeft: 8,
    flex: 1,
  },
  infoBox: {
    backgroundColor: 'rgba(0,0,0,0.3)',
    padding: 12,
    borderRadius: 8,
    marginTop: 16,
  },
  infoText: {
    color: '#ccc',
    fontSize: 12,
    fontFamily: 'monospace',
  },
}); 