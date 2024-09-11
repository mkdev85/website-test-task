export interface AlertDialogProps {
  // TODO: define component props here
  className?: string;
  open: boolean;
  title: string;
  message: string;
  onConfirm: () => void;
  onCancel: () => void;
}
