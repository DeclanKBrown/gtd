import { buttonVariants } from '@/components/ui/button'
import { ArrowLeft } from 'lucide-react'
import Link from 'next/link'

const Page = () => {
  return (
    <div className="mx-auto max-w-2xl">
      <div className="p-5">
        <Link
          className={buttonVariants({
            variant: 'secondary',
            size: 'lg',
            className: 'my-8 gap-3 text-white',
          })}
          href={'/'}
        >
          <ArrowLeft />
          Back
        </Link>
        <h1 className="pb-6 text-3xl font-medium">Privacy Policy</h1>
        <div className="leading-relaxed">
          Your privacy is important to us. It is SimpleGTD&apos;s policy to
          respect your privacy regarding any information we may collect from you
          across our website.
          <br />
          <br />
          We only ask for personal information when we truly need it to provide
          a service to you. We collect it by fair and lawful means, with your
          knowledge and consent. We also let you know why we&apos;re collecting
          it and how it will be used.
          <br />
          <br />
          You can sign up with your Google account so your SimpleGTD&apos;s
          account username will be prefilled with your name and your public
          profile picture.
          <br />
          <br />
          We only retain collected information for as long as necessary to
          provide you with your requested service. What data we store,
          we&apos;ll protect within commercially acceptable means to prevent
          loss and theft, as well as unauthorized access, disclosure, copying,
          use or modification.
          <br />
          <br />
          We don&apos;t share any personally identifying information publicly or
          with third-parties, except when required to by law.
          <br />
          <br />
          We act in the capacity of a data controller and a data processor with
          regard to the personal data processed through SimpleGTD and the
          services in terms of the applicable data protection laws, including
          the EU General Data Protection Regulation (GDPR).
          <br />
          <br />
          You are free to refuse our request for your personal information, with
          the understanding that we may be unable to provide you with some of
          your desired services.
          <br />
          <br />
          Your continued use of our website will be regarded as acceptance of
          our practices around privacy and personal information. If you have any
          questions about how we handle user data and personal information, feel
          free to contact us.
          <br />
          <br />
          This policy is effective as of 20 July 2024.
        </div>
      </div>
    </div>
  )
}

export default Page
