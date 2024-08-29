import { FormEvent, useRef, useState } from "react";
import Link from "next/link";

export type EmailPlaybookProps = {
  title: string
}

export default function EmailPlaybook(props: EmailPlaybookProps) {
  const inputEmail = useRef<HTMLInputElement>(null);
  const [submitting, setSubmitting] = useState(false);
  const [subscribed, setSubscribed] = useState(false);
  const [error, setError] = useState('');

  const submit = async (event: FormEvent<HTMLFormElement>) => {
    event.preventDefault();
    setSubmitting(true);
    setError('')
    const email = inputEmail.current?.value as string;

    if (!email.match(/^[a-z0-9._%+-]+@[a-z0-9.-]+\.[a-z]{2,4}$/)) {
      setError('Incorrect email')
      setSubmitting(false)
      return false
    }

    const res = await fetch("/api/subscribe/playbook", {
      body: JSON.stringify({
        email: inputEmail.current?.value
      }),
      headers: {
        "Content-Type": "application/json",
      },
      method: "POST",
    });

    let response = await res.json();

    if (response.error) {
      console.log(error);
      setError('Incorrect email')
      setSubmitting(false)
      return false
    }

    if (response.message && response.message === 'subscribed') {
      setSubscribed(true)
    }

    setSubmitting(false)
    return false
  }

  return (
    <>
      {subscribed &&
        <p className="text-2xl md:text-3xl font-bold mb-3">Thank you!<br />The Playbook has been sent to your email.
        </p>}
      {!subscribed && <><p className="text-2xl md:text-3xl font-bold mb-3">{props.title}</p>
        <div className="text-sm">
          <form onSubmit={submit}>
            <input placeholder="Enter your email address"
                   className={`mb-1 px-3 py-2 border border-ex-blue ${error && `border-red-600`} border-1 placeholder-opacity placeholder-ex-blue mr-2 bg-transparent outline-none w-full max-w-[250px] sm:max-w-[280px]`}
                   disabled={submitting}
                   ref={inputEmail}
                   name="email"
                   type="email"
                   autoComplete="off"
            />
            <button
              className="mb-1 inline-block bg-ex-blue text-white px-4 py-2 text-center border border-1 border-ex-blue"
              disabled={submitting}
            >Submit
            </button>
          </form>
        </div>
        <p className="text-gray-500 text-xs">By clicking the button you&apos;re joining our Newsletter and agreeing to
          the
          <Link className="underline" href="/terms-and-privacy" target="_blank">Terms and Conditions</Link></p>
      </>}
    </>
  )
};