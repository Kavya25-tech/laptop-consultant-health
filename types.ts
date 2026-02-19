
export interface SystemMetric {
  name: string;
  value: number;
  unit: string;
  status: 'normal' | 'warning' | 'critical';
}

export interface HealthReport {
  score: number;
  cpuTemp: number;
  ramUsage: number;
  diskHealth: number;
  batteryHealth: number;
  lastUpdated: string;
}

export interface ChatMessage {
  id: string;
  role: 'user' | 'model';
  text: string;
  timestamp: Date;
}

export interface SecurityThreat {
  id: string;
  title: string;
  severity: 'low' | 'medium' | 'high';
  description: string;
  detectedAt: Date;
}
