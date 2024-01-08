interface ErrorMessageProps {
  message?: string;
}
export const ErrorMessage = (props: ErrorMessageProps) => (
  <p className="text-red-500">{props.message}</p>
);
