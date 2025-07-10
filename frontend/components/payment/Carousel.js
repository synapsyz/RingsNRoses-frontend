import { FaChevronLeft, FaChevronRight } from "react-icons/fa";
import PricingCard from "./PricingCard";

export default function Carousel({
  pricingData,
  handlePayment,
  isProcessing,
  billingCycle,
  current,
  handlePrev,
  handleNext,
  getCardPosition,
}) {
  return (
    <>
      <button
        onClick={handlePrev}
        className="absolute left-40 z-40 p-3 bg-white rounded-full shadow hover:bg-gray-200 transition"
      >
        <FaChevronLeft />
      </button>

      <div className="relative w-full max-w-7xl flex items-center justify-center">
        <div className="flex items-center justify-center w-full h-[700px] relative overflow-hidden">
          {pricingData.map((plan, index) => {
            const position = getCardPosition(index);
            let style = "";
            switch (position) {
              case "center":
                style = "z-30 scale-100 opacity-100 translate-x-0";
                break;
              case "left":
                style = "z-20 scale-90 opacity-30 blur-sm -translate-x-[480px]";
                break;
              case "right":
                style = "z-20 scale-90 opacity-30 blur-sm translate-x-[480px]";
                break;
              default:
                style = "opacity-0 scale-75 pointer-events-none";
            }
            return (
              <PricingCard
                key={plan.id}
                plan={plan}
                style={style}
                billingCycle={billingCycle}
                handlePayment={handlePayment}
                isProcessing={isProcessing}
              />
            );
          })}
        </div>
      </div>

      <button
        onClick={handleNext}
        className="absolute right-40 z-40 p-3 bg-white rounded-full shadow hover:bg-gray-200 transition"
      >
        <FaChevronRight />
      </button>
    </>
  );
}