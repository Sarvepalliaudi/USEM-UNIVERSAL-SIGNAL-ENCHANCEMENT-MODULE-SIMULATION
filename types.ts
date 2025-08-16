export interface SignalDataPoint {
  time: number;
  strength: number; // in dBm
}

export enum SecurityStatus {
  SECURE = 'SECURE',
  SCANNING = 'SCANNING',
  VULNERABLE = 'VULNERABLE',
  ANALYZING = 'ANALYZING',
}

export interface NetworkMetrics {
  latency: number; // ms
  download: number; // Mbps
  upload: number; // Mbps
}
