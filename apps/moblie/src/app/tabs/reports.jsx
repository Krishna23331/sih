import React, { useState } from 'react';
import { View, Text, ScrollView, TouchableOpacity, TextInput } from 'react-native';
import { StatusBar } from 'expo-status-bar';
import { useSafeAreaInsets } from 'react-native-safe-area-context';
import { Search, Filter, Plus, Calendar, MapPin } from 'lucide-react-native';

export default function ReportsScreen() {
  const insets = useSafeAreaInsets();
  const [searchQuery, setSearchQuery] = useState('');

  const sampleReports = [
    {
      id: 1,
      title: 'Equipment Inspection - Site A',
      date: '2025-09-15',
      location: 'Building A, Floor 2',
      status: 'Completed',
      priority: 'High'
    },
    {
      id: 2,
      title: 'Safety Audit - Zone B',
      date: '2025-09-14',
      location: 'Warehouse B',
      status: 'In Progress',
      priority: 'Medium'
    },
    {
      id: 3,
      title: 'Maintenance Check - Unit C',
      date: '2025-09-13',
      location: 'Production Floor',
      status: 'Pending Review',
      priority: 'Low'
    }
  ];

  const getStatusColor = (status) => {
    switch (status) {
      case 'Completed': return '#059669';
      case 'In Progress': return '#D97706';
      case 'Pending Review': return '#DC2626';
      default: return '#6B7280';
    }
  };

  const getPriorityColor = (priority) => {
    switch (priority) {
      case 'High': return '#DC2626';
      case 'Medium': return '#D97706';
      case 'Low': return '#059669';
      default: return '#6B7280';
    }
  };

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
        <View style={{ flexDirection: 'row', justifyContent: 'space-between', alignItems: 'center', marginBottom: 16 }}>
          <Text style={{ 
            fontSize: 28, 
            fontWeight: 'bold', 
            color: '#111827'
          }}>
            Reports
          </Text>
          <TouchableOpacity style={{
            backgroundColor: '#2563EB',
            paddingHorizontal: 16,
            paddingVertical: 8,
            borderRadius: 8,
            flexDirection: 'row',
            alignItems: 'center'
          }}>
            <Plus size={16} color="#fff" />
            <Text style={{ color: '#fff', fontWeight: '500', marginLeft: 4 }}>New</Text>
          </TouchableOpacity>
        </View>

        {/* Search and Filter */}
        <View style={{ flexDirection: 'row', alignItems: 'center' }}>
          <View style={{ 
            flex: 1, 
            flexDirection: 'row', 
            alignItems: 'center',
            backgroundColor: '#F3F4F6',
            borderRadius: 8,
            paddingHorizontal: 12,
            marginRight: 12
          }}>
            <Search size={16} color="#6B7280" />
            <TextInput
              style={{ 
                flex: 1, 
                paddingVertical: 12, 
                paddingLeft: 8,
                fontSize: 16,
                color: '#111827'
              }}
              placeholder="Search reports..."
              placeholderTextColor="#6B7280"
              value={searchQuery}
              onChangeText={setSearchQuery}
            />
          </View>
          <TouchableOpacity style={{
            backgroundColor: '#F3F4F6',
            padding: 12,
            borderRadius: 8
          }}>
            <Filter size={16} color="#6B7280" />
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
        {sampleReports.map((report) => (
          <TouchableOpacity
            key={report.id}
            style={{
              backgroundColor: '#fff',
              borderRadius: 12,
              padding: 16,
              marginBottom: 12,
              shadowColor: '#000',
              shadowOffset: { width: 0, height: 2 },
              shadowOpacity: 0.1,
              shadowRadius: 4,
              elevation: 3,
            }}
          >
            <View style={{ flexDirection: 'row', justifyContent: 'space-between', alignItems: 'flex-start', marginBottom: 8 }}>
              <Text style={{ 
                fontSize: 16, 
                fontWeight: '600', 
                color: '#111827',
                flex: 1,
                marginRight: 8
              }}>
                {report.title}
              </Text>
              <View style={{
                backgroundColor: getPriorityColor(report.priority) + '20',
                paddingHorizontal: 8,
                paddingVertical: 4,
                borderRadius: 6
              }}>
                <Text style={{ 
                  fontSize: 12, 
                  fontWeight: '500', 
                  color: getPriorityColor(report.priority)
                }}>
                  {report.priority}
                </Text>
              </View>
            </View>

            <View style={{ flexDirection: 'row', alignItems: 'center', marginBottom: 8 }}>
              <Calendar size={14} color="#6B7280" />
              <Text style={{ fontSize: 14, color: '#6B7280', marginLeft: 6 }}>
                {report.date}
              </Text>
            </View>

            <View style={{ flexDirection: 'row', alignItems: 'center', marginBottom: 12 }}>
              <MapPin size={14} color="#6B7280" />
              <Text style={{ fontSize: 14, color: '#6B7280', marginLeft: 6 }}>
                {report.location}
              </Text>
            </View>

            <View style={{
              backgroundColor: getStatusColor(report.status) + '20',
              paddingHorizontal: 12,
              paddingVertical: 6,
              borderRadius: 6,
              alignSelf: 'flex-start'
            }}>
              <Text style={{ 
                fontSize: 12, 
                fontWeight: '500', 
                color: getStatusColor(report.status)
              }}>
                {report.status}
              </Text>
            </View>
          </TouchableOpacity>
        ))}
      </ScrollView>
    </View>
  );
}