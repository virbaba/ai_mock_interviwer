"use client";
import React, { useEffect } from "react";
import { Button } from "@/components/ui/button";
import {
  Card,
  CardHeader,
  CardTitle,
  CardContent,
  CardFooter,
} from "@/components/ui/card";
import { Check, X } from "lucide-react";
import { useRouter } from "next/navigation";
import Header from "../dashboard/_components/Header";
import { useUser } from "@clerk/nextjs";

const plans = [
  {
    id: 1,
    name: "Free",
    cost: 0,
    offering: [
      { value: "Create 3 Free Mock Interviews", available: true },
      { value: "Unlimited Retake Interviews", available: true },
      { value: "Practice Questions", available: false },
      { value: "Access to greathire.in", available: false },
      { value: "Email Support", available: false },
    ],
  },
  {
    id: 2,
    name: "Monthly",
    cost: 7.99,
    paymentLink: "https://buy.stripe.com/test_28o9EjbkvgfQ8VOeUV",
    offering: [
      { value: "Create 3 Free Mock Interviews", available: true },
      { value: "Unlimited Retake Interviews", available: true },
      { value: "Practice Questions", available: true },
      { value: "Access to greathire.in", available: true },
      { value: "Email Support", available: true },
    ],
  },
];

const Page = () => {
  const { user } = useUser();

  const router = useRouter();
  useEffect(() => {
    if (!user) {
      router.replace("/sign-in");
    }
  }, [user]);

  return (
    <>
      <Header />
      <main className="min-h-screen bg-gray-50 py-16 px-6 lg:px-20">
        {/* Hero */}
        <section className="text-center mb-12">
          <h1 className="text-4xl font-extrabold text-indigo-700">
            Upgrade Your Interview Experience
          </h1>
          <p className="mt-4 text-gray-600 max-w-2xl mx-auto">
            Choose the plan that suits you best and start practicing mock
            interviews with AI-driven feedback today.
          </p>
        </section>

        {/* Plans Grid */}
        <section className="grid grid-cols-1 md:grid-cols-2 gap-8 max-w-5xl mx-auto">
          {plans.map((plan) => (
            <Card key={plan.id} className="relative overflow-hidden">
              {/* Ribbon for Free Plan */}
              {plan.id === 2 && (
                <div className="absolute top-0 right-0 bg-indigo-700 text-white px-3 py-1 text-xs font-medium rounded-bl-lg">
                  Popular
                </div>
              )}

              <CardHeader className="text-center">
                <CardTitle className="text-2xl font-bold">
                  {plan.name}
                </CardTitle>
                <div className="mt-2 flex items-baseline justify-center">
                  <span className="text-4xl font-extrabold">
                    {plan.cost === 0 ? "$0" : `$${plan.cost}`}
                  </span>
                  <span className="text-lg text-gray-500 ml-1">/ mo</span>
                </div>
              </CardHeader>

              <CardContent>
                <ul className="space-y-3">
                  {plan.offering.map((item, idx) => (
                    <li key={idx} className="flex items-center">
                      {item.available ? (
                        <Check className="w-5 h-5 text-green-500 mr-2" />
                      ) : (
                        <X className="w-5 h-5 text-red-400 mr-2" />
                      )}
                      <span
                        className={
                          item.available
                            ? "text-gray-800"
                            : "text-gray-400 line-through"
                        }
                      >
                        {item.value}
                      </span>
                    </li>
                  ))}
                </ul>
              </CardContent>

              <CardFooter className="text-center">
                {plan.cost === 0 ? (
                  <Button
                    variant="outline"
                    className="w-full cursor-pointer"
                    onClick={() => router.replace("/dashboard")}
                  >
                    Get Started
                  </Button>
                ) : (
                  <Button
                    asChild
                    className="w-full bg-indigo-700 hover:bg-indigo-600"
                  >
                    <a href={plan.paymentLink} target="_blank" rel="noreferrer">
                      Subscribe Now
                    </a>
                  </Button>
                )}
              </CardFooter>
            </Card>
          ))}
        </section>

        {/* Footer CTA */}
        <section className="mt-16 text-center">
          <p className="text-gray-500">
            Need a custom enterprise solution?&nbsp;
            <a
              href="mailto:sales@greathire.in"
              className="text-indigo-700 underline"
            >
              Contact Sales
            </a>
          </p>
        </section>
      </main>
    </>
  );
};

export default Page;
