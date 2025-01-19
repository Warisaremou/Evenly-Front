export default function FieldErrorMessage({ errorMessage }: { errorMessage: string | undefined }) {
  return <span className="mt-1 text-state-error-foreground text-xs font-body-medium">{errorMessage}</span>;
}
