type AlertTypes = "success" | "warning" | "info" | "danger";

interface IAlert {
  message: string;
  type: AlertTypes;
  startTime: number;
  duration: number;
}

interface IAddAlertPayload {
  message: string;
  type: AlertTypes;
  startTime?: number;
  duration?: number;
}
