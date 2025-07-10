import { BsCheckCircleFill, BsXCircleFill } from "react-icons/bs";

export default function PricingCard({
  plan,
  style,
  billingCycle,
  handlePayment,
  isProcessing,
}) {
  const baseClasses =
    "absolute transition-all duration-500 ease-in-out w-[450px] min-h-[540px] p-8 rounded-2xl shadow-2xl bg-white flex flex-col transform";

  const price =
    billingCycle === "monthly" ? plan.monthly_price : plan.annual_price;

  return (
    <div className={`${baseClasses} ${style}`}>
      <div className="bg-white rounded-xl h-full flex flex-col p-3">
        <header
          className={
            plan.is_popular ? "flex justify-between items-center" : ""
          }
        >
          <h4 className="font-semibold text-lg text-gray-800">{plan.name}</h4>
          {plan.is_popular && (
            <span className="inline-block px-3 py-1 text-xs font-semibold text-blue-800 uppercase bg-blue-100 rounded-full animate-pulse">
              Most popular
            </span>
          )}
        </header>

        <p className="mt-2 text-sm text-gray-500">{plan.description}</p>
        <p className="text-4xl font-bold text-black-600 mt-4">₹{price}</p>
        <p className="text-sm text-gray-400">{plan.price_period}</p>

        <div className="mt-5 pb-7 border-b border-gray-200">
          <button
            onClick={() => handlePayment(plan)}
            className="py-3 px-4 w-full inline-flex justify-center items-center gap-x-2 text-sm font-semibold rounded-lg border border-transparent bg-blue-600 text-white hover:bg-blue-700 transition disabled:opacity-50 disabled:pointer-events-none"
            disabled={isProcessing}
          >
            {isProcessing ? (
              <>
                <span
                  className="animate-spin inline-block w-4 h-4 border-[3px] border-current border-t-transparent text-white rounded-full"
                  role="status"
                  aria-label="loading"
                ></span>
                Processing...
              </>
            ) : (
              "Get started"
            )}
          </button>
        </div>
      </div>

      <ul className="space-y-3 text-sm mt-4">
        {plan.features.map((feature, i) => (
          <li
            key={i}
            className={`flex items-center gap-2 ${
              feature.included ? "text-gray-700" : "text-gray-400"
            }`}
          >
            {feature.included ? (
              <BsCheckCircleFill className="text-green-500" />
            ) : (
              <BsXCircleFill className="text-red-300" />
            )}
            {feature.text}
          </li>
        ))}
      </ul>
    </div>
  );
}