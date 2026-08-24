import { Alert } from "@/components/ui/alert";
import { todoMessage, type OWNER_CHECKLIST } from "@/lib/todos";

type TodoNoticeProps = {
  item: keyof typeof OWNER_CHECKLIST;
  detail?: string;
};

export function TodoNotice({ item, detail }: TodoNoticeProps) {
  return (
    <Alert className="border-dashed">
      <p className="font-medium text-ink">Pending owner confirmation</p>
      <p className="mt-1 text-muted">
        {detail ?? todoMessage(item)}
      </p>
    </Alert>
  );
}
