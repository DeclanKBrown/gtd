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
        <h1 className="pb-6 text-3xl font-medium">Terms and Conditions</h1>
        <div className="leading-relaxed">
          1. Introduction
          <br />
          By utilizing SimpleGTD, you accept and agree to be bound by these
          Terms and Conditions.
          <br />
          <br />
          2. Agreement to Terms and Conditions
          <br />
          This Agreement becomes effective upon your first use of the SimpleGTD
          application.
          <br />
          <br />
          3. Monthly Subscription Software License with Termination Rights
          <br />
          SimpleGTD is provided under a monthly subscription license, allowing
          continuous access to our task management features tailored for
          individuals and businesses aiming to enhance productivity. The
          subscription ensures you receive ongoing updates and support for a
          predictable monthly fee. Although the subscription is intended to be
          long-term, we reserve the right to terminate the license at any time,
          which helps us ensure compliance and manage the distribution of
          SimpleGTD.
          <br />
          <br />
          4. Refunds
          <br />
          Due to the digital nature of SimpleGTD, refunds or exchanges are not
          available once access has been granted.
          <br />
          <br />
          5. Disclaimer SimpleGTD does not guarantee that it will fulfill all
          your requirements or operate without interruption or errors. We
          exclude all implied warranties to the extent permissible by law,
          including but not limited to warranties of profitability, data loss,
          business interruption, or contractual losses. Your statutory rights
          are not affected by these disclaimers.
          <br />
          <br />
          6. Warranties and Limitation of Liability
          <br />
          SimpleGTD offers no warranties regarding the quality or fitness for a
          particular purpose of the software. We will not be liable for any
          indirect, special, or consequential losses or damages arising from
          your use of SimpleGTD, whether due to negligence or other causes. Any
          liability of SimpleGTD will be limited to the fees you have paid,
          specifically limited to the period during which any incident causing
          liability occurred. You agree to release SimpleGTD from obligations
          exceeding this limitation.
          <br />
          <br />
          7. Responsibilities
          <br />
          SimpleGTD is not responsible for the management or control of content
          created by users within the application.
          <br />
          <br />
          8. General Terms and Law
          <br />
          This Agreement is governed by the laws of Australia. No joint venture,
          partnership, employment, or agency relationship exists between you and
          SimpleGTD as a result of this Agreement. You shall not represent
          yourself as an agent or employee of SimpleGTD and will not hold
          SimpleGTD liable for any actions, representations, or omissions on
          your part.
          <br />
          <br />
          Last updated: 20 April 2024.
        </div>
      </div>
    </div>
  )
}

export default Page
