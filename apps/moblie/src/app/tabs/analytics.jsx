import React from 'react';
import { View, Text, ScrollView, TouchableOpacity } from 'react-native';
import { StatusBar } from 'expo-status-bar';
import { useSafeAreaInsets } from 'react-native-safe-area-context';
import { BarChart3, TrendingUp, Users, FileText, Calendar, Download } from 'lucide-react-native';

export default function AnalyticsScreen() {
  const insets = useSafeAreaInsets();

  const metrics = [
    { title: 'Total Reports', value: '1,234', change: '+12%', icon: FileText, color: '#2563EB' },
    { title: 'Active Users', value: '89', change: '+5%', icon: Users, color: '#059669' },
    { title: 'Completion Rate', value: '94%', change: '+2%', icon: TrendingUp, color: '#7C3AED' },
    { title: 'This Month', value: '156', change: '+18%', icon: Calendar, color: '#D97706' },
  ];

  const chartData = [
    { period: 'Jan', reports: 45 },
    { period: 'Feb', reports: 52 },
    { period: 'Mar', reports: 48 },
    { period: 'Apr', reports: 61 },
    { period: 'May', reports: 55 },
    { period: 'Jun', reports: 67 },
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
        <View style={{ flexDirection: 'row', justifyContent: 'space-between', alignItems: 'center' }}>
          <Text style={{ 
            fontSize: 28, 
            fontWeight: 'bold', 
            color: '#111827'
          }}>
            Analytics
          </Text>
          <TouchableOpacity style={{
            backgroundColor: '#F3F4F6',
            paddingHorizontal: 16,
            paddingVertical: 8,
            borderRadius: 8,
            flexDirection: 'row',
            alignItems: 'center'
          }}>
            <Download size={16} color="#374151" />
            <Text style={{ color: '#374151', fontWeight: '500', marginLeft: 4 }}>Export</Text>
          </TouchableOpacity>
        </View>
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
        {/* Metrics Grid */}
        <View style={{ 
          flexDirection: 'row', 
          flexWrap: 'wrap', 
          justifyContent: 'space-between',
          marginBottom: 24
        }}>
          {metrics.map((metric, index) => (
            <View
              key={index}
              style={{
                width: '48%',
                backgroundColor: '#fff',
                padding: 16,
                borderRadius: 12,
                marginBottom: 12,
                shadowColor: '#000',
                shadowOffset: { width: 0, height: 2 },
                shadowOpacity: 0.1,
                shadowRadius: 4,
                elevation: 3,
              }}
            >
              <View style={{ flexDirection: 'row', justifyContent: 'space-between', alignItems: 'flex-start', marginBottom: 8 }}>
                <View style={{ flex: 1 }}>
                  <Text style={{ fontSize: 12, color: '#6B7280', marginBottom: 4 }}>
                    {metric.title}
                  </Text>
                  <Text style={{ fontSize: 20, fontWeight: 'bold', color: '#111827' }}>
                    {metric.value}
                  </Text>
                </View>
                <View style={{
                  width: 32,
                  height: 32,
                  borderRadius: 16,
                  backgroundColor: metric.color + '20',
                  alignItems: 'center',
                  justifyContent: 'center'
                }}>
                  <metric.icon size={16} color={metric.color} />
                </View>
              </View>
              <Text style={{ fontSize: 12, color: '#059669' }}>
                {metric.change} from last month
              </Text>
            </View>
          ))}
        </View>

        {/* Chart Section */}
        <View style={{
          backgroundColor: '#fff',
          borderRadius: 12,
          padding: 20,
          marginBottom: 24,
          shadowColor: '#000',
          shadowOffset: { width: 0, height: 2 },
          shadowOpacity: 0.1,
          shadowRadius: 4,
          elevation: 3,
        }}>
          <Text style={{ 
            fontSize: 18, 
            fontWeight: '600', 
            color: '#111827',
            marginBottom: 16
          }}>
            Report Trends
          </Text>
          
          {/* Simple Bar Chart Representation */}
          <View style={{ height: 200, justifyContent: 'flex-end', flexDirection: 'row', alignItems: 'flex-end' }}>
            {chartData.map((item, index) => (
              <View key={index} style={{ flex: 1, alignItems: 'center', marginHorizontal: 2 }}>
                <View style={{
                  width: '80%',
                  height: (item.reports / 70) * 150, // Scale to fit
                  backgroundColor: '#2563EB',
                  borderRadius: 4,
                  marginBottom: 8
                }} />
                <Text style={{ fontSize: 12, color: '#6B7280' }}>{item.period}</Text>
              </View>
            ))}
          </View>
        </View>

        {/* Performance Insights */}
        <View style={{
          backgroundColor: '#fff',
          borderRadius: 12,
          padding: 20,
          marginBottom: 24,
          shadowColor: '#000',
          shadowOffset: { width: 0, height: 2 },
          shadowOpacity: 0.1,
          shadowRadius: 4,
          elevation: 3,
        }}>
          <Text style={{ 
            fontSize: 18, 
            fontWeight: '600', 
            color: '#111827',
            marginBottom: 16
          }}>
            Performance Insights
          </Text>
          
          <View style={{ marginBottom: 16 }}>
            <View style={{ flexDirection: 'row', justifyContent: 'space-between', marginBottom: 8 }}>
              <Text style={{ fontSize: 14, color: '#374151' }}>Report Completion</Text>
              <Text style={{ fontSize: 14, fontWeight: '500', color: '#111827' }}>94%</Text>
            </View>
            <View style={{ height: 8, backgroundColor: '#E5E7EB', borderRadius: 4 }}>
              <View style={{ 
                width: '94%', 
                height: '100%', 
                backgroundColor: '#059669', 
                borderRadius: 4 
              }} />
            </View>
          </View>

          <View style={{ marginBottom: 16 }}>
            <View style={{ flexDirection: 'row', justifyContent: 'space-between', marginBottom: 8 }}>
              <Text style={{ fontSize: 14, color: '#374151' }}>Data Quality</Text>
              <Text style={{ fontSize: 14, fontWeight: '500', color: '#111827' }}>87%</Text>
            </View>
            <View style={{ height: 8, backgroundColor: '#E5E7EB', borderRadius: 4 }}>
              <View style={{ 
                width: '87%', 
                height: '100%', 
                backgroundColor: '#2563EB', 
                borderRadius: 4 
              }} />
            </View>
          </View>

          <View>
            <View style={{ flexDirection: 'row', justifyContent: 'space-between', marginBottom: 8 }}>
              <Text style={{ fontSize: 14, color: '#374151' }}>User Engagement</Text>
              <Text style={{ fontSize: 14, fontWeight: '500', color: '#111827' }}>76%</Text>
            </View>
            <View style={{ height: 8, backgroundColor: '#E5E7EB', borderRadius: 4 }}>
              <View style={{ 
                width: '76%', 
                height: '100%', 
                backgroundColor: '#7C3AED', 
                borderRadius: 4 
              }} />
            </View>
          </View>
        </View>

        {/* Quick Stats */}
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
            fontSize: 18, 
            fontWeight: '600', 
            color: '#111827',
            marginBottom: 16
          }}>
            Quick Stats
          </Text>
          
          <View style={{ flexDirection: 'row', justifyContent: 'space-between', marginBottom: 12 }}>
            <Text style={{ fontSize: 14, color: '#6B7280' }}>Average Response Time</Text>
            <Text style={{ fontSize: 14, fontWeight: '500', color: '#111827' }}>2.3 hours</Text>
          </View>
          
          <View style={{ flexDirection: 'row', justifyContent: 'space-between', marginBottom: 12 }}>
            <Text style={{ fontSize: 14, color: '#6B7280' }}>Most Active User</Text>
            <Text style={{ fontSize: 14, fontWeight: '500', color: '#111827' }}>Sarah Johnson</Text>
          </View>
          
          <View style={{ flexDirection: 'row', justifyContent: 'space-between' }}>
            <Text style={{ fontSize: 14, color: '#6B7280' }}>Peak Activity Time</Text>
            <Text style={{ fontSize: 14, fontWeight: '500', color: '#111827' }}>2:00 PM - 4:00 PM</Text>
          </View>
        </View>
      </ScrollView>
    </View>
  );
}