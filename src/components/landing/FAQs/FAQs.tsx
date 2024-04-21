'use client'

import {
  Accordion,
  AccordionContent,
  AccordionItem,
  AccordionTrigger,
} from '@/components/ui/accordion'

const FAQs = () => {
  return (
    <>
      <div className="flex basis-1/2 flex-col text-left">
        <p className="text-base-content mb-8 text-3xl font-extrabold sm:text-4xl">
          Frequently Asked Questions
        </p>
        <div className="text-base-content/80">
          Have another question? Contact me on{' '}
          {/* <a
        className="link text-base-content"
        target="_blank"
        href="https://twitter.com/marc_louvion"
      >
        Twitter
      </a>
      or by */}
          <a
            href="mailto:declan+simplegtd@distinctict.com.au"
            target="_blank"
            className="link text-base-content underline"
          >
            email
          </a>
          .
        </div>
      </div>
      <Accordion type="single" collapsible className="w-full">
        <AccordionItem value="item-1">
          <AccordionTrigger>What is GTD?</AccordionTrigger>
          <AccordionContent>
            Get Things Done (GTD) is a time management method created by David
            Allen (the productivity GOAT). It&apos;s a way to organize your
            tasks and projects to increase your productivity and reduce stress.
          </AccordionContent>
        </AccordionItem>
        <AccordionItem value="item-2">
          <AccordionTrigger>
            Why should i use GTD over PARA or other methods?
          </AccordionTrigger>
          <AccordionContent>
            GTD stands out because it&apos;s not just about organizing tasks, it
            also helps free your mind. Unlike PARA, which organizes your digital
            information, GTD shines in reducing mental clutter and
            procrastination.
          </AccordionContent>
        </AccordionItem>
        <AccordionItem value="item-3">
          <AccordionTrigger>
            How easy is it to start with your GTD app?
          </AccordionTrigger>
          <AccordionContent>
            Starting with SimpleGTD app is simple, regardless of your experience
            level. The app has a very intuitive workflow.
          </AccordionContent>
        </AccordionItem>
        <AccordionItem value="item-4">
          <AccordionTrigger>
            How does your app help me overcome procrastination?
          </AccordionTrigger>
          <AccordionContent>
            SimpleGTD helps tackle procrastination head-on with features
            designed to prioritize and simplify your daily tasks. The Engage
            page displays today&apos;s tasks ordered by priority, allowing you
            to focus on what&apos;s most important without feeling overwhelmed.
            Additionally, the Tomorrow tab enables you to prepare lists for the
            next day, ensuring you always have a clear plan in place.
          </AccordionContent>
        </AccordionItem>
        <AccordionItem value="item-5">
          <AccordionTrigger>
            Can this app help me manage overwhelming workloads?
          </AccordionTrigger>
          <AccordionContent>
            Absolutely! By organizing your tasks systematically and prioritizing
            what needs to be done first, SimpleGTD helps you tackle overwhelming
            workloads bit by bit, preventing burnout and reducing
            procrastination.
          </AccordionContent>
        </AccordionItem>
        <AccordionItem value="item-6">
          <AccordionTrigger>
            How does the app keep me on track?
          </AccordionTrigger>
          <AccordionContent>
            The comprehensive review process follow the GTD standard review. Ypu
            can see the projects you made effort toward and the percentage of
            focus on each project
          </AccordionContent>
        </AccordionItem>
        <AccordionItem value="item-7">
          <AccordionTrigger>Is there a refund policy?</AccordionTrigger>
          <AccordionContent>
            To ensure the highest quality and continuous improvement of our app,
            we do not offer refunds. We believe strongly in the value SimpleGTD
            app provides and encourage you to reach out to us with any questions
          </AccordionContent>
        </AccordionItem>
      </Accordion>
    </>
  )
}

export default FAQs
