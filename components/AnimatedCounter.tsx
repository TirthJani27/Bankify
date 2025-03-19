import React from "react";
import CountUp from "react-countup";

const AnimatedCounter = ({ amount }: { amount: number }) => {
  return (
    <>
      <CountUp className="w-full" decimal="." decimals={2} prefix="$" end={amount} />
    </>
  );
};

export default AnimatedCounter;
