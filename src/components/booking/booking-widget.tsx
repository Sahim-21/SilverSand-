import { BookingWidgetForm } from "@/components/booking/booking-widget-form";
import { BOOKING_SECTION_ID } from "@/lib/booking/anchor";
import { getPublicPricing } from "@/lib/pricing/fetch";

export async function BookingWidget() {
  const pricing = await getPublicPricing();
  return (
    <div id={BOOKING_SECTION_ID} className="scroll-mt-8">
      <BookingWidgetForm initialPricing={pricing} />
    </div>
  );
}
