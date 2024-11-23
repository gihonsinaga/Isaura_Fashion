import React from "react";
import { X } from "lucide-react";

// Base Alert Component
const Alert = ({ className, children, ...props }) => {
  return (
    <div
      role="alert"
      className={`relative w-full rounded-lg border p-4 mb-4 ${className}`}
      {...props}
    >
      {children}
    </div>
  );
};

// Alert Description Component
const AlertDescription = ({ className, children, ...props }) => {
  return (
    <div className={`text-sm [&_p]:leading-relaxed ${className}`} {...props}>
      {children}
    </div>
  );
};

// Dismissible Alert Component
const DismissibleAlert = ({ variant, message, onDismiss }) => {
  const getAlertStyles = () => {
    switch (variant) {
      case "destructive":
        return "border-red-500/50 bg-red-50 text-red-900";
      case "success":
        return "border-green-500/50 bg-green-50 text-green-900";
      default:
        return "border-gray-200 bg-gray-50 text-gray-900";
    }
  };

  return (
    <Alert
      className={`relative flex items-center justify-between ${getAlertStyles()}`}
    >
      <AlertDescription>{message}</AlertDescription>
      <button
        onClick={onDismiss}
        className="absolute right-2 top-2 p-1 rounded-full hover:bg-black/5 transition-colors"
        aria-label="Close alert"
      >
        <X className="h-4 w-4" />
      </button>
    </Alert>
  );
};

export { Alert, AlertDescription, DismissibleAlert };
