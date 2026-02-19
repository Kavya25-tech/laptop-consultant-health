
import React, { useState, useEffect, useMemo } from 'react';
import { 
  ShieldCheck, 
  Activity, 
  Cpu, 
  MemoryStick as Memory, 
  HardDrive, 
  Battery, 
  AlertTriangle, 
  Thermometer,
  Zap,
  Lock,
  Search,
  Settings,
  Menu,
  X,
  RefreshCw,
  // Added Bot import to fix the error on line 298
  Bot
} from 'lucide-react';
import MetricsCard from './components/MetricsCard';
import DoctorChat from './components/DoctorChat';
import { HealthReport, SecurityThreat } from './types';

const App: React.FC = () => {
  const [activeTab, setActiveTab] = useState<'dashboard' | 'doctor' | 'safety' | 'settings'>('dashboard');
  const [sidebarOpen, setSidebarOpen] = useState(false);
  const [isScanning, setIsScanning] = useState(false);
  
  // Simulated dynamic system metrics
  const [healthData, setHealthData] = useState<HealthReport>({
    score: 84,
    cpuTemp: 52,
    ramUsage: 4.2,
    diskHealth: 98,
    batteryHealth: 92,
    lastUpdated: new Date().toLocaleTimeString()
  });

  const [metricHistory, setMetricHistory] = useState<{
    cpu: {time: string, val: number}[],
    ram: {time: string, val: number}[],
    temp: {time: string, val: number}[]
  }>({
    cpu: Array.from({length: 20}, (_, i) => ({time: i.toString(), val: 30 + Math.random() * 20})),
    ram: Array.from({length: 20}, (_, i) => ({time: i.toString(), val: 40 + Math.random() * 10})),
    temp: Array.from({length: 20}, (_, i) => ({time: i.toString(), val: 50 + Math.random() * 5}))
  });

  const [threats, setThreats] = useState<SecurityThreat[]>([
    {
      id: '1',
      title: 'Unusual Background Process',
      severity: 'medium',
      description: 'An unidentified process is consuming network bandwidth in the background.',
      detectedAt: new Date(Date.now() - 1000 * 60 * 15)
    },
    {
      id: '2',
      title: 'Firewall Policy Violation',
      severity: 'low',
      description: 'Recent application installation requested broad port permissions.',
      detectedAt: new Date(Date.now() - 1000 * 60 * 120)
    }
  ]);

  // Update simulation
  useEffect(() => {
    const interval = setInterval(() => {
      setHealthData(prev => ({
        ...prev,
        cpuTemp: Math.min(100, Math.max(30, prev.cpuTemp + (Math.random() - 0.5) * 4)),
        ramUsage: Math.min(16, Math.max(2, prev.ramUsage + (Math.random() - 0.5) * 0.2)),
        lastUpdated: new Date().toLocaleTimeString()
      }));

      setMetricHistory(prev => ({
        cpu: [...prev.cpu.slice(1), {time: Date.now().toString(), val: 10 + Math.random() * 40}],
        ram: [...prev.ram.slice(1), {time: Date.now().toString(), val: 40 + Math.random() * 20}],
        temp: [...prev.temp.slice(1), {time: Date.now().toString(), val: 45 + Math.random() * 15}]
      }));
    }, 3000);

    return () => clearInterval(interval);
  }, []);

  const runFullScan = () => {
    setIsScanning(true);
    setTimeout(() => setIsScanning(false), 3000);
  };

  const menuItems = [
    { id: 'dashboard', label: 'Health Dashboard', icon: Activity },
    { id: 'doctor', label: 'AI Doctor', icon: ShieldCheck },
    { id: 'safety', label: 'Safety Guardian', icon: Lock },
    { id: 'settings', label: 'Preferences', icon: Settings },
  ] as const;

  return (
    <div className="min-h-screen flex bg-black text-zinc-100 selection:bg-indigo-500/30">
      {/* Sidebar - Desktop */}
      <aside className={`fixed inset-y-0 left-0 z-50 w-64 bg-zinc-950 border-r border-zinc-800 transition-transform duration-300 transform md:translate-x-0 ${sidebarOpen ? 'translate-x-0' : '-translate-x-full'}`}>
        <div className="flex flex-col h-full">
          <div className="p-6 flex items-center gap-3">
            <div className="w-10 h-10 bg-indigo-600 rounded-xl flex items-center justify-center shadow-lg shadow-indigo-500/20">
              <ShieldCheck className="w-6 h-6 text-white" />
            </div>
            <div>
              <h1 className="font-bold text-lg leading-tight">Guardian AI</h1>
              <span className="text-[10px] text-indigo-400 font-bold uppercase tracking-widest">v2.5 Pro</span>
            </div>
          </div>

          <nav className="flex-1 px-4 py-4 space-y-1">
            {menuItems.map((item) => (
              <button
                key={item.id}
                onClick={() => {
                  setActiveTab(item.id);
                  setSidebarOpen(false);
                }}
                className={`w-full flex items-center gap-3 px-4 py-3 rounded-lg transition-all ${activeTab === item.id ? 'bg-indigo-600/10 text-indigo-400 border border-indigo-600/20' : 'text-zinc-500 hover:text-zinc-200 hover:bg-zinc-900'}`}
              >
                <item.icon className="w-5 h-5" />
                <span className="font-medium">{item.label}</span>
              </button>
            ))}
          </nav>

          <div className="p-4 border-t border-zinc-800">
            <div className="bg-zinc-900/50 rounded-xl p-4 border border-zinc-800">
              <div className="flex justify-between items-center mb-2">
                <span className="text-xs text-zinc-400">Total Protection</span>
                <span className="text-xs font-bold text-green-400">ACTIVE</span>
              </div>
              <div className="w-full bg-zinc-800 rounded-full h-1.5 overflow-hidden">
                <div className="bg-green-500 h-full w-[94%] shadow-[0_0_8px_rgba(34,197,94,0.4)]"></div>
              </div>
            </div>
          </div>
        </div>
      </aside>

      {/* Main Content */}
      <main className="flex-1 md:ml-64 flex flex-col min-h-screen">
        {/* Header */}
        <header className="sticky top-0 z-40 bg-black/80 backdrop-blur-md border-b border-zinc-800 px-6 py-4">
          <div className="flex items-center justify-between">
            <div className="flex items-center gap-4">
              <button onClick={() => setSidebarOpen(true)} className="md:hidden p-2 text-zinc-400">
                <Menu className="w-6 h-6" />
              </button>
              <div className="hidden sm:flex relative">
                <Search className="absolute left-3 top-1/2 -translate-y-1/2 w-4 h-4 text-zinc-500" />
                <input 
                  type="text" 
                  placeholder="Scan system files..."
                  className="bg-zinc-900 border border-zinc-800 rounded-full py-2 pl-10 pr-4 text-sm w-64 focus:outline-none focus:border-zinc-700 focus:ring-1 focus:ring-zinc-700"
                />
              </div>
            </div>

            <div className="flex items-center gap-4">
              <button 
                onClick={runFullScan}
                disabled={isScanning}
                className={`flex items-center gap-2 px-4 py-2 rounded-lg font-semibold text-sm transition-all ${isScanning ? 'bg-zinc-800 text-zinc-500' : 'bg-white text-black hover:bg-zinc-200 shadow-lg'}`}
              >
                {isScanning ? <RefreshCw className="w-4 h-4 animate-spin" /> : <Zap className="w-4 h-4 fill-current" />}
                {isScanning ? 'Scanning...' : 'Optimize Now'}
              </button>
              <div className="w-10 h-10 rounded-full bg-zinc-800 border border-zinc-700 flex items-center justify-center overflow-hidden">
                <img src="https://picsum.photos/seed/laptop-user/100" alt="Profile" />
              </div>
            </div>
          </div>
        </header>

        {/* Content Area */}
        <div className="p-6 md:p-8 flex-1 overflow-x-hidden">
          {activeTab === 'dashboard' && (
            <div className="space-y-8 animate-in fade-in duration-500">
              <div className="flex flex-col lg:flex-row justify-between gap-6">
                <div>
                  <h2 className="text-3xl font-bold tracking-tight">System Vitality</h2>
                  <p className="text-zinc-500 mt-1">Real-time telemetry and hardware health overview.</p>
                </div>
                <div className="flex items-center gap-6 bg-zinc-900/50 border border-zinc-800 rounded-2xl p-4">
                  <div className="text-center">
                    <p className="text-xs text-zinc-500 uppercase tracking-widest font-bold">Health Score</p>
                    <p className="text-3xl font-black text-indigo-400">{healthData.score}%</p>
                  </div>
                  <div className="w-px h-10 bg-zinc-800"></div>
                  <div className="text-center">
                    <p className="text-xs text-zinc-500 uppercase tracking-widest font-bold">Status</p>
                    <p className="text-lg font-bold text-green-400">OPTIMAL</p>
                  </div>
                </div>
              </div>

              <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
                <MetricsCard 
                  title="CPU Temperature" 
                  value={healthData.cpuTemp.toFixed(1)} 
                  unit="°C" 
                  history={metricHistory.temp}
                  color="#f43f5e"
                  icon={<Thermometer className="w-5 h-5 text-rose-500" />}
                />
                <MetricsCard 
                  title="Memory Usage" 
                  value={healthData.ramUsage.toFixed(1)} 
                  unit="GB" 
                  history={metricHistory.ram}
                  color="#8b5cf6"
                  icon={<Memory className="w-5 h-5 text-violet-500" />}
                />
                <MetricsCard 
                  title="SSD Lifespan" 
                  value={healthData.diskHealth} 
                  unit="%" 
                  history={Array.from({length: 10}, (_, i) => ({time: i.toString(), val: 98}))}
                  color="#0ea5e9"
                  icon={<HardDrive className="w-5 h-5 text-sky-500" />}
                />
                <MetricsCard 
                  title="Battery Cycles" 
                  value={healthData.batteryHealth} 
                  unit="%" 
                  history={Array.from({length: 10}, (_, i) => ({time: i.toString(), val: 92}))}
                  color="#10b981"
                  icon={<Battery className="w-5 h-5 text-emerald-500" />}
                />
              </div>

              <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
                <div className="lg:col-span-2 bg-zinc-900 border border-zinc-800 rounded-2xl p-6">
                  <div className="flex items-center justify-between mb-6">
                    <h3 className="font-bold text-xl">Power Management</h3>
                    <div className="flex gap-2">
                      <span className="px-3 py-1 rounded-full bg-green-500/10 text-green-400 text-xs font-bold border border-green-500/20 italic">Balanced Mode</span>
                    </div>
                  </div>
                  <div className="space-y-6">
                    <div className="flex items-center justify-between">
                      <div className="flex items-center gap-3">
                        <div className="p-2 rounded-lg bg-zinc-800"><Zap className="w-4 h-4 text-yellow-500" /></div>
                        <div>
                          <p className="text-sm font-semibold">Fast Charging</p>
                          <p className="text-xs text-zinc-500">Intelligent wattage regulation</p>
                        </div>
                      </div>
                      <div className="w-12 h-6 bg-zinc-800 rounded-full relative cursor-pointer">
                        <div className="absolute right-1 top-1 w-4 h-4 bg-green-500 rounded-full shadow-lg shadow-green-500/50"></div>
                      </div>
                    </div>
                    <div className="flex items-center justify-between">
                      <div className="flex items-center gap-3">
                        <div className="p-2 rounded-lg bg-zinc-800"><Cpu className="w-4 h-4 text-blue-500" /></div>
                        <div>
                          <p className="text-sm font-semibold">Turbo Boost</p>
                          <p className="text-xs text-zinc-500">Auto-frequency overclocking</p>
                        </div>
                      </div>
                      <div className="w-12 h-6 bg-zinc-800 rounded-full relative cursor-pointer">
                        <div className="absolute left-1 top-1 w-4 h-4 bg-zinc-400 rounded-full"></div>
                      </div>
                    </div>
                  </div>
                </div>

                <div className="bg-gradient-to-br from-indigo-900/20 to-zinc-900 border border-indigo-500/20 rounded-2xl p-6 relative overflow-hidden group">
                   <div className="relative z-10">
                    <h3 className="font-bold text-xl mb-4">Doctor's Advice</h3>
                    <div className="bg-black/40 backdrop-blur-sm border border-white/5 rounded-xl p-4 mb-4">
                      <p className="text-sm text-zinc-300 leading-relaxed italic">
                        "Your CPU temperature peaked at 74°C during high load. Consider clearing the vent dust or adjusting fan curves for better longevity."
                      </p>
                    </div>
                    <button 
                      onClick={() => setActiveTab('doctor')}
                      className="w-full py-3 bg-indigo-600 hover:bg-indigo-500 text-white rounded-xl text-sm font-bold transition-all shadow-lg shadow-indigo-500/20"
                    >
                      Open AI Consultation
                    </button>
                   </div>
                   <div className="absolute -right-8 -bottom-8 opacity-10 group-hover:scale-110 transition-transform duration-700">
                    <ShieldCheck className="w-48 h-48" />
                   </div>
                </div>
              </div>
            </div>
          )}

          {activeTab === 'doctor' && (
            <div className="h-[calc(100vh-10rem)] max-w-5xl mx-auto flex flex-col gap-6 animate-in slide-in-from-bottom-4 duration-500">
              <div className="flex items-center gap-4">
                <div className="p-3 bg-indigo-600 rounded-2xl shadow-xl shadow-indigo-600/20">
                  <Bot className="w-8 h-8 text-white" />
                </div>
                <div>
                  <h2 className="text-2xl font-bold">AI Laptop Consultant</h2>
                  <p className="text-zinc-500 text-sm">Professional hardware & software diagnostics powered by Gemini 3.</p>
                </div>
              </div>
              <div className="flex-1 min-h-0">
                <DoctorChat systemMetrics={healthData} />
              </div>
            </div>
          )}

          {activeTab === 'safety' && (
            <div className="max-w-5xl mx-auto space-y-8 animate-in fade-in duration-500">
               <div>
                <h2 className="text-3xl font-bold tracking-tight">Safety Guardian</h2>
                <p className="text-zinc-500 mt-1">Intrusion detection, privacy shields, and network hardening.</p>
              </div>

              <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                <div className="bg-zinc-900 border border-zinc-800 rounded-2xl p-6">
                  <div className="flex items-center gap-3 mb-6">
                    <div className="p-2 rounded-lg bg-rose-500/10"><AlertTriangle className="w-5 h-5 text-rose-500" /></div>
                    <h3 className="font-bold text-lg">Active Threats</h3>
                  </div>
                  <div className="space-y-4">
                    {threats.map(threat => (
                      <div key={threat.id} className="p-4 rounded-xl bg-zinc-950 border border-zinc-800 hover:border-zinc-700 transition-all cursor-default group">
                        <div className="flex justify-between items-start mb-2">
                          <h4 className="font-bold text-zinc-100">{threat.title}</h4>
                          <span className={`text-[10px] font-black uppercase px-2 py-0.5 rounded ${
                            threat.severity === 'high' ? 'bg-rose-500 text-white' : 
                            threat.severity === 'medium' ? 'bg-orange-500 text-white' : 'bg-blue-500 text-white'
                          }`}>
                            {threat.severity}
                          </span>
                        </div>
                        <p className="text-xs text-zinc-400 mb-3 leading-relaxed">{threat.description}</p>
                        <div className="flex justify-between items-center">
                          <span className="text-[10px] text-zinc-600 font-mono uppercase">{threat.detectedAt.toLocaleTimeString()}</span>
                          <button className="text-[10px] font-bold text-indigo-400 opacity-0 group-hover:opacity-100 transition-opacity uppercase tracking-wider">Isolate Threat</button>
                        </div>
                      </div>
                    ))}
                  </div>
                </div>

                <div className="bg-zinc-900 border border-zinc-800 rounded-2xl p-6">
                  <div className="flex items-center gap-3 mb-6">
                    <div className="p-2 rounded-lg bg-green-500/10"><ShieldCheck className="w-5 h-5 text-green-500" /></div>
                    <h3 className="font-bold text-lg">Guardian Status</h3>
                  </div>
                  <div className="space-y-6">
                    {[
                      { name: 'Identity Protection', status: 'Secured', icon: Lock, color: 'text-green-400' },
                      { name: 'Firewall Stealth', status: 'Enabled', icon: ShieldCheck, color: 'text-green-400' },
                      { name: 'App Sandboxing', status: 'Running', icon: HardDrive, color: 'text-indigo-400' },
                      { name: 'Encryption Layer', status: 'v2.0 AES', icon: Lock, color: 'text-zinc-400' },
                    ].map((item, idx) => (
                      <div key={idx} className="flex items-center justify-between">
                        <div className="flex items-center gap-3">
                          <item.icon className="w-4 h-4 text-zinc-500" />
                          <span className="text-sm font-medium">{item.name}</span>
                        </div>
                        <span className={`text-xs font-bold uppercase ${item.color}`}>{item.status}</span>
                      </div>
                    ))}
                  </div>
                  <div className="mt-8 p-4 bg-indigo-600/10 border border-indigo-600/20 rounded-xl">
                    <div className="flex items-center gap-3 mb-2">
                      <Zap className="w-4 h-4 text-indigo-400" />
                      <span className="text-xs font-bold uppercase tracking-wider text-indigo-300">AI Safety Insight</span>
                    </div>
                    <p className="text-xs text-zinc-400 leading-relaxed italic">
                      "I've detected multiple failed login attempts on your local SMB share. I've automatically rotated temporary firewall rules to block the source IP."
                    </p>
                  </div>
                </div>
              </div>
            </div>
          )}

          {activeTab === 'settings' && (
             <div className="max-w-2xl mx-auto p-12 text-center bg-zinc-900 border border-zinc-800 rounded-3xl animate-in zoom-in-95 duration-500">
               <Settings className="w-16 h-16 text-zinc-700 mx-auto mb-6" />
               <h2 className="text-2xl font-bold mb-2">Advanced Preferences</h2>
               <p className="text-zinc-500 mb-8">Customize your Guardian AI's thresholds, reporting sensitivity, and UI theme.</p>
               <div className="space-y-4 text-left">
                  <div className="p-4 bg-zinc-950 border border-zinc-800 rounded-xl flex items-center justify-between">
                    <div>
                      <p className="font-semibold">Performance Mode</p>
                      <p className="text-xs text-zinc-500">Prioritize background tasks over system monitoring</p>
                    </div>
                    <div className="w-12 h-6 bg-zinc-800 rounded-full"></div>
                  </div>
                  <div className="p-4 bg-zinc-950 border border-zinc-800 rounded-xl flex items-center justify-between">
                    <div>
                      <p className="font-semibold">Gemini Advanced Logic</p>
                      <p className="text-xs text-zinc-500">Enable 2x deeper analysis for security logs</p>
                    </div>
                    <div className="w-12 h-6 bg-indigo-600 rounded-full relative">
                      <div className="absolute right-1 top-1 w-4 h-4 bg-white rounded-full"></div>
                    </div>
                  </div>
               </div>
             </div>
          )}
        </div>

        {/* Footer Status Bar */}
        <footer className="bg-zinc-950 border-t border-zinc-800 px-6 py-2 text-[10px] text-zinc-500 flex justify-between items-center">
          <div className="flex gap-4">
            <span className="flex items-center gap-1"><div className="w-1.5 h-1.5 rounded-full bg-green-500 animate-pulse"></div> Gemini Connected</span>
            <span>Uptime: 4d 12h 32m</span>
          </div>
          <div className="flex gap-4">
            <span>Last Update: {healthData.lastUpdated}</span>
            <span className="font-bold text-zinc-300 uppercase tracking-widest">SECURE SESSION</span>
          </div>
        </footer>
      </main>

      {/* Overlay for mobile sidebar */}
      {sidebarOpen && (
        <div 
          className="fixed inset-0 bg-black/60 backdrop-blur-sm z-40 md:hidden"
          onClick={() => setSidebarOpen(false)}
        ></div>
      )}
    </div>
  );
};

export default App;
