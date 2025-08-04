import { useToast } from "@/hooks/use-toast";
import {
  Toast,
  ToastClose,
  ToastDescription,
  ToastProvider,
  ToastTitle,
  ToastViewport,
} from "@/components/ui/toast";

export function Toaster() {
  const { toasts } = useToast();

  return (
    <ToastProvider data-oid="cy.q.v6">
      {toasts.map(function ({ id, title, description, action, ...props }) {
        return (
          <Toast key={id} {...props} data-oid="ize:13k">
            <div className="grid gap-1" data-oid="6:g7y6w">
              {title && <ToastTitle data-oid="2th0k_i">{title}</ToastTitle>}
              {description && (
                <ToastDescription data-oid="7-wp7o3">
                  {description}
                </ToastDescription>
              )}
            </div>
            {action}
            <ToastClose data-oid="eqlienl" />
          </Toast>
        );
      })}
      <ToastViewport data-oid="zwbd6.8" />
    </ToastProvider>
  );
}
