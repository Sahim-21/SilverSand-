import { BookingWidgetForm } from "@/components/booking/booking-widget-form";
import { getPublicPricing } from "@/lib/pricing/fetch";

export async function BookingWidget() {
  const pricing = await getPublicPricing();
  return <BookingWidgetForm initialPricing={pricing} />;
}
