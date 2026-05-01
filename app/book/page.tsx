"use client";

import { useEffect, useMemo, useState } from "react";
import { formatPackageValue, packageOptions } from "../../lib/packages";

const BOOKING_DRAFT_KEY = "bhaw_booking_draft_v1";
const validPackageValues = packageOptions.map((pkg) => formatPackageValue(pkg));
const BOOKING_DAYS = new Set([3, 5]);

function atMidnight(date: Date) {
  return new Date(date.getFullYear(), date.getMonth(), date.getDate());
}

function toLocalInputDate(date: Date) {
  const year = date.getFullYear();
  const month = String(date.getMonth() + 1).padStart(2, "0");
  const day = String(date.getDate()).padStart(2, "0");
  return `${year}-${month}-${day}`;
}

function formatIsoToDmy(isoDate: string) {
  if (!isoDate) return "";
  const [year, month, day] = isoDate.split("-");
  if (!year || !month || !day) return isoDate;
  return `${day}-${month}-${year.slice(-2)}`;
}

function toIsoDate(date: Date) {
  const y = date.getFullYear();
  const m = String(date.getMonth() + 1).padStart(2, "0");
  const d = String(date.getDate()).padStart(2, "0");
  return `${y}-${m}-${d}`;
}

function isBookableDate(date: Date) {
  return BOOKING_DAYS.has(date.getDay());
}

export default function BookPage() {
  const today = atMidnight(new Date());
  const minDate = toLocalInputDate(today);
  const [name, setName] = useState<string>("");
  const [email, setEmail] = useState<string>("");
  const [phone, setPhone] = useState<string>("");
  const [businessName, setBusinessName] = useState<string>("");
  const [topicTitle, setTopicTitle] = useState<string>("");
  const [topicDescription, setTopicDescription] = useState<string>("");
  const [couponCode, setCouponCode] = useState<string>("");
  const [selectedDate, setSelectedDate] = useState<string>("");
  const [hoveredPackage, setHoveredPackage] = useState<string | null>(null);
  const [selectedPackage, setSelectedPackage] = useState<string>("");
  const [viewMonth, setViewMonth] = useState<Date>(new Date(today.getFullYear(), today.getMonth(), 1));
  const selectedDateObject = selectedDate ? new Date(`${selectedDate}T00:00:00`) : null;

  useEffect(() => {
    try {
      const raw = localStorage.getItem(BOOKING_DRAFT_KEY);
      if (!raw) return;

      const saved = JSON.parse(raw) as {
        name?: string;
        email?: string;
        phone?: string;
        businessName?: string;
        topicTitle?: string;
        topicDescription?: string;
        couponCode?: string;
        selectedDate?: string;
        selectedPackage?: string;
      };

      setName(saved.name ?? "");
      setEmail(saved.email ?? "");
      setPhone(saved.phone ?? "");
      setBusinessName(saved.businessName ?? "");
      setTopicTitle(saved.topicTitle ?? "");
      setTopicDescription(saved.topicDescription ?? "");
      setCouponCode(saved.couponCode ?? "");
      const persistedPackage = saved.selectedPackage ?? "";
      setSelectedPackage(
        validPackageValues.includes(persistedPackage) ? persistedPackage : "",
      );

      const persistedDate = saved.selectedDate ?? "";
      const persistedDateObject = persistedDate
        ? new Date(`${persistedDate}T00:00:00`)
        : null;
      if (
        persistedDate &&
        persistedDate >= minDate &&
        persistedDateObject &&
        isBookableDate(persistedDateObject)
      ) {
        setSelectedDate(persistedDate);
        const [year, month] = persistedDate.split("-");
        if (year && month) {
          setViewMonth(new Date(Number(year), Number(month) - 1, 1));
        }
      }
    } catch {
      // Ignore corrupted draft data.
    }
  }, [minDate, validPackageValues]);

  useEffect(() => {
    try {
      const draft = {
        name,
        email,
        phone,
        businessName,
        topicTitle,
        topicDescription,
        couponCode,
        selectedDate,
        selectedPackage,
      };
      localStorage.setItem(BOOKING_DRAFT_KEY, JSON.stringify(draft));
    } catch {
      // Ignore persistence errors (private mode/storage limits).
    }
  }, [
    name,
    email,
    phone,
    businessName,
    topicTitle,
    topicDescription,
    couponCode,
    selectedDate,
    selectedPackage,
  ]);

  const selectedDateLabel = selectedDateObject
    ? selectedDateObject.toLocaleDateString("en-US", {
        weekday: "long",
        month: "short",
        day: "numeric",
        year: "numeric",
      })
    : "No date selected";
  const selectedPackageLabel = selectedPackage || "No package selected";
  const canContinueToPayment =
    name.trim().length > 0 &&
    email.trim().length > 0 &&
    phone.trim().length > 0 &&
    businessName.trim().length > 0 &&
    topicTitle.trim().length > 0 &&
    topicDescription.trim().length > 0 &&
    selectedPackage.trim().length > 0 &&
    selectedDate.trim().length > 0 &&
    !!selectedDateObject &&
    isBookableDate(selectedDateObject);

  const monthLabel = viewMonth.toLocaleDateString("en-US", {
    month: "long",
    year: "numeric",
  });
  const firstDayOfMonth = new Date(viewMonth.getFullYear(), viewMonth.getMonth(), 1);
  const monthStartWeekday = firstDayOfMonth.getDay();
  const daysInMonth = new Date(viewMonth.getFullYear(), viewMonth.getMonth() + 1, 0).getDate();
  const todayMonthStart = new Date(today.getFullYear(), today.getMonth(), 1);
  const isAtCurrentMonth =
    viewMonth.getFullYear() === todayMonthStart.getFullYear() &&
    viewMonth.getMonth() === todayMonthStart.getMonth();

  const calendarCells = useMemo(() => {
    const cells: Array<{ iso: string; day: number; disabled: boolean } | null> = [];
    for (let i = 0; i < monthStartWeekday; i += 1) cells.push(null);
    for (let day = 1; day <= daysInMonth; day += 1) {
      const date = new Date(viewMonth.getFullYear(), viewMonth.getMonth(), day);
      const iso = toIsoDate(date);
      cells.push({ iso, day, disabled: iso < minDate || !isBookableDate(date) });
    }
    return cells;
  }, [daysInMonth, minDate, monthStartWeekday, viewMonth]);

  return (
    <div className="grid gap-6 sm:gap-8 lg:grid-cols-[1.2fr_1fr] lg:gap-10">
      {/* Booking form */}
      <section
        aria-labelledby="booking-form-heading"
        className="rounded-2xl border border-white/90 bg-gradient-to-br from-white/92 to-stone-50/85 p-5 shadow-md shadow-stone-200/50 dark:border-slate-700/70 dark:from-slate-900/68 dark:to-slate-900/52 dark:shadow-black/20 sm:p-8"
      >
        <h1
          id="booking-form-heading"
          className="text-xl font-bold text-stone-900 dark:text-slate-100 sm:text-2xl lg:text-3xl"
        >
          Book your session
        </h1>
        <p className="mt-2 text-sm text-stone-700 dark:text-slate-300">
          Fill in your details so we can tailor your podcast booking journey.
        </p>

        <form className="mt-6 space-y-4 sm:space-y-5">
          {/* Personal details */}
          <div className="grid gap-4 sm:grid-cols-2 sm:gap-5">
            <label className="text-sm font-medium text-stone-700 dark:text-slate-300">
              Name
              <input
                type="text"
                value={name}
                onChange={(event) => setName(event.target.value)}
                placeholder="Your full name"
                className="mt-1 w-full rounded-xl border border-stone-300 bg-white px-4 py-2.5 text-sm focus:border-stone-500 focus:outline-none dark:border-slate-600 dark:bg-slate-900/55 dark:text-slate-100 dark:focus:border-slate-400"
              />
            </label>
            <label className="text-sm font-medium text-stone-700 dark:text-slate-300">
              Email
              <input
                type="email"
                value={email}
                onChange={(event) => setEmail(event.target.value)}
                placeholder="you@example.com"
                className="mt-1 w-full rounded-xl border border-stone-300 bg-white px-4 py-2.5 text-sm focus:border-stone-500 focus:outline-none dark:border-slate-600 dark:bg-slate-900/55 dark:text-slate-100 dark:focus:border-slate-400"
              />
            </label>
            <label className="text-sm font-medium text-stone-700 dark:text-slate-300">
              Phone
              <input
                type="tel"
                value={phone}
                onChange={(event) => setPhone(event.target.value)}
                placeholder="+91 98765 43210"
                className="mt-1 w-full rounded-xl border border-stone-300 bg-white px-4 py-2.5 text-sm focus:border-stone-500 focus:outline-none dark:border-slate-600 dark:bg-slate-900/55 dark:text-slate-100 dark:focus:border-slate-400"
              />
            </label>
            <label className="text-sm font-medium text-stone-700 dark:text-slate-300">
              Business Name
              <input
                type="text"
                value={businessName}
                onChange={(event) => setBusinessName(event.target.value)}
                placeholder="Your business"
                className="mt-1 w-full rounded-xl border border-stone-300 bg-white px-4 py-2.5 text-sm focus:border-stone-500 focus:outline-none dark:border-slate-600 dark:bg-slate-900/55 dark:text-slate-100 dark:focus:border-slate-400"
              />
            </label>
            <label className="text-sm font-medium text-stone-700 dark:text-slate-300 sm:col-span-2">
              Select a Package
              <div className="mt-2 grid grid-cols-3 gap-2">
                {packageOptions.map((pkg) => {
                  const packageValue = formatPackageValue(pkg);
                  const isSelected = selectedPackage === packageValue;
                  return (
                    <button
                      key={pkg.name}
                      type="button"
                      onClick={() => setSelectedPackage(packageValue)}
                      onMouseEnter={() => setHoveredPackage(packageValue)}
                      onMouseLeave={() => setHoveredPackage(null)}
                      className={`w-full min-w-0 rounded-xl px-2 py-2 text-left text-sm font-medium transition ${
                        isSelected
                          ? "bg-gradient-to-r from-amber-200 to-orange-100 text-slate-900 ring-1 ring-amber-300 dark:from-amber-300/95 dark:to-orange-200/90 dark:text-slate-900 dark:ring-amber-300"
                          : hoveredPackage === packageValue
                            ? "border border-amber-300 bg-gradient-to-r from-amber-200 to-orange-100 text-slate-900 ring-1 ring-amber-300 dark:border-amber-300 dark:from-amber-300/95 dark:to-orange-200/90 dark:text-slate-900 dark:ring-amber-300"
                            : "border border-stone-300 bg-white/80 text-stone-700 hover:border-stone-500 hover:bg-stone-50 dark:border-slate-500 dark:bg-slate-950 dark:text-slate-100"
                      }`}
                    >
                      <span className="block">{pkg.name}</span>
                      <span
                        className={`block text-[10px] font-normal ${
                          isSelected || hoveredPackage === packageValue
                            ? "text-slate-800"
                            : "opacity-80"
                        }`}
                      >
                        ({pkg.amount})
                      </span>
                    </button>
                  );
                })}
              </div>
            </label>
          </div>

          {/* Podcast topic fields */}
          <label className="block text-sm font-medium text-stone-700 dark:text-slate-300">
            Topic / Title
            <input
              type="text"
              value={topicTitle}
              onChange={(event) => setTopicTitle(event.target.value)}
              placeholder="What would you like to speak about?"
              className="mt-1 w-full rounded-xl border border-stone-300 bg-white px-4 py-2.5 text-sm focus:border-stone-500 focus:outline-none dark:border-slate-600 dark:bg-slate-900/55 dark:text-slate-100 dark:focus:border-slate-400"
            />
          </label>

          <label className="block text-sm font-medium text-stone-700 dark:text-slate-300">
            Topic Description
            <textarea
              rows={4}
              value={topicDescription}
              onChange={(event) => setTopicDescription(event.target.value)}
              placeholder="Share your story angle, audience, and key message..."
              className="mt-1 w-full rounded-xl border border-stone-300 bg-white px-4 py-2.5 text-sm focus:border-stone-500 focus:outline-none dark:border-slate-600 dark:bg-slate-900/55 dark:text-slate-100 dark:focus:border-slate-400"
            />
          </label>

          {/* Coupon placeholder */}
          <label className="block text-sm font-medium text-stone-700 dark:text-slate-300">
            Coupon Code
            <input
              type="text"
              value={couponCode}
              onChange={(event) => setCouponCode(event.target.value)}
              placeholder="Enter coupon (optional)"
              className="mt-1 w-full rounded-xl border border-stone-300 bg-white px-4 py-2.5 text-sm focus:border-stone-500 focus:outline-none dark:border-slate-600 dark:bg-slate-900/55 dark:text-slate-100 dark:focus:border-slate-400"
            />
          </label>

        </form>
      </section>

      <div className="flex flex-col gap-6">
        {/* Simple date and slot selector */}
        <aside className="rounded-2xl border border-white/90 bg-gradient-to-br from-white/92 to-stone-50/85 p-5 shadow-md shadow-stone-200/50 dark:border-slate-700/70 dark:from-slate-900/68 dark:to-slate-900/52 dark:shadow-black/20 sm:p-8">
          <h2 className="text-xl font-semibold text-stone-900 dark:text-slate-100">
            Choose your slot
          </h2>
          <p className="mt-2 text-sm text-stone-700 dark:text-slate-300">
            Bookings are available on Wednesdays and Fridays only.
          </p>

          <div className="mt-5 overflow-hidden rounded-xl border border-stone-200 bg-white p-4 shadow-sm dark:border-slate-600/80 dark:bg-slate-900/55 dark:shadow-black/25">
            <label className="block text-sm font-medium text-stone-700 dark:text-slate-300">
              Select Date
              <div className="mt-2 rounded-xl border border-stone-300 bg-white p-3 dark:border-slate-500 dark:bg-slate-950">
                <div className="mb-3 flex items-center justify-between">
                  <button
                    type="button"
                    disabled={isAtCurrentMonth}
                    onClick={() =>
                      setViewMonth((current) => new Date(current.getFullYear(), current.getMonth() - 1, 1))
                    }
                    className={`rounded-md px-2 py-1 text-xs font-medium ${
                      isAtCurrentMonth
                        ? "cursor-not-allowed text-stone-400 dark:text-slate-500"
                        : "text-stone-700 hover:bg-stone-100 dark:text-slate-200 dark:hover:bg-slate-800"
                    }`}
                  >
                    Prev
                  </button>
                  <p className="text-sm font-semibold text-stone-900 dark:text-slate-100">{monthLabel}</p>
                  <button
                    type="button"
                    onClick={() =>
                      setViewMonth((current) => new Date(current.getFullYear(), current.getMonth() + 1, 1))
                    }
                    className="rounded-md px-2 py-1 text-xs font-medium text-stone-700 hover:bg-stone-100 dark:text-slate-200 dark:hover:bg-slate-800"
                  >
                    Next
                  </button>
                </div>

                <div className="grid grid-cols-7 gap-1 text-center text-[11px] font-semibold text-stone-500 dark:text-slate-400">
                  {["Sun", "Mon", "Tue", "Wed", "Thu", "Fri", "Sat"].map((dayName) => (
                    <span key={dayName}>{dayName}</span>
                  ))}
                </div>

                <div className="mt-1 grid grid-cols-7 gap-1">
                  {calendarCells.map((cell, index) =>
                    cell ? (
                      <button
                        key={cell.iso}
                        type="button"
                        disabled={cell.disabled}
                        onClick={() => {
                          setSelectedDate(cell.iso);
                        }}
                        className={`h-8 rounded-md text-xs font-medium ${
                          selectedDate === cell.iso
                            ? "bg-gradient-to-r from-amber-200 to-orange-100 text-slate-900 ring-1 ring-amber-300 dark:from-amber-300/95 dark:to-orange-200/90"
                            : cell.disabled
                              ? "cursor-not-allowed text-stone-300 dark:text-slate-600"
                              : "text-stone-700 hover:bg-stone-100 dark:text-slate-200 dark:hover:bg-slate-800"
                        }`}
                      >
                        {cell.day}
                      </button>
                    ) : (
                      <div key={`blank-${index}`} className="h-8" />
                    ),
                  )}
                </div>
              </div>
            </label>

            <p className="mt-4 text-sm font-semibold text-stone-900 dark:text-slate-100">
              {selectedDateLabel}
            </p>
            <p className="mt-2 text-sm text-stone-600 dark:text-slate-300">
              We schedule recordings on Wednesdays and Fridays. Time slot will be assigned after confirmation.
            </p>
          </div>
        </aside>

        <section className="rounded-2xl border border-white/90 bg-gradient-to-br from-white/92 to-stone-50/85 p-5 shadow-md shadow-stone-200/50 dark:border-slate-700/70 dark:from-slate-900/68 dark:to-slate-900/52 dark:shadow-black/20 sm:p-6">
          <h3 className="text-base font-semibold text-stone-900 dark:text-slate-100">
            Final Selection Summary
          </h3>
          <div className="mt-4 space-y-2 text-sm">
            <p className="text-stone-700 dark:text-slate-300">
              <span className="font-semibold text-stone-900 dark:text-slate-100">Package:</span>{" "}
              {selectedPackageLabel}
            </p>
            <p className="text-stone-700 dark:text-slate-300">
              <span className="font-semibold text-stone-900 dark:text-slate-100">Date:</span>{" "}
              {selectedDateLabel}
            </p>
          </div>

          <div className="mt-5 rounded-xl border border-dashed border-stone-400 bg-stone-50 p-3 text-sm text-stone-700 dark:border-slate-600 dark:bg-slate-900/55 dark:text-slate-300">
            Confirmation email will be sent after successful payment.
          </div>

          <div className="mt-5 flex justify-end">
            <button
              type="button"
              disabled={!canContinueToPayment}
              className={`w-full rounded-full px-6 py-3 text-sm font-semibold transition sm:w-auto ${
                canContinueToPayment
                  ? "bg-gradient-to-r from-amber-200 to-orange-100 text-slate-900 hover:from-amber-100 hover:to-orange-50 dark:from-amber-300/95 dark:to-orange-200/90 dark:hover:from-amber-200 dark:hover:to-orange-100"
                  : "cursor-not-allowed bg-stone-300 text-stone-500 dark:bg-slate-700 dark:text-slate-400"
              }`}
            >
              Confirm your slot (Rs. 999)
            </button>
          </div>
          <p className="mt-2 text-right text-xs text-stone-600 dark:text-slate-400">
            Note: Remaining payment will have to be paid after the interview at least one week before the recording date.
          </p>
        </section>
      </div>
    </div>
  );
}
