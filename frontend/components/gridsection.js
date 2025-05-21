import { useEffect, useState } from "react";
export default function gridsection() {
   const [timeLeft, setTimeLeft] = useState({
      days: 0,
      hours: 0,
      minutes: 0,
      seconds: 0,
    });
   useEffect(() => {
    const targetDate = new Date("May 28, 2025 00:00:00").getTime();

    const updateCountdown = () => {
      const now = new Date().getTime();
      const distance = targetDate - now;

      if (distance <= 0) {
        setTimeLeft({ days: 0, hours: 0, minutes: 0, seconds: 0 });
        clearInterval(timerInterval);
        return;
      }

      const days = Math.floor(distance / (1000 * 60 * 60 * 24));
      const hours = Math.floor(
        (distance % (1000 * 60 * 60 * 24)) / (1000 * 60 * 60)
      );
      const minutes = Math.floor(
        (distance % (1000 * 60 * 60)) / (1000 * 60)
      );
      const seconds = Math.floor((distance % (1000 * 60)) / 1000);

      setTimeLeft({ days, hours, minutes, seconds });
    };

    const timerInterval = setInterval(updateCountdown, 1000);
    updateCountdown(); // Initial run

    return () => clearInterval(timerInterval); // Cleanup on unmount
  }, []);
  return (
  <>
  <div className="py-10 w-full max-w-[85rem] px-4 sm:px-6 lg:px-8 mx-auto">
  <div className="grid grid-cols-1 md:grid-cols-4 gap-2 md:gap-2">
  <div className="group p-4 bg-white border border-gray-200 rounded-xl hover:shadow-lg transition dark:bg-neutral-900 dark:border-neutral-700 md:col-span-2">
    <div className="flex flex-col sm:flex-row items-center sm:items-start gap-4">

      <div className="flex-1 flex flex-col gap-2">
<div className="flex items-center gap-2">
  <h2 className="text-lg font-bold text-gray-800 dark:text-white">Madhesh</h2>
  <h2 className="text-lg font-bold text-gray-800 dark:text-white">&</h2>
  <h2 className="text-lg font-bold text-gray-800 dark:text-white">Lavanya</h2>
</div>
        <p className="text-l text-gray-500 dark:text-neutral-300">28th of May, 2025</p>

        <div id="countdown" className="mt-2 text-gray-800 dark:text-white font-medium flex gap-4 text-center">
          <div className="flex flex-col items-center">
            {/* <span id="days" className="text-xs font-bold">--</span> */}
            <span className="text-xs text-gray-500 dark:text-neutral-400">{timeLeft.days} days</span>
          </div>
          <div className="flex flex-col items-center">
            {/* <span id="hours" className="text-xs font-bold">--</span> */}
            <span className="text-xs text-gray-500 dark:text-neutral-400">{timeLeft.hours} hours</span>
          </div>
          <div className="flex flex-col items-center">
            {/* <span id="minutes" className="text-xs font-bold">--</span> */}
            <span className="text-xs text-gray-500 dark:text-neutral-400">{timeLeft.minutes} minutes</span>
          </div>
          <div className="flex flex-col items-center">
            {/* <span id="seconds" className="text-xs font-bold">--</span> */}
            <span className="text-xs text-gray-500 dark:text-neutral-400">{timeLeft.seconds} seconds</span>
          </div>
        </div>

        <p className="text-xs text-gray-500 dark:text-neutral-400">Time left until the big day!</p>
      </div>

      <div className="w-full sm:w-40" style={{ width: '23rem'}}>
        <img src="https://plus.unsplash.com/premium_photo-1682092632793-c7d75b23718e?fm=jpg&q=60&w=3000&ixlib=rb-4.1.0&ixid=M3wxMjA3fDB8MHxzZWFyY2h8MXx8aGluZHUlMjB3ZWRkaW5nfGVufDB8fDB8fHww" alt="Wedding" className="rounded-lg object-cover w-full h-24 sm:h-32"></img>
      </div>

    </div>
  </div>


  <div className="group p-4 bg-white border border-gray-200 rounded-xl hover:shadow-lg transition dark:bg-neutral-900 dark:border-neutral-700 md:col-span-1">
    <div className="flex flex-col gap-2">
      <img src="https://cdn-icons-png.flaticon.com/128/2252/2252184.png" alt="Customer Loyalty" width="50" height="50"></img>
      <h2 className="text-xl text-gray-600 dark:text-neutral-400">Services hired</h2>
      <p className="text-xl font-semibold text-gray-800 dark:text-white">5 of 18</p>
    </div>
  </div>

  <div className="group p-4 bg-white border border-gray-200 rounded-xl hover:shadow-lg transition dark:bg-neutral-900 dark:border-neutral-700 md:col-span-1">
    <div className="flex flex-col gap-2">
      <img src="https://cdn-icons-png.flaticon.com/128/9817/9817200.png" alt="Budget and Finance" width="50" height="50"></img>
      <h2 className="text-xl text-gray-600 dark:text-neutral-400">Budget spent</h2>
      <p className="text-l font-semibold text-gray-800 dark:text-white">41% used → ₹945,000 / ₹2,300,000</p>
    </div>
  </div>
</div>
</div>
  </>
  );
}
