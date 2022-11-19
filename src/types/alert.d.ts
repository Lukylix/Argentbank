type AlertTypes = "success" | "warning" | "info" | "danger";

interface Alert {
  message: string;
  type: AlertTypes;
  id: number;
  time: number;
}
