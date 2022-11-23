type AlertTypes = "success" | "warning" | "info" | "danger";

interface IAlert {
  message: string;
  type: AlertTypes;
  id: number;
  time: number;
}
