import React from 'react';
import { View, Text, ScrollView, TouchableOpacity } from 'react-native';
import { StatusBar } from 'expo-status-bar';
import { useSafeAreaInsets } from 'react-native-safe-area-context';
import { Plus, MapPin, Camera, FileText } from 'lucide-react-native';

export default function HomeScreen() {
  const insets = useSafeAreaInsets();

  const quickActions = [
    { id: 1, title: 'New Report', icon: Plus, color: '#2563EB' },
    { id: 2, title: 'Location Check', icon: MapPin, color: '#059669' },
    { id: 3, title: 'Photo Capture', icon: Camera, color: '#DC2626' },
    { id: 4, title: 'View Reports', icon: FileText, color: '#7C3AED' },
  ];

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
          color: '#111827',
          marginBottom: 4
        }}>
          Field Reporter
        </Text>
        <Text style={{ 
          fontSize: 16, 
          color: '#6B7280' 
        }}>
          Mobile data collection platform
        </Text>
      </View>

      <ScrollView 
        style={{ flex: 1 }} 
        contentContainerStyle={{ 
          paddingHorizontal: 20,
          paddingTop: 20,
          paddingBottom: insets.bottom + 20 
        }}
        showsVerticalScrollIndicator={false}
      >
        {/* Quick Actions */}
        <Text style={{ 
          fontSize: 20, 
          fontWeight: '600', 
          color: '#111827',
          marginBottom: 16
        }}>
          Quick Actions
        </Text>
        
        <View style={{ 
          flexDirection: 'row', 
          flexWrap: 'wrap', 
          justifyContent: 'space-between',
          marginBottom: 32
        }}>
          {quickActions.map((action) => (
            <TouchableOpacity
              key={action.id}
              style={{
                width: '48%',
                backgroundColor: '#fff',
                padding: 20,
                borderRadius: 12,
                marginBottom: 12,
                alignItems: 'center',
                shadowColor: '#000',
                shadowOffset: { width: 0, height: 2 },
                shadowOpacity: 0.1,
                shadowRadius: 4,
                elevation: 3,
              }}
            >
              <View style={{
                width: 48,
                height: 48,
                borderRadius: 24,
                backgroundColor: action.color + '20',
                alignItems: 'center',
                justifyContent: 'center',
                marginBottom: 12
              }}>
                <action.icon size={24} color={action.color} />
              </View>
              <Text style={{ 
                fontSize: 14, 
                fontWeight: '500', 
                color: '#374151',
                textAlign: 'center'
              }}>
                {action.title}
              </Text>
            </TouchableOpacity>
          ))}
        </View>

        {/* Recent Activity */}
        <Text style={{ 
          fontSize: 20, 
          fontWeight: '600', 
          color: '#111827',
          marginBottom: 16
        }}>
          Recent Activity
        </Text>
        
        <View style={{ 
          backgroundColor: '#fff',
          borderRadius: 12,
          padding: 20,
          shadowColor: '#000',
          shadowOffset: { width: 0, height: 2 },
          shadowOpacity: 0.1,
          shadowRadius: 4,
          elevation: 3,
        }}>
          <Text style={{ 
            fontSize: 16, 
            color: '#6B7280',
            textAlign: 'center',
            fontStyle: 'italic'
          }}>
            No recent activity
          </Text>
          <Text style={{ 
            fontSize: 14, 
            color: '#9CA3AF',
            textAlign: 'center',
            marginTop: 8
          }}>
            Start by creating your first report
          </Text>
        </View>
      </ScrollView>
    </View>
  );
}