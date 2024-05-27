import AddPaymentMethodDialog from "@/app/components/Dialogs/AddPaymentMethodDialog/AddPaymentMethodDialog";
import {
  Tabs,
  TabsContent,
  TabsList,
  TabsTrigger,
} from "@/app/components/Tabs/Tabs";
import { TbCoin, TbCreditCard } from "react-icons/tb";

export default function BillingPage() {
  return (
    <div>
      <p className="text-xl font-medium">Billing</p>

      <div className="mt-5">
        <Tabs defaultValue="paymentMethods">
          <div className="flex flex-row gap-3">
            <TabsList className="grid grid-cols-2 w-fit gap-2">
              <TabsTrigger value="paymentMethods">
                {" "}
                <TbCreditCard className="h-3 mr-2" /> Payment methods
              </TabsTrigger>
              <TabsTrigger value="credits">
                <TbCoin className="h-3 mr-2" /> Credits
              </TabsTrigger>
            </TabsList>
          </div>
          <TabsContent value="paymentMethods" className="w-full">
            <AddPaymentMethodDialog />
          </TabsContent>
          <TabsContent value="credits" className="w-full">
            hi
          </TabsContent>
        </Tabs>
      </div>
    </div>
  );
}
