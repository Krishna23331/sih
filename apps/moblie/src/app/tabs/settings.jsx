import React, { useState } from 'react';
import { View, Text, ScrollView, TouchableOpacity, Switch } from 'react-native';
import { StatusBar } from 'expo-status-bar';
import { useSafeAreaInsets } from 'react-native-safe-area-context';
import { 
  User, 
  Bell, 
  Shield, 
  Database, 
  Smartphone, 
  HelpCircle, 
  LogOut,
  ChevronRight,
  Moon,
  Wifi
} from 'lucide-react-native';

export default function SettingsScreen() {
  const insets = useSafeAreaInsets();
  const [notifications, setNotifications] = useState(true);
  const [darkMode, setDarkMode] = useState(false);
  const [offlineMode, setOfflineMode] = useState(false);

  const settingsGroups = [
    {
      title: 'Account',
      items: [
        { icon: User, title: 'Profile Settings', subtitle: 'Manage your account details', hasArrow: true },
        { icon: Shield, title: 'Privacy & Security', subtitle: 'Control your privacy settings', hasArrow: true },
      ]
    },
    {
      title: 'App Settings',
      items: [
        { 
          icon: Bell, 
          title: 'Notifications', 
          subtitle: 'Push notifications and alerts',
          hasSwitch: true,
          value: notifications,
          onToggle: setNotifications
        },
        { 
          icon: Moon, 
          title: 'Dark Mode', 
          subtitle: 'Switch to dark theme',
          hasSwitch: true,
          value: darkMode,
          onToggle: setDarkMode
        },
        { 
          icon: Wifi, 
          title: 'Offline Mode', 
          subtitle: 'Work without internet connection',
          hasSwitch: true,
          value: offlineMode,
          onToggle: setOfflineMode
        },
      ]
    },
    {
      title: 'Data & Storage',
      items: [
        { icon: Database, title: 'Data Sync', subtitle: 'Manage data synchronization', hasArrow: true },
        { icon: Smartphone, title: 'Storage Usage', subtitle: 'View app storage details', hasArrow: true },
      ]
    },
    {
      title: 'Support',
      items: [
        { icon: HelpCircle, title: 'Help & Support', subtitle: 'Get help and contact support', hasArrow: true },
      ]
    }
  ];

  const renderSettingItem = (item, index) => (
    <TouchableOpacity
      key={index}
      style={{
        flexDirection: 'row',
        alignItems: 'center',
        paddingVertical: 16,
        paddingHorizontal: 20,
        backgroundColor: '#fff',
        borderBottomWidth: index < settingsGroups.length - 1 ? 1 : 0,
        borderBottomColor: '#F3F4F6'
      }}
    >
      <View style={{
        width: 40,
        height: 40,
        borderRadius: 20,
        backgroundColor: '#F3F4F6',
        alignItems: 'center',
        justifyContent: 'center',
        marginRight: 16
      }}>
        <item.icon size={20} color="#6B7280" />
      </View>
      
      <View style={{ flex: 1 }}>
        <Text style={{ 
          fontSize: 16, 
          fontWeight: '500', 
          color: '#111827',
          marginBottom: 2
        }}>
          {item.title}
        </Text>
        <Text style={{ 
          fontSize: 14, 
          color: '#6B7280' 
        }}>
          {item.subtitle}
        </Text>
      </View>

      {item.hasSwitch && (
        <Switch
          value={item.value}
          onValueChange={item.onToggle}
          trackColor={{ false: '#E5E7EB', true: '#2563EB' }}
          thumbColor={item.value ? '#fff' : '#fff'}
        />
      )}

      {item.hasArrow && (
        <ChevronRight size={20} color="#9CA3AF" />
      )}
    </TouchableOpacity>
  );

  return (
    <View style={{ flex: 1, backgroundColor: '#F9FAFB' }}>
      <StatusBar style="dark" />
      
      {/* Header */}
      <View style={{ 
        backgroundColor: '#fff', 
        paddingTop: insets.top + 20,
        paddingHorizontal: 20,
        paddingBottom: 20,
        borderBottomWidth: 1,
        borderBottomColor: '#E5E7EB'
      }}>
        <Text style={{ 
          fontSize: 28, 
          fontWeight: 'bold', 
          color: '#111827'
        }}>
          Settings
        </Text>
      </View>

      <ScrollView 
        style={{ flex: 1 }} 
        contentContainerStyle={{ 
          paddingTop: 20,
          paddingBottom: insets.bottom + 20 
        }}
        showsVerticalScrollIndicator={false}
      >
        {/* Profile Card */}
        <View style={{
          backgroundColor: '#fff',
          marginHorizontal: 20,
          borderRadius: 12,
          padding: 20,
          marginBottom: 24,
          shadowColor: '#000',
          shadowOffset: { width: 0, height: 2 },
          shadowOpacity: 0.1,
          shadowRadius: 4,
          elevation: 3,
        }}>
          <View style={{ flexDirection: 'row', alignItems: 'center' }}>
            <View style={{
              width: 60,
              height: 60,
              borderRadius: 30,
              backgroundColor: '#2563EB',
              alignItems: 'center',
              justifyContent: 'center',
              marginRight: 16
            }}>
              <Text style={{ 
                fontSize: 24, 
                fontWeight: 'bold', 
                color: '#fff' 
              }}>
                JD
              </Text>
            </View>
            <View style={{ flex: 1 }}>
              <Text style={{ 
                fontSize: 18, 
                fontWeight: '600', 
                color: '#111827',
                marginBottom: 4
              }}>
                John Doe
              </Text>
              <Text style={{ 
                fontSize: 14, 
                color: '#6B7280' 
              }}>
                john.doe@company.com
              </Text>
            </View>
            <TouchableOpacity>
              <ChevronRight size={20} color="#9CA3AF" />
            </TouchableOpacity>
          </View>
        </View>

        {/* Settings Groups */}
        {settingsGroups.map((group, groupIndex) => (
          <View key={groupIndex} style={{ marginBottom: 24 }}>
            <Text style={{ 
              fontSize: 16, 
              fontWeight: '600', 
              color: '#374151',
              marginHorizontal: 20,
              marginBottom: 12
            }}>
              {group.title}
            </Text>
            <View style={{
              backgroundColor: '#fff',
              marginHorizontal: 20,
              borderRadius: 12,
              shadowColor: '#000',
              shadowOffset: { width: 0, height: 2 },
              shadowOpacity: 0.1,
              shadowRadius: 4,
              elevation: 3,
            }}>
              {group.items.map((item, itemIndex) => renderSettingItem(item, itemIndex))}
            </View>
          </View>
        ))}

        {/* Logout Button */}
        <TouchableOpacity style={{
          backgroundColor: '#fff',
          marginHorizontal: 20,
          borderRadius: 12,
          padding: 20,
          flexDirection: 'row',
          alignItems: 'center',
          justifyContent: 'center',
          shadowColor: '#000',
          shadowOffset: { width: 0, height: 2 },
          shadowOpacity: 0.1,
          shadowRadius: 4,
          elevation: 3,
        }}>
          <LogOut size={20} color="#DC2626" />
          <Text style={{ 
            fontSize: 16, 
            fontWeight: '500', 
            color: '#DC2626',
            marginLeft: 8
          }}>
            Sign Out
          </Text>
        </TouchableOpacity>

        {/* App Version */}
        <Text style={{ 
          fontSize: 14, 
          color: '#9CA3AF',
          textAlign: 'center',
          marginTop: 24
        }}>
          Field Reporter v1.0.0
        </Text>
      </ScrollView>
    </View>
  );
}