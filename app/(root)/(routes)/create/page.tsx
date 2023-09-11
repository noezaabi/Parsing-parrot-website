import { Separator } from "@/components/ui/separator";
import { CreateForm } from "./create_form";

const CreatePage = () => {
  return (
    <div className="space-y-4 px-24">
      <div>
        <h3 className="text-lg font-medium">Account</h3>
        <p className="text-sm text-muted-foreground">
          Update your account settings. Set your preferred language and
          timezone.
        </p>
      </div>
      <Separator />
      <CreateForm />
    </div>
  );
};

export default CreatePage;
