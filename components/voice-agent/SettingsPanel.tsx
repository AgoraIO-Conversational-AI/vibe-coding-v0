"use client";

import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";

export function SettingsPanel({
  prompt, greeting,
  onPromptChange, onGreetingChange, onClose,
  isConnected, micDevices, selectedMicId, onMicDeviceChange,
}: {
  prompt: string; greeting: string;
  onPromptChange: (v: string) => void;
  onGreetingChange: (v: string) => void;
  onClose: () => void;
  isConnected: boolean;
  micDevices: MediaDeviceInfo[];
  selectedMicId: string;
  onMicDeviceChange: (deviceId: string) => void;
}) {
  return (
    <div className="absolute inset-0 z-50 flex items-center justify-center bg-background/80 backdrop-blur-sm p-4">
      <div className="w-full max-w-md bg-card border border-border rounded-xl p-6 shadow-2xl space-y-5">
        <div className="flex items-center justify-between">
          <h2 className="text-base font-semibold text-foreground">Agent Settings</h2>
          <button onClick={onClose} className="text-xs text-muted-foreground hover:text-foreground transition-colors">
            Close
          </button>
        </div>
        {micDevices.length > 0 && (
          <div className="space-y-1.5">
            <label className="text-sm font-medium text-foreground">Microphone</label>
            <Select
              value={selectedMicId || micDevices[0]?.deviceId}
              onValueChange={onMicDeviceChange}
            >
              <SelectTrigger className="w-full">
                <SelectValue placeholder="Select microphone" />
              </SelectTrigger>
              <SelectContent>
                {micDevices.map((device, i) => (
                  <SelectItem key={device.deviceId} value={device.deviceId}>
                    {device.label || `Microphone ${i + 1}`}
                  </SelectItem>
                ))}
              </SelectContent>
            </Select>
          </div>
        )}
        <div className="space-y-1.5">
          <label className="text-sm font-medium text-foreground">System Prompt</label>
          {isConnected && (
            <p className="text-xs text-muted-foreground">Changes apply on next call</p>
          )}
          <textarea
            value={prompt}
            onChange={(e) => onPromptChange(e.target.value)}
            rows={4}
            className="w-full rounded-lg border border-border bg-input px-3 py-2 text-sm text-foreground placeholder:text-muted-foreground focus:outline-none focus:ring-1 focus:ring-ring resize-none"
            placeholder="You are a friendly voice assistant. Keep responses concise..."
          />
        </div>
        <div className="space-y-1.5">
          <label className="text-sm font-medium text-foreground">Greeting</label>
          {isConnected && (
            <p className="text-xs text-muted-foreground">Changes apply on next call</p>
          )}
          <input
            value={greeting}
            onChange={(e) => onGreetingChange(e.target.value)}
            className="w-full rounded-lg border border-border bg-input px-3 py-2 text-sm text-foreground placeholder:text-muted-foreground focus:outline-none focus:ring-1 focus:ring-ring"
            placeholder="Hi there! How can I help you?"
          />
        </div>
        <button
          onClick={onClose}
          className="w-full rounded-xl bg-primary text-primary-foreground py-2 text-sm font-medium hover:opacity-90 transition-opacity"
        >
          Save
        </button>
      </div>
    </div>
  );
}
