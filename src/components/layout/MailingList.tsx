import { useState, useEffect } from "react";

export default function MailingList() {
  useEffect(() => {}, []);

  return (
    <div className="fixed bottom-0 z-10 w-full bg-ex-blue p-4 md:m-6 md:w-96 md:p-6 md:shadow-md">
      <form className="flex flex-col gap-3 md:gap-4">
        <hgroup className="text-white">
          <h5 className="text-xl font-bold md:text-2xl">Join our mailing list</h5>
          <h6 className="text-xs md:text-sm">Be the first to know when new Playbooks drop.</h6>
        </hgroup>

        <div className="flex gap-3 md:gap-4">
          <input
            type="email"
            placeholder="Enter your email"
            className="grow border-b border-white bg-transparent text-white placeholder-white placeholder-opacity-25"
          />

          <button className="rounded-full border border-white p-2 px-3 text-sm leading-none text-white duration-300 ease-in-out hover:bg-white hover:text-ex-blue">
            JOIN
          </button>
        </div>

        <p className="text-xs text-white">
          By joining you agree to our{" "}
          <a href="/terms-and-privacy" className="underline">
            Terms &amp; Privacy
          </a>
          .
        </p>
      </form>

      <button className="absolute right-0 top-0 p-2 text-white md:p-3">
        <svg
          xmlns="http://www.w3.org/2000/svg"
          fill="none"
          viewBox="0 0 24 24"
          strokeWidth={1.5}
          stroke="currentColor"
          className="h-6 w-6"
        >
          <path strokeLinecap="round" strokeLinejoin="round" d="M6 18L18 6M6 6l12 12" />
        </svg>
      </button>
    </div>
  );
}
