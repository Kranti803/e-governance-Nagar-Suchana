import { features } from "@/constants";
import React from "react";
import { Card, CardContent } from "./ui/card";

const Features = () => {
  return (
    <section className="bg-green-900 text-white py-20">
      <div className="max-w-6xl mx-auto px-6">
        <h2 className="text-lg font-semibold">Why use the Notice Board?</h2>
        <div className="mt-10 grid gap-6">
          {features.map((feature, index) => (
            <Card key={index} className="rounded-2xl shadow-md py-2">
              <CardContent className="flex items-center gap-4 p-4">
                <feature.icon className="h-6 w-6 text-green-700" />
                <div>
                  <h3 className="font-semibold">{feature.title}</h3>
                  <p className="text-sm text-gray-600">{feature.description}</p>
                </div>
              </CardContent>
            </Card>
          ))}
        </div>
      </div>
    </section>
  );
};

export default Features;
