import { FormEvent, useEffect, useRef, useState } from "react";
import Link from "next/link";

export default function MailingList() {
  const [showPopUp, setShowPopUp] = useState(false);
  const [animate, setAnimate] = useState(false);
  const [submitting, setSubmitting] = useState(false);
  const [signedUp, setSignedUp] = useState(false);
  const inputEmail = useRef<HTMLInputElement>(null);

  const close = () => {
    setShowPopUp(false);
    window.localStorage.setItem("eamlc", "1");
  };

  const submit = async (event: FormEvent<HTMLFormElement>) => {
    event.preventDefault();
    setSubmitting(true);

    const res = await fetch("/api/subscribe", {
      body: JSON.stringify({
        email: inputEmail.current?.value,
      }),
      headers: {
        "Content-Type": "application/json",
      },
      method: "POST",
    });

    const { error } = await res.json();

    if (error) {
      console.log(error);
    }

    window.localStorage.setItem("eaml", "true"); // Store that user has joined
    inputEmail.current!.value = ""; // Clear
    setSignedUp(true);

    setTimeout(() => {
      setShowPopUp(false); // Close
    }, 3000);
  };

  useEffect(() => {
    var timeout: undefined | ReturnType<typeof setTimeout>;
    //localStorage.clear(); // Used for testing
    const joined = window.localStorage.getItem("eaml");
    const count = window.localStorage.getItem("eamlc");

    // Show if user is new, has never closed pop-up or re-visited 10 times since last closing pop-up
    if ((!joined && !count) || (!joined && count === "10")) {
      setShowPopUp(true);

      // Wait 2 secs before animtaing in
      timeout = setTimeout(() => {
        setAnimate(true);
      }, 2000);
    } else if (!joined) {
      // Update visit count
      const updatedCount = Number(count) + 1;
      window.localStorage.setItem("eamlc", String(updatedCount));
    }

    return () => clearTimeout(timeout);
  }, []);

  return (
    <div
      className={`fixed z-10 w-full border-white bg-ex-blue p-4 transition-[bottom] duration-300 ease-out md:m-6 md:w-96 md:border md:p-6 md:shadow-md ${
        !showPopUp && "hidden"
      } ${animate ? "bottom-0" : "-bottom-40 md:-bottom-52"}`}
    >
      <form onSubmit={submit} className="flex flex-col gap-3 md:gap-4">
        <hgroup className="text-white">
          <h5 className="text-xl font-bold md:text-2xl">
            {signedUp ? "Thanks for joining!" : "Join our mailing list"}
          </h5>

          <h6 className="text-xs md:text-sm">
            {signedUp ? "We will be in touch soon." : "Be the first to know when new Playbooks drop."}
          </h6>
        </hgroup>

        <div className="flex gap-3 md:gap-4">
          <input
            type="email"
            id="email-input"
            ref={inputEmail}
            name="email"
            placeholder="Enter your email"
            className="grow border-b border-white bg-transparent text-white placeholder-white placeholder-opacity-25"
            required
            disabled={submitting}
          />

          <button
            className="rounded-full border border-white p-2 px-3 text-sm leading-none text-white duration-300 ease-in-out hover:bg-white hover:text-ex-blue"
            disabled={submitting}
          >
            JOIN
          </button>
        </div>

        <p className="text-xs text-white">
          By joining you agree to our{" "}
          <Link href="/terms-and-privacy" className="underline">
            Terms &amp; Privacy
          </Link>
          .
        </p>
      </form>

      <button onClick={close} className="absolute right-0 top-0 p-2 text-white md:p-3" title="Close">
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
